import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        events: [],
    },
    actions:{
        async addEvent({dispatch}, payload) {
            try {
              const res = await axios.post('api/events',payload)
                console.log(res)
              dispatch('getEvents')
            } catch (error) {
                console.log(error)
            }
        },
        async getEvents ({commit, state}) {
            const res = await axios.get('api/events')
            const data = res.data
            const events = []
            for (let i = 0; i < data.length; i++) {

              events.push({
                id: data[i]['id'],
                name: data[i]['name'],
                start: data[i]['start'],
                end: data[i]['end'],
                color: data[i]['color'],
              })
            }

           commit('setEvents', events)
        },
    },
    mutations:{
        setEvents : (state, events) => state.events = events,
        addEvent : (state, event) => state.events.push(event),
    },
    getters:{
        events: (state) => state.events
    }
})

export default store