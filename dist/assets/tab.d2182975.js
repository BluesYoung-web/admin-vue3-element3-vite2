import{e as a,r as e,p as t,a as s,f as b,o as n,c as l,d,b as o}from"./index.b49ed622.js";import"./vendor.7f0cd297.js";var c=a({name:"Tabs",setup:()=>({tabsMenu:e([{label:"tab1",name:"t1"},{label:"tab2",name:"t2"},{label:"tab3",name:"t3"}]),activeTab:e("t1")})});const u=d();t("data-v-1bbdebfc");const m=o("h1",{class:"h1-test"},"我是标签页1",-1),r=o("h1",null,"我是标签页2",-1),p=o("h1",null,"我是标签页3",-1);s();const v=u(((a,e,t,s,d,o)=>{const c=b("young-tabs");return n(),l(c,{modelValue:a.activeTab,"onUpdate:modelValue":e[1]||(e[1]=e=>a.activeTab=e),"tabs-menu":a.tabsMenu},{t1:u((()=>[m])),t2:u((()=>[r])),t3:u((()=>[p])),_:1},8,["modelValue","tabs-menu"])}));c.render=v,c.__scopeId="data-v-1bbdebfc";export default c;