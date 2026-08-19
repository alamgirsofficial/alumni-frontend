<script setup>
import {
  User,
  Calendar,
  VenusAndMars,
  Droplets,
  Globe2,
  MapPin,
  CreditCard,
  Heart,
} from "@lucide/vue";

import ProfileSectionHeader from "@/components/common/ProfileSectionHeader.vue";

defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <section
    class="rounded-2xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl sm:p-6"
  >
    <ProfileSectionHeader
      kicker="Personal"
      title="Personal Information"
      description="Update your basic personal details"
      icon="User"
      icon-class="bg-blue-500/10 text-blue-400"
    />

    <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

      <!-- Full Name -->

      <div class="sm:col-span-2">
        <label class="form-label">
          Full Name
        </label>

        <div class="relative">
          <User class="form-icon" :size="14" />

          <input
            v-model="modelValue.fullName"
            type="text"
            class="form-input pl-10"
            placeholder="Enter your full name"
          />
        </div>
      </div>

      <!-- Father -->

      <div>
        <label class="form-label">
          Father Name
        </label>

        <input
          v-model="modelValue.father_name"
          type="text"
          class="form-input"
          placeholder="Father name"
        />
      </div>

      <!-- Mother -->

      <div>
        <label class="form-label">
          Mother Name
        </label>

        <input
          v-model="modelValue.mother_name"
          type="text"
          class="form-input"
          placeholder="Mother name"
        />
      </div>

      <!-- DOB -->

      <div>
        <label class="form-label">
          Date of Birth
        </label>

        <div class="relative">
          <Calendar class="form-icon" :size="14" />

          <input
            v-model="modelValue.dateOfBirth"
            type="text"
            class="form-input pl-10"
          />
        </div>
      </div>

      <!-- Gender -->

      <div>
        <label class="form-label">
          Gender
        </label>

        <div class="relative">
          <VenusAndMars class="form-icon" :size="14" />

          <select
    v-model="modelValue.gender"
    class="form-input appearance-none pl-10"
>
    <option
        value=""
        class="bg-slate-900 text-slate-400"
    >
        Select gender
    </option>

    <option
        value="Male"
        class="bg-slate-900 text-slate-200"
    >
        Male
    </option>

    <option
        value="Female"
        class="bg-slate-900 text-slate-200"
    >
        Female
    </option>

    <option
        value="Other"
        class="bg-slate-900 text-slate-200"
    >
        Other
    </option>
</select>
        </div>
      </div>

      <!-- Blood -->

     <div>
    <label class="mb-2 block text-sm font-medium text-slate-300">
        Blood Group
    </label>

<select
    v-model="modelValue.bloodGroup"
    class="form-input appearance-none "
>
    <option
        value=""
        disabled
        class="bg-slate-900 text-slate-400"
    >
        Select Blood Group
    </option>

    <option
        value="A+ (Positive)"
        class="bg-slate-900 text-slate-200"
    >
        A+ (Positive)
    </option>

    <option
        value="A- (Negative)"
        class="bg-slate-900 text-slate-200"
    >
        A- (Negative)
    </option>

    <option
        value="B+ (Positive)"
        class="bg-slate-900 text-slate-200"
    >
        B+ (Positive)
    </option>

    <option
        value="B- (Negative)"
        class="bg-slate-900 text-slate-200"
    >
        B- (Negative)
    </option>

    <option
        value="AB+ (Positive)"
        class="bg-slate-900 text-slate-200"
    >
        AB+ (Positive)
    </option>

    <option
        value="AB- (Negative)"
        class="bg-slate-900 text-slate-200"
    >
        AB- (Negative)
    </option>

    <option
        value="O+ (Positive)"
        class="bg-slate-900 text-slate-200"
    >
        O+ (Positive)
    </option>

    <option
        value="O- (Negative)"
        class="bg-slate-900 text-slate-200"
    >
        O- (Negative)
    </option>
</select>
</div>

      <!-- Religion -->

      <div>
        <label class="form-label">
          Religion
        </label>

        <div class="relative">
          <Heart class="form-icon" :size="14" />

          <input
            v-model="modelValue.religion"
            type="text"
            class="form-input pl-10"
          />
        </div>
      </div>

      <!-- Marital -->

      <div>
        <label class="form-label">
          Marital Status
        </label>

<select
    v-model="modelValue.maritalStatus"
    class="form-input"
>
    <option
        value=""
        class="bg-slate-900 text-slate-400"
    >
        Select status
    </option>

    <option class="bg-slate-900 text-slate-200">
        Single
    </option>

    <option class="bg-slate-900 text-slate-200">
        Married
    </option>

    <option class="bg-slate-900 text-slate-200">
        Divorced
    </option>

    <option class="bg-slate-900 text-slate-200">
        Widowed
    </option>
</select>
      </div>

      <!-- Nationality -->

      <div>
        <label class="form-label">
          Nationality
        </label>

        <div class="relative">
          <Globe2 class="form-icon" :size="14" />

          <input
            v-model="modelValue.nationality"
            type="text"
            class="form-input pl-10"
          />
        </div>
      </div>

      <!-- NID -->

      <div>
        <label class="form-label">
          NID Number
        </label>

        <div class="relative">
          <CreditCard class="form-icon" :size="14" />

          <input
            v-model="modelValue.nid"
            type="text"
            class="form-input pl-10"
          />
        </div>
      </div>

      <!-- Address -->

      <div class="sm:col-span-2">
        <label class="form-label">
          Permanent Address
        </label>

        <div class="relative">
          <MapPin class="absolute left-3 top-3.5 text-slate-600" :size="14" />

          <textarea
            v-model="modelValue.permanentAddress"
            rows="3"
            class="form-input resize-none pl-10"
            placeholder="Enter permanent address"
          />
        </div>
      </div>

    </div>
  </section>
</template>