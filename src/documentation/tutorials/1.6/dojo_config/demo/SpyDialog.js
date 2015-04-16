dojo.provide("demo.SpyDialog");
dojo.require("dijit.Dialog");

if(demo.logSequenceEntry) {
	demo.logSequenceEntry("demo.SpyDialog module loaded");
}
dojo.declare("demo.SpyDialog", dijit.Dialog, {
	startup: function() {
		this.inherited(arguments);
		if(demo.logSequenceEntry) {
			demo.logSequenceEntry("demo.SpyDialog widget created");
		}
	}
});