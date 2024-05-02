<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { FiltrablePrueba } from '@/_mockApis/components/datatable/dataTable';
import DetailsComponent  from '@/components/desenlaces/DetailsComponent.vue';
import {useAuthStore} from '@/stores/auth';

const authStore = useAuthStore();

const filtrable = ref('');


const currentFilter = ref('all');  // Opciones: 'all', 'pending', 'myResults'
const currentView = ref('table');  // 'table' para la tabla, 'details' para los detalles
const selectedId = ref(null);

function openDetails(id:any ) {
    selectedId.value = id;
    currentView.value = 'details';
}

function closeDetails() {
    currentView.value = 'table';
}




const filteredItems = computed(() => {
    return FiltrablePrueba.filter(item => {
        if (currentFilter.value === 'all') {
            console.log('all')
            return true; // Muestra todos los ítems
        } else if (currentFilter.value === 'pending') {
            return !item.Completado; // Muestra ítems pendientes
        } else if (currentFilter.value === 'myResults') {
            return item.Completado === true; // Aquí necesitas ajustar según tu lógica para "Mis resultados"
        }
        return true; // Por defecto, devuelve todos si no hay filtro aplicable
    });
});

</script>
<template>
    <v-row>
        <v-col cols="12">

            <UiParentCard class="mt-6">

                <v-card flat>
                    <v-card-title class="pa-2">
                        <v-spacer></v-spacer>
                        <div class="btn_ctn pa-5 d-flex gap-4">
                            <v-btn v-if="currentView === 'table'" toggle-key="all" @click="currentFilter = 'all'">Todas las predicciones</v-btn>
                            <v-btn v-if="currentView === 'table'" toggle-key="pending" @click="currentFilter = 'pending'">Pendientes para
                                completar</v-btn>
                            <v-btn v-if="currentView === 'table'" toggle-key="myResults" @click="currentFilter = 'myResults'">Mis resultados</v-btn>
                            <v-btn v-if="currentView !== 'table'" toggle-key="myResults" @click="closeDetails">Volver a las predicciones</v-btn>

                        </div>
                        <v-text-field v-if="currentView === 'table'" class="w-full" v-model="filtrable" prepend-inner-icon="mdi-magnify"
                            density="compact" label="Search" single-line flat hide-details
                            variant="solo-filled"></v-text-field>
                    </v-card-title>

                    <v-divider></v-divider>
                    <div v-if="currentView === 'table'">

                    <v-data-table v-model:search="filtrable" :items="filteredItems">

                        <template v-slot:item.ID="{ item }">
                            <v-btn class="" variant="tonal" color="primary" text @click="openDetails(item.ID)"> {{
                                item.ID }} </v-btn>
                        </template>

                        <template v-slot:item.Fecha="{ item }">
                            <v-card-text class="text-subtitle-1 pa-3
                                ">{{ item.Fecha }}</v-card-text>
                        </template>

                        <template v-slot:item.Procedimiento="{ item }">
                            <div class="text-start
                            ">
                                <v-card-text class="text-subtitle-1 pa-3
                                ">{{ item.Procedimiento }}</v-card-text>
                            </div>
                        </template>

                        <template v-slot:item.Completado="{ item }">
                            <div class="text-end">
                                <v-chip :color="item.Completado ? 'success' : 'error'"
                                    :text="item.Completado ? 'Completado' : 'Pendiente'" class="text-uppercase" label
                                    size="small"></v-chip>
                            </div>
                        </template>
                    </v-data-table>
                    </div>
                    <div v-else-if="currentView === 'details'">
                        <DetailsComponent :id="selectedId" />
                    </div>
                </v-card>

            </UiParentCard>


        </v-col>
    </v-row>
</template>
