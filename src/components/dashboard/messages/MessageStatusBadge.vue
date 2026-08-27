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
      "bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]",
  },

  read: {
    label: "Read",
    icon: MailOpen,
    class:
      "bg-slate-100 text-slate-600",
  },

  replied: {
    label: "Replied",
    icon: Reply,
    class:
      "bg-emerald-50 text-emerald-600",
  },

  archived: {
    label: "Archived",
    icon: Archive,
    class:
      "bg-amber-50 text-amber-600",
  },
};
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
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
      class="h-3.5 w-3.5"
    />

    {{
      statusMap[status]?.label ||
      "New"
    }}
  </span>
</template>