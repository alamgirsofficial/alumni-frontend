<script setup>
import {
  Heart,
} from "@lucide/vue";

defineProps({
  bio: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <section
    class="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-blue-500/[0.045] to-cyan-400/[0.02] p-5 backdrop-blur-xl sm:p-6"
  >

    <div
      class="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-cyan-400/5 blur-3xl"
    />

    <div class="relative flex items-start gap-4">

      <div
        class="section-icon h-10 w-10 shrink-0 bg-pink-500/10"
      >
        <Heart
          :size="17"
          class="text-pink-400"
        />
      </div>

      <div>

        <h2 class="section-title">
          About Me
        </h2>

        <p class="section-description">
          A short introduction
        </p>

        <p
          class="mt-4 max-w-4xl text-sm leading-7 text-slate-400"
        >
          {{ bio || "No introduction has been added yet." }}
        </p>

      </div>
    </div>
  </section>
</template>

<style scoped>
.section-icon {
  display: flex;
  height: 2.25rem;
  width: 2.25rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
}

.section-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: rgb(255 255 255);
}

.section-description {
  margin-top: 0.25rem;
  font-size: 10px;
  color: rgb(71 85 105);
}
</style>