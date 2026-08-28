<!-- MessageList.vue  -->

<script setup>
import {
  computed,
  onMounted,
  ref,
} from "vue";

import {
  Mail,
  MailOpen,
  Reply,
  Archive,
  Search,
  Star,
  RefreshCw,
  SlidersHorizontal,
  MessageSquare,
  CheckCircle2,
  Clock3,
  ArchiveRestore,
  X,
} from "@lucide/vue";

import Pagination from "@/components/common/Pagination.vue";
import MessageTable from "@/components/dashboard/messages/MessageTable.vue";
import MessageDetails from "@/components/dashboard/messages/MessageDetails.vue";

import {
  getAllMessages,
  markMessageAsRead,
  markMessageAsUnread,
  markMessageAsReplied,
  archiveMessage,
  deleteMessage,
  toggleMessageImportant,
} from "@/composables/messageService";

/* =========================================================
   State
========================================================= */

const messages = ref([]);

const searchQuery = ref("");
const statusFilter = ref("all");
const importantOnly = ref(false);

const selectedMessage = ref(null);
const showDetails = ref(false);

const currentPage = ref(1);
const perPage = 10;

/* =========================================================
   Load Messages
========================================================= */

const loadMessages = () => {
  messages.value = getAllMessages();
};

onMounted(loadMessages);

/* =========================================================
   Statistics
========================================================= */

const totalMessages = computed(() => {
  return messages.value.length;
});

const newMessages = computed(() => {
  return messages.value.filter(
    (message) => message.status === "new"
  ).length;
});

const repliedMessages = computed(() => {
  return messages.value.filter(
    (message) => message.status === "replied"
  ).length;
});

const archivedMessages = computed(() => {
  return messages.value.filter(
    (message) => message.status === "archived"
  ).length;
});

const readMessages = computed(() => {
  return messages.value.filter(
    (message) => message.status === "read"
  ).length;
});

const importantMessages = computed(() => {
  return messages.value.filter(
    (message) => message.isImportant
  ).length;
});

/* =========================================================
   Filtering
========================================================= */

const filteredMessages = computed(() => {
  const query = searchQuery.value
    .trim()
    .toLowerCase();

  return messages.value.filter((message) => {
    const matchesSearch =
      !query ||
      message.name?.toLowerCase().includes(query) ||
      message.email?.toLowerCase().includes(query) ||
      message.subject?.toLowerCase().includes(query) ||
      message.message?.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter.value === "all" ||
      message.status === statusFilter.value;

    const matchesImportant =
      !importantOnly.value ||
      message.isImportant;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesImportant
    );
  });
});

/* =========================================================
   Pagination
========================================================= */

const totalPages = computed(() => {
  return Math.max(
    1,
    Math.ceil(
      filteredMessages.value.length / perPage
    )
  );
});

const paginatedMessages = computed(() => {
  const start =
    (currentPage.value - 1) * perPage;

  return filteredMessages.value.slice(
    start,
    start + perPage
  );
});

const startItem = computed(() => {
  if (!filteredMessages.value.length) {
    return 0;
  }

  return (
    (currentPage.value - 1) * perPage + 1
  );
});

const endItem = computed(() => {
  return Math.min(
    currentPage.value * perPage,
    filteredMessages.value.length
  );
});

/* =========================================================
   Filter Helpers
========================================================= */

const hasActiveFilters = computed(() => {
  return (
    searchQuery.value.trim() ||
    statusFilter.value !== "all" ||
    importantOnly.value
  );
});

const statusLabel = computed(() => {
  const labels = {
    all: "All messages",
    new: "New",
    read: "Read",
    replied: "Replied",
    archived: "Archived",
  };

  return labels[statusFilter.value] || "All messages";
});

const resetFilters = () => {
  searchQuery.value = "";
  statusFilter.value = "all";
  importantOnly.value = false;
  currentPage.value = 1;
};

const handleSearch = () => {
  currentPage.value = 1;
};

/* =========================================================
   Message Actions
========================================================= */

const viewMessage = (message) => {
  if (message.status === "new") {
    markMessageAsRead(message.id);

    loadMessages();

    message =
      messages.value.find(
        (item) => item.id === message.id
      ) || message;
  }

  selectedMessage.value = message;
  showDetails.value = true;
};

const closeDetails = () => {
  showDetails.value = false;
  selectedMessage.value = null;
};

const replyMessage = (message) => {
  markMessageAsReplied(message.id);

  loadMessages();

  const updated = messages.value.find(
    (item) => item.id === message.id
  );

  if (updated) {
    selectedMessage.value = updated;
  }
};

const archive = (message) => {
  archiveMessage(message.id);

  loadMessages();

  if (
    selectedMessage.value?.id ===
    message.id
  ) {
    closeDetails();
  }
};

const removeMessage = (message) => {
  deleteMessage(message.id);

  loadMessages();

  if (
    selectedMessage.value?.id ===
    message.id
  ) {
    closeDetails();
  }

  if (
    currentPage.value > totalPages.value
  ) {
    currentPage.value = totalPages.value;
  }
};

const toggleImportant = (message) => {
  toggleMessageImportant(message.id);

  loadMessages();

  if (
    selectedMessage.value?.id ===
    message.id
  ) {
    selectedMessage.value =
      messages.value.find(
        (item) => item.id === message.id
      );
  }
};

const toggleRead = (message) => {
  if (message.status === "new") {
    markMessageAsRead(message.id);
  } else {
    markMessageAsUnread(message.id);
  }

  loadMessages();

  if (
    selectedMessage.value?.id ===
    message.id
  ) {
    selectedMessage.value =
      messages.value.find(
        (item) => item.id === message.id
      );
  }
};
</script>

<template>
  <div class="space-y-6">

    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->

    <section
      class="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-900/60 px-5 py-5 shadow-sm sm:px-6"
    >
      <!-- Decorative Background -->
      <div
        class="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-cyan-500/5"
      ></div>

      <div
        class="pointer-events-none absolute -bottom-20 right-20 h-32 w-32 rounded-full bg-slate-900/60"
      ></div>

      <div
        class="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
      >
        <div class="flex items-center gap-4">

          <!-- Icon -->
          <div
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-900/60 text-cyan-600 ring-1 ring-cyan-100"
          >
            <MessageSquare class="h-5 w-5" />
          </div>

          <!-- Title -->
          <div>
            <div class="flex items-center gap-2">
              <h1
                class="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl"
              >
                Messages
              </h1>

              <span
                v-if="newMessages"
                class="rounded-full bg-cyan-50 px-2 py-0.5 text-[10px] font-bold text-cyan-600"
              >
                {{ newMessages }} new
              </span>
            </div>

            <p
              class="mt-1 text-xs text-slate-400 sm:text-sm"
            >
              Manage inquiries and messages from alumni.
            </p>
          </div>
        </div>

        <!-- Refresh -->
        <button
          type="button"
          class="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-900/60 px-4 py-2.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-600 active:scale-[0.98]"
          @click="loadMessages"
        >
          <RefreshCw class="h-4 w-4" />
          Refresh
        </button>
      </div>
    </section>

    <!-- =====================================================
         STATISTICS
    ====================================================== -->

    <section
      class="grid grid-cols-2 gap-3 lg:grid-cols-4"
    >

      <!-- Total -->
      <div
        class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-900/60 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5"
      >
        <div
          class="absolute left-0 top-0 h-full w-1 bg-cyan-500"
        ></div>

        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-[11px] font-semibold uppercase tracking-wide text-slate-400"
            >
              Total
            </p>

            <p
              class="mt-2 text-2xl font-bold text-slate-800"
            >
              {{ totalMessages }}
            </p>

            <p class="mt-1 text-[10px] text-slate-400">
              All messages
            </p>
          </div>

          <div
            class="hidden rounded-xl bg-cyan-50 p-2.5 text-cyan-600 sm:block"
          >
            <Mail class="h-5 w-5" />
          </div>
        </div>
      </div>

      <!-- New -->
      <div
        class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-900/60 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5"
      >
        <div
          class="absolute left-0 top-0 h-full w-1 bg-amber-500"
        ></div>

        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-[11px] font-semibold uppercase tracking-wide text-slate-400"
            >
              New
            </p>

            <p
              class="mt-2 text-2xl font-bold text-slate-800"
            >
              {{ newMessages }}
            </p>

            <p class="mt-1 text-[10px] text-slate-400">
              Need attention
            </p>
          </div>

          <div
            class="hidden rounded-xl bg-amber-50 p-2.5 text-amber-600 sm:block"
          >
            <MailOpen class="h-5 w-5" />
          </div>
        </div>
      </div>

      <!-- Replied -->
      <div
        class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5"
      >
        <div
          class="absolute left-0 top-0 h-full w-1 bg-emerald-500"
        ></div>

        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-[11px] font-semibold uppercase tracking-wide text-slate-400"
            >
              Replied
            </p>

            <p
              class="mt-2 text-2xl font-bold text-slate-800"
            >
              {{ repliedMessages }}
            </p>

            <p class="mt-1 text-[10px] text-slate-400">
              Handled messages
            </p>
          </div>

          <div
            class="hidden rounded-xl bg-emerald-50 p-2.5 text-emerald-600 sm:block"
          >
            <CheckCircle2 class="h-5 w-5" />
          </div>
        </div>
      </div>

      <!-- Archived -->
      <div
        class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5"
      >
        <div
          class="absolute left-0 top-0 h-full w-1 bg-slate-400"
        ></div>

        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-[11px] font-semibold uppercase tracking-wide text-slate-400"
            >
              Archived
            </p>

            <p
              class="mt-2 text-2xl font-bold text-slate-800"
            >
              {{ archivedMessages }}
            </p>

            <p class="mt-1 text-[10px] text-slate-400">
              Stored messages
            </p>
          </div>

          <div
            class="hidden rounded-xl bg-slate-100 p-2.5 text-slate-500 sm:block"
          >
            <ArchiveRestore class="h-5 w-5" />
          </div>
        </div>
      </div>
    </section>

    <!-- =====================================================
         MESSAGE INBOX
    ====================================================== -->

    <section
      class="overflow-hidden rounded-2xl border border-slate-200 bg-slate-900/60 shadow-sm"
    >

      <!-- =================================================
           TOOLBAR
      ================================================== -->

      <div
        class="border-b border-slate-100 bg-white p-4 sm:p-5"
      >

        <div
          class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
        >

          <!-- Search -->
          <div class="relative w-full lg:max-w-md">

            <Search
              class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            />

            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by name, email, subject..."
              class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-10 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-500/5"
              @input="handleSearch"
            />

            <button
              v-if="searchQuery"
              type="button"
              class="absolute right-2.5 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              @click="
                searchQuery = '';
                currentPage = 1;
              "
            >
              <X class="h-3.5 w-3.5" />
            </button>
          </div>

          <!-- Controls -->
          <div
            class="flex flex-wrap items-center gap-2"
          >

            <!-- Status -->
            <div class="relative">
              <SlidersHorizontal
                class="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
              />

              <select
                v-model="statusFilter"
                class="appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-9 text-xs font-semibold text-slate-600 outline-none transition hover:bg-slate-100 focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-500/5"
                @change="currentPage = 1"
              >
                <option value="all">
                  All Status
                </option>

                <option value="new">
                  New
                </option>

                <option value="read">
                  Read
                </option>

                <option value="replied">
                  Replied
                </option>

                <option value="archived">
                  Archived
                </option>
              </select>
            </div>

            <!-- Important -->
            <button
              type="button"
              class="inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition"
              :class="
                importantOnly
                  ? 'border-amber-200 bg-amber-50 text-amber-600'
                  : 'border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100'
              "
              @click="
                importantOnly = !importantOnly;
                currentPage = 1;
              "
            >
              <Star
                class="h-3.5 w-3.5"
                :class="{
                  'fill-amber-400 text-amber-500':
                    importantOnly,
                }"
              />

              Important

              <span
                v-if="importantMessages"
                class="ml-0.5 rounded-full bg-slate-200 px-1.5 py-0.5 text-[9px]"
                :class="
                  importantOnly
                    ? 'bg-amber-100 text-amber-600'
                    : 'text-slate-500'
                "
              >
                {{ importantMessages }}
              </span>
            </button>

            <!-- Clear -->
            <button
              v-if="hasActiveFilters"
              type="button"
              class="inline-flex items-center gap-1 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              @click="resetFilters"
            >
              <X class="h-3.5 w-3.5" />
              Clear
            </button>
          </div>
        </div>

        <!-- Active filter / result info -->
        <div
          class="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-3 sm:flex-row sm:items-center sm:justify-between"
        >

          <div class="flex items-center gap-2">
            <span
              class="text-[11px] font-medium text-slate-400"
            >
              {{ statusLabel }}
            </span>

            <span
              v-if="importantOnly"
              class="h-1 w-1 rounded-full bg-slate-300"
            ></span>

            <span
              v-if="importantOnly"
              class="text-[11px] font-semibold text-amber-500"
            >
              Important only
            </span>
          </div>

          <div class="flex items-center gap-3">

            <p
              class="text-[11px] text-slate-400"
            >
              Showing

              <span
                class="font-semibold text-slate-600"
              >
                {{ startItem }}
              </span>

              -

              <span
                class="font-semibold text-slate-600"
              >
                {{ endItem }}
              </span>

              of

              <span
                class="font-semibold text-slate-600"
              >
                {{ filteredMessages.length }}
              </span>
            </p>

            <span
              v-if="newMessages"
              class="hidden h-1 w-1 rounded-full bg-cyan-500 sm:block"
            ></span>

            <p
              v-if="newMessages"
              class="hidden text-[11px] font-semibold text-cyan-600 sm:block"
            >
              {{ newMessages }} unread
            </p>
          </div>
        </div>
      </div>

      <!-- =================================================
           TABLE
      ================================================== -->

      <MessageTable
        :messages="paginatedMessages"
        @view="viewMessage"
        @reply="replyMessage"
        @archive="archive"
        @delete="removeMessage"
        @toggle-important="toggleImportant"
        @toggle-read="toggleRead"
      />

      <!-- =================================================
           PAGINATION
      ================================================== -->

      <Pagination
        v-model:currentPage="currentPage"
        :total-pages="totalPages"
        :start-item="startItem"
        :end-item="endItem"
        :total-items="filteredMessages.length"
      />
    </section>

    <!-- =====================================================
         MESSAGE DETAILS
    ====================================================== -->

    <MessageDetails
      :message="selectedMessage"
      @close="closeDetails"
      @reply="replyMessage"
      @archive="archive"
      @delete="removeMessage"
      @toggle-important="toggleImportant"
    />

  </div>
</template>