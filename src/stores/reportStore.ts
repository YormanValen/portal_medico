import { defineStore } from 'pinia';

const fakeRiskPercentages = {
    mortalidad: {
        progressPercentage: 10, // Supongamos que este es el porcentaje de progreso
        yourRisk: '3.6%', // Tu Riesgo
        averageRisk: '5.6%', // Riesgo Promedio
        chanceOfOutcome: 'Below Average' // Probabilidad de Resultado
    },
    complicaciones_mayores: {
        progressPercentage: 10,
        yourRisk: '8.6%',
        averageRisk: '6.6%',
        chanceOfOutcome: 'Above Average'
    },
    reintervencion_quirurgica: {
        progressPercentage: 20,
        yourRisk: '12.6%',
        averageRisk: '10.6%',
        chanceOfOutcome: 'Above Average'
    },
    infeccion_sitio_operatorio: {
        progressPercentage: 30,
        yourRisk: '15.6%',
        averageRisk: '20.6%',
        chanceOfOutcome: 'Below Average'
    },
    infeccion_via_urinaria: {
        progressPercentage: 20,
        yourRisk: '5.6%',
        averageRisk: '3.6%',
        chanceOfOutcome: 'Above Average'
    },
    neumotonia: {
        progressPercentage: 20,
        yourRisk: '5.6%',
        averageRisk: '3.6%',
        chanceOfOutcome: 'Above Average'
    },
    lesion_renal_aguda: {
        progressPercentage: 60,
        yourRisk: '15.6%',
        averageRisk: '20.6%',
        chanceOfOutcome: 'Below Average'
    }
};

export const useReportStore = defineStore('report', {
    state: () => ({
        selectedOptions: {}, // Inicialmente vacío, será actualizado con las selecciones del usuario
        riskPercentages: {} // Este estado almacenará los porcentajes de riesgo calculados
    }),
    actions: {
        // Actualiza las opciones seleccionadas
        updateOptions(options: Record<string, unknown>) {
            this.selectedOptions = options;
        },

        // Simula la recuperación de los porcentajes de riesgo basado en las opciones seleccionadas
        getRiskPercentages() {
            // Aquí podrías agregar lógica para ajustar fakeRiskPercentages
            // basado en this.selectedOptions si necesario
            // Por ahora, simplemente retornamos fakeRiskPercentages como ejemplo
            return Promise.resolve(fakeRiskPercentages);
        },

        // Guarda los porcentajes de riesgo obtenidos en el estado
        setRiskPercentages(riskPercentages: typeof fakeRiskPercentages) {
            this.riskPercentages = riskPercentages;
        }
    }
});
