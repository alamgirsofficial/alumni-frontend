<script setup>
import { ref } from "vue";
import {
  Mail,
  Send,
  AtSign,
  UserRound,
  UserPlus,
  CalendarCheck,
  KeyRound,
  BellRing,
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

const emailTypes = [
  {
    key: "registrationEmail",
    title: "Registration Email",
    description:
      "Send an email when a new member completes registration.",
    icon: UserPlus,
  },
  {
    key: "eventRegistrationEmail",
    title: "Event Registration",
    description:
      "Notify members when they register for an event.",
    icon: CalendarCheck,
  },
  {
    key: "passwordResetEmail",
    title: "Password Reset",
    description:
      "Send password reset and account recovery emails.",
    icon: KeyRound,
  },
  {
    key: "systemEmail",
    title: "System Emails",
    description:
      "Send important system and account notifications.",
    icon: BellRing,
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
    title="Email Settings"
    description="Configure sender information and automated email notifications."
    @save="save"
  >
    <div class="space-y-7">
      <!-- Email Provider Info -->
      <div
        class="rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.03] p-5"
      >
        <div class="flex items-start gap-4">
          <div
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400"
          >
            <Mail class="h-5 w-5" />
          </div>

          <div>
            <h3 class="font-medium text-white">
              Email Configuration
            </h3>

            <p class="mt-1 text-sm leading-6 text-slate-400">
              These settings control how system emails will appear
              to your members.
            </p>
          </div>
        </div>
      </div>

      <!-- Sender Information -->
      <div>
        <div class="mb-4">
          <h3 class="text-sm font-semibold text-white">
            Sender Information
          </h3>

          <p class="mt-1 text-xs text-slate-500">
            Configure the identity used for outgoing emails.
          </p>
        </div>

        <div class="grid gap-5 md:grid-cols-2">
          <div>
            <label
              class="mb-2 block text-sm font-medium text-slate-300"
            >
              Sender Name
            </label>

            <div class="relative">
              <UserRound
                class="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
              />

              <input
                v-model="form.senderName"
                type="text"
                class="w-full rounded-xl border border-white/10 bg-black/10 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
              />
            </div>
          </div>

          <div>
            <label
              class="mb-2 block text-sm font-medium text-slate-300"
            >
              Sender Email
            </label>

            <div class="relative">
              <AtSign
                class="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
              />

              <input
                v-model="form.senderEmail"
                type="email"
                class="w-full rounded-xl border border-white/10 bg-black/10 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
              />
            </div>
          </div>

          <div class="md:col-span-2">
            <label
              class="mb-2 block text-sm font-medium text-slate-300"
            >
              Reply-To Email
            </label>

            <div class="relative">
              <Send
                class="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
              />

              <input
                v-model="form.replyTo"
                type="email"
                class="w-full rounded-xl border border-white/10 bg-black/10 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Automated Emails -->
      <div>
        <div class="mb-3">
          <h3 class="text-sm font-semibold text-white">
            Automated Emails
          </h3>

          <p class="mt-1 text-xs text-slate-500">
            Choose which automatic emails should be sent.
          </p>
        </div>

        <div class="divide-y divide-white/10">
          <div
            v-for="item in emailTypes"
            :key="item.key"
            class="flex items-center gap-4 py-5 first:pt-0 last:pb-0"
          >
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400"
            >
              <component
                :is="item.icon"
                class="h-5 w-5"
              />
            </div>

            <div class="min-w-0 flex-1">
              <h4 class="text-sm font-medium text-white">
                {{ item.title }}
              </h4>

              <p class="mt-1 text-xs leading-5 text-slate-500">
                {{ item.description }}
              </p>
            </div>

            <button
              type="button"
              @click="
                form[item.key] = !form[item.key]
              "
              class="relative h-6 w-11 shrink-0 rounded-full transition"
              :class="
                form[item.key]
                  ? 'bg-cyan-500'
                  : 'bg-slate-700'
              "
            >
              <span
                class="absolute top-1 h-4 w-4 rounded-full bg-white shadow transition"
                :class="
                  form[item.key]
                    ? 'left-6'
                    : 'left-1'
                "
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </SettingsSection>
</template>