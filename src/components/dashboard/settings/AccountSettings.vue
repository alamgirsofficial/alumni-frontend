<script setup>
import { ref } from "vue";
import { UserRound, Camera, CheckCircle2 } from "@lucide/vue";

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

function updateField(field, value) {
  form.value[field] = value;

  emit("update:modelValue", {
    ...form.value,
  });
}

function save() {
  emit("update:modelValue", {
    ...form.value,
  });

  emit("save");
}
</script>

<template>
  <SettingsSection
    title="Account Information"
    description="Manage your basic account information and contact details."
    @save="save"
  >
    <div class="space-y-6">
      <!-- Profile -->
      <div
        class="flex flex-col gap-5 rounded-2xl border border-white/10 bg-black/10 p-5 sm:flex-row sm:items-center"
      >
        <div class="relative">
          <div
            class="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-cyan-400/20 bg-linear-to-br from-cyan-500/20 to-blue-600/20"
          >
            <UserRound class="h-9 w-9 text-cyan-400" />
          </div>

          <button
            type="button"
            class="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-slate-900 text-slate-300 shadow-lg transition hover:text-cyan-400"
          >
            <Camera class="h-4 w-4" />
          </button>
        </div>

        <div class="flex-1">
          <h3 class="font-semibold text-white">
            Profile Information
          </h3>

          <p class="mt-1 text-sm text-slate-400">
            Your account information is visible across the dashboard.
          </p>

          <div class="mt-3 flex items-center gap-2 text-xs text-emerald-400">
            <CheckCircle2 class="h-4 w-4" />
            Active account
          </div>
        </div>
      </div>

      <!-- Form -->
      <div class="grid gap-5 md:grid-cols-2">
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-300">
            Full Name
          </label>

          <input
            :value="form.name"
            @input="updateField('name', $event.target.value)"
            type="text"
            class="w-full rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
          />
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-slate-300">
            Username
          </label>

          <input
            :value="form.username"
            @input="updateField('username', $event.target.value)"
            type="text"
            class="w-full rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
          />
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-slate-300">
            Email Address
          </label>

          <input
            :value="form.email"
            @input="updateField('email', $event.target.value)"
            type="email"
            class="w-full rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
          />
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-slate-300">
            Phone Number
          </label>

          <input
            :value="form.phone"
            @input="updateField('phone', $event.target.value)"
            type="text"
            class="w-full rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
          />
        </div>
      </div>
    </div>
  </SettingsSection>
</template>