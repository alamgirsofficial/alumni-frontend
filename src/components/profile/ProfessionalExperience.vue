<script setup>
import {
  BriefcaseBusiness,
  Building2,
  MapPin,
  CalendarDays,
} from "@lucide/vue";

import ProfileSectionHeader from "@/components/common/ProfileSectionHeader.vue";

defineProps({
  experiences: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <section
    class="rounded-2xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.03] sm:p-6"
  >

    <ProfileSectionHeader
      kicker="Career"
      title="Professional Experience"
      description="My professional journey and work experience"
      icon="BriefcaseBusiness"
      icon-class="bg-blue-500/10 text-blue-400"
    />

    <div class="mt-6 space-y-6">

      <div
        v-for="experience in experiences"
        :key="experience.id"
        class="group relative pl-7"
      >

        <!-- Timeline -->
        <div
          class="absolute bottom-0 left-0 top-0 w-px bg-linear-to-b from-blue-400/30 via-blue-400/10 to-transparent"
        />

        <!-- Dot -->
        <div
          class="absolute -left-[4px] top-1.5 h-2.5 w-2.5 rounded-full bg-blue-400 ring-4 ring-blue-400/5"
        />

        <!-- Experience Card -->
        <div
          class="rounded-xl border border-white/5 bg-white/[0.015] p-4 transition-all duration-300 hover:border-blue-400/10 hover:bg-blue-400/[0.02]"
        >

          <!-- Header -->
          <div
            class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"
          >

            <div>
              <h3
                class="text-xl font-semibold text-slate-300"
              >
                {{ experience.position }}
              </h3>

              <p
                class="mt-1 text-sm font-medium text-blue-300"
              >
                {{ experience.company }}
              </p>
            </div>

            <!-- Current / Date -->
            <div class="flex flex-wrap gap-2">

              <span
                v-if="experience.isCurrent"
                class="rounded-full border border-emerald-400/10 bg-emerald-400/5 px-2.5 py-1 text-xs font-medium text-emerald-400"
              >
                Current
              </span>

              <span
                class="rounded-full border border-white/7 bg-white/3 px-2.5 py-1 text-xs text-slate-300"
              >
                {{ experience.startDate }}
                -
                {{ experience.isCurrent ? "Present" : experience.endDate }}
              </span>

            </div>
          </div>

          <!-- Meta -->
          <div class="mt-3 flex flex-wrap gap-x-4 gap-y-2">

            <span
              class="inline-flex items-center gap-1.5 text-xs text-slate-400"
            >
              <MapPin
                :size="12"
                class="text-cyan-300"
              />

              {{ experience.location }}
            </span>

            <span
              class="inline-flex items-center gap-1.5 text-xs text-slate-400"
            >
              <BriefcaseBusiness
                :size="12"
                class="text-cyan-300"
              />

              {{ experience.employmentType }}
            </span>

          </div>

          <!-- Industry -->
          <p
            v-if="experience.industry"
            class="mt-3 text-sm text-slate-300"
          >
            {{ experience.industry }}
          </p>

          <!-- Description -->
          <p
            v-if="experience.description"
            class="mt-3 text-xs leading-6 text-slate-400"
          >
            {{ experience.description }}
          </p>

        </div>
      </div>

      <!-- Empty -->
      <div
        v-if="!experiences.length"
        class="rounded-xl border border-dashed border-white/10 p-6 text-center"
      >
        <BriefcaseBusiness
          :size="24"
          class="mx-auto text-slate-700"
        />

        <p class="mt-2 text-xl text-slate-300">
          No professional experience available.
        </p>
      </div>

    </div>
  </section>
</template>