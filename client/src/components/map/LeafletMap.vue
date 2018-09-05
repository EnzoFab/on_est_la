<template>
  <!--<l-map id="map" ref="map" :zoom=zoom :center="[43.610476, 3.875535]">
    <l-tileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tileLayer>
    <l-marker v-for="item in places"
              v-if="isPlacesLoaded"
              :key="item.placeId"
              :lat-lng="[item.placeMapLat, item.placeMapLon]"
    >
    </l-marker>
  </l-map>-->
  <div id="map">

  </div>
</template>

<script>
/* eslint-disable */
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'

export default {
  name: 'LeafletMap',
  props: {
    height: {
      type: Number,
      required: false,
      default: 500
    },
    width: {
      type: Number,
      required: false,
      default: 500
    },
    zoom: {
      type: Number,
      required: false,
      default: 16
    },
    centerMap: {
      type: Array,
      required: false,
      default: [43.610476, 3.875535]
    },
    places: {}
  },
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data () {
    return {
      map: null,
      markers: []
    }
  },
  methods: {
    loadMarkers (places) {
      this.markers = []
      for (let p of places) {
        let m = L.marker([p.placeMapLat, p.placeMapLon]).addTo(this.map)
        m.bindPopup(p.placeName + ' : ' + p.nbParticipants + ' nighterz')
        this.markers.push(m)
      }
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.map = L.map('map', {
        center: [43.610476, 3.875535],
        zoom: 14
      })
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map)
    })
    document.getElementById('map').style.width = this.width + 'px' // width
    document.getElementById('map').style.height = this.height + 'px' // height
  },
  created () {
  },
  watch: {
    places: function update (value, oldValue) {
      this.loadMarkers(value)
    },
    centerMap: function update (value, oldValue) {
      this.map.setView(value, 14)
    }
  }
}
</script>

<style scoped>

</style>
