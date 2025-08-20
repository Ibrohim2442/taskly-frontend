import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(Toast, {
    position: POSITION.TOP_RIGHT,
    timeout: 2500,
    pauseOnHover: false,
    closeOnClick: true,
    maxToasts: 4,
    newestOnTop: true,
    toastClassName: [
        'backdrop-blur-lg',
        'bg-white/30',
        'border',
        'border-white/40',
        'shadow-lg',
        'text-gray-800',
        'rounded-xl',
        'px-4',
        'py-3'
    ].join(" "),
    hideProgressBar: false,
    transition: 'Vue-Toastification__bounce',
    draggable: true,
    draggablePercent: 0.5,
    closeButton: false,
    icon: true
});

app.mount('#app')
