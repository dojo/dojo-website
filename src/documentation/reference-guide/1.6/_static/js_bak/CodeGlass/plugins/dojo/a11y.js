/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["CodeGlass.plugins.dojo.a11y"]){dojo._hasResource["CodeGlass.plugins.dojo.a11y"]=true;dojo.provide("CodeGlass.plugins.dojo.a11y");dojo.require("CodeGlass.plugins._base");dojo.declare("CodeGlass.plugins.dojo.a11y",CodeGlass.plugins._baseTemplated,{templateString:"<div class=\"menuItem a11y\">A11y: <input type=\"checkbox\" dojoAttachEvent=\"onclick: _changeA11y\" dojoAttachPoint=\"a11yInput\" value=\"rtl\" /></div>",injectToolbar:"toolbarBottom",getVars:function(){return {injectToolbar:this.injectToolbar,iframeProps:{"classBody":this.a11yInput.checked?" dijit_a11y ":""}};},_changeA11y:function(){this.a11y=this.a11yInput.checked?"dijit_a11y":"";dojo.publish("CodeGlass/plugin/change/"+this.codeGlassBaseId,["dojo.a11y"]);}});}