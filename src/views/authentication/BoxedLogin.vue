<script setup lang="ts">
import Logo from '@/layouts/full/logo/Logo.vue';
/* Login form */
import LoginForm from '@/components/auth/LoginForm.vue';
import LanguageDD from '@/components/landingpage/layout/LanguageDD.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

</script>
<template>
    <div class="authentication">
        <v-container fluid class="pa-5">
            <v-row class="d-flex justify-end">
                <LanguageDD />
            </v-row>
            <v-row class="h-100vh d-flex justify-center align-center">

                <v-col cols="12" class="d-flex align-center">
                    <v-card rounded="md" elevation="10" class="px-sm-1 px-0  mx-auto" max-width="600">
                        <v-card-item class="pa-sm-8">

                            <!-- <div class="text-h6 text-medium-emphasis text-center mb-6">Your Social Campaigns</div> -->
                            <LoginForm />
                            <v-btn
                                class="pl-0  d-flex justify-center align-center mt-3 text-primary text-body-1 opacity-1 pl-2"
                                height="auto" to="/auth/register2" variant="plain">{{ $t('createAccount') }}</v-btn>

                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
