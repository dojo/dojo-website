if(!dojo._hasResource["MainAssistant"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["MainAssistant"] = true;
dojo.provide("MainAssistant");
dojo.require("dojox.mobile.app.SceneAssistant");

dojo.declare("MainAssistant", dojox.mobile.app.SceneAssistant, {
  
  setup: function(){
    console.log("In main assistant setup");
    
    var appInfoNode = this.controller.query(".appInfoArea")[0];
    
    appInfoNode.innerHTML =
      "This app has the following info: \n"
        + dojo.toJson(dojox.mobile.app.info, true)
    
  },
  
  activate: function(){
    console.log("In main assistant activate");
    
    
  }
  
});

}
