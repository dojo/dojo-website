/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["CodeGlass.plugins.dojo.dir"]){dojo._hasResource["CodeGlass.plugins.dojo.dir"]=true;dojo.provide("CodeGlass.plugins.dojo.dir");dojo.require("CodeGlass.plugins._base");dojo.declare("CodeGlass.plugins.dojo.dir",CodeGlass.plugins._baseTemplated,{injectNode:null,templateString:"<div class=\"menuItem dir\">Rtl: <input type=\"checkbox\" dojoAttachEvent=\"onclick: _changeDir\" dojoAttachPoint=\"dirInput\" value=\"rtl\" /></div>",dir:"ltr",injectToolbar:"toolbarBottom",getVars:function(){return {injectToolbar:this.injectToolbar,iframeProps:{"html":" dir=\""+this.dir+"\" "}};},_changeDir:function(){this.dir=this.dirInput.checked?"rtl":"ltr";dojo.publish("CodeGlass/plugin/change/"+this.codeGlassBaseId,["dojo.dir"]);}});}