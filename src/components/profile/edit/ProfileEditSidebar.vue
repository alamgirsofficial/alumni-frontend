<script setup>
import {
  CheckCircle2,
  Circle,
  User,
  GraduationCap,
  BriefcaseBusiness,
  Code2,
  Share2,
  LockKeyhole,
  Save,
  X,
} from "@lucide/vue";

/*
|--------------------------------------------------------------------------
| Props
|--------------------------------------------------------------------------
*/

defineProps({
  completion: {
    type: Number,
    default: 0,
  },

  activeSection: {
    type: String,
    default: "personal",
  },

  saving: {
    type: Boolean,
    default: false,
  },
});

/*
|--------------------------------------------------------------------------
| Emits
|--------------------------------------------------------------------------
*/

const emit = defineEmits(["navigate", "save", "cancel"]);

/*
|--------------------------------------------------------------------------
| Edit Sections
|--------------------------------------------------------------------------
*/

const sections = [
  {
    id: "personal",
    label: "Personal Information",
    icon: User,
  },
  {
    id: "education",
    label: "Education",
    icon: GraduationCap,
  },
  {
    id: "experience",
    label: "Professional Experience",
    icon: BriefcaseBusiness,
  },
  {
    id: "skills",
    label: "Skills & Expertise",
    icon: Code2,
  },
  {
    id: "social",
    label: "Social Links",
    icon: Share2,
  },
];
</script>

<template>
  <aside class="space-y-4">
    <!-- =====================================================
         PROFILE COMPLETION
    ====================================================== -->

    <div
      class="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur-xl"
    >
      <div class="flex items-center justify-between">
        <div>
          <p
            class="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500"
          >
            Profile Completion
          </p>

          <p class="mt-1 text-lg font-semibold text-white">{{ completion }}%</p>
        </div>

        <div
          class="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10"
        >
          <span class="text-[10px] font-semibold text-cyan-400">
            {{ completion }}%
          </span>
        </div>
      </div>

      <!-- Progress -->

      <div class="mt-4 h-1.5 overflow-hidden rounded-full bg-white/5">
        <div
          class="h-full rounded-full bg-linear-to-r from-blue-500 to-cyan-400 transition-all duration-500"
          :style="{
            width: `${completion}%`,
          }"
        ></div>
      </div>

      <p class="mt-3 text-[10px] leading-4 text-slate-600">
        Complete your profile to help other alumni know more about you.
      </p>
    </div>

    <!-- =====================================================
         QUICK NAVIGATION
    ====================================================== -->

    <div
      class="rounded-2xl border border-white/10 bg-white/3 p-3 backdrop-blur-xl"
    >
      <p
        class="px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400"
      >
        Edit Sections
      </p>

      <nav class="space-y-1">
        <button
          v-for="section in sections"
          :key="section.id"
          type="button"
          @click="emit('navigate', section.id)"
          class="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200"
          :class="
            activeSection === section.id
              ? 'bg-cyan-400/10 text-cyan-400'
              : 'text-slate-400 hover:bg-white/3 hover:text-slate-300'
          "
        >
          <component
            :is="section.icon"
            :size="15"
            :class="
              activeSection === section.id
                ? 'text-cyan-400'
                : 'text-slate-400 group-hover:text-slate-400'
            "
          />

          <span class="flex-1 text-[10px] font-medium">
            {{ section.label }}
          </span>

          <CheckCircle2
            v-if="activeSection === section.id"
            :size="13"
            class="text-cyan-400"
          />

          <Circle v-else :size="12" class="text-slate-700" />
        </button>
      </nav>
    </div>

    <!-- =====================================================
         PRIVACY
    ====================================================== -->

    <div
      class="rounded-2xl border border-white/10 bg-white/3 p-4 backdrop-blur-xl"
    >
      <div class="flex items-start gap-3">
        <div
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-400/10 text-violet-400"
        >
          <LockKeyhole :size="16" />
        </div>

        <div>
          <p class="text-xs font-medium text-slate-300">Privacy Settings</p>

          <p class="mt-1 text-[10px] leading-4 text-slate-600">
            You can control who can view your profile after saving your changes.
          </p>
        </div>
      </div>
    </div>

    <!-- =====================================================
         ACTIONS
    ====================================================== -->

    <div
      class="sticky bottom-4 rounded-2xl border border-white/10 bg-[#0b1424]/95 p-3 shadow-2xl shadow-black/20 backdrop-blur-xl"
    >
      <div class="grid grid-cols-2 gap-2">
        <!-- Cancel -->

        <button
          type="button"
          @click="emit('cancel')"
          class="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-[10px] font-medium text-slate-400 transition-all duration-200 hover:bg-white/5 hover:text-slate-200"
        >
          <X :size="14" />

          Cancel
        </button>

        <!-- Save -->

        <button
          type="button"
          @click="emit('save')"
          :disabled="saving"
          class="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-500 to-cyan-400 px-3 py-2.5 text-[10px] font-semibold text-white shadow-lg shadow-blue-500/10 transition-all duration-200 hover:from-blue-400 hover:to-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save v-if="!saving" :size="14" />

          <span
            v-else
            class="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white"
          ></span>

          {{ saving ? "Saving..." : "Save Changes" }}
        </button>
      </div>
    </div>
  </aside>
</template>
