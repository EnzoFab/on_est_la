<template class="signForm">
  <v-form @keyup.native.enter="submit" ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="identifiant"
      :rules="identifiantRules"
      placeholder="Pseudo ou Email"
      required
      color="indigo darken-4"
      class="signField"
    ></v-text-field>
    <v-text-field
      v-model="password"
      :rules="passwordRules"
      placeholder="Mot de passe"
      required
      color="indigo darken-4"
    ></v-text-field>
    <v-layout row wrap>
      <v-btn
        :disabled="!valid"
        flat
        color="success"
        @click="submit"
        block
      >
        Se Connecter
      </v-btn>
      <v-btn
        flat
        color="amber darken-4"
        @click="signUp"
        block
      >
        S'inscrire
      </v-btn>
    </v-layout>
    <v-alert
      :value="alert"
      color="error"
    >
      {{ errorMessage }}
    </v-alert>
  </v-form>

</template>

<script>
import _service from '../../models/index'

export default {
  name: 'sign-in',
  data: () => ({
    valid: true,
    identifiant: '',
    identifiantRules: [
      v => !!v || "T'as cru t'allais te connecter sans identifiant ?"
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Abuse pas, met ton mot de passe'
    ],
    alert: false,
    errorMessage: 'Identifiant et/ou mot de passe incorrects.'
  }),

  methods: {
    async submit () {
      if (this.$refs.form.validate()) {
        await _service.user.signIn(this.identifiant, this.password)
          .then(res => {
            // nothing
          })
          .catch(e => {
            this.alert = true
          })
      }
    },

    signUp () {
      this.$emit('changeViewToSignUp', 'up')
    }
  }
}
</script>

<style scoped>

</style>
