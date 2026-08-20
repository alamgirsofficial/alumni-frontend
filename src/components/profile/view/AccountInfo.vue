<script setup>
import { ShieldCheck } from "@lucide/vue";

import ProfileSectionHeader from "@/components/common/ProfileSectionHeader.vue";

defineProps({
  account: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <section
    class="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/12 hover:bg-white/3 sm:p-6"
  >
    <!-- Header -->

    <ProfileSectionHeader
      title="Account Information"
      description="Account details"
      icon="ShieldCheck"
      icon-class="bg-violet-500/10 text-violet-400"
    />

    <!-- Account Details -->

    <div class="mt-6 space-y-3">
      <!-- Member ID -->

      <div
        class="flex items-center justify-between gap-4 border-b border-white/4 pb-3"
      >
        <span class="text-xs text-slate-400"> Member ID </span>

        <strong
          class="max-w-[65%] text-right text-xs font-medium text-slate-400"
        >
          {{ account.memberId }}
        </strong>
      </div>

      <!-- Role -->

      <div
        class="flex items-center justify-between gap-4 border-b border-white/4 pb-3"
      >
        <span class="text-xs text-slate-400"> Role </span>

        <span
          class="max-w-[65%] rounded-full bg-blue-400/10 px-2.5 py-1 text-right text-xs font-medium text-blue-400"
        >
          {{ account.role }}
        </span>
      </div>

      <!-- Status -->

      <div
        class="flex items-center justify-between gap-4 border-b border-white/4 pb-3"
      >
        <span class="text-xs text-slate-400"> Status </span>

        <span
          class="inline-flex max-w-[65%] items-center gap-1.5 text-right text-xs font-medium text-emerald-400"
        >
          <span class="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />

          {{ account.status }}
        </span>
      </div>

      <!-- Joined -->

      <div
        class="flex items-center justify-between gap-4 border-b border-white/4 pb-3"
      >
        <span class="text-xs text-slate-400"> Joined </span>

        <strong
          class="max-w-[65%] text-right text-xs font-medium text-slate-400"
        >
          {{ account.registrationDate }}
        </strong>
      </div>

      <!-- Last Login -->

      <div class="flex items-center justify-between gap-4">
        <span class="text-xs text-slate-400"> Last Login </span>

        <strong
          class="max-w-[65%] text-right text-xs font-medium leading-5 text-slate-400"
        >
          {{ account.lastLogin }}
        </strong>
      </div>
    </div>
  </section>
</template>
