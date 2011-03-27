jQuery.webshims.register("form-output-datalist",function(b,j,q,k,o){(function(){var l={input:1,textarea:1},m={updateInput:1,input:1},n={radio:1,checkbox:1,submit:1,button:1,image:1,reset:1,color:1},h=function(g){var a,e=g.attr("value"),c=function(f){if(g){var i=g.attr("value");if(i!==e){e=i;if(!f||!m[f.type])j.triggerInlineForm(g[0],"input")}}},d=function(){g.unbind("focusout",d).unbind("input",c).unbind("updateInput",c);clearInterval(a);c();g=null};clearInterval(a);a=setInterval(c,b.browser.mozilla?
250:111);setTimeout(c,9);g.bind("focusout",d).bind("input updateInput",c)};b(k).bind("focusin",function(g){if(g.target&&g.target.type&&!g.target.readonly&&!g.target.readOnly&&!g.target.disabled&&l[(g.target.nodeName||"").toLowerCase()]&&!n[g.target.type])h(b(g.target))})})();(function(){if(!("value"in k.createElement("output"))){var l=function(h){if(!h.getAttribute("aria-live")){h=b(h);var g=(h.text()||"").trim(),a=h.attr("id"),e=h.attr("for"),c=b('<input class="output-shim" type="hidden" name="'+
(h.attr("name")||"")+'" value="'+g+'" style="display: none" />').insertAfter(h),d=c[0].form||k,f=function(i){c[0].value=i;i=c[0].value;h.text(i);j.contentAttr(h[0],"value",i)};h[0].defaultValue=g;j.contentAttr(h[0],"value",g);h.attr({"aria-live":"polite"});if(a){c.attr("id",a);h.attr("aria-labeldby",j.getID(b('label[for="'+a+'"]',d)))}if(e){a=j.getID(h);e.split(" ").forEach(function(i){(i=d.getElementById(i))&&i.setAttribute("aria-controls",a)})}h.data("outputShim",f);c.data("outputShim",f);return f}};
j.defineNodeNameProperty("output","value",{set:function(h){var g=b.data(this,"outputShim");g||(g=l(this));g(h)},get:function(){return j.contentAttr(this,"value")||b(this).text()||""}});var m=function(h){var g=b.data(this,"outputShim");g&&g(h)};j.onNodeNamesPropertyModify("input","value",{set:m});var n=b.fn.val;b.fn.val=function(h){var g=n.apply(this,arguments);this[0]&&h!==o&&b.nodeName(this[0],"input")&&m.call(this[0],h);return g};j.addReady(function(h,g){b("output",h).add(g.filter("output")).each(function(){l(this)})})}})();
(function(){if(!Modernizr.datalist){var l=0,m={submit:1,button:1,reset:1,hidden:1,range:1,date:1},n=b.browser.msie&&parseInt(b.browser.version,10)<7,h=function(a){if(!a)return[];var e;try{e=JSON.parse(localStorage.getItem("storedDatalistOptions"+a))}catch(c){}return e||[]},g={_create:function(a){if(!m[(a.input.getAttribute("type")||"").toLowerCase()||a.input.type]){var e=a.id&&k.getElementById(a.id),c=b.data(a.input,"datalistWidget");if(e&&c&&c.datalist!==e){c.datalist=e;c.id=a.id;c._resetListCached()}else if(e){if(!(c&&
c.datalist===e)){l++;var d=this;this.timedHide=function(){clearTimeout(d.hideTimer);d.hideTimer=setTimeout(b.proxy(d,"hideList"),9)};this.datalist=e;this.id=a.id;this.lazyIDindex=l;this.hasViewableData=true;this._autocomplete=b.attr(a.input,"autocomplete");b.data(a.input,"datalistWidget",this);this.shadowList=b('<div class="datalist-polyfill" />').appendTo("body");this.index=-1;this.input=a.input;this.arrayOptions=[];this.shadowList.delegate("li","mouseover.datalistWidget mousedown.datalistWidget click.datalistWidget",
function(f){var i=b("li:not(.hidden-item)",d.shadowList),p=f.type=="mousedown"||f.type=="click";d.markItem(i.index(f.target),p,i);f.type=="click"&&d.hideList();return f.type!="mousedown"}).bind("focusout",this.timedHide);a.input.setAttribute("autocomplete","off");b(a.input).attr({"aria-haspopup":"true"}).bind("input.datalistWidget",b.proxy(this,"showHideOptions")).bind("keydown.datalistWidget",function(f){var i=f.keyCode;if(i==40&&!d.showList()){d.markItem(d.index+1,true);return false}if(d.isListVisible){if(i==
38){d.markItem(d.index-1,true);return false}if(!f.shiftKey&&(i==33||i==36)){d.markItem(0,true);return false}if(!f.shiftKey&&(i==34||i==35)){f=b("li:not(.hidden-item)",d.shadowList);d.markItem(f.length-1,true,f);return false}if(i==13||i==27){if(i==13){f=b("li.active-item:not(.hidden-item)",d.shadowList);if(f[0]){b.attr(d.input,"value",f.attr("data-value"));b(d.input).triggerHandler("updateInput")}}d.hideList();return false}}}).bind("focus.datalistWidget",function(){b(this).hasClass("list-focus")&&
d.showList()}).bind("blur.datalistWidget",this.timedHide);b(this.datalist).unbind("updateDatalist.datalistWidget").bind("updateDatalist.datalistWidget",b.proxy(this,"_resetListCached"));this._resetListCached();a.input.form&&a.input.id&&b(a.input.form).bind("submit.datalistWidget"+a.input.id,function(){var f=b.attr(a.input,"value");d.storedOptions=d.storedOptions||h(a.input.name||a.input.id);if(f&&b.inArray(f,d.storedOptions)==-1){d.storedOptions.push(f);f=a.input.name||a.input.id;var i=d.storedOptions;
if(f){i=i||[];try{localStorage.setItem("storedDatalistOptions"+f,JSON.stringify(i))}catch(p){}}}});b(q).bind("unload",function(){d.destroy()})}}else c&&c.destroy()}},destroy:function(){var a=b.attr(this.input,"autocomplete");b(this.input).unbind(".datalistWidget").removeData("datalistWidget");this.shadowList.remove();b(k).unbind(".datalist"+this.id);this.input.form&&this.input.id&&b(this.input.form).unbind("submit.datalistWidget"+this.input.id);this.input.removeAttribute("aria-haspopup");a===o?this.input.removeAttribute("autocomplete"):
b(this.input).attr("autocomplete",a)},_resetListCached:function(){var a=this;this.needsUpdate=true;this.lastUpdatedValue=false;this.lastUnfoundValue="";clearTimeout(this.updateTimer);this.updateTimer=setTimeout(function(){a.updateListOptions()},this.isListVisible?0:20*this.lazyIDindex)},updateListOptions:function(){this.needsUpdate=false;clearTimeout(this.updateTimer);this.shadowList.css({fontSize:b.curCSS(this.input,"fontSize"),fontFamily:b.curCSS(this.input,"fontFamily"),id:this.datalist.id+"-polyfill"});
var a='<ul role="list" class="'+(this.datalist.className||"")+'">',e=[],c=[];b("option",this.datalist).each(function(d){if(!this.disabled){var f={value:b(this).val()||"",text:b.trim(b.attr(this,"label")||this.textContent||this.innerText||b.text([this])||""),className:this.className||"",style:b.attr(this,"style")||""};if(!f.text)f.text=f.value;e[d]=f.value;c[d]=f}});this.storedOptions=this.storedOptions||h(this.input.name||this.input.id);this.storedOptions.forEach(function(d){b.inArray(d,e)==-1&&c.push({value:d,
text:d,className:"",style:""})});c.forEach(function(d){var f=d.value.indexOf('"')!=-1?"'"+d.value+"'":'"'+d.value+'"';a+="<li data-value="+f+' class="'+d.className+'" style="'+d.style+'" tabindex="-1" role="listitem">'+d.text+"</li>"});a+="</ul>";this.arrayOptions=c;this.shadowList.html(a);this.isListVisible&&this.showHideOptions()},showHideOptions:function(){var a=b.attr(this.input,"value").toLowerCase();if(!(a===this.lastUpdatedValue||this.lastUnfoundValue&&a.indexOf(this.lastUnfoundValue)===0)){this.lastUpdatedValue=
a;var e=false,c=b("li",this.shadowList);if(a)this.arrayOptions.forEach(function(d,f){if(!("lowerText"in d)){d.lowerText=d.text.toLowerCase();d.lowerValue=d.value.toLowerCase()}if(d.lowerText.indexOf(a)!==-1||d.lowerValue.indexOf(a)!==-1){b(c[f]).removeClass("hidden-item");e=true}else b(c[f]).addClass("hidden-item")});else{c.removeClass("hidden-item");e=true}if(this.hasViewableData=e)this.showList();else{this.lastUnfoundValue=a;this.hideList()}}},showList:function(){if(this.isListVisible)return false;
this.needsUpdate&&this.updateListOptions();this.showHideOptions();if(!this.hasViewableData)return false;var a=this,e=b(this.input).offset();e.top+=b(this.input).outerHeight();e.width=b(this.input).outerWidth()-(parseInt(this.shadowList.css("borderLeftWidth"),10)||0)-(parseInt(this.shadowList.css("borderRightWidth"),10)||0);if(n){this.shadowList.css("height","auto");this.shadowList.height()>250&&this.shadowList.css("height",220)}this.shadowList.css(e).addClass("datalist-visible");this.isListVisible=
true;b(k).bind("mousedown.datalist"+this.id+" focusin.datalist"+this.id,function(c){if(c.target===a.input||a.shadowList[0]===c.target||b.contains(a.shadowList[0],c.target)){clearTimeout(a.hideTimer);setTimeout(function(){clearTimeout(a.hideTimer)},0)}else a.timedHide()});return true},hideList:function(){if(!this.isListVisible)return false;this.shadowList.removeClass("datalist-visible list-item-active").scrollTop(0).find("li.active-item").removeClass("active-item");this.index=-1;this.isListVisible=
false;b(this.input).removeAttr("aria-activedescendant");b(k).unbind(".datalist"+this.id);return true},scrollIntoView:function(a){var e=b("> ul",this.shadowList),c=a.position();c.top-=(parseInt(e.css("paddingTop"),10)||0)+(parseInt(e.css("marginTop"),10)||0)+(parseInt(e.css("borderTopWidth"),10)||0);if(c.top<0)this.shadowList.scrollTop(this.shadowList.scrollTop()+c.top-2);else{c.top+=a.outerHeight();a=this.shadowList.height();c.top>a&&this.shadowList.scrollTop(this.shadowList.scrollTop()+(c.top-a)+
2)}},markItem:function(a,e,c){c=c||b("li:not(.hidden-item)",this.shadowList);if(c.length){if(a<0)a=c.length-1;else if(a>=c.length)a=0;c.removeClass("active-item");this.shadowList.addClass("list-item-active");c=c.filter(":eq("+a+")").addClass("active-item");if(e){b.attr(this.input,"value",c.attr("data-value"));b.attr(this.input,"aria-activedescendant",b.webshims.getID(c));b(this.input).triggerHandler("updateInput");this.scrollIntoView(c)}this.index=a}}};j.defineNodeNameProperties("input",{list:{get:function(){var a=
j.contentAttr(this,"list");return a==null?o:a},set:function(a){j.contentAttr(this,"list",a);j.objectCreate(g,o,{input:this,id:a})},initAttr:true},selectedOption:{set:b.noop,get:function(){var a=b.attr(this,"list"),e=null,c;if(!a)return e;c=b.attr(this,"value");if(!c)return e;a=b.attr(a,"options");if(!a.length)return e;b.each(a,function(d,f){if(c==b.attr(f,"value")){e=f;return false}});return e}},autocomplete:{get:function(){var a=b.data(this,"datalistWidget");if(a)return a._autocomplete;return"autocomplete"in
this?this.autocomplete:this.getAttribute("autocomplete")},set:function(a){var e=b.data(this,"datalistWidget");if(e){e._autocomplete=a;a=="off"&&e.hideList()}else if("autocomplete"in this)this.autocomplete=a;else this.setAttribute("autocomplete",a)}}});j.defineNodeNameProperty("datalist","options",{get:function(){var a=b("select",this);return a[0]?a[0].options:[]}});j.addReady(function(a,e){e.filter("select, option").each(function(){var c=this.parentNode;if(c&&!b.nodeName(c,"datalist"))c=c.parentNode;
c&&b.nodeName(c,"datalist")&&b(c).triggerHandler("updateDatalist")})})}})()});
