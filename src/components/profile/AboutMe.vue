<script setup>
import { Heart } from "@lucide/vue";

defineProps({
  bio: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <section
    class="
      relative
      overflow-hidden
      rounded-2xl
      border border-white/10
      bg-linear-to-br
      from-blue-500/[0.045]
      to-cyan-400/[0.02]
      p-5
      backdrop-blur-xl
      transition-all duration-300
      hover:border-white/[0.12]
      sm:p-6
    "
  >
    <!-- Ambient Glow -->

    <div
      class="
        pointer-events-none
        absolute
        -right-8
        -top-8
        h-32
        w-32
        rounded-full
        bg-cyan-400/5
        blur-3xl
      "
    />

    <!-- Content -->

    <div class="relative flex items-start gap-4">

      <!-- Icon -->

      <div
        class="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-pink-500/10
          text-pink-400
          ring-1
          ring-pink-400/5
        "
      >
        <Heart
          :size="17"
        />
      </div>

      <!-- Text -->

      <div class="min-w-0 flex-1">

        <!-- Title -->

        <h2
          class="
            text-xl
            font-semibold
            text-white
          "
        >
          About Me
        </h2>

        <!-- Description -->

        <p
          class="
            mt-1
            text-sm
            text-slate-400
          "
        >
          A short introduction
        </p>

        <!-- Bio -->

        <p
          class="
            mt-4
            mx-auto
            text-sm
            leading-7
            text-slate-400
          "
        >
          {{ bio || "No introduction has been added yet. PLease Contact me....." }}
        </p>

      </div>
    </div>
  </section>
</template>