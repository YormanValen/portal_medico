<template>
    <v-container>
        <v-row>
            <v-card-title>Seleccionar los campo que van a estar en el formulario</v-card-title>
        </v-row>
        <v-row>
            <v-col>
                <v-checkbox v-model="camposSeleccionados.edad" label="Edad"></v-checkbox>
                <v-checkbox v-model="camposSeleccionados.genero" label="Género"></v-checkbox>
                <v-checkbox v-model="camposSeleccionados.peso" label="Peso"></v-checkbox>
                <v-checkbox v-model="camposSeleccionados.talla" label="Talla"></v-checkbox>
                <v-checkbox v-model="camposSeleccionados.imc" label="IMC"></v-checkbox>
                <v-checkbox v-model="camposSeleccionados.tabaco" label="Tabaco"></v-checkbox>
                <v-checkbox v-model="camposSeleccionados.asaScore" label="ASA Score"></v-checkbox>
            </v-col>
            <v-col>
                <v-checkbox v-model="camposSeleccionados.hipertension" label="Hipertensión"></v-checkbox>
                <v-checkbox v-model="camposSeleccionados.arritmia" label="Arritmia"></v-checkbox>
                <v-checkbox v-model="camposSeleccionados.fallaCardiaca" label="Falla Cardiaca"></v-checkbox>
                <v-checkbox v-model="camposSeleccionados.diabetes" label="Diabetes"></v-checkbox>
                <v-checkbox v-model="camposSeleccionados.epoc" label="EPOC"></v-checkbox>
                <v-checkbox v-model="camposSeleccionados.afiliacionSalud" label="Afiliación Salud"></v-checkbox>
                <v-checkbox v-model="camposSeleccionados.complejidadProcedimiento"
                    label="Complejidad Procedimiento"></v-checkbox>


            </v-col>
        </v-row>
        <v-row>
            <v-btn color="success" @click="generarReporte">Generar Reporte</v-btn>
        </v-row>
    </v-container>

</template>

<script setup>
import { ref } from 'vue';
import jsPDF from 'jspdf';
import { useRouter } from 'vue-router';

const router = useRouter();

// Suponiendo que los datos del usuario y el usuario se cargan desde localStorage
const datosUsuario = localStorage.getItem('datosUsuario') ? JSON.parse(localStorage.getItem('datosUsuario')) : {};
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};

const camposSeleccionados = ref({
    edad: true,
    genero: true,
    peso: true,
    talla: true,
    imc: true,
    tabaco: true,
    hipertension: true,
    arritmia: true,
    fallaCardiaca: true,
    diabetes: true,
    epoc: true,
    afiliacionSalud: true,
    asaScore: true,
    complejidadProcedimiento: true,
    // Asegúrate de incluir aquí el resto de los campos que quieras.
});

const generarReporte = () => {
    const doc = new jsPDF();
    let y = 10; // Posición inicial en el eje Y para empezar a escribir

    // Agrega la cabecera con el nombre y el nombre de usuario
    if (user.name && user.username) {
        doc.setFontSize(12); // Ajusta el tamaño de la fuente para la cabecera
        doc.text(`Nombre: ${user.name}`, 10, y);
        y += 10; // Incrementa la posición en el eje Y
        doc.text(`Nombre de usuario: ${user.username}`, 10, y);
        y += 10; // Deja un espacio antes de listar los campos seleccionados
    }

    // Restablece el tamaño de fuente para el contenido del reporte
    doc.setFontSize(10);

    for (const campo in camposSeleccionados.value) {
        if (camposSeleccionados.value[campo] && datosUsuario[campo] !== undefined) {
            doc.text(`${campo.toUpperCase()}: ${datosUsuario[campo]}`, 10, y);
            y += 10; // Incrementa la posición en el eje Y para el siguiente campo
        }
    }

    // Guarda el documento
    doc.save('reporte.pdf');
    router.push('/calculator/result');
}
</script>
