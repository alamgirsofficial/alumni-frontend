<script setup>
import { computed, ref } from "vue";

import {
  Search,
  SlidersHorizontal,
  X,
  Eye,
  Check,
  XCircle,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Users,
  UserCheck,
  Clock3,
  CreditCard,
  CalendarDays,
  MapPin,
  Phone,
  Mail,
  Hash,
} from "@lucide/vue";

import { events } from "@/constants/events.js";

/*
|--------------------------------------------------------------------------
| Demo Registration Data
|--------------------------------------------------------------------------
|
| Backend আসার আগে এই data দিয়ে UI কাজ করবে।
|
*/

const registrations = ref([
  {
    id: 1,
    registration_id: "REG-2026-0001",

    event_id: 1,

    name: "Kabir Mahmud",
    email: "kabir@example.com",
    phone: "+8801712345678",

    batch: "2009",

    transaction_id: "TXN-8A92K1",

    payment_status: "paid",

    status: "approved",

    registered_at: "2026-08-20 10:30:00",
  },

  {
    id: 2,
    registration_id: "REG-2026-0002",

    event_id: 1,

    name: "Rahim Uddin",
    email: "rahim@example.com",
    phone: "+8801812345678",

    batch: "2011",

    transaction_id: "TXN-7B83M2",

    payment_status: "pending",

    status: "pending",

    registered_at: "2026-08-20 12:15:00",
  },

  {
    id: 3,
    registration_id: "REG-2026-0003",

    event_id: 1,

    name: "Sadia Akter",
    email: "sadia@example.com",
    phone: "+8801912345678",

    batch: "2012",

    transaction_id: "TXN-6C74N3",

    payment_status: "paid",

    status: "approved",

    registered_at: "2026-08-21 09:20:00",
  },

  {
    id: 4,
    registration_id: "REG-2026-0004",

    event_id: 2,

    name: "Imran Hossain",
    email: "imran@example.com",
    phone: "+8801612345678",

    batch: "2008",

    transaction_id: "TXN-5D65P4",

    payment_status: "paid",

    status: "pending",

    registered_at: "2026-08-21 11:10:00",
  },

  {
    id: 5,
    registration_id: "REG-2026-0005",

    event_id: 2,

    name: "Nusrat Jahan",
    email: "nusrat@example.com",
    phone: "+8801512345678",

    batch: "2014",

    transaction_id: "TXN-4E56Q5",

    payment_status: "paid",

    status: "approved",

    registered_at: "2026-08-21 14:45:00",
  },

  {
    id: 6,
    registration_id: "REG-2026-0006",

    event_id: 2,

    name: "Arif Hasan",
    email: "arif@example.com",
    phone: "+8801312345678",

    batch: "2010",

    transaction_id: "TXN-3F47R6",

    payment_status: "failed",

    status: "rejected",

    registered_at: "2026-08-22 09:30:00",
  },

  {
    id: 7,
    registration_id: "REG-2026-0007",

    event_id: 3,

    name: "Tanvir Ahmed",
    email: "tanvir@example.com",
    phone: "+8801212345678",

    batch: "2015",

    transaction_id: "TXN-2G38S7",

    payment_status: "pending",

    status: "pending",

    registered_at: "2026-08-22 11:20:00",
  },
]);

/*
|--------------------------------------------------------------------------
| State
|--------------------------------------------------------------------------
*/

const searchQuery = ref("");

const selectedEvent = ref("all");

const selectedStatus = ref("all");

const selectedPayment = ref("all");

const currentPage = ref(1);

const perPage = ref(10);

const selectedRegistration = ref(null);

const showDetailsModal = ref(false);

const showDeleteModal = ref(false);

const registrationToDelete = ref(null);

/*
|--------------------------------------------------------------------------
| Event Options
|--------------------------------------------------------------------------
*/

const eventOptions = computed(() => {
  return events;
});

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

const getEvent = (eventId) => {
  return events.find((event) => Number(event.id) === Number(eventId));
};

const getEventTitle = (eventId) => {
  return getEvent(eventId)?.title ?? "Unknown Event";
};

/*
|--------------------------------------------------------------------------
| Filtered Registrations
|--------------------------------------------------------------------------
*/

const filteredRegistrations = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();

  return registrations.value.filter((registration) => {
    const matchesSearch =
      !query ||
      registration.name?.toLowerCase().includes(query) ||
      registration.email?.toLowerCase().includes(query) ||
      registration.phone?.toLowerCase().includes(query) ||
      registration.registration_id?.toLowerCase().includes(query) ||
      registration.transaction_id?.toLowerCase().includes(query);

    const matchesEvent =
      selectedEvent.value === "all" ||
      String(registration.event_id) === String(selectedEvent.value);

    const matchesStatus =
      selectedStatus.value === "all" ||
      registration.status === selectedStatus.value;

    const matchesPayment =
      selectedPayment.value === "all" ||
      registration.payment_status === selectedPayment.value;

    return matchesSearch && matchesEvent && matchesStatus && matchesPayment;
  });
});

/*
|--------------------------------------------------------------------------
| Stats
|--------------------------------------------------------------------------
*/

const totalRegistrations = computed(() => registrations.value.length);

const approvedRegistrations = computed(
  () => registrations.value.filter((item) => item.status === "approved").length,
);

const pendingRegistrations = computed(
  () => registrations.value.filter((item) => item.status === "pending").length,
);

const paidRegistrations = computed(
  () =>
    registrations.value.filter((item) => item.payment_status === "paid").length,
);

/*
|--------------------------------------------------------------------------
| Pagination
|--------------------------------------------------------------------------
*/

const totalPages = computed(() =>
  Math.ceil(filteredRegistrations.value.length / perPage.value),
);

const paginatedRegistrations = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;

  return filteredRegistrations.value.slice(start, start + perPage.value);
});

const startItem = computed(() => {
  if (filteredRegistrations.value.length === 0) {
    return 0;
  }

  return (currentPage.value - 1) * perPage.value + 1;
});

const endItem = computed(() => {
  return Math.min(
    currentPage.value * perPage.value,
    filteredRegistrations.value.length,
  );
});

/*
|--------------------------------------------------------------------------
| Pagination Actions
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| Filter Reset
|--------------------------------------------------------------------------
*/

const changeFilter = () => {
  currentPage.value = 1;
};

const resetFilters = () => {
  searchQuery.value = "";

  selectedEvent.value = "all";

  selectedStatus.value = "all";

  selectedPayment.value = "all";

  currentPage.value = 1;
};

/*
|--------------------------------------------------------------------------
| View
|--------------------------------------------------------------------------
*/

const viewRegistration = (registration) => {
  selectedRegistration.value = registration;

  showDetailsModal.value = true;
};

/*
|--------------------------------------------------------------------------
| Approve
|--------------------------------------------------------------------------
*/

const approveRegistration = (registration) => {
  registration.status = "approved";

  registration.payment_status = "paid";
};

/*
|--------------------------------------------------------------------------
| Reject
|--------------------------------------------------------------------------
*/

const rejectRegistration = (registration) => {
  registration.status = "rejected";
};

/*
|--------------------------------------------------------------------------
| Delete
|--------------------------------------------------------------------------
*/

const confirmDelete = (registration) => {
  registrationToDelete.value = registration;

  showDeleteModal.value = true;
};

const deleteRegistration = () => {
  if (!registrationToDelete.value) {
    return;
  }

  registrations.value = registrations.value.filter(
    (item) => item.id !== registrationToDelete.value.id,
  );

  showDeleteModal.value = false;

  registrationToDelete.value = null;

  if (currentPage.value > totalPages.value && currentPage.value > 1) {
    currentPage.value--;
  }
};

/*
|--------------------------------------------------------------------------
| Status Helpers
|--------------------------------------------------------------------------
*/

const statusClass = (status) => {
  if (status === "approved") {
    return "bg-emerald-500/10 text-emerald-400";
  }

  if (status === "pending") {
    return "bg-yellow-500/10 text-yellow-400";
  }

  if (status === "rejected") {
    return "bg-red-500/10 text-red-400";
  }

  return "bg-slate-500/10 text-slate-400";
};

const paymentClass = (status) => {
  if (status === "paid") {
    return "bg-emerald-500/10 text-emerald-400";
  }

  if (status === "pending") {
    return "bg-yellow-500/10 text-yellow-400";
  }

  if (status === "failed") {
    return "bg-red-500/10 text-red-400";
  }

  return "bg-slate-500/10 text-slate-400";
};

const statusLabel = (status) => {
  if (status === "approved") return "Approved";

  if (status === "pending") return "Pending";

  if (status === "rejected") return "Rejected";

  return status;
};

const paymentLabel = (status) => {
  if (status === "paid") return "Paid";

  if (status === "pending") return "Pending";

  if (status === "failed") return "Failed";

  return status;
};
</script>

<template>
  <div class="space-y-6">
    <!-- =====================================================
             HEADER
        ====================================================== -->

    <div
      class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
    >
      <div>
        <div class="flex items-center gap-2">
          <h1 class="text-2xl font-bold tracking-tight text-white">
            Event Registrations
          </h1>

          <span
            class="rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-400"
          >
            {{ filteredRegistrations.length }}
          </span>
        </div>

        <p class="mt-1 text-sm text-slate-500">
          Manage alumni registrations and event participation.
        </p>
      </div>
    </div>

    <!-- =====================================================
             STATS
        ====================================================== -->

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <!-- Total -->

      <div class="rounded-2xl border border-white/10 bg-white/3 p-5">
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-xs font-medium uppercase tracking-wider text-slate-600"
            >
              Total Registrations
            </p>

            <p class="mt-2 text-2xl font-bold text-white">
              {{ totalRegistrations }}
            </p>
          </div>

          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400"
          >
            <Users :size="21" />
          </div>
        </div>
      </div>

      <!-- Approved -->

      <div class="rounded-2xl border border-white/10 bg-white/3 p-5">
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-xs font-medium uppercase tracking-wider text-slate-600"
            >
              Approved
            </p>

            <p class="mt-2 text-2xl font-bold text-white">
              {{ approvedRegistrations }}
            </p>
          </div>

          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400"
          >
            <UserCheck :size="21" />
          </div>
        </div>
      </div>

      <!-- Pending -->

      <div class="rounded-2xl border border-white/10 bg-white/3 p-5">
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-xs font-medium uppercase tracking-wider text-slate-600"
            >
              Pending
            </p>

            <p class="mt-2 text-2xl font-bold text-white">
              {{ pendingRegistrations }}
            </p>
          </div>

          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400"
          >
            <Clock3 :size="21" />
          </div>
        </div>
      </div>

      <!-- Paid -->

      <div class="rounded-2xl border border-white/10 bg-white/3 p-5">
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-xs font-medium uppercase tracking-wider text-slate-600"
            >
              Paid
            </p>

            <p class="mt-2 text-2xl font-bold text-white">
              {{ paidRegistrations }}
            </p>
          </div>

          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400"
          >
            <CreditCard :size="21" />
          </div>
        </div>
      </div>
    </div>

    <!-- =====================================================
             FILTERS
        ====================================================== -->

    <div class="rounded-2xl border border-white/10 bg-white/3 p-4">
      <div class="mb-4 flex items-center gap-2">
        <SlidersHorizontal :size="16" class="text-blue-400" />

        <span class="text-sm font-medium text-slate-300">
          Search & Filters
        </span>
      </div>

      <div class="grid grid-cols-1 gap-3 lg:grid-cols-4">
        <!-- Search -->

        <div class="relative lg:col-span-1">
          <Search
            :size="17"
            class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
          />

          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search registration, name, phone..."
            class="w-full rounded-xl border border-white/10 bg-slate-950/50 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-700 transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
            @input="changeFilter"
          />
        </div>

        <!-- Event -->

        <select
          v-model="selectedEvent"
          class="rounded-xl border border-white/10 bg-slate-950/50 px-4 py-2.5 text-sm text-slate-300 outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
          @change="changeFilter"
        >
          <option value="all">All Events</option>

          <option
            v-for="event in eventOptions"
            :key="event.id"
            :value="event.id"
          >
            {{ event.title }}
          </option>
        </select>

        <!-- Status -->

        <select
          v-model="selectedStatus"
          class="rounded-xl border border-white/10 bg-slate-950/50 px-4 py-2.5 text-sm text-slate-300 outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
          @change="changeFilter"
        >
          <option value="all">All Status</option>

          <option value="approved">Approved</option>

          <option value="pending">Pending</option>

          <option value="rejected">Rejected</option>
        </select>

        <!-- Payment -->

        <div class="flex gap-2">
          <select
            v-model="selectedPayment"
            class="min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-950/50 px-4 py-2.5 text-sm text-slate-300 outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
            @change="changeFilter"
          >
            <option value="all">All Payment</option>

            <option value="paid">Paid</option>

            <option value="pending">Pending</option>

            <option value="failed">Failed</option>
          </select>

          <button
            v-if="
              searchQuery ||
              selectedEvent !== 'all' ||
              selectedStatus !== 'all' ||
              selectedPayment !== 'all'
            "
            type="button"
            title="Reset filters"
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 text-slate-500 transition hover:bg-white/5 hover:text-white"
            @click="resetFilters"
          >
            <X :size="16" />
          </button>
        </div>
      </div>
    </div>

    <!-- =====================================================
             TABLE
        ====================================================== -->

    <div class="overflow-hidden rounded-2xl border border-white/10 bg-white/3">
      <div class="overflow-x-auto">
        <table class="w-full min-w-[1100px]">
          <!-- HEADER -->

          <thead class="border-b border-white/10 bg-white/5">
            <tr>
              <th
                class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
              >
                #
              </th>

              <th
                class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
              >
                Registration
              </th>

              <th
                class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
              >
                Alumni
              </th>

              <th
                class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
              >
                Event
              </th>

              <th
                class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
              >
                Payment
              </th>

              <th
                class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
              >
                Status
              </th>

              <th
                class="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-600"
              >
                Actions
              </th>
            </tr>
          </thead>

          <!-- BODY -->

          <tbody class="divide-y divide-white/5">
            <tr
              v-for="(registration, index) in paginatedRegistrations"
              :key="registration.id"
              class="transition hover:bg-white/3"
            >
              <!-- SERIAL -->

              <td class="px-5 py-4 text-sm text-slate-600">
                {{ (currentPage - 1) * perPage + index + 1 }}
              </td>

              <!-- REGISTRATION -->

              <td class="px-5 py-4">
                <div class="flex items-center gap-2">
                  <Hash :size="14" class="text-blue-400" />

                  <span class="text-sm font-medium text-slate-300">
                    {{ registration.registration_id }}
                  </span>
                </div>

                <p class="mt-1 text-[11px] text-slate-700">
                  {{ registration.registered_at }}
                </p>
              </td>

              <!-- ALUMNI -->

              <td class="px-5 py-4">
                <div class="flex items-center gap-3">
                  <div
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-cyan-400 text-sm font-bold text-white"
                  >
                    {{ registration.name?.charAt(0)?.toUpperCase() }}
                  </div>

                  <div class="min-w-0">
                    <p class="truncate text-sm font-semibold text-white">
                      {{ registration.name }}
                    </p>

                    <p class="mt-0.5 text-xs text-slate-600">
                      Batch
                      {{ registration.batch }}
                    </p>
                  </div>
                </div>
              </td>

              <!-- EVENT -->

              <td class="max-w-[240px] px-5 py-4">
                <p class="truncate text-sm text-slate-300">
                  {{ getEventTitle(registration.event_id) }}
                </p>

                <p class="mt-1 text-xs text-slate-600">
                  ID:
                  {{ registration.event_id }}
                </p>
              </td>

              <!-- PAYMENT -->

              <td class="px-5 py-4">
                <span
                  class="inline-flex rounded-full px-2.5 py-1 text-xs font-medium"
                  :class="paymentClass(registration.payment_status)"
                >
                  {{ paymentLabel(registration.payment_status) }}
                </span>

                <p class="mt-1 text-[11px] text-slate-700">
                  {{ registration.transaction_id }}
                </p>
              </td>

              <!-- STATUS -->

              <td class="px-5 py-4">
                <span
                  class="inline-flex rounded-full px-2.5 py-1 text-xs font-medium"
                  :class="statusClass(registration.status)"
                >
                  {{ statusLabel(registration.status) }}
                </span>
              </td>

              <!-- ACTIONS -->

              <td class="px-5 py-4">
                <div class="flex items-center justify-end gap-1">
                  <!-- VIEW -->

                  <button
                    type="button"
                    title="View registration"
                    class="rounded-lg p-2 text-slate-600 transition hover:bg-blue-500/10 hover:text-blue-400"
                    @click="viewRegistration(registration)"
                  >
                    <Eye :size="16" />
                  </button>

                  <!-- APPROVE -->

                  <button
                    v-if="registration.status !== 'approved'"
                    type="button"
                    title="Approve"
                    class="rounded-lg p-2 text-slate-600 transition hover:bg-emerald-500/10 hover:text-emerald-400"
                    @click="approveRegistration(registration)"
                  >
                    <Check :size="16" />
                  </button>

                  <!-- REJECT -->

                  <button
                    v-if="registration.status !== 'rejected'"
                    type="button"
                    title="Reject"
                    class="rounded-lg p-2 text-slate-600 transition hover:bg-yellow-500/10 hover:text-yellow-400"
                    @click="rejectRegistration(registration)"
                  >
                    <XCircle :size="16" />
                  </button>

                  <!-- DELETE -->

                  <button
                    type="button"
                    title="Delete"
                    class="rounded-lg p-2 text-slate-600 transition hover:bg-red-500/10 hover:text-red-400"
                    @click="confirmDelete(registration)"
                  >
                    <Trash2 :size="16" />
                  </button>
                </div>
              </td>
            </tr>

            <!-- EMPTY -->

            <tr v-if="paginatedRegistrations.length === 0">
              <td colspan="7" class="px-5 py-14 text-center">
                <div class="flex flex-col items-center">
                  <div
                    class="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-slate-600"
                  >
                    <Search :size="21" />
                  </div>

                  <p class="mt-4 text-sm font-medium text-white">
                    No registrations found
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

      <!-- =================================================
                 PAGINATION
            ================================================== -->

      <div
        class="flex flex-col gap-3 border-t border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <p class="text-xs text-slate-600">
          Showing
          <span class="font-medium text-slate-400">
            {{ startItem }}
          </span>
          -
          <span class="font-medium text-slate-400">
            {{ endItem }}
          </span>
          of
          <span class="font-medium text-slate-400">
            {{ filteredRegistrations.length }}
          </span>
          registrations
        </p>

        <div v-if="totalPages > 1" class="flex items-center gap-1">
          <button
            type="button"
            :disabled="currentPage === 1"
            class="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-500 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            @click="previousPage"
          >
            <ChevronLeft :size="15" />
          </button>

          <button
            v-for="page in totalPages"
            :key="page"
            type="button"
            class="flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-medium transition"
            :class="
              currentPage === page
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                : 'text-slate-500 hover:bg-white/5 hover:text-white'
            "
            @click="goToPage(page)"
          >
            {{ page }}
          </button>

          <button
            type="button"
            :disabled="currentPage === totalPages"
            class="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-500 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            @click="nextPage"
          >
            <ChevronRight :size="15" />
          </button>
        </div>
      </div>
    </div>

    <!-- =====================================================
             DETAILS MODAL
        ====================================================== -->

    <Teleport to="body">
      <div
        v-if="showDetailsModal && selectedRegistration"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
        @click.self="showDetailsModal = false"
      >
        <div
          class="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/10 bg-slate-900 shadow-2xl"
        >
          <!-- HEADER -->

          <div
            class="flex items-center justify-between border-b border-white/10 px-5 py-4"
          >
            <div>
              <h2 class="text-sm font-semibold text-white">
                Registration Details
              </h2>

              <p class="mt-1 text-xs text-slate-600">
                {{ selectedRegistration.registration_id }}
              </p>
            </div>

            <button
              type="button"
              class="rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-white"
              @click="showDetailsModal = false"
            >
              <X :size="18" />
            </button>
          </div>

          <!-- BODY -->

          <div class="space-y-5 p-5">
            <!-- PROFILE -->

            <div
              class="flex items-center gap-4 rounded-xl border border-white/10 bg-white/3 p-4"
            >
              <div
                class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-cyan-400 text-lg font-bold text-white"
              >
                {{ selectedRegistration.name?.charAt(0)?.toUpperCase() }}
              </div>

              <div class="min-w-0">
                <h3 class="text-base font-semibold text-white">
                  {{ selectedRegistration.name }}
                </h3>

                <p class="mt-1 text-xs text-slate-600">
                  Batch
                  {{ selectedRegistration.batch }}
                </p>
              </div>
            </div>

            <!-- EVENT -->

            <div class="rounded-xl border border-white/10 bg-white/3 p-4">
              <div class="flex items-center gap-2 text-blue-400">
                <CalendarDays :size="16" />

                <span class="text-xs font-medium"> Event </span>
              </div>

              <p class="mt-2 text-sm font-medium text-white">
                {{ getEventTitle(selectedRegistration.event_id) }}
              </p>
            </div>

            <!-- CONTACT -->

            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div class="rounded-xl border border-white/10 bg-white/3 p-4">
                <div class="flex items-center gap-2 text-slate-500">
                  <Mail :size="15" />

                  <span class="text-xs"> Email </span>
                </div>

                <p class="mt-2 break-all text-sm text-slate-300">
                  {{ selectedRegistration.email }}
                </p>
              </div>

              <div class="rounded-xl border border-white/10 bg-white/3 p-4">
                <div class="flex items-center gap-2 text-slate-500">
                  <Phone :size="15" />

                  <span class="text-xs"> Phone </span>
                </div>

                <p class="mt-2 text-sm text-slate-300">
                  {{ selectedRegistration.phone }}
                </p>
              </div>
            </div>

            <!-- PAYMENT -->

            <div class="rounded-xl border border-white/10 bg-white/3 p-4">
              <div class="flex items-center justify-between gap-3">
                <div>
                  <p class="text-xs text-slate-600">Transaction ID</p>

                  <p class="mt-1 text-sm font-medium text-white">
                    {{ selectedRegistration.transaction_id }}
                  </p>
                </div>

                <span
                  class="rounded-full px-2.5 py-1 text-xs font-medium"
                  :class="paymentClass(selectedRegistration.payment_status)"
                >
                  {{ paymentLabel(selectedRegistration.payment_status) }}
                </span>
              </div>
            </div>

            <!-- STATUS -->

            <div
              class="flex items-center justify-between rounded-xl border border-white/10 bg-white/3 p-4"
            >
              <span class="text-sm text-slate-400"> Registration Status </span>

              <span
                class="rounded-full px-2.5 py-1 text-xs font-medium"
                :class="statusClass(selectedRegistration.status)"
              >
                {{ statusLabel(selectedRegistration.status) }}
              </span>
            </div>
          </div>

          <!-- FOOTER -->

          <div
            class="flex justify-end gap-2 border-t border-white/10 px-5 py-4"
          >
            <button
              type="button"
              class="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
              @click="showDetailsModal = false"
            >
              Close
            </button>

            <button
              v-if="selectedRegistration.status !== 'approved'"
              type="button"
              class="inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-2.5 text-sm font-medium text-emerald-400 transition hover:bg-emerald-500/20"
              @click="approveRegistration(selectedRegistration)"
            >
              <Check :size="15" />

              Approve
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- =====================================================
             DELETE MODAL
        ====================================================== -->

    <Teleport to="body">
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
        @click.self="showDeleteModal = false"
      >
        <div
          class="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl"
        >
          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400"
          >
            <Trash2 :size="21" />
          </div>

          <h2 class="mt-5 text-lg font-semibold text-white">
            Delete Registration?
          </h2>

          <p class="mt-2 text-sm leading-6 text-slate-500">
            Are you sure you want to delete
            <span class="font-medium text-slate-300">
              {{ registrationToDelete?.registration_id }}
            </span>
            registration? This action cannot be undone.
          </p>

          <div class="mt-6 flex justify-end gap-2">
            <button
              type="button"
              class="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
              @click="showDeleteModal = false"
            >
              Cancel
            </button>

            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-400"
              @click="deleteRegistration"
            >
              <Trash2 :size="15" />

              Delete
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
