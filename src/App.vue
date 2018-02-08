<template lang="pug">
  #app
    section.section
      nav.nav.has-shadow
        .container
          .columns
            .column
            input.input.is-large(
              type="text", 
              placeholder="Buscar canción", 
              v-model="searchQuery"
            )
            a.button.is-info.is-large(@click="search") Buscar
            a.button.is-danger.is-large &times;
      .container
        p
          small {{ searchMessage  }}

        .container.results
          .columns(v-for="t in tracks") 
            | {{ t.name }} - {{ t.artists[0] }}
            .column

</template>


<script>
import trackService from './services/track'

//const tracks=[
//  { name: 'Muchacha',artist: 'Luis Alberto Spinetta' },
//  { name: 'Hoy aca en el baile', artist: 'El pepo' },
//  { name: 'I was made for loving you', artist: 'Kiss' },
//]
  
export default {
  name: 'app',
  data () {
    return {
        searchQuery: '',
        tracks: []
    }
 },
 methods: {
    search () {
      if (!this.searchQuery) { return }
     // this.tracks = tracks
      trackService.search(this.searchQuery)
        .then(res => {
          this.tracks = res.tracks.items
        })
    }
  },
  computed: {
    searchMessage(){
      return `Encontrados: ${this.tracks.length}`
    }
  }
}
</script>

<style lang="scss">
  @import './scss/main.scss';
  .results{
    margin-top:50px
  }
</style> 
