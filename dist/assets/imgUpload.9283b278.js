import{d as e,r as a,s as t,u as l,Q as n,p as s,k as i,a as o,b as u,e as d,g as r,q as c,h as m,i as p,F as g,f as v,v as f,x as h,y,l as k,z as b}from"./index.7fcd9f87.js";import"./vendor.aa8a50cd.js";var x=e({name:"YoungImgUpload",props:{limit:{type:Number,default:10},comTask:{type:Object,default:()=>({})},imgs:{type:Object,required:!0},showUpload:{type:Boolean,default:!0}},emits:["update:imgs","did"],setup(e,{emit:s}){let i=a(!1),o=a(!1),u=a(0),d=a(0),r="";const c=a(null),m=[],p=()=>o.value=!1;t((()=>o.value),(e=>{e?document.body.addEventListener("click",p):document.body.removeEventListener("click",p)}));const g=a=>{var t;const l=null!=(t=a.target.files)?t:[];e.imgs.length+l.length>e.limit?n.warning(`最多只能上传${e.limit}张`):s("update:imgs",e.imgs.concat(Array.from(l).map((e=>(m.push(e),URL.createObjectURL(e))))))};return{addedListener:i,visible:o,top:u,left:d,toBeDel:r,imgRef:c,choseImg:()=>{!i.value&&c.value.addEventListener("change",g)&&(i.value=!0),c.value.click()},openMenu:(e,a)=>{r=a;d.value=e.clientX-105-120,u.value=e.clientY,o.value=!0},del:()=>{const a=e.imgs.indexOf(r);m.splice(a,1),e.imgs.splice(a,1),s("update:imgs",e.imgs),o.value=!1},uploadHandler:()=>{return a=this,t=null,n=function*(){const a=new FormData;m.forEach(((e,t)=>a.append("img"+t,e)));const t=yield l(e.comTask,a);s("did",t)},new Promise(((e,l)=>{var s=e=>{try{o(n.next(e))}catch(a){l(a)}},i=e=>{try{o(n.throw(e))}catch(a){l(a)}},o=a=>a.done?e(a.value):Promise.resolve(a.value).then(s,i);o((n=n.apply(a,t)).next())}));var a,t,n}}}});const w=k("data-v-6e5f80a4");s("data-v-6e5f80a4");const U={class:"upload"},C=c("上传");i();const I=w(((e,a,t,l,n,s)=>{const i=o("el-button"),k=o("el-image");return u(),d("div",U,[r("input",{ref:"imgRef",type:"file",name:"img",multiple:e.limit>1,hidden:""},null,8,["multiple"]),r("div",null,[e.showUpload?(u(),d(i,{key:0,type:"primary",icon:"el-icon-picture",disabled:e.imgs.length>=10,onClick:e.choseImg},{default:w((()=>[c(" 点击选取图片（不超过"+m(e.limit)+"张） ",1)])),_:1},8,["disabled","onClick"])):p("",!0),r(i,{type:"success",icon:"el-icon-upload",onClick:e.uploadHandler},{default:w((()=>[C])),_:1},8,["onClick"])]),(u(!0),d(g,null,v(e.imgs,((a,t)=>(u(),d(k,{key:a+"9527"+t,src:a,"preview-src-list":e.imgs,lazy:"",class:"img",onContextmenu:f((t=>e.openMenu(t,a)),["prevent"])},null,8,["src","preview-src-list","onContextmenu"])))),128)),h(r("ul",{style:{left:e.left+"px",top:e.top+"px"},class:"contextmenu"},[r("li",{onClick:a[1]||(a[1]=(...a)=>e.del&&e.del(...a))},"删除")],4),[[y,e.visible]])])}));x.render=I,x.__scopeId="data-v-6e5f80a4";var L=e({name:"ImgUpload",components:{YoungImgUpload:x},setup(){let e=a([]),t=a([]);for(let a=0;a<100;a++)t.value.push({top:100+Math.floor(600*Math.random()),start:1700+Math.floor(3e3*Math.random()),color:"gray"});return{danmus:t,imgs:e}}});L.render=function(e,a,t,l,n,s){const i=o("young-img-upload"),c=b("pin");return u(),d(g,null,[(u(!0),d(g,null,v(e.danmus,((e,a)=>(u(),d("div",{key:a},[h(r("h1",null,"来了老弟"+m(a),513),[[c,e]])])))),128)),r(i,{imgs:e.imgs,"onUpdate:imgs":a[1]||(a[1]=a=>e.imgs=a)},null,8,["imgs"])],64)};export default L;
