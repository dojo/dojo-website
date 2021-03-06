//>>built
define("docs/searchtools", ["dojo", "dojo/ready"], function(dojo, ready){
	
/**
 * helper function to return a node containing the
 * search summary for a given text. keywords is a list
 * of stemmed words, hlwords is the list of normal, unstemmed
 * words. the first one is used to find the occurance, the
 * latter for highlighting it.
 */

dojo.makeSearchSummary = function(text, keywords, hlwords) {
	var textLower = text.toLowerCase();
	var start = 0;
	dojo.forEach(keywords, function(kw) {
		var i = textLower.indexOf(kw.toLowerCase());
		if (i > -1) start = i;
	});
	start = Math.max(start - 120, 0);
	var excerpt = ((start > 0) ? '...' : '') + dojo.trim(text.substr(start, 240)) + ((start + 240 - text.length) ? '...' : '');
	var rv = dojo.query(dojo._toDom('<div class="context">' + excerpt.replace("<", "&lt;") + '</div>'));
	dojo.forEach(hlwords, function(w) {
		rv = rv.highlightText(w, 'highlight');
	});
	return rv;
}

/**
 * Porter Stemmer
 */
window.PorterStemmer = function() {
	
	var step2list = {
		ational: 'ate',
		tional: 'tion',
		enci: 'ence',
		anci: 'ance',
		izer: 'ize',
		bli: 'ble',
		alli: 'al',
		entli: 'ent',
		eli: 'e',
		ousli: 'ous',
		ization: 'ize',
		ation: 'ate',
		ator: 'ate',
		alism: 'al',
		iveness: 'ive',
		fulness: 'ful',
		ousness: 'ous',
		aliti: 'al',
		iviti: 'ive',
		biliti: 'ble',
		logi: 'log'
	};

	var step3list = {
		icate: 'ic',
		ative: '',
		alize: 'al',
		iciti: 'ic',
		ical: 'ic',
		ful: '',
		ness: ''
	};

	var c = "[^aeiou]";		   // consonant
	var v = "[aeiouy]";		   // vowel
	var C = c + "[^aeiouy]*";	   // consonant sequence
	var V = v + "[aeiou]*";	   // vowel sequence
	var mgr0 = "^(" + C + ")?" + V + C;					   // [C]VC... is m>0
	var meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$";	   // [C]VC[V] is m=1
	var mgr1 = "^(" + C + ")?" + V + C + V + C;			   // [C]VCVC... is m>1
	var s_v = "^(" + C + ")?" + v;						   // vowel in stem
	
	this.stemWord = function (w) {

		var stem, suffix, firstch, origword = w;
		if (w.length < 3) return w;
		var re, re2, re3, re4;
		firstch = w.substr(0,1);
		if (firstch == "y") w = firstch.toUpperCase() + w.substr(1);

		// Step 1a
		re = /^(.+?)(ss|i)es$/;
		re2 = /^(.+?)([^s])s$/;
		if (re.test(w)) w = w.replace(re,"$1$2");
		else if (re2.test(w)) w = w.replace(re2,"$1$2");

		// Step 1b
		re = /^(.+?)eed$/;
		re2 = /^(.+?)(ed|ing)$/;
		if (re.test(w)) {
			var fp = re.exec(w);
			re = new RegExp(mgr0);
			if (re.test(fp[1])) {
				re = /.$/;
				w = w.replace(re,"");
			}
		} else if (re2.test(w)) {
			var fp = re2.exec(w);
			stem = fp[1];
			re2 = new RegExp(s_v);
			if (re2.test(stem)) {
				w = stem;
				re2 = /(at|bl|iz)$/;
				re3 = new RegExp("([^aeiouylsz])\\1$");
				re4 = new RegExp("^" + C + v + "[^aeiouwxy]$");
				if (re2.test(w)) w += "e";
				else if (re3.test(w)) {
					re = /.$/;
					w = w.replace(re,"");
				} else if (re4.test(w)) w += "e";
			}
		}

		// Step 1c
		re = /^(.+?)y$/;
		if (re.test(w)) {
			var fp = re.exec(w);
			stem = fp[1];
			re = new RegExp(s_v);
			if (re.test(stem)) w = stem + "i";
		}

		// Step 2
		re = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
		if (re.test(w)) {
			var fp = re.exec(w);
			stem = fp[1];
			suffix = fp[2];
			re = new RegExp(mgr0);
			if (re.test(stem)) w = stem + step2list[suffix];
		}
		
		// Step 3
		re = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
		if (re.test(w)) {
			var fp = re.exec(w);
			stem = fp[1];
			suffix = fp[2];
			re = new RegExp(mgr0);
			if (re.test(stem)) w = stem + step3list[suffix];
		}

		// Step 4
		re = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
		re2 = /^(.+?)(s|t)(ion)$/;
		if (re.test(w)) {
			var fp = re.exec(w);
			stem = fp[1];
			re = new RegExp(mgr1);
			if (re.test(stem)) w = stem;
		} else if (re2.test(w)) {
			var fp = re2.exec(w);
			stem = fp[1] + fp[2];
			re2 = new RegExp(mgr1);
			if (re2.test(stem)) w = stem;
		}

		// Step 5
		re = /^(.+?)e$/;
		if (re.test(w)) {
			var fp = re.exec(w);
			stem = fp[1];
			re = new RegExp(mgr1);
			re2 = new RegExp(meq1);
			re3 = new RegExp("^" + C + v + "[^aeiouwxy]$");
			if (re.test(stem) || (re2.test(stem) && !(re3.test(stem)))) w = stem;
		}

		re = /ll$/;
		re2 = new RegExp(mgr1);
		if (re.test(w) && re2.test(w)) {
			re = /.$/;
			w = w.replace(re,"");
		}

		// and turn initial Y back to y
		if (firstch == "y") w = firstch.toLowerCase() + w.substr(1);

		return w;
	}
}
	/**
 * Search Module
 */
window.Search = {
	_index : null,
	_queued_query : null,
	_pulse_status : -1,
	
	init : function() {
		var params = dojo.getQueryParameters();
		if (params.q) {
			var query = params.q[0];
			dojo.query('input[name="q"]').forEach(function(node){
				node.value = query;
			});
			this.performSearch(query);
		}
	},

	/**
	* Sets the index
	*/
	setIndex : function(index) {
		var q;
		this._index = index;
		if ((q = this._queued_query) !== null) {
			this._queued_query = null;
			Search.query(q);
		}
	},

	hasIndex : function() {
		return this._index !== null;
	},

	deferQuery : function(query) {
		this._queued_query = query;
	},

	stopPulse : function() {
		this._pulse_status = 0;
	},

	startPulse : function() {
		if (this._pulse_status >= 0) return;

		function pulse() {
			Search._pulse_status = (Search._pulse_status + 1) % 4;
			var dotString = '';
			for (var i = 0; i < Search._pulse_status; i++) dotString += '.';
			Search.dots.innerHTML = dotString;
			if (Search._pulse_status > -1) window.setTimeout(pulse, 500);
		};
		pulse();
	},

	/**
	* perform a search for something
	*/
	performSearch : function(query) {
		// create the required interface elements
		var $ = dojo.query;
		this.out = $('#search-results');
		this.title = dojo.place('<h2>' + _('Searching') + '</h2>', this.out[0]);
		this.dots = dojo.place('<span></span>', this.title);
		this.status = dojo.place('<p style="display: none"></p>', this.out[0]);
		this.output = dojo.place('<ul class="search"></ul>', this.out[0]);
		dojo.byId('search-progress').innerHTML = 'Preparing search...';
		this.startPulse();
		// index already loaded, the browser was quick!
		if (this.hasIndex()) this.query(query); else this.deferQuery(query);
	},

	query : function(query) {
		// stem the searchterms and add them to the
		// correct list
		var stemmer = new PorterStemmer();
		var searchterms = [];
		var excluded = [];
		var hlterms = [];
		var tmp = query.split(/\s+/);
		var object = (tmp.length == 1) ? tmp[0].toLowerCase() : null;
		for (var i = 0; i < tmp.length; i++) {
			// stem the word
			var word = stemmer.stemWord(tmp[i]).toLowerCase();
			// select the correct list
			if (word[0] == '-') {
				var toAppend = excluded;
				word = word.substr(1);
			} else {
				toAppend = searchterms;
				hlterms.push(tmp[i].toLowerCase());
			}
			// only add if not already in the list
			if (dojo.indexOf(toAppend, word) < 0) toAppend.push(word);
		}
		var highlightstring = '?highlight=' + dojo.urlencode(hlterms.join(" "));
		console.debug('SEARCH: searching for:');
		console.info('required: ', searchterms);
		console.info('excluded: ', excluded);
		// prepare search
		var filenames = this._index.filenames;
		var titles = this._index.titles;
		var terms = this._index.terms;
		var descrefs = this._index.descrefs;
		var modules = this._index.modules;
		var desctypes = this._index.desctypes;
		var fileMap = {};
		var files = null;
		var objectResults = [];
		var regularResults = [];
		dojo.query('#search-progress').empty();
		// lookup as object
		if (object != null) {
			for (var module in modules) {
				if (module.indexOf(object) > -1) {
					fn = modules[module];
					descr = _('module, in ') + titles[fn];
					objectResults.push([filenames[fn], module, '#module-'+module, descr]);
				}
			}
			
			for (var prefix in descrefs) {
				for (var name in descrefs[prefix]) {
					var fullname = (prefix ? prefix + '.' : '') + name;
					if (fullname.toLowerCase().indexOf(object) > -1) {
						match = descrefs[prefix][name];
						descr = desctypes[match[1]] + _(', in ') + titles[match[0]];
						objectResults.push([filenames[match[0]], fullname, '#'+fullname, descr]);
					}
				}
			}
		}

		// sort results descending
		objectResults.sort(function(a, b) {
			return (a[1] > b[1]) ? -1 : ((a[1] < b[1]) ? 1 : 0);
		});

		// perform the search on the required terms
		for (var i = 0; i < searchterms.length; i++) {
			var word = searchterms[i];
			// no match but word was a required one
			if ((files = terms[word]) == null) break;
			if (files.length == undefined) {
				files = [files];
			}

			// create the mapping
			for (var j = 0; j < files.length; j++) {
				var file = files[j];
				if (file in fileMap) fileMap[file].push(word);
				else fileMap[file] = [word];
			}
		}
		
		// now check if the files don't contain excluded terms
		for (var file in fileMap) {
			var valid = true;
			// check if all requirements are matched
			if (fileMap[file].length != searchterms.length) continue;
			// ensure that none of the excluded terms is in the
			// search result.
			for (var i = 0; i < excluded.length; i++) {
				if (terms[excluded[i]] == file || $.contains(terms[excluded[i]] || [], file)) {
					valid = false;
					break;
				}
			}
			// if we have still a valid result we can add it
			// to the result list
			if (valid) regularResults.push([filenames[file], titles[file], '', null]);
		}

		// delete unused variables in order to not waste
		// memory until list is retrieved completely
		delete filenames, titles, terms;
		// now sort the regular results descending by title
		regularResults.sort(function(a, b) {
			var left = a[1].toLowerCase();
			var right = b[1].toLowerCase();
			return (left > right) ? -1 : ((left < right) ? 1 : 0);
		});
		
		// combine both
		var results = regularResults.concat(objectResults);
		// print the results
		var resultCount = results.length;

		function displayNextItem() {
			
			function addListItem(listItem) {
				dojo.place(listItem, Search.output);
				dojo.fx.wipeIn({
					node: listItem,
					duration: 5,
					onEnd: displayNextItem
				}).play();
			}
			
			// results left, load the summary and display it
			if (results.length) {
				var item = results.pop();
				var listItem = dojo.create('li', {
					style: 'display: none;'
				});
				dojo.create('a', {
					href: item[0] + DOCUMENTATION_OPTIONS.FILE_SUFFIX + highlightstring + item[2],
					innerHTML: item[1]
				}, listItem);

				if (item[3]) {
					dojo.create('span', {
						innerHTML: item[3]
					}, listItem);
					addListItem(listItem);

				} else if (DOCUMENTATION_OPTIONS.HAS_SOURCE) {
					dojo.xhrGet({
						url: '_sources/' + item[0] + '.txt',
						load: function (data) {
							dojo.place(dojo.makeSearchSummary(data, searchterms, hlterms)[0], listItem);
							addListItem(listItem);
						}
					})
				} else {
					// no source available, just display title
					addListItem(listItem);
				}
			} else {
			
				// search finished, update title and status message
				Search.stopPulse();
				Search.title.innerHTML = 'Search Results';
				var status = Search.status;
				if (!resultCount) status.innerHTML = 'Your search did not match any documents. Please make sure that all words are spelled correctly and that you\'ve selected enough categories.';
				else status.innerHTML = 'Search finished, found %s page(s) matching the search query.'.replace('%s', resultCount);
				dojo.style(status, {
					display: 'block',
					opacity: 0
				});
				dojo.fadeIn({node: Search.status, duration: 500}).play();
			}
		}

		displayNextItem();
	}
};

	ready(function(){
		Search.init()
	});

});