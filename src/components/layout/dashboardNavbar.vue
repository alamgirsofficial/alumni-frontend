<script setup>
import {
  Menu,
  Bell,
  ChevronDown,
  UserCircle,
  Settings,
  LogOut,
} from "@lucide/vue";

defineProps({
  user: {
    type: Object,
    default: () => ({
      name: "Admin User",
      role: "Administrator",
    }),
  },
});

const emit = defineEmits([
  "toggle-sidebar",
  "logout",
]);

const toggleSidebar = () => {
  emit("toggle-sidebar");
};

const handleLogout = () => {
  emit("logout");
};
</script>

<template>
  <header
    class="sticky top-0 z-30 h-20 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl"
  >

    <div
      class="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8"
    >

      <!-- =====================================================
           LEFT
      ====================================================== -->

      <div class="flex items-center gap-3">

        <!-- Mobile Menu -->
        <button
          type="button"
          aria-label="Open sidebar"
          class="rounded-xl border border-white/10 bg-white/5 p-2.5 text-slate-400 transition hover:bg-white/10 hover:text-white lg:hidden"
          @click="toggleSidebar"
        >
          <Menu :size="20" />
        </button>

        <!-- Page title -->
        <div class="hidden sm:block">

          <p class="text-xs text-slate-500">
            Admin Panel
          </p>

          <h2 class="text-sm font-semibold text-white">
            Alumni Management
          </h2>

        </div>

      </div>

      <!-- =====================================================
           RIGHT
      ====================================================== -->

      <div class="flex items-center gap-2 sm:gap-3">

        <!-- Notification -->
        <button
          type="button"
          aria-label="Notifications"
          class="relative rounded-xl border border-white/10 bg-white/5 p-2.5 text-slate-400 transition hover:bg-white/10 hover:text-white"
        >
          <Bell :size="18" />

          <!-- Notification Badge -->
          <span
            class="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-cyan-400 ring-2 ring-slate-950"
          />
        </button>

        <!-- Divider -->
        <div
          class="hidden h-8 w-px bg-white/10 sm:block"
        />

        <!-- User -->
        <div class="group relative">

          <button
            type="button"
            class="flex items-center gap-2 rounded-xl px-2 py-1.5 transition hover:bg-white/5"
          >

            <div
              class="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-cyan-400 to-blue-500"
            >
              <UserCircle :size="21" />
            </div>

            <div class="hidden text-left sm:block">

              <p
                class="max-w-32 truncate text-xs font-semibold text-white"
              >
                {{ user.name }}
              </p>

              <p class="text-[10px] text-slate-500">
                {{ user.role }}
              </p>

            </div>

            <ChevronDown
              :size="15"
              class="hidden text-slate-500 transition-transform group-hover:rotate-180 sm:block"
            />

          </button>

          <!-- Dropdown -->
          <div
            class="invisible absolute right-0 top-full mt-2 w-48 translate-y-1 rounded-2xl border border-white/10 bg-slate-900 p-2 opacity-0 shadow-2xl shadow-black/30 transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
          >

            <RouterLink
              to="/profile"
              class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              <UserCircle :size="16" />

              <span>
                Profile
              </span>
            </RouterLink>

            <RouterLink
              to="/settings"
              class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              <Settings :size="16" />

              <span>
                Settings
              </span>
            </RouterLink>

            <div
              class="my-1 border-t border-white/10"
            />

            <button
              type="button"
              class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
              @click="handleLogout"
            >
              <LogOut :size="16" />

              <span>
                Logout
              </span>
            </button>

          </div>

        </div>

      </div>

    </div>

  </header>
</template>