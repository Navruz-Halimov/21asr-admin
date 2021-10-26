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
                            <select class="form-control mb-2" id="post" v-model="form.post">
                                <option :value="post.id" v-for="(post,index)  of posts" :key="index">{{ post.title }}</option>
                            </select>
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
                   <Table :theads="thead" :tbodies="recposts" :button="bshow" :objects="objs" @getItemEdit="getEdit" />
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
                                <select class="form-control mb-2" id="post" v-model="jobtypeArr.post">
                                    <option :value="post.id" v-for="(post,index)  of posts" :key="index">{{ post.title }}</option>
                                </select>
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
            thead: ['Sarlavha','Kategoriya','Kirish','Ko\'rishlar soni','Rasm','Amallar'],
            objs: ['title','category','intro','view_count','thumbnail'],
            bshow: { warning: true, delete: true },
            jobtypeArr: [],
            form: {
                post: {},
            },
            itemId: 0,
            loader: false,
            showAddModal: false,
        }
    },
    computed: {
        ...mapGetters(['recposts','posts'])
    }, 
    methods: {
        validator(val){
            return (val && val.length) > 0 ? true : false
        },
        getEdit(val) {
            this.itemId = val;
            this.$store.dispatch('edit',`${this.$store.state.currentItemUrl}/${val}/`)
            .then(res => {
                this.jobtypeArr = this.$store.state.singleItemEdit;
            })
        },
        update() {
            this.loader = true;
            if(this.jobtypeArr.post){
                this.$store.dispatch('update', { url: `${this.$store.state.currentItemUrl}/${this.itemId}/`, value: this.jobtypeArr } )
                .then(() => {
                    this.loader = false;
                })
            }else{
                this.loader = false;
                this.$toast.error('Barcha kataklarni to\'ldiring');
            }
        },
        add() {
            this.loader = true;
            if(this.form.post) {
                this.$store.dispatch('add',{ url: 'recposts/', value: this.form })
                .then(() => {
                    this.showAddModal = false;
                    this.loader = false;
                    this.form = {
                        post: ''
                    }
                })
            }else{
                this.loader = false;
                this.$toast.error('Barcha kataklarni to\'ldiring');
            }
        },
    }, 
    created() {
        this.$store.commit('setShowLoader',true);
        this.$store.dispatch('getposts')
        this.$store.dispatch('getrecposts')
        .then(() => {
            this.$store.commit('setShowLoader',false);
        })
    }
}
</script>