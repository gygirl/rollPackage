import { createApp,Vue } from 'vue'
import App from './App.vue'
import axios from 'axios'
import vueAxios from 'vue-axios'


createApp(App).mount('#app');
Vue.use(vueAxios,axios);
