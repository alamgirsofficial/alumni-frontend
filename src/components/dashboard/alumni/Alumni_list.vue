<script setup>
import { computed, ref } from "vue";

import {
  Search,
  SlidersHorizontal,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  X,
} from "@lucide/vue";

import { users } from "@/constants/users.js";

// ==========================================
// State
// ==========================================

const searchQuery = ref("");
const selectedBatch = ref("all");
const selectedStatus = ref("all");

const currentPage = ref(1);
const perPage = ref(10);

// ==========================================
// Filter Options
// ==========================================

const batches = computed(() => {
  const uniqueBatches = [
    ...new Set(users.map((user) => user.batch)),
  ];

  return uniqueBatches.sort((a, b) => b - a);
});

// ==========================================
// Filtered Alumni
// ==========================================

const filteredAlumni = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();

  return users.filter((user) => {
    const matchesSearch =
      !query ||
      user.name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.phone?.toLowerCase().includes(query);

    const matchesBatch =
      selectedBatch.value === "all" ||
      String(user.batch) === String(selectedBatch.value);

    const matchesStatus =
      selectedStatus.value === "all" ||
      user.status?.toLowerCase() ===
        selectedStatus.value.toLowerCase();

    return (
      matchesSearch &&
      matchesBatch &&
      matchesStatus
    );
  });
});

// ==========================================
// Pagination
// ==========================================

const totalPages = computed(() =>
  Math.ceil(
    filteredAlumni.value.length / perPage.value
  )
);

const paginatedAlumni = computed(() => {
  const start =
    (currentPage.value - 1) * perPage.value;

  const end = start + perPage.value;

  return filteredAlumni.value.slice(start, end);
});

const startItem = computed(() => {
  if (filteredAlumni.value.length === 0) {
    return 0;
  }

  return (
    (currentPage.value - 1) * perPage.value + 1
  );
});

const endItem = computed(() => {
  return Math.min(
    currentPage.value * perPage.value,
    filteredAlumni.value.length
  );
});

// ==========================================
// Pagination Actions
// ==========================================

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

// ==========================================
// Search / Filter Reset
// ==========================================

const resetFilters = () => {
  searchQuery.value = "";
  selectedBatch.value = "all";
  selectedStatus.value = "all";
  currentPage.value = 1;
};

const changeFilter = () => {
  currentPage.value = 1;
};

// ==========================================
// Actions
// ==========================================

const viewAlumni = (user) => {
  console.log("View Alumni:", user);
};

const editAlumni = (user) => {
  console.log("Edit Alumni:", user);
};

const deleteAlumni = (user) => {
  const confirmed = confirm(
    `Are you sure you want to delete ${user.name}?`
  );

  if (!confirmed) return;

  console.log("Delete Alumni:", user);
};
</script>

<template>
  <div class="space-y-6">

    <!-- ==========================================
         Page Header
    =========================================== -->

    <div
      class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h1
          class="text-2xl font-bold tracking-tight text-white"
        >
          Alumni
        </h1>

        <p class="mt-1 text-sm text-slate-400">
          Manage all alumni members
        </p>
      </div>

      <!-- Add Alumni -->
      <button
        type="button"
        class="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:scale-[1.02] hover:shadow-blue-500/30"
      >
        <UserPlus :size="17" />

        <span>
          Add Alumni
        </span>
      </button>
    </div>

    <!-- ==========================================
         Stats
    =========================================== -->

    <div
      class="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
    >
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-slate-400">
            Total Alumni
          </p>

          <p
            class="mt-1 text-2xl font-bold text-white"
          >
            {{ filteredAlumni.length }}
          </p>
        </div>

        <div
          class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400"
        >
          <SlidersHorizontal :size="20" />
        </div>
      </div>
    </div>

    <!-- ==========================================
         Search & Filters
    =========================================== -->

    <div
      class="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
    >
      <div
        class="flex flex-col gap-3 lg:flex-row"
      >

        <!-- Search -->
        <div class="relative flex-1">
          <Search
            :size="18"
            class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by name, email or phone..."
            class="w-full rounded-xl border border-white/10 bg-slate-900/70 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
            @input="changeFilter"
          />
        </div>

        <!-- Batch -->
        <select
          v-model="selectedBatch"
          class="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-2.5 text-sm text-slate-300 outline-none transition focus:border-blue-500/50"
          @change="changeFilter"
        >
          <option value="all">
            All Batches
          </option>

          <option
            v-for="batch in batches"
            :key="batch"
            :value="batch"
          >
            Batch {{ batch }}
          </option>
        </select>

        <!-- Status -->
        <select
          v-model="selectedStatus"
          class="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-2.5 text-sm text-slate-300 outline-none transition focus:border-blue-500/50"
          @change="changeFilter"
        >
          <option value="all">
            All Status
          </option>

          <option value="active">
            Active
          </option>

          <option value="pending">
            Pending
          </option>

          <option value="inactive">
            Inactive
          </option>
        </select>

        <!-- Reset -->
        <button
          v-if="
            searchQuery ||
            selectedBatch !== 'all' ||
            selectedStatus !== 'all'
          "
          type="button"
          class="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
          @click="resetFilters"
        >
          <X :size="16" />

          Reset
        </button>

      </div>
    </div>

    <!-- ==========================================
         Alumni Table
    =========================================== -->

    <div
      class="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
    >
      <div class="overflow-x-auto">

        <table class="w-full min-w-[900px]">

          <!-- Table Header -->
          <thead
            class="border-b border-white/10 bg-white/[0.02]"
          >
            <tr>

              <th
                class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Alumni
              </th>

              <th
                class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Batch
              </th>

              <th
                class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Email
              </th>

              <th
                class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Phone
              </th>

              <th
                class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Status
              </th>

              <th
                class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Actions
              </th>

            </tr>
          </thead>

          <!-- Table Body -->
          <tbody
            class="divide-y divide-white/5"
          >

            <!-- Data -->
            <tr
              v-for="user in paginatedAlumni"
              :key="user.id"
              class="transition-colors duration-200 hover:bg-white/[0.025]"
            >

              <!-- Alumni -->
              <td class="px-6 py-4">

                <div class="flex items-center gap-3">

                  <!-- Avatar -->
                  <div
                    class="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-bold text-white"
                  >
                    <img
                      v-if="user.avatar"
                      :src="user.avatar"
                      :alt="user.name"
                      class="h-full w-full object-cover"
                    />

                    <span v-else>
                      {{
                        user.name
                          ?.charAt(0)
                          ?.toUpperCase()
                      }}
                    </span>
                  </div>

                  <div class="min-w-0">

                    <p
                      class="truncate text-sm font-semibold text-white"
                    >
                      {{ user.name }}
                    </p>

                    <p
                      class="text-xs text-slate-500"
                    >
                      ID: #{{ user.id }}
                    </p>

                  </div>

                </div>

              </td>

              <!-- Batch -->
              <td
                class="whitespace-nowrap px-6 py-4 text-sm text-slate-300"
              >
                {{ user.batch }}
              </td>

              <!-- Email -->
              <td
                class="whitespace-nowrap px-6 py-4 text-sm text-slate-400"
              >
                {{ user.email }}
              </td>

              <!-- Phone -->
              <td
                class="whitespace-nowrap px-6 py-4 text-sm text-slate-400"
              >
                {{ user.phone }}
              </td>

              <!-- Status -->
              <td class="px-6 py-4">

                <span
                  class="inline-flex rounded-full px-2.5 py-1 text-xs font-medium"
                  :class="{
                    'bg-emerald-500/10 text-emerald-400':
                      user.status?.toLowerCase() === 'active',

                    'bg-yellow-500/10 text-yellow-400':
                      user.status?.toLowerCase() === 'pending',

                    'bg-red-500/10 text-red-400':
                      user.status?.toLowerCase() === 'inactive',
                  }"
                >
                  {{ user.status }}
                </span>

              </td>

              <!-- Actions -->
              <td class="px-6 py-4">

                <div
                  class="flex items-center justify-end gap-1"
                >

                  <!-- View -->
                  <button
                    type="button"
                    title="View"
                    class="rounded-lg p-2 text-slate-500 transition hover:bg-blue-500/10 hover:text-blue-400"
                    @click="viewAlumni(user)"
                  >
                    <Eye :size="17" />
                  </button>

                  <!-- Edit -->
                  <button
                    type="button"
                    title="Edit"
                    class="rounded-lg p-2 text-slate-500 transition hover:bg-yellow-500/10 hover:text-yellow-400"
                    @click="editAlumni(user)"
                  >
                    <Pencil :size="17" />
                  </button>

                  <!-- Delete -->
                  <button
                    type="button"
                    title="Delete"
                    class="rounded-lg p-2 text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
                    @click="deleteAlumni(user)"
                  >
                    <Trash2 :size="17" />
                  </button>

                </div>

              </td>

            </tr>

            <!-- Empty State -->
            <tr
              v-if="paginatedAlumni.length === 0"
            >
              <td
                colspan="6"
                class="px-6 py-16 text-center"
              >
                <div
                  class="flex flex-col items-center"
                >
                  <div
                    class="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-slate-500"
                  >
                    <Search :size="20" />
                  </div>

                  <p
                    class="mt-4 text-sm font-medium text-white"
                  >
                    No alumni found
                  </p>

                  <p
                    class="mt-1 text-xs text-slate-500"
                  >
                    Try changing your search or filters.
                  </p>
                </div>
              </td>
            </tr>

          </tbody>
        </table>

      </div>

      <!-- ==========================================
           Pagination
      =========================================== -->

      <div
        class="flex flex-col gap-4 border-t border-white/10 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
      >

        <!-- Result Info -->
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
            {{ filteredAlumni.length }}
          </span>
          alumni
        </p>

        <!-- Pagination -->
        <div
          v-if="totalPages > 1"
          class="flex items-center gap-1"
        >

          <!-- Previous -->
          <button
            type="button"
            :disabled="currentPage === 1"
            class="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            @click="previousPage"
          >
            <ChevronLeft :size="17" />
          </button>

          <!-- Pages -->
          <button
            v-for="page in totalPages"
            :key="page"
            type="button"
            class="flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-xs font-medium transition"
            :class="
              currentPage === page
                ? 'bg-blue-500 text-white'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            "
            @click="goToPage(page)"
          >
            {{ page }}
          </button>

          <!-- Next -->
          <button
            type="button"
            :disabled="
              currentPage === totalPages
            "
            class="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            @click="nextPage"
          >
            <ChevronRight :size="17" />
          </button>

        </div>

      </div>
    </div>

  </div>
</template>