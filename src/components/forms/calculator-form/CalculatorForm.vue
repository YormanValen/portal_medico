<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';


const { t } = useI18n();
const router = useRouter();
const datosUsuario = ref(); // Inicializar como objeto vacío


const edad = ref('');
const genero = ref('');
const peso = ref('');
const talla = ref('');
const imc = ref('');

const tabaco = ref(false);
const hipertension = ref(false);
const arritmia = ref(false);
const fallaCardiaca = ref(false);
const diabetes = ref(false);
const epoc = ref(false);

const afiliacionSalud = ref('');
const asaScore = ref('');
const complejidadProcedimiento = ref('');
const erc = ref(false); // Enfermedad Renal Crónica
const momentoIntervencion = ref(''); // Puede ser un select con opciones predefinidas
const inestabilidadHemodinamica = ref(false);
const categoriaCirugia = ref(''); // Puede ser un select con opciones predefinidas
const cupsProcedimiento = ref(''); // Puede requerir validación específica o un componente de búsqueda
const tipoAbordajeQuirurgico = ref(''); // Puede ser un select con opciones predefinidas


// Funciones para manejar los cambios en las casillas de verificación
const handleTabacoChange = (newValue: boolean) => {
    tabaco.value = newValue;
};

const handleHipertensionChange = (newValue: boolean) => {
    hipertension.value = newValue;
};

const handleArritmiaChange = (newValue: boolean) => {
    arritmia.value = newValue;
};

const handleFallaCardiacaChange = (newValue: boolean) => {
    fallaCardiaca.value = newValue;
};

const handleDiabetesChange = (newValue: boolean) => {
    diabetes.value = newValue;
};

const handleEpocChange = (newValue: boolean) => {
    epoc.value = newValue;
};

const handleErcChange = (newValue: boolean) => {
    erc.value = newValue;
};

const handleInestabilidadHemodinamicaChange = (newValue: boolean) => {
    inestabilidadHemodinamica.value = newValue;
};


//regla para el campo age que sea de 18 a 100 y tambien que es requerido y que sea un numero
const ageRule = (v: string) => {
    if (!v) return t('ageRequired');
    if (Number(v) < 18 || Number(v) > 100) return t('ageMustBeBetween');
    if (isNaN(Number(v))) return t('fieldMustBeNumber');
    return true;
};

const selectRule = (v: string) => {
    if (!v) return t('fiedRequired');
    return true;
};

const pesoRule = (v: string) => {
    if (!v) return t('fiedRequired');
    if (isNaN(Number(v))) return t('fieldMustBeNumber');
    if (Number(v) < 40 || Number(v) > 400) return t('weightMustBeInRange');
    return true;
};

const tallaRule = (v: string) => {
    if (!v) return t('fiedRequired');
    if (isNaN(Number(v))) return t('fieldMustBeNumber');
    if (Number(v) < 100 || Number(v) > 250) return t('heightMustBeInRange');
    return true;
};

const inputNumberRule = (v: string) => {
    if (!v) return t('fiedRequired');
    if (isNaN(Number(v))) return t('fieldMustBeNumber');
    return true;
};

const textFRequired = (v: string) => {
    if (!v) return t('fiedRequired');
    return true;
};



watch([peso, talla], () => {
    const pesoNum = parseFloat(peso.value);
    const tallaNum = parseFloat(talla.value) / 100; // Convertir a metros
    if (!isNaN(pesoNum) && !isNaN(tallaNum) && tallaNum !== 0) {
        imc.value = (pesoNum / (tallaNum * tallaNum)).toFixed(2); // Calcula el IMC y lo redondea a 2 decimales
    } else {
        imc.value = ''; // Si los valores no son válidos, el IMC se borra
    }
});

const validarCampos = () => {
    if (edad.value && genero.value && peso.value && talla.value && afiliacionSalud.value && asaScore.value && complejidadProcedimiento.value) {
        return true;
    } else {
        return false;
    }
};

const interventionItems = computed(() => [
    t('preoperative'),
    t('intraoperative'),
    t('postoperative')
]);

const categoryItems = computed(() => [
    t('minor'),
    t('major')
]);

const typeOfSurgeryItems = computed(() => [
    t('open'),
    t('minimallyInvasive')
]);

const genderTypes = computed(() => [
    t('male'),
    t('female'),
    t('other')
]
)

// Método para continuar y guardar los valores
const continuar = () => {

    if (validarCampos()) {
        const datosUsuario = {
            edad: edad.value,
            genero: genero.value,
            peso: peso.value,
            talla: talla.value,
            imc: imc.value,
            tabaco: tabaco.value,
            hipertension: hipertension.value,
            arritmia: arritmia.value,
            fallaCardiaca: fallaCardiaca.value,
            diabetes: diabetes.value,
            epoc: epoc.value,
            afiliacionSalud: afiliacionSalud.value,
            asaScore: asaScore.value,
            complejidadProcedimiento: complejidadProcedimiento.value,
            erc: erc.value,
            momentoIntervencion: momentoIntervencion.value,
            inestabilidadHemodinamica: inestabilidadHemodinamica.value,
            categoriaCirugia: categoriaCirugia.value,
            cupsProcedimiento: cupsProcedimiento.value,
            tipoAbordajeQuirurgico: tipoAbordajeQuirurgico.value
        };

        console.log('Datos del usuario:', datosUsuario);

        // Guardar los datos en localStorage
        localStorage.setItem('datosUsuario', JSON.stringify(datosUsuario));

        //ir a la siguiente pagina
        router.push('/calculator/result');
    }
    else {
        console.log('Faltan campos por llenar');

    }
    // Llama a la función de validación
    // Guarda los valores de los campos en un objeto

};

const cargarDatosUsuario = () => {
    const datosGuardados = localStorage.getItem('datosUsuario');
    if (datosGuardados) {
        datosUsuario.value = JSON.parse(datosGuardados);
        // Inicializar tus variables ref con los datos cargados
        edad.value = datosUsuario.value.edad;
        genero.value = datosUsuario.value.genero;
        peso.value = datosUsuario.value.peso;
        talla.value = datosUsuario.value.talla;
        imc.value = datosUsuario.value.imc;
        tabaco.value = datosUsuario.value.tabaco;
        hipertension.value = datosUsuario.value.hipertension;
        arritmia.value = datosUsuario.value.arritmia;
        fallaCardiaca.value = datosUsuario.value.fallaCardiaca;
        diabetes.value = datosUsuario.value.diabetes;
        epoc.value = datosUsuario.value.epoc;
        afiliacionSalud.value = datosUsuario.value.afiliacionSalud;
        asaScore.value = datosUsuario.value.asaScore;
        complejidadProcedimiento.value = datosUsuario.value.complejidadProcedimiento;
        erc.value = datosUsuario.value.erc;
        momentoIntervencion.value = datosUsuario.value.momentoIntervencion;
        inestabilidadHemodinamica.value = datosUsuario.value.inestabilidadHemodinamica;
        categoriaCirugia.value = datosUsuario.value.categoriaCirugia;
        cupsProcedimiento.value = datosUsuario.value.cupsProcedimiento;
        tipoAbordajeQuirurgico.value = datosUsuario.value.tipoAbordajeQuirurgico;
    }
};

onMounted(cargarDatosUsuario);

</script>

<template>

    <v-container>
        <h1>Pauta publicitaria aqui</h1>
    </v-container>

    <v-container>
        <v-row>

            <v-col>
                <v-label class="mb-2 font-weight-medium">{{ $t('age') }}</v-label>
                <v-text-field v-model="edad" :rules="[ageRule]" variant="outlined" color="success"></v-text-field>
                <v-label class="mb-2 font-weight-medium">{{ $t('gender') }}</v-label>
                <v-select v-model="genero" :rules="[selectRule]" :items="genderTypes" variant="outlined"
                    placeholder="Select Gender" color="primary"></v-select>
                <v-label class="mb-2 font-weight-medium">{{ $t('medicalConditions') }}</v-label>
                <v-row>
                    <v-col>

                        <v-checkbox v-model="tabaco" :label="$t('tobacco')"
                            @change="handleTabacoChange(tabaco)"></v-checkbox>
                        <v-checkbox v-model="hipertension" :label="$t('highBloodPressure')"
                            @change="handleHipertensionChange(hipertension)"></v-checkbox>
                        <v-checkbox v-model="arritmia" :label="$t('cardiacArrhythmia')"
                            @change="handleArritmiaChange(arritmia)"></v-checkbox>
                        <v-checkbox v-model="erc" :label="$t('CKD')" @change="handleErcChange(erc)"></v-checkbox>


                    </v-col>
                    <v-col>
                        <v-checkbox v-model="fallaCardiaca" :label="$t('heartFailure')"
                            @change="handleFallaCardiacaChange(fallaCardiaca)"></v-checkbox>
                        <v-checkbox v-model="diabetes" :label="$t('diabetes')"
                            @change="handleDiabetesChange(diabetes)"></v-checkbox>
                        <v-checkbox v-model="epoc" :label="$t('COPD')" @change="handleEpocChange(epoc)"></v-checkbox>
                        <v-checkbox v-model="inestabilidadHemodinamica" :label="$t('hemodynamicInstability')"
                            @change="handleInestabilidadHemodinamicaChange(inestabilidadHemodinamica)"></v-checkbox>

                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-label class="mb-2 font-weight-medium">{{ $t('weightKg') }}</v-label>
                        <v-text-field v-model="peso" :rules="[pesoRule]" variant="outlined"
                            color="success"></v-text-field>
                        <v-label class="mb-2 font-weight-medium">{{ $t('heightCm') }}</v-label>
                        <v-text-field v-model="talla" :rules="[tallaRule]" variant="outlined"
                            color="success"></v-text-field>
                    </v-col>
                </v-row>
            </v-col>

            <v-col>
                <v-label class="mb-2 font-weight-medium">{{ $t('BMI') }}</v-label>
                <v-text-field v-model="imc" variant="outlined" color="success" readonly></v-text-field>


                <v-label class="mb-2 font-weight-medium">{{ $t('interventionTime') }}</v-label>
                <v-select v-model="momentoIntervencion" :rules="[selectRule]" :items="interventionItems"
                    placeholder="Select Intervention Time"></v-select>


                <v-label class="mb-2 font-weight-medium">{{ $t('surgeryCategory') }} </v-label>
                <v-select v-model="categoriaCirugia" :rules="[selectRule]" :items="categoryItems"
                    color="primary"></v-select>


                <v-label class="mb-2 font-weight-medium">{{ $t('CUPSProcedure') }}</v-label>
                <v-text-field v-model="cupsProcedimiento" :rules="[textFRequired]" label=""></v-text-field>

                <v-label class="mb-2 font-weight-medium">{{ $t('surgicalApproach') }}</v-label>
                <v-select v-model="tipoAbordajeQuirurgico" :rules="[selectRule]" :items="typeOfSurgeryItems"></v-select>

                <v-label class="mb-2 font-weight-medium">{{ $t('healthSystemAffiliation') }}</v-label>
                <v-text-field v-model="afiliacionSalud" :rules="[textFRequired]" riant="outlined"></v-text-field>

                <v-label class="mb-2 font-weight-medium">{{ $t('ASAScore') }}</v-label>
                <v-text-field v-model="asaScore" :rules="[textFRequired]" variant="outlined"></v-text-field>

                <v-label class="mb-2 font-weight-medium">{{ $t('procedureComplexity') }}</v-label>
                <v-text-field v-model="complejidadProcedimiento" :rules="[textFRequired]"
                    variant="outlined"></v-text-field>

            </v-col>
        </v-row>
        <v-row class="mt-4 d-flex align-center justify-center">
            <v-btn color="primary" @click="continuar">{{ $t('continue') }}</v-btn>
        </v-row>
    </v-container>


</template>

<style scoped></style>