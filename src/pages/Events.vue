<script setup>
import { ref, computed } from 'vue';

import {
    CalendarDays,
    Sparkles,
} from '@lucide/vue';

import EventCard from '@/components/event/EventCard.vue';

import { events } from '@/constrants/events';


const activeFilter = ref('all');


const filters = [
    {
        label: 'সব ইভেন্ট',
        value: 'all',
    },
    {
        label: 'আসন্ন',
        value: 'upcoming',
    },
    {
        label: 'সম্পন্ন',
        value: 'completed',
    },
];


const filteredEvents = computed(() => {

    if (activeFilter.value === 'all') {
        return events;
    }

    return events.filter(
        event => event.status === activeFilter.value
    );
});
</script>


<template>

    <main
        class="min-h-screen
        bg-slate-50 dark:bg-slate-950
        text-slate-800 dark:text-white"
    >

        <!-- ================================= -->
        <!-- Hero -->
        <!-- ================================= -->

        <section
            class="relative overflow-hidden
            py-20 md:py-28"
        >

            <!-- Background glow -->

            <div
                class="absolute -top-32 -left-32
                w-80 h-80
                bg-blue-500/20
                blur-3xl rounded-full"
            ></div>

            <div
                class="absolute -bottom-32 -right-32
                w-80 h-80
                bg-cyan-500/20
                blur-3xl rounded-full"
            ></div>


            <div
                class="relative max-w-7xl mx-auto
                px-4 sm:px-6 lg:px-8"
            >

                <div class="max-w-3xl mx-auto text-center">

                    <!-- Small label -->

                    <div
                        class="inline-flex items-center gap-2
                        px-4 py-2
                        rounded-full
                        bg-blue-500/10
                        border border-blue-500/20
                        text-blue-500
                        text-sm font-semibold"
                    >

                        <Sparkles class="w-4 h-4" />

                        আমাদের আয়োজন

                    </div>


                    <!-- Heading -->

                    <h1
                        class="mt-6
                        text-4xl md:text-5xl lg:text-6xl
                        font-extrabold
                        tracking-tight"
                    >

                        আমাদের

                        <span
                            class="text-transparent
                            bg-clip-text
                            bg-linear-to-r
                            from-blue-500 to-cyan-500"
                        >
                            ইভেন্টসমূহ
                        </span>

                    </h1>


                    <!-- Description -->

                    <p
                        class="mt-5
                        text-base md:text-lg
                        leading-8
                        text-slate-500
                        dark:text-slate-400"
                    >
                        প্রাক্তন শিক্ষার্থীদের নিয়ে আমাদের সকল
                        আয়োজন, কার্যক্রম এবং বিশেষ অনুষ্ঠানসমূহ
                        সম্পর্কে জানুন।
                    </p>

                </div>

            </div>
        </section>


        <!-- ================================= -->
        <!-- Events -->
        <!-- ================================= -->

        <section
            class="pb-20"
        >

            <div
                class="max-w-7xl mx-auto
                px-4 sm:px-6 lg:px-8"
            >

                <!-- Filter -->

           <div
    class="flex flex-wrap
    items-center justify-center
    gap-3 mb-10"
>
    <button
        v-for="filter in filters"
        :key="filter.value"

        @click="activeFilter = filter.value"

        class="px-5 py-2.5
        rounded-full
        text-sm font-semibold
        border
        transition-all duration-300"

        :class="
            activeFilter === filter.value

            ? 'bg-linear-to-r from-blue-500 to-cyan-500 text-white border-transparent shadow-lg shadow-blue-500/20'

            : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-cyan-400 hover:text-cyan-500'
        "
    >
        {{ filter.label }}
    </button>
</div>


                <!-- Cards -->

                <div
                    v-if="filteredEvents.length"
                    class="grid grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-3
                    gap-6 lg:gap-7"
                >

                    <EventCard
                        v-for="event in filteredEvents"
                        :key="event.id"
                        :event="event"
                    />

                </div>


                <!-- Empty -->

                <div
                    v-else
                    class="py-20 text-center"
                >

                    <CalendarDays
                        class="mx-auto
                        w-12 h-12
                        text-slate-300
                        dark:text-slate-700"
                    />

                    <h3
                        class="mt-4
                        text-xl font-bold
                        text-slate-700
                        dark:text-slate-300"
                    >
                        কোনো ইভেন্ট পাওয়া যায়নি
                    </h3>

                </div>

            </div>

        </section>

    </main>

</template>