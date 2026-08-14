<template>
  <section class="relative py-20 lg:py-28 overflow-hidden">
    <!-- Background Glow -->
    <div
      class="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
    ></div>

    <div
      class="absolute -bottom-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
    ></div>

    <div class="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
      <div class="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
        <!-- ========================= -->
        <!-- LEFT : CONTENT             -->
        <!-- ========================= -->

        <div>
          <!-- Small Label -->
          <div class="flex items-center gap-3 mb-6">
            <span
              class="w-10 h-0.5 bg-linear-to-r from-blue-500 to-cyan-400"
            ></span>

            <span
              class="text-sm font-semibold tracking-[0.25em] text-cyan-400 uppercase"
            >
              আমাদের গল্প
            </span>
          </div>

          <!-- Heading -->
          <h2
            class="text-4xl sm:text-4xl lg:text-4xl xl:text-4xl font-bold leading-tight text-white"
          >
            একসাথে পথচলা,
            <br />

            <span
              class="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400"
            >
              একসাথে এগিয়ে চলা
            </span>
          </h2>

          <!-- Description -->
          <p class="mt-6 text-gray-400 text-base sm:text-lg leading-8 max-w-xl">
            একজন প্রাক্তন শিক্ষার্থী হিসেবে আপনার স্মৃতি, অভিজ্ঞতা এবং অর্জন
            আমাদের কমিউনিটির একটি গুরুত্বপূর্ণ অংশ। এই প্ল্যাটফর্মের মাধ্যমে
            আমরা প্রাক্তন শিক্ষার্থীদের মধ্যে যোগাযোগ, সহযোগিতা এবং বন্ধুত্বের
            বন্ধন আরও দৃঢ় করতে চাই।
          </p>

          <!-- Features -->
          <SectionTitle title="প্রাক্তন শিক্ষার্থী পরিষদে যা আছে " />

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div
              v-for="feature in features"
              :key="feature.id"
              class="group flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
              :class="
                feature.color === 'blue'
                  ? 'hover:border-blue-400/30'
                  : 'hover:border-cyan-400/30'
              "
              data-aos="fade-up"
              :data-aos-delay="feature.id * 100"
            >
              <div
                class="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center"
                :class="
                  feature.color === 'blue' ? 'bg-blue-500/10' : 'bg-cyan-500/10'
                "
              >
                <component
                  :is="feature.icon"
                  class="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                  :class="
                    feature.color === 'blue' ? 'text-blue-400' : 'text-cyan-400'
                  "
                />
              </div>

              <span class="text-gray-200 font-medium">
                {{ feature.title }}
              </span>
            </div>
          </div>
        </div>

        <!-- ========================= -->
        <!-- RIGHT : IMAGE COLLAGE      -->
        <!-- ========================= -->

        <div class="relative">
          <!-- Small Image 1 -->
          <div
            class="absolute top-0 right-0 w-[45%] h-44 sm:h-52 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          >
            <img
              src="/images/picnic_2022.jpg"
              alt="Alumni gathering"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          <!-- Small Image 2 -->
          <div
            class="absolute top-0 left-0 w-[45%] h-44 sm:h-52 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          >
            <img
              src="/images/about.jpg"
              alt="Alumni community"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          <!-- Main Image -->
          <div
            class="relative mt-36 sm:mt-40 w-full h-72 sm:h-80 lg:h-96 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          >
            <img
              src="/images/meraton_2026.jpg"
              alt="Alumni community"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />

            <!-- Overlay -->
            <div
              class="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent"
            ></div>
          </div>

          <!-- Floating Badge -->
          <div
            class="absolute bottom-6 left-6 px-5 py-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/10"
          >
            <p class="text-white font-semibold">Alumni Community</p>

            <p class="text-gray-400 text-sm">একসাথে আমাদের পথচলা</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Users, Handshake, GraduationCap, HeartHandshake, Trophy } from "@lucide/vue";

import SectionTitle from "@/components/common/SectionTitle.vue";

const features = [
  {
    id: 1,
    title: "প্রাক্তন শিক্ষার্থীদের সংযোগ",
    icon: Users,
    color: "blue",
  },
  {
    id: 2,
    title: "পারস্পরিক সহযোগিতা",
    icon: Handshake,
    color: "cyan",
  },
  {
    id: 3,
    title: "শিক্ষার্থীদের সহযোগিতা",
    icon: GraduationCap,
    color: "blue",
  },
  {
    id: 4,
    title: "সামাজিক উদ্যোগ",
    icon: HeartHandshake,
    color: "cyan",
  },
  {
    id: 5,
    title: "বৃত্তি ও আর্থিক সহায়তা",
    icon: Trophy,
    color: "blue",
  },
];
</script>
