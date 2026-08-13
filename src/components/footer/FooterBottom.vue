<script setup>
const year = new Date().getFullYear();
</script>

<template>
    <div
        class="border-t border-slate-700 mt-12 pt-8
               flex flex-col md:flex-row
               justify-between items-center"
    >

        <p class="text-slate-400 text-sm">
            © {{ year }}
            প্রাক্তন ছাত্র পরিষদ।
            সর্বস্বত্ব সংরক্ষিত।
        </p>

        <div class="flex gap-6 mt-4 md:mt-0">

            <RouterLink
                to="#"
                class="text-slate-400 hover:text-cyan-400"
            >
                গোপনীয়তা নীতি
            </RouterLink>

            <RouterLink
                to="#"
                class="text-slate-400 hover:text-cyan-400"
            >
                সেবা শর্তাবলী
            </RouterLink>

        </div>

    </div>
</template>