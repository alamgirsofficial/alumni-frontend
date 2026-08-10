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

            <!-- Verification Icon -->
            <div class="flex justify-center mb-6">
                <div
                    class="w-16 h-16
                    flex items-center justify-center
                    rounded-2xl
                    bg-linear-to-br
                    from-blue-500
                    to-cyan-400
                    shadow-lg
                    shadow-blue-500/30"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-8 h-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="1.8"
                    >
                        <rect
                            x="3"
                            y="5"
                            width="18"
                            height="14"
                            rx="2"
                        />

                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3 7l9 6 9-6"
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
                    Verify Your Email
                </h1>

                <p
                    class="mt-3
                    text-sm
                    leading-6
                    text-slate-300"
                >
                    Thanks for joining our alumni community!
                    Please verify your email address by clicking
                    the link we sent to your inbox.
                </p>
            </div>


            <!-- Email Info -->
            <div
                class="p-4 mb-6
                rounded-xl
                bg-blue-500/10
                border border-blue-400/20"
            >
                <div class="flex items-start gap-3">

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-5 h-5
                        text-blue-400
                        shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="1.8"
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="9"
                        />

                        <path
                            stroke-linecap="round"
                            d="M12 8v4"
                        />

                        <circle
                            cx="12"
                            cy="16"
                            r=".5"
                            fill="currentColor"
                        />
                    </svg>

                    <p class="text-sm text-slate-300">
                        Didn't receive the email?
                        Check your spam folder or request
                        a new verification email.
                    </p>

                </div>
            </div>


            <!-- Resend Button -->
            <button
                type="button"
                @click="resendVerification"
                :disabled="loading"
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
                disabled:opacity-60
                disabled:cursor-not-allowed
                active:scale-[0.98]
                shadow-lg
                shadow-blue-500/20
                transition-all"
            >
                {{ loading
                    ? 'Sending...'
                    : 'Resend Verification Email'
                }}
            </button>


            <!-- Login -->
            <div class="mt-6 text-center">
                <RouterLink
                    :to="{ name: 'login' }"
                    class="text-sm
                    text-blue-400
                    hover:text-blue-300
                    transition"
                >
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

const loading = ref(false)

const resendVerification = async () => {
    loading.value = true

    try {
        console.log('Resending verification email...')

        // Laravel API call এখানে করবে
        //
        // await axios.post('/api/email/verification-notification')

    } finally {
        loading.value = false
    }
}
</script>
```
