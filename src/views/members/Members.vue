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
                                label="Ismi"
                                v-model="form.firstname"
                                valid-feedback="Yaxshi."
                                invalid-feedback="Kamida bitta so'z kiriting."
                                :is-valid="validator"
                                required
                            />
                        </CCol>
                        <CCol col="12">
                            <CInput 
                                label="Исми"
                                v-model="form.firstname_kl"
                                valid-feedback="Yaxshi."
                                invalid-feedback="Kamida bitta so'z kiriting."
                                :is-valid="validator"
                                required
                            />
                        </CCol>
                        <CCol col="12">
                            <CInput 
                                label="Familiya"
                                v-model="form.lastname"
                                valid-feedback="Yaxshi."
                                invalid-feedback="Kamida bitta so'z kiriting."
                                :is-valid="validator"
                                required
                            />
                        </CCol>
                        <CCol col="12">
                            <CInput 
                                label="Фамилия"
                                v-model="form.lastname_kl"
                                valid-feedback="Yaxshi."
                                invalid-feedback="Kamida bitta so'z kiriting."
                                :is-valid="validator"
                                required
                            />
                        </CCol>
                        <CCol col="12">
                            <CInput 
                                label="Facebook linki"
                                type="url"
                                v-model="form.fb_url"
                                valid-feedback="Yaxshi."
                                invalid-feedback="Kamida bitta so'z kiriting."
                                :is-valid="validator"
                                required
                            />
                        </CCol>
                        <CCol col="12">
                            <CInput 
                                label="Instagram linki"
                                type="url"
                                v-model="form.inst_url"
                                valid-feedback="Yaxshi."
                                invalid-feedback="Kamida bitta so'z kiriting."
                                :is-valid="validator"
                                required
                            />
                        </CCol>
                        <CCol col="12">
                            <CInput 
                                label="Telegram linki"
                                type="url"
                                v-model="form.tg_url"
                                valid-feedback="Yaxshi."
                                invalid-feedback="Kamida bitta so'z kiriting."
                                :is-valid="validator"
                                required
                            />
                        </CCol>
                        <CCol col="12">
                            <CTextarea 
                                label="Biografiya"
                                v-model="form.bio"
                                valid-feedback="Yaxshi."
                                invalid-feedback="Kamida bitta so'z kiriting."
                                :is-valid="validator"
                                required
                            />
                        </CCol>
                        <CCol col="12">
                            <CTextarea 
                                label="Биография"
                                v-model="form.bio_kl"
                                valid-feedback="Yaxshi."
                                invalid-feedback="Kamida bitta so'z kiriting."
                                :is-valid="validator"
                                required
                            />
                        </CCol>
                        <CCol col="12">
                            <CInput 
                                label="Status"
                                v-model="form.status"
                                valid-feedback="Yaxshi."
                                invalid-feedback="Kamida bitta so'z kiriting."
                                :is-valid="validator"
                                required
                            />
                        </CCol>
                        <CCol col="12">
                            <CInput 
                                label="Статус"
                                v-model="form.status_kl"
                                valid-feedback="Yaxshi."
                                invalid-feedback="Kamida bitta so'z kiriting."
                                :is-valid="validator"
                                required
                            />
                        </CCol>
                        <CCol col="12">
                            <select class="form-control mt-2 mb-4" id="jobtypes" v-model="form.jobtype">
                                <option :value="job.id" v-for="(job,index)  of jobtypes" :key="index">{{ job.name }}</option>
                            </select>
                        </CCol>
                        <CCol col="12">
                            <div class="custom-file my-3">
                                <input ref="imageVal" @change="addImage" type="file" class="custom-file-input" id="validatedCustomFile" required>
                                <label ref="image" class="custom-file-label" for="validatedCustomFile">Rasm yuklang...</label>
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
                   <Table :theads="thead" :tbodies="members" :button="bshow" :objects="objs" @getItemEdit="getEdit" />
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
                                    v-model="membersArr.firstname"
                                    valid-feedback="Yaxshi."
                                    invalid-feedback="Kamida bitta so'z kiriting."
                                    :is-valid="validator"
                                    required
                                />
                            </CCol>
                            <CCol col="12">
                                <CInput 
                                    label="Исми"
                                    v-model="membersArr.firstname_kl"
                                    valid-feedback="Yaxshi."
                                    invalid-feedback="Kamida bitta so'z kiriting."
                                    :is-valid="validator"
                                    required
                                />
                            </CCol>
                            <CCol col="12">
                                <CInput 
                                    label="Familiya"
                                    v-model="membersArr.lastname"
                                    valid-feedback="Yaxshi."
                                    invalid-feedback="Kamida bitta so'z kiriting."
                                    :is-valid="validator"
                                    required
                                />
                            </CCol>
                            <CCol col="12">
                                <CInput 
                                    label="Фамилия"
                                    v-model="membersArr.lastname_kl"
                                    valid-feedback="Yaxshi."
                                    invalid-feedback="Kamida bitta so'z kiriting."
                                    :is-valid="validator"
                                    required
                                />
                            </CCol>
                            <CCol col="12">
                                <CInput 
                                    label="Facebook linki"
                                    type="url"
                                    v-model="membersArr.fb_url"
                                    valid-feedback="Yaxshi."
                                    invalid-feedback="Kamida bitta so'z kiriting."
                                    :is-valid="validator"
                                    required
                                />
                            </CCol>
                            <CCol col="12">
                                <CInput 
                                    label="Instagram linki"
                                    type="url"
                                    v-model="membersArr.inst_url"
                                    valid-feedback="Yaxshi."
                                    invalid-feedback="Kamida bitta so'z kiriting."
                                    :is-valid="validator"
                                    required
                                />
                            </CCol>
                            <CCol col="12">
                                <CInput 
                                    label="Telegram linki"
                                    type="url"
                                    v-model="membersArr.tg_url"
                                    valid-feedback="Yaxshi."
                                    invalid-feedback="Kamida bitta so'z kiriting."
                                    :is-valid="validator"
                                    required
                                />
                            </CCol>
                            <CCol col="12">
                                <CTextarea 
                                    label="Biografiya"
                                    v-model="membersArr.bio"
                                    valid-feedback="Yaxshi."
                                    invalid-feedback="Kamida bitta so'z kiriting."
                                    :is-valid="validator"
                                    required
                                />
                            </CCol>
                            <CCol col="12">
                                <CTextarea 
                                    label="Биография"
                                    v-model="membersArr.bio_kl"
                                    valid-feedback="Yaxshi."
                                    invalid-feedback="Kamida bitta so'z kiriting."
                                    :is-valid="validator"
                                    required
                                />
                            </CCol>
                            <CCol col="12">
                                <CInput 
                                    label="Status"
                                    v-model="membersArr.status"
                                    valid-feedback="Yaxshi."
                                    invalid-feedback="Kamida bitta so'z kiriting."
                                    :is-valid="validator"
                                    required
                                />
                            </CCol>
                            <CCol col="12">
                                <CInput 
                                    label="Status"
                                    v-model="membersArr.status_kl"
                                    valid-feedback="Yaxshi."
                                    invalid-feedback="Kamida bitta so'z kiriting."
                                    :is-valid="validator"
                                    required
                                />
                            </CCol>
                            <CCol col="12">
                                <select class="form-control mt-2 mb-4" id="jobtypes" v-model="membersArr.jobtype">
                                    <option :value="job.id" v-for="(job,index)  of jobtypes" :key="index">{{ job.name }}</option>
                                </select>
                            </CCol>
                            <CCol col="12">
                                <div class="custom-file my-3">
                                    <input @change="uploadImage" type="file" class="custom-file-input" id="validatedCustomFile" required>
                                    <label ref="aImage" class="custom-file-label" for="validatedCustomFile">Rasm yuklang...</label>
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
            thead: ['Ism','Familiya','Kasbi','Rasm','Amallar'],
            objs: ['firstname','lastname','jobtype','profile_picture'],
            bshow: { warning: true, delete: true },
            membersArr: [],
            form: {
                firstname: '',
                firstname_kl: '',
                lastname: '',
                lastname_kl: '',
                jobtype: null,
                bio: '',
                bio_kl: '',
                status: '',
                status_kl: '',
                inst_url: '',
                tg_url: '',
                fb_url: '',
                profile_picture: '',
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
        ...mapGetters(['members','jobtypes'])
    }, 
    methods: {
        validator(val){
            return (val && val.length) > 0 ? true : false
        },
        addImage(event) {
            this.$refs.image.innerHTML = event.target.files[0].name;
            let imageSize = (event.target.files[0].size/1000000).toFixed(1);
            if(event.target.files[0] && (event.target.files[0].type == 'image/png' || event.target.files[0].type == 'image/jpeg' || event.target.files[0].type == 'image/jpg') && imageSize < 5.0){
                this.form.profile_picture = event.target.files[0];
                this.addimagevalidation = true;
            }else{
                this.$toast.error('Faqat jpeg,png yoki jpg formatda faylni yuklang va 5MB ko\'p bo\'lmasligi kerak.');
                this.addimagevalidation = false;
            }
        },
        uploadImage(event) {
            this.imgSet = true;
            this.$refs.aImage.innerHTML = event.target.files[0].name;
            let imageSize = (event.target.files[0].size/1000000).toFixed(1);
            if(event.target.files[0] && (event.target.files[0].type == 'image/png' || event.target.files[0].type == 'image/jpeg' || event.target.files[0].type == 'image/jpg') && imageSize < 5.0){
                this.membersArr.profile_picture = event.target.files[0];
                this.imagevalidation = true;
            }else{
                this.$toast.error('Faqat jpeg,png yoki jpg formatda faylni yuklang va 5MB ko\'p bo\'lmasligi kerak.');
                this.imagevalidation = false;
            }
        },
        getEdit(val) {
            this.itemId = val;
            this.$store.dispatch('edit',`${this.$store.state.currentItemUrl}-admin/${val}/`)
            .then(res => {
                this.membersArr = this.$store.state.singleItemEdit;
            })
        },
        update() {
            this.loader = true;
            let item = new FormData();
            for(const[key,value] of Object.entries(this.membersArr)){
                item.append(key, value);
            }
            if(this.imgSet){
                if(this.imagevalidation){
                    item.append('profile_picture',this.membersArr.profile_picture);
                    this.$store.dispatch('update', { url: `${this.$store.state.currentItemUrl}-admin/${this.itemId}/`, value: item } )
                    .then(() => {
                        this.loader = false;
                        this.imgSet = false;
                        this.imagevalidation = true;
                    })
                }else{
                    this.$toast.error('Faqat jpeg,png yoki jpg formatda faylni yuklang va 5MB ko\'p bo\'lmasligi kerak.');
                }
            }else{
                item.delete('profile_picture');
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
                if(this.form.firstname 
                && this.form.firstname_kl 
                && this.form.lastname
                && this.form.lastname_kl
                && this.form.jobtype
                && this.form.bio
                && this.form.bio_kl
                && this.form.status
                && this.form.status_kl
                && this.form.inst_url
                && this.form.tg_url
                && this.form.fb_url) {
                    let item = new FormData();
                    this.loader = true;
                    for(const[key,value] of Object.entries(this.form)){
                        item.append(key, value);
                    }
                    this.$store.dispatch('add',{ url: 'members/', value: item })
                    .then(() => {
                        this.showAddModal = false;
                        this.addimagevalidation = false;
                        this.$refs.image.innerHTML = 'Rasm yuklang...';
                        this.loader = false;
                        this.$refs.imageVal.value = null;
                        this.form = {
                            firstname: '',
                            firstname_kl: '',
                            lastname: '',
                            lastname_kl: '',
                            jobtype: null,
                            bio: '',
                            bio_kl: '',
                            status: '',
                            status_kl: '',
                            inst_url: '',
                            tg_url: '',
                            fb_url: '',
                            profile_picture: '',
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
        this.$store.dispatch('getjobtypes')
        this.$store.dispatch('getmembers')
        .then(() => {
            this.$store.commit('setShowLoader',false);
        })
    }
}
</script>