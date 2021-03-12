<template>
    <div>
        <div class="row">
            <div class="col-12">
                <h1>App List</h1>
            </div>
        </div>
        <hr/>
        <router-link :to='{name:"appDetailForm", params:{clientId : "new", appName: "draft" }}'>
            <PlusBoxIcon></PlusBoxIcon>Add
        </router-link>
        <hr/>
        <div v-bind:key="index" v-for="(app,index) in appList">
            <div class="row top-buffer">
                <div class="col-md-1" v-if="isAdmin()">
                    <router-link :to='{name:"appDetailForm", params:{clientId : app.clientId, appName: app.displayName }}' class="btn btn-primary" role="button">Edit</router-link>
                </div>
                <div class="col-md-1">
                    <router-link :to='{name:"appRoleList", params:{appId : app.clientId, appName: app.displayName }}' class="btn btn-primary" role="button">Role</router-link>
                </div>
                <div class="col-md-8">
                    {{app.displayName}}
                </div>
            </div>
        </div>
        <hr/>
        <PagingComp :pageNumber="pageNumber"
            :getPreviousPage="getPreviousPage"
            :getNextPage="getNextPage"
        >

        </PagingComp>
    </div>
</template>
<script>
import axios from 'axios';
import {isAdminCheck} from '@/utils/utilsFunction.js';
import PlusBoxIcon from 'vue-material-design-icons/PlusBox.vue';
import PagingComp from '@/components/PagingComp.vue';

export default {
    name: 'AppList',
    components:{
        PlusBoxIcon,PagingComp
    },
    data: function(){
        return{
            pageNumber: 0,
            totalPages: 1,
            appList: [],
            axiosConfig: {
                headers : {
                },
                data:{
                }
            },
            loginInfo:{
                grantedAuthorities: [],
            },
        }
    },
    mounted: function(){
        this.axiosConfig = this.$store.state.axiosConfig;
        this.loginInfo = this.$store.state.loginInfo;
        if (this.$route.query.pageNumber != null){
            this.pageNumber = parseInt(this.$route.query.pageNumber);
        }
        this.fetchRecord();
    },
    methods: {
        fetchRecord() {
            let self = this;
            axios.get('api/app?pageNumber=' + self.pageNumber, self.axiosConfig)
                .then(function (response) {
                    console.log(response);
                    self.appList = response.data.content;
                    self.totalPages = response.data.totalPages;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        isAdmin(){
            return isAdminCheck(this.loginInfo.grantedAuthorities);
        },
        updateAppName(appName){
            this.$store.commit('updateAppName', appName);
        },
        getPreviousPage(event){
            event.preventDefault();
            if (this.pageNumber > 0){
                this.pageNumber = this.pageNumber - 1;
                this.$router.push({ name: 'appList', query: { pageNumber: this.pageNumber, } });
            }
        },
        getNextPage(event){
            event.preventDefault();
            if (this.pageNumber < (this.totalPages -1)){
                this.pageNumber = this.pageNumber + 1;
                this.$router.push({ name: 'appList', query: { pageNumber: this.pageNumber, } });
            }
        },
    },
    watch:{
        '$route' (){
            this.fetchRecord();
        }
    },
}
</script>

<style scoped>
    .material-design-icon.icon-2x {
        height: 2em;
        width: 2em;
    }
    .material-design-icon.icon-2x > .material-design-icon__svg {
        height: 2em;
        width: 2em;
    }
</style>