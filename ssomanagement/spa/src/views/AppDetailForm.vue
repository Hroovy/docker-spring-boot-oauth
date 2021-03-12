<template>
    <div>
        <div class="row">
            <div class="col-12">
                <router-link class="ssonav" v-bind:to="{ name: 'appList' }">
                    <ArrowLeftBold class="icon-2x"></ArrowLeftBold>{{ appName }}
                </router-link>
            </div>
        </div>
        <hr/>
        <form>
            <div class="form-group">
                <label for="clientId">clientId</label>
                <input type="text" class="form-control" id="clientId" v-model="appDetail.clientId" required/>
            </div>
            <div class="form-group">
                <label for="displayName">displayName</label>
                <input type="text" class="form-control" id="displayName" v-model="appDetail.displayName" required/>
            </div>
            <div class="form-group">
                <label for="resourceIds">resourceIds</label>
                <input type="text" class="form-control" id="resourceIds" v-model="appDetail.resourceIds"/>
            </div>
            <div class="form-group">
                <label for="clientSecret">clientSecret</label>
                <input type="password" class="form-control" id="clientSecret" v-model="appDetail.clientSecret" disabled required/>
                <a v-if="appDetail.clientSecret == null || appDetail.clientSecret == ''" href="#regen" v-on:click="(event) => {generatePassword(event, 32);}">
                    generate
                </a>
                <a v-else href="#regen" v-on:click="(event) => {generatePassword(event, 32);}">
                    reset
                </a>
            </div>
            <div class="form-group" v-show="showClientSecret">
                <div>
                    new clientSecret will be saved : {{appDetail.clientSecret}}
                </div>
            </div>
            <div class="form-group">
                <label for="scope">scope (comma seperate)</label><br/>
                <small>Supported value: read,full_user_list,user_management</small>
                <input type="text" class="form-control" id="scope" v-model="appDetail.scope"/>
            </div>
            <div class="form-group">
                <label for="authorizedGrantTypes">authorizedGrantTypes (comma seperate)</label><br/>
                <small>Supported value: password,authorization_code,refresh_token,implicit,client_credentials</small>
                <input type="text" class="form-control" id="authorizedGrantTypes" v-model="appDetail.authorizedGrantTypes"/>
            </div>
            <div class="form-group">
                <label for="webServerRedirectUri">webServerRedirectUri (comma seperate)</label>
                <input type="text" class="form-control" id="webServerRedirectUri" v-model="appDetail.webServerRedirectUri"/>
            </div>
            <div class="form-group">
                <label for="authorities">authorities (comma seperate)</label>
                <input type="text" class="form-control" id="authorities" v-model="appDetail.authorities"/>
            </div>
            <div class="form-group">
                <label for="accessTokenValidity">accessTokenValidity</label>
                <input type="number" class="form-control" id="accessTokenValidity" v-model="appDetail.accessTokenValidity" placeholder="10800"/>
            </div>
            <div class="form-group">
                <label for="refreshTokenValidity">refreshTokenValidity</label>
                <input type="number" class="form-control" id="refreshTokenValidity" v-model="appDetail.refreshTokenValidity"  placeholder="2592000"/>
            </div>
            <div class="form-group">
                <label for="additionalInformation">additionalInformation</label>
                <input type="text" class="form-control" id="additionalInformation" v-model="appDetail.additionalInformation"/>
            </div>
            <div class="form-group">
                <label for="autoapprove">autoapprove</label><br/>
                <small>Supported value: read,full_user_list,user_management</small>
                <input type="text" class="form-control" id="autoapprove" v-model="appDetail.autoapprove"/>
            </div>
            <a class="btn btn-primary" role="button" href="#save" v-on:click="save">Save</a>
            <a class="btn btn-default" role="button" href="#save" v-on:click="back">Cancel</a>
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
    import ArrowLeftBold from 'vue-material-design-icons/ArrowLeftBold.vue';

    export default {
        name: 'AppDetailForm',
        data: function(){
            return {
                appDetail:{
                    clientId: null,
                    resourceIds: null,
                    clientSecret: null,
                    scope: null,
                    authorizedGrantTypes: null,
                    webServerRedirectUri: null,
                    authorities: null,
                    accessTokenValidity: 10800,
                    refreshTokenValidity: 2592000,
                    additionalInformation: null,
                    autoapprove: null,
                    updateClientSecret: false,
                },
                showClientSecret:false,
            };
        },
        computed: {
            appName: function(){
                return this.$route.params.appName;
            }
        },
        mounted: function(){
            this.fetchRecord();
        },
        methods: {
            getToken: function () {
                return this.$store.state.axiosConfig.headers['X-CSRF-TOKEN'];
            },
            checkForm : function(){
                this.errors = [];
                if (this.appDetail.clientId == null || this.appDetail.clientId == ""){
                    this.errors.push("clientId cannot be empty");
                }
                if (this.appDetail.resourceIds == null || this.appDetail.resourceIds == ""){
                    this.errors.push("resourceIds cannot be empty");
                }
                if (this.appDetail.clientSecret == null || this.appDetail.clientSecret == ""){
                    this.errors.push("clientSecret cannot be empty");
                }
                if (this.appDetail.scope == null || this.appDetail.scope == ""){
                    this.errors.push("scope cannot be empty");
                }
                if (this.appDetail.authorizedGrantTypes == null || this.appDetail.authorizedGrantTypes == ""){
                    this.errors.push("authorizedGrantTypes cannot be empty");
                }
                if (this.appDetail.accessTokenValidity == null || this.appDetail.accessTokenValidity == ""){
                    this.errors.push("accessTokenValidity cannot be empty");
                }
                if (this.appDetail.refreshTokenValidity == null || this.appDetail.refreshTokenValidity == ""){
                    this.errors.push("refreshTokenValidity cannot be empty");
                }
            },
            generatePassword(event, length){
                event.preventDefault();
                var result           = '';
                var characters       = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnopqrstuvwxyz23456789';
                var charactersLength = characters.length;
                for ( var i = 0; i < length; i++ ) {
                  result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                this.appDetail.clientSecret = result;
                this.appDetail.updateClientSecret = true;
                this.showClientSecret = true;
            },
            fetchRecord: function(){
                let clientId = this.$route.params.clientId;
                let axiosConfig = this.$store.state.axiosConfig;
                if (clientId !== 'new'){
                    axios.get('api/app/' + clientId, axiosConfig)
                        .then((response) => {
                            this.appDetail = response.data;
                            console.log(response.data);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            },
            save: function(event){
                event.preventDefault();
                let self = this;
                self.checkForm();
                if (self.errors.length > 0){
                    alert(this.errors.join("\n"));
                    return;
                }
                let axiosConfig = self.$store.state.axiosConfig;
                axios.post('api/app', self.appDetail, axiosConfig)
                    .then(function (response) {
                        console.log(response.data);
                        self.backPage();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            back(event){
                event.preventDefault();
                this.backPage();
            },
            backPage(){
                this.$router.go(-1);
            },
        },
        components: {
            ArrowLeftBold,
        },
        watch:{
            '$route' (){
                this.showClientSecret = false;
                this.fetchRecord();
            }
        },
    }
</script>
