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
                                label="Reklama nomi"
                                v-model="form.title"
                                valid-feedback="Yaxshi."
                                invalid-feedback="Kamida bitta so'z kiriting."
                                :is-valid="validator"
                                required
                            />
                        </CCol>
                        <CCol col="12">
                            <CInput 
                                label="Реклама номи"
                                v-model="form.title_kl"
                                valid-feedback="Yaxshi."
                                invalid-feedback="Kamida bitta so'z kiriting."
                                :is-valid="validator"
                                required
                            />
                        </CCol>
                        <CCol col="12">
                            <CInput 
                                label="Linki"
                                type="url"
                                v-model="form.ads_link"
                                valid-feedback="Yaxshi."
                                invalid-feedback="Kamida bitta so'z kiriting."
                                :is-valid="validator"
                                required
                            />
                        </CCol>
                        <CCol col="12">
                            <div class="custom-file my-3">
                                <input ref="inputVal" @change="addImage" type="file" class="custom-file-input" id="validatedCustomFile" required>
                                <label ref="aImage" class="custom-file-label" for="validatedCustomFile">Rasm yuklang...</label>
                            </div>
                        </CCol>
                        <CCol col="12">
                            <div class="form-check my-3">
                                <label class="form-check-label">
                                    <input v-model="form.active" type="checkbox" class="form-check-input" value="">Aktiv
                                </label>
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
                   <Table :theads="thead" :tbodies="ads" :button="bshow" :objects="objs" @getItemEdit="getEdit" />
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
                                    label="Reklama nomi"
                                    v-model="advertisement.title"
                                    valid-feedback="Yaxshi."
                                    invalid-feedback="Kamida bitta so'z kiriting."
                                    :is-valid="validator"
                                    required
                                />
                            </CCol>
                            <CCol col="12">
                                <CInput 
                                    label="Реклама номи"
                                    v-model="advertisement.title_kl"
                                    valid-feedback="Yaxshi."
                                    invalid-feedback="Kamida bitta so'z kiriting."
                                    :is-valid="validator"
                                    required
                                />
                            </CCol>
                            <CCol col="12">
                                <CInput 
                                    label="Linki"
                                    type="url"
                                    v-model="advertisement.ads_link"
                                    valid-feedback="Yaxshi."
                                    invalid-feedback="Kamida bitta so'z kiriting."
                                    :is-valid="validator"
                                    required
                                />
                            </CCol>
                            <CCol col="12">
                                <div class="custom-file my-3">
                                    <input @change="uploadImage" type="file" class="custom-file-input" id="validatedCustomFile" required>
                                    <label ref="image" class="custom-file-label" for="validatedCustomFile">Rasm yuklang...</label>
                                </div>
                            </CCol>
                            <CCol col="12">
                                <div class="form-check my-3">
                                    <label class="form-check-label">
                                        <input v-model="advertisement.active" type="checkbox" class="form-check-input" value="">Aktiv
                                    </label>
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
            thead: ['Sarlavha','Linki','Aktiv','Rasm','Amallar'],
            objs: ['title','ads_link','active','image'],
            bshow: { warning: true, delete: true },
            advertisement: [],
            form: {
                title: '',
                title_kl: '',
                ads_link: '',
                active: false,
                image: '',
            },
            itemId: 0,
            imgSet: false,
            imagevalidation: true,
            addimagevalidation: false,
            loader: false,
            showAddModal: false,
        }
    },
    computed: {
        ...mapGetters(['ads'])
    }, 
    methods: {
        validator(val){
            return (val && val.length) > 0 ? true : false
        },
        addImage(event) {
            this.$refs.aImage.innerHTML = event.target.files[0].name;
            let imageSize = (event.target.files[0].size/1000000).toFixed(1);
            if(event.target.files[0] && (event.target.files[0].type == 'image/png' || event.target.files[0].type == 'image/jpeg' || event.target.files[0].type == 'image/jpg') && imageSize < 5.0){
                this.form.image = event.target.files[0];
                this.addimagevalidation = true;
            }else{
                this.$toast.error('Faqat jpeg,png yoki jpg formatda faylni yuklang va 5MB ko\'p bo\'lmasligi kerak.');
                this.addimagevalidation = false;
            }
        },
        uploadImage(event) {
            this.imgSet = true;
            this.$refs.image.innerHTML = event.target.files[0].name;
            let imageSize = (event.target.files[0].size/1000000).toFixed(1);
            if(event.target.files[0] && (event.target.files[0].type == 'image/png' || event.target.files[0].type == 'image/jpeg' || event.target.files[0].type == 'image/jpg') && imageSize < 5.0){
                this.advertisement.image = event.target.files[0];
                this.imagevalidation = true;
            }else{
                this.$toast.error('Faqat jpeg,png yoki jpg formatda faylni yuklang va 5MB ko\'p bo\'lmasligi kerak.');
                this.imagevalidation = false;
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
            this.loader = true;
            let item = new FormData();
            for(const[key,value] of Object.entries(this.advertisement)){
                item.append(key, value);
            }
            if(this.imgSet){
                if(this.imagevalidation){
                    item.append('image',this.advertisement.image);
                    this.$store.dispatch('update', { url: `${this.$store.state.currentItemUrl}/${this.itemId}/`, value: item } )
                    .then(() => {
                        this.loader = false;
                        this.imgSet = false;
                        this.imagevalidation = true;
                    })
                }else{
                    this.$toast.error('Faqat jpeg,png yoki jpg formatda faylni yuklang va 5MB ko\'p bo\'lmasligi kerak.');
                }
            }else{
                item.delete('image');
                this.$store.dispatch('update', { url: `${this.$store.state.currentItemUrl}/${this.itemId}/`, value: item } )
                .then(() => {
                    this.loader = false;
                    this.imgSet = false;
                    this.imagevalidation = true;
                })
            }
        },
        add() {
            if(this.addimagevalidation) {
                if(this.form.title && this.form.title_kl && this.form.ads_link) {
                    let item = new FormData();
                    this.loader = true;
                    for(const[key,value] of Object.entries(this.form)){
                        item.append(key, value);
                    }
                    this.$store.dispatch('add',{ url: 'ads/', value: item })
                    .then(() => {
                        this.showAddModal = false;
                        this.addimagevalidation = false;
                        this.$refs.aImage.innerHTML = 'Rasm yuklang...';
                        this.loader = false;
                        this.$refs.inputVal.value = null;
                        this.form = {
                            title: '',
                            title_kl: '',
                            ads_link: '',
                            active: false,
                            image: '',
                        }
                    })
                }else{
                    this.$toast.error('Barcha kataklarni to\'ldiring');
                }
            }else{
                this.$toast.error('Faqat jpeg,png yoki jpg formatda faylni yuklang va 5MB ko\'p bo\'lmasligi kerak.');
            }
        },
    }, 
    created() {
        this.$store.commit('setShowLoader',true);
        this.$store.dispatch('getads')
        .then(() => {
            this.$store.commit('setShowLoader',false);
        })
    }
}
</script>