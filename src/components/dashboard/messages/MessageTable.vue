<script setup>
import {
  Eye,
  Reply,
  Archive,
  Trash2,
  Star,
  MailOpen,
  Mail,
} from "@lucide/vue";

import MessageStatusBadge from "./MessageStatusBadge.vue";

defineProps({
  messages: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits([
  "view",
  "reply",
  "archive",
  "delete",
  "toggle-important",
  "toggle-read",
]);

const formatDate = (date) => {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

const getInitials = (name) => {
  if (!name) return "?";

  return name
    .split(" ")
    .slice(0, 2)
    .map((item) => item.charAt(0))
    .join("")
    .toUpperCase();
};

const truncate = (text, length = 65) => {
  if (!text) return "";

  return text.length > length
    ? `${text.slice(0, length)}...`
    : text;
};
</script>

<template>
  <div class="overflow-hidden">

    <!-- Desktop -->
    <div class="hidden overflow-x-auto lg:block">
      <table class="w-full">

        <thead>
          <tr class="border-b border-slate-200 bg-slate-50/80">
            <th
              class="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400"
            >
              Sender
            </th>

            <th
              class="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400"
            >
              Subject
            </th>

            <th
              class="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400"
            >
              Received
            </th>

            <th
              class="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400"
            >
              Status
            </th>

            <th
              class="px-5 py-3.5 text-right text-[11px] font-bold uppercase tracking-wider text-slate-400"
            >
              Action
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-slate-100">

          <tr
            v-for="message in messages"
            :key="message.id"
            class="group transition hover:bg-slate-50/70"
            :class="{
              'bg-slate-900/60 text-white':
                message.status === 'new',
            }"
          >

            <!-- Sender -->
            <td class="px-5 py-4">
              <div class="flex items-center gap-3">

                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-xs font-bold text-cyan-500"
                >
                  {{ getInitials(message.name) }}
                </div>

                <div class="min-w-0">
                  <div class="flex items-center gap-1.5">
                    <p
                      class="truncate text-sm font-semibold"
                      :class="
                        message.status === 'new'
                          ? 'text-slate-900'
                          : 'text-slate-700'
                      "
                    >
                      {{ message.name }}
                    </p>

                    <Star
                      v-if="message.isImportant"
                      class="h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-400"
                    />
                  </div>

                  <p class="mt-0.5 truncate text-xs text-slate-400">
                    {{ message.email }}
                  </p>
                </div>

              </div>
            </td>

            <!-- Subject -->
            <td class="max-w-[320px] px-5 py-4">
              <p
                class="truncate text-sm"
                :class="
                  message.status === 'new'
                    ? 'font-semibold text-slate-800'
                    : 'font-medium text-slate-600'
                "
              >
                {{ message.subject }}
              </p>

              <p class="mt-1 truncate text-xs text-slate-400">
                {{ truncate(message.message) }}
              </p>
            </td>

            <!-- Date -->
            <td class="whitespace-nowrap px-5 py-4">
              <p class="text-xs font-medium text-slate-500">
                {{ formatDate(message.createdAt) }}
              </p>
            </td>

            <!-- Status -->
            <td class="px-5 py-4">
              <MessageStatusBadge
                :status="message.status"
              />
            </td>

            <!-- Actions -->
            <td class="px-5 py-4">
              <div class="flex items-center justify-end gap-0.5">

                <button
                  type="button"
                  title="View"
                  class="rounded-lg p-2 text-slate-400 transition hover:bg-[var(--theme-primary)]/10 hover:text-[var(--theme-primary)]"
                  @click="emit('view', message)"
                >
                  <Eye class="h-4 w-4" />
                </button>

                <button
                  type="button"
                  title="Reply"
                  class="rounded-lg p-2 text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-600"
                  @click="emit('reply', message)"
                >
                  <Reply class="h-4 w-4" />
                </button>

                <button
                  type="button"
                  :title="
                    message.status === 'new'
                      ? 'Mark as read'
                      : 'Mark as unread'
                  "
                  class="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  @click="emit('toggle-read', message)"
                >
                  <MailOpen
                    v-if="message.status === 'new'"
                    class="h-4 w-4"
                  />

                  <Mail
                    v-else
                    class="h-4 w-4"
                  />
                </button>

                <button
                  type="button"
                  title="Archive"
                  class="rounded-lg p-2 text-slate-400 transition hover:bg-amber-50 hover:text-amber-600"
                  @click="emit('archive', message)"
                >
                  <Archive class="h-4 w-4" />
                </button>

                <button
                  type="button"
                  title="Delete"
                  class="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                  @click="emit('delete', message)"
                >
                  <Trash2 class="h-4 w-4" />
                </button>

              </div>
            </td>

          </tr>

          <tr v-if="!messages.length">
            <td colspan="5">
              <div class="px-6 py-16 text-center">

                <div
                  class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100"
                >
                  <Mail class="h-5 w-5 text-slate-400" />
                </div>

                <h3 class="mt-4 text-sm font-semibold text-slate-700">
                  No messages found
                </h3>

                <p class="mt-1 text-xs text-slate-400">
                  Try changing your search or filter.
                </p>

              </div>
            </td>
          </tr>

        </tbody>
      </table>
    </div>

    <!-- Mobile -->
    <div class="divide-y divide-slate-100 lg:hidden">

      <div
        v-for="message in messages"
        :key="message.id"
        class="p-4"
      >
        <div class="flex gap-3">

          <div
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--theme-primary)]/10 text-xs font-bold text-[var(--theme-primary)]"
          >
            {{ getInitials(message.name) }}
          </div>

          <div class="min-w-0 flex-1">

            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0">

                <div class="flex items-center gap-1.5">
                  <p class="truncate text-sm font-semibold text-slate-800">
                    {{ message.name }}
                  </p>

                  <Star
                    v-if="message.isImportant"
                    class="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                  />
                </div>

                <p class="truncate text-xs text-slate-400">
                  {{ message.email }}
                </p>

              </div>

              <MessageStatusBadge
                :status="message.status"
              />
            </div>

            <p class="mt-3 text-sm font-semibold text-slate-700">
              {{ message.subject }}
            </p>

            <p class="mt-1 text-xs leading-5 text-slate-400">
              {{ truncate(message.message, 90) }}
            </p>

            <div class="mt-3 flex items-center justify-between">

              <span class="text-[11px] text-slate-400">
                {{ formatDate(message.createdAt) }}
              </span>

              <div class="flex items-center gap-0.5">

                <button
                  type="button"
                  class="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                  @click="emit('view', message)"
                >
                  <Eye class="h-4 w-4" />
                </button>

                <button
                  type="button"
                  class="rounded-lg p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600"
                  @click="emit('reply', message)"
                >
                  <Reply class="h-4 w-4" />
                </button>

                <button
                  type="button"
                  class="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                  @click="emit('delete', message)"
                >
                  <Trash2 class="h-4 w-4" />
                </button>

              </div>
            </div>

          </div>
        </div>
      </div>

      <div
        v-if="!messages.length"
        class="px-5 py-16 text-center"
      >
        <Mail class="mx-auto h-7 w-7 text-slate-300" />

        <p class="mt-3 text-sm font-semibold text-slate-700">
          No messages found
        </p>
      </div>

    </div>

  </div>
</template>