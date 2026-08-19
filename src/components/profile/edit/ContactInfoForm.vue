<script setup>
import {
  Mail,
  Phone,
  MapPin,
} from "@lucide/vue";

import ProfileSectionHeader from "@/components/common/ProfileSectionHeader.vue";

defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <section
    class="rounded-2xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl sm:p-6"
  >
    <ProfileSectionHeader
      kicker="Contact"
      title="Contact Information"
      description="Manage your contact details"
      icon="Mail"
      icon-class="bg-blue-500/10 text-blue-400"
    />

    <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

      <div>
        <label class="form-label">Email Address</label>

        <div class="relative">
          <Mail class="form-icon" :size="14" />

          <input
            v-model="modelValue.email"
            type="email"
            class="form-input pl-10"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label class="form-label">Phone Number</label>

        <div class="relative">
          <Phone class="form-icon" :size="14" />

          <input
            v-model="modelValue.phone"
            type="tel"
            class="form-input pl-10"
            placeholder="+880..."
          />
        </div>
      </div>

      <div class="sm:col-span-2">
        <label class="form-label">Present Address</label>

        <div class="relative">
          <MapPin
            class="absolute left-3 top-3.5 text-slate-600"
            :size="14"
          />

          <textarea
            v-model="modelValue.presentAddress"
            rows="3"
            class="form-input resize-none pl-10"
            placeholder="Present address"
          />
        </div>
      </div>

    </div>
  </section>
</template>