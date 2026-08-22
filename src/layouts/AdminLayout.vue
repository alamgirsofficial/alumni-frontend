<script setup>
import { ref } from "vue";
import { RouterView } from "vue-router";

import AdminSidebar from "@/components/admin/AdminSidebar.vue";
import AdminTopbar from "@/components/admin/AdminNavbar.vue";

const sidebarOpen = ref(false);

const user = ref({
  name: "Admin User",
  role: "Administrator",
});

const openSidebar = () => {
  sidebarOpen.value = true;
};

const closeSidebar = () => {
  sidebarOpen.value = false;
};

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

/*
|--------------------------------------------------------------------------
| Logout
|--------------------------------------------------------------------------
|
| এখন temporary logout.
| Laravel API connect করলে এখানে auth composable/service ব্যবহার করবে।
|--------------------------------------------------------------------------
*/

const handleLogout = async () => {
  try {
    // Temporary authentication data remove
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");

    // Login page এ redirect
    window.location.href = "auth/login";
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
</script>

<template>
  <div
    class="min-h-screen bg-slate-950 text-white"
  >

    <!-- =====================================================
         MOBILE OVERLAY
    ====================================================== -->

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

    <!-- =====================================================
         SIDEBAR
    ====================================================== -->

    <AdminSidebar
      :open="sidebarOpen"
      :user="user"
      @close="closeSidebar"
      @logout="handleLogout"
    />

    <!-- =====================================================
         MAIN AREA
    ====================================================== -->

    <div
      class="min-h-screen lg:pl-72"
    >

      <!-- ===================================================
           TOPBAR
      ==================================================== -->

      <AdminTopbar
        :user="user"
        @toggle-sidebar="toggleSidebar"
        @logout="handleLogout"
      />

      <!-- ===================================================
           PAGE CONTENT
      ==================================================== -->

      <main
        class="min-h-[calc(100vh-5rem)] px-4 py-6 sm:px-6 lg:px-8"
      >
        <RouterView />
      </main>

    </div>

  </div>
</template>