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
                User List
            </div>
        </div>
        <hr/>
        <router-link v-bind:to="{ name: 'appUserForm', params: {id:'new'} } ">
            <PlusBoxIcon></PlusBoxIcon>Add
        </router-link>
        <div class="row">
            <div class="col-2"></div>
            <div class="col-2">帳號</div>
            <div class="col-2">顯示名稱</div>
            <div class="col-2">Email</div>
            <div class="col-2">使用狀態</div>
        </div>
        <div class="row" v-for="(appUser) in appUserList" v-bind:key="'appUser' + appUser.id">
            <div class="col-2">
                <router-link v-bind:to="{ 'name': 'appUserForm', params:{ id : appUser.id }}">
                    edit
                </router-link>
            </div>
            <div class="col-2">{{appUser.username}}</div>
            <div class="col-2">{{appUser.displayName}}</div>
            <div class="col-2">{{appUser.email}}</div>
            <div class="col-2">{{(appUser.isActive == 'Y') ? '啟用' : '停用'}}</div>
        </div>
        <div class="">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item" v-show="pageParam.first == false" v-on:click="previousPage">
                        <a class="page-link" href="#" aria-label="Previous" >
                            <span aria-hidden="true">&laquo;</span>
                            <span class="sr-only">Previous</span>
                        </a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#" v-show="pageParam.pageNumber > 0" v-on:click="(event) => {jumpPage(pageParam.pageNumber - 1);}">
                            {{pageParam.pageNumber}}
                        </a>
                    </li>
                    <li class="page-item active">
                        <a class="page-link" href="#">
                            {{pageParam.pageNumber + 1}}
                        </a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#" v-show="pageParam.pageNumber + 1 < pageParam.totalPages" v-on:click="(event) => {jumpPage(pageParam.pageNumber + 1);}">
                            {{pageParam.pageNumber + 2}}
                        </a>
                    </li>
                    <li class="page-item" v-show="pageParam.last == false" v-on:click="nextPage">
                        <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span class="sr-only">Next</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import HomeIcon from 'vue-material-design-icons/Home.vue';
    import PlusBoxIcon from 'vue-material-design-icons/PlusBox.vue';
    import {getCSRFToken} from '@/utils/utilsFunction.js';
    import 'bootstrap/dist/css/bootstrap.css';

    export default {
        name: "AppUserList",
        data:function (){
            return {
                pageParam: {
                    last:true,
                    first:true,
                    pageNumber: 0,
                    pageSize:10,
                    totalPages: 1,
                    totalElements: 0,
                },
                appUserList: [],
            };
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
            fetchRecord:function(){
                let self = this;
                axios.get("api/appUser?pageNumber=" + self.pageParam.pageNumber + '&pageSize=' + self.pageParam.pageSize, self.axiosConfig)
                    .then(function (response) {
                        console.log(response);
                        self.appUserList = response.data.content;
                        self.pageParam.last = response.data.last;
                        self.pageParam.first = response.data.first;
                        self.pageParam.pageNumber = response.data.number;
                        self.pageParam.totalPages = response.data.totalPages;
                        self.pageParam.totalElements = response.data.totalElements;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            jumpPage: function(pageNumber){
                this.pageParam.pageNumber = pageNumber;
                this.fetchRecord();
            },
            nextPage:function (event) {
                event.preventDefault();
                this.jumpPage(this.pageParam.pageNumber + 1);
            },
            previousPage:function (event) {
                event.preventDefault();
                this.jumpPage(this.pageParam.pageNumber - 1);
            }
        },
        components: {
            HomeIcon,
            PlusBoxIcon,
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