<script setup>
import { BookOpen } from "@lucide/vue";

import EbookCard from "./EbookCard.vue";

defineProps({
    title: {
        type: String,
        required: true,
    },

    books: {
        type: Array,
        required: true,
    },
});
</script>

<template>
    <section class="mb-12">

        <!-- Section Header -->
        <div class="mb-5 flex items-center gap-3">

            <div
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400"
            >
                <BookOpen :size="21" />
            </div>

            <div>
                <h2 class="text-xl font-bold text-white">
                    {{ title }}
                </h2>

                <p class="mt-0.5 text-sm text-slate-500">
                    {{ books.length }} টি বই
                </p>
            </div>

        </div>


        <!-- Books -->
        <div
            class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
            <EbookCard
                v-for="book in books"
                :key="book.id"
                :book="book"
            />
        </div>

    </section>
</template>