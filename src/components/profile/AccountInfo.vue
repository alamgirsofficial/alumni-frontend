<script setup>
import {
  ShieldCheck,
} from "@lucide/vue";

import ProfileSectionHeader from "@/components/common/ProfileSectionHeader.vue";

defineProps({
  account: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <section class="profile-card">

    <ProfileSectionHeader
      title="Account Information"
      description="Account details"
      icon="ShieldCheck"
      icon-class="bg-violet-500/10 text-violet-400"
    />

    <div class="mt-6 space-y-4">

      <!-- Member ID -->

      <div class="account-row">

        <span>
          Member ID
        </span>

        <strong>
          {{ account.memberId }}
        </strong>

      </div>

      <!-- Role -->

      <div class="account-row">

        <span>
          Role
        </span>

        <strong
          class="rounded-full bg-blue-400/10 px-2.5 py-1 text-[9px] font-medium text-blue-400"
        >
          {{ account.role }}
        </strong>

      </div>

      <!-- Status -->

      <div class="account-row">

        <span>
          Status
        </span>

        <strong
          class="inline-flex items-center gap-1.5 text-emerald-400"
        >
          <span
            class="h-1.5 w-1.5 rounded-full bg-emerald-400"
          />

          {{ account.status }}
        </strong>

      </div>

      <!-- Joined -->

      <div class="account-row">

        <span>
          Joined
        </span>

        <strong>
          {{ account.registrationDate }}
        </strong>

      </div>

      <!-- Last Login -->

      <div class="account-row">

        <span>
          Last Login
        </span>

        <strong>
          {{ account.lastLogin }}
        </strong>

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

.account-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid rgb(255 255 255 / 0.04);
  padding-bottom: 0.75rem;
}

.account-row:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.account-row > span {
  font-size: 9px;
  color: rgb(71 85 105);
}

.account-row > strong {
  max-width: 65%;
  text-align: right;
  font-size: 10px;
  font-weight: 500;
  color: rgb(148 163 184);
}

@media (min-width: 640px) {
  .profile-card {
    padding: 1.5rem;
  }
}
</style>