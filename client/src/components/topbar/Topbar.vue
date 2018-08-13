<template>
  <v-container grid-list-md text-xs-center id="topbar">
    <v-layout row wrap justify-center>
      <v-flex xs2>
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
          <h3>Adopte Un Pote</h3>
        </v-card>
      </v-flex>
      <v-flex xs2>
        <v-card flat to="/my-profile">
          <img src="../../assets/images/profile.png">
          <hr>
          <h3>Ma Grosse Tête</h3>
        </v-card>
      </v-flex>
      <v-flex xs2>
        <v-card flat>
          <img src="../../assets/images/group.png">
          <hr>
          <h2>Mes Crew</h2>
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
