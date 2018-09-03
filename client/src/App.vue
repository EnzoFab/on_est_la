<template>
  <v-app>
    <sidebar class="hidden-sm-and-down" v-if="this.$store.getters.getIsLogged"></sidebar>
    <!--<CustomSpinner :isLoading="showSpinner" class="mb-3"/> -->
    <transition name="custom-classes-transition"
                enter-active-class="animated fadeIn"
                leave-active-class="animated bounceOutDown"
                mode="out-in"
                :duration="500"
    >
      <router-view/>
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

export default {
  name: 'App',
  components: {
    Sidebar,
    CustomSpinner,
    navbar,
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
