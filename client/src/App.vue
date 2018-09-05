<template>
  <v-app>
    <toplabel class="hidden-md-and-up" v-if="this.$store.getters.getIsLogged"></toplabel>
    <sidebar class="hidden-sm-and-down" v-if="this.$store.getters.getIsLogged"></sidebar>
    <!--<CustomSpinner :isLoading="showSpinner" class="mb-3"/> -->
    <transition name="custom-classes-transition"
                enter-active-class="animated fadeIn"
                leave-active-class="animated bounceOutDown"
                mode="out-in"
                :duration="500"
    >
      <v-container id="mainPage" style="padding-top:50px; padding-bottom: 50px">
        <router-view></router-view>
      </v-container>
    </transition>
    <bottombar class="hidden-md-and-up" v-if="this.$store.getters.getIsLogged"></bottombar>
  </v-app>
</template>

<script>
import topbar from '@/components/topbar/Topbar'
import navbar from '@/components/topbar/Navbar'
import CustomSpinner from './components/Spinner'
import Sidebar from './components/topbar/Sidebar'
import bottombar from './components/topbar/Bottombar'
import toplabel from './components/topbar/Toplabel'

export default {
  name: 'App',
  components: {
    Sidebar,
    CustomSpinner,
    navbar,
    toplabel,
    bottombar,
    'topbar': topbar
  },
  data () {
    return {
    }
  },
  methods: {

  },
  async created () {
  },
  computed: {
    showSpinner () {
      return this.$store.getters.getSpinnerVisibility
    }
  }
}
</script>

<style src="../static/Style.css"></style>
