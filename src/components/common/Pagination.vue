
<!-- Pagination component for displaying pagination controls. -->


<script setup>
import { ChevronLeft, ChevronRight } from "@lucide/vue";

defineProps({
  currentPage: {
    type: Number,
    required: true,
  },

  totalPages: {
    type: Number,
    required: true,
  },

  startItem: {
    type: Number,
    default: 0,
  },

  endItem: {
    type: Number,
    default: 0,
  },

  totalItems: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["update:currentPage"]);

const goToPage = (page) => {
  emit("update:currentPage", page);
};
</script>

<template>
  <div
    v-if="totalItems"
    class="flex flex-col gap-3 border-t border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
  >
    <!-- Result Info -->
    <p class="text-xs text-slate-500">
      Showing
      <span class="text-slate-300"> {{ startItem }}–{{ endItem }} </span>
      of
      <span class="text-slate-300">
        {{ totalItems }}
      </span>
    </p>

    <!-- Pagination -->
    <div class="flex items-center gap-1">
      <!-- Previous -->
      <button
        type="button"
        class="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/3 text-slate-400 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
      >
        <ChevronLeft :size="17" />
      </button>

      <!-- Pages -->
      <button
        v-for="page in totalPages"
        :key="page"
        type="button"
        class="flex h-9 min-w-9 items-center justify-center rounded-lg border px-3 text-xs font-medium transition"
        :class="
          currentPage === page
            ? 'border-blue-500/30 bg-blue-600 text-white'
            : 'border-white/10 bg-white/3 text-slate-400 hover:bg-white/5 hover:text-white'
        "
        @click="goToPage(page)"
      >
        {{ page }}
      </button>

      <!-- Next -->
      <button
        type="button"
        class="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/3 text-slate-400 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
      >
        <ChevronRight :size="17" />
      </button>
    </div>
  </div>
</template>
