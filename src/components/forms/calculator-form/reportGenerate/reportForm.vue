<template>
    <v-container>
        <!-- ... otros elementos ... -->
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-card-title>
                        {{ $t('titleReport') }}
                    </v-card-title>
                    <v-card-text>
                        <v-checkbox v-model="reportOptions.mortalidad" :label="$t('mortality')"></v-checkbox>
                        <v-checkbox v-model="reportOptions.complicaciones_mayores"
                        :label="$t('majorComplications')"></v-checkbox>
                        <v-checkbox v-model="reportOptions.reintervencion_quirurgica"
                        :label="$t('surgicalReintervention')"></v-checkbox>
                        <v-checkbox v-model="reportOptions.infeccion_sitio_operatorio"
                        :label="$t('surgicalSiteInfection')"></v-checkbox>
                        <v-checkbox v-model="reportOptions.infeccion_via_urinaria"
                        :label="$t('urinaryTractInfection')"></v-checkbox>
                        <v-checkbox v-model="reportOptions.neumotonia" :label="$t('pneumonia')"></v-checkbox>
                        <v-checkbox v-model="reportOptions.lesion_renal_aguda" :label="$t('acuteRenalInjury')"></v-checkbox>

                    </v-card-text>
                    <v-card-text>
                        <v-text-field v-model="email" :label="$t('emailLabel')"></v-text-field>
                        <v-btn color="info" @click="enviarCorreo">{{ $t('send') }}</v-btn>

                    </v-card-text>

                    <v-card-actions>
                        <v-btn color="primary" @click="generarInforme">{{ $t('prevReport') }}</v-btn>
                        <v-btn color="success" @click="generarInforme">{{ $t('generateReport') }}</v-btn>
                        <v-btn color="success" @click="regresar">{{ $t('backResults') }}</v-btn>
                        <!-- Botón para enviar al paciente -->
                        <v-btn color="info" @click="enviarPaciente">{{ $t('sendToPatient') }}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { useReportStore } from '@/stores/reportStore';
import { useRouter } from 'vue-router';
import { reactive, ref } from 'vue';
import { jsPDF } from "jspdf";

const pdfUrl = ref(null); // Para almacenar la URL del blob del PDF
const reportStore = useReportStore();
const router = useRouter();

const reportOptions = reactive({
    mortalidad: false,
    complicaciones_mayores: false,
    reintervencion_quirurgica: false,
    infeccion_sitio_operatorio: false,
    infeccion_via_urinaria: false,
    neumotonia: false,
    lesion_renal_aguda: false,

});

const regresar = () => {
    router.push({ name: 'Result' });
};

const generarInforme = async () => {
    // Aquí actualizas el store con las opciones seleccionadas

    reportStore.updateOptions(reportOptions);

    // Supongamos que getRiskPercentages ya considera las opciones actualizadas
    const riskPercentages = await reportStore.getRiskPercentageForSelectedOptions();

    // Puedes almacenar estos datos en el store o pasarlos como parámetros de ruta si son manejables
    reportStore.setRiskPercentages(riskPercentages);
    pdfUrl.value = generarPDF(riskPercentages);
};

const generarPDF = (riskPercentages) => {
    const doc = new jsPDF();

    doc.text("Informe de Riesgos", 10, 10);
    Object.entries(riskPercentages).forEach(([key, value], index) => {
        doc.text(`${key}: ${value.yourRisk}`, 10, 20 + (10 * index));
    });

    // Guarda el PDF generado directamente
    doc.save("Informe_de_Riesgos.pdf");
};
</script>
