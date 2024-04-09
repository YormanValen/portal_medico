import { useRouter } from 'vue-router'
<script setup lang="ts">
import { ref } from 'vue';


/*Social icons*/
import google from '@/assets/images/svgs/google-icon.svg';
import facebook from '@/assets/images/svgs/facebook-icon.svg';
import { useRouter } from 'vue-router';

/*Components*/
const checkbox = ref(false);
const valid = ref(true);
const show1 = ref(false);
const password = ref('');
const email = ref('');
const country = ref('');
const city = ref('');
const especiality = ref('');
const yearsOfExperience = ref('');
const orcid = ref('');
const charge = ref('');
const fname = ref('');
const apiError = ref('');
const agreeToPrivacyPolicy = ref(false); // Para manejar el estado del checkbox



const especialities = ref(["Foo", "Bar", "Fizz", "Buzz"]);
const router = useRouter();


const passwordRules = ref([
    (v: string) => !!v || 'Password is required',
    (v: string) => (v && v.length <= 10) || 'Password must be less than 10 characters'
]);
const emailRules = ref([(v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);

const fnameRules = ref([
    (v: string) => !!v || 'Name is required',
    (v: string) => isNaN(Number(v)) || 'Cannot be a number',

]);

const countryRules = ref([
    (v: string) => !!v || 'Country is required',
    (v: string) => isNaN(Number(v)) || 'Cannot be a number',

]);

const cityRules = ref([
    (v: string) => !!v || 'City is required',
    (v: string) => isNaN(Number(v)) || 'Cannot be a number',
]);


const yearsOfExperienceRules = ref([
    (v: string) => !!v || 'Years of Experience is required',
    (v: string) => !isNaN(Number(v)) || 'Must be a number',
]);

const orcidRules = ref([
    (v: string) => !!v || 'Orcid is required',
]);

const chargeRules = ref([
    (v: string) => !!v || 'charge is required',
    (v: string) => isNaN(Number(v)) || 'Cannot be a number',

]);


const submitRegistration = () => {

    if (!valid.value) {
        apiError.value = 'Por favor, rellene el formulario correctamente.';
        return; // Detiene la función si el formulario no es válido.
    }

    const newUser = {
        username: email.value,
        password: password.value,
        name: fname.value,
        country: country.value,
        city: city.value,
        especiality: especiality.value,
        yearsOfExperience: yearsOfExperience.value,
        orcid: orcid.value,
        charge: charge.value
    };

    fetch('/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
    })
        .then(async response => {
            const data = await response.json();
            if (response.ok) {
                console.log('Registro exitoso:', data);
                // Aquí podrías redirigir al usuario o mostrar un mensaje de éxito
                router.push('/auth/login2');
            } else {
                console.error('Error en el registro:', data.message);
                // Manejar errores de registro, mostrar mensaje al usuario
            }
        })
        .catch(error => {
            console.error('Error al conectar con el backend:', error);
        });
};


</script>
<template>
    <v-row class="d-flex mb-6 w-100">
        <v-col cols="6" sm="6">
            <v-btn variant="outlined" size="large" class="border text-subtitle-1" block>
                <img :src="google" height="20" class="mr-2" alt="google" />
                <span class="d-sm-flex d-none mr-1">Sign up with</span>Google
            </v-btn>
        </v-col>
        <v-col cols="6" sm="6">
            <v-btn variant="outlined" size="large" class="border text-subtitle-1" block>
                <img :src="facebook" width="25" height="30" class="mr-1" alt="facebook" />
                <span class="d-sm-flex d-none mr-1">Sign up with</span>FB
            </v-btn>
        </v-col>
    </v-row>
    <div class="d-flex align-center text-center mb-6">
        <div class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative">
            <span class="bg-surface px-5 py-3 position-relative">or sign in with</span>
        </div>
    </div>
    <v-form ref="form" v-model="valid" lazy-validation @submit="" action="/pages/boxedlogin" class="mt-5">
        <v-row>
            <v-col>
                <v-label class="text-subtitle-1 font-weight-medium pb-2">Name</v-label>
                <VTextField v-model="fname" :rules="fnameRules" required></VTextField>
                <v-label class="text-subtitle-1 font-weight-medium pb-2">Email Adddress</v-label>
                <VTextField v-model="email" :rules="emailRules" required></VTextField>
                <v-label class="text-subtitle-1 font-weight-medium pb-2">Password</v-label>
                <VTextField type="password" v-model="password" :rules="passwordRules" required></VTextField>
                <v-label class="text-subtitle-1 font-weight-medium pb-2">Country</v-label>
                <VTextField v-model="country" :rules="countryRules" required></VTextField>
                <v-label class="text-subtitle-1 font-weight-medium pb-2">City</v-label>
                <VTextField v-model="city" :rules="cityRules" required></VTextField>
            </v-col>
            <v-col>
                <v-label class="text-subtitle-1 font-weight-medium pb-2">Especiality</v-label>
                <v-select :items="especialities" v-model="especiality" label="Select Item" required></v-select>
                <v-label class="text-subtitle-1 font-weight-medium pb-2">Years of Experience</v-label>
                <VTextField v-model="yearsOfExperience" :rules="yearsOfExperienceRules" required></VTextField>
                <v-label class="text-subtitle-1 font-weight-medium pb-2">Orcid</v-label>
                <VTextField v-model="orcid" required></VTextField>
                <v-label class="text-subtitle-1 font-weight-medium pb-2">Charge</v-label>
                <VTextField v-model="charge" required></VTextField>
            </v-col>
        </v-row>
        <v-row>
            <v-checkbox v-model="agreeToPrivacyPolicy"
                :rules="[v => v || 'Debes aceptar las políticas de privacidad para continuar']"
                class="mb-3 privacy-checkbox">
                <template v-slot:label>
                    <div class="d-flex align-center justify-content-between">
                        <span class="flex-grow-1 ">Tus datos son muy importantes para nosotros y los tratamos con la máxima seguridad y
                            confidencialidad. ¿Aceptas nuestras <RouterLink class="link-privacy-policy" color="primary" to="/privacy-policy">políticas de
                                privacidad?</RouterLink> </span>
                    </div>
                </template>
            </v-checkbox>
        </v-row>

        <v-btn size="large" @click.prevent="submitRegistration" class="mt-2" color="primary" block submit flat>Sign
            up
        </v-btn>

        <div v-if="apiError" class="mt-2 alert-box">
            <v-alert type="error" dense>{{ apiError }}</v-alert>
        </div>
    </v-form>
</template>

<style scoped>

.privacy-checkbox {
    padding: 0 .5vw;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.privacy-checkbox .v-selection-control {
    flex-direction: row-reverse !important;
}

.link-privacy-policy {
    color: rgb(var(--v-theme-primary)) !important;
    text-decoration: none;
}



</style>