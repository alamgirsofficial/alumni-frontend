<script setup>
import {
  BriefcaseBusiness,
  Building2,
  MapPin,
  Clock3,
} from "@lucide/vue";

import ProfileSectionHeader from "@/components/common/ProfileSectionHeader.vue";

defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <section
    class="rounded-2xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl sm:p-6"
  >
    <ProfileSectionHeader
      kicker="Career"
      title="Professional Information"
      description="Your current professional details"
      icon="BriefcaseBusiness"
      icon-class="bg-violet-500/10 text-violet-400"
    />

    <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

      <div>
        <label class="form-label">Current Position</label>

        <input
          v-model="modelValue.currentPosition"
          type="text"
          class="form-input"
          placeholder="Senior Software Engineer"
        />
      </div>

      <div>
        <label class="form-label">Company</label>

        <div class="relative">
          <Building2 class="form-icon" :size="14" />

          <input
            v-model="modelValue.company"
            type="text"
            class="form-input pl-10"
            placeholder="Company name"
          />
        </div>
      </div>

      <div>
        <label class="form-label">Industry</label>

        <input
          v-model="modelValue.industry"
          type="text"
          class="form-input"
          placeholder="Software & Technology"
        />
      </div>

      <div>
        <label class="form-label">Experience</label>

        <input
          v-model="modelValue.experience"
          type="text"
          class="form-input"
          placeholder="8 Years"
        />
      </div>

      <div>
        <label class="form-label">Work Location</label>

        <div class="relative">
          <MapPin class="form-icon" :size="14" />

          <input
            v-model="modelValue.workLocation"
            type="text"
            class="form-input pl-10"
            placeholder="Dhaka, Bangladesh"
          />
        </div>
      </div>

      <div>
        <label class="form-label">Employment Type</label>

        <div class="relative">
          <Clock3 class="form-icon" :size="14" />

          <select
            v-model="modelValue.employmentType"
            class="form-input appearance-none pl-10"
          >
            <option>Full Time</option>
            <option>Part Time</option>
            <option>Contract</option>
            <option>Freelance</option>
            <option>Internship</option>
          </select>
        </div>
      </div>

    </div>
  </section>
</template>