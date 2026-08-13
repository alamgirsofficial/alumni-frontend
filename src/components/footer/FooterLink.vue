<script setup>
defineProps({
    title: String,
    items: Array,
});
</script>

<template>
    <div>
        <h3 class="mb-5 text-lg font-semibold text-white">
            {{ title }}
        </h3>

        <ul class="space-y-3">
            <li
                v-for="item in items"
                :key="typeof item === 'string' ? item : item.name"
            >
                <!-- String item -->
                <span
                    v-if="typeof item === 'string'"
                    class="text-slate-400"
                >
                    {{ item }}
                </span>

                <!-- Router item -->
                <RouterLink
                    v-else
                    :to="item.to"
                    class="text-slate-400 hover:text-cyan-400 transition duration-300"
                >
                    {{ item.name }}
                </RouterLink>
            </li>
        </ul>
    </div>
</template>