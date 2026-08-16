<template>
  <section class="relative py-20 overflow-hidden" id="testimonial">
    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- testimonial header  -->
      <div class="text-center mb-6" data-aos="fade-up">
        <h2
          class="text-4xl md:text-5xl font-bold text-white mb-4"
          data-aos="fade-up"
        >
          প্রাক্তন
          <span
            class="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400"
          >
            শিক্ষার্থীদের
          </span>
          <span> মতামত</span>
        </h2>
        <p class="text-blue-200 text-lg">আমাদের সদস্যদের অভিজ্ঞতা</p>
      </div>

      <!-- Slide Navigation Buttons -->
      <div class="flex justify-end gap-3 mb-2">
        <button
          @click="prevSlide"
          class="w-10 h-10 rounded-full border border-blue-400/30 text-blue-300 hover:bg-blue-500/20 hover:text-white transition"
        >
          ←
        </button>

        <button
          @click="nextSlide"
          class="w-10 h-10 rounded-full border border-blue-400/30 text-blue-300 hover:bg-blue-500/20 hover:text-white transition"
        >
          →
        </button>
      </div>
      <!-- Slider  -->

      <div
        ref="slider"
        class="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
      >
        <div
          v-for="(testimonial, index) in testimonials"
          :key="testimonial.id"
          class="testimonial-card flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start bg-linear-to-br
           from-gray-800/50 to-blue-900/30 rounded-2xl p-6 border border-blue-500/20 backdrop-blur-sm hover:border-blue-400 
           transition-all duration-300"
          data-aos="fade-up"
        >
          <!-- Testimonial text  -->
          <div class="relative min-h-28">
            <!-- Opening Qoute  -->
            <span
              class="absolute -top-5 left-0 text-5xl text-blue-400/30 font-serif select-none"
            >
              “
            </span>
            <p class="text-blue-100 text-sm leading-relaxed mb-8 px-4">
              {{ testimonial.text }}
            </p>
            <!-- Closing Qoute  -->
            <span
              class="absolute -bottom-8 right-0 text-5xl text-blue-400/30 font-serif select-none"
            >
              ”
            </span>
          </div>
          <!-- Client Info  -->
          <div class="mt-auto flex items-center gap-4">
            <div
              class="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-400/50"
            >
              <img
                :src="testimonial.avatar"
                :alt="testimonial.name"
                class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div>
              <h4 class="text-lg font-semibold text-white mb-1">
                {{ testimonial.name }}
              </h4>
              <p class="text-blue-200 text-sm">
                {{ testimonial.position }}
              </p>
            </div>
          </div>
        </div>
        <div class="flex justify-end gap-3 mt-6"></div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { testimonials } from '@/constants/testimonial.js'

// Slider container
const slider = ref(null);

// =========================
// Next Slide
// =========================

const nextSlide = () => {
  if (!slider.value) return;

  const container = slider.value;

  const card = container.querySelector(".testimonial-card");

  if (!card) return;

  const gap = 24;

  const scrollAmount = card.offsetWidth + gap;

  // যদি শেষের দিকে চলে যায়
  if (
    container.scrollLeft + container.clientWidth >=
    container.scrollWidth - scrollAmount
  ) {
    container.scrollTo({
      left: 0,
      behavior: "smooth",
    });

    return;
  }

  // Next card
  container.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  });
};

// =========================
// Previous Slide
// =========================

const prevSlide = () => {
  if (!slider.value) return;

  const container = slider.value;

  const card = container.querySelector(".testimonial-card");

  if (!card) return;

  const gap = 24;

  const scrollAmount = card.offsetWidth + gap;

  container.scrollBy({
    left: -scrollAmount,
    behavior: "smooth",
  });
};

// =========================
// Auto Slide
// =========================

let autoSlide = null;

onMounted(() => {
  autoSlide = setInterval(() => {
    nextSlide();
  }, 5000);
});

// Component destroy হলে interval বন্ধ হবে
onBeforeUnmount(() => {
  if (autoSlide) {
    clearInterval(autoSlide);
  }
});
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
