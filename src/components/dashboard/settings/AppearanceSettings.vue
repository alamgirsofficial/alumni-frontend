<script setup>
import { ref } from "vue";
import {
  Sun,
  Moon,
  Monitor,
  PanelLeft,
  Sparkles,
  Layers3,
} from "@lucide/vue";

import SettingsSection from "./SettingsSection.vue";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue", "save"]);

const form = ref({
  ...props.modelValue,
});

const themes = [
  {
    id: "dark",
    label: "Dark",
    icon: Moon,
  },
  {
    id: "light",
    label: "Light",
    icon: Sun,
  },
  {
    id: "system",
    label: "System",
    icon: Monitor,
  },
];

function save() {
  emit("update:modelValue", {
    ...form.value,
  });

  emit("save");
}
</script>

<template>
  <SettingsSection
    title="Appearance"
    description="Customize how your dashboard looks and feels."
    @save="save"
  >
    <div class="space-y-7">
      <!-- Theme -->
      <div>
        <label class="mb-3 block text-sm font-medium text-slate-300">
          Theme
        </label>

        <div class="grid gap-3 sm:grid-cols-3">
          <button
            v-for="theme in themes"
            :key="theme.id"
            type="button"
            @click="form.theme = theme.id"
            class="flex items-center gap-3 rounded-xl border p-4 text-left transition"
            :class="
              form.theme === theme.id
                ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-400'
                : 'border-white/10 bg-black/10 text-slate-400 hover:border-white/20 hover:text-white'
            "
          >
            <component
              :is="theme.icon"
              class="h-5 w-5"
            />

            <span class="text-sm font-medium">
              {{ theme.label }}
            </span>
          </button>
        </div>
      </div>

      <!-- Accent -->
      <div>
        <label class="mb-3 block text-sm font-medium text-slate-300">
          Accent Color
        </label>

        <div class="flex items-center gap-3">
          <button
            type="button"
            @click="form.accent = 'cyan'"
            class="flex items-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-400"
          >
            <span class="h-3 w-3 rounded-full bg-cyan-400" />
            Cyan / Blue
          </button>
        </div>
      </div>

      <!-- Preferences -->
      <div class="space-y-3">
        <div
          class="flex items-center justify-between rounded-xl border border-white/10 bg-black/10 p-4"
        >
          <div class="flex items-center gap-3">
            <PanelLeft class="h-5 w-5 text-cyan-400" />

            <div>
              <p class="text-sm font-medium text-white">
                Compact Sidebar
              </p>

              <p class="text-xs text-slate-500">
                Use a more compact dashboard sidebar.
              </p>
            </div>
          </div>

          <button
            type="button"
            @click="form.compactSidebar = !form.compactSidebar"
            class="relative h-6 w-11 rounded-full transition"
            :class="
              form.compactSidebar
                ? 'bg-cyan-500'
                : 'bg-slate-700'
            "
          >
            <span
              class="absolute top-1 h-4 w-4 rounded-full bg-white shadow transition"
              :class="
                form.compactSidebar
                  ? 'left-6'
                  : 'left-1'
              "
            />
          </button>
        </div>

        <div
          class="flex items-center justify-between rounded-xl border border-white/10 bg-black/10 p-4"
        >
          <div class="flex items-center gap-3">
            <Sparkles class="h-5 w-5 text-cyan-400" />

            <div>
              <p class="text-sm font-medium text-white">
                Animations
              </p>

              <p class="text-xs text-slate-500">
                Enable smooth dashboard animations.
              </p>
            </div>
          </div>

          <button
            type="button"
            @click="form.animations = !form.animations"
            class="relative h-6 w-11 rounded-full transition"
            :class="
              form.animations
                ? 'bg-cyan-500'
                : 'bg-slate-700'
            "
          >
            <span
              class="absolute top-1 h-4 w-4 rounded-full bg-white shadow transition"
              :class="
                form.animations
                  ? 'left-6'
                  : 'left-1'
              "
            />
          </button>
        </div>

        <div
          class="flex items-center justify-between rounded-xl border border-white/10 bg-black/10 p-4"
        >
          <div class="flex items-center gap-3">
            <Layers3 class="h-5 w-5 text-cyan-400" />

            <div>
              <p class="text-sm font-medium text-white">
                Glass Effect
              </p>

              <p class="text-xs text-slate-500">
                Enable glassmorphism effects throughout dashboard.
              </p>
            </div>
          </div>

          <button
            type="button"
            @click="form.glassEffect = !form.glassEffect"
            class="relative h-6 w-11 rounded-full transition"
            :class="
              form.glassEffect
                ? 'bg-cyan-500'
                : 'bg-slate-700'
            "
          >
            <span
              class="absolute top-1 h-4 w-4 rounded-full bg-white shadow transition"
              :class="
                form.glassEffect
                  ? 'left-6'
                  : 'left-1'
              "
            />
          </button>
        </div>
      </div>
    </div>
  </SettingsSection>
</template>