<script setup>
import {
  profile,
  loadProfile,
  initials,
  completionColor,
  editProfile,
  changePassword,
} from "@/constants/profileData.js";

import { onMounted } from "vue";
import { useToast } from "@/composables/useToast";

import ProfileHeader from "@/components/profile/view/ProfileHeader.vue";
import ProfileHero from "@/components/profile/view/ProfileHero.vue";
import ProfileCompletion from "@/components/profile/view/ProfileCompletion.vue";

import PersonalInfo from "@/components/profile/view/PersonalInfo.vue";
import EducationSection from "@/components/profile/view/EducationSection.vue";
import ProfessionalExperience from "@/components/profile/view/ProfessionalExperience.vue";
import SkillsSection from "@/components/profile/view/SkillsSection.vue";

import ContactInfo from "@/components/profile/view/ContactInfo.vue";
import SocialLinksCard from "@/components/profile/view/SocialLinksCard.vue";
import AccountInfo from "@/components/profile/view/AccountInfo.vue";
import AboutMe from "@/components/profile/view/AboutMe.vue";


onMounted(()=>{
  loadProfile();
});
</script>

<template>
  <div class="relative min-h-full overflow-hidden">

    <!-- =========================================================
         AMBIENT BACKGROUND
    ========================================================== -->



    <!-- =========================================================
         MAIN CONTENT
    ========================================================== -->

    <div class="relative space-y-6 p-6">

      <!-- PAGE HEADER -->

      <ProfileHeader @edit-profile="editProfile" @change-password="changePassword" />

      <!-- PROFILE HERO -->

      <ProfileHero :profile="profile" :initials="initials" />

      <!-- PROFILE COMPLETION -->

      <ProfileCompletion :profile="profile" :completion-color="completionColor" />

      <!-- =======================================================
           MAIN GRID
      ======================================================== -->

      <section class="grid grid-cols-1 gap-6 xl:grid-cols-3">

        <!-- =====================================================
             LEFT / MAIN
        ====================================================== -->

        <div class="space-y-6 xl:col-span-2">

          <PersonalInfo :profile="profile" />

          <EducationSection :education="profile.education" />

          <ProfessionalExperience :experiences="profile.experiences" />

         

        </div>

        <!-- =====================================================
             RIGHT
        ====================================================== -->

        <div class="space-y-6">

          <ContactInfo :profile="profile" />

          <SocialLinksCard :social="profile.social" />

          <AccountInfo :account="profile.account" />
           <SkillsSection :skills="profile.skills" />

        </div>
      </section>

      <!-- ABOUT ME -->

      <AboutMe :bio="profile.bio" />

    </div>
  </div>
</template>