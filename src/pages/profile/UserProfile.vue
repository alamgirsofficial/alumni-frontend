<script setup>
import {
  profile,
  initials,
  completionColor,
  editProfile,
  changePassword,
} from "@/constants/profileData.js";

import ProfileHeader from "@/components/profile/ProfileHeader.vue";
import ProfileHero from "@/components/profile/ProfileHero.vue";
import ProfileCompletion from "@/components/profile/ProfileCompletion.vue";

import PersonalInfo from "@/components/profile/PersonalInfo.vue";
import EducationSection from "@/components/profile/EducationSection.vue";
import ProfessionalInfo from "@/components/profile/ProfessionalInfo.vue";
import SkillsSection from "@/components/profile/SkillsSection.vue";

import ContactInfo from "@/components/profile/ContactInfo.vue";
import SocialLinksCard from "@/components/profile/SocialLinksCard.vue";
import AccountInfo from "@/components/profile/AccountInfo.vue";
import AboutMe from "@/components/profile/AboutMe.vue";
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

      <ProfileHeader
        @edit-profile="editProfile"
        @change-password="changePassword"
      />

      <!-- PROFILE HERO -->

      <ProfileHero
        :profile="profile"
        :initials="initials"
      />

      <!-- PROFILE COMPLETION -->

      <ProfileCompletion
        :profile="profile"
        :completion-color="completionColor"
      />

      <!-- =======================================================
           MAIN GRID
      ======================================================== -->

      <section class="grid grid-cols-1 gap-6 xl:grid-cols-3">

        <!-- =====================================================
             LEFT / MAIN
        ====================================================== -->

        <div class="space-y-6 xl:col-span-2">

          <PersonalInfo
            :profile="profile"
          />

          <EducationSection
            :education="profile.education"
          />

          <ProfessionalInfo
            :professional="profile.professional"
          />

          <SkillsSection
            :skills="profile.skills"
          />

        </div>

        <!-- =====================================================
             RIGHT
        ====================================================== -->

        <div class="space-y-6">

          <ContactInfo
            :profile="profile"
          />

          <SocialLinksCard
            :social="profile.social"
          />

          <AccountInfo
            :account="profile.account"
          />

        </div>
      </section>

      <!-- ABOUT ME -->

      <AboutMe
        :bio="profile.bio"
      />

    </div>
  </div>
</template>