import Vue from 'vue'
import router from './router'
import vuetify from './vuetify'
import VueTextareaAutosize from 'vue-textarea-autosize'
import App from './views/App.vue'
import store from './store'

Vue.use(VueTextareaAutosize)


const app = new Vue({
    el: '#app',
    vuetify,
    router,
    store,
    components: { App }
});