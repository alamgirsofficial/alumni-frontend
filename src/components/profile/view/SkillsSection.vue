<script setup>
import { Award } from "@lucide/vue";
import ProfileSectionHeader from "@/components/common/ProfileSectionHeader.vue";

defineProps({
  skills: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <section
    class="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.035] sm:p-6"
  >
    <!-- Section Header -->
    <ProfileSectionHeader
      kicker="Expertise"
      title="Skills & Expertise"
      description="Technical and professional skills"
      icon="Award"
      icon-class="bg-cyan-500/10 text-cyan-400"
    />

    <!-- Skills -->
    <div class="mt-6 flex flex-wrap gap-2.5">
      <span
        v-for="skill in skills"
        :key="skill"
        class="group inline-flex items-center rounded-xl border border-cyan-400/10 bg-cyan-400/4 px-3.5 py-2 text-xs font-medium text-cyan-300 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/25 hover:bg-cyan-400/8 hover:text-cyan-200"
      >
        <span
          class="mr-2 h-1.5 w-1.5 rounded-full bg-cyan-400/70 transition-all duration-300 group-hover:bg-cyan-300"
        ></span>

        {{ skill }}
      </span>

      <!-- Empty State -->
      <div
        v-if="!skills.length"
        class="flex w-full items-center gap-3 rounded-xl border border-dashed border-white/10 bg-white/2 px-4 py-4 text-xs text-slate-500"
      >
        <Award class="h-4 w-4 text-slate-600" />

        <span>No skills added yet.</span>
      </div>
    </div>
  </section>
</template>