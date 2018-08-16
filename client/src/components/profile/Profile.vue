<template>
  <v-container fluid grid-list-sm>
    <spinner v-show="!isReady" :isLoading="!isReady" class="mb-3"/>
    <v-layout row wrap v-if="isReady">
      <!-- Profile picture & Names -->
      <v-flex text-xs-center xs3 class="border-right">
        <v-layout row wrap >
          <v-flex xs12 class="primetime text-darkgrey">
            <!-- Follow button -->
            <v-btn v-if="isFriend == 'not-friend'"
                   @mouseover="changeContentFollowBtn(true, false)"
                   @mouseleave="changeContentFollowBtn(false, false)"
                   @click="becomeFriend"
                   depressed large class="mb-4 hover-success" color="error"
            >
              {{ msgFollow }}
            </v-btn>
            <v-btn v-else
                   @mouseover="changeContentFollowBtn(true, false)"
                   @mouseleave="changeContentFollowBtn(false, false)"
                   depressed large class="mb-4 hover-success" color="success"
            >
              {{ msgFollow }}
            </v-btn>
          </v-flex>
          <v-flex xs12 class="thumbnail">
            <img class="img-circle img-profile" src="../../assets/images/enzo.jpg">
          </v-flex>
          <v-flex xs12 class="primetime text-darkgrey">
              <h2>{{user.userName}} {{ user.userFirstname}}</h2>
          </v-flex>
          <v-flex xs12 class="font-italic text-grey text-lowercase">
              @{{ user.userPseudo}}
          </v-flex>
          <v-flex xs12>
            <v-card-text class="text-justify profile-legend bold">
              {{ user.userDescription}}
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-flex>

      <!-- Stats -->
      <v-flex class="pl-4" xs6 text-xs-left>
        <v-card-text v-model="friendsList">
          <!-- Foolowers -->
          <v-tooltip left>
            <v-layout row align-center class="mb-4"
                      slot="activator"
                      color="primary"
                      dark
            >
              <v-badge overlap class="mr-3">
                <v-avatar
                  color="indigo darken-4"
                >
                  <v-icon dark>whatshot</v-icon>
                </v-avatar>
              </v-badge>
              <v-layout column>
                <h3 class="bold" style="color: #1A237E">{{ friendsList.length }}</h3>
                <h3>Followers</h3>
              </v-layout>
            </v-layout>
            <span>
              <v-layout row align-center>
                Amis de boisson <i class="material-icons ml-2" style="font-size: 0.9em">favorite</i>
              </v-layout>
            </span>
          </v-tooltip>

          <!-- Apéritifs -->
          <v-tooltip left>
            <v-layout row align-center class="mb-4"
                      slot="activator"
                      color="primary"
                      dark
            >
              <v-badge overlap class="mr-3">
                <v-avatar
                  color="indigo darken-4"
                >
                  <v-icon dark>local_bar</v-icon>
                </v-avatar>
              </v-badge>
              <v-layout column>
                <h3 class="bold" style="color: #1A237E">45</h3>
                <h3>Apéritifs</h3>
              </v-layout>
            </v-layout>
            <span>Nombre total de fragata !</span>
          </v-tooltip>

          <!-- Stats -->
          <v-tooltip left>
            <v-layout row align-center class="mb-4"
                      slot="activator"
                      color="primary"
                      dark
            >
              <v-badge overlap class="mr-3">
                <v-avatar
                  color="amber accent-4"
                >
                  <v-icon dark>show_chart</v-icon>
                </v-avatar>
              </v-badge>
              <v-layout column>
                <h3 class="bold" style="color: #E65100">2,4</h3>
                <h3>Nuits par semaine</h3>
              </v-layout>
            </v-layout>
            <span>Moyenne de Panama par semaine</span>
          </v-tooltip>
        </v-card-text>
      </v-flex>

      <!-- Friend list -->
      <v-flex class="border-left" xs3>
        <friendlist v-if="isFriendsReady"
                    :friendlist="friendsList"
                    :sizeInput="300"
                    :isLink="true"
        ></friendlist>
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
