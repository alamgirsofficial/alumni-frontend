<script setup>
import { ArrowRight } from "@lucide/vue";

defineProps({
  report: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <RouterLink
    :to="report.route"
    class="group rounded-2xl border border-white/10 bg-white/3 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500/20 hover:bg-white/5 hover:shadow-lg hover:shadow-blue-500/5"
  >
    <div class="flex items-start justify-between">
      <div
        class="flex h-10 w-10 items-center justify-center rounded-xl"
        :class="[report.iconBg, report.iconColor]"
      >
        <component
          :is="report.icon"
          :size="19"
        />
      </div>

      <ArrowRight
        :size="16"
        class="text-slate-600 transition-all duration-200 group-hover:translate-x-1 group-hover:text-blue-400"
      />
    </div>

    <h3 class="mt-5 text-sm font-semibold text-white">
      {{ report.title }}
    </h3>

    <p class="mt-2 min-h-10 text-xs leading-5 text-slate-500">
      {{ report.description }}
    </p>

    <div
      class="mt-5 border-t border-white/5 pt-4 text-xs font-medium text-slate-500 transition group-hover:text-blue-400"
    >
      View Report
    </div>
  </RouterLink>
</template>