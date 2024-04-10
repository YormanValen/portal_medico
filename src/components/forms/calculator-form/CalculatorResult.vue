<!-- CalculatorResult.vue -->
<template>
    <v-container v-if="usuarioAutenticado">
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>Detalles del Procedimiento</v-card-title>
                    <v-card-text>
                        <div><strong>Procedimiento:</strong> {{ datosUsuario.cupsProcedimiento }} - {{
        datosUsuario.categoriaCirugia }}</div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>Resultados de Evaluación</v-card-title>
                    <v-card-text>
                        <RiskProgressBar label="mortalidad" riskLimitPercentage="2"
                            :progressPercentage="resultados.mortalidad" />
                        <RiskProgressBar label="complicaciones_mayores" riskLimitPercentage="5"  />
                        <!-- Repetir para cada resultado calculado, ajustando los valores según necesidad -->
                        <RiskProgressBar label="reintervencion_quirurgica" riskLimitPercentage="3" />
                        <RiskProgressBar label="infeccion_sitio_operatorio" riskLimitPercentage="4" />
                        <RiskProgressBar label="infeccion_via_urinaria" riskLimitPercentage="3" />
                        <RiskProgressBar label="neumotonia" riskLimitPercentage="2" />
                        <RiskProgressBar label="lesion_renal_aguda" riskLimitPercentage="2" />

                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" @click="verDetalles">Ver Detalles</v-btn>
                        <v-btn color="secondary" @click="modificarDatos">Modificar Datos</v-btn>
                        <v-btn color="primary" @click="generarInforme">Generar informe</v-btn>

                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

    <v-container v-else>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>Detalles del Procedimiento</v-card-title>
                    <v-card-text>
                        <div><strong>Procedimiento:</strong> {{ datosUsuario.cupsProcedimiento }} - {{
        datosUsuario.categoriaCirugia }}</div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>Resultados de Evaluación</v-card-title>
                    <v-card-text>
                        <RiskProgressBar label="Mortalidad" :progressPercentage="resultados.mortalidad"
                            riskLimitPercentage="2" />

                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" @click="verDetalles">Ver Detalles</v-btn>
                        <v-btn color="secondary" @click="modificarDatos">Modificar Datos</v-btn>

                    </v-card-actions>
                </v-card>
                <div class="text-center mt-10 ">
                    <p>Si deseas ver todos los resultados, por favor <strong>regístrate</strong> o <strong>inicia
                            sesión</strong>.</p>
                    <router-link :to="{ name: 'Boxed Register' }">
                        <v-btn color="success" class="mt-5 mr-2">Registrarse</v-btn>
                    </router-link>
                    <router-link :to="{ name: 'Boxed Login' }">
                        <v-btn color="primary" class="mt-5">Iniciar sesión</v-btn>
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

console.log("usuarioAutenticado: ", usuarioAutenticado.value);


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
