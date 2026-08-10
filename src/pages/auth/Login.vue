```vue
<template>
    <div
        class=" flex items-center justify-center
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


        <!-- Login Card -->
        <div
            class="relative w-full max-w-md
            bg-white/10 backdrop-blur-xl
            border border-white/10
            rounded-2xl
            shadow-2xl
            p-6 sm:p-8"
        >

            <!-- Logo -->
            <div class="flex justify-center mb-6">
                <div
                    class="w-16 h-16
                    flex items-center justify-center
                    rounded-2xl
                    bg-linear-to-br from-blue-500 to-cyan-400
                    shadow-lg shadow-blue-500/30"
                >
                    <!-- Users Icon -->
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-8 h-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="1.8"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"
                        />

                        <circle
                            cx="9"
                            cy="7"
                            r="4"
                        />

                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M22 21v-2a4 4 0 00-3-3.87
                            M16 3.13a4 4 0 010 7.75"
                        />
                    </svg>
                </div>
            </div>


            <!-- Heading -->
            <div class="text-center mb-8">
                <h1
                    class="text-2xl sm:text-3xl
                    font-bold text-white"
                >
                    Welcome Back
                </h1>

                <p class="mt-2 text-sm text-slate-300">
                    Sign in to your Alumni account
                </p>
            </div>


            <!-- Login Form -->
            <form
                @submit.prevent="login"
                class="space-y-5"
            >

                <!-- Email / Registration Number -->
                <div>
                    <label
                        for="email"
                        class="block mb-2
                        text-sm font-medium
                        text-slate-200"
                    >
                        Email or Registration Number
                    </label>

                    <div class="relative">
                        <!-- User Icon -->
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="absolute left-3 top-1/2
                            -translate-y-1/2
                            w-5 h-5 text-slate-400"
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

                        <input
                            id="email"
                            v-model="form.email"
                            type="text"
                            placeholder="Enter email or registration number"
                            class="w-full
                            pl-11 pr-4 py-3
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
                </div>


                <!-- Password -->
                <div>
                    <div class="flex items-center justify-between mb-2">

                        <label
                            for="password"
                            class="text-sm font-medium
                            text-slate-200"
                        >
                            Password
                        </label>

                        <RouterLink
                            :to="{ name: 'ForgotPassword' }"
                            class="text-sm
                            text-blue-400
                            hover:text-blue-300
                            transition"
                        >
                            Forgot password?
                        </RouterLink>

                    </div>


                    <div class="relative">

                        <!-- Lock Icon -->
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="absolute left-3 top-1/2
                            -translate-y-1/2
                            w-5 h-5 text-slate-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="1.8"
                        >
                            <rect
                                width="18"
                                height="11"
                                x="3"
                                y="11"
                                rx="2"
                                ry="2"
                            />

                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M7 11V7a5 5 0 0110 0v4"
                            />
                        </svg>


                        <input
                            id="password"
                            v-model="form.password"
                            :type="showPassword ? 'text' : 'password'"
                            placeholder="Enter your password"
                            class="w-full
                            pl-11 pr-12 py-3
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


                        <!-- Password Toggle -->
                        <button
                            type="button"
                            @click="showPassword = !showPassword"
                            class="absolute right-3 top-1/2
                            -translate-y-1/2
                            text-slate-400
                            hover:text-white
                            transition"
                        >
                            <svg
                                v-if="!showPassword"
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="1.8"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M2.062 12.348
                                    a1.34 1.34 0 010-.696
                                    C3.423 7.51 7.36 5 12 5
                                    c4.64 0 8.577 2.51 9.938 6.652
                                    a1.34 1.34 0 010 .696
                                    C20.577 16.49 16.64 19 12 19
                                    c-4.64 0-8.577-2.51-9.938-6.652z"
                                />

                                <circle
                                    cx="12"
                                    cy="12"
                                    r="3"
                                />
                            </svg>


                            <svg
                                v-else
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="1.8"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M3 3l18 18"
                                />

                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M10.584 10.587
                                    A2 2 0 0013.41 13.41"
                                />

                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M9.88 5.09
                                    A10.94 10.94 0 0112 5
                                    c4.64 0 8.577 2.51 9.938 6.652
                                    a1.34 1.34 0 010 .696
                                    10.96 10.96 0 01-4.132 5.411"
                                />
                            </svg>
                        </button>

                    </div>
                </div>


                <!-- Remember Me -->
                <div class="flex items-center">

                    <input
                        id="remember"
                        v-model="form.remember"
                        type="checkbox"
                        class="w-4 h-4
                        rounded
                        border-white/20
                        bg-white/10
                        text-blue-500
                        focus:ring-blue-500/30"
                    />

                    <label
                        for="remember"
                        class="ml-2
                        text-sm text-slate-300"
                    >
                        Remember me
                    </label>

                </div>


                <!-- Login Button -->
                <button
                    type="submit"
                    class="w-full
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
                    Sign In
                </button>

            </form>


            <!-- Register -->
            <div class="mt-7 text-center">

                <p class="text-sm text-slate-400">
                    Don't have an account?

                    <RouterLink
                        :to="{ name: 'register' }"
                        class="ml-1
                        font-medium
                        text-blue-400
                        hover:text-blue-300
                        transition"
                    >
                        Create Account
                    </RouterLink>
                </p>

            </div>


            <!-- Footer -->
            <div
                class="mt-8 pt-5
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
import { reactive, ref } from 'vue'

const showPassword = ref(false)

const form = reactive({
    email: '',
    password: '',
    remember: false,
})


const login = () => {
    console.log('Login Data:', form)

    // এখানে Laravel API call করবে
    //
    // axios.post('/api/login', form)
    //     .then(response => {
    //         console.log(response.data)
    //     })
}
</script>
```
