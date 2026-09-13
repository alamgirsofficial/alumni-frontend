<!-- src/pages/dashboard/MessageList.vue -->

<script setup>
import { computed, onMounted, ref } from "vue";

import {
  Mail,
  MailOpen,
  Search,
  Star,
  RefreshCw,
  SlidersHorizontal,
  MessageSquare,
  CheckCircle2,
  ArchiveRestore,
  X,
} from "@lucide/vue";
import { useRouter } from "vue-router";
import { useToast } from "@/composables/useToast";

const router = useRouter();

const { success, error } = useToast();

import Pagination from "@/components/common/Pagination.vue";

import MessageTable from "@/components/dashboard/messages/MessageTable.vue";
import MessageDetails from "@/components/dashboard/messages/MessageDetails.vue";
import MessageReply from "@/components/dashboard/messages/MessageReply.vue";

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
   STATE
========================================================= */

const messages = ref([]);

const searchQuery = ref("");
const statusFilter = ref("all");
const importantOnly = ref(false);

const selectedMessage = ref(null);

const showDetails = ref(false);
const showReply = ref(false);

const replyLoading = ref(false);

const currentPage = ref(1);

const perPage = 10;

/* =========================================================
   LOAD MESSAGES
========================================================= */

const loadMessages = () => {
  messages.value = getAllMessages();
};

onMounted(loadMessages);

/* =========================================================
   STATISTICS
========================================================= */

const totalMessages = computed(() => {
  return messages.value.length;
});

const newMessages = computed(() => {
  return messages.value.filter((message) => message.status === "new").length;
});

const repliedMessages = computed(() => {
  return messages.value.filter((message) => message.status === "replied")
    .length;
});

const archivedMessages = computed(() => {
  return messages.value.filter((message) => message.status === "archived")
    .length;
});

const readMessages = computed(() => {
  return messages.value.filter((message) => message.status === "read").length;
});

const importantMessages = computed(() => {
  return messages.value.filter((message) => message.isImportant).length;
});

/* =========================================================
   FILTERING
========================================================= */

const filteredMessages = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  return messages.value.filter((message) => {
    const matchesSearch =
      !query ||
      message.name?.toLowerCase().includes(query) ||
      message.email?.toLowerCase().includes(query) ||
      message.subject?.toLowerCase().includes(query) ||
      message.message?.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter.value === "all" || message.status === statusFilter.value;

    const matchesImportant = !importantOnly.value || message.isImportant;

    return matchesSearch && matchesStatus && matchesImportant;
  });
});

/* =========================================================
   PAGINATION
========================================================= */

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredMessages.value.length / perPage));
});

const paginatedMessages = computed(() => {
  const start = (currentPage.value - 1) * perPage;

  return filteredMessages.value.slice(start, start + perPage);
});

const startItem = computed(() => {
  if (!filteredMessages.value.length) {
    return 0;
  }

  return (currentPage.value - 1) * perPage + 1;
});

const endItem = computed(() => {
  return Math.min(currentPage.value * perPage, filteredMessages.value.length);
});

/* =========================================================
   FILTER HELPERS
========================================================= */

const hasActiveFilters = computed(() => {
  return Boolean(
    searchQuery.value.trim() ||
    statusFilter.value !== "all" ||
    importantOnly.value,
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
   VIEW MESSAGE
========================================================= */

const viewMessage = (message) => {
  let currentMessage = message;

  // New message automatically becomes read
  if (message.status === "new") {
    markMessageAsRead(message.id);

    loadMessages();

    currentMessage =
      messages.value.find((item) => item.id === message.id) || message;
  }

  selectedMessage.value = currentMessage;
  showDetails.value = true;
};

/* =========================================================
   CLOSE DETAILS
========================================================= */

const closeDetails = () => {
  showDetails.value = false;
  selectedMessage.value = null;
};

/* =========================================================
   OPEN REPLY
========================================================= */

const openReply = (message) => {
  selectedMessage.value = message;

  showReply.value = true;
};

/* =========================================================
   CLOSE REPLY
========================================================= */

const closeReply = () => {
  if (replyLoading.value) {
    return;
  }

  showReply.value = false;
};

/* =========================================================
   SEND REPLY
========================================================= */

const sendReply = async (replyData) => {
  if (!selectedMessage.value) {
    return;
  }

  replyLoading.value = true;

  try {
    /* * এখন temporary/localStorage flow. * * পরে এখানে Laravel API call বসবে: * * await sendMessageReply(replyData); */ console.log(
      "Reply data:",
      replyData,
    );
    /* * Message কে replied হিসেবে update */ if (replyData?.messageId) {
      markMessageAsReplied(replyData.messageId);
    }
    /* * Latest messages reload */ loadMessages();
    /* * Selected message update */ if (replyData?.messageId) {
      const updated = messages.value.find(
        (item) => item.id === replyData.messageId,
      );
      if (updated) {
        selectedMessage.value = updated;
      }
    }
    /* * Reply modal close */ showReply.value = false;
    /* * Success notification */ success("Reply sent successfully!");
    /* * Message List page এ redirect */ await router.push({
      name: "MessageList",
    });
  } catch (err) {
    console.error("Failed to send reply:", err);
    error("Failed to send reply. Please try again.");
  } finally {
    replyLoading.value = false;
  }
};

/* =========================================================
   ARCHIVE
========================================================= */

const archive = (message) => {
  archiveMessage(message.id);

  loadMessages();

  if (selectedMessage.value?.id === message.id) {
    closeDetails();
  }
};

/* =========================================================
   DELETE
========================================================= */

const removeMessage = (message) => {
  deleteMessage(message.id);

  loadMessages();

  if (selectedMessage.value?.id === message.id) {
    closeDetails();
  }

  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value;
  }
};

/* =========================================================
   TOGGLE IMPORTANT
========================================================= */

const toggleImportant = (message) => {
  toggleMessageImportant(message.id);

  loadMessages();

  if (selectedMessage.value?.id === message.id) {
    selectedMessage.value =
      messages.value.find((item) => item.id === message.id) || null;
  }
};

/* =========================================================
   TOGGLE READ
========================================================= */

const toggleRead = (message) => {
  if (message.status === "new") {
    markMessageAsRead(message.id);
  } else {
    markMessageAsUnread(message.id);
  }

  loadMessages();

  if (selectedMessage.value?.id === message.id) {
    selectedMessage.value =
      messages.value.find((item) => item.id === message.id) || null;
  }
};
</script>

<template>
  <div class="space-y-6">
    <!-- =====================================================
         PAGE HEADER
    ====================================================== -->

    <section
      class="relative overflow-hidden rounded-2xl border border-white/10 bg-white/3 px-5 py-5 shadow-sm sm:px-6"
    >
      <!-- Decorative -->
      <div
        class="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-cyan-500/5 blur-3xl"
      ></div>

      <div
        class="pointer-events-none absolute -bottom-20 right-20 h-32 w-32 rounded-full bg-slate-900/60 blur-2xl"
      ></div>

      <div
        class="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
      >
        <!-- Left -->
        <div class="flex items-center gap-4">
          <div
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/20"
          >
            <MessageSquare class="h-5 w-5" />
          </div>

          <div>
            <div class="flex items-center gap-2">
              <h1
                class="text-xl font-bold tracking-tight text-white sm:text-2xl"
              >
                Messages
              </h1>

              <span
                v-if="newMessages"
                class="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] font-bold text-cyan-400"
              >
                {{ newMessages }} new
              </span>
            </div>

            <p class="mt-1 text-xs text-slate-400 sm:text-sm">
              Manage inquiries and messages from alumni.
            </p>
          </div>
        </div>

        <!-- Refresh -->
        <button
          type="button"
          class="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/3 px-4 py-2.5 text-xs font-semibold text-slate-400 transition hover:bg-white/6 hover:text-white active:scale-[0.98]"
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

    <section class="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <!-- Total -->
      <div
        class="relative overflow-hidden rounded-2xl border border-white/10 bg-white/3 p-4 shadow-sm transition hover:-translate-y-0.5 hover:bg-white/5 sm:p-5"
      >
        <div class="absolute left-0 top-0 h-full w-1 bg-cyan-400"></div>

        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-[11px] font-semibold uppercase tracking-wide text-slate-400"
            >
              Total
            </p>

            <p class="mt-2 text-2xl font-bold text-white">
              {{ totalMessages }}
            </p>

            <p class="mt-1 text-[10px] text-slate-500">All messages</p>
          </div>

          <div
            class="hidden rounded-xl bg-cyan-500/10 p-2.5 text-cyan-400 sm:block"
          >
            <Mail class="h-5 w-5" />
          </div>
        </div>
      </div>

      <!-- New -->
      <div
        class="relative overflow-hidden rounded-2xl border border-white/10 bg-white/3 p-4 shadow-sm transition hover:-translate-y-0.5 hover:bg-white/5 sm:p-5"
      >
        <div class="absolute left-0 top-0 h-full w-1 bg-amber-400"></div>

        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-[11px] font-semibold uppercase tracking-wide text-slate-400"
            >
              New
            </p>

            <p class="mt-2 text-2xl font-bold text-white">
              {{ newMessages }}
            </p>

            <p class="mt-1 text-[10px] text-slate-500">Need attention</p>
          </div>

          <div
            class="hidden rounded-xl bg-amber-500/10 p-2.5 text-amber-400 sm:block"
          >
            <MailOpen class="h-5 w-5" />
          </div>
        </div>
      </div>

      <!-- Replied -->
      <div
        class="relative overflow-hidden rounded-2xl border border-white/10 bg-white/3 p-4 shadow-sm transition hover:-translate-y-0.5 hover:bg-white/5 sm:p-5"
      >
        <div class="absolute left-0 top-0 h-full w-1 bg-emerald-400"></div>

        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-[11px] font-semibold uppercase tracking-wide text-slate-400"
            >
              Replied
            </p>

            <p class="mt-2 text-2xl font-bold text-white">
              {{ repliedMessages }}
            </p>

            <p class="mt-1 text-[10px] text-slate-500">Handled messages</p>
          </div>

          <div
            class="hidden rounded-xl bg-emerald-500/10 p-2.5 text-emerald-400 sm:block"
          >
            <CheckCircle2 class="h-5 w-5" />
          </div>
        </div>
      </div>

      <!-- Archived -->
      <div
        class="relative overflow-hidden rounded-2xl border border-white/10 bg-white/3 p-4 shadow-sm transition hover:-translate-y-0.5 hover:bg-white/5 sm:p-5"
      >
        <div class="absolute left-0 top-0 h-full w-1 bg-slate-400"></div>

        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-[11px] font-semibold uppercase tracking-wide text-slate-400"
            >
              Archived
            </p>

            <p class="mt-2 text-2xl font-bold text-white">
              {{ archivedMessages }}
            </p>

            <p class="mt-1 text-[10px] text-slate-500">Stored messages</p>
          </div>

          <div
            class="hidden rounded-xl bg-slate-500/10 p-2.5 text-slate-400 sm:block"
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
      class="overflow-hidden rounded-2xl border border-white/10 bg-white/3 shadow-sm"
    >
      <!-- TOOLBAR -->
      <div class="border-b border-white/10 bg-white/2 p-4 sm:p-5">
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
              class="w-full rounded-xl border border-white/10 bg-slate-900/60 py-2.5 pl-10 pr-10 text-xs text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:bg-slate-900 focus:ring-4 focus:ring-cyan-500/5"
              @input="handleSearch"
            />

            <button
              v-if="searchQuery"
              type="button"
              class="absolute right-2.5 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-lg p-1 text-slate-400 transition hover:bg-white/10 hover:text-white"
              title="Clear search"
              @click="
                searchQuery = '';
                currentPage = 1;
              "
            >
              <X class="h-3.5 w-3.5" />
            </button>
          </div>

          <!-- Controls -->
          <div class="flex flex-wrap items-center gap-2">
            <!-- Status -->
            <div class="relative">
              <SlidersHorizontal
                class="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
              />

              <select
                v-model="statusFilter"
                class="appearance-none rounded-xl border border-white/10 bg-slate-900/60 py-2.5 pl-9 pr-9 text-xs font-semibold text-slate-300 outline-none transition hover:bg-white/5 focus:border-cyan-400 focus:bg-slate-900 focus:ring-4 focus:ring-cyan-500/5"
                @change="currentPage = 1"
              >
                <option value="all">All Status</option>

                <option value="new">New</option>

                <option value="read">Read</option>

                <option value="replied">Replied</option>

                <option value="archived">Archived</option>
              </select>
            </div>

            <!-- Important -->
            <button
              type="button"
              class="inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition"
              :class="
                importantOnly
                  ? 'border-amber-400/20 bg-amber-500/10 text-amber-400'
                  : 'border-white/10 bg-white/3 text-slate-400 hover:bg-white/5 hover:text-white'
              "
              @click="
                importantOnly = !importantOnly;
                currentPage = 1;
              "
            >
              <Star
                class="h-3.5 w-3.5"
                :class="{
                  'fill-amber-400 text-amber-400': importantOnly,
                }"
              />

              Important

              <span
                v-if="importantMessages"
                class="rounded-full px-1.5 py-0.5 text-[9px]"
                :class="
                  importantOnly
                    ? 'bg-amber-400/10 text-amber-400'
                    : 'bg-white/6 text-slate-500'
                "
              >
                {{ importantMessages }}
              </span>
            </button>

            <!-- Clear -->
            <button
              v-if="hasActiveFilters"
              type="button"
              class="inline-flex items-center gap-1 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-500 transition hover:bg-white/5 hover:text-white"
              @click="resetFilters"
            >
              <X class="h-3.5 w-3.5" />
              Clear
            </button>
          </div>
        </div>

        <!-- Result Info -->
        <div
          class="mt-4 flex flex-col gap-2 border-t border-white/10 pt-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div class="flex items-center gap-2">
            <span class="text-[11px] font-medium text-slate-400">
              {{ statusLabel }}
            </span>

            <span
              v-if="importantOnly"
              class="h-1 w-1 rounded-full bg-slate-600"
            ></span>

            <span
              v-if="importantOnly"
              class="text-[11px] font-semibold text-amber-400"
            >
              Important only
            </span>
          </div>

          <div class="flex items-center gap-3">
            <p class="text-[11px] text-slate-500">
              Showing

              <span class="font-semibold text-slate-300">
                {{ startItem }}
              </span>

              -

              <span class="font-semibold text-slate-300">
                {{ endItem }}
              </span>

              of

              <span class="font-semibold text-slate-300">
                {{ filteredMessages.length }}
              </span>
            </p>

            <span
              v-if="newMessages"
              class="hidden h-1 w-1 rounded-full bg-cyan-500 sm:block"
            ></span>

            <p
              v-if="newMessages"
              class="hidden text-[11px] font-semibold text-cyan-400 sm:block"
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
        @reply="openReply"
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
      :message="showDetails ? selectedMessage : null"
      @close="closeDetails"
      @reply="openReply"
      @archive="archive"
      @delete="removeMessage"
      @toggle-important="toggleImportant"
    />

    <!-- =====================================================
         MESSAGE REPLY
    ====================================================== -->

    <MessageReply
      v-if="showReply"
      :message="selectedMessage"
      :loading="replyLoading"
      @close="closeReply"
      @send="sendReply"
    />
  </div>
</template>
