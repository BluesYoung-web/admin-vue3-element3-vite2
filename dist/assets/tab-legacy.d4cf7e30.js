System.register(["./index-legacy.7f630cad.js","./vendor-legacy.68531bbe.js"],(function(e){"use strict";var t,n,a,u,r,l,c;return{setters:[function(e){t=e.e,n=e.r,a=e.f,u=e.o,r=e.c,l=e.x,c=e.b},function(){}],execute:function(){var b=e("default",t({name:"Tabs",setup:function(){return{tabsMenu:n([{label:"tab1",name:"t1"},{label:"tab2",name:"t2"},{label:"tab3",name:"t3"}]),activeTab:n("t1")}}})),o=c("h1",null,"我是标签页1",-1),i=c("h1",null,"我是标签页2",-1),s=c("h1",null,"我是标签页3",-1);b.render=function(e,t,n,c,b,f){var m=a("young-tabs");return u(),r(m,{modelValue:e.activeTab,"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.activeTab=t}),"tabs-menu":e.tabsMenu},{t1:l((function(){return[o]})),t2:l((function(){return[i]})),t3:l((function(){return[s]})),_:1},8,["modelValue","tabs-menu"])}}}}));
