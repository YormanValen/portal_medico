<template>
    <h1>Calculator Page</h1>
    <v-text-field class="search_bar" v-model="searchQuery" :label="$t('buscarCalculadora')" hide-details="auto"
        variant="outlined"></v-text-field>

    <!-- Botones o pestañas de categorías -->
    <div class="categories">
        <v-btn v-for="category in categories" :key="category" @click="setCategory(category)">
            {{ $t(category) }}
        </v-btn>
        <div class="pa-4" v-if="alert">
            <v-alert v-model="alert" border="start" variant="tonal" closable close-label="Close Alert" color="error">{{
                $t('debesIniciarSesion') }}
            </v-alert>
        </div>
    </div>

    <ul class="lista_calculadoras" v-if="filteredCalculators.length">
        <li v-for="calc in filteredCalculators" :key="calc.id">
            <!-- Utiliza router-link si estás usando Vue Router -->
            <router-link class="calculator_btn custom-hover-primary bg-primary mr-3 text-white" variant="flat"
                :to="calc.link">
                <div class="calculator_card d-flex align-center gap-3">
                    <div class="calculator_img">
                        <img src="https://via.placeholder.com/150" alt="calculator image">
                    </div>
                    <div class="calculator_info d-flex flex-column gap-3">
                        <div class="calculator_nombre">
                            <h3>{{ calc.name }}</h3>
                        </div>
                        <div class="calculator_resumen ">
                            <span><strong>{{ $t('resumen') }}</strong></span>
                            <p>{{ calc.resumen }}</p>
                        </div>
                        <div class="calculator_autores d-flex flex-column gap-1">
                            <span><strong>{{ $t('autores') }}</strong></span>
                            {{ calc.autores.join(', ') }}
                        </div>
                        <div class="calculator_keywords d-flex gap-2">
                            <span><strong>{{ $t('palabrasClave') }}</strong></span>
                            {{ calc.keywords.join(', ') }}
                        </div>
                    </div>

                </div>

            </router-link>
        </li>
    </ul>
    <div v-else>
        <p>No se encontraron calculadoras.</p>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
// Asegúrate de tener Vue Router instalado y configurado si vas a usar <router-link>
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/stores/auth'; // Asegúrate de que la ruta sea correcta

let alert = ref(false);
const authStore = useAuthStore();
const { t } = useI18n();

const currentCategory = ref('all');
const categories = ['all', 'groups', 'recent', 'favorites']; // Estos son tus identificadores de categoría que se traducirán
const calculators = ref([
    // Supongamos que 'link' es la ruta a la cual el enlace debe dirigir en tu aplicación
    { id: 1, name: 'Calculadora Mortalidad', resumen: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', autores: ['Juan', 'Jhon'], keywords: ['científica', 'compleja'], link: '/advertising' },
    { id: 2, name: 'Calculadora Básica', resumen: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', autores: ['Juan', 'Jhon'], keywords: ['básica', 'simple'], link: '/basica' },
    { id: 3, name: 'Calculadora Prueba3', resumen: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', autores: ['Juan', 'Jhon'], keywords: ['prueba', 'simple'], link: '/basica' },

    // ...añade más calculadoras aquí
]);

const setCategory = (category: string) => {
    if ((category === 'recent' || category === 'favorites') && !isLoggedIn.value) {
        // Si el usuario no ha iniciado sesión y está intentando acceder a una categoría restringida
        alert.value = !alert.value;
    } else {
        currentCategory.value = category; // Cambia la categoría
    }
};

const searchQuery = ref('');

// Filtrar las calculadoras basadas en la categoría y la búsqueda
const filteredCalculators = computed(() => {
    // Filtra por categoría primero
    let categoryFiltered = calculators.value;
    if (currentCategory.value === 'recent') {
        // Aquí implementarías la lógica para obtener las calculadoras recientes
    } else if (currentCategory.value === 'favorites') {
        // Aquí implementarías la lógica para obtener las calculadoras favoritas
    }

    // Luego filtra por la búsqueda del usuario
    if (searchQuery.value) {
        categoryFiltered = categoryFiltered.filter(calc =>
            calc.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            calc.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.value.toLowerCase()))
        );
    }

    return categoryFiltered;
});

const isLoggedIn = computed(() => !!authStore.user);

</script>


<style lang="scss" scoped>
.search_bar {
    width: 100%;
    padding: 8px;
    margin: 10px 0;
    border-radius: 20px;
    box-sizing: border-box;
    outline: none;
}

.lista_calculadoras {
    list-style: none;
    display: flex;
    gap: 2vw;
    flex-direction: column;

}

.lista_calculadoras li {
    margin: 10px 0;
}

.calculator_card {
    transition: all 0.3s;
    padding: 10px;
    text-decoration: none;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.router-link-active,
.router-link-exact-active,
.lista_calculadoras li a {
    // Esto seleccionará todos los enlaces dentro de tu lista
    text-decoration: none !important; // El uso de !important anulará otros estilos si es necesario
}

.calculator_card:hover {
    background-color: rgb(var(--v-theme-primary));
    color: white;
}

.calculator_card .calculator_info {
    color: black;
    text-decoration: none;
}

.calculator_keywords span {
    text-decoration: none !important;
}

.lista_calculadoras li a {
    //padding: 8px;
    //border: 2px solid rgb(var(--v-theme-primary)) !important;
    //border-radius: 10px;
    //width: 10vw;
    //text-decoration: none;
    //transition: all 0.3s;
}

.lista_calculadoras li a:hover {
    //background-color: white !important;
    //color: rgb(var(--v-theme-primary)) !important;
}
</style>
