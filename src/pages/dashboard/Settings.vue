<script setup>
import { computed, onMounted, ref } from "vue";
import {
  Settings as SettingsIcon,
  RotateCcw,
} from "@lucide/vue";

import SettingsSidebar from "@/components/dashboard/settings/SettingsSidebar.vue";

import AccountSettings from "@/components/dashboard/settings/AccountSettings.vue";
import SecuritySettings from "@/components/dashboard/settings/SecuritySettings.vue";
import NotificationSettings from "@/components/dashboard/settings/NotificationSettings.vue";
import AppearanceSettings from "@/components/dashboard/settings/AppearanceSettings.vue";
import OrganizationSettings from "@/components/dashboard/settings/OrganizationSettings.vue";

import EmailSettings from "@/components/dashboard/settings/EmailSettings.vue";
import EventSettings from "@/components/dashboard/settings/EventSettings.vue";
import MemberSettings from "@/components/dashboard/settings/MemberSettings.vue";
import MediaSettings from "@/components/dashboard/settings/MediaSettings.vue";
import SystemSettings from "@/components/dashboard/settings/SystemSettings.vue";


import {
  getSettings,
  saveSettings,
  resetSettings,
} from "@/composables/settingsService";

const activeSection = ref("account");

const settings = ref(null);

const sectionComponents = {
  account: AccountSettings,
  security: SecuritySettings,
  notifications: NotificationSettings,
  appearance: AppearanceSettings,
  organization: OrganizationSettings,

   email: EmailSettings,
  events: EventSettings,
  members: MemberSettings,
  media: MediaSettings,
  system: SystemSettings,


};

const activeComponent = computed(() => {
  return sectionComponents[activeSection.value];
});

onMounted(() => {
  settings.value = getSettings();
});

function updateSection(section, value) {
  if (!settings.value) return;

  settings.value[section] = {
    ...value,
  };
}

function saveSection(section) {
  if (!settings.value) return;

  saveSettings(settings.value);

  console.log(`${section} settings saved.`);
}

function resetAllSettings() {
  const confirmed = window.confirm(
    "Are you sure you want to reset all settings?"
  );

  if (!confirmed) return;

  settings.value = resetSettings();
}
</script>

<template>
  <div class="relative min-h-full overflow-hidden">
    <!-- Decorative background -->
    <div
      class="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"
    />

    <div
      class="pointer-events-none absolute -right-32 top-40 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl"
    />

    <!-- Header -->
    <div
      class="relative mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        <div class="flex items-center gap-3">
          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-400"
          >
            <SettingsIcon class="h-5 w-5" />
          </div>

          <div>
            <h1 class="text-2xl font-bold tracking-tight text-white">
              Settings
            </h1>

            <p class="mt-1 text-sm text-slate-400">
              Manage your account, preferences and dashboard configuration.
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        @click="resetAllSettings"
        class="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/4 px-4 py-2.5 text-sm font-medium text-slate-400 transition hover:border-red-400/20 hover:bg-red-400/5 hover:text-red-400"
      >
        <RotateCcw class="h-4 w-4" />
        Reset Settings
      </button>
    </div>

    <!-- Content -->
    <div
      v-if="settings"
      class="relative grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]"
    >
      <!-- Sidebar -->
      <SettingsSidebar
        :active-section="activeSection"
        @change="activeSection = $event"
      />

      <!-- Content -->
      <main class="min-w-0">
        <component
          :is="activeComponent"
          :model-value="settings[activeSection]"
          @update:model-value="
            updateSection(activeSection, $event)
          "
          @save="saveSection(activeSection)"
        />
      </main>
    </div>

    <!-- Loading -->
    <div
      v-else
      class="flex min-h-80 items-center justify-center"
    >
      <div class="text-sm text-slate-500">
        Loading settings...
      </div>
    </div>
  </div>
</template>