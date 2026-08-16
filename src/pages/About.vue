<template>
  <section class="relative py-5 overflow-x-hidden">
    <!-- ================================= -->
    <!-- Background Glow -->
    <!-- ================================= -->

    <div
      class="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"
    ></div>

    <div
      class="absolute top-1/3 -right-40 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none"
    ></div>

    <div class="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-8">
      <!-- ================================= -->
      <!-- Hero -->
      <!-- ================================= -->

      <div class="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
        <div class="inline-flex items-center gap-3 mb-5">
          <span class="w-10 h-px bg-cyan-400"></span>

          <span
            class="text-xs uppercase tracking-[0.25em] font-bold text-cyan-400"
          >
            {{ aboutIntro.eyebrow }}
          </span>

          <span class="w-10 h-px bg-cyan-400"></span>
        </div>

        <h1
          class="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight"
        >
          {{ aboutIntro.title }}

          <span
            class="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400"
          >
            {{ aboutIntro.highlight }}
          </span>
        </h1>

        <p class="mt-6 text-gray-400 text-base md:text-md leading-8">
          {{ aboutIntro.description }}
        </p>
      </div>

      <!-- ================================= -->
      <!-- Main Grid -->
      <!-- ================================= -->

      <div class="grid lg:grid-cols-12 gap-10 items-start">
        <!-- ================================= -->
        <!-- LEFT CONTENT -->
        <!-- ================================= -->

        <div
          class="lg:col-span-8 space-y-10 bg-white/8 p-6 rounded-2xl backdrop-blur-xl"
          data-aos="fade-right"
        >
          <!-- About -->

          <div>
            <SectionTitle title="আমাদের সম্পর্কে" />

            <div class="mt-5 text-gray-300/80 leading-8 space-y-4">
              <p>
                ২০১৩ সালে প্রতিষ্ঠিত উপকূলীয় আদর্শ উচ্চ বিদ্যালয় -এর প্রাক্তন
                শিক্ষার্থীদের এই প্ল্যাটফর্মটি তৈরি করা হয়েছে আমাদের মধ্যে
                সম্পর্ক অটুট রাখার জন্য। আমাদের লক্ষ্য হলো একটি অরাজনৈতিক
                পরিবেশে সকল ব্যাচের শিক্ষার্থীদের একত্রিত করা।
              </p>
              <p>
                আমরা প্রতি বছর বার্ষিক মিলনমেলা আয়োজন করি এবং মেধাবী কিন্তু
                অসচ্ছল শিক্ষার্থীদের জন্য বৃত্তি প্রদান করি। এ পর্যন্ত আমরা ৫০০+
                শিক্ষার্থীকে বৃত্তি দিয়েছি।
              </p>

              <p>
                আমাদের লক্ষ্য শুধু পুরোনো স্মৃতি ধরে রাখা নয়; বরং সেই সম্পর্ককে
                কাজে লাগিয়ে বর্তমান শিক্ষার্থী, শিক্ষা প্রতিষ্ঠান এবং সমাজের
                জন্য ইতিবাচক কিছু করা।
              </p>
              <SectionTitle title="আমাদের উদ্দেশ্য" />
              <ol>
                <li>
                  প্রাক্তন শিক্ষার্থীদের মধ্যে যোগাযোগ ও সম্প্রীতি বজায় রাখা
                </li>
                <li>বিদ্যালয়ের উন্নয়নমূলক কাজে অংশগ্রহণ করা</li>
                <li>মেধাবী কিন্তু অসচ্ছল শিক্ষার্থীদের সহায়তা করা</li>
                <li>বার্ষিক পুনর্মিলনী এবং সামাজিক অনুষ্ঠানের আয়োজন করা</li>
              </ol>
            </div>
          </div>

          <!-- ================================= -->
          <!-- Works -->
          <!-- ================================= -->

          <div>
            <SectionTitle title="প্রাক্তন শিক্ষার্থী পরিষদ যেসব কাজ করে থাকে" />

            <div class="grid sm:grid-cols-2 gap-4 mt-6">
              <div
                v-for="(about, index) in aboutWorks"
                :key="about.id"
                class="group p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/8 hover:border-cyan-400/30 transition-all duration-300"
                data-aos="fade-up"
                :data-aos-delay="index * 80"
              >
                <div class="flex items-start gap-4">
                  <div
                    class="w-11 h-11 shrink-0 flex items-center justify-center rounded-xl bg-blue-500/10 border border-blue-400/20 group-hover:scale-110 transition-transform"
                  >
                    <component
                      :is="about.icon"
                      class="w-5 h-5"
                      :class="about.iconColor"
                    />
                  </div>

                  <div>
                    <h3 class="font-bold text-white">
                      {{ about.title }}
                    </h3>

                    <p class="mt-2 text-sm text-gray-400 leading-6">
                      {{ about.desc }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ================================= -->
          <!-- Mission Vision -->
          <!-- ================================= -->

          <div class="grid md:grid-cols gap-5">
            <SectionTitle 
            title="আমাদের মিশন ও   ভিশন"/>

            <div
              v-for="item in missionVision"
              :key="item.id"
              class="group p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-400/30 hover:bg-white/8 transition-all duration-300"
              data-aos="fade-up"
            >
              <div class="flex items-start gap-5">
                <!-- icon -->
                <div
                  class="w-12 h-12 shrink-0 flex items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-400/20 group-hover:scale-110 transition-transform duration-300"
                >
                  <component
                    :is="item.icon"
                    class="w-7 h-7"
                    :class="item.iconColor"
                  />
                </div>
                <!-- Content  -->

                <div class="flext-1">
                  <h3
                    class="text-xl md:text-2xl font-black text-white leading-snug"
                  >
                    {{ item.title }}
                  </h3>

                  <p class="mt-3 text-sm md:text-base text-gray-400 leading-7">
                    {{ item.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          
        </div>

        <!-- ================================= -->
        <!-- RIGHT SIDEBAR -->
        <!-- ================================= -->

        <aside
          class="lg:col-span-4 lg:sticky lg:top-24 space-y-5"
          data-aos="fade-left"
        >
          <!-- President / Secretary -->

          <div
            v-for="member in executiveMembers"
            :key="member.id"
            class="group p-4 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400/30 transition-all duration-300"
          >
            <!-- Profile Image -->

            <div class="flex justify-center">
              <div class="relative w-32 h-32">
                <img
                  :src="member.image"
                  :alt="member.name"
                  class="w-full h-full object-cover rounded-full border-4 border-blue-500/20 shadow-xl group-hover:scale-105 transition-transform"
                />

                <div
                  class="absolute -bottom-1 right-1 w-8 h-8 flex items-center justify-center rounded-full bg-linear-to-r from-blue-500 to-cyan-500 border-4 border-gray-950"
                >
                  <Users class="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            </div>

            <!-- Info -->

            <div class="text-center mt-5">
              <h3 class="text-lg font-black text-white">
                {{ member.name }}
              </h3>

              <p class="mt-1 text-sm text-cyan-400 font-semibold">
                {{ member.designation }}
              </p>
            </div>

            <!-- Phone -->

            <div
              class="flex items-center justify-center gap-2 mt-4 text-sm text-gray-400"
            >
              <Phone class="w-4 h-4 text-blue-400" />

              {{ member.phone }}
            </div>

            <!-- Social -->

            <div class="flex justify-center mt-5">
              <SocialLinks :social-links="member.social" size="sm" />
            </div>
          </div>

          <!-- ================================= -->
          <!-- Technical Team -->
          <!-- ================================= -->

          <div
            class="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10"
          >
            <div class="flex items-center gap-3 mb-5">
              <div
                class="w-10 h-10 flex items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-400/20"
              >
                <CodeXml class="w-5 h-5 text-cyan-400" />
              </div>

              <div>
                <h3 class="font-black text-white">Technical Support</h3>

                <p class="text-xs text-gray-500 mt-1">
                  Website & technical team
                </p>
              </div>
            </div>

            <!-- Team -->

            <div class="space-y-3">
              <div
                v-for="person in technicalTeam"
                :key="person.id"
                class="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5 hover:border-cyan-400/20 transition"
              >
                <div
                  class="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg bg-blue-500/10"
                >
                  <component
                    :is="person.icon"
                    class="w-4 h-4"
                    :class="person.iconColor"
                  />
                </div>

                <div>
                  <h4 class="text-sm font-bold text-white">
                    {{ person.name }}
                  </h4>

                  <p class="text-xs text-gray-500 mt-0.5">
                    {{ person.designation }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <!-- ================================================= -->
      <!-- HORIZONTAL TIMELINE -->
      <!-- ================================================= -->

      <div
        class="relative py-6 md:py-8 my-8 overflow-hidden shadow-2xl rounded-xl"
        data-aos="fade-up"
      >
        <!-- Timeline Heading -->

        <sectionTitle class="text-center mb-8" title="আমাদের যাত্রা" />

        <!-- ========================= -->
        <!-- DESKTOP TIMELINE -->
        <!-- ========================= -->

        <div
          class="hidden md:block overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-cyan-500/40 scrollbar-track-transparent"
        >
          <div class="relative min-w-max">
            <!-- Timeline Line -->
            <div
              class="absolute top-11 left-10 right-10 h-0.5 bg-linear-to-r from-blue-500/20 via-cyan-400 to-blue-500/20"
            ></div>

            <!-- Timeline Items -->

            <div class="relative flex justify-between gap-6 px-4">
              <div
                v-for="(item, index) in timeline"
                :key="item.id"
                class="relative w-42.5 shrink-0"
                data-aos="fade-up"
                :data-aos-delay="index * 100"
              >
                <!-- YEAR CIRCLE -->

                <div class="relative z-10 flex justify-center">
                  <div
                    class="w-22 h-22 rounded-full flex items-center justify-center bg-gray-950 border-2 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.25)] hover:scale-110 hover:shadow-[0_0_40px_rgba(34,211,238,0.45)] transition-all duration-300"
                  >
                    <span class="text-lg font-black text-white">
                      {{ item.year }}
                    </span>
                  </div>
                </div>

                <!-- CARD -->

                <div
                  class="mt-8 p-5 min-h-57.5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 group"
                >
                  <!-- Icon -->

                  <div
                    class="w-11 h-11 flex items-center justify-center rounded-xl bg-blue-500/10 border border-blue-400/20 mb-4 group-hover:scale-110 transition"
                  >
                    <component
                      :is="item.icon"
                      class="w-5 h-5"
                      :class="item.iconColor"
                    />
                  </div>

                  <!-- Title -->

                  <h4 class="text-base font-bold text-white">
                    {{ item.title }}
                  </h4>

                  <!-- Description -->

                  <p class="mt-3 text-sm text-gray-400 leading-6">
                    {{ item.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ========================= -->
        <!-- MOBILE TIMELINE -->
        <!-- ========================= -->

        <div class="md:hidden relative pl-8">
          <!-- Vertical Line -->

          <div
            class="absolute left-2.25 top-0 bottom-0 w-0.5 bg-linear-to-b from-blue-500 via-cyan-400 to-blue-500/20"
          ></div>

          <div
            v-for="(item, index) in timeline"
            :key="item.id"
            class="relative mb-10 last:mb-0"
            data-aos="fade-left"
            :data-aos-delay="index * 100"
          >
            <!-- Dot -->

            <div
              class="absolute -left-7.75 top-1 w-5 h-5 rounded-full bg-gray-900 border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
            ></div>

            <!-- Card -->

            <div
              class="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
            >
              <div class="flex items-center gap-3 mb-4">
                <span class="text-cyan-400 font-black text-lg">
                  {{ item.year }}
                </span>

                <div class="h-px flex-1 bg-white/10"></div>
              </div>

              <div class="flex gap-4">
                <div
                  class="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-blue-500/10 border border-blue-400/20"
                >
                  <component
                    :is="item.icon"
                    class="w-5 h-5"
                    :class="item.iconColor"
                  />
                </div>

                <div>
                  <h4 class="font-bold text-white">
                    {{ item.title }}
                  </h4>

                  <p class="mt-2 text-sm text-gray-400 leading-6">
                    {{ item.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Users, Phone, CodeXml } from "@lucide/vue";
import SectionTitle from "@/components/common/SectionTitle.vue";
import SocialLinks from "@/components/common/SocialLinks.vue";
import { executiveMembers } from "@/constants/executiveMembers.js";

import {
  aboutIntro,
  aboutWorks,
  timeline,
  missionVision,
  technicalTeam,
} from "@/constants/about.js";
</script>
