import { createRouter, createWebHistory } from "vue-router";

// For dashboard Gurd
import { authUser, loadAuthUser } from "@/constants/auth.js";
import { useToast } from "@/composables/useToast.js";
const { warning } = useToast();

// =========================
// Layouts
// =========================

import MainLayout from "@/layouts/MainLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import DashboardLayout from "@/layouts/DashboradLayout.vue";

// =========================
// Public Pages
// =========================

import Home from "@/pages/Home.vue";
import About from "@/pages/About.vue";
import Events from "@/pages/Events.vue";
import EventDetails from "@/pages/EventDetails.vue";
import Blogs from "@/pages/Blogs.vue";
import BlogDetails from "@/pages/BlogDetails.vue";
import Contact from "@/pages/Contact.vue";
import Gallery from "@/pages/Gallery.vue";
import Members from "@/pages/Members.vue";
import Committee from "@/pages/ExecutiveCommitee.vue";

// =========================
// Authentication Pages
// =========================

import Login from "@/pages/auth/Login.vue";
import Register from "@/pages/auth/Register.vue";
import ForgotPassword from "@/pages/auth/ForgotPassword.vue";
import VerifyEmail from "@/pages/auth/VerifyEmail.vue";

import UserProfile from "@/pages/profile/UserProfile.vue";
import ProfileEdit from "@/pages/profile/EditProfile.vue";

// ================ Dashboard Routes
import Dashboard from "@/pages/dashboard/Dashboard.vue";

import alumni from "@/components/dashboard/alumni/Alumni_list.vue";
import alumniCreate from "@/components/dashboard/alumni/Alumni_Create.vue";

import EventList from "@/components/dashboard/event/EventList.vue";

// =========================
//  Routes
// =========================

const routes = [
  // =========================
  // Main Website
  // =========================

  {
    path: "/",
    component: MainLayout,

    children: [
      {
        path: "",
        name: "Home",
        component: Home,
      },

      {
        path: "about",
        name: "About",
        component: About,
      },
      {
        path: "/events",
        name: "public.events",
        component: Events,
      },
      {
        path: "/events/:slug",
        name: "event-details",
        component: EventDetails,
      },
      {
        path: "blogs",
        name: "Blogs",
        component: Blogs,
      },

      {
        path: "blog/:id",
        name: "blog.details",
        component: BlogDetails,
      },

      {
        path: "contact",
        name: "Contact",
        component: Contact,
      },

      {
        path: "gallery",
        name: "Gallery",
        component: Gallery,
      },
      {
        path: "members",
        name: "Member",
        component: Members,
      },
      {
        path: "committee",
        name: "Committee",
        component: Committee,
      },
      {
        path:"ebookCollection",
        name:"ebookCollection",
        component: () => import("@/pages/EbookCollection.vue")
      },
    ],
  },

  // =========================
  // Authentication route
  // =========================

  {
    path: "/auth/",
    component: AuthLayout,

    children: [
      {
        path: "login",
        name: "login",
        component: Login,
        meta: {
          guest: true,
        },
      },

      {
        path: "register",
        name: "register",
        component: Register,
      },

      {
        path: "verify-email",
        name: "VerifyEmail",
        component: VerifyEmail,
      },

      {
        path: "forgot-password",
        name: "ForgotPassword",
        component: ForgotPassword,
      },
    ],
  },
  //======================== User Profile
  {
    path: "/profile",
    name: "profile",
    component: UserProfile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/profile/edit",
    name: "profile.edit",
    component: ProfileEdit,
  },

  // Dashboarad Releted Route

  {
    path: "/dashboard",
    component: DashboardLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "",
        name: "dashboard",
        component: Dashboard,
      },
      {
        path: "alumni",
        name: "alumni.list",
        component: alumni,
      },
      {
        path: "alumni/create",
        name: "alumni.create",
        component: alumniCreate,
      },

      {
        path: "events",
        name: "EventList",
        component: EventList,
      },
      {
        path: "events/create",
        name: "EventCreate",
        component: () => import("@/components/dashboard/event/EventCreate.vue"),
      },
      {
    path: "events/:id/edit",
    name: "EventEdit",
    component: () => import("@/components/dashboard/event/EventEdit.vue"),
},
{
    path: "events/registrations",
    name: "EventRegistrations",
    component: () => import("@/components/dashboard/event/EventRegistrations.vue"),
},

      {
        path: "blogs",
        name: "blogs",
        component: Blogs,
      },
      {
        path: "gallery",
        name: "gallery",
        component: Gallery,
      },
      {
        path: "committee",
        name: "committee",
        component: Committee,
      },
    ],
  },
];

// =========================
// Router
// =========================

const router = createRouter({
  history: createWebHistory(),

  routes,
});

loadAuthUser();

router.beforeEach((to) => {
  const isLoggedIn = authUser.isAuthenticated;

  // Login না করলে protected page-এ যেতে পারবে না
  if (to.meta.requiresAuth && !isLoggedIn) {
    warning("এই পেজটি দেখতে আপনার অ্যাকাউন্টে লগইন করতে হবে।");

    return {
      name: "login",
      query: {
        redirect: to.fullPath,
      },
    };
  }

  // Already logged in হলে login page-এ যেতে পারবে না
  if (to.meta.guest && isLoggedIn) {
    return {
      name: "dashboard",
    };
  }

  // Navigation allow
  return true;
});
export default router;
