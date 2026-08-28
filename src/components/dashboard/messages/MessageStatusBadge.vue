
<!-- MessageStatusBadge.vue -->

<script setup>
import {
  Mail,
  MailOpen,
  Reply,
  Archive,
} from "@lucide/vue";

defineProps({
  status: {
    type: String,
    default: "new",
  },
});

const statusMap = {
  new: {
    label: "New",
    icon: Mail,
    class:
      "border-[var(--theme-primary)]/20 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]",
  },

  read: {
    label: "Read",
    icon: MailOpen,
    class:
      "border-slate-400/10 bg-slate-400/10 text-slate-400",
  },

  replied: {
    label: "Replied",
    icon: Reply,
    class:
      "border-emerald-400/20 bg-emerald-400/10 text-emerald-400",
  },

  archived: {
    label: "Archived",
    icon: Archive,
    class:
      "border-amber-400/20 bg-amber-400/10 text-amber-400",
  },
};
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-wide"
    :class="
      statusMap[status]?.class ||
      statusMap.new.class
    "
  >
    <component
      :is="
        statusMap[status]?.icon ||
        statusMap.new.icon
      "
      class="h-3 w-3"
    />

    {{
      statusMap[status]?.label ||
      "New"
    }}
  </span>
</template>