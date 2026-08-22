<script setup>
import { ref } from "vue";
import { RouterView, useRouter } from "vue-router";

import dashboardSidebar from "@/components/layout/dashboardSidebar.vue";
import DashboardNavbar from "@/components/layout/dashboardNavbar.vue";

const router = useRouter();

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
| Temporary authentication.
| Later Laravel API connect করলে এখানে auth service/composable ব্যবহার করবে।
|--------------------------------------------------------------------------
*/

const handleLogout = async () => {
    try {
        // Temporary authentication data remove
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");

        // Sidebar close
        sidebarOpen.value = false;

        // Login page
        await router.push("/auth/login");
    } catch (error) {
        console.error("Logout failed:", error);
    }
};
</script>

<template>
    <div class="min-h-screen bg-slate-950 text-white">

        <!-- Mobile Overlay -->
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
            ></div>
        </Transition>

        <!-- Sidebar -->
        <dashboardSidebar
            :open="sidebarOpen"
            :user="user"
            @close="closeSidebar"
            @logout="handleLogout"
        />

        <!-- Main Area -->
        <div class="min-h-screen lg:pl-72">

            <!-- Navbar -->
            <dashboardNavbar
                :user="user"
                @toggle-sidebar="toggleSidebar"
                @logout="handleLogout"
            />

            <!-- Page Content -->
            <main
                class="min-h-[calc(100vh-5rem)] px-4 py-6 sm:px-6 lg:px-8"
            >
                <RouterView />
            </main>

        </div>
    </div>
</template>