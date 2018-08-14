<template>
  <v-layout row justify-end>
    <v-flex xs12>
      <v-card-title primary-title>
        <h3 class="noto text-grey">FRIENDS</h3>
      </v-card-title>
      <v-card flat class="scroll" :height="size">
        <v-list>
          <v-list-tile
            v-for="friend in friends"
            :key="friend.user_id"
            avatar
            @click="true"
          >
            <v-list-tile-content>
              <v-list-tile-title class="text-uppercase" v-text="friend.user_name+' '+friend.user_firstname"></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-avatar>
              <img src='../../assets/images/enzo.jpg'>
            </v-list-tile-avatar>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import {User} from '../../models/User_model'
export default {
  name: 'Friendlist',
  data () {
    return {
      friends: fakeFriends(10),
      size: 300
    }
  }
}

function fakeFriends (nb) {
  let f = []
  for (let i = 0; i < nb; i++) {
    let ff = new User()
    let friend = ff.mutations()
    friend.user_id = i
    friend.user_name = 'Name' + i
    friend.user_firstname = 'Firstname' + i
    f.push(friend)
  }
  return f
}
</script>

<style scoped>
  .v-list__tile:hover {
    background: rgba(0,0,0,0.04) !important;
  }
</style>
