<template>
    <CModal
      title="O'chirmoqchimisiz?"
      color="warning"
      :show.sync="$store.state.showDeleteModal"
      size="sm"
      v-if="id == $store.state.deleteModalId"
      :centered="true"
    >
        <div slot="footer">
            <div slot="footer-wrapper">
                <CButton color="success" class="mr-3" @click="deleteItem()" :disabled="loader">
                    <CSpinner v-if="loader" color="warning" size="sm" />
                    <CIcon v-else name="cil-check-alt" />
                </CButton>
                <CButton color="danger" class="" @click="$store.commit('setShowDeleteModal')">
                    <CIcon name="cil-x" />
                </CButton>
            </div>
        </div> 
    </CModal>
</template>
<script>
export default {
    props: ['id'],
    data() {
        return {
            loader: false
        }
    },
    methods: {
        deleteItem() {
            this.loader = true;
            if(this.$store.state.currentItemUrl == 'payment'){
                this.$store.commit('setCurrentItem','payment-amounts');
            }
            this.$store.dispatch('delete',`${this.$store.state.currentItemUrl}/${this.id}/`)
            .then(() => {
                this.loader = false;
                this.$store.commit('setDeleteModalId',0);
                this.$store.commit('setShowDeleteModal');
            });
        },
        showModal() {
            
        }
    },
}
</script>