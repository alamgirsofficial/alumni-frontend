<script setup>
import SocialLinks from "@/components/common/SocialLinks.vue";
import {
  GraduationCap,
  Building2,
  MapPin,
  Camera,
  BadgeCheck,
  ShieldCheck,
  CheckCircle2,
  Hash,
} from "@lucide/vue";

defineProps({
  profile: {
    type: Object,
    required: true,
  },
  initials: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <section
    class="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0b1424]/80 shadow-xl shadow-black/10 backdrop-blur-2xl"
  >
    <!-- =======================================================
         COVER
    ======================================================== -->

    <div class="relative h-32 overflow-hidden sm:h-40">
      <div
        class="absolute inset-0 bg-linear-to-r from-blue-600/20 via-cyan-500/10 to-blue-500/5"
      />

      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.20),transparent_32%),radial-gradient(circle_at_85%_0%,rgba(34,211,238,0.14),transparent_32%)]"
      />

      <!-- Decorative rings -->

      <div
        class="absolute -right-16 -top-24 h-64 w-64 rounded-full border border-cyan-400/10"
      />

      <div
        class="absolute -right-24 -top-20 h-64 w-64 rounded-full border border-blue-400/10"
      />

      <div
        class="absolute left-1/3 top-4 h-20 w-20 rounded-full bg-cyan-400/5 blur-3xl"
      />
    </div>

    <!-- =======================================================
         HERO CONTENT
    ======================================================== -->

    <div class="relative px-5 pb-6 sm:px-7 sm:pb-7">
      <div
        class="-mt-14 flex flex-col gap-5 sm:-mt-16 lg:flex-row lg:items-end lg:justify-between"
      >
        <!-- Profile -->

        <div class="flex flex-col gap-4 sm:flex-row sm:items-end">
          <!-- Avatar -->

          <div class="relative shrink-0">
            <div
              class="flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border-4 border-slate-800 bg-linear-to-br from-blue-500/20 to-cyan-400/10 text-3xl font-bold text-cyan-300 shadow-2xl shadow-blue-500/10 sm:h-32 sm:w-32"
            >
              <img
                v-if="profile.avatar"
                :src="profile.avatar"
                :alt="profile.name"
                class="h-full w-full object-cover"
              />

              <span v-else>
                {{ initials }}
              </span>
            </div>

            <!-- Camera -->

            <button
              type="button"
              class="absolute bottom-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-xl border border-white/10 bg-slate-800 text-slate-400 shadow-lg transition hover:bg-slate-700 hover:text-white"
            >
              <Camera :size="14" />
            </button>
          </div>

          <!-- Name / Info -->

          <div class="pb-1">
            <div class="flex flex-wrap items-center gap-2">
              <h2
                class="text-2xl font-bold tracking-tight text-white sm:text-3xl"
              >
                {{ profile.name }}
              </h2>

              <BadgeCheck
                v-if="profile.emailVerified"
                :size="20"
                class="text-cyan-400"
              />
            </div>

            <p class="mt-1.5 text-sm font-medium text-cyan-400">
              {{ profile.designation }}
            </p>

            <div
              class="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-300"
            >
              <span class="inline-flex items-center gap-1.5">
                <GraduationCap :size="13" />

                Batch {{ profile.batch }}
              </span>

              <span class="inline-flex items-center gap-1.5">
                <Building2 :size="13" />

                {{ profile.company }}
              </span>

              <span class="inline-flex items-center gap-1.5">
                <MapPin :size="13" />

                {{ profile.presentAddress }}
              </span>
            </div>
          </div>
        </div>

        <!-- Verification -->

        <div
          class="flex w-full items-center justify-between gap-4 rounded-2xl border border-emerald-400/10 bg-emerald-400/10 p-4 lg:w-auto lg:min-w-60"
        >
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10"
            >
              <ShieldCheck :size="18" class="text-emerald-400" />
            </div>

            <div>
              <p class="text-xs uppercase tracking-wider text-slate-300">
                Account Status
              </p>

              <p class="mt-1 text-sm font-semibold text-emerald-400">
                {{ profile.accountStatus }}
              </p>
            </div>
          </div>

          <CheckCircle2 :size="18" class="text-emerald-400" />
        </div>
      </div>

      <!-- Member Information -->

      <div
        class="mt-4 ml-4 flex flex-wrap items-center gap-2.5 border-t border-white/5 pt-5"
      >

      <SocialLinks
        :social-links="profile.social"
      />
      </div>

      
    </div>
  </section>
</template>
