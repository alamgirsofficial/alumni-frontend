<script setup>
import {
  User,
  Calendar,
  MapPin,
  VenusAndMars,
  Droplets,
  Globe2,
  Heart,
  Fingerprint,
  Church,
  Users,
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
    class="rounded-2xl border border-white/10 bg-white/2.5 p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/1.2 hover:bg-white/3 sm:p-6"
  >
    <!-- =====================================================
         HEADER
    ====================================================== -->

    <ProfileSectionHeader
      kicker="Personal"
      title="Personal Information"
      description="Your basic personal and identity details"
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
        class="group rounded-xl border border-white/5 bg-white/2 p-4 transition-all duration-300 hover:border-blue-400/10 hover:bg-blue-400/2.5"
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

            <p class="mt-1.5 truncate text-xl font-medium text-slate-200">
              {{ profile.personal.fullName }}
            </p>
          </div>
        </div>
      </div>

      <!-- ===================================================
           FATHER NAME
      ==================================================== -->

      <div
        class="group rounded-xl border border-white/5 bg-white/2 p-4 transition-all duration-300 hover:border-indigo-400/10 hover:bg-indigo-400/[0.025]"
      >
        <div class="flex items-start gap-3">
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 transition-transform duration-300 group-hover:scale-105"
          >
            <Users :size="15" />
          </div>

          <div class="min-w-0">
            <p
              class="text-xs font-medium uppercase tracking-[0.08em] text-slate-400"
            >
              Father's Name
            </p>

            <p class="mt-1.5 truncate text-xl font-medium text-slate-200">
              {{ profile.personal.father_name }}
            </p>
          </div>
        </div>
      </div>

      <!-- ===================================================
           MOTHER NAME
      ==================================================== -->

      <div
        class="group rounded-xl border border-white/5 bg-white/[0.015] p-4 transition-all duration-300 hover:border-pink-400/10 hover:bg-pink-400/[0.025]"
      >
        <div class="flex items-start gap-3">
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-pink-500/10 text-pink-400 transition-transform duration-300 group-hover:scale-105"
          >
            <Heart :size="15" />
          </div>

          <div class="min-w-0">
            <p
              class="text-xs font-medium uppercase tracking-[0.08em] text-slate-400"
            >
              Mother's Name
            </p>

            <p class="mt-1.5 truncate text-xl font-medium text-slate-200">
              {{ profile.personal.mother_name }}
            </p>
          </div>
        </div>
      </div>

      <!-- ===================================================
           DATE OF BIRTH
      ==================================================== -->

      <div
        class="group rounded-xl border border-white/5 bg-white/[0.015] p-4 transition-all duration-300 hover:border-cyan-400/10 hover:bg-cyan-400/[0.025]"
      >
        <div class="flex items-start gap-3">
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 transition-transform duration-300 group-hover:scale-105"
          >
            <Calendar :size="15" />
          </div>

          <div>
            <p
              class="text-xs font-medium uppercase tracking-[0.08em] text-slate-400"
            >
              Date of Birth
            </p>

            <p class="mt-1.5 text-xl font-medium text-slate-200">
              {{ profile.personal.dateOfBirth }}
            </p>
          </div>
        </div>
      </div>

      <!-- ===================================================
           GENDER
      ==================================================== -->

      <div
        class="group rounded-xl border border-white/5 bg-white/[0.015] p-4 transition-all duration-300 hover:border-violet-400/10 hover:bg-violet-400/[0.025]"
      >
        <div class="flex items-start gap-3">
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400 transition-transform duration-300 group-hover:scale-105"
          >
            <VenusAndMars :size="15" />
          </div>

          <div>
            <p
              class="text-xs font-medium uppercase tracking-[0.08em] text-slate-400"
            >
              Gender
            </p>

            <p class="mt-1.5 text-xl font-medium text-slate-200">
              {{ profile.personal.gender }}
            </p>
          </div>
        </div>
      </div>

      <!-- ===================================================
           MARITAL STATUS
      ==================================================== -->

      <div
        class="group rounded-xl border border-white/5 bg-white/[0.015] p-4 transition-all duration-300 hover:border-rose-400/10 hover:bg-rose-400/[0.025]"
      >
        <div class="flex items-start gap-3">
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400 transition-transform duration-300 group-hover:scale-105"
          >
            <Heart :size="15" />
          </div>

          <div>
            <p
              class="text-xs font-medium uppercase tracking-[0.08em] text-slate-400"
            >
              Marital Status
            </p>

            <p class="mt-1.5 text-xl font-medium text-slate-200">
              {{ profile.personal.maritalStatus }}
            </p>
          </div>
        </div>
      </div>

      <!-- ===================================================
           BLOOD GROUP
      ==================================================== -->

      <div
        class="group rounded-xl border border-white/5 bg-white/[0.015] p-4 transition-all duration-300 hover:border-red-400/10 hover:bg-red-400/[0.025]"
      >
        <div class="flex items-start gap-3">
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-400 transition-transform duration-300 group-hover:scale-105"
          >
            <Droplets :size="15" />
          </div>

          <div>
            <p
              class="text-xs font-medium uppercase tracking-[0.08em] text-slate-400"
            >
              Blood Group
            </p>

            <span
              class="mt-1.5 inline-flex items-center rounded-lg border border-red-400/10 bg-red-400/5 px-2.5 py-1 text-xl font-semibold text-red-300"
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
        class="group rounded-xl border border-white/5 bg-white/[0.015] p-4 transition-all duration-300 hover:border-emerald-400/10 hover:bg-emerald-400/[0.025]"
      >
        <div class="flex items-start gap-3">
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 transition-transform duration-300 group-hover:scale-105"
          >
            <Globe2 :size="15" />
          </div>

          <div>
            <p
              class="text-xs font-medium uppercase tracking-[0.08em] text-slate-400"
            >
              Nationality
            </p>

            <p class="mt-1.5 text-xl font-medium text-slate-200">
              {{ profile.personal.nationality }}
            </p>
          </div>
        </div>
      </div>

      <!-- ===================================================
           RELIGION
      ==================================================== -->

      <div
        class="group rounded-xl border border-white/5 bg-white/[0.015] p-4 transition-all duration-300 hover:border-sky-400/10 hover:bg-sky-400/[0.025]"
      >
        <div class="flex items-start gap-3">
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400 transition-transform duration-300 group-hover:scale-105"
          >
            <Church :size="15" />
          </div>

          <div>
            <p
              class="text-xs font-medium uppercase tracking-[0.08em] text-slate-400"
            >
              Religion
            </p>

            <p class="mt-1.5 text-xl font-medium text-slate-200">
              {{ profile.personal.religion }}
            </p>
          </div>
        </div>
      </div>

      <!-- ===================================================
           NID
      ==================================================== -->

      <div
        class="group rounded-xl border border-white/5 bg-white/[0.015] p-4 transition-all duration-300 hover:border-slate-400/10 hover:bg-slate-400/[0.025]"
      >
        <div class="flex items-start gap-3">
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-500/10 text-slate-400 transition-transform duration-300 group-hover:scale-105"
          >
            <Fingerprint :size="15" />
          </div>

          <div class="min-w-0">
            <p
              class="text-xs font-medium uppercase tracking-[0.08em] text-slate-400"
            >
              National ID
            </p>

            <p
              class="mt-1.5 truncate font-mono text-xl font-medium tracking-wide text-slate-300"
            >
              {{ profile.personal.nid }}
            </p>
          </div>
        </div>
      </div>

      <!-- ===================================================
           ADDRESS
      ==================================================== -->

      <div
        class="group sm:col-span-2 rounded-xl border border-white/5 bg-white/[0.015] p-4 transition-all duration-300 hover:border-amber-400/10 hover:bg-amber-400/[0.025]"
      >
        <div class="flex items-start gap-3">
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 transition-transform duration-300 group-hover:scale-105"
          >
            <MapPin :size="15" />
          </div>

          <div class="min-w-0">
            <p
              class="text-xs font-medium uppercase tracking-[0.08em] text-slate-400"
            >
              Permanent Address
            </p>

            <p class="mt-1.5 text-xl font-medium leading-5 text-slate-200">
              {{ profile.personal.permanentAddress }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
