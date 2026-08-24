<script setup>
import { computed, ref } from "vue";

import {
    BookOpen,
    Search,
    X,
    LibraryBig,
} from "@lucide/vue";

import {
    ebooks,
    ebookClasses,
    ebookSubjects,
} from "@/constants/ebooks.js";

import EbookSection from "@/components/ebook/EbookSection.vue";

// =====================================================
// State
// =====================================================

const searchQuery = ref("");
const selectedClass = ref("All");
const selectedSubject = ref("সব বিষয়");

// =====================================================
// Filter Books
// =====================================================

const filteredBooks = computed(() => {
    const query = searchQuery.value.trim().toLowerCase();

    return ebooks.filter((book) => {
        const matchesSearch =
            !query ||
            book.title.toLowerCase().includes(query) ||
            book.subject.toLowerCase().includes(query) ||
            book.classLabel.toLowerCase().includes(query);

        const matchesClass =
            selectedClass.value === "All" ||
            book.class === selectedClass.value;

        const matchesSubject =
            selectedSubject.value === "সব বিষয়" ||
            book.subject === selectedSubject.value;

        return (
            matchesSearch &&
            matchesClass &&
            matchesSubject
        );
    });
});

// =====================================================
// Group Books By Class
// =====================================================

const groupedBooks = computed(() => {
    const groups = {};

    filteredBooks.value.forEach((book) => {
        if (!groups[book.class]) {
            groups[book.class] = {
                title: book.classLabel,
                books: [],
            };
        }

        groups[book.class].books.push(book);
    });

    return Object.values(groups);
});

// =====================================================
// Clear Filters
// =====================================================

const clearFilters = () => {
    searchQuery.value = "";
    selectedClass.value = "All";
    selectedSubject.value = "সব বিষয়";
};
</script>

<template>
    <div
        class="min-h-screen bg-linear-to-br from-slate-950 via-blue-950/30 to-slate-950 text-white"
    >
        <!-- ==========================================
             Background
        =========================================== -->
        <div
            class="pointer-events-none fixed inset-0 overflow-hidden"
        >
            <div
                class="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl"
            />

            <div
                class="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"
            />
        </div>

        <div class="relative">

            <!-- ======================================
                 Header
            ======================================= -->
            <section class="px-4 pb-8 pt-8 sm:px-6 lg:px-8">
                <div class="mx-auto max-w-7xl">
                    <div
                        class="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] px-6 py-9 backdrop-blur-xl sm:px-10"
                    >
                        <div class="max-w-3xl">

                            <!-- Badge -->
                            <div
                                class="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-sm font-medium text-blue-300"
                            >
                                <LibraryBig :size="16" />

                                eBook Library
                            </div>

                            <!-- Title -->
                            <h1
                                class="text-3xl font-bold tracking-tight sm:text-4xl"
                            >
                                প্রয়োজনীয় বই
                                <span class="text-blue-400">
                                    এক জায়গায়
                                </span>
                            </h1>

                            <!-- Description -->
                            <p
                                class="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base"
                            >
                                আপনার প্রয়োজনীয় বইটি খুঁজুন এবং
                                অনলাইনে পড়ুন।
                            </p>

                        </div>
                    </div>
                </div>
            </section>


            <!-- ======================================
                 Search & Filter
            ======================================= -->
            <section
                class="sticky top-0 z-30 border-y border-white/10 bg-slate-950/90 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8"
            >
                <div class="mx-auto max-w-7xl">

                    <div
                        class="flex flex-col gap-3 md:flex-row"
                    >

                        <!-- Search -->
                        <div class="relative flex-1">

                            <Search
                                :size="18"
                                class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                            />

                            <input
                                v-model="searchQuery"
                                type="text"
                                placeholder="বই, বিষয় বা শ্রেণি দিয়ে খুঁজুন..."
                                class="h-12 w-full rounded-xl border border-white/10 bg-white/4 pl-11 pr-11 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500/50"
                            />

                            <!-- Clear Search -->
                            <button
                                v-if="searchQuery"
                                type="button"
                                @click="searchQuery = ''"
                                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
                            >
                                <X :size="17" />
                            </button>

                        </div>


                        <!-- Class Filter -->
                        <select
                            v-model="selectedClass"
                            class="h-12 rounded-xl border border-white/10 bg-white/4 px-4 text-sm text-slate-200 outline-none focus:border-blue-500/50 md:w-48"
                        >
                            <option
                                v-for="item in ebookClasses"
                                :key="item.value"
                                :value="item.value"
                                class="bg-slate-900"
                            >
                                {{ item.label }}
                            </option>
                        </select>


                        <!-- Subject Filter -->
                        <select
                            v-model="selectedSubject"
                            class="h-12 rounded-xl border border-white/10 bg-white/4 px-4 text-sm text-slate-200 outline-none focus:border-blue-500/50 md:w-44"
                        >
                            <option
                                v-for="subject in ebookSubjects"
                                :key="subject"
                                :value="subject"
                                class="bg-slate-900"
                            >
                                {{ subject }}
                            </option>
                        </select>


                        <!-- Reset -->
                        <button
                            v-if="
                                searchQuery ||
                                selectedClass !== 'All' ||
                                selectedSubject !== 'সব বিষয়'
                            "
                            type="button"
                            @click="clearFilters"
                            class="h-12 rounded-xl border border-white/10 px-4 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                        >
                            Reset
                        </button>

                    </div>
                </div>
            </section>


            <!-- ======================================
                 Content
            ======================================= -->
            <main
                class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
            >

                <!-- Result Header -->
                <div
                    class="mb-8 flex items-end justify-between"
                >
                    <div>

                        <p
                            class="text-xs font-semibold uppercase tracking-widest text-blue-400"
                        >
                            Digital Library
                        </p>

                        <h2
                            class="mt-1 text-2xl font-bold text-white"
                        >
                            eBooks
                        </h2>

                    </div>

                    <span
                        class="text-sm text-slate-500"
                    >
                        {{ filteredBooks.length }} টি বই
                    </span>
                </div>


                <!-- ==================================
                     Class Sections
                =================================== -->
                <template v-if="groupedBooks.length">

                    <EbookSection
                        v-for="group in groupedBooks"
                        :key="group.title"
                        :title="group.title"
                        :books="group.books"
                    />

                </template>


                <!-- ==================================
                     Empty State
                =================================== -->
                <div
                    v-else
                    class="rounded-3xl border border-white/10 bg-white/3 px-6 py-20 text-center"
                >

                    <div
                        class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400"
                    >
                        <BookOpen :size="30" />
                    </div>

                    <h3
                        class="text-xl font-bold text-white"
                    >
                        কোনো বই পাওয়া যায়নি
                    </h3>

                    <p
                        class="mt-2 text-sm text-slate-500"
                    >
                        Search অথবা filter পরিবর্তন করে আবার চেষ্টা করুন।
                    </p>

                    <button
                        type="button"
                        @click="clearFilters"
                        class="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
                    >
                        সব বই দেখুন
                    </button>

                </div>

            </main>
        </div>
    </div>
</template>