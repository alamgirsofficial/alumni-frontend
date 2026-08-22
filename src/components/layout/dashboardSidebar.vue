<script setup>
import { ref } from "vue";
import { RouterLink, useRoute } from "vue-router";

import { X, UserCircle, LogOut, ChevronDown } from "@lucide/vue";

import { dashboardMenu } from "@/constants/dashboardMenu.js";

const route = useRoute();

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

const emit = defineEmits(["close", "logout"]);

const closeSidebar = () => {
  emit("close");
};

const handleLogout = () => {
  emit("logout");
};

const openMenus = ref({});

// Auto open current menu
dashboardMenu.forEach((item) => {
  if (item.children) {
    openMenus.value[item.title] = item.children.some((child) =>
      route.path.startsWith(child.route),
    );
  }
});

const toggleMenu = (menu) => {
  openMenus.value[menu] = !openMenus.value[menu];
};
</script>

<template>
  <aside
    class="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/10 bg-slate-900/95 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0"
    :class="open ? 'translate-x-0' : '-translate-x-full'"
  >
    <!-- Logo -->
    <div
      class="flex h-20 shrink-0 items-center justify-between border-b border-white/10 px-6"
    >
      <RouterLink
        to="/dashboard"
        class="flex items-center gap-3"
        @click="closeSidebar"
      >
        <div
          class="flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/20"
        >
          <span class="text-lg font-bold text-white"> D </span>
        </div>

        <div>
          <h1 class="text-base font-bold tracking-wide text-white">
            Dashboard
          </h1>

          <p class="text-xs text-slate-400">Management Panel</p>
        </div>
      </RouterLink>

      <button
        type="button"
        aria-label="Close sidebar"
        class="rounded-lg p-2 text-slate-400 transition hover:bg-red-400 hover:text-white lg:hidden"
        @click="closeSidebar"
      >
        <X :size="20" />
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto px-4 py-6">
      <!-- <p
        class="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500"
      >
        Main Menu
      </p> -->

      <div class="space-y-1.5">
        <div v-for="item in dashboardMenu" :key="item.title">
          <!-- Normal Menu -->
          <RouterLink
            v-if="!item.children"
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

          <!-- Parent Menu -->
          <div v-else>
            <button
              class="group flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-sm font-medium text-slate-400 transition-all duration-200 hover:bg-white/5 hover:text-white"
              @click="toggleMenu(item.title)"
            >
              <div class="flex items-center gap-3">
                <component
                  :is="item.icon"
                  :size="19"
                  :stroke-width="1.8"
                  class="shrink-0"
                />

                <span>
                  {{ item.title }}
                </span>
              </div>

              <ChevronDown
                :size="16"
                class="transition-all duration-300 ease-in-out"
                :class="openMenus[item.title] ? 'rotate-180 text-blue-400' : ''"
              />
            </button>

            <!-- Submenu -->
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="max-h-0 opacity-0 -translate-y-2"
              enter-to-class="max-h-96 opacity-100 translate-y-0"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="max-h-96 opacity-100 translate-y-0"
              leave-to-class="max-h-0 opacity-0 -translate-y-2"
            >
              <div
                v-if="openMenus[item.title]"
                class="overflow-hidden ml-8 mt-2 space-y-1"
              >
                <RouterLink
                  v-for="child in item.children"
                  :key="child.route"
                  :to="child.route"
                  class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-400 transition-all duration-200 hover:bg-white/5 hover:text-white hover:translate-x-1"
                  active-class="bg-blue-500/10 text-blue-400 border-l-2 border-blue-400"
                  @click="closeSidebar"
                >
                  <component :is="child.icon" :size="15" />

                  <span>{{ child.title }}</span>
                </RouterLink>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </nav>

    <!-- User Info -->
   <div class="shrink-0 border-t border-white/10 p-2">
  <button
    type="button"
    class="group flex w-full items-center justify-center gap-4 rounded-xl border border-white/10 px-2 py-1 text-sm font-medium text-slate-400 transition-all duration-300 hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
    @click="handleLogout"
  >
    <LogOut
      :size="16"
      class="transition-transform duration-300 group-hover:-translate-x-1"
    />

    <span>Logout</span>
  </button>
</div>
  </aside>
</template>
