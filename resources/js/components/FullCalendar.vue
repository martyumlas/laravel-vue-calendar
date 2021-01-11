<template>
<v-col>

   <!-- <FullCalendar :options="calendarOptions" :events="events" /> -->

   <FullCalendar :options="{
  ...calendarOptions,
  events: events
}" />

</v-col>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
    computed: mapGetters(['events', 'event']),
    components: {
        FullCalendar // make the <FullCalendar> tag available
    },
  data() {
    return {
       calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        editable: true,
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick,
        eventClick: this.handleEventClick,

      },

      testevents : [ {title: 'event 1', date: '2021-01-01' }]
    }
  },
  methods:{
      handleEventClick(info){

        this.$store.commit('isEditing', true)
        this.events.find(event => {
            event.id == info.event.id || event.id == info.groupId ? this.$store.commit('setEvent', event) : ''
        })

         console.log(this.event)
      }
  },
  mounted(){

  }
}
</script>
<style>

</style>