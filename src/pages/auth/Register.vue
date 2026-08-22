

<template>
    <div
        class="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 px-4 py-10">
        <!-- =====================================================
             BACKGROUND DECORATION
        ====================================================== -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"></div>

            <div class="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"></div>

            <div
                class="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl">
            </div>
        </div>

        <!-- =====================================================
             REGISTER CARD
        ====================================================== -->
        <div
            class="relative z-10 w-full max-w-lg rounded-2xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <!-- =====================================================
                 LOGO
            ====================================================== -->
            <div class="mb-5 flex justify-center">
                <div
                    class="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/30">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="1.8">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />

                        <circle cx="9" cy="7" r="4" />

                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 8v6m3-3h-6" />
                    </svg>
                </div>
            </div>

            <!-- =====================================================
                 HEADING
            ====================================================== -->
            <div class="mb-7 text-center">
                <h1 class="text-2xl font-bold text-white sm:text-3xl">
                    Create Your Account
                </h1>

                <p class="mt-2 text-sm text-slate-300">
                    Join our alumni community today
                </p>
            </div>

            <!-- =====================================================
                 LOCK MESSAGE
            ====================================================== -->
            <div v-if="!termsAccepted"
                class="mb-5 flex items-start gap-3 rounded-xl border border-amber-400/10 bg-amber-400/5 p-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-5 w-5 shrink-0 text-amber-400" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4" />

                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 17h.01" />

                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M10.29 3.86l-7.82 14a2 2 0 001.75 3h15.56a2 2 0 001.75-3l-7.82-14a2 2 0 00-3.42 0z" />
                </svg>

                <div>
                    <p class="text-sm font-medium text-amber-300">
                        Registration fields are locked
                    </p>

                    <p class="mt-1 text-sm leading-5 text-slate-400">
                        <!-- Please read and accept the account creation terms before completing your registration. -->
                        আপনার নিবন্ধন সম্পন্ন করার আগে অনুগ্রহ করে অ্যাকাউন্ট তৈরির শর্তাবলী পড়ুন এবং মেনে নিন।
                    </p>
                </div>
            </div>

            <!-- =====================================================
                 FORM
            ====================================================== -->
            <form @submit.prevent="register" class="space-y-4">
                <!-- =================================================
                     NAME
                ================================================== -->
                <div>
                    <label for="name" class="mb-2 block text-sm font-medium text-slate-200">
                        Full Name
                    </label>

                    <input id="name" v-model="form.name" type="text" placeholder="Enter your full name"
                        :disabled="!termsAccepted" autocomplete="name"
                        class="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 disabled:cursor-not-allowed disabled:opacity-50"
                        :class="{
                            'border-red-400/40 focus:border-red-400 focus:ring-red-400/20':
                                errors.name,
                        }" />

                    <p v-if="errors.name" class="mt-1.5 text-xs text-red-400">
                        {{ errors.name }}
                    </p>
                </div>

                <!-- =================================================
     EMAIL / MOBILE NUMBER
================================================== -->
                <div>
                    <label for="contact" class="mb-2 block text-sm font-medium text-slate-200">
                        Email / Mobile Number
                    </label>

                    <input id="contact" v-model="form.contact" type="text"
                        placeholder="Enter your email or mobile number" :disabled="!termsAccepted" autocomplete="email"
                        class="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 disabled:cursor-not-allowed disabled:opacity-50"
                        :class="{
                            'border-red-400/40 focus:border-red-400 focus:ring-red-400/20':
                                errors.contact,
                        }" />

                    <p v-if="errors.contact" class="mt-1.5 text-xs text-red-400">
                        {{ errors.contact }}
                    </p>

                    <p v-else class="mt-1.5 text-xs text-slate-400">
                        You can register using either your email address or mobile number.
                    </p>
                </div>

                <!-- =================================================
                     PASSWORD
                ================================================== -->
                <div>
                    <label for="password" class="mb-2 block text-sm font-medium text-slate-200">
                        Password
                    </label>

                    <input id="password" v-model="form.password" type="password" placeholder="Create a strong password"
                        :disabled="!termsAccepted" autocomplete="new-password"
                        class="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 disabled:cursor-not-allowed disabled:opacity-50"
                        :class="{
                            'border-red-400/40 focus:border-red-400 focus:ring-red-400/20':
                                errors.password,
                        }" />

                    <p v-if="errors.password" class="mt-1.5 text-xs text-red-400">
                        {{ errors.password }}
                    </p>

                    <p v-else-if="termsAccepted" class="mt-1.5 text-xs text-slate-400">
                        Password must be at least 8 characters.
                    </p>
                </div>

                <!-- =================================================
                     CONFIRM PASSWORD
                ================================================== -->
                <div>
                    <label for="password_confirmation" class="mb-2 block text-sm font-medium text-slate-200">
                        Confirm Password
                    </label>

                    <input id="password_confirmation" v-model="form.password_confirmation" type="password"
                        placeholder="Confirm your password" :disabled="!termsAccepted" autocomplete="new-password"
                        class="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 disabled:cursor-not-allowed disabled:opacity-50"
                        :class="{
                            'border-red-400/40 focus:border-red-400 focus:ring-red-400/20':
                                errors.password_confirmation,
                        }" />

                    <p v-if="errors.password_confirmation" class="mt-1.5 text-xs text-red-400">
                        {{ errors.password_confirmation }}
                    </p>
                </div>

                <!-- =================================================
                     TERMS STATUS
                ================================================== -->
                <div v-if="termsAccepted"
                    class="flex items-center gap-3 rounded-xl border border-emerald-400/10 bg-emerald-400/5 px-4 py-3">
                    <div class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-emerald-400" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <div class="flex-1">
                        <p class="text-xs font-medium text-emerald-300">
                            Terms accepted
                        </p>

                        <button type="button" @click="openTermsModal"
                            class="mt-0.5 text-[11px] text-slate-500 transition hover:text-slate-300">
                            View terms again
                        </button>
                    </div>
                </div>

                <!-- =================================================
                     REGISTER / TERMS BUTTON
                ================================================== -->
                <button v-if="!termsAccepted" type="button" @click="openTermsModal"
                    class="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-500 to-cyan-500 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:from-blue-600 hover:to-cyan-600 active:scale-[0.98]">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="1.8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2" />

                        <rect width="14" height="11" x="5" y="10" rx="2" ry="2" />

                        <path stroke-linecap="round" stroke-linejoin="round" d="M8 10V7a4 4 0 018 0v3" />
                    </svg>

                    একাউন্ট করার শর্ত সমূহ
                </button>

                <button v-else type="submit" :disabled="isSubmitting"
                    class="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-500 to-cyan-500 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:from-blue-600 hover:to-cyan-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60">
                    <svg v-if="isSubmitting" class="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>

                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>

                    <span>
                        {{ isSubmitting ? "Creating Account..." : "Create Account" }}
                    </span>
                </button>
            </form>

            <!-- =====================================================
                 LOGIN
            ====================================================== -->
            <div class="mt-6 text-center">
                <p class="text-sm text-slate-400">
                    Already have an account?

                    <RouterLink :to="{ name: 'login' }"
                        class="ml-1 font-medium text-blue-400 transition hover:text-blue-300">
                        Sign In
                    </RouterLink>
                </p>
            </div>

            <!-- =====================================================
                 FOOTER
            ====================================================== -->
            <div class="mt-6 border-t border-white/10 pt-5 text-center">
                <p class="text-xs text-slate-500">
                    © {{ currentYear }}
                    Alumni Management System
                </p>
            </div>
        </div>

        <!-- =====================================================
             TERMS MODAL
        ====================================================== -->
        <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="showTermsModal"
                class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm"
                @click.self="closeTermsModal">
                <div
                    class="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">
                    <!-- =================================================
                         MODAL HEADER
                    ================================================== -->
                    <div class="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-5 sm:px-6">
                        <div>
                            <div class="mb-2 flex items-center gap-2">
                                <div
                                    class="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />

                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14 2v6h6" />

                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8 13h8M8 17h5" />
                                    </svg>
                                </div>

                                <span class="text-xs font-medium uppercase tracking-wider text-blue-400">
                                    Registration
                                </span>
                            </div>

                            <h2 class="text-xl font-bold text-white sm:text-2xl">
                                একাউন্ট করার শর্ত সমূহ
                            </h2>

                            <p class="mt-1 text-sm text-slate-400">
                                Please read the following terms before
                                creating your account.
                            </p>
                        </div>

                        <button type="button" @click="closeTermsModal"
                            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
                            aria-label="Close">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="1.8">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <!-- =================================================
                         MODAL CONTENT
                    ================================================== -->
                   <div class="overflow-y-auto px-5 py-5 sm:px-6">
    <div class="space-y-4">
        <!-- Registration Terms -->
        <div
            v-for="term in registrationTerms"
            :key="term.id"
            class="rounded-xl border border-white/10 bg-white/[0.03] p-4"
        >
            <div class="flex gap-3">
                <!-- Number -->
                <span
                    class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-xs font-semibold text-blue-400"
                >
                    {{ String(term.id).padStart(2, "0") }}
                </span>

                <!-- Content -->
                <div>
                    <h3
                        class="text-sm font-semibold text-white"
                    >
                        {{ term.title }}
                    </h3>

                    <p
                        class="mt-1 text-xs leading-5 text-slate-400"
                    >
                        {{ term.description }}
                    </p>
                </div>
            </div>
        </div>
    </div>

    <!-- =================================================
         AGREE CHECKBOX
    ================================================== -->
    <div
        class="mt-5 rounded-xl border border-blue-400/10 bg-blue-400/5 p-4"
    >
        <label
            for="agree_terms"
            class="flex cursor-pointer items-start gap-3"
        >
            <input
                id="agree_terms"
                v-model="termsChecked"
                type="checkbox"
                class="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-white/20 bg-white/10 text-blue-500 focus:ring-2 focus:ring-blue-500/30"
            />

            <span
                class="text-sm leading-6 text-slate-300"
            >
                I agree this term and confirm that I
                have read and understood the registration
                terms.
            </span>
        </label>

        <p
            v-if="termsError"
            class="mt-2 pl-8 text-xs text-red-400"
        >
            {{ termsError }}
        </p>
    </div>
</div>

                    <!-- =================================================
                         MODAL FOOTER
                    ================================================== -->
                    <div
                        class="flex flex-col-reverse gap-3 border-t border-white/10 bg-white/[0.02] px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                        <button type="button" @click="closeTermsModal"
                            class="w-full rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white sm:w-auto">
                            Cancel
                        </button>

                        <button type="button" @click="acceptTerms"
                            class="w-full rounded-xl bg-linear-to-r from-blue-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:from-blue-600 hover:to-cyan-600 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto">
                            I Agree & Continue
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";

import { registrationTerms } from "@/constants/registrationTerms.js";

/*
|--------------------------------------------------------------------------
| Registration Form
|--------------------------------------------------------------------------
*/

const form = reactive({
    name: "",
    registration_number: "",
    contact: "",
    password: "",
    password_confirmation: "",
    terms: false,
});

/*
|--------------------------------------------------------------------------
| Terms State
|--------------------------------------------------------------------------
|
| These states are intentionally NOT stored in localStorage.
|
| User accepts terms:
|       -> fields unlock
|
| User stays on page:
|       -> fields remain unlocked
|
| User refreshes page:
|       -> fields become locked again
|
|--------------------------------------------------------------------------
*/

const showTermsModal = ref(false);

const termsChecked = ref(false);

const termsAccepted = ref(false);

const termsError = ref("");

const isSubmitting = ref(false);

/*
|--------------------------------------------------------------------------
| Validation Errors
|--------------------------------------------------------------------------
*/

const errors = reactive({
    name: "",
    registration_number: "",
    contact: "",
    password: "",
    password_confirmation: "",
});

/*
|--------------------------------------------------------------------------
| Current Year
|--------------------------------------------------------------------------
*/

const currentYear = computed(() => {
    return new Date().getFullYear();
});

/*
|--------------------------------------------------------------------------
| Open Terms Modal
|--------------------------------------------------------------------------
*/

const openTermsModal = () => {
    termsError.value = "";

    /*
     * যদি terms আগে accepted করা হয়ে থাকে,
     * modal reopen করলে checkbox checked থাকবে।
     */
    termsChecked.value = termsAccepted.value;

    showTermsModal.value = true;
};

/*
|--------------------------------------------------------------------------
| Close Terms Modal
|--------------------------------------------------------------------------
*/

const closeTermsModal = () => {
    termsError.value = "";

    /*
     * এখানে termsAccepted change করছি না।
     *
     * কারণ user একবার accept করলে page refresh না করা পর্যন্ত
     * terms accepted থাকবে।
     */
    showTermsModal.value = false;
};

/*
|--------------------------------------------------------------------------
| Accept Terms
|--------------------------------------------------------------------------
*/

const acceptTerms = () => {
    /*
     * Checkbox checked না হলে এগোতে পারবে না।
     */
    if (!termsChecked.value) {
        termsError.value =
            "Please check “I agree this term” before continuing.";

        return;
    }

    /*
     * Terms accepted
     */
    termsAccepted.value = true;

    /*
     * Form-এর সাথে sync
     */
    form.terms = true;

    /*
     * Modal close
     */
    showTermsModal.value = false;

    /*
     * Error clear
     */
    termsError.value = "";
};

/*
|--------------------------------------------------------------------------
| Clear Validation Errors
|--------------------------------------------------------------------------
*/

const clearErrors = () => {
    errors.name = "";
    errors.registration_number = "";
    errors.contact = "";
    errors.password = "";
    errors.password_confirmation = "";
};

/*
|--------------------------------------------------------------------------
| Validate Form
|--------------------------------------------------------------------------
*/

const validateForm = () => {
    clearErrors();

    let isValid = true;

    /*
     * Terms
     */
    if (!termsAccepted.value || !form.terms) {
        termsError.value =
            "You must accept the registration terms first.";

        isValid = false;
    }

    /*
     * Name
     */
    if (!form.name.trim()) {
        errors.name = "Full name is required.";

        isValid = false;
    } else if (form.name.trim().length < 3) {
        errors.name =
            "Name must be at least 3 characters.";

        isValid = false;
    }

    /*
     * Registration Number
     */
    if (!form.registration_number.trim()) {
        errors.registration_number =
            "Registration number is required.";

        isValid = false;
    }

    /*
     * Email / Mobile
     */
    if (!form.contact.trim()) {
        errors.contact =
            "Email address or mobile number is required.";

        isValid = false;
    } else {
        const value = form.contact.trim();

        /*
         * Email format
         */
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        /*
         * Bangladesh mobile format
         *
         * 01712345678
         * +8801712345678
         */
        const mobilePattern =
            /^(?:\+8801|01)[3-9]\d{8}$/;

        const isEmail = emailPattern.test(value);

        const isMobile = mobilePattern.test(value);

        if (!isEmail && !isMobile) {
            errors.contact =
                "Please enter a valid email address or mobile number.";

            isValid = false;
        }
    }

    /*
     * Password
     */
    if (!form.password) {
        errors.password =
            "Password is required.";

        isValid = false;
    } else if (form.password.length < 8) {
        errors.password =
            "Password must be at least 8 characters.";

        isValid = false;
    }

    /*
     * Confirm Password
     */
    if (!form.password_confirmation) {
        errors.password_confirmation =
            "Please confirm your password.";

        isValid = false;
    } else if (
        form.password !== form.password_confirmation
    ) {
        errors.password_confirmation =
            "Passwords do not match.";

        isValid = false;
    }

    return isValid;
};

/*
|--------------------------------------------------------------------------
| Register
|--------------------------------------------------------------------------
*/

const register = async () => {
    /*
     * Extra protection:
     * terms accept না করলে registration করা যাবে না।
     */
    if (!termsAccepted.value) {
        openTermsModal();

        return;
    }

    /*
     * Validate
     */
    if (!validateForm()) {
        return;
    }

    try {
        isSubmitting.value = true;

        /*
         * ----------------------------------------------------------
         * Laravel API later
         * ----------------------------------------------------------
         *
         * Example:
         *
         * const response = await axios.post(
         *     "/api/register",
         *     form
         * );
         *
         * ----------------------------------------------------------
         */

        console.log("Register Data:", {
            ...form,
        });

        /*
         * Temporary testing
         */
        alert(
            "Registration form submitted successfully."
        );
    } catch (error) {
        console.error(
            "Registration failed:",
            error
        );
    } finally {
        isSubmitting.value = false;
    }
};
</script>