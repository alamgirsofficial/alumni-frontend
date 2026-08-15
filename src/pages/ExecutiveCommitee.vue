<script setup>
import { ref, computed } from "vue";
import CommitteeTable from "@/components/members/CommitteeTable.vue";

import { committees } from "@/constrants/committeeData.js";

// ------------------------------------
// Selected Committee Year
// ------------------------------------

const selectedCommitteeId = ref(committees[0]?.id);

// ------------------------------------
// Active Tab
// ------------------------------------

const activeTab = ref("advisors");

// ------------------------------------
// Selected Committee
// ------------------------------------

const selectedCommittee = computed(() => {
  return committees.find(
    (committee) => committee.id === selectedCommitteeId.value,
  );
});

// ------------------------------------
// Tabs
// ------------------------------------

const tabs = [
  {
    key: "advisors",
    label: "উপদেষ্টা মণ্ডলী",
  },
  {
    key: "executiveCommittee",
    label: "কার্যনির্বাহী কমিটি",
  },
  {
    key: "members",
    label: "সদস্যবৃন্দ",
  },
];
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-10">
    <!-- ================================= -->
    <!-- Year Selector -->
    <!-- ================================= -->

    <div class="mb-6">
     ‍<span class="text-white font-bold text-xl mr-4">  বছর নির্বাচন করুন: </span>
      <select
        v-model="selectedCommitteeId"
        class="px-4 py-2.5 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-sm text-gray-200 outline-none focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10 transition-all duration-300"
      >
      
        <option
          v-for="committee in committees"
          :key="committee.id"
          :value="committee.id"
          class="bg-slate-900"
        >
            {{ committee.year }} 
        </option>
      </select> 
    </div>

    <!-- ================================= -->
    <!-- Tabs -->
    <!-- ================================= -->

    <div
      class="flex items-center gap-1 overflow-x-auto border-b border-white/10 scrollbar-hide"
    >
      <button
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        @click="activeTab = tab.key"
        class="relative shrink-0 px-4 sm:px-6 py-3 text-sm sm:text-base font-medium transition-all duration-300"
        :class="
          activeTab === tab.key
            ? 'text-cyan-400'
            : 'text-gray-400 hover:text-gray-200'
        "
      >
        {{ tab.label }}

        <!-- Active Tab Line -->

        <span
          v-if="activeTab === tab.key"
          class="absolute left-0 right-0 bottom-0 h-0.5 rounded-full bg-linear-to-r from-blue-500 to-cyan-400 shadow-lg shadow-cyan-500/30"
        ></span>
      </button>
    </div>

    <!-- ================================= -->
    <!-- Tab Content -->
    <!-- ================================= -->

    <div class="mt-6">
      <!-- Advisors -->
      <!-- if no need pagination just boolean false  -->

      <CommitteeTable
        v-if="activeTab === 'advisors'"
        :members="selectedCommittee?.advisors ?? []"
        :pagination="true"
      />

      <!-- Executive Committee -->

      <CommitteeTable
        v-else-if="activeTab === 'executiveCommittee'"
        :members="selectedCommittee?.executiveCommittee ?? []"
        :pagination="true"  
        />

      <!-- Members -->

      <CommitteeTable
    v-else-if="activeTab === 'members'"
    :members="selectedCommittee?.members ?? []"
    :pagination="true"
/>
    </div>
  </div>
</template>
