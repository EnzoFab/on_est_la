<template>
  <v-container fluid grid-list-md text-xs-center id="topbar">
    <v-layout row wrap justify-center align-center>
      <v-flex xs1 text-xs-start>
        <v-card flat to="/home">
          <img src="../../assets/images/logo.png">
        </v-card>
      </v-flex>
      <v-flex xs2 offset-xs1>
        <v-card flat>
          <img src="../../assets/images/map.png">
          <hr>
          <h2>J'ai Soif</h2>
        </v-card>
      </v-flex>
      <v-flex xs2>
        <v-card flat>
          <img src="../../assets/images/calendar.png">
          <hr>
          <h2>Les Bails</h2>
        </v-card>
      </v-flex>
      <v-flex xs2>
        <v-card flat>
          <img src="../../assets/images/search_icon.png">
          <hr>
          <h2>Adopte Un Pote</h2>
        </v-card>
      </v-flex>
      <v-flex xs2>
        <v-card flat to="/my-profile">
          <img src="../../assets/images/profile.png">
          <hr>
          <h2>Ma Grosse Tête</h2>
        </v-card>
      </v-flex>
      <v-flex xs2>
        <v-card flat>
          <img src="../../assets/images/group.png">
          <hr>
          <h2>Crew</h2>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Topbar'
}
</script>

<style>
  .top-icon {
    background-color:  blue !important;
  }
</style>
