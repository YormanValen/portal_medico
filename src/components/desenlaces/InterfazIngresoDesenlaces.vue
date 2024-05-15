<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { FiltrablePrueba } from '@/_mockApis/components/datatable/dataTable';
import DetailsComponent from '@/components/desenlaces/DetailsComponent.vue';
import { useAuthStore } from '@/stores/auth';
import { useDesenlaceStore } from '@/stores/desenlaceStore';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface Desenlace {
    ID: number;
    Edad: number;
    Fecha: string;
    Procedimiento: string;
    Completado: boolean;

}

const authStore = useAuthStore();
const desenlaceStore = useDesenlaceStore();

const filtrable = ref('');
const refreshKey = ref(0);


const currentFilter = ref('all');  // Opciones: 'all', 'pending', 'myResults'
const currentView = ref('table');  // 'table' para la tabla, 'details' para los detalles
const selectedId = ref(0);


function openDetails(id: Number) {
    selectedId.value = parseInt(id as any);
    console.log('ID seleccionado:', typeof (selectedId.value));
    currentView.value = 'details';
}

function closeDetails() {
    currentView.value = 'table';
}




const filteredItems = computed(() => {
    return useDesenlaceStore().desenlaces.filter((item: Desenlace) => {
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

async function deletePrediction(item: any) {
    // Aquí colocarías la lógica para eliminar la predicción del store
    // Por ejemplo, si tienes un método en tu store para eliminar:

    desenlaceStore.deleteDesenlace(item);
    refreshKey.value++;  // Incrementa la clave para forzar la re-renderización

}

const headers = computed(() => [
    {
      title: 'ID',
      key: 'ID',
      sortable: false,
      align: 'center',
    },
    { title: t('age'), key: 'Edad'},
    { title: t('fecha'), key: 'Fecha' },
    { title: t('procedure'), key: 'Procedimiento' },
    { title: t('completado'), key: 'Completado', align: 'center' },
    { title: '', key: 'actions', sortable: false, align: 'center' },
  ]);


onMounted(async () => {
    await desenlaceStore.fetchDesenlaces(); // Llama a la acción del store
});


</script>
<template>
    <v-row>
        <v-col cols="12">

            <v-card flat>
                <v-card-title class="pa-2">
                    <v-spacer></v-spacer>
                    <div class="btn_ctn pa-5 d-flex gap-4">
                        <v-btn v-if="currentView === 'table'" toggle-key="all" @click="currentFilter = 'all'">{{ $t('todasLasPredicciones') }}</v-btn>
                        <v-btn v-if="currentView === 'table'" toggle-key="pending"
                            @click="currentFilter = 'pending'">{{ $t('prediccionesPendientes') }}</v-btn>
                        <v-btn v-if="currentView === 'table'" toggle-key="myResults"
                            @click="currentFilter = 'myResults'">{{ $t('misResultados') }}</v-btn>
                        <v-btn v-if="currentView !== 'table'" toggle-key="myResults" @click="closeDetails">Volver a las
                            predicciones</v-btn>

                    </div>
                    <v-text-field v-if="currentView === 'table'" class="w-full" v-model="filtrable"
                        prepend-inner-icon="mdi-magnify" density="compact" label="Search" single-line flat hide-details
                        variant="solo-filled"></v-text-field>
                </v-card-title>

                <v-divider></v-divider>
                <div v-if="currentView === 'table'">

                    <v-data-table  v-model:search="filtrable" :items="filteredItems"
                        :headers="headers">

                        <template v-slot:item.ID="{ item }">
                            <v-btn class="" variant="tonal" color="primary" number @click="openDetails(item.ID)">{{
                                item.ID }}</v-btn>
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
                            <div class="">
                                <v-chip :color="item.Completado ? 'success' : 'error'"
                                    :text="item.Completado ? 'Completado' : 'Pendiente'" class="text-uppercase" label
                                    size="small"></v-chip>
                            </div>
                        </template>
                        <template v-slot:item.actions="{ item }">
                            <v-btn icon color="" @click="deletePrediction(item.ID)">
                                <v-icon color="error">mdi-delete</v-icon>
                            </v-btn>
                        </template>

                    </v-data-table>
                </div>
                <div v-else-if="currentView === 'details'">
                    <DetailsComponent :id="selectedId" />
                </div>
            </v-card>



        </v-col>
    </v-row>
</template>
