<script setup>
import { computed } from "vue";

import {
    ArrowRight,
    CalendarDays,
} from "@lucide/vue";

import EventCard from "@/components/event/EventCard.vue";

import { events } from "@/constants/events";

const displayedEvents = computed(() => {
    return [...events]
        .sort(
            (a, b) =>
                new Date(b.event_date) -
                new Date(a.event_date)
        )
        .slice(0, 3);
});
</script>

<template>
  <section class="py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->

      <div class="text-center max-w-2xl mx-auto">
        <div
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-sm font-semibold"
        >
          <CalendarDays class="w-4 h-4" />

          আমাদের আয়োজন
        </div>

        <h2 class="mt-5 text-3xl md:text-4xl font-extrabold">
          আমাদের

          <span
            class="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-cyan-500"
          >
            ইভেন্টসমূহ
          </span>
        </h2>

        <p class="mt-4 text-slate-500 dark:text-slate-400 leading-7">
          আমাদের আসন্ন আয়োজন ও কার্যক্রমে আপনিও অংশগ্রহণ করুন।
        </p>
      </div>

      <!-- Event Cards -->

      <div
        v-if="displayedEvents.length"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"
        
      >
        <EventCard
          v-for="event in displayedEvents"
          :key="event.id"
          :event="event"
          data-aos="fade-up" 
        :data-aos-delay="event.id *200"
        />
      </div>

      <!-- All Events -->

      <div class="flex justify-center mt-10" data-aos="fade-up"
     data-aos-delay="300">
        <RouterLink
          to="/events"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all duration-300"
        >
          সকল ইভেন্ট দেখুন

          <ArrowRight class="w-4 h-4" />
        </RouterLink>
      </div>
    </div>
  </section>
</template>
