<template lang="pug">
  main
    pm-notification(v-show="isShowNotification")
      p(slot="body") No se encontraron resultados

    pm-loader(v-show="isLoading")
    section.section(v-show="!isLoading")
      nav.nav
        .container.field.is-grouped
          input.input.is-large.is-rounded(
           type="text", 
           placeholder="Buscar canciones",
           v-model="searchQuery",
           @keyup.enter="search"
          )          
          a.button.is-info.is-large(@click="search", id="b-buscar") Buscar          
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
            
</template>


<script>
import trackService from '@/services/track'

import PmTrack from '@/components/Track.vue'
import PmLoader from '@/components/shared/Loader.vue'
import PmNotification from '@/components/shared/Notification.vue'
export default {
  name: 'app',
  components: { PmTrack, PmLoader, PmNotification },
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
  
  .results {
    margin-top:50px;
  },
  
  .is-active{
    border: 3px #23d160 solid;
  },
  #b-buscar{
    background-color: black;
    margin-left:10px;
  }

</style> ""
