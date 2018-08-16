<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs3>
        <v-card flat>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Trouves ton QG"
              single-line
              hide-details
              class="px-5"
            ></v-text-field>
          </v-card-title>
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
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Aucun QG trouvé à ce nom
            </v-alert>
          </v-data-table>
        </v-card>
      </v-flex>
      <v-flex>
        <v-layout align-center>
          <datepicker @datePicked="changeDate"
          />
          <v-btn outline color="indigo darken-4">{{ datePicked }}</v-btn>
        </v-layout>
      </v-flex>
      <v-flex xs6>
        <!--<mapcard/>-->
      </v-flex>
    </v-layout>
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
      search: '',
      datePicked: null,
      headers: [
        {
          text: 'Bar / Boîte',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        { text: 'Ville', value: 'city' }
      ],
      places: []
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
      this.datePicked = moment(new Date(value)).format('dddd DD/MM')
    }
  },
  async created () {
    await this.loadPlaces()
    this.datePicked = moment(new Date()).format('dddd DD/MM')
  }
}
</script>

<style scoped>
.v-card {
  background-color: transparent !important
}
</style>
