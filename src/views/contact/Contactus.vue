<template>
    <div>
        <CContainer fluid>
            <CRow v-if="!$store.state.showLoader">
                <CCol col="12">
                    <Table :theads="thead" :tbodies="contactus" :button="bshow" :objects="objs" />
                </CCol>
                <CCol col="12">
                    <Pagination />
                </CCol>
            </CRow> 
            <CRow v-else>
                <Loader />
            </CRow>
        </CContainer>
    </div>
</template>

<script>
import Table from '../../components/Table';
import Pagination from '../../components/Pagination';
import Loader from '../../components/Loader';
import { mapGetters } from 'vuex';

export default {
    components: {
        Table,
        Pagination,
        Loader
    },
    data() {
        return {
            thead: ['Ismi','Telefon raqam','Email','Xatlar','Amallar'],
            objs: ['name','phone_number','email','theme'],
            bshow: { warning: false, delete: true },
        }
    },
    computed: {
        ...mapGetters(['contactus'])
    }, 
    methods: {

    },
    created() {
        this.$store.commit('setShowLoader',true);
        this.$store.dispatch('getcontactus')
        .then(() => {
            this.$store.commit('setShowLoader',false);
        })
    }
}
</script>