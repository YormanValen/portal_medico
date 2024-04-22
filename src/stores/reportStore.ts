import type { get } from 'lodash';
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

type RiskCategoryKey = keyof typeof fakeRiskPercentages;

export const useReportStore = defineStore('report', {
    state: () => ({
        selectedOptions: {}, // Inicialmente vacío, será actualizado con las selecciones del usuario
        riskPercentages: {
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
        } // Este estado almacenará los porcentajes de riesgo calculados
    }),
    actions: {
        // Actualiza las opciones seleccionadas
        updateOptions(options: Record<string, unknown>) {
            console.log('Opciones recibidas:', options);
            // Filtra las opciones para mantener solo aquellas que tienen el valor true
            const filteredOptions: Record<string, boolean> = {};
            for (const key in options) {
                if (options[key] === true) {
                    filteredOptions[key] = true;
                }
            }

            // Asigna las opciones filtradas a this.selectedOptions
            this.selectedOptions = filteredOptions;

            console.log('Opciones seleccionadas:', this.selectedOptions);
        },

        getRiskPercentages() {
           //Devuelve los porcentajes de riesgo simulados
            return fakeRiskPercentages;
        },

        // Simula la recuperación de los porcentajes de riesgo basado en las opciones seleccionadas
        async getRiskPercentageForSelectedOptions() {
            // Inicializa un objeto para almacenar los porcentajes de riesgo seleccionados
            const selectedRiskPercentages: Record<RiskCategoryKey, (typeof fakeRiskPercentages)[keyof typeof fakeRiskPercentages]> =
                {} as any;
            // Itera sobre las opciones seleccionadas
            for (const selectedOptionKey in this.selectedOptions) {
                // Verifica si la opción seleccionada es una categoría válida de riesgo
                if (selectedOptionKey in this.riskPercentages) {
                    // Si es válida, agrega el porcentaje de riesgo correspondiente al objeto de porcentajes seleccionados
                    console.log('selectedOptionKey:', selectedOptionKey);
                    selectedRiskPercentages[selectedOptionKey as RiskCategoryKey] =
                        this.riskPercentages[selectedOptionKey as RiskCategoryKey];
                    console.log('selectedRiskPercentages:', selectedRiskPercentages);
                }
            }

            return selectedRiskPercentages;
        },

        // Guarda los porcentajes de riesgo obtenidos en el estado
        setRiskPercentages(riskPercentages: typeof fakeRiskPercentages) {
            this.riskPercentages = riskPercentages;
        }
    }
});
