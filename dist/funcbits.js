define("express",["exports"],function(a){"use strict";var b=require("./std.js").std,c={sendDataSync:b.autoCurry(function(a,b){a.send(b)})};a.express=c}),define("std",["exports"],function(a){"use strict";var b=Array.prototype.slice,c=(Array.isArray,function(a,b){return a instanceof b}),d=function(a){return b.call(a)},e={};a.std=e,e.async=function(a){return function(){var b=this,c=d(arguments),e=c.pop(),f=a.apply(b,c);e(null,f)}},e.autoCurry=function(a,b){return b=b||a.length,function(){return arguments.length<b?b-arguments.length>0?e.autoCurry(e.curry.apply(this,[a].concat(d(arguments))),b-arguments.length):e.curry.apply(this,[a].concat(d(arguments))):a.apply(this,arguments)}},e.bind=function(a,b){return function(){return a.apply(b,d(arguments))}},e.combineAsArray=e.autoCurry(function(a,b,d){e.map(function(a,d){return c(a,Function)===!1?d(null,a):void a(b,function(a,b){d(null,b)})},a,d)}),e.curry=function(a){var c=b.call(arguments,1);return function(){return a.apply(this,c.concat(d(arguments)))}},e.eachSeries=e.autoCurry(function(a,b,c){if(c=c||function(){},!b.length)return c();var d=0,e=function(){a(b[d],function(a){a?(c(a),c=function(){}):(d+=1,d>=b.length?c():e())})};e()}),e.echoInput=e.autoCurry(function(a,b){console.dir(arguments),b(null,a)}),e.flatten=function(a,b){return c(a,Array)===!1?b(null,a):void e.reduce(function(a,b,c){e.flatten(b,function(b,d){c(null,a.concat(d))})},[],a,b)},e.map=e.autoCurry(function(a,b,c){e.reduce(function(b,c,d){a(c,function(a,c){d(null,b.concat(c))})},[],b,c)}),e.reduce=e.autoCurry(function(a,b,c,d){e.eachSeries(function(c,d){a(b,c,function(a,c){b=c,d(a)})},c,function(a){d(a,b)})}),e.seq=function(){var a=arguments;return function(){var c=this,f=d(arguments),g=f.pop();e.reduce(function(a,d,e){d.apply(c,a.concat([function(){var a=arguments[0],c=b.call(arguments,1);e(a,c)}]))},f,a,g)}},e.spread=e.autoCurry(function(a,b,c){a.apply(this,b.concat(c))})});