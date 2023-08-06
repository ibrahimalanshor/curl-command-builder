import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { setupStore } from './store/setup';
import { setupRouter } from './router/setup';
import { useDynamicLayout } from './plugins/dynamic-layout';
import { useClickOutside } from './plugins/click-outside';

const app = createApp(App);

useDynamicLayout(app);
useClickOutside(app);

setupStore(app);
setupRouter(app);

app.mount('#app');
