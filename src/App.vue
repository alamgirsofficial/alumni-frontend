<template>
  <main class="h-screen items-center justify-center bg-linear-to-br from-slate-900 via-blue-900 to-slate-900">
    <Navbar/>

    <RouterView />

  </main>
</template>

<script>
import {ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from "./components/layout/Navbar.vue";

export default {
  setup() {
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

    return {
      loading,
    };
  },
};

</script>


