<template>
    <Navbar />

        <RouterView />


    <Footer />
</template>

<script setup>
import {ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from "@/components/layout/Navbar.vue";
import Footer from '@/components/footer/Footer.vue';


    const loading = ref(true);

    onMounted(async () => {
      await nextTick();

      AOS.init({
        duration: 800,
        once: false,
        offset: 100,
        easing: "ease-in-out",
      });

      setTimeout(() => {
        loading.value = false;
      }, 800);
    });

</script>


