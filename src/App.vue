<template lang="pug">
  #app
    pm-header
    pm-notification(v-show="isShowNotification")
      p(slot="body") No se encontraron resultados

    pm-loader(v-show="isLoading")
    section.section(v-show="!isLoading")
      nav.nav
        .container
          input.input.is-large(
            type="text", 
            placeholder="Buscar canción 2", 
            v-model="searchQuery"
          )
          a.button.is-info.is-large(@click="search") Buscar
          a.button.is-danger.is-large &times;
      .container
        p
          small {{ searchMessage  }}

      .container.results
        .columns.is-multiline
          .column.is-one-quarter(v-for="t in tracks") 
            pm-track(
              :class= "{ 'is-active': t.id == selectedTrack }",
              :track="t", 
              @select="setSelectedTrack"
            )
            
    pm-footer
</template>


<script>
import trackService from '@/services/track'
import PmFooter from '@/components/layout/Footer.vue'
import PmHeader from '@/components/layout/Header.vue'

import PmTrack from '@/components/Track.vue'
import PmLoader from '@/components/shared/Loader.vue'
import PmNotification from '@/components/shared/Notification.vue'
export default {
  name: 'app',
  components: { PmFooter, PmHeader, PmTrack, PmLoader, PmNotification },
  data () {
    return {
        searchQuery: '',
        tracks: [],
        isLoading: false,
        selectedTrack: '',
        isShowNotification: false
    }
 },
 methods: {
    search () {
      if (!this.searchQuery) { return }
      this.isLoading = true
     // this.tracks = tracks
      trackService.search(this.searchQuery)
        .then(res => {
          this.isShowNotification = res.tracks.total == 0
          this.tracks = res.tracks.items
          this.isLoading = false
        })
    },
    setSelectedTrack(id){
      this.selectedTrack= id
    }
  },
  computed: {
    searchMessage(){
      return `Encontrados: ${this.tracks.length}`
    }
  },
  watch: {
    isShowNotification(){
      if(this.isShowNotification){
        setTimeout(() => {
          this.isShowNotification = false
        }, 3000) // Tiempo en milisegundos (3 segundos)
      } 
    }
  }
}
</script>
 
<style lang="scss">
  @import './scss/main.scss';
  
  .results {
    margin-top:50px;
  },
  
  .is-active{
    border: 3px #23d160 solid;
  }  
</style> 
