<script setup>
import logo from "@/assets/icon/logo.png";

defineProps({
    info: Object,
    contacts: Array,
    socials: Array,
});
</script>

<template>
    <div class="lg:col-span-2">

        <div class="flex items-center gap-4">

            <img
                :src="logo"
                class="w-14 h-14 rounded-full"
                alt="Forum Logo"
            >

            <div>
                <h2
                    class="text-2xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
                >
                    {{ info.title }}
                </h2>

                <p class="text-white">
                    {{ info.school }}
                </p>

            </div>

        </div>

        <p class="mt-5 max-w-md text-slate-300 leading-7">
            {{ info.description }}
        </p>

        <div class="flex gap-3 mt-8">

            <a
                v-for="item in contacts"
                :key="item.label"
                :href="item.href"
                :aria-label="item.label"
                class="p-3 rounded-xl border border-white/10 hover:bg-cyan-500 transition"
            >
                <component
                    :is="item.icon"
                    class="w-5 h-5"
                />
            </a> 

        </div>

        

    </div>
</template>