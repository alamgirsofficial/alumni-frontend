<script setup>
import FooterBrand from "@/components/footer/FooterBrand.vue";
import FooterLinks from "@/components/footer/FooterLink.vue";
import FooterBottom from "@/components/footer/FooterBottom.vue";

import {
    footerInfo,
    quickLinks,
    supportLinks,
    footerSocials,
} from "@/constants/footer.js";
</script>

<template>
    <footer class="border-t border-slate-800">

        <div class="max-w-7xl mx-auto px-6 py-16">

            <div
                class="grid
                       gap-12
                       sm:grid-cols-2
                       lg:grid-cols-4"
            >

                <FooterBrand
                    :info="footerInfo"
                    :socials="footerSocials"
                />

                <FooterLinks
                    title="প্রয়োজনীয় লিংক"
                    :items="quickLinks"
                />

                <FooterLinks
                    title="We Support"
                    :items="supportLinks"
                />

            </div>

            <FooterBottom />

        </div>

    </footer>
</template>