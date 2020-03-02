<template>
    <div>
        <div class="row">
            <div class="col-12">
                <router-link class="ssonav" v-bind:to="{ 'name': 'appUserList' }">
                    <ArrowLeftBold class="icon-2x"></ArrowLeftBold>{{ appId }}
                </router-link>
            </div>
        </div>
        <form>
            <div class="form-group">
                <label for="username">帳號</label>
                <input type="text" class="form-control" id="username" v-model="appUser.username" disabled/>
            </div>
            <div class="form-group">
                <label for="displayName">顯示名稱</label>
                <input type="text" class="form-control" id="displayName" v-model="appUser.displayName"/>
            </div>
            <div class="form-group">
                <label for="password">密碼</label>
                <input type="password" class="form-control" id="password" v-model="appUser.password"/>
            </div>
            <div class="form-group">
                <label for="password">密碼 (重複)</label>
                <input type="password" class="form-control" id="password" v-model="appUser.passwordAgain"/>
            </div>
            <div class="form-group">
                <label for="email">email</label>
                <input type="email" class="form-control" id="email" v-model="appUser.email"/>
            </div>
            <div class="row">
                <div class="col-12">
                    <a class="btn btn-primary" href="#" role="button" v-on:click="save">Save</a>
                </div>
            </div>
            <div>
                {{ msg }}
            </div>
            <div class="row" v-bind:key="index" v-for="(error, index) in errors">
                <div class="col-12 text-danger">
                    {{ error }}
                </div>
            </div>
        </form>

    </div>
</template>
<style>
    .material-design-icon.icon-2x {
        height: 2em;
        width: 2em;
    }
    .material-design-icon.icon-2x > .material-design-icon__svg {
        height: 2em;
        width: 2em;
    }
</style>
<script>
    import axios from 'axios';
    import {getCSRFToken} from '@/utils/utilsFunction.js';
    import 'bootstrap/dist/css/bootstrap.css';
    import ArrowLeftBold from 'vue-material-design-icons/ArrowLeftBold.vue';

    export default {
        name: 'AppRoleFormSelf',
        data: function(){
            return{
                appId : null,
                appUser:{
                    username:null,
                    displayName:null,
                    password:null,
                    passwordAgain:null,
                    email:null,
                },
                axiosConfig: {
                    headers : {
                    },
                    data:{
                    }
                },
                msg : null,
                errors:[],
            }
        },
        mounted: function(){
            let self = this;
            getCSRFToken()
                .then(function (response) {
                    self.axiosConfig = response;
                    self.fetchRecord();
                });
        },
        methods: {
            fetchRecord: function () {
                let self = this;
                axios.get('selfServiceApi/getAppUser', self.axiosConfig)
                    .then(function (response) {
                        console.log(response);
                        self.appUser = response.data;
                        self.appUser.password = null;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            },
            save: function(event){
                event.preventDefault();
                let self = this;
                self.checkForm();
                if (self.errors.length > 0){
                    return;
                }
                axios.put('selfServiceApi/updateAppUser', self.appUser, self.axiosConfig)
                    .then(function (response) {
                        console.log(response.data);
                        self.msg = "Saved. You could close the page manually.";
                        setTimeout(() => {
                            self.msg = "";
                        }, 5000);
                    })
                    .catch(function (error) {
                        console.log(error);
                        self.msg = "Sever Error. please contact system admin.";
                        setTimeout(() => {
                            self.msg = "";
                        }, 5000);
                    });
            },
            closeTab : function (event) {
                event.preventDefault();
                window.close();
            },
            checkForm : function(){
                this.errors = [];
                if (this.appUser.username === "" || this.appUser.username === null) {
                    this.errors.push('username could not empty');
                }
                if (this.appUser.displayName === "" || this.appUser.displayName === null) {
                    this.errors.push('displayName could not empty');
                }
                // if (this.appUser.email === "" || this.appUser.email === null) {
                //     this.errors.push('email could not empty');
                // }
                if (this.appUser.password !== null && this.appUser.password !== "") {
                    if (this.appUser.password !== this.appUser.passwordAgain){
                        this.errors.push('password not match');
                    }
                }
                let id = this.$route.params.id;
                if (id === 'new' && (this.appUser.password === null || this.appUser.password === "") ){
                    this.errors.push('password cannot be empty');
                }
            },
        },
        components: {
            ArrowLeftBold,
        },
        watch:{
            '$route' (){
                this.appUserRole = {
                    appId:null,
                    username:null,
                    appRole:null,
                };
                this.fetchRecord();
            }
        },
    }
</script>
