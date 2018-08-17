<template>
  <v-container fluid id="signPage">
    <v-layout id="signContent"
              row wrap
              align-center
              justify-center
    >
      <v-flex xs10 sm6 lg3>
        <spinner v-show="isLoading" :isLoading="isLoading" class="mb-3"/>
        <signin v-show="!isLoading" v-if="signForm === 'in'" @changeViewToSignUp="changeForm"></signin>
        <signup v-show="!isLoading"
                v-if="signForm === 'up'"
                @changeViewToSignIn="changeForm"
                @load="showSpinner"
                @formSended="recapNewUser"></signup>
        <v-card v-if="signForm === 'recap'" color="indigo darken-3" flat class="white--text">
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-title primary-title class="justify-center">
                <div>
                  <v-icon color="success" size="100">done_all</v-icon>
                  <h3 class="headline mb-4 success--text">Propre.</h3>
                  <div class="recapText">Un email de confirmation vient d'être envoyé à ton adresse</div>
                  <div class="recapText"><b>{{ createdUser.userMail }}</b></div>
                  <div class="recapText mt-4">Active ton compte pour pouvoir te connecter et être super là</div>
                  <v-btn
                    color="success"
                    @click="changeForm('in')"
                    block
                    class="mt-5"
                  >
                    Alright, ok
                  </v-btn>
                </div>
              </v-card-title>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SignIn from './SignIn'
import SignUp from './SignUp'
import CustomSpinner from '../Spinner'

export default {
  name: 'Sign',
  data: () => ({
    signForm: 'in',
    isLoading: false,
    createdUser: {}
  }),
  components: {
    signin: SignIn,
    signup: SignUp,
    spinner: CustomSpinner
  },
  methods: {
    changeForm (form) {
      this.signForm = form
    },
    recapNewUser (value) {
      this.createdUser = value
      this.signForm = 'recap'
    },
    showSpinner (state) {
      this.isLoading = state
    }
  }
}
</script>

<style scoped>
#signContent {
  padding-top: 10% !important;
}

.v-form {
  background-color: white !important;
  padding: 20px !important;
}

.recapText {
  color: #FF8F00 !important;
}

.recapText b{
  color: #FF6F00 !important;
}
</style>
