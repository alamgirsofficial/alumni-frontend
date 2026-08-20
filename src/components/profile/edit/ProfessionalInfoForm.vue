<script setup>
import {
  BriefcaseBusiness,
  Building2,
  MapPin,
  Clock3,
  CalendarDays,
  Plus,
  Trash2,
} from "@lucide/vue";

import ProfileSectionHeader from "@/components/common/ProfileSectionHeader.vue";

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

/*
|--------------------------------------------------------------------------
| Create Empty Experience
|--------------------------------------------------------------------------
*/

const createExperience = () => ({
  id: Date.now(),
  position: "",
  company: "",
  industry: "",
  location: "",
  employmentType: "Full Time",
  startDate: "",
  endDate: "",
  isCurrent: false,
  description: "",
});

/*
|--------------------------------------------------------------------------
| Add Experience
|--------------------------------------------------------------------------
*/

const addExperience = () => {
  emit("update:modelValue", [...props.modelValue, createExperience()]);
};

/*
|--------------------------------------------------------------------------
| Remove Experience
|--------------------------------------------------------------------------
*/

const removeExperience = (index) => {
  const updatedExperiences = props.modelValue.filter((_, i) => i !== index);

  emit("update:modelValue", updatedExperiences);
};

/*
|--------------------------------------------------------------------------
| Update Experience
|--------------------------------------------------------------------------
*/

const updateExperience = (index, field, value) => {
  const updatedExperiences = props.modelValue.map((experience, i) => {
    if (i !== index) {
      return experience;
    }

    return {
      ...experience,
      [field]: value,
    };
  });

  emit("update:modelValue", updatedExperiences);
};

/*
|--------------------------------------------------------------------------
| Current Job Toggle
|--------------------------------------------------------------------------
*/

const toggleCurrent = (index, value) => {
  const updatedExperiences = props.modelValue.map((experience, i) => {
    if (i !== index) {
      return experience;
    }

    return {
      ...experience,
      isCurrent: value,
      endDate: value ? "" : experience.endDate,
    };
  });

  emit("update:modelValue", updatedExperiences);
};
</script>

<template>
  <section
    class="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur-xl sm:p-6"
  >
    <!-- Section Header -->
    <ProfileSectionHeader
      kicker="Career"
      title="Professional Experience"
      description="Add your professional journey and work experience"
      icon="BriefcaseBusiness"
      icon-class="bg-violet-500/10 text-violet-400"
    />

    <!-- Experiences -->
    <div class="mt-6 space-y-6">
      <div
        v-for="(experience, index) in modelValue"
        :key="experience.id"
        class="relative rounded-2xl border border-white/10 bg-white/2 p-5"
      >
        <!-- Experience Header -->
        <div
          class="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div class="flex items-center gap-3">
            <div
              class="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400"
            >
              <BriefcaseBusiness :size="18" />
            </div>

            <div>
              <h3 class="text-sm font-semibold text-slate-200">
                Experience {{ index + 1 }}
              </h3>

              <p class="text-xs text-slate-500">
                Professional career information
              </p>
            </div>
          </div>

          <!-- Remove -->
          <button
            v-if="modelValue.length > 1"
            type="button"
            @click="removeExperience(index)"
            class="inline-flex items-center justify-center gap-2 rounded-lg border border-red-400/10 bg-red-400/5 px-3 py-2 text-xs font-medium text-red-400 transition hover:border-red-400/20 hover:bg-red-400/50"
          >
            <Trash2 :size="14" />
            Remove
          </button>
        </div>

        <!-- Fields -->
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <!-- Position -->
          <div>
            <label class="form-label"> Current Position </label>

            <input
              :value="experience.position"
              @input="updateExperience(index, 'position', $event.target.value)"
              type="text"
              class="form-input"
              placeholder="Senior Software Engineer"
            />
          </div>

          <!-- Company -->
          <div>
            <label class="form-label"> Company </label>

            <div class="relative">
              <Building2 class="form-icon" :size="14" />

              <input
                :value="experience.company"
                @input="updateExperience(index, 'company', $event.target.value)"
                type="text"
                class="form-input pl-10"
                placeholder="Company name"
              />
            </div>
          </div>

          <!-- Industry -->
          <div>
            <label class="form-label"> Industry </label>

            <input
              :value="experience.industry"
              @input="updateExperience(index, 'industry', $event.target.value)"
              type="text"
              class="form-input"
              placeholder="Software & Technology"
            />
          </div>

          <!-- Location -->
          <div>
            <label class="form-label"> Work Location </label>

            <div class="relative">
              <MapPin class="form-icon" :size="14" />

              <input
                :value="experience.location"
                @input="
                  updateExperience(index, 'location', $event.target.value)
                "
                type="text"
                class="form-input pl-10"
                placeholder="Dhaka, Bangladesh"
              />
            </div>
          </div>

          <!-- Employment Type -->
          <div>
            <label class="form-label"> Employment Type </label>

            <div class="relative">
              <Clock3 class="form-icon" :size="14" />

              <select
                :value="experience.employmentType"
                @change="
                  updateExperience(index, 'employmentType', $event.target.value)
                "
                class="form-input appearance-none pl-10"
              >
                <option value="Full Time" class="bg-slate-900 text-slate-200">Full Time</option>

                <option value="Part Time" class="bg-slate-900 text-slate-200">Part Time</option>

                <option value="Contract" class="bg-slate-900 text-slate-200">Contract</option>

                <option value="Freelance" class="bg-slate-900 text-slate-200">Freelance</option>

                <option value="Internship" class="bg-slate-900 text-slate-200">Internship</option>
              </select>
            </div>
          </div>

          <!-- Start Date -->
          <div>
            <label class="form-label"> Start Date </label>

            <div class="relative">
              <CalendarDays class="form-icon" :size="14" />

              <input
                :value="experience.startDate"
                @input="
                  updateExperience(index, 'startDate', $event.target.value)
                "
                type="text"
                class="form-input pl-10"
                placeholder="January 2022"
              />
            </div>
          </div>

          <!-- End Date -->
          <div>
            <label class="form-label"> End Date </label>

            <div class="relative">
              <CalendarDays class="form-icon" :size="14" />

              <input
                :value="experience.endDate"
                @input="updateExperience(index, 'endDate', $event.target.value)"
                type="text"
                class="form-input pl-10"
                :disabled="experience.isCurrent"
                :placeholder="
                  experience.isCurrent ? 'Present' : 'December 2021'
                "
              />
            </div>
          </div>

          <!-- Current Job -->
          <div class="flex items-end">
            <label
              class="flex cursor-pointer items-center gap-3 rounded-xl border border-white/5 bg-white/2 px-4 py-3"
            >
              <input
                type="checkbox"
                :checked="experience.isCurrent"
                @change="toggleCurrent(index, $event.target.checked)"
                class="h-4 w-4 rounded border-white/20 bg-white/5 text-violet-500 focus:ring-violet-500/30"
              />

              <span class="text-sm text-slate-300">
                Currently working here
              </span>
            </label>
          </div>

          <!-- Description -->
          <div class="sm:col-span-2">
            <label class="form-label"> Description </label>

            <textarea
              :value="experience.description"
              @input="
                updateExperience(index, 'description', $event.target.value)
              "
              rows="4"
              class="form-input resize-none"
              placeholder="Describe your responsibilities, achievements, and work..."
            ></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-if="!modelValue.length"
      class="mt-6 rounded-xl border border-dashed border-white/10 p-6 text-center"
    >
      <BriefcaseBusiness :size="24" class="mx-auto text-slate-600" />

      <p class="mt-2 text-sm text-slate-400">
        No professional experience added yet.
      </p>
    </div>

    <!-- Add More -->
    <button
      type="button"
      @click="addExperience"
      class="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-violet-400/20 bg-violet-400/5 px-4 py-3 text-sm font-medium text-violet-300 transition hover:border-violet-400/30 hover:bg-violet-400/10"
    >
      <Plus :size="17" />
      Add More Experience
    </button>
  </section>
</template>
