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
  Plus,
  CalendarDays,
  MapPin,
  Clock3,
  Users,
  X,
  CheckCircle2,
  AlertCircle,
} from "@lucide/vue";

import { events } from "@/constants/events.js";

// ==========================================
// State
// ==========================================

const searchQuery = ref("");
const selectedStatus = ref("all");
const selectedRegistration = ref("all");

const currentPage = ref(1);
const perPage = ref(10);

const showDeleteModal = ref(false);
const selectedEvent = ref(null);

// ==========================================
// Status Options
// ==========================================

const statusOptions = [
  {
    value: "upcoming",
    label: "Upcoming",
  },
  {
    value: "completed",
    label: "Completed",
  },
];

// ==========================================
// Filtered Events
// ==========================================

const filteredEvents = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();

  return events.filter((event) => {
    // Search
    const matchesSearch =
      !query ||
      event.title?.toLowerCase().includes(query) ||
      event.location?.toLowerCase().includes(query) ||
      event.organizer?.toLowerCase().includes(query) ||
      event.slug?.toLowerCase().includes(query);

    // Status
    const matchesStatus =
      selectedStatus.value === "all" ||
      event.status?.toLowerCase() === selectedStatus.value;

    // Registration
    const matchesRegistration =
      selectedRegistration.value === "all" ||
      (selectedRegistration.value === "open" &&
        event.registration_open === true) ||
      (selectedRegistration.value === "closed" &&
        event.registration_open === false);

    return matchesSearch && matchesStatus && matchesRegistration;
  });
});

// ==========================================
// Statistics
// ==========================================

const totalEvents = computed(() => events.length);

const upcomingEvents = computed(() => {
  return events.filter((event) => event.status?.toLowerCase() === "upcoming")
    .length;
});

const completedEvents = computed(() => {
  return events.filter((event) => event.status?.toLowerCase() === "completed")
    .length;
});

const registrationOpenEvents = computed(() => {
  return events.filter((event) => event.registration_open === true).length;
});

// ==========================================
// Pagination
// ==========================================

const totalPages = computed(() => {
  return Math.ceil(filteredEvents.value.length / perPage.value);
});

const paginatedEvents = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;

  const end = start + perPage.value;

  return filteredEvents.value.slice(start, end);
});

const startItem = computed(() => {
  if (filteredEvents.value.length === 0) {
    return 0;
  }

  return (currentPage.value - 1) * perPage.value + 1;
});

const endItem = computed(() => {
  return Math.min(
    currentPage.value * perPage.value,
    filteredEvents.value.length,
  );
});

// ==========================================
// Pagination Actions
// ==========================================

const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) {
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
// Search / Filter
// ==========================================

const changeFilter = () => {
  currentPage.value = 1;
};

const resetFilters = () => {
  searchQuery.value = "";
  selectedStatus.value = "all";
  selectedRegistration.value = "all";

  currentPage.value = 1;
};

// ==========================================
// Helpers
// ==========================================

const formatDate = (date) => {
  if (!date) return "—";

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (time) => {
  if (!time) return "—";

  const [hours, minutes] = time.split(":");

  const hour = Number(hours);

  const suffix = hour >= 12 ? "PM" : "AM";

  const formattedHour = hour % 12 || 12;

  return `${formattedHour}:${minutes} ${suffix}`;
};

const statusLabel = (status) => {
  if (status === "upcoming") {
    return "Upcoming";
  }

  if (status === "completed") {
    return "Completed";
  }

  return status || "Unknown";
};

// ==========================================
// Actions
// ==========================================

const viewEvent = (event) => {
  console.log("View Event:", event);

  // Later:
  // router.push({
  //     name: "events.show",
  //     params: { id: event.id },
  // });
};

const editEvent = (event) => {
  console.log("Edit Event:", event);

  // Later:
  // router.push({
  //     name: "events.edit",
  //     params: { id: event.id },
  // });
};

const viewRegistrations = (event) => {
  console.log("Event Registrations:", event);

  // Later:
  // router.push({
  //     name: "events.registrations",
  //     params: { id: event.id },
  // });
};

// ==========================================
// Delete Modal
// ==========================================

const openDeleteModal = (event) => {
  selectedEvent.value = event;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  selectedEvent.value = null;
  showDeleteModal.value = false;
};

const deleteEvent = () => {
  if (!selectedEvent.value) {
    return;
  }

  console.log("Delete Event:", selectedEvent.value);

  // Backend connect করলে এখানে API call করবে.
  //
  // Example:
  //
  // await axios.delete(
  //     `/api/events/${selectedEvent.value.id}`,
  // );

  closeDeleteModal();
};
</script>

<template>
  <div class="space-y-6">
    <!-- ========================================== -->
    <!-- Page Header -->
    <!-- ========================================== -->

    <div
      class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <div class="flex items-center gap-2">
          <CalendarDays :size="22" class="text-blue-400" />

          <h1 class="text-2xl font-bold tracking-tight text-white">
            Total Events
            <span class="text-blue-400"> : {{ filteredEvents.length }} </span>
          </h1>
        </div>

        <p class="mt-1 text-sm text-slate-400">
          Manage all alumni events, registrations and activities
        </p>
      </div>

      <!-- Create Event -->

      <RouterLink
        :to="{ name: 'EventCreate' }"
        class="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-500 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:scale-[1.02] hover:shadow-blue-500/30"
      >
        <Plus :size="17" />

        <span>Create Event</span>
      </RouterLink>
    </div>

    <!-- ========================================== -->
    <!-- Statistics -->
    <!-- ========================================== -->

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <!-- Total Events -->

      <div class="rounded-2xl border border-white/10 bg-white/3 p-5">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-slate-400">Total Events</p>

            <h2 class="mt-2 text-2xl font-bold text-white">
              {{ totalEvents }}
            </h2>
          </div>

          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400"
          >
            <CalendarDays :size="20" />
          </div>
        </div>
      </div>

      <!-- Upcoming -->

      <div class="rounded-2xl border border-white/10 bg-white/3 p-5">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-slate-400">Upcoming</p>

            <h2 class="mt-2 text-2xl font-bold text-white">
              {{ upcomingEvents }}
            </h2>
          </div>

          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400"
          >
            <Clock3 :size="20" />
          </div>
        </div>
      </div>

      <!-- Completed -->

      <div class="rounded-2xl border border-white/10 bg-white/3 p-5">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-slate-400">Completed</p>

            <h2 class="mt-2 text-2xl font-bold text-white">
              {{ completedEvents }}
            </h2>
          </div>

          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400"
          >
            <CheckCircle2 :size="20" />
          </div>
        </div>
      </div>

      <!-- Registration -->

      <div class="rounded-2xl border border-white/10 bg-white/3 p-5">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-slate-400">Registration Open</p>

            <h2 class="mt-2 text-2xl font-bold text-white">
              {{ registrationOpenEvents }}
            </h2>
          </div>

          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400"
          >
            <Users :size="20" />
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- Search & Filters -->
    <!-- ========================================== -->

    <div class="rounded-2xl border border-white/10 bg-white/3 p-4">
      <div class="flex flex-col gap-3 lg:flex-row">
        <!-- Search -->

        <div class="relative flex-1">
          <Search
            :size="18"
            class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by event name, location or organizer..."
            class="w-full rounded-xl border border-white/10 bg-slate-900/70 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
            @input="changeFilter"
          />
        </div>

        <!-- Status -->

        <select
          v-model="selectedStatus"
          class="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-2.5 text-sm text-slate-300 outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
          @change="changeFilter"
        >
          <option value="all">All Status</option>

          <option
            v-for="status in statusOptions"
            :key="status.value"
            :value="status.value"
          >
            {{ status.label }}
          </option>
        </select>

        <!-- Registration -->

        <select
          v-model="selectedRegistration"
          class="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-2.5 text-sm text-slate-300 outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
          @change="changeFilter"
        >
          <option value="all">All Registration</option>

          <option value="open">Registration Open</option>

          <option value="closed">Registration Closed</option>
        </select>

        <!-- Reset -->

        <button
          v-if="
            searchQuery ||
            selectedStatus !== 'all' ||
            selectedRegistration !== 'all'
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

    <!-- ========================================== -->
    <!-- Event Table -->
    <!-- ========================================== -->

    <div class="overflow-hidden rounded-2xl border border-white/10 bg-white/3">
      <div class="overflow-x-auto">
        <table class="w-full min-w-275">
          <!-- Table Header -->

          <thead class="border-b border-white/10 bg-white/8">
            <tr>
              <th
                class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                #
              </th>

              <th
                class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Event
              </th>

              <th
                class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Date & Time
              </th>

              <th
                class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Location
              </th>

              <th
                class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Status
              </th>

              <th
                class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Registration
              </th>

              <th
                class="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Actions
              </th>
            </tr>
          </thead>

          <!-- Table Body -->

          <tbody class="divide-y divide-white/5">
            <tr
              v-for="(event, index) in paginatedEvents"
              :key="event.id"
              class="transition-colors duration-200 hover:bg-white/3"
            >
              <!-- Serial -->

              <td class="px-3 py-3 text-sm text-slate-500">
                {{ (currentPage - 1) * perPage + index + 1 }}
              </td>

              <!-- Event -->

              <td class="px-3 py-3">
                <div class="flex items-center gap-3">
                  <!-- Image -->

                  <div
                    class="h-12 w-16 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-slate-900"
                  >
                    <img
                      v-if="event.image"
                      :src="event.image"
                      :alt="event.title"
                      class="h-full w-full object-cover"
                    />

                    <div
                      v-else
                      class="flex h-full w-full items-center justify-center text-slate-600"
                    >
                      <CalendarDays :size="20" />
                    </div>
                  </div>

                  <!-- Event Info -->

                  <div class="min-w-0 max-w-70">
                    <p class="truncate text-sm font-semibold text-white">
                      {{ event.title }}
                    </p>

                    <p class="mt-1 truncate text-xs text-slate-500">
                      {{ event.organizer }}
                    </p>
                  </div>
                </div>
              </td>

              <!-- Date & Time -->

              <td class="px-3 py-3">
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <CalendarDays :size="14" class="text-blue-400" />

                    <span class="whitespace-nowrap text-sm text-slate-300">
                      {{ formatDate(event.event_date) }}
                    </span>
                  </div>

                  <div class="flex items-center gap-2">
                    <Clock3 :size="14" class="text-slate-500" />

                    <span class="text-xs text-slate-500">
                      {{ formatTime(event.event_time) }}

                      <span v-if="event.duration">
                        ·
                        {{ event.duration }}
                      </span>
                    </span>
                  </div>
                </div>
              </td>

              <!-- Location -->

              <td class="px-3 py-3">
                <div class="flex max-w-45 items-start gap-2">
                  <MapPin :size="15" class="mt-0.5 shrink-0 text-slate-500" />

                  <span class="line-clamp-2 text-sm text-slate-400">
                    {{ event.location }}
                  </span>
                </div>
              </td>

              <!-- Status -->

              <td class="px-3 py-3">
                <span
                  v-if="event.status === 'upcoming'"
                  class="inline-flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-2.5 py-1 text-xs font-medium text-yellow-400"
                >
                  <Clock3 :size="13" />

                  {{ statusLabel(event.status) }}
                </span>

                <span
                  v-else-if="event.status === 'completed'"
                  class="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400"
                >
                  <CheckCircle2 :size="13" />

                  {{ statusLabel(event.status) }}
                </span>

                <span
                  v-else
                  class="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-400"
                >
                  <AlertCircle :size="13" />

                  {{ statusLabel(event.status) }}
                </span>
              </td>

              <!-- Registration -->

              <td class="px-3 py-3">
                <span
                  v-if="event.registration_open"
                  class="inline-flex rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-400"
                >
                  Open
                </span>

                <span
                  v-else
                  class="inline-flex rounded-full bg-slate-500/10 px-2.5 py-1 text-xs font-medium text-slate-400"
                >
                  Closed
                </span>
              </td>

              <!-- Actions -->

              <td class="px-3 py-3">
                <div class="flex items-center justify-end gap-1">
                  <!-- View -->

                  <button
                    type="button"
                    title="View Event"
                    class="rounded-lg p-2 text-slate-500 transition hover:bg-blue-500/10 hover:text-blue-400"
                    @click="viewEvent(event)"
                  >
                    <Eye :size="17" />
                  </button>

                  <!-- Edit -->

                  <RouterLink
                    :to="{
                      name: 'EventEdit',
                      params: {
                        id: event.id,
                      },
                    }"
                    title="Edit"
                    class="rounded-lg p-2 text-slate-500 transition hover:bg-yellow-500/10 hover:text-yellow-400"
                  >
                    <Pencil :size="15" />
                  </RouterLink>

                  <!-- Registrations -->

                  <RouterLink
                    :to="{
                      name: 'EventRegistrations',
                      params: {
                        id: event.id,
                      },
                    }"
                    title="Registrations"
                    class="rounded-lg p-2 text-slate-500 transition hover:bg-cyan-500/10 hover:text-cyan-400"
                    
                  >
                    <Users :size="16" />
                  </RouterLink>

                  <!-- Delete -->

                  <button
                    type="button"
                    title="Delete Event"
                    class="rounded-lg p-2 text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
                    @click="openDeleteModal(event)"
                  >
                    <Trash2 :size="15" />
                  </button>
                </div>
              </td>
            </tr>

            <!-- Empty State -->

            <tr v-if="paginatedEvents.length === 0">
              <td colspan="7" class="px-4 py-12 text-center">
                <div class="flex flex-col items-center">
                  <div
                    class="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-slate-500"
                  >
                    <Search :size="21" />
                  </div>

                  <p class="mt-4 text-sm font-medium text-white">
                    No events found
                  </p>

                  <p class="mt-1 text-xs text-slate-500">
                    Try changing your search or filters.
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- ========================================== -->
      <!-- Pagination -->
      <!-- ========================================== -->

      <div
        class="flex flex-col gap-4 border-t border-white/10 px-3 py-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <!-- Result Info -->

        <p class="text-xs text-slate-400">
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
            {{ filteredEvents.length }}
          </span>

          events
        </p>

        <!-- Pagination -->

        <div v-if="totalPages > 1" class="flex items-center gap-1">
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
            :disabled="currentPage === totalPages"
            class="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            @click="nextPage"
          >
            <ChevronRight :size="15" />
          </button>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- Delete Confirmation Modal -->
    <!-- ========================================== -->

    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showDeleteModal"
          class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
          @click.self="closeDeleteModal"
        >
          <div
            class="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/40"
          >
            <!-- Modal Header -->

            <div
              class="flex items-center justify-between border-b border-white/10 px-5 py-4"
            >
              <div class="flex items-center gap-3">
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400"
                >
                  <Trash2 :size="19" />
                </div>

                <div>
                  <h3 class="text-base font-semibold text-white">
                    Delete Event
                  </h3>

                  <p class="text-xs text-slate-500">
                    This action cannot be undone.
                  </p>
                </div>
              </div>

              <button
                type="button"
                class="rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-white"
                @click="closeDeleteModal"
              >
                <X :size="18" />
              </button>
            </div>

            <!-- Modal Body -->

            <div class="px-5 py-5">
              <p class="text-sm leading-6 text-slate-400">
                Are you sure you want to delete

                <span class="font-semibold text-white">
                  {{ selectedEvent?.title }}
                </span>

                ?
              </p>

              <div
                v-if="selectedEvent"
                class="mt-4 rounded-xl border border-white/10 bg-white/3 p-3"
              >
                <div class="flex items-center gap-3">
                  <img
                    v-if="selectedEvent.image"
                    :src="selectedEvent.image"
                    :alt="selectedEvent.title"
                    class="h-12 w-16 rounded-lg object-cover"
                  />

                  <div class="min-w-0">
                    <p class="truncate text-sm font-medium text-white">
                      {{ selectedEvent.title }}
                    </p>

                    <p class="mt-1 text-xs text-slate-500">
                      {{ formatDate(selectedEvent.event_date) }}
                      ·
                      {{ selectedEvent.location }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Modal Footer -->

            <div
              class="flex justify-end gap-2 border-t border-white/10 bg-white/3 px-5 py-4"
            >
              <button
                type="button"
                class="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
                @click="closeDeleteModal"
              >
                Cancel
              </button>

              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                @click="deleteEvent"
              >
                <Trash2 :size="15" />

                Delete Event
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
