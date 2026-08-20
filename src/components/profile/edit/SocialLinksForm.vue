<script setup>
import { ExternalLink, Share2 } from "@lucide/vue";

import ProfileSectionHeader from "@/components/common/ProfileSectionHeader.vue";

/*
|--------------------------------------------------------------------------
| Props
|--------------------------------------------------------------------------
*/

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});

/*
|--------------------------------------------------------------------------
| Emits
|--------------------------------------------------------------------------
*/
const emit = defineEmits(["update:modelValue"]);

/*
|--------------------------------------------------------------------------
| Update Social Link
|--------------------------------------------------------------------------
|
| Only the URL is editable.
| Platform name, icon, color and id remain unchanged.
|
*/

const updateLink = (id, value) => {
  emit(
    "update:modelValue",
    props.modelValue.map((item) =>
      item.id === id
        ? {
            ...item,
            url: value,
          }
        : item,
    ),
  );
};
</script>

<template>
  <section id="social"
    class="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/12 sm:p-6"
  >
    <!-- =====================================================
         HEADER
    ====================================================== -->

    <ProfileSectionHeader
      kicker="Social"
      title="Social Links"
      description="Update your social and professional profile links"
      icon="Globe"
      icon-class="bg-cyan-500/10 text-cyan-400"
    />

    <!-- =====================================================
         SOCIAL LINKS
    ====================================================== -->

    <div class="mt-6 space-y-3">
      <!-- ===================================================
           SOCIAL ITEM
      ==================================================== -->

      
        <div v-for="item in modelValue" :key="item.id" class="group">
          <!-- Platform Name -->

          <label class="mb-2 block text-xs font-medium text-slate-300">
            {{ item.name }}
          </label>

          <!-- URL Input -->

          <div
            class="flex items-center gap-2 rounded-xl border border-white/10 bg-white/3 px-3 transition-all duration-200 focus-within:border-cyan-400/30 focus-within:bg-white/5 focus-within:ring-1 focus-within:ring-cyan-400/10"
          >
            <!-- Icon -->

            <div
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/4"
            >
              <Share2 :size="15" class="text-cyan-400" />
            </div>

            <!-- Input -->

            <input
              :value="item.url"
              @input="updateLink(item.id, $event.target.value)"
              type="url"
              :placeholder="`Enter your ${item.name} URL`"
              class="min-w-0 flex-1 bg-transparent py-3 text-xs text-slate-200 outline-none placeholder:text-slate-700"
            />

            <!-- Visit -->

            <a
              v-if="item.url"
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              title="Visit profile"
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-600 transition hover:bg-cyan-400/10 hover:text-cyan-400"
            >
              <ExternalLink :size="14" />
            </a>
          </div>
        </div>

      <!-- ===================================================
           EMPTY STATE
      ==================================================== -->

      <div
        v-if="!modelValue.length"
        class="rounded-xl border border-dashed border-white/10 p-8 text-center"
      >
        <Share2 :size="24" class="mx-auto text-slate-700" />

        <p class="mt-3 text-xs text-slate-500">
          No social platforms available.
        </p>
      </div>
    </div>
  </section>
</template>
