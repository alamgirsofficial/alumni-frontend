<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  ArrowLeft,
  CalendarDays,
  User,
  Tag,
  Pencil,
  FileText,
} from "@lucide/vue";

import { blogs } from "@/constants/blogData.js";

const route = useRoute();
const router = useRouter();

const blog = computed(() => {
  return blogs.value.find((item) => item.id === Number(route.params.id));
});

const categories = computed(() => {
  if (!blog.value?.categories) {
    return [];
  }

  return blog.value.categories.map((category) =>
    typeof category === "string" ? category : category.name,
  );
});

const goBack = () => {
  router.push({
    name: "BlogList",
  });
};

const editBlog = () => {
  router.push({
    name: "BlogEdit",
    params: {
      id: blog.value.id,
    },
  });
};
</script>

<template>
  <div class="min-h-full bg-slate-950 p-4 sm:p-6 lg:p-8">
    <div class="mx-auto max-w-5xl">
      <!-- Not Found -->
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
          The blog you're looking for doesn't exist.
        </p>

        <button
          type="button"
          class="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
          @click="goBack"
        >
          Back to Blogs
        </button>
      </div>

      <!-- Blog -->
      <template v-else>
        <!-- Header -->
        <div
          class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
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
                <h1 class="text-2xl font-bold text-white">Blog Details</h1>

                <p class="mt-1 text-sm text-slate-500">
                  Preview blog content and information.
                </p>
              </div>
            </div>
          </div>

          <RouterLink
            :to="{
              name: 'BlogEdit',
              params: { id: blog.id },
            }"
            class="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            <Pencil :size="17" />

            Edit Blog
          </RouterLink>
        </div>

        <!-- Main -->
        <article
          class="overflow-hidden rounded-2xl border border-white/10 bg-white/3"
        >
          <!-- Image -->
          <div
            v-if="blog.image"
            class="aspect-16/7 w-full overflow-hidden bg-slate-900"
          >
            <img
              :src="blog.image"
              :alt="blog.title"
              class="h-full w-full object-cover"
            />
          </div>

          <!-- Content -->
          <div class="p-5 sm:p-8 lg:p-10">
            <!-- Categories -->
            <div v-if="categories.length" class="mb-5 flex flex-wrap gap-2">
              <span
                v-for="category in categories"
                :key="category"
                class="inline-flex items-center gap-1.5 rounded-lg border border-blue-400/20 bg-blue-400/10 px-2.5 py-1.5 text-xs text-blue-300"
              >
                <Tag :size="12" />

                {{ category }}
              </span>
            </div>

            <!-- Title -->
            <h1
              class="max-w-4xl text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl"
            >
              {{ blog.title }}
            </h1>

            <!-- Description -->
            <p class="mt-4 max-w-3xl text-base leading-7 text-slate-400">
              {{ blog.desc }}
            </p>

            <!-- Meta -->
            <div
              class="mt-6 flex flex-wrap gap-4 border-y border-white/10 py-4"
            >
              <div class="flex items-center gap-2 text-sm text-slate-400">
                <User :size="16" class="text-blue-400" />

                {{ blog.author }}
              </div>

              <div class="flex items-center gap-2 text-sm text-slate-400">
                <CalendarDays :size="16" class="text-blue-400" />

                {{ blog.publish_date }}
              </div>

              <span
                class="rounded-full border px-2.5 py-1 text-xs"
                :class="
                  blog.status === 'draft'
                    ? 'border-amber-400/20 bg-amber-400/10 text-amber-300'
                    : 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300'
                "
              >
                {{ blog.status === "draft" ? "Draft" : "Published" }}
              </span>
            </div>

            <!-- Content -->
            <div
              class="mt-8 whitespace-pre-line text-[15px] leading-8 text-slate-300"
            >
              {{ blog.content }}
            </div>
          </div>
        </article>
      </template>
    </div>
  </div>
</template>
