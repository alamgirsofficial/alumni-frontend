<script setup>
defineProps({
    categories: {
        type: Array,
        required: true,
    },

    activeCategory: {
        type: String,
        default: "all",
    },
});

const emit = defineEmits(["change"]);
</script>

<template>
    <section class="relative pb-10">
        <div
            class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
            <div
                class="flex items-center justify-center gap-2 sm:gap-3 flex-wrap"
                data-aos="fade-up"
            >
                <button
                    v-for="category in categories"
                    :key="category.id"
                    type="button"
                    @click="emit('change', category.id)"
                    class="px-4 sm:px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border"
                    :class="
                        activeCategory === category.id
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-transparent shadow-lg shadow-blue-500/20'
                            : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white hover:border-cyan-400/30'
                    "
                >
                    {{ category.label }}
                </button>
            </div>
        </div>
    </section>
</template>