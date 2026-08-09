<template>

    <article
        class="group relative bg-linear-to-br from-gray-800/50 to-blue-900/30
        rounded-3xl overflow-hidden border backdrop-blur-sm
        border-blue-400/40 transition-all duration-300
        hover:-translate-y-2 hover:shadow-cyan-500/20
        hover:border-cyan-400/50 hover:shadow-2xl"
        :class="blog.borderColor"
        data-aos="fade-up"
        :data-aos-delay="delay"
    >

        <!-- Image -->
        <div class="relative overflow-hidden">

            <img
                :src="blog.image"
                :alt="blog.title"
                class="w-full h-48 object-cover
                group-hover:scale-110
                transition-transform duration-500"
            >

            <!-- Categories -->
            <div class="absolute top-4 left-4 flex flex-wrap gap-2">

                <span
                    v-for="category in blog.categories"
                    :key="category.name"
                    class="bg-cyan-500/90 backdrop-blur
                    text-white text-xs px-3 py-1 rounded-full"
                >
                    {{ category.name }}
                </span>

            </div>

        </div>


        <!-- Content -->
        <div class="p-6">

            <!-- Date -->
            <div class="flex items-center gap-2 text-sm text-gray-300 mb-4">

                <CalendarDays
                    class="w-5 h-5 text-cyan-400"
                />

                <span>
                    {{ blog.publish_date }}
                </span>

            </div>


            <!-- Title -->
            <h3
                class="text-lg font-bold text-white mb-2
                group-hover:text-blue-400
                transition-colors duration-300"
            >
                {{ blog.title }}
            </h3>


            <!-- Description -->
            <p
                class="text-gray-300 leading-7 line-clamp-3
                tracking-wide mb-6"
            >
                {{ blog.desc }}
            </p>


            <!-- Footer -->
            <div
                class="flex items-center justify-between
                border-t border-white/10 pt-4"
            >

                <!-- Author -->
                <div class="flex items-center gap-2">

                    <span class="text-sm font-bold text-gray-300">
                        লেখকঃ
                    </span>

                    <span class="text-sm font-medium text-white">
                        {{ blog.author }}
                    </span>

                </div>


                <!-- Read More -->
                <RouterLink
                    :to="`/blog/${blog.id}`"
                    class="flex items-center gap-2
                    text-cyan-400 hover:text-white
                    font-medium transition
                    hover:scale-105"
                >
                    বিস্তারিত

                    <ArrowRight class="w-4 h-4" />
                </RouterLink>

            </div>

        </div>

    </article>

</template>

<script setup>

import {
    CalendarDays,
    ArrowRight
} from '@lucide/vue';


defineProps({
    blog: {
        type: Object,
        required: true
    },

    delay: {
        type: Number,
        default: 0
    }
})

</script>