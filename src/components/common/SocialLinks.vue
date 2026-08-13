<script setup>
import { Icon } from '@iconify/vue'

defineProps({
    socialLinks: {
        type: Array,
        default: () => [],
    },
})
</script>

<template>
    <div class="flex gap-3">
        <a
            v-for="item in socialLinks"
            :key="item.id"
            :href="item.url"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="item.name"
            :style="{ '--social-color': item.color }"
            class="group/social
                   w-10 h-10
                   flex items-center justify-center
                   rounded-lg
                   bg-white
                   shadow-md shadow-gray-200
                   transition-all duration-300
                   hover:bg-(--social-color)"
        >
            <Icon
                :icon="item.icon"
                class="size-4
                       text-slate-900
                       transition-all duration-300
                       group-hover/social:scale-110
                       group-hover/social:text-white"
            />
        </a>
    </div>
</template>