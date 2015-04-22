/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["CodeGlass.plugins.dojo.extra"]){dojo._hasResource["CodeGlass.plugins.dojo.extra"]=true;dojo.provide("CodeGlass.plugins.dojo.extra");dojo.require("CodeGlass.plugins._base");dojo.declare("CodeGlass.plugins.dojo.extra",CodeGlass.plugins._base,{dataUrl:"/",postCreate:function(){if(typeof (CodeGlassConfig)!="undefined"&&typeof (CodeGlassConfig.dataUrl)!="undefined"){this.dataUrl=CodeGlassConfig.dataUrl;}},getVars:function(){return {iframeProps:{dataUrl:this.dataUrl}};}});}