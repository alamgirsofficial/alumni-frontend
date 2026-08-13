<script setup>
import CommitteeTable from '@/components/members/CommitteeTable.vue';

import {
    advisors,
    executiveCommittee,
    members,
} from '@/constrants/committeeData.js';
</script>

<template>

    <div class="max-w-7xl mx-auto px-4 py-10">

        <!-- Advisors -->
        <CommitteeTable
            title="উপদেষ্টা মণ্ডলী"
            :members="advisors"
            header-color="bg-blue-100"
        />


        <!-- Executive Committee -->
        <CommitteeTable
            title="কার্যনির্বাহী কমিটি"
            :members="executiveCommittee"
            header-color="bg-cyan-100"
        />


        <!-- Members -->
        <CommitteeTable
            title="সদস্যবৃন্দ"
            :members="members"
            header-color="bg-emerald-100"
        />

    </div>

</template>