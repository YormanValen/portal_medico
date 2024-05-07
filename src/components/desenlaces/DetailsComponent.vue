<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useCalculatorsStore } from '../../stores/calculatorStore';
import { useI18n } from 'vue-i18n';
import TextInput from "../forms/form-validation/TextInput.vue";
import { defineProps } from 'vue';
import * as Yup from "yup";
import { Form } from "vee-validate";
import { useDesenlaceStore } from '@/stores/desenlaceStore';


const { t } = useI18n();

const calculatorStore = useCalculatorsStore();
const userDetail = calculatorStore.obtenerDatosUsuario();
const desenlaceStore = useDesenlaceStore();


const userStore = useAuthStore();

const props = defineProps({
  id: Number
});



const tipoAnestesia = ref('');
const role = ref('');
const necesidaduci = ref(false);
const aspiracion = ref(false);
const compintuba = ref(null);
const iso = ref(null);
const ivu = ref(false);
const neumonia = ref(false);
const sepsis = ref(false);
const causaSepsis = ref(null);
const ecv = ref(false);
const arritmiascardicas = ref(false);
const iam = ref(false);
const parocardpostope = ref(false);
const ira = ref(null);
const dialisis = ref(false);
const sdra = ref(false);
const embolismopulmonar = ref(false);
const hemorragia = ref(false);
const ileopop = ref(false);
const dehiscenciaanastomosis = ref(false);
const fistula = ref(false);
const reintervencintrahosp = ref(false);
const mortintrahosp = ref(false);
const fistula_orig = ref(null);
const fistula_fin = ref(null);
const claviendindo = ref(null);
const completado = ref(false);


let necesidaduciState = 0;
let aspiracionState = 0;
let ivuState = 0;
let neumoniaState = 0;
let sepsisState = 0;
let ecvState = 0;
let arritmiascardicasState = 0;
let iamState = 0;
let parocardpostopeState = 0;
let dialisisState = 0;
let sdraState = 0;
let embolismopulmonarState = 0;
let hemorragiaState = 0;
let ileopopState = 0;
let dehiscenciaanastomosisState = 0;
let fistulaState = 0;
let reintervencintrahospState = 0;
let mortintrahospState = 0;


//metodos para manejar los checkbox
const handleNecenecesidaduci = (value: any) => {
  necesidaduciState = value ? 1 : 0;
};

const handleaspiracion = (value: any) => {
  aspiracionState = value ? 1 : 0;
};

const handleIvu = (value: any) => {
  ivuState = value ? 1 : 0;
};

const handleNeumonia = (value: any) => {
  neumoniaState = value ? 1 : 0;
};

const handleSepsis = (value: any) => {
  sepsisState = value ? 1 : 0;
};

const handleEcv = (value: any) => {
  ecvState = value ? 1 : 0;
};

const handleArritmiascardicas = (value: any) => {
  arritmiascardicasState = value ? 1 : 0;
};

const handleIam = (value: any) => {
  iamState = value ? 1 : 0;
};

const handleParocardpostope = (value: any) => {
  parocardpostopeState = value ? 1 : 0;
};

const handledialisis = (value: any) => {
  dialisisState = value ? 1 : 0;
};

const handlesdra = (value: any) => {
  sdraState = value ? 1 : 0;
};

const handleEmbolismopulmonar = (value: any) => {
  embolismopulmonarState = value ? 1 : 0;
};

const handleHemorragia = (value: any) => {
  hemorragiaState = value ? 1 : 0;
};

const handleIleopop = (value: any) => {
  ileopopState = value ? 1 : 0;
};

const handleDehiscenciaanastomosis = (value: any) => {
  dehiscenciaanastomosisState = value ? 1 : 0;
};

const handleFistula = (value: any) => {
  fistulaState = value ? 1 : 0;
};

const handleReintervencintrahosp = (value: any) => {
  reintervencintrahospState = value ? 1 : 0;
};

const handleMortintrahosp = (value: any) => {
  mortintrahospState = value ? 1 : 0;
};

const completarDesenlace = async () => {
  completado.value = completado.value; // Esto cambiará el valor entre true y false
  const desenlaceEncontrado = await desenlaceStore.getDesenlaceById(props.id); // Llama a la acción del store
  console.log('desenlace encontrado', desenlaceEncontrado)
  if (desenlaceEncontrado.Completado === false) {
    desenlaceEncontrado.Completado = completado.value;
    console.log('desenlace final', desenlaceEncontrado)
    await desenlaceStore.updateDesenlace(desenlaceEncontrado); // Llama a la acción del store
  }

};


//metodos para los tipos de seleccionables
const tiposAnestesia = computed(() => [
  t('male'),
  t('female'),
  t('other')
]
);

const tiposCausasSepsis = computed(() => [
  { text: t('Neurológico'), value: 1 },
  { text: t('Neurológico'), value: 2 },
  { text: t('Pulmonar'), value: 3 },
  { text: t('Biliar'), value: 4 },
  { text: t('Urinario o renal'), value: 5 },
  { text: t('Gastrointestinal '), value: 6 },
  { text: t('Tejidos blandos'), value: 7 },
  { text: t('Osteomuscular'), value: 8 },
  { text: t('other'), value: 9 },
]);


const tiposComplicacion = computed(() => [
  { text: t('selecCompIntuba'), value: null },
  { text: t('llamaAnestesiologo'), value: 1 },
  { text: t('dispositivoSupraglotico'), value: 2 },
  { text: t('aereaQuirurgica'), value: 3 },
  { text: t('No'), value: 4 },
]);

const tiposIso = computed(() => [
  { text: t('selecInfeccion'), value: null },
  { text: t('Superficial'), value: 1 },
  { text: t('Profunda'), value: 2 },
  { text: t('Órgano-Espacio'), value: 3 },
  { text: t('No'), value: 4 },
]);


const tiposRoles = computed(() => [
  t('cirujanoPrincipal'),
  t('ayudante'),
]
);

const tiposIra = computed(() => [
  { text: t('selecIRA'), value: null },
  { text: 'KDIGO I', value: 1 },
  { text: 'KDIGO II', value: 2 },
  { text: 'KDIGO III', value: 3 },
  { text: t('No'), value: 4 },
]);

const tiposfistula_orig = computed(() => [

  { text: t('Arteriovenosa'), value: 1 },
  { text: t('Biliar'), value: 2 },
  { text: t('Gástrica'), value: 3 },
  { text: t('Intestinal'), value: 4 },
  { text: t('Anal'), value: 5 },
  { text: t('Colónica'), value: 6 },
  { text: t('other'), value: 6 },

]);


const tiposfistula_fin = computed(() => [
  { text: t('Arteriovenosa'), value: 1 },
  { text: t('Biliar'), value: 2 },
  { text: t('Gástrica'), value: 3 },
  { text: t('Intestinal'), value: 4 },
  { text: t('Anal'), value: 5 },
  { text: t('Colónica'), value: 6 },
  { text: t('PielAtmosférica'), value: 7 },
  { text: t('other'), value: 8 }

]);

const tiposClaviendindo = computed(() => [
  { text: t('selecClaviendindo'), value: null },
  { text: t('Grado1'), value: 1 },
  { text: t('Grado2'), value: 2 },
  { text: t('Grado3'), value: 3 },
  { text: t('Grado4'), value: 4 },
  { text: t('Grado5'), value: 5 },
  { text: t('Noaplica'), value: 6 }

]);

// Propiedad computada que filtra las opciones de claviendindo
const opcionesClaviendindo = computed(() => {
  if (mortintrahosp.value) {
    // Si el checkbox está activo, devuelve solo el Grado 5
    return tiposClaviendindo.value.filter(opcion => opcion.value === 5);
  } else {
    // Si el checkbox está inactivo, devuelve todas las opciones
    return tiposClaviendindo.value;
  }
});




onMounted(async () => {
});

</script>

<template>
  <div class="detalles_desenlace d-flex flex-column gap-3 ">
    <div class="d-flex flex-column gap-3 pt-5 pl-8">
      <h2>{{ $t('detallesPaciente') }} {{ props.id }}</h2>
      <p><strong> {{ $t('age') }}:</strong> {{ userDetail.edad }}</p>
      <p><strong> {{ $t('gender') }}:</strong> {{ userDetail.genero }}</p>
      <p><strong> {{ $t('tobacco') }}:</strong> {{ userDetail.tabaco ? 'Sí' : 'No' }}</p>
      <p><strong> {{ $t('highBloodPressure') }}:</strong> {{ userDetail.hipertension ? 'Sí' : 'No' }}</p>
      <p><strong> {{ $t('cardiacArrhythmia') }}:</strong> {{ userDetail.arritmia ? 'Sí' : 'No' }}</p>
      <p><strong> {{ $t('CKD') }}:</strong> {{ userDetail.erc ? 'Sí' : 'No' }}</p>
      <p><strong> {{ $t('heartFailure') }}:</strong> {{ userDetail.fallaCardiaca ? 'Sí' : 'No' }}</p>
      <p><strong> {{ $t('diabetes') }}:</strong> {{ userDetail.diabetes ? 'Sí' : 'No' }}</p>
      <p><strong> {{ $t('COPD') }}:</strong> {{ userDetail.epoc ? 'Sí' : 'No' }}</p>
      <p><strong> {{ $t('hemodynamicInstability') }}:</strong> {{ userDetail.inestabilidadHemodinamica ? 'Sí' : 'No' }}
      </p>
      <p><strong> {{ $t('weightKg') }}:</strong> {{ userDetail.peso }}</p>
      <p><strong> {{ $t('heightCm') }}:</strong> {{ userDetail.talla }}</p>
      <p><strong> {{ $t('BMI') }}:</strong> {{ userDetail.imc }}</p>
      <p><strong> {{ $t('interventionTime') }}:</strong> {{ userDetail.momentoIntervencion }}</p>
      <p><strong> {{ $t('surgeryCategory') }}:</strong> {{ userDetail.categoriaCirugia }}</p>
      <p><strong> {{ $t('CUPSProcedure') }}:</strong> {{ userDetail.cupsProcedimiento }}</p>
      <p><strong> {{ $t('surgicalApproach') }}:</strong> {{ userDetail.tipoAbordajeQuirurgico }}</p>
      <p><strong> {{ $t('healthSystemAffiliation') }}:</strong> {{ userDetail.afiliacionSalud }}</p>
      <p><strong> {{ $t('ASAScore') }}:</strong> {{ userDetail.asaScore }}</p>
      <p><strong> {{ $t('procedureComplexity') }}:</strong> {{ userDetail.complejidadProcedimiento }}</p>
    </div>


    <div>
      <div class="datos_procedimiento d-flex flex-column gap-3 pt-5 pl-8">
        <h2>{{ $t('datosProcedimiento') }}</h2>
        <v-row>
          <v-col>
            <v-label class="mb-2 font-weight-medium">{{ $t('ubicacion') }}</v-label>
            <TextInput name="ubicacion" type="text" />
          </v-col>
          <v-col>
            <v-label class="mb-2 font-weight-medium">{{ $t('tiempoProcedimiento') }}</v-label>
            <TextInput name="ubicacion" type="text" :placeholder="$t('cuantoTiempoProcedimiento')" />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-label class="mb-2 font-weight-medium">{{ $t('tipoAnestesia') }}</v-label>
            <v-select v-model="tipoAnestesia" :items="tiposAnestesia" variant="outlined"
              :placeholder="$t('SelecTipoAnestesia')" color="primary"></v-select>
          </v-col>
          <v-col>
            <v-label class="mb-2 font-weight-medium">{{ $t('rol') }}</v-label>
            <v-select v-model="role" :placeholder="$t('selectRol')" :items="tiposRoles" variant="outlined"
              color="primary"></v-select>
          </v-col>
        </v-row>
      </div>

    </div>
    <div class="datos_procedimiento d-flex flex-column gap-3 pt-5 pl-8">
      <h2>{{ $t('datosDesenlace') }}</h2>
      <v-row>
        <v-col>
          <p>{{ $t('aNivelIntrahospitalario') }}</p>
        </v-col>
      </v-row>
      <v-row class="d-flex ">
        <v-col col="4">
          <div class="d-flex align-center">
            <v-checkbox class="checkbox  " v-model="necesidaduci
              " :label="$t('pacienteNecesidaduci')" @change="handleNecenecesidaduci(necesidaduci)"></v-checkbox>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-icon class="icon ml-2" v-bind="props" color="grey-lighten-1">
                  mdi-help-circle-outline
                </v-icon>
              </template>
              <span>{{ $t('necesidaduci') }}
              </span>
            </v-tooltip>
          </div>
        </v-col>
        <v-col col="4">
          <div class="d-flex align-center">
            <v-checkbox class="checkbox  " v-model="aspiracion
              " :label="$t('broncoAspiracionCg')" @change="handleaspiracion(aspiracion)"></v-checkbox>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-icon class="icon ml-2" v-bind="props" color="grey-lighten-1">
                  mdi-help-circle-outline
                </v-icon>
              </template>
              <span>{{ $t('aspiracion') }}
              </span>
            </v-tooltip>
          </div>
        </v-col>
        <v-col col="4">
          <div class="d-flex align-center">
            <v-checkbox class="checkbox  " v-model="ivu
              " :label="$t('infeccionViasUrinarias')" @change="handleIvu(ivu)"></v-checkbox>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-icon class="icon ml-2" v-bind="props" color="grey-lighten-1">
                  mdi-help-circle-outline
                </v-icon>
              </template>
              <span>{{ $t('ivu') }}
              </span>
            </v-tooltip>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col col="4">
          <div class="d-flex align-center">
            <v-checkbox class="checkbox  " v-model="neumonia
              " :label="$t('neumonia')" @change="handleNeumonia(neumonia)"></v-checkbox>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-icon class="icon ml-2" v-bind="props" color="grey-lighten-1">
                  mdi-help-circle-outline
                </v-icon>
              </template>
              <span>{{ $t('neumoniaMsg') }}
              </span>
            </v-tooltip>
          </div>
        </v-col>

        <v-col col="4">
          <div class="d-flex align-center">
            <v-checkbox class="checkbox  " v-model="sepsis
              " :label="$t('sepsis')" @change="handleSepsis(neumonia)"></v-checkbox>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-icon class="icon ml-2" v-bind="props" color="grey-lighten-1">
                  mdi-help-circle-outline
                </v-icon>
              </template>
              <span>{{ $t('sepsisMsg') }}
              </span>
            </v-tooltip>
          </div>

          <div v-if="sepsis" class="d-flex flex-column ">
            <v-label class="mb-2 font-weight-medium">{{ $t('causaSepsis') }}</v-label>
            <v-select v-model="causaSepsis" :items="tiposCausasSepsis" item-title="text" item-value="value"
              variant="outlined" color="primary"></v-select>
          </div>
        </v-col>

        <v-col col="4">
          <div class="d-flex align-center">
            <v-checkbox class="checkbox  " v-model="ecv
              " :label="$t('ecv')" @change="handleEcv(ecv)"></v-checkbox>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-icon class="icon ml-2" v-bind="props" color="grey-lighten-1">
                  mdi-help-circle-outline
                </v-icon>
              </template>
              <span>{{ $t('ecvMsg') }}
              </span>
            </v-tooltip>
          </div>
        </v-col>

      </v-row>

      <v-row>

        <v-col col="4">
          <div class="d-flex align-center">
            <v-checkbox class="checkbox  " v-model="arritmiascardicas
              " :label="$t('arritmiascardicas')" @change="handleArritmiascardicas(arritmiascardicas)"></v-checkbox>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-icon class="icon ml-2" v-bind="props" color="grey-lighten-1">
                  mdi-help-circle-outline
                </v-icon>
              </template>
              <span>{{ $t('arritmiascardicasMsg') }}
              </span>
            </v-tooltip>
          </div>
        </v-col>

        <v-col col="4">
          <div class="d-flex align-center">
            <v-checkbox class="checkbox  " v-model="iam
              " :label="$t('iam')" @change="handleIam(iam)"></v-checkbox>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-icon class="icon ml-2" v-bind="props" color="grey-lighten-1">
                  mdi-help-circle-outline
                </v-icon>
              </template>
              <span>{{ $t('iamMsg') }}
              </span>
            </v-tooltip>
          </div>
        </v-col>

        <v-col col="4">
          <div class="d-flex align-center">
            <v-checkbox class="checkbox  " v-model="parocardpostope
              " :label="$t('parocardpostope')" @change="handleParocardpostope(parocardpostope)"></v-checkbox>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-icon class="icon ml-2" v-bind="props" color="grey-lighten-1">
                  mdi-help-circle-outline
                </v-icon>
              </template>
              <span>{{ $t('parocardpostopeMsg') }}
              </span>
            </v-tooltip>
          </div>
        </v-col>
      </v-row>

      <v-row>

        <v-col col="4">
          <div class="d-flex align-center">
            <v-checkbox class="checkbox  " v-model="dialisis
              " :label="$t('dialisis')" @change="handledialisis(dialisis)"></v-checkbox>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-icon class="icon ml-2" v-bind="props" color="grey-lighten-1">
                  mdi-help-circle-outline
                </v-icon>
              </template>
              <span>{{ $t('dialisisMsg') }}
              </span>
            </v-tooltip>
          </div>
        </v-col>

        <v-col col="4">
          <div class="d-flex align-center">
            <v-checkbox class="checkbox  " v-model="sdra
              " :label="$t('sdra')" @change="handlesdra(sdra)"></v-checkbox>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-icon class="icon ml-2" v-bind="props" color="grey-lighten-1">
                  mdi-help-circle-outline
                </v-icon>
              </template>
              <span>{{ $t('sdraMsg') }}
              </span>
            </v-tooltip>
          </div>
        </v-col>

        <v-col col="4">
          <div class="d-flex align-center">
            <v-checkbox class="checkbox  " v-model="embolismopulmonar
              " :label="$t('embolismopulmonar')" @change="handleEmbolismopulmonar(embolismopulmonar)"></v-checkbox>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-icon class="icon ml-2" v-bind="props" color="grey-lighten-1">
                  mdi-help-circle-outline
                </v-icon>
              </template>
              <span>{{ $t('embolismopulmonarMsg') }}
              </span>
            </v-tooltip>
          </div>
        </v-col>

      </v-row>

      <v-row>

        <v-col col="4">
          <div class="d-flex align-center">
            <v-checkbox class="checkbox  " v-model="hemorragia
              " :label="$t('hemorragia')" @change="handleHemorragia(hemorragia)"></v-checkbox>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-icon class="icon ml-2" v-bind="props" color="grey-lighten-1">
                  mdi-help-circle-outline
                </v-icon>
              </template>
              <span>{{ $t('hemorragiaMsg') }}
              </span>
            </v-tooltip>
          </div>
        </v-col>

        <v-col col="4">
          <div class="d-flex align-center">
            <v-checkbox class="checkbox  " v-model="ileopop
              " :label="$t('ileopop')" @change="handleIleopop(ileopop)"></v-checkbox>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-icon class="icon ml-2" v-bind="props" color="grey-lighten-1">
                  mdi-help-circle-outline
                </v-icon>
              </template>
              <span>{{ $t('ileopopMsg') }}
              </span>
            </v-tooltip>
          </div>
        </v-col>

        <v-col col="4">
          <div class="d-flex align-center">
            <v-checkbox class="checkbox  " v-model="dehiscenciaanastomosis
              " :label="$t('dehiscenciaanastomosis')"
              @change="handleDehiscenciaanastomosis(dehiscenciaanastomosis)"></v-checkbox>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-icon class="icon ml-2" v-bind="props" color="grey-lighten-1">
                  mdi-help-circle-outline
                </v-icon>
              </template>
              <span>{{ $t('dehiscenciaanastomosisMsg') }}
              </span>
            </v-tooltip>
          </div>
        </v-col>

      </v-row>

      <v-row>

        <v-col col="4">
          <div class="d-flex align-center">
            <v-checkbox class="checkbox  " v-model="fistula
              " :label="$t('fistula')" @change="handleFistula(fistula)"></v-checkbox>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-icon class="icon ml-2" v-bind="props" color="grey-lighten-1">
                  mdi-help-circle-outline
                </v-icon>
              </template>
              <span>{{ $t('fistulaMsg') }}
              </span>
            </v-tooltip>
          </div>

          <div v-if="fistula" class="d-flex flex-column ">
            <v-label class="mb-2 font-weight-medium">{{ $t('fistula_orig') }}</v-label>
            <v-select v-model="fistula_orig" :items="tiposfistula_orig" item-title="text" item-value="value"
              variant="outlined" color="primary"></v-select>
          </div>

          <div v-if="fistula" class="d-flex flex-column ">
            <v-label class="mb-2 font-weight-medium">{{ $t('fistula_fin') }}</v-label>
            <v-select v-model="fistula_fin" :items="tiposfistula_fin" item-title="text" item-value="value"
              variant="outlined" color="primary"></v-select>
          </div>
        </v-col>

        <v-col col="4">
          <div class="d-flex align-center">
            <v-checkbox class="checkbox  " v-model="reintervencintrahosp
              " :label="$t('reintervencintrahosp')"
              @change="handleReintervencintrahosp(reintervencintrahosp)"></v-checkbox>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-icon class="icon ml-2" v-bind="props" color="grey-lighten-1">
                  mdi-help-circle-outline
                </v-icon>
              </template>
              <span>{{ $t('reintervencintrahospMsg') }}
              </span>
            </v-tooltip>
          </div>
        </v-col>

        <v-col col="4">
          <div class="d-flex align-center">
            <v-checkbox class="checkbox  " v-model="mortintrahosp
              " :label="$t('mortintrahosp')" @change="handleMortintrahosp(mortintrahosp)"></v-checkbox>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-icon class="icon ml-2" v-bind="props" color="grey-lighten-1">
                  mdi-help-circle-outline
                </v-icon>
              </template>
              <span>{{ $t('mortintrahospMsg') }}
              </span>
            </v-tooltip>
          </div>
        </v-col>

      </v-row>

      <v-row>
        <v-col col="6">
          <v-label class="mb-2 font-weight-medium">{{ $t('compintuba') }}</v-label>
          <v-select v-model="compintuba" :items="tiposComplicacion" item-title="text" item-value="value"
            variant="outlined" color="primary"></v-select>
        </v-col>

        <v-col col="6">
          <v-label class="mb-2 font-weight-medium">{{ $t('iso') }}</v-label>
          <v-select v-model="iso" :items="tiposIso" item-title="text" item-value="value" variant="outlined"
            color="primary"></v-select>
        </v-col>
      </v-row>

      <v-row>

        <v-col col="6">
          <v-label class="mb-2 font-weight-medium">{{ $t('ira') }}</v-label>
          <v-select v-model="ira" :items="tiposIra" item-title="text" item-value="value" variant="outlined"
            color="primary"></v-select>
        </v-col>

        <v-col col="6">
          <v-label class="mb-2 font-weight-medium">{{ $t('claviendindo') }}</v-label>
          <v-select v-model="claviendindo" :items="opcionesClaviendindo" item-title="text" item-value="value"
            variant="outlined" color="primary"></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-checkbox class="checkbox  " v-model="completado
          " :label="$t('completado')" @change="completarDesenlace"></v-checkbox>
      </v-row>



    </div>
  </div>

</template>
<style lang="css">
.checkbox {
  display: flex !important;
}
</style>