<!-- CalculatorResult.vue -->
<template>
    <v-container v-if="usuarioAutenticado">
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>{{ $t('procedureDetails') }}</v-card-title>
                    <v-card-text>
                        <div><strong>{{ $t('procedure') }}</strong> {{ datosUsuario.cupsProcedimiento }} - {{
        datosUsuario.categoriaCirugia }}</div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>{{ $t('evaluationResults') }}</v-card-title>
                    <v-card-text>
                        <RiskProgressBar name="mortalidad" :label="$t('mortality')" riskLimitPercentage="2" />
                        <RiskProgressBar name="complicaciones_mayores" :label="$t('majorComplications')" riskLimitPercentage="5" />
                        <!-- Repetir para cada resultado calculado, ajustando los valores según necesidad -->
                        <RiskProgressBar name="reintervencion_quirurgica" :label="$t('surgicalReintervention')" riskLimitPercentage="3" />
                        <RiskProgressBar name="infeccion_sitio_operatorio" :label="$t('surgicalSiteInfection')" riskLimitPercentage="4" />
                        <RiskProgressBar name="infeccion_via_urinaria" :label="$t('urinaryTractInfection')" riskLimitPercentage="3" />
                        <RiskProgressBar name="neumotonia" :label="$t('pneumonia')" riskLimitPercentage="2" />
                        <RiskProgressBar name="lesion_renal_aguda" :label="$t('acuteRenalInjury')" riskLimitPercentage="2" />

                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" @click="verDetalles">{{ $t('viewDetails') }}</v-btn>
                        <v-btn color="secondary" @click="modificarDatos">{{ $t('modifyData') }}</v-btn>
                        <v-btn color="primary" @click="generarInforme">{{ $t('generateReport') }}</v-btn>

                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

    <v-container v-else>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>{{ $t('procedureDetails') }}</v-card-title>
                    <v-card-text>
                        <div><strong>{{ $t('procedure') }}</strong> {{ datosUsuario.cupsProcedimiento }} - {{
        datosUsuario.categoriaCirugia }}</div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>{{ $t('evaluationResults') }}</v-card-title>
                    <v-card-text>
                        <RiskProgressBar :label="$t('mortality')" :progressPercentage="resultados.mortalidad"
                            riskLimitPercentage="2" />

                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" @click="verDetalles">{{ $t('viewDetails') }}</v-btn>
                        <v-btn color="secondary" @click="modificarDatos">{{ $t('modifyData') }}</v-btn>

                    </v-card-actions>
                </v-card>
                <div class="text-center mt-10 ">
                    <p>{{ $t('registerPrompt') }}</p>
                    <router-link :to="{ name: 'Boxed Register' }">
                        <v-btn color="success" class="mt-5 mr-2">{{ $t('register') }}</v-btn>
                    </router-link>
                    <router-link :to="{ name: 'Boxed Login' }">
                        <v-btn color="primary" class="mt-5">{{ $t('login') }}</v-btn>
                    </router-link>
                </div>

            </v-col>
        </v-row>
    </v-container>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import RiskProgressBar from './riskProgressBar/RiskProgressBar.vue';
import { computed } from 'vue';


const datosUsuario = localStorage.getItem('datosUsuario') ? JSON.parse(localStorage.getItem('datosUsuario')) : null;

const usuarioAutenticado = computed(() => {
    return Boolean(localStorage.getItem('user'));
});

const router = useRouter();
const resultados = ref({
    mortalidad: 10, // Valores de ejemplo
    complicacionesMayores: 20,
    ReintervencionQuirurgica: 5,
    InfeccionSitioOperatorio: 15,
    InfecciónViaUrinaria: 10,
    Neumonia: 5,
    LesionRenalAguda: 5,
    EstanciaHospitalaria: 10,
});



// Esta función se puede ajustar para calcular los resultados reales
const calcularResultados = () => {
    // Cálculos basados en los datos ingresados por el usuario

};

// Simula la obtención de resultados tras autenticación
const obtenerResultados = () => {
    const datosUsuario = localStorage.getItem('datosUsuario') ? JSON.parse(localStorage.getItem('datosUsuario')) : null;
    if (datosUsuario) {
        calcularResultados();
    } else {
        router.push('/login');
    }
};



onMounted(obtenerResultados);


const verDetalles = () => {
    // Lógica para mostrar detalles adicionales
};

const modificarDatos = () => {
    // Lógica para permitir al usuario modificar los datos de entrada
    router.push('/calculator');
};

const generarInforme = () => {
    // Lógica para generar un informe basado en los resultados
    router.push('/generateReport');
};


</script>
