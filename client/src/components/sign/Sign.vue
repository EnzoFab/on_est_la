<template>
  <v-container fluid id="signPage">
    <v-layout id="signContent"
              row wrap
              align-center
              justify-center
    >
      <v-flex xs10 sm6 lg3>
        <signin v-if="signInForm" @changeViewToSignUp="changeForm" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SignIn from './SignIn'

export default {
  name: 'Sign',
  data: () => ({
    signInForm: true
  }),
  components: {
    signin: SignIn
  },
  methods: {
    changeForm () {
      this.signInForm = !this.signInForm
    }
  }
}
</script>

<style scoped>
#signContent {
  padding-top: 18% !important;
}

.v-form {
  background-color: white !important;
  padding: 20px !important;
}
</style>
