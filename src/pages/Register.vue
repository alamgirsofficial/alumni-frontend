```vue
<template>
    <div
        class="min-h-screen flex items-center justify-center
        bg-linear-to-br from-slate-950 via-blue-950 to-slate-900
        px-4 py-10"
    >
        <!-- Background Decoration -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div
                class="absolute -top-40 -left-40
                w-96 h-96
                bg-blue-500/20
                rounded-full blur-3xl"
            ></div>

            <div
                class="absolute -bottom-40 -right-40
                w-96 h-96
                bg-cyan-500/20
                rounded-full blur-3xl"
            ></div>
        </div>


        <!-- Register Card -->
        <div
            class="relative w-full max-w-lg
            bg-white/10 backdrop-blur-xl
            border border-white/10
            rounded-2xl
            shadow-2xl
            p-6 sm:p-8"
        >

            <!-- Logo -->
            <div class="flex justify-center mb-5">
                <div
                    class="w-14 h-14
                    flex items-center justify-center
                    rounded-2xl
                    bg-linear-to-br from-blue-500 to-cyan-400
                    shadow-lg shadow-blue-500/30"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-7 h-7 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="1.8"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16 21v-2a4 4 0 00-4-4H6
                            a4 4 0 00-4 4v2"
                        />

                        <circle
                            cx="9"
                            cy="7"
                            r="4"
                        />

                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19 8v6m3-3h-6"
                        />
                    </svg>
                </div>
            </div>


            <!-- Heading -->
            <div class="text-center mb-7">
                <h1
                    class="text-2xl sm:text-3xl
                    font-bold text-white"
                >
                    Create Your Account
                </h1>

                <p class="mt-2 text-sm text-slate-300">
                    Join our alumni community today
                </p>
            </div>


            <!-- Form -->
            <form
                @submit.prevent="register"
                class="space-y-4"
            >

                <!-- Name -->
                <div>
                    <label
                        for="name"
                        class="block mb-2
                        text-sm font-medium
                        text-slate-200"
                    >
                        Full Name
                    </label>

                    <input
                        id="name"
                        v-model="form.name"
                        type="text"
                        placeholder="Enter your full name"
                        class="w-full px-4 py-3
                        rounded-xl
                        bg-white/10
                        border border-white/10
                        text-white
                        placeholder-slate-400
                        outline-none
                        focus:border-blue-400
                        focus:ring-2
                        focus:ring-blue-400/20
                        transition"
                        required
                    />
                </div>


                <!-- Registration Number -->
                <div>
                    <label
                        for="registration_number"
                        class="block mb-2
                        text-sm font-medium
                        text-slate-200"
                    >
                        Registration Number
                    </label>

                    <input
                        id="registration_number"
                        v-model="form.registration_number"
                        type="text"
                        placeholder="Enter your registration number"
                        class="w-full px-4 py-3
                        rounded-xl
                        bg-white/10
                        border border-white/10
                        text-white
                        placeholder-slate-400
                        outline-none
                        focus:border-blue-400
                        focus:ring-2
                        focus:ring-blue-400/20
                        transition"
                        required
                    />
                </div>


                <!-- Email -->
                <div>
                    <label
                        for="email"
                        class="block mb-2
                        text-sm font-medium
                        text-slate-200"
                    >
                        Email Address
                    </label>

                    <input
                        id="email"
                        v-model="form.email"
                        type="email"
                        placeholder="Enter your email address"
                        class="w-full px-4 py-3
                        rounded-xl
                        bg-white/10
                        border border-white/10
                        text-white
                        placeholder-slate-400
                        outline-none
                        focus:border-blue-400
                        focus:ring-2
                        focus:ring-blue-400/20
                        transition"
                        required
                    />
                </div>


                <!-- Password -->
                <div>
                    <label
                        for="password"
                        class="block mb-2
                        text-sm font-medium
                        text-slate-200"
                    >
                        Password
                    </label>

                    <input
                        id="password"
                        v-model="form.password"
                        type="password"
                        placeholder="Create a strong password"
                        class="w-full px-4 py-3
                        rounded-xl
                        bg-white/10
                        border border-white/10
                        text-white
                        placeholder-slate-400
                        outline-none
                        focus:border-blue-400
                        focus:ring-2
                        focus:ring-blue-400/20
                        transition"
                        required
                    />
                </div>


                <!-- Confirm Password -->
                <div>
                    <label
                        for="password_confirmation"
                        class="block mb-2
                        text-sm font-medium
                        text-slate-200"
                    >
                        Confirm Password
                    </label>

                    <input
                        id="password_confirmation"
                        v-model="form.password_confirmation"
                        type="password"
                        placeholder="Confirm your password"
                        class="w-full px-4 py-3
                        rounded-xl
                        bg-white/10
                        border border-white/10
                        text-white
                        placeholder-slate-400
                        outline-none
                        focus:border-blue-400
                        focus:ring-2
                        focus:ring-blue-400/20
                        transition"
                        required
                    />
                </div>


                <!-- Terms -->
                <div class="flex items-start gap-2 pt-1">
                    <input
                        id="terms"
                        v-model="form.terms"
                        type="checkbox"
                        class="mt-1 w-4 h-4
                        rounded
                        border-white/20
                        bg-white/10
                        text-blue-500
                        focus:ring-blue-500/30"
                        required
                    />

                    <label
                        for="terms"
                        class="text-sm text-slate-300"
                    >
                        I agree to the
                        <a
                            href="#"
                            class="text-blue-400 hover:text-blue-300"
                        >
                            Terms & Conditions
                        </a>
                    </label>
                </div>


                <!-- Register Button -->
                <button
                    type="submit"
                    class="w-full mt-2
                    py-3
                    rounded-xl
                    font-semibold
                    text-white
                    bg-linear-to-r
                    from-blue-500
                    to-cyan-500
                    hover:from-blue-600
                    hover:to-cyan-600
                    active:scale-[0.98]
                    shadow-lg
                    shadow-blue-500/20
                    transition-all"
                >
                    Create Account
                </button>

            </form>


            <!-- Login -->
            <div class="mt-6 text-center">
                <p class="text-sm text-slate-400">
                    Already have an account?

                    <RouterLink
                        to="/login"
                        class="ml-1
                        font-medium
                        text-blue-400
                        hover:text-blue-300"
                    >
                        Sign In
                    </RouterLink>
                </p>
            </div>


            <!-- Footer -->
            <div
                class="mt-6 pt-5
                border-t border-white/10
                text-center"
            >
                <p class="text-xs text-slate-500">
                    © {{ new Date().getFullYear() }}
                    Alumni Management System
                </p>
            </div>

        </div>
    </div>
</template>


<script setup>
import { reactive } from 'vue'

const form = reactive({
    name: '',
    registration_number: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false,
})

const register = () => {
    console.log('Register Data:', form)

    // axios.post('/api/register', form)
}
</script>
```
