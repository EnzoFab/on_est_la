<template>
  <v-app>
    <sidebar v-if="isLogged"></sidebar>
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
import navbar from '@/components/topbar/Navbar'
import _service from './models/index'

import CustomSpinner from './components/Spinner'
import Sidebar from './components/topbar/Sidebar'

export default {
  name: 'App',
  components: {
    Sidebar,
    CustomSpinner,
    navbar,
    'topbar': topbar
  },
  data () {
    return {
      isLogged: false
    }
  },
  methods: {
    async isUserLogged () {
      console.log('triggered')
      try {
        /* eslint-disable */
        let activeUser = await _service.user.isLogged()
        this.isLogged = true
      } catch (e) {
        this.isLogged = false
      }
    }
  },
  async created () {
    await this.isUserLogged()
    this.$router.beforeEach((to, from, next) => {
      try {
        /* eslint-disable */
        let activeUser = _service.user.isLogged()
          .then((res) => {
            this.isLogged = true
            console.log(this.isLogged)
            next()
          })
          .catch(e => {
            console.log(this.isLogged)
            this.isLogged = false
            next('sign-in')
          })
      } catch (e) {
        console.log(this.isLogged)
        this.isLogged = false
        next('sign-in')
      }
    })
  },
  computed: {
    showSpinner () {
      return this.$store.getters.getSpinnerVisibility
    }
  },
  watch: {
    '$router': 'isUserLogged'
  }
}
</script>

<style src="../static/Style.css"></style>
