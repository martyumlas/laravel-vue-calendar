<template>
<v-container>
    <v-row class="fill-height">
      <form @submit.prevent="submit">
        <v-col>
          <v-row>
            <v-col>
              <v-text-field
              v-model="event.name"
              :rules="rules.details"
              label="Event"
              required
            ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="event.start"
                label="From"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="event.start"
              @input="menu = false"
            ></v-date-picker>
            </v-menu>


            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="event.end"
                  label="To"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="event.end"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>

          </v-row>
          <v-row>
            <v-col>
              <v-btn
                depressed
                color="primary"
                type="submit"
              >
                Save
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </form>
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
        ></v-calendar>
        <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x>
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</v-container>

</template>
<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
  export default {
    computed:mapGetters(['events']),
    data: () => ({
      event:{
        name: '',
        start: new Date().toISOString().substr(0, 10),
        end: new Date().toISOString().substr(0, 10),
      },

      menu: false,
      modal: false,
      menu2: false,
      focus: new Date().toISOString().substr(0, 10),
      type: 'month',
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      colors: ['blue'],
      rules: {
          details: [val => (val || '').length > 0 || 'This field is required'],
      },
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    }),
    mounted () {
      this.$refs.calendar.checkChange()
    },
    methods: {

      getEvents(){
        this.$store.dispatch('getEvents')
      },
      submit(e){
        e.preventDefault()
        this.event.color = this.colors[this.rnd(0, this.colors.length - 1)]
        this.$store.dispatch('addEvent', this.event)
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
        console.log(event)
        this.event = event
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },


    },
  }
</script>