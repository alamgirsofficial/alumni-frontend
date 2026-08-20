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
  <section
    class="rounded-2xl border border-white/10 bg-white/2.5 p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.03] sm:p-6"
  >
    <!-- Header -->
    <ProfileSectionHeader
      kicker="Academic"
      title="Education"
      description="Academic background and qualifications"
      icon="GraduationCap"
      icon-class="bg-cyan-500/10 text-cyan-400"
    />

    <!-- Education List -->
    <div class="mt-6 space-y-5">
      <div
        v-for="item in education"
        :key="item.id"
        class="group relative pl-7"
      >
        <!-- Timeline Line -->
        <div
          class="absolute bottom-0 left-0 top-0 w-px bg-linear-to-b from-cyan-400/30 via-blue-400/10 to-transparent"
        />

        <!-- Timeline Dot -->
        <div
          class="absolute -left-1 top-1.5 h-2.5 w-2.5 rounded-full bg-cyan-400 ring-4 ring-cyan-400/5 transition-all duration-300 group-hover:bg-cyan-300 group-hover:ring-cyan-400/10"
        />

        <!-- Education Card -->
        <div
          class="rounded-xl border border-white/5 bg-white/2 p-4 transition-all duration-300 hover:border-cyan-400/10 hover:bg-cyan-400/[0.02]"
        >
          <div
            class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"
          >
            <!-- Education Info -->
            <div class="min-w-0">
              <h3
                class="text-xl font-semibold leading-5 text-slate-200"
              >
                {{ item.degree }}
              </h3>

              <p
                class="mt-1 text-sm font-medium text-cyan-400"
              >
                {{ item.institution }}
              </p>

              <p
                v-if="item.field"
                class="mt-1 text-xs text-slate-400"
              >
                {{ item.field }}
              </p>
            </div>

            <!-- Year -->
            <span
              class="w-fit shrink-0 rounded-full border border-cyan-400 bg-white/3 px-2.5 py-1 text-xs text-cyan-400 hover:bg-cyan-400 hover:text-white"
            >
              {{ item.startYear }} - {{ item.endYear }}
            </span>
          </div>

          <!-- Result -->
          <div
            v-if="item.result"
            class="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-400"
          >
            <Award
              :size="15"
              class="text-cyan-500"
            />

            {{ item.result }}
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="!education.length"
        class="rounded-xl border border-dashed border-white/10 bg-white/1 p-6 text-center"
      >
        <GraduationCap
          :size="24"
          class="mx-auto text-slate-700"
        />

        <p class="mt-2 text-xs text-slate-600">
          No education information available.
        </p>
      </div>
    </div>
  </section>
</template>