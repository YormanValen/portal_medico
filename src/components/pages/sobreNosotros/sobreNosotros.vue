<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import carousel from '@/components/pages/sobreNosotros/carousel.vue';
import trayectoria from '@/components/pages/sobreNosotros/LineaTiempo.vue';

const { t } = useI18n();



</script>
<template>
    <div class="about_us_container d-flex flex-column">
        <v-card elevation="0" rounded="md" class="bg-lightsecondary mt-6">
            <v-card-item class="py-0">
                <v-row class="d-flex align-center">
                    <v-col cols="12" sm="7" class="pa-6">
                        <h5 class="text-h5 pt-3">{{ $t('quienesSomos') }}</h5>

                    </v-col>
                    <v-col cols="12" sm="5">
                        <div class="px-11 pt-5 pb-0">
                            <img src="@/assets/images/backgrounds/login-bg.svg" height="215" class="mb-n12 ml-sm-5"
                                alt="image" />
                        </div>
                    </v-col>
                </v-row>
            </v-card-item>
        </v-card>

        <div class="card_ctn d-flex ga-3">
            <div class="mision_ctn d-flex border-md rounded  align-center ga-3 pa-5">
                <div class="img_ctn">
                    <img src="https://via.placeholder.com/150" alt="imagen" />
                </div>
                <div class="txt_ctn">
                    <h3>{{ $t('mision') }}</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam cum maxime ipsam facilis aspernatur. At quas reiciendis totam assumenda similique modi, ipsum obcaecati. Est, quae debitis. Possimus et quisquam repudiandae?</p>
                </div>
            </div>
            <div class="vision_ctn d-flex border-md rounded   align-center ga-3 pa-5">
                <div class="img_ctn">
                    <img src="https://via.placeholder.com/150" alt="imagen" />

                </div>
                <div class="txt_ctn">
                    <h3>{{ $t('vision') }}</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis architecto minima totam iure nobis sed eaque quibusdam nemo numquam ut, quae error. Omnis tenetur consequuntur nesciunt placeat, impedit reiciendis officiis?</p>
                </div>
            </div>
        </div>
        <trayectoria />
        <div class="carrousel_ctn">
            <carousel />
        </div>
    </div>  
</template>

<style lang="scss" scoped>
.v-container {
    max-width: 1200px !important;
}

.about_us_container {
    gap: 6vw;
}
</style>
