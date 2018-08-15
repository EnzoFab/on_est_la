<template>
  <v-container v-model="isReady">
    <v-layout row wrap justify-center>
      <v-flex xs4>
        <autocomplete @input="loadUserSearch" :isAsync="true" :items="items"></autocomplete>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable */
import Autocomplete from "../autocomplete/Autocomplete";
import _userService from '../../models/user_model/User_services'

let items = []

export default {
  name: 'Search_user',
  components: {
    Autocomplete
  },
  data () {
    return {
      isReady: true,
      items: []
    }
  },
  methods: {
    test: function () {
      this.isReady = false
    },
    loadUserSearch: async function (value) {
      await findAllFromSearchBar(value)
      console.log('items : ', items)
      this.items = items
    }
  }
}

async function findAllFromSearchBar (value) {
  if (value !== null && value !== '') {
    await _userService.findAllFromSearchBar(value)
      .then((res) => {
        items = res.data
      })
      .catch(e => {
        console.log(e)
      })
  } else {
    items = []
  }

}
</script>

<style scoped>

</style>
