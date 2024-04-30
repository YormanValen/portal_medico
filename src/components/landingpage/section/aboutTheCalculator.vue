<script setup lang="ts">
import myImage from '@/assets/images/profile/user-1.jpg';
import myImage2 from '@/assets/images/profile/user-2.jpg';

import { ref } from 'vue';
const isChecked = ref(false);

</script>
<template>
    <v-container class="d-flex flex-column">
        <v-row>
            <v-col class="d-flex justify-center align-center mb-5">
                <h3 class="">{{ $t('aboutCreators') }}</h3>
            </v-col>
        </v-row>

        <div class="creator__box">
            <v-row>
                <v-row class="creator__profile">
                    <v-col class="creator__profile__img__ctn">
                        <img class="creator__profile__img " :src="myImage" alt="Creador 1">
                    </v-col>
                    <v-col>
                        <p class="font-weight-bold">Dr. Jhon</p>
                    </v-col>
                </v-row>
                <v-row class="creator__details">
                    <h5>{{ $t('aboutCreator') }}</h5>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic fugit quod itaque ut? Quae dolorum
                        ipsa
                        pariatur, magnam possimus atque fugiat est eligendi ad earum officia laudantium eius assumenda
                        dolorem?</p>
                </v-row>
            </v-row>

            <v-row>
                <v-row class="creator__profile">
                    <v-col class="creator__profile__img__ctn">
                        <img class="creator__profile__img " :src="myImage2" alt="Creador 2">
                    </v-col>
                    <v-col>
                        <p class="font-weight-bold">Dra. Mary</p>
                    </v-col>
                </v-row>
                <v-row class="creator__details">
                    <h5>{{ $t('aboutCreator') }}</h5>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic fugit quod itaque ut? Quae dolorum
                        ipsa
                        pariatur, magnam possimus atque fugiat est eligendi ad earum officia laudantium eius assumenda
                        dolorem?</p>
                </v-row>
            </v-row>
        </div>

    </v-container>

</template>

<style lang="scss" scoped>

.creator__box {
    display: flex;
    flex-direction: column;
    gap: 4rem;

}

.creator__profile {
    display: grid;
    grid-template-columns: 15% 1fr;
    justify-items: center;
    align-items: center;

    &__img__ctn {
        width: fit-content;
    }

    &__img {
        width: 7vw;
        border-radius: 50%;
    }
}

.creator__details {
    padding: 0 1vw;
}
</style>