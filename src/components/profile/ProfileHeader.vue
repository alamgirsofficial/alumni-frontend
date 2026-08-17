<script setup>
import {
  LockKeyhole,
  Edit3,
  ChevronRight,
} from "@lucide/vue";

defineEmits([
  "edit-profile",
  "change-password",
]);
</script>

<template>
  <div
    class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
  >

    <!-- Left -->

    <div>

      <!-- Breadcrumb -->

      <div
        class="mb-2 flex items-center gap-2 text-sm text-white"
      >
        <RouterLink
          :to="{ name: 'Home' }"
          class="transition-colors duration-200 hover:text-cyan-400"
        >
          Home
        </RouterLink>

        <ChevronRight :size="12" />

        <span class="text-cyan-400">
          My Profile
        </span>
      </div>

      <h1
        class="text-2xl font-bold tracking-tight text-white sm:text-3xl"
      >
        My Profile
      </h1>

      <p class="mt-1.5 text-sm text-slate-400">
        Manage your personal information and account settings.
      </p>

    </div>

    <!-- Actions -->

    <div class="flex flex-wrap gap-2.5">

      <button
        type="button"
        @click="$emit('change-password')"
        class="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-slate-300 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.07] hover:text-white"
      >
        <LockKeyhole :size="15" />

        Change Password
      </button>

      <button
        type="button"
        @click="$emit('edit-profile')"
        class="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-500 to-cyan-400 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-blue-500/30"
      >
        <Edit3 :size="15" />

        Edit Profile
      </button>

    </div>
  </div>
</template>