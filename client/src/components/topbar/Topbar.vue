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
      :duration="500"
    >
      <v-layout row wrap justify-center align-center v-if="menuVisible">
        <v-flex md1 lg1 xl1 sm1  xs9 offset-xs3
                offset-md0 offset-lg0 offsetxl0 offsetsm0
                text-xs-start>
          <v-card flat to="/home">
            <img src="../../assets/images/logo.png">
          </v-card>
        </v-flex>
        <v-flex md2 lg2 xl2 sm2  xs9 offset-xs3
                offset-md1 offset-lg1 offset-xl1 offset-sm1
        >
          <v-card flat>
            <img src="../../assets/images/map.png">
            <hr>
            <h2>J'ai Soif</h2>
          </v-card>
        </v-flex>
        <v-flex md2 lg2 xl2 sm2  xs9 offset-xs3
                offset-md0 offset-lg0 offset-xl0 offset-sm0
        >
          <v-card flat>
            <img src="../../assets/images/calendar.png">
            <hr>
            <h2>Les Bails</h2>
          </v-card>
        </v-flex>
        <v-flex md2 lg2 xl2 sm2 xs9 offset-xs3
                offset-md0 offset-lg0 offset-xl0 offset-sm0
        >
          <v-card flat>
            <img src="../../assets/images/search_icon.png">
            <hr>
            <h2>Adopte Un Pote</h2>
          </v-card>
        </v-flex>
        <v-flex md2 lg2 xl2 sm2  xs9 offset-xs3
                offset-md0 offset-lg0 offset-xl0 offset-sm0
        >
          <v-card flat to="/my-profile">
            <img src="../../assets/images/profile.png">
            <hr>
            <h2>Ma Grosse Tête</h2>
          </v-card>
        </v-flex>
        <v-flex md2 lg2 xl2 sm2 xs9 offset-xs3
                offset-md0 offset-lg0 offset-xl0 offset-sm0
        >
          <v-card flat>
            <img src="../../assets/images/group.png">
            <hr>
            <h2>Crew</h2>
          </v-card>
        </v-flex>
      </v-layout>
    </transition>
  </v-container>
</template>

<script>
export default {
  name: 'Topbar',
  data () {
    return {
      menuVisible: true,
      mql: window.matchMedia('(min-width: 600px)')
    }
  },
  computed: {
    toogleBtnVisibility () {
      return document.querySelector('.hidden-sm-and-up')
    }
  },
  watch: {
    menuVisible (v) {
      console.log(this.toogleBtnVisibility)
    }
  },
  methods: {
    toogleMenu () {
      this.menuVisible = !this.menuVisible
    },
    screenTest (e) {
      // handle responsivity
      if (e.matches) {
        this.menuVisible = true
      }
    }
  },
  mounted () {
    console.log(this.toogleBtnVisibility)
    this.mql.addListener(this.screenTest)
  }

}
</script>

<style>
  .top-icon {
    background-color:  blue !important;
  }
</style>
