<template>
  <v-toolbar height="150" flat>
    <v-toolbar-items id="toolbar" class="align-center">
      <v-btn class="pl-5 pr-5" flat :to="{ name: 'adminHome'}">
        <img height="100" src="../../assets/images/logo.png">
      </v-btn>
      <v-btn class="pl-5 pr-5" flat :to="{ name: 'MapPage'}">
        <img height="100" src="../../assets/images/map.png">
      </v-btn>
      <v-btn class="pl-5 pr-5" flat :to="{ name: 'calendar'}">
        <img height="100" src="../../assets/images/calendar.png">
      </v-btn>
      <v-btn class="pl-5 pr-5" flat :to="{ name: 'search-friends'}">
        <img height="100" src="../../assets/images/search_icon.png">
      </v-btn>
      <v-btn class="pl-5 pr-5" flat :to="{ name: 'user-profile', params: { pseudo: activeUser.userPseudo }}">
        <img height="100" src="../../assets/images/profile.png">
      </v-btn>
      <v-btn class="pl-5 pr-5" flat :to="{ name: 'home'}">
        <img height="100" src="../../assets/images/group.png">
      </v-btn>
      <v-btn class="pl-5 pr-5" flat @click="logOut">
        <v-icon color="error">close</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import _service from '../../models/index'
import store from '@/store/store'

export default {
  name: 'Sidebar',
  data () {
    return {
      activeUser: {}
    }
  },
  methods: {
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
#toolbar {
  margin: auto !important;
}
</style>
