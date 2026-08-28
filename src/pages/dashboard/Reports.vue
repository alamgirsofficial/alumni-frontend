<script setup>
import {
  computed,
  reactive,
  ref,
} from "vue";

import {
  FileBarChart,
  Download,
  RefreshCw,
  FileText,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "@lucide/vue";

import ReportSummaryCards from "@/components/dashboard/reports/ReportSummaryCards.vue";
import ReportFilters from "@/components/dashboard/reports/ReportFilters.vue";
import ReportOverviewChart from "@/components/dashboard/reports/ReportOverviewChart.vue";
import ReportCategoryCard from "@/components/dashboard/reports/ReportCategoryCard.vue";
import ReportTable from "@/components/dashboard/reports/ReportTable.vue";

import { reportTypes } from "@/constants/reportTypes.js";
import { useReports } from "@/composables/useReports.js";

const {
  summary,
  monthlyData,
  reports,
  eventStatistics,
} = useReports();

/*
|--------------------------------------------------------------------------
| State
|--------------------------------------------------------------------------
*/

const filters = reactive({
  search: "",
  type: "",
  from: "",
  to: "",
});

const appliedFilters = ref({
  search: "",
  type: "",
  from: "",
  to: "",
});

const currentPage = ref(1);
const perPage = ref(5);

/*
|--------------------------------------------------------------------------
| Filter
|--------------------------------------------------------------------------
*/

const filteredReports = computed(() => {
  const search = appliedFilters.value.search
    .toLowerCase()
    .trim();

  return reports.value.filter((report) => {
    const matchesSearch =
      !search ||
      report.name.toLowerCase().includes(search) ||
      report.category.toLowerCase().includes(search);

    const matchesType =
      !appliedFilters.value.type ||
      report.type === appliedFilters.value.type;

    return matchesSearch && matchesType;
  });
});

/*
|--------------------------------------------------------------------------
| Pagination
|--------------------------------------------------------------------------
*/

const totalPages = computed(() => {
  return Math.ceil(
    filteredReports.value.length / perPage.value
  );
});

const paginatedReports = computed(() => {
  const start =
    (currentPage.value - 1) * perPage.value;

  return filteredReports.value.slice(
    start,
    start + perPage.value
  );
});

const startItem = computed(() => {
  if (filteredReports.value.length === 0) {
    return 0;
  }

  return (
    (currentPage.value - 1) *
      perPage.value +
    1
  );
});

const endItem = computed(() => {
  return Math.min(
    currentPage.value * perPage.value,
    filteredReports.value.length
  );
});

/*
|--------------------------------------------------------------------------
| Actions
|--------------------------------------------------------------------------
*/

const applyFilters = () => {
  appliedFilters.value = {
    ...filters,
  };

  currentPage.value = 1;
};

const resetFilters = () => {
  Object.assign(filters, {
    search: "",
    type: "",
    from: "",
    to: "",
  });

  appliedFilters.value = {
    search: "",
    type: "",
    from: "",
    to: "",
  };

  currentPage.value = 1;
};

const refreshReports = () => {
  resetFilters();

  console.log("Reports refreshed");
};

const goToPage = (page) => {
  if (
    page < 1 ||
    page > totalPages.value
  ) {
    return;
  }

  currentPage.value = page;
};

const previousPage = () => {
  goToPage(currentPage.value - 1);
};

const nextPage = () => {
  goToPage(currentPage.value + 1);
};

/*
|--------------------------------------------------------------------------
| Report Actions
|--------------------------------------------------------------------------
*/

const viewReport = (report) => {
  console.log("View Report:", report);

  /*
   * Later:
   *
   * router.push({
   *   name: "ReportDetails",
   *   params: {
   *     type: report.type,
   *   },
   * });
   */
};

const downloadReport = (report) => {
  console.log("Download Report:", report);

  /*
   * Later Laravel API:
   *
   * GET /api/admin/reports/{type}/export
   */
};

const exportReport = () => {
  console.log(
    "Export Report:",
    appliedFilters.value
  );

  /*
   * Later:
   *
   * API request based on filters.
   */
};
</script>

<template>
  <div class="space-y-6 pb-8">

    <!-- ================================================= -->
    <!-- Page Header -->
    <!-- ================================================= -->

    <div
      class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <div class="flex items-center gap-2">

          <FileBarChart
            :size="22"
            class="text-blue-400"
          />

          <h1
            class="text-2xl font-bold tracking-tight text-white"
          >
            Reports

            <span class="text-blue-400">
              : {{ filteredReports.length }}
            </span>
          </h1>
        </div>

        <p class="mt-1 text-sm text-slate-400">
          Analyze members, events, registrations and
          financial activities.
        </p>
      </div>

      <div class="flex items-center gap-2">

        <!-- Refresh -->
        <button
          type="button"
          class="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
          @click="refreshReports"
        >
          <RefreshCw :size="16" />

          <span class="hidden sm:inline">
            Refresh
          </span>
        </button>

        <!-- Export -->
        <button
          type="button"
          class="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-500 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:scale-[1.02] hover:shadow-blue-500/30"
          @click="exportReport"
        >
          <Download :size="17" />

          <span>
            Export Report
          </span>
        </button>

      </div>
    </div>

    <!-- ================================================= -->
    <!-- Summary -->
    <!-- ================================================= -->

    <ReportSummaryCards
      :summary="summary"
    />

    <!-- ================================================= -->
    <!-- Filters -->
    <!-- ================================================= -->

    <ReportFilters
      v-model="filters"
      @apply="applyFilters"
      @reset="resetFilters"
    />

    <!-- ================================================= -->
    <!-- Analytics -->
    <!-- ================================================= -->

    <div
      class="grid grid-cols-1 gap-4 xl:grid-cols-3"
    >

      <!-- Chart -->
      <div class="xl:col-span-2">
        <ReportOverviewChart
          :data="monthlyData"
        />
      </div>

      <!-- Event Statistics -->
      <div
        class="rounded-2xl border border-white/10 bg-white/3 p-5"
      >
        <div class="flex items-center gap-3">

          <div
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400"
          >
            <FileBarChart :size="18" />
          </div>

          <div>
            <h3
              class="text-sm font-semibold text-white"
            >
              Event Statistics
            </h3>

            <p class="mt-1 text-xs text-slate-500">
              Current event overview
            </p>
          </div>

        </div>

        <div class="mt-6 space-y-4">

          <!-- Total -->
          <div
            class="flex items-center justify-between rounded-xl border border-white/5 bg-white/3 p-4"
          >
            <span class="text-sm text-slate-400">
              Total Events
            </span>

            <span class="text-lg font-bold text-white">
              {{ eventStatistics.total }}
            </span>
          </div>

          <!-- Completed -->
          <div
            class="flex items-center justify-between"
          >
            <div class="flex items-center gap-2">
              <span
                class="h-2 w-2 rounded-full bg-emerald-400"
              ></span>

              <span class="text-sm text-slate-400">
                Completed
              </span>
            </div>

            <span class="text-sm font-semibold text-white">
              {{ eventStatistics.completed }}
            </span>
          </div>

          <!-- Upcoming -->
          <div
            class="flex items-center justify-between"
          >
            <div class="flex items-center gap-2">
              <span
                class="h-2 w-2 rounded-full bg-yellow-400"
              ></span>

              <span class="text-sm text-slate-400">
                Upcoming
              </span>
            </div>

            <span class="text-sm font-semibold text-white">
              {{ eventStatistics.upcoming }}
            </span>
          </div>

          <!-- Cancelled -->
          <div
            class="flex items-center justify-between"
          >
            <div class="flex items-center gap-2">
              <span
                class="h-2 w-2 rounded-full bg-red-400"
              ></span>

              <span class="text-sm text-slate-400">
                Cancelled
              </span>
            </div>

            <span class="text-sm font-semibold text-white">
              {{ eventStatistics.cancelled }}
            </span>
          </div>

        </div>

        <!-- Completion -->
        <div
          class="mt-6 border-t border-white/5 pt-5"
        >
          <div
            class="flex items-center justify-between text-xs"
          >
            <span class="text-slate-500">
              Completion Rate
            </span>

            <span class="font-semibold text-cyan-400">
              {{
                Math.round(
                  (eventStatistics.completed /
                    eventStatistics.total) *
                    100
                )
              }}%
            </span>
          </div>

          <div
            class="mt-2 h-2 overflow-hidden rounded-full bg-slate-900"
          >
            <div
              class="h-full rounded-full bg-linear-to-r from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/20"
              :style="{
                width: `${
                  (eventStatistics.completed /
                    eventStatistics.total) *
                  100
                }%`,
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- ================================================= -->
    <!-- Report Categories -->
    <!-- ================================================= -->

    <div>

      <div
        class="mb-4 flex items-end justify-between"
      >
        <div>
          <h2
            class="text-sm font-semibold text-white"
          >
            Report Categories
          </h2>

          <p class="mt-1 text-xs text-slate-500">
            Select a category to view detailed reports.
          </p>
        </div>
      </div>

      <div
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <ReportCategoryCard
          v-for="report in reportTypes"
          :key="report.id"
          :report="report"
        />
      </div>

    </div>

    <!-- ================================================= -->
    <!-- Recent Reports -->
    <!-- ================================================= -->

    <ReportTable
      :reports="paginatedReports"
      @view="viewReport"
      @download="downloadReport"
    />

    <!-- ================================================= -->
    <!-- Pagination -->
    <!-- ================================================= -->

    <div
      v-if="filteredReports.length > 0"
      class="flex flex-col gap-4 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between"
    >

      <p class="text-xs text-slate-500">
        Showing

        <span class="font-medium text-slate-300">
          {{ startItem }}
        </span>

        -

        <span class="font-medium text-slate-300">
          {{ endItem }}
        </span>

        of

        <span class="font-medium text-slate-300">
          {{ filteredReports.length }}
        </span>

        reports
      </p>

      <div
        v-if="totalPages > 1"
        class="flex items-center gap-1"
      >

        <!-- Previous -->
        <button
          type="button"
          :disabled="currentPage === 1"
          class="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          @click="previousPage"
        >
          <ChevronLeft :size="15" />
        </button>

        <!-- Pages -->
        <button
          v-for="page in totalPages"
          :key="page"
          type="button"
          class="flex h-8 min-w-9 items-center justify-center rounded-lg px-2 text-xs font-medium transition"
          :class="
            currentPage === page
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
              : 'text-slate-400 hover:bg-white/5 hover:text-white'
          "
          @click="goToPage(page)"
        >
          {{ page }}
        </button>

        <!-- Next -->
        <button
          type="button"
          :disabled="currentPage === totalPages"
          class="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          @click="nextPage"
        >
          <ChevronRight :size="15" />
        </button>

      </div>
    </div>

  </div>
</template>