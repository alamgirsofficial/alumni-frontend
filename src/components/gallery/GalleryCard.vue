<script setup>
import { Maximize2 } from "@lucide/vue";

defineProps({
    gallery: {
        type: Object,
        required: true,
    },

    large: {
        type: Boolean,
        default: false,
    },

    index: {
        type: Number,
        default: 0,
    },
});

const emit = defineEmits(["select"]);
</script>

<template>
    <article
        @click="emit('select', gallery)"
        class="group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-white/5 cursor-pointer"
        :class="large ? 'col-span-2 row-span-2' : ''"
        data-aos="fade-up"
        :data-aos-delay="(index % 4) * 70"
    >
        <div
            class="relative overflow-hidden"
            :class="
                large
                    ? 'aspect-square'
                    : 'aspect-[4/3]'
            "
        >
            <!-- Image -->
            <img
                :src="gallery.image"
                :alt="gallery.title"
                loading="lazy"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <!-- Overlay -->
            <div
                class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-70"
            ></div>

            <div
                class="absolute inset-0 bg-blue-950/30 opacity-0 group-hover:opacity-100 transition-all duration-300"
            ></div>

            <!-- View Icon -->
            <div
                class="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
            >
                <Maximize2 class="w-4 h-4" />
            </div>

            <!-- Content -->
            <div
                class="absolute left-0 right-0 bottom-0 p-3 sm:p-5"
            >
                <p
                    class="text-[10px] sm:text-xs text-cyan-300 mb-1"
                >
                    {{ gallery.categoryName }}
                </p>

                <h3
                    class="text-sm sm:text-base font-semibold line-clamp-1"
                >
                    {{ gallery.title }}
                </h3>

                <p
                    class="hidden sm:block text-xs text-slate-400 mt-1"
                >
                    {{ gallery.date }}
                </p>
            </div>
        </div>
    </article>
</template>

<style scoped>
.line-clamp-1 {
    display: -webkit-box;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>