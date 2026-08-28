<script setup>
import { computed, ref } from "vue";
import {
  TrendingUp,
  BarChart3,
} from "@lucide/vue";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});

const activeMetric = ref("registrations");

const maxValue = computed(() => {
  return Math.max(
    ...props.data.map((item) =>
      Number(item[activeMetric.value] || 0)
    )
  );
});

const totalCurrentMetric = computed(() => {
  return props.data.reduce(
    (total, item) =>
      total + Number(item[activeMetric.value] || 0),
    0
  );
});
</script>

<template>
  <div
    class="rounded-2xl border border-white/10 bg-white/3 p-5"
  >
    <!-- Header -->
    <div
      class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <div class="flex items-center gap-3">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400"
        >
          <BarChart3 :size="19" />
        </div>

        <div>
          <h3 class="text-sm font-semibold text-white">
            Growth Overview
          </h3>

          <p class="mt-1 text-xs text-slate-500">
            Monthly report statistics
          </p>
        </div>
      </div>

      <!-- Switch -->
      <div
        class="flex w-fit rounded-lg border border-white/10 bg-slate-900/60 p-1"
      >
        <button
          type="button"
          class="rounded-md px-3 py-1.5 text-xs font-medium transition"
          :class="
            activeMetric === 'registrations'
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
              : 'text-slate-500 hover:text-white'
          "
          @click="activeMetric = 'registrations'"
        >
          Registrations
        </button>

        <button
          type="button"
          class="rounded-md px-3 py-1.5 text-xs font-medium transition"
          :class="
            activeMetric === 'members'
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
              : 'text-slate-500 hover:text-white'
          "
          @click="activeMetric = 'members'"
        >
          Members
        </button>
      </div>
    </div>

    <!-- Current Value -->
    <div class="mt-6 flex items-end gap-2">
      <span class="text-2xl font-bold text-white">
        {{ totalCurrentMetric.toLocaleString() }}
      </span>

      <span class="mb-1 text-xs text-slate-500">
        total this year
      </span>
    </div>

    <!-- Chart -->
    <div class="mt-6">
      <div class="flex h-52 items-end gap-2 sm:gap-4">
        <div
          v-for="item in data"
          :key="item.month"
          class="group flex h-full flex-1 flex-col justify-end"
        >
          <div class="relative flex h-full items-end justify-center">

            <!-- Tooltip -->
            <div
              class="absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-slate-900 px-2.5 py-1.5 text-[10px] text-white shadow-xl group-hover:block"
            >
              {{ item[activeMetric] }}
            </div>

            <!-- Bar -->
            <div
              class="w-full max-w-10 rounded-t-lg bg-linear-to-t from-blue-600 to-cyan-400 opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:shadow-lg group-hover:shadow-blue-500/20"
              :style="{
                height: `${Math.max(
                  (item[activeMetric] / maxValue) * 85,
                  4
                )}%`,
              }"
            ></div>
          </div>

          <span
            class="mt-2 text-center text-[10px] text-slate-600"
          >
            {{ item.month }}
          </span>
        </div>
      </div>

      <div
        class="mt-5 flex items-center gap-2 border-t border-white/5 pt-4"
      >
        <TrendingUp
          :size="14"
          class="text-emerald-400"
        />

        <span class="text-xs text-slate-500">
          Monthly
          {{ activeMetric }}
          performance
        </span>
      </div>
    </div>
  </div>
</template>