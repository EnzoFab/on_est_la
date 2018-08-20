<template>
  <v-layout>
    <vue-event-calendar
      class="mb-3"
      :events="events"
      :title="'Eh ça dit quoi ?'"
    >
    </vue-event-calendar>
  </v-layout>
</template>

<script>
import _service from '../../models/index'

export default {
  name: 'Calendar',
  data () {
    return {
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
