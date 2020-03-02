<template>
    <div>
        <div class="row">
            <div class="col-12">
                <router-link class="ssonav" v-bind:to="{ 'name': 'appRoleList', params:{ 'appId' : $route.params.appId }}">
                    <ArrowLeftBold class="icon-2x"></ArrowLeftBold>{{ appId }}
                </router-link>
            </div>
        </div>
        <form>
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" class="form-control" id="username" v-model="appUserRole.username" v-on:input="search"/>
            </div>
            <div v-for="appUser in appUserList" v-bind:key="'appUser' + appUser.id">
                <a href="#" v-on:click="(event) => {selectAppUser(event, appUser);}">{{appUser.username + ' ' + appUser.displayName}}</a>
            </div>
            <div class="form-group">
                <label for="appRole">AppRole</label>
                <input type="text" class="form-control" id="appRole" v-model="appUserRole.appRole"/>
            </div>
            <div class="row">
                <div class="col-12">
                    <a class="btn btn-primary" href="#" role="button" v-on:click="save">Save</a>
                    <router-link class="btn btn-default" role="button"
                                 v-bind:to="{ 'name': 'appRoleList', params:{ 'appId' : $route.params.appId }}">
                        Cancel
                    </router-link>
                </div>
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
    import 'bootstrap/dist/css/bootstrap.css';
    import ArrowLeftBold from 'vue-material-design-icons/ArrowLeftBold.vue';



    export default {
        name: 'AppRoleForm',
        data: function(){
            return{
                appId : null,
                appUserRole : {
                    appId:null,
                    username:null,
                    appRole:null,
                },
                axiosConfig: {
                    headers : {
                    },
                    data:{
                    }
                },
                appUserList:[],
                errors:[],
            }
        },
        mounted: function(){
            let self = this;
            self.axiosConfig.headers['Accept'] = 'application/json';
            self.axiosConfig.headers['Content-Type'] = 'application/json';
            self.appId = this.$route.params.appId;
            self.appUserRole.appId = this.$route.params.appId;

            axios.get('api/csrf-token', self.axiosConfig)
                .then(function (response) {
                    console.log(response);
                    self.axiosConfig.headers[response.data.csrf_header] = response.data.csrf_token;
                    self.fetchRecord();
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        methods: {
            fetchRecord: function () {
                let self = this;
                let id = this.$route.params.id;
                if (id !== 'new'){
                    axios.get('api/role/' + id, self.axiosConfig)
                        .then(function (response) {
                            console.log(response);
                            self.appUserRole = response.data;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            },
            selectAppUser(event, appUser){
                event.preventDefault();
                this.appUserRole.username = appUser.username;
                this.appUserList = [];
            },
            search: function () {
                let self = this;

                axios.get('api/appUserSearch?name=' + self.appUserRole.username, self.axiosConfig)
                    .then(function (response) {
                        console.log(response);
                        self.appUserList = response.data.content;
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
                axios.post('api/role/', self.appUserRole, self.axiosConfig)
                    .then(function (response) {
                        console.log(response.data);
                        self.$router.push({ name: 'appRoleList', params:{appId: self.appId}});
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            checkForm : function(){
                this.errors = [];
                let letterNumber = /^[0-9a-zA-Z]+$/;
                if (!letterNumber.test(this.appUserRole.username)) {
                    this.errors.push('username should only contain letter and number');
                }
                if (!letterNumber.test(this.appUserRole.appRole)) {
                    this.errors.push('appRole should only contain letter and number');
                }
                if (this.appUserRole.username === "" || this.appUserRole.username === null) {
                    this.errors.push('username could not empty');
                }
                if (this.appUserRole.appRole === "" || this.appUserRole.appRole === null) {
                    this.errors.push('appRole could not empty');
                }
            }
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
