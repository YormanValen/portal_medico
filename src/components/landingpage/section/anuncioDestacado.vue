<template>
    <v-carousel hide-delimiters>
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

const items = ref([]);

function exploreMore() {
    console.log('Implementa la lógica para explorar más contenido o cambiar de vista.');
}

onMounted(async () => {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/random?client_id=9zoQTqr14ZFUs-pEnNtzaktrbrCYN7M2Jk0c5_RymdA&count=3`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);  // Imprime la data para ver su estructura

        if (Array.isArray(data)) { // Asegúrate de que data sea un array
            items.value = data.map(img => ({
                src: img.urls.regular,
                author: `Foto por ${img.user.name}`
            }));
        } else {
            console.error('La respuesta no es un array:', data);
        }
    } catch (error) {
        console.error('Error fetching images:', error);
    }
});

</script>
<style>
/* Puedes agregar estilos adicionales aquí si es necesario */
</style>