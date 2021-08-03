<template>
    <div>
        <el-row>
            <el-col :span="24">
                <router-link v-bind:to="{ name: 'AppManagement' }">
                    <i class="el-icon-caret-left"></i>{{appName}}
                </router-link>
            </el-col>
        </el-row>
        <hr/>
        <el-row>
            <el-col :span="24">
                <h1>App Role List</h1>
            </el-col>
        </el-row>
        <hr/>
        <el-button type="primary" icon="el-icon-plus" v-on:click="addAppUserRole">
            Add
        </el-button>
        <hr/>
        <el-input v-model="searchWords"
            v-on:change="search" v-on:keyup.enter="search" size="mini" placeholder="filter"
        ></el-input>
        <el-table :data="appUserRoleFilteredList" :default-sort="{prop:'username', order: 'descending'}">
            <el-table-column
                fixed="left"
                label="Action"
                width="150">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" type="text" size="small">
                        <i class="el-icon-edit"></i> Edit
                    </el-button>
                    <el-button @click="deleteConfirm(scope.row)" type="text" size="small">
                        <i class="el-icon-s-custom"></i> Delete
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column
                prop="username"
                label="Username"
                width="200"
                sortable
            >
            </el-table-column>
            <el-table-column
                prop="displayName"
                label="User Display Name"
                width="200"
                sortable
            >
            </el-table-column>
            <el-table-column
                prop="email"
                label="Email"
                width="200"
                sortable
            >
            </el-table-column>
            <el-table-column
                prop="appRole"
                label="App Role"
                width="200"
                sortable
            >
            </el-table-column>
        </el-table>
        <hr/>
        <div>
            <el-dialog
                title="Delete Confirm"
                :visible.sync="dialogVisible"
                width="30%">
                <span>{{this.deleteMsg}}</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="deleteAppUserRole">Delete</el-button>
                </span>
            </el-dialog>
        </div>
        <div>
            <app-role-form
                :dialogVisible="appRoleFormShow"
                @closeAppRoleForm="closeAppRoleFormShow"
                :propAppUserRole="appUserRole"
            ></app-role-form>
        </div>
    </div>
</template>
<style>
</style>
<script>
    import AppRoleForm from "@/components/AppRoleForm";
    import AppUserRole from "@/model/AppUserRole"
    export default {
        name: 'AppRoleManagement',
        props:{
            // appId: String,
            appName: String,
        },
        data: function(){
            return{
                appId : null,
                appUserRoleList : [],
                appUserRoleFilteredList : [],
                axiosConfig: {},
                loginInfo: {},
                deleteMsg: null,
                deleteId: null,
                dialogVisible: false,
                appRoleFormShow: false,
                appUserRole : {},
                searchWords: "",
                usernameMap: {},
                webApi: process.env.VUE_APP_WEB_ROOT,
            }
        },
        mounted: function(){
            this.axiosConfig = this.$store.state.axiosConfig;
            this.loginInfo = this.$store.state.loginInfo;
            this.appId = this.$route.params.appId;
            this.usernameMap = this.$store.state.usernameMap;
            this.appUserRole = new AppUserRole();
            this.fetchRecord();
        },
        computed: {
        },
        methods: {
            search(){
                this.appUserRoleFilteredList = this.appUserRoleList.filter(appUserRole => {
                    if (this.searchWords != ""){
                        return (appUserRole.displayName !=null && appUserRole.displayName.includes(this.searchWords)) || 
                            (appUserRole.username !=null && appUserRole.username.includes(this.searchWords)) ||
                            (appUserRole.email !=null && appUserRole.email.includes(this.searchWords)) ||
                            (appUserRole.appRole !=null && appUserRole.appRole.includes(this.searchWords));
                    } else {
                        return true;
                    }
                });
            },
            fetchRecord(){
                return this.$http.get(this.webApi + "api/app/" + this.appId + "/role", this.axiosConfig)
                    .then((response) => {
                        console.log(response);
                        this.appUserRoleList = response.data;
                        this.appUserRoleList.forEach((appUserRole)=>{
                            if (this.usernameMap[appUserRole.username] != null){
                                appUserRole.displayName = this.usernameMap[appUserRole.username].displayName;
                                appUserRole.email = this.usernameMap[appUserRole.username].email;
                            } else {
                                appUserRole.displayName = "ERROR";
                                appUserRole.email = "ERROR";
                            }
                        });
                        this.appUserRoleFilteredList = this.appUserRoleList;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            deleteAppUserRole(event){
                event.preventDefault();
                this.$http.delete(this.webApi + "api/role/" + this.deleteId, this.axiosConfig)
                    .then(() => {
                        this.fetchRecord();
                        this.dialogVisible = false;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            deleteConfirm(appUserRole){
                this.showPopup(appUserRole.username,appUserRole.appRole, appUserRole.id);
            },
            edit(appUserRole){
                console.log(appUserRole);
                this.appUserRole = appUserRole;
                this.appRoleFormShow = true;
            },
            showPopup: function(username, role, id){
                this.deleteMsg = 'Are you sure to delete record:' + username + ' ' + role;
                this.deleteId = id;
                this.dialogVisible = true;
            },
            closeAppRoleFormShow(refresh){
                if (refresh === true){
                    this.fetchRecord().then(()=>this.search());
                }
                this.appRoleFormShow = false;
            },
            addAppUserRole(){
                this.appUserRole = new AppUserRole();
                this.appUserRole.appId = this.appId;
                this.appRoleFormShow = true;
            },
        },
        components: {
            "app-role-form" : AppRoleForm,
        },
        watch:{
            '$route' (){
                this.fetchRecord();
            }
        },
    }
</script>
