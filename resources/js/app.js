import Vue from 'vue'

import vuetify from './vuetify'

//Main pages
import App from './views/App.vue'


const app = new Vue({
    el: '#app',
    vuetify,
    components: { App }
});