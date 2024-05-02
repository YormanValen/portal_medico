<script setup>
import { onMounted } from 'vue';
import { usePatientStore } from '../../stores/patientStore';
import { useAuthStore } from '../../stores/auth';
import { useCalculatorsStore } from '../../stores/calculatorStore';

const calculatorStore = useCalculatorsStore();
const userDetail = calculatorStore.obtenerDatosUsuario();


const userStore = useAuthStore();


import { defineProps } from 'vue';

const props = defineProps({
  id: Number
});

const patientStore = usePatientStore();

onMounted(() => {
  console.log('ID del paciente:', props.id);
  console.log('Detalles del paciente:', userDetail);
});

</script>

<template>
 <div class="detalles_desenlace d-flex flex-column gap-3 ">   
  <div class="d-flex flex-column gap-3 pt-5 pl-8">
    <h2>Detalles del Paciente ID: {{ props.id }}</h2>
    <p><strong> {{ $t('age') }}:</strong> {{ userDetail.edad }}</p>
    <p><strong> {{ $t('gender') }}:</strong> {{ userDetail.genero }}</p>
<p><strong> {{ $t('tobacco') }}:</strong> {{ userDetail.tabaco ? 'Sí' : 'No' }}</p>
<p><strong> {{ $t('highBloodPressure') }}:</strong> {{ userDetail.hipertension ? 'Sí' : 'No' }}</p>
<p><strong> {{ $t('cardiacArrhythmia') }}:</strong> {{ userDetail.arritmia ? 'Sí' : 'No' }}</p>
<p><strong> {{ $t('CKD') }}:</strong> {{ userDetail.erc ? 'Sí' : 'No' }}</p>
<p><strong> {{ $t('heartFailure') }}:</strong> {{ userDetail.fallaCardiaca ? 'Sí' : 'No' }}</p>
<p><strong> {{ $t('diabetes') }}:</strong> {{ userDetail.diabetes ? 'Sí' : 'No' }}</p>
<p><strong> {{ $t('COPD') }}:</strong> {{ userDetail.epoc ? 'Sí' : 'No' }}</p>
<p><strong> {{ $t('hemodynamicInstability') }}:</strong> {{ userDetail.inestabilidadHemodinamica ? 'Sí' : 'No' }}</p>
<p><strong> {{ $t('weightKg') }}:</strong> {{ userDetail.peso  }}</p>
<p><strong> {{ $t('heightCm') }}:</strong> {{ userDetail.talla }}</p>
<p><strong> {{ $t('BMI') }}:</strong> {{ userDetail.imc }}</p>
<p><strong> {{ $t('interventionTime') }}:</strong> {{ userDetail.momentoIntervencion }}</p>
<p><strong> {{ $t('surgeryCategory') }}:</strong> {{ userDetail.categoriaCirugia  }}</p>
<p><strong> {{ $t('CUPSProcedure') }}:</strong> {{ userDetail.cupsProcedimiento  }}</p>
<p><strong> {{ $t('surgicalApproach') }}:</strong> {{ userDetail.tipoAbordajeQuirurgico  }}</p>
<p><strong> {{ $t('healthSystemAffiliation') }}:</strong> {{ userDetail.afiliacionSalud  }}</p>
<p><strong> {{ $t('ASAScore') }}:</strong> {{ userDetail.asaScore  }}</p>
<p><strong> {{ $t('procedureComplexity') }}:</strong> {{ userDetail.complejidadProcedimiento  }}</p>
  </div>

  <div class="datos_procedimiento d-flex flex-column gap-3 pt-5 pl-8">
    <h2>Datos del procedimiento</h2>

  </div>

  <div class="datos_procedimiento d-flex flex-column gap-3 pt-5 pl-8">
    <h2>Datos del deselace</h2>

  </div>
</div>

</template>
