<script setup lang="ts">

import { ref } from 'vue';
const isChecked = ref(false);

</script>
<template>
    <v-container>
        <v-row>
            <v-col class="">
                <div class="d-flex align-center justify-center flex-column gap-2">
                    <h2 class="font-weight-bold text-primary">Qui ea ad dolor est.</h2>
                    <span class="text-subtitle-2 text-primary">Amet dolore do labore proident voluptate.</span>
                    <span class="text-h4 text-info font-weight-bold">Reprehenderit non cupidatat minim cupidatat.</span>
                    <span class="text-h6 text-error font-weight-regular ">
                        Minim ea tempor velit consequat et. Quis velit cillum nulla veniam fugiat. Tempor duis cupidatat
                        est id deserunt consectetur laborum commodo consequat mollit. Fugiat amet officia culpa mollit
                        nisi sint voluptate excepteur proident aliqua duis magna. Pariatur occaecat proident anim quis
                        et ipsum nostrud cillum sunt sunt aute enim. Exercitation magna adipisicing eu aliqua eiusmod
                        reprehenderit aute mollit voluptate qui consequat elit. Proident sunt Lorem voluptate
                        consectetur esse irure.
                    </span>
                    <div class="d-flex flex-column align-center">
                        <div class="d-flex">
                            <v-checkbox-btn v-model="isChecked"></v-checkbox-btn>
                            <v-label>I have read the disclaimer and risk calculator permited use the statements
                                below</v-label>
                        </div>
                        <v-btn :disabled="!isChecked" to="/calculator" color="primary">continue</v-btn>
                    </div>

                </div>


                <div>

                </div>
            </v-col>
        </v-row>
    </v-container>

</template>

<style lang="scss" scoped>
.v-container {

}
</style>