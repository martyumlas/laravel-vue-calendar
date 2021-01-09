import Vue from 'vue'
import router from './router'

import vuetify from './vuetify'

//Main pages
import App from './views/App.vue'


const app = new Vue({
    el: '#app',
    vuetify,
    router,
    components: { App }
});