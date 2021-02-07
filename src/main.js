import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrophy, faQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import store from './store'

let baseUrl = ''
if (process.env.NODE_ENV === 'production') {
   baseUrl = '';
} else {
   baseUrl = 'https://localhost:5001/rest/api/latest';
}

export const apiHost = baseUrl;

library.add(faTrophy, faQuestion)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
// Vue.use(GameHub);

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')