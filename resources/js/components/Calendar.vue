<template>
<v-container>
    <v-row class="fill-height">
      <Alert/>
      <CalendarInput/>
      <!-- <CalendarEvents/> -->
      <FullCalendar/>
  </v-row>
</v-container>

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