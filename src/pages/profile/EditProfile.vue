<script setup>
import { reactive, ref } from "vue";

import { profile } from "@/constants/profileData.js";

import ProfileEditHeader from "@/components/profile/edit/ProfileEditHeader.vue";
import ProfilePhotoEditor from "@/components/profile/edit/ProfilePhotoEditor.vue";

import PersonalInfoForm from "@/components/profile/edit/PersonalInfoForm.vue";
import ContactInfoForm from "@/components/profile/edit/ContactInfoForm.vue";
import ProfessionalInfoForm from "@/components/profile/edit/ProfessionalInfoForm.vue";

import EducationForm from "@/components/profile/edit/EducationForm.vue";
import ExperienceForm from "@/components/profile/edit/ExperienceForm.vue";

import SkillsForm from "@/components/profile/edit/SkillsForm.vue";
import SocialLinksForm from "@/components/profile/edit/SocialLinksForm.vue";

import ProfileEditSidebar from "@/components/profile/edit/ProfileEditSidebar.vue";

/*
|--------------------------------------------------------------------------
| Editable Form
|--------------------------------------------------------------------------
*/

const form = reactive(
    JSON.parse(JSON.stringify(profile.value))
);

/*
|--------------------------------------------------------------------------
| Saving State
|--------------------------------------------------------------------------
*/

const saving = ref(false);

/*
|--------------------------------------------------------------------------
| Save Profile
|--------------------------------------------------------------------------
*/

const handleSave = async () => {
    saving.value = true;

    try {
        console.log("Profile data:", form);

        /*
        |--------------------------------------------------------------------------
        | Later Laravel API
        |--------------------------------------------------------------------------
        |
        | await axios.put('/api/profile', form);
        |
        |--------------------------------------------------------------------------
        */

        // Temporary
        await new Promise((resolve) => {
            setTimeout(resolve, 800);
        });

        Object.assign(
            profile.value,
            JSON.parse(JSON.stringify(form))
        );

        console.log("Profile Update successfully.");

    } catch (error) {
        console.error("Failed to update profile:", error);

    } finally {
        saving.value = false;
    }
};
</script>

<template>

    <div class="min-h-screen">

        <!-- =====================================================
             HEADER
        ====================================================== -->

        <ProfileEditHeader
            title="Edit Profile"
            description="Update your personal and professional information"
        />

        <!-- =====================================================
             CONTENT
        ====================================================== -->

        <div
            class="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3"
        >

            <!-- =================================================
                 MAIN CONTENT
            ================================================== -->

            <main
                class="space-y-6 xl:col-span-2"
            >

                <!-- Profile Photo -->

                <ProfilePhotoEditor
                    :profile="form"
                />

                <!-- Personal Information -->

                <PersonalInfoForm
                    v-model="form.personal"
                />

                <!-- Contact Information -->

                <ContactInfoForm
                    v-model="form"
                />

                <!-- Professional Information -->

                <ProfessionalInfoForm
                    v-model="form"
                />

                <!-- Education -->

                <EducationForm
                    v-model="form.education"
                />

                <!-- Professional Experience -->

                <ExperienceForm
                    v-model="form.experiences"
                />

                <!-- Skills -->

                <SkillsForm
                    v-model="form.skills"
                />

                <!-- Social Links -->

                <SocialLinksForm
                    v-model="form.social"
                />

            </main>

            <!-- =================================================
                 SIDEBAR
            ================================================== -->

            <aside
                class="xl:col-span-1"
            >

                <div
                    class="sticky top-24"
                >

                    <ProfileEditSidebar
                        :profile="form"
                        :saving="saving"
                        @save="handleSave"
                    />

                </div>

            </aside>

        </div>

    </div>

</template>