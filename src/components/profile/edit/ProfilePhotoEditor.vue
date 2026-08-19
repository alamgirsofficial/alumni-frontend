<script setup>
import { Camera, User, Upload, Trash2 } from "@lucide/vue";

defineProps({
  profile: {
    type: Object,
    required: true,
  },

  initials: {
    type: String,
    default: "KM",
  },
});

defineEmits(["change-photo", "remove-photo"]);
</script>

<template>
  <section
    class="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl sm:p-6"
  >
    <!-- Decorative -->

    <div
      class="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-400/5 blur-3xl"
    />

    <div class="relative flex flex-col gap-5 sm:flex-row sm:items-center">
      <!-- Avatar -->

      <div class="relative mx-auto shrink-0 sm:mx-0">
        <div
          class="flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border-4 border-slate-800 bg-linear-to-br from-blue-500/20 to-cyan-400/10 text-3xl font-bold text-cyan-300 shadow-xl shadow-blue-500/10"
        >
          <img
            v-if="profile.avatar"
            :src="profile.avatar"
            :alt="profile.name"
            class="h-full w-full object-cover"
          />

          <span v-else>
            {{ initials }}
          </span>
        </div>

        <button
          type="button"
          class="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-slate-800 text-slate-300 shadow-lg transition hover:bg-cyan-500 hover:text-white"
          @click="$emit('change-photo')"
        >
          <Camera :size="14" />
        </button>
      </div>

      <!-- Content -->

      <div class="min-w-0 flex-1 text-center sm:text-left">
        <p
          class="text-[9px] font-semibold uppercase tracking-[0.15em] text-cyan-400"
        >
          Profile Photo
        </p>

        <h2 class="mt-1 text-base font-semibold text-white">
          {{ profile.name }}
        </h2>

        <p class="mt-1 text-xs text-slate-500">
          {{ profile.designation }}
        </p>

        <div
          class="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start"
        >
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-medium text-slate-300 transition hover:border-cyan-400/20 hover:bg-cyan-400/5 hover:text-cyan-400"
            @click="$emit('change-photo')"
          >
            <Upload :size="13" />
            Change Photo
          </button>

          <button
            v-if="profile.avatar"
            type="button"
            class="inline-flex items-center gap-2 rounded-lg border border-red-400/10 bg-red-400/5 px-3 py-2 text-[10px] font-medium text-red-400 transition hover:bg-red-400/10"
            @click="$emit('remove-photo')"
          >
            <Trash2 :size="13" />
            Remove
          </button>
        </div>

        <p class="mt-3 text-[9px] text-slate-600">
          JPG, PNG or WEBP. Maximum recommended size 2MB.
        </p>
      </div>
    </div>
  </section>
</template>