<template>
  <v-container>
    <v-layout row wrap align-center>
      <v-flex xs3>
        <!-- PLACES LIST -->
        <v-card flat id="placeHead">
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Trouves ton QG"
            single-line
            hide-details
            class="mb-2"
          ></v-text-field>
          <v-data-table
            :headers="headers"
            :items="places"
            :search="search"
            hide-actions
            :expand="true"
          >
            <template slot="items" slot-scope="props"
                      :value="name"
            >
              <td class="text-xs-left">{{ props.item.placeName }}</td>
              <td class="text-xs-left">{{ props.item.placeAdressCity }}</td>
              <td class="justify-center align-center layout px-0">
                <v-icon
                  medium
                  class="mr-2"
                  color="indigo darken-4"
                  @click="choosePlace(props.item)"
                >
                  directions_run
                </v-icon>
              </td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Aucun QG trouvé à ce nom
            </v-alert>
          </v-data-table>
        </v-card>
      </v-flex>
      <v-flex xs2>
        <v-layout align-center justify-center>
          <datepicker class="mx-3" @datePicked="changeDate"
          />
          <v-btn disabled block id="dateShow" outline color="indigo darken-4">{{ moment(new Date(datePicked)).format('dddd DD/MM') }}</v-btn>
        </v-layout>
      </v-flex>
      <v-flex xs6>
        <!-- MAP -->
        <mapcard/>
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
          <div>
            <div class="mt-3">{{ pickedPlace.placeDescription }}</div>
          </div>
        </v-card-title>
        <v-card-actions @click.stop="dialog=false">
          <v-btn large block flat color="error" dark>En fait non
          </v-btn>
          <v-btn large block color="success" dark>
            <v-icon left dark>directions_run</v-icon>
            Feu
            <v-icon right dark>directions_run</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Map from './Map'
import DatePicker from '../calendar/DatePicker'
import _service from '../../models/index'
import moment from 'moment'
// import _helper from '../../helpers'

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
      dialog: false
    }
  },
  methods: {
    async loadPlaces () {
      // Load every places to drink in Montpellier
      await _service.place.findAll()
        .then((res) => {
          this.places = res
        })
        .catch(e => {
          console.log('Unable to load places')
        })
    },
    changeDate (value) {
      this.datePicked = value
    },
    choosePlace (place) {
      this.pickedPlace = place
      this.dialog = true
    }
  },
  async created () {
    await this.loadPlaces()
    this.datePicked = new Date()
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
</style>
