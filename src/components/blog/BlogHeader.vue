<template>

    <div class="text-center mb-16"
         data-aos="fade-up"
    >

        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">

            {{ title }}

            <span
                class="text-transparent bg-clip-text
                bg-linear-to-r from-blue-400 to-cyan-400"
            >
                {{ highlight }}
            </span>

        </h2>

        <p class="text-blue-200 text-lg max-w-2xl mx-auto leading-8">
            {{ description }}
        </p>

    </div>

</template>


<script setup>

defineProps({

    title: {
        type: String,
        default: 'অ্যালামনাই'
    },

    highlight: {
        type: String,
        default: 'ফোরাম ব্লগ'
    },

    description: {
        type: String,
        default:
            'প্রাক্তন শিক্ষার্থীদের সাফল্য, অভিজ্ঞতা এবং স্কুলের স্মৃতিচারণমূলক লেখা পড়ুন এবং আপনার অভিজ্ঞতা শেয়ার করুন'
    }

})

</script>