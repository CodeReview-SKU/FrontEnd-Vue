import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import hljs from 'highlight.js/lib/core';
import java from 'highlight.js/lib/languages/java'; // Java 언어 지원 추가
import 'highlight.js/styles/vs2015.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)
hljs.registerLanguage('java', java);

app.mount('#app')
