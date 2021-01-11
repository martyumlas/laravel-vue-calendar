<template>
  <form  @submit.prevent="submit">
        <v-col>
          <v-row>
            <v-col>
              <v-text-field
              v-model="event.title"
              :rules="rules.title"
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
          <v-row v-if="!event.daysOfWeek" >
            <v-checkbox  v-for="(day,index) in days" :key="index"
            v-model="selected"
            :label="day.name"
            :value="day.val"

          ></v-checkbox>
          </v-row>

          <v-row v-else >
            <v-checkbox  v-for="(day,index) in days" :key="index"
            v-model="event.daysOfWeek"
            :label="day.name"
            :value="day.val"

          ></v-checkbox>
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
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: mapGetters(['event', 'isEditing']),
    data : () => ({
        menu: false,
        modal: false,
        menu2: false,

      selected:[],
      days:[
        {name: 'sun', val : 0},
        {name: 'mon', val : 1},
        {name: 'tue', val : 2},
        {name: 'wed', val : 3},
        {name: 'thurs', val : 4},
        {name: 'fri', val : 5},
        {name: 'sat', val : 6},
      ],

      rules: {
          name: [val => (val || '').length > 0 || 'This field is required'],
      },
       colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    }),
    methods:{

      submit(e){
        e.preventDefault()
        if(!this.isEditing){
          this.event.color = this.colors[this.rnd(0, this.colors.length - 1)]        }
        this.event.days = this.event.daysOfWeek ? this.event.daysOfWeek :  this.selected
        this.$store.dispatch('addEvent', this.event)
        this.selected = []
        this.event.daysOfWeek = []
        this.event.title = ''
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
    },

    mounted() {

    }
}
</script>

<style>

</style>