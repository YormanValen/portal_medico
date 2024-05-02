// src/stores/calculatorsStore.js
import axios from 'axios';
import { defineStore } from 'pinia';

export const useCalculatorsStore = defineStore('calculatorsStore', {
    state: () => ({
        response_api: [],
        calculators: [
            {
                id: 1,
                name: 'Calculadora Mortalidad',
                resumen: 'Descripción de esta calculadora...',
                autores: ['Juan', 'Jhon'],
                keywords: ['científica', 'compleja'],
                link: '/advertising'
            },
            {
                id: 2,
                name: 'Calculadora Básica',
                resumen: 'Descripción de esta calculadora...',
                autores: ['Ana', 'Luis'],
                keywords: ['básica', 'simple'],
                link: '/basic'
            },
            {
                id: 3,
                name: 'Calculadora Avanzada',
                resumen: 'Descripción de esta calculadora...',
                autores: ['Maria', 'Carlos'],
                keywords: ['avanzada', 'compleja'],
                link: '/advanced'
            }
        ],
        recentCalculatorIds: [],
        favoriteCalculatorIds: []
    }),
    actions: {
        async fetchCalculators() {
            try {
                // Datos que deseas enviar en la solicitud POST
                const postData = {
                    user_id: '0fe0d662-8196-4293-87d1-0e775ce1dbd2',
                    attr: {
                        edadmintervencion: 80,
                        sexopte: 1,
                        tabaquismo: 0,
                        mtabaco: 0,
                        imc: 35,
                        hta: 0,
                        arritmiacard: 0,
                        erc: 0,
                        fallacardcron: 0,
                        dislipidemia: 0,
                        dm: 0,
                        epoc: 0,
                        transtiroideo: 0,
                        diagcovid19: 0,
                        covid19menor2: 0,
                        esquemavacu: 0,
                        estratosocioecono: 2,
                        afiliacionsistema: 2,
                        asascore: 3,
                        complejidadprocedimiento: 2,
                        momntointerven: 0,
                        inestabilidadhemodinamica: 0,
                        parocardiacopreoperatorio: 0,
                        tipocx: 1000,
                        tipodeabordajecx: 1
                    }
                };

                // Realizar la solicitud POST a la API
                const response = await axios.post('https://c03pz1fzie.execute-api.us-east-1.amazonaws.com/dev/apiresource', postData);

                // Procesar la respuesta de la API
                this.response_api = response.data; // Suponiendo que la respuesta de la API es un arreglo de datos
                console.log('Datos obtenidos:', this.response_api);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        },

        obtenerDatosUsuario() {
            const datosUsuario: any = JSON.parse(localStorage.getItem('datosUsuario') || '[]');
            return datosUsuario;
        },

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

            console.log('favorite calulators ', this.favoriteCalculatorIds);
        },
        getRecentCalculators() {
            return this.recentCalculatorIds.map((id) => this.calculators.find((calc) => calc.id === id)) as never[];
        },
        getFavoriteCalculators() {
            return this.favoriteCalculatorIds.map((id) => this.calculators.find((calc) => calc.id === id)) as never[];
        },
        isFavoriteCalculator(id: number) {
            return this.favoriteCalculatorIds.includes(id as never);
        }
    }
});
