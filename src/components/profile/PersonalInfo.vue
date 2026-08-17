<script setup>
import {
  User,
  Calendar,
  MapPin,
  VenusAndMars,
  Droplets,
  Globe2,
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
  <section
    class="rounded-2xl border border-white/10 bg-white/2.5 p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/12 hover:bg-white/3 sm:p-6"
  >
    <!-- =====================================================
         HEADER
    ====================================================== -->

    <ProfileSectionHeader
      kicker="Personal Information"
      description="Your basic personal details"
      icon="User"
      icon-class="bg-blue-500/10 text-blue-400"
    />

    <!-- =====================================================
         INFORMATION GRID
    ====================================================== -->

    <div class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
      <!-- ===================================================
           FULL NAME
      ==================================================== -->

      <div
        class="group rounded-xl border border-white/5 bg-white/1.5 p-4 transition-all duration-300 hover:border-blue-400/10 hover:bg-blue-400/2.5"
      >
        <div class="flex items-start gap-3">
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 transition-transform duration-300 group-hover:scale-105"
          >
            <User :size="15" />
          </div>

          <div class="min-w-0">
            <p
              class="text-xs font-medium uppercase tracking-[0.08em] text-slate-400"
            >
              Full Name
            </p>

            <p class="mt-1.5 truncate text-xs font-medium text-slate-200">
              {{ profile.personal.fullName }}
            </p>
          </div>
        </div>
      </div>

      <!-- ===================================================
           DATE OF BIRTH
      ==================================================== -->

      <div
        class="group rounded-xl border border-white/5 bg-white/1.5 p-4 transition-all duration-300 hover:border-cyan-400/10 hover:bg-cyan-400/2.5"
      >
        <div class="flex items-start gap-3">
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 transition-transform duration-300 group-hover:scale-105"
          >
            <Calendar :size="15" />
          </div>

          <div>
            <p
              class="text-[9px] font-medium uppercase tracking-[0.08em] text-slate-600"
            >
              Date of Birth
            </p>

            <p class="mt-1.5 text-xs font-medium text-slate-200">
              {{ profile.personal.dateOfBirth }}
            </p>
          </div>
        </div>
      </div>

      <!-- ===================================================
           GENDER
      ==================================================== -->

      <div
        class="group rounded-xl border border-white/5 bg-white/1.5 p-4 transition-all duration-300 hover:border-violet-400/10 hover:bg-violet-400/2.5"
      >
        <div class="flex items-start gap-3">
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400 transition-transform duration-300 group-hover:scale-105"
          >
            <VenusAndMars :size="15" />
          </div>

          <div>
            <p
              class="text-[9px] font-medium uppercase tracking-[0.08em] text-slate-600"
            >
              Gender
            </p>

            <p class="mt-1.5 text-xs font-medium text-slate-200">
              {{ profile.personal.gender }}
            </p>
          </div>
        </div>
      </div>

      <!-- ===================================================
           BLOOD GROUP
      ==================================================== -->

      <div
        class="group rounded-xl border border-white/5 bg-white/1.5 p-4 transition-all duration-300 hover:border-red-400/10 hover:bg-red-400/2.5"
      >
        <div class="flex items-start gap-3">
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-400 transition-transform duration-300 group-hover:scale-105"
          >
            <Droplets :size="15" />
          </div>

          <div>
            <p
              class="text-[9px] font-medium uppercase tracking-[0.08em] text-slate-600"
            >
              Blood Group
            </p>

            <span
              class="mt-1.5 inline-flex items-center rounded-lg border border-red-400/10 bg-red-400/5 px-2.5 py-1 text-[10px] font-semibold text-red-300"
            >
              {{ profile.personal.bloodGroup }}
            </span>
          </div>
        </div>
      </div>

      <!-- ===================================================
           NATIONALITY
      ==================================================== -->

      <div
        class="group rounded-xl border border-white/5 bg-white/1.5 p-4 transition-all duration-300 hover:border-emerald-400/10 hover:bg-emerald-400/2.5"
      >
        <div class="flex items-start gap-3">
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 transition-transform duration-300 group-hover:scale-105"
          >
            <Globe2 :size="15" />
          </div>

          <div>
            <p
              class="text-[9px] font-medium uppercase tracking-[0.08em] text-slate-600"
            >
              Nationality
            </p>

            <p class="mt-1.5 text-xs font-medium text-slate-200">
              {{ profile.personal.nationality }}
            </p>
          </div>
        </div>
      </div>

      <!-- ===================================================
           ADDRESS
      ==================================================== -->

      <div
        class="group rounded-xl border border-white/5 bg-white/1.5 p-4 transition-all duration-300 hover:border-amber-400/10 hover:bg-amber-400/2.5"
      >
        <div class="flex items-start gap-3">
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 transition-transform duration-300 group-hover:scale-105"
          >
            <MapPin :size="15" />
          </div>

          <div class="min-w-0">
            <p
              class="text-[9px] font-medium uppercase tracking-[0.08em] text-slate-600"
            >
              Address
            </p>

            <p class="mt-1.5 text-xs font-medium leading-5 text-slate-200">
              {{ profile.personal.address }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
