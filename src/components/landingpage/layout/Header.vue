<script setup lang="ts">
import { ref, watch } from 'vue';
import { useCustomizerStore } from '@/stores/customizer';
import Logo from '@/layouts/full/logo/Logo.vue';
import RtlLogo from '@/layouts/full/logo/RtlLogo.vue';
import Navigations from '@/components/landingpage/layout/Navigation.vue';
/*Mobile Sidebar*/
import MobileSidebar from '@/components/landingpage/layout/MobileSidebar.vue';
/*import tabler icons*/
import { Menu2Icon } from 'vue-tabler-icons';
import ProfileDD from './ProfileDD.vue';
import LanguageDD from './LanguageDD.vue';
import { useAuthStore } from '../../../stores/auth';
import { computed } from 'vue';

const authStore = useAuthStore();
const user = computed(() => authStore.user);
const appsdrawer = ref(false);
const customizer = useCustomizerStore();



</script>
<template>
    <div>
        <div>
            <!-- -----------------------------------------------
                    Start Header
                    ----------------------------------------------- -->
            <v-app-bar height="80" class="lp-header" flat>
                <v-container class=" py-sm-4 py-0">
                    <v-toolbar class="">
                        <div class="header_ctn ">
                            <!-- Logo -->
                            <div v-if="customizer.setRTLLayout" rtl>
                                <RtlLogo />
                            </div>
                            <div v-else>
                                <Logo />
                            </div>

                            <!-- Desktop view Navigationnnnn -->
                            <div class="navigation  d-lg-flex d-none">
                                <Navigations />
                            </div>
                            <v-btn variant="text" class="hidden-lg-and-up ml-auto" icon
                                @click.stop="appsdrawer = !appsdrawer">
                                <Menu2Icon size="22" stroke-width="1.5" />
                            </v-btn>

                            <LanguageDD />

                            <div v-if="user" class="profile_ctn">
                                <ProfileDD />
                            </div>
                        </div>
                    </v-toolbar>
                </v-container>
            </v-app-bar>
            <!-- -----------------------------------------------
                    End Header
                    ----------------------------------------------- -->
        </div>

        <!----sidebar menu drawer start----->
        <v-navigation-drawer class="lp-drawer" v-model="appsdrawer" location="left" temporary>
            <MobileSidebar />
        </v-navigation-drawer>
    </div>
</template>


<style lang="scss" scoped>
.v-container {
    max-width: 1200px !important;
}

.header_ctn {
    justify-content: space-around !important;
    display: flex;
    width: 100%;
    align-items: center;
}
</style>