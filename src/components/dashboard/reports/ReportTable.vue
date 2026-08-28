<script setup>
import {
  Eye,
  Download,
  FileText,
} from "@lucide/vue";

defineProps({
  reports: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits([
  "view",
  "download",
]);
</script>

<template>
  <div
    class="overflow-hidden rounded-2xl border border-white/10 bg-white/3"
  >
    <!-- Header -->
    <div
      class="flex flex-col gap-3 border-b border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h3 class="text-sm font-semibold text-white">
          Recent Reports
        </h3>

        <p class="mt-1 text-xs text-slate-500">
          Recently generated reports
        </p>
      </div>

      <span class="text-xs text-slate-600">
        {{ reports.length }} reports
      </span>
    </div>

    <!-- Desktop -->
    <div class="hidden overflow-x-auto md:block">
      <table class="w-full min-w-175">

        <thead class="border-b border-white/10 bg-white/5">
          <tr>
            <th
              class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
            >
              Report
            </th>

            <th
              class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
            >
              Category
            </th>

            <th
              class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
            >
              Period
            </th>

            <th
              class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
            >
              Status
            </th>

            <th
              class="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500"
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-white/5">
          <tr
            v-for="report in reports"
            :key="report.id"
            class="transition-colors duration-200 hover:bg-white/3"
          >
            <!-- Report -->
            <td class="px-5 py-4">
              <div class="flex items-center gap-3">
                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400"
                >
                  <FileText :size="17" />
                </div>

                <div class="min-w-0">
                  <p
                    class="truncate text-sm font-semibold text-white"
                  >
                    {{ report.name }}
                  </p>

                  <p class="mt-1 text-xs text-slate-600">
                    Generated {{ report.generatedAt }}
                  </p>
                </div>
              </div>
            </td>

            <!-- Category -->
            <td class="px-5 py-4">
              <span class="text-sm text-slate-400">
                {{ report.category }}
              </span>
            </td>

            <!-- Period -->
            <td class="px-5 py-4">
              <span class="text-sm text-slate-400">
                {{ report.period }}
              </span>
            </td>

            <!-- Status -->
            <td class="px-5 py-4">
              <span
                class="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400"
              >
                <span
                  class="h-1.5 w-1.5 rounded-full bg-emerald-400"
                ></span>

                {{ report.status }}
              </span>
            </td>

            <!-- Actions -->
            <td class="px-5 py-4">
              <div class="flex items-center justify-end gap-1">

                <button
                  type="button"
                  title="View Report"
                  class="rounded-lg p-2 text-slate-500 transition hover:bg-blue-500/10 hover:text-blue-400"
                  @click="emit('view', report)"
                >
                  <Eye :size="16" />
                </button>

                <button
                  type="button"
                  title="Download Report"
                  class="rounded-lg p-2 text-slate-500 transition hover:bg-cyan-500/10 hover:text-cyan-400"
                  @click="emit('download', report)"
                >
                  <Download :size="16" />
                </button>

              </div>
            </td>
          </tr>

          <!-- Empty -->
          <tr v-if="reports.length === 0">
            <td
              colspan="5"
              class="px-4 py-12 text-center"
            >
              <div class="flex flex-col items-center">
                <div
                  class="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-slate-600"
                >
                  <FileText :size="21" />
                </div>

                <p class="mt-4 text-sm font-medium text-white">
                  No reports found
                </p>

                <p class="mt-1 text-xs text-slate-600">
                  Try changing your search or filters.
                </p>
              </div>
            </td>
          </tr>
        </tbody>

      </table>
    </div>

    <!-- Mobile -->
    <div class="divide-y divide-white/5 md:hidden">
      <div
        v-for="report in reports"
        :key="report.id"
        class="p-4"
      >
        <div class="flex items-start gap-3">

          <div
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400"
          >
            <FileText :size="17" />
          </div>

          <div class="min-w-0 flex-1">
            <p
              class="truncate text-sm font-semibold text-white"
            >
              {{ report.name }}
            </p>

            <p class="mt-1 text-xs text-slate-500">
              {{ report.category }}
              ·
              {{ report.period }}
            </p>

            <span
              class="mt-2 inline-flex rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium text-emerald-400"
            >
              {{ report.status }}
            </span>
          </div>

          <div class="flex gap-1">
            <button
              type="button"
              class="rounded-lg p-2 text-slate-500 hover:bg-blue-500/10 hover:text-blue-400"
              @click="emit('view', report)"
            >
              <Eye :size="16" />
            </button>

            <button
              type="button"
              class="rounded-lg p-2 text-slate-500 hover:bg-cyan-500/10 hover:text-cyan-400"
              @click="emit('download', report)"
            >
              <Download :size="16" />
            </button>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>