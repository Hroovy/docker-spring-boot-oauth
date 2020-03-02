<template>
    <div>
        <div class="row">
            <div class="col-12">
                <router-link class="ssonav" v-bind:to="{ name: 'landing' }">
                    <HomeIcon class="icon-2x"></HomeIcon>Home
                </router-link>
            </div>
        </div>
        <hr/>
        <div class="row">
            <div class="col-md-12 ssonav">
                App List
            </div>
        </div>
        <hr/>
        <div v-bind:key="index" v-for="(app,index) in appList">
            <div class="row top-buffer">
                <div class="col-md-2">
                    <router-link :to='{name:"appRoleList", params:{appId : app.clientId }}' class="btn btn-primary" role="button">Edit</router-link>
                </div>
                <div class="col-md-10">
                    <router-link :to='{name:"appRoleList", params:{appId : app.clientId }}' >{{app.clientId}}</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import HomeIcon from 'vue-material-design-icons/Home.vue';

export default {
    name: 'AppList',
    data: function(){
        return{
            pageNumber: 0,
            appList: [],
            axiosConfig: {
                headers : {
                },
                data:{
                }
            },
        }
    },
    mounted: function(){
        let self = this;
        self.axiosConfig.headers['Accept'] = 'application/json';
        self.axiosConfig.headers['Content-Type'] = 'application/json';

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
        fetchRecord() {
            let self = this;
            axios.get('api/app?pageNumber=' + self.pageNumber, self.axiosConfig)
                .then(function (response) {
                    console.log(response);
                    self.appList = response.data.content;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    },
    components: {
        HomeIcon,
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