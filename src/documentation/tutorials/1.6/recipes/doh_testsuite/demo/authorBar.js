dojo.provide("demo.authorBar");

demo.authorBar = {
	templateString: '<img src="{avatar}" class="authorPic" {name}<br/>{bio}',
	update: function() {
		return this.loadData();
	},
	loadData: function() {
		return dojo.xhrGet({
			url: dojo.config.authorsUrl,
			handleAs: 'json',
			load: dojo.hitch(this, "onDataLoad"),
			error: dojo.hitch(this, "onLoadError")
		});
	},
	onLoadError: function(err) {
		console.warn("Error loading authorBar data: ", err);
	},
	onError: function(err) {
		console.warn("Error updating the author bar: ", err);
	},
	onDataLoad: function(authors) {
		var author = dojo.config.authorName,
			authorData;
		dojo.some(authors, function(item){
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
		var node = dojo.byId("author") || dojo.create("div", {
			'class': 'authorBar rounded',
			'id': 'author'
		}, dojo.body());
		var content = dojo.replace(this.templateString, authorData);
		node.innerHTML = content;
	}
};
