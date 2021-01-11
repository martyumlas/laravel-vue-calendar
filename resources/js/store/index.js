import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { forEach } from 'lodash'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        events: [],
        dates: {},
        event:{
          title: '',
          start: new Date().toISOString().substr(0, 10),
          end: new Date().toISOString().substr(0, 10),
        },
        isEditing:false,
        message: '',
    },
    actions:{
        async addEvent({dispatch, commit}, payload) {
          commit('setMessage', '')
            try {
              const res = await axios.post('api/events',payload)
              dispatch('getEvents')
              commit('setMessage', res.data.success)
            } catch (error) {
                console.log(error)
            }
        },
        async getEvents ({commit, state}) {

          try {
            const res = await axios.get('api/events')
            const data = res.data
            const events = []
            data.forEach(event => {

              let days = JSON.parse(event.days)

              if(days.length) {

                events.push({
                      title : event.title,
                      color : event.color,
                      daysOfWeek : days,
                      startRecur : event.start,
                      endRecur : event.end,
                      start : event.start,
                      end : event.end,
                      id : event.id,
                      allDay:true,
                    })

              }else {
                events.push({
                  title : event.title,
                  start : event.start,
                  end : event.end,
                  color : event.color,
                  id: event.id,
                  allDay:true,
                })
              }


            });

            commit('setEvents', events)

          } catch (error) {
            console.log(error)
          }

          //   const res = await axios.get('api/events')
          //   const data = res.data
          //   const events = []


          // for (let i = 0; i < data.length; i++) {
          //   let days = JSON.parse(data[i]['days'])
          //   if(days) {

          //     commit('setDates', days)
          //   }

          //   else{
          //     events.push({
          //       id: data[i]['id'],
          //       name: data[i]['title'],
          //       start: data[i]['start'],
          //       end: data[i]['end'],
          //       color: data[i]['color'],
          //     })
          //   }
          //   }
          //  commit('setEvents', events)
        },
    },
    mutations:{
        setEvents : (state, events) => state.events = events,
        addEvent : (state, event) => state.events.push(event),
        setDates : (state, days) => state.dates = days,
        isEditing : (state, status) => state.isEditing = status,
        setEvent : (state, event) => state.event = event,
        setMessage : (state, message) => state.message = message


    },
    getters:{
        events: (state) => state.events,
        dates: (state) => state.dates,
        isEditing : (state) => state.isEditing,
        event : (state) => state.event,
        message: (state) => state.message
    }
})

export default store