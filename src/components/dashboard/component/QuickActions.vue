<script setup>
import {
  Activity,
  CalendarDays,
  FileText,
  Image,
  UserPlus,
} from "@lucide/vue";

const actions = [
  {
    id: 1,
    title: "Add Member",
    description: "Create profile",
    to: "/admin/members/create",
    icon: UserPlus,
    iconClass: "text-blue-400",
    iconBgClass: "bg-blue-500/10",
    hoverClass:
      "hover:border-blue-400/20 hover:bg-blue-500/5",
  },

  {
    id: 2,
    title: "Add Event",
    description: "Create event",
    to: "/admin/events/create",
    icon: CalendarDays,
    iconClass: "text-cyan-400",
    iconBgClass: "bg-cyan-500/10",
    hoverClass:
      "hover:border-cyan-400/20 hover:bg-cyan-500/5",
  },

  {
    id: 3,
    title: "New Blog",
    description: "Publish content",
    to: "/admin/blogs/create",
    icon: FileText,
    iconClass: "text-violet-400",
    iconBgClass: "bg-violet-500/10",
    hoverClass:
      "hover:border-violet-400/20 hover:bg-violet-500/5",
  },

  {
    id: 4,
    title: "Upload Photo",
    description: "Manage gallery",
    to: "/admin/gallery",
    icon: Image,
    iconClass: "text-emerald-400",
    iconBgClass: "bg-emerald-500/10",
    hoverClass:
      "hover:border-emerald-400/20 hover:bg-emerald-500/5",
  },
];

defineProps({
  profileCompletion: {
    type: Number,
    default: 86,
  },
});
</script>

<template>
  <div
    class="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur-xl sm:p-6"
  >
    <!-- Header -->
    <div class="flex items-center gap-2">
      <div
        class="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10"
      >
        <Activity
          :size="18"
          class="text-cyan-400"
        />
      </div>

      <div>
        <h2 class="text-base font-semibold text-white">
          Quick Actions
        </h2>

        <p class="text-[11px] text-slate-600">
          Manage your platform
        </p>
      </div>
    </div>

    <!-- Actions -->
    <div class="mt-6 grid grid-cols-2 gap-3">
      <RouterLink
        v-for="action in actions"
        :key="action.id"
        :to="action.to"
        class="group rounded-2xl border border-white/10 bg-white/3 p-4 transition"
        :class="action.hoverClass"
      >
        <div
          class="flex h-9 w-9 items-center justify-center rounded-xl"
          :class="action.iconBgClass"
        >
          <component
            :is="action.icon"
            :size="17"
            :class="action.iconClass"
          />
        </div>

        <p
          class="mt-3 text-xs font-semibold text-slate-300"
        >
          {{ action.title }}
        </p>

        <p class="mt-1 text-[10px] text-slate-600">
          {{ action.description }}
        </p>
      </RouterLink>
    </div>

    <!-- Profile Completion -->
    <div
      class="mt-5 rounded-2xl border border-cyan-400/10 bg-linear-to-br from-blue-500/5 to-cyan-400/5 p-4"
    >
      <div class="flex items-center justify-between">
        <span class="text-xs text-slate-500">
          Profile Completion
        </span>

        <span class="text-xs font-semibold text-cyan-400">
          {{ profileCompletion }}%
        </span>
      </div>

      <div
        class="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5"
        role="progressbar"
        :aria-valuenow="profileCompletion"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="Profile completion"
      >
        <div
          class="h-full rounded-full bg-linear-to-r from-blue-500 to-cyan-400 transition-all duration-500"
          :style="{
            width: `${profileCompletion}%`,
          }"
        />
      </div>

      <p class="mt-2 text-[10px] leading-4 text-slate-600">
        Most members have completed their alumni profile.
      </p>
    </div>
  </div>
</template>