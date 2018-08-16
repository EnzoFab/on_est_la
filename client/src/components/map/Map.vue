<template>
  <v-layout row wrap>
    <v-flex xs6 offset-xs5>
      <h2>Partager une soirée</h2>
    </v-flex>
    <v-flex xs6 offset-xs3>
      <gmap-autocomplete
        class="pa-2"
        country="fr"
        types="(cities)"
        @place_changed="setPlace">
      </gmap-autocomplete>
    </v-flex>
    <v-flex xs2>
      <v-btn @click="addMarker" block flat color="blue">Ajouter</v-btn>
    </v-flex>
    <!-- PLACE LIST -->
    <v-flex xs4>

    </v-flex>
    <!-- MAP -->
    <v-flex xs12>
      <gmap-map
        :center="center"
        :zoom="12"
        style="width:100%;  height: 400px;"
      >
        <gmap-marker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          @click="center=m.position"
        ></gmap-marker>
      </gmap-map>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  name: 'Map',
  data () {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null
    }
  },

  mounted () {
    this.geolocate()
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace (place) {
      this.currentPlace = place
    },
    addMarker () {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        }
        this.markers.push({
          position: marker /* icon: 'link' */
        })
        this.places.push(this.currentPlace)
        this.center = marker
        this.currentPlace = null
      }
    },
    geolocate () {
      let vm = this
      navigator.geolocation.getCurrentPosition(function (position) {
        vm.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    }
  }
}
</script>
