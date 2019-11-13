<template>
    <div>
        <div class="row">
            <div class="col-12">
                <router-link class="ssonav" v-bind:to="{ name: 'appList' }">
                    <HomeIcon class="icon-2x"></HomeIcon>{{ appId }}
                </router-link>
            </div>
        </div>
        <hr/>
        <router-link v-bind:to="{ name: 'appRoleForm', params: {appId: $route.params.appId, id:'new'} } ">
            <PlusBoxIcon></PlusBoxIcon>Add
        </router-link>
        <div class="row">
            <div class="col-md-2 table-header">

            </div>
            <div class="col-md-5 table-header">
                Username
            </div>
            <div class="col-md-5 table-header">
                Role
            </div>
        </div>
        <div v-bind:key="index" v-for="(appUserRole, index) in appUserRoleList">
            <div class="row top-buffer">
                <div class="col-md-2">
                    <router-link v-bind:to="{ name: 'appRoleForm', params: {appId: $route.params.appId, id:appUserRole.id} } "
                                 class="btn btn-primary" role="button"
                    >
                        Edit
                    </router-link>
                    <a class="btn btn-danger" href="#" v-on:click="(event) => {showPopup(event, appUserRole.username, appUserRole.appRole, appUserRole.id)}">Delete</a>
                </div>
                <div class="col-md-5">
                    {{ appUserRole.username }}
                </div>
                <div class="col-md-5">
                    {{ appUserRole.appRole }}
                </div>
            </div>
        </div>
        <div>
            <b-modal id="modal-1" title="BootstrapVue">
                <p class="my-4">{{deleteMsg}}</p>
                <template v-slot:modal-footer="{ ok, cancel }">
                    <b-button size="sm" variant="default" @click="cancel()">
                        Cancel
                    </b-button>
                    <b-button size="sm" variant="danger" @click="deleteAppUserRole">
                        Delete
                    </b-button>
                </template>
            </b-modal>
        </div>
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
    import HomeIcon from 'vue-material-design-icons/Home.vue';
    import PlusBoxIcon from 'vue-material-design-icons/PlusBox.vue';



    export default {
        name: 'AppRoleList',
        data: function(){
            return{
                appId : null,
                appUserRoleList : [],
                axiosConfig: {
                    headers : {
                    },
                    data:{
                    }
                },
                deleteMsg: null,
                deleteId: null,
            }
        },
        mounted: function(){
            let self = this;
            self.axiosConfig.headers['Accept'] = 'application/json';
            self.axiosConfig.headers['Content-Type'] = 'application/json';
            self.appId = this.$route.params.appId;

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
            fetchRecord:function(){
                let self = this;
                axios.get("api/role?appId=" + self.appId, self.axiosConfig)
                    .then(function (response) {
                        console.log(response);
                        self.appUserRoleList = response.data.content;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            deleteAppUserRole: function(){
                let self = this;
                axios.delete("api/role/" + self.deleteId, self.axiosConfig)
                    .then(function (response){
                        console.log("delete return");
                        console.log(response);
                        self.fetchRecord();
                        self.$bvModal.hide('modal-1');
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            showPopup: function(event, username, role, id){
                event.preventDefault();
                console.log(event);
                this.deleteMsg = 'Are you sure to delete record:' + username + '-' + role;
                this.deleteId = id;
                this.$bvModal.show('modal-1');
            },
        },
        components: {
            HomeIcon,
            PlusBoxIcon,
        },
        watch:{
            '$route' (){
                this.fetchRecord();
            }
        },
    }
</script>
