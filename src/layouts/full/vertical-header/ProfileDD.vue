<script setup lang="ts">
import { MailIcon } from 'vue-tabler-icons';
import { profileDD } from '@/_mockApis/headerData';

import { useAuthStore } from '@/stores/auth';
import { computed } from 'vue';

const authStore = useAuthStore();
const user = computed(() => authStore.user);
</script>

<template>
    <!-- ---------------------------------------------- -->
    <!-- notifications DD -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="false">
        <template v-slot:activator="{ props }">
            <v-btn class="custom-hover-primary" variant="text" v-bind="props" icon>
                <v-avatar size="35">
                    <img src="@/assets/images/profile/user-1.jpg" width="35" alt="Julia" />
                </v-avatar>
            </v-btn>
        </template>
        <!-- Contenido del perfil cuando el usuario no está loggeado -->
        <v-sheet v-if="user" rounded="md" width="360" elevation="10">
            <div class="px-8 pt-6">
                <h6 class="text-h5 font-weight-medium">User Profile</h6>
                <div class="d-flex align-center mt-4 pb-6">
                    <v-avatar size="80">
                        <img src="@/assets/images/profile/user-1.jpg" width="80" />
                    </v-avatar>
                    <div class="ml-3">
                        <h6 class="text-h6 mb-n1">{{ user.name }}</h6>
                        <span class="text-subtitle-1 font-weight-regular textSecondary">{{ user.charge }}</span>
                        <div class="d-flex align-center mt-1">
                            <MailIcon size="18" stroke-width="1.5" />
                            <span class="text-subtitle-1 font-weight-regular textSecondary ml-2">{{ user.username
                                }}</span>
                        </div>
                    </div>
                </div>
                <v-divider></v-divider>
            </div>
            <perfect-scrollbar style="height: calc(100vh - 240px); max-height: 240px">
                <v-list class="py-0 theme-list" lines="two">
                    <v-list-item v-for="item in profileDD" :key="item.title" class="py-4 px-8 custom-text-primary"
                        :to="item.href">
                        <template v-slot:prepend>
                            <v-avatar size="48" color="lightprimary" class="mr-3" rounded="md">
                                <v-img :src="item.avatar" width="24" height="24" :alt="item.avatar" />
                            </v-avatar>
                        </template>
                        <div>
                            <h6 class="text-subtitle-1 font-weight-bold mb-2 custom-title">{{ item.title }}</h6>
                        </div>
                        <p class="text-subtitle-1 font-weight-regular textSecondary">{{ item.subtitle }}</p>
                    </v-list-item>
                </v-list>
            </perfect-scrollbar>

            <div class="pt-4 pb-6 px-8 text-center">
                <v-btn color="primary" variant="outlined" block @click="authStore.logout()">Logout</v-btn>
            </div>
        </v-sheet>

        <!-- Contenido del perfil cuando el usuario no está loggeado -->
        <v-sheet v-else rounded="md" width="360" elevation="10">
            <div class="text-center pa-6">
                <h5 class="mb-2">Acción requerida</h5>
                <p class="mb-4">Para acceder a esta sección, inicia sesión o crea una cuenta.</p>
                <v-btn color="primary" class="mx-2" to="auth/login2">Login</v-btn>
                <v-btn color="secondary" class="mx-2" to="auth/register2">Register</v-btn>
            </div>
        </v-sheet>
    </v-menu>
</template>
