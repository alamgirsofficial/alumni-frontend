<script setup>
import { Icon } from "@iconify/vue";

defineProps({
  socialLinks: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div v-if="socialLinks.length" class="flex gap-3">
    <a
      v-for="item in socialLinks"
      :key="item.id"
      :href="item.url"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="item.name"
      :style="{ '--social-color': item.color }"
       class="
        group/social
        flex h-10 w-10
        items-center justify-center
        rounded-xl
        border border-white/10
        bg-white/[0.035]
        text-slate-500
        backdrop-blur-xl
        transition-all duration-300
        hover:-translate-y-1
        hover:border-(--social-color)
        hover:bg-(--social-color)
        hover:text-white
      " >
      <Icon
        :icon="item.icon"
        class="size-5 text-slate-300 transition-all duration-300 group-hover/social:scale-110 group-hover/social:text-white"
      />
    </a>
  </div>
  <p 
  v-else
   class="text-xs text-slate-600"
  >
  No Social Links available
  </p>
</template>
