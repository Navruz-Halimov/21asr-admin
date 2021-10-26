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
                                label="Sarlavha"
                                v-model="form.title"
                                valid-feedback="Yaxshi."
                                invalid-feedback="Kamida bitta so'z kiriting."
                                :is-valid="validator"
                                required
                            />
                        </CCol>
                        <CCol col="12">
                            <CInput 
                                label="Сарлавха"
                                v-model="form.title_kl"
                                valid-feedback="Yaxshi."
                                invalid-feedback="Kamida bitta so'z kiriting."
                                :is-valid="validator"
                                required
                            />
                        </CCol>
                        <CCol col="12">
                            <div class="custom-file my-3">
                                <input ref="imageVal" @change="addImage" type="file" class="custom-file-input" id="validatedCustomFile" required>
                                <label ref="image" class="custom-file-label" for="validatedCustomFile">Rasm yuklang...</label>
                            </div>
                        </CCol>
                        <CCol col="12">
                            <div class="custom-file my-3">
                                <input ref="pdfVal" @change="addPDF" type="file" class="custom-file-input" id="validatedCustomFile" required>
                                <label ref="pdf" class="custom-file-label" for="validatedCustomFile">PDF yuklang...</label>
                            </div>
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
                   <Table :theads="thead" :tbodies="newspapers" :button="bshow" :objects="objs" @getItemEdit="getEdit" />
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
                                    label="Sarlavha"
                                    v-model="advertisement.title"
                                    valid-feedback="Yaxshi."
                                    invalid-feedback="Kamida bitta so'z kiriting."
                                    :is-valid="validator"
                                    required
                                />
                            </CCol>
                            <CCol col="12">
                                <CInput 
                                    label="Сарлавха"
                                    v-model="advertisement.title_kl"
                                    valid-feedback="Yaxshi."
                                    invalid-feedback="Kamida bitta so'z kiriting."
                                    :is-valid="validator"
                                    required
                                />
                            </CCol>
                            <CCol col="12">
                                <div class="custom-file my-3">
                                    <input @change="uploadImage" type="file" class="custom-file-input" id="validatedCustomFile" required>
                                    <label ref="aImage" class="custom-file-label" for="validatedCustomFile">Rasm yuklang...</label>
                                </div>
                            </CCol>
                            <CCol col="12">
                                <div class="custom-file my-3">
                                    <input @change="uploadPDF" type="file" class="custom-file-input" id="validatedCustomFile" required>
                                    <label ref="aPdf" class="custom-file-label" for="validatedCustomFile">PDF yuklang...</label>
                                </div>
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
            thead: ['Sarlavha','Rasm','Amallar'],
            objs: ['title','thumbnail'],
            bshow: { warning: true, delete: true },
            advertisement: [],
            form: {
                title: '',
                file: '',
                thumbnail: '',
            },
            itemId: 0,
            imgSet: false,
            imagevalidation: true,
            addimagevalidation: false,
            pdfSet: false,
            pdfvalidation: true,
            addpdfvalidation: false,
            loader: false,
            showAddModal: false,
        }
    },
    computed: {
        ...mapGetters(['newspapers'])
    }, 
    methods: {
        validator(val){
            return (val && val.length) > 0 ? true : false
        },
        addImage(event) {
            this.$refs.image.innerHTML = event.target.files[0].name;
            let imageSize = (event.target.files[0].size/1000000).toFixed(1);
            if(event.target.files[0] && (event.target.files[0].type == 'image/png' || event.target.files[0].type == 'image/jpeg' || event.target.files[0].type == 'image/jpg') && imageSize < 5.0){
                this.form.thumbnail = event.target.files[0];
                this.addimagevalidation = true;
            }else{
                this.$toast.error('Faqat jpeg,png yoki jpg formatda faylni yuklang va 5MB ko\'p bo\'lmasligi kerak.');
                this.addimagevalidation = false;
            }
        },

        addPDF(event) {
            this.$refs.pdf.innerHTML = event.target.files[0].name;
            if(event.target.files[0] && (event.target.files[0].type == 'application/pdf' || event.target.files[0].type == 'application/docs')){
                this.form.file = event.target.files[0];
                this.addpdfvalidation = true;
            }else{
                this.$toast.error('Faqat pdf yoki docs formatda faylni yuklang.');
                this.addpdfvalidation = false;
            }
        },

        uploadImage(event) {
            this.imgSet = true;
            this.$refs.aImage.innerHTML = event.target.files[0].name;
            let imageSize = (event.target.files[0].size/1000000).toFixed(1);
            if(event.target.files[0] && (event.target.files[0].type == 'image/png' || event.target.files[0].type == 'image/jpeg' || event.target.files[0].type == 'image/jpg') && imageSize < 5.0){
                this.advertisement.thumbnail = event.target.files[0];
                this.imagevalidation = true;
            }else{
                this.$toast.error('Faqat jpeg,png yoki jpg formatda faylni yuklang va 5MB ko\'p bo\'lmasligi kerak.');
                this.imagevalidation = false;
            }
        },

        uploadPDF(event) {
            this.pdfSet = true;
            this.$refs.aPdf.innerHTML = event.target.files[0].name;
            if(event.target.files[0] && (event.target.files[0].type == 'application/pdf' || event.target.files[0].type == 'application/docs')){
                this.advertisement.file = event.target.files[0];
                this.pdfvalidation = true;
            }else{
                this.$toast.error('Faqat pdf yoki docs formatda faylni yuklang.');
                this.pdfvalidation = false;
            }
        },

        getEdit(val) {
            this.itemId = val;
            this.$store.dispatch('edit',`${this.$store.state.currentItemUrl}/${val}/`)
            .then(res => {
                this.advertisement = this.$store.state.singleItemEdit;
            })
        },
        update() {
            let item = new FormData();
            this.loader = true;
            for(const[key,value] of Object.entries(this.advertisement)){
                item.append(key, value);
            }
            if(this.advertisement.file && this.pdfSet) {} else {
                item.delete('file',this.advertisement.file)
            }
            if(this.advertisement.thumbnail && this.imgSet) {} else {
                item.delete('thumbnail',this.advertisement.thumbnail)
            }
            if(this.imagevalidation){
                if(this.pdfvalidation){
                    if(this.advertisement.title){
                        // item.append('thumbnail',this.advertisement.thumbnail);
                        // item.append('file',this.advertisement.file);
                        this.$store.dispatch('update', { url: `${this.$store.state.currentItemUrl}/${this.itemId}/`, value: item } )
                        .then(() => {
                            this.loader = false;
                            this.imgSet = false;
                            this.imagevalidation = true;
                        })
                        .catch(() => {this.loader = false;})
                    }else{
                        this.loader = false;
                        this.$toast.error('Barcha kataklarni to\'ldiring');
                    }
                }else{
                    this.loader = false;
                    this.$toast.error('Fayl pdf formatda bo\'lishi kerak');
                }
            }else{
                this.loader = false;
                this.$toast.error('Faqat png,jpeg va jpg formatda fayl yuklang((max = 5MB)) .');
                // this.$store.dispatch('update', { url: `${this.$store.state.currentItemUrl}/${this.itemId}/`, value: item } )
                // .then(() => {
                //     this.loader = false;
                //     this.imgSet = false;
                //     this.imagevalidation = true;
                // })
            }
        },
        add() {
            if(this.addimagevalidation && this.addpdfvalidation) {
                if(this.form.title) {
                    let item = new FormData();
                    this.loader = true;
                    for(const[key,value] of Object.entries(this.form)){
                        item.append(key, value);
                    }
                    this.$store.dispatch('add',{ url: 'newspapers/', value: item })
                    .then(() => {
                        this.showAddModal = false;
                        this.addimagevalidation = false;
                        this.$refs.image.innerHTML = 'Rasm yuklang...';
                        this.$refs.pdf.innerHTML = 'PDF yuklang...';
                        this.loader = false;
                        this.$refs.pdfVal.value = null;
                        this.$refs.imageVal.value = null;
                        this.form = {
                            title: '',
                            file: '',
                            thumbnail: '',
                        }
                    })
                }else{
                    this.$toast.error('Barcha kataklarni to\'ldiring');
                }
            }else{
                this.$toast.error('Rasm(max = 5MB) png, jpeg yoki jpg formatda, fayl esa pdf formatda bo\'lishi kerak');
            }
        },
    }, 
    created() {
        this.$store.commit('setShowLoader',true);
        this.$store.dispatch('getnewspapers')
        .then(() => {
            this.$store.commit('setShowLoader',false);
        })
    }
}
</script>