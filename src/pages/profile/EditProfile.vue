<script setup>
import { computed, onMounted, reactive, ref } from "vue";

import { 
        profile,
        loadProfile, 
        saveProfile,
        calculateProfileCompletion,
         } from "@/constants/profileData.js";

import { useToast } from "@/composables/useToast.js";

import ProfileEditHeader from "@/components/profile/edit/ProfileEditHeader.vue";
import ProfilePhotoEditor from "@/components/profile/edit/ProfilePhotoEditor.vue";

import PersonalInfoForm from "@/components/profile/edit/PersonalInfoForm.vue";
import ContactInfoForm from "@/components/profile/edit/ContactInfoForm.vue";
import ProfessionalInfoForm from "@/components/profile/edit/ProfessionalInfoForm.vue";

import EducationForm from "@/components/profile/edit/EducationForm.vue";
import SkillsForm from "@/components/profile/edit/SkillsForm.vue";
import SocialLinksForm from "@/components/profile/edit/SocialLinksForm.vue";

import ProfileEditSidebar from "@/components/profile/edit/ProfileEditSidebar.vue";

const { success, error } = useToast();

/*
|--------------------------------------------------------------------------
| Editable Form
|--------------------------------------------------------------------------
*/

const form = reactive(JSON.parse(JSON.stringify(profile.value)));

/*
|--------------------------------------------------------------------------
| Saving State
|--------------------------------------------------------------------------
*/

const saving = ref(false);

/*
|--------------------------------------------------------------------------
| Active Section
|--------------------------------------------------------------------------
*/
const activeSection = ref("personal");

/*
|--------------------------------------------------------------------------
| Navigation
|--------------------------------------------------------------------------
*/

const handleNavigate = (section) => {
  activeSection.value = section;

  const element = document.getElementById(`profile-section-${section}`);

  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

// for Profile Completion 

const completion = computed(() =>
calculateProfileCompletion(form)
);
/*
|--------------------------------------------------------------------------
| Load Profile
|--------------------------------------------------------------------------
*/

onMounted(() => {
  loadProfile();

  Object.assign(form, JSON.parse(JSON.stringify(profile.value)));
});

/*
|--------------------------------------------------------------------------
| Save Profile
|--------------------------------------------------------------------------
*/

const handleSave = async () => {
  saving.value = true;

  try {
    await new Promise((resolve) => {
      setTimeout(resolve, 800);
    });

    /*
    |--------------------------------------------------------------------------
    | Update Runtime Profile
    |--------------------------------------------------------------------------
    */

    Object.assign(profile.value, JSON.parse(JSON.stringify(form)));

    /*
    |--------------------------------------------------------------------------
    | Save to LocalStorage
    |--------------------------------------------------------------------------
    */

    saveProfile();

    success("Profile saved successfully.");
  } catch (err) {
    error("Failed to save profile.");

    console.error(err);
  } finally {
    saving.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen p-4 lg:p-6">
    <!-- =====================================================
         HEADER
    ====================================================== -->

    <ProfileEditHeader
      title="Edit Profile"
      description="Update your personal and professional information"
      :saving="saving"
      @save="handleSave"
    />

    <!-- =====================================================
         CONTENT
    ====================================================== -->

    <div class="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
      <!-- =================================================
           MAIN CONTENT
      ================================================== -->

      <main class="space-y-6 xl:col-span-2">
        <!-- Profile Photo -->

        <ProfilePhotoEditor :profile="form" />

        <!-- Personal Information -->

        <section id="profile-section-personal">
          <PersonalInfoForm v-model="form.personal" />
          
          <ContactInfoForm v-model="form" />
        </section>

        <!-- Contact Information -->


        <!-- Education -->

        <section id="profile-section-education">
          <EducationForm v-model="form.education" />
        </section>

        <!-- Professional Information -->

        <section id="profile-section-experience">
          <ProfessionalInfoForm v-model="form.experiences" />
        </section>

        <!-- Skills -->

        <section id="profile-section-skills">
          <SkillsForm v-model="form.skills" />
        </section>

        <!-- Social Links -->

        <section id="profile-section-social">
          <SocialLinksForm v-model="form.social" />
        </section>
      </main>

      <!-- =================================================
           SIDEBAR
      ================================================== -->

      <aside class="xl:col-span-1">
        <div class="sticky top-24">
            
          <ProfileEditSidebar
            :completion="completion"
            :active-section="activeSection"
            :saving="saving"
            @navigate="handleNavigate"
            @save="handleSave"
          />
        </div>
      </aside>
    </div>
  </div>
</template>
