import 'core-js/stable';
import Vue from 'vue';
import App from './App';
import axios from 'axios';
import router from './router';
import CoreuiVue from '@coreui/vue';
import Toast from 'vue-toastification';
import "vue-toastification/dist/index.css";
import VoerroTagsInput from '@voerro/vue-tagsinput';
import "@voerro/vue-tagsinput/dist/style.css";
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import 'vue-search-select/dist/VueSearchSelect.css'


const options = {
  position: "top-right",
  timeout: 1000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false,
  transition: "Vue-Toastification__fade"
};

Vue.use(Toast,options);
Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.component('tags-input', VoerroTagsInput);
Vue.component('date-pick',DatePick);
Vue.prototype.$log = console.log.bind(console)
Vue.prototype.$http = axios;
axios.defaults.baseURL = "https://21asr.uz/api/";
const token = localStorage.getItem('token');
if(token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  }
})
