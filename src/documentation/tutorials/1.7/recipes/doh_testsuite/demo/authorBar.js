define(["dojo/_base/xhr", "dojo/_base/config", "dojo/_base/lang", "dojo/_base/array", "dojo/dom","dojo/dom-construct", "dojo/domReady!"],
function(xhr, config, lang, arrayUtil, dom, domConstuct){
	var templateString = '<p><img src="{avatar}" class="authorPic"><strong>{name}</strong><br />{bio}</p>';
	return {
		loadData: function() {
			var args = {
				url: config.authorsUrl,
				handleAs: 'json',
				load: lang.hitch(this,"onDataLoad"),
				error: lang.hitch(this,"onLoadError")
			};
			return xhr.get(args);
		},
		onError: function(err) {
			console.warn("Error updating the author bar: ", err);
		},
		onLoadError: function(err) {
			console.warn("Error loading authorBar data: ", err);
		},
		onDataLoad: function(authors) {
			var author = config.authorName,
				authorData;
			arrayUtil.some(authors, function(item){
				if(item.name == author) {
					authorData = item;
					return true;
				}
				return false;
			});

			if(authorData) {
				this.render(authorData);
			} else {
				this.onError("Author " + author + " not matched in authors list");
			}
		},
		render: function(authorData) {
			var node = dom.byId("author") || domConstuct.create("div", {
				'class': 'authorBar rounded',
				'id': 'author'
			}, document.body);
			var content = lang.replace(templateString, authorData);
			node.innerHTML = content;
		},
		update: function() {
			return this.loadData();
		}
	};
});
