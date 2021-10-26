<template>
    <CButtonGroup>
      <CButton  v-if="show.warning" @click="editList(id)">
          <CIcon name="cil-pencil" />
      </CButton>
      <CButton  v-if="show.delete" @click="deleteList(id)">
          <CIcon name="cil-trash" />
      </CButton>
    </CButtonGroup>
</template>
<script>
export default {
    props: ['id','show'],
    data() {
        return {

        }
    },
    methods: {
        deleteList(id) {
            this.$store.commit('setDeleteModalId',id);
            this.$store.commit('setShowDeleteModal');
        },
        editList(id) {
            this.$store.commit('setEditModalId',id);
            this.$store.commit('setShowEditModal');
            this.$emit('editModalParent',id);            
        }
    }
}
</script>

<style lang="scss" scoped>
    button {
        &:hover {
            cursor: pointer !important;
        }
    }
</style>