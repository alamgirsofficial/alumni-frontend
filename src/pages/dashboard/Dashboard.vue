<script setup>
import DashboardHeader from "@/components/dashboard/component/DashboardHeader.vue";
import DashboardStats from "@/components/dashboard/component/DashboardStats.vue";
import MemberGrowthChart from "@/components/dashboard/component/MemberGrowthChart.vue";
import QuickActions from "@/components/dashboard/component/QuickActions.vue";
import UpcomingEvents from "@/components/dashboard/component/UpcomingEvents.vue";
import RecentRegistrations from "@/components/dashboard/component/RecentRegistrations.vue";
import RecentActivities from "@/components/dashboard/component/RecentActivities.vue";
import DashboardFooter from "@/components/dashboard/component/DashboardFooter.vue";

import {
  statistics,
  memberGrowth,
  upcomingEvents,
  recentRegistrations,
  recentActivities,
} from "@/constants/dashboardData.js";
</script>

<template>
  <div class="relative min-h-full overflow-hidden">

    <!-- Ambient Background -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute -left-40 -top-40 h-80 w-80 rounded-full bg-blue-600/10 blur-[120px]"
    />

    <div
      aria-hidden="true"
      class="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-cyan-500/5 blur-[120px]"
    />

    <div class="relative space-y-6">

      <!-- Header -->
      <DashboardHeader />

      <!-- Statistics -->
      <DashboardStats
        :statistics="statistics"
      />

      <!-- Growth + Quick Actions -->
      <section
        class="grid grid-cols-1 gap-6 xl:grid-cols-3"
      >
        <MemberGrowthChart
          :data="memberGrowth"
          :total="statistics[0]?.value"
          :growth="statistics[0]?.change"
          year="2026"
        />

        <QuickActions />
      </section>

      <!-- Events + Registrations -->
      <section
        class="grid grid-cols-1 gap-6 xl:grid-cols-2"
      >
        <UpcomingEvents
          :events="upcomingEvents"
        />

        <RecentRegistrations
          :registrations="recentRegistrations"
        />
      </section>

      <!-- Activities -->
      <RecentActivities
        :activities="recentActivities"
      />

      <!-- Footer -->
      <DashboardFooter />

    </div>
  </div>
</template>