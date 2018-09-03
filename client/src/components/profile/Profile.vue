<template>
  <v-container fluid grid-list-sm>
    <spinner v-show="isLoading" :isLoading="isLoading" class="mb-3"></spinner>
    <v-layout row wrap v-if="!isLoading">
      <!-- Profile picture & Names -->
      <v-flex text-xs-center xs12 md3 class="border-right">
        <v-layout row wrap >
          <v-flex xs12 class="primetime text-darkgrey">
            <!-- Follow button -->
            <v-btn
              :color="btnColor"
              block
              :disabled="isUserActive"
              depressed large class="mb-4"
              @click="friendBtnAction"
            >
              {{ btnLabel }}
            </v-btn>
          </v-flex>
          <v-flex xs12>
            <img height="150" class="img-circle img-profile" src="../../assets/images/enzo.jpg">
          </v-flex>
          <v-flex xs12 class="primetime text-darkgrey">
            <h2>{{user.userName}} {{ user.userFirstname}}</h2>
          </v-flex>
          <v-flex xs12 class="font-italic text-grey text-lowercase">
              @{{ user.userPseudo}}
          </v-flex>
          <v-flex xs12>
            <v-textarea
              v-model="user.userDescription"
              auto-grow
              :disabled="!isUserActive"
              flat
              solo
              color="deep-purple"
              label="Bio"
              rows="2"
            ></v-textarea>
            <v-btn
              color="success"
              block
              v-if="isUserActive"
              depressed large class="mb-4"
              @click="saveProfile"
            >
              sauvegarder
            </v-btn>
            <v-snackbar
              color="indigo darken-4"
              v-model="snackbar.state"
              :timeout="snackbar.timeout"
              :top="true"
            >
              {{ snackbar.text }}
              <v-btn
                color="success"
                flat
                @click="snackbar.state = false"
              >
                alright ok
              </v-btn>
            </v-snackbar>
            <!--<v-card-text class="text-justify profile-legend bold">
              {{ user.userDescription}}
            </v-card-text>-->
          </v-flex>
        </v-layout>
      </v-flex>

      <!-- Stats -->
      <v-flex class="pl-4" xs12 md6 text-xs-left>
        <v-card-text>
          <!-- Notifications -->
          <v-layout v-if="isUserActive" row align-center class="mb-5"
                    slot="activator"
                    color="primary"
                    dark
          >
            <v-badge
              color="amber accent-4"
              left
              overlap
              class="mr-4"
            >
              <span slot="badge">{{ invitations.length }}</span>
              <v-icon
                large
                color="indigo darken-4"
                @click="dialogOpen(true)"
              >notifications</v-icon>
            </v-badge>
            <v-layout column>
              <h3>Notifications</h3>
            </v-layout>
          </v-layout>

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
                <h3 class="bold" style="color: #1A237E">{{ listoffriends.length }}</h3>
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
          <v-tooltip v-if="isViewPublic" left>
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
                <h3 class="bold" style="color: #1A237E">{{ numberFrequent }}</h3>
                <h3>Apéritifs</h3>
              </v-layout>
            </v-layout>
            <span>Nombre total de fragata !</span>
          </v-tooltip>

          <!-- Stats -->
          <v-tooltip v-if="isViewPublic" left>
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
                <h3 class="bold" style="color: #E65100">{{ ratioFrequent }}</h3>
                <h3>Nuits par semaine</h3>
              </v-layout>
            </v-layout>
            <span>Moyenne de Panama par semaine</span>
          </v-tooltip>
        </v-card-text>
      </v-flex>

      <!-- Friend list -->
      <v-flex class="border-left" xs12 md3>
        <friendlist v-if="!isLoading"
                    :friendlist="listoffriends"
                    :sizeInput="300"
                    :isLink="true"
        ></friendlist>
      </v-flex>
      <!-- Dialog Notifications -->
      <v-dialog v-model="dialogNotifications" scrollable max-width="600px">
        <v-card>
          <v-card-title>Notifications</v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: 400px;">
            <v-list two-line subheader>
              <v-list-tile
                v-for="item in invitations"
                :key="item.userId"
                avatar
                @click="true"
              >
                <v-list-tile-avatar @click="goToProfile(item)">
                  picture
                </v-list-tile-avatar>
                <v-list-tile-content @click="goToProfile(item)">
                  <v-list-tile-title>{{ item.userName + ' ' + item.userFirstname }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ '@' + item.userPseudo }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon ripple>
                    <v-icon color="success" @click="acceptInvitation(item.userId)">check_circle</v-icon>
                  </v-btn>
                  <v-btn icon ripple @click="refuseInvitation(item.userId)">
                    <v-icon color="error">close</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="blue darken-1" flat @click.native="dialogOpen(false)">Close</v-btn>
            <v-btn color="blue darken-1" flat @click.native="dialogOpen(false)">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script src="./ProfileLogic.js"></script>

<style scoped>
  .profile-legend {
    padding-left: 15%;
    padding-right: 15%;
  }
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
