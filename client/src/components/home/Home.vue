<template>
  <v-container grid-list-md text-xs-center>
    <v-layout class="mt-5" row justify-center wrap>
      <v-flex xs12>
        <img src="../../assets/images/home_wallpaper_simple.png" style="width: 20%">

        <vue-clip :options="options">
          <template slot="clip-uploader-action">
            <div>
              <div class="dz-message"><h2> Click or Drag and Drop files here upload </h2></div>
            </div>
          </template>

          <template slot="clip-uploader-body" slot-scope="props">
            <div v-for="file in props.files" v-bind:key="file">
              <img v-bind:src="file.dataUrl" />
              {{ file.name }} {{ file.status }}
            </div>
          </template>

        </vue-clip>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      options: {
        url: '/upload',
        paramName: 'file'
      }
    }
  }
}
</script>
