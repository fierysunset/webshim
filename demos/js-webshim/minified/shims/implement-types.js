(function(b){if(!(b.support.validity===true&&b('<input type="datetime-local" />')[0].type=="datetime-local"&&b('<input type="range" />')[0].type=="range")){var f=b.webshims.inputTypes;b.webshims.addInputType=function(a,d){f[a]=d};var j={};b.webshims.addValidityRule=function(a,d){j[a]=d};b.webshims.addValidityRule("typeMismatch",function(a,d,c){if(d==="")return false;var g=false;if(!("type"in c))c.type=(a[0].getAttribute("type")||"").toLowerCase();if(f[c.type]&&f[c.type].mismatch)g=f[c.type].mismatch(d,
a);return g});var n=["customError","typeMismatch","rangeUnderflow","rangeOverflow","stepMismatch","tooLong","patternMismatch","valueMissing","valid"],k=b.fn.val;b.webshims.attr("validity",{elementNames:["input"],getter:function(a){var d=a.validity;if(!d)return d;var c={};b.each(n,function(h,e){c[e]=d[e]});if(!b.attr(a,"willValidate"))return c;var g=b(a),o=k.call(g),p={},q=!!b.data(a,"hasCustomError");c.customError=q;if(c.valid&&c.customError)c.valid=false;else if(!c.valid){var l=true;b.each(c,function(h,
e){if(e)return l=false});if(l)c.valid=true}if((a.nodeName||"").toLowerCase()=="select")return c;b.each(j,function(h,e){var m;c[h]=e(g,o,p);if(c[h]&&c.valid){m=b.webshims.createValidationMessage(a,h);a.setCustomValidity(m);c.valid=false}});c.valid&&a.setCustomValidity("");return c}});b.webshims.addMethod("setCustomValidity",function(a){a+="";this.setCustomValidity(a);b.data(this,"hasCustomError",!!a)});var i=function(a){if(f[(a.getAttribute&&a.getAttribute("type")||"").toLowerCase()])b.attr(a,"validity")};
b.webshims.attr("value",{elementNames:["input"],setter:function(a,d,c){c();i(a)},getter:true});b.fn.val=function(){var a=k.apply(this,arguments);this.each(function(){i(this)});return a};document.addEventListener&&document.addEventListener("change",function(a){i(a.target)},true);b.webshims.readyModules("number-date-type",function(){b.webshims.addReady(function(a){b("input",a).each(function(){i(this)})})},true,true)}})(jQuery);