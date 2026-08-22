<script setup>
import DashboardStatCard from "./DashboardStatCard.vue";

defineProps({
  statistics: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <section
    aria-label="Key statistics"
    class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
  >
    <DashboardStatCard
      v-for="stat in statistics"
      :key="stat.id"
      :stat="stat"
    />
  </section>
</template>