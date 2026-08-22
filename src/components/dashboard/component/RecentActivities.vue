<script setup>
import { ChevronRight } from "@lucide/vue";

defineProps({
  activities: {
    type: Array,
    default: () => [],
  },

  viewAllRoute: {
    type: String,
    default: "/admin/activities",
  },
});

const getActivityStyle = (type) => {
  const styles = {
    member: "bg-blue-500/10 text-blue-400",
    event: "bg-cyan-500/10 text-cyan-400",
    blog: "bg-violet-500/10 text-violet-400",
    gallery: "bg-emerald-500/10 text-emerald-400",
  };

  return styles[type] || styles.member;
};
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
          Recent Activity
        </h2>

        <p class="mt-1 text-xs text-slate-600">
          Latest activity across your alumni platform
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

    <!-- Activities -->
    <div
      v-if="activities.length"
      class="grid grid-cols-1 divide-y divide-white/5 md:grid-cols-2 md:divide-x md:divide-y-0"
    >
      <div
        v-for="activity in activities"
        :key="activity.id"
        class="flex items-center gap-4 px-5 py-4 transition hover:bg-white/2 sm:px-6"
      >
        <!-- Icon -->
        <div
          aria-hidden="true"
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          :class="getActivityStyle(activity.type)"
        >
          <component
            :is="activity.icon"
            :size="17"
          />
        </div>

        <!-- Content -->
        <div class="min-w-0 flex-1">
          <h3
            class="truncate text-sm font-medium text-slate-200"
          >
            {{ activity.title }}
          </h3>

          <p
            class="mt-0.5 truncate text-[11px] text-slate-600"
          >
            {{ activity.description }}
          </p>
        </div>

        <!-- Time -->
        <span
          class="hidden shrink-0 text-[10px] text-slate-700 sm:block"
        >
          {{ activity.time }}
        </span>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="px-6 py-10 text-center text-sm text-slate-600"
    >
      No recent activities
    </div>
  </section>
</template>