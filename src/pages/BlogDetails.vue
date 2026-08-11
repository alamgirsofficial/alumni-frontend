```vue
<template>

    <section class="relative min-h-screen py-16 md:py-20 overflow-hidden">

        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

            <!-- Back Button -->
            <RouterLink
                to="/blogs"
                class="group inline-flex items-center gap-2
                text-cyan-400 hover:text-cyan-300
                mb-8 transition-all duration-300"
            >
                <ArrowLeft
                    class="w-5 h-5
                    group-hover:-translate-x-1
                    transition-transform duration-300"
                />

                <span class="font-medium">
                    সকল ব্লগ
                </span>
            </RouterLink>


            <!-- Blog Details -->
            <article
                v-if="blog"
                class="relative overflow-hidden
                bg-linear-to-br from-gray-800/70
                via-gray-900/60 to-blue-900/30
                border border-blue-400/30
                rounded-3xl backdrop-blur-md
                shadow-2xl shadow-blue-900/20"
            >

                <!-- ================= IMAGE ================= -->
                <div class="relative overflow-hidden">

                    <img
                        :src="blog.image"
                        :alt="blog.title"
                        class="w-full h-64 sm:h-80 md:h-112
                        object-cover"
                    >

                    <!-- Image Overlay -->
                    <div
                        class="absolute inset-0
                        bg-linear-to-t
                        from-gray-950/80
                        via-transparent to-transparent"
                    ></div>


                    <!-- Categories -->
                    <div
                        class="absolute top-5 left-5
                        right-5 flex flex-wrap gap-2"
                    >

                        <span
                            v-for="category in blog.categories"
                            :key="category.name"
                            class="px-3 py-1.5
                            rounded-full
                            bg-cyan-500/90
                            backdrop-blur-sm
                            border border-cyan-300/20
                            text-white text-xs
                            font-medium shadow-lg"
                        >
                            {{ category.name }}
                        </span>

                    </div>

                </div>


                <!-- ================= CONTENT ================= -->
                <div class="p-6 sm:p-8 md:p-12">


                    <!-- Meta Information -->
                    <div
                        class="flex flex-wrap items-center
                        gap-x-6 gap-y-3
                        text-sm text-gray-400 mb-6"
                    >

                        <!-- Date -->
                        <div class="flex items-center gap-2">

                            <CalendarDays
                                class="w-5 h-5 text-cyan-400"
                            />

                            <span>
                                {{ blog.publish_date }}
                            </span>

                        </div>


                        <!-- Author -->
                        <div class="flex items-center gap-2">

                            <User
                                class="w-5 h-5 text-blue-400"
                            />

                            <span>
                                {{ blog.author }}
                            </span>

                        </div>

                    </div>


                    <!-- Title -->
                    <h1
                        class="text-3xl sm:text-4xl
                        md:text-4xl
                        font-bold text-white
                        leading-tight tracking-tight
                        mb-8"
                    >
                        {{ blog.title }}
                    </h1>


                    <!-- Short Description -->
                    <p
                        class="text-lg md:text-xl
                        text-blue-100
                        leading-9
                        mb-8"
                    >
                        {{ blog.desc }}
                    </p>


                    <!-- Divider -->
                    <div
                        class="h-px w-full
                        bg-linear-to-r
                        from-transparent
                        via-blue-400/30
                        to-transparent
                        mb-8"
                    ></div>


                    <!-- ================= ARTICLE CONTENT ================= -->
                    <div
                        class="prose prose-invert
                        max-w-none
                        text-gray-300
                        text-base md:text-lg
                        leading-9
                        tracking-wide"
                    >

                        <p class="whitespace-pre-line">
                            {{ blog.content }}
                        </p>

                    </div>


                    <!-- ================= AUTHOR ================= -->
                    <div
                        class="mt-12 pt-8
                        border-t border-white/10"
                    >

                        <div
                            class="flex items-center
                            justify-between
                            gap-4 flex-wrap"
                        >

                            <!-- Author Info -->
                            <div class="flex items-center gap-4">

                                <!-- Avatar -->
                                <div
                                    class="w-12 h-12
                                    rounded-full
                                    bg-linear-to-r
                                    from-blue-500
                                    to-cyan-400
                                    flex items-center
                                    justify-center
                                    shadow-lg
                                    shadow-cyan-500/20"
                                >

                                    <User
                                        class="w-6 h-6
                                        text-white"
                                    />

                                </div>


                                <!-- Name -->
                                <div>

                                    <p
                                        class="text-xs
                                        text-gray-400 mb-1"
                                    >
                                        লেখক
                                    </p>

                                    <p
                                        class="text-white
                                        font-semibold"
                                    >
                                        {{ blog.author }}
                                    </p>

                                </div>

                            </div>


                            <!-- Back To Blogs -->
                            <RouterLink
                                to="/blogs"
                                class="group inline-flex
                                items-center gap-2
                                text-cyan-400
                                hover:text-white
                                font-medium
                                transition-colors"
                            >
                                আরও ব্লগ দেখুন

                                <ArrowRight
                                    class="w-4 h-4
                                    group-hover:translate-x-1
                                    transition-transform"
                                />
                            </RouterLink>

                        </div>

                    </div>

                </div>

            </article>


            <!-- ================= BLOG NOT FOUND ================= -->
            <div
                v-else
                class="text-center py-24
                bg-gray-800/40
                border border-white/10
                rounded-3xl"
            >

                <div
                    class="w-16 h-16 mx-auto mb-6
                    rounded-full
                    bg-blue-500/10
                    border border-blue-400/20
                    flex items-center
                    justify-center"
                >

                    <FileQuestion
                        class="w-8 h-8 text-cyan-400"
                    />

                </div>


                <h2
                    class="text-2xl md:text-3xl
                    font-bold text-white mb-3"
                >
                    Blog পাওয়া যায়নি
                </h2>


                <p
                    class="text-gray-400
                    max-w-md mx-auto
                    leading-7 mb-7"
                >
                    আপনি যে Blog টি খুঁজছেন সেটি
                    পাওয়া যায়নি অথবা Blog টি
                    আর available নেই।
                </p>


                <RouterLink
                    to="/blogs"
                    class="inline-flex items-center
                    gap-2 px-6 py-3
                    rounded-full
                    bg-linear-to-r
                    from-blue-600 to-cyan-500
                    text-gray-900
                    font-semibold
                    hover:from-blue-500
                    hover:to-cyan-400
                    hover:scale-105
                    transition-all duration-300"
                >
                    <ArrowLeft class="w-5 h-5" />

                    সকল ব্লগ দেখুন

                </RouterLink>

            </div>

        </div>

    </section>

</template>


<script setup>

import { computed } from 'vue'

import { useRoute } from 'vue-router'

import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    User,
    FileQuestion
} from '@lucide/vue'

import { blogs } from '@/constrants/blogData'


const route = useRoute()


const blog = computed(() => {

    return blogs.value.find(
        blog => blog.id === Number(route.params.id)
    )

})

</script>
