dojo.provide("custom.Hello");
// The dijit.Dialog module is going to be retrieved from CDN:
dojo.require("dijit.Dialog"); 
// declare our custom class
dojo.declare("custom.Hello", [dijit.Dialog], {
	// assign a title for the Dialog
	title: "Hi"
});
