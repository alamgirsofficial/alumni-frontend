<script setup>
import { reactive, ref } from "vue";
import { useRouter, RouterLink } from "vue-router";

import {
  Users,
  UserRound,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  Info,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from "@lucide/vue";

import { login } from "@/constants/auth.js";

const router = useRouter();

/*
|--------------------------------------------------------------------------
| Form
|--------------------------------------------------------------------------
*/

const form = reactive({
  email: "",
  password: "",
  remember: false,
});

/*
|--------------------------------------------------------------------------
| State
|--------------------------------------------------------------------------
*/

const error = ref("");
const isSubmitting = ref(false);
const showPassword = ref(false);

/*
|--------------------------------------------------------------------------
| Demo Credentials
|--------------------------------------------------------------------------
*/

const demoCredentials = {
  email: "user@alumni.com",
  password: "12345678",
};

/*
|--------------------------------------------------------------------------
| Fill Demo Credentials
|--------------------------------------------------------------------------
*/

const fillDemoCredentials = () => {
  form.email = demoCredentials.email;
  form.password = demoCredentials.password;
  error.value = "";
};

/*
|--------------------------------------------------------------------------
| Login
|--------------------------------------------------------------------------
*/

const handleLogin = async () => {
  error.value = "";

  if (!form.email.trim()) {
    error.value = "Email or registration number is required.";
    return;
  }

  if (!form.password) {
    error.value = "Password is required.";
    return;
  }

  isSubmitting.value = true;

  try {
    const result = login(form.email.trim(), form.password);

    if (!result.success) {
      error.value = result.message;
      return;
    }

    await router.push({
      name: "dashboard",
    });
  } catch (err) {
    console.error("Login error:", err);

    error.value = "Something went wrong. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div
    class="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8"
  >
    <!-- =====================================================
             BACKGROUND
        ====================================================== -->

    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <!-- Blue Glow -->
      <div
        class="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl"
      ></div>

      <!-- Cyan Glow -->
      <div
        class="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl"
      ></div>

      <!-- Center Glow -->
      <div
        class="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl"
      ></div>

      <!-- Grid -->
      <div
        class="absolute inset-0 opacity-[0.025]"
        style="
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.8) 1px,
              transparent 1px
            );
          background-size: 40px 40px;
        "
      ></div>
    </div>

    <!-- =====================================================
             MAIN CONTENT
        ====================================================== -->

    <div
      class="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/4 shadow-2xl shadow-black/40 backdrop-blur-2xl lg:grid-cols-2"
    >
      <!-- =================================================
                 LEFT SIDE
            ================================================== -->

      <div
        class="relative hidden overflow-hidden bg-linear-to-br from-blue-600/20 via-slate-900/40 to-cyan-500/10 p-10 lg:flex lg:flex-col lg:justify-between xl:p-12"
      >
        <!-- Decorative Circle -->
        <div
          class="absolute -right-24 -top-24 h-64 w-64 rounded-full border border-blue-400/10"
        ></div>

        <div
          class="absolute -bottom-32 -left-20 h-72 w-72 rounded-full border border-cyan-400/10"
        ></div>

        <!-- Brand -->
        <div class="relative">
          <div
            class="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-cyan-400 shadow-xl shadow-blue-500/20"
          >
            <Users :size="28" :stroke-width="1.8" />
          </div>

          <p
            class="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400"
          >
            Alumni Management
          </p>

          <h1
            class="max-w-md text-4xl font-bold leading-tight tracking-tight xl:text-5xl"
          >
            Stay connected with your
            <span
              class="bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"
            >
              alumni community.
            </span>
          </h1>

          <p class="mt-6 max-w-md text-sm leading-7 text-slate-400">
            Connect with classmates, discover events, share experiences and stay
            updated with your alumni network.
          </p>
        </div>

        <!-- Features -->
        <div class="relative mt-10 space-y-4">
          <div class="flex items-center gap-3">
            <div
              class="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400"
            >
              <CheckCircle2 :size="18" />
            </div>

            <span class="text-sm text-slate-300">
              Manage your alumni profile
            </span>
          </div>

          <div class="flex items-center gap-3">
            <div
              class="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400"
            >
              <CheckCircle2 :size="18" />
            </div>

            <span class="text-sm text-slate-300">
              Connect with fellow members
            </span>
          </div>

          <div class="flex items-center gap-3">
            <div
              class="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400"
            >
              <CheckCircle2 :size="18" />
            </div>

            <span class="text-sm text-slate-300">
              Stay updated with events
            </span>
          </div>
        </div>

        <!-- Security -->
        <div
          class="relative mt-10 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
        >
          <ShieldCheck :size="20" class="shrink-0 text-emerald-400" />

          <div>
            <p class="text-xs font-semibold text-white">Secure Access</p>

            <p class="mt-0.5 text-[11px] text-slate-500">
              Your account information stays protected.
            </p>
          </div>
        </div>
      </div>

      <!-- =================================================
                 RIGHT SIDE - LOGIN
            ================================================== -->

      <div class="p-6 sm:p-8 md:p-10 xl:p-12">
        <!-- Mobile Brand -->
        <div class="mb-8 flex items-center justify-center lg:hidden">
          <div
            class="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/20"
          >
            <Users :size="27" :stroke-width="1.8" />
          </div>
        </div>

        <!-- Header -->
        <div class="mb-8 text-center lg:text-left">
          <div
            class="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/10 bg-blue-500/5 px-3 py-1.5"
          >
            <Sparkles :size="13" class="text-cyan-400" />

            <span class="text-[11px] font-medium text-blue-300">
              Welcome back
            </span>
          </div>

          <h2 class="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Sign in to your account
          </h2>

          <p class="mt-2 text-sm leading-6 text-slate-400">
            Enter your credentials to continue to your alumni dashboard.
          </p>
        </div>

        <!-- =================================================
                     ERROR
                ================================================== -->

        <div
          v-if="error"
          class="mb-5 flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-500/5 px-4 py-3"
        >
          <Info :size="18" class="mt-0.5 shrink-0 text-red-400" />

          <p class="text-xs leading-5 text-red-300">
            {{ error }}
          </p>
        </div>

        <!-- =================================================
                     FORM
                ================================================== -->

        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Email / Registration -->
          <div>
            <label
              for="email"
              class="mb-2 block text-sm font-medium text-slate-200"
            >
              Email or Registration Number
            </label>

            <div class="relative">
              <UserRound
                :size="18"
                :stroke-width="1.8"
                class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                id="email"
                v-model="form.email"
                type="text"
                autocomplete="username"
                placeholder="Enter email or registration number"
                class="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400/50 focus:bg-white/[0.07] focus:ring-4 focus:ring-blue-500/10"
                :disabled="isSubmitting"
              />
            </div>
          </div>

          <!-- Password -->
          <div>
            <div class="mb-2 flex items-center justify-between">
              <label for="password" class="text-sm font-medium text-slate-200">
                Password
              </label>

              <RouterLink
                :to="{ name: 'ForgotPassword' }"
                class="text-xs font-medium text-blue-400 transition hover:text-blue-300"
              >
                Forgot password?
              </RouterLink>
            </div>

            <div class="relative">
              <LockKeyhole
                :size="18"
                :stroke-width="1.8"
                class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                placeholder="Enter your password"
                class="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400/50 focus:bg-white/[0.07] focus:ring-4 focus:ring-blue-500/10"
                :disabled="isSubmitting"
              />

              <button
                type="button"
                aria-label="Toggle password visibility"
                class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
                @click="showPassword = !showPassword"
              >
                <Eye v-if="!showPassword" :size="18" />

                <EyeOff v-else :size="18" />
              </button>
            </div>
          </div>

          <!-- Remember -->
          <div class="flex items-center">
            <input
              id="remember"
              v-model="form.remember"
              type="checkbox"
              class="h-4 w-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/30"
              :disabled="isSubmitting"
            />

            <label for="remember" class="ml-2 text-xs text-slate-400">
              Remember me
            </label>
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            :disabled="isSubmitting"
            class="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-500 to-cyan-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:from-blue-600 hover:to-cyan-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span v-if="isSubmitting"> Signing in... </span>

            <template v-else>
              <span> Sign In </span>

              <ArrowRight :size="17" />
            </template>
          </button>
        </form>

        <!-- =================================================
                     DEMO LOGIN
                ================================================== -->

        <div
          class="mt-6 rounded-2xl border border-blue-400/10 bg-linear-to-br from-blue-500/5 to-cyan-500/5 p-4"
        >
          <!-- Header -->
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-3">
              <div
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400"
              >
                <Info :size="18" />
              </div>

              <div>
                <h3 class="text-sm font-semibold text-white">
                  Demo Dashboard Login
                </h3>

                <p class="mt-0.5 text-xs text-slate-400">
                  For development & preview
                </p>
              </div>
            </div>

            <button
              type="button"
              class="text-xs font-medium text-blue-400 transition hover:text-blue-300"
              @click="fillDemoCredentials"
            >
              Use Demo
            </button>
          </div>

          <!-- Credentials -->
          <div class="mt-3 grid gap-2 sm:grid-cols-2">
            <!-- Email -->
            <button
              type="button"
              class="group rounded-xl border border-white/5 bg-white/3 p-3 text-left transition hover:border-blue-400/20 hover:bg-white/5"
              @click="form.email = demoCredentials.email"
            >
              <p class="mb-1 text-xs uppercase tracking-wider text-slate-400">
                Email
              </p>

              <p
                class="truncate text-xs font-medium text-blue-300 group-hover:text-blue-200"
              >
                user@alumni.com
              </p>
            </button>

            <!-- Password -->
            <button
              type="button"
              class="group rounded-xl border border-white/5 bg-white/3 p-3 text-left transition hover:border-cyan-400/20 hover:bg-white/5"
              @click="form.password = demoCredentials.password"
            >
              <p
                class="mb-1 text-[10px] uppercase tracking-wider text-slate-600"
              >
                Password
              </p>

              <p
                class="text-xs font-medium text-cyan-300 group-hover:text-cyan-200"
              >
                12345678
              </p>
            </button>
          </div>
        </div>

        <!-- =================================================
                     REGISTER
                ================================================== -->

        <div class="mt-6 text-center">
          <p class="text-xs text-slate-500">
            Don't have an account?

            <RouterLink
              :to="{ name: 'register' }"
              class="ml-1 font-semibold text-blue-400 transition hover:text-blue-300"
            >
              Create Account
            </RouterLink>
          </p>
        </div>

        <!-- Divider -->
        <div class="my-6 flex items-center gap-3">
          <div class="h-px flex-1 bg-white/10"></div>

          <span class="text-xs uppercase tracking-wider text-slate-400">
            Alumni Management System
          </span>

          <div class="h-px flex-1 bg-white/10"></div>
        </div>

        <!-- Footer -->
        <div class="text-center">
          <p class="text-xs text-slate-400">
            © {{ new Date().getFullYear() }}
            Alumni Management System
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
