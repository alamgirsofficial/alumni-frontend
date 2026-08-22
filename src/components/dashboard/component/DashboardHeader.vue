<script setup>
import { ChevronRight, Plus, Sparkles, UserPlus } from "@lucide/vue";

defineProps({
  title: {
    type: String,
    default: "Welcome back, Admin",
  },

  description: {
    type: String,
    default:
      "Manage your alumni community, events, members and activities from one place.",
  },
});
</script>

<template>
  <section
    class="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-blue-500/8 via-white/3 to-cyan-500/5 p-6 backdrop-blur-xl sm:p-7"
  >
    <div
      aria-hidden="true"
      class="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl"
    />

    <div
      aria-hidden="true"
      class="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl"
    />

    <div
      class="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
    >
      <div>
        <nav
          aria-label="Breadcrumb"
          class="mb-4 flex items-center gap-2 text-xs text-slate-500"
        >
          <span>Admin</span>

          <ChevronRight :size="13" />

          <span
            aria-current="page"
            class="text-cyan-400"
          >
            Dashboard
          </span>
        </nav>

        <div class="flex items-center gap-2">
          <h1
            class="text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            {{ title }}
          </h1>

          <Sparkles
            :size="20"
            class="text-cyan-400"
          />
        </div>

        <p class="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
          {{ description }}
        </p>
      </div>

      <div class="flex flex-wrap gap-3">
        <RouterLink
          to="/admin/events/create"
          class="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-500 to-cyan-400 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5"
        >
          <Plus :size="17" />
          Add Event
        </RouterLink>

        <RouterLink
          to="/admin/members/create"
          class="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          <UserPlus :size="17" />
          Add Member
        </RouterLink>
      </div>
    </div>
  </section>
</template>