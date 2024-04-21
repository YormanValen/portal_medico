// src/stores/calculatorsStore.js
import { defineStore } from 'pinia';

export const useCalculatorsStore = defineStore('calculatorsStore', {
    state: () => ({
        calculators: [
            { id: 1, name: 'Calculadora Mortalidad', resumen: 'Descripción de esta calculadora...', autores: ['Juan', 'Jhon'], keywords: ['científica', 'compleja'], link: '/advertising' },
            { id: 2, name: 'Calculadora Básica', resumen: 'Descripción de esta calculadora...', autores: ['Ana', 'Luis'], keywords: ['básica', 'simple'], link: '/basic' },
            { id: 3, name: 'Calculadora Avanzada', resumen: 'Descripción de esta calculadora...', autores: ['Maria', 'Carlos'], keywords: ['avanzada', 'compleja'], link: '/advanced' }
        ],
        recentCalculatorIds: [],
        favoriteCalculatorIds: [],
    }),
    actions: {
        addRecentCalculator(id: number) {
            if (!this.recentCalculatorIds.includes(id as never)) {
                this.recentCalculatorIds.unshift(id as never); // Agrega al inicio para mantener el orden reciente
                if (this.recentCalculatorIds.length > 5) {
                    this.recentCalculatorIds.pop(); // Mantiene solo los últimos 5
                }
            }
        },
        toggleFavoriteCalculator(id: number) {
            const index = this.favoriteCalculatorIds.indexOf(id as never);
            if (index === -1) {
                this.favoriteCalculatorIds.push(id as never);
            } else {
                this.favoriteCalculatorIds.splice(index, 1);
            }

            console.log("favorite calulators ",this.favoriteCalculatorIds);
        },
        getRecentCalculators() {
            return this.recentCalculatorIds.map(id => this.calculators.find(calc => calc.id === id)) as never[];
        },
        getFavoriteCalculators() {
            return this.favoriteCalculatorIds.map(id => this.calculators.find(calc => calc.id === id)) as never[];
        },
        isFavoriteCalculator(id: number) {
            return this.favoriteCalculatorIds.includes(id as never);
        }
    }
});
