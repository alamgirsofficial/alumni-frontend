<script setup>
import {
  Users,
  CalendarDays,
  ClipboardList,
  Wallet,
  TrendingUp,
} from "@lucide/vue";

defineProps({
  summary: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

    <!-- Members -->
    <div
      class="rounded-2xl border border-white/10 bg-white/3 p-5 transition duration-200 hover:border-blue-500/20 hover:bg-white/5"
    >
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm text-slate-400">
            Total Members
          </p>

          <h2 class="mt-2 text-2xl font-bold text-white">
            {{ summary.totalMembers.toLocaleString() }}
          </h2>

          <div class="mt-2 flex items-center gap-1 text-xs text-emerald-400">
            <TrendingUp :size="13" />
            12.5% this month
          </div>
        </div>

        <div
          class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400"
        >
          <Users :size="20" />
        </div>
      </div>
    </div>

    <!-- Events -->
    <div
      class="rounded-2xl border border-white/10 bg-white/3 p-5 transition duration-200 hover:border-cyan-500/20 hover:bg-white/5"
    >
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm text-slate-400">
            Total Events
          </p>

          <h2 class="mt-2 text-2xl font-bold text-white">
            {{ summary.totalEvents }}
          </h2>

          <div class="mt-2 flex items-center gap-1 text-xs text-emerald-400">
            <TrendingUp :size="13" />
            8.2% this month
          </div>
        </div>

        <div
          class="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400"
        >
          <CalendarDays :size="20" />
        </div>
      </div>
    </div>

    <!-- Registrations -->
    <div
      class="rounded-2xl border border-white/10 bg-white/3 p-5 transition duration-200 hover:border-emerald-500/20 hover:bg-white/5"
    >
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm text-slate-400">
            Registrations
          </p>

          <h2 class="mt-2 text-2xl font-bold text-white">
            {{ summary.totalRegistrations.toLocaleString() }}
          </h2>

          <div class="mt-2 flex items-center gap-1 text-xs text-emerald-400">
            <TrendingUp :size="13" />
            15.4% this month
          </div>
        </div>

        <div
          class="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400"
        >
          <ClipboardList :size="20" />
        </div>
      </div>
    </div>

    <!-- Revenue -->
    <div
      class="rounded-2xl border border-white/10 bg-white/3 p-5 transition duration-200 hover:border-yellow-500/20 hover:bg-white/5"
    >
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm text-slate-400">
            Total Revenue
          </p>

          <h2 class="mt-2 text-2xl font-bold text-white">
            ৳{{ summary.totalRevenue.toLocaleString() }}
          </h2>

          <div class="mt-2 flex items-center gap-1 text-xs text-emerald-400">
            <TrendingUp :size="13" />
            10.8% this month
          </div>
        </div>

        <div
          class="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400"
        >
          <Wallet :size="20" />
        </div>
      </div>
    </div>

  </div>
</template>