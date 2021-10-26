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
                            <p>Kirish</p>
                        </CCol>
                        <CCol col="12">
                            <CTextarea v-model="form.intro" />
                        </CCol>
                        <CCol col="12">
                            <p class="mt-3">Кириш</p>
                        </CCol>
                        <CCol col="12">
                            <CTextarea v-model="form.intro_kl" />
                        </CCol>
                        <CCol col="12">
                            <p class="mt-3">Kontent</p>
                        </CCol>
                        <CCol col="12">
                            <editor
                                api-key="cnb9qutvatjihox3sik01jb0kvjinhuqut5m9g9bajr7u58z"
                                :init="$store.state.config"
                                v-model="form.content"
                            />
                        </CCol>
                         <CCol col="12">
                            <p class="mt-3">Контент</p>
                        </CCol>
                        <CCol col="12">
                            <editor
                                api-key="cnb9qutvatjihox3sik01jb0kvjinhuqut5m9g9bajr7u58z"
                                :init="$store.state.config"
                                v-model="form.content_kl"
                            />
                        </CCol>
                        <CCol col="12">
                            <p class="mt-3">A'zolar</p>
                        </CCol>
                        <CCol col="12">
                            <select class="form-control mb-2" id="members" v-model="form.author">
                                <option :value="member.id" v-for="(member,index)  of members" :key="index">{{ member.firstname }} {{ member.lastname }}</option>
                            </select>
                        </CCol>
                        <CCol col="12">
                            <p class="mb-2">Kategoriya</p>
                        </CCol>
                        <CCol col="12">
                            <select class="form-control mb-2" id="categories" v-model="form.category">
                                <option :value="category.id" v-for="(category,index)  of categories" :key="index">{{ category.name }}</option>
                            </select>
                        </CCol>
                        <CCol col="12">
                            <CInput 
                                label="Ko'rishlar soni"
                                type="number"
                                min="0"
                                oninput="validity.valid||(value='');"
                                v-model="form.view_count"
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
                            <p class="mb-2">Teglar</p>
                        </CCol>
                        <CCol col="12"> 
                            <tags-input element-id="tags" typeahead-style="dropdown" discard-search-text="Qidirishni bekor qilish" placeholder="Teglar qo'shish" v-model="tagArr" :existing-tags="tagss" :typeahead="true"  @tag-added="onTagAdded"></tags-input>
                        </CCol>
                        <CCol col="12">
                            <div class="form-check my-3">
                                <label class="form-check-label">
                                    <input v-model="form.is_videopost" type="checkbox" class="form-check-input" value="">Video bor
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
                   <Table :theads="thead" :tbodies="posts" :button="bshow" :objects="objs" @getItemEdit="getEdit" />
                    <CModal
                        title="O'zgartirish"
                        color="warning"
                        :show.sync="$store.state.showEditModal"
                        size="lg"
                        :fade="false"
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
                                    v-model="newsArr.title"
                                    valid-feedback="Yaxshi."
                                    invalid-feedback="Kamida bitta so'z kiriting."
                                    :is-valid="validator"
                                    required
                                />
                            </CCol>
                            <CCol col="12">
                                <CInput 
                                    label="Сарлавха"
                                    v-model="newsArr.title_kl"
                                    valid-feedback="Yaxshi."
                                    invalid-feedback="Kamida bitta so'z kiriting."
                                    :is-valid="validator"
                                    required
                                />
                            </CCol>
                            <CCol col="12">
                                <p>Kirish</p>
                            </CCol>
                            <CCol col="12">
                                <CTextarea v-model="newsArr.intro" />
                            </CCol>
                            <CCol col="12">
                                <p class="mt-3">Кириш</p>
                            </CCol>
                            <CCol col="12">
                                <CTextarea v-model="newsArr.intro_kl" />
                            </CCol>
                            <CCol col="12">
                                <p class="mt-3">Kontent</p>
                            </CCol>
                            <CCol col="12">
                                <editor
                                    api-key="cnb9qutvatjihox3sik01jb0kvjinhuqut5m9g9bajr7u58z"
                                    :init="$store.state.config"
                                    v-model="newsArr.content"
                                />
                            </CCol>
                            <CCol col="12">
                                <p class="mt-3">Контент</p>
                            </CCol>
                            <CCol col="12">
                                <editor
                                    api-key="cnb9qutvatjihox3sik01jb0kvjinhuqut5m9g9bajr7u58z"
                                    :init="$store.state.config"
                                    v-model="newsArr.content_kl"
                                />
                            </CCol>
                            <CCol col="12">
                                <p class="mt-3">A'zolar</p>
                            </CCol>
                            <CCol col="12">
                                <select class="form-control mb-2" id="members" v-model="newsArr.author">
                                    <option :value="member.id" v-for="(member,index)  of members" :key="index">{{ member.firstname }} {{ member.lastname }}</option>
                                </select>
                            </CCol>
                            <CCol col="12">
                                <p class="mb-2">Kategoriya</p>
                            </CCol>
                            <CCol col="12">
                                <select class="form-control mb-2" id="categories" v-model="newsArr.category">
                                    <option :value="category.id" v-for="(category,index)  of categories" :key="index">{{ category.name }}</option>
                                </select>
                            </CCol>
                            <CCol col="12">
                                <CInput 
                                    label="Ko'rishlar soni"
                                    type="number"
                                    min="0"
                                    oninput="validity.valid||(value='');"
                                    v-model="newsArr.view_count"
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
                                <p class="mb-2">Teglar</p>
                            </CCol>
                            <CCol col="12">
                                <tags-input element-id="tagssa" typeahead-style="dropdown" discard-search-text="Qidirishni bekor qilish" placeholder="Teg qo'shish" v-model="updateTagArr" :existing-tags="tagss" :typeahead="true" @tag-added="onUpdateTagAdded" @tag-removed="onUpdateTagRemoved" ></tags-input>
                            </CCol>
                            <CCol col="12">
                                <div class="form-check my-3">
                                    <label class="form-check-label">
                                        <input v-model="newsArr.is_videopost" type="checkbox" class="form-check-input" value="">Video bor
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
import Editor from '@tinymce/tinymce-vue';
import { mapGetters } from 'vuex';

export default {
    components: {
        Table,
        Pagination,
        Loader,
        Editor,
    },
    data() {
        return {
            thead: ['Sarlavha','Kategoriya','Ko\'rishlar soni','Rasm','Amallar'],
            objs: ['title','category','view_count','thumbnail'],
            bshow: { warning: true, delete: true },
            newsArr: [],
            tagArr: [],
            updateTagArr: [],
            temporaryArr: [],
            tempArray: [],
            form: {
                author: '',
                category: '',
                content: '',
                content_kl: '',
                intro: '',
                intro_kl: '',
                is_videopost: false,
                tags: [],
                thumbnail: '',
                title: '',
                title_kl: '',
                view_count: 0,
            },
            itemId: 0,
            imgSet: false,
            imagevalidation: true,
            addimagevalidation: false,
            loader: false,
            showAddModal: false,
            tagss: [],
        }
    },
    computed: {
        ...mapGetters(['members','categories','posts','tagsAll'])
    }, 
    methods: {
        async onUpdateTagRemoved(){
            this.tempArray = [];
            await this.updateTagArr.forEach(item => {
                this.tempArray.push(item.key);
            })
        },
        async onUpdateTagAdded(){
            this.tempArray = [];
            await this.updateTagArr.forEach(async (item)  => {
                let exists = this.temporaryArr.indexOf(item.value);
                if(exists != -1){
                    this.tempArray.push(item.key);
                }else{
                    await this.$http.post('tags/',{name: item.value, name_kl: item.value})
                    .then(res => {
                        this.tempArray.push(res.data.id);
                        this.$store.dispatch('gettagsall');
                        resolve();
                    })
                    .catch(() => {})
                }
            })
        },
        async onTagAdded(){
            this.tempArray = []
            await this.tagArr.forEach(async (item)  => {
                let exists = this.temporaryArr.indexOf(item.value);
                if(exists != -1){
                    this.tempArray.push(item.key);
                }else{
                    await this.$http.post('tags/',{name: item.value, name_kl: item.value})
                    .then(res => {
                        this.tempArray.push(res.data.id);
                        this.$store.dispatch('gettagsall');
                        resolve();
                    })
                    .catch(() => {})
                }
            })
        },
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
        uploadImage(event) {
            this.imgSet = true;
            this.$refs.aImage.innerHTML = event.target.files[0].name;
            let imageSize = (event.target.files[0].size/1000000).toFixed(1);
            if(event.target.files[0] && (event.target.files[0].type == 'image/png' || event.target.files[0].type == 'image/jpeg' || event.target.files[0].type == 'image/jpg') && imageSize < 5.0){
                this.newsArr.thumbnail = event.target.files[0];
                this.imagevalidation = true;
            }else{
                this.$toast.error('Faqat jpeg,png yoki jpg formatda faylni yuklang va 5MB ko\'p bo\'lmasligi kerak.');
                this.imagevalidation = false;
            }
        },
        getEdit(val) {
            this.itemId = val;
            this.$store.dispatch('edit',`${this.$store.state.currentItemUrl}-admin/${val}/`)
            .then(() => {
                this.updateTagArr = [];
                this.newsArr = this.$store.state.singleItemEdit;
                this.newsArr.view_count = `${this.newsArr.view_count}`;
                this.tagsAll.forEach((item,index) => {
                    this.newsArr.tags.forEach(tag => {
                        if(item.id == tag){
                            this.updateTagArr.push({key: item.id,value: item.name});
                        }
                    })
                })
            })
        },
        update() {
            this.loader = true;
            this.newsArr.tags = [];
            this.tempArray.forEach(item => {
                this.newsArr.tags.push(item);
            })
            let item = new FormData();
            for(const[key,value] of Object.entries(this.newsArr)){
                if(key == 'tags') {
                    for(let i = 0; i < this.newsArr.tags.length; i++){
                        item.append('tags',this.newsArr.tags[i]);
                    }
                }else{
                    item.append(key, value);
                }
            }
            if(this.imgSet){
                if(this.imagevalidation){
                    item.append('thumbnail',this.newsArr.profile_picture);
                    this.$store.dispatch('update', { url: `${this.$store.state.currentItemUrl}/${this.itemId}/`, value: item } )
                    .then(() => {
                        this.loader = false;
                        this.imgSet = false;
                        this.imagevalidation = true;
                        this.updateTagArr = [];
                    })
                }else{
                    this.$toast.error('Faqat jpeg,png yoki jpg formatda faylni yuklang va 5MB ko\'p bo\'lmasligi kerak.');
                }
            }else{
                item.delete('thumbnail');
                this.$store.dispatch('update', { url: `${this.$store.state.currentItemUrl}/${this.itemId}/`, value: item } )
                .then(() => {
                    this.loader = false;
                    this.imgSet = false;
                    this.imagevalidation = true;
                    this.updateTagArr = [];
                })
            }
        },
        async add() {
            this.tempArray.forEach(item => {
                this.form.tags.push(item);
            })
            if(this.addimagevalidation) {
                if(this.form.author 
                && this.form.category
                && this.form.tags
                && this.form.content
                && this.form.content_kl
                && this.form.title
                && this.form.title_kl) {
                    let item = new FormData();
                    this.loader = true;
                    for(const[key,value] of Object.entries(this.form)){
                        if(key == 'tags') {
                            for(let i = 0; i < this.form.tags.length; i++){
                                item.append('tags',this.form.tags[i]);
                            }
                        }else{
                            item.append(key, value);
                        }
                    }
                    this.$store.dispatch('add',{ url: 'posts/', value: item })
                    .then(() => {
                        this.showAddModal = false;
                        this.addimagevalidation = false;
                        this.$refs.image.innerHTML = 'Rasm yuklang...';
                        this.$refs.imageVal.value = null;
                        this.loader = false;
                        this.tagArr = [];
                        this.form = {
                            author: '',
                            category: '',
                            content: '',
                            content_kl: '',
                            intro: '',
                            intro_kl: '',
                            is_videopost: false,
                            tags: [],
                            thumbnail: '',
                            title: '',
                            title_kl: '',
                            view_count: '',
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
        this.$store.dispatch('gettagsall')
        this.$store.dispatch('getcategories')
        this.$store.dispatch('getmembers')
        this.$store.dispatch('getposts')
        .then(() => {
            this.tagsAll.forEach(item => {
                this.tagss.push({ key: item.id, value: item.name});
                this.temporaryArr.push(item.name);
            })
            this.$store.commit('setShowLoader',false);
        })
    }
}
</script>