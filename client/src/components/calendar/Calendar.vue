<template>
  <v-layout>
    <vue-event-calendar
      class="mb-3"
      :events="demoEvents"
      :title="'Eh ça dit quoi ?'"
    >
    </vue-event-calendar>
  </v-layout>
</template>

<script>
export default {
  name: 'Calendar',
  data () {
    return {
      demoEvents: [{
        date: '2018/11/12', // Required
        title: 'Foo' // Required
      }, {
        date: '2018/12/16',
        title: 'Bar',
        desc: 'description',
        customClass: 'disabled highlight' // Custom classes to an calendar cell
      }]
    }
  }
}
</script>

<style>

</style>
