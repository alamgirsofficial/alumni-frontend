<script setup>
import { computed } from "vue";
import { ArrowRight, Images, Maximize2 } from "@lucide/vue";

import { galleries } from "@/constants/gallery";

const emit = defineEmits(["open"]);

/*
|--------------------------------------------------------------------------
| Gallery Preview
|--------------------------------------------------------------------------
| Featured image থাকলে সেগুলো আগে দেখাবে।
| Featured কম হলে normal gallery থেকে বাকি image নেবে।
*/

const galleryPreview = computed(() => {
  const featured = galleries.filter((gallery) => gallery.featured);

  const remaining = galleries.filter((gallery) => !gallery.featured);

  return [...featured, ...remaining].slice(0, 5);
});

/*
|--------------------------------------------------------------------------
| Open Image
|--------------------------------------------------------------------------
*/

const openImage = (gallery) => {
  emit("open", gallery);
};
</script>

<template>
  <section class="relative py-20 sm:py-24 overflow-hidden">
    <!-- =====================================================
             Container
        ====================================================== -->

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- =================================================
                 Section Header
            ================================================== -->

   <div
  class="text-center mb-10"
  data-aos="fade-up"
>
  <div
    class="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-4"
  >
    <Images class="w-4 h-4 text-cyan-400" />

    <span class="text-xs sm:text-sm font-medium text-slate-300">
      আমাদের স্মৃতির সংগ্রহ
    </span>
  </div>

  <h2
    class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight"
  >
    কিছু
    <span
      class="bg-linear-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
    >
      সুন্দর স্মৃতি
    </span>
  </h2>

  <p
    class="max-w-2xl mx-auto mt-4 text-sm sm:text-base leading-7 text-slate-400"
  >
    একসাথে পথচলার কিছু সুন্দর মুহূর্ত, পুনর্মিলনী, সম্মেলন ও বিভিন্ন
    আয়োজনের স্মৃতিগুলো এক নজরে দেখে নিন।
  </p>

 
</div>

      <!-- =================================================
                 Gallery Grid
            ================================================== -->

      <div
        v-if="galleryPreview.length"
        class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5"
      >
        <article
          v-for="(gallery, index) in galleryPreview"
          :key="gallery.id"
          @click="openImage(gallery)"
          class="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 cursor-pointer"
          :class="index === 0 ? 'col-span-2 row-span-2' : ''"
          data-aos="fade-up"
          :data-aos-delay="index * 70"
        >
          <!-- Image Wrapper -->
          <div
            class="relative overflow-hidden"
            :class="index === 0 ? 'aspect-square' : 'aspect-4/3'"
          >
            <!-- Image -->
            <img
              :src="gallery.image"
              :alt="gallery.title"
              loading="lazy"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <!-- Gradient -->
            <div
              class="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/10 to-transparent"
            ></div>

            <!-- Hover Overlay -->
            <div
              class="absolute inset-0 bg-blue-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>

            <!-- View Icon -->
            <!-- <div
              class="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
            >
              <Maximize2 class="w-4 h-4 text-white" />
            </div> -->

            <!-- Content -->
            <div class="absolute left-0 right-0 bottom-0 p-3 sm:p-5">
              <!-- Category -->
              <p class="text-[10px] sm:text-xs text-cyan-300 mb-1">
                {{ gallery.categoryName }}
              </p>

              <!-- Title -->
              <h3 class="text-sm sm:text-base font-semibold text-white clamp-1">
                {{ gallery.title }}
              </h3>

              <!-- Date -->
              <p class="hidden sm:block text-xs text-slate-400 mt-1">
                {{ gallery.date }}
              </p>
            </div>
          </div>
        </article>

      </div>
      <!-- View All Button -->
            <div class="mt-12 flex justify-center mb-2">

                <RouterLink
                    to="/gallery"
                    class="group inline-flex items-center gap-2
                    bg-linear-to-r from-blue-600 to-cyan-500
                    hover:from-blue-500 hover:to-cyan-400
                    text-gray-900 font-semibold px-7 py-3.5
                    rounded-full shadow-blue-500/30 shadow-xl
                    hover:shadow-2xl hover:scale-105
                    transition-all duration-300 ease-out"
                >
                    সব ছবি দেখুন

                    <ArrowRight
                        class="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    />
                </RouterLink>
                         
            </div>
      

      <!-- =================================================
                 Mobile View All Button
            ================================================== -->

      <div class="flex justify-center mt-8 sm:hidden">
        <router-link
          to="/gallery"
          class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white hover:border-cyan-400/30 transition-all duration-300"
          data-aos="fade-up"
        >
          সব ছবি দেখুন

          <ArrowRight class="w-4 h-4" />
        </router-link>
      </div>

      <!-- =================================================
                 Empty State
            ================================================== -->

      <div v-if="!galleryPreview.length" class="py-16 text-center">
        <div
          class="w-16 h-16 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center"
        >
          <Images class="w-7 h-7 text-slate-500" />
        </div>

        <h3 class="mt-5 text-lg font-semibold text-white">
          কোনো ছবি পাওয়া যায়নি
        </h3>

        <p class="mt-2 text-sm text-slate-500">
          শীঘ্রই আমাদের গ্যালারিতে নতুন ছবি যোগ করা হবে।
        </p>
      </div>

      
    </div>
  </section>
</template>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
