<template>
  <l-map id="map">
    <l-tile-layer></l-tile-layer>
  </l-map>
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'

export default {
  name: 'LeafletMap',
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data () {
    return {

    }
  },
  created () {

  }
}
</script>

<style scoped>

</style>
