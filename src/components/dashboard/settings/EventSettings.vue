<script setup>
import { ref } from "vue";
import {
  CalendarDays,
  UserCheck,
  UsersRound,
  BellRing,
  CalendarClock,
  CircleX,
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

const eventSettings = [
  {
    key: "registrationEnabled",
    title: "Event Registration",
    description:
      "Allow members to register for upcoming events.",
    icon: CalendarDays,
  },
  {
    key: "approvalRequired",
    title: "Registration Approval",
    description:
      "Require admin approval before confirming registration.",
    icon: UserCheck,
  },
  {
    key: "multipleRegistration",
    title: "Multiple Event Registration",
    description:
      "Allow members to register for multiple events.",
    icon: UsersRound,
  },
  {
    key: "eventReminder",
    title: "Event Reminder",
    description:
      "Send reminders before an upcoming event.",
    icon: BellRing,
  },
  {
    key: "showPastEvents",
    title: "Show Past Events",
    description:
      "Display previous events in the event listing.",
    icon: CalendarClock,
  },
  {
    key: "allowCancellation",
    title: "Allow Registration Cancellation",
    description:
      "Allow members to cancel their event registration.",
    icon: CircleX,
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
    title="Event Settings"
    description="Control registration and event-related behavior."
    @save="save"
  >
    <div class="space-y-6">
      <!-- Event Status -->
      <div
        class="flex items-center justify-between rounded-2xl border border-white/10 bg-black/10 p-5"
      >
        <div class="flex items-start gap-4">
          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400"
          >
            <CalendarDays class="h-5 w-5" />
          </div>

          <div>
            <h3 class="font-medium text-white">
              Event Registration System
            </h3>

            <p class="mt-1 text-sm text-slate-400">
              Control how members interact with your events.
            </p>
          </div>
        </div>

        <span
          class="rounded-lg px-3 py-1.5 text-xs font-medium"
          :class="
            form.registrationEnabled
              ? 'bg-emerald-400/10 text-emerald-400'
              : 'bg-slate-700/50 text-slate-500'
          "
        >
          {{
            form.registrationEnabled
              ? "Enabled"
              : "Disabled"
          }}
        </span>
      </div>

      <!-- Settings -->
      <div class="divide-y divide-white/10">
        <div
          v-for="item in eventSettings"
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