<script setup>
import { computed } from "vue";
import {
  MoreHorizontal,
  TrendingUp,
} from "@lucide/vue";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },

  year: {
    type: [String, Number],
    default: 2026,
  },

  total: {
    type: [String, Number],
    default: 1250,
  },

  growth: {
    type: String,
    default: "12.5%",
  },
});

const maxGrowth = computed(() => {
  if (!props.data.length) {
    return 1;
  }

  return Math.max(
    ...props.data.map((item) => Number(item.value) || 0),
    1
  );
});

const getBarHeight = (value) => {
  if (!maxGrowth.value) {
    return 0;
  }

  return `${(Number(value) / maxGrowth.value) * 100}%`;
};

const firstItem = computed(() => {
  return props.data[0] || {};
});

const lastItem = computed(() => {
  return props.data[props.data.length - 1] || {};
});
</script>

<template>
  <div
    class="rounded-2xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl xl:col-span-2 sm:p-6"
  >
    <!-- Header -->
    <div class="flex items-start justify-between">
      <div>
        <div class="flex items-center gap-2">
          <h2 class="text-base font-semibold text-white">
            Member Growth
          </h2>

          <span
            class="rounded-full bg-cyan-400/10 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-cyan-400"
          >
            {{ year }}
          </span>
        </div>

        <div class="mt-2 flex items-end gap-3">
          <span class="text-2xl font-bold text-white">
            {{ total }}
          </span>

          <span
            class="mb-1 inline-flex items-center gap-1 text-xs font-medium text-emerald-400"
          >
            <TrendingUp :size="13" />
            {{ growth }}
          </span>
        </div>
      </div>

      <button
        type="button"
        aria-label="More options for member growth chart"
        class="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-500 transition hover:bg-white/10 hover:text-white"
      >
        <MoreHorizontal :size="18" />
      </button>
    </div>

    <!-- Empty State -->
    <div
      v-if="!data.length"
      class="flex h-52 items-center justify-center text-sm text-slate-600"
    >
      No growth data available
    </div>

    <!-- Chart -->
    <div
      v-else
      class="relative mt-8"
      role="img"
      :aria-label="`Bar chart of member growth by month, from ${firstItem.value || 0} in ${firstItem.month || ''} to ${lastItem.value || 0} in ${lastItem.month || ''}`"
    >
      <!-- Horizontal Lines -->
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-x-0 top-0 flex h-52 flex-col justify-between"
      >
        <div class="border-t border-white/5" />
        <div class="border-t border-white/5" />
        <div class="border-t border-white/5" />
        <div class="border-t border-white/5" />
        <div class="border-t border-white/5" />
      </div>

      <!-- Bars -->
      <div
        class="relative flex h-52 items-end gap-2 sm:gap-4"
      >
        <div
          v-for="item in data"
          :key="item.month"
          class="group relative flex h-full flex-1 flex-col justify-end"
        >
          <!-- Tooltip -->
          <div
            class="absolute bottom-[calc(100%-12px)] left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-slate-900 px-2.5 py-1.5 text-[10px] font-semibold text-white shadow-xl group-hover:block"
          >
            {{ item.value }} members
          </div>

          <!-- Bar -->
          <div
            class="relative mx-auto h-full w-full max-w-10"
          >
            <div
              class="absolute bottom-0 left-1/2 w-full -translate-x-1/2 rounded-t-xl bg-gradient-to-t from-blue-600/20 via-blue-500/50 to-cyan-400/80 transition-all duration-500 group-hover:from-blue-500/40 group-hover:via-blue-500/70 group-hover:to-cyan-300"
              :style="{
                height: getBarHeight(item.value),
              }"
            >
              <div
                class="absolute inset-x-0 top-0 h-1 rounded-full bg-cyan-300 opacity-70"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Months -->
      <div
        aria-hidden="true"
        class="mt-3 flex gap-2 sm:gap-4"
      >
        <span
          v-for="item in data"
          :key="item.month"
          class="flex-1 text-center text-[10px] font-medium text-slate-600"
        >
          {{ item.month }}
        </span>
      </div>

      <!-- Screen Reader Table -->
      <table class="sr-only">
        <caption>
          Member growth by month
        </caption>

        <thead>
          <tr>
            <th scope="col">Month</th>
            <th scope="col">Members</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="item in data"
            :key="item.month"
          >
            <td>{{ item.month }}</td>
            <td>{{ item.value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>