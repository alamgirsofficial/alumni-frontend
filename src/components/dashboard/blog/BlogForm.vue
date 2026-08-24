<script setup>
import { computed, ref, watch } from "vue";
import { Image, Plus, Save, X, Upload, Trash2 } from "@lucide/vue";

const props = defineProps({
  blog: {
    type: Object,
    default: null,
  },

  mode: {
    type: String,
    default: "create",
  },
});

const emit = defineEmits(["submit", "cancel"]);

const defaultCategories = [
  "ক্যারিয়ার",
  "স্মৃতিচারণ",
  "সামাজিক দায়বদ্ধতা",
  "বৃত্তি কর্মসূচি",
  "সাক্ষাৎকার",
  "শিক্ষা",
  "প্রাক্তন শিক্ষার্থী",
];

const form = ref({
  title: "",
  desc: "",
  content: "",
  author: "",
  publish_date: "",
  categories: [],
  image: "",
  status: "published",
});

const errors = ref({});

const imagePreview = ref("");

const isEdit = computed(() => props.mode === "edit");

const pageTitle = computed(() => (isEdit.value ? "Edit Blog" : "Create Blog"));

const submitText = computed(() =>
  isEdit.value ? "Update Blog" : "Publish Blog",
);

// ==========================================
// Date helpers
// ==========================================

const normalizeDate = (date) => {
  if (!date) return "";

  // Already YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date;
  }

  return "";
};

// ==========================================
// Load blog into form
// ==========================================

const loadBlog = () => {
  if (!props.blog) {
    form.value = {
      title: "",
      desc: "",
      content: "",
      author: "",
      publish_date: new Date().toISOString().split("T")[0],
      categories: [],
      image: "",
      status: "published",
    };

    imagePreview.value = "";

    return;
  }

  form.value = {
    title: props.blog.title || "",
    desc: props.blog.desc || "",
    content: props.blog.content || "",
    author: props.blog.author || "",
    publish_date: normalizeDate(props.blog.publish_date),
    categories: (props.blog.categories || []).map((category) =>
      typeof category === "string" ? category : category.name,
    ),
    image: props.blog.image || "",
    status: props.blog.status || "published",
  };

  imagePreview.value = props.blog.image || "";
};

watch(
  () => props.blog,
  () => {
    loadBlog();
  },
  {
    immediate: true,
    deep: true,
  },
);

// ==========================================
// Category
// ==========================================

const isCategorySelected = (category) => {
  return form.value.categories.includes(category);
};

const toggleCategory = (category) => {
  if (isCategorySelected(category)) {
    form.value.categories = form.value.categories.filter(
      (item) => item !== category,
    );
  } else {
    form.value.categories.push(category);
  }
};

const removeCategory = (category) => {
  form.value.categories = form.value.categories.filter(
    (item) => item !== category,
  );
};

// ==========================================
// Image upload
// ==========================================

const handleImageUpload = (event) => {
  const file = event.target.files?.[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    errors.value.image = "Please select a valid image file.";

    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    errors.value.image = "Image size must be less than 2MB.";

    return;
  }

  errors.value.image = "";

  const reader = new FileReader();

  reader.onload = (e) => {
    form.value.image = e.target.result;
    imagePreview.value = e.target.result;
  };

  reader.readAsDataURL(file);
};

const removeImage = () => {
  form.value.image = "";
  imagePreview.value = "";
};

// ==========================================
// Validation
// ==========================================

const validate = () => {
  errors.value = {};

  if (!form.value.title.trim()) {
    errors.value.title = "Blog title is required.";
  }

  if (!form.value.desc.trim()) {
    errors.value.desc = "Short description is required.";
  }

  if (!form.value.content.trim()) {
    errors.value.content = "Blog content is required.";
  }

  if (!form.value.author.trim()) {
    errors.value.author = "Author name is required.";
  }

  if (!form.value.publish_date) {
    errors.value.publish_date = "Publish date is required.";
  }

  if (!form.value.categories.length) {
    errors.value.categories = "Select at least one category.";
  }

  return Object.keys(errors.value).length === 0;
};

// ==========================================
// Submit
// ==========================================

const submitForm = () => {
  if (!validate()) {
    return;
  }

  emit("submit", {
    ...form.value,

    categories: form.value.categories.map((name) => ({
      name,
    })),
  });
};

const cancel = () => {
  emit("cancel");
};
</script>

<template>
  <form class="space-y-6" @submit.prevent="submitForm">
    <!-- ==========================================
         Basic Information
    =========================================== -->
    <section class="rounded-2xl border border-white/10 bg-white/3 p-5 sm:p-6">
      <div class="mb-6">
        <h2 class="text-base font-semibold text-white">
          {{ pageTitle }}
        </h2>

        <p class="mt-1 text-sm text-slate-500">
          Add the basic information of your blog.
        </p>
      </div>

      <div class="space-y-5">
        <!-- Title -->
        <div>
          <label
            for="blog-title"
            class="mb-2 block text-sm font-medium text-slate-300"
          >
            Blog Title
            <span class="text-red-400">*</span>
          </label>

          <input
            id="blog-title"
            v-model="form.title"
            type="text"
            placeholder="Enter blog title"
            class="h-12 w-full rounded-xl border bg-slate-900/70 px-4 text-sm text-white outline-none transition placeholder:text-slate-600"
            :class="
              errors.title
                ? 'border-red-500/50 focus:ring-2 focus:ring-red-500/10'
                : 'border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10'
            "
          />

          <p v-if="errors.title" class="mt-1.5 text-xs text-red-400">
            {{ errors.title }}
          </p>
        </div>

        <!-- Description -->
        <div>
          <label
            for="blog-description"
            class="mb-2 block text-sm font-medium text-slate-300"
          >
            Short Description
            <span class="text-red-400">*</span>
          </label>

          <textarea
            id="blog-description"
            v-model="form.desc"
            rows="3"
            placeholder="Write a short description..."
            class="w-full resize-none rounded-xl border bg-slate-900/70 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600"
            :class="
              errors.desc
                ? 'border-red-500/50'
                : 'border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10'
            "
          />

          <p v-if="errors.desc" class="mt-1.5 text-xs text-red-400">
            {{ errors.desc }}
          </p>
        </div>

        <!-- Content -->
        <div>
          <label
            for="blog-content"
            class="mb-2 block text-sm font-medium text-slate-300"
          >
            Blog Content
            <span class="text-red-400">*</span>
          </label>

          <textarea
            id="blog-content"
            v-model="form.content"
            rows="16"
            placeholder="Write your blog content here..."
            class="w-full resize-y rounded-xl border bg-slate-900/70 px-4 py-3 text-sm leading-7 text-white outline-none transition placeholder:text-slate-600"
            :class="
              errors.content
                ? 'border-red-500/50'
                : 'border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10'
            "
          />

          <p v-if="errors.content" class="mt-1.5 text-xs text-red-400">
            {{ errors.content }}
          </p>
        </div>
      </div>
    </section>

    <!-- ==========================================
         Publication Information
    =========================================== -->
    <section class="rounded-2xl border border-white/10 bg-white/3 p-5 sm:p-6">
      <div class="mb-6">
        <h2 class="text-base font-semibold text-white">
          Publication Information
        </h2>

        <p class="mt-1 text-sm text-slate-500">
          Configure author, date and publication status.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
        <!-- Author -->
        <div>
          <label
            for="blog-author"
            class="mb-2 block text-sm font-medium text-slate-300"
          >
            Author
            <span class="text-red-400">*</span>
          </label>

          <input
            id="blog-author"
            v-model="form.author"
            type="text"
            placeholder="Enter author name"
            class="h-12 w-full rounded-xl border bg-slate-900/70 px-4 text-sm text-white outline-none transition placeholder:text-slate-600"
            :class="
              errors.author
                ? 'border-red-500/50'
                : 'border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10'
            "
          />

          <p v-if="errors.author" class="mt-1.5 text-xs text-red-400">
            {{ errors.author }}
          </p>
        </div>

        <!-- Date -->
        <div>
          <label
            for="blog-date"
            class="mb-2 block text-sm font-medium text-slate-300"
          >
            Publish Date
            <span class="text-red-400">*</span>
          </label>

          <input
            id="blog-date"
            v-model="form.publish_date"
            type="date"
            class="h-12 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 text-sm text-white outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
          />

          <p v-if="errors.publish_date" class="mt-1.5 text-xs text-red-400">
            {{ errors.publish_date }}
          </p>
        </div>

        <!-- Status -->
        <div class="md:col-span-2">
          <label class="mb-2 block text-sm font-medium text-slate-300">
            Status
          </label>

          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              class="rounded-xl border p-4 text-left transition"
              :class="
                form.status === 'published'
                  ? 'border-emerald-400/30 bg-emerald-400/10'
                  : 'border-white/10 bg-white/3 hover:bg-white/5'
              "
              @click="form.status = 'published'"
            >
              <div class="flex items-center gap-3">
                <div
                  class="h-3 w-3 rounded-full"
                  :class="
                    form.status === 'published'
                      ? 'bg-emerald-400'
                      : 'bg-slate-600'
                  "
                />

                <div>
                  <p class="text-sm font-medium text-white">Published</p>

                  <p class="mt-0.5 text-xs text-slate-500">
                    Blog will be visible publicly.
                  </p>
                </div>
              </div>
            </button>

            <button
              type="button"
              class="rounded-xl border p-4 text-left transition"
              :class="
                form.status === 'draft'
                  ? 'border-amber-400/30 bg-amber-400/10'
                  : 'border-white/10 bg-white/2 hover:bg-white/5'
              "
              @click="form.status = 'draft'"
            >
              <div class="flex items-center gap-3">
                <div
                  class="h-3 w-3 rounded-full"
                  :class="
                    form.status === 'draft' ? 'bg-amber-400' : 'bg-slate-600'
                  "
                />

                <div>
                  <p class="text-sm font-medium text-white">Draft</p>

                  <p class="mt-0.5 text-xs text-slate-500">
                    Blog will remain unpublished.
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ==========================================
         Categories
    =========================================== -->
    <section class="rounded-2xl border border-white/10 bg-white/3 p-5 sm:p-6">
      <div class="mb-5">
        <h2 class="text-base font-semibold text-white">Categories</h2>

        <p class="mt-1 text-sm text-slate-500">
          Select one or more categories.
        </p>
      </div>

      <div class="flex flex-wrap gap-2">
        <button
          v-for="category in defaultCategories"
          :key="category"
          type="button"
          class="rounded-xl border px-4 py-2.5 text-sm transition"
          :class="
            isCategorySelected(category)
              ? 'border-blue-500/30 bg-blue-600 text-white'
              : 'border-white/10 bg-white/2 text-slate-400 hover:bg-white/5 hover:text-white'
          "
          @click="toggleCategory(category)"
        >
          {{ category }}
        </button>
      </div>

      <p v-if="errors.categories" class="mt-3 text-xs text-red-400">
        {{ errors.categories }}
      </p>

      <div v-if="form.categories.length" class="mt-4 flex flex-wrap gap-2">
        <span
          v-for="category in form.categories"
          :key="category"
          class="inline-flex items-center gap-1.5 rounded-lg border border-blue-400/20 bg-blue-400/10 px-2.5 py-1.5 text-xs text-blue-300"
        >
          {{ category }}

          <button
            type="button"
            class="text-blue-400 transition hover:text-white"
            @click="removeCategory(category)"
          >
            <X :size="13" />
          </button>
        </span>
      </div>
    </section>

    <!-- ==========================================
         Featured Image
    =========================================== -->
    <section class="rounded-2xl border border-white/10 bg-white/3 p-5 sm:p-6">
      <div class="mb-5">
        <h2 class="text-base font-semibold text-white">Featured Image</h2>

        <p class="mt-1 text-sm text-slate-500">
          Upload a JPG, JPEG, PNG or WEBP image.
        </p>
      </div>

      <div
        v-if="imagePreview"
        class="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900"
      >
        <img
          :src="imagePreview"
          alt="Blog preview"
          class="max-h-100 w-full object-cover"
        />

        <button
          type="button"
          class="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-slate-950/80 text-red-400 backdrop-blur transition hover:bg-red-500 hover:text-white"
          @click="removeImage"
        >
          <Trash2 :size="16" />
        </button>
      </div>

      <label
        v-else
        class="flex min-h-55 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/2 transition hover:border-blue-500/30 hover:bg-blue-500/3"
      >
        <div
          class="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-400/10 text-blue-400"
        >
          <Upload :size="24" />
        </div>

        <p class="mt-4 text-sm font-medium text-white">Click to upload image</p>

        <p class="mt-1 text-xs text-slate-500">Maximum file size 2MB</p>

        <input
          type="file"
          accept="image/*"
          class="hidden"
          @change="handleImageUpload"
        />
      </label>

      <p v-if="errors.image" class="mt-2 text-xs text-red-400">
        {{ errors.image }}
      </p>
    </section>

    <!-- ==========================================
         Actions
    =========================================== -->
    <div class="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
      <button
        type="button"
        class="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/3 px-5 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
        @click="cancel"
      >
        <X :size="17" />

        Cancel
      </button>

      <button
        type="submit"
        class="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-600/10 transition hover:bg-blue-500"
      >
        <Save :size="17" />

        {{ submitText }}
      </button>
    </div>
  </form>
</template>
