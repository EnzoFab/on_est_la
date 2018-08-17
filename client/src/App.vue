<template>
  <v-app>
    <topbar v-if="false"></topbar>
    <!--<CustomSpinner :isLoading="showSpinner" class="mb-3"/> -->
    <transition name="custom-classes-transition"
                enter-active-class="animated fadeIn"
                leave-active-class="animated bounceOutDown"
                mode="out-in"
                :duration="500"
    >
      <router-view/>
    </transition>
  </v-app>
</template>

<script>
import topbar from '@/components/topbar/Topbar'
import CustomSpinner from './components/Spinner'

export default {
  name: 'App',
  components: {
    CustomSpinner,
    'topbar': topbar
  },
  computed: {
    showSpinner () {
      return this.$store.getters.getSpinnerVisibility
    }
  }
}
</script>

<style src="../static/Style.css"></style>
