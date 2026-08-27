<script setup>
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "@/composables/useToast.js";
const { warning, success, error } = useToast();


import {
  ArrowLeft,
  UserPlus,
  Save,
  User,
  Mail,
  Phone,
  GraduationCap,
  ShieldCheck,
  LockKeyhole,
  Copy,
  Check,
  Info,
} from "@lucide/vue";

const router = useRouter();

const loading = ref(false);
const copied = ref(false);

const form = reactive({
  name: "",
  email: "",
  phone: "",
  batch: "",
  password: "",
  status: "active",
});

const errors = reactive({
  name: "",
  email: "",
  phone: "",
  batch: "",
  password: "",
});

/* ============================================================
   Theme
============================================================ */

const theme = {
  primary: "blue",
  secondary: "cyan",
};

/* ============================================================
   Batch Options
============================================================ */

const currentYear = new Date().getFullYear();

const batches = computed(() => {
  const years = [];

  for (let year = 1989; year <= currentYear; year++) {
    years.push(year);
  }

  return years.reverse();
});

/* ============================================================
   Registration Serial
============================================================ */

const getNextSerial = () => {
  const alumni = JSON.parse(localStorage.getItem("alumni") || "[]");

  if (!Array.isArray(alumni) || alumni.length === 0) {
    return 1;
  }

  const serials = alumni
    .map((item) => Number(item.registration_serial))
    .filter((serial) => Number.isInteger(serial) && serial > 0);

  if (!serials.length) {
    return alumni.length + 1;
  }

  return Math.max(...serials) + 1;
};

/* ============================================================
   Member ID
   Format: ALU-09-0001
============================================================ */

const memberId = computed(() => {
  if (!form.batch) {
    return "ALU-XX-0000";
  }

  const lastTwoDigits = String(form.batch).slice(-2);
  const serial = getNextSerial();

  return `ALU-${lastTwoDigits}-${String(serial).padStart(4, "0")}`;
});

/* ============================================================
   Initials
============================================================ */

const initials = computed(() => {
  if (!form.name.trim()) {
    return "A";
  }

  return form.name
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();
});

/* ============================================================
   Validation
============================================================ */

const validate = () => {
  let valid = true;

  Object.keys(errors).forEach((key) => {
    errors[key] = "";
  });

  if (!form.name.trim()) {
    errors.name = "Full name is required.";
    valid = false;
  }

  if (!form.email.trim()) {
    errors.email = "Email address is required.";
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email address.";
    valid = false;
  }

  if (
    form.phone.trim() &&
    !/^(?:\+?880|0)?1[3-9]\d{8}$/.test(
      form.phone.replace(/[\s-]/g, "")
    )
  ) {
    errors.phone = "Please enter a valid Bangladesh mobile number.";
    valid = false;
  }

  if (!form.batch) {
    errors.batch = "Please select an alumni batch.";
    valid = false;
  }

  if (!form.password) {
    errors.password = "Temporary password is required.";
    valid = false;
  } else if (form.password.length < 6) {
    errors.password =
      "Temporary password must be at least 6 characters.";
    valid = false;
  }

  return valid;
};

/* ============================================================
   Copy Member ID
============================================================ */

const copyMemberId = async () => {
  try {
    await navigator.clipboard.writeText(memberId.value);

    copied.value = true;

    setTimeout(() => {
      copied.value = false;
    }, 1500);
  } catch (error) {
    console.error("Failed to copy member ID:", error);
  }
};

/* ============================================================
   Submit
============================================================ */

const submitForm = () => {
  if (!validate()) {
    warning("Please insert all required information before submitting.");
    return;
  }

  loading.value = true;

  try {
    const alumni = JSON.parse(
      localStorage.getItem("alumni") || "[]"
    );

    const registrationSerial = getNextSerial();

    const newAlumni = {
      id: Date.now(),
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      mobile: form.phone.trim(),
      batch: String(form.batch),
      registration_serial: registrationSerial,
      member_id: `ALU-${String(form.batch).slice(-2)}-${String(
        registrationSerial
      ).padStart(4, "0")}`,
      status: form.status,
      avatar: null,
      profile_completed: false,
      created_at: new Date().toISOString(),
    };

    alumni.push(newAlumni);

    localStorage.setItem(
      "alumni",
      JSON.stringify(alumni)
    );

    success(
      `Alumni account created successfully. Member ID: ${newAlumni.member_id}`
    );

    setTimeout(() => {
      router.push({
        name: "alumni.index",
      });
    }, 700);

  } catch (error) {
    error("Failed to create alumni:", error);

    error(
      "Failed to create alumni account. Please try again."
    );

    loading.value = false;
  }
};

/* ============================================================
   Cancel
============================================================ */

const cancel = () => {
  router.back();
};
</script>

<template>
  <div
    class="min-h-full space-y-6 bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 p-4 md:p-6 lg:p-8"
  >
    <!-- =========================================================
         PAGE HEADER
    ========================================================== -->

    <div
      class="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <!-- Left -->
      <div class="flex items-center gap-3">
        <!-- Back -->
        <button
          type="button"
          @click="cancel"
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 shadow-lg transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400"
        >
          <ArrowLeft :size="20" />
        </button>

        <!-- Title -->
        <div>
          <div class="flex flex-wrap items-center gap-2">
            <h1
              class="text-2xl font-bold tracking-tight text-white"
            >
              Add Alumni
            </h1>

            <span
              class="rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-400"
            >
              New Account
            </span>
          </div>

          <p class="mt-1 text-sm text-slate-400">
            Create a basic alumni account
          </p>
        </div>
      </div>

      <!-- Header Actions -->
      <div class="flex items-center gap-3">
        <button
          type="button"
          @click="cancel"
          class="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-400 transition hover:bg-white/10 hover:text-white"
        >
          Cancel
        </button>

        <button
          type="button"
          @click="submitForm"
          :disabled="loading"
          class="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition duration-200 hover:scale-[1.02] hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save :size="17" />

          <span>
            {{ loading ? "Creating..." : "Create Alumni" }}
          </span>
        </button>
      </div>
    </div>

    <!-- =========================================================
         MAIN FORM
    ========================================================== -->

    <form
      @submit.prevent="submitForm"
      class="mx-auto max-w-7xl"
    >
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <!-- =====================================================
             LEFT CONTENT
        ====================================================== -->

        <div class="space-y-6 lg:col-span-2">
          <!-- ===================================================
               BASIC INFORMATION
          ==================================================== -->

          <div
            class="overflow-hidden rounded-2xl border border-white/10 bg-white/3 shadow-xl shadow-black/10 backdrop-blur-sm"
          >
            <!-- Header -->
            <div
              class="border-b border-white/10 bg-linear-to-r from-blue-500/10 to-cyan-500/5 px-6 py-5"
            >
              <div class="flex items-center gap-3">
                <div
                  class="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/20"
                >
                  <User :size="21" />
                </div>

                <div>
                  <h2 class="font-bold text-white">
                    Basic Information
                  </h2>

                  <p class="mt-0.5 text-sm text-slate-400">
                    Information required to create the alumni account
                  </p>
                </div>
              </div>
            </div>

            <!-- Body -->
            <div class="p-6">
              <div
                class="grid grid-cols-1 gap-5 md:grid-cols-2"
              >
                <!-- Full Name -->
                <div class="md:col-span-2">
                  <label
                    class="mb-2 block text-sm font-semibold text-slate-300"
                  >
                    Full Name
                    <span class="text-red-400">*</span>
                  </label>

                  <div class="relative">
                    <User
                      :size="18"
                      class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      v-model="form.name"
                      type="text"
                      autocomplete="name"
                      placeholder="Enter alumni full name"
                      class="w-full rounded-xl border bg-slate-900/70 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:ring-4"
                      :class="
                        errors.name
                          ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/10'
                          : 'border-white/10 focus:border-blue-500/50 focus:ring-blue-500/10'
                      "
                    />
                  </div>

                  <p
                    v-if="errors.name"
                    class="mt-1.5 text-xs font-medium text-red-400"
                  >
                    {{ errors.name }}
                  </p>
                </div>

                <!-- Email -->
                <div>
                  <label
                    class="mb-2 block text-sm font-semibold text-slate-300"
                  >
                    Email Address
                    <span class="text-red-400">*</span>
                  </label>

                  <div class="relative">
                    <Mail
                      :size="18"
                      class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      v-model="form.email"
                      type="email"
                      autocomplete="email"
                      placeholder="alumni@example.com"
                      class="w-full rounded-xl border bg-slate-900/70 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:ring-4"
                      :class="
                        errors.email
                          ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/10'
                          : 'border-white/10 focus:border-blue-500/50 focus:ring-blue-500/10'
                      "
                    />
                  </div>

                  <p
                    v-if="errors.email"
                    class="mt-1.5 text-xs font-medium text-red-400"
                  >
                    {{ errors.email }}
                  </p>
                </div>

                <!-- Phone -->
                <div>
                  <label
                    class="mb-2 block text-sm font-semibold text-slate-300"
                  >
                    Phone Number

                    <span
                      class="text-xs font-normal text-slate-500"
                    >
                      (Optional)
                    </span>
                  </label>

                  <div class="relative">
                    <Phone
                      :size="18"
                      class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      v-model="form.phone"
                      type="tel"
                      autocomplete="tel"
                      placeholder="+880 1XXXXXXXXX"
                      class="w-full rounded-xl border bg-slate-900/70 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:ring-4"
                      :class="
                        errors.phone
                          ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/10'
                          : 'border-white/10 focus:border-blue-500/50 focus:ring-blue-500/10'
                      "
                    />
                  </div>

                  <p
                    v-if="errors.phone"
                    class="mt-1.5 text-xs font-medium text-red-400"
                  >
                    {{ errors.phone }}
                  </p>
                </div>

                <!-- Batch -->
                <div>
                  <label
                    class="mb-2 block text-sm font-semibold text-slate-300"
                  >
                    Alumni Batch
                    <span class="text-red-400">*</span>
                  </label>

                  <div class="relative">
                    <GraduationCap
                      :size="18"
                      class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <select
                      v-model="form.batch"
                      class="w-full appearance-none rounded-xl border bg-slate-900/70 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:ring-4"
                      :class="
                        errors.batch
                          ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/10'
                          : 'border-white/10 focus:border-blue-500/50 focus:ring-blue-500/10'
                      "
                    >
                      <option
                        value=""
                        class="bg-slate-900"
                      >
                        Select batch
                      </option>

                      <option
                        v-for="batch in batches"
                        :key="batch"
                        :value="batch"
                        class="bg-slate-900"
                      >
                        {{ batch }}
                      </option>
                    </select>
                  </div>

                  <p
                    v-if="errors.batch"
                    class="mt-1.5 text-xs font-medium text-red-400"
                  >
                    {{ errors.batch }}
                  </p>
                </div>

                <!-- Member ID -->
                <div>
                  <label
                    class="mb-2 block text-sm font-semibold text-slate-300"
                  >
                    Member ID
                  </label>

                  <div
                    class="flex h-[46px] items-center justify-between rounded-xl border border-blue-500/20 bg-blue-500/10 px-4"
                  >
                    <span
                      class="font-mono text-sm font-bold tracking-wide text-blue-400"
                    >
                      {{ memberId }}
                    </span>

                    <button
                      type="button"
                      @click="copyMemberId"
                      class="flex h-8 w-8 items-center justify-center rounded-lg text-blue-400 transition hover:bg-blue-500/10 hover:text-cyan-400"
                      title="Copy Member ID"
                    >
                      <Check
                        v-if="copied"
                        :size="16"
                      />

                      <Copy
                        v-else
                        :size="16"
                      />
                    </button>
                  </div>

                  <p class="mt-1.5 text-xs text-slate-500">
                    Automatically generated from batch and registration
                    serial.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- ===================================================
               ACCOUNT SECURITY
          ==================================================== -->

          <div
            class="overflow-hidden rounded-2xl border border-white/10 bg-white/3 shadow-xl shadow-black/10"
          >
            <div
              class="border-b border-white/10 px-6 py-5"
            >
              <div class="flex items-center gap-3">
                <div
                  class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400"
                >
                  <LockKeyhole :size="21" />
                </div>

                <div>
                  <h2 class="font-bold text-white">
                    Account Security
                  </h2>

                  <p class="mt-0.5 text-sm text-slate-400">
                    Set the initial login credentials
                  </p>
                </div>
              </div>
            </div>

            <div class="p-6">
              <label
                class="mb-2 block text-sm font-semibold text-slate-300"
              >
                Temporary Password
                <span class="text-red-400">*</span>
              </label>

              <div class="relative">
                <LockKeyhole
                  :size="18"
                  class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  v-model="form.password"
                  type="text"
                  autocomplete="new-password"
                  placeholder="Enter temporary password"
                  class="w-full rounded-xl border bg-slate-900/70 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:ring-4"
                  :class="
                    errors.password
                      ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/10'
                      : 'border-white/10 focus:border-blue-500/50 focus:ring-blue-500/10'
                  "
                />
              </div>

              <p
                v-if="errors.password"
                class="mt-1.5 text-xs font-medium text-red-400"
              >
                {{ errors.password }}
              </p>

              <p
                v-else
                class="mt-1.5 text-xs text-slate-500"
              >
                The alumni can change this password after logging in.
              </p>
            </div>
          </div>

          <!-- ===================================================
               ACCOUNT STATUS
          ==================================================== -->

          <div
            class="overflow-hidden rounded-2xl border border-white/10 bg-white/3 shadow-xl shadow-black/10"
          >
            <div
              class="border-b border-white/10 px-6 py-5"
            >
              <div class="flex items-center gap-3">
                <div
                  class="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400"
                >
                  <ShieldCheck :size="21" />
                </div>

                <div>
                  <h2 class="font-bold text-white">
                    Account Status
                  </h2>

                  <p class="mt-0.5 text-sm text-slate-400">
                    Control whether this account can access the system
                  </p>
                </div>
              </div>
            </div>

            <div
              class="grid grid-cols-1 gap-3 p-6 sm:grid-cols-3"
            >
              <!-- Active -->
              <label
                class="cursor-pointer rounded-xl border p-4 transition"
                :class="
                  form.status === 'active'
                    ? 'border-emerald-500/30 bg-emerald-500/10'
                    : 'border-white/10 bg-white/2 hover:bg-white/5'
                "
              >
                <div class="flex items-start gap-3">
                  <input
                    v-model="form.status"
                    type="radio"
                    value="active"
                    class="mt-1 accent-emerald-500"
                  />

                  <div>
                    <p
                      class="text-sm font-bold"
                      :class="
                        form.status === 'active'
                          ? 'text-emerald-400'
                          : 'text-slate-300'
                      "
                    >
                      Active
                    </p>

                    <p
                      class="mt-1 text-xs leading-5 text-slate-500"
                    >
                      Alumni can login immediately.
                    </p>
                  </div>
                </div>
              </label>

              <!-- Pending -->
              <label
                class="cursor-pointer rounded-xl border p-4 transition"
                :class="
                  form.status === 'pending'
                    ? 'border-yellow-500/30 bg-yellow-500/10'
                    : 'border-white/10 bg-white/2 hover:bg-white/5'
                "
              >
                <div class="flex items-start gap-3">
                  <input
                    v-model="form.status"
                    type="radio"
                    value="pending"
                    class="mt-1 accent-yellow-500"
                  />

                  <div>
                    <p
                      class="text-sm font-bold"
                      :class="
                        form.status === 'pending'
                          ? 'text-yellow-400'
                          : 'text-slate-300'
                      "
                    >
                      Pending
                    </p>

                    <p
                      class="mt-1 text-xs leading-5 text-slate-500"
                    >
                      Account awaits admin approval.
                    </p>
                  </div>
                </div>
              </label>

              <!-- Inactive -->
              <label
                class="cursor-pointer rounded-xl border p-4 transition"
                :class="
                  form.status === 'inactive'
                    ? 'border-red-500/30 bg-red-500/10'
                    : 'border-white/10 bg-white/2 hover:bg-white/5'
                "
              >
                <div class="flex items-start gap-3">
                  <input
                    v-model="form.status"
                    type="radio"
                    value="inactive"
                    class="mt-1 accent-red-500"
                  />

                  <div>
                    <p
                      class="text-sm font-bold"
                      :class="
                        form.status === 'inactive'
                          ? 'text-red-400'
                          : 'text-slate-300'
                      "
                    >
                      Inactive
                    </p>

                    <p
                      class="mt-1 text-xs leading-5 text-slate-500"
                    >
                      Alumni cannot login.
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- =====================================================
             RIGHT SIDEBAR
        ====================================================== -->

        <div class="space-y-6">
          <!-- ===================================================
               ALUMNI PREVIEW
          ==================================================== -->

          <div
            class="overflow-hidden rounded-2xl border border-white/10 bg-white/3 shadow-xl shadow-black/10"
          >
            <!-- Gradient Header -->
            <div
              class="relative h-28 overflow-hidden bg-linear-to-br from-blue-600 via-blue-500 to-cyan-400"
            >
              <div
                class="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/10"
              ></div>

              <div
                class="absolute -bottom-16 -left-8 h-32 w-32 rounded-full bg-white/10"
              ></div>
            </div>

            <div class="px-6 pb-6">
              <!-- Avatar -->
              <div class="-mt-12 flex justify-center">
                <div
                  class="flex h-24 w-24 items-center justify-center rounded-full border-4 border-slate-900 bg-linear-to-br from-blue-500 to-cyan-500 text-2xl font-bold text-white shadow-xl shadow-blue-500/20"
                >
                  {{ initials }}
                </div>
              </div>

              <!-- Name -->
              <div class="mt-4 text-center">
                <h2 class="text-lg font-bold text-white">
                  {{ form.name || "Alumni Name" }}
                </h2>

                <p class="mt-1 text-sm text-slate-500">
                  Alumni Member
                </p>
              </div>

              <!-- Member ID -->
              <div
                class="mt-5 rounded-xl border border-blue-500/20 bg-blue-500/10 p-4 text-center"
              >
                <p
                  class="text-[11px] font-semibold uppercase tracking-wider text-blue-400"
                >
                  Member ID
                </p>

                <p
                  class="mt-1 font-mono text-lg font-bold tracking-wider text-cyan-400"
                >
                  {{ memberId }}
                </p>
              </div>

              <!-- Preview Info -->
              <div class="mt-5 space-y-3">
                <!-- Email -->
                <div class="flex items-center gap-3">
                  <div
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400"
                  >
                    <Mail :size="16" />
                  </div>

                  <div class="min-w-0">
                    <p
                      class="text-[11px] font-medium text-slate-500"
                    >
                      Email
                    </p>

                    <p
                      class="truncate text-sm font-medium text-slate-300"
                    >
                      {{ form.email || "Not provided" }}
                    </p>
                  </div>
                </div>

                <!-- Phone -->
                <div class="flex items-center gap-3">
                  <div
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400"
                  >
                    <Phone :size="16" />
                  </div>

                  <div class="min-w-0">
                    <p
                      class="text-[11px] font-medium text-slate-500"
                    >
                      Phone
                    </p>

                    <p
                      class="truncate text-sm font-medium text-slate-300"
                    >
                      {{ form.phone || "Not provided" }}
                    </p>
                  </div>
                </div>

                <!-- Batch -->
                <div class="flex items-center gap-3">
                  <div
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400"
                  >
                    <GraduationCap :size="16" />
                  </div>

                  <div>
                    <p
                      class="text-[11px] font-medium text-slate-500"
                    >
                      Batch
                    </p>

                    <p class="text-sm font-medium text-slate-300">
                      {{ form.batch || "Not selected" }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Status -->
              <div
                class="mt-5 border-t border-white/10 pt-5"
              >
                <div
                  class="flex items-center justify-between rounded-xl px-4 py-3"
                  :class="
                    form.status === 'active'
                      ? 'bg-emerald-500/10'
                      : form.status === 'pending'
                        ? 'bg-yellow-500/10'
                        : 'bg-red-500/10'
                  "
                >
                  <span class="text-sm font-semibold text-slate-400">
                    Account Status
                  </span>

                  <span
                    class="inline-flex items-center gap-1.5 text-xs font-bold"
                    :class="
                      form.status === 'active'
                        ? 'text-emerald-400'
                        : form.status === 'pending'
                          ? 'text-yellow-400'
                          : 'text-red-400'
                    "
                  >
                    <span
                      class="h-2 w-2 rounded-full"
                      :class="
                        form.status === 'active'
                          ? 'bg-emerald-500'
                          : form.status === 'pending'
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                      "
                    ></span>

                    {{
                      form.status === "active"
                        ? "Active"
                        : form.status === "pending"
                          ? "Pending"
                          : "Inactive"
                    }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- ===================================================
               INFORMATION
          ==================================================== -->

          <div
            class="rounded-2xl border border-blue-500/20 bg-linear-to-br from-blue-500/10 to-cyan-500/5 p-5"
          >
            <div class="flex gap-3">
              <div
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400"
              >
                <Info :size="18" />
              </div>

              <div>
                <h3 class="text-sm font-bold text-blue-300">
                  What happens next?
                </h3>

                <ul
                  class="mt-3 space-y-2 text-xs leading-5 text-slate-400"
                >
                  <li class="flex gap-2">
                    <span
                      class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500"
                    ></span>

                    <span>
                      A basic alumni account will be created.
                    </span>
                  </li>

                  <li class="flex gap-2">
                    <span
                      class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500"
                    ></span>

                    <span>
                      Member ID will be generated automatically.
                    </span>
                  </li>

                  <li class="flex gap-2">
                    <span
                      class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500"
                    ></span>

                    <span>
                      The alumni can complete the remaining profile after
                      login.
                    </span>
                  </li>

                  <li class="flex gap-2">
                    <span
                      class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500"
                    ></span>

                    <span>
                      Education, experience, skills and social links are not
                      required here.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- =========================================================
           BOTTOM ACTIONS
      ========================================================== -->

      <div
        class="mt-6 flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end"
      >
        <button
          type="button"
          @click="cancel"
          class="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-400 transition hover:bg-white/10 hover:text-white"
        >
          Cancel
        </button>

        <button
          type="submit"
          :disabled="loading"
          class="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-500 to-cyan-500 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition duration-200 hover:scale-[1.01] hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <UserPlus :size="17" />

          {{
            loading
              ? "Creating Alumni..."
              : "Create Alumni Account"
          }}
        </button>
      </div>
    </form>
  </div>
</template>