<template>
    <v-container v-model="isReady">
      {{ isReady }}
        <v-btn color="info" v-on:click="test">Change</v-btn>
      <v-flex v-if="isReady">
        <v-btn color="success">Success</v-btn>
      </v-flex>
    </v-container>
</template>

<script>
/* eslint-disable */
const isReady = false

export default {
  name: 'Search_user',
  data () {
    return {
      isReady: true
    }
  },
  methods: {
    test: function () {
      this.isReady = false
    }
  }
}

function test () {
  this.isReady = false
}
</script>

<style scoped>

</style>
