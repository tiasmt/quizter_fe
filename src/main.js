import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrophy, faQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import store from './store'
import GameHub from './gamehub'

let baseUrl = ''
if (process.env.NODE_ENV === 'production') {
   baseUrl = 'https://quizster-backend.herokuapp.com';
} else {
   baseUrl = 'https://localhost:5001';
}
export const apiRestHost = baseUrl + '/rest/api/latest';

// Setup axios as the Vue default $http library
axios.defaults.baseURL = baseUrl; // same as the Url the server listens to
Vue.prototype.$http = axios

library.add(faTrophy, faQuestion)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(GameHub);

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')