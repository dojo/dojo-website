/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["CodeGlass.plugins._base"]){dojo._hasResource["CodeGlass.plugins._base"]=true;dojo.provide("CodeGlass.plugins._base");dojo.require("dijit._Templated");dojo.require("dijit._Widget");dojo.declare("CodeGlass.plugins._base",dijit._Widget,{sharedVars:[],codeGlassBaseId:null,constructor:function(_1){if(_1.sharedVars){this.sharedVars=_1.sharedVars;}if(_1.vars){dojo.mixin(this,_1.vars);}},getVars:function(){return {};}});dojo.provide("CodeGlass.plugins._baseTemplated");dojo.declare("CodeGlass.plugins._baseTemplated",[CodeGlass.plugins._base,dijit._Templated],{injectToolbar:"toolbarBottom"});}