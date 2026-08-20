<script setup>
import ProfileSectionHeader from "@/components/common/ProfileSectionHeader.vue";
import SocialLinks from "@/components/common/SocialLinks.vue";

defineProps({
  social: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <section
    class="rounded-2xl border border-white/10 bg-white/2.5 p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/1.2 hover:bg-white/3 sm:p-6"
  >
    <ProfileSectionHeader
      title="Social & Links"
      description="Connect with your network"
      icon="Globe"
      icon-class="bg-cyan-500/10 text-cyan-400"
    />

    <div class="mt-5">
      <SocialLinks
        :social-links="social"
      />
    </div>
  </section>
</template>