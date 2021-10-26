<template>
    <div>
        <CPagination
            v-if="$store.state.maxPage"
            :activePage.sync="page"
            :pages="$store.state.maxPage"
            align="center"
            :doubleArrows="false"
            @update:activePage="pageController"
        />
    </div>
</template>

<script>
export default {
    data() {
        return {
            page: 1,
        }
    },
    // watch: {
    //     page() {
    //         this.$store.dispatch(`get${this.$store.state.currentItemUrl}`,this.page-1);
    //     }
    // },
    methods: {
        pageController() {
            this.$store.dispatch(`get${this.$store.state.currentItemUrl}`,this.page-1)
        }
    },
    mounted(){
    }
}
</script>