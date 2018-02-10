<template lang="pug">
  .container
    .columns
      .column.is-4.is-offset-4
        .notification.is-danger
          slot(name="body") Algo anduvo mal
          
</template>

<style lang="scss" scoped>
  .notification{
    margin: 10px;
  }
</style>
