<template lang="pug">
  section.hero.is-success
    .hero-head
      header.nav
        .container
          .nav-left
            .nav-item
              strong 😈 Platzi Music
          .nav-right.nav-menu
    .hero-body
      .contaniner.has-text-centered
        h1.tittle Platzi Music
        h2.subtittle Canciones que están en Vue
        pm-player
</template>

<script>
  import PmPlayer from '@/components/Player.vue'
  
  export default {
    components: { PmPlayer }
  }
</script>
