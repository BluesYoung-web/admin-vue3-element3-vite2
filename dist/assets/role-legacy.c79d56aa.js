function asyncGeneratorStep(e,n,t,a,r,o,l){try{var i=e[o](l),u=i.value}catch(d){return void t(d)}i.done?n(u):Promise.resolve(u).then(a,r)}function _asyncToGenerator(e){return function(){var n=this,t=arguments;return new Promise((function(a,r){var o=e.apply(n,t);function l(e){asyncGeneratorStep(o,a,r,l,i,"next",e)}function i(e){asyncGeneratorStep(o,a,r,l,i,"throw",e)}l(void 0)}))}}var __vite_style__=document.createElement("style");__vite_style__.innerHTML=".index .tjglyFat .disF[data-v-15e4ada8]{margin-bottom:10px;display:flex}.index .tjglyFat .disF>span[data-v-15e4ada8]{width:80px;min-width:80px;line-height:32px;text-align:right;margin-right:15px}.index .tjglyFat .disF .switchTop[data-v-15e4ada8]{margin-top:6px}.index .tjglyFat .el-input__suffix-inner[data-v-15e4ada8]{margin-right:0!important}.index .tjglyFat .mar7[data-v-15e4ada8]{margin-top:7px}.checkssss .el-checkbox__label[data-v-15e4ada8]{color:#606266!important}.len[data-v-15e4ada8]{width:220px}.pd[data-v-15e4ada8]{height:60vh;overflow:auto}",document.head.appendChild(__vite_style__),System.register(["./index-legacy.4747de0e.js","./system-legacy.e7e5130d.js","./vendor-legacy.68531bbe.js"],(function(e){"use strict";var n,t,a,r,o,l,i,u,d,c,s,f,p,m,_,v,h,y,b,g,w,x;return{setters:[function(e){n=e.e,t=e._,a=e.r,r=e.n,o=e.x,l=e.y,i=e.Q,u=e.p,d=e.a,c=e.f,s=e.o,f=e.c,p=e.b,m=e.l,_=e.i,v=e.t,h=e.d},function(e){y=e.b,b=e.c,g=e.f,w=e.h,x=e.i},function(){}],execute:function(){var V=e("default",n({name:"Role",components:{YoungDialog:t},setup:function(){var e=a({autoid:0,role_name:"",role_desc:"",parent_role_id:0,is_enable:1,platform_type:0,role_access:""}),n=a([]),t=a([]),u=a(!1),d=a(!1),c=a(!1),s=function(){var e=_asyncToGenerator(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y();case 2:t=e.sent,n.value=o(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();r((function(){return s()}));var f=function(){var e=_asyncToGenerator(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:u.value=!0;case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),p=function(){var n=_asyncToGenerator(regeneratorRuntime.mark((function n(a){var r,l;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,b(a.autoid);case 2:return r=n.sent,n.next=5,r.nodeList;case 5:(l=n.sent).forEach((function(e){e.is_checked&&(e.is_checked=!0),v(e,!0)})),t.value=o(l),e.value=a,c.value=!0;case 10:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}(),m=function(){u.value=!1,d.value=!1,c.value=!1,e.value={autoid:0,role_name:"",role_desc:"",role_access:"",parent_role_id:0,is_enable:1,platform_type:0},n.value=[],s()},_=function(){var n=_asyncToGenerator(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!u.value){n.next=6;break}return n.next=3,w(e.value);case 3:i.success("角色添加成功！"),n.next=9;break;case 6:return n.next=8,x(e.value);case 8:i.success("角色修改成功！");case 9:m();case 10:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}(),v=function e(n,t){void 0===t&&(t=!1),0!==n.part.length&&n.part.forEach((function(a){t?a.is_checked?a.is_checked=!0:a.is_checked=!1:n.is_checked?a.is_checked=!0:a.is_checked=!1,e(a,t)}))},h=function e(n,t){0!==n.length&&n.forEach((function(n){n.is_checked&&t.add(n.autoid),e(n.part,t)}))};return{tableData:n,nodeList:t,formInfo:e,isAddInfo:u,isEditInfo:d,isEditPriority:c,add:f,editInfo:function(n){e.value=n,d.value=!0},editPriority:p,del:function(e){l.confirm("确认删除该角色？","提示",{type:"warning"}).then(_asyncToGenerator(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,g(e.autoid);case 2:i.success("删除成功！"),s();case 4:case"end":return n.stop()}}),n)})))).catch((function(){return null}))},sure:_,clear:m,selectChange:v,surePriority:function(){var n=new Set;h(t.value,n),e.value.role_access=[].concat(n).join(","),_()}}}})),k=h("data-v-15e4ada8");u("data-v-15e4ada8");var I={class:"index"},F={class:"caozuoFat"},C=_("添加角色"),U=_("信息编辑"),j=_("权限编辑"),E=_("删除"),R={class:"tjglyFat"},G={class:"disF"},S=p("span",null,"角色名称",-1),P={class:"disF"},T=p("span",null,"角色描述",-1),D={class:"disF"},z=p("span",null,"父级角色id",-1),L={class:"disF"},A=p("span",null,"禁用|启用",-1),H={class:"mar7"},M=_("禁用"),Q=_("启用"),Y={class:"disF"},q=p("span",null,"选择后台",-1),B={class:"mar7"},J=_("管理后台"),K=_("商户后台"),N={class:"tjglyFat checkssss pd"};d();var O=k((function(e,n,t,a,r,o){var l=c("el-button"),i=c("el-table-column"),u=c("el-switch"),d=c("el-table"),h=c("el-input"),y=c("el-radio"),b=c("young-dialog"),g=c("el-checkbox");return s(),f("div",I,[p("div",F,[p(l,{type:"primary",size:"small",plain:"",onClick:e.add},{default:k((function(){return[C]})),_:1},8,["onClick"])]),m(" 角色列表 "),p(d,{data:e.tableData,style:{width:"100%"},size:"medium",height:"700",class:"tableHet"},{default:k((function(){return[p(i,{prop:"autoid",label:"ID"}),p(i,{prop:"parent_role_id",label:"父角色ID"}),p(i,{prop:"role_name",label:"角色名称"}),p(i,{prop:"role_desc",label:"角色描述"}),p(i,{label:"不启用/启用"},{default:k((function(e){return[p(u,{modelValue:e.row.is_enable,"onUpdate:modelValue":function(n){return e.row.is_enable=n},"active-value":1,"inactive-value":0,"active-color":"#409EFF","inactive-color":"#909399",disabled:""},null,8,["modelValue","onUpdate:modelValue"])]})),_:1}),p(i,{label:"操作",width:"300"},{default:k((function(n){return[p(l,{onClick:function(t){return e.editInfo(n.row)}},{default:k((function(){return[U]})),_:2},1032,["onClick"]),p(l,{onClick:function(t){return e.editPriority(n.row)},type:"primary",plain:""},{default:k((function(){return[j]})),_:2},1032,["onClick"]),1!=+n.row.autoid?(s(),f(l,{key:0,type:"danger",onClick:function(t){return e.del(n.row)}},{default:k((function(){return[E]})),_:2},1032,["onClick"])):m("v-if",!0)]})),_:1})]})),_:1},8,["data"]),m(" 信息 添加 | 编辑 "),p(b,{width:"370px","is-add":e.isAddInfo,"is-edit":e.isEditInfo,onSure:e.sure,onClear:e.clear},{body:k((function(){return[p("div",R,[p("div",G,[S,p(h,{modelValue:e.formInfo.role_name,"onUpdate:modelValue":n[1]||(n[1]=function(n){return e.formInfo.role_name=n}),class:"len"},null,8,["modelValue"])]),p("div",P,[T,p(h,{modelValue:e.formInfo.role_desc,"onUpdate:modelValue":n[2]||(n[2]=function(n){return e.formInfo.role_desc=n}),class:"len"},null,8,["modelValue"])]),p("div",D,[z,p(h,{modelValue:e.formInfo.parent_role_id,"onUpdate:modelValue":n[3]||(n[3]=function(n){return e.formInfo.parent_role_id=n}),modelModifiers:{number:!0},disabled:e.isEditInfo,class:"len"},null,8,["modelValue","disabled"])]),p("div",L,[A,p("div",H,[p(y,{modelValue:e.formInfo.is_enable,"onUpdate:modelValue":n[4]||(n[4]=function(n){return e.formInfo.is_enable=n}),label:0},{default:k((function(){return[M]})),_:1},8,["modelValue"]),p(y,{modelValue:e.formInfo.is_enable,"onUpdate:modelValue":n[5]||(n[5]=function(n){return e.formInfo.is_enable=n}),label:1},{default:k((function(){return[Q]})),_:1},8,["modelValue"])])]),p("div",Y,[q,p("div",B,[p(y,{modelValue:e.formInfo.platform_type,"onUpdate:modelValue":n[6]||(n[6]=function(n){return e.formInfo.platform_type=n}),label:0},{default:k((function(){return[J]})),_:1},8,["modelValue"]),p(y,{modelValue:e.formInfo.platform_type,"onUpdate:modelValue":n[7]||(n[7]=function(n){return e.formInfo.platform_type=n}),label:1},{default:k((function(){return[K]})),_:1},8,["modelValue"])])])])]})),_:1},8,["is-add","is-edit","onSure","onClear"]),m(" 权限编辑 "),p(b,{width:"60vw",top:"10vh","is-edit":e.isEditPriority,onSure:e.surePriority,onClear:e.clear},{body:k((function(){return[p("div",N,[p(d,{data:e.nodeList,style:{width:"100%","margin-bottom":"20px"},"row-key":"autoid","default-expand-all":!1,size:"medium","tree-props":{children:"part",hasChildren:"hasChildren"}},{default:k((function(){return[p(i,{prop:"node_name",label:"节点名称",width:"240"},{default:k((function(n){return[p(g,{modelValue:n.row.is_checked,"onUpdate:modelValue":function(e){return n.row.is_checked=e},onChange:function(t){return e.selectChange(n.row)}},{default:k((function(){return[_(v(n.row.node_name),1)]})),_:2},1032,["modelValue","onUpdate:modelValue","onChange"])]})),_:1}),p(i,{prop:"autoid",label:"ID"}),p(i,{prop:"parent_id",label:"父节点"}),p(i,{prop:"node_path",label:"路径"}),p(i,{prop:"node_desc",label:"节点描述"}),p(i,{prop:"is_show",label:"隐藏/显示"},{default:k((function(e){return[p(u,{modelValue:e.row.is_show,"onUpdate:modelValue":function(n){return e.row.is_show=n},"active-value":1,"inactive-value":0,"active-color":"#409EFF","inactive-color":"#909399",disabled:""},null,8,["modelValue","onUpdate:modelValue"])]})),_:1}),p(i,{prop:"node_type",label:"节点级别"})]})),_:1},8,["data"])])]})),_:1},8,["is-edit","onSure","onClear"])])}));V.render=O,V.__scopeId="data-v-15e4ada8"}}}));
