<template>
    <section class="relative py-20 overflow-hidden">

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <!-- Blog Header -->
            <BlogHeader
                title="অ্যালামনাই"
                highlight="ফোরাম ব্লগ"
                description="প্রাক্তন শিক্ষার্থীদের সাফল্য, অভিজ্ঞতা এবং স্কুলের স্মৃতিচারণমূলক লেখা পড়ুন এবং আপনার অভিজ্ঞতা শেয়ার করুন"
            />

            <!-- Blog Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                <BlogCard
                    v-for="(blog, index) in homeBlogs"
                    :key="blog.id"
                    :blog="blog"
                    :delay="(index + 1) * 100"
                />

            </div>

            <!-- View All Button -->
            <div class="mt-12 flex justify-center mb-8">

                <RouterLink
                    to="/blogs"
                    class="group inline-flex items-center gap-2
                    bg-linear-to-r from-blue-600 to-cyan-500
                    hover:from-blue-500 hover:to-cyan-400
                    text-gray-900 font-semibold px-7 py-3.5
                    rounded-full shadow-blue-500/30 shadow-xl
                    hover:shadow-2xl hover:scale-105
                    transition-all duration-300 ease-out"
                >
                    সকল ব্লগ দেখুন

                    <ArrowRight
                        class="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    />
                </RouterLink>

            </div>

        </div>

    </section>
</template>


<script setup>

import { computed } from 'vue'

import { ArrowRight } from '@lucide/vue'

import { blogs } from '@/constants/blogData'

import BlogHeader from '@/components/blog/BlogHeader.vue'
import BlogCard from '@/components/blog/BlogCard.vue'


const homeBlogs = computed(() => {
    return blogs.value.slice(0, 3)
})

</script>