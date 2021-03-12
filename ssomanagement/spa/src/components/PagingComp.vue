<template>
    <div>
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
    </div>
</template>
<style>
</style>
<script>
    export default {
        name: 'PagingComp',
        props: {
            totalPages: {
                type: Number,
                defualt: 1,
            },
            pageNumber: {
                type: Number,
                defualt: 0,
            },
            pageSize: {
                type: Number,
                defualt: 10,
            },
            getPreviousPage: Function,
            getNextPage: Function,
        }, 
        data: function(){
            return {};
        },
        mounted: function(){
        },
    }
</script>
