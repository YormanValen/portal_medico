<script setup lang="ts">
import { useI18n } from 'vue-i18n';

// Obtén la función de traducción y el estado de localización actual.
const { t } = useI18n();
</script>

<template>
    <div class="trayectoria-container">
        <h2>{{ t('trayectoria') }}</h2>
        <ul class="timeline">
            <li class="trayectoria_item">
                <div class="ctn"></div>
                <div class="ctn">
                </div>
                <div class="ctn">
                    <h3>{{ t('año') }}</h3>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi non sint reprehenderit, eius
                        nulla accusamus esse molestiae quidem ex sapiente sequi laboriosam, voluptatibus illum, veniam
                        aliquam ad aut. Vel, sequi?</p>
                </div>
            </li>
            <li class="trayectoria_item">
                <div class="ctn"></div>
                <div class="ctn">
                </div>
                <div class="ctn">
                    <h3>{{ t('año') }}</h3>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi non sint reprehenderit, eius
                        nulla accusamus esse molestiae quidem ex sapiente sequi laboriosam, voluptatibus illum, veniam
                        aliquam ad aut. Vel, sequi?</p>
                </div>
            </li>
            <li class="trayectoria_item">
                <div class="ctn"></div>
                <div class="ctn">
                </div>
                <div class="ctn">
                    <h3>{{ t('año') }}</h3>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi non sint reprehenderit, eius
                        nulla accusamus esse molestiae quidem ex sapiente sequi laboriosam, voluptatibus illum, veniam
                        aliquam ad aut. Vel, sequi?</p>
                </div>
            </li>
            <li class="trayectoria_item">
                <div class="ctn"></div>
                <div class="ctn">
                </div>
                <div class="ctn">
                    <h3>{{ t('año') }}</h3>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi non sint reprehenderit, eius
                        nulla accusamus esse molestiae quidem ex sapiente sequi laboriosam, voluptatibus illum, veniam
                        aliquam ad aut. Vel, sequi?</p>
                </div>
            </li>
            <li class="trayectoria_item">
                <div class="ctn"></div>
                <div class="ctn">
                </div>
                <div class="ctn">
                    <h3>{{ t('año') }}</h3>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi non sint reprehenderit, eius
                        nulla accusamus esse molestiae quidem ex sapiente sequi laboriosam, voluptatibus illum, veniam
                        aliquam ad aut. Vel, sequi?</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.timeline {
    list-style: none;
    padding: 2vw;
    margin: 0;
}

.trayectoria_item {
    display: grid;
    gap: 5vw;
    grid-template-columns: 1fr 10% 1fr;

}

.trayectoria_item:nth-child(even) .ctn:nth-child(3) {
    order: 1;
}

.trayectoria_item:nth-child(even) .ctn:nth-child(2) {
    order: 2;
}

.trayectoria_item:nth-child(even) .ctn:nth-child(1) {
    order: 3;
}

.trayectoria_item .ctn:nth-child(2) {
    position: relative;
}

.trayectoria_item .ctn:nth-child(2)::before {
    content: "";
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    width: 4vw;
    height: 4vw;
    border: 2px solid #000;
    border-radius: 100%;
}

.trayectoria_item .ctn:nth-child(2)::after {
    content: "";
    left: 50%;
    top:60% ;
    position: absolute;
    width: 1px;
    height: 100%;
    border: 2px solid #000;
}
</style>
