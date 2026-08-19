<script setup>
import { ref } from "vue";
import {
  Award,
  Plus,
  X,
} from "@lucide/vue";

import ProfileSectionHeader from "@/components/common/ProfileSectionHeader.vue";

const props = defineProps({
  skills: {
    type: Array,
    default: () => [],
  },
});

const newSkill = ref("");

const addSkill = () => {
  const skill = newSkill.value.trim();

  if (!skill) return;

  const exists = props.skills.some(
    (item) => item.toLowerCase() === skill.toLowerCase()
  );

  if (exists) {
    newSkill.value = "";
    return;
  }

  props.skills.push(skill);

  newSkill.value = "";
};

const removeSkill = (index) => {
  props.skills.splice(index, 1);
};

const handleKeydown = (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addSkill();
  }
};
</script>

<template>
  <section
    class="rounded-2xl border border-white/10 bg-white/[0.025]
           p-5 backdrop-blur-xl transition-all duration-300
           hover:border-white/15 sm:p-6"
  >

    <!-- Header -->

    <ProfileSectionHeader
      kicker="Expertise"
      title="Skills & Expertise"
      description="Add the skills and technologies you are familiar with"
      icon="Award"
      icon-class="bg-amber-500/10 text-amber-400"
    />

    <!-- Add Skill -->

    <div class="mt-6">

      <label
        class="mb-1.5 block text-[9px] font-medium
               uppercase tracking-[0.08em] text-slate-500"
      >
        Add Skill
      </label>

      <div class="flex gap-2">

        <div class="relative min-w-0 flex-1">

          <Award
            :size="14"
            class="pointer-events-none absolute left-3 top-1/2
                   -translate-y-1/2 text-slate-600"
          />

          <input
            v-model="newSkill"
            @keydown="handleKeydown"
            type="text"
            placeholder="e.g. Laravel, Vue.js, MySQL"
            class="w-full rounded-lg border border-white/7
                   bg-white/[0.025] py-2.5 pl-9 pr-3
                   text-xs text-slate-200 outline-none
                   placeholder:text-slate-700
                   transition-all duration-200
                   focus:border-amber-400/30
                   focus:bg-amber-400/[0.02]
                   focus:ring-2 focus:ring-amber-400/5"
          />

        </div>

        <button
          type="button"
          @click="addSkill"
          class="inline-flex shrink-0 items-center gap-1.5
                 rounded-lg border border-amber-400/10
                 bg-amber-400/10 px-4 py-2.5
                 text-[10px] font-semibold text-amber-400
                 transition-all duration-200
                 hover:border-amber-400/20
                 hover:bg-amber-400/15"
        >
          <Plus :size="13" />
          Add
        </button>

      </div>

      <p class="mt-2 text-[9px] text-slate-600">
        Press Enter or click Add to add a skill.
      </p>

    </div>

    <!-- Skills -->

    <div class="mt-6">

      <div
        v-if="skills.length"
        class="flex flex-wrap gap-2"
      >

        <div
          v-for="(skill, index) in skills"
          :key="`${skill}-${index}`"
          class="group inline-flex items-center gap-2
                 rounded-lg border border-white/7
                 bg-white/[0.025] px-3 py-2
                 transition-all duration-200
                 hover:border-amber-400/15
                 hover:bg-amber-400/[0.025]"
        >

          <span
            class="h-1.5 w-1.5 rounded-full bg-amber-400"
          />

          <span
            class="text-[10px] font-medium text-slate-300"
          >
            {{ skill }}
          </span>

          <button
            type="button"
            @click="removeSkill(index)"
            class="flex h-4 w-4 items-center justify-center
                   rounded text-slate-600
                   transition-colors
                   hover:bg-red-400/10
                   hover:text-red-400"
            :aria-label="`Remove ${skill}`"
          >
            <X :size="11" />
          </button>

        </div>

      </div>

      <!-- Empty -->

      <div
        v-else
        class="rounded-xl border border-dashed
               border-white/10 p-6 text-center"
      >

        <Award
          :size="24"
          class="mx-auto text-slate-700"
        />

        <p class="mt-2 text-xs text-slate-500">
          No skills added yet.
        </p>

        <p class="mt-1 text-[9px] text-slate-700">
          Add your professional skills above.
        </p>

      </div>

    </div>

    <!-- Skill Count -->

    <div
      v-if="skills.length"
      class="mt-5 flex items-center justify-between
             border-t border-white/5 pt-4"
    >

      <span class="text-[9px] text-slate-600">
        Total Skills
      </span>

      <span
        class="rounded-full border border-amber-400/10
               bg-amber-400/5 px-2.5 py-1
               text-[9px] font-medium text-amber-400"
      >
        {{ skills.length }}
      </span>

    </div>

  </section>
</template>