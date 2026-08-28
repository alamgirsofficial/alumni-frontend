<script setup>
import { ref, computed } from "vue";
import {
  Image as ImageIcon,
  Upload,
  Zap,
  FileImage,
  HardDrive,
} from "@lucide/vue";

import SettingsSection from "./SettingsSection.vue";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits([
  "update:modelValue",
  "save",
]);

const form = ref({
  ...props.modelValue,
});

const formats = computed(() => {
  const result = [];

  if (form.value.allowedJpg) result.push("JPG");
  if (form.value.allowedPng) result.push("PNG");
  if (form.value.allowedWebp) result.push("WEBP");

  return result;
});

function save() {
  emit("update:modelValue", {
    ...form.value,
  });

  emit("save");
}
</script>

<template>
  <SettingsSection
    title="Media Settings"
    description="Configure image uploads and gallery media behavior."
    @save="save"
  >
    <div class="space-y-7">
      <!-- Upload Overview -->
      <div
        class="flex items-start gap-4 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.03] p-5"
      >
        <div
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400"
        >
          <ImageIcon class="h-5 w-5" />
        </div>

        <div>
          <h3 class="font-medium text-white">
            Media Configuration
          </h3>

          <p class="mt-1 text-sm leading-6 text-slate-400">
            Control image upload limits, compression and supported formats.
          </p>
        </div>
      </div>

      <!-- Maximum Size -->
      <div>
        <label
          class="mb-2 block text-sm font-medium text-slate-300"
        >
          Maximum Image Size
        </label>

        <div class="flex items-center gap-3">
          <div class="relative max-w-xs flex-1">
            <HardDrive
              class="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
            />

            <input
              v-model.number="form.maxImageSize"
              type="number"
              min="1"
              max="50"
              class="w-full rounded-xl border border-white/10 bg-black/10 py-3 pl-11 pr-16 text-sm text-white outline-none transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
            />

            <span
              class="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-500"
            >
              MB
            </span>
          </div>
        </div>

        <p class="mt-2 text-xs text-slate-600">
          Recommended maximum size: 5 MB.
        </p>
      </div>

      <!-- Formats -->
      <div>
        <label
          class="mb-3 block text-sm font-medium text-slate-300"
        >
          Allowed Image Formats
        </label>

        <div class="grid gap-3 sm:grid-cols-3">
          <label
            class="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-black/10 p-4 transition hover:border-white/20"
          >
            <input
              v-model="form.allowedJpg"
              type="checkbox"
              class="h-4 w-4 accent-cyan-500"
            />

            <FileImage class="h-4 w-4 text-slate-400" />

            <span class="text-sm text-white">
              JPG
            </span>
          </label>

          <label
            class="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-black/10 p-4 transition hover:border-white/20"
          >
            <input
              v-model="form.allowedPng"
              type="checkbox"
              class="h-4 w-4 accent-cyan-500"
            />

            <FileImage class="h-4 w-4 text-slate-400" />

            <span class="text-sm text-white">
              PNG
            </span>
          </label>

          <label
            class="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-black/10 p-4 transition hover:border-white/20"
          >
            <input
              v-model="form.allowedWebp"
              type="checkbox"
              class="h-4 w-4 accent-cyan-500"
            />

            <FileImage class="h-4 w-4 text-slate-400" />

            <span class="text-sm text-white">
              WEBP
            </span>
          </label>
        </div>

        <p class="mt-2 text-xs text-slate-600">
          Active formats:
          {{ formats.length ? formats.join(", ") : "None" }}
        </p>
      </div>

      <!-- Optimization -->
      <div class="space-y-3">
        <div
          class="flex items-center justify-between rounded-xl border border-white/10 bg-black/10 p-4"
        >
          <div class="flex items-center gap-3">
            <Zap class="h-5 w-5 text-cyan-400" />

            <div>
              <p class="text-sm font-medium text-white">
                Auto Compression
              </p>

              <p class="text-xs text-slate-500">
                Automatically optimize uploaded images.
              </p>
            </div>
          </div>

          <button
            type="button"
            @click="
              form.autoCompress = !form.autoCompress
            "
            class="relative h-6 w-11 rounded-full transition"
            :class="
              form.autoCompress
                ? 'bg-cyan-500'
                : 'bg-slate-700'
            "
          >
            <span
              class="absolute top-1 h-4 w-4 rounded-full bg-white shadow transition"
              :class="
                form.autoCompress
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
            <Upload class="h-5 w-5 text-cyan-400" />

            <div>
              <p class="text-sm font-medium text-white">
                Generate Thumbnails
              </p>

              <p class="text-xs text-slate-500">
                Create optimized thumbnails for gallery images.
              </p>
            </div>
          </div>

          <button
            type="button"
            @click="
              form.generateThumbnail =
                !form.generateThumbnail
            "
            class="relative h-6 w-11 rounded-full transition"
            :class="
              form.generateThumbnail
                ? 'bg-cyan-500'
                : 'bg-slate-700'
            "
          >
            <span
              class="absolute top-1 h-4 w-4 rounded-full bg-white shadow transition"
              :class="
                form.generateThumbnail
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