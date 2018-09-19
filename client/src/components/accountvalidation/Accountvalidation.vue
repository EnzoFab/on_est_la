<template>
  <v-container fluid grid-list-sm>
    <spinner v-show="isLoading" :isLoading="isLoading" class="mb-3"></spinner>
    <v-layout id="signContent"
              row wrap
              align-center
              justify-center
    >
      <v-flex xs10 sm6 lg3>
        <v-card v-if="isValid" color="indigo darken-3" flat class="white--text">
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-title primary-title class="justify-center">
                <div>
                  <v-icon color="success" size="100">done_all</v-icon>
                  <h3 class="headline mb-4 success--text">T'es chaud mec.</h3>
                  <div class="recapText">Toi t'es super là. T'as validé ton compte sans pression.</div>
                  <div class="recapText"><b>{{ user.userPseudo }}</b></div>
                  <div class="recapText mt-4">Go go go te connecter et commencer à poser les bails tmtc.</div>
                  <v-btn
                    color="success"
                    @click="goSignInPage()"
                    block
                    class="mt-5"
                  >
                    Alright, okkk
                  </v-btn>
                </div>
              </v-card-title>
            </v-flex>
          </v-layout>
        </v-card>
        <v-card v-if="!isValid" color="indigo darken-3" flat class="white--text">
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-title primary-title class="justify-center">
                <div>
                  <h3 class="headline mb-4 success--text">Un problème est survenue.</h3>
                  <v-btn
                    color="success"
                    @click="goSignInPage()"
                    block
                    class="mt-5"
                  >
                    F*ck
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
import CustomSpinner from '../Spinner'
import _service from '../../models/index'

export default {
  name: 'accountvalidation',
  components: {
    spinner: CustomSpinner
  },
  props: {
    token: {
      type: String,
      required: false,
      default: () => null
    }
  },
  /* ============ VARIABLES ============ */
  data () {
    return {
      isLoading: false,
      isValid: false,
      user: {}
    }
  },
  created: async function () {
    this.checkToken()
  },
  methods: {
    async checkToken () {
      this.isLoading = true
      let res = await _service.user.validAccount(this.token)
      if (res.length !== 0) {
        this.isValid = true
        this.user = res[0]
      } else {
        this.isValid = false
      }
      this.isLoading = false
    },
    goSignInPage () {
      this.$router.push({ name: 'sign' })
    }
  }
}
</script>

<style scoped>

</style>
