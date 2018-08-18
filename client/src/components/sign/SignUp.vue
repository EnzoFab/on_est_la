<template>
  <v-form class="signForm" @keyup.native.enter="submit" ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="newUser.userName"
      :rules="rules[0]"
      placeholder="Prénom"
      required
      color="indigo darken-4"
    ></v-text-field>
    <v-text-field
      v-model="newUser.userFirstname"
      :rules="rules[1]"
      placeholder="Nom"
      required
      color="indigo darken-4"
    ></v-text-field>
    <v-text-field
      v-model="newUser.userPseudo"
      :error-messages="pseudoCheckMessage"
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
      type="password"
      color="indigo darken-4"
    ></v-text-field>
    <v-text-field
      v-model="passConfirmation"
      :rules="rules[5]"
      type="password"
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
    errorMessage: '',
    pseudoCheckMessage: ''
  }),

  methods: {
    async submit () {
      if (this.$refs.form.validate()) {
        if (this.newUser.userPhone.length === 10 || this.newUser.userPhone.length === 0) {
          if (this.passConfirmation === this.newUser.userPass) {
            this.newUser.userDateInscription = new Date()
            this.$emit('load', true)
            try {
              let res = await _service.user.signUp(this.newUser)
              this.$emit('formSended', res)
              this.$emit('load', false)
            } catch (e) {
              this.$emit('load', false)
              this.errorMessage = 'Cet email est déjà utilisé soeurette.'
              this.alert = true
            }
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

    async isPseudoTaken () {
      try {
        let res = await _service.user.findOneFromPseudo(this.newUser.userPseudo)
        if (res.length > 0) {
          this.pseudoCheckMessage = 'Pseudo déjà pris morray.'
        } else {
          this.pseudoCheckMessage = ''
        }
      } catch (e) {
        this.pseudoCheckMessage = 'Pseudo déjà pris morray.'
      }
    },

    signIn () {
      this.$emit('changeViewToSignIn', 'in')
    }
  },
  watch: {
    'newUser.userPseudo': function (v) {
      if (v) this.isPseudoTaken()
    }
  },
  created () {
    this.newUser = (new _service.UserModel())._attributes
  }
}
</script>

<style scoped>

</style>
