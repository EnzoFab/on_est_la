<template>
  <v-layout row justify-end align-center>
    <!-- Friend list card -->
    <v-flex xs10>
      <!-- Headers -->
      <v-layout row justify-space-between>
        <v-card-title primary-title>
          <h3 class="noto text-grey">HOMIES</h3>
        </v-card-title>
        <v-flex xs6>
          <v-text-field
            :onkeyup="searchFunction()"
            id="friends-search"
            prepend-icon="search"
            label="Search"
            v-model="search"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <!-- Body content -->
      <v-card flat class="scroll" :height="size">
        <v-list id="friends-list">
          <v-list-tile
            v-for="friend in friends"
            :key="friend.userId"
            avatar
            @click="true"
            :id="'friendlist-'+friend.userId"
          >
            <!-- Hover zone -->
            <v-list-tile-content class="friend-row">
              <v-list-tile-title class="text-uppercase" align-center>
                <v-layout row align-center>
                  <!-- Icon -->
                  <i class="material-icons pr-5">
                    chat
                  </i>
                  <p :id="'row-friendlist-'+friend.userId">{{ friend.userName }} {{ friend.userFirstname }}</p>
                </v-layout>
              </v-list-tile-title>
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
// import {User} from '../../models/user_model/User_model'
import {SearchService} from '../../helpers/Search'
const searchService = new SearchService()

export default {
  name: 'Friendlist',
  props: ['friendlist'],
  data () {
    return {
      search: '',
      friends: this.friendlist,
      size: 300,
      searchFunction: function () {
        searchService.search()
      }
    }
  },
  created: function () {
    console.log('hey : ', this.friendlist)
  }
}

/* function fakeFriends (nb) {
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
} */
</script>

<style>
  /*.friend-row:hover {
    background-color: #eee !important;
  }*/
</style>
