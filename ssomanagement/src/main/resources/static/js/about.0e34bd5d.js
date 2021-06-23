(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{"129f":function(e,t){e.exports=Object.is||function(e,t){return e===t?0!==e||1/e===1/t:e!=e&&t!=t}},"14c3":function(e,t,a){var r=a("c6b6"),i=a("9263");e.exports=function(e,t){var a=e.exec;if("function"===typeof a){var n=a.call(e,t);if("object"!==typeof n)throw TypeError("RegExp exec method returned something other than an Object or null");return n}if("RegExp"!==r(e))throw TypeError("RegExp#exec called on incompatible receiver");return i.call(e,t)}},"1d56":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-row",[a("el-col",{attrs:{span:24}},[a("h1",[e._v("User List")])])],1),a("hr"),a("el-button",{attrs:{type:"primary",icon:"el-icon-plus"},on:{click:e.addAppUser}},[e._v(" Add ")]),a("hr"),a("el-input",{attrs:{size:"mini",placeholder:"filter"},on:{change:e.search,keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.search.apply(null,arguments)}},model:{value:e.searchWords,callback:function(t){e.searchWords=t},expression:"searchWords"}}),a("el-table",{attrs:{data:e.appUserFilteredList,"default-sort":{prop:"username",order:"descending"}}},[a("el-table-column",{attrs:{fixed:"left",label:"Action",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return e.edit(t.row)}}},[a("i",{staticClass:"el-icon-edit"}),e._v(" Edit ")])]}}])}),a("el-table-column",{attrs:{prop:"username",label:"Username",width:"200",sortable:""}}),a("el-table-column",{attrs:{prop:"displayName",label:"User Display Name",width:"200",sortable:""}}),a("el-table-column",{attrs:{prop:"email",label:"Email",width:"200",sortable:""}}),a("el-table-column",{attrs:{label:"Active Status",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s("Y"==t.row.isActive?"Active":"Inactive")+" ")]}}])})],1),a("div",[a("app-user-form",{attrs:{dialogVisible:e.appUserFormShow,propAppUser:e.appUser},on:{closeAppUserForm:e.closeAppUserFormShow}})],1),a("delete-confirm-dialog",{attrs:{propDialogVisible:e.deleteConfirmShow,propDeleteMsg:e.deleteMsg},on:{cancelDelete:e.cancelDeleteAppUser,confirmDelete:e.confirmDeleteAppUser}})],1)},i=[],n=(a("4de4"),a("caad"),a("2532"),a("ac1f"),a("841c"),a("58d1")),l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:"Delete Confirm",visible:e.propDialogVisible,"close-on-press-escape":!0,"before-close":e.cancelHandler,width:"30%"},on:{"update:visible":function(t){e.propDialogVisible=t}}},[a("span",[e._v(e._s(this.propDeleteMsg))]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.cancelHandler}},[e._v("Cancel")]),a("el-button",{attrs:{type:"danger"},on:{click:e.deleteHandler}},[e._v("Delete")])],1)])},s=[],o={name:"DeleteConfirmDialog",props:{propDeleteMsg:String,propDialogVisible:Boolean},data:function(){return{}},methods:{cancelHandler:function(){this.$emit("cancelDelete")},deleteHandler:function(){this.$emit("confirmDelete")}}},p=o,c=a("2877"),u=Object(c["a"])(p,l,s,!1,null,null,null),d=u.exports,f=a("50ae"),m={name:"UserManagement",data:function(){return{appUserList:[],appUserFilteredList:[],appUser:{},appUserFormShow:!1,deleteConfirmShow:!1,deleteMsg:"",searchWords:"",axiosConfig:{},webApi:"/ssomanagement/"}},mounted:function(){this.axiosConfig=this.$store.state.axiosConfig,this.appUser=new f["a"],this.fetchRecord()},methods:{search:function(){var e=this;this.appUserFilteredList=this.appUserList.filter((function(t){return""==e.searchWords||(null!=t.username&&t.username.includes(e.searchWords)||null!=t.displayName&&t.displayName.includes(e.searchWords)||null!=t.email&&t.email.includes(e.searchWords))}))},fetchRecord:function(){var e=this;return this.$http.get(this.webApi+"api/appUsers",this.axiosConfig).then((function(t){console.log(t),e.appUserList=t.data,e.search()})).catch((function(e){console.log(e)}))},edit:function(e){this.appUser=e,this.appUser.password=null,this.appUserFormShow=!0},closeAppUserFormShow:function(e){!0===e&&this.fetchRecord(),this.appUserFormShow=!1},addAppUser:function(){this.appUser=new f["a"],this.appUserFormShow=!0},showDeleteAppUserDialog:function(e){this.deleteConfirmShow=!0,this.deleteMsg="Are you sure to delete record:"+e.username},cancelDeleteAppUser:function(){this.deleteConfirmShow=!1},confirmDeleteAppUser:function(){console.log("not implemented from backend"),this.deleteConfirmShow=!1}},components:{"app-user-form":n["a"],"delete-confirm-dialog":d}},h=m,g=Object(c["a"])(h,r,i,!1,null,"a6a95b88",null);t["default"]=g.exports},"42ba":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-row",[a("el-col",{attrs:{span:24}},[a("h1",[e._v("App List")])])],1),a("hr"),a("router-link",{attrs:{to:{name:"appDetailForm",params:{clientId:"new"}}}},[a("i",{staticClass:"el-icon-circle-plus"}),e._v("Add ")]),a("hr"),a("el-table",{attrs:{data:e.appList}},[a("el-table-column",{attrs:{fixed:"left",label:"Action",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.isAdmin()?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return e.edit(t.row)}}},[a("i",{staticClass:"el-icon-edit"}),e._v(" Edit ")]):e._e(),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return e.role(t.row)}}},[a("i",{staticClass:"el-icon-s-custom"}),e._v(" Role ")])]}}])}),a("el-table-column",{attrs:{prop:"clientId",label:"App Client Id",width:"300"}}),a("el-table-column",{attrs:{prop:"displayName",label:"App Display Name",width:"180"}})],1),a("hr"),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{layout:"prev, pager, next","current-page":e.pageNumber,count:e.totalElements,"page-count":e.totalPages},on:{"current-change":e.currentChange}})],1)],1)},i=[],n=function(e){var t;for(t=0;t<e.length;t++)if("ROLE_ADMIN"==e[t].authority)return!0;return!1},l={name:"AppList",data:function(){return{pageNumber:1,totalPages:1,totalElements:10,appList:[],axiosConfig:{headers:{},data:{}},loginInfo:{grantedAuthorities:[]},webApi:"/ssomanagement/"}},mounted:function(){this.axiosConfig=this.$store.state.axiosConfig,this.loginInfo=this.$store.state.loginInfo,null!=this.$route.query.pageNumber&&(this.pageNumber=parseInt(this.$route.query.pageNumber)),this.fetchRecord(this.pageNumber-1)},methods:{currentChange:function(e){console.log("event: "+e),this.fetchRecord(e-1)},fetchRecord:function(e){var t=this;this.$http.get(this.webApi+"api/app?pageNumber="+e,this.axiosConfig).then((function(e){console.log(e),t.appList=e.data.content,t.totalPages=e.data.totalPages,t.totalElements=e.data.totalElements})).catch((function(e){console.log(e)}))},isAdmin:function(){return n(this.loginInfo.grantedAuthorities)},updateAppName:function(e){this.$store.commit("updateAppName",e)},edit:function(e){this.$router.push({name:"appDetailForm",params:{clientId:e.clientId}})},role:function(e){this.$router.push({name:"appRoleManagement",params:{appId:e.clientId,appName:e.displayName}})}},watch:{$route:function(){this.fetchRecord()}}},s=l,o=a("2877"),p=Object(o["a"])(s,r,i,!1,null,"46704956",null);t["default"]=p.exports},"50ae":function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));var r=a("d4ec"),i=function e(){Object(r["a"])(this,e),this.id=null,this.username=null,this.password=null,this.email=null,this.display_name=null,this.isActive=null}},"58d1":function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-dialog",{attrs:{title:"App User",visible:e.dialogVisible,"close-on-press-escape":!0,"before-close":function(){e.close(!0)},width:"600px"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-form",{ref:"appUserForm",attrs:{model:e.appUser,rules:e.rules}},[a("el-form-item",{attrs:{label:"Username",prop:"username",required:""}},[a("el-input",{attrs:{disabled:null!=e.appUser.id},model:{value:e.appUser.username,callback:function(t){e.$set(e.appUser,"username",t)},expression:"appUser.username"}})],1),a("el-form-item",{attrs:{label:"Display Name",prop:"displayName"}},[a("el-input",{model:{value:e.appUser.displayName,callback:function(t){e.$set(e.appUser,"displayName",t)},expression:"appUser.displayName"}})],1),a("el-form-item",{attrs:{label:"Password",prop:"password"}},[a("el-input",{attrs:{type:"password"},model:{value:e.appUser.password,callback:function(t){e.$set(e.appUser,"password",t)},expression:"appUser.password"}})],1),a("el-form-item",{attrs:{label:"Password Again",prop:"passwordAgain"}},[a("el-input",{attrs:{type:"password"},model:{value:e.passwordAgain,callback:function(t){e.passwordAgain=t},expression:"passwordAgain"}})],1),a("el-form-item",{attrs:{label:"Email",prop:"email"}},[a("el-input",{model:{value:e.appUser.email,callback:function(t){e.$set(e.appUser,"email",t)},expression:"appUser.email"}})],1),a("el-form-item",{attrs:{label:"Active Status",prop:"isActive",required:""}},[a("el-select",{attrs:{placeholder:"select"},model:{value:e.appUser.isActive,callback:function(t){e.$set(e.appUser,"isActive",t)},expression:"appUser.isActive"}},[a("el-option",{attrs:{value:"Y",label:"Active"}},[e._v("Active")]),a("el-option",{attrs:{value:"N",label:"Inactive"}},[e._v("Inactive")])],1)],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(){e.close(!0)}}},[e._v("Cancel")]),a("el-button",{attrs:{type:"primary"},on:{click:e.save}},[e._v("Save")])],1)],1)],1)},i=[],n={name:"AppUserForm",props:{dialogVisible:Boolean,propAppUser:Object},data:function(){var e=this,t=function(e,t,a){var r=/^[0-9a-zA-Z]+$/;r.test(t)?a():a(new Error("should only contain letter and number"))},a=function(t,a,r){null!==a&&""!==a||null!=e.appUser.id?r():r(new Error("Password cannot be empty"))},r=function(t,a,r){null!=e.appUser.password&&""!=e.appUser.password&&e.passwordAgain!=e.appUser.password?r(new Error("Password not match!")):r()};return{appUser:{},rules:{username:[{required:!0,message:"value cannot be empty",trigger:"blur"},{validator:t,trigger:"blur"}],password:[{validator:a,trigger:"blur"}],passwordAgain:[{validator:r,trigger:"blur"}],isActive:[{required:!0,message:"value cannot be empty",trigger:"blur"}]},passwordAgain:null,filteredUsernameList:[],axiosConfig:{},webApi:"/ssomanagement/"}},computed:{},mounted:function(){this.appUser=Object.assign({},this.propAppUser),this.axiosConfig=this.$store.state.axiosConfig},methods:{close:function(e){this.$emit("closeAppUserForm",e)},save:function(e){var t=this;e.preventDefault(),this.$refs["appUserForm"].validate((function(e){if(!e)return console.log("error submit!!"),!1;t.$http.post(t.webApi+"api/appUser",t.appUser,t.axiosConfig).then((function(e){console.log(e.data),t.close(!0)})).catch((function(e){console.log(e)}))}))},back:function(e){e.preventDefault(),this.close(!1)}},components:{},watch:{propAppUser:function(e){this.appUser=Object.assign({},e),this.passwordAgain=null}}},l=n,s=a("2877"),o=Object(s["a"])(l,r,i,!1,null,null,null);t["a"]=o.exports},"6cb8":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-row",[a("el-col",{attrs:{span:24}},[a("router-link",{attrs:{to:{name:"AppManagement"}}},[a("i",{staticClass:"el-icon-caret-left"}),e._v(e._s(e.appDetail.displayName)+" ")])],1)],1),a("hr"),a("el-form",{ref:"appDetailForm",attrs:{model:e.appDetail,rules:e.rules}},[a("el-form-item",{attrs:{label:"clientId",prop:"clientId",required:""}},[a("el-input",{attrs:{type:"text"},model:{value:e.appDetail.clientId,callback:function(t){e.$set(e.appDetail,"clientId",t)},expression:"appDetail.clientId"}})],1),a("el-form-item",{attrs:{label:"displayName",prop:"displayName"}},[a("el-input",{attrs:{type:"text"},model:{value:e.appDetail.displayName,callback:function(t){e.$set(e.appDetail,"displayName",t)},expression:"appDetail.displayName"}})],1),a("el-form-item",{attrs:{label:"resourceIds",prop:"resourceIds"}},[a("el-input",{attrs:{type:"text"},model:{value:e.appDetail.resourceIds,callback:function(t){e.$set(e.appDetail,"resourceIds",t)},expression:"appDetail.resourceIds"}}),a("small",{attrs:{for:"resourceIds"}},[e._v("resourceIds (null or 'resource-server-rest-api')")])],1),a("el-form-item",{attrs:{label:"clientSecret",prop:"clientSecret",required:""}},[a("el-input",{attrs:{type:"password",disabled:""},model:{value:e.appDetail.clientSecret,callback:function(t){e.$set(e.appDetail,"clientSecret",t)},expression:"appDetail.clientSecret"}}),a("div",{directives:[{name:"show",rawName:"v-show",value:e.showClientSecret,expression:"showClientSecret"}]},[e._v(" new clientSecret will be saved : "+e._s(e.appDetail.clientSecret)+" ")])],1),null==e.appDetail.clientSecret||""==e.appDetail.clientSecret?a("el-button",{attrs:{type:"primary",href:"#regen"},on:{click:function(t){e.generatePassword(t,32)}}},[e._v(" generate ")]):a("el-button",{attrs:{type:"primary",href:"#regen"},on:{click:function(t){e.generatePassword(t,32)}}},[e._v(" reset ")]),a("el-form-item",{attrs:{label:"scope",prop:"scope",required:""}},[a("el-input",{model:{value:e.appDetail.scope,callback:function(t){e.$set(e.appDetail,"scope",t)},expression:"appDetail.scope"}}),a("small",[e._v("comma seperate, Supported value: read,write,full_user_list,user_management")])],1),a("el-form-item",{attrs:{label:"autoapprove",prop:"autoapprove",required:""}},[a("el-input",{model:{value:e.appDetail.autoapprove,callback:function(t){e.$set(e.appDetail,"autoapprove",t)},expression:"appDetail.autoapprove"}}),a("small",[e._v("comma seperate, Supported value: read,write,full_user_list,user_management")])],1),a("el-form-item",{attrs:{label:"authorizedGrantTypes",prop:"authorizedGrantTypes",required:""}},[a("el-input",{model:{value:e.appDetail.authorizedGrantTypes,callback:function(t){e.$set(e.appDetail,"authorizedGrantTypes",t)},expression:"appDetail.authorizedGrantTypes"}}),a("small",[e._v("comma seperate, Supported value: password,authorization_code,refresh_token,implicit,client_credentials")])],1),a("el-form-item",{attrs:{label:"webServerRedirectUri",prop:"webServerRedirectUri"}},[a("el-input",{attrs:{type:"text"},model:{value:e.appDetail.webServerRedirectUri,callback:function(t){e.$set(e.appDetail,"webServerRedirectUri",t)},expression:"appDetail.webServerRedirectUri"}}),a("small",[e._v("comma seperate")])],1),a("el-form-item",{attrs:{label:"authorities",prop:"authorities"}},[a("el-input",{attrs:{type:"text"},model:{value:e.appDetail.authorities,callback:function(t){e.$set(e.appDetail,"authorities",t)},expression:"appDetail.authorities"}}),a("small",[e._v("comma seperate")])],1),a("el-form-item",{attrs:{label:"accessTokenValidity",prop:"accessTokenValidity",required:""}},[a("el-input",{attrs:{type:"number",placeholder:"10800"},model:{value:e.appDetail.accessTokenValidity,callback:function(t){e.$set(e.appDetail,"accessTokenValidity",t)},expression:"appDetail.accessTokenValidity"}})],1),a("el-form-item",{attrs:{label:"refreshTokenValidity",prop:"refreshTokenValidity",required:""}},[a("el-input",{attrs:{type:"number",placeholder:"2592000"},model:{value:e.appDetail.refreshTokenValidity,callback:function(t){e.$set(e.appDetail,"refreshTokenValidity",t)},expression:"appDetail.refreshTokenValidity"}})],1),a("el-form-item",{attrs:{label:"additionalInformation",prop:"additionalInformation"}},[a("el-input",{attrs:{type:"text"},model:{value:e.appDetail.additionalInformation,callback:function(t){e.$set(e.appDetail,"additionalInformation",t)},expression:"appDetail.additionalInformation"}})],1),a("el-button",{attrs:{type:"primary"},on:{click:e.save}},[e._v("Save")]),a("el-button",{on:{click:e.back}},[e._v("Cancel")])],1)],1)},i=[],n={name:"AppDetailForm",data:function(){return{appDetail:{clientId:null,resourceIds:null,clientSecret:null,scope:null,authorizedGrantTypes:null,webServerRedirectUri:null,authorities:null,accessTokenValidity:10800,refreshTokenValidity:2592e3,additionalInformation:null,autoapprove:null,updateClientSecret:!1},showClientSecret:!1,webApi:"/ssomanagement/",rules:{clientId:[{required:!0,message:"value cannot be empty",trigger:"blur"}],clientSecret:[{required:!0,message:"value cannot be empty",trigger:"blur"}],scope:[{required:!0,message:"value cannot be empty",trigger:"blur"}],authorizedGrantTypes:[{required:!0,message:"value cannot be empty",trigger:"blur"}],accessTokenValidity:[{required:!0,message:"value cannot be empty",trigger:"blur"}],refreshTokenValidity:[{required:!0,message:"value cannot be empty",trigger:"blur"}]},axiosConfig:{}}},computed:{},mounted:function(){this.axiosConfig=this.$store.state.axiosConfig,this.fetchRecord()},methods:{generatePassword:function(e,t){e.preventDefault();for(var a="",r="ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnopqrstuvwxyz23456789",i=r.length,n=0;n<t;n++)a+=r.charAt(Math.floor(Math.random()*i));this.appDetail.clientSecret=a,this.appDetail.updateClientSecret=!0,this.showClientSecret=!0},fetchRecord:function(){var e=this,t=this.$route.params.clientId,a=this.$store.state.axiosConfig;"new"!==t&&this.$http.get(this.webApi+"api/app/"+t,a).then((function(t){e.appDetail=t.data,console.log(t.data)})).catch((function(e){console.log(e)}))},save:function(e){var t=this;e.preventDefault(),this.$refs["appDetailForm"].validate((function(e){if(!e)return console.log("error submit!!"),!1;t.$http.post(t.webApi+"api/app",t.appDetail,t.axiosConfig).then((function(e){console.log(e.data),t.backPage()})).catch((function(e){console.log(e)}))}))},back:function(e){e.preventDefault(),this.backPage()},backPage:function(){this.$router.go(-1)}},components:{},watch:{$route:function(){this.showClientSecret=!1,this.fetchRecord()}}},l=n,s=a("2877"),o=Object(s["a"])(l,r,i,!1,null,null,null);t["default"]=o.exports},"841c":function(e,t,a){"use strict";var r=a("d784"),i=a("825a"),n=a("1d80"),l=a("129f"),s=a("14c3");r("search",1,(function(e,t,a){return[function(t){var a=n(this),r=void 0==t?void 0:t[e];return void 0!==r?r.call(t,a):new RegExp(t)[e](String(a))},function(e){var r=a(t,e,this);if(r.done)return r.value;var n=i(e),o=String(this),p=n.lastIndex;l(p,0)||(n.lastIndex=0);var c=s(n,o);return l(n.lastIndex,p)||(n.lastIndex=p),null===c?-1:c.index}]}))},9263:function(e,t,a){"use strict";var r=a("ad6d"),i=a("9f7f"),n=a("5692"),l=RegExp.prototype.exec,s=n("native-string-replace",String.prototype.replace),o=l,p=function(){var e=/a/,t=/b*/g;return l.call(e,"a"),l.call(t,"a"),0!==e.lastIndex||0!==t.lastIndex}(),c=i.UNSUPPORTED_Y||i.BROKEN_CARET,u=void 0!==/()??/.exec("")[1],d=p||u||c;d&&(o=function(e){var t,a,i,n,o=this,d=c&&o.sticky,f=r.call(o),m=o.source,h=0,g=e;return d&&(f=f.replace("y",""),-1===f.indexOf("g")&&(f+="g"),g=String(e).slice(o.lastIndex),o.lastIndex>0&&(!o.multiline||o.multiline&&"\n"!==e[o.lastIndex-1])&&(m="(?: "+m+")",g=" "+g,h++),a=new RegExp("^(?:"+m+")",f)),u&&(a=new RegExp("^"+m+"$(?!\\s)",f)),p&&(t=o.lastIndex),i=l.call(d?a:o,g),d?i?(i.input=i.input.slice(h),i[0]=i[0].slice(h),i.index=o.lastIndex,o.lastIndex+=i[0].length):o.lastIndex=0:p&&i&&(o.lastIndex=o.global?i.index+i[0].length:t),u&&i&&i.length>1&&s.call(i[0],a,(function(){for(n=1;n<arguments.length-2;n++)void 0===arguments[n]&&(i[n]=void 0)})),i}),e.exports=o},"9f7f":function(e,t,a){"use strict";var r=a("d039");function i(e,t){return RegExp(e,t)}t.UNSUPPORTED_Y=r((function(){var e=i("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),t.BROKEN_CARET=r((function(){var e=i("^r","gy");return e.lastIndex=2,null!=e.exec("str")}))},ac1f:function(e,t,a){"use strict";var r=a("23e7"),i=a("9263");r({target:"RegExp",proto:!0,forced:/./.exec!==i},{exec:i})},ad6d:function(e,t,a){"use strict";var r=a("825a");e.exports=function(){var e=r(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},d4ec:function(e,t,a){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}a.d(t,"a",(function(){return r}))},d784:function(e,t,a){"use strict";a("ac1f");var r=a("6eeb"),i=a("9263"),n=a("d039"),l=a("b622"),s=a("9112"),o=l("species"),p=RegExp.prototype,c=!n((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")})),u=function(){return"$0"==="a".replace(/./,"$0")}(),d=l("replace"),f=function(){return!!/./[d]&&""===/./[d]("a","$0")}(),m=!n((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var a="ab".split(e);return 2!==a.length||"a"!==a[0]||"b"!==a[1]}));e.exports=function(e,t,a,d){var h=l(e),g=!n((function(){var t={};return t[h]=function(){return 7},7!=""[e](t)})),v=g&&!n((function(){var t=!1,a=/a/;return"split"===e&&(a={},a.constructor={},a.constructor[o]=function(){return a},a.flags="",a[h]=/./[h]),a.exec=function(){return t=!0,null},a[h](""),!t}));if(!g||!v||"replace"===e&&(!c||!u||f)||"split"===e&&!m){var b=/./[h],w=a(h,""[e],(function(e,t,a,r,n){var l=t.exec;return l===i||l===p.exec?g&&!n?{done:!0,value:b.call(t,a,r)}:{done:!0,value:e.call(a,t,r)}:{done:!1}}),{REPLACE_KEEPS_$0:u,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:f}),x=w[0],y=w[1];r(String.prototype,e,x),r(p,h,2==t?function(e,t){return y.call(e,this,t)}:function(e){return y.call(e,this)})}d&&s(p[h],"sham",!0)}}}]);
//# sourceMappingURL=about.0e34bd5d.js.map