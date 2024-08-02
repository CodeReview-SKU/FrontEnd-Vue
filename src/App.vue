<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from "./components/NavBar.vue"

</script>

<template>
  <head>
    <title>Code Review</title>
  </head>
  <body>
    <div class="container-fluid mb-5">
      <NavBar/>
      <RouterView/>
    </div>
  </body>
</template>

<style scoped>
</style>
