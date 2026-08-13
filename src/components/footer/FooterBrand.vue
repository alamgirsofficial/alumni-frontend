<script setup>
import logo from "@/assets/icon/logo.png";
import SocialLinks from "@/components/common/SocialLinks.vue";

defineProps({
  info: Object,
  socials: Array,
});
</script>

<template>
  <div class="lg:col-span-2">
    <div class="flex items-center gap-4">
      <img :src="logo" class="w-14 h-14 rounded-full" alt="Forum Logo" />

      <div>
        <h2
          class="text-2xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
        >
          {{ info.title }}
        </h2>

        <p class="text-white">
          {{ info.school }}
        </p>
      </div>
    </div>

    <p class="mt-5 max-w-md text-slate-300 leading-7">
      {{ info.description }}
    </p>

    <!-- Social Links  -->
     <div class="mt-8">
        <SocialLinks
                :social-links="socials"
            />

     </div>
    
  </div>
</template>
