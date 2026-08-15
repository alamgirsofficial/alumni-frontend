<script setup>
import {
    X,
    ChevronLeft,
    ChevronRight,
} from "@lucide/vue";

defineProps({
    open: {
        type: Boolean,
        default: false,
    },

    gallery: {
        type: Object,
        default: null,
    },
});

const emit = defineEmits([
    "close",
    "next",
    "previous",
]);
</script>

<template>
    <Transition name="lightbox">
        <div
            v-if="open && gallery"
            class="fixed inset-0 z-[999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            @click.self="emit('close')"
        >
            <!-- Close -->
            <button
                type="button"
                @click="emit('close')"
                class="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-11 h-11 rounded-xl bg-white/10 border border-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all"
                aria-label="Close gallery"
            >
                <X class="w-5 h-5" />
            </button>

            <!-- Previous -->
            <button
                type="button"
                @click="emit('previous')"
                class="absolute left-3 sm:left-6 z-20 w-11 h-11 rounded-xl bg-white/10 border border-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all"
                aria-label="Previous image"
            >
                <ChevronLeft class="w-5 h-5" />
            </button>

            <!-- Next -->
            <button
                type="button"
                @click="emit('next')"
                class="absolute right-3 sm:right-6 z-20 w-11 h-11 rounded-xl bg-white/10 border border-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all"
                aria-label="Next image"
            >
                <ChevronRight class="w-5 h-5" />
            </button>

            <!-- Image -->
            <div
                class="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            >
                <img
                    :src="gallery.image"
                    :alt="gallery.title"
                    class="max-w-full max-h-[72vh] sm:max-h-[78vh] object-contain rounded-xl sm:rounded-2xl shadow-2xl"
                />

                <!-- Caption -->
                <div
                    class="mt-4 text-center"
                >
                    <h3
                        class="text-lg sm:text-xl font-semibold"
                    >
                        {{ gallery.title }}
                    </h3>

                    <div
                        class="flex items-center justify-center gap-2 mt-2 text-sm text-slate-400"
                    >
                        <span>
                            {{ gallery.categoryName }}
                        </span>

                        <span
                            class="w-1 h-1 rounded-full bg-slate-600"
                        ></span>

                        <span>
                            {{ gallery.date }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.lightbox-enter-active,
.lightbox-leave-active {
    transition: opacity 0.25s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
    opacity: 0;
}
</style>