/*
Copyright (c) 2003-2010, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

(function(){var a=CKEDITOR.htmlParser.fragment.prototype,b=CKEDITOR.htmlParser.element.prototype;a.onlyChild=b.onlyChild=function(){var h=this.children,i=h.length,j=i==1&&h[0];return j||null;};b.removeAnyChildWithName=function(h){var i=this.children,j=[],k;for(var l=0;l<i.length;l++){k=i[l];if(!k.name)continue;if(k.name==h){j.push(k);i.splice(l--,1);}j=j.concat(k.removeAnyChildWithName(h));}return j;};b.getAncestor=function(h){var i=this.parent;while(i&&!(i.name&&i.name.match(h)))i=i.parent;return i;};a.firstChild=b.firstChild=function(h){var i;for(var j=0;j<this.children.length;j++){i=this.children[j];if(h(i))return i;else if(i.name){i=i.firstChild(h);if(i)return i;else continue;}}return null;};b.addStyle=function(h,i,j){var n=this;var k,l='';if(typeof i=='string')l+=h+':'+i+';';else{if(typeof h=='object')for(var m in h){if(h.hasOwnProperty(m))l+=m+':'+h[m]+';';}else l+=h;j=i;}if(!n.attributes)n.attributes={};k=n.attributes.style||'';k=(j?[l,k]:[k,l]).join(';');n.attributes.style=k.replace(/^;|;(?=;)/,'');};CKEDITOR.dtd.parentOf=function(h){var i={};for(var j in this){if(j.indexOf('$')==-1&&this[j][h])i[j]=1;}return i;};var c=/^(\d[.\d]*)+(em|ex|px|gd|rem|vw|vh|vm|ch|mm|cm|in|pt|pc|deg|rad|ms|s|hz|khz){1}?/i,d=/^(?:\b0[^\s]*\s*){1,4}$/,e=0,f;CKEDITOR.plugins.pastefromword={utils:{createListBulletMarker:function(h,i){var j=new CKEDITOR.htmlParser.element('cke:listbullet'),k;if(!h){h='decimal';k='ol';}else if(h[2]){if(!isNaN(h[1]))h='decimal';else if(/^[a-z]+$/.test(h[1]))h='lower-alpha';else if(/^[A-Z]+$/.test(h[1]))h='upper-alpha';else h='decimal';k='ol';}else{if(/[l\u00B7\u2002]/.test(h[1]))h='disc';else if(/[\u006F\u00D8]/.test(h[1]))h='circle';else if(/[\u006E\u25C6]/.test(h[1]))h='square';else h='disc';k='ul';}j.attributes={'cke:listtype':k,style:'list-style-type:'+h+';'};j.add(new CKEDITOR.htmlParser.text(i));return j;},isListBulletIndicator:function(h){var i=h.attributes&&h.attributes.style;if(/mso-list\s*:\s*Ignore/i.test(i))return true;},isContainingOnlySpaces:function(h){var i;return(i=h.onlyChild())&&/^(:?\s|&nbsp;)+$/.test(i.value);},resolveList:function(h){var i=h.children,j=h.attributes,k;if((k=h.removeAnyChildWithName('cke:listbullet'))&&k.length&&(k=k[0])){h.name='cke:li';if(j.style)j.style=CKEDITOR.plugins.pastefromword.filters.stylesFilter([['text-indent'],['line-height'],[/^margin(:?-left)?$/,null,function(n){var o=n.split(' ');n=o[3]||o[1]||o[0];n=parseInt(n,10);if(!e&&f&&n>f)e=n-f;j['cke:margin']=f=n;}]])(j.style,h)||'';var l=k.attributes,m=l.style;
h.addStyle(m);CKEDITOR.tools.extend(j,l);return true;}return false;},convertToPx:(function(){var h=CKEDITOR.dom.element.createFromHtml('<div style="position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"></div>',CKEDITOR.document);CKEDITOR.document.getBody().append(h);return function(i){if(c.test(i)){h.setStyle('width',i);return h.$.clientWidth+'px';}return i;};})(),getStyleComponents:(function(){var h=CKEDITOR.dom.element.createFromHtml('<div style="position:absolute;left:-9999px;top:-9999px;"></div>',CKEDITOR.document);CKEDITOR.document.getBody().append(h);return function(i,j,k){h.setStyle(i,j);var l={},m=k.length;for(var n=0;n<m;n++)l[k[n]]=h.getStyle(k[n]);return l;};})(),listDtdParents:CKEDITOR.dtd.parentOf('ol')},filters:{flattenList:function(h){var i=h.attributes,j=h.parent,k,l=1;while(j){j.attributes&&j.attributes['cke:list']&&l++;j=j.parent;}switch(i.type){case 'a':k='lower-alpha';break;}var m=h.children,n;for(var o=0;o<m.length;o++){n=m[o];var p=n.attributes;if(n.name in CKEDITOR.dtd.$listItem){var q=n.children,r=q.length,s=q[r-1];if(s.name in CKEDITOR.dtd.$list){m.splice(o+1,0,s);s.parent=h;if(!--q.length)m.splice(o,1);}n.name='cke:li';p['cke:indent']=l;f=0;p['cke:listtype']=h.name;k&&n.addStyle('list-style-type',k,true);}}delete h.name;i['cke:list']=1;},assembleList:function(h){var i=h.children,j,k,l,m,n,o,p,q,r;for(var s=0;s<i.length;s++){j=i[s];if('cke:li'==j.name){j.name='li';k=j;l=k.attributes;m=k.attributes['cke:listtype'];n=parseInt(l['cke:indent'],10)||e&&Math.ceil(l['cke:margin']/e)||1;l.style&&(l.style=CKEDITOR.plugins.pastefromword.filters.stylesFilter([['list-style-type',m=='ol'?'decimal':'disc']])(l.style)||'');if(!p){p=new CKEDITOR.htmlParser.element(m);p.add(k);i[s]=p;}else{if(n>r){p=new CKEDITOR.htmlParser.element(m);p.add(k);o.add(p);}else if(n<r){var t=r-n,u=p.parent;while(t--&&u)p=u.parent;p.add(k);}else p.add(k);i.splice(s--,1);}o=k;r=n;}else p=null;}e=0;},falsyFilter:function(h){return false;},stylesFilter:function(h,i){return function(j,k){var l=[];j.replace(/&quot;/g,'"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g,function(n,o,p){o=o.toLowerCase();o=='font-family'&&(p=p.replace(/["']/g,''));var q,r,s,t;for(var u=0;u<h.length;u++){if(h[u]){q=h[u][0];r=h[u][1];s=h[u][2];t=h[u][3];if(o.match(q)&&(!r||p.match(r))){o=t||o;i&&(s=s||p);if(typeof s=='function')s=s(p,k,o);if(s&&s.push)o=s[0],s=s[1];if(typeof s=='string')l.push([o,s]);return;}}}!i&&l.push([o,p]);});for(var m=0;m<l.length;m++)l[m]=l[m].join(':');
return l.length?l.join(';')+';':false;};},elementMigrateFilter:function(h,i){return function(j){var k=i?new CKEDITOR.style(h,i)._.definition:h;j.name=k.element;CKEDITOR.tools.extend(j.attributes,CKEDITOR.tools.clone(k.attributes));j.addStyle(CKEDITOR.style.getStyleText(k));};},styleMigrateFilter:function(h,i){var j=this.elementMigrateFilter;return function(k,l){var m=new CKEDITOR.htmlParser.element(null),n={};n[i]=k;j(h,n)(m);m.children=l.children;l.children=[m];};},bogusAttrFilter:function(h,i){if(i.name.indexOf('cke:')==-1)return false;},applyStyleFilter:null},getRules:function(h){var i=CKEDITOR.dtd,j=CKEDITOR.tools.extend({},i.$block,i.$listItem,i.$tableContent),k=h.config,l=this.filters,m=l.falsyFilter,n=l.stylesFilter,o=l.elementMigrateFilter,p=CKEDITOR.tools.bind(this.filters.styleMigrateFilter,this.filters),q=l.bogusAttrFilter,r=this.utils.createListBulletMarker,s=l.flattenList,t=l.assembleList,u=this.utils.isListBulletIndicator,v=this.utils.isContainingOnlySpaces,w=this.utils.resolveList,x=this.utils.convertToPx,y=this.utils.getStyleComponents,z=this.utils.listDtdParents,A=k.pasteFromWordRemoveFontStyles!==false,B=k.pasteFromWordRemoveStyles!==false;return{elementNames:[[/meta|link|script/,'']],root:function(C){C.filterChildren();t(C);},elements:{'^':function(C){var D;if(CKEDITOR.env.gecko&&(D=l.applyStyleFilter))D(C);},$:function(C){var D=C.name||'',E=C.attributes;if(D in j&&E.style)E.style=n([[/^(:?width|height)$/,null,x]])(E.style)||'';if(D.match(/h\d/)){C.filterChildren();if(w(C))return;o(k['format_'+D])(C);}else if(D in i.$inline){C.filterChildren();if(v(C))delete C.name;}else if(D.indexOf(':')!=-1&&D.indexOf('cke')==-1){C.filterChildren();if(D=='v:imagedata'){var F=C.attributes['o:href'];if(F)C.attributes.src=F;C.name='img';return;}delete C.name;}if(D in z){C.filterChildren();t(C);}},style:function(C){if(CKEDITOR.env.gecko){var D=C.onlyChild().value.match(/\/\* Style Definitions \*\/([\s\S]*?)\/\*/),E=D&&D[1],F={};if(E){E.replace(/[\n\r]/g,'').replace(/(.+?)\{(.+?)\}/g,function(G,H,I){H=H.split(',');var J=H.length,K;for(var L=0;L<J;L++)CKEDITOR.tools.trim(H[L]).replace(/^(\w+)(\.[\w-]+)?$/g,function(M,N,O){N=N||'*';O=O.substring(1,O.length);if(O.match(/MsoNormal/))return;if(!F[N])F[N]={};if(O)F[N][O]=I;else F[N]=I;});});l.applyStyleFilter=function(G){var H=F['*']?'*':G.name,I=G.attributes&&G.attributes['class'],J;if(H in F){J=F[H];if(typeof J=='object')J=J[I];J&&G.addStyle(J,true);}};}}return false;},p:function(C){C.filterChildren();var D=C.attributes,E=C.parent,F=C.children;
if(w(C))return;if(k.enterMode==CKEDITOR.ENTER_BR){delete C.name;C.add(new CKEDITOR.htmlParser.element('br'));}else o(k['format_'+(k.enterMode==CKEDITOR.ENTER_P?'p':'div')])(C);},div:function(C){var D=C.onlyChild();if(D&&D.name=='table'){var E=C.attributes;D.attributes=CKEDITOR.tools.extend(D.attributes,E);E.style&&D.addStyle(E.style);var F=new CKEDITOR.htmlParser.element('div');F.addStyle('clear','both');C.add(F);delete C.name;}},td:function(C){if(C.getAncestor('thead'))C.name='th';},ol:s,ul:s,dl:s,font:function(C){if(!CKEDITOR.env.gecko&&u(C.parent)){delete C.name;return;}C.filterChildren();var D=C.attributes,E=D.style,F=C.parent;if('font'==F.name){CKEDITOR.tools.extend(F.attributes,C.attributes);E&&F.addStyle(E);delete C.name;return;}else{E=E||'';if(D.color){D.color!='#000000'&&(E+='color:'+D.color+';');delete D.color;}if(D.face){E+='font-family:'+D.face+';';delete D.face;}if(D.size){E+='font-size:'+(D.size>3?'large':D.size<3?'small':'medium')+';';delete D.size;}C.name='span';C.addStyle(E);}},span:function(C){if(!CKEDITOR.env.gecko&&u(C.parent))return false;C.filterChildren();if(v(C)){delete C.name;return null;}if(!CKEDITOR.env.gecko&&u(C)){var D=C.firstChild(function(K){return K.value||K.name=='img';}),E=D&&(D.value||'l.'),F=E.match(/^([^\s]+?)([.)]?)$/);return r(F,E);}var G=C.children,H=C.attributes,I=H&&H.style,J=G&&G[0];if(I)H.style=n([['line-height'],[/^font-family$/,null,!A?p(k.font_style,'family'):null],[/^font-size$/,null,!A?p(k.fontSize_style,'size'):null],[/^color$/,null,!A?p(k.colorButton_foreStyle,'color'):null],[/^background-color$/,null,!A?p(k.colorButton_backStyle,'color'):null]])(I,C)||'';return null;},b:o(k.coreStyles_bold),i:o(k.coreStyles_italic),u:o(k.coreStyles_underline),s:o(k.coreStyles_strike),sup:o(k.coreStyles_superscript),sub:o(k.coreStyles_subscript),a:function(C){var D=C.attributes;if(D&&!D.href&&D.name)delete C.name;},'cke:listbullet':function(C){if(C.getAncestor(/h\d/)&&!k.pasteFromWordNumberedHeadingToList)delete C.name;}},attributeNames:[[/^onmouse(:?out|over)/,''],[/^onload$/,''],[/(?:v|o):\w+/,''],[/^lang/,'']],attributes:{style:n(B?[[/^margin$|^margin-(?!bottom|top)/,null,function(C,D,E){if(D.name in {p:1,div:1}){var F=k.contentsLangDirection=='ltr'?'margin-left':'margin-right';if(E=='margin')C=y(E,C,[F])[F];else if(E!=F)return null;if(C&&!d.test(C))return[F,C];}return null;}],[/^clear$/],[/^border.*|margin.*|vertical-align|float$/,null,function(C,D){if(D.name=='img')return C;}],[/^width|height$/,null,function(C,D){if(D.name in {table:1,td:1,th:1,img:1})return C;
}]]:[[/^mso-/],[/-color$/,null,function(C){if(C=='transparent')return false;if(CKEDITOR.env.gecko)return C.replace(/-moz-use-text-color/g,'transparent');}],[/^margin$/,d],['text-indent','0cm'],['page-break-before'],['tab-stops'],['display','none'],A?[/font-?/]:null],B),width:function(C,D){if(D.name in i.$tableContent)return false;},border:function(C,D){if(D.name in i.$tableContent)return false;},'class':m,bgcolor:m,valign:B?m:function(C,D){D.addStyle('vertical-align',C);return false;}},comment:!CKEDITOR.env.ie?function(C,D){var E=C.match(/<img.*?>/),F=C.match(/^\[if !supportLists\]([\s\S]*?)\[endif\]$/);if(F){var G=F[1]||E&&'l.',H=G&&G.match(/>([^\s]+?)([.)]?)</);return r(H,G);}if(CKEDITOR.env.gecko&&E){var I=CKEDITOR.htmlParser.fragment.fromHtml(E[0]).children[0],J=D.previous,K=J&&J.value.match(/<v:imagedata[^>]*o:href=['"](.*?)['"]/),L=K&&K[1];L&&(I.attributes.src=L);return I;}return false;}:m};}};var g=function(){this.dataFilter=new CKEDITOR.htmlParser.filter();};g.prototype={toHtml:function(h){var i=CKEDITOR.htmlParser.fragment.fromHtml(h,false),j=new CKEDITOR.htmlParser.basicWriter();i.writeHtml(j,this.dataFilter);return j.getHtml(true);}};CKEDITOR.cleanWord=function(h,i){if(CKEDITOR.env.gecko)h=h.replace(/(<!--\[if[^<]*?\])-->([\S\s]*?)<!--(\[endif\]-->)/gi,'$1$2$3');var j=new g(),k=j.dataFilter;k.addRules(CKEDITOR.plugins.pastefromword.getRules(i));i.fire('beforeCleanWord',{filter:k});try{h=j.toHtml(h,false);}catch(l){alert(i.lang.pastefromword.error);}h=h.replace(/cke:.*?".*?"/g,'');h=h.replace(/style=""/g,'');h=h.replace(/<span>/g,'');return h;};})();
