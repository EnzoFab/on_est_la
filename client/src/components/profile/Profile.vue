<template>
  <v-container fluid grid-list-sm>
    <spinner v-show="isLoading" :isLoading="isLoading" class="mb-3"></spinner>
    <v-layout row wrap v-if="!isLoading">
      <!-- Header -->
      <v-flex text-xs-center xs12 md3>
        <v-layout row wrap justify-center>

          <!-- Picture -->
          <v-flex xs4 >
            <img height="70" class="img-circle img-profile" :src="user.userPicture">
          </v-flex>

          <v-flex xs8>
            <!-- Followers && Aperitif -->
            <v-layout row>
              <v-flex @click="dialogFriendOpen(true)">
                <h3 class="bold" style="color: #1A237E">{{ friendList.length }}</h3>
                <h3 class="caption">Followers</h3>
              </v-flex>
              <v-flex>
                <h3 class="bold" style="color: #1A237E">{{ numberFrequent }}</h3>
                <h3 class="caption">Apéritifs</h3>
              </v-flex>
            </v-layout>

            <!-- Follow button -->
            <v-btn
              :color="btnColor"
              block
              small
              v-if="!isUserActive"
              :disabled="isUserActive"
              depressed
              @click="friendBtnAction"
            >
              {{ btnLabel }}
            </v-btn>
            <v-btn
              color="white"
              block
              small
              v-if="isUserActive"
              depressed
              @click="saveProfile"
            >
              Modifier Le Profil
            </v-btn>
            <v-btn
              color="red"
              block
              small
              v-if="isUserActive"
              depressed
              @click="logOut"
            >
              Déconnexion
            </v-btn>
          </v-flex>

          <!-- User Pseudo -->
          <v-flex xs12 class="mt-3">
            <h3 class="body-1 font-weight-bold text-xs-left">{{user.userName}} {{ user.userFirstname}}</h3>
            <h5 class="font-italic font-weight-light text-grey text-xs-left">@{{ user.userPseudo}}</h5>
          </v-flex>

          <!-- User description -->
          <v-flex xs12>
            <h5 class="body-1 text-xs-left">{{ user.userDescription}}</h5>

            <!-- Alert confirmation -->
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
          </v-flex>
        </v-layout>
      </v-flex>

      <!-- Content -->
      <v-flex xs12 md6 text-xs-left>

        <!-- Notifications -->
        <v-btn
          color="white"
          block
          small
          v-if="isUserActive"
          depressed
          @click="dialogOpen(true)"
        >
          {{ invitations.length }} notifications
        </v-btn>
      </v-flex>

      <v-flex xs12 class="pt-5">
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
                <h4 class="bold text-xs-right" style="color: #E65100">{{ ratioFrequent }}</h4>
                <h4 class="text-xs-right">Nuits par semaine</h4>
              </v-layout>
            </v-layout>
            <span>Moyenne de Panama par semaine</span>
          </v-tooltip>
      </v-flex>

      <!-- Dialog Notifications -->
      <v-dialog v-model="dialogNotifications" scrollable fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-card-title>
            <v-btn icon color="blue darken-1" flat @click.native="dialogOpen(false)">
              <v-icon>chevron_left</v-icon>
            </v-btn>
            Notifications
          </v-card-title>
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
        </v-card>
      </v-dialog>
      <!-- Dialog friendlist -->
      <v-dialog v-model="dialogFriendList" scrollable fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-card-title>
            <v-btn icon color="blue darken-1" flat @click.native="dialogFriendOpen(false)">
              <v-icon>chevron_left</v-icon>
            </v-btn>
            Homies
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: 400px;">
            <v-list two-line subheader>
              <v-list-tile
                v-for="item in friendList"
                :key="item.userId"
                avatar
                @click="true"
              >
                <v-layout row wrap>
                  <v-flex xs8>
                    <v-layout>
                      <v-avatar
                        slot="activator"
                        size="40px"
                        class="mr-2"
                        @click="goToProfile(item)"
                      >
                        <img
                          src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                          alt="Avatar"
                        >
                      </v-avatar>
                      <v-list-tile-content @click="goToProfile(item)">
                        <v-list-tile-title>{{ item.userName + ' ' + item.userFirstname }}</v-list-tile-title>
                        <v-list-tile-sub-title>{{ '@' + item.userPseudo }}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-layout>
                  </v-flex>
                  <v-flex xs4>
                    <v-list-tile-action>
                      <v-btn depressed
                             block
                             outline
                             @click="unfollow(item.userId)"
                             color="indigo darken-4">
                        copain
                      </v-btn>
                    </v-list-tile-action>
                  </v-flex>
                </v-layout>
              </v-list-tile>
            </v-list>
          </v-card-text>
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

  .v-card__title {
    max-height: 50px !important;
  }
</style>
