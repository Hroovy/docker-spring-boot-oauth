(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5465eb9f"],{"7bad":function(s,e,a){},a111:function(s,e,a){"use strict";a.d(e,"a",(function(){return o}));var t=a("bc3a"),r=a.n(t),o=function(){var s={headers:{},data:{}};return s.headers["Accept"]="application/json",s.headers["Content-Type"]="application/json",r.a.get("api/csrf-token",s).then((function(e){return console.log(e),s.headers[e.data.csrf_header]=e.data.csrf_token,s})).catch((function(s){return console.log(s),null}))}},c459:function(s,e,a){"use strict";var t=a("7bad"),r=a.n(t);r.a},e85b:function(s,e,a){"use strict";var t=function(s,e){var a=e._c;return a("span",e._g({staticClass:"material-design-icon arrow-left-bold-icon",class:[e.data.class,e.data.staticClass],attrs:{"aria-hidden":e.props.decorative,"aria-label":e.props.title,role:"img"}},e.listeners),[a("svg",{staticClass:"material-design-icon__svg",attrs:{fill:e.props.fillColor,width:e.props.size,height:e.props.size,viewBox:"0 0 24 24"}},[a("path",{attrs:{d:"M20,9V15H12V19.84L4.16,12L12,4.16V9H20Z"}},[a("title",[e._v(e._s(e.props.title))])])])])},r=[],o=(a("a9e3"),{name:"ArrowLeftBoldIcon",props:{title:{type:String,default:"Arrow Left Bold icon"},decorative:{type:Boolean,default:!1},fillColor:{type:String,default:"currentColor"},size:{type:Number,default:24}}}),n=o,i=a("2877"),p=Object(i["a"])(n,t,r,!0,null,null,null);e["a"]=p.exports},eca6:function(s,e,a){"use strict";a.r(e);var t=function(){var s=this,e=s.$createElement,a=s._self._c||e;return a("div",[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12"},[a("router-link",{staticClass:"ssonav",attrs:{to:{name:"appUserList"}}},[a("ArrowLeftBold",{staticClass:"icon-2x"}),s._v(s._s(s.appId)+" ")],1)],1)]),a("form",[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"username"}},[s._v("帳號")]),a("input",{directives:[{name:"model",rawName:"v-model",value:s.appUser.username,expression:"appUser.username"}],staticClass:"form-control",attrs:{type:"text",id:"username",disabled:""},domProps:{value:s.appUser.username},on:{input:function(e){e.target.composing||s.$set(s.appUser,"username",e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"displayName"}},[s._v("顯示名稱")]),a("input",{directives:[{name:"model",rawName:"v-model",value:s.appUser.displayName,expression:"appUser.displayName"}],staticClass:"form-control",attrs:{type:"text",id:"displayName"},domProps:{value:s.appUser.displayName},on:{input:function(e){e.target.composing||s.$set(s.appUser,"displayName",e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"password"}},[s._v("密碼")]),a("input",{directives:[{name:"model",rawName:"v-model",value:s.appUser.password,expression:"appUser.password"}],staticClass:"form-control",attrs:{type:"password",id:"password"},domProps:{value:s.appUser.password},on:{input:function(e){e.target.composing||s.$set(s.appUser,"password",e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"password"}},[s._v("密碼 (重複)")]),a("input",{directives:[{name:"model",rawName:"v-model",value:s.appUser.passwordAgain,expression:"appUser.passwordAgain"}],staticClass:"form-control",attrs:{type:"password",id:"password"},domProps:{value:s.appUser.passwordAgain},on:{input:function(e){e.target.composing||s.$set(s.appUser,"passwordAgain",e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"email"}},[s._v("email")]),a("input",{directives:[{name:"model",rawName:"v-model",value:s.appUser.email,expression:"appUser.email"}],staticClass:"form-control",attrs:{type:"email",id:"email"},domProps:{value:s.appUser.email},on:{input:function(e){e.target.composing||s.$set(s.appUser,"email",e.target.value)}}})]),a("div",{staticClass:"row"},[a("div",{staticClass:"col-12"},[a("a",{staticClass:"btn btn-primary",attrs:{href:"#",role:"button"},on:{click:s.save}},[s._v("Save")])])]),a("div",[s._v(" "+s._s(s.msg)+" ")]),s._l(s.errors,(function(e,t){return a("div",{key:t,staticClass:"row"},[a("div",{staticClass:"col-12 text-danger"},[s._v(" "+s._s(e)+" ")])])}))],2)])},r=[],o=a("bc3a"),n=a.n(o),i=a("a111"),p=(a("f9e3"),a("e85b")),l={name:"AppRoleFormSelf",data:function(){return{appId:null,appUser:{username:null,displayName:null,password:null,passwordAgain:null,email:null},axiosConfig:{headers:{},data:{}},msg:null,errors:[]}},mounted:function(){var s=this;Object(i["a"])().then((function(e){s.axiosConfig=e,s.fetchRecord()}))},methods:{fetchRecord:function(){var s=this;n.a.get("selfServiceApi/getAppUser",s.axiosConfig).then((function(e){console.log(e),s.appUser=e.data,s.appUser.password=null})).catch((function(s){console.log(s)}))},save:function(s){s.preventDefault();var e=this;e.checkForm(),e.errors.length>0||n.a.put("selfServiceApi/updateAppUser",e.appUser,e.axiosConfig).then((function(s){console.log(s.data),e.msg="Saved. You could close the page manually.",setTimeout((function(){e.msg=""}),5e3)})).catch((function(s){console.log(s),e.msg="Sever Error. please contact system admin.",setTimeout((function(){e.msg=""}),5e3)}))},closeTab:function(s){s.preventDefault(),window.close()},checkForm:function(){this.errors=[],""!==this.appUser.username&&null!==this.appUser.username||this.errors.push("username could not empty"),""!==this.appUser.displayName&&null!==this.appUser.displayName||this.errors.push("displayName could not empty"),null!==this.appUser.password&&""!==this.appUser.password&&this.appUser.password!==this.appUser.passwordAgain&&this.errors.push("password not match");var s=this.$route.params.id;"new"!==s||null!==this.appUser.password&&""!==this.appUser.password||this.errors.push("password cannot be empty")}},components:{ArrowLeftBold:p["a"]},watch:{$route:function(){this.appUserRole={appId:null,username:null,appRole:null},this.fetchRecord()}}},c=l,u=(a("c459"),a("2877")),d=Object(u["a"])(c,t,r,!1,null,null,null);e["default"]=d.exports}}]);
//# sourceMappingURL=chunk-5465eb9f.eb03fc1c.js.map