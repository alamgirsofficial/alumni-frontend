<script setup>
defineProps({
    member: {
        type: Object,
        required: true,
    },
    serial:{
        type: Number,
        required:true,
    },
});
</script>

<template>
    
    <div
        class="group p-4 rounded-2xl
        bg-white/5 backdrop-blur-xl
        border border-white/10
        hover:border-cyan-400/30
        hover:bg-white/10
        transition-all duration-300"
    >

        <div class="flex items-center gap-4">

            
<span class="text-xs text-white">
    {{ serial }} .
</span>
            <!-- Initial -->
            <div
                class="w-11 h-11 shrink-0
                rounded-xl
                bg-linear-to-br from-blue-500 to-cyan-400
                flex items-center justify-center
                text-white font-bold text-lg
                shadow-lg shadow-blue-500/20"
            >
                {{ member.name.charAt(0) }}
            </div>

            <!-- Information -->
            <div class="min-w-0 flex-1">

                <h3
                    class="font-semibold text-white
                    group-hover:text-cyan-300
                    transition-colors duration-300"
                >
                    {{ member.name }}
                </h3>

                <div
                    class="mt-1.5 flex flex-col sm:flex-row
                    gap-1 sm:gap-5
                    text-sm text-gray-400"
                >

                    <span>
                        <strong class="text-gray-300">
                            পিতা:
                        </strong>
                        {{ member.father }}
                    </span>

                    <span>
                        <strong class="text-gray-300">
                            মাতা:
                        </strong>
                        {{ member.mother }}
                    </span>

                </div>

            </div>

        </div>

    </div>
</template>