define(["dojo/request", "dojo/_base/config", "dojo/_base/lang", "dojo/_base/array", "dojo/dom", "dojo/dom-construct", "dojo/Deferred", "dojo/domReady!"],
function(request, config, lang, arrayUtil, dom, domConstruct, Deferred){
	var templateString = '<p><img src="{avatar}" class="authorPic"><strong>{name}</strong><br />{bio}</p>';
	return {
		loadData: function() {
			// Request the data 
			var self = this;
			return request(config.authorsUrl,{ 
					handleAs: "json"
				}).then(function(data) {
					self.onDataLoad(data);
				},
				function(error) {
					self.onLoadError(error);
				});
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
			var node = dom.byId("author") || domConstruct.create("div", {
				'class': 'authorBar rounded',
				'id': 'author'
			}, document.body);
			var content = lang.replace(templateString, authorData);
			node.innerHTML = content;
		},
		update: function() {
			var deferred = new Deferred();
			this.loadData().then(function() {
				deferred.resolve(true)
			});
			return deferred.promise;
		}
	};
});
