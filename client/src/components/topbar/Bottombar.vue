<template>
  <v-card height="56px" flat id="bottomBar">
    <v-bottom-nav
      :value="true"
      fixed
      color="transparent"
    >
      <v-btn
        color="teal"
        flat
        value="map"
        :to="{ name: 'MapPage'}"
      >
        <img height="30" src="../../assets/images/map.png">
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="calendar"
        :to="{ name: 'calendar'}"
      >
        <img height="30" src="../../assets/images/calendar.png">
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="search"
        :to="{ name: 'search-friends'}"
      >
        <img height="30" src="../../assets/images/search_icon.png">
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="profile"
        :to="{ name: 'user-profile', params: { pseudo: activeUser.userPseudo }}"
      >
        <img height="30" src="../../assets/images/profile.png">
      </v-btn>
    </v-bottom-nav>
  </v-card>
</template>

<script>
import _service from '../../models/index'
import store from '@/store/store'

export default {
  name: 'Bottombar',
  data () {
    return {
      activeUser: {}
    }
  },
  methods: {
    /* If the active user is deconnected, we redirect the application on the log in page */
    async logOut () {
      await _service.user.clearLocalUserInformations()
      this.$router.push({name: 'sign'})
    },
    async loadActiveUser () {
      this.activeUser = store.getters.getUser
    }
  },
  watch: {
    async '$route' (to, from) {
      await this.loadActiveUser()
    }
  },
  async created () {
    await this.loadActiveUser()
  }
}
</script>

<style scoped>

</style>
