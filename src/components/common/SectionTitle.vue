<template>

    <div class="flex items-center gap-3">

        <span
            class="w-10 h-px
            bg-cyan-400"
        ></span>

        <h2
            class="text-xl
            md:text-2xl
            font-black
            text-white"
        >
            {{ title }}
        </h2>

    </div>

</template>


<script setup>

defineProps({
    title: {
        type: String,
        required: true
    }
})

</script>