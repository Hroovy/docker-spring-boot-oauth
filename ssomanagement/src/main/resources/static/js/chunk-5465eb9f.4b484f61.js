(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5465eb9f"],{"7bad":function(s,a,e){},a111:function(s,a,e){"use strict";e.d(a,"a",(function(){return o}));var t=e("bc3a"),r=e.n(t),o=function(){var s={headers:{},data:{}};return s.headers["Accept"]="application/json",s.headers["Content-Type"]="application/json",r.a.get("api/csrf-token",s).then((function(a){return console.log(a),s.headers[a.data.csrf_header]=a.data.csrf_token,s})).catch((function(s){return console.log(s),null}))}},c459:function(s,a,e){"use strict";var t=e("7bad"),r=e.n(t);r.a},e85b:function(s,a,e){"use strict";var t=function(s,a){var e=a._c;return e("span",a._g(a._b({staticClass:"material-design-icon arrow-left-bold-icon",class:[a.data.class,a.data.staticClass],attrs:{"aria-hidden":a.props.decorative,"aria-label":a.props.title,role:"img"}},"span",a.data.attrs,!1),a.listeners),[e("svg",{staticClass:"material-design-icon__svg",attrs:{fill:a.props.fillColor,width:a.props.size,height:a.props.size,viewBox:"0 0 24 24"}},[e("path",{attrs:{d:"M20,9V15H12V19.84L4.16,12L12,4.16V9H20Z"}},[e("title",[a._v(a._s(a.props.title))])])])])},r=[],o=(e("a9e3"),{name:"ArrowLeftBoldIcon",props:{title:{type:String,default:"Arrow Left Bold icon"},decorative:{type:Boolean,default:!1},fillColor:{type:String,default:"currentColor"},size:{type:Number,default:24}}}),n=o,i=e("2877"),p=Object(i["a"])(n,t,r,!0,null,null,null);a["a"]=p.exports},eca6:function(s,a,e){"use strict";e.r(a);var t=function(){var s=this,a=s.$createElement,e=s._self._c||a;return e("div",[e("div",{staticClass:"row"},[e("div",{staticClass:"col-12"},[e("router-link",{staticClass:"ssonav",attrs:{to:{name:"appUserList"}}},[e("ArrowLeftBold",{staticClass:"icon-2x"}),s._v(s._s(s.appId)+" ")],1)],1)]),e("form",[e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"username"}},[s._v("帳號")]),e("input",{directives:[{name:"model",rawName:"v-model",value:s.appUser.username,expression:"appUser.username"}],staticClass:"form-control",attrs:{type:"text",id:"username",disabled:""},domProps:{value:s.appUser.username},on:{input:function(a){a.target.composing||s.$set(s.appUser,"username",a.target.value)}}})]),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"displayName"}},[s._v("顯示名稱")]),e("input",{directives:[{name:"model",rawName:"v-model",value:s.appUser.displayName,expression:"appUser.displayName"}],staticClass:"form-control",attrs:{type:"text",id:"displayName"},domProps:{value:s.appUser.displayName},on:{input:function(a){a.target.composing||s.$set(s.appUser,"displayName",a.target.value)}}})]),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"password"}},[s._v("密碼")]),e("input",{directives:[{name:"model",rawName:"v-model",value:s.appUser.password,expression:"appUser.password"}],staticClass:"form-control",attrs:{type:"password",id:"password"},domProps:{value:s.appUser.password},on:{input:function(a){a.target.composing||s.$set(s.appUser,"password",a.target.value)}}})]),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"password"}},[s._v("密碼 (重複)")]),e("input",{directives:[{name:"model",rawName:"v-model",value:s.appUser.passwordAgain,expression:"appUser.passwordAgain"}],staticClass:"form-control",attrs:{type:"password",id:"password"},domProps:{value:s.appUser.passwordAgain},on:{input:function(a){a.target.composing||s.$set(s.appUser,"passwordAgain",a.target.value)}}})]),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"email"}},[s._v("email")]),e("input",{directives:[{name:"model",rawName:"v-model",value:s.appUser.email,expression:"appUser.email"}],staticClass:"form-control",attrs:{type:"email",id:"email"},domProps:{value:s.appUser.email},on:{input:function(a){a.target.composing||s.$set(s.appUser,"email",a.target.value)}}})]),e("div",{staticClass:"row"},[e("div",{staticClass:"col-12"},[e("a",{staticClass:"btn btn-primary",attrs:{href:"#",role:"button"},on:{click:s.save}},[s._v("Save")])])]),e("div",[s._v(" "+s._s(s.msg)+" ")]),s._l(s.errors,(function(a,t){return e("div",{key:t,staticClass:"row"},[e("div",{staticClass:"col-12 text-danger"},[s._v(" "+s._s(a)+" ")])])}))],2)])},r=[],o=e("bc3a"),n=e.n(o),i=e("a111"),p=(e("f9e3"),e("e85b")),l={name:"AppRoleFormSelf",data:function(){return{appId:null,appUser:{username:null,displayName:null,password:null,passwordAgain:null,email:null},axiosConfig:{headers:{},data:{}},msg:null,errors:[]}},mounted:function(){var s=this;Object(i["a"])().then((function(a){s.axiosConfig=a,s.fetchRecord()}))},methods:{fetchRecord:function(){var s=this;n.a.get("selfServiceApi/getAppUser",s.axiosConfig).then((function(a){console.log(a),s.appUser=a.data,s.appUser.password=null})).catch((function(s){console.log(s)}))},save:function(s){s.preventDefault();var a=this;a.checkForm(),a.errors.length>0||n.a.put("selfServiceApi/updateAppUser",a.appUser,a.axiosConfig).then((function(s){console.log(s.data),a.msg="Saved. You could close the page manually.",setTimeout((function(){a.msg=""}),5e3)})).catch((function(s){console.log(s),a.msg="Sever Error. please contact system admin.",setTimeout((function(){a.msg=""}),5e3)}))},closeTab:function(s){s.preventDefault(),window.close()},checkForm:function(){this.errors=[],""!==this.appUser.username&&null!==this.appUser.username||this.errors.push("username could not empty"),""!==this.appUser.displayName&&null!==this.appUser.displayName||this.errors.push("displayName could not empty"),null!==this.appUser.password&&""!==this.appUser.password&&this.appUser.password!==this.appUser.passwordAgain&&this.errors.push("password not match");var s=this.$route.params.id;"new"!==s||null!==this.appUser.password&&""!==this.appUser.password||this.errors.push("password cannot be empty")}},components:{ArrowLeftBold:p["a"]},watch:{$route:function(){this.appUserRole={appId:null,username:null,appRole:null},this.fetchRecord()}}},c=l,u=(e("c459"),e("2877")),d=Object(u["a"])(c,t,r,!1,null,null,null);a["default"]=d.exports}}]);
//# sourceMappingURL=chunk-5465eb9f.4b484f61.js.map