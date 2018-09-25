<template>
  <v-container grid-list-md text-xs-center>
    <v-layout class="mt-5" row justify-center wrap>
      <v-flex xs12>
        <img src="../../assets/images/home_wallpaper_simple.png" style="width: 20%">

        <vue-clip :options="options" :on-added-file="addedFile">
          <template slot="clip-uploader-action">
            <div>
              <div class="dz-message"><h2> Click or Drag and Drop files here upload </h2></div>
            </div>
          </template>

          <template slot="clip-uploader-body" slot-scope="props">
            <div v-for="(file) in props.files" v-bind:key="files.indexOf(file)">
              {{ file.name }}
            </div>
          </template>
        </vue-clip>

      </v-flex>
      <v-btn @click="saveProfilePicture">submit</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import _service from '../../models/index'
import store from '@/store/store'

export default {
  name: 'Home',
  data () {
    return {
      options: {
        url: '/',
        maxFiles: 1,
        paramName: 'profilePicture'
      },
      files: []
    }
  },
  methods: {
    async saveProfilePicture () {
      let body = {
        userPicture: this.files[0],
        pictureName: store.getters.getUser.userPseudo + store.getters.getUser.userId,
        userId: store.getters.getUser.userId
      }
      await _service.user.updateProfilePicture(body)
    },

    addedFile (file) {
      this.files = [file]
    }
  }
}
</script>
