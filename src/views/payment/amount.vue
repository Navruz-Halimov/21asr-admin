<template>
    <div>
        <CContainer fluid>
            <CRow>
                <CCol col="12">
                    <CButton color="info" class="mx-auto d-block mb-4" @click="showAddModal = true">
                        <CIcon name="cil-plus" />
                    </CButton>
                    <CModal
                        title="Qo'shish"
                        color="info"
                        :show.sync="showAddModal"
                        size="lg"
                        :centered="true"
                    >
                    <CRow>
                        <CCol col="12">
                            <CInput 
                                label="Davomiyligi"
                                v-model="form.duration"
                                type="number"
                                min="0"
                                oninput="validity.valid||(value='');"
                                valid-feedback="Yaxshi."
                                invalid-feedback="Kamida bitta so'z kiriting."
                                :is-valid="validator"
                                required
                            />
                        </CCol>
                        <CCol col="12">
                            <CInput 
                                label="Narxi"
                                type="number"
                                min="0"
                                oninput="validity.valid||(value='');"
                                v-model="form.price"
                                valid-feedback="Yaxshi."
                                invalid-feedback="Kamida bitta so'z kiriting."
                                :is-valid="validator"
                                required
                            />
                        </CCol>
                    </CRow>
                    <div slot="footer">
                        <div slot="footer-wrapper">
                            <CButton color="success" class="float-right" @click="add()" :disabled="loader">
                                <CSpinner v-if="loader" color="warning" size="sm" />
                                <span v-else>Saqlash</span>
                            </CButton>
                        </div>
                    </div>
                    </CModal>
                </CCol>
            </CRow>
           <CRow v-if="!$store.state.showLoader">
               <CCol col="12">
                   <Table :theads="thead" :tbodies="payment" :button="bshow" :objects="objs" @getItemEdit="getEdit" />
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
                                    label="Davomiyligi"
                                    type="number"
                                    min="0"
                                    oninput="validity.valid||(value='');"
                                    v-model="jobtypeArr.duration"
                                    valid-feedback="Yaxshi."
                                    invalid-feedback="Kamida bitta so'z kiriting."
                                    :is-valid="validator"
                                    required
                                />
                            </CCol>
                            <CCol col="12">
                                <CInput 
                                    label="Narxi"
                                    type="number"
                                    min="0"
                                    oninput="validity.valid||(value='');"
                                    v-model="jobtypeArr.price"
                                    valid-feedback="Yaxshi."
                                    invalid-feedback="Kamida bitta so'z kiriting."
                                    :is-valid="validator"
                                    required
                                />
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
            thead: ['Davomiyligi(oy)','Narxi','Amallar'],
            objs: ['duration','price'],
            bshow: { warning: true, delete: true },
            jobtypeArr: [],
            form: {
                duration: '',
                price: '',
            },
            itemId: 0,
            loader: false,
            showAddModal: false,
        }
    },
    computed: {
        ...mapGetters(['payment'])
    }, 
    methods: {
        validator(val){
            return (val && val.length) > 0 ? true : false
        },
        getEdit(val) {
            this.itemId = val;
            this.$store.dispatch('edit',`${this.$store.state.currentItemUrl}-amounts/${val}/`)
            .then(res => {
                this.jobtypeArr = this.$store.state.singleItemEdit;
            })
        },
        update() {
            this.loader = true;
            if(this.jobtypeArr.duration && this.jobtypeArr.price){
                this.$store.dispatch('update', { url: `${this.$store.state.currentItemUrl}-amounts/${this.itemId}/`, value: this.jobtypeArr } )
                .then(() => {
                    this.loader = false;
                })
            }else{
                this.$toast.error('Barcha kataklarni to\'ldiring');
            }
        },
        add() {
            this.loader = true;
            if(this.form.duration && this.form.price) {
                this.$store.dispatch('add',{ url: 'payment-amounts/', value: this.form })
                .then(() => {
                    this.showAddModal = false;
                    this.loader = false;
                    this.form = {
                        name: '',
                        name_kl: ''
                    }
                })
            }else{
                this.$toast.error('Barcha kataklarni to\'ldiring');
            }
        },
    }, 
    created() {
        this.$store.commit('setShowLoader',true);
        this.$store.dispatch('getpayment')
        .then(() => {
            this.$store.commit('setShowLoader',false);
        })
    }
}
</script>