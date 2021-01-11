<template>
 <div>
    <div class="container">
        <h1>Calendar</h1>
    </div>
    
    <hr>

    <v-container>

    <v-row class="fill-height">

      <Alert/>
      <CalendarInput/>
      <!-- <CalendarEvents/> -->
      <FullCalendar/>
  </v-row>
</v-container>

  </div>

</template>
<script>
import axios from 'axios'
import CalendarInput from './CalendarInput'
import CalendarEvents from './CalendarEvents'
import FullCalendar from './FullCalendar'
import Alert from './Alert'
import moment from 'moment'
  export default {
    components: {CalendarInput, CalendarEvents, Alert, FullCalendar},

    data: () => ({




    }),

    mounted() {
      this.$store.dispatch('getEvents')
    },

    methods: {


    },
  }
</script>