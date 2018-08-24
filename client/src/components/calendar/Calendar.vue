<template>
  <v-layout row wrap justify-center align-center>
    <v-layout row wrap justify-center>
      <v-flex xs2>
        <v-btn disabled block>{{ switchLabel }}</v-btn>
        <v-switch
          v-model="switchEvent"
        ></v-switch>
      </v-flex>

    </v-layout>
    <v-flex xs12>
      <vue-event-calendar
        class="mb-3"
        :events="eventsDisplayed"
        :title="'LES BAILS'"
      >
        <template slot-scope="props">
          <div v-for="(event) in props.showEvents" v-if="event.users.length > 0" :key="event.date+'-'+event.place.placeId" class="event-item">
            <v-card-title primary-title>
              <v-layout row justify-space-between>
                <v-layout row>
                  <v-badge
                    color="amber accent-4"
                    left
                    overlap
                    class="mr-4"
                  >
                    <span slot="badge">{{ event.users.length }}</span>
                    <v-icon
                      large
                      :color="event.colorIcon"
                      @click="chooseEvent(event)"
                    >{{ event.icon }}</v-icon>
                  </v-badge>
                  <h3>{{ event.title }}</h3>
                </v-layout>
                <h3 right>{{ moment(event.date).format('DD/MM/YYYY') }}</h3>
              </v-layout>
            </v-card-title>
            <v-list style="max-height: 300px" class="scroll mb-3">
              <v-list-tile
                v-for="item in event.users"
                :key="item.userPseudo"
                avatar
                @click="true"
              >
                <v-list-tile-content>
                  <v-list-tile-title v-text="item.userName + ' ' + item.userFirstname"></v-list-tile-title>
                  <v-list-tile-sub-title>{{ '@' + item.userPseudo }}</v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-avatar>
                  <!--<img :src="item.avatar">-->
                  <img src='../../assets/images/enzo.jpg'>
                </v-list-tile-avatar>
              </v-list-tile>
            </v-list>
          </div>
        </template>
      </vue-event-calendar>
    </v-flex>
    <!-- EVENT DIALOG -->
    <v-dialog v-if="pickedEvent !== null" v-model="eventDialog" max-width="500px">
      <v-card>
        <v-card-title primary-title class="text-xs-left">
          <v-layout row wrap justify-space-between>
            <h3 class="headline mb-0">{{ pickedEvent.place.placeName }}</h3>
            <h4 class="text-grey mb-0 text-uppercase">{{ moment(pickedEvent.date).format('dddd DD MMMM') }}</h4>
          </v-layout>
        </v-card-title>
        <v-card-title>
          <div class="mt-3">{{ pickedEvent.place.placeDescription }}</div>
        </v-card-title>
        <!-- ADD PLACE -->
        <v-card-actions v-if="pickedEvent.icon === 'directions_run'" @click.stop="eventDialog=false">
          <v-btn large block flat color="error" dark>En fait non
          </v-btn>
          <v-btn large block
                 color="success"
                 @click="addFrequent(pickedEvent)"
                 dark>
            <v-icon left dark>directions_run</v-icon>
            feu
            <v-icon right dark>directions_run</v-icon>
          </v-btn>
        </v-card-actions>
        <!-- REMOVE PLACE -->
        <v-card-actions v-if="pickedEvent.icon === 'done_all'" @click.stop="eventDialog=false">
          <v-btn large block flat color="success" dark>nickel
          </v-btn>
          <v-btn large block
                 color="error"
                 @click="removeFrequent(pickedEvent)"
                 dark>
            <v-icon left dark>directions_run</v-icon>
            Fuite
            <v-icon right dark>directions_run</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import _service from '../../models/index'
import moment from 'moment'
import store from '../../store/store'

export default {
  name: 'Calendar',
  data () {
    return {
      moment: moment,
      demoEvents: [{
        date: '2018/11/12', // Required
        title: 'Fo' // Required
      }, {
        date: '2018/12/16',
        title: 'Bar',
        desc: 'description',
        customClass: 'disabled highlight' // Custom classes to an calendar cell
      }],
      switchEvent: false,
      switchLabel: 'Tout les bails',
      eventsDisplayed: [],
      events: [],
      friendsEvent: [],
      myEvents: [],
      pickedEvent: null,
      eventDialog: false
    }
  },
  methods: {
    /* ========= LOAD METHODS ========= */
    async loadEvents () {
      this.friendsEvent = await _service.frequentUser.findAllFrequentFriends()
      this.myEvents = await _service.frequentUser.findAllFrequentFromUser()
      this.events = this.friendsEvent
      this.eventsFusion()
    },

    /* ========= VIEW METHODS ========= */
    async changeEventsDisplayed () {
      this.eventsDisplayed = this.myEvents
    },

    chooseEvent (event) {
      this.pickedEvent = event
      this.eventDialog = true
    },

    /* ========= BUSINESS METHODS ========= */
    eventsFusion () {
      let eventSolo = []
      // For each event of active user
      for (let myE of this.myEvents) {
        let isAdded = false
        myE.colorIcon = 'success'
        myE.icon = 'done_all'
        myE.isUserFrequent = true
        // For each friend events
        for (let e of this.events) {
          if (e.date === myE.date && e.place.placeId === myE.place.placeId) {
            // We add the user in the right date & we mark this date
            e.isUserFrequent = true
            e.colorIcon = 'success'
            e.icon = 'done_all'
            e.users.push(myE.users[0])
            isAdded = true
          }
        }
        if (!isAdded) {
          eventSolo.push(myE)
        }
      }
      for (let e of this.events) {
        if (e.colorIcon !== 'success') {
          e.colorIcon = 'indigo darken-4'
          e.icon = 'directions_run'
        }
      }
      for (let myE of eventSolo) {
        this.events.push(myE)
      }
    },

    async addFrequent (event) {
      let frequent = {
        userId: store.getters.getUser.userId,
        placeId: event.place.placeId,
        frequentDateStart: event.frequentDateStart,
        frequentUserDateEnd: event.frequentDateStart,
        frequentUserVisibility: 'public'
      }
      let res = await _service.frequentUser.create(frequent)
      if (res) {
        let newUser = {
          userName: store.getters.getUser.userName,
          userFirstname: store.getters.getUser.userFirstname,
          userPseudo: store.getters.getUser.userPseudo
        }
        event.users.push(newUser)
        event.icon = 'done_all'
        event.colorIcon = 'success'
      }
    },

    async removeFrequent (event) {
      let frequent = {
        userId: store.getters.getUser.userId,
        placeId: event.place.placeId,
        frequentDateStart: event.frequentDateStart
      }
      let res = await _service.frequentUser.delete(frequent)
      if (res) {
        let oldUser = {
          userName: store.getters.getUser.userName,
          userFirstname: store.getters.getUser.userFirstname,
          userPseudo: store.getters.getUser.userPseudo
        }
        event.users.splice(event.users.indexOf(oldUser), 1)
        event.icon = 'directions_run'
        event.colorIcon = 'indigo darken-4'
      }
    }
  },
  watch: {
    switchEvent () {
      if (this.switchEvent) {
        this.switchLabel = 'Mes bails'
        this.eventsDisplayed = this.myEvents
      } else {
        this.switchLabel = 'Tout les bails'
        this.eventsDisplayed = this.events
      }
    }
  },
  async created () {
    await this.loadEvents()
    // We show the friends / user events
    this.eventsDisplayed = this.events
  }
}
</script>

<style>

.v-input--selection-controls__input {
  margin: auto !important;
}
</style>
