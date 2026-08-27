<!-- src/components/common/EmptyDataCard.vue -->

<script setup>
import { RouterLink } from "vue-router";
import { Database, ArrowRight } from "@lucide/vue";

defineProps({
  title: {
    type: String,
    default: " এই পেইজের তথ্য এখনো যুক্ত করা হয়নি",
  },

  message: {
    type: String,
    default:
      "এই বিভাগের তথ্য আমাদের ওয়েবসাইটে এখনো যুক্ত করা হয়নি। বিস্তারিত তথ্যের জন্য আমাদের সাথে যোগাযোগ করুন।",
  },

  buttonText: {
    type: String,
    default: "যোগাযোগ করুন",
  },

  buttonRoute: {
    type: String,
    default: "/contact",
  },
});
</script>

<template>
  <div class="flex min-h-88 items-center justify-center px-4 py-10">
    <div
      class="w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-8 text-center shadow-sm transition-colors duration-300 hover:border-cyan-400/60 sm:p-10"
    >
      <!-- Icon -->
      <div
        class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/10 transition-all duration-300 group-hover:bg-cyan-500/15"
      >
        <Database
          class="h-8 w-8 text-cyan-400 transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <!-- Title -->
      <h2 class="text-xl font-bold text-cyan-400 sm:text-2xl">
        {{ title }}
      </h2>

      <!-- Message -->
      <p
        class="mx-auto mt-3 max-w-xl text-sm leading-7 text-gray-500 sm:text-base"
      >
        {{ message }}
      </p>

      <!-- Action -->
      <RouterLink
        :to="buttonRoute"
        class="mt-6 inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20"
      >
        {{ buttonText }}

        <ArrowRight
          class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        />
      </RouterLink>
    </div>
  </div>
</template>
