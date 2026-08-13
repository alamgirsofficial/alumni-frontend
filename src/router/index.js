import { createRouter, createWebHistory } from "vue-router";

// =========================
// Layouts
// =========================

import MainLayout from "@/layouts/MainLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";


// =========================
// Public Pages
// =========================

import Home from "@/pages/Home.vue";
import About from "@/pages/About.vue";
import Events from "@/pages/Events.vue";
import Blogs from "@/pages/Blogs.vue";
import BlogDetails from "@/pages/BlogDetails.vue";
import Contact from "@/pages/Contact.vue";
import Gallery from "@/pages/Gallery.vue";
import Members from "@/pages/Members.vue";


// =========================
// Authentication Pages
// =========================

import Login from "@/pages/auth/Login.vue";
import Register from "@/pages/auth/Register.vue";
import ForgotPassword from "@/pages/auth/ForgotPassword.vue";
import VerifyEmail from "@/pages/auth/VerifyEmail.vue";



// =========================
// Routes
// =========================

const routes = [

    // =========================
    // Main Website
    // =========================

    {
        path: '/',
        component: MainLayout,

        children: [

            {
                path: '',
                name: 'Home',
                component: Home,
            },

            {
                path: 'about',
                name: 'About',
                component: About,
            },

            {
                path: 'events',
                name: 'Events',
                component: Events,
            },

            {
                path: 'blogs',
                name: 'Blogs',
                component: Blogs,
            },

            {
                path: 'blog/:id',
                name: 'blog.details',
                component: BlogDetails,
            },

            {
                path: 'contact',
                name: 'Contact',
                component: Contact,
            },

            {
                path: 'gallery',
                name: 'Gallery',
                component: Gallery,
            },
            {
                path: 'members',
                name:'Member',
                component: Members
            }

        ],
    },


    // =========================
    // Authentication
    // =========================

    {
        path: '/auth/',
        component: AuthLayout,

        children: [

            {
                path: 'login',
                name: 'login',
                component: Login,
            },

            {
                path: 'register',
                name: 'register',
                component: Register,
            },

            {
                path: 'verify-email',
                name: 'VerifyEmail',
                component: VerifyEmail,
            },

            {
                path: 'forgot-password',
                name: 'ForgotPassword',
                component: ForgotPassword,
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


export default router;