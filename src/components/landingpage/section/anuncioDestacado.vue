<template>
    <v-carousel show-arrows="hover" cycle hide-delimiter-background>
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
        cover
      ></v-carousel-item>
    </v-carousel>
  </template>
<script setup>
import { ref, onMounted } from 'vue';

const items = ref([
    { src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg' },
    { src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg' },
    { src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg' },
    { src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg' },
]);





</script>
<style scoped>
/* Puedes agregar estilos adicionales aquí si es necesario */

</style>