<template>
  <v-menu
    :close-on-content-click="false"
    v-model="menu2"
    :nudge-right="40"
    lazy
    transition="scale-transition"
    offset-y
    full-width
    max-width="290px"
    min-width="290px"
  >
    <v-btn
      slot="activator"
      prepend-icon="event"
      readonly
      fab
      medium
      dark
      color="indigo darken-4"
    ><v-icon>alarm</v-icon></v-btn>
    <v-date-picker v-model="date" no-title @input="menu2 = false"></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: 'DatePicker',
  props: {
    inputTitle: {
      type: String,
      required: false,
      default: 'Quel jour ?'
    },
    inputHint: {
      type: String,
      required: false,
      default: 'En vrai, jeudi non ?'
    }
  },
  data: () => ({
    date: null,
    dateFormatted: null,
    menu1: false,
    menu2: false
  }),

  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    }
  },

  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
      this.$emit('datePicked', this.dateFormatted)
    }
  },

  methods: {
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  }
}
</script>

<style scoped>

</style>
