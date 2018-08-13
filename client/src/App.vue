<template>
  <div id="app">
    <topbar></topbar>
    <router-view/>
  </div>
</template>

<script>
import topbar from '@/components/topbar/Topbar'

export default {
  name: 'App',
  components: {
    'topbar': topbar
  }
}
</script>

<style src="./Style.css">
</style>
