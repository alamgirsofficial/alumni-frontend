<script setup>
import {
  GraduationCap,
  Award,
} from "@lucide/vue";

import ProfileSectionHeader from "@/components/common/ProfileSectionHeader.vue";

defineProps({
  education: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <section class="profile-card">

    <ProfileSectionHeader
      kicker="Academic"
      title="Education"
      description="Academic background and qualifications"
      icon="GraduationCap"
      icon-class="bg-cyan-500/10 text-cyan-400"
    />

    <div class="mt-6 space-y-5">

      <div
        v-for="item in education"
        :key="item.id"
        class="group relative pl-7"
      >

        <!-- Timeline -->

        <div
          class="absolute bottom-0 left-0 top-0 w-px bg-linear-to-b from-cyan-400/30 via-blue-400/10 to-transparent"
        />

        <!-- Dot -->

        <div
          class="absolute -left-[4px] top-1.5 h-2.5 w-2.5 rounded-full bg-cyan-400 ring-4 ring-cyan-400/5"
        />

        <!-- Education Card -->

        <div
          class="rounded-xl border border-white/5 bg-white/[0.015] p-4 transition-all duration-300 group-hover:border-cyan-400/10 group-hover:bg-cyan-400/[0.02]"
        >

          <div
            class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"
          >

            <div>

              <h3
                class="text-sm font-semibold text-slate-200"
              >
                {{ item.degree }}
              </h3>

              <p
                class="mt-1 text-xs font-medium text-cyan-400"
              >
                {{ item.institution }}
              </p>

              <p class="mt-1 text-[10px] text-slate-600">
                {{ item.field }}
              </p>

            </div>

            <span
              class="w-fit rounded-full border border-white/7 bg-white/[0.03] px-2.5 py-1 text-[9px] text-slate-500"
            >
              {{ item.startYear }}
              -
              {{ item.endYear }}
            </span>

          </div>

          <div
            class="mt-3 inline-flex items-center gap-1.5 text-[10px] text-slate-500"
          >
            <Award
              :size="12"
              class="text-cyan-500"
            />

            {{ item.result }}
          </div>

        </div>
      </div>

      <!-- Empty -->

      <div
        v-if="!education.length"
        class="rounded-xl border border-dashed border-white/10 p-6 text-center text-xs text-slate-600"
      >
        No education information available.
      </div>

    </div>
  </section>
</template>

<style scoped>
.profile-card {
  border-radius: 1rem;
  border: 1px solid rgb(255 255 255 / 0.1);
  background: rgb(255 255 255 / 0.025);
  padding: 1.25rem;
  backdrop-filter: blur(20px);

  transition:
    border-color 300ms ease,
    background 300ms ease;
}

.profile-card:hover {
  border-color: rgb(255 255 255 / 0.12);
  background: rgb(255 255 255 / 0.03);
}

@media (min-width: 640px) {
  .profile-card {
    padding: 1.5rem;
  }
}
</style>