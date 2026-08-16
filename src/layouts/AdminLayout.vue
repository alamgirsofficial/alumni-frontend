<script setup>
import { ref } from "vue";
import { RouterView, RouterLink } from "vue-router";

import {
  LayoutDashboard,
  Users,
  CalendarDays,
  FileText,
  Images,
  UserRoundCog,
  Mail,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
  UserCircle,
} from "@lucide/vue";

/*
|--------------------------------------------------------------------------
| Sidebar Menu
|--------------------------------------------------------------------------
*/

const menuItems = [
  {
    title: "Dashboard",
    route: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Members",
    route: "/admin/members",
    icon: Users,
  },
  {
    title: "Events",
    route: "/admin/events",
    icon: CalendarDays,
  },
  {
    title: "Blogs",
    route: "/admin/blogs",
    icon: FileText,
  },
  {
    title: "Gallery",
    route: "/admin/gallery",
    icon: Images,
  },
  {
    title: "Committee",
    route: "/admin/committee",
    icon: UserRoundCog,
  },
  {
    title: "Messages",
    route: "/admin/messages",
    icon: Mail,
  },
  {
    title: "Reports",
    route: "/admin/reports",
    icon: BarChart3,
  },
  {
    title: "Settings",
    route: "/admin/settings",
    icon: Settings,
  },
  {
    title: "profile",
    route: "/admin/profile",
    icon: Settings,
  },
];

/*
|--------------------------------------------------------------------------
| State
|--------------------------------------------------------------------------
*/

const sidebarOpen = ref(false);
const profileOpen = ref(false);

/*
|--------------------------------------------------------------------------
| Close Mobile Sidebar
|--------------------------------------------------------------------------
*/

const closeSidebar = () => {
  sidebarOpen.value = false;
};
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-white">
    <!-- =========================================================
         MOBILE OVERLAY
    ========================================================== -->

    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="sidebarOpen"
        class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        @click="closeSidebar"
      />
    </Transition>

    <!-- =========================================================
         SIDEBAR
    ========================================================== -->

    <aside
      class="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/10 bg-slate-900/95 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!-- Logo -->
      <div
        class="flex h-20 shrink-0 items-center justify-between border-b border-white/10 px-6"
      >
        <RouterLink
          to="/admin/dashboard"
          class="flex items-center gap-3"
          @click="closeSidebar"
        >
          <!-- Logo Icon -->
          <div
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/20"
          >
            <span class="text-lg font-bold text-white">A</span>
          </div>

          <div>
            <h1 class="text-base font-bold tracking-wide">
              Alumni Admin
            </h1>

            <p class="text-xs text-slate-400">
              Management Panel
            </p>
          </div>
        </RouterLink>

        <!-- Mobile Close -->
        <button
          type="button"
          class="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white lg:hidden"
          @click="closeSidebar"
        >
          <X :size="20" />
        </button>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto px-4 py-6">
        <p
          class="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500"
        >
          Main Menu
        </p>

        <div class="space-y-1.5">
          <RouterLink
            v-for="item in menuItems"
            :key="item.route"
            :to="item.route"
            class="group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-slate-400 transition-all duration-200 hover:bg-white/5 hover:text-white"
            active-class="bg-blue-500/10 text-blue-400 ring-1 ring-blue-400/10"
            @click="closeSidebar"
          >
            <component
              :is="item.icon"
              :size="19"
              :stroke-width="1.8"
              class="shrink-0 transition-transform duration-200 group-hover:scale-105"
            />

            <span>{{ item.title }}</span>
          </RouterLink>
        </div>
      </nav>

      <!-- Sidebar Bottom -->
      <div class="shrink-0 border-t border-white/10 p-4">
        <div
          class="rounded-2xl border border-white/10 bg-white/5 p-4"
        >
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-cyan-400 to-blue-500"
            >
              <UserCircle :size="22" />
            </div>

            <div class="min-w-0">
              <p class="truncate text-sm font-semibold text-white">
                Admin User
              </p>

              <p class="truncate text-xs text-slate-500">
                Administrator
              </p>
            </div>
          </div>

          <button
            type="button"
            class="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs font-medium text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut :size="15" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>

    <!-- =========================================================
         MAIN AREA
    ========================================================== -->

    <div class="min-h-screen lg:pl-72">
      <!-- =======================================================
           TOP NAVBAR
      ======================================================== -->

      <header
        class="sticky top-0 z-30 h-20 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl"
      >
        <div class="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
          <!-- Left -->
          <div class="flex items-center gap-3">
            <!-- Mobile Menu -->
            <button
              type="button"
              class="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white lg:hidden"
              @click="sidebarOpen = true"
            >
              <Menu :size="21" />
            </button>

            <div>
              <p class="hidden text-xs text-slate-500 sm:block">
                Welcome back
              </p>

              <h2 class="text-sm font-semibold text-white sm:text-base">
                Admin Dashboard
              </h2>
            </div>
          </div>

          <!-- Right -->
          <div class="flex items-center gap-2 sm:gap-3">
            <!-- Notification -->
            <button
              type="button"
              class="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white"
            >
              <Bell :size="19" />

              <span
                class="absolute right-2 top-2 h-2 w-2 rounded-full bg-cyan-400 ring-2 ring-slate-950"
              />
            </button>

            <!-- Divider -->
            <div class="hidden h-8 w-px bg-white/10 sm:block" />

            <!-- Profile -->
            <div class="relative">
              <button
                type="button"
                class="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-white/5"
                @click="profileOpen = !profileOpen"
              >
                <div
                  class="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-cyan-400"
                >
                  <span class="text-sm font-bold">A</span>
                </div>

                <div class="hidden text-left sm:block">
                  <p class="text-sm font-semibold text-white">
                    Admin
                  </p>

                  <p class="text-[11px] text-slate-500">
                    Administrator
                  </p>
                </div>

                <ChevronDown
                  :size="16"
                  class="hidden text-slate-500 sm:block"
                />
              </button>

              <!-- Profile Dropdown -->
              <Transition
                enter-active-class="transition duration-200"
                enter-from-class="scale-95 opacity-0"
                enter-to-class="scale-100 opacity-100"
                leave-active-class="transition duration-150"
                leave-from-class="scale-100 opacity-100"
                leave-to-class="scale-95 opacity-0"
              >
                <div
                  v-if="profileOpen"
                  class="absolute right-0 top-14 w-52 origin-top-right rounded-2xl border border-white/10 bg-slate-900 p-2 shadow-2xl shadow-black/30"
                >
                  <RouterLink
                    to="/admin/profile"
                    class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
                    @click="profileOpen = false"
                  >
                    <UserCircle :size="17" />
                    Profile
                  </RouterLink>

                  <RouterLink
                    to="/admin/settings"
                    class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
                    @click="profileOpen = false"
                  >
                    <Settings :size="17" />
                    Settings
                  </RouterLink>

                  <div class="my-1 border-t border-white/10" />

                  <button
                    type="button"
                    class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10"
                  >
                    <LogOut :size="17" />
                    Logout
                  </button>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </header>

      <!-- =======================================================
           PAGE CONTENT
      ======================================================== -->

      <main class="min-h-[calc(100vh-5rem)] px-4 py-6 sm:px-6 lg:px-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>