<template>
   

    <div
        class="min-h-screen
        flex items-center justify-center
        bg-linear-to-br
        from-slate-950
        via-blue-950
        to-slate-900
        px-4 py-10"
    >

        <!-- Back to Home -->
        <RouterLink
            :to="{ name: 'Home' }"
            class="fixed
            top-5 left-5
            inline-flex
            items-center gap-2
            text-sm
            text-slate-300
            hover:text-white
            transition"
        >
            <span class="text-lg">←</span>
            Back to Home
        </RouterLink>


        <!-- Auth Page -->
        <RouterView />

    </div>
</template>