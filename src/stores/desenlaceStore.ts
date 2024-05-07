import axios from 'axios';
import { defineStore } from 'pinia';

export const useDesenlaceStore = defineStore('desenlaceStore', {
    state: () => ({
        desenlaces: [
            // {
            //     ID: 222,
            //     Edad: 20,
            //     Fecha: new Date().toLocaleDateString('es-ES'),
            //     Procedimiento: '25425 APENDICECTOMIA',
            //     Completado: true
            // },
            // {
            //     ID: 2566,
            //     Edad: 25,
            //     Fecha: new Date().toLocaleDateString('es-ES'),
            //     Procedimiento: '2178 COLECISTECTOMIA ',
            //     Completado: false
            // },
            // {
            //     ID: 3334,
            //     Edad: 30,
            //     Fecha: new Date().toLocaleDateString('es-ES'),
            //     Procedimiento: '3145 HISTERECTOMIA TOTAL',
            //     Completado: true
            // },
            // {
            //     ID: 4334,
            //     Edad: 35,
            //     Fecha: new Date().toLocaleDateString('es-ES'),
            //     Procedimiento: '4587 HISTERECTOMIA TOTAL',
            //     Completado: false
            // },
            // {
            //     ID: 5443,
            //     Edad: 40,
            //     Fecha: new Date().toLocaleDateString('es-ES'),
            //     Procedimiento: '3654 COLUPOPLASTIA ',
            //     Completado: true
            // }
        ]
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
         async updateDesenlace(desenlace:any) {
            try {
                console.log('desenlace id:', desenlace.ID);
                const response = await axios.put(`https://663874224253a866a24dcdb9.mockapi.io/api/desenlaces/${desenlace.ID}`, desenlace);
                console.log('updateDesenlace', response);
            } catch (error) {
                console.error('updateDesenlace error:', (error as Error).message || error);
            }
    },
    
    //metodo para obtener un desenlace por id
    async getDesenlaceById(id:any) {
        try {
            const response = await axios.get(`https://663874224253a866a24dcdb9.mockapi.io/api/desenlaces/${id}`);
            console.log('getDesenlaceById', response);
            return response.data;
        } catch (error) {
            console.error('getDesenlaceById error:', (error as Error).message || error);
        }
    },



}});
