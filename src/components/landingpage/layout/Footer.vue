<script setup>



</script>

<template>
    <v-container>
        <!-- Sección de información de contacto -->
        <v-row class="justify-center">
            <v-col cols="12" class="text-center">
                <div class="mt-8 mb-4">
                    <!-- Detalles de contacto -->
                    <div class="contact-details">
                        <span> <v-icon class="social-icon" color="primary">mdi-email</v-icon> {{ $t('Email')
                            }}
                            <a href="google.com" target="_blank">prueba@gmail.com</a>
                        </span>

                        <span> <v-icon class="social-icon" color="error">mdi-map-marker</v-icon> {{ $t('address')
                            }}
                            <a href="google.com" target="_blank">Cra 1 #23-43 Manizales-Caldas</a>
                        </span>

                        <span> <v-icon class="social-icon" color="primary">mdi-phone</v-icon> {{ $t('phone')
                            }}
                            <a href="google.com" target="_blank">+57 300 000 0000</a>
                        </span>
                    </div>
                </div>
            </v-col>
        </v-row>
        <!-- Iconos de redes sociales -->
        <v-row class="justify-center mb-8">
            <v-col cols="12" class=" icons_ctn">
                <!-- Asegúrate de enlazar los íconos a tus URLs específicas de redes sociales -->
                <a href="https://facebook.com" target="_blank">
                    <v-icon class="social-icon" color="primary">mdi-facebook</v-icon>

                </a>
                <a href="https://twitter.com" target="_blank">
                    <v-icon class="social-icon" color="primary">mdi-twitter</v-icon>
                </a>
                <a href="https://linkedin.com" target="_blank">
                    <v-icon class="social-icon" color="primary">mdi-linkedin</v-icon>
                </a>
                <!-- Agregar más íconos según sea necesario -->
            </v-col>
        </v-row>
    </v-container>
</template>

<style lang="scss" scoped>
.v-container {
    max-width: 1200px !important;
}

.contact-details {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 1vw;
    text-align: left;

    & span {
        display: flex;
        gap: 1vw;
        width: 100%;

        & a {

            text-decoration: none;
            transition: all 0.3s ease-in-out;

            &:hover {
                color: #007bff;
            }

        }
    }
}

.social-icon {
    font-size: 24px;
    /* Ajusta el tamaño del ícono según sea necesario */
    margin: 0 10px;
    /* Ajusta el espaciado entre íconos según sea necesario */
    transition: all 0.3s ease-in-out;


    /* Ajusta el color del ícono según sea necesario */
    &:hover {
        color: #007bff !important;
        /* Ajusta el color al pasar el ratón por encima, si se desea */
    }
}
</style>
