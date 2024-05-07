<script>
import { ref } from 'vue';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// Import Swiper styles
export default {
    components: {
        Swiper,
        SwiperSlide,
    },

    setup() {
        const items = ref([
            { src: 'https://via.placeholder.com/150', nombre: 'Juan', rol: 'Ingeniero', profesion: 'Ingeniero en sistemas' },
            { src: 'https://via.placeholder.com/150', nombre: 'Pedro', rol: 'Ingeniero', profesion: 'Ingeniero en sistemas' },
            { src: 'https://via.placeholder.com/150', nombre: 'Maria', rol: 'Ingeniero', profesion: 'Ingeniero en sistemas' },
            { src: 'https://via.placeholder.com/150', nombre: 'Jose', rol: 'Ingeniero', profesion: 'Ingeniero en sistemas' },
            { src: 'https://via.placeholder.com/150', nombre: 'Juan', rol: 'Ingeniero', profesion: 'Ingeniero en sistemas' },
            { src: 'https://via.placeholder.com/150', nombre: 'Pedro', rol: 'Ingeniero', profesion: 'Ingeniero en sistemas' },
            { src: 'https://via.placeholder.com/150', nombre: 'Maria', rol: 'Ingeniero', profesion: 'Ingeniero en sistemas' },
            { src: 'https://via.placeholder.com/150', nombre: 'Jose', rol: 'Ingeniero', profesion: 'Ingeniero en sistemas' },


        ]);
        const onSwiper = (swiper) => {
            console.log(swiper);
        };
        const onSlideChange = () => {
            console.log('slide change');
        };

        return {
            onSwiper,
            onSlideChange,
            modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay],
            items,
        };
    },
};
</script>
<template>
    <swiper :modules="modules" :slides-per-view="3" :space-between="5" navigation loop @swiper="onSwiper"
        @slideChange="onSlideChange" :autoplay="{
            delay: 2500,
            disableOnInteraction: false,
        }">
        <swiper-slide class="d-flex flex-column " v-for="item in items" :key="item.nombre">
            <div class="card_ctn border-md pa-4 rounded">
                <div class="img_ctn">
                    <img :src="item.src" alt="imagen" />
                </div>
                <div class="txt_ctn d-flex flex-column">
                    <p>{{ item.nombre }}</p>
                    <p>{{ item.rol }}</p>
                    <p>{{ item.profesion }}</p>
                </div>
            </div>
        </swiper-slide>



    </swiper>
</template>




<style scoped>
#app {
    height: 100%;
}

html,
body {
    position: relative;
    height: 100%;
}

body {
    background: #eee;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-size: 14px;
    color: #000;
    margin: 0;
    padding: 0;
}

.swiper {
    width: 100%;
    height: 100%;
}

.swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
}

.swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.swiper {
    margin-left: auto;
    margin-right: auto;
}
</style>