<!-- RiskProgressBar.vue -->
<template>
    <div class="risk-progress-container d-grid">
        <div class="progress-label font-weight-bold d-flex justify-end gap-2">{{ label }}</div>
        <div class="risk-progress-bar">
            <div :style="{ width: progressPercentage + '%' }" class="progress-bar"
                :class="{ 'below-average': isBelowAverage }"></div>
        </div>
        <div class="progress-text d-flex gap-3">
            <div class="your-risk d-flex flex-column align-center">
                <span class="font-weight-bold text-primary">Your Risk</span>
                <span class="font-weight-bold">{{ yourRiskText }}</span>
            </div>
            <div class="average-risk d-flex flex-column align-center ">
                <span class="font-weight-bold text-primary">Average Risk</span>
                <span class="font-weight-bold">{{ averageRiskText }}</span>
            </div>
            <div class="chance-outcome d-flex flex-column align-center">
                <span class="font-weight-bold text-primary">Chance of out come</span>
                <span class="font-weight-bold">{{ chanceOfOutcomeText }}</span>
            </div>
        </div>
    </div>
</template>



<script setup>
import { defineProps, computed } from 'vue';
import { ref } from 'vue';
import { onMounted } from 'vue';

const props = defineProps({
    label: String,
    riskLimitPercentage: String
});

const isBelowAverage = computed(() => props.progressPercentage < props.riskLimitPercentage);

const progressPercentage = ref(0);
const yourRiskText = ref('30');
const averageRiskText = ref('20');
const chanceOfOutcomeText = ref('Bellow Average');

// Método para obtener los datos del backend
const fetchRiskPercentages = async () => {
    try {
        const response = await fetch(`/fake-backend-endpoint/risk-percentages`, {});
        console.log('Respuesta obtenida:', response);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`); // Si la respuesta no es 2xx, lanza un error
        }
        const data = await response.json(); // Intenta parsear la respuesta como JSON
        // Mapea la respuesta a tus variables reactivas
        progressPercentage.value = data.progressPercentage;
        yourRiskText.value = data.yourRisk;
        averageRiskText.value = data.averageRisk;
        chanceOfOutcomeText.value = data.chanceOfOutcome;
        console.log('Porcentajes de riesgo obtenidos:', data);
    } catch (error) {
        console.error('Hubo un error al obtener los porcentajes de riesgo:', error);
        // Aquí podrías manejar diferentes tipos de errores, por ejemplo:
        if (error instanceof SyntaxError) {
            console.error('La respuesta no es JSON válido:', error.message);
        } else if (error instanceof Error) {
            console.error('Error en la solicitud:', error.message);
        }
    }
};


onMounted(fetchRiskPercentages);
</script>

<style scoped>
.progress-bar-ctn {
    width: 100%;
}

.risk-progress-container {
    display: grid;
    
    grid-template-columns: 16% 1fr 26%;
    align-items: center;
    margin-bottom: 1rem;
}

.risk-progress-bar {
    background-color: #eee;
    border-radius: 0.25rem;
    overflow: hidden;
    flex-grow: 1;
    position: relative;
}

.progress-bar {
    height: 1.5rem;
    background-color: #4caf50;
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
    color: white;
    transition: width 0.5s ease;
}

.progress-bar.below-average {
    background-color: #f44336;
}

.risk-percentage {
    margin-left: 10px;
}

.risk-limit-line {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: black;
    transition: left 0.
}
</style>