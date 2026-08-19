<script setup>
import { ref } from "vue";
import {
  ShieldCheck,
  Globe2,
  Users,
  LockKeyhole,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Droplets,
  Church,
  Heart,
  Fingerprint,
  FileText,
  Check,
} from "@lucide/vue";

const props = defineProps({
  profile: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update"]);

const visibility = ref(
  props.profile.privacy?.profileVisibility ?? "members"
);

const fields = ref({
  email: props.profile.privacy?.fields?.email ?? true,
  phone: props.profile.privacy?.fields?.phone ?? true,
  dateOfBirth: props.profile.privacy?.fields?.dateOfBirth ?? false,
  address: props.profile.privacy?.fields?.address ?? false,
  bloodGroup: props.profile.privacy?.fields?.bloodGroup ?? false,
  religion: props.profile.privacy?.fields?.religion ?? false,
  maritalStatus: props.profile.privacy?.fields?.maritalStatus ?? false,
  nid: props.profile.privacy?.fields?.nid ?? false,
});

const cv = ref({
  email: props.profile.privacy?.cv?.email ?? true,
  phone: props.profile.privacy?.cv?.phone ?? true,
  address: props.profile.privacy?.cv?.address ?? false,
  education: props.profile.privacy?.cv?.education ?? true,
  professional: props.profile.privacy?.cv?.professional ?? true,
  skills: props.profile.privacy?.cv?.skills ?? true,
});

const fieldItems = [
  {
    key: "email",
    label: "Email Address",
    description: "Allow other members to see your email",
    icon: Mail,
    color: "blue",
  },
  {
    key: "phone",
    label: "Phone Number",
    description: "Allow other members to see your phone number",
    icon: Phone,
    color: "cyan",
  },
  {
    key: "dateOfBirth",
    label: "Date of Birth",
    description: "Show your date of birth on your profile",
    icon: Calendar,
    color: "violet",
  },
  {
    key: "address",
    label: "Address",
    description: "Show your permanent address",
    icon: MapPin,
    color: "amber",
  },
  {
    key: "bloodGroup",
    label: "Blood Group",
    description: "Show your blood group",
    icon: Droplets,
    color: "red",
  },
  {
    key: "religion",
    label: "Religion",
    description: "Show your religion",
    icon: Church,
    color: "sky",
  },
  {
    key: "maritalStatus",
    label: "Marital Status",
    description: "Show your marital status",
    icon: Heart,
    color: "pink",
  },
  {
    key: "nid",
    label: "National ID",
    description: "National ID is always private",
    icon: Fingerprint,
    color: "slate",
    disabled: true,
  },
];

const visibilityOptions = [
  {
    value: "public",
    label: "Public",
    description: "Anyone can view your profile",
    icon: Globe2,
  },
  {
    value: "members",
    label: "Members Only",
    description: "Only registered alumni can view your profile",
    icon: Users,
  },
  {
    value: "private",
    label: "Private",
    description: "Only you can view your profile",
    icon: LockKeyhole,
  },
];

const saveSettings = () => {
  emit("update", {
    profileVisibility: visibility.value,
    fields: fields.value,
    cv: cv.value,
  });

  console.log("Privacy settings:", {
    profileVisibility: visibility.value,
    fields: fields.value,
    cv: cv.value,
  });
};
</script>

<template>
  <div class="space-y-6">

    <!-- =====================================================
         PROFILE VISIBILITY
    ====================================================== -->

    <section
      class="
        rounded-2xl
        border border-white/10
        bg-white/[0.025]
        p-5
        backdrop-blur-xl
        sm:p-6
      "
    >
      <div class="flex items-start gap-3">

        <div
          class="
            flex h-10 w-10 shrink-0
            items-center justify-center
            rounded-xl
            bg-blue-500/10
            text-blue-400
          "
        >
          <ShieldCheck :size="18" />
        </div>

        <div>
          <h2 class="text-sm font-semibold text-white">
            Profile Visibility
          </h2>

          <p class="mt-1 text-[10px] text-slate-500">
            Control who can view your alumni profile.
          </p>
        </div>

      </div>

      <div class="mt-6 space-y-3">

        <button
          v-for="option in visibilityOptions"
          :key="option.value"
          type="button"
          @click="visibility = option.value"
          class="
            flex w-full items-center gap-4
            rounded-xl border p-4
            text-left
            transition-all duration-300
          "
          :class="
            visibility === option.value
              ? 'border-blue-400/20 bg-blue-400/[0.06]'
              : 'border-white/5 bg-white/[0.015] hover:border-white/10 hover:bg-white/[0.03]'
          "
        >

          <div
            class="
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-lg
            "
            :class="
              visibility === option.value
                ? 'bg-blue-500/10 text-blue-400'
                : 'bg-white/5 text-slate-500'
            "
          >
            <component
              :is="option.icon"
              :size="16"
            />
          </div>

          <div class="min-w-0 flex-1">

            <p
              class="text-xs font-medium"
              :class="
                visibility === option.value
                  ? 'text-white'
                  : 'text-slate-300'
              "
            >
              {{ option.label }}
            </p>

            <p class="mt-1 text-[10px] text-slate-600">
              {{ option.description }}
            </p>

          </div>

          <div
            class="
              flex h-5 w-5 shrink-0
              items-center justify-center
              rounded-full border
            "
            :class="
              visibility === option.value
                ? 'border-blue-400 bg-blue-500 text-white'
                : 'border-white/10'
            "
          >
            <Check
              v-if="visibility === option.value"
              :size="12"
            />
          </div>

        </button>

      </div>
    </section>

    <!-- =====================================================
         PERSONAL INFORMATION PRIVACY
    ====================================================== -->

    <section
      class="
        rounded-2xl
        border border-white/10
        bg-white/[0.025]
        p-5
        backdrop-blur-xl
        sm:p-6
      "
    >

      <div class="flex items-start gap-3">

        <div
          class="
            flex h-10 w-10 shrink-0
            items-center justify-center
            rounded-xl
            bg-cyan-500/10
            text-cyan-400
          "
        >
          <Users :size="18" />
        </div>

        <div>
          <h2 class="text-sm font-semibold text-white">
            Personal Information
          </h2>

          <p class="mt-1 text-[10px] text-slate-500">
            Choose which information other members can see.
          </p>
        </div>

      </div>

      <div class="mt-6 divide-y divide-white/5">

        <div
          v-for="item in fieldItems"
          :key="item.key"
          class="flex items-center gap-3 py-4 first:pt-0 last:pb-0"
        >

          <div
            class="
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-lg
              bg-white/[0.04]
              text-slate-400
            "
          >
            <component
              :is="item.icon"
              :size="15"
            />
          </div>

          <div class="min-w-0 flex-1">

            <p class="text-xs font-medium text-slate-300">
              {{ item.label }}
            </p>

            <p class="mt-1 text-[10px] text-slate-600">
              {{ item.description }}
            </p>

          </div>

          <button
            type="button"
            :disabled="item.disabled"
            @click="!item.disabled && (fields[item.key] = !fields[item.key])"
            class="
              relative h-5 w-9 shrink-0
              rounded-full
              transition-all duration-300
              disabled:cursor-not-allowed
            "
            :class="
              fields[item.key]
                ? 'bg-blue-500'
                : 'bg-white/10'
            "
          >

            <span
              class="
                absolute top-0.5
                h-4 w-4
                rounded-full
                bg-white
                shadow-sm
                transition-all duration-300
              "
              :class="
                fields[item.key]
                  ? 'left-[18px]'
                  : 'left-0.5'
              "
            />

          </button>

        </div>

      </div>
    </section>

    <!-- =====================================================
         CV PRIVACY
    ====================================================== -->

    <section
      class="
        rounded-2xl
        border border-white/10
        bg-white/[0.025]
        p-5
        backdrop-blur-xl
        sm:p-6
      "
    >

      <div class="flex items-start gap-3">

        <div
          class="
            flex h-10 w-10 shrink-0
            items-center justify-center
            rounded-xl
            bg-violet-500/10
            text-violet-400
          "
        >
          <FileText :size="18" />
        </div>

        <div>
          <h2 class="text-sm font-semibold text-white">
            CV Export Settings
          </h2>

          <p class="mt-1 text-[10px] text-slate-500">
            Choose what information can appear on your exported CV.
          </p>
        </div>

      </div>

      <div class="mt-6 divide-y divide-white/5">

        <div
          v-for="(value, key) in cv"
          :key="key"
          class="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
        >

          <div>
            <p class="text-xs font-medium capitalize text-slate-300">
              {{ key }}
            </p>

            <p class="mt-1 text-[10px] text-slate-600">
              Include this information in your CV
            </p>
          </div>

          <button
            type="button"
            @click="cv[key] = !cv[key]"
            class="
              relative h-5 w-9 shrink-0
              rounded-full
              transition-all duration-300
            "
            :class="
              value
                ? 'bg-violet-500'
                : 'bg-white/10'
            "
          >

            <span
              class="
                absolute top-0.5
                h-4 w-4
                rounded-full
                bg-white
                shadow-sm
                transition-all duration-300
              "
              :class="
                value
                  ? 'left-[18px]'
                  : 'left-0.5'
              "
            />

          </button>

        </div>

      </div>
    </section>

    <!-- =====================================================
         SAVE
    ====================================================== -->

    <div class="flex justify-end">

      <button
        type="button"
        @click="saveSettings"
        class="
          inline-flex items-center justify-center
          gap-2 rounded-xl
          bg-linear-to-r
          from-blue-500
          to-cyan-400
          px-5 py-2.5
          text-xs font-semibold
          text-white
          shadow-lg shadow-blue-500/20
          transition-all duration-300
          hover:-translate-y-0.5
          hover:shadow-blue-500/30
        "
      >
        <ShieldCheck :size="15" />

        Save Privacy Settings
      </button>

    </div>

  </div>
</template>