<template>
  <v-container fluid>
    <v-layout row wrap>
      <sidemenu :title="menuTitle" :items="menuItems"></sidemenu>
      <v-flex>
        <router-view></router-view>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Sidemenu from '../sidemenu/Sidemenu'

const menuItems = [
  { title: 'Places', icon: 'flag' },
  { title: 'About', icon: 'question_answer' }
]

export default {
  name: 'AdminHome',
  components: {
    'sidemenu': Sidemenu
  },
  data () {
    return {
      menuTitle: 'Gères les bails',
      menuItems: menuItems
    }
  },
  created: async function () {
    this.$router.push({name: 'placeManagement'})
  }
}
</script>

<style scoped>

</style>
