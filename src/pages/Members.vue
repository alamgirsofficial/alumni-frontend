<script setup>
import { computed, ref } from "vue";
import { Search, ChevronRight } from "@lucide/vue";

import { members } from "@/constrants/members.js";
import MemberCard from "@/components/members/MemberCard.vue";

// Search
const search = ref("");

// Selected batch
const selectedBatch = ref(null);

// Pagination
const currentPage = ref(1);
const perPage = 10;

// ==============================
// Batches
// ==============================

const batches = computed(() => {
  const startYear = 1989;
  const endYear = 2026;
  return Array.from({ length: endYear - startYear + 1 }, (_, index) =>
    String(endYear - index),
  );
});

// ==============================
// Filter Batches
// ==============================

const filteredBatches = computed(() => {
  const query = search.value.trim();

  if (!query) {
    return batches.value;
  }

  return batches.value.filter((batch) => batch.toString().includes(query));
});

// ==============================
// Selected Batch Members
// ==============================

const batchMembers = computed(() => {
  if (!selectedBatch.value) {
    return [];
  }

  return members.filter((member) => member.batch === selectedBatch.value);
});

// ==============================
// Pagination
// ==============================

const totalPages = computed(() => {
  return Math.ceil(batchMembers.value.length / perPage);
});

const paginatedMembers = computed(() => {
  const start = (currentPage.value - 1) * perPage;

  return batchMembers.value.slice(start, start + perPage);
});

// For maintain Serial in Each Batch list Shown

const startItem = computed(() => {
  if (!batchMembers.value.length) {
    return 0;
  }

  return (currentPage.value - 1) * perPage + 1;
});

const endItem = computed(() => {
  return Math.min(currentPage.value * perPage, batchMembers.value.length);
});

// ==============================
// Select Batch
// ==============================

const selectBatch = (batch) => {
  selectedBatch.value = batch;

  currentPage.value = 1;

  // Mobile-এ batch select করার পর
  // search field clear করা হবে
  search.value = "";
};

// ==============================
// Change Page
// ==============================

const changePage = (page) => {
  currentPage.value = page;

  // নতুন page এ গেলে উপরে scroll
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
</script>

<template>
  <section class="relative py-16 overflow-hidden">
    <!-- Background decoration -->

    <div
      class="absolute -top-32 -left-32 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
    ></div>

    <div
      class="absolute -bottom-32 -right-32 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"
    ></div>

    <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- ========================= -->
      <!-- Mobile Search -->
      <!-- ========================= -->

      <div class="md:hidden mb-5">
        <div class="relative group">
          <Search
            class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors"
          />

          <input
            v-model="search"
            type="text"
            placeholder=" Search Batch:(1989-2026)"
            class="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-white placeholder:text-gray-500 outline-none focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10 transition-all duration-300"
          />
        </div>
      </div>

      <!-- ========================= -->
      <!-- Main Grid -->
      <!-- ========================= -->

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- ========================= -->
        <!-- Desktop Batch Sidebar -->
        <!-- ========================= -->

        <div class="hidden md:block">
          <div
            class="p-5 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10"
          >
            <!-- Search -->

            <div class="relative group mb-4">
              <Search
                class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition"
              />

              <input
                v-model="search"
                type="text"
                placeholder="ব্যাচ খুঁজুন..."
                class="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 outline-none focus:border-cyan-400/40 transition"
              />
            </div>

            <!-- Batch Heading -->

            <div class="flex items-center justify-between mb-3">
              <h3 class="text-sm font-semibold text-gray-300">
                সকল ব্যাচঃ(১৯৮৯-২০২৬)
              </h3>

              <span class="text-xs text-cyan-400">
                মোট {{ batches.length }} টি
              </span>
            </div>

            <!-- Batch List -->

            <div class="space-y-2 max-h-120 overflow-y-auto pr-1">
              <button
                v-for="batch in filteredBatches"
                :key="batch"
                @click="selectBatch(batch)"
                class="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-gray-300 text-left hover:bg-cyan-500/10 hover:border-cyan-400/30 hover:text-cyan-300 transition-all duration-300"
                :class="{
                  'bg-linear-to-r from-blue-500/20 to-cyan-500/20':
                    selectedBatch === batch,

                  'border-cyan-400/40 text-cyan-300': selectedBatch === batch,
                }"
              >
                <div class="flex items-center justify-between">
                  <span> ব্যাচ - {{ batch }} </span>

                  <ChevronRight class="w-4 h-4" />
                </div>
              </button>

              <!-- No batch -->

              <p
                v-if="!filteredBatches.length"
                class="text-sm text-gray-500 text-center py-5"
              >
                কোনো ব্যাচ পাওয়া যায়নি
              </p>
            </div>
          </div>
        </div>

        <!-- ========================= -->
        <!-- Members Section -->
        <!-- ========================= -->

        <div class="md:col-span-2">
          <div
            class="p-5 sm:p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10"
          >
            <!-- ========================= -->
            <!-- Mobile Batch List -->
            <!-- ========================= -->

            <div class="md:hidden mb-6">
              <div class="flex gap-2 overflow-x-auto pb-2">
                <button
                  v-for="batch in filteredBatches"
                  :key="batch"
                  @click="selectBatch(batch)"
                  class="shrink-0 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 hover:border-cyan-400/30 hover:text-cyan-300 transition"
                  :class="{
                    'bg-cyan-500/15 border-cyan-400/40 text-cyan-300':
                      selectedBatch === batch,
                  }"
                >
                  {{ batch }}
                </button>
              </div>
            </div>

            <!-- ========================= -->
            <!-- No Batch Selected -->
            <!-- ========================= -->

            <div
              v-if="!selectedBatch"
              class="min-h-75 flex flex-col items-center justify-center text-center"
            >
              <div
                class="w-14 h-14 rounded-2xl bg-linear-to-br from-blue-500/20 to-cyan-500/20 border border-cyan-400/20 flex items-center justify-center mb-4"
              >
                <Search class="w-6 h-6 text-cyan-400" />
              </div>

              <h2 class="text-lg font-semibold text-white">
                ব্যাচ নির্বাচন করুন
              </h2>

              <p class="mt-2 text-sm text-gray-500">
                একটি ব্যাচ নির্বাচন করলে শিক্ষার্থীদের তালিকা এখানে দেখাবে।
              </p>
            </div>

            <!-- ========================= -->
            <!-- Selected Batch -->
            <!-- ========================= -->

            <template v-else>
              <!-- Batch Header -->
              
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-xs text-cyan-400">শিক্ষার্থী তালিকা</p>

                  <h2 class="text-xl font-bold text-white">
                    ব্যাচ - {{ selectedBatch }}
                  </h2>
                </div>

                <div class="text-right">
                  <span class="text-sm text-green-400">
                    মোট {{ batchMembers.length }} জন
                  </span>

                  <p
                    v-if="batchMembers.length > perPage"
                    class="text-xs text-white m-1"
                  >
                    ({{ startItem }} - {{ endItem }}) জন দেখানো হচ্ছে
                  </p>
                </div>
              </div>

              <!-- Members Found -->
<template v-if="batchMembers.length > 0">

    <div class="space-y-3">

        <MemberCard
            v-for="(member, index) in paginatedMembers"
            :key="member.id"
            :member="member"
            :serial="(currentPage - 1) * perPage + index + 1"
        />

    </div>


    <!-- Pagination -->
    <div
        v-if="totalPages > 1"
        class="flex items-center justify-center
        flex-wrap gap-2 mt-7"
    >

        <!-- Previous -->
        <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-2 rounded-lg
            border border-white/10
            bg-white/5
            text-gray-300
            hover:bg-cyan-500/10
            hover:text-cyan-300
            transition
            disabled:opacity-30
            disabled:cursor-not-allowed"
        >
            ‹
        </button>


        <!-- Page Numbers -->
        <button
            v-for="page in totalPages"
            :key="page"
            @click="changePage(page)"
            class="min-w-9 h-9 px-3
            rounded-lg
            border border-white/10
            bg-white/5
            text-sm text-gray-400
            hover:bg-cyan-500/10
            hover:text-cyan-300
            transition"
            :class="{
                'bg-linear-to-r from-blue-500 to-cyan-500':
                    currentPage === page,

                'text-white border-transparent':
                    currentPage === page
            }"
        >
            {{ page }}
        </button>


        <!-- Next -->
        <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3 py-2 rounded-lg
            border border-white/10
            bg-white/5
            text-gray-300
            hover:bg-cyan-500/10
            hover:text-cyan-300
            transition
            disabled:opacity-30
            disabled:cursor-not-allowed"
        >
            ›
        </button>

    </div>

</template>


<!-- No Members -->
<div
    v-else
    class="py-12 px-5
    rounded-2xl
    bg-white/5
    border border-white/10
    text-center"
>

    <div
        class="w-14 h-14 mx-auto mb-4
        rounded-2xl
        bg-cyan-500/10
        border border-cyan-400/20
        flex items-center justify-center"
    >

        <Search
            class="w-6 h-6 text-cyan-400"
        />

    </div>


    <h3
        class="text-lg font-semibold text-white"
    >
        এই ব্যাচের তথ্য এখনো যুক্ত করা হয়নি
    </h3>


    <p
        class="mt-2 max-w-md mx-auto
        text-sm leading-6 text-gray-400"
    >
        এই ব্যাচের সদস্যদের তথ্য আমাদের
        ওয়েবসাইটে এখনো যুক্ত করা হয়নি।
        বিস্তারিত তথ্যের জন্য আমাদের সাথে
        যোগাযোগ করুন।
    </p>


    <RouterLink
        to="/contact"
        class="inline-flex items-center gap-2
        mt-5 px-5 py-2.5
        rounded-xl
        bg-linear-to-r
        from-blue-500 to-cyan-500
        text-white text-sm font-medium
        hover:shadow-lg
        hover:shadow-cyan-500/20
        transition-all duration-300"
    >
        যোগাযোগ করুন

        <ChevronRight class="w-4 h-4" />
    </RouterLink>

</div>
              
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
