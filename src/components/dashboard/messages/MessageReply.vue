
<!-- MessageReply.vue -->

<script setup>
import {
  X,
  Mail,
  User,
  Send,
  FileText,
  LoaderCircle,
} from "@lucide/vue";

import { reactive, ref, watch } from "vue";

const props = defineProps({
  message: {
    type: Object,
    default: null,
  },

  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  "close",
  "send",
]);

const form = reactive({
  email: "",
  subject: "",
  body: "",
});

const errors = reactive({
  body: "",
});

const submitted = ref(false);

/*
|--------------------------------------------------------------------------
| Fill reply information when message changes
|--------------------------------------------------------------------------
*/
watch(
  () => props.message,
  (message) => {
    if (!message) return;

    form.email = message.email || "";
    form.subject = message.subject
      ? `Re: ${message.subject}`
      : "Re:";

    form.body = "";

    errors.body = "";
    submitted.value = false;
  },
  { immediate: true }
);

/*
|--------------------------------------------------------------------------
| Submit Reply
|--------------------------------------------------------------------------
*/
const submitReply = () => {
  submitted.value = true;

  errors.body = "";

  if (!form.body.trim()) {
    errors.body = "Please write a reply message.";
    return;
  }

  emit("send", {
    messageId: props.message?.id,
    email: form.email,
    subject: form.subject,
    body: form.body.trim(),
  });
};
</script>

<template>
  <Teleport to="body">
    <div
      v-if="message"
      class="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/80 p-3 backdrop-blur-md sm:p-5"
      @click.self="emit('close')"
    >
      <!-- =====================================================
           REPLY MODAL
      ====================================================== -->
      <div
        class="relative flex max-h-[94vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 shadow-2xl shadow-black/40 backdrop-blur-2xl"
      >
        <!-- Decorative Glow -->
        <div
          class="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl"
        ></div>

        <div
          class="pointer-events-none absolute -bottom-24 -left-20 h-52 w-52 rounded-full bg-cyan-400/5 blur-3xl"
        ></div>

        <!-- =================================================
             HEADER
        ================================================== -->
        <div
          class="relative flex items-center justify-between border-b border-white/10 bg-white/3 px-5 py-4 sm:px-6"
        >
          <div class="flex min-w-0 items-center gap-3">
            <div
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400 ring-1 ring-cyan-400/10"
            >
              <Send class="h-4 w-4" />
            </div>

            <div class="min-w-0">
              <h2
                class="text-sm font-bold text-white sm:text-base"
              >
                Reply to Message
              </h2>

              <p
                class="mt-0.5 truncate text-[11px] text-slate-500"
              >
                Replying to
                {{ message.name || "Unknown Sender" }}
              </p>
            </div>
          </div>

          <!-- Close -->
          <button
            type="button"
            class="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/4 text-slate-400 transition-all duration-200 hover:border-red-400/20 hover:bg-red-400/10 hover:text-red-400"
            title="Close"
            :disabled="loading"
            @click="emit('close')"
          >
            <X class="h-4 w-4" />
          </button>
        </div>

        <!-- =================================================
             BODY
        ================================================== -->
        <div class="relative min-h-0 flex-1 overflow-y-auto">
          <form
            class="p-5 sm:p-6"
            @submit.prevent="submitReply"
          >
            <!-- =================================================
                 RECIPIENT
            ================================================== -->
            <div>
              <label
                class="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500"
              >
                <Mail class="h-3.5 w-3.5 text-cyan-400" />
                To
              </label>

              <div
                class="flex items-center gap-3 rounded-xl border border-white/10 bg-white/3 px-3.5 py-3"
              >
                <div
                  class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400"
                >
                  <User class="h-4 w-4" />
                </div>

                <div class="min-w-0">
                  <p
                    class="truncate text-xs font-semibold text-slate-200"
                  >
                    {{ message.name || "Unknown Sender" }}
                  </p>

                  <p
                    class="truncate text-[11px] text-slate-500"
                  >
                    {{ form.email || "No email address" }}
                  </p>
                </div>
              </div>
            </div>

            <!-- =================================================
                 SUBJECT
            ================================================== -->
            <div class="mt-5">
              <label
                for="reply-subject"
                class="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500"
              >
                <FileText
                  class="h-3.5 w-3.5 text-cyan-400"
                />
                Subject
              </label>

              <input
                id="reply-subject"
                v-model="form.subject"
                type="text"
                readonly
                class="w-full rounded-xl border border-white/10 bg-white/3 px-3.5 py-3 text-sm text-slate-300 outline-none placeholder:text-slate-600"
              />
            </div>

            <!-- =================================================
                 MESSAGE
            ================================================== -->
            <div class="mt-5">
              <div
                class="mb-2 flex items-center justify-between"
              >
                <label
                  for="reply-message"
                  class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500"
                >
                  <Mail
                    class="h-3.5 w-3.5 text-cyan-400"
                  />
                  Your Reply
                </label>

                <span
                  class="text-[10px] text-slate-600"
                >
                  {{ form.body.length }} characters
                </span>
              </div>

              <textarea
                id="reply-message"
                v-model="form.body"
                rows="8"
                placeholder="Write your reply..."
                :disabled="loading"
                class="w-full resize-none rounded-xl border border-white/10 bg-white/3 px-4 py-3 text-sm leading-7 text-slate-300 outline-none transition-all duration-200 placeholder:text-slate-600 focus:border-cyan-400/30 focus:bg-cyan-400/2] focus:ring-2 focus:ring-cyan-400/5 disabled:cursor-not-allowed disabled:opacity-50"
                :class="{
                  'border-red-400/30 focus:border-red-400/40 focus:ring-red-400/5':
                    submitted && errors.body,
                }"
              ></textarea>

              <p
                v-if="submitted && errors.body"
                class="mt-1.5 text-[11px] font-medium text-red-400"
              >
                {{ errors.body }}
              </p>
            </div>

            <!-- =================================================
                 ORIGINAL MESSAGE PREVIEW
            ================================================== -->
            <div class="mt-5">
              <div
                class="mb-2 flex items-center gap-2"
              >
                <div
                  class="h-1 w-5 rounded-full bg-cyan-400"
                ></div>

                <p
                  class="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500"
                >
                  Original Message
                </p>
              </div>

              <div
                class="rounded-xl border border-white/10 bg-white/2 p-4"
              >
                <p
                  class="whitespace-pre-line wrap-break-words text-xs leading-6 text-slate-500"
                >
                  {{
                    message.message ||
                    "No original message available."
                  }}
                </p>
              </div>
            </div>
          </form>
        </div>

        <!-- =================================================
             FOOTER
        ================================================== -->
        <div
          class="relative flex flex-wrap items-center justify-end gap-2 border-t border-white/10 bg-slate-950/50 px-5 py-4 sm:px-6"
        >
          <!-- Cancel -->
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/4 px-4 py-2.5 text-xs font-semibold text-slate-300 transition-all duration-200 hover:border-white/20 hover:bg-white/8 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="loading"
            @click="emit('close')"
          >
            Cancel
          </button>

          <!-- Send -->
          <button
            type="button"
            :disabled="loading"
            class="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-400/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-cyan-300 hover:shadow-cyan-400/30 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            @click="submitReply"
          >
            <LoaderCircle
              v-if="loading"
              class="h-4 w-4 animate-spin"
            />

            <Send
              v-else
              class="h-4 w-4"
            />

            {{ loading ? "Sending..." : "Send Reply" }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

