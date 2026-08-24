<script setup>
import { computed, ref } from "vue";
import Pagination from "@/components/common/Pagination.vue";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  FileText,
  CalendarDays,
  User,
  Tag,
  X,
} from "@lucide/vue";

import { blogs } from "@/constants/blogData.js";

// =====================================================
// State
// =====================================================

const search = ref("");
const selectedCategory = ref("all");
const selectedStatus = ref("all");

const showDeleteModal = ref(false);
const selectedBlog = ref(null);

// =====================================================
// Categories
// =====================================================

const categories = computed(() => {
  const categoryList = blogs.value.flatMap((blog) =>
    (blog.categories || [])
      .map((category) =>
        typeof category === "string" ? category : category?.name,
      )
      .filter(Boolean),
  );

  return [...new Set(categoryList)];
});

// =====================================================
// Helpers
// =====================================================

const getBlogCategories = (blog) => {
  return (blog.categories || [])
    .map((category) =>
      typeof category === "string" ? category : category?.name,
    )
    .filter(Boolean);
};

const getBlogStatus = (blog) => {
  return blog.status || "published";
};

const getStatusLabel = (status) => {
  return status === "draft" ? "Draft" : "Published";
};

const getStatusClass = (status) => {
  return status === "draft"
    ? "border-amber-400/20 bg-amber-400/10 text-amber-300"
    : "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
};

// =====================================================
// Statistics
// =====================================================

const totalBlogs = computed(() => blogs.value.length);

const publishedBlogs = computed(() => {
  return blogs.value.filter((blog) => getBlogStatus(blog) === "published")
    .length;
});

const draftBlogs = computed(() => {
  return blogs.value.filter((blog) => getBlogStatus(blog) === "draft").length;
});

// =====================================================
// Filtering
// =====================================================

const filteredBlogs = computed(() => {
  const keyword = search.value.trim().toLowerCase();

  return blogs.value.filter((blog) => {
    const blogCategories = getBlogCategories(blog);

    const title = blog.title?.toLowerCase() || "";
    const author = blog.author?.toLowerCase() || "";
    const description = blog.desc?.toLowerCase() || "";

    const matchesSearch =
      !keyword ||
      title.includes(keyword) ||
      author.includes(keyword) ||
      description.includes(keyword);

    const matchesCategory =
      selectedCategory.value === "all" ||
      blogCategories.includes(selectedCategory.value);

    const matchesStatus =
      selectedStatus.value === "all" ||
      getBlogStatus(blog) === selectedStatus.value;

    return matchesSearch && matchesCategory && matchesStatus;
  });
});

// =====================================================
// Pagination
// =====================================================

const currentPage = ref(1);
const perPage = 5;

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredBlogs.value.length / perPage));
});

const paginatedBlogs = computed(() => {
  const start = (currentPage.value - 1) * perPage;

  return filteredBlogs.value.slice(start, start + perPage);
});

const startItem = computed(() => {
  if (!filteredBlogs.value.length) return 0;

  return (currentPage.value - 1) * perPage + 1;
});

const endItem = computed(() => {
  return Math.min(currentPage.value * perPage, filteredBlogs.value.length);
});

// =====================================================
// Search / Filter Actions
// =====================================================

const handleSearch = () => {
  resetPage();
};

const handleCategoryChange = () => {
  resetPage();
};

const handleStatusChange = () => {
  resetPage();
};

// =====================================================
// Delete Actions
// =====================================================

const confirmDelete = (blog) => {
  selectedBlog.value = blog;
  showDeleteModal.value = true;
};

const cancelDelete = () => {
  selectedBlog.value = null;
  showDeleteModal.value = false;
};

const deleteBlog = () => {
  if (!selectedBlog.value) {
    return;
  }

  const index = blogs.value.findIndex(
    (blog) => blog.id === selectedBlog.value.id,
  );

  if (index !== -1) {
    blogs.value.splice(index, 1);
  }

  cancelDelete();

  // Prevent current page from becoming empty after deletion
  if (currentPage.value > totalPages.value && currentPage.value > 1) {
    currentPage.value = totalPages.value;
  }

  // ===================================================
  // Existing notification setup থাকলে এখানে ব্যবহার করতে পারো
  // ===================================================
  //
  // notify({
  //   type: "success",
  //   text: "Blog deleted successfully.",
  // });
};
</script>

<template>
  <div class="min-h-full bg-slate-950 p-2 sm:p-4 lg:p-5">
    <div class="mx-auto max-w-4xl space-y-3">
      <!-- =====================================================
           Header
      ====================================================== -->

      <section
        class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <div
            class="mb-2 flex items-center gap-2 text-sm font-medium text-blue-400"
          >
            <FileText :size="16" />

            <span>Content Management</span>
          </div>

          <h1 class="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Blog Management
          </h1>

          <p class="mt-1 max-w-2xl text-sm text-slate-400">
            Manage your blog posts, articles and publications from one place.
          </p>
        </div>

        <!-- Create Blog -->

        <RouterLink
          :to="{ name: 'BlogCreate' }"
          class="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-lg shadow-blue-600/10 transition hover:bg-blue-500 active:scale-[0.98]"
        >
          <Plus :size="18" />

          <span>Create Blog</span>
        </RouterLink>
      </section>

      <!-- =====================================================
           Statistics
      ====================================================== -->

      <section class="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <!-- Total -->

        <div
          class="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur-sm transition hover:border-blue-400/20"
        >
          <div class="flex items-center justify-between gap-4">
            <div>
              <p class="text-sm text-slate-400">Total Blogs</p>

              <p class="mt-2 text-2xl font-bold text-white">
                {{ totalBlogs }}
              </p>
            </div>

            <div
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-blue-400"
            >
              <FileText :size="20" />
            </div>
          </div>
        </div>

        <!-- Published -->

        <div
          class="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur-sm transition hover:border-emerald-400/20"
        >
          <div class="flex items-center justify-between gap-4">
            <div>
              <p class="text-sm text-slate-400">Published</p>

              <p class="mt-2 text-2xl font-bold text-white">
                {{ publishedBlogs }}
              </p>
            </div>

            <div
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-400"
            >
              <Eye :size="20" />
            </div>
          </div>
        </div>

        <!-- Draft -->

        <div
          class="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur-sm transition hover:border-amber-400/20"
        >
          <div class="flex items-center justify-between gap-4">
            <div>
              <p class="text-sm text-slate-400">Drafts</p>

              <p class="mt-2 text-2xl font-bold text-white">
                {{ draftBlogs }}
              </p>
            </div>

            <div
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-400/10 text-amber-400"
            >
              <FileText :size="20" />
            </div>
          </div>
        </div>
      </section>

      <!-- =====================================================
           Filters
      ====================================================== -->

      <section class="rounded-2xl border border-white/10 bg-white/3 p-4 sm:p-5">
        <div
          class="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_auto_auto]"
        >
          <!-- Search -->

          <div class="relative">
            <Search
              :size="18"
              class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              v-model="search"
              type="text"
              placeholder="Search by title, author or description..."
              class="h-11 w-full rounded-xl border border-white/10 bg-slate-900/70 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
              @input="handleSearch"
            />
          </div>

          <!-- Category -->

          <select
            v-model="selectedCategory"
            class="h-11 min-w-45 rounded-xl border border-white/10 bg-slate-900/70 px-4 text-sm text-slate-300 outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
            @change="handleCategoryChange"
          >
            <option value="all">All Categories</option>

            <option
              v-for="category in categories"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>

          <!-- Status -->

          <select
            v-model="selectedStatus"
            class="h-11 min-w-38 rounded-xl border border-white/10 bg-slate-900/70 px-4 text-sm text-slate-300 outline-none transition focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
            @change="handleStatusChange"
          >
            <option value="all">All Status</option>

            <option value="published">Published</option>

            <option value="draft">Draft</option>
          </select>
        </div>
      </section>

      <!-- =====================================================
           Blog Table / Cards
      ====================================================== -->

      <section
        class="overflow-hidden rounded-xl border border-white/10 bg-white/3"
      >
        <!-- Table Header -->

     

        <!-- ===================================================
             Empty State
        ==================================================== -->

        <div
          v-if="!paginatedBlogs.length"
          class="flex min-h-75 flex-col items-center justify-center px-6 py-12 text-center"
        >
          <div
            class="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-500"
          >
            <FileText :size="24" />
          </div>

          <h3 class="mt-4 font-semibold text-white">No blogs found</h3>

          <p class="mt-1 max-w-sm text-sm leading-6 text-slate-500">
            No blog matches your current search or filter options.
          </p>

          <button
            v-if="
              search || selectedCategory !== 'all' || selectedStatus !== 'all'
            "
            type="button"
            class="mt-4 text-sm font-medium text-blue-400 transition hover:text-blue-300"
            @click="
              search = '';
              selectedCategory = 'all';
              selectedStatus = 'all';
              resetPage();
            "
          >
            Clear filters
          </button>
        </div>

        <!-- ===================================================
             Desktop Table
        ==================================================== -->

        <div v-else class="hidden overflow-x-auto md:block">
          <table class="w-full min-w-238">
            <thead>
              <tr class="border-b border-white bg-cyan-800">
                <th
                  class="px-5 py-2 text-left text-xs font-semibold uppercase tracking-wider text-white"
                >
                  Blog
                </th>

                <th
                  class="px-5 py-2 text-left text-xs font-semibold uppercase tracking-wider text-white"
                >
                  Author
                </th>

                <th
                  class="px-5 py-2 text-left text-xs font-semibold uppercase tracking-wider text-white"
                >
                  Category
                </th>

                <th
                  class="px-5 py-2 text-left text-xs font-semibold uppercase tracking-wider text-white"
                >
                  Published
                </th>

                <th
                  class="px-5 py-2 text-left text-xs font-semibold uppercase tracking-wider text-white"
                >
                  Status
                </th>

                <th
                  class="px-5 py-2 text-right text-xs font-semibold uppercase tracking-wider text-white"
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-white/5">
              <tr
                v-for="blog in paginatedBlogs"
                :key="blog.id"
                class="group transition hover:bg-white/3"
              >
                <!-- Blog -->

                <td class="px-5 py-4">
                  <div class="flex min-w-75 items-center gap-4">
                    <div
                      class="h-14 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-slate-900"
                    >
                      <img
                        v-if="blog.image"
                        :src="blog.image"
                        :alt="blog.title"
                        class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />

                      <div
                        v-else
                        class="flex h-full w-full items-center justify-center text-slate-600"
                      >
                        <FileText :size="20" />
                      </div>
                    </div>

                    <div class="min-w-0">
                      <h3 class="truncate text-sm font-semibold text-white">
                        {{ blog.title || "Untitled Blog" }}
                      </h3>

                      <p
                        class="mt-1 line-clamp-2 max-w-[320px] text-xs leading-5 text-slate-500"
                      >
                        {{ blog.desc || "No description available." }}
                      </p>
                    </div>
                  </div>
                </td>

                <!-- Author -->

                <td class="px-5 py-4">
                  <div class="flex items-center gap-2 text-sm text-slate-300">
                    <User :size="15" class="shrink-0 text-slate-500" />

                    <span>
                      {{ blog.author || "Unknown" }}
                    </span>
                  </div>
                </td>

                <!-- Category -->

                <td class="px-5 py-4">
                  <div
                    v-if="getBlogCategories(blog).length"
                    class="flex max-w-55 flex-wrap gap-1.5"
                  >
                    <span
                      v-for="category in getBlogCategories(blog).slice(0, 2)"
                      :key="category"
                      class="inline-flex items-center gap-1 rounded-lg border border-blue-400/10 bg-blue-400/5 px-2 py-1 text-[11px] text-blue-300"
                    >
                      <Tag :size="11" />

                      {{ category }}
                    </span>

                    <span
                      v-if="getBlogCategories(blog).length > 2"
                      class="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-slate-400"
                    >
                      +{{ getBlogCategories(blog).length - 2 }}
                    </span>
                  </div>

                  <span v-else class="text-xs text-slate-600">
                    No category
                  </span>
                </td>

                <!-- Date -->

                <td class="px-5 py-4">
                  <div
                    class="flex items-center gap-2 whitespace-nowrap text-sm text-slate-400"
                  >
                    <CalendarDays :size="15" class="shrink-0 text-slate-500" />

                    {{ blog.publish_date || "—" }}
                  </div>
                </td>

                <!-- Status -->

                <td class="px-5 py-4">
                  <span
                    class="inline-flex rounded-full border px-2.5 py-1 text-xs font-medium"
                    :class="getStatusClass(getBlogStatus(blog))"
                  >
                    {{ getStatusLabel(getBlogStatus(blog)) }}
                  </span>
                </td>

                <!-- Actions -->

                <td class="px-5 py-4">
                  <div class="flex justify-end gap-1.5">
                    <!-- View -->

                    <RouterLink
                      :to="{
                        name: 'BlogView',
                        params: { id: blog.id },
                      }"
                      title="View Blog"
                      class="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/3 text-slate-400 transition hover:border-blue-400/20 hover:bg-blue-400/10 hover:text-blue-400"
                    >
                      <Eye :size="16" />
                    </RouterLink>

                    <!-- Edit -->

                    <RouterLink
                      :to="{
                        name: 'BlogEdit',
                        params: { id: blog.id },
                      }"
                      title="Edit Blog"
                      class="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/3 text-slate-400 transition hover:border-amber-400/20 hover:bg-amber-400/10 hover:text-amber-400"
                    >
                      <Pencil :size="16" />
                    </RouterLink>

                    <!-- Delete -->

                    <button
                      type="button"
                      title="Delete Blog"
                      class="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/3 text-slate-400 transition hover:border-red-400/20 hover:bg-red-400/10 hover:text-red-400"
                      @click="confirmDelete(blog)"
                    >
                      <Trash2 :size="16" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- ===================================================
             Mobile Cards
        ==================================================== -->

        <div
          v-if="paginatedBlogs.length"
          class="divide-y divide-white/5 md:hidden"
        >
          <div v-for="blog in paginatedBlogs" :key="blog.id" class="p-4">
            <!-- Blog Info -->

            <div class="flex gap-4">
              <div
                class="h-20 w-24 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-slate-900"
              >
                <img
                  v-if="blog.image"
                  :src="blog.image"
                  :alt="blog.title"
                  class="h-full w-full object-cover"
                />

                <div
                  v-else
                  class="flex h-full w-full items-center justify-center text-slate-600"
                >
                  <FileText :size="20" />
                </div>
              </div>

              <div class="min-w-0 flex-1">
                <h3 class="line-clamp-2 text-sm font-semibold text-white">
                  {{ blog.title || "Untitled Blog" }}
                </h3>

                <p
                  class="mt-1 flex items-center gap-1.5 text-xs text-slate-500"
                >
                  <User :size="12" />

                  {{ blog.author || "Unknown" }}
                </p>

                <div class="mt-2 flex flex-wrap items-center gap-2">
                  <span
                    class="rounded-full border px-2 py-0.5 text-[10px]"
                    :class="getStatusClass(getBlogStatus(blog))"
                  >
                    {{ getStatusLabel(getBlogStatus(blog)) }}
                  </span>

                  <span
                    class="flex items-center gap-1 text-[11px] text-slate-500"
                  >
                    <CalendarDays :size="12" />

                    {{ blog.publish_date || "—" }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Mobile Actions -->

            <div class="mt-4 flex gap-2">
              <RouterLink
                :to="{
                  name: 'BlogView',
                  params: { id: blog.id },
                }"
                title="View Blog"
                class="flex h-9 flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/3 text-xs text-slate-300 transition hover:border-blue-400/20 hover:bg-blue-400/10 hover:text-blue-400"
              >
                <Eye :size="15" />

                <span>View</span>
              </RouterLink>

              <RouterLink
                :to="{
                  name: 'BlogEdit',
                  params: { id: blog.id },
                }"
                title="Edit Blog"
                class="flex h-9 flex-1 items-center justify-center gap-2 rounded-lg border border-amber-400/10 bg-amber-400/5 text-xs text-amber-300 transition hover:bg-amber-400/10"
              >
                <Pencil :size="15" />

                <span>Edit</span>
              </RouterLink>

              <button
                type="button"
                title="Delete Blog"
                class="flex h-9 w-10 shrink-0 items-center justify-center rounded-lg border border-red-400/10 bg-red-400/5 text-red-300 transition hover:bg-red-400/10"
                @click="confirmDelete(blog)"
              >
                <Trash2 :size="15" />
              </button>
            </div>
          </div>
        </div>

        <!-- ===================================================
             Pagination is use from common component Pagination.vue
        ==================================================== -->

        <Pagination
          v-model:currentPage="currentPage"
          :total-pages="totalPages"
          :start-item="startItem"
          :end-item="endItem"
          :total-items="filteredBlogs.length"
        />
      </section>
    </div>

    <!-- =====================================================
         Delete Confirmation Modal
    ====================================================== -->

    <Transition name="fade">
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        @click.self="cancelDelete"
      >
        <div
          class="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl"
        >
          <!-- Modal Header -->

          <div
            class="flex items-start justify-between border-b border-white/10 px-6 py-5"
          >
            <div
              class="flex h-11 w-11 items-center justify-center rounded-xl border border-red-400/20 bg-red-400/10 text-red-400"
            >
              <Trash2 :size="20" />
            </div>

            <button
              type="button"
              title="Close"
              class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/5 hover:text-white"
              @click="cancelDelete"
            >
              <X :size="18" />
            </button>
          </div>

          <!-- Modal Content -->

          <div class="px-6 py-5">
            <h3 class="text-lg font-semibold text-white">Delete Blog?</h3>

            <p class="mt-2 text-sm leading-6 text-slate-400">
              Are you sure you want to delete

              <span class="font-medium text-slate-200">
                "{{ selectedBlog?.title }}"
              </span>

              ? This action cannot be undone.
            </p>
          </div>

          <!-- Modal Footer -->

          <div class="flex gap-3 border-t border-white/10 px-6 py-4">
            <button
              type="button"
              class="flex-1 rounded-xl border border-white/10 bg-white/3 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5"
              @click="cancelDelete"
            >
              Cancel
            </button>

            <button
              type="button"
              class="flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500"
              @click="deleteBlog"
            >
              Delete Blog
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
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
