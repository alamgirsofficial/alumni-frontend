<script setup>
import { Images } from "@lucide/vue";
</script>

<template>
  <section class="relative pt-20 pb-16 sm:pt-32 sm:pb-20 overflow-hidden">
    <!-- Background Glow -->
    <div
      class="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
    ></div>

    <div
      class="absolute top-20 -right-40 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl"
    ></div>

    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_50%)]"
    ></div>

    <div
      class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      data-aos="fade-up"
    >
      <!-- Label -->
      <div
        class="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl"
      >
        <Images class="w-4 h-4 text-cyan-400" />

        <span class="text-sm font-medium text-slate-300">
          আমাদের স্মৃতির সংগ্রহ
        </span>
      </div>

      <!-- Title -->
      <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
        আমাদের

        <span
          class="bg-linear-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
        >
          স্মৃতির গ্যালারি
        </span>
      </h1>

      <!-- Description -->
      <p
        class="max-w-2xl mx-auto mt-6 text-base sm:text-lg leading-8 text-slate-400"
      >
        একসাথে কাটানো সুন্দর মুহূর্ত, বন্ধুত্ব, পুনর্মিলনী এবং আমাদের বিভিন্ন
        আয়োজনের স্মৃতিগুলো এক জায়গায়।
      </p>
    </div>
  </section>
</template>
