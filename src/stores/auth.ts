import { defineStore } from 'pinia';
import { router } from '@/router';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        // @ts-ignore
        user: JSON.parse(localStorage.getItem('user') || 'null'),
        returnUrl: null
    }),
    getters: {
        isLoggedIn: (state) => !!state.user,
        isAdmin: (state) => state.user && state.user.role === 'Admin'
    },
    actions: {
        async login(username: any, password: any) {
            try {
                const response = await fetchWrapper.post(`${baseUrl}/authenticate`, { username, password });
                // Asumiendo que tu fetchWrapper ya parsea el JSON y solo devuelve los datos...
                console.log(response);

                // Obtener los detalles completos del usuario
                const userDetails = this.getUserDetails(username);
                console.log('userDetails', userDetails);

                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || 'Login failed');
                }

                this.user = response; // Establecer el usuario en el estado de Pinia.

                localStorage.setItem('user', JSON.stringify(userDetails)); // Guardar el usuario en localStorage.
                router.push(this.returnUrl || '/');
            } catch (error) {
                console.error('Login error:', (error as Error).message || error);
                // Aquí manejarías el error, como mostrar un mensaje al usuario.
            }
        },

        async register(
            username: string,
            password: string,
            name: string,
            country: string,
            city: string,
            especiality: string,
            yearsOfExperience: number,
            orcid: string,
            profession: string,
            otherHealthArea: string,
            otherNonHealthArea: string,
            otherSpeciality: string
        ) {
            const newUser = await fetchWrapper.post(`${baseUrl}/register2`, {
                city,
                country,
                especiality,
                name,
                orcid,
                otherHealthArea,
                otherNonHealthArea,
                otherSpeciality,
                password,
                profession,
                username,
                yearsOfExperience
            });
            localStorage.setItem('newUser', JSON.stringify(newUser));
            router.push(this.returnUrl || '/auth/login2');
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            localStorage.removeItem('datosUsuario');
            router.push('/auth/login2');
        },
        // Método para agregar un atributo al usuario
        addAttribute(newIntroduction: any) {
            // Verificar si el usuario está logueado antes de intentar modificar su perfil
            if (!this.user) return;

            // Actualizar el campo de introducción en el estado del usuario
            this.user.introduction = newIntroduction;

            // Guardar el usuario actualizado en localStorage
            localStorage.setItem('user', JSON.stringify(this.user));
        },
        //funcion para obtenet los datos del usuario
        getUserDetails(username: string) {
            const users: Array<{ username: string }> = JSON.parse(localStorage.getItem('users') || '[]');
            return users.find((user: { username: string }) => user.username === username);
        }
    }
});
