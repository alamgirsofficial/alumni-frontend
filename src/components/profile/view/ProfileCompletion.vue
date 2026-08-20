<script setup>
import { UserRound } from "@lucide/vue";

defineProps({
  completion: {
    type: Number,
    default: 0,
  },

  completionColor: {
    type: String,
    default: "text-cyan-400",
  },
});
</script>

<template>
  <section
    class="rounded-2xl border border-white/10 bg-white/2.5 p-5 backdrop-blur-xl sm:p-6"
  >
    <div
      class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <!-- Left -->

      <div class="flex items-center gap-3">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10"
        >
          <UserRound
            :size="18"
            class="text-blue-400"
          />
        </div>

        <div>
          <h3 class="text-sm font-semibold text-white">
            Profile Completion
          </h3>

          <p class="mt-0.5 text-xs text-slate-400">
            Complete your profile to help other alumni know you better.
          </p>
        </div>
      </div>

      <!-- Percentage -->

      <span
        class="text-xl font-bold"
        :class="completionColor"
      >
        {{ completion }}%
      </span>
    </div>

    <!-- Progress -->

    <div
      class="mt-5 h-2 overflow-hidden rounded-full bg-white/5"
    >
      <div
        class="h-full rounded-full bg-linear-to-r from-blue-500 via-cyan-400 to-cyan-300 transition-all duration-700"
        :style="{
          width: `${completion}%`,
        }"
      ></div>
    </div>

    <!-- Strength -->

    <div
      class="mt-3 flex items-center justify-between text-xs text-slate-400"
    >
      <span>
        Profile strength
      </span>

      <span>
        {{
          completion >= 90
            ? "Excellent"
            : completion >= 70
              ? "Very Good"
              : completion >= 40
                ? "Good"
                : "Needs Improvement"
        }}
      </span>
    </div>
  </section>
</template>