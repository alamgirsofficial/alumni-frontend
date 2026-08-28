<script setup>
import { ref } from "vue";
import {
  Settings2,
  Database,
  Activity,
  RefreshCw,
  Download,
  Trash2,
  AlertTriangle,
  ShieldCheck,
  Server,
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

function save() {
  emit("update:modelValue", {
    ...form.value,
  });

  emit("save");
}

function exportData() {
  const data = {
    exportedAt: new Date().toISOString(),
    settings: form.value,
  };

  const blob = new Blob(
    [JSON.stringify(data, null, 2)],
    {
      type: "application/json",
    }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "alumni-system-settings.json";

  link.click();

  URL.revokeObjectURL(url);
}

function clearCache() {
  const confirmed = window.confirm(
    "Are you sure you want to clear the application cache?"
  );

  if (!confirmed) return;

  localStorage.removeItem("alumni_dashboard_cache");

  alert("Application cache cleared.");
}

function clearLocalData() {
  const confirmed = window.confirm(
    "This will remove locally stored application data. Continue?"
  );

  if (!confirmed) return;

  const settings = localStorage.getItem(
    "alumni_dashboard_settings"
  );

  localStorage.clear();

  if (settings) {
    localStorage.setItem(
      "alumni_dashboard_settings",
      settings
    );
  }

  alert("Local application data cleared.");
}
</script>

<template>
  <div class="space-y-6">
    <!-- General System -->
    <SettingsSection
      title="System Settings"
      description="Manage system behavior, data and application preferences."
      @save="save"
    >
      <div class="space-y-6">
        <!-- System Status -->
        <div
          class="grid gap-4 sm:grid-cols-2"
        >
          <div
            class="rounded-2xl border border-white/10 bg-black/10 p-5"
          >
            <div class="flex items-center gap-3">
              <div
                class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400"
              >
                <Server class="h-5 w-5" />
              </div>

              <div>
                <p class="text-xs text-slate-500">
                  System Status
                </p>

                <p class="mt-1 text-sm font-semibold text-emerald-400">
                  Operational
                </p>
              </div>
            </div>
          </div>

          <div
            class="rounded-2xl border border-white/10 bg-black/10 p-5"
          >
            <div class="flex items-center gap-3">
              <div
                class="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400"
              >
                <ShieldCheck class="h-5 w-5" />
              </div>

              <div>
                <p class="text-xs text-slate-500">
                  Security
                </p>

                <p class="mt-1 text-sm font-semibold text-white">
                  Protected
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Maintenance -->
        <div
          class="flex items-center justify-between rounded-xl border border-white/10 bg-black/10 p-4"
        >
          <div class="flex items-center gap-3">
            <Settings2 class="h-5 w-5 text-cyan-400" />

            <div>
              <p class="text-sm font-medium text-white">
                Maintenance Mode
              </p>

              <p class="text-xs text-slate-500">
                Temporarily disable public system access.
              </p>
            </div>
          </div>

          <button
            type="button"
            @click="
              form.maintenanceMode =
                !form.maintenanceMode
            "
            class="relative h-6 w-11 rounded-full transition"
            :class="
              form.maintenanceMode
                ? 'bg-cyan-500'
                : 'bg-slate-700'
            "
          >
            <span
              class="absolute top-1 h-4 w-4 rounded-full bg-white shadow transition"
              :class="
                form.maintenanceMode
                  ? 'left-6'
                  : 'left-1'
              "
            />
          </button>
        </div>

        <!-- Auto Backup -->
        <div
          class="flex items-center justify-between rounded-xl border border-white/10 bg-black/10 p-4"
        >
          <div class="flex items-center gap-3">
            <Database class="h-5 w-5 text-cyan-400" />

            <div>
              <p class="text-sm font-medium text-white">
                Automatic Backup
              </p>

              <p class="text-xs text-slate-500">
                Automatically backup important system data.
              </p>
            </div>
          </div>

          <button
            type="button"
            @click="
              form.autoBackup = !form.autoBackup
            "
            class="relative h-6 w-11 rounded-full transition"
            :class="
              form.autoBackup
                ? 'bg-cyan-500'
                : 'bg-slate-700'
            "
          >
            <span
              class="absolute top-1 h-4 w-4 rounded-full bg-white shadow transition"
              :class="
                form.autoBackup
                  ? 'left-6'
                  : 'left-1'
              "
            />
          </button>
        </div>

        <!-- Activity Log -->
        <div
          class="flex items-center justify-between rounded-xl border border-white/10 bg-black/10 p-4"
        >
          <div class="flex items-center gap-3">
            <Activity class="h-5 w-5 text-cyan-400" />

            <div>
              <p class="text-sm font-medium text-white">
                Activity Log
              </p>

              <p class="text-xs text-slate-500">
                Keep track of important admin activities.
              </p>
            </div>
          </div>

          <button
            type="button"
            @click="
              form.activityLog = !form.activityLog
            "
            class="relative h-6 w-11 rounded-full transition"
            :class="
              form.activityLog
                ? 'bg-cyan-500'
                : 'bg-slate-700'
            "
          >
            <span
              class="absolute top-1 h-4 w-4 rounded-full bg-white shadow transition"
              :class="
                form.activityLog
                  ? 'left-6'
                  : 'left-1'
              "
            />
          </button>
        </div>

        <!-- Cache -->
        <div
          class="flex items-center justify-between rounded-xl border border-white/10 bg-black/10 p-4"
        >
          <div class="flex items-center gap-3">
            <RefreshCw class="h-5 w-5 text-cyan-400" />

            <div>
              <p class="text-sm font-medium text-white">
                Application Cache
              </p>

              <p class="text-xs text-slate-500">
                Enable local caching for better performance.
              </p>
            </div>
          </div>

          <button
            type="button"
            @click="
              form.cacheEnabled =
                !form.cacheEnabled
            "
            class="relative h-6 w-11 rounded-full transition"
            :class="
              form.cacheEnabled
                ? 'bg-cyan-500'
                : 'bg-slate-700'
            "
          >
            <span
              class="absolute top-1 h-4 w-4 rounded-full bg-white shadow transition"
              :class="
                form.cacheEnabled
                  ? 'left-6'
                  : 'left-1'
              "
            />
          </button>
        </div>
      </div>
    </SettingsSection>

    <!-- Data Management -->
    <SettingsSection
      title="Data Management"
      description="Export, cache and local application data management."
      :show-save="false"
    >
      <div class="grid gap-4 md:grid-cols-3">
        <!-- Export -->
        <button
          type="button"
          @click="exportData"
          class="group rounded-2xl border border-white/10 bg-black/10 p-5 text-left transition hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-cyan-400/[0.03]"
        >
          <div
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400 transition group-hover:bg-cyan-400/20"
          >
            <Download class="h-5 w-5" />
          </div>

          <h3 class="mt-4 text-sm font-semibold text-white">
            Export Settings
          </h3>

          <p class="mt-1 text-xs leading-5 text-slate-500">
            Download your current settings as a JSON file.
          </p>

          <span
            class="mt-4 inline-block text-xs font-medium text-cyan-400"
          >
            Export Data →
          </span>
        </button>

        <!-- Cache -->
        <button
          type="button"
          @click="clearCache"
          class="group rounded-2xl border border-white/10 bg-black/10 p-5 text-left transition hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-cyan-400/[0.03]"
        >
          <div
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400"
          >
            <RefreshCw class="h-5 w-5" />
          </div>

          <h3 class="mt-4 text-sm font-semibold text-white">
            Clear Cache
          </h3>

          <p class="mt-1 text-xs leading-5 text-slate-500">
            Clear temporary application cache.
          </p>

          <span
            class="mt-4 inline-block text-xs font-medium text-cyan-400"
          >
            Clear Cache →
          </span>
        </button>

        <!-- Local Data -->
        <button
          type="button"
          @click="clearLocalData"
          class="group rounded-2xl border border-red-400/10 bg-red-400/[0.02] p-5 text-left transition hover:-translate-y-0.5 hover:border-red-400/30 hover:bg-red-400/[0.05]"
        >
          <div
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-red-400/10 text-red-400"
          >
            <Trash2 class="h-5 w-5" />
          </div>

          <h3 class="mt-4 text-sm font-semibold text-white">
            Clear Local Data
          </h3>

          <p class="mt-1 text-xs leading-5 text-slate-500">
            Remove locally stored application data.
          </p>

          <span
            class="mt-4 inline-block text-xs font-medium text-red-400"
          >
            Clear Data →
          </span>
        </button>
      </div>
    </SettingsSection>

    <!-- Danger Zone -->
    <section
      class="overflow-hidden rounded-2xl border border-red-400/20 bg-red-400/[0.025] shadow-xl shadow-black/10 backdrop-blur-xl"
    >
      <div
        class="border-b border-red-400/10 px-5 py-5 sm:px-6"
      >
        <div class="flex items-center gap-3">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-red-400/10 text-red-400"
          >
            <AlertTriangle class="h-5 w-5" />
          </div>

          <div>
            <h2 class="text-base font-semibold text-red-300">
              Danger Zone
            </h2>

            <p class="mt-1 text-sm text-slate-500">
              These actions can affect locally stored application data.
            </p>
          </div>
        </div>
      </div>

      <div
        class="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
      >
        <div>
          <h3 class="text-sm font-semibold text-white">
            Clear All Local Application Data
          </h3>

          <p class="mt-1 max-w-xl text-xs leading-5 text-slate-500">
            This action removes locally stored application data.
            Backend/database data will not be affected.
          </p>
        </div>

        <button
          type="button"
          @click="clearLocalData"
          class="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-400/15"
        >
          <Trash2 class="h-4 w-4" />
          Clear Local Data
        </button>
      </div>
    </section>
  </div>
</template>