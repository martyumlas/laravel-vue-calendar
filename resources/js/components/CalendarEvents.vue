<template>
     <v-col>
      <v-sheet height="64">
        <v-toolbar
          flat
        >
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @change="getEvents"
        >
        </v-calendar>

      </v-sheet>
    </v-col>
</template>

<script>

import {mapGetters} from 'vuex'
export default {
    computed:mapGetters(['events']),
    data : () => ({

        focus: new Date().toISOString().substr(0, 10),
        type: 'month',
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,

    }),
    methods:{
        getEvents(){
            this.$store.dispatch('getEvents')
        },
        getEventColor (event) {
            return event.color
        },
        setToday () {
            this.focus = ''
        },
        prev () {
            this.$refs.calendar.prev()
        },
        next () {
            this.$refs.calendar.next()
        },
        showEvent ({ nativeEvent, event }) {

            this.$store.commit('isEditing', true),
            this.$store.commit('setEvent', event)


        },

    },
     mounted () {
      this.$refs.calendar.checkChange()


    },
}
</script>

<style>

</style>