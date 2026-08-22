<script setup>
import { RouterLink } from "vue-router";
import { X, UserCircle, LogOut } from "@lucide/vue";

import { adminMenuItems } from "@/constants/dashboardMenu.js";

defineProps({
  open: {
    type: Boolean,
    default: false,
  },

  user: {
    type: Object,
    default: () => ({
      name: "Admin User",
      role: "Administrator",
    }),
  },
});

const emit = defineEmits([
  "close",
  "logout",
]);

const closeSidebar = () => {
  emit("close");
};

const handleLogout = () => {
  emit("logout");
};
</script>

<template>
  <aside
    class="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/10 bg-slate-900/95 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0"
    :class="open ? 'translate-x-0' : '-translate-x-full'"
  >

    <!-- =====================================================
         LOGO
    ====================================================== -->

    <div
      class="flex h-20 shrink-0 items-center justify-between border-b border-white/10 px-6"
    >

      <RouterLink
        to="/admin/dashboard"
        class="flex items-center gap-3"
        @click="closeSidebar"
      >

        <!-- Logo -->
        <div
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/20"
        >
          <span class="text-lg font-bold text-white">
            A
          </span>
        </div>

        <!-- Brand -->
        <div>
          <h1
            class="text-base font-bold tracking-wide text-white"
          >
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
        aria-label="Close sidebar"
        class="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white lg:hidden"
        @click="closeSidebar"
      >
        <X :size="20" />
      </button>

    </div>

    <!-- =====================================================
         NAVIGATION
    ====================================================== -->

    <nav class="flex-1 overflow-y-auto px-4 py-6">

      <p
        class="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500"
      >
        Main Menu
      </p>

      <div class="space-y-1.5">

        <RouterLink
          v-for="item in adminMenuItems"
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

          <span>
            {{ item.title }}
          </span>

        </RouterLink>

      </div>

    </nav>

    <!-- =====================================================
         USER / LOGOUT
    ====================================================== -->

    <div
      class="shrink-0 border-t border-white/10 p-4"
    >

      <div
        class="rounded-2xl border border-white/10 bg-white/5 p-4"
      >

        <!-- User -->
        <div class="flex items-center gap-3">

          <div
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-cyan-400 to-blue-500"
          >
            <UserCircle :size="22" />
          </div>

          <div class="min-w-0">

            <p
              class="truncate text-sm font-semibold text-white"
            >
              {{ user.name }}
            </p>

            <p
              class="truncate text-xs text-slate-500"
            >
              {{ user.role }}
            </p>

          </div>

        </div>

        <!-- Logout -->
        <button
          type="button"
          class="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs font-medium text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
          @click="handleLogout"
        >
          <LogOut :size="15" />

          <span>
            Logout
          </span>
        </button>

      </div>

    </div>

  </aside>
</template>