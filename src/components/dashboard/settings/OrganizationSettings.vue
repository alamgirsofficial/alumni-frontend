<script setup>
import { ref } from "vue";
import {
  Building2,
  Globe,
 
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

function save() {
  emit("update:modelValue", {
    ...form.value,
  });

  emit("save");
}
</script>

<template>
  <SettingsSection
    title="Organization"
    description="Manage your alumni association information."
    @save="save"
  >
    <div class="space-y-6">
      <!-- Intro -->
      <div
        class="flex items-start gap-4 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.03] p-5"
      >
        <div
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400"
        >
          <Building2 class="h-5 w-5" />
        </div>

        <div>
          <h3 class="font-medium text-white">
            Organization Information
          </h3>

          <p class="mt-1 text-sm leading-6 text-slate-400">
            These details can be used across your public website,
            emails and dashboard.
          </p>
        </div>
      </div>

      <!-- Basic -->
      <div class="grid gap-5 md:grid-cols-2">
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-300">
            Organization Name
          </label>

          <input
            v-model="form.name"
            type="text"
            class="w-full rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
          />
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-slate-300">
            Short Name
          </label>

          <input
            v-model="form.shortName"
            type="text"
            class="w-full rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
          />
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-slate-300">
            Email Address
          </label>

          <input
            v-model="form.email"
            type="email"
            class="w-full rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
          />
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-slate-300">
            Phone Number
          </label>

          <input
            v-model="form.phone"
            type="text"
            class="w-full rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
          />
        </div>

        <div class="md:col-span-2">
          <label class="mb-2 block text-sm font-medium text-slate-300">
            Address
          </label>

          <textarea
            v-model="form.address"
            rows="3"
            class="w-full resize-none rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
          />
        </div>
      </div>

      <!-- Social -->
      <div>
        <div class="mb-4">
          <h3 class="text-sm font-semibold text-white">
            Social & Website
          </h3>

          <p class="mt-1 text-xs text-slate-500">
            Add your organization's public links.
          </p>
        </div>

        <div class="space-y-4">
          <div class="relative">
            <Globe
              class="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
            />

            <input
              v-model="form.website"
              type="url"
              placeholder="Website URL"
              class="w-full rounded-xl border border-white/10 bg-black/10 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40"
            />
          </div>

          <div class="relative">
            <Facebook
              class="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
            />

            <input
              v-model="form.facebook"
              type="url"
              placeholder="Facebook URL"
              class="w-full rounded-xl border border-white/10 bg-black/10 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40"
            />
          </div>

          <div class="relative">
            <Linkedin
              class="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
            />

            <input
              v-model="form.linkedin"
              type="url"
              placeholder="LinkedIn URL"
              class="w-full rounded-xl border border-white/10 bg-black/10 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40"
            />
          </div>

          <div class="relative">
            <Youtube
              class="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
            />

            <input
              v-model="form.youtube"
              type="url"
              placeholder="YouTube URL"
              class="w-full rounded-xl border border-white/10 bg-black/10 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40"
            />
          </div>
        </div>
      </div>
    </div>
  </SettingsSection>
</template>