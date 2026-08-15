<script setup>
import { statistics } from "@/constrants/statistics";
</script>

<template>
  <section class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto">
        <p
          class="text-sm font-semibold uppercase tracking-widest text-cyan-400"
        >
          Our Community
        </p>

        <h2 class="mt-2 text-3xl md:text-4xl font-bold text-white" data-aos="zoom-in">
          Our Community in Numbers
        </h2>

        <p class="mt-4 text-gray-400">
          Together, we continue to build a strong and connected alumni
          community.
        </p>
      </div>

      <!-- Statistics -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-10">
        <div
          v-for="stat in statistics"
          :key="stat.id"
          class="group p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-center hover:bg-white/10 hover:border-cyan-400/30 transition-all duration-300"
          data-aos="flip-up"
          :data-aos-delay="stat.id * 300"
        >
          <!-- Icon -->
          <div
            class="mx-auto w-12 h-12 rounded-xl flex items-center justify-center bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform duration-300"
          >
            <component :is="stat.icon" :size="24" />
          </div>

          <!-- Value -->
          <h3 class="mt-5 text-3xl md:text-4xl font-bold text-white">
            {{ stat.value }}
          </h3>

          <!-- Label -->
          <p class="mt-2 text-sm text-gray-400">
            {{ stat.label }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
