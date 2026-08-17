<script setup>
import {
  BriefcaseBusiness,
  Building2,
} from "@lucide/vue";

import ProfileSectionHeader from "@/components/common/ProfileSectionHeader.vue";

defineProps({
  professional: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <section class="profile-card">

    <ProfileSectionHeader
      kicker="Career"
      title="Professional Information"
      description="Current professional information"
      icon="BriefcaseBusiness"
      icon-class="bg-violet-500/10 text-violet-400"
    />

    <div
      class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2"
    >

      <div class="info-box">
        <p class="detail-label">
          Current Position
        </p>

        <p class="detail-value">
          {{ professional.currentPosition }}
        </p>
      </div>

      <div class="info-box">
        <p class="detail-label">
          Company
        </p>

        <p class="detail-value flex items-center gap-2">
          <Building2
            :size="13"
            class="text-slate-600"
          />

          {{ professional.company }}
        </p>
      </div>

      <div class="info-box">
        <p class="detail-label">
          Industry
        </p>

        <p class="detail-value">
          {{ professional.industry }}
        </p>
      </div>

      <div class="info-box">
        <p class="detail-label">
          Experience
        </p>

        <p class="detail-value">
          {{ professional.experience }}
        </p>
      </div>

      <div class="info-box">
        <p class="detail-label">
          Work Location
        </p>

        <p class="detail-value">
          {{ professional.workLocation }}
        </p>
      </div>

      <div class="info-box">
        <p class="detail-label">
          Employment Type
        </p>

        <p class="detail-value">
          {{ professional.employmentType }}
        </p>
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

.info-box {
  border-radius: 0.875rem;
  border: 1px solid rgb(255 255 255 / 0.05);
  background: rgb(255 255 255 / 0.015);
  padding: 1rem;
  transition: all 300ms ease;
}

.info-box:hover {
  border-color: rgb(34 211 238 / 0.1);
  background: rgb(34 211 238 / 0.025);
}

.detail-label {
  font-size: 9px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: rgb(71 85 105);
}

.detail-value {
  margin-top: 0.45rem;
  font-size: 0.75rem;
  line-height: 1.25rem;
  color: rgb(203 213 225);
}

@media (min-width: 640px) {
  .profile-card {
    padding: 1.5rem;
  }
}
</style>