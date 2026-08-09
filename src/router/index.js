import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import About from "../pages/About.vue";
import Events from "../pages/Events.vue";
import Blogs from "../pages/Blogs.vue";
import Blog from '@/pages/blogs.vue';
import BlogDetails from '@/pages/BlogDetails.vue';
import Contact from "../pages/Contact.vue";
import Gallery from "../pages/Gallery.vue";


const routes =[
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/events',
        name: 'Events',
        component: Events
    },
    {
        path: '/blogs',
        name: 'Blogs',
        component: Blogs
    },
        {
            path: '/blog/:id',
            name: 'blog.details',
            component: BlogDetails
        },    
    {
        path: '/contact',
        name: 'Contact',
        component: Contact
    },
    {
        path: '/gallery',
        name: 'Gallery',
        component: Gallery
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;