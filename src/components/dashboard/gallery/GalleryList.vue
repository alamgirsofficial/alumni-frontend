<script setup>
import { computed, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import {
  Plus,
  Search,
  SlidersHorizontal,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Star,
  X,
} from "@lucide/vue";

import { getGalleries, deleteGallery } from "@/composables/galleryService";

import { useToast } from "@/composables/useToast";

const { success, warning, error } = useToast();

/*
|--------------------------------------------------------------------------
| State
|--------------------------------------------------------------------------
*/

const galleries = ref([]);

const search = ref("");
const selectedCategory = ref("all");
const selectedStatus = ref("all");
const selectedFeatured = ref("all");

const currentPage = ref(1);
const perPage = 10;

const showDeleteModal = ref(false);
const galleryToDelete = ref(null);
const deleting = ref(false);

/*
|--------------------------------------------------------------------------
| Categories
|--------------------------------------------------------------------------
*/

const categories = [
  {
    id: "all",
    label: "সব ক্যাটাগরি",
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
| Load Galleries
|--------------------------------------------------------------------------
*/

const loadGalleries = () => {
  galleries.value = getGalleries();
};

/*
|--------------------------------------------------------------------------
| Filtered Galleries
|--------------------------------------------------------------------------
*/

const filteredGalleries = computed(() => {
  const keyword = search.value.trim().toLowerCase();

  return galleries.value.filter((gallery) => {
    const matchesSearch =
      !keyword ||
      gallery.title?.toLowerCase().includes(keyword) ||
      gallery.categoryName?.toLowerCase().includes(keyword);

    const matchesCategory =
      selectedCategory.value === "all" ||
      gallery.category === selectedCategory.value;

    const matchesStatus =
      selectedStatus.value === "all" || gallery.status === selectedStatus.value;

    const matchesFeatured =
      selectedFeatured.value === "all" ||
      (selectedFeatured.value === "featured"
        ? gallery.featured === true
        : gallery.featured === false);

    return matchesSearch && matchesCategory && matchesStatus && matchesFeatured;
  });
});

/*
|--------------------------------------------------------------------------
| Pagination
|--------------------------------------------------------------------------
*/

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredGalleries.value.length / perPage));
});

const paginatedGalleries = computed(() => {
  const start = (currentPage.value - 1) * perPage;

  return filteredGalleries.value.slice(start, start + perPage);
});

const startItem = computed(() => {
  if (!filteredGalleries.value.length) {
    return 0;
  }

  return (currentPage.value - 1) * perPage + 1;
});

const endItem = computed(() => {
  return Math.min(currentPage.value * perPage, filteredGalleries.value.length);
});

/*
|--------------------------------------------------------------------------
| Watch Filters
|--------------------------------------------------------------------------
*/

const resetPage = () => {
  currentPage.value = 1;
};

/*
|--------------------------------------------------------------------------
| Clear Filters
|--------------------------------------------------------------------------
*/

const clearFilters = () => {
  search.value = "";
  selectedCategory.value = "all";
  selectedStatus.value = "all";
  selectedFeatured.value = "all";
  currentPage.value = 1;
};

/*
|--------------------------------------------------------------------------
| Pagination Actions
|--------------------------------------------------------------------------
*/

const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) {
    return;
  }

  currentPage.value = page;
};

const previousPage = () => {
  goToPage(currentPage.value - 1);
};

const nextPage = () => {
  goToPage(currentPage.value + 1);
};

/*
|--------------------------------------------------------------------------
| Delete
|--------------------------------------------------------------------------
*/

const openDeleteModal = (gallery) => {
  galleryToDelete.value = gallery;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  if (deleting.value) {
    return;
  }

  showDeleteModal.value = false;
  galleryToDelete.value = null;
};

const confirmDelete = async () => {
  if (!galleryToDelete.value) {
    return;
  }

  deleting.value = true;

  try {
    const id = galleryToDelete.value.id;

    await deleteGallery(id);

    success("Gallery deleted successfully.");

    // Remove item immediately from local list
    galleries.value = galleries.value.filter(
      (gallery) => String(gallery.id) !== String(id),
    );

    // Close modal manually
    showDeleteModal.value = false;
    galleryToDelete.value = null;

    // Make sure current page is valid
    if (currentPage.value > totalPages.value) {
      currentPage.value = totalPages.value;
    }
  } catch (err) {
    console.error(err);

    error("Failed to delete gallery.");
  } finally {
    deleting.value = false;
  }
};
/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

const getCategoryLabel = (category) => {
  const item = categories.find((item) => item.id === category);

  return item?.label || category;
};

const getStatusLabel = (status) => {
  return status === "published" ? "Published" : "Draft";
};

onMounted(() => {
  loadGalleries();
});
</script>

<template>
  <section class="space-y-6">
    <!-- =====================================================
             Header
        ====================================================== -->

    <div
      class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
    >
      <div>
        <div class="flex items-center gap-3">
          <div
            class="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400"
          >
            <ImageIcon :size="22" />
          </div>

          <div>
            <h1 class="text-2xl font-bold text-white">Gallery Management</h1>

            <p class="mt-1 text-sm text-slate-400">
              Manage your alumni memories and gallery photos.
            </p>
          </div>
        </div>
      </div>

      <RouterLink
        to="/dashboard/gallery/create"
        class="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
      >
        <Plus :size="18" />

        Add Gallery
      </RouterLink>
    </div>

    <!-- =====================================================
             Filters
        ====================================================== -->

    <div class="rounded-2xl border border-white/10 bg-white/3 p-4">
      <div
        class="mb-4 flex items-center gap-2 text-sm font-semibold text-white"
      >
        <SlidersHorizontal :size="17" class="text-blue-400" />

        Filters
      </div>

      <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <!-- Search -->

        <div class="relative">
          <Search
            :size="18"
            class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            v-model="search"
            @input="resetPage"
            type="text"
            placeholder="Search gallery..."
            class="h-11 w-full rounded-xl border border-white/10 bg-slate-900 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/50"
          />
        </div>

        <!-- Category -->

        <select
          v-model="selectedCategory"
          @change="resetPage"
          class="h-11 rounded-xl border border-white/10 bg-slate-900 px-4 text-sm text-slate-300 outline-none focus:border-blue-500/50"
        >
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.label }}
          </option>
        </select>

        <!-- Status -->

        <select
          v-model="selectedStatus"
          @change="resetPage"
          class="h-11 rounded-xl border border-white/10 bg-slate-900 px-4 text-sm text-slate-300 outline-none focus:border-blue-500/50"
        >
          <option value="all">All Status</option>

          <option value="published">Published</option>

          <option value="draft">Draft</option>
        </select>

        <!-- Featured -->

        <div class="flex gap-2">
          <select
            v-model="selectedFeatured"
            @change="resetPage"
            class="h-11 min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-900 px-4 text-sm text-slate-300 outline-none focus:border-blue-500/50"
          >
            <option value="all">All Gallery</option>

            <option value="featured">Featured</option>

            <option value="normal">Normal</option>
          </select>

          <button
            type="button"
            @click="clearFilters"
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/3 text-slate-400 transition hover:bg-white/6 hover:text-white"
            title="Clear filters"
          >
            <X :size="17" />
          </button>
        </div>
      </div>
    </div>

    <!-- =====================================================
             Table
        ====================================================== -->

    <div class="overflow-hidden rounded-2xl border border-white/10 bg-white/3">
      <!-- Desktop Table -->

      <div class="hidden overflow-x-auto lg:block">
        <table class="w-full">
          <thead>
            <tr class="border-b border-white/10 bg-white/2">
              <th
                class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Image
              </th>

              <th
                class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Gallery
              </th>

              <th
                class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Category
              </th>

              <th
                class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Date
              </th>

              <th
                class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Status
              </th>

              <th
                class="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-white/5">
            <tr
              v-for="gallery in paginatedGalleries"
              :key="gallery.id"
              class="transition hover:bg-white/3"
            >
              <!-- Image -->

              <td class="px-5 py-4">
                <div
                  class="relative h-16 w-24 overflow-hidden rounded-xl border border-white/10 bg-slate-900"
                >
                  <img
                    v-if="gallery.image"
                    :src="gallery.image"
                    :alt="gallery.title"
                    class="h-full w-full object-cover"
                  />

                  <div
                    v-else
                    class="flex h-full items-center justify-center text-slate-600"
                  >
                    <ImageIcon :size="20" />
                  </div>
                </div>
              </td>

              <!-- Gallery -->

              <td class="px-5 py-4">
                <div class="max-w-xs">
                  <div class="flex items-center gap-2">
                    <p class="truncate text-sm font-semibold text-white">
                      {{ gallery.title }}
                    </p>

                    <Star
                      v-if="gallery.featured"
                      :size="15"
                      class="shrink-0 fill-amber-400 text-amber-400"
                    />
                  </div>

                  <p class="mt-1 truncate text-xs text-slate-500">
                    {{ gallery.categoryName }}
                  </p>
                </div>
              </td>

              <!-- Category -->

              <td class="px-5 py-4">
                <span
                  class="inline-flex rounded-lg bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-400"
                >
                  {{ getCategoryLabel(gallery.category) }}
                </span>
              </td>

              <!-- Date -->

              <td class="whitespace-nowrap px-5 py-4 text-sm text-slate-400">
                {{ gallery.date }}
              </td>

              <!-- Status -->

              <td class="px-5 py-4">
                <span
                  class="inline-flex rounded-lg px-2.5 py-1 text-xs font-medium"
                  :class="
                    gallery.status === 'published'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-amber-500/10 text-amber-400'
                  "
                >
                  {{ getStatusLabel(gallery.status) }}
                </span>
              </td>

              <!-- Actions -->

              <td class="px-5 py-4">
                <div class="flex justify-end gap-2">
                  <RouterLink
                    :to="`/dashboard/gallery/${gallery.id}`"
                    class="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400"
                  >
                    <Eye :size="16" />
                  </RouterLink>

                  <RouterLink
                    :to="{
                      name: 'GalleryEdit',
                      params: { id: gallery.id },
                    }"
                    class="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition hover:border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-400"
                  >
                    <Pencil :size="16" />
                  </RouterLink>

                  <button
                    type="button"
                    @click="openDeleteModal(gallery)"
                    class="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
                    title="Delete"
                  >
                    <Trash2 :size="16" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile Cards -->

      <div class="divide-y divide-white/5 lg:hidden">
        <div
          v-for="gallery in paginatedGalleries"
          :key="gallery.id"
          class="p-4"
        >
          <div class="flex gap-4">
            <div
              class="h-20 w-28 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-slate-900"
            >
              <img
                v-if="gallery.image"
                :src="gallery.image"
                :alt="gallery.title"
                class="h-full w-full object-cover"
              />

              <div
                v-else
                class="flex h-full items-center justify-center text-slate-600"
              >
                <ImageIcon :size="20" />
              </div>
            </div>

            <div class="min-w-0 flex-1">
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <h3 class="truncate text-sm font-semibold text-white">
                    {{ gallery.title }}
                  </h3>

                  <p class="mt-1 text-xs text-slate-500">
                    {{ gallery.categoryName }}
                  </p>
                </div>

                <Star
                  v-if="gallery.featured"
                  :size="16"
                  class="shrink-0 fill-amber-400 text-amber-400"
                />
              </div>

              <div class="mt-3 flex flex-wrap items-center gap-2">
                <span
                  class="rounded-lg bg-blue-500/10 px-2 py-1 text-[11px] text-blue-400"
                >
                  {{ getCategoryLabel(gallery.category) }}
                </span>

                <span
                  class="rounded-lg px-2 py-1 text-[11px]"
                  :class="
                    gallery.status === 'published'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-amber-500/10 text-amber-400'
                  "
                >
                  {{ getStatusLabel(gallery.status) }}
                </span>
              </div>
            </div>
          </div>

          <div class="mt-4 flex items-center justify-between">
            <span class="text-xs text-slate-500">
              {{ gallery.date }}
            </span>

            <div class="flex gap-2">
              <RouterLink
                :to="`/dashboard/gallery/${gallery.id}`"
                class="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-400"
              >
                <Eye :size="15" />
              </RouterLink>

              <RouterLink
                :to="{
                  name: 'GalleryEdit',
                  params: {
                    id: gallery.id,
                  },
                }"
                class="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-400"
              >
                <Pencil :size="15" />
              </RouterLink>

              <button
                type="button"
                @click="openDeleteModal(gallery)"
                class="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-red-400"
              >
                <Trash2 :size="15" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty -->

      <div v-if="!paginatedGalleries.length" class="px-6 py-16 text-center">
        <div
          class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04] text-slate-600"
        >
          <ImageIcon :size="24" />
        </div>

        <h3 class="mt-4 text-sm font-semibold text-white">No gallery found</h3>

        <p class="mt-1 text-sm text-slate-500">
          Try changing your search or filters.
        </p>
      </div>

      <!-- Pagination -->

      <div
        v-if="filteredGalleries.length"
        class="flex flex-col gap-4 border-t border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <p class="text-xs text-slate-500">
          Showing
          <span class="text-slate-300"> {{ startItem }}-{{ endItem }} </span>
          of
          <span class="text-slate-300">
            {{ filteredGalleries.length }}
          </span>
          galleries
        </p>

        <div class="flex items-center gap-2">
          <button
            type="button"
            @click="previousPage"
            :disabled="currentPage === 1"
            class="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft :size="17" />
          </button>

          <span class="min-w-20 text-center text-xs text-slate-400">
            Page {{ currentPage }} of {{ totalPages }}
          </span>

          <button
            type="button"
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight :size="17" />
          </button>
        </div>
      </div>
    </div>

    <!-- =====================================================
             Delete Modal
        ====================================================== -->

    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="showDeleteModal"
          class="fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          @click.self="closeDeleteModal"
        >
          <div
            class="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl"
          >
            <div
              class="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400"
            >
              <Trash2 :size="22" />
            </div>

            <h3 class="mt-5 text-lg font-bold text-white">Delete Gallery?</h3>

            <p class="mt-2 text-sm leading-6 text-slate-400">
              Are you sure you want to delete
              <span class="font-semibold text-white">
                {{ galleryToDelete?.title }}
              </span>
              ? This action cannot be undone.
            </p>

            <div class="mt-6 flex justify-end gap-3">
              <button
                type="button"
                @click="closeDeleteModal"
                :disabled="deleting"
                class="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/[0.05]"
              >
                Cancel
              </button>

              <button
                type="button"
                @click="confirmDelete"
                :disabled="deleting"
                class="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500 disabled:opacity-50"
              >
                {{ deleting ? "Deleting..." : "Delete" }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
