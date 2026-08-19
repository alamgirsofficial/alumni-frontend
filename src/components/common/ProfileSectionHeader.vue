<script setup>
import {
  User,
  GraduationCap,
  BriefcaseBusiness,
  Award,
  Mail,
  Globe,
  ShieldCheck,
} from "@lucide/vue";

import { computed } from "vue";

const props = defineProps({
  kicker: {
    type: String,
    default: "",
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    default: "",
  },

  icon: {
    type: String,
    default: "User",
  },

  iconClass: {
    type: String,
    default: "bg-blue-500/10 text-blue-400",
  },
});

const icons = {
  User,
  GraduationCap,
  BriefcaseBusiness,
  Award,
  Mail,
  Globe,
  ShieldCheck,
};

const currentIcon = computed(() => {
  return icons[props.icon] || User;
});
</script>

<template>
  <div class="flex items-start justify-between gap-4">

    <!-- Content -->

    <div>
      <p
        v-if="kicker"
        class="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400"
      >
        {{ kicker }}
      </p>

      <h2
        class="text-xl font-semibold text-white"
      >
        {{ title }}
      </h2>

      <p
        v-if="description"
        class="mt-1 text-sm text-slate-400"
      >
        {{ description }}
      </p>
    </div>

    <!-- Icon -->

    <div
      class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
      :class="iconClass"
    >
      <component
        :is="currentIcon"
        :size="17"
      />
    </div>

  </div>
</template>