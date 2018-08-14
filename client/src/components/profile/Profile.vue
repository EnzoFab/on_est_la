<template>
  <v-container fluid grid-list-sm text-xs-center>
    <v-layout row wrap align-center>
      <!-- Profile picture & Names -->
      <v-flex xs3>
        <v-layout row wrap >
          <v-flex xs12 class="thumbnail">
            <img class="img-circle img-profile" src="../../assets/images/enzo.jpg">
          </v-flex>
          <v-flex xs12>
            <v-card-text class="primetime text-darkgrey">
              <h2>{{user.user_name}} {{ user.user_firstname}}</h2>
            </v-card-text>
          </v-flex>
          <v-flex xs12>
            <v-card-text class="font-italic text-grey">
              {{ user.user_pseudo}}
            </v-card-text>
          </v-flex>
          <v-flex xs12>
            <v-card-text class="text-justify profile-legend">
              {{ user.user_description}}
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs6>
        <v-card-text>
          1
        </v-card-text>
      </v-flex>
      <v-flex xs3>
        <friendlist></friendlist>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {User} from '../../models/User_model'
import friendList from '../friendlist/Friendlist'
let userModel = new User()
let user = userModel.mutations()
user.user_firstname = 'Fabre'
user.user_name = 'Enzo'
user.user_pseudo = '@enzolezozio'
user.user_description = "Salut la compagnie ! Moi c'est Enzo mais tu peux m'appeler Zozio comme tout mes amis ! Haha. J'espère qu'on se verra vite dans les nuits Montpellieraines, bisous hihi !"
export default {
  name: 'Profile',
  data () {
    return {
      message: 'Welcome to Your On est là hein App',
      user: user
    }
  },
  components: {
    'friendlist': friendList
  }
}
</script>

<style scoped>
  .profile-legend {
    padding-left: 15%;
    padding-right: 15%;
  }
</style>
