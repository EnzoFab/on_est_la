<template>
  <v-form class="signForm" @keyup.native.enter="submit" ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="newUser.userName"
      :rules="rules[0]"
      placeholder="Nom"
      required
      color="indigo darken-4"
    ></v-text-field>
    <v-text-field
      v-model="newUser.userFirstname"
      :rules="rules[1]"
      placeholder="Prénom"
      required
      color="indigo darken-4"
    ></v-text-field>
    <v-text-field
      v-model="newUser.userPseudo"
      :rules="rules[2]"
      placeholder="Pseudo"
      required
      color="indigo darken-4"
    ></v-text-field>
    <v-text-field
      v-model="newUser.userMail"
      :rules="rules[3]"
      placeholder="Email"
      required
      color="indigo darken-4"
    ></v-text-field>
    <v-text-field
      v-model="newUser.userPass"
      :rules="rules[4]"
      placeholder="Mot de passe"
      required
      color="indigo darken-4"
    ></v-text-field>
    <v-text-field
      v-model="passConfirmation"
      :rules="rules[5]"
      placeholder="Mot de passe (confirmation)"
      required
      color="indigo darken-4"
    ></v-text-field>
    <v-text-field
      v-model="newUser.userPhone"
      placeholder="Portable (facultatif)"
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
        Valider
      </v-btn>
      <v-btn
        flat
        color="amber darken-4"
        @click="signIn"
        block
      >
        Retour
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
  name: 'SignUp',
  data: () => ({
    newUser: {},
    valid: true,
    passConfirmation: null,
    rules: [
      [v => !!v || 'Balance ton prénom.'],
      [v => !!v || 'Ton nom flingué ?'],
      [v => !!v || 'Choisis un pseudo soigné.'],
      [v => !!v || 'Ton email gros !',
        v => /.+@.+/.test(v) || "C'est quoi ça ? Un email stp."],
      [v => !!v || 'Ton mot de passe gros ?!',
        v => (v && v.length >= 6) || 'Au moins 6 caractères cousine.'],
      [v => !!v || 'Confirme ton mdp bordel.']
    ],
    alert: false,
    errorMessage: ''
  }),

  methods: {
    async submit () {
      if (this.$refs.form.validate()) {
        if (this.newUser.userPhone.length === 10 || this.newUser.userPhone.length === 0) {
          if (this.passConfirmation === this.newUser.userPass) {
            this.newUser.userDateInscription = new Date()
            this.$emit('load', true)
            await _service.user.signUp(this.newUser)
              .then(res => {
                this.$emit('formSended', res)
                this.$emit('load', false)
              })
              .catch(e => {
                this.errorMessage = 'Impossible de créer le compte.'
                this.alert = true
              })
          } else {
            this.errorMessage = 'Confirmation de mot de passe incorrecte.'
            this.alert = true
          }
        } else {
          this.errorMessage = 'Numéro de téléphone incorrecte (10 chiffres requis).'
          this.alert = true
        }
      }
    },

    signIn () {
      this.$emit('changeViewToSignIn', 'in')
    }
  },
  created () {
    this.newUser = (new _service.UserModel())._attributes
  }
}
</script>

<style scoped>

</style>
