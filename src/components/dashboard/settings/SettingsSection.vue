<script setup>
import { Save } from "@lucide/vue";

defineProps({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    default: "",
  },

  showSave: {
    type: Boolean,
    default: true,
  },
});

defineEmits(["save"]);
</script>

<template>
  <section
    class="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-xl shadow-black/10 backdrop-blur-xl"
  >
    <!-- Header -->
    <div
      class="flex flex-col gap-4 border-b border-white/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"
    >
      <div>
        <h2 class="text-base font-semibold text-white">
          {{ title }}
        </h2>

        <p
          v-if="description"
          class="mt-1 text-sm leading-6 text-slate-400"
        >
          {{ description }}
        </p>
      </div>

      <button
        v-if="showSave"
        type="button"
        @click="$emit('save')"
        class="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:shadow-cyan-500/30"
      >
        <Save class="h-4 w-4" />
        Save Changes
      </button>
    </div>

    <!-- Content -->
    <div class="p-5 sm:p-6">
      <slot />
    </div>
  </section>
</template>