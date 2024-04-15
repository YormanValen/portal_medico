<script setup lang="ts">
import { ref } from 'vue';
import QuickLinks from './QuickLinks.vue';
import AppsLink from './AppsLink.vue';
import { HelpIcon, ChevronDownIcon } from 'vue-tabler-icons';
import { useAuthStore } from '@/stores/auth';
import { computed } from 'vue';

const authStore = useAuthStore();
const user = computed(() => authStore.user);

</script>

<template>
    <!-- ---------------------------------------------- -->
    <!-- mega menu DD -->
    <!-- ---------------------------------------------- -->
    <v-menu open-on-hover :close-on-content-click="false">
        <template v-slot:activator="{ props }">
            <!--  <v-btn class="hidden-sm-and-down" rounded="sm" variant="text" color="primary" v-bind="props">
                Apps <ChevronDownIcon size="16" class="mt-1 ml-1" />
            </v-btn> -->
        </template>
        <!--<v-sheet width="900" height="382" elevation="10" rounded="md" class="pa-4 pb-0">
            <div>
                <v-row>
                    <v-col cols="12" lg="8" class="d-flex py-0">
                        <div class="pa-4 pb-0 pr-0">
                            <AppsLink />
                            <v-divider class="mt-6"></v-divider>
                            <div class="pa-5 pl-0">
                                <div class="d-flex align-center justify-space-between">
                                    <router-link to="/" class="text-decoration-none d-flex align-center">
                                        <HelpIcon size="20" stroke-width="1.5" class="text-hover-primary" />
                                        <h6 class="text-subtitle-1 font-weight-bold text-hover-primary ml-2">Frequently Asked Questions</h6>
                                    </router-link>
                                    <v-btn color="primary" variant="flat">Check</v-btn>
                                </div>
                            </div>
                        </div>

                        <v-divider vertical></v-divider>
                    </v-col>
                    <v-col cols="12" lg="4" class="py-0">
                        <div class="pa-4">
                            <h5 class="text-h5">Quick Links</h5>
                            <QuickLinks />
                        </div>
                    </v-col>
                </v-row>
            </div>
        </v-sheet> -->
    </v-menu>
    <router-link to="/advertising" class="text-decoration-none">
        <v-btn variant="text" color="primary">Calculator form </v-btn>
    </router-link>
    <router-link to="/advertising" class="text-decoration-none">
        <v-btn variant="text" color="primary">Inicio </v-btn>
    </router-link>
    <router-link to="/advertising" class="text-decoration-none">
        <v-btn variant="text" color="primary">Nosotros </v-btn>
    </router-link>
    <router-link to="/advertising" class="text-decoration-none">
        <v-btn variant="text" color="primary">Calculadoras </v-btn>
    </router-link>
    <router-link to="/advertising" class="text-decoration-none">
        <v-btn variant="text" color="primary">Investigación </v-btn>
    </router-link>
    <router-link to="/advertising" class="text-decoration-none">
        <v-btn variant="text" color="primary">Servicios </v-btn>
    </router-link>
    <router-link v-if="!user" to="auth/login2" class="text-decoration-none">
        <v-btn class="btn_ingresar" target="_blank" to="/auth/login2">Ingresar</v-btn>
    </router-link>
    <router-link v-if="!user" to="auth/register2" class="text-decoration-none">
        <v-btn class="btn_registro primary" target="_blank" color="primary" to="/auth/register2"
            flat>Registrarse</v-btn>
    </router-link>
</template>

<style lang="scss" scoped>
.v-btn {
    color: rgb(var(--v-theme-textSecondary)) !important;
}

.btn_ingresar {
    border: 1.5px solid #007bff !important;
    color: #007bff !important;
    margin-right: 20px
}

.btn_ingresar:hover {
    background-color: #ecf1f8 !important;
}

.btn_registro {
    background-color: #007bff !important;
    color: white !important;
    border: 1.5px solid white !important;

}

.btn_registro:hover {
    background-color: #0358b3 !important;


}
</style>
