<script setup>
import { BookOpen } from "@lucide/vue";

defineProps({
    book: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <article
        class="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/[0.06]"
    >
        <!-- ==========================================
             Book Cover
        =========================================== -->
        <div
            class="relative aspect-[3/4] overflow-hidden bg-linear-to-br from-slate-900 via-blue-950 to-slate-900"
        >
            <!-- Cover Image -->
            <img
                v-if="book.cover"
                :src="book.cover"
                :alt="book.title"
                class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />

            <!-- Fallback -->
            <div
                v-else
                class="flex h-full items-center justify-center"
            >
                <BookOpen
                    :size="52"
                    class="text-blue-400/40"
                />
            </div>

            <!-- Bottom Gradient -->
            <div
                class="absolute inset-0 bg-linear-to-t from-slate-950/90 via-transparent to-transparent"
            />

            <!-- Class Badge -->
            <span
                class="absolute left-3 top-3 rounded-lg border border-white/10 bg-slate-950/75 px-2.5 py-1 text-xs font-semibold text-blue-300 backdrop-blur"
            >
                {{ book.classLabel }}
            </span>

            <!-- Subject Badge -->
            <span
                class="absolute right-3 top-3 rounded-lg border border-white/10 bg-slate-950/75 px-2.5 py-1 text-xs text-slate-300 backdrop-blur"
            >
                {{ book.subject }}
            </span>

            <!-- Book Title -->
            <div
                class="absolute bottom-0 left-0 right-0 p-4"
            >
                <h3
                    class="line-clamp-2 text-lg font-bold text-white"
                >
                    {{ book.title }}
                </h3>
            </div>
        </div>


        <!-- ==========================================
             Book Action
        =========================================== -->
        <div class="p-4">

            <a
                :href="book.file"
                target="_blank"
                rel="noopener noreferrer"
                class="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 active:scale-[0.98]"
            >
                <BookOpen :size="17" />

                Read Book
            </a>

        </div>
    </article>
</template>