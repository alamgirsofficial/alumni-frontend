<script setup>
import { computed } from "vue";

import {
  CalendarDays,
  Clock3,
  MapPin,
  ArrowLeft,
  UserRound,
  CheckCircle2,
} from "@lucide/vue";

import { useRoute } from "vue-router";

import { events } from "@/constants/events";

const route = useRoute();

const event = computed(() => {
  return events.find((item) => item.slug === route.params.slug);
});
</script>

<template>
  <main
    v-if="event"
    class="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 md:py-20"
  >
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Back -->

      <RouterLink
        :to="{ name: 'events' }"
        class="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-cyan-500 transition-colors"
      >
        <ArrowLeft class="w-4 h-4" />

        সকল ইভেন্ট
      </RouterLink>

      <!-- Main Card -->

      <article
        class="mt-6 overflow-hidden rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-xl shadow-slate-200/40 dark:shadow-black/10"
      >
        <!-- Image -->

        <div class="relative h-64 sm:h-80 md:h-96 overflow-hidden">
          <img
            :src="event.image"
            :alt="event.title"
            class="w-full h-full object-cover"
          />

          <div
            class="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"
          ></div>

          <!-- Status -->

          <div
            class="absolute bottom-6 left-6 px-4 py-2 rounded-full bg-linear-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold"
          >
            {{ event.status }}
          </div>
        </div>

        <!-- Content -->

        <div class="p-6 md:p-10">
          <!-- Title -->

          <h1
            class="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white"
          >
            {{ event.title }}
          </h1>

          <!-- Meta -->

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-7">
            <div
              class="flex items-center gap-3 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10"
            >
              <CalendarDays class="w-5 h-5 text-blue-500" />

              <div>
                <p class="text-xs text-slate-400">তারিখ</p>

                <p
                  class="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  {{ event.event_date }}
                </p>
              </div>
            </div>

            <div
              class="flex items-center gap-3 p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10"
            >
              <Clock3 class="w-5 h-5 text-cyan-500" />

              <div>
                <p class="text-xs text-slate-400">সময়</p>

                <p
                  class="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  {{ event.event_time }}
                </p>
              </div>
            </div>

            <div
              class="flex items-center gap-3 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10"
            >
              <MapPin class="w-5 h-5 text-blue-500" />

              <div>
                <p class="text-xs text-slate-400">স্থান</p>

                <p
                  class="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  {{ event.location }}
                </p>
              </div>
            </div>
          </div>

          <!-- Description -->

          <div class="mt-10 text-slate-500 dark:text-slate-400 ">
            <h2 class="text-xl font-bold text-slate-800 dark:text-white">
              ইভেন্ট সম্পর্কে
            </h2>

            <p class="mt-4 text-slate-500 dark:text-slate-400 leading-8">
              {{ event.description }}
            </p>
            <section v-if="event.highlights?.length" class="mt-8">
              <h2 >বিশেষ আয়োজন: </h2>

              <ul>
                <li v-for="item in event.highlights" :key="item">
                  {{ item }}
                </li>
              </ul>
            </section>
            <section v-if="event.schedule?.length" class="mt-8">
              <h2>সময়সূচী:</h2>

              <div v-for="item in event.schedule" :key="item.title" class="mt-4">
                <span>{{ item.time }}</span>

                <h3>{{ item.title }}</h3>

                <p>{{ item.description }}</p>
              </div>
            </section>
          </div>

          <!-- Organizer -->

          <div class="mt-8 flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-xl flex items-center justify-center bg-linear-to-br from-blue-500 to-cyan-500 text-white"
            >
              <UserRound class="w-5 h-5" />
            </div>

            <div>
              <p class="text-xs text-slate-400">আয়োজক</p>

              <p class="font-semibold text-slate-700 dark:text-slate-200">
                {{ event.organizer }}
              </p>
            </div>
          </div>

          <!-- Registration -->

          <div
            v-if="event.registration"
            class="mt-8 p-5 rounded-2xl bg-linear-to-r from-blue-500/10 to-cyan-500/10 border border-cyan-500/20"
          >
            <div
              class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div>
                <div
                  class="flex items-center gap-2 text-green-500 font-semibold"
                >
                  <CheckCircle2 class="w-5 h-5" />

                  নিবন্ধন চলছে
                </div>

                <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  ইভেন্টে অংশগ্রহণ করতে এখনই নিবন্ধন করুন।
                </p>
              </div>

              <button
                class="px-6 py-3 rounded-xl bg-linear-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all duration-300"
              >
                রেজিস্টার করুন
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  </main>

  <!-- Event Not Found -->

  <main
    v-else
    class="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950"
  >
    <div class="text-center">
      <h1 class="text-3xl font-bold text-slate-800 dark:text-white">
        Event Not Found
      </h1>

      <RouterLink
        :to="{ name: 'events' }"
        class="inline-flex mt-5 px-5 py-2.5 rounded-xl bg-blue-500 text-white"
      >
        সকল ইভেন্ট দেখুন
      </RouterLink>
    </div>
  </main>
</template>
