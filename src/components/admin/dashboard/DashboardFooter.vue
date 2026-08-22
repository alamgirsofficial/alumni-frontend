<script setup>
import { Eye } from "@lucide/vue";

defineProps({
  text: {
    type: String,
    default: "Alumni Management System · Admin Panel",
  },
});
</script>

<template>
  <div
    class="flex items-center justify-center gap-2 pb-2 text-[10px] text-slate-700"
  >
    <Eye
      :size="12"
      aria-hidden="true"
    />

    <span>
      {{ text }}
    </span>
  </div>
</template>