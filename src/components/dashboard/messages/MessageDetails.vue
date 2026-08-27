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
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
        @click.self="emit('close')"
      >

        <div
          class="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        >

          <!-- Header -->
          <div
            class="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6"
          >
            <div>

              <div class="flex flex-wrap items-center gap-2">
                <h2 class="text-base font-bold text-slate-800">
                  Message Details
                </h2>

                <MessageStatusBadge
                  :status="message.status"
                />
              </div>

              <p class="mt-1 text-[11px] text-slate-400">
                Received
                {{ formatDateTime(message.createdAt) }}
              </p>

            </div>

            <button
              type="button"
              class="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              @click="emit('close')"
            >
              <X class="h-5 w-5" />
            </button>
          </div>

          <!-- Body -->
          <div class="overflow-y-auto p-5 sm:p-6">

            <!-- Sender -->
            <div
              class="rounded-xl bg-slate-50 p-4"
            >

              <div class="flex items-start justify-between gap-4">

                <div class="flex min-w-0 items-center gap-3">

                  <div
                    class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900/60 font-bold text-white"
                  >
                    {{ message.name?.charAt(0)?.toUpperCase() }}
                  </div>

                  <div class="min-w-0">

                    <div class="flex items-center gap-2">
                      <h3 class="truncate text-sm font-bold text-slate-800">
                        {{ message.name }}
                      </h3>

                      <Star
                        v-if="message.isImportant"
                        class="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                      />
                    </div>

                    <div
                      class="mt-1 flex flex-col gap-1 text-xs text-slate-400 sm:flex-row sm:gap-4"
                    >
                      <span class="flex items-center gap-1.5">
                        <Mail class="h-3.5 w-3.5" />
                        {{ message.email }}
                      </span>

                      <span
                        v-if="message.phone"
                        class="flex items-center gap-1.5"
                      >
                        <Phone class="h-3.5 w-3.5" />
                        {{ message.phone }}
                      </span>
                    </div>

                  </div>
                </div>

                <button
                  type="button"
                  class="shrink-0 rounded-lg p-2 transition hover:bg-white"
                  :class="
                    message.isImportant
                      ? 'text-amber-500'
                      : 'text-slate-300 hover:text-amber-500'
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

              <p
                class="text-[10px] font-bold uppercase tracking-wider text-slate-400"
              >
                Subject
              </p>

              <h3 class="mt-2 text-lg font-bold text-slate-800">
                {{ message.subject }}
              </h3>

            </div>

            <!-- Message -->
            <div class="mt-6">

              <p
                class="text-[10px] font-bold uppercase tracking-wider text-slate-400"
              >
                Message
              </p>

              <div
                class="mt-2 rounded-xl border border-slate-100 bg-slate-50/60 p-4"
              >
                <p
                  class="whitespace-pre-line text-sm leading-7 text-slate-600"
                >
                  {{ message.message }}
                </p>
              </div>

            </div>

            <!-- Activity -->
            <div class="mt-6">

              <p
                class="text-[10px] font-bold uppercase tracking-wider text-slate-400"
              >
                Activity
              </p>

              <div class="mt-3 grid gap-3 sm:grid-cols-3">

                <div
                  class="rounded-xl border border-slate-100 p-3"
                >
                  <div class="flex items-center gap-2 text-slate-400">
                    <CalendarDays class="h-4 w-4" />

                    <span class="text-[11px] font-medium">
                      Received
                    </span>
                  </div>

                  <p class="mt-2 text-xs font-semibold text-slate-700">
                    {{ formatDateTime(message.createdAt) }}
                  </p>
                </div>

                <div
                  class="rounded-xl border border-slate-100 p-3"
                >
                  <div class="flex items-center gap-2 text-slate-400">
                    <CheckCircle2 class="h-4 w-4" />

                    <span class="text-[11px] font-medium">
                      Read
                    </span>
                  </div>

                  <p class="mt-2 text-xs font-semibold text-slate-700">
                    {{ formatDateTime(message.readAt) }}
                  </p>
                </div>

                <div
                  class="rounded-xl border border-slate-100 p-3"
                >
                  <div class="flex items-center gap-2 text-slate-400">
                    <Reply class="h-4 w-4" />

                    <span class="text-[11px] font-medium">
                      Replied
                    </span>
                  </div>

                  <p class="mt-2 text-xs font-semibold text-slate-700">
                    {{ formatDateTime(message.repliedAt) }}
                  </p>
                </div>

              </div>

            </div>

          </div>

          <!-- Footer -->
          <div
            class="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-6"
          >

            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50"
              @click="emit('delete', message)"
            >
              <Trash2 class="h-4 w-4" />
              Delete
            </button>

            <div class="flex flex-wrap gap-2">

              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
                @click="emit('archive', message)"
              >
                <Archive class="h-4 w-4" />
                Archive
              </button>

              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-lg bg-slate-900/60 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:opacity-90"
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
  transform: scale(0.97) translateY(8px);
}
</style>