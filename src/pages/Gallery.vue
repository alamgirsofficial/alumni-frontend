<script setup>
import {
    computed,
    onBeforeUnmount,
    onMounted,
    ref,
} from "vue";

import GalleryHero from "@/components/gallery/GalleryHero.vue";
import GalleryFilter from "@/components/gallery/GalleryFilter.vue";
import FeaturedGallery from "@/components/gallery/FeaturedGallery.vue";
import GalleryGrid from "@/components/gallery/GalleryGrid.vue";
import GalleryLightbox from "@/components/gallery/GalleryLightbox.vue";

import { galleries } from "@/constants/gallery";

/*
|--------------------------------------------------------------------------
| Categories
|--------------------------------------------------------------------------
*/

const categories = [
    {
        id: "all",
        label: "সব",
    },
    {
        id: "reunion",
        label: "পুনর্মিলনী",
    },
    {
        id: "picnic",
        label: "বার্ষিক পিকনিক",
    },
    {
        id: "seminar",
        label: "সেমিনার",
    },
    {
        id: "sports",
        label: "ক্রীড়া",
    },
    {
        id: "other",
        label: "অন্যান্য",
    },
];

/*
|--------------------------------------------------------------------------
| State
|--------------------------------------------------------------------------
*/

const activeCategory = ref("all");

const lightboxOpen = ref(false);

const selectedImage = ref(null);

/*
|--------------------------------------------------------------------------
| Filtered Galleries
|--------------------------------------------------------------------------
*/

const filteredGalleries = computed(() => {
    if (activeCategory.value === "all") {
        return galleries;
    }

    return galleries.filter(
        (gallery) =>
            gallery.category === activeCategory.value
    );
});

/*
|--------------------------------------------------------------------------
| Featured Galleries
|--------------------------------------------------------------------------
*/

const featuredGalleries = computed(() => {
    return galleries
        .filter((gallery) => gallery.featured)
        .slice(0, 2);
});

/*
|--------------------------------------------------------------------------
| Change Category
|--------------------------------------------------------------------------
*/

const changeCategory = (category) => {
    activeCategory.value = category;
};

/*
|--------------------------------------------------------------------------
| Open Lightbox
|--------------------------------------------------------------------------
*/

const openLightbox = (gallery) => {
    selectedImage.value = gallery;
    lightboxOpen.value = true;

    document.body.style.overflow = "hidden";
};

/*
|--------------------------------------------------------------------------
| Close Lightbox
|--------------------------------------------------------------------------
*/

const closeLightbox = () => {
    lightboxOpen.value = false;
    selectedImage.value = null;

    document.body.style.overflow = "";
};

/*
|--------------------------------------------------------------------------
| Next Image
|--------------------------------------------------------------------------
*/

const nextImage = () => {
    if (!selectedImage.value) {
        return;
    }

    const currentIndex =
        filteredGalleries.value.findIndex(
            (image) =>
                image.id === selectedImage.value.id
        );

    if (currentIndex === -1) {
        return;
    }

    const nextIndex =
        currentIndex ===
        filteredGalleries.value.length - 1
            ? 0
            : currentIndex + 1;

    selectedImage.value =
        filteredGalleries.value[nextIndex];
};

/*
|--------------------------------------------------------------------------
| Previous Image
|--------------------------------------------------------------------------
*/

const previousImage = () => {
    if (!selectedImage.value) {
        return;
    }

    const currentIndex =
        filteredGalleries.value.findIndex(
            (image) =>
                image.id === selectedImage.value.id
        );

    if (currentIndex === -1) {
        return;
    }

    const previousIndex =
        currentIndex === 0
            ? filteredGalleries.value.length - 1
            : currentIndex - 1;

    selectedImage.value =
        filteredGalleries.value[previousIndex];
};

/*
|--------------------------------------------------------------------------
| Keyboard Navigation
|--------------------------------------------------------------------------
*/

const handleKeydown = (event) => {
    if (!lightboxOpen.value) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        nextImage();
    }

    if (event.key === "ArrowLeft") {
        previousImage();
    }
};

onMounted(() => {
    window.addEventListener(
        "keydown",
        handleKeydown
    );
});

onBeforeUnmount(() => {
    window.removeEventListener(
        "keydown",
        handleKeydown
    );

    document.body.style.overflow = "";
});
</script>

<template>
    <main
        class="min-h-screen bg-slate-950 text-white overflow-hidden"
    >
        <!-- =====================================================
             Hero
        ====================================================== -->

        <GalleryHero />

        <!-- =====================================================
             Filter
        ====================================================== -->

        <GalleryFilter
            :categories="categories"
            :active-category="activeCategory"
            @change="changeCategory"
        />

        <!-- =====================================================
             Featured
        ====================================================== -->

        <FeaturedGallery
            v-if="activeCategory === 'all'"
            :galleries="featuredGalleries"
            @select="openLightbox"
        />

        <!-- =====================================================
             Gallery Grid
        ====================================================== -->

        <GalleryGrid
            :galleries="filteredGalleries"
            :initial-count="8"
            :load-step="4"
            @select="openLightbox"
        />

        <!-- =====================================================
             Bottom CTA
        ====================================================== -->

        <section class="relative py-20 sm:py-28">
            <div
                class="absolute inset-x-0 top-1/2 -translate-y-1/2 h-64 bg-blue-500/10 blur-3xl"
            ></div>

            <div
                class="relative max-w-4xl mx-auto px-4 text-center"
                data-aos="fade-up"
            >
                <div
                    class="p-8 sm:p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10"
                >
                    <h2
                        class="text-2xl sm:text-3xl font-bold"
                    >
                        স্মৃতিগুলোকে ধরে রাখি
                    </h2>

                    <p
                        class="max-w-xl mx-auto mt-4 text-sm sm:text-base leading-7 text-slate-400"
                    >
                        আমাদের প্রতিটি আয়োজনের ছবি এবং
                        স্মৃতিগুলো এই গ্যালারিতে সংরক্ষিত
                        থাকবে। একসাথে পথচলার গল্পগুলো
                        প্রজন্ম থেকে প্রজন্মে ছড়িয়ে পড়ুক।
                    </p>
                </div>
            </div>
        </section>

        <!-- =====================================================
             Lightbox
        ====================================================== -->

        <GalleryLightbox
            :open="lightboxOpen"
            :gallery="selectedImage"
            @close="closeLightbox"
            @next="nextImage"
            @previous="previousImage"
        />
    </main>
</template>