<script setup>
import {
    CalendarDays,
    Images,
    Maximize2,
} from "@lucide/vue";

defineProps({
    galleries: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(["select"]);
</script>

<template>
    <section
        v-if="galleries.length"
        class="relative py-10 sm:py-14"
    >
        <div
            class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
            <!-- Header -->
            <div
                class="flex items-end justify-between gap-4 mb-8"
                data-aos="fade-up"
            >
                <div>
                    <p
                        class="text-sm font-medium text-cyan-400 mb-2"
                    >
                        Featured Memories
                    </p>

                    <h2
                        class="text-2xl sm:text-3xl font-bold"
                    >
                        বিশেষ কিছু মুহূর্ত
                    </h2>
                </div>

                <Images
                    class="hidden sm:block w-6 h-6 text-slate-600"
                />
            </div>

            <!-- Featured Cards -->
            <div
                class="grid grid-cols-1 lg:grid-cols-2 gap-5"
            >
                <article
                    v-for="(gallery, index) in galleries"
                    :key="gallery.id"
                    @click="emit('select', gallery)"
                    class="group relative h-[320px] sm:h-[400px] rounded-3xl overflow-hidden border border-white/10 bg-white/5 cursor-pointer"
                    data-aos="fade-up"
                    :data-aos-delay="index * 100"
                >
                    <!-- Image -->
                    <img
                        :src="gallery.image"
                        :alt="gallery.title"
                        class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <!-- Overlay -->
                    <div
                        class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"
                    ></div>

                    <div
                        class="absolute inset-0 bg-blue-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    ></div>

                    <!-- View -->
                    <div
                        class="absolute top-5 right-5 w-10 h-10 rounded-xl bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
                    >
                        <Maximize2 class="w-4 h-4" />
                    </div>

                    <!-- Content -->
                    <div
                        class="absolute inset-x-0 bottom-0 p-5 sm:p-7"
                    >
                        <div
                            class="flex items-center gap-2 text-cyan-300 text-sm mb-2"
                        >
                            <CalendarDays class="w-4 h-4" />

                            <span>
                                {{ gallery.date }}
                            </span>
                        </div>

                        <h3
                            class="text-xl sm:text-2xl font-bold"
                        >
                            {{ gallery.title }}
                        </h3>

                        <div
                            class="flex items-center gap-2 mt-4 text-sm text-slate-300"
                        >
                            <span>
                                {{ gallery.categoryName }}
                            </span>

                            <span
                                class="w-1 h-1 rounded-full bg-slate-500"
                            ></span>

                            <span>
                                View
                            </span>

                            <Maximize2
                                class="w-3.5 h-3.5"
                            />
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>