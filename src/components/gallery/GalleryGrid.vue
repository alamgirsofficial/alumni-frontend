<script setup>
import { computed, ref, watch } from "vue";
import { Images } from "@lucide/vue";

import GalleryCard from "./GalleryCard.vue";

const props = defineProps({
    galleries: {
        type: Array,
        default: () => [],
    },

    initialCount: {
        type: Number,
        default: 8,
    },

    loadStep: {
        type: Number,
        default: 4,
    },
});

const emit = defineEmits(["select"]);

const visibleCount = ref(props.initialCount);

const visibleGalleries = computed(() => {
    return props.galleries.slice(0, visibleCount.value);
});

const hasMore = computed(() => {
    return visibleCount.value < props.galleries.length;
});

const loadMore = () => {
    visibleCount.value += props.loadStep;
};

/*
|--------------------------------------------------------------------------
| Filter change হলে আবার initial count-এ ফিরে যাবে
|--------------------------------------------------------------------------
*/

watch(
    () => props.galleries,
    () => {
        visibleCount.value = props.initialCount;
    }
);
</script>

<template>
    <section class="relative py-10 sm:py-16">
        <div
            class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
            <!-- Header -->
            <div
                class="flex items-end justify-between mb-8"
                data-aos="fade-up"
            >
                <div>
                    <p
                        class="text-sm font-medium text-cyan-400 mb-2"
                    >
                        Our Memories
                    </p>

                    <h2
                        class="text-2xl sm:text-3xl font-bold"
                    >
                        সব স্মৃতি
                    </h2>
                </div>

                <div
                    class="hidden sm:flex items-center gap-2 text-sm text-slate-500"
                >
                    <Images class="w-4 h-4" />

                    {{ galleries.length }} টি ছবি
                </div>
            </div>

            <!-- Gallery Grid -->
            <div
                v-if="visibleGalleries.length"
                class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5"
            >
                <GalleryCard
                    v-for="(gallery, index) in visibleGalleries"
                    :key="gallery.id"
                    :gallery="gallery"
                    :index="index"
                    :large="index % 7 === 0"
                    @select="emit('select', $event)"
                />
            </div>

            <!-- Empty State -->
            <div
                v-else
                class="py-20 text-center"
            >
                <div
                    class="w-16 h-16 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center"
                >
                    <Images
                        class="w-7 h-7 text-slate-500"
                    />
                </div>

                <h3
                    class="mt-5 text-lg font-semibold"
                >
                    কোনো ছবি পাওয়া যায়নি
                </h3>

                <p
                    class="mt-2 text-sm text-slate-500"
                >
                    এই category-তে এখনো কোনো ছবি যোগ করা হয়নি।
                </p>
            </div>

            <!-- Load More -->
            <div
                v-if="hasMore"
                class="flex justify-center mt-10"
            >
                <button
                    type="button"
                    @click="loadMore"
                    class="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/30 text-sm font-medium transition-all duration-300"
                >
                    আরও ছবি দেখুন
                </button>
            </div>
        </div>
    </section>
</template>