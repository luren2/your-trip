import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import paina from './stores';

import 'normalize.css';
import '@/assets/css/index.css';

createApp(App).use(router).use(paina).mount('#app');
