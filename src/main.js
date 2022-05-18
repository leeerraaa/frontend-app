import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Maska from 'maska';
import vClickOutside from 'click-outside-vue3';

createApp(App).use(store).use(router).use(Maska).use(vClickOutside).mount('#app');
