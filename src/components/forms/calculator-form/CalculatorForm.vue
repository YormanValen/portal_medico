snackbar: false,
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';



const router = useRouter();

const datosUsuario = ref({}); // Inicializar como objeto vacío


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
    if (!v) return 'Edad es requerido';
    if (Number(v) < 18 || Number(v) > 100) return ' Edad debe ser entre 18 y 100 años';
    if (isNaN(Number(v))) return 'Edad debe ser un numero';
    return true;
};

const selectRule = (v: string) => {
    if (!v) return 'Este campo es requerido';
    return true;
};

const pesoRule = (v: string) => {
    if (!v) return 'Este campo es requerido';
    if (isNaN(Number(v))) return 'Este campo debe ser un numero';
    if (Number(v) < 40 || Number(v) > 400) return 'El peso debe estar entre 40 y 400';
    return true;
};

const tallaRule = (v: string) => {
    if (!v) return 'Este campo es requerido';
    if (isNaN(Number(v))) return 'Este campo debe ser un numero';
    if (Number(v) < 100 || Number(v) > 250) return 'La talla debe estar entre 100 y 250';
    return true;
};

const inputNumberRule = (v: string) => {
    if (!v) return ' Este campo es requerido';
    if (isNaN(Number(v))) return ' Este campo debe ser un numero';
    return true;
};

const textFRequired = (v: string) => {
    if (!v) return 'Este campo es requerido';
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
        // ... el resto de tus campos
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
                <v-label class="mb-2 font-weight-medium">Edad</v-label>
                <v-text-field v-model="edad" :rules="[ageRule]" variant="outlined" placeholder=" Ingrese su edad"
                    color="success"></v-text-field>
                <v-label class="mb-2 font-weight-medium">Genero</v-label>
                <v-select v-model="genero" :rules="[selectRule]" :items="['Male', 'Female', 'Other']" variant="outlined"
                    placeholder="Select Gender" color="primary"></v-select>
                <v-label class="mb-2 font-weight-medium">Condiciones médicas:</v-label>
                <v-row>
                    <v-col>

                        <v-checkbox v-model="tabaco" label="Tabaco" @change="handleTabacoChange(tabaco)"></v-checkbox>
                        <v-checkbox v-model="hipertension" label="Hipertensión Arterial"
                            @change="handleHipertensionChange(hipertension)"></v-checkbox>
                        <v-checkbox v-model="arritmia" label="Arritmia Cardiaca"
                            @change="handleArritmiaChange(arritmia)"></v-checkbox>
                    </v-col>
                    <v-col>
                        <v-checkbox v-model="fallaCardiaca" label="Falla Cardiaca"
                            @change="handleFallaCardiacaChange(fallaCardiaca)"></v-checkbox>
                        <v-checkbox v-model="diabetes" label="Diabetes"
                            @change="handleDiabetesChange(diabetes)"></v-checkbox>
                        <v-checkbox v-model="epoc" label="EPOC" @change="handleEpocChange(epoc)"></v-checkbox>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-label class="mb-2 font-weight-medium">Peso (en Kg)</v-label>
                        <v-text-field v-model="peso" :rules="[pesoRule]" variant="outlined"
                            placeholder="Ingrese su peso" color="success"></v-text-field>
                        <v-label class="mb-2 font-weight-medium">Talla (en cm)</v-label>
                        <v-text-field v-model="talla" :rules="[tallaRule]" variant="outlined"
                            placeholder="Ingrese su talla" color="success"></v-text-field>
                        <v-label class="mb-2 font-weight-medium">Indice de masa corporal (IMC)</v-label>
                        <v-text-field v-model="imc" variant="outlined" placeholder="IMC" color="success"
                            readonly></v-text-field>
                    </v-col>
                </v-row>
            </v-col>

            <v-col>


                <v-label class="mb-2 font-weight-medium">Momento de la intervención</v-label>
                <v-select v-model="momentoIntervencion" :rules="[selectRule]"
                    :items="['Preoperatorio', 'Intraoperatorio', 'Postoperatorio']"></v-select>

                <v-label class="mb-2 font-weight-medium">ERC (Enfermedad renal crónica)</v-label>
                <v-checkbox v-model="erc" label="" @change="handleErcChange(erc)"></v-checkbox>

                <v-label class="mb-2 font-weight-medium">Inestabilidad hemodinámica</v-label>
                <v-checkbox v-model="inestabilidadHemodinamica"
                    @change="handleInestabilidadHemodinamicaChange(inestabilidadHemodinamica)"></v-checkbox>

                <v-label class="mb-2 font-weight-medium">Categoría de la cirugía </v-label>
                <v-select v-model="categoriaCirugia" :rules="[selectRule]" :items="['Menor', 'Mayor']"
                    color="primary"></v-select>


                <v-label class="mb-2 font-weight-medium">CUPS del procedimiento</v-label>
                <v-text-field v-model="cupsProcedimiento" placeholder="ingrese CUPS del procedimiento"
                    :rules="[textFRequired]" label=""></v-text-field>

                <v-label class="mb-2 font-weight-medium">Tipo de abordaje quirúrgico</v-label>
                <v-select v-model="tipoAbordajeQuirurgico" :rules="[selectRule]"
                    :items="['Abierto', 'Mínimamente invasivo']"></v-select>

                <v-label class="mb-2 font-weight-medium">Afiliación al sistema de salud</v-label>
                <v-text-field v-model="afiliacionSalud" :rules="[textFRequired]" riant="outlined"
                    placeholder="Afiliación al sistema de salud"></v-text-field>

                <v-label class="mb-2 font-weight-medium">ASA Score</v-label>
                <v-text-field v-model="asaScore" :rules="[textFRequired]" variant="outlined"
                    placeholder="ingrese ASA Score"></v-text-field>

                <v-label class="mb-2 font-weight-medium">Complejidad del procedimiento</v-label>
                <v-text-field v-model="complejidadProcedimiento" :rules="[textFRequired]" variant="outlined"
                    placeholder="Complejidad del procedimiento"></v-text-field>

            </v-col>
        </v-row>
        <v-row class="mt-4 d-flex align-center justify-center">
            <v-btn color="primary" @click="continuar">Continuar</v-btn>
        </v-row>
    </v-container>


</template>

<style scoped></style>