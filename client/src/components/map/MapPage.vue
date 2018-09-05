<template>
  <v-container>
    <v-layout row wrap align-center>
      <v-flex xs12 md6>
        <v-layout row wrap align-center>
          <!-- DATE PICKER -->
          <v-flex xs12 md6>
            <v-layout align-center justify-center>
              <datepicker @datePicked="changeDate"
              />
              <v-btn disabled block id="dateShow" outline color="indigo darken-4">{{ moment(new Date(datePicked)).format('dddd DD/MM') }}</v-btn>
            </v-layout>
          </v-flex>
          <!-- PLACES LIST -->
          <v-flex xs12 md6 >
            <v-text-field
              @keyup="searchPlace()"
              append-icon="search"
              label="Trouves ton QG"
              single-line
              id="place-search"
              hide-details
              class="mb-2"
            ></v-text-field>
            <v-card flat
                    class="scroll"
                    style="max-height: 150px;"
                    id="placeHead"
            >
              <v-data-table
                :items="places"
                id="place-table"
                hide-actions
                hide-headers
                :expand="true"
              >
                <template slot="items" slot-scope="props"
                          :value="name"
                >
                  <td class="text-xs-left" @click="displayPlace(props.item)">{{ props.item.nbParticipants }}</td>
                  <td class="text-xs-left" @click="displayPlace(props.item)">{{ props.item.placeName }}</td>
                  <td class="justify-center align-center layout px-0" @click="displayPlace(props.item)">
                    <v-icon
                      medium
                      class="mr-2"
                      :color="props.item.placeIconColor"
                      @click="choosePlace(props.item)"
                    >
                      {{ props.item.placeIcon}}
                    </v-icon>
                  </td>
                </template>
              </v-data-table>
              <v-btn v-if="displayError"
                     color="error"
                     block
                     depressed
                     class="text-xs-left">Gros ça existe pas ça
              </v-btn>
            </v-card>
          </v-flex>
          <!-- BTN SUBMIT -->
          <v-flex class="">
            <v-btn
              color="success"
              block
              disabled
              depressed
              large class="mb-4"
              @click="true"
            >
              Valider mes bails
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs6>
        <!-- MAP -->
        <mapcard :places="places" :centerMap="centerMap" :width="mapWidth" :height="mapHeight" :zoom="15">
        </mapcard>
      </v-flex>
    </v-layout>
    <!-- PLACE DIALOG -->
    <v-dialog v-if="pickedPlace !== null" v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title primary-title class="text-xs-left">
          <v-layout row wrap justify-space-between>
            <h3 class="headline mb-0">{{ pickedPlace.placeName }}</h3>
            <h4 class="text-grey mb-0 text-uppercase">{{ moment(new Date(datePicked)).format('dddd DD MMMM') }}</h4>
          </v-layout>
        </v-card-title>
        <v-card-title>
          <div class="mt-3">{{ pickedPlace.placeDescription }}</div>
        </v-card-title>
        <!-- ADD PLACE -->
        <v-card-actions v-if="pickedPlace.placeIcon === 'directions_run'" @click.stop="dialog=false">
          <v-btn large block flat color="error" dark>En fait non
          </v-btn>
          <v-btn large block
                 color="success"
                 @click="addPlace(pickedPlace)"
                 dark>
            <v-icon left dark>directions_run</v-icon>
            Feu
            <v-icon right dark>directions_run</v-icon>
          </v-btn>
        </v-card-actions>
        <!-- REMOVE PLACE -->
        <v-card-actions v-if="pickedPlace.placeIcon === 'done_all'" @click.stop="dialog=false">
          <v-btn large block flat color="success" dark>parfait
          </v-btn>
          <v-btn large block
                 flat
                 color="error"
                 @click="removePlace(pickedPlace)"
                 dark>
            <v-icon left dark>directions_run</v-icon>
            Fuite
            <v-icon right dark>directions_run</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Map from './LeafletMap'
import DatePicker from '../calendar/DatePicker'
import _service from '../../models/index'
import moment from 'moment'
import store from '../../store/store'
import _helper from '../../helpers'

export default {
  name: 'MapPage',
  components: {
    mapcard: Map,
    datepicker: DatePicker
  },
  data () {
    return {
      moment: moment,
      search: '',
      helper: _helper,
      datePicked: null,
      headers: [
        {
          text: 'Bar / Boîte',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        { text: 'Ville', value: 'city' },
        { text: '', value: 'action' }
      ],
      places: [],
      pickedPlace: null,
      frequentations: [],
      dialog: false,
      mapHeight: 200,
      mapWidth: 200,
      centerMap: [43.610476, 3.875535],
      displayError: false
    }
  },
  methods: {
    /* ======= LOAD METHODS ======= */
    async loadPlaces () {
      // Load every places to drink in Montpellier
      this.places = await _service.place.findAllForUser(this.datePicked)
      console.log(this.places[0])
    },

    /* ======= VIEW METHODS ======= */
    async changeDate (value) {
      this.datePicked = value
      await this.loadPlaces()
    },
    searchPlace () {
      this.displayError = this.helper.search.searchPlace()
    },
    displayPlace (place) {
      this.centerMap = [place.placeMapLat, place.placeMapLon]
    },
    choosePlace (place) {
      this.pickedPlace = place
      this.dialog = true
    },
    async addPlace (place) {
      let frequent = {
        userId: store.getters.getUser.userId,
        placeId: place.placeId,
        frequentDateStart: this.datePicked,
        frequentUserDateEnd: this.datePicked,
        frequentUserVisibility: 'public'
      }
      await _service.frequentUser.create(frequent)
      place.placeIcon = 'done_all'
      place.placeIconColor = 'success'
    },
    async removePlace (place) {
      await _service.frequentUser.delete(place.frequentUser)
      place.placeIcon = 'directions_run'
      place.placeIconColor = 'indigo darken-4'
    }
  },
  async created () {
    this.datePicked = new Date()
    this.mapHeight = window.innerWidth - 65
    this.mapWidth = window.innerWidth - 65
    await this.loadPlaces()
  }
}
</script>

<style scoped>
  #placeHead {
    background-color: transparent !important
  }

  #dateShow {
    background-color: transparent !important;
    color: #1a237e !important;
  }
  .v-stepper {
    background-color: transparent !important;
    box-shadow: none !important;
  }
  #map {
    margin: auto !important;
  }
</style>
