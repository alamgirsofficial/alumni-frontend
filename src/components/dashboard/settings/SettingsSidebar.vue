<script setup>
import {
  User,
  ShieldCheck,
  Bell,
  Palette,
  Building2,
  Mail,
  CalendarDays,
  Users,
  Image,
  Settings2,
  ChevronRight,
  Lock,
} from "@lucide/vue";

import { settingsMenu } from "@/constants/settings";

defineProps({
  activeSection: {
    type: String,
    required: true,
  },
});

defineEmits(["change"]);

const icons = {
  User,
  ShieldCheck,
  Bell,
  Palette,
  Building2,
  Mail,
  CalendarDays,
  Users,
  Image,
  Settings2,
};
</script>

<template>
  <aside
    class="rounded-2xl border border-white/10 bg-white/[0.04] p-3 shadow-xl shadow-black/10 backdrop-blur-xl"
  >
    <div class="px-3 pb-3 pt-2">
      <p
        class="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-400"
      >
        Settings
      </p>

      <h3 class="mt-1 text-lg font-semibold text-white">
        Dashboard Settings
      </h3>
    </div>

    <nav class="space-y-1">
      <button
        v-for="item in settingsMenu"
        :key="item.id"
        type="button"
        :disabled="item.comingSoon"
        @click="!item.comingSoon && $emit('change', item.id)"
        class="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition"
        :class="
          activeSection === item.id
            ? 'bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-400/20'
            : item.comingSoon
              ? 'cursor-not-allowed text-slate-600'
              : 'text-slate-400 hover:bg-white/[0.05] hover:text-white'
        "
      >
        <div
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
          :class="
            activeSection === item.id
              ? 'bg-cyan-400/10'
              : 'bg-white/[0.04]'
          "
        >
          <component
            :is="icons[item.icon]"
            class="h-4.5 w-4.5"
          />
        </div>

        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-2">
            <p class="truncate text-sm font-medium">
              {{ item.label }}
            </p>

            <span
              v-if="item.comingSoon"
              class="rounded-md bg-white/[0.06] px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide text-slate-500"
            >
              Soon
            </span>
          </div>

          <p class="mt-0.5 truncate text-[11px] text-slate-600">
            {{ item.description }}
          </p>
        </div>

        <ChevronRight
          v-if="activeSection === item.id"
          class="h-4 w-4 shrink-0"
        />

        <Lock
          v-else-if="item.comingSoon"
          class="h-3.5 w-3.5 shrink-0"
        />
      </button>
    </nav>
  </aside>
</template>