<template>
  <v-toolbar height="150" flat>
    <v-toolbar-items id="toolbar" class="hidden-sm-and-down align-center">
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

export default {
  name: 'Sidebar',
  data () {
    return {
      activeUser: {
        userPseudo: {}
      }
    }
  },
  methods: {
    async logOut () {
      await _service.user.clearLocalUserInformations()
      this.$router.push({name: 'sign'})
    },
    async loadActiveUser () {
      await _service.user.getLoggedUser()
        .then(res => {
          this.activeUser = res
        })
        .catch(e => {
          console.log(e)
        })
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
