<script setup>
import { computed, onMounted, ref } from "vue";

import { RouterLink, useRoute, useRouter } from "vue-router";

import { ArrowLeft, Upload, X, Save, ImagePlus } from "@lucide/vue";

import { useToast } from "@/composables/useToast";
const { success, warning, error } = useToast();
import { getGalleryById, updateGallery } from "@/composables/galleryService";

const route = useRoute();
const router = useRouter();

/*
|--------------------------------------------------------------------------
| State
|--------------------------------------------------------------------------
*/

const loading = ref(true);
const saving = ref(false);

const galleryId = computed(() => {
  return route.params.id;
});

const form = ref({
  id: null,
  title: "",
  category: "reunion",
  categoryName: "পুনর্মিলনী",
  date: "",
  image: "",
  featured: false,
  status: "published",
});

const imagePreview = ref("");

const categories = [
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
| Load Gallery
|--------------------------------------------------------------------------
*/

const loadGallery = async () => {
  loading.value = true;

  try {
    const gallery = await getGalleryById(galleryId.value);

    if (!gallery) {
      error("Gallery not found.");

      router.push("/dashboard/gallery");

      return;
    }

    form.value = {
      id: gallery.id,
      title: gallery.title || "",
      category: gallery.category || "reunion",
      categoryName: gallery.categoryName || "পুনর্মিলনী",
      date: gallery.date || "",
      image: gallery.image || "",
      featured: !!gallery.featured,
      status: gallery.status || "published",
    };

    imagePreview.value = gallery.image || "";
  } catch (err) {
    console.error(err);

    error("Failed to load gallery.");

    router.push("/dashboard/gallery");
  } finally {
    loading.value = false;
  }
};

/*
|--------------------------------------------------------------------------
| Category
|--------------------------------------------------------------------------
*/

const updateCategoryName = () => {
  const category = categories.find((item) => item.id === form.value.category);

  if (category) {
    form.value.categoryName = category.label;
  }
};

/*
|--------------------------------------------------------------------------
| Image Upload
|--------------------------------------------------------------------------
*/

const handleImageUpload = (event) => {
  const file = event.target.files?.[0];

  if (!file) {
    return;
  }

  if (!file.type.startsWith("image/")) {
    warning("Please select a valid image file.");

    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    warning(" Image size should not exceed 5MB.");

    return;
  }

  const reader = new FileReader();

  reader.onload = (e) => {
    imagePreview.value = e.target.result;
  };

  reader.readAsDataURL(file);
};

/*
|--------------------------------------------------------------------------
| Remove Image
|--------------------------------------------------------------------------
*/

const removeImage = () => {
  imagePreview.value = "";
  form.value.image = "";

  const input = document.getElementById("gallery-image");

  if (input) {
    input.value = "";
  }
};

/*
|--------------------------------------------------------------------------
| Validation
|--------------------------------------------------------------------------
*/

const validateForm = () => {
  if (!form.value.title.trim()) {
    warning("Gallery title is required.");

    return false;
  }

  if (!form.value.date) {
    warning("Gallery date is required.");

    return false;
  }

  if (!imagePreview.value) {
    warning("Please select a valid image file.");

    return false;
  }

  return true;
};

/*
|--------------------------------------------------------------------------
| Submit
|--------------------------------------------------------------------------
*/

const submit = async () => {
  if (!validateForm()) {
    return;
  }

  saving.value = true;

  try {
    const payload = {
      ...form.value,
      image: imagePreview.value,
    };

    await updateGallery(form.value.id, payload);

    success("Gallery updated successfully!");

    router.push({
      name: "GalleryList",
    });
  } catch (err) {
    console.error(err);

    error("Failed to update gallery.");
  } finally {
    saving.value = false;
  }
};

onMounted(() => {
  loadGallery();
});
</script>

<template>
  <section class="mx-auto max-w-5xl space-y-6">
    <!-- =====================================================
             Loading
        ====================================================== -->

    <div v-if="loading" class="flex min-h-[400px] items-center justify-center">
      <div
        class="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-blue-500"
      ></div>
    </div>

    <!-- =====================================================
             Content
        ====================================================== -->

    <template v-else>
      <!-- Header -->

      <div
        class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div class="flex items-center gap-3">
          <button
            type="button"
            @click="
              router.push({
                name: 'GalleryList',
              })
            "
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
          >
            <ArrowLeft :size="18" />
          </button>

          <div>
            <h1 class="text-2xl font-bold text-white">Edit Gallery</h1>

            <p class="mt-1 text-sm text-slate-400">
              Update gallery information and image.
            </p>
          </div>
        </div>
      </div>

      <!-- Form -->

      <form @submit.prevent="submit" class="space-y-6">
        <!-- Information -->

        <div
          class="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
        >
          <div class="mb-6 border-b border-white/10 pb-5">
            <h2 class="text-base font-semibold text-white">
              Gallery Information
            </h2>

            <p class="mt-1 text-sm text-slate-500">
              Update the basic gallery information.
            </p>
          </div>

          <div class="grid gap-5 md:grid-cols-2">
            <!-- Title -->

            <div class="md:col-span-2">
              <label class="mb-2 block text-sm font-medium text-slate-300">
                Gallery Title
                <span class="text-red-400"> * </span>
              </label>

              <input
                v-model="form.title"
                type="text"
                class="h-11 w-full rounded-xl border border-white/10 bg-slate-900 px-4 text-sm text-white outline-none focus:border-blue-500/50"
              />
            </div>

            <!-- Category -->

            <div>
              <label class="mb-2 block text-sm font-medium text-slate-300">
                Category
              </label>

              <select
                v-model="form.category"
                @change="updateCategoryName"
                class="h-11 w-full rounded-xl border border-white/10 bg-slate-900 px-4 text-sm text-slate-300 outline-none focus:border-blue-500/50"
              >
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.label }}
                </option>
              </select>
            </div>

            <!-- Category Name -->

            <div>
              <label class="mb-2 block text-sm font-medium text-slate-300">
                Category Name
              </label>

              <input
                v-model="form.categoryName"
                type="text"
                class="h-11 w-full rounded-xl border border-white/10 bg-slate-900 px-4 text-sm text-white outline-none focus:border-blue-500/50"
              />
            </div>

            <!-- Date -->

            <div>
              <label class="mb-2 block text-sm font-medium text-slate-300">
                Event Date
                <span class="text-red-400"> * </span>
              </label>

              <input
                v-model="form.date"
                type="text"
                placeholder="e.g. ২৫ ডিসেম্বর ২০২৬"
                class="h-11 w-full rounded-xl border border-white/10 bg-slate-900 px-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500/50"
              />
            </div>

            <!-- Status -->

            <div>
              <label class="mb-2 block text-sm font-medium text-slate-300">
                Status
              </label>

              <select
                v-model="form.status"
                class="h-11 w-full rounded-xl border border-white/10 bg-slate-900 px-4 text-sm text-slate-300 outline-none focus:border-blue-500/50"
              >
                <option value="published">Published</option>

                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Image -->

        <div
          class="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
        >
          <div class="mb-6 border-b border-white/10 pb-5">
            <h2 class="text-base font-semibold text-white">Gallery Image</h2>

            <p class="mt-1 text-sm text-slate-500">
              Replace the existing image if needed.
            </p>
          </div>

          <!-- Upload -->

          <div v-if="!imagePreview" class="relative">
            <input
              id="gallery-image"
              type="file"
              accept="image/*"
              class="absolute inset-0 z-10 cursor-pointer opacity-0"
              @change="handleImageUpload"
            />

            <div
              class="flex min-h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-slate-900/50"
            >
              <div
                class="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400"
              >
                <ImagePlus :size="24" />
              </div>

              <h3 class="mt-4 text-sm font-semibold text-white">
                Upload New Image
              </h3>

              <p class="mt-1 text-xs text-slate-500">JPG, JPEG, PNG or WEBP</p>
            </div>
          </div>

          <!-- Existing / New Preview -->

          <div
            v-else
            class="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900"
          >
            <img
              :src="imagePreview"
              alt="Gallery image"
              class="max-h-[450px] w-full object-contain"
            />

            <div
              class="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent p-4 pt-12"
            >
              <label
                for="gallery-image"
                class="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
              >
                <Upload :size="15" />

                Replace Image
              </label>

              <input
                id="gallery-image"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleImageUpload"
              />

              <button
                type="button"
                @click="removeImage"
                class="flex h-9 w-9 items-center justify-center rounded-xl bg-black/50 text-white backdrop-blur-md transition hover:bg-red-500"
              >
                <X :size="17" />
              </button>
            </div>
          </div>
        </div>

        <!-- Featured -->

        <div
          class="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
        >
          <label class="flex cursor-pointer items-center justify-between gap-4">
            <div>
              <p class="text-sm font-semibold text-white">Featured Gallery</p>

              <p class="mt-1 text-xs leading-5 text-slate-500">
                Show this gallery in the featured section.
              </p>
            </div>

            <div class="relative">
              <input
                v-model="form.featured"
                type="checkbox"
                class="peer sr-only"
              />

              <div
                class="h-6 w-11 rounded-full bg-slate-700 transition peer-checked:bg-blue-600"
              ></div>

              <div
                class="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5"
              ></div>
            </div>
          </label>
        </div>

        <!-- Actions -->

        <div class="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <RouterLink
            to="{ name: 'GalleryList' }"
            class="inline-flex h-11 items-center justify-center rounded-xl border border-white/10 px-5 text-sm font-medium text-slate-300 transition hover:bg-white/[0.05]"
          >
            Cancel
          </RouterLink>

          <button
            type="submit"
            :disabled="saving"
            class="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save :size="17" />

            {{ saving ? "Updating..." : "Update Gallery" }}
          </button>
        </div>
      </form>
    </template>
  </section>
</template>
