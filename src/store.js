import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import { TYPE } from "vue-toastification";
Vue.use(Vuex)

const state = {
  sidebarShow: 'responsive',
  baseURL: 'https://21asr.uz',
  sidebarMinimize: false,
  showDeleteModal: false,
  showEditModal: false,
  token: localStorage.getItem('token') || '',
  currentItemUrl: '',
  showLoader: false,
  editLoader: false,
  contactus: [],
  singleItemEdit: [],
  categories: [],
  newspapers: [],
  recposts:[],
  payment: [],
  members: [],
  tagAll: [],
  slider: [],
  posts: [],
  users: [],
  tags: [],
  ads: [],
  jobtypes: [],
  maxPage: 0,
  itemsPerPage: 10,
  currentPage: 0,
  numberOfItems: 0,
  deleteModalId: 0,
  editModalId: 0,
  editItemId: 0,
  config: {
    selector: 'textarea#full-featured-non-premium',
    plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
    imagetools_cors_hosts: ['picsum.photos'],
    menubar: 'file edit view insert format tools table help',
    toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
    autosave_ask_before_unload: true,
    autosave_interval: "30s",
    autosave_prefix: "{path}{query}-{id}-",
    autosave_restore_when_empty: false,
    autosave_retention: "2m",
    image_advtab: true,
    content_css: '//www.tiny.cloud/css/codepen.min.css',
    importcss_append: true,
    template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
    template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
    height: 300,
    image_caption: true,
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_noneditable_class: "mceNonEditable",
    contextmenu: "link image imagetools table",
  },
}

const mutations = {
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    state[variable] = value
  },
  setToken (state,payload) {
    state.token = payload;
  },
  setContactus(state,payload) {
    state.contactus = payload;
  },
  setMaxPage(state,payload) {
    state.maxPage = payload;
  },
  setCurrentPage(state,payload) {
    state.currentPage = payload;
  },
  setNumberOfItems(state,payload) {
    state.numberOfItems = payload;
  },
  setAds(state,payload) {
    state.ads = payload;
  },
  setMembers(state,payload) {
    state.members = payload;
  },
  setJobtype(state,payload) { 
    state.jobtypes = payload;
  },
  setDeleteModalId(state, payload) {
    state.deleteModalId = payload;
  },
  setShowDeleteModal(state) {
    state.showDeleteModal = !state.showDeleteModal;
  },
  setCurrentItem(state,payload) {
    state.currentItemUrl = payload;
  },
  setShowLoader(state,payload) {
    state.showLoader = payload;
  },
  setEditModalId(state,payload) {
    state.editModalId = payload;
  },  
  setShowEditModal(state) {
    state.showEditModal = !state.showEditModal;
  },
  setSingleItemEdit(state, payload) {
    state.singleItemEdit = payload;
  },
  setEditLoader(state,payload) {
    state.editLoader = payload;
  },
  setEditItemId(state,payload) {
    state.editItemId = payload;
  },
  setJobtype(state,payload) { 
    state.jobtypes = payload;
  },
  setCategories(state,payload) {
    state.categories = payload
  },
  setTags(state,payload) {
    state.tags = payload;
  },
  setPosts(state,payload) {
    state.posts = payload;
  },
  setRecposts(state,payload) {
    state.recposts = payload;
  },
  setSlider(state,payload) {
    state.slider = payload;
  },
  setNewspapers(state, payload) {
    state.newspapers = payload;
  },
  setUsers(state,payload) {
    state.users = payload;
  },
  setPayments(state,payload) {
    state.payment = payload;
  },
  setTagsAll(state,payload) {
    state.tagAll = payload;
  } 
}

const getters = {
  isLoggedIn: state => !!state.token,
  contactus(state) {
    return state.contactus;
  },
  ads(state) {
    return state.ads;
  },
  members(state) {  
    return state.members;
  },
  jobtypes(state) {  
    return state.jobtypes;
  },
  categories(state) {  
    return state.categories;
  },
  tags(state) {
    return state.tags;
  },
  posts(state) {
    return state.posts;
  },
  recposts(state) {
    return state.recposts;
  },
  slider(state) {
    return state.slider;
  },
  newspapers(state) {
    return state.newspapers;
  },
  users(state) {
    return state.users;
  },
  payment(state) {
    return state.payment;
  },
  tagsAll(state) {
    return state.tagAll;
  }
}

const actions = {
  async getcontactus({commit,state},payload) {
    commit('setCurrentPage',payload);
    commit('setCurrentItem','contactus');
    await axios.get(`contactus/?limit=${state.itemsPerPage}&offset=${state.currentPage * state.itemsPerPage}`)
    .then(res => {
        commit('setContactus',res.data.results);
        commit('setNumberOfItems',res.data.count);
        commit('setMaxPage',0);
        if(state.numberOfItems > state.itemsPerPage) {
          let ceil = Math.ceil(res.data.count/state.itemsPerPage)
          commit('setMaxPage',ceil);
        }
    })
    .catch(() => {});
  },
  
  async getads( {commit,state}, payload) {
    commit('setCurrentPage',payload);
    commit('setCurrentItem','ads');
    // commit('setShowLoader',true);
    await axios.get(`ads/?limit=${state.itemsPerPage}&offset=${state.currentPage * state.itemsPerPage}`)
    .then(res => {
      commit('setAds',res.data.results);
      commit('setNumberOfItems',res.data.count);
      commit('setMaxPage',0);
      // commit('setShowLoader',false);
      if(state.numberOfItems > state.itemsPerPage) {
        let ceil = Math.ceil(res.data.count/state.itemsPerPage)
        commit('setMaxPage',ceil);
      }
    })
    .catch(() => {})
  },
  
  async getmembers( {commit,state}, payload) {
    commit('setCurrentPage',payload);
    commit('setCurrentItem','members');
    await axios.get(`members/?limit=${state.itemsPerPage}&offset=${state.currentPage * state.itemsPerPage}`)
    .then(res => {
      commit('setMembers',res.data.results);
      commit('setNumberOfItems',res.data.count);
      commit('setMaxPage',0);
      if(state.numberOfItems > state.itemsPerPage) {
        let ceil = Math.ceil(res.data.count/state.itemsPerPage)
        commit('setMaxPage',ceil);
      }
    })
    .catch(() => {})
  },

  async getjobtypes({commit,state}, payload) {
    commit('setCurrentPage',payload);
    commit('setCurrentItem','jobtypes');
    await axios.get(`jobtypes/?limit=${state.itemsPerPage}&offset=${state.currentPage * state.itemsPerPage}`)
    .then(res => {
      commit('setJobtype',res.data.results);
      commit('setNumberOfItems',res.data.count);
      commit('setMaxPage',0);
      if(state.numberOfItems > state.itemsPerPage) {
        let ceil = Math.ceil(res.data.count/state.itemsPerPage)
        commit('setMaxPage',ceil);
      }
    })
    .catch(() => {})
  },
  
  async getcategories({commit,state}, payload) {
    commit('setCurrentPage',payload);
    commit('setCurrentItem','categories');
    await axios.get(`categories/?limit=${state.itemsPerPage}&offset=${state.currentPage * state.itemsPerPage}`)
    .then(res => {
      commit('setCategories',res.data.results);
      commit('setNumberOfItems',res.data.count);
      commit('setMaxPage',0);
      if(state.numberOfItems > state.itemsPerPage) {
        let ceil = Math.ceil(res.data.count/state.itemsPerPage)
        commit('setMaxPage',ceil);
      }
    })
    .catch(() => {})
  },

  async gettags({commit,state}, payload) {
    commit('setCurrentPage',payload);
    commit('setCurrentItem','tags');
    await axios.get(`tags/?limit=${state.itemsPerPage}&offset=${state.currentPage * state.itemsPerPage}`)
    .then(res => {
      commit('setTags',res.data.results);
      commit('setNumberOfItems',res.data.count);
      commit('setMaxPage',0);
      if(state.numberOfItems > state.itemsPerPage) {
        let ceil = Math.ceil(res.data.count/state.itemsPerPage)
        commit('setMaxPage',ceil);
      }
    })
    .catch(() => {})
  },
  
  async gettagsall({commit}) {
    await axios.get(`tag/all/`)
    .then(res => {
      commit('setTagsAll',res.data);
    })
    .catch(() => {})
  },

  async getposts({commit,state}, payload) {
    commit('setCurrentPage',payload);
    commit('setCurrentItem','posts');
    await axios.get(`posts/?limit=${state.itemsPerPage}&offset=${state.currentPage * state.itemsPerPage}`)
    .then(res => {
      commit('setPosts',res.data.results);
      commit('setNumberOfItems',res.data.count);
      commit('setMaxPage',0);
      if(state.numberOfItems > state.itemsPerPage) {
        let ceil = Math.ceil(res.data.count/state.itemsPerPage)
        commit('setMaxPage',ceil);
      }
    })
    .catch(() => {})
  },

  async getrecposts({commit,state}, payload) {
    commit('setCurrentPage',payload);
    commit('setCurrentItem','recposts');
    await axios.get(`recposts/?limit=${state.itemsPerPage}&offset=${state.currentPage * state.itemsPerPage}`)
    .then(res => {
      commit('setRecposts',res.data.results);
      commit('setNumberOfItems',res.data.count);
      commit('setMaxPage',0);
      if(state.numberOfItems > state.itemsPerPage) {
        let ceil = Math.ceil(res.data.count/state.itemsPerPage)
        commit('setMaxPage',ceil);
      }
    })
    .catch(() => {})
  },

  async getsliders({commit,state}, payload) {
    commit('setCurrentPage',payload);
    commit('setCurrentItem','sliders');
    await axios.get(`sliders/?limit=${state.itemsPerPage}&offset=${state.currentPage * state.itemsPerPage}`)
    .then(res => {
      commit('setMaxPage',0);
      commit('setSlider',res.data.results);
      commit('setNumberOfItems',res.data.count);
      if(state.numberOfItems > state.itemsPerPage) {
        let ceil = Math.ceil(res.data.count/state.itemsPerPage)
        commit('setMaxPage',ceil);
      }
    })
    .catch(() => {})
  },

  async getnewspapers({commit,state}, payload) {
    commit('setCurrentPage',payload);
    commit('setCurrentItem','newspapers');
    await axios.get(`newspapers/?limit=${state.itemsPerPage}&offset=${state.currentPage * state.itemsPerPage}`)
    .then(res => {
      commit('setMaxPage',0);
      commit('setNewspapers',res.data.results);
      commit('setNumberOfItems',res.data.count);
      if(state.numberOfItems > state.itemsPerPage) {
        let ceil = Math.ceil(res.data.count/state.itemsPerPage)
        commit('setMaxPage',ceil);
      }
    })
    .catch(() => {})
  },
  async getusers({ commit, state }, payload) {
    commit('setCurrentPage',payload);
    commit('setCurrentItem','users');
    await axios.get(`users/?limit=${state.itemsPerPage}&offset=${state.currentPage * state.itemsPerPage}`)
    .then(res => {
      commit('setMaxPage',0);
      commit('setUsers',res.data.results);
      commit('setNumberOfItems',res.data.count);
      if(state.numberOfItems > state.itemsPerPage) {
        let ceil = Math.ceil(res.data.count/state.itemsPerPage)
        commit('setMaxPage',ceil);
      }
    })
    .catch(() => {}) 
  },

  async getpayment({ commit, state }, payload) {
    commit('setCurrentPage',payload);
    commit('setCurrentItem','payment');
    await axios.get(`payment-amounts/?limit=${state.itemsPerPage}&offset=${state.currentPage * state.itemsPerPage}`)
    .then(res => {
      commit('setMaxPage',0);
      commit('setPayments',res.data.results);
      commit('setNumberOfItems',res.data.count);
      if(state.numberOfItems > state.itemsPerPage) {
        let ceil = Math.ceil(res.data.count/state.itemsPerPage)
        commit('setMaxPage',ceil);
      }
    })
    .catch(() => {}) 
  },

  // DELETE ITEMS
  async delete( {dispatch,state,commit}, payload) {
    await axios.delete(payload)
    .then(() => {
      Vue.$toast("Muvaffaqiyatli o'chirildi.", {
        type: TYPE.SUCCESS
      });
      if(state.currentItemUrl == 'payment-amounts'){
        commit('setCurrentItem','payment');
      }
      if(state.numberOfItems == (state.itemsPerPage+1)) {
        commit('setMaxPage',0);
        dispatch(`get${state.currentItemUrl}`, state.currentPage - 1);
      } else {
        dispatch(`get${state.currentItemUrl}`,state.currentPage);
      }
    })
    .catch(() => {
      Vue.$toast('Xatolik yuz berdi.', {
        type: TYPE.ERROR
      })
    })
  },

  async edit( {commit}, payload) {
    commit('setEditLoader',true);
    await axios.get(payload)
    .then((res) => {
      commit('setEditLoader',false);
      commit('setSingleItemEdit',res.data);
    })
    .catch(() => {
      Vue.$toast('Xatolik yuz berdi.', {
        type: TYPE.ERROR
      })
    })
  },

  async update( {commit,dispatch,state}, payload) {
    await axios.patch(payload.url,payload.value)
    .then(() => {
      Vue.$toast("Muvaffaqiyatli o'zgartirildi.", {
        type: TYPE.SUCCESS
      });
      commit('setShowEditModal');
      if(state.currentItemUrl == 'payment-amounts'){
        commit('setCurrentItem','payment');
      }
      dispatch(`get${state.currentItemUrl}`,state.currentPage);
    })
    .catch(() => {
      Vue.$toast('Xatolik yuz berdi.', {
        type: TYPE.ERROR
      })
    })
  },

  async add( {dispatch,state},payload) {
    await axios.post(payload.url,payload.value)
    .then(() => {
      Vue.$toast("Muvaffaqiyatli o'zgartirildi.", {
        type: TYPE.SUCCESS
      });
      if(state.currentItemUrl == 'payment-amounts'){
        commit('setCurrentItem','payment');
      }
      dispatch(`get${state.currentItemUrl}`,state.currentPage);
    })
    .catch((err) => {
      Vue.$toast('Xatolik yuz berdi.', {
        type: TYPE.ERROR
      })
    })
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})