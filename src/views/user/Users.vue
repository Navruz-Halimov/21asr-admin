<template>
    <div>
        <CContainer fluid>
            <CRow v-if="!$store.state.showLoader">
                <CCol col="12">
                    <Table :theads="thead" :tbodies="users" :button="bshow" :objects="objs"  @getItemEdit="getEdit" />
                    <CModal
                        title="O'zgartirish"
                        color="warning"
                        :show.sync="$store.state.showEditModal"
                        size="lg"
                        :centered="true"
                    >
                        <CRow  v-if="$store.state.editLoader">
                            <CCol md="12">  
                                <Loader />
                            </CCol>
                        </CRow>
                        <CRow v-else>
                            <CCol col="12">
                                <CInput 
                                    label="Ismi"
                                    v-model="userArr.firstname"
                                    valid-feedback="Yaxshi."
                                    invalid-feedback="Kamida bitta so'z kiriting."
                                    :is-valid="validator"
                                    required
                                />
                            </CCol>
                            <CCol col="12">
                                <CInput 
                                    label="Familiya"
                                    v-model="userArr.lastname"
                                    valid-feedback="Yaxshi."
                                    invalid-feedback="Kamida bitta so'z kiriting."
                                    :is-valid="validator"
                                    required
                                />
                            </CCol>
                            <CCol col="12">
                                <CInput 
                                    label="Telefon raqam"
                                    v-model="userArr.phone_number"
                                    valid-feedback="Yaxshi."
                                    invalid-feedback="Kamida bitta so'z kiriting."
                                    :is-valid="validator"
                                    required
                                />
                            </CCol>
                            <CCol col="12">
                                <date-pick
                                    v-model="userArr.paid_till"
                                    :pickTime="true"
                                    :format="'YYYY-MM-DD HH:mm'"
                                ></date-pick>
                            </CCol>
                        </CRow>
                        <div slot="footer">
                            <div slot="footer-wrapper">
                                <CButton color="success" class="float-right" @click="update(itemId)" :disabled="loader">
                                    <CSpinner v-if="loader" color="warning" size="sm" />
                                    <span v-else>Saqlash</span>
                                </CButton>
                            </div>
                        </div>
                    </CModal>
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
            thead: ['Ismi', 'Familiya', 'Telefon raqam','To\'langan','Amallar'],
            objs: ['firstname','lastname','phone_number','paid_till'],
            bshow: { warning: true, delete: true },
            loader: false,
            userArr: []
        }
    },
    computed: {
        ...mapGetters(['users'])
    }, 
    methods: {
        validator(val){
            return (val && val.length) > 0 ? true : false
        },
        getEdit(val) {
            this.itemId = val;
            this.$store.dispatch('edit',`${this.$store.state.currentItemUrl}/${val}/`)
            .then(() => {
                this.userArr = this.$store.state.singleItemEdit;
            })
        },
        update() {
            this.loader = true;
            if(true){
                this.$store.dispatch('update', { url: `${this.$store.state.currentItemUrl}/${this.itemId}/`, value: this.userArr } )
                .then(() => {
                    this.loader = false;
                })
            }else{
                this.loader = false;
                this.$toast.error('Barcha kataklarni to\'ldiring');
            }
        },
    },
    created() {
        this.$store.commit('setShowLoader',true);
        this.$store.dispatch('getusers')
        .then(() => {
            this.$store.commit('setShowLoader',false);
        })
    }
}
</script>


<style lang="scss">
    .vdpComponent {
        width: 100% !important;
        input {
            width: 100%;
            font-size: 16px;
            height: 35px;
        }
    }
</style>