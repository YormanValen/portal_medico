<script setup lang="ts">
import { ref, watch, computed, onMounted, } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useCalculatorsStore } from '../../../stores/calculatorStore';

const calculatorStore = useCalculatorsStore();


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
const dislipidemia = ref(false);
const diabetes = ref(false);
const epoc = ref(false);

const afiliacionSalud = ref('');
const asaScore = ref('');
const complejidadProcedimiento = ref('');
const erc = ref(false); // Enfermedad Renal Crónica
const momentoIntervencion = ref(''); // Puede ser un select con opciones predefinidas
const inestabilidadHemodinamica = ref(false);
const categoriaCirugia = ref(''); // Puede ser un select con opciones predefinidas
const cupsProcedimiento = ref('');
const tipoAbordajeQuirurgico = ref(''); // Puede ser un select con opciones predefinidas

let tabacoState = 0;
let hipertensionState = 0;
let arritmiaState = 0;
let fallaCardiacaState = 0;
let dislipidemiaState = 0;
let diabetesState = 0;
let epocState = 0;
let ercState = 0;
let inestabilidadHemodinamicaState = 0;
let momentoIntervencionState = 0;


// Funciones para manejar los cambios en las casillas de verificación
const handleTabacoChange = (value: any) => {
    tabacoState = value ? 1 : 0;
};

const handleHipertensionChange = (value: any) => {
    hipertensionState = value ? 1 : 0;
};

const handleArritmiaChange = (value: any) => {
    arritmiaState = value ? 1 : 0;
};

const handleFallaCardiacaChange = (value: any) => {
    fallaCardiacaState = value ? 1 : 0;
};

const handleDislipidemiaChange = (value: any) => {
    dislipidemiaState = value ? 1 : 0;
};

const handleDiabetesChange = (value: any) => {
    diabetesState = value ? 1 : 0;
};

const handleEpocChange = (value: any) => {
    epocState = value ? 1 : 0;
};

const handleErcChange = (value: any) => {
    ercState = value ? 1 : 0;
};

const handleInestabilidadHemodinamicaChange = (value: any) => {
    inestabilidadHemodinamicaState = value ? 1 : 0;
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

watch(momentoIntervencion, (newValue) => {
    // Esto directamente causa un cambio de estado que podría estar relacionado con el error.
    momentoIntervencionState = newValue === 'Si' ? 1 : 0;
});





const validarCampos = () => {
    if (edad.value && genero.value && peso.value && talla.value && afiliacionSalud.value && asaScore.value && complejidadProcedimiento.value) {
        return true;
    } else {
        return false;
    }
};

const tiposAsaScore = computed(() => [
    'I ', 'II', 'III', 'IV', 'V', 'VI', 'E'
]);

const tiposComplejidadProcedimiento = computed(() => [
    'Bajo',
    'Medio',
    'Alto'
]);

const tiposAfiliacionSalud = computed(() => [
    t('contributory'),
    t('subsidized'),
    t('special'),
    t('prepaid'),
    t('particular'),
    t('seguroInternacional'),
    t('SOAT'),
    t('none')
]);



const interventionItems = computed(() => [
    t('Si'),
    t('No')
]);

const categoryItems = ref([
    'Ortopédico',
    'Ginecológico Obstétrico',
    'Seno',
    'Gastrointestinal',
    'Coloproctología',
    'Hepatobiliar',
    'Urología y Renal',
    'Vascular',
    'Cirugía Cardíaca',
    'Cirugía Torácica',
    'Cabeza y Cuello',
    'Plástica',
    'Trasplante',
    'Neurocirugía',
    'Otorrinolaringologia',
    'Oftalmología',
    'Pared Abdominal',
    'Tejido blando',
    'Otra'
]);

const cupsOptions = ref([
    '01 PROCEDIMIENTOS EN CRANEO, CEREBRO Y MENINGES CEREBRALES',
    '010 INCISION DE CRANEO (PUNCIONES EN CRANEO)',
    '0101 PUNCIONES EN CISTERNA',
    '010101 PUNCION CISTERNAL, VIA LATERAL',
    '010102 PUNCION CISTERNAL, VIA MEDIAL',
    '010103 PUNCION CISTERNAL',
    '0102 PUNCIONES (ASPIRACION DE LIQUIDO) EN VENTRICULOS',
    '010201 PUNCION (ASPIRACION DE LIQUIDO) VENTRICULAR A TRAVES DE CATETER PREVIAMENTE IMPLANTADO',
    '010202 PUNCION (ASPIRACION DE LIQUIDO) VENTRICULAR POR TREPANACION (SIN CATETER)',
    '010203 PUNCION (ASPIRACION DE LIQUIDO) VENTRICULAR A TRAVES DE UN RESERVORIO',
    '010204 PUNCION (ASPIRACION DE LIQUIDO) VENTRICULAR, VIA TRANSFONTANELAR',
    '010205 PUNCION (ASPIRACION DE LIQUIDO) VENTRICULAR',
    '0109 PUNCION CRANEAL',
    '010901 PUNCION SUBDURAL',
    '010902 OTRA PUNCION CRANEAL',
    '011 PROCEDIMIENTOS DIAGNOSTICOS EN CRANEO, CEREBRO Y MENINGES CEREBRALES',
    '0111 BIOPSIA EN CRANEO',
    '011101 BIOPSIA OSEA EN CRANEO POR CRANEOTOMIA',
    '011102 BIOPSIA OSEA EN CRANEO POR CRANIECTOMIA',
    '011103 BIOPSIA DE CRANEO', '011103 BIOPSIA DE CRANEO',
    '0112 BIOPSIAS DE MENINGE CEREBRAL',
    '011201 BIOPSIA DE MENINGE, POR CRANEOTOMIA',
    '011202 BIOPSIA DE MENINGE CEREBRAL',
    '0113 BIOPSIAS DE CEREBRO',
    '011301 BIOPSIA CERRADA (PERCUTANEA) (AGUJA) DE CEREBRO',
    '011302 BIOPSIA ABIERTA (CRANEOTOMIA) DE CEREBRO',
    '011303 BIOPSIA DE CEREBRO POR TREPANACION',
    '011306 BIOPSIA DE CEREBRO SUPERFICIAL POR ESTEREOTAXIA',
    '011307 BIOPSIA DE CEREBRO PROFUNDA POR ESTEREOTAXIA',
    '012 CRANEOTOMIA Y CRANIECTOMIA',
    '0121 INCISION O DRENAJE O DESFUNCIONALIZACION DE SENO FRONTAL',
    '012101 CRANEALIZACION DE SENO FRONTAL',
    '012102 INCISION Y DRENAJE DE SENO FRONTAL',
    '012103 DESFUNCIONALIZACION DE SENO FRONTAL',
    '0122 RETIRO, SUSTITUCION O REVISION DE NEUROESTIMULADOR O ELECTRODO INTRACRANEAL',
    'Otra'
]);


const typeOfSurgeryItems = computed(() => [
    'Abierto',
    'Video-asistido',
    'Endovascular',
    'Abierta/Video-asistida',
    'Abierta/Endovascular',
    'Asistida por robot',
    'Pericutáneo',
    'Intravaginal'
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

onMounted(async () => {
    cargarDatosUsuario();
    await calculatorStore.fetchCalculators(); // Llama a la acción del store
});

</script>

<template>

    <v-container>
        <h1>Pauta publicitaria aqui</h1>
    </v-container>

    <v-container>
        <v-row>

            <v-col>
                <div class="d-flex align-center">
                    <v-label class="mb-2 font-weight-medium">{{ $t('age') }}</v-label>
                    <v-tooltip location="top">
                        <template v-slot:activator="{ props }">
                            <v-icon class="icon ml-2" v-bind="props" color="grey-lighten-1">
                                mdi-help-circle-outline
                            </v-icon>
                        </template>
                        <span>¿Cuál es la edad del paciente en el momento de la intervención?
                        </span>
                    </v-tooltip>
                </div>
                <v-text-field v-model="edad" :rules="[ageRule]" variant="outlined" color="success"></v-text-field>


                <v-label class="mb-2 font-weight-medium">{{ $t('gender') }}</v-label>
                <v-select v-model="genero" :rules="[selectRule]" :items="genderTypes" variant="outlined"
                    placeholder="Select Gender" color="primary"></v-select>
                <v-label class="mb-2 font-weight-medium">{{ $t('medicalConditions') }}</v-label>
                <v-row>
                    <v-col>

                        <div class="d-flex align-center">
                            <v-checkbox class="checkbox" v-model="tabaco" :label="$t('tobacco')"
                                @change="handleTabacoChange"></v-checkbox>

                            <v-tooltip location="top">
                                <template v-slot:activator="{ props }">
                                    <v-icon class="icon ml-2" v-bind="props" color="grey-lighten-1">
                                        mdi-help-circle-outline
                                    </v-icon>
                                </template>
                                <span>¿Es consumidor de tabaco?
                                </span>
                            </v-tooltip>
                        </div>


                        <div class="d-flex align-center">
                            <v-checkbox class="checkbox" v-model="hipertension" :label="$t('highBloodPressure')"
                                @change="handleHipertensionChange(hipertension)"></v-checkbox>
                            <v-tooltip location="top">
                                <template v-slot:activator="{ props }">
                                    <v-icon class="icon ml-2" v-bind="props" color="grey-lighten-1">
                                        mdi-help-circle-outline
                                    </v-icon>
                                </template>
                                <span>¿Tiene el paciente hipertensión arterial?
                                </span>
                            </v-tooltip>

                        </div>

                        <div class="d-flex align-center">
                            <v-checkbox class="checkbox" v-model="arritmia" :label="$t('cardiacArrhythmia')"
                                @change="handleArritmiaChange(arritmia)"></v-checkbox>
                            <v-tooltip location="top">
                                <template v-slot:activator="{ props }">
                                    <v-icon class="icon ml-2" v-bind="props" color="grey-lighten-1">
                                        mdi-help-circle-outline
                                    </v-icon>
                                </template>
                                <span>¿Tiene el paciente hipertensión arterial?
                                </span>
                            </v-tooltip>
                        </div>

                        <div class="d-flex align-center">
                            <v-checkbox class="checkbox" v-model="erc" :label="$t('CKD')"
                                @change="handleErcChange(erc)"></v-checkbox>
                            <v-tooltip location="top">
                                <template v-slot:activator="{ props }">
                                    <v-icon class="icon ml-2" v-bind="props" color="grey-lighten-1">
                                        mdi-help-circle-outline
                                    </v-icon>
                                </template>
                                <span>¿Tiene el paciente enfermedad renal crónica?
                                </span>
                            </v-tooltip>
                        </div>




                    </v-col>
                    <v-col>
                        <div class="d-flex align-center">
                            <v-checkbox class="checkbox" v-model="fallaCardiaca" :label="$t('heartFailure')"
                                @change="handleFallaCardiacaChange(fallaCardiaca)"></v-checkbox>
                            <v-tooltip location="top">
                                <template v-slot:activator="{ props }">
                                    <v-icon class="icon ml-2" v-bind="props" color="grey-lighten-1">
                                        mdi-help-circle-outline
                                    </v-icon>
                                </template>
                                <span>¿Tiene el paciente falla cardiaca?
                                </span>
                            </v-tooltip>
                        </div>

                        <div class="d-flex align-center">
                            <v-checkbox class="checkbox" v-model="dislipidemia" :label="$t('dislipidemia')"
                                @change="handleDislipidemiaChange(dislipidemia)"></v-checkbox>
                            <v-tooltip location="top">
                                <template v-slot:activator="{ props }">
                                    <v-icon class="icon ml-2" v-bind="props" color="grey-lighten-1">
                                        mdi-help-circle-outline
                                    </v-icon>
                                </template>
                                <span>¿Tiene el paciente dislipidemia?
                                </span>
                            </v-tooltip>
                        </div>

                        <div class="d-flex align-center">
                            <v-checkbox class="checkbox" v-model="diabetes" :label="$t('diabetes')"
                                @change="handleDiabetesChange(diabetes)"></v-checkbox>
                            <v-tooltip location="top">
                                <template v-slot:activator="{ props }">
                                    <v-icon class="icon ml-2" v-bind="props" color="grey-lighten-1">
                                        mdi-help-circle-outline
                                    </v-icon>
                                </template>
                                <span>¿Tiene el paciente Diabetes Mellitus?
                                </span>
                            </v-tooltip>
                        </div>

                        <div class="d-flex align-center">
                            <v-checkbox class="checkbox" v-model="epoc" :label="$t('COPD')"
                                @change="handleEpocChange(epoc)"></v-checkbox>
                            <v-tooltip location="top">
                                <template v-slot:activator="{ props }">
                                    <v-icon class="icon ml-2" v-bind="props" color="grey-lighten-1">
                                        mdi-help-circle-outline
                                    </v-icon>
                                </template>
                                <span>¿Tiene el paciente Enfermedad Pulmonar Obstructiva Crónica (EPOC)?
                                </span>
                            </v-tooltip>
                        </div>

                        <div class="d-flex align-center">
                            <v-checkbox class="checkbox" v-model="inestabilidadHemodinamica"
                                :label="$t('hemodynamicInstability')"
                                @change="handleInestabilidadHemodinamicaChange(inestabilidadHemodinamica)"></v-checkbox>

                            <v-tooltip location="top">
                                <template v-slot:activator="{ props }">
                                    <v-icon class="icon ml-2" v-bind="props" color="grey-lighten-1">
                                        mdi-help-circle-outline
                                    </v-icon>
                                </template>
                                <span>¿El paciente presentó signos y síntomas asociados a inestabilidad hemodinámica
                                    pre-operatoria?
                                </span>
                            </v-tooltip>
                        </div>



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

                <div class="d-flex align-center">
                    <v-label class="mb-2 font-weight-medium">{{ $t('interventionTime') }}</v-label>
                    <v-tooltip location="top">
                        <template v-slot:activator="{ props }">
                            <v-icon class="icon ml-2" v-bind="props" color="grey-lighten-1">
                                mdi-help-circle-outline
                            </v-icon>
                        </template>
                        <span>¿Es un procedimiento electivo el que se va a realizar?
                        </span>
                    </v-tooltip>
                </div>
                <v-select v-model="momentoIntervencion" :rules="[selectRule]" :items="interventionItems"
                    placeholder="Select Intervention Time"></v-select>

                <div class="d-flex align-center">
                    <v-label class="mb-2 font-weight-medium">{{ $t('surgeryCategory') }} </v-label>
                    <v-tooltip location="top">
                        <template v-slot:activator="{ props }">
                            <v-icon class="icon ml-2" v-bind="props" color="grey-lighten-1">
                                mdi-help-circle-outline
                            </v-icon>
                        </template>
                        <span>¿Cómo clasifica la categoría de la cirugía?
                        </span>
                    </v-tooltip>
                </div>
                <v-select v-model="categoriaCirugia" :rules="[selectRule]" :items="categoryItems"
                    color="primary"></v-select>

                <div class="d-flex align-center">
                    <v-label class="mb-2 font-weight-medium">{{ $t('CUPSProcedure') }}</v-label>
                    <v-tooltip location="top">
                        <template v-slot:activator="{ props }">
                            <v-icon class="icon ml-2" v-bind="props" color="grey-lighten-1">
                                mdi-help-circle-outline
                            </v-icon>
                        </template>
                        <span>¿Cómo se clasifica la cirugía según CUPS?
                        </span>
                    </v-tooltip>
                </div>
                <v-select v-model="cupsProcedimiento" :items="cupsOptions" :rules="[selectRule]" required></v-select>


                <div class="d-flex align-center">
                    <v-label class="mb-2 font-weight-medium">{{ $t('surgicalApproach') }}</v-label>
                    <v-tooltip location="top">
                        <template v-slot:activator="{ props }">
                            <v-icon class="icon ml-2" v-bind="props" color="grey-lighten-1">
                                mdi-help-circle-outline
                            </v-icon>
                        </template>
                        <span>¿Cuál fue el tipo de abordaje quirúrgico al iniciar la cirugía?
                        </span>
                    </v-tooltip>
                </div>
                <v-select v-model="tipoAbordajeQuirurgico" :rules="[selectRule]" :items="typeOfSurgeryItems"></v-select>

                <div class="d-flex align-center">
                    <v-label class="mb-2 font-weight-medium">{{ $t('healthSystemAffiliation') }}</v-label>
                    <v-tooltip location="top">
                        <template v-slot:activator="{ props }">
                            <v-icon class="icon ml-2" v-bind="props" color="grey-lighten-1">
                                mdi-help-circle-outline
                            </v-icon>
                        </template>
                        <span>¿Cuál es el tipo de afiliación del paciente en el Sistema de Salud colombiano?
                        </span>
                    </v-tooltip>
                </div>
                <v-select v-model="afiliacionSalud" :rules="[selectRule]" :items="tiposAfiliacionSalud"></v-select>

                <div class="d-flex align-center">
                    <v-label class="mb-2 font-weight-medium">{{ $t('ASAScore') }}</v-label>
                    <v-tooltip location="top">
                        <template v-slot:activator="{ props }">
                            <v-icon class="icon ml-2" v-bind="props" color="grey-lighten-1">
                                mdi-help-circle-outline
                            </v-icon>
                        </template>
                        <span>¿Cómo se clasifica el paciente según el ASA score?
                        </span>
                    </v-tooltip>
                </div>
                <v-select v-model="asaScore" :rules="[selectRule]" :items="tiposAsaScore"></v-select>

                <div class="d-flex align-center">
                    <v-label class="mb-2 font-weight-medium">{{ $t('procedureComplexity') }}</v-label>
                    <v-tooltip location="top">
                        <template v-slot:activator="{ props }">
                            <v-icon class="icon ml-2" v-bind="props" color="grey-lighten-1">
                                mdi-help-circle-outline
                            </v-icon>
                        </template>
                        <span>¿Cómo se clasifica el paciente según el ASA score?
                        </span>
                    </v-tooltip>
                </div>
                <v-select v-model="complejidadProcedimiento" :rules="[selectRule]"
                    :items="tiposComplejidadProcedimiento"></v-select>


            </v-col>
        </v-row>
        <v-row class="mt-4 d-flex align-center justify-center">
            <v-btn color="primary" @click="continuar">{{ $t('continue') }}</v-btn>
        </v-row>
    </v-container>


</template>

<style scoped>
.icon {
    font-size: 20px;
}

.icono_info {
    cursor: pointer;
}

.icono_info:hover {
    color: #3f51b5;
}

.v-label {
    margin-bottom: 0 !important;
}


.checkbox {
    display: flex !important;
}
</style>