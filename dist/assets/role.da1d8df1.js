var e=(e,l,a)=>new Promise(((o,d)=>{var t=e=>{try{s(a.next(e))}catch(l){d(l)}},i=e=>{try{s(a.throw(e))}catch(l){d(l)}},s=e=>e.done?o(e.value):Promise.resolve(e.value).then(t,i);s((a=a.apply(e,l)).next())}));import{e as l,_ as a,r as o,q as d,y as t,N as i,v as s,p as n,a as r,f as u,o as c,c as p,b as m,l as _,i as f,t as h,d as v}from"./index.cebbda02.js";import{b,c as y,f as V,h as w,i as I}from"./system.901b9ceb.js";import"./vendor.7f0cd297.js";var k=l({name:"Role",components:{YoungDialog:a},setup(){let l=o({autoid:0,role_name:"",role_desc:"",parent_role_id:0,is_enable:1,platform_type:0,role_access:""}),a=o([]),n=o([]),r=o(!1),u=o(!1),c=o(!1);const p=()=>e(this,null,(function*(){const e=yield b();a.value=t(e)}));d((()=>p()));const m=()=>{r.value=!1,u.value=!1,c.value=!1,l.value={autoid:0,role_name:"",role_desc:"",role_access:"",parent_role_id:0,is_enable:1,platform_type:0},a.value=[],p()},_=()=>e(this,null,(function*(){r.value?(yield w(l.value),s.success("角色添加成功！")):(yield I(l.value),s.success("角色修改成功！")),m()})),f=(e,l=!1)=>{0!==e.part.length&&e.part.forEach((a=>{l?a.is_checked?a.is_checked=!0:a.is_checked=!1:e.is_checked?a.is_checked=!0:a.is_checked=!1,f(a,l)}))},h=(e,l)=>{0!==e.length&&e.forEach((e=>{e.is_checked&&l.add(e.autoid),h(e.part,l)}))};return{tableData:a,nodeList:n,formInfo:l,isAddInfo:r,isEditInfo:u,isEditPriority:c,add:()=>e(this,null,(function*(){r.value=!0})),editInfo:e=>{l.value=e,u.value=!0},editPriority:a=>e(this,null,(function*(){const e=yield y(a.autoid);let o=yield e.nodeList;o.forEach((e=>{e.is_checked&&(e.is_checked=!0),f(e,!0)})),n.value=t(o),l.value=a,c.value=!0})),del:l=>{i.confirm("确认删除该角色？","提示",{type:"warning"}).then((()=>e(this,null,(function*(){yield V(l.autoid),s.success("删除成功！"),p()})))).catch((()=>null))},sure:_,clear:m,selectChange:f,surePriority:()=>{const e=new Set;h(n.value,e),l.value.role_access=[...e].join(","),_()}}}});const C=v();n("data-v-15e4ada8");const g={class:"index"},U={class:"caozuoFat"},F=f("添加角色"),E=f("信息编辑"),x=f("权限编辑"),P=f("删除"),j={class:"tjglyFat"},D={class:"disF"},S=m("span",null,"角色名称",-1),z={class:"disF"},L=m("span",null,"角色描述",-1),A={class:"disF"},q=m("span",null,"父级角色id",-1),H={class:"disF"},M=m("span",null,"禁用|启用",-1),N={class:"mar7"},R=f("禁用"),Y=f("启用"),B={class:"disF"},G=m("span",null,"选择后台",-1),J={class:"mar7"},K=f("管理后台"),O=f("商户后台"),Q={class:"tjglyFat checkssss pd"};r();const T=C(((e,l,a,o,d,t)=>{const i=u("el-button"),s=u("el-table-column"),n=u("el-switch"),r=u("el-table"),v=u("el-input"),b=u("el-radio"),y=u("young-dialog"),V=u("el-checkbox");return c(),p("div",g,[m("div",U,[m(i,{type:"primary",size:"small",plain:"",onClick:e.add},{default:C((()=>[F])),_:1},8,["onClick"])]),_(" 角色列表 "),m(r,{data:e.tableData,style:{width:"100%"},size:"medium",height:"700",class:"tableHet"},{default:C((()=>[m(s,{prop:"autoid",label:"ID"}),m(s,{prop:"parent_role_id",label:"父角色ID"}),m(s,{prop:"role_name",label:"角色名称"}),m(s,{prop:"role_desc",label:"角色描述"}),m(s,{label:"不启用/启用"},{default:C((e=>[m(n,{modelValue:e.row.is_enable,"onUpdate:modelValue":l=>e.row.is_enable=l,"active-value":1,"inactive-value":0,"active-color":"#409EFF","inactive-color":"#909399",disabled:""},null,8,["modelValue","onUpdate:modelValue"])])),_:1}),m(s,{label:"操作",width:"300"},{default:C((l=>[m(i,{onClick:a=>e.editInfo(l.row)},{default:C((()=>[E])),_:2},1032,["onClick"]),m(i,{onClick:a=>e.editPriority(l.row),type:"primary",plain:""},{default:C((()=>[x])),_:2},1032,["onClick"]),1!=+l.row.autoid?(c(),p(i,{key:0,type:"danger",onClick:a=>e.del(l.row)},{default:C((()=>[P])),_:2},1032,["onClick"])):_("v-if",!0)])),_:1})])),_:1},8,["data"]),_(" 信息 添加 | 编辑 "),m(y,{width:"370px","is-add":e.isAddInfo,"is-edit":e.isEditInfo,onSure:e.sure,onClear:e.clear},{body:C((()=>[m("div",j,[m("div",D,[S,m(v,{modelValue:e.formInfo.role_name,"onUpdate:modelValue":l[1]||(l[1]=l=>e.formInfo.role_name=l),class:"len"},null,8,["modelValue"])]),m("div",z,[L,m(v,{modelValue:e.formInfo.role_desc,"onUpdate:modelValue":l[2]||(l[2]=l=>e.formInfo.role_desc=l),class:"len"},null,8,["modelValue"])]),m("div",A,[q,m(v,{modelValue:e.formInfo.parent_role_id,"onUpdate:modelValue":l[3]||(l[3]=l=>e.formInfo.parent_role_id=l),modelModifiers:{number:!0},disabled:e.isEditInfo,class:"len"},null,8,["modelValue","disabled"])]),m("div",H,[M,m("div",N,[m(b,{modelValue:e.formInfo.is_enable,"onUpdate:modelValue":l[4]||(l[4]=l=>e.formInfo.is_enable=l),label:0},{default:C((()=>[R])),_:1},8,["modelValue"]),m(b,{modelValue:e.formInfo.is_enable,"onUpdate:modelValue":l[5]||(l[5]=l=>e.formInfo.is_enable=l),label:1},{default:C((()=>[Y])),_:1},8,["modelValue"])])]),m("div",B,[G,m("div",J,[m(b,{modelValue:e.formInfo.platform_type,"onUpdate:modelValue":l[6]||(l[6]=l=>e.formInfo.platform_type=l),label:0},{default:C((()=>[K])),_:1},8,["modelValue"]),m(b,{modelValue:e.formInfo.platform_type,"onUpdate:modelValue":l[7]||(l[7]=l=>e.formInfo.platform_type=l),label:1},{default:C((()=>[O])),_:1},8,["modelValue"])])])])])),_:1},8,["is-add","is-edit","onSure","onClear"]),_(" 权限编辑 "),m(y,{width:"60vw",top:"10vh","is-edit":e.isEditPriority,onSure:e.surePriority,onClear:e.clear},{body:C((()=>[m("div",Q,[m(r,{data:e.nodeList,style:{width:"100%","margin-bottom":"20px"},"row-key":"autoid","default-expand-all":!1,size:"medium","tree-props":{children:"part",hasChildren:"hasChildren"}},{default:C((()=>[m(s,{prop:"node_name",label:"节点名称",width:"240"},{default:C((l=>[m(V,{modelValue:l.row.is_checked,"onUpdate:modelValue":e=>l.row.is_checked=e,onChange:a=>e.selectChange(l.row)},{default:C((()=>[f(h(l.row.node_name),1)])),_:2},1032,["modelValue","onUpdate:modelValue","onChange"])])),_:1}),m(s,{prop:"autoid",label:"ID"}),m(s,{prop:"parent_id",label:"父节点"}),m(s,{prop:"node_path",label:"路径"}),m(s,{prop:"node_desc",label:"节点描述"}),m(s,{prop:"is_show",label:"隐藏/显示"},{default:C((e=>[m(n,{modelValue:e.row.is_show,"onUpdate:modelValue":l=>e.row.is_show=l,"active-value":1,"inactive-value":0,"active-color":"#409EFF","inactive-color":"#909399",disabled:""},null,8,["modelValue","onUpdate:modelValue"])])),_:1}),m(s,{prop:"node_type",label:"节点级别"})])),_:1},8,["data"])])])),_:1},8,["is-edit","onSure","onClear"])])}));k.render=T,k.__scopeId="data-v-15e4ada8";export default k;