<template>
  <v-container fluid grid-list-sm text-xs-center>
    <v-layout row wrap align-center :v-if="isReady">
      <!-- Profile picture & Names -->
      <v-flex xs3>
        <v-layout row wrap >
          <v-flex xs12 class="thumbnail">
            <img class="img-circle img-profile" src="../../assets/images/enzo.jpg">
          </v-flex>
          <v-flex xs12>
            <v-card-text class="primetime text-darkgrey">
              <h2>{{user.user_name}} {{ user.user_firstname}}</h2>
            </v-card-text>
          </v-flex>
          <v-flex xs12>
            <v-card-text class="font-italic text-grey text-lowercase">
              {{ user.user_pseudo}}
            </v-card-text>
          </v-flex>
          <v-flex xs12>
            <v-card-text class="text-justify profile-legend">
              {{ user.user_description}}
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs6>
        <v-card-text>
          <div>
            <v-btn small color="error">Error</v-btn>
          </div>
        </v-card-text>
      </v-flex>
      <v-flex xs3>
        <friendlist :friendlist="friends"></friendlist>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script src="./ProfileLogic.js"></script>

<style scoped>
  .profile-legend {
    padding-left: 15%;
    padding-right: 15%;
  }
</style>
