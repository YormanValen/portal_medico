<template>
    <h1>Calculator Page</h1>
    <v-text-field class="search_bar" v-model="searchQuery" :label="t('buscarCalculadora')" hide-details="auto"
        variant="outlined"></v-text-field>

    <!-- Botones o pestañas de categorías -->
    <div class="categories">
        <v-btn v-for="category in categories" :key="category" @click="setCategory(category)"
            :class="{ active: currentCategory === category }">
            {{ $t(category) }}
        </v-btn>
    </div>

    <!-- Alerta de inicio de sesión requerido -->
    <div v-if="alert">
        <v-alert v-model="alert" border="start" variant="tonal" closable close-label="Close Alert" color="error">
            {{ t('debesIniciarSesion') }}
        </v-alert>
    </div>

    <!-- Lista de calculadoras filtradas -->
    <ul class="lista_calculadoras" v-if="filteredCalculators?.length">
        <li v-for="calc in filteredCalculators" :key="calc.id">
            <div class="calculator_card custom-hover-primary mr-3 text-white d-flex align-center gap-3">
                <!-- Mueve el div de la estrella fuera del router-link -->
                <div @click.stop="toggleFavorite(calc.id)" class="calculator_favorite_icon">
                    <v-icon :color="isFavorite(calc.id) ? '#ffd700' : 'black'">mdi-star</v-icon>
                </div>
                <router-link class="calculator_btn d-flex ga-5 align-center" variant="flat" :to="calc.link"
                    @click="selectCalculator(calc.id)">
                    <div class="calculator_img">
                        <img src="https://via.placeholder.com/150" alt="calculator image">
                    </div>
                    <div class="calculator_info d-flex flex-column gap-3">
                        <div class="calculator_nombre">
                            <h3>{{ calc.name }}</h3>
                        </div>
                        <div class="calculator_resumen">
                            <p>{{ calc.resumen }}</p>
                        </div>
                        <div class="calculator_autores d-flex flex-column gap-1">
                            <strong>{{ t('autores') }}</strong>
                            {{ calc.autores.join(', ') }}
                        </div>
                        <div class="calculator_keywords d-flex gap-2">
                            <strong>{{ t('palabrasClave') }}</strong>
                            {{ calc.keywords.join(', ') }}
                        </div>
                    </div>
                </router-link>
            </div>
        </li>
    </ul>

    <div v-else>
        <p>{{ t('noCalculatorsFound') }}</p>
    </div>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/stores/auth'; // Asegúrate de que la ruta sea correcta
import { useCalculatorsStore } from '@/stores/calculatorStore'; // Verifica el nombre del archivo y exportación

const { t } = useI18n();
const authStore = useAuthStore();
const calculatorStore = useCalculatorsStore();

const alert = ref(false);
const currentCategory = ref('all');
const categories = computed(() => [
    t('all'),
    t('groups'),
    t('recent'),
    t('favorites')
]);
const setCategory = (category: string) => {
    if ((category === t('recent') || category === t('favorites')) && !authStore.isLoggedIn) {
        alert.value = true;
    } else {
        currentCategory.value = category;
    }
};

const searchQuery = ref('');

function selectCalculator(calculatorId: number) {
    calculatorStore.addRecentCalculator(calculatorId);
}

function toggleFavorite(calculatorId: number) {
    console.log('Toggle favorite', calculatorId);
    calculatorStore.toggleFavoriteCalculator(calculatorId);

}

function isFavorite(calculatorId: number) {
    const isFav = calculatorStore.isFavoriteCalculator(calculatorId);
    console.log(`Is calculator ${calculatorId} favorite:`, isFav);
    return isFav;
}


const filteredCalculators = computed(() => {
    let categoryFiltered = calculatorStore.calculators; // Directamente del store

    if (currentCategory.value === t('recent')) {
        categoryFiltered = calculatorStore.getRecentCalculators() || [];

    } else if (currentCategory.value === t('favorites')) {
        categoryFiltered = calculatorStore.getFavoriteCalculators() || [];

    }

    if (searchQuery.value) {
        categoryFiltered = categoryFiltered.filter(calc =>
            calc.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            calc.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.value.toLowerCase()))
        );
    }

    return categoryFiltered;
});
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
    position: relative;
    transition: all 0.3s;
    padding: 10px;
    text-decoration: none;
    z-index: 1;
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.calculator_card .calculator_favorite_icon {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    transition: all 0.3s;
}

.calculator_card .calculator_favorite_icon:hover {
    color: #ffd700;
    z-index: 99;
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
