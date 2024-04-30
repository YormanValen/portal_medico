<!-- RiskProgressBar.vue -->
<template>
    <div class="risk-progress-container d-grid gap-2 " :class="label">
        <div class="progress-label font-weight-bold d-flex justify-end gap-2">{{ label }}</div>
        <div class="risk-progress-bar">
            <div :style="{ width: progressPercentage + '%' }" class="progress-bar"
                :class="{ 'below-average': isBelowAverage }"></div>
        </div>
        <div class="progress-text d-flex gap-3">
            <div class="your-risk d-flex flex-column align-center">
                <span class="font-weight-bold text-primary">{{ $t('yourRisk') }}</span>
                <span class="font-weight-bold">{{ yourRiskText }}</span>
            </div>
            <div class="average-risk d-flex flex-column align-center ">
                <span class="font-weight-bold text-primary">{{ $t('averageRisk') }}</span>
                <span class="font-weight-bold">{{ averageRiskText }}</span>
            </div>
            <div class="chance-outcome d-flex flex-column align-center">
                <span class="font-weight-bold text-primary">{{ $t('chanceOfCome') }}</span>
                <span class="font-weight-bold">{{ chanceOfOutcomeText }}</span>
            </div>
        </div>
    </div>
</template>


<script setup>
import { defineProps, onMounted, ref } from 'vue';
import { useReportStore } from '@/stores/reportStore';


const props = defineProps({
    label: String,
    riskLimitPercentage: String,
    name: String,
});

const reportStore = useReportStore();

// Estas son variables reactivas que se actualizarán una vez que la acción se complete.
const progressPercentage = ref(0);
const yourRiskText = ref('N/A');
const averageRiskText = ref('N/A');
const chanceOfOutcomeText = ref('N/A');

onMounted(async () => {

    console.log(props.name)
    // Obtener los porcentajes de riesgo llamando a la acción del store.
    const riskPercentages = await reportStore.getRiskPercentages();
    // Ahora que tenemos la respuesta, podemos extraer los datos para la etiqueta específica.
    const riskData = riskPercentages[props.name];

    if (riskData) {
        // Actualizar las variables reactivas con los datos de riesgo obtenidos.
        progressPercentage.value = riskData.progressPercentage;
        yourRiskText.value = riskData.yourRisk;
        averageRiskText.value = riskData.averageRisk;
        chanceOfOutcomeText.value = riskData.chanceOfOutcome;
    }
});
</script>

<style scoped>
.progress-bar-ctn {
    width: 100%;
}

.risk-progress-container {
    display: grid;

    grid-template-columns: 16% 1fr 30%;
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