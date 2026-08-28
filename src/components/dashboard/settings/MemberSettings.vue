<script setup>
import { ref } from "vue";
import {
  Users,
  UserCheck,
  Pencil,
  Mail,
  Phone,
  Share2,
  Globe2,
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

const memberSettings = [
  {
    key: "approvalRequired",
    title: "Member Approval",
    description:
      "New members must be approved by an administrator.",
    icon: UserCheck,
  },
  {
    key: "profileEditing",
    title: "Profile Editing",
    description:
      "Allow members to update their own profile information.",
    icon: Pencil,
  },
  {
    key: "showEmail",
    title: "Show Email Address",
    description:
      "Allow email addresses to appear on member profiles.",
    icon: Mail,
  },
  {
    key: "showPhone",
    title: "Show Phone Number",
    description:
      "Allow phone numbers to appear on member profiles.",
    icon: Phone,
  },
  {
    key: "showSocialLinks",
    title: "Show Social Links",
    description:
      "Display social media links on member profiles.",
    icon: Share2,
  },
  {
    key: "publicProfile",
    title: "Public Member Profile",
    description:
      "Allow members to have publicly accessible profiles.",
    icon: Globe2,
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
    title="Member Settings"
    description="Manage member approval, privacy and profile visibility."
    @save="save"
  >
    <div class="space-y-6">
      <!-- Overview -->
      <div
        class="flex items-center gap-4 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.03] p-5"
      >
        <div
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400"
        >
          <Users class="h-5 w-5" />
        </div>

        <div>
          <h3 class="font-medium text-white">
            Member Management
          </h3>

          <p class="mt-1 text-sm text-slate-400">
            Configure how member accounts and public profiles behave.
          </p>
        </div>
      </div>

      <!-- Settings -->
      <div class="divide-y divide-white/10">
        <div
          v-for="item in memberSettings"
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
            <h3 class="text-sm font-medium text-white">
              {{ item.title }}
            </h3>

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
  </SettingsSection>
</template>