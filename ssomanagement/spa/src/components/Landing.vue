<template>
    <div>
        <div>
            <router-link class="ssonav" v-bind:to="{ name: 'appList' }">
                App Management
            </router-link>
        </div>
        <div>
            <router-link class="ssonav" v-bind:to="{ name: 'appUserList' }">
                User Management
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style scoped>

</style>