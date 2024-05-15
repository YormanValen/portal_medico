import axios from 'axios';
import { defineStore } from 'pinia';

export const useDesenlaceStore = defineStore('desenlaceStore', {
    state: () => ({
        desenlaces: []
    }),
    actions: {
        async fetchDesenlaces() {
            try {
                const response = await axios.get('https://663874224253a866a24dcdb9.mockapi.io/api/desenlaces');
                this.desenlaces = response.data;
                console.log('fetchDesenlaces', this.desenlaces);
            } catch (error) {
                console.error('fetchDesenlaces error:', (error as Error).message || error);
            }
        },

        //metodo para modificar un desenlace
        async updateDesenlace(desenlace: any) {
            try {
                console.log('desenlace id:', desenlace.ID);
                const response = await axios.put(`https://663874224253a866a24dcdb9.mockapi.io/api/desenlaces/${desenlace.ID}`, desenlace);
                console.log('updateDesenlace', response);
            } catch (error) {
                console.error('updateDesenlace error:', (error as Error).message || error);
            }
        },

        //metodo para obtener un desenlace por id
        async getDesenlaceById(id: any) {
            try {
                const response = await axios.get(`https://663874224253a866a24dcdb9.mockapi.io/api/desenlaces/${id}`);
                console.log('getDesenlaceById', response);
                return response.data;
            } catch (error) {
                console.error('getDesenlaceById error:', (error as Error).message || error);
            }
        },

        async deleteDesenlace(id: any) {
            try {
                const response = await axios.delete(`https://663874224253a866a24dcdb9.mockapi.io/api/desenlaces/${id}`);
                this.desenlaces = this.desenlaces.filter(item => item.ID !== id);
                console.log('deleteDesenlace', response);
            } catch (error) {
                console.error('deleteDesenlace error:', (error as Error).message || error);
            }
        }
    }
});
