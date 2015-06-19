/*!
 *
 * jQuery collagePlus Plugin v0.3.2
 * https://github.com/ed-lea/jquery-collagePlus
 *
 * Copyright 2012, Ed Lea twitter.com/ed_lea
 *
 * built for http://qiip.me
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 *
 */
;(function(e){e.fn.collagePlus=function(t){function i(t,n,r,i){var o=r.padding*(t.length-1)+t.length*t[0][3],u=r.albumWidth-o,a=u/(n-o),f=o,l=n<r.albumWidth?true:false;for(var c=0;c<t.length;c++){var h=e(t[c][0]),p=Math.floor(t[c][1]*a),d=Math.floor(t[c][2]*a),v=!!(c<t.length-1);if(r.allowPartialLastRow===true&&l===true){p=t[c][1];d=t[c][2]}f+=p;if(!v&&f<r.albumWidth){if(r.allowPartialLastRow===true&&l===true){p=p}else{p=p+(r.albumWidth-f)}}var m=h.is("img")?h:h.find("img");m.width(p);if(!h.is("img")){h.width(p+t[c][3])}m.height(d);if(!h.is("img")){h.height(d+t[c][4])}s(h,v,r);m.load(function(e){return function(){if(r.effect=="default"){e.animate({opacity:"1"},{duration:r.fadeSpeed})}else{if(r.direction=="vertical"){var t=i<=10?i:10}else{var t=c<=9?c+1:10}e.addClass(r.effect);e.addClass("effect-duration-"+t)}}}(h)).each(function(){if(this.complete)e(this).trigger("load")})}}function s(e,t,n){var r={"margin-bottom":n.padding+"px","margin-right":t?n.padding+"px":"0px",display:n.display,"vertical-align":"bottom",overflow:"hidden"};return e.css(r)}function o(t){$img=e(t);var n=new Array;n["w"]=parseFloat($img.css("border-left-width"))+parseFloat($img.css("border-right-width"));n["h"]=parseFloat($img.css("border-top-width"))+parseFloat($img.css("border-bottom-width"));return n}var n={targetHeight:400,albumWidth:this.width(),padding:parseFloat(this.css("padding-left")),images:this.children(),fadeSpeed:"fast",display:"inline-block",effect:"default",direction:"vertical",allowPartialLastRow:false};var r=e.extend({},n,t);return this.each(function(){var t=0,n=[],s=1;r.images.each(function(u){var a=e(this),f=a.is("img")?a:e(this).find("img");var l=typeof f.data("width")!="undefined"?f.data("width"):f.width(),c=typeof f.data("height")!="undefined"?f.data("height"):f.height();var h=o(f);f.data("width",l);f.data("height",c);var p=Math.ceil(l/c*r.targetHeight),d=Math.ceil(r.targetHeight);n.push([this,p,d,h["w"],h["h"]]);t+=p+h["w"]+r.padding;if(t>r.albumWidth&&n.length!=0){i(n,t-r.padding,r,s);delete t;delete n;t=0;n=[];s+=1}if(r.images.length-1==u&&n.length!=0){i(n,t,r,s);delete t;delete n;t=0;n=[];s+=1}})})}})(require('jquery'));
