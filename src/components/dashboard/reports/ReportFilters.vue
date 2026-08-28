<script setup>
import {
  Search,
  X,
} from "@lucide/vue";

defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits([
  "update:modelValue",
  "apply",
  "reset",
]);

const updateField = (field, value) => {
  emit("update:modelValue", {
    ...arguments,
  });
};
</script>

<template>
  <div
    class="rounded-2xl border border-white/10 bg-white/3 p-4"
  >
    <div class="mb-4 flex items-center gap-2">
      <div
        class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400"
      >
        <Search :size="16" />
      </div>

      <div>
        <h3 class="text-sm font-semibold text-white">
          Report Filters
        </h3>

        <p class="text-xs text-slate-500">
          Filter reports according to your requirements
        </p>
      </div>
    </div>

    <div class="flex flex-col gap-3 lg:flex-row">

      <!-- Search -->
      <div class="relative flex-1">
        <Search
          :size="17"
          class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <input
          :value="modelValue.search"
          type="text"
          placeholder="Search report..."
          class="w-full rounded-xl border border-white/10 bg-slate-900/70 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
          @input="
            emit('update:modelValue', {
              ...modelValue,
              search: $event.target.value,
            })
          "
        />
      </div>

      <!-- Report Type -->
      <select
        :value="modelValue.type"
        class="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-2.5 text-sm text-slate-300 outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
        @change="
          emit('update:modelValue', {
            ...modelValue,
            type: $event.target.value,
          })
        "
      >
        <option value="">All Reports</option>
        <option value="members">Members</option>
        <option value="events">Events</option>
        <option value="registrations">
          Registration
        </option>
        <option value="payments">
          Finance
        </option>
        <option value="committees">
          Committee
        </option>
        <option value="gallery">
          Gallery
        </option>
      </select>

      <!-- From -->
      <input
        :value="modelValue.from"
        type="date"
        class="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-2.5 text-sm text-slate-300 outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
        @input="
          emit('update:modelValue', {
            ...modelValue,
            from: $event.target.value,
          })
        "
      />

      <!-- To -->
      <input
        :value="modelValue.to"
        type="date"
        class="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-2.5 text-sm text-slate-300 outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
        @input="
          emit('update:modelValue', {
            ...modelValue,
            to: $event.target.value,
          })
        "
      />

      <!-- Reset -->
      <button
        v-if="
          modelValue.search ||
          modelValue.type ||
          modelValue.from ||
          modelValue.to
        "
        type="button"
        class="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
        @click="emit('reset')"
      >
        <X :size="16" />
        Reset
      </button>

    </div>
  </div>
</template>