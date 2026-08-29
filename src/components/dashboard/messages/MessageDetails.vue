<!-- src/components/dashboard/messages/MessageDetails.vue -->

<script setup>
import {
  X,
  Mail,
  Phone,
  CalendarDays,
  Star,
  Reply,
  Archive,
  Trash2,
  CheckCircle2,
  User,
} from "@lucide/vue";

import MessageStatusBadge from "./MessageStatusBadge.vue";

defineProps({
  message: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits([
  "close",
  "reply",
  "archive",
  "delete",
  "toggle-important",
]);

const formatDateTime = (date) => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(parsedDate);
};
</script>

<template>
  <Teleport to="body">
    <div
      v-if="message"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-3 backdrop-blur-md sm:p-5"
      @click.self="emit('close')"
    >
      <!-- Modal -->
      <div
        class="relative flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/50"
      >
        <!-- Decorative Glow -->
        <div
          class="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl"
        ></div>

        <div
          class="pointer-events-none absolute -bottom-24 -left-20 h-52 w-52 rounded-full bg-cyan-400/5 blur-3xl"
        ></div>

        <!-- =====================================================
             HEADER
        ====================================================== -->
        <div
          class="relative flex shrink-0 items-center justify-between border-b border-white/10 bg-white/3 px-5 py-4 sm:px-6"
        >
          <div class="min-w-0">
            <div class="flex flex-wrap items-center gap-2">
              <!-- Title -->
              <div class="flex items-center gap-2">
                <div
                  class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400"
                >
                  <Mail class="h-4 w-4" />
                </div>

                <h2 class="text-sm font-bold text-white sm:text-base">
                  Message Details
                </h2>
              </div>

              <!-- Status -->
              <MessageStatusBadge :status="message.status" />
            </div>

            <p class="mt-1.5 pl-10 text-[11px] text-slate-500">
              Received {{ formatDateTime(message.createdAt) }}
            </p>
          </div>

          <!-- Close -->
          <button
            type="button"
            class="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/4 text-slate-400 transition hover:border-red-400/20 hover:bg-red-400/10 hover:text-red-400"
            title="Close"
            @click="emit('close')"
          >
            <X class="h-4 w-4" />
          </button>
        </div>

        <!-- =====================================================
             BODY
        ====================================================== -->
        <div class="relative min-h-0 overflow-y-auto">
          <div class="space-y-6 p-5 sm:p-6">
            <!-- =================================================
                 SENDER CARD
            ================================================== -->
            <div
              class="rounded-2xl border border-white/10 bg-white/3 p-4"
            >
              <div
                class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <!-- Sender -->
                <div class="flex min-w-0 items-center gap-3">
                  <!-- Avatar -->
                  <div
                    class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 font-bold text-cyan-400 shadow-lg shadow-cyan-400/5"
                  >
                    <span
                      v-if="message.name"
                      class="text-sm"
                    >
                      {{ message.name.charAt(0).toUpperCase() }}
                    </span>

                    <User
                      v-else
                      class="h-5 w-5"
                    />
                  </div>

                  <!-- Sender Info -->
                  <div class="min-w-0">
                    <!-- Name -->
                    <div class="flex items-center gap-2">
                      <h3
                        class="truncate text-sm font-bold text-white"
                      >
                        {{ message.name || "Unknown Sender" }}
                      </h3>

                      <Star
                        v-if="message.isImportant"
                        class="h-4 w-4 shrink-0 fill-amber-400 text-amber-400"
                      />
                    </div>

                    <!-- Email -->
                    <div
                      class="mt-1.5 flex min-w-0 items-center gap-1.5 text-xs text-slate-500"
                    >
                      <Mail
                        class="h-3.5 w-3.5 shrink-0 text-cyan-400"
                      />

                      <span class="truncate">
                        {{ message.email || "No email address" }}
                      </span>
                    </div>

                    <!-- Phone -->
                    <div
                      v-if="message.phone"
                      class="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500"
                    >
                      <Phone
                        class="h-3.5 w-3.5 shrink-0 text-cyan-400"
                      />

                      <span>
                        {{ message.phone }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Important Button -->
                <button
                  type="button"
                  class="flex h-9 w-9 shrink-0 items-center justify-center self-end rounded-xl border transition-all duration-200 sm:self-auto"
                  :class="
                    message.isImportant
                      ? 'border-amber-400/20 bg-amber-400/10 text-amber-400'
                      : 'border-white/10 bg-white/3 text-slate-500 hover:border-amber-400/20 hover:bg-amber-400/10 hover:text-amber-400'
                  "
                  title="Toggle important"
                  @click="emit('toggle-important', message)"
                >
                  <Star
                    class="h-4 w-4"
                    :class="{
                      'fill-amber-400 text-amber-400':
                        message.isImportant,
                    }"
                  />
                </button>
              </div>
            </div>

            <!-- =================================================
                 SUBJECT
            ================================================== -->
            <div>
              <div class="mb-2 flex items-center gap-2">
                <div
                  class="h-1 w-5 rounded-full bg-cyan-400"
                ></div>

                <p
                  class="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500"
                >
                  Subject
                </p>
              </div>

              <h3
                class="text-lg font-bold leading-7 text-white sm:text-xl"
              >
                {{ message.subject || "No Subject" }}
              </h3>
            </div>

            <!-- =================================================
                 MESSAGE
            ================================================== -->
            <div>
              <div class="mb-2 flex items-center gap-2">
                <div
                  class="h-1 w-5 rounded-full bg-cyan-400"
                ></div>

                <p
                  class="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500"
                >
                  Message
                </p>
              </div>

              <div
                class="rounded-2xl border border-white/10 bg-white/3 p-5"
              >
                <p
                  class="whitespace-pre-line text-sm leading-7 text-slate-300"
                >
                  {{
                    message.message ||
                    "No message content available."
                  }}
                </p>
              </div>
            </div>

            <!-- =================================================
                 ACTIVITY
            ================================================== -->
            <div>
              <div class="mb-3 flex items-center gap-2">
                <div
                  class="h-1 w-5 rounded-full bg-cyan-400"
                ></div>

                <p
                  class="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500"
                >
                  Activity
                </p>
              </div>

              <div class="grid gap-3 sm:grid-cols-3">
                <!-- Received -->
                <div
                  class="rounded-xl border border-white/10 bg-white/3 p-3.5 transition hover:border-cyan-400/20 hover:bg-cyan-400/3"
                >
                  <div class="flex items-center gap-2">
                    <div
                      class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400"
                    >
                      <CalendarDays class="h-3.5 w-3.5" />
                    </div>

                    <span
                      class="text-[11px] font-medium text-slate-500"
                    >
                      Received
                    </span>
                  </div>

                  <p
                    class="mt-3 text-xs font-semibold text-slate-300"
                  >
                    {{ formatDateTime(message.createdAt) }}
                  </p>
                </div>

                <!-- Read -->
                <div
                  class="rounded-xl border border-white/10 bg-white/3 p-3.5 transition hover:border-emerald-400/20 hover:bg-emerald-400/3"
                >
                  <div class="flex items-center gap-2">
                    <div
                      class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-400"
                    >
                      <CheckCircle2 class="h-3.5 w-3.5" />
                    </div>

                    <span
                      class="text-[11px] font-medium text-slate-500"
                    >
                      Read
                    </span>
                  </div>

                  <p
                    class="mt-3 text-xs font-semibold text-slate-300"
                  >
                    {{ formatDateTime(message.readAt) }}
                  </p>
                </div>

                <!-- Replied -->
                <div
                  class="rounded-xl border border-white/10 bg-white/3 p-3.5 transition hover:border-cyan-400/20 hover:bg-cyan-400/3"
                >
                  <div class="flex items-center gap-2">
                    <div
                      class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400"
                    >
                      <Reply class="h-3.5 w-3.5" />
                    </div>

                    <span
                      class="text-[11px] font-medium text-slate-500"
                    >
                      Replied
                    </span>
                  </div>

                  <p
                    class="mt-3 text-xs font-semibold text-slate-300"
                  >
                    {{ formatDateTime(message.repliedAt) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- =====================================================
             FOOTER
        ====================================================== -->
        <div
          class="relative flex shrink-0 flex-col gap-3 border-t border-white/10 bg-slate-950/50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
        >
          <!-- Delete -->
          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 rounded-xl border border-red-400/10 bg-red-400/4 px-3.5 py-2.5 text-xs font-semibold text-red-400 transition hover:border-red-400/20 hover:bg-red-400/10"
            @click="emit('delete', message)"
          >
            <Trash2 class="h-4 w-4" />
            Delete
          </button>

          <div class="flex flex-wrap gap-2">
            <!-- Archive -->
            <button
              type="button"
              class="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/4 px-3.5 py-2.5 text-xs font-semibold text-slate-300 transition hover:border-white/20 hover:bg-white/8 hover:text-white"
              @click="emit('archive', message)"
            >
              <Archive class="h-4 w-4" />
              Archive
            </button>

            <!-- Reply -->
            <button
              type="button"
              class="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:-translate-y-0.5 hover:bg-cyan-300"
              @click="emit('reply', message)"
            >
              <Reply class="h-4 w-4" />
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>