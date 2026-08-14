<script setup>
import {
    CalendarDays,
    MapPin,
    Clock3,
    ArrowRight,
    Info,
    UserPlus,
} from '@lucide/vue';

defineProps({
    event: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <article
        class="group overflow-hidden rounded-2xl
        bg-white/80 dark:bg-white/5
        backdrop-blur-xl
        border border-slate-200/80 dark:border-white/10
        shadow-lg shadow-slate-200/40 dark:shadow-black/10
        transition-all duration-500
        hover:-translate-y-2
        hover:border-cyan-400/40
        hover:shadow-xl hover:shadow-cyan-500/10"
    >

        <!-- Image -->
        <div class="relative h-56 overflow-hidden">

            <img
                :src="event.image"
                :alt="event.title"
                class="w-full h-full object-cover
                transition-transform duration-700
                group-hover:scale-110"
            />

            <div
                class="absolute inset-0
                bg-linear-to-t from-black/60
                via-black/10 to-transparent"
            ></div>

            <!-- Date -->
            <div
                class="absolute top-4 left-4
                inline-flex items-center gap-2
                px-3 py-2 rounded-xl
                text-sm font-semibold text-white
                bg-linear-to-r from-blue-500 to-cyan-500
                shadow-lg shadow-blue-500/20"
            >
                <CalendarDays class="w-4 h-4" />

                {{ event.event_date }}
            </div>

            <!-- Status -->
            <div
                class="absolute bottom-4 right-4
                px-3 py-1.5 rounded-full
                text-sm font-semibold
               bg-linear-to-r from-blue-500 to-cyan-500
                shadow-lg shadow-blue-500/20
                text-slate-700 dark:text-slate-200"
            >
                {{ event.status }}
            </div>

        </div>


        <!-- Content -->
        <div class="p-5">

            <!-- Title -->
            <h3
                class="text-xl font-bold
                text-slate-800 dark:text-white
                leading-snug
                line-clamp-2
                group-hover:text-cyan-500
                transition-colors duration-300"
            >
                {{ event.title }}
            </h3>


            <!-- Location -->
            <div
                class="flex items-center gap-2
                mt-3 text-sm
                text-slate-500 dark:text-slate-400"
            >
                <MapPin
                    class="w-4 h-4 shrink-0 text-cyan-500"
                />

                <span>
                    {{ event.location }}
                </span>
            </div>


            <!-- Description -->
            <p
                class="mt-3 text-sm leading-6
                text-slate-500 dark:text-slate-400
                line-clamp-2"
            >
                {{ event.description }}
            </p>


            <!-- Meta -->
            <div
                class="flex items-center justify-between
                mt-4 pt-4
                border-t border-slate-200
                dark:border-white/10"
            >

                <div
                    class="flex items-center gap-1.5
                    text-sm text-slate-500
                    dark:text-slate-400"
                >
                    <Clock3
                        class="w-4 h-4 text-cyan-500"
                    />

                    {{ event.duration }}
                </div>


                <span
                    v-if="event.registration_open"
                    class="text-xs font-medium
                    text-green-500"
                >
                    নিবন্ধন চলছে
                </span>

            </div>


            <!-- Buttons -->
            <div class="flex gap-3 mt-5">

                <!-- Details -->
                <RouterLink
                    :to="{
                        name: 'event-details',
                        params: {
                            slug: event.slug
                        }
                    }"
                    class="flex-1
                    inline-flex items-center justify-center gap-2
                    px-4 py-2.5
                    rounded-xl
                    bg-linear-to-r from-blue-500 to-cyan-500
                    text-white text-sm font-semibold
                    shadow-md shadow-blue-500/20
                    hover:shadow-lg hover:shadow-cyan-500/20
                    transition-all duration-300"
                >

                    <Info class="w-4 h-4" />

                    বিস্তারিত

                    <ArrowRight
                        class="w-4 h-4
                        transition-transform duration-300
                        group-hover:translate-x-1"
                    />

                </RouterLink>


                <!-- Register -->
                <button
                    v-if="event.registration_open"
                    class="inline-flex items-center justify-center gap-2
                    px-4 py-2.5
                    rounded-xl
                    border border-blue-500
                    text-blue-500
                    hover:bg-blue-500
                    hover:text-white
                    transition-all duration-300"
                >

                    <UserPlus class="w-4 h-4" />

                    <span class="hidden sm:inline">
                        রেজিস্টার
                    </span>

                </button>

            </div>

        </div>

    </article>
</template>