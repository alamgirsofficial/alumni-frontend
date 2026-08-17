<script setup>
import {
  Award,
} from "@lucide/vue";

import ProfileSectionHeader from "@/components/common/ProfileSectionHeader.vue";

defineProps({
  skills: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <section class="profile-card">

    <ProfileSectionHeader
      kicker="Expertise"
      title="Skills & Expertise"
      description="Technical and professional skills"
      icon="Award"
      icon-class="bg-cyan-500/10 text-cyan-400"
    />

    <div class="mt-5 flex flex-wrap gap-2">

      <span
        v-for="skill in skills"
        :key="skill"
        class="rounded-lg border border-cyan-400/10 bg-cyan-400/[0.035] px-3 py-2 text-[10px] font-medium text-cyan-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/20 hover:bg-cyan-400/[0.07]"
      >
        {{ skill }}
      </span>

      <span
        v-if="!skills.length"
        class="text-xs text-slate-600"
      >
        No skills added yet.
      </span>

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