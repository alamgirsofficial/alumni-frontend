<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { ArrowLeft, ImagePlus, Upload, X, Save } from "@lucide/vue";

import { useToast } from "@/composables/useToast";
import { createGallery } from "@/composables/galleryService";

const router = useRouter();
const { success, warning, error } = useToast();

/*
|--------------------------------------------------------------------------
| Form
|--------------------------------------------------------------------------
*/

const form = ref({
  title: "",
  category: "reunion",
  categoryName: "পুনর্মিলনী",
  date: "",
  image: "",
  featured: false,
  status: "published",
});

const imageFile = ref(null);
const imagePreview = ref("");

const saving = ref(false);

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
| Category Change
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
    warning("Image size must be less than 5MB.");

    return;
  }

  imageFile.value = file;

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
  imageFile.value = null;
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

  if (!imagePreview.value && !form.value.image) {
    warning("Please select a gallery image.");

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
      image: imagePreview.value || form.value.image,
    };

    await createGallery(payload);

    success("Gallery created successfully.");

    router.push("/dashboard/gallery");
  } catch (err) {
    console.error(err);

    error("Failed to create gallery.");
  } finally {
    saving.value = false;
  }
};
</script>

<template>
  <section class="mx-auto max-w-5xl space-y-6">
    <!-- =====================================================
             Header
        ====================================================== -->

    <div
      class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div class="flex items-center gap-3">
        <RouterLink
          to="/dashboard/gallery"
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/3 text-slate-400 transition hover:bg-white/6 hover:text-white"
        >
          <ArrowLeft :size="18" />
        </RouterLink>

        <div>
          <h1 class="text-2xl font-bold text-white">Add Gallery</h1>

          <p class="mt-1 text-sm text-slate-400">
            Add a new memory to your gallery.
          </p>
        </div>
      </div>
    </div>

    <!-- =====================================================
             Form
        ====================================================== -->

    <form @submit.prevent="submit" class="space-y-6">
      <!-- Basic Information -->

      <div class="rounded-2xl border border-white/10 bg-white/3 p-5 sm:p-6">
        <div class="mb-6 border-b border-white/10 pb-5">
          <h2 class="text-base font-semibold text-white">
            Gallery Information
          </h2>

          <p class="mt-1 text-sm text-slate-500">
            Provide the basic information about this gallery.
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
              placeholder="e.g. Alumni Reunion 2026"
              class="h-11 w-full rounded-xl border border-white/10 bg-slate-900 px-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500/50"
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

      <div class="rounded-2xl border border-white/10 bg-white/3 p-5 sm:p-6">
        <div class="mb-6 border-b border-white/10 pb-5">
          <h2 class="text-base font-semibold text-white">Gallery Image</h2>

          <p class="mt-1 text-sm text-slate-500">Upload an image up to 5MB.</p>
        </div>

        <div v-if="!imagePreview" class="relative">
          <input
            id="gallery-image"
            type="file"
            accept="image/*"
            class="absolute inset-0 z-10 cursor-pointer opacity-0"
            @change="handleImageUpload"
          />

          <div
            class="flex min-h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-slate-900/50 px-6 text-center transition hover:border-blue-500/30 hover:bg-blue-500/2"
          >
            <div
              class="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400"
            >
              <Upload :size="24" />
            </div>

            <h3 class="mt-4 text-sm font-semibold text-white">
              Upload Gallery Image
            </h3>

            <p class="mt-1 text-xs text-slate-500">JPG, JPEG, PNG or WEBP</p>

            <span
              class="mt-4 rounded-lg bg-white/5 px-3 py-2 text-xs text-slate-400"
            >
              Choose Image
            </span>
          </div>
        </div>

        <!-- Preview -->

        <div
          v-else
          class="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900"
        >
          <img
            :src="imagePreview"
            alt="Gallery preview"
            class="max-h-112 w-full object-contain"
          />

          <button
            type="button"
            @click="removeImage"
            class="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl bg-black/60 text-white backdrop-blur-md transition hover:bg-red-500"
          >
            <X :size="18" />
          </button>
        </div>
      </div>

      <!-- Featured -->

      <div class="rounded-2xl border border-white/10 bg-white/3 p-5 sm:p-6">
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
          to="{
            name: 'GalleryList'
          }"
          class="inline-flex h-11 items-center justify-center rounded-xl border border-white/10 px-5 text-sm font-medium text-slate-300 transition hover:bg-white/5"
        >
          Cancel
        </RouterLink>

        <button
          type="submit"
          :disabled="saving"
          class="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save :size="17" />

          {{ saving ? "Saving..." : "Create Gallery" }}
        </button>
      </div>
    </form>
  </section>
</template>
