import { createRouter, createWebHistory } from "vue-router";

// For dashboard Gurd
import { authUser, loadAuthUser } from "@/constants/auth.js";
import { useToast } from "@/composables/useToast.js";
const { warning } = useToast();

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/MainLayout.vue"),

    // =========================
    //   Public page Routes
    // =========================
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/pages/Home.vue"),
      },
      {
        path: "about",
        name: "About",
        component: () => import("@/pages/About.vue"),
      },
      {
        path: "events",
        name: "public.events",
        component: () => import("@/pages/Events.vue"),
      },
      {
        path: "events/:slug",
        name: "event-details",
        component: () => import("@/pages/EventDetails.vue"),
      },
      {
        path: "blogs",
        name: "Blogs",
        component: () => import("@/pages/Blogs.vue"),
      },
      {
        path: "blog/:id",
        name: "blog.details",
        component: () => import("@/pages/BlogDetails.vue"),
      },
      {
        path: "contact",
        name: "Contact",
        component: () => import("@/pages/Contact.vue"),
      },
      {
        path: "gallery",
        name: "Gallery",
        component: () => import("@/pages/Gallery.vue"),
      },
      {
        path: "members",
        name: "Member",
        component: () => import("@/pages/Members.vue"),
      },
      {
        path: "committee",
        name: "Committee",
        component: () => import("@/pages/ExecutiveCommitee.vue"),
      },

      //========================
      // Footer Links Pages
      //========================
      {
        path: "ebookCollection",
        name: "ebookCollection",
        component: () => import("@/pages/EbookCollection.vue"),
      },
      {
        path: "careerDevelopment",
        name: "careerDevelopment",
        component: () => import("@/pages/CareerDevelopment.vue"),
      },
      {
        path: "technicalSkills",
        name: "technicalSkills",
        component: () => import("@/pages/TechnicalSkills.vue"),
      },
      {
        path: "scholarship",
        name: "scholarship",
        component: () => import("@/pages/Scholarship.vue"),
      },
      {
        path: "training",
        name: "training",
        component: () => import("@/pages/Training.vue"),
      },
      {
        path: "consultation",
        name: "consultation",
        component: () => import("@/pages/Consultation.vue"),
      },
    ],
  },

  // =========================
  // Authentication route
  // =========================
  {
    path: "/auth",
    component: () => import("@/layouts/AuthLayout.vue"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("@/pages/auth/Login.vue"),
        meta: {
          guest: true,
        },
      },
      {
        path: "register",
        name: "register",
        component: () => import("@/pages/auth/Register.vue"),
      },
      {
        path: "verify-email",
        name: "VerifyEmail",
        component: () => import("@/pages/auth/VerifyEmail.vue"),
      },
      {
        path: "forgot-password",
        name: "ForgotPassword",
        component: () => import("@/pages/auth/ForgotPassword.vue"),
      },
    ],
  },
  //========================
  // User Profile
  //========================
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/pages/profile/UserProfile.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/profile/edit",
    name: "EditProfile",
    component: () => import("@/pages/profile/EditProfile.vue"),
    meta: {
      requiresAuth: true,
    },
  },

  //========================
  // Dashboard Related Routes
  //========================

  {
    path: "/dashboard",
    component: () => import("@/layouts/DashboardLayout.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "",
        name: "dashboard",
        component: () => import("@/pages/dashboard/Dashboard.vue"),
      },
      {
        path: "alumni",
        name: "alumni.list",
        component: () => import("@/components/dashboard/alumni/AlumniList.vue"),
      },
      {
        path: "alumni/create",
        name: "alumni.create",
        component: () =>
          import("@/components/dashboard/alumni/AlumniCreate.vue"),
      },

      //==================
      // Event CRUD  Related Route
      //==================
      {
        path: "events",
        name: "EventList",
        component: () => import("@/components/dashboard/event/EventList.vue"),
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

      //==================
      // Event Registrations
      //==================
      {
        path: "events/registrations",
        name: "EventRegistrations",
        component: () =>
          import("@/components/dashboard/event/EventRegistrations.vue"),
      },

      //==================
      // Blog CRUD  Related Route
      //==================
      {
        path: "blogs",
        name: "BlogList",
        component: () => import("@/components/dashboard/blog/BlogList.vue"),
      },
      {
        path: "blogs/create",
        name: "BlogCreate",
        component: () => import("@/components/dashboard/blog/BlogCreate.vue"),
      },
      {
        path: "blogs/:id",
        name: "BlogView",
        component: () => import("@/components/dashboard/blog/BlogView.vue"),
      },
      {
        path: "blogs/:id/edit",
        name: "BlogEdit",
        component: () => import("@/components/dashboard/blog/BlogEdit.vue"),
      },

      //==================
      // Gallery CRUD  Related Route
      //==================
      {
        path: "gallery",
        name: "GalleryList",
        component: () =>
          import("@/components/dashboard/gallery/GalleryList.vue"),
      },
      {
        path: "gallery/create",
        name: "GalleryCreate",
        component: () =>
          import("@/components/dashboard/gallery/GalleryCreate.vue"),
      },
      {
        path: "gallery/:id/edit",
        name: "GalleryEdit",
        component: () =>
          import("@/components/dashboard/gallery/GalleryEdit.vue"),
      },

      //====================
      //  Committee CRUD  Related Route
      //====================
      {
        path: "committee",
        name: "CommitteeList",
        component: () =>
          import("@/components/dashboard/committee/CommitteeList.vue"),
      },
      {
        path: "committee/create",
        name: "CommitteeCreate",
        component: () =>
          import("@/components/dashboard/committee/CommitteeCreate.vue"),
      },
      {
        path: "committee/:committeeId/members",
        name: "CommitteeMemberList",
        component: () =>
          import("@/components/dashboard/committee/CommitteeMemberList.vue"),
      },

      {
        path: "committee/:committeeId/:type/:memberId/edit",
        name: "CommitteeEdit",
        component: () =>
          import("@/components/dashboard/committee/CommitteeEdit.vue"),
      },
      //====================
      // Messages CRUD  Related Route

      {
        path: "messages",
        name: "MessageList",
        component: () =>
          import("@/components/dashboard/messages/MessageList.vue"),
      },
      {
        path:"reports",
        name:"Reports",
        component:()=>import("@/pages/dashboard/Reports.vue")
      },
      {
        path:"settings",
        name:"Settings",
        component:()=>import("@/pages/dashboard/Settings.vue")
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
