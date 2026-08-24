<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ArrowLeft, FileText } from "@lucide/vue";

import BlogForm from "@/components/dashboard/blog/BlogForm.vue";
import { blogs } from "@/constants/blogData.js";

const route = useRoute();
const router = useRouter();

const blogId = computed(() => Number(route.params.id));

const blog = computed(() =>
  blogs.value.find((item) => item.id === blogId.value),
);

const goBack = () => {
  router.push({
    name: "BlogList",
  });
};

const updateBlog = (data) => {
  const index = blogs.value.findIndex((item) => item.id === blogId.value);

  if (index === -1) {
    return;
  }

  blogs.value[index] = {
    ...blogs.value[index],

    title: data.title,
    desc: data.desc,
    content: data.content,
    author: data.author,
    publish_date: data.publish_date,
    categories: data.categories,
    image: data.image,
    status: data.status,

    borderColor: blogs.value[index].borderColor || "border-blue-500/20",
  };

  router.push({
    name: "dashboard.blogs",
  });
};
</script>

<template>
  <div class="min-h-full bg-slate-950 p-4 sm:p-6 lg:p-8">
    <div class="mx-auto max-w-5xl">
      <!-- Blog Not Found -->
      <div
        v-if="!blog"
        class="flex min-h-125 flex-col items-center justify-center text-center"
      >
        <div
          class="flex h-16 w-16 items-center justify-center rounded-2xl border border-red-400/20 bg-red-400/10 text-red-400"
        >
          <FileText :size="26" />
        </div>

        <h2 class="mt-5 text-xl font-semibold text-white">Blog not found</h2>

        <p class="mt-2 text-sm text-slate-500">
          The blog you're trying to edit doesn't exist.
        </p>

        <button
          type="button"
          class="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
          @click="goBack"
        >
          Back to Blogs
        </button>
      </div>

      <!-- Edit -->
      <template v-else>
        <!-- Header -->
        <div class="mb-6">
          <button
            type="button"
            class="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/3 text-slate-400 transition hover:bg-white/5 hover:text-white"
            @click="goBack"
          >
            <ArrowLeft :size="18" />
          </button>

          <div class="flex items-center gap-3">
            <div
              class="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-400/10 text-amber-400"
            >
              <FileText :size="20" />
            </div>

            <div class="min-w-0">
              <h1 class="text-2xl font-bold text-white">Edit Blog</h1>

              <p class="mt-1 truncate text-sm text-slate-500">
                {{ blog.title }}
              </p>
            </div>
          </div>
        </div>

        <!-- Form -->
        <BlogForm
          :blog="blog"
          mode="edit"
          @submit="updateBlog"
          @cancel="goBack"
        />
      </template>
    </div>
  </div>
</template>
