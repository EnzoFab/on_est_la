<template>
  <div>
    <spinner v-show="isLoading" :isLoading="isLoading" class="mb-3"/>
    <v-toolbar flat color="white" v-show="!isLoading">
      <v-toolbar-title>Liste des types</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">Nouveeau type</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.typeName" label="Nom"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.typeDescription" label="Description"></v-text-field>
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
      :items="types"
      hide-actions
      class="elevation-0"
      v-show="!isLoading"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.typeName }}</td>
        <td class="text-xs-left">{{ blockFieldSize(props.item.typeDescription, 50) }}</td>
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
        <v-btn color="primary" @click="loadTypes">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import _service from '../../../models/index'
import _helper from '../../../helpers'
import CustomSpinner from '../../Spinner'

export default {
  name: 'TypeManagement',
  components: {
    spinner: CustomSpinner
  },
  data () {
    return {
      dialog: false,
      isLoading: false,
      headers: [
        {
          text: 'Place',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Nom type', sortable: false, value: 'name', align: 'left' },
        { text: 'Description', sortable: false, value: 'description' }
      ],
      types: [],
      editedIndex: -1,
      editedItem: {},
      defaultItem: new _service.TypeModel().defaults()
    }
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Nouveau type' : 'Modifier type'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  methods: {
    /* ========= LOAD METHODS ========= */
    async loadTypes () {
      this.isLoading = true
      this.types = await _service.type.findAll()
      this.isLoading = false
    },

    /* ========= CRUD ========= */
    async createType (value) {
      this.isLoading = true
      this.editedItem = await _service.type.create(value)
      this.isLoading = false
    },
    async updateType (value) {
      this.isLoading = true
      await _service.type.update(value)
      this.isLoading = false
    },
    async deleteType (type, index) {
      this.isLoading = true
      await _service.type.delete(type)
      this.types.splice(index, 1)
      this.isLoading = false
    },

    /* ========= DATA TABLE ========= */
    blockFieldSize (value, size) {
      return _helper.text.blockFieldSize(value, size)
    },
    editItem (item) {
      this.editedIndex = this.types.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    async deleteItem (item) {
      const index = this.types.indexOf(item)
      confirm('Are you sure you want to delete this type?') && await this.deleteType(item, index)
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = new _service.TypeModel().defaults()
        this.editedIndex = -1
      }, 300)
    },
    async save () {
      if (this.editedIndex > -1) {
        Object.assign(this.types[this.editedIndex], this.editedItem)
        // Need to update in database
        await this.updateType(this.editedItem)
      } else {
        // Need to create into the database
        await this.createType(this.editedItem)
        this.types.push(this.editedItem)
      }
      this.close()
    }
  },

  created: async function () {
    this.isLoading = true
    await this.loadTypes()
    this.isLoading = false
  }
}
</script>

<style scoped>

</style>
