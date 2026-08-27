<script setup>
import EmptyDataCard from "@/components/common/EmptyDataCard.vue";
</script>

<template>
  <section class="py-16">
    <div class="mx-auto max-w-7xl px-4">
      <EmptyDataCard
        title=" Career Development"
        message="এই বিভাগের তথ্য আমাদের ওয়েবসাইটে এখনো যুক্ত করা হয়নি। বিস্তারিত তথ্যের জন্য আমাদের সাথে যোগাযোগ করুন।"
        buttonText="যোগাযোগ করুন"        
        buttonRoute="/contact"
      />
    </div>
  </section>
</template>