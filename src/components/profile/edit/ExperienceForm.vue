<script setup>
import {
  BriefcaseBusiness,
  Plus,
  Trash2,
  Building2,
  MapPin,
  Calendar,
} from "@lucide/vue";

import ProfileSectionHeader from "@/components/common/ProfileSectionHeader.vue";

const props = defineProps({
  experiences: {
    type: Array,
    default: () => [],
  },
});

const addExperience = () => {
  props.experiences.push({
    id: Date.now(),
    position: "",
    company: "",
    employmentType: "Full Time",
    location: "",
    startDate: "",
    endDate: "",
    currentlyWorking: false,
    description: "",
  });
};

const removeExperience = (index) => {
  props.experiences.splice(index, 1);
};
</script>

<template>
  <section
    class="rounded-2xl border border-white/10 bg-white/[0.025]
           p-5 backdrop-blur-xl transition-all duration-300
           hover:border-white/15 sm:p-6"
  >

    <!-- Header -->

    <div class="flex items-start justify-between gap-4">

      <ProfileSectionHeader
        kicker="Career"
        title="Professional Experience"
        description="Add your professional work experience"
        icon="BriefcaseBusiness"
        icon-class="bg-violet-500/10 text-violet-400"
      />

      <button
        type="button"
        @click="addExperience"
        class="inline-flex shrink-0 items-center gap-1.5
               rounded-lg border border-violet-400/10
               bg-violet-400/10 px-3 py-2
               text-[10px] font-semibold text-violet-400
               transition-all duration-200
               hover:border-violet-400/20
               hover:bg-violet-400/15"
      >
        <Plus :size="13" />
        Add Experience
      </button>

    </div>

    <!-- Experience List -->

    <div class="mt-6 space-y-4">

      <div
        v-for="(item, index) in experiences"
        :key="item.id"
        class="group rounded-xl border border-white/5
               bg-white/[0.015] p-4
               transition-all duration-300
               hover:border-violet-400/10
               hover:bg-violet-400/[0.02]"
      >

        <!-- Item Header -->

        <div class="mb-5 flex items-center justify-between gap-3">

          <div class="flex items-center gap-2">

            <div
              class="flex h-8 w-8 items-center justify-center
                     rounded-lg bg-violet-400/10 text-violet-400"
            >
              <BriefcaseBusiness :size="15" />
            </div>

            <div>
              <p class="text-xs font-semibold text-slate-200">
                Experience {{ index + 1 }}
              </p>

              <p class="text-[9px] text-slate-600">
                Professional career
              </p>
            </div>

          </div>

          <button
            v-if="experiences.length > 1"
            type="button"
            @click="removeExperience(index)"
            class="flex h-8 w-8 items-center justify-center
                   rounded-lg text-slate-600
                   transition-all duration-200
                   hover:bg-red-400/10
                   hover:text-red-400"
          >
            <Trash2 :size="14" />
          </button>

        </div>

        <!-- Fields -->

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">

          <!-- Position -->

          <div class="sm:col-span-2">

            <label
              class="mb-1.5 block text-[9px] font-medium
                     uppercase tracking-[0.08em] text-slate-500"
            >
              Job Title / Position
            </label>

            <input
              v-model="item.position"
              type="text"
              placeholder="e.g. Senior Software Engineer"
              class="w-full rounded-lg border border-white/7
                     bg-white/[0.025] px-3 py-2.5
                     text-xs text-slate-200 outline-none
                     placeholder:text-slate-700
                     focus:border-violet-400/30
                     focus:bg-violet-400/[0.025]
                     focus:ring-2 focus:ring-violet-400/5"
            />

          </div>

          <!-- Company -->

          <div>

            <label
              class="mb-1.5 block text-[9px] font-medium
                     uppercase tracking-[0.08em] text-slate-500"
            >
              Company
            </label>

            <div class="relative">

              <Building2
                :size="14"
                class="pointer-events-none absolute left-3 top-1/2
                       -translate-y-1/2 text-slate-600"
              />

              <input
                v-model="item.company"
                type="text"
                placeholder="Company name"
                class="w-full rounded-lg border border-white/7
                       bg-white/[0.025] py-2.5 pl-9 pr-3
                       text-xs text-slate-200 outline-none
                       placeholder:text-slate-700
                       focus:border-violet-400/30
                       focus:ring-2 focus:ring-violet-400/5"
              />

            </div>

          </div>

          <!-- Employment Type -->

          <div>

            <label
              class="mb-1.5 block text-[9px] font-medium
                     uppercase tracking-[0.08em] text-slate-500"
            >
              Employment Type
            </label>

            <select
              v-model="item.employmentType"
              class="w-full rounded-lg border border-white/7
                     bg-[#0b1424] px-3 py-2.5
                     text-xs text-slate-300 outline-none
                     focus:border-violet-400/30
                     focus:ring-2 focus:ring-violet-400/5"
            >
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
              <option value="Internship">Internship</option>
            </select>

          </div>

          <!-- Location -->

          <div>

            <label
              class="mb-1.5 block text-[9px] font-medium
                     uppercase tracking-[0.08em] text-slate-500"
            >
              Work Location
            </label>

            <div class="relative">

              <MapPin
                :size="14"
                class="pointer-events-none absolute left-3 top-1/2
                       -translate-y-1/2 text-slate-600"
              />

              <input
                v-model="item.location"
                type="text"
                placeholder="Dhaka, Bangladesh"
                class="w-full rounded-lg border border-white/7
                       bg-white/[0.025] py-2.5 pl-9 pr-3
                       text-xs text-slate-200 outline-none
                       placeholder:text-slate-700
                       focus:border-violet-400/30
                       focus:ring-2 focus:ring-violet-400/5"
              />

            </div>

          </div>

          <!-- Start -->

          <div>

            <label
              class="mb-1.5 block text-[9px] font-medium
                     uppercase tracking-[0.08em] text-slate-500"
            >
              Start Date
            </label>

            <div class="relative">

              <Calendar
                :size="14"
                class="pointer-events-none absolute left-3 top-1/2
                       -translate-y-1/2 text-slate-600"
              />

              <input
                v-model="item.startDate"
                type="month"
                class="w-full rounded-lg border border-white/7
                       bg-white/[0.025] py-2.5 pl-9 pr-3
                       text-xs text-slate-300 outline-none
                       focus:border-violet-400/30"
              />

            </div>

          </div>

          <!-- End -->

          <div>

            <label
              class="mb-1.5 block text-[9px] font-medium
                     uppercase tracking-[0.08em] text-slate-500"
            >
              End Date
            </label>

            <div class="relative">

              <Calendar
                :size="14"
                class="pointer-events-none absolute left-3 top-1/2
                       -translate-y-1/2 text-slate-600"
              />

              <input
                v-model="item.endDate"
                type="month"
                :disabled="item.currentlyWorking"
                class="w-full rounded-lg border border-white/7
                       bg-white/[0.025] py-2.5 pl-9 pr-3
                       text-xs text-slate-300 outline-none
                       transition-all
                       focus:border-violet-400/30
                       disabled:cursor-not-allowed
                       disabled:opacity-40"
              />

            </div>

          </div>

          <!-- Current Job -->

          <div class="sm:col-span-2">

            <label
              class="inline-flex cursor-pointer items-center gap-2"
            >

              <input
                v-model="item.currentlyWorking"
                type="checkbox"
                class="h-3.5 w-3.5 rounded border-white/10
                       bg-white/5 text-violet-500
                       focus:ring-violet-400/20"
              />

              <span class="text-[10px] text-slate-400">
                I currently work here
              </span>

            </label>

          </div>

          <!-- Description -->

          <div class="sm:col-span-2">

            <label
              class="mb-1.5 block text-[9px] font-medium
                     uppercase tracking-[0.08em] text-slate-500"
            >
              Description
            </label>

            <textarea
              v-model="item.description"
              rows="4"
              placeholder="Briefly describe your responsibilities, achievements or role..."
              class="w-full resize-none rounded-lg border
                     border-white/7 bg-white/[0.025]
                     px-3 py-2.5 text-xs leading-5
                     text-slate-200 outline-none
                     placeholder:text-slate-700
                     focus:border-violet-400/30
                     focus:bg-violet-400/[0.025]
                     focus:ring-2 focus:ring-violet-400/5"
            />

          </div>

        </div>

      </div>

      <!-- Empty -->

      <div
        v-if="!experiences.length"
        class="rounded-xl border border-dashed
               border-white/10 p-6 text-center"
      >
        <BriefcaseBusiness
          :size="24"
          class="mx-auto text-slate-700"
        />

        <p class="mt-2 text-xs text-slate-500">
          No professional experience added yet.
        </p>

        <button
          type="button"
          @click="addExperience"
          class="mt-3 text-[10px] font-medium
                 text-violet-400 hover:text-violet-300"
        >
          + Add your first experience
        </button>
      </div>

    </div>
  </section>
</template>