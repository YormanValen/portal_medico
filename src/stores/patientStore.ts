// stores/usePatientStore.js
import { defineStore } from 'pinia';

export const usePatientStore = defineStore('patient', {
    state: () => ({
        patientDetails: null
    }),
    actions: {
        async fetchPatientDetails(patientId: any) {
            try {
                const response = await fetch(`/api/patients/${patientId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer fake-jwt-token' // Si necesitas manejar autenticación
                    }
                });

                if (!response.ok) throw new Error('Failed to fetch patient details');
                const data = await response.json();
                this.patientDetails = data;
            } catch (error: any) {
                console.error('Error fetching patient details:', error.message);
            }
        }
    }
});
