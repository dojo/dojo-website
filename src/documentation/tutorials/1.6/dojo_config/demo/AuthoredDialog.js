dojo.provide("demo.AuthoredDialog");
dojo.require("dijit.Dialog");

dojo.declare("demo.AuthoredDialog", dijit.Dialog, {
	authorNode: null,
	authorAvatarSrc: "",
	authorName: "",
	templateString: dojo.cache("demo", "AuthoredDialogTemplate.html"),
	postMixInProperties: function() {
		this.inherited(arguments);

		if(!this.hasOwnProperty("authorName") && dojo.config.authorName) {
			this.authorName = dojo.config.authorName;
		}
		if(!this.hasOwnProperty("authorAvatarSrc") && dojo.config.authorAvatarSrc) {
			this.authorAvatarSrc = dojo.config.authorAvatarSrc;
		}
	}
});