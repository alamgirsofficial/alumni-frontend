<script setup>
import { ArrowUpRight, MoreHorizontal } from "@lucide/vue";

defineProps({
  stat: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div
    class="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-cyan-400/20 hover:bg-white/[0.04]"
  >
    <div
      aria-hidden="true"
      class="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl transition group-hover:scale-125"
      :class="stat.glowClass"
    />

    <div class="relative">
      <div class="flex items-start justify-between">
        <div
          class="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]"
        >
          <component
            :is="stat.icon"
            :size="21"
            :class="stat.iconClass"
            :stroke-width="1.8"
          />
        </div>

        <button
          type="button"
          :aria-label="`More options for ${stat.title}`"
          class="rounded-lg p-1.5 text-slate-600 transition hover:bg-white/5 hover:text-slate-300"
        >
          <MoreHorizontal :size="18" />
        </button>
      </div>

      <p class="mt-5 text-sm text-slate-500">
        {{ stat.title }}
      </p>

      <div class="mt-1 flex items-end justify-between gap-3">
        <h2 class="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {{ stat.value }}
        </h2>

        <span
          class="mb-1 inline-flex items-center gap-1 rounded-full border border-emerald-400/10 bg-emerald-400/5 px-2 py-1 text-[10px] font-semibold text-emerald-400"
        >
          <ArrowUpRight :size="12" />
          {{ stat.change }}
        </span>
      </div>

      <div
        class="mt-4 border-t border-white/5 pt-3 text-[11px] text-slate-600"
      >
        {{ stat.description }}
      </div>
    </div>
  </div>
</template>