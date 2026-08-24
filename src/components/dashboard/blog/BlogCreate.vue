<script setup>
import { useRouter } from "vue-router";
import {
  ArrowLeft,
  FileText,
} from "@lucide/vue";

import BlogForm from "@/components/dashboard/blog/BlogForm.vue";
import { blogs } from "@/constants/blogData.js";

const router = useRouter();

const goBack = () => {
  router.push({
    name: "BlogList",
  });
};

const createBlog = (data) => {
  const newBlog = {
    id: Date.now(),

    title: data.title,
    desc: data.desc,
    content: data.content,

    image: data.image || "",

    borderColor: "border-blue-500/20",

    publish_date: data.publish_date,

    author: data.author,

    categories: data.categories,

    status: data.status || "published",
  };

  blogs.value.unshift(newBlog);

  router.push({
    name: "BlogList",
  });
};
</script>

<template>
  <div class="min-h-full bg-slate-950 p-4 sm:p-6 lg:p-8">
    <div class="mx-auto max-w-5xl">

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
            class="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-blue-400"
          >
            <FileText :size="20" />
          </div>

          <div>
            <h1 class="text-2xl font-bold text-white">
              Create Blog
            </h1>

            <p class="mt-1 text-sm text-slate-500">
              Create a new article for your alumni website.
            </p>
          </div>
        </div>
      </div>

      <!-- Form -->
      <BlogForm
        mode="create"
        @submit="createBlog"
        @cancel="goBack"
      />

    </div>
  </div>
</template>