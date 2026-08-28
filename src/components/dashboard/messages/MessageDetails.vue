
<!-- MessageDetails.vue -->

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
  Clock3,
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

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};
</script>

<template>
  <Teleport to="body">
    <Transition name="message-modal">
      <div
        v-if="message"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-3 backdrop-blur-md sm:p-5"
        @click.self="emit('close')"
      >
        <!-- Modal -->
        <div
          class="relative flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 shadow-2xl shadow-cyan-950/30 backdrop-blur-2xl"
        >
          <!-- Decorative Glow -->
          <div
            class="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[var(--theme-primary)]/10 blur-3xl"
          ></div>

          <div
            class="pointer-events-none absolute -bottom-24 -left-20 h-52 w-52 rounded-full bg-cyan-400/5 blur-3xl"
          ></div>

          <!-- Header -->
          <div
            class="relative flex items-center justify-between border-b border-white/10 bg-white/[0.025] px-5 py-4 sm:px-6"
          >
            <div class="min-w-0">
              <div class="flex flex-wrap items-center gap-2">
                <div class="flex items-center gap-2">
                  <div
                    class="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]"
                  >
                    <Mail class="h-4 w-4" />
                  </div>

                  <h2
                    class="text-sm font-bold text-white sm:text-base"
                  >
                    Message Details
                  </h2>
                </div>

                <MessageStatusBadge :status="message.status" />
              </div>

              <p class="mt-1.5 pl-10 text-[11px] text-slate-500">
                Received {{ formatDateTime(message.createdAt) }}
              </p>
            </div>

            <button
              type="button"
              class="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 transition-all duration-200 hover:border-red-400/20 hover:bg-red-400/10 hover:text-red-400"
              @click="emit('close')"
            >
              <X class="h-4.5 w-4.5" />
            </button>
          </div>

          <!-- Body -->
          <div class="relative overflow-y-auto">
            <div class="p-5 sm:p-6">
              <!-- Sender Card -->
              <div
                class="rounded-2xl border border-white/10 bg-white/[0.035] p-4 shadow-inner shadow-white/[0.02]"
              >
                <div
                  class="flex items-start justify-between gap-4"
                >
                  <div class="flex min-w-0 items-center gap-3">
                    <!-- Avatar -->
                    <div
                      class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--theme-primary)]/20 bg-[var(--theme-primary)]/10 font-bold text-[var(--theme-primary)] shadow-lg shadow-[var(--theme-primary)]/5"
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
                      <div class="flex items-center gap-2">
                        <h3
                          class="truncate text-sm font-bold text-white"
                        >
                          {{ message.name || "Unknown Sender" }}
                        </h3>

                        <Star
                          v-if="message.isImportant"
                          class="h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-400"
                        />
                      </div>

                      <div
                        class="mt-1.5 flex flex-col gap-1.5 text-xs text-slate-500 sm:flex-row sm:gap-4"
                      >
                        <span class="flex items-center gap-1.5">
                          <Mail
                            class="h-3.5 w-3.5 text-[var(--theme-primary)]"
                          />
                          <span class="truncate">
                            {{ message.email }}
                          </span>
                        </span>

                        <span
                          v-if="message.phone"
                          class="flex items-center gap-1.5"
                        >
                          <Phone
                            class="h-3.5 w-3.5 text-[var(--theme-primary)]"
                          />
                          {{ message.phone }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Important -->
                  <button
                    type="button"
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-200"
                    :class="
                      message.isImportant
                        ? 'border-amber-400/20 bg-amber-400/10 text-amber-400'
                        : 'border-white/10 bg-white/[0.03] text-slate-500 hover:border-amber-400/20 hover:bg-amber-400/10 hover:text-amber-400'
                    "
                    title="Toggle important"
                    @click="emit('toggle-important', message)"
                  >
                    <Star
                      class="h-4 w-4"
                      :class="{
                        'fill-amber-400': message.isImportant,
                      }"
                    />
                  </button>
                </div>
              </div>

              <!-- Subject -->
              <div class="mt-6">
                <div class="mb-2 flex items-center gap-2">
                  <div
                    class="h-1 w-5 rounded-full bg-[var(--theme-primary)]"
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

              <!-- Message -->
              <div class="mt-6">
                <div class="mb-2 flex items-center gap-2">
                  <div
                    class="h-1 w-5 rounded-full bg-[var(--theme-primary)]"
                  ></div>

                  <p
                    class="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500"
                  >
                    Message
                  </p>
                </div>

                <div
                  class="rounded-2xl border border-white/10 bg-white/[0.025] p-5"
                >
                  <p
                    class="whitespace-pre-line text-sm leading-7 text-slate-300"
                  >
                    {{ message.message || "No message content available." }}
                  </p>
                </div>
              </div>

              <!-- Activity -->
              <div class="mt-6">
                <div class="mb-3 flex items-center gap-2">
                  <div
                    class="h-1 w-5 rounded-full bg-[var(--theme-primary)]"
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
                    class="group rounded-xl border border-white/10 bg-white/[0.025] p-3.5 transition-all duration-200 hover:border-[var(--theme-primary)]/20 hover:bg-[var(--theme-primary)]/[0.03]"
                  >
                    <div
                      class="flex items-center gap-2 text-slate-500"
                    >
                      <div
                        class="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]"
                      >
                        <CalendarDays class="h-3.5 w-3.5" />
                      </div>

                      <span class="text-[11px] font-medium">
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
                    class="group rounded-xl border border-white/10 bg-white/[0.025] p-3.5 transition-all duration-200 hover:border-emerald-400/20 hover:bg-emerald-400/[0.03]"
                  >
                    <div
                      class="flex items-center gap-2 text-slate-500"
                    >
                      <div
                        class="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-400"
                      >
                        <CheckCircle2 class="h-3.5 w-3.5" />
                      </div>

                      <span class="text-[11px] font-medium">
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
                    class="group rounded-xl border border-white/10 bg-white/[0.025] p-3.5 transition-all duration-200 hover:border-cyan-400/20 hover:bg-cyan-400/[0.03]"
                  >
                    <div
                      class="flex items-center gap-2 text-slate-500"
                    >
                      <div
                        class="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400"
                      >
                        <Reply class="h-3.5 w-3.5" />
                      </div>

                      <span class="text-[11px] font-medium">
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

          <!-- Footer -->
          <div
            class="relative flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-slate-950/40 px-5 py-4 sm:px-6"
          >
            <!-- Delete -->
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-xl border border-red-400/10 bg-red-400/[0.04] px-3.5 py-2.5 text-xs font-semibold text-red-400 transition-all duration-200 hover:border-red-400/20 hover:bg-red-400/10"
              @click="emit('delete', message)"
            >
              <Trash2 class="h-4 w-4" />
              Delete
            </button>

            <div class="flex flex-wrap gap-2">
              <!-- Archive -->
              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs font-semibold text-slate-300 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                @click="emit('archive', message)"
              >
                <Archive class="h-4 w-4" />
                Archive
              </button>

              <!-- Reply -->
              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-xl bg-[var(--theme-primary)] px-4 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-[var(--theme-primary)]/20 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
                @click="emit('reply', message)"
              >
                <Reply class="h-4 w-4" />
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.message-modal-enter-active,
.message-modal-leave-active {
  transition: opacity 0.2s ease;
}

.message-modal-enter-active > div,
.message-modal-leave-active > div {
  transition: transform 0.2s ease;
}

.message-modal-enter-from,
.message-modal-leave-to {
  opacity: 0;
}

.message-modal-enter-from > div,
.message-modal-leave-to > div {
  transform: scale(0.97) translateY(10px);
}
</style>
