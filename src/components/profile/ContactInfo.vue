<script setup>
import {
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
} from "@lucide/vue";

import ProfileSectionHeader from "@/components/common/ProfileSectionHeader.vue";

defineProps({
  profile: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <section class="profile-card">

    <ProfileSectionHeader
      title="Contact Information"
      description="Your contact details"
      icon="Mail"
      icon-class="bg-blue-500/10 text-blue-400"
    />

    <div class="mt-6 space-y-5">

      <!-- Email -->

      <div class="flex gap-3">

        <div class="contact-icon">
          <Mail :size="14" />
        </div>

        <div class="min-w-0">

          <p class="detail-label">
            Email
          </p>

          <p class="mt-1 truncate text-xs text-slate-300">
            {{ profile.email }}
          </p>

          <span
            v-if="profile.emailVerified"
            class="mt-1.5 inline-flex items-center gap-1 text-[9px] text-emerald-400"
          >
            <CheckCircle2 :size="10" />

            Verified
          </span>

        </div>
      </div>

      <!-- Phone -->

      <div class="flex gap-3">

        <div class="contact-icon">
          <Phone :size="14" />
        </div>

        <div>

          <p class="detail-label">
            Phone
          </p>

          <p class="mt-1 text-xs text-slate-300">
            {{ profile.phone }}
          </p>

          <span
            v-if="profile.phoneVerified"
            class="mt-1.5 inline-flex items-center gap-1 text-[9px] text-emerald-400"
          >
            <CheckCircle2 :size="10" />

            Verified
          </span>

        </div>
      </div>

      <!-- Location -->

      <div class="flex gap-3">

        <div class="contact-icon">
          <MapPin :size="14" />
        </div>

        <div>

          <p class="detail-label">
            Location
          </p>

          <p class="mt-1 text-xs text-slate-300">
            {{ profile.location }}
          </p>

        </div>
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

.contact-icon {
  display: flex;
  height: 2rem;
  width: 2rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 0.625rem;
  background: rgb(255 255 255 / 0.03);
  color: rgb(100 116 139);
}

.detail-label {
  font-size: 9px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: rgb(71 85 105);
}

@media (min-width: 640px) {
  .profile-card {
    padding: 1.5rem;
  }
}
</style>