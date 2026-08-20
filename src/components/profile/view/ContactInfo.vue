<script setup>
import { Mail, Phone, MapPin, CheckCircle2 } from "@lucide/vue";

import ProfileSectionHeader from "@/components/common/ProfileSectionHeader.vue";

defineProps({
  profile: {
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
      title="Contact Information"
      description="My contact details"
      icon="Mail"
      icon-class="bg-blue-500/10 text-blue-400"
    />

    <!-- Contact Items -->
    <div class="mt-6 space-y-4">
      <!-- =====================================================
           EMAIL
      ====================================================== -->

      <div
        class="group flex gap-3 rounded-xl border border-white/5 bg-white/2 p-3.5 transition-all duration-300 hover:border-blue-400/10 hover:bg-blue-400/3"
      >
        <!-- Icon -->
        <div
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 transition-transform duration-300 group-hover:scale-105"
        >
          <Mail :size="15" />
        </div>

        <!-- Content -->
        <div class="min-w-0 flex-1">
          <p
            class="text-xs font-medium uppercase tracking-[0.08em] text-slate-400"
          >
            Email
          </p>

          <p class="mt-1.5 truncate text-sm font-medium text-slate-300">
            {{ profile.email }}
          </p>

          <!-- Verification -->
          <span
            v-if="profile.emailVerified"
            class="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-emerald-400"
          >
            <CheckCircle2 :size="10" />
            Verified
          </span>
        </div>
      </div>

      <!-- =====================================================
           PHONE
      ====================================================== -->

      <div
        class="group flex gap-3 rounded-xl border border-white/5 bg-white/2 p-3.5 transition-all duration-300 hover:border-cyan-400/10 hover:bg-cyan-400/3"
      >
        <!-- Icon -->
        <div
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 transition-transform duration-300 group-hover:scale-105"
        >
          <Phone :size="15" />
        </div>

        <!-- Content -->
        <div class="min-w-0 flex-1">
          <p
            class="text-xs font-medium uppercase tracking-[0.08em] text-slate-400"
          >
            Phone
          </p>

          <p class="mt-1.5 text-sm font-medium text-slate-300">
            {{ profile.phone }}
          </p>

          <!-- Verification -->
          <span
            v-if="profile.phoneVerified"
            class="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-emerald-400"
          >
            <CheckCircle2 :size="10" />
            Verified
          </span>
        </div>
      </div>

      <!-- =====================================================
           PRESENT ADDRESS
      ====================================================== -->

      <div
        class="group flex gap-3 rounded-xl border border-white/5 bg-white/2 p-3.5 transition-all duration-300 hover:border-amber-400/10 hover:bg-amber-400/3"
      >
        <!-- Icon -->
        <div
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 transition-transform duration-300 group-hover:scale-105"
        >
          <MapPin :size="15" />
        </div>

        <!-- Content -->
        <div class="min-w-0 flex-1">
          <p
            class="text-xs font-medium uppercase tracking-[0.08em] text-slate-400"
          >
            Present Address
          </p>

          <p class="mt-1.5 text-sm font-medium leading-5 text-slate-300">
            {{ profile.presentAddress }}
          </p>
        </div>
      </div>

      <!-- =====================================================
           EMPTY STATE
      ====================================================== -->

      <div
        v-if="!profile.email && !profile.phone && !profile.presentAddress"
        class="rounded-xl border border-dashed border-white/10 p-5 text-center text-xl text-slate-400"
      >
        No contact information available.
      </div>
    </div>
  </section>
</template>
