<script setup>
import FooterBrand from "./FooterBrand.vue";
import FooterLinks from "./FooterLink.vue";
import FooterBottom from "./FooterBottom.vue";

import {
    footerInfo,
    quickLinks,
    supportLinks,
    contactIcons,
    socialLinks,
} from "../../constrants/footer.js";
</script>

<template>
    <footer class="border-t border-slate-800 bg-slate-950">

        <div class="max-w-7xl mx-auto px-6 py-16">

            <div
                class="grid
                       gap-12
                       sm:grid-cols-2
                       lg:grid-cols-4"
            >

                <FooterBrand
                    :info="footerInfo"
                    :contacts="contactIcons"
                    :socials="socialLinks"
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