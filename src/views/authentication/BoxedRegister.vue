<script setup lang="ts">
import Logo from '@/layouts/full/logo/Logo.vue';
/* Register form */
import RegisterForm from '@/components/auth/RegisterForm.vue';
import LanguageDD from '@/components/landingpage/layout/LanguageDD.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
<template>
    <div class="authentication">
        <v-container fluid class="pa-3"> 
            <v-row class="d-flex justify-end">
                <LanguageDD />
            </v-row>
            <v-row class="h-100vh d-flex justify-center  align-center">
                <v-col cols="12" class="d-flex align-center">
                    <v-card rounded="md" elevation="10" class="px-sm-1 px-0  mx-auto" max-width="800">
                        <v-card-item class="pa-sm-8">
                            <!-- <div class="text-h6 text-medium-emphasis text-center mb-6">Your Social Campaigns</div> -->
                            <RegisterForm />
                            <h6 class="text-h6 text-medium-emphasis d-flex justify-center align-center mt-3">
                                {{ $t('haveAccount') }}
                                <v-btn variant="plain" to="/auth/login2"
                                    class="text-primary text-body-1 opacity-1 pl-2">{{ $t('signIn') }}</v-btn>
                            </h6>
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
