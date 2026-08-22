<script setup>
import {
  CheckCircle2,
  ChevronRight,
  Clock,
} from "@lucide/vue";

defineProps({
  registrations: {
    type: Array,
    default: () => [],
  },

  viewAllRoute: {
    type: String,
    default: "/admin/events",
  },
});
</script>

<template>
  <section
    class="overflow-hidden rounded-2xl border border-white/10 bg-white/3 backdrop-blur-xl"
  >
    <!-- Header -->
    <div
      class="flex items-center justify-between border-b border-white/10 px-5 py-5 sm:px-6"
    >
      <div>
        <h2 class="text-base font-semibold text-white">
          Recent Registrations
        </h2>

        <p class="mt-1 text-xs text-slate-600">
          Latest event participants
        </p>
      </div>

      <RouterLink
        :to="viewAllRoute"
        class="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 transition hover:text-cyan-300"
      >
        View all

        <ChevronRight :size="14" />
      </RouterLink>
    </div>

    <!-- List -->
    <div
      v-if="registrations.length"
      class="divide-y divide-white/5"
    >
      <div
        v-for="registration in registrations"
        :key="registration.id"
        class="flex items-center gap-3 px-5 py-4 transition hover:bg-white/2 sm:px-6"
      >
        <!-- Avatar -->
        <div
          aria-hidden="true"
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-400/10 bg-linear-to-br from-blue-500/15 to-cyan-400/10 text-[11px] font-bold text-cyan-300"
        >
          {{ registration.initials }}
        </div>

        <!-- User -->
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-2">
            <h3
              class="truncate text-sm font-medium text-slate-200"
            >
              {{ registration.name }}
            </h3>

            <span
              class="hidden text-[10px] text-slate-700 sm:block"
            >
              •
            </span>

            <span
              class="hidden shrink-0 text-[10px] text-slate-600 sm:block"
            >
              Batch {{ registration.batch }}
            </span>
          </div>

          <p
            class="mt-0.5 truncate text-[11px] text-slate-600"
          >
            {{ registration.event }}
          </p>
        </div>

        <!-- Status -->
        <div class="shrink-0">
          <span
            v-if="registration.status === 'Confirmed'"
            class="inline-flex items-center gap-1 rounded-full border border-emerald-400/10 bg-emerald-400/5 px-2 py-1 text-[9px] font-semibold text-emerald-400"
          >
            <CheckCircle2 :size="11" />
            Confirmed
          </span>

          <span
            v-else-if="registration.status === 'Pending'"
            class="inline-flex items-center gap-1 rounded-full border border-amber-400/10 bg-amber-400/5 px-2 py-1 text-[9px] font-semibold text-amber-400"
          >
            <Clock :size="11" />
            Pending
          </span>

          <span
            v-else
            class="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[9px] font-semibold text-slate-500"
          >
            {{ registration.status }}
          </span>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="px-6 py-10 text-center text-sm text-slate-600"
    >
      No recent registrations
    </div>
  </section>
</template>