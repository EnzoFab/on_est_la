<template>
  <div id="app">
    <topbar></topbar>
    <CustomSpinner :isLoading="showSpinner" class="mb-"/>
    <transition name="custom-classes-transition"
                enter-active-class="animated fadeIn"
                leave-active-class="animated bounceOutDown"
                mode="out-in"
                :duration="500"
    >
      <router-view/>
    </transition>
  </div>
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

<style src="./Style.css">
</style>
