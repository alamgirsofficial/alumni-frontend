```vue
<template>
    <div
        class="min-h-screen flex items-center justify-center
        bg-linear-to-br from-slate-950 via-blue-950 to-slate-900
        px-4"
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


        <!-- Card -->
        <div
            class="relative w-full max-w-md
            bg-white/10 backdrop-blur-xl
            border border-white/10
            rounded-2xl
            shadow-2xl
            p-6 sm:p-8"
        >

            <!-- Icon -->
            <div class="flex justify-center mb-6">
                <div
                    class="w-16 h-16
                    flex items-center justify-center
                    rounded-2xl
                    bg-linear-to-br from-blue-500 to-cyan-400
                    shadow-lg shadow-blue-500/30"
                >
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
                            d="M15 7a2 2 0 11-4 0
                            2 2 0 014 0z"
                        />

                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M17 7h.01M19 7a7 7 0 11-14 0
                            7 7 0 0114 0z"
                        />

                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 14v7m-3-3h6"
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
                    Forgot Password?
                </h1>

                <p
                    class="mt-2
                    text-sm
                    leading-6
                    text-slate-300"
                >
                    No worries. Enter your registered email
                    and we'll send you a password reset link.
                </p>
            </div>


            <!-- Form -->
            <form
                @submit.prevent="sendResetLink"
                class="space-y-5"
            >

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
                        v-model="email"
                        type="email"
                        placeholder="Enter your registered email"
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


                <!-- Button -->
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
                    Send Reset Link
                </button>

            </form>


            <!-- Back Login -->
            <div class="mt-7 text-center">
                <RouterLink
                    :to="{ name: 'login' }"
                    class="inline-flex items-center
                    gap-2
                    text-sm
                    text-blue-400
                    hover:text-blue-300
                    transition"
                >
                    <span>←</span>
                    Back to Sign In
                </RouterLink>
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
import { ref } from 'vue'

const email = ref('')

const sendResetLink = () => {
    console.log('Reset Email:', email.value)

    // axios.post('/api/forgot-password', {
    //     email: email.value
    // })
}
</script>
```
