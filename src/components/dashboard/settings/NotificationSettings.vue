<script setup>
import { ref } from "vue";
import {
  UserPlus,
  CalendarCheck,
  MessageSquare,
  Users,
  Image,
  BellRing,
  Mail,
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

const notificationItems = [
  {
    key: "newMember",
    title: "New Member Registration",
    description: "Get notified when a new member registers.",
    icon: UserPlus,
  },
  {
    key: "eventRegistration",
    title: "Event Registration",
    description: "Get notified when someone registers for an event.",
    icon: CalendarCheck,
  },
  {
    key: "newMessage",
    title: "New Messages",
    description: "Receive alerts for incoming messages.",
    icon: MessageSquare,
  },
  {
    key: "committeeUpdate",
    title: "Committee Updates",
    description: "Get notified about committee changes.",
    icon: Users,
  },
  {
    key: "galleryUpdate",
    title: "Gallery Updates",
    description: "Receive notifications about gallery activity.",
    icon: Image,
  },
  {
    key: "systemNotification",
    title: "System Notifications",
    description: "Important system and dashboard notifications.",
    icon: BellRing,
  },
  {
    key: "emailNotification",
    title: "Email Notifications",
    description: "Receive important notifications through email.",
    icon: Mail,
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
    title="Notifications"
    description="Choose which notifications you want to receive."
    @save="save"
  >
    <div class="divide-y divide-white/10">
      <div
        v-for="item in notificationItems"
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
          @click="form[item.key] = !form[item.key]"
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
  </SettingsSection>
</template>