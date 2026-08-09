<template>

    <section class="relative min-h-screen py-20 overflow-hidden">

        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

            <!-- Back Button -->
            <RouterLink
                to="/blogs"
                class="inline-flex items-center gap-2
                text-cyan-400 hover:text-white
                mb-8 transition-colors"
            >
                <ArrowLeft class="w-5 h-5" />

                সকল ব্লগ
            </RouterLink>


            <!-- Blog -->
            <article
                v-if="blog"
                class="bg-linear-to-br from-gray-800/60
                to-blue-900/30 border border-blue-400/30
                rounded-3xl overflow-hidden backdrop-blur-sm"
            >

                <!-- Cover Image -->
                <div class="relative">

                    <img
                        :src="blog.image"
                        :alt="blog.title"
                        class="w-full h-64 md:h-96 object-cover"
                    >

                    <!-- Categories -->
                    <div
                        class="absolute top-5 left-5
                        flex flex-wrap gap-2"
                    >

                        <span
                            v-for="category in blog.categories"
                            :key="category.name"
                            class="bg-cyan-500/90 backdrop-blur
                            text-white text-xs px-4 py-2
                            rounded-full"
                        >
                            {{ category.name }}
                        </span>

                    </div>

                </div>


                <!-- Content -->
                <div class="p-6 md:p-10">

                    <!-- Meta -->
                    <div
                        class="flex flex-wrap items-center gap-5
                        text-sm text-gray-300 mb-6"
                    >

                        <div class="flex items-center gap-2">

                            <CalendarDays
                                class="w-5 h-5 text-cyan-400"
                            />

                            <span>
                                {{ blog.publish_date }}
                            </span>

                        </div>


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
                        class="text-3xl md:text-5xl
                        font-bold text-white
                        leading-tight mb-8"
                    >
                        {{ blog.title }}
                    </h1>


                    <!-- Description -->
                    <div
                        class="text-gray-300 text-lg
                        leading-9 tracking-wide"
                    >

                        <p>
                            {{ blog.desc }}
                        </p>

                    </div>
                    <div
    class="text-gray-300 text-lg leading-9 whitespace-pre-line"
>
    {{ blog.content }}
</div>


                    <!-- Divider -->
                    <div
                        class="border-t border-white/10
                        my-10"
                    ></div>


                    <!-- Author -->
                    <div
                        class="flex items-center gap-4"
                    >

                        <div
                            class="w-12 h-12 rounded-full
                            bg-linear-to-r
                            from-blue-500 to-cyan-400
                            flex items-center justify-center"
                        >

                            <User
                                class="w-6 h-6 text-white"
                            />

                        </div>


                        <div>

                            <p class="text-xs text-gray-400">
                                লেখক
                            </p>

                            <p class="text-white font-semibold">
                                {{ blog.author }}
                            </p>

                        </div>

                    </div>

                </div>

            </article>


            <!-- Blog Not Found -->
            <div
                v-else
                class="text-center py-20"
            >

                <h2 class="text-3xl font-bold text-white mb-4">
                    Blog পাওয়া যায়নি
                </h2>

                <p class="text-gray-400 mb-6">
                    আপনি যে Blog টি খুঁজছেন সেটি পাওয়া যায়নি।
                </p>

                <RouterLink
                    to="/blogs"
                    class="inline-flex items-center gap-2
                    bg-linear-to-r from-blue-600
                    to-cyan-500 text-gray-900
                    font-semibold px-6 py-3 rounded-full"
                >
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
    CalendarDays,
    User
} from '@lucide/vue'

import { blogs } from '@/constrants/blogData'


const route = useRoute()


const blog = computed(() => {

    return blogs.value.find(
        blog => blog.id === Number(route.params.id)
    )

})

</script>