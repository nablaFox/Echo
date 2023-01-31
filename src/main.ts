import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueFire, VueFireAuth } from 'vuefire'

import App from './App.vue'
import { firebaseApp } from './firebase'
import router from './router'

import '@/assets/styles/index.scss'

const app = createApp(App)

app.use(VueFire, {
    firebaseApp,
    modules: [ VueFireAuth() ]
})

app.use(createPinia())
app.use(router)

app.mount('#app')
