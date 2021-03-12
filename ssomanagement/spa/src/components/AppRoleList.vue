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
        <div class="row">
            <div class="col-12">
                <h1>App Role List</h1>
            </div>
        </div>
        <hr/>
        <router-link v-bind:to="{ name: 'appRoleForm', params: {appId: $route.params.appId, id:'new'} } ">
            <PlusBoxIcon></PlusBoxIcon>Add
        </router-link>
        <hr/>
        <div class="row">
            <div class="col-md-3 table-header">

            </div>
            <div class="col-md-3 table-header">
                <div class="form-group">
                    <label for="filter.username">Username</label>
                    <input type="text" class="form-control" id="filter.username" placeholder="filter"
                        v-model="filter.username" v-on:change="(event)=>{fetchRecord();}">
                </div>
            </div>
            <div class="col-md-3 table-header">
                display name
            </div>
            <div class="col-md-3 table-header">
                <div class="form-group">
                    <label for="filter.appRole">Role</label>
                    <input type="text" class="form-control" id="filter.appRole" placeholder="filter"
                        v-model="filter.appRole" v-on:change="(event)=>{fetchRecord();}">
                </div>
            </div>
        </div>
        <hr/>
        <div v-bind:key="index" v-for="(appUserRole, index) in appUserRoleList">
            <div class="row top-buffer">
                <div class="col-md-3">
                    <router-link v-bind:to="{ name: 'appRoleForm', params: {appId: $route.params.appId, appName: appName, id: appUserRole.id} } "
                                 class="btn btn-primary mr-1" role="button"
                    >
                        Edit
                    </router-link>
                    <a class="btn btn-danger" href="#" v-on:click="(event) => {showPopup(event, appUserRole.username, appUserRole.appRole, appUserRole.id)}">Delete</a>
                </div>
                <div class="col-md-3">
                    {{ appUserRole.username }}
                </div>
                <div class="col-md-3">
                    {{ appUserMap[appUserRole.username].displayName }}
                </div>
                <div class="col-md-3">
                    {{ appUserRole.appRole }}
                </div>
            </div>
        </div>
        <hr/>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous" v-on:click="getPreviousPage">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </a>
                </li>
                <li class="page-item active">
                    <a class="page-link" href="#">{{pageNumber + 1}} <span class="sr-only">(current)</span></a>
                </li>
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next" v-on:click="getNextPage">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                    </a>
                </li>
            </ul>
        </nav>
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
    import ArrowLeftBold from 'vue-material-design-icons/ArrowLeftBold.vue';
    import PlusBoxIcon from 'vue-material-design-icons/PlusBox.vue';



    export default {
        name: 'AppRoleList',
        data: function(){
            return{
                appId : null,
                appUserRoleList : [],
                appUserMap : {},
                axiosConfig: {
                    headers : {
                    },
                    data:{
                    }
                },
                loginInfo: {},
                deleteMsg: null,
                deleteId: null,
                totalPages : 1,
                pageNumber: 0,
                pageSize: 10,
                forLoopCount: 0,
                filter:{
                    username:"",
                    appRole:"",
                },
            }
        },
        mounted: function(){
            let self = this;
            this.axiosConfig = this.$store.state.axiosConfig;
            this.loginInfo = this.$store.state.loginInfo;
            self.appId = this.$route.params.appId;
            self.fetchRecord();
        },
        computed: {
            appName: function(){
                return this.$route.params.appName;
            }
        },
        methods: {
            fetchRecord:function(){
                let self = this;
                axios.get("api/role?appId=" + self.appId + '&pageNumber=' + self.pageNumber + '&pageSize=' + self.pageSize 
                    + "&username=" + self.filter.username + "&appRole=" + self.filter.appRole, self.axiosConfig)
                    .then(function (response) {
                        console.log(response);
                        self.appUserRoleList = response.data.content;
                        self.totalPages = response.data.totalPages;
                        self.forLoopCount = 0;
                        self.appUserRoleList.forEach(function(appUserRole){
                            self.appUserMap[appUserRole.username] = { displayName : null };
                            axios.get("api/appUserByUsername/" + appUserRole.username, self.axiosConfig)
                                .then(function (response) {
                                    self.appUserMap[appUserRole.username] = response.data;
                                    self.forLoopCount += 1;
                                    if (self.forLoopCount >= self.appUserRoleList.length){
                                        self.$forceUpdate();
                                    }
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });
                        });
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
                this.deleteMsg = 'Are you sure to delete record:' + username + ' ' + role;
                this.deleteId = id;
                this.$bvModal.show('modal-1');
            },
            getPreviousPage: function(event){
                event.preventDefault();
                if (this.pageNumber > 0){
                    this.pageNumber = this.pageNumber - 1;
                    this.$router.push({ name: 'appRoleList', query: { appId: this.appId, pageNumber: this.pageNumber, pageSize: this.pageSize } });
                }
            },
            getNextPage: function(event){
                event.preventDefault();
                if (this.pageNumber < (this.totalPages -1)){
                    this.pageNumber = this.pageNumber + 1;
                    this.$router.push({ name: 'appRoleList', query: { appId: this.appId, pageNumber: this.pageNumber, pageSize: this.pageSize } });
                }
            },
        },
        components: {
            ArrowLeftBold,
            PlusBoxIcon,
        },
        watch:{
            '$route' (){
                this.fetchRecord();
            }
        },
    }
</script>
