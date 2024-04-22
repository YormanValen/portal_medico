<script setup lang="ts">
import { ref, watch, computed } from 'vue';


/*Social icons*/
import google from '@/assets/images/svgs/google-icon.svg';
import facebook from '@/assets/images/svgs/facebook-icon.svg';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

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



const router = useRouter();

const otherSpeciality = ref('');
const profession = ref('');
const otherHealthArea = ref('');
const otherNonHealthArea = ref('');




// Inicializa el array con el tipo específico
const specialitiesOptions = ref<string[]>([]);


const professions = computed(() => [
    t('estudiante'),
    t('doctor'),
    t('nurse'),
    t('pharmacist'),
    t('psychologist'),
    t('resident'),
    t('researcher'),
    t('specialist'),
    t('managementAndAdministration'),
    t('oralHealthProfessional'),
    t('otherHealthRelatedAreas'),
    t('otherNonHealthRelatedAreas')
]);

// Observa los cambios en profession y actualiza specialitiesOptions si es necesario
watch(profession, (newProfession) => {
    if (newProfession === t('resident') || newProfession === t('specialist')) {
        // Aquí podrías cargar las especialidades desde una API o definir una lista estática
        specialitiesOptions.value = [
            'Alergología',
            'Anestesiología',
            'Cardiología',
            'Cardiología intervencionista',
            'Cardiología pediátrica',
            'Cirugía cardiovascular',
            'Cirugía de mano',
            'Cirugía de trasplantes',
            'Cirugía de trasplantes de órganos',
            'Cirugía plástica',
            'Cirugía vascular periférica',
            'Coloproctologia',
            'Dermatología',
            'Electrofisiología cardíaca',
            'Endocrinología',
            'Gastroenterología',
            'Ginecología y obstetricia',
            'Hemato-oncología',
            'Infectología',
            'Infectología pediátrica',
            'Medicina',
            'Medicina Homeopática',
            'Medicina Osteopática',
            'Medicina aplicada a la actividad física y al deporte',
            'Medicina crítica y cuidado',
            'Medicina crítica y cuidado intensivo',
            'Medicina de urgencias',
            'Medicina del deporte y de la actividad física',
            'Medicina del dolor y cuidados paliativos',
            'Medicina familiar',
            'Medicina maternofetal',
            'Medicina tradicional china',
            'Neonatología',
            'Neumología',
            'Neurología',
            'Neurología pediátrica',
            'Obstetricia y ginecología',
            'Oftalmología',
            'Ortopedia infantil',
            'Ortopedia y traumatología',
            'Otología',
            'Otorrinolaringología',
            'Patología',
            'Psiquiatría',
            'Psiquiatría de enlace',
            'Psiquiatría de niños y adolescentes',
            'Radiología',
            'Radiología e imágenes',
            'Radioterapia'
        ];
        console.log('Especialidades:', specialitiesOptions.value);
        // reemplaza los puntos suspensivos con tus especialidades
    } else {
        specialitiesOptions.value = [];
    }
});

const passwordRules = ref([
    (v: string) => !!v || t('passwordRequired'),
    (v: string) => (v && v.length <= 10) || t('passwordLength'),
]);
const emailRules = ref([(v: string) => !!v || t('emailRequired'), (v: string) => /.+@.+\..+/.test(v) || t('emailInvalid')]);

const fnameRules = ref([
    (v: string) => !!v || t('fiedRequired'),
    (v: string) => isNaN(Number(v)) || t('fieldCannotBeANumber'),

]);

const countryRules = ref([
    (v: string) => !!v || t('fiedRequired'),
    (v: string) => isNaN(Number(v)) || t('fieldCannotBeANumber'),

]);

const cityRules = ref([
    (v: string) => !!v || t('fiedRequired'),
    (v: string) => isNaN(Number(v)) || t('fieldCannotBeANumber'),
]);


const yearsOfExperienceRules = ref([
    (v: string) => !!v || t('fiedRequired'),
    (v: string) => !isNaN(Number(v)) || t('fieldMustBeNumber'),
]);

const orcidRules = ref([
    (v: string) => !!v || t('fiedRequired'),
]);

const chargeRules = ref([
    (v: string) => !!v || t('fiedRequired'),
    (v: string) => isNaN(Number(v)) || t('fieldCannotBeANumber'),

]);


const submitRegistration = () => {

    if (!valid.value) {
        apiError.value = t('formError');
        return; // Detiene la función si el formulario no es válido.
    }

    const newUser = {
        username: email.value,
        password: password.value,
        name: fname.value,
        country: country.value,
        city: city.value,
        yearsOfExperience: yearsOfExperience.value,
        orcid: orcid.value,
        profession: profession.value,
        otherHealthArea: otherHealthArea.value,
        otherNonHealthArea: otherNonHealthArea.value,
        especiality: (profession.value === t('resident') || profession.value === t('specialist')) ? especiality.value : '',
        otherSpeciality: otherSpeciality.value, // Asegúrate de que esta línea corresponda a tu lógica de negocio

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
                <span class="d-sm-flex d-none mr-1">{{ $t('signInGoogle') }}</span>
            </v-btn>
        </v-col>
        <v-col cols="6" sm="6">
            <v-btn variant="outlined" size="large" class="border text-subtitle-1" block>
                <img :src="facebook" width="25" height="30" class="mr-1" alt="facebook" />
                <span class="d-sm-flex d-none mr-1">{{ $t('signInFB') }}</span>
            </v-btn>
        </v-col>
    </v-row>
    <div class="d-flex align-center text-center mb-6">
        <div class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative">
            <span class="bg-surface px-5 py-3 position-relative">{{ $t('orSignIn') }}</span>
        </div>
    </div>
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent action="/pages/boxedlogin" class="mt-5">
        <v-row>
            <v-col>
                <v-label class="text-subtitle-1 font-weight-medium pb-2">{{ $t('name') }}</v-label>
                <VTextField v-model="fname" :rules="fnameRules" required></VTextField>
                <v-label class="text-subtitle-1 font-weight-medium pb-2">{{ $t('Email') }}</v-label>
                <VTextField v-model="email" :rules="emailRules" required></VTextField>
                <v-label class="text-subtitle-1 font-weight-medium pb-2">{{ $t('password') }}</v-label>
                <VTextField type="password" v-model="password" :rules="passwordRules" required></VTextField>
                <v-label class="text-subtitle-1 font-weight-medium pb-2">{{ $t('country') }}</v-label>
                <VTextField v-model="country" :rules="countryRules" required></VTextField>
                <v-label class="text-subtitle-1 font-weight-medium pb-2">{{ $t('city') }}</v-label>
                <VTextField v-model="city" :rules="cityRules" required></VTextField>
            </v-col>
            <v-col>
                <v-label class="text-subtitle-1 font-weight-medium pb-2">{{ $t('profession') }}</v-label>
                <v-select v-model="profession" :items="professions" required></v-select>
                <!-- Muestra el select de especialidades si la profesión seleccionada es 'Residente' o 'Especialista' -->
                <v-label v-if="profession === t('resident') || profession === t('specialist')"
                    class="text-subtitle-1 font-weight-medium pb-2">{{ $t('especificarEspecialidad') }}</v-label>
                <v-select v-if="profession === t('resident') || profession === t('specialist')" v-model="especiality"
                    :items=specialitiesOptions  required></v-select>

                <!-- Muestra un campo de texto si la profesión seleccionada es 'Otras áreas relacionadas con la salud' -->
                <v-label v-if="profession === 'Otras áreas relacionadas con la salud'"
                    class="text-subtitle-1 font-weight-medium pb-2">{{ $t('especificarArea') }}</v-label>
                <v-text-field v-if="profession === 'Otras áreas relacionadas con la salud'" v-model="otherHealthArea"
                    required></v-text-field>

                <!-- Muestra un campo de texto si la profesión seleccionada es 'Otras áreas no relacionadas con la salud' -->
                <v-label v-if="profession === 'Otras áreas no relacionadas con la salud'"
                    class="text-subtitle-1 font-weight-medium pb-2">{{ $t('especificarArea') }}</v-label>
                <v-text-field v-if="profession === 'Otras áreas no relacionadas con la salud'"
                    v-model="otherNonHealthArea" required></v-text-field>


                <v-label class="text-subtitle-1 font-weight-medium pb-2">{{ $t('yearsExperience') }}</v-label>
                <VTextField v-model="yearsOfExperience" :rules="yearsOfExperienceRules" required></VTextField>
                <v-label class="text-subtitle-1 font-weight-medium pb-2">{{ $t('orcid') }}</v-label>
                <VTextField v-model="orcid" required></VTextField>

            </v-col>
        </v-row>
        <v-row>
            <v-checkbox v-model="agreeToPrivacyPolicy" :rules="[v => v || t('advertisingPrivacyPolicy')]"
                class="mb-3 w-100 privacy-checkbox">
                <template v-slot:label>
                    <div class="d-flex align-center justify-content-between">
                        <span class="flex-grow-1 ">{{ $t('privacyText') }}<RouterLink class="link-privacy-policy"
                                color="primary" to="/privacy-policy">{{ $t('privacyPolicy') }}</RouterLink> </span>
                    </div>
                </template>
            </v-checkbox>
        </v-row>

        <v-btn size="large" @click.prevent="submitRegistration" class="mt-2" color="primary" block submit flat>{{
            $t('Sign Up')
            }}
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