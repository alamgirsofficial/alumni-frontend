<script setup>
import { ref } from "vue";
import {
  LockKeyhole,
  ShieldCheck,
  Monitor,
  Smartphone,
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
    title="Security"
    description="Keep your dashboard account secure."
    @save="save"
  >
    <div class="space-y-5">
      <!-- Password -->
      <div
        class="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/10 p-5 sm:flex-row sm:items-center sm:justify-between"
      >
        <div class="flex items-start gap-4">
          <div
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400"
          >
            <LockKeyhole class="h-5 w-5" />
          </div>

          <div>
            <h3 class="font-medium text-white">
              Password
            </h3>

            <p class="mt-1 text-sm text-slate-400">
              Change your password regularly to keep your account safe.
            </p>
          </div>
        </div>

        <button
          type="button"
          class="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-400"
        >
          Change Password
        </button>
      </div>

      <!-- 2FA -->
      <div
        class="flex items-center justify-between rounded-2xl border border-white/10 bg-black/10 p-5"
      >
        <div class="flex items-start gap-4">
          <div
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400"
          >
            <ShieldCheck class="h-5 w-5" />
          </div>

          <div>
            <h3 class="font-medium text-white">
              Two-Factor Authentication
            </h3>

            <p class="mt-1 text-sm text-slate-400">
              Add an extra layer of security to your account.
            </p>
          </div>
        </div>

        <button
          type="button"
          @click="form.twoFactorEnabled = !form.twoFactorEnabled"
          class="relative h-6 w-11 shrink-0 rounded-full transition"
          :class="
            form.twoFactorEnabled
              ? 'bg-cyan-500'
              : 'bg-slate-700'
          "
        >
          <span
            class="absolute top-1 h-4 w-4 rounded-full bg-white shadow transition"
            :class="
              form.twoFactorEnabled
                ? 'left-6'
                : 'left-1'
            "
          />
        </button>
      </div>

      <!-- Sessions -->
      <div>
        <div class="mb-3">
          <h3 class="font-medium text-white">
            Active Sessions
          </h3>

          <p class="mt-1 text-sm text-slate-400">
            Devices currently signed in to your account.
          </p>
        </div>

        <div class="space-y-3">
          <div
            class="flex items-center justify-between rounded-xl border border-white/10 bg-black/10 p-4"
          >
            <div class="flex items-center gap-3">
              <Monitor class="h-5 w-5 text-slate-400" />

              <div>
                <p class="text-sm font-medium text-white">
                  Chrome on Windows
                </p>

                <p class="text-xs text-emerald-400">
                  Active now
                </p>
              </div>
            </div>

            <span
              class="rounded-lg bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-400"
            >
              Current
            </span>
          </div>

          <div
            class="flex items-center justify-between rounded-xl border border-white/10 bg-black/10 p-4"
          >
            <div class="flex items-center gap-3">
              <Smartphone class="h-5 w-5 text-slate-400" />

              <div>
                <p class="text-sm font-medium text-white">
                  Mobile Device
                </p>

                <p class="text-xs text-slate-500">
                  Last active recently
                </p>
              </div>
            </div>

            <button
              type="button"
              class="text-xs font-medium text-slate-400 hover:text-red-400"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </SettingsSection>
</template>