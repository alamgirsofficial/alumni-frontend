<script setup>
import {
  GraduationCap,
  Plus,
  Trash2,
  Calendar,
  Building2,
  Award,
} from "@lucide/vue";

import ProfileSectionHeader from "@/components/common/ProfileSectionHeader.vue";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);

const addEducation = () => {
  emit("update:modelValue",[
    ...props.modelValue,
  { 
    id: Date.now(),
    degree: "",
    institution: "",
    field: "",
    startYear: "",
    endYear: "",
    result: "",
  },
]);
};

const removeEducation = (index) => {
  emit( 
    "update:modelValue",
    props.modelValue.filter((_,i)=>i !==index)
  );
};
</script>

<template>
  <section
    class="rounded-2xl border border-white/10 bg-white/3
           p-5 backdrop-blur-xl transition-all duration-300
           hover:border-white/15 sm:p-6"
  >
    <!-- =====================================================
         HEADER
    ====================================================== -->

    <div class="flex items-start justify-between gap-4">
      <ProfileSectionHeader
        kicker="Academic"
        title="Education"
        description="Add your academic background and qualifications"
        icon="GraduationCap"
        icon-class="bg-cyan-500/10 text-cyan-400"
      />

   
    </div>

    <!-- =====================================================
         EDUCATION LIST
    ====================================================== -->

    <div class="mt-6 space-y-4">

      <!-- Education Item -->

      <div
        v-for="(item, index) in modelValue"
        :key="item.id"
        class="group rounded-xl border border-white/5
               bg-white/2 p-4
               transition-all duration-300
               hover:border-cyan-400/10
               hover:bg-cyan-400/2"
      >

        <!-- Item Header -->

        <div class="mb-5 flex items-center justify-between gap-3">

          <div class="flex items-center gap-2">

            <div
              class="flex h-8 w-8 items-center justify-center
                     rounded-lg bg-cyan-400/10 text-cyan-400"
            >
              <GraduationCap :size="15" />
            </div>

            <div>
              <p class="text-xs font-semibold text-slate-200">
                Education {{ index + 1 }}
              </p>

              <p class="text-[9px] text-slate-600">
                Academic qualification
              </p>
            </div>

          </div>

          <!-- Remove -->

          <button
            v-if="modelValue.length > 1"
            type="button"
            @click="removeEducation(index)"
           class="inline-flex items-center justify-center gap-2 rounded-lg border border-red-400/10 bg-red-400/5 px-3 py-2 text-xs font-medium text-red-400 transition hover:border-red-400/20 hover:bg-red-400/50"
          >
            <Trash2 :size="14" />
            Remove
          </button>

        </div>

        <!-- Fields -->

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">

          <!-- Degree -->

          <div class="sm:col-span-2">
            <label
              class="mb-1.5 block text-[9px] font-medium
                     uppercase tracking-[0.08em] text-slate-500"
            >
              Degree / Qualification
            </label>

            <div class="relative">
              <GraduationCap
                :size="14"
                class="pointer-events-none absolute left-3 top-1/2
                       -translate-y-1/2 text-slate-600"
              />

              <input
                v-model="item.degree"
                type="text"
                placeholder="e.g. Bachelor of Science in Computer Science"
                class="w-full rounded-lg border border-white/7
                       bg-white/3 py-2.5 pl-9 pr-3
                       text-xs text-slate-200 outline-none
                       placeholder:text-slate-700
                       transition-all duration-200
                       focus:border-cyan-400/30
                       focus:bg-cyan-400/3
                       focus:ring-2 focus:ring-cyan-400/5"
              />
            </div>
          </div>

          <!-- Institution -->

          <div>
            <label
              class="mb-1.5 block text-[9px] font-medium
                     uppercase tracking-[0.08em] text-slate-500"
            >
              Institution
            </label>

            <div class="relative">
              <Building2
                :size="14"
                class="pointer-events-none absolute left-3 top-1/2
                       -translate-y-1/2 text-slate-600"
              />

              <input
                v-model="item.institution"
                type="text"
                placeholder="University / College"
                class="w-full rounded-lg border border-white/7
                       bg-white/3 py-2.5 pl-9 pr-3
                       text-xs text-slate-200 outline-none
                       placeholder:text-slate-700
                       focus:border-cyan-400/30
                       focus:bg-cyan-400/3
                       focus:ring-2 focus:ring-cyan-400/5"
              />
            </div>
          </div>

          <!-- Field -->

          <div>
            <label
              class="mb-1.5 block text-[9px] font-medium
                     uppercase tracking-[0.08em] text-slate-500"
            >
              Field of Study
            </label>

            <input
              v-model="item.field"
              type="text"
              placeholder="e.g. Computer Science"
              class="w-full rounded-lg border border-white/7
                     bg-white/3 px-3 py-2.5
                     text-xs text-slate-200 outline-none
                     placeholder:text-slate-700
                     focus:border-cyan-400/30
                     focus:bg-cyan-400/3
                     focus:ring-2 focus:ring-cyan-400/5"
            />
          </div>

          <!-- Start Year -->

          <div>
            <label
              class="mb-1.5 block text-[9px] font-medium
                     uppercase tracking-[0.08em] text-slate-500"
            >
              Start Year
            </label>

            <div class="relative">
              <Calendar
                :size="14"
                class="pointer-events-none absolute left-3 top-1/2
                       -translate-y-1/2 text-slate-600"
              />

              <input
                v-model="item.startYear"
                type="text"
                placeholder="2012"
                class="w-full rounded-lg border border-white/7
                       bg-white/3 py-2.5 pl-9 pr-3
                       text-xs text-slate-200 outline-none
                       placeholder:text-slate-700
                       focus:border-cyan-400/30
                       focus:ring-2 focus:ring-cyan-400/5"
              />
            </div>
          </div>

          <!-- End Year -->

          <div>
            <label
              class="mb-1.5 block text-[9px] font-medium
                     uppercase tracking-[0.08em] text-slate-500"
            >
              End Year
            </label>

            <div class="relative">
              <Calendar
                :size="14"
                class="pointer-events-none absolute left-3 top-1/2
                       -translate-y-1/2 text-slate-600"
              />

              <input
                v-model="item.endYear"
                type="text"
                placeholder="2016"
                class="w-full rounded-lg border border-white/7
                       bg-white/3 py-2.5 pl-9 pr-3
                       text-xs text-slate-200 outline-none
                       placeholder:text-slate-700
                       focus:border-cyan-400/30
                       focus:ring-2 focus:ring-cyan-400/5"
              />
            </div>
          </div>

          <!-- Result -->

          <div class="sm:col-span-2">
            <label
              class="mb-1.5 block text-[9px] font-medium
                     uppercase tracking-[0.08em] text-slate-500"
            >
              Result / Achievement
            </label>

            <div class="relative">
              <Award
                :size="14"
                class="pointer-events-none absolute left-3 top-1/2
                       -translate-y-1/2 text-slate-600"
              />

              <input
                v-model="item.result"
                type="text"
                placeholder="e.g. CGPA 3.65 / 4.00"
                class="w-full rounded-lg border border-white/7
                       bg-white/3 py-2.5 pl-9 pr-3
                       text-xs text-slate-200 outline-none
                       placeholder:text-slate-700
                       focus:border-cyan-400/30
                       focus:ring-2 focus:ring-cyan-400/5"
              />
            </div>
          </div>

        </div>
      </div>

      <!-- Empty -->

      <div
        v-if="!modelValue.length"
        class="rounded-xl border border-dashed
               border-white/10 p-6 text-center"
      >
        <GraduationCap
          :size="24"
          class="mx-auto text-slate-700"
        />

        <p class="mt-2 text-xs text-slate-500">
          No education added yet.
        </p>

        <button
          type="button"
          @click="addEducation"
          class="mt-3 text-[10px] font-medium text-cyan-400
                 hover:text-cyan-300"
        >
          + Add your first education
        </button>
      </div>

    </div>
     
      <!-- Add More -->
    <button
      type="button"
      @click="addEducation"
      class="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-violet-400/20 bg-violet-400/5 px-4 py-3 text-sm font-medium text-violet-300 transition hover:border-violet-400/30 hover:bg-violet-400/10"
    >
      <Plus :size="17" />
      Add More Education info
    </button>
  </section>
</template>