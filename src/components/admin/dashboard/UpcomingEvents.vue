<script setup>
import {
  ChevronRight,
  Clock,
  MapPin,
} from "@lucide/vue";

defineProps({
  events: {
    type: Array,
    default: () => [],
  },
});

const registrationPercentage = (event) => {
  if (!event.capacity || event.capacity <= 0) {
    return 0;
  }

  return Math.min(
    Math.max(
      Math.round((event.registrations / event.capacity) * 100),
      0
    ),
    100
  );
};
</script>

<template>
  <section
    class="overflow-hidden rounded-2xl border border-white/10 bg-white/3 backdrop-blur-xl"
  >
    <div
      class="flex items-center justify-between border-b border-white/10 px-5 py-5 sm:px-6"
    >
      <div>
        <h2 class="text-base font-semibold text-white">
          Upcoming Events
        </h2>

        <p class="mt-1 text-xs text-slate-600">
          Your next scheduled events
        </p>
      </div>

      <RouterLink
        to="/admin/events"
        class="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
      >
        View all
        <ChevronRight :size="14" />
      </RouterLink>
    </div>

    <div class="divide-y divide-white/5">
      <div
        v-for="event in events"
        :key="event.id"
        class="group flex gap-4 p-5 transition hover:bg-white/2 sm:p-6"
      >
        <div
          class="flex h-16 w-14 shrink-0 flex-col items-center justify-center rounded-2xl border border-blue-400/10 bg-linear-to-b from-blue-500/10 to-cyan-400/5"
        >
          <span class="text-xl font-bold leading-none text-white">
            {{ event.day }}
          </span>

          <span class="mt-1 text-[9px] font-bold tracking-widest text-cyan-400">
            {{ event.month }}
          </span>
        </div>

        <div class="min-w-0 flex-1">
          <h3
            class="line-clamp-1 text-sm font-semibold text-white transition group-hover:text-cyan-300"
          >
            {{ event.title }}
          </h3>

          <div class="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
            <span class="inline-flex items-center gap-1.5 text-[11px] text-slate-600">
              <Clock :size="12" />
              {{ event.time }}
            </span>

            <span class="inline-flex items-center gap-1.5 text-[11px] text-slate-600">
              <MapPin :size="12" />
              {{ event.location }}
            </span>
          </div>

          <div class="mt-4">
            <div class="mb-1.5 flex justify-between">
              <span class="text-[10px] text-slate-600">
                Registration
              </span>

              <span class="text-[10px] font-medium text-slate-500">
                {{ event.registrations }}/{{ event.capacity }}
              </span>
            </div>

            <div
              class="h-1.5 overflow-hidden rounded-full bg-white/5"
              role="progressbar"
              :aria-valuenow="registrationPercentage(event)"
              aria-valuemin="0"
              aria-valuemax="100"
              :aria-label="`Registration progress for ${event.title}`"
            >
              <div
                class="h-full rounded-full bg-linear-to-r from-blue-500 to-cyan-400"
                :style="{
                  width: `${registrationPercentage(event)}%`,
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>