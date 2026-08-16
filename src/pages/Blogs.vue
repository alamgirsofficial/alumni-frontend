<template>
  <section class="relative py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <BlogHeader
        title="আমাদের"
        highlight="ব্লগ"
        description="সফল ব্যক্তিদের সাক্ষাৎকার এবং তাদের জীবনের গুরুত্বপূর্ণ শিক্ষা নিয়ে এই বিশেষ ব্লগ"
      />

      <!-- All Blog Posts -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <BlogCard
          v-for="(blog, index) in blogs"
          :key="blog.id"
          :blog="blog"
          :delay="(index + 1) * 100"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { blogs } from "@/constants/blogData";
import BlogHeader from "@/components/blog/BlogHeader.vue";
import BlogCard from "@/components/blog/BlogCard.vue";
</script>
