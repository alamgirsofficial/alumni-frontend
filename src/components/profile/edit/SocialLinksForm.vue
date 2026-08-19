<script setup>
import { ref } from "vue";
import {
  Share2,
  Plus,
  Trash2,
  ExternalLink,
  GripVertical,
} from "@lucide/vue";

import ProfileSectionHeader from "@/components/common/ProfileSectionHeader.vue";

const props = defineProps({
  socialLinks: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:socialLinks"]);

const availablePlatforms = [
  {
    name: "LinkedIn",
    icon: "mdi:linkedin",
    color: "#0A66C2",
  },
  {
    name: "Facebook",
    icon: "mdi:facebook",
    color: "#1877F2",
  },
  {
    name: "GitHub",
    icon: "mdi:github",
    color: "#181717",
  },
  {
    name: "Instagram",
    icon: "mdi:instagram",
    color: "#E4405F",
  },
  {
    name: "Twitter / X",
    icon: "mdi:twitter",
    color: "#000000",
  },
  {
    name: "YouTube",
    icon: "mdi:youtube",
    color: "#FF0000",
  },
  {
    name: "Website",
    icon: "mdi:web",
    color: "#06B6D4",
  },
];

const showAddForm = ref(false);

const newLink = ref({
  name: "",
  url: "",
  icon: "",
  color: "",
});

const resetForm = () => {
  newLink.value = {
    name: "",
    url: "",
    icon: "",
    color: "",
  };

  showAddForm.value = false;
};

const selectPlatform = (platform) => {
  newLink.value = {
    name: platform.name,
    url: "",
    icon: platform.icon,
    color: platform.color,
  };
};

const addLink = () => {
  if (!newLink.value.name || !newLink.value.url) return;

  const link = {
    id: Date.now(),
    ...newLink.value,
  };

  emit("update:socialLinks", [
    ...props.socialLinks,
    link,
  ]);

  resetForm();
};

const removeLink = (id) => {
  emit(
    "update:socialLinks",
    props.socialLinks.filter((item) => item.id !== id)
  );
};

const updateLink = (id, key, value) => {
  emit(
    "update:socialLinks",
    props.socialLinks.map((item) =>
      item.id === id
        ? {
            ...item,
            [key]: value,
          }
        : item
    )
  );
};
</script>

<template>
  <section
    class="rounded-2xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.12] sm:p-6"
  >
    <!-- Header -->

    <div class="flex items-start justify-between gap-4">
      <ProfileSectionHeader
        kicker="Social"
        title="Social Links"
        description="Connect your social and professional profiles"
        icon="Globe"
        icon-class="bg-cyan-500/10 text-cyan-400"
      />

      <button
        type="button"
        @click="showAddForm = !showAddForm"
        class="inline-flex shrink-0 items-center gap-2 rounded-xl border border-cyan-400/10 bg-cyan-400/10 px-3 py-2 text-xs font-medium text-cyan-400 transition-all duration-300 hover:border-cyan-400/20 hover:bg-cyan-400/15"
      >
        <Plus :size="14" />

        <span class="hidden sm:inline">
          Add Link
        </span>
      </button>
    </div>

    <!-- Add New Link -->

    <div
      v-if="showAddForm"
      class="mt-6 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.025] p-4"
    >
      <div class="mb-4">
        <p class="text-xs font-semibold text-slate-200">
          Add Social Profile
        </p>

        <p class="mt-1 text-[10px] text-slate-500">
          Select a platform and add your profile URL.
        </p>
      </div>

      <!-- Platforms -->

      <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <button
          v-for="platform in availablePlatforms"
          :key="platform.name"
          type="button"
          @click="selectPlatform(platform)"
          class="rounded-lg border px-3 py-2.5 text-left text-[10px] transition-all duration-200"
          :class="
            newLink.name === platform.name
              ? 'border-cyan-400/20 bg-cyan-400/10 text-cyan-400'
              : 'border-white/5 bg-white/[0.02] text-slate-400 hover:border-white/10 hover:bg-white/[0.04]'
          "
        >
          {{ platform.name }}
        </button>
      </div>

      <!-- URL -->

      <div class="mt-4">
        <label
          class="mb-2 block text-[10px] font-medium uppercase tracking-[0.08em] text-slate-500"
        >
          Profile URL
        </label>

        <input
          v-model="newLink.url"
          type="url"
          placeholder="https://linkedin.com/in/your-name"
          class="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 text-xs text-slate-200 outline-none transition placeholder:text-slate-700 focus:border-cyan-400/30 focus:bg-white/[0.045] focus:ring-1 focus:ring-cyan-400/10"
        />
      </div>

      <!-- Actions -->

      <div class="mt-4 flex justify-end gap-2">
        <button
          type="button"
          @click="resetForm"
          class="rounded-lg border border-white/10 px-3 py-2 text-[10px] text-slate-400 transition hover:bg-white/5 hover:text-slate-200"
        >
          Cancel
        </button>

        <button
          type="button"
          @click="addLink"
          :disabled="!newLink.name || !newLink.url"
          class="rounded-lg bg-cyan-400 px-4 py-2 text-[10px] font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Add Link
        </button>
      </div>
    </div>

    <!-- Existing Links -->

    <div class="mt-6 space-y-3">
      <div
        v-for="item in socialLinks"
        :key="item.id"
        class="group rounded-xl border border-white/5 bg-white/[0.015] p-4 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.03]"
      >
        <div class="flex items-center gap-3">
          <!-- Drag -->

          <GripVertical
            :size="15"
            class="hidden shrink-0 cursor-grab text-slate-700 sm:block"
          />

          <!-- Icon -->

          <div
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-white/[0.03]"
          >
            <Share2
              :size="16"
              class="text-cyan-400"
            />
          </div>

          <!-- Content -->

          <div class="min-w-0 flex-1">
            <p class="text-xs font-medium text-slate-200">
              {{ item.name }}
            </p>

            <input
              :value="item.url"
              @input="
                updateLink(
                  item.id,
                  'url',
                  $event.target.value
                )
              "
              type="url"
              class="mt-1 w-full bg-transparent text-[10px] text-slate-500 outline-none placeholder:text-slate-700 focus:text-slate-300"
              placeholder="Profile URL"
            />
          </div>

          <!-- Visit -->

          <a
            :href="item.url"
            target="_blank"
            rel="noopener noreferrer"
            class="hidden h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition hover:bg-white/5 hover:text-cyan-400 sm:flex"
          >
            <ExternalLink :size="14" />
          </a>

          <!-- Delete -->

          <button
            type="button"
            @click="removeLink(item.id)"
            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-600 transition hover:bg-red-400/10 hover:text-red-400"
          >
            <Trash2 :size="14" />
          </button>
        </div>
      </div>

      <!-- Empty -->

      <div
        v-if="!socialLinks.length"
        class="rounded-xl border border-dashed border-white/10 p-8 text-center"
      >
        <Share2
          :size="24"
          class="mx-auto text-slate-700"
        />

        <p class="mt-3 text-xs text-slate-500">
          No social links added yet.
        </p>

        <p class="mt-1 text-[10px] text-slate-700">
          Add your professional or social profiles.
        </p>
      </div>
    </div>
  </section>
</template>