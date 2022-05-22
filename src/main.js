import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Maska from 'maska';
import VueAxios from 'vue-axios';
import axios from './plugins/axios';
import vClickOutside from 'click-outside-vue3';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(VueAxios, axios);
app.provide('axios', app.config.globalProperties.axios);
app.use(Maska);
app.use(vClickOutside);
app.mount('#app');
