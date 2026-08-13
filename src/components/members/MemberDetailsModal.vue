<script setup>
import { X, Phone, MapPin } from "@lucide/vue";

defineProps({
  member: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close"]);
</script>

<template>
  <!-- Overlay -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md"
    @click.self="emit('close')"
  >
    <!-- Modal -->
    <div
      class="relative w-full max-w-md overflow-hidden rounded-3xl bg-slate-900/95 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-cyan-500/10"
    >
      <!-- Top Area -->
      <div
        class="relative px-6 pt-8 pb-10 text-center overflow-hidden bg-linear-to-br from-blue-500/20 via-slate-900 to-cyan-500/10"
      >
        <!-- Decorative Glow -->
        <div
          class="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-cyan-400/10 blur-3xl"
        ></div>

        <!-- Close Button -->
        <button
          @click="emit('close')"
          type="button"
          class="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:bg-red-500/10 hover:border-red-400/20 hover:text-red-400 transition-all duration-300"
          aria-label="Close"
        >
          <X :size="18" />
        </button>

        <!-- Avatar -->
        <div
          class="relative mx-auto mb-4 w-20 h-20 flex items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-cyan-400 text-white text-2xl font-bold shadow-lg shadow-cyan-500/20"
        >
          {{ member.name?.charAt(0) }}
        </div>

        <!-- Name -->
        <h3 class="relative text-xl sm:text-2xl font-bold text-white">
          {{ member.name }}
        </h3>

        <!-- Designation -->
        <p class="relative mt-1 text-sm text-cyan-400">
          {{ member.designation }}
        </p>
      </div>

      <!-- Information -->
      <div class="p-5 sm:p-6 space-y-3">
        <!-- Mobile -->
        <div
          class="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/20 transition-all duration-300"
        >
          <!-- Icon -->
          <div
            class="w-10 h-10 shrink-0 flex items-center justify-center rounded-xl bg-cyan-400/10 border border-cyan-400/10 text-cyan-400"
          >
            <Phone :size="18" />
          </div>

          <!-- Content -->
          <div class="min-w-0">
            <p class="text-xs text-gray-500">Mobile Number</p>

            <p class="mt-1 font-medium text-gray-200 truncate">
              {{ member.mobile }}
            </p>
          </div>
        </div>

        <!-- Address -->
        <div
          class="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/20 transition-all duration-300"
        >
          <!-- Icon -->
          <div
            class="w-10 h-10 shrink-0 flex items-center justify-center rounded-xl bg-blue-400/10 border border-blue-400/10 text-blue-400"
          >
            <MapPin :size="18" />
          </div>

          <!-- Content -->
          <div class="min-w-0">
            <p class="text-xs text-gray-500">Short Address</p>

            <p class="mt-1 font-medium text-gray-200 break-words">
              {{ member.address }}
            </p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="px-5 sm:px-6 pb-5 sm:pb-6">
        <button
          @click="emit('close')"
          type="button"
          class="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-medium hover:bg-cyan-400 hover:border-cyan-400 hover:text-slate-950 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>
