<template>
  <v-layout>
    <vue-event-calendar
      class="mb-3"
      :events="events"
      :title="'LES BAILS'"
    >
      <template scope="props">
        <div v-for="(event, index) in props.showEvents" class="event-item">
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
                    color="indigo darken-4"
                  >flight_takeoff</v-icon>
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
  </v-layout>
</template>

<script>
import _service from '../../models/index'
import moment from 'moment';

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
      events: [],
      friendsEvent: [],
      myEvents: []
    }
  },
  methods: {
    /* ========= LOAD METHODS ========= */
    async loadEvents () {
      this.friendsEvent = await _service.frequentUser.findAllFrequentFriends()
      this.myEvents = await _service.frequentUser.findAllFrequentFromUser()
      this.events = this.myEvents
    }
  },
  async created () {
    await this.loadEvents()
    console.log('RESULTAT : ', this.events)
  }
}
</script>

<style>

</style>
