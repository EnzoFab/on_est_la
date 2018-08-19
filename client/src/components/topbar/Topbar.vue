<template>
  <v-container fluid grid-list-md text-xs-center id="topbar">
    <v-flex hidden-sm-and-up xs1>
      <v-btn icon ripple large @click="toogleMenu" >
        <v-icon large color="indigo darken-4"  id="toogleBtn">menu</v-icon>
      </v-btn>
    </v-flex>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated slideInLeft"
      leave-active-class="animated slideOutLeft"
      mode="out-in"
      :duration="200"
    >
      <v-layout row wrap justify-center align-center v-if="menuVisible">
        <v-flex md1 lg1 xl1 sm1  xs9 offset-xs3
                offset-md0 offset-lg0 offsetxl0 offsetsm0
                text-xs-start>
          <v-card flat :to="{ name: 'adminHome'}">
            <img src="../../assets/images/logo.png" @click="active(-1)">
          </v-card>
        </v-flex>
        <v-flex md2 lg2 xl2 sm2  xs9 offset-xs3
                offset-md1 offset-lg1 offset-xl1 offset-sm1
        >
          <v-card flat :to="{ name: 'MapPage'}">
            <img src="../../assets/images/map.png" @click="active(0)" @mouseover="show[0].show = true" @mouseleave="show[0].show = false">
            <hr>
            <transition name="fade"><h2 v-if="show[0].show || show[0].active">J'ai Soif</h2></transition>
          </v-card>
        </v-flex>
        <v-flex md2 lg2 xl2 sm2  xs9 offset-xs3
                offset-md0 offset-lg0 offset-xl0 offset-sm0
        >
          <v-card flat to="/calendar">
            <img src="../../assets/images/calendar.png" @click="active(1)" @mouseover="show[1].show = true" @mouseleave="show[1].show = false">
            <hr>
            <transition name="fade"><h2 v-if="show[1].show || show[1].active">Les Bails</h2></transition>
          </v-card>
        </v-flex>
        <v-flex md2 lg2 xl2 sm2 xs9 offset-xs3
                offset-md0 offset-lg0 offset-xl0 offset-sm0
        >
          <v-card flat to="/search-friends">
            <img src="../../assets/images/search_icon.png" @click="active(2)" @mouseover="show[2].show = true" @mouseleave="show[2].show = false">
            <hr>
            <transition name="fade" :duration="200"><h2 v-if="show[2].show || show[2].active">Adopte Un Pote</h2></transition>
          </v-card>
        </v-flex>
        <v-flex md2 lg2 xl2 sm2  xs9 offset-xs3
                offset-md0 offset-lg0 offset-xl0 offset-sm0
        >
          <v-card flat href>
            <!-- active(3) -->
            <img src="../../assets/images/profile.png"
                 @click="profileHandler"
                 @mouseover="show[3].show = true"
                 @mouseleave="show[3].show = false">
            <hr>
            <transition name="fade"><h2 v-if="show[3].show || show[3].active">Ma Grosse Tête</h2></transition>
          </v-card>
        </v-flex>
        <v-flex md2 lg2 xl2 sm2 xs9 offset-xs3
                offset-md0 offset-lg0 offset-xl0 offset-sm0
        >
          <v-card flat to="/home">
            <img src="../../assets/images/group.png" @click="active(2)" @mouseover="show[4].show = true" @mouseleave="show[4].show = false">
            <hr>
            <transition name="fade"><h2 v-if="show[4].show || show[4].active">Crew</h2></transition>
          </v-card>
        </v-flex>
      </v-layout>
    </transition>
  </v-container>
</template>

<script>
import Sidebar from './Sidebar'

export default {
  name: 'Topbar',
  components: {
    sidebar: Sidebar
  },
  data () {
    return {
      menuVisible: true,
      mql: window.matchMedia('(min-width: 600px)'),
      show: [{show: false, active: false}, {show: false, active: false}, {show: false, active: false}, {show: false, active: false}, {show: false, active: false}]
    }
  },
  methods: {
    profileHandler () {
      this.active(3)
      this.goToMyProfile()
    },
    toogleMenu () {
      this.menuVisible = !this.menuVisible
    },
    screenTest (e) {
      // handle responsivity
      if (e.matches) {
        this.menuVisible = true
      }
    },
    active (i) {
      this.show = [{show: false, active: false}, {show: false, active: false}, {show: false, active: false}, {show: false, active: false}, {show: false, active: false}]
      if (i > -1) {
        this.show[i].active = true
      }
    },
    goToMyProfile () {
      let pseudo = 'pluchezerrr' // Need to be taken in the local storage
      this.$router.push({ name: 'my-profile', params: { pseudo: pseudo } })
    }
  },
  mounted () {
    this.mql.addListener(this.screenTest)
  }

}
</script>

<style>
  .top-icon {
    background-color:  blue !important;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
