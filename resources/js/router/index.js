import Vue from 'vue'
import VueRouter from 'vue-router'
import Calendar from '../components/Calendar'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes : [
        {
            path: '/',
            component: Calendar

        }
    ]
})

export default router;