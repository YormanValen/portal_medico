<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Header from '@/components/landingpage/layout/Header.vue';
import AnuncioDestacado from '@/components/landingpage/section/anuncioDestacado.vue';


import AskQuestion from '@/components/landingpage/section/askQuestion.vue';
import BuyNow from '@/components/landingpage/section/buyNow.vue';
import TemasInteres from '@/components/landingpage/section/temasInteres.vue';
import Footer from '@/components/landingpage/layout/Footer.vue';

import 'aos/dist/aos.css';
import AOS from 'aos';

onMounted(() => {
    AOS.init();
});

</script>

<template>
    <div class="lp-wraper">
        <!--Header-->
        <Header />

        <AnuncioDestacado />
        <TemasInteres/>
        <!----------->
        <!--Content
        <MainBanner />
         <UserReview />
        <OurProducts />
        <FrameWorks />
        
        <Features />
        <AskQuestion />
        <BuyNow />-->
        <!----------->
        <!--Footer-->
        <Footer />
        <!----------->
    </div>
</template>
