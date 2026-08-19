<script setup>
import { ArrowLeft, Save } from "@lucide/vue";

defineProps({
  title: {
    type: String,
    default: "Edit Profile",
  },

  description: {
    type: String,
    default: "Update your personal and professional information",
  },

  saving: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["save"]);
</script>

<template>
  <div
    class="flex flex-col gap-5 border-b border-white/5 pb-6 sm:flex-row sm:items-end sm:justify-between"
  >
    <!-- Left -->

    <div>
      <button
        type="button"
        class="mb-3 inline-flex items-center gap-2 text-xs text-slate-500 transition-colors duration-200 hover:text-cyan-400"
        @click="$router.back()"
      >
        <ArrowLeft :size="14" />
        Back to Profile
      </button>

      <h1
        class="text-2xl font-bold tracking-tight text-white sm:text-3xl"
      >
        {{ title }}
      </h1>

      <p
        class="mt-1.5 text-xs leading-5 text-slate-500"
      >
        {{ description }}
      </p>
    </div>

    <!-- Save -->

    <button
      type="button"
      :disabled="saving"
      class="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-500 to-cyan-400 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-500/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-cyan-400/10 disabled:cursor-not-allowed disabled:opacity-60"
      @click="$emit('save')"
    >
      <Save :size="15" />

      {{ saving ? "Saving..." : "Save Changes" }}
    </button>
  </div>
</template>