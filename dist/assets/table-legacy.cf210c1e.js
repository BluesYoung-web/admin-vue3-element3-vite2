var __vite_style__=document.createElement("style");__vite_style__.innerHTML=".list[data-v-56c3807b]{margin-top:30px}",document.head.appendChild(__vite_style__),System.register(["./index-legacy.34ffe067.js","./vendor-legacy.68531bbe.js"],(function(e){"use strict";var a,l,t,u,n,o,i,r,d,v,c,s,p,m;return{setters:[function(e){a=e.e,l=e.r,t=e.p,u=e.a,n=e.f,o=e.g,i=e.o,r=e.c,d=e.b,v=e.h,c=e.t,s=e.F,p=e.d,m=e.i},function(){}],execute:function(){var g=e("default",a({name:"Table",setup:function(){var e=l([]),a=l([]);a.value=[{prop:"date",label:"日期",tool_content:"来了老弟"},{prop:"autoid",label:"UID"},{prop:"sp",label:"特殊内容"},{prop:"imgs",label:"图片"},{prop:"m1",label:"多行1"},{prop:"m2",label:"多行2",show_all:!0}],e.value=[{date:"2021-01-01",autoid:100,sp:'<el-button type="primary">123</el-button>',imgs:["12321","https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"],m1:[{value:1},{value:1},{value:1},{value:1},{value:1}],m2:[{value:1},{value:1},{value:1},{value:1},{value:1}]},{date:"2021-01-01",autoid:100,sp:'<span style="color: red">来了老弟</span>',imgs:["12321","https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"],m1:[{value:1},{value:1},{value:1},{value:1},{value:1}],m2:[{value:1},{value:1},{value:1},{value:1},{value:1}]},{date:"2021-01-01",autoid:100,sp:'<span style="color: red">来了老弟</span>',imgs:["12321","https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"],m1:[{value:1},{value:1},{value:1},{value:1},{value:1}],m2:[{value:1},{value:1},{value:1},{value:1},{value:1}]},{date:"2021-01-01",autoid:100,sp:'<span style="color: red">来了老弟</span>',imgs:["12321","https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"],m1:[{value:1},{value:1},{value:1},{value:1},{value:1}],m2:[{value:1},{value:1},{value:1},{value:1},{value:1}]},{date:"2021-01-01",autoid:100,sp:"<button>来了老弟</button>",imgs:["12321","https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"],m1:[{value:1},{value:1},{value:1},{value:1},{value:1}],m2:[{value:1},{value:1},{value:1},{value:1},{value:1}]}];var t=l({page:1,limit:10,total:100});return{tableData:e,tableHead:a,pageChange:function(){return console.log(t.value)},query:t,debounceSearchObj:{listener:"click",delay:1e3,cbk:console.log},uid:l(""),inputObj:{listener:"input",delay:100,cbk:console.log}}}})),b=p();t("data-v-56c3807b");var f={class:"filter-box"},y={class:"filter-item"},h={class:"filter-item"},_={class:"filter-item"},j={class:"filter-item"},q=m("查询"),x={style:{color:"cyan"}};u();var C=b((function(e,a,l,t,u,p){var m=n("el-input"),g=n("el-button"),C=n("el-table-column"),O=n("young-table"),U=n("young-pagination"),k=o("debounce"),w=o("throttle");return i(),r(s,null,[d("div",f,[d("div",y,[v(d(m,{modelValue:e.uid,"onUpdate:modelValue":a[1]||(a[1]=function(a){return e.uid=a}),placeholder:"请输入uid"},null,8,["modelValue"]),[[k,e.inputObj]])]),d("div",h,[d(m,{placeholder:"请输入手机号"})]),d("div",_,[d(m,{placeholder:"请输入姓名"})]),d("div",j,[v(d(g,{type:"primary"},{default:b((function(){return[q]})),_:1},512),[[w,e.debounceSearchObj]])])]),d(O,{class:"list","table-head":e.tableHead,"table-data":e.tableData,"table-height":700},{operate:b((function(){return[d(C,{label:"操作",fixed:"right",width:"120"},{default:b((function(e){return[d("div",x,"我是操作"+c(e.row.autoid),1)]})),_:1})]})),_:1},8,["table-head","table-data"]),d(U,{page:e.query.page,"onUpdate:page":a[2]||(a[2]=function(a){return e.query.page=a}),limit:e.query.limit,"onUpdate:limit":a[3]||(a[3]=function(a){return e.query.limit=a}),total:e.query.total,onPageChange:e.pageChange},null,8,["page","limit","total","onPageChange"])],64)}));g.render=C,g.__scopeId="data-v-56c3807b"}}}));