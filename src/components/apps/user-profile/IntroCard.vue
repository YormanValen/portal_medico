<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { computed } from 'vue';
import { ref } from 'vue';

const authStore = useAuthStore();
const user = computed(() => authStore.user);
const newAttribute = ref('');

// Método para manejar el agregado del atributo
function addAttribute() {
    // Puedes modificar esto para que maneje la lógica específica que necesitas
    authStore.addAttribute(newAttribute.value);
    newAttribute.value = ''; // Limpiar el campo después de añadir el atributo
}

</script>

<template>
    <v-row>
        <v-col cols="12">
            <v-card variant="outlined">
                <v-card-item>
                    <h4 class="text-h4">Introduction</h4>
                    <p class="my-5 text-subtitle-1 lh-md">
                        {{ user.introduction }}</p>
                    <div class="d-flex gap-3 mb-5">
                        <BriefcaseIcon size="21" />
                        <span class="text-h6">{{ user.profession }}-{{ user.especiality }}</span>
                    </div>
                    <div class="d-flex gap-3 mb-5">
                        <MailIcon size="21" />
                        <span class="text-h6">{{ user.username }}</span>
                    </div>
                    <div class="d-flex gap-3 mb-5">
                        <MapPinIcon size="21" />
                        <span class="text-h6">Newyork, USA - 100001</span>
                    </div>

                    <!-- Botón para agregar atributos -->
                    <div v-if="user.introduction == ''" class="btn_introduccion d-flex flex-column ga-3">
                        <v-btn color="primary" @click="addAttribute">Agregar Introducción</v-btn>
                        <v-text-field v-model="newAttribute" outlined dense></v-text-field>
                    </div>
                    <div v-else class="btn_introduccion d-flex flex-column ga-3">
                        <v-btn color="primary" @click="addAttribute">Editar Introducción</v-btn>
                        <v-text-field v-model="user.introduction"  outlined dense></v-text-field>
                    </div>

                </v-card-item>
            </v-card>
        </v-col>
    </v-row>
</template>
