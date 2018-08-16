<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Liste des repaires</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">Nouvelle place</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.placeName" label="Nom"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.placeDescription" label="Description"></v-text-field>
                </v-flex>
                <v-flex xs3>
                  <v-text-field v-model="editedItem.placeAdressNum" label="Num"></v-text-field>
                </v-flex>
                <v-flex xs9>
                  <v-text-field v-model="editedItem.placeAdressStreet" label="Rue"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.placeAdressDetails" label="Complément d'adresse"></v-text-field>
                </v-flex>
                <v-flex xs8>
                  <v-text-field v-model="editedItem.placeAdressCity" label="Ville"></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field v-model="editedItem.placeAdressPostalCode" label="Code Postal"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.placeAdressCountry" label="Pays"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="places"
      hide-actions
      class="elevation-0"
    >
      <spinner v-show="isLoading" :isLoading="isLoading" class="mb-3"/>
      <template v-show="isLoading" slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.placeName }}</td>
        <td class="text-xs-left">{{ blockFieldSize(props.item.placeDescription, 50) }}</td>
        <td class="text-xs-left">{{ blockFieldSize(props.item.placeAdressNum + ' ' + props.item.placeAdressStreet + ' ' + props.item.placeAdressCity, 50) }}</td>
        <td class="text-xs-left">{{ blockFieldSize(props.item.placeAdressDetails, 50) }}</td>
        <td class="justify-center align-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            color="error"
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="loadPlaces">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import _service from '../../../models/index'
import _helper from '../../../helpers'
import CustomSpinner from '../../Spinner'

export default {
  name: 'PlaceManagement',
  components: {
    spinner: CustomSpinner
  },
  data () {
    return {
      dialog: false,
      isLoading: true,
      headers: [
        {
          text: 'Place',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Description', sortable: false, value: 'description', align: 'left' },
        { text: 'Adresse', sortable: false, value: 'adress' },
        { text: 'Détails adresse', sortable: false, value: 'complement' },
        { text: 'Action', sortable: false, value: 'action' }
      ],
      places: [],
      editedIndex: -1,
      editedItem: {},
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      }
    }
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Nouvelle Place' : 'Modifier Place'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  methods: {
    blockFieldSize (value, size) {
      return _helper.text.blockFieldSize(value, size)
    },
    editItem (item) {
      this.editedIndex = this.places.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    async deleteItem (item) {
      this.isLoading = true
      const index = this.places.indexOf(item)
      confirm('Are you sure you want to delete this item?') && await this.deletePlace(item.placeId) && this.places.splice(index, 1)
      this.isLoading = false
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.places[this.editedIndex], this.editedItem)
        // Need to update in database
      } else {
        this.places.push(this.editedItem)
        // Need to create into the database

        console.log(this.editedItem)
        this.createPlaces(this.editedItem)
      }
      this.close()
    },
    async loadPlaces () {
      this.isLoading = true
      await _service.place.findAll()
        .then((res) => {
          this.places = res
          this.isLoading = false
        })
        .catch(e => {
          console.log('Unable to load places')
        })
    },
    async createPlaces (value) {
      await _service.place.create(value)
        .then((res) => {
          // nothing
        })
        .catch(e => {
          console.log('Unable to create place. ', e)
        })
    },
    async deletePlace (placeId) {
      this.isLoading = true
      await _service.place.delete(placeId)
        .then((res) => {
          this.isLoading = false
        })
        .catch(e => {
          console.log('Unable to delete place. ', e)
        })
    }
  },

  created: async function () {
    this.isLoading = true
    Object.assign(this.editedItem, _service.PlaceModel)
    await this.loadPlaces()
    this.isLoading = false
  }
}
</script>

<style scoped>

</style>