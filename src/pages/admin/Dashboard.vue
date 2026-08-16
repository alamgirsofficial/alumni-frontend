<script setup>
import { computed, markRaw, ref } from "vue";

import {
  Users,
  CalendarDays,
  UserCheck,
  Clock3,
  ArrowUpRight,
  MoreHorizontal,
  MapPin,
  ChevronRight,
  Activity,
  UserPlus,
  FileText,
  Image,
  Plus,
  Eye,
  CheckCircle2,
  Clock,
  TrendingUp,
  Sparkles,
} from "@lucide/vue";

/*
|--------------------------------------------------------------------------
| Dashboard Statistics
|--------------------------------------------------------------------------
*/

const statistics = ref([
  {
    id: 1,
    title: "Total Members",
    value: "1,250",
    change: "12.5%",
    description: "vs last month",
    icon: markRaw(Users),
    iconClass: "text-blue-400",
    glowClass: "bg-blue-500/20",
  },
  {
    id: 2,
    title: "Total Events",
    value: "24",
    change: "8.2%",
    description: "vs last month",
    icon: markRaw(CalendarDays),
    iconClass: "text-cyan-400",
    glowClass: "bg-cyan-500/20",
  },
  {
    id: 3,
    title: "Registrations",
    value: "856",
    change: "15.8%",
    description: "vs last month",
    icon: markRaw(UserCheck),
    iconClass: "text-sky-400",
    glowClass: "bg-sky-500/20",
  },
  {
    id: 4,
    title: "Pending Requests",
    value: "18",
    change: "4.3%",
    description: "needs attention",
    icon: markRaw(Clock3),
    iconClass: "text-amber-400",
    glowClass: "bg-amber-500/20",
  },
]);

/*
|--------------------------------------------------------------------------
| Member Growth
|--------------------------------------------------------------------------
*/

const memberGrowth = ref([
  { month: "Jan", value: 720 },
  { month: "Feb", value: 780 },
  { month: "Mar", value: 825 },
  { month: "Apr", value: 890 },
  { month: "May", value: 965 },
  { month: "Jun", value: 1040 },
  { month: "Jul", value: 1140 },
  { month: "Aug", value: 1250 },
]);

const maxGrowth = computed(() =>
  Math.max(...memberGrowth.value.map((item) => item.value), 1)
);

/*
|--------------------------------------------------------------------------
| Upcoming Events
|--------------------------------------------------------------------------
*/

const upcomingEvents = ref([
  {
    id: 1,
    day: "28",
    month: "AUG",
    title: "Annual Alumni Reunion 2026",
    time: "10:00 AM",
    location: "Dhaka, Bangladesh",
    registrations: 245,
    capacity: 500,
  },
  {
    id: 2,
    day: "05",
    month: "SEP",
    title: "Alumni Career Meetup",
    time: "03:00 PM",
    location: "Dhaka, Bangladesh",
    registrations: 128,
    capacity: 250,
  },
  {
    id: 3,
    day: "18",
    month: "SEP",
    title: "Batch 2010 Reunion",
    time: "11:00 AM",
    location: "Chittagong, Bangladesh",
    registrations: 86,
    capacity: 150,
  },
]);

/*
|--------------------------------------------------------------------------
| Recent Registrations
|--------------------------------------------------------------------------
*/

const recentRegistrations = ref([
  {
    id: 1,
    name: "Md. Rahim Uddin",
    batch: "2015",
    event: "Annual Alumni Reunion 2026",
    date: "16 Aug",
    status: "Confirmed",
    initials: "RU",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    batch: "2018",
    event: "Annual Alumni Reunion 2026",
    date: "16 Aug",
    status: "Pending",
    initials: "NJ",
  },
  {
    id: 3,
    name: "Sabbir Ahmed",
    batch: "2012",
    event: "Alumni Career Meetup",
    date: "15 Aug",
    status: "Confirmed",
    initials: "SA",
  },
  {
    id: 4,
    name: "Tasnim Akter",
    batch: "2020",
    event: "Annual Alumni Reunion 2026",
    date: "15 Aug",
    status: "Confirmed",
    initials: "TA",
  },
]);

/*
|--------------------------------------------------------------------------
| Recent Activities
|--------------------------------------------------------------------------
*/

const recentActivities = ref([
  {
    id: 1,
    title: "New member registered",
    description: "Md. Rahim Uddin joined the alumni community.",
    time: "10 min ago",
    icon: markRaw(UserPlus),
    type: "member",
  },
  {
    id: 2,
    title: "New event created",
    description: "Annual Alumni Reunion 2026 was published.",
    time: "35 min ago",
    icon: markRaw(CalendarDays),
    type: "event",
  },
  {
    id: 3,
    title: "New blog published",
    description: "Alumni Success Stories was published.",
    time: "2 hrs ago",
    icon: markRaw(FileText),
    type: "blog",
  },
  {
    id: 4,
    title: "New photos uploaded",
    description: "24 photos were added to Reunion 2025.",
    time: "4 hrs ago",
    icon: markRaw(Image),
    type: "gallery",
  },
]);

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

const getRegistrationPercentage = (event) => {
  if (!event.capacity || event.capacity <= 0) {
    return 0;
  }

  const percentage = (event.registrations / event.capacity) * 100;

  return Math.min(Math.max(Math.round(percentage), 0), 100);
};

const getActivityStyle = (type) => {
  const styles = {
    member: "bg-blue-500/10 text-blue-400",
    event: "bg-cyan-500/10 text-cyan-400",
    blog: "bg-violet-500/10 text-violet-400",
    gallery: "bg-emerald-500/10 text-emerald-400",
  };

  return styles[type] || styles.member;
};
</script>

<template>
  <div class="relative min-h-full overflow-hidden">
    <!-- =========================================================
         AMBIENT BACKGROUND
    ========================================================== -->

    <div
      class="pointer-events-none absolute -left-40 -top-40 h-80 w-80 rounded-full bg-blue-600/10 blur-[120px]"
    />

    <div
      class="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-cyan-500/5 blur-[120px]"
    />

    <!-- =========================================================
         MAIN CONTENT
    ========================================================== -->

    <div class="relative space-y-6">
      <!-- =======================================================
           HEADER
      ======================================================== -->

      <section
        class="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/[0.08] via-white/[0.025] to-cyan-500/[0.05] p-6 backdrop-blur-xl sm:p-7"
      >
        <!-- Decorative -->
        <div
          class="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl"
        />

        <div
          class="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl"
        />

        <div
          class="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <!-- Breadcrumb -->
            <div
              class="mb-4 flex items-center gap-2 text-xs text-slate-500"
            >
              <span>Admin</span>

              <ChevronRight :size="13" />

              <span class="text-cyan-400">
                Dashboard
              </span>
            </div>

            <div class="flex items-center gap-2">
              <h1
                class="text-2xl font-bold tracking-tight text-white sm:text-3xl"
              >
                Welcome back, Admin
              </h1>

              <Sparkles
                :size="20"
                class="text-cyan-400"
              />
            </div>

            <p class="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Manage your alumni community, events, members and
              activities from one place.
            </p>
          </div>

          <!-- Quick Add -->
          <div class="flex flex-wrap gap-3">
            <RouterLink
              to="/admin/events/create"
              class="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:shadow-cyan-400/20"
            >
              <Plus :size="17" />
              Add Event
            </RouterLink>

            <RouterLink
              to="/admin/members/create"
              class="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <UserPlus :size="17" />
              Add Member
            </RouterLink>
          </div>
        </div>
      </section>

      <!-- =======================================================
           STATISTICS
      ======================================================== -->

      <section
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <div
          v-for="stat in statistics"
          :key="stat.id"
          class="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-cyan-400/20 hover:bg-white/[0.04]"
        >
          <!-- Glow -->
          <div
            class="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl transition group-hover:scale-125"
            :class="stat.glowClass"
          />

          <div class="relative">
            <div class="flex items-start justify-between">
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]"
              >
                <component
                  :is="stat.icon"
                  :size="21"
                  :class="stat.iconClass"
                  :stroke-width="1.8"
                />
              </div>

              <button
                type="button"
                class="rounded-lg p-1.5 text-slate-600 transition hover:bg-white/5 hover:text-slate-300"
              >
                <MoreHorizontal :size="18" />
              </button>
            </div>

            <p class="mt-5 text-sm text-slate-500">
              {{ stat.title }}
            </p>

            <div class="mt-1 flex items-end justify-between gap-3">
              <h2
                class="text-2xl font-bold tracking-tight text-white sm:text-3xl"
              >
                {{ stat.value }}
              </h2>

              <span
                class="mb-1 inline-flex items-center gap-1 rounded-full border border-emerald-400/10 bg-emerald-400/5 px-2 py-1 text-[10px] font-semibold text-emerald-400"
              >
                <ArrowUpRight :size="12" />
                {{ stat.change }}
              </span>
            </div>

            <div
              class="mt-4 border-t border-white/5 pt-3 text-[11px] text-slate-600"
            >
              {{ stat.description }}
            </div>
          </div>
        </div>
      </section>

      <!-- =======================================================
           CHART + QUICK ACTIONS
      ======================================================== -->

      <section class="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <!-- Member Growth -->
        <div
          class="rounded-2xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl xl:col-span-2 sm:p-6"
        >
          <div class="flex items-start justify-between">
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-base font-semibold text-white">
                  Member Growth
                </h2>

                <span
                  class="rounded-full bg-cyan-400/10 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-cyan-400"
                >
                  2026
                </span>
              </div>

              <div class="mt-2 flex items-end gap-3">
                <span class="text-2xl font-bold text-white">
                  1,250
                </span>

                <span
                  class="mb-1 inline-flex items-center gap-1 text-xs font-medium text-emerald-400"
                >
                  <TrendingUp :size="13" />
                  12.5%
                </span>
              </div>
            </div>

            <button
              type="button"
              class="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-500 transition hover:bg-white/10 hover:text-white"
            >
              <MoreHorizontal :size="18" />
            </button>
          </div>

          <!-- Chart -->
          <div class="relative mt-8">
            <!-- Horizontal lines -->
            <div
              class="pointer-events-none absolute inset-x-0 top-0 flex h-52 flex-col justify-between"
            >
              <div class="border-t border-white/5" />
              <div class="border-t border-white/5" />
              <div class="border-t border-white/5" />
              <div class="border-t border-white/5" />
              <div class="border-t border-white/5" />
            </div>

            <div class="relative flex h-52 items-end gap-2 sm:gap-4">
              <div
                v-for="item in memberGrowth"
                :key="item.month"
                class="group relative flex h-full flex-1 flex-col justify-end"
              >
                <!-- Tooltip -->
                <div
                  class="absolute bottom-[calc(100%-12px)] left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-slate-900 px-2.5 py-1.5 text-[10px] font-semibold text-white shadow-xl group-hover:block"
                >
                  {{ item.value }} members
                </div>

                <!-- Bar -->
                <div class="relative mx-auto h-full w-full max-w-10">
                  <div
                    class="absolute bottom-0 left-1/2 w-full -translate-x-1/2 rounded-t-xl bg-gradient-to-t from-blue-600/20 via-blue-500/50 to-cyan-400/80 transition-all duration-500 group-hover:from-blue-500/40 group-hover:via-blue-500/70 group-hover:to-cyan-300"
                    :style="{
                      height: `${(item.value / maxGrowth) * 100}%`,
                    }"
                  >
                    <div
                      class="absolute inset-x-0 top-0 h-1 rounded-full bg-cyan-300 opacity-70"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Months -->
            <div class="mt-3 flex gap-2 sm:gap-4">
              <span
                v-for="item in memberGrowth"
                :key="item.month"
                class="flex-1 text-center text-[10px] font-medium text-slate-600"
              >
                {{ item.month }}
              </span>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div
          class="rounded-2xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl sm:p-6"
        >
          <div>
            <div class="flex items-center gap-2">
              <div
                class="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10"
              >
                <Activity
                  :size="18"
                  class="text-cyan-400"
                />
              </div>

              <div>
                <h2 class="text-base font-semibold text-white">
                  Quick Actions
                </h2>

                <p class="text-[11px] text-slate-600">
                  Manage your platform
                </p>
              </div>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-3">
            <RouterLink
              to="/admin/members/create"
              class="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-blue-400/20 hover:bg-blue-500/5"
            >
              <div
                class="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10"
              >
                <UserPlus
                  :size="17"
                  class="text-blue-400"
                />
              </div>

              <p class="mt-3 text-xs font-semibold text-slate-300">
                Add Member
              </p>

              <p class="mt-1 text-[10px] text-slate-600">
                Create profile
              </p>
            </RouterLink>

            <RouterLink
              to="/admin/events/create"
              class="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-cyan-400/20 hover:bg-cyan-500/5"
            >
              <div
                class="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10"
              >
                <CalendarDays
                  :size="17"
                  class="text-cyan-400"
                />
              </div>

              <p class="mt-3 text-xs font-semibold text-slate-300">
                Add Event
              </p>

              <p class="mt-1 text-[10px] text-slate-600">
                Create event
              </p>
            </RouterLink>

            <RouterLink
              to="/admin/blogs/create"
              class="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-violet-400/20 hover:bg-violet-500/5"
            >
              <div
                class="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10"
              >
                <FileText
                  :size="17"
                  class="text-violet-400"
                />
              </div>

              <p class="mt-3 text-xs font-semibold text-slate-300">
                New Blog
              </p>

              <p class="mt-1 text-[10px] text-slate-600">
                Publish content
              </p>
            </RouterLink>

            <RouterLink
              to="/admin/gallery"
              class="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-emerald-400/20 hover:bg-emerald-500/5"
            >
              <div
                class="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10"
              >
                <Image
                  :size="17"
                  class="text-emerald-400"
                />
              </div>

              <p class="mt-3 text-xs font-semibold text-slate-300">
                Upload Photo
              </p>

              <p class="mt-1 text-[10px] text-slate-600">
                Manage gallery
              </p>
            </RouterLink>
          </div>

          <!-- Mini summary -->
          <div
            class="mt-5 rounded-2xl border border-cyan-400/10 bg-gradient-to-br from-blue-500/5 to-cyan-400/5 p-4"
          >
            <div class="flex items-center justify-between">
              <span class="text-xs text-slate-500">
                Profile Completion
              </span>

              <span class="text-xs font-semibold text-cyan-400">
                86%
              </span>
            </div>

            <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
              <div
                class="h-full w-[86%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
              />
            </div>

            <p class="mt-2 text-[10px] leading-4 text-slate-600">
              Most members have completed their alumni profile.
            </p>
          </div>
        </div>
      </section>

      <!-- =======================================================
           EVENTS + REGISTRATIONS
      ======================================================== -->

      <section class="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <!-- Upcoming Events -->
        <div
          class="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] backdrop-blur-xl"
        >
          <div
            class="flex items-center justify-between border-b border-white/10 px-5 py-5 sm:px-6"
          >
            <div>
              <h2 class="text-base font-semibold text-white">
                Upcoming Events
              </h2>

              <p class="mt-1 text-xs text-slate-600">
                Your next scheduled events
              </p>
            </div>

            <RouterLink
              to="/admin/events"
              class="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 transition hover:text-cyan-300"
            >
              View all
              <ChevronRight :size="14" />
            </RouterLink>
          </div>

          <div class="divide-y divide-white/5">
            <div
              v-for="event in upcomingEvents"
              :key="event.id"
              class="group flex gap-4 p-5 transition hover:bg-white/[0.02] sm:p-6"
            >
              <!-- Date -->
              <div
                class="flex h-16 w-14 shrink-0 flex-col items-center justify-center rounded-2xl border border-blue-400/10 bg-gradient-to-b from-blue-500/10 to-cyan-400/5"
              >
                <span
                  class="text-xl font-bold leading-none text-white"
                >
                  {{ event.day }}
                </span>

                <span
                  class="mt-1 text-[9px] font-bold tracking-widest text-cyan-400"
                >
                  {{ event.month }}
                </span>
              </div>

              <!-- Content -->
              <div class="min-w-0 flex-1">
                <h3
                  class="line-clamp-1 text-sm font-semibold text-white transition group-hover:text-cyan-300"
                >
                  {{ event.title }}
                </h3>

                <div
                  class="mt-2 flex flex-wrap gap-x-4 gap-y-1.5"
                >
                  <span
                    class="inline-flex items-center gap-1.5 text-[11px] text-slate-600"
                  >
                    <Clock :size="12" />
                    {{ event.time }}
                  </span>

                  <span
                    class="inline-flex items-center gap-1.5 text-[11px] text-slate-600"
                  >
                    <MapPin :size="12" />
                    {{ event.location }}
                  </span>
                </div>

                <!-- Progress -->
                <div class="mt-4">
                  <div class="mb-1.5 flex justify-between">
                    <span class="text-[10px] text-slate-600">
                      Registration
                    </span>

                    <span class="text-[10px] font-medium text-slate-500">
                      {{ event.registrations }}/{{ event.capacity }}
                    </span>
                  </div>

                  <div
                    class="h-1.5 overflow-hidden rounded-full bg-white/5"
                  >
                    <div
                      class="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                      :style="{
                        width: `${getRegistrationPercentage(event)}%`,
                      }"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Registrations -->
        <div
          class="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] backdrop-blur-xl"
        >
          <div
            class="flex items-center justify-between border-b border-white/10 px-5 py-5 sm:px-6"
          >
            <div>
              <h2 class="text-base font-semibold text-white">
                Recent Registrations
              </h2>

              <p class="mt-1 text-xs text-slate-600">
                Latest event participants
              </p>
            </div>

            <RouterLink
              to="/admin/events"
              class="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 transition hover:text-cyan-300"
            >
              View all
              <ChevronRight :size="14" />
            </RouterLink>
          </div>

          <div class="divide-y divide-white/5">
            <div
              v-for="registration in recentRegistrations"
              :key="registration.id"
              class="flex items-center gap-3 px-5 py-4 transition hover:bg-white/[0.02] sm:px-6"
            >
              <!-- Avatar -->
              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-400/10 bg-gradient-to-br from-blue-500/15 to-cyan-400/10 text-[11px] font-bold text-cyan-300"
              >
                {{ registration.initials }}
              </div>

              <!-- User -->
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2">
                  <h3
                    class="truncate text-sm font-medium text-slate-200"
                  >
                    {{ registration.name }}
                  </h3>

                  <span class="hidden text-[10px] text-slate-700 sm:block">
                    •
                  </span>

                  <span
                    class="hidden shrink-0 text-[10px] text-slate-600 sm:block"
                  >
                    Batch {{ registration.batch }}
                  </span>
                </div>

                <p class="mt-0.5 truncate text-[11px] text-slate-600">
                  {{ registration.event }}
                </p>
              </div>

              <!-- Status -->
              <div class="shrink-0">
                <span
                  v-if="registration.status === 'Confirmed'"
                  class="inline-flex items-center gap-1 rounded-full border border-emerald-400/10 bg-emerald-400/5 px-2 py-1 text-[9px] font-semibold text-emerald-400"
                >
                  <CheckCircle2 :size="11" />
                  Confirmed
                </span>

                <span
                  v-else
                  class="inline-flex items-center gap-1 rounded-full border border-amber-400/10 bg-amber-400/5 px-2 py-1 text-[9px] font-semibold text-amber-400"
                >
                  <Clock :size="11" />
                  Pending
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- =======================================================
           RECENT ACTIVITY
      ======================================================== -->

      <section
        class="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] backdrop-blur-xl"
      >
        <div
          class="flex items-center justify-between border-b border-white/10 px-5 py-5 sm:px-6"
        >
          <div>
            <h2 class="text-base font-semibold text-white">
              Recent Activity
            </h2>

            <p class="mt-1 text-xs text-slate-600">
              Latest activity across your alumni platform
            </p>
          </div>

          <button
            type="button"
            class="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 transition hover:text-cyan-300"
          >
            View all
            <ChevronRight :size="14" />
          </button>
        </div>

        <div class="grid grid-cols-1 divide-y divide-white/5 md:grid-cols-2 md:divide-x md:divide-y-0">
          <div
            v-for="activity in recentActivities"
            :key="activity.id"
            class="flex items-center gap-4 px-5 py-4 transition hover:bg-white/[0.02] sm:px-6"
          >
            <!-- Icon -->
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              :class="getActivityStyle(activity.type)"
            >
              <component
                :is="activity.icon"
                :size="17"
              />
            </div>

            <!-- Content -->
            <div class="min-w-0 flex-1">
              <h3 class="truncate text-sm font-medium text-slate-200">
                {{ activity.title }}
              </h3>

              <p class="mt-0.5 truncate text-[11px] text-slate-600">
                {{ activity.description }}
              </p>
            </div>

            <span
              class="hidden shrink-0 text-[10px] text-slate-700 sm:block"
            >
              {{ activity.time }}
            </span>
          </div>
        </div>
      </section>

      <!-- =======================================================
           FOOTER NOTE
      ======================================================== -->

      <div
        class="flex items-center justify-center gap-2 pb-2 text-[10px] text-slate-700"
      >
        <Eye :size="12" />

        <span>
          Alumni Management System · Admin Panel
        </span>
      </div>
    </div>
  </div>
</template>