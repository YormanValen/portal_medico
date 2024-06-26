<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { Form } from 'vee-validate';
/*Social icons*/
import google from '@/assets/images/svgs/google-icon.svg';
import facebook from '@/assets/images/svgs/facebook-icon.svg';
import { router } from '@/router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const checkbox = ref(false);
const valid = ref(false);
const show1 = ref(false);
const password = ref('admin123');
const username = ref('yorman@outlook.com');
const passwordRules = ref([
    (v: string) => !!v || t('passwordRequired'),
    (v: string) => (v && v.length <= 10) || t('passwordLength')
]);
const emailRules = ref([(v: string) => !!v || t('emailRequired'), (v: string) => /.+@.+\..+/.test(v) || t('emailInvalid')]);

function validate(values: any, { setErrors }: any) {
    const authStore = useAuthStore();
    return authStore.login(username.value, password.value)
        .catch((error) => setErrors({ apiError: error }));
}
</script>

<template>
    <div class="login_ctn">
        <v-row class="d-flex mb-3">
            <v-col cols="6" sm="6">
                <v-btn variant="outlined" size="large" class="border text-subtitle-1" block>
                    <img :src="google" height="16" class="mr-2" alt="google" />
                    <span class="d-sm-flex d-none mr-1">{{ $t('signInGoogle') }}</span>
                </v-btn>
            </v-col>
            <v-col cols="6" sm="6">
                <v-btn variant="outlined" size="large" class="border text-subtitle-1" block>
                    <img :src="facebook" width="25" height="25" class="mr-1" alt="facebook" />
                    <span class="d-sm-flex d-none mr-1">{{ $t('signInFB') }}</span>
                </v-btn>
            </v-col>
        </v-row>
        <div class="d-flex align-center text-center mb-6">
            <div class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative">
                <span class="bg-surface px-5 py-3 position-relative">{{ $t('orSignIn') }}</span>
            </div>
        </div>
        <Form @submit="validate" v-slot="{ errors, isSubmitting }" class="mt-5">
            <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">{{ $t('username') }}</v-label>
            <VTextField v-model="username" :rules="emailRules" class="mb-8" required hide-details="auto"></VTextField>
            <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">{{ $t('password') }}</v-label>
            <VTextField v-model="password" :rules="passwordRules" required hide-details="auto" type="password"
                class="pwdInput"></VTextField>
            <div class="d-flex flex-wrap align-center my-3 ml-n2">
                <v-checkbox v-model="checkbox" :rules="[(v: any) => !!v || 'You must agree to continue!']" required
                    hide-details color="primary">
                    <template v-slot:label class="">{{ $t('rememberDevice') }}</template>
                </v-checkbox>
                <div class="ml-sm-auto">
                    <RouterLink to="/auth/forgot-password2"
                        class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium">
                        {{ $t('Forgot Password') }}
                        ?</RouterLink>
                </div>
            </div>
            <v-btn size="large" :loading="isSubmitting" color="primary" :disabled="valid" block type="submit" flat>{{ $t('signIn') }}</v-btn>
            <div v-if="errors.apiError" class="mt-2">
                <v-alert color="error">{{ errors.apiError }}</v-alert>
            </div>
        </Form>
    </div>
</template>
