<script setup>
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  BriefcaseBusiness,
  Building2,
  Globe,
  Edit3,
  LockKeyhole,
  CheckCircle2,
  ShieldCheck,
  Camera,
  ChevronRight,
  Award,
  Heart,
  Languages,
  UserRound,
  Hash,
  BadgeCheck,
} from "@lucide/vue";

import {
  profile,
  initials,
  completionColor,
  editProfile,
  changePassword,
} from "@/constants/profileData.js";

import SocialLinks from "@/components/common/SocialLinks.vue";
</script>

<template>
  <div class="relative min-h-full overflow-hidden">
    <!-- =========================================================
         AMBIENT BACKGROUND
    ========================================================== -->

    <div
      class="pointer-events-none absolute -left-40 -top-40 h-80 w-80 rounded-full bg-blue-600/10 blur-[120px]"
    />

    <div
      class="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-cyan-500/5 blur-[120px]"
    />

    <div
      class="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-blue-500/5 blur-[120px]"
    />

    <!-- =========================================================
         MAIN CONTENT
    ========================================================== -->

    <div class="relative space-y-6">
      <!-- =======================================================
           PAGE HEADER
      ======================================================== -->

      <div
        class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <!-- Breadcrumb -->

          <div
            class="mb-2 flex items-center gap-2 text-[11px] text-slate-600"
          >
            <span>Dashboard</span>

            <ChevronRight :size="12" />

            <span class="text-cyan-400">
              My Profile
            </span>
          </div>

          <h1
            class="text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            My Profile
          </h1>

          <p class="mt-1.5 text-sm text-slate-500">
            Manage your personal information and account settings.
          </p>
        </div>

        <!-- Actions -->

        <div class="flex flex-wrap gap-2.5">
          <button
            type="button"
            @click="changePassword"
            class="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-2.5 text-xs font-medium text-slate-400 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.07] hover:text-white"
          >
            <LockKeyhole :size="15" />

            Change Password
          </button>

          <button
            type="button"
            @click="editProfile"
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-500 to-cyan-400 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-blue-500/30"
          >
            <Edit3 :size="15" />

            Edit Profile
          </button>
        </div>
      </div>

      <!-- =======================================================
           PROFILE HERO
      ======================================================== -->

      <section
        class="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0b1424]/80 shadow-xl shadow-black/10 backdrop-blur-2xl"
      >
        <!-- Cover -->

        <div
          class="relative h-32 overflow-hidden sm:h-40"
        >
          <div
            class="absolute inset-0 bg-linear-to-r from-blue-600/20 via-cyan-500/10 to-blue-500/5"
          />

          <div
            class="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.20),transparent_32%),radial-gradient(circle_at_85%_0%,rgba(34,211,238,0.14),transparent_32%)]"
          />

          <!-- Decorative rings -->

          <div
            class="absolute -right-16 -top-24 h-64 w-64 rounded-full border border-cyan-400/10"
          />

          <div
            class="absolute -right-24 -top-20 h-64 w-64 rounded-full border border-blue-400/10"
          />

          <div
            class="absolute left-1/3 top-4 h-20 w-20 rounded-full bg-cyan-400/5 blur-3xl"
          />
        </div>

        <!-- Hero content -->

        <div class="relative px-5 pb-6 sm:px-7 sm:pb-7">
          <div
            class="-mt-14 flex flex-col gap-5 sm:-mt-16 lg:flex-row lg:items-end lg:justify-between"
          >
            <!-- Profile -->

            <div
              class="flex flex-col gap-4 sm:flex-row sm:items-end"
            >
              <!-- Avatar -->

              <div class="relative shrink-0">
                <div
                  class="flex h-28 w-28 items-center justify-center overflow-hidden rounded-[26px] border-4 border-[#0b1424] bg-linear-to-br from-blue-500/20 to-cyan-400/10 text-3xl font-bold text-cyan-300 shadow-2xl shadow-blue-500/10 sm:h-32 sm:w-32"
                >
                  <img
                    v-if="profile.avatar"
                    :src="profile.avatar"
                    :alt="profile.name"
                    class="h-full w-full object-cover"
                  />

                  <span v-else>
                    {{ initials }}
                  </span>
                </div>

                <!-- Online -->

                <div
                  class="absolute bottom-1.5 right-1.5 flex h-7 w-7 items-center justify-center rounded-xl border-2 border-[#0b1424] bg-emerald-400"
                >
                  <span
                    class="h-2.5 w-2.5 rounded-full bg-white"
                  />
                </div>

                <!-- Camera -->

                <button
                  type="button"
                  class="absolute -right-2 top-2 flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-slate-800 text-slate-400 shadow-lg transition hover:bg-slate-700 hover:text-white"
                >
                  <Camera :size="14" />
                </button>
              </div>

              <!-- Name / info -->

              <div class="pb-1">
                <div class="flex flex-wrap items-center gap-2">
                  <h2
                    class="text-2xl font-bold tracking-tight text-white sm:text-3xl"
                  >
                    {{ profile.name }}
                  </h2>

                  <BadgeCheck
                    v-if="profile.emailVerified"
                    :size="20"
                    class="text-cyan-400"
                  />
                </div>

                <p
                  class="mt-1.5 text-sm font-medium text-cyan-400"
                >
                  {{ profile.designation }}
                </p>

                <div
                  class="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-slate-500"
                >
                  <span class="inline-flex items-center gap-1.5">
                    <GraduationCap :size="13" />

                    Batch {{ profile.batch }}
                  </span>

                  <span class="inline-flex items-center gap-1.5">
                    <Building2 :size="13" />

                    {{ profile.company }}
                  </span>

                  <span class="inline-flex items-center gap-1.5">
                    <MapPin :size="13" />

                    {{ profile.location }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Verification card -->

            <div
              class="flex w-full items-center justify-between gap-4 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.035] p-4 lg:w-auto lg:min-w-60"
            >
              <div class="flex items-center gap-3">
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10"
                >
                  <ShieldCheck
                    :size="18"
                    class="text-emerald-400"
                  />
                </div>

                <div>
                  <p class="text-[9px] uppercase tracking-wider text-slate-600">
                    Account Status
                  </p>

                  <p
                    class="mt-1 text-sm font-semibold text-emerald-400"
                  >
                    {{ profile.accountStatus }}
                  </p>
                </div>
              </div>

              <CheckCircle2
                :size="18"
                class="text-emerald-400"
              />
            </div>
          </div>

          <!-- Member information -->

          <div
            class="mt-6 flex flex-wrap items-center gap-2.5 border-t border-white/5 pt-5"
          >
            <div
              class="inline-flex items-center gap-2 rounded-full border border-white/7 bg-white/[0.025] px-3 py-1.5"
            >
              <Hash
                :size="12"
                class="text-cyan-400"
              />

              <span class="text-[9px] text-slate-600">
                Member ID
              </span>

              <span class="text-[10px] font-semibold text-slate-300">
                {{ profile.account.memberId }}
              </span>
            </div>

            <div
              v-if="profile.emailVerified"
              class="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/10 bg-emerald-400/[0.035] px-3 py-1.5 text-[9px] text-emerald-400"
            >
              <CheckCircle2 :size="11" />

              Email Verified
            </div>

            <div
              v-if="profile.phoneVerified"
              class="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/10 bg-emerald-400/[0.035] px-3 py-1.5 text-[9px] text-emerald-400"
            >
              <CheckCircle2 :size="11" />

              Phone Verified
            </div>
          </div>
        </div>
      </section>

      <!-- =======================================================
           PROFILE COMPLETION
      ======================================================== -->

      <section
        class="rounded-2xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl sm:p-6"
      >
        <div
          class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10"
            >
              <UserRound
                :size="18"
                class="text-blue-400"
              />
            </div>

            <div>
              <h3 class="text-sm font-semibold text-white">
                Profile Completion
              </h3>

              <p class="mt-0.5 text-[10px] text-slate-600">
                Complete your profile to help other alumni know you better.
              </p>
            </div>
          </div>

          <span
            class="text-xl font-bold"
            :class="completionColor"
          >
            {{ profile.profileCompletion }}%
          </span>
        </div>

        <div
          class="mt-5 h-2 overflow-hidden rounded-full bg-white/5"
        >
          <div
            class="h-full rounded-full bg-linear-to-r from-blue-500 via-cyan-400 to-cyan-300 transition-all duration-700"
            :style="{
              width: `${profile.profileCompletion}%`,
            }"
          />
        </div>

        <div
          class="mt-3 flex items-center justify-between text-[9px] text-slate-600"
        >
          <span>Profile strength</span>

          <span>
            {{
              profile.profileCompletion >= 90
                ? "Excellent"
                : "Good"
            }}
          </span>
        </div>
      </section>

      <!-- =======================================================
           MAIN GRID
      ======================================================== -->

      <section
        class="grid grid-cols-1 gap-6 xl:grid-cols-3"
      >
        <!-- =====================================================
             LEFT / MAIN
        ====================================================== -->

        <div class="space-y-6 xl:col-span-2">
          <!-- =====================================================
               PERSONAL INFORMATION
          ====================================================== -->

          <section class="profile-card">
            <div class="section-heading">
              <div>
                <p class="section-kicker">
                  Personal
                </p>

                <h2 class="section-title">
                  Personal Information
                </h2>

                <p class="section-description">
                  Your basic personal details
                </p>
              </div>

              <div class="section-icon bg-blue-500/10">
                <User
                  :size="17"
                  class="text-blue-400"
                />
              </div>
            </div>

            <div
              class="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2"
            >
              <div class="detail-item">
                <p class="detail-label">
                  Full Name
                </p>

                <p class="detail-value">
                  {{ profile.personal.fullName }}
                </p>
              </div>

              <div class="detail-item">
                <p class="detail-label">
                  Date of Birth
                </p>

                <p class="detail-value flex items-center gap-2">
                  <Calendar
                    :size="13"
                    class="text-slate-600"
                  />

                  {{ profile.personal.dateOfBirth }}
                </p>
              </div>

              <div class="detail-item">
                <p class="detail-label">
                  Gender
                </p>

                <p class="detail-value">
                  {{ profile.personal.gender }}
                </p>
              </div>

              <div class="detail-item">
                <p class="detail-label">
                  Blood Group
                </p>

                <span
                  class="mt-2 inline-flex w-fit rounded-lg border border-red-400/10 bg-red-400/5 px-2.5 py-1 text-[10px] font-medium text-red-300"
                >
                  {{ profile.personal.bloodGroup }}
                </span>
              </div>

              <div class="detail-item">
                <p class="detail-label">
                  Nationality
                </p>

                <p class="detail-value">
                  {{ profile.personal.nationality }}
                </p>
              </div>

              <div class="detail-item">
                <p class="detail-label">
                  Address
                </p>

                <p class="detail-value flex items-start gap-2">
                  <MapPin
                    :size="13"
                    class="mt-0.5 shrink-0 text-slate-600"
                  />

                  {{ profile.personal.address }}
                </p>
              </div>
            </div>
          </section>

          <!-- =====================================================
               EDUCATION
          ====================================================== -->

          <section class="profile-card">
            <div class="section-heading">
              <div>
                <p class="section-kicker">
                  Academic
                </p>

                <h2 class="section-title">
                  Education
                </h2>

                <p class="section-description">
                  Academic background and qualifications
                </p>
              </div>

              <div class="section-icon bg-cyan-500/10">
                <GraduationCap
                  :size="18"
                  class="text-cyan-400"
                />
              </div>
            </div>

            <div class="mt-6 space-y-5">
              <div
                v-for="education in profile.education"
                :key="education.id"
                class="group relative pl-7"
              >
                <!-- timeline line -->

                <div
                  class="absolute bottom-0 left-0 top-0 w-px bg-linear-to-b from-cyan-400/30 via-blue-400/10 to-transparent"
                />

                <!-- timeline dot -->

                <div
                  class="absolute -left-[4px] top-1.5 h-2.5 w-2.5 rounded-full bg-cyan-400 ring-4 ring-cyan-400/5"
                />

                <div
                  class="rounded-xl border border-white/5 bg-white/[0.015] p-4 transition-all duration-300 group-hover:border-cyan-400/10 group-hover:bg-cyan-400/[0.02]"
                >
                  <div
                    class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"
                  >
                    <div>
                      <h3
                        class="text-sm font-semibold text-slate-200"
                      >
                        {{ education.degree }}
                      </h3>

                      <p
                        class="mt-1 text-xs font-medium text-cyan-400"
                      >
                        {{ education.institution }}
                      </p>

                      <p class="mt-1 text-[10px] text-slate-600">
                        {{ education.field }}
                      </p>
                    </div>

                    <span
                      class="w-fit rounded-full border border-white/7 bg-white/[0.03] px-2.5 py-1 text-[9px] text-slate-500"
                    >
                      {{ education.startYear }}
                      -
                      {{ education.endYear }}
                    </span>
                  </div>

                  <div
                    class="mt-3 inline-flex items-center gap-1.5 text-[10px] text-slate-500"
                  >
                    <Award
                      :size="12"
                      class="text-cyan-500"
                    />

                    {{ education.result }}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- =====================================================
               PROFESSIONAL
          ====================================================== -->

          <section class="profile-card">
            <div class="section-heading">
              <div>
                <p class="section-kicker">
                  Career
                </p>

                <h2 class="section-title">
                  Professional Information
                </h2>

                <p class="section-description">
                  Current professional information
                </p>
              </div>

              <div class="section-icon bg-violet-500/10">
                <BriefcaseBusiness
                  :size="17"
                  class="text-violet-400"
                />
              </div>
            </div>

            <div
              class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              <div class="info-box">
                <p class="detail-label">
                  Current Position
                </p>

                <p class="detail-value">
                  {{ profile.professional.currentPosition }}
                </p>
              </div>

              <div class="info-box">
                <p class="detail-label">
                  Company
                </p>

                <p class="detail-value flex items-center gap-2">
                  <Building2
                    :size="13"
                    class="text-slate-600"
                  />

                  {{ profile.professional.company }}
                </p>
              </div>

              <div class="info-box">
                <p class="detail-label">
                  Industry
                </p>

                <p class="detail-value">
                  {{ profile.professional.industry }}
                </p>
              </div>

              <div class="info-box">
                <p class="detail-label">
                  Experience
                </p>

                <p class="detail-value">
                  {{ profile.professional.experience }}
                </p>
              </div>

              <div class="info-box">
                <p class="detail-label">
                  Work Location
                </p>

                <p class="detail-value">
                  {{ profile.professional.workLocation }}
                </p>
              </div>

              <div class="info-box">
                <p class="detail-label">
                  Employment Type
                </p>

                <p class="detail-value">
                  {{ profile.professional.employmentType }}
                </p>
              </div>
            </div>
          </section>

          <!-- =====================================================
               SKILLS
          ====================================================== -->

          <section class="profile-card">
            <div class="section-heading">
              <div>
                <p class="section-kicker">
                  Expertise
                </p>

                <h2 class="section-title">
                  Skills & Expertise
                </h2>

                <p class="section-description">
                  Technical and professional skills
                </p>
              </div>

              <div class="section-icon bg-cyan-500/10">
                <Award
                  :size="17"
                  class="text-cyan-400"
                />
              </div>
            </div>

            <div class="mt-5 flex flex-wrap gap-2">
              <span
                v-for="skill in profile.skills"
                :key="skill"
                class="rounded-lg border border-cyan-400/10 bg-cyan-400/[0.035] px-3 py-2 text-[10px] font-medium text-cyan-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/20 hover:bg-cyan-400/[0.07]"
              >
                {{ skill }}
              </span>
            </div>
          </section>
        </div>

        <!-- =====================================================
             RIGHT
        ====================================================== -->

        <div class="space-y-6">
          <!-- =====================================================
               CONTACT
          ====================================================== -->

          <section class="profile-card">
            <div class="flex items-center gap-3">
              <div class="section-icon bg-blue-500/10">
                <Mail
                  :size="17"
                  class="text-blue-400"
                />
              </div>

              <div>
                <h2 class="section-title">
                  Contact Information
                </h2>

                <p class="section-description">
                  Your contact details
                </p>
              </div>
            </div>

            <div class="mt-6 space-y-5">
              <!-- Email -->

              <div class="flex gap-3">
                <div class="contact-icon">
                  <Mail :size="14" />
                </div>

                <div class="min-w-0">
                  <p class="detail-label">
                    Email
                  </p>

                  <p class="mt-1 truncate text-xs text-slate-300">
                    {{ profile.email }}
                  </p>

                  <span
                    v-if="profile.emailVerified"
                    class="mt-1.5 inline-flex items-center gap-1 text-[9px] text-emerald-400"
                  >
                    <CheckCircle2 :size="10" />

                    Verified
                  </span>
                </div>
              </div>

              <!-- Phone -->

              <div class="flex gap-3">
                <div class="contact-icon">
                  <Phone :size="14" />
                </div>

                <div>
                  <p class="detail-label">
                    Phone
                  </p>

                  <p class="mt-1 text-xs text-slate-300">
                    {{ profile.phone }}
                  </p>

                  <span
                    v-if="profile.phoneVerified"
                    class="mt-1.5 inline-flex items-center gap-1 text-[9px] text-emerald-400"
                  >
                    <CheckCircle2 :size="10" />

                    Verified
                  </span>
                </div>
              </div>

              <!-- Location -->

              <div class="flex gap-3">
                <div class="contact-icon">
                  <MapPin :size="14" />
                </div>

                <div>
                  <p class="detail-label">
                    Location
                  </p>

                  <p class="mt-1 text-xs text-slate-300">
                    {{ profile.location }}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- =====================================================
               SOCIAL
          ====================================================== -->

          <section class="profile-card">
            <div class="flex items-center gap-3">
              <div class="section-icon bg-cyan-500/10">
                <Globe
                  :size="17"
                  class="text-cyan-400"
                />
              </div>

              <div>
                <h2 class="section-title">
                  Social & Links
                </h2>

                <p class="section-description">
                  Connect with your network
                </p>
              </div>
            </div>

            <div class="mt-5">
              <!-- IMPORTANT:
                   profile.social instead of member.social -->

              <SocialLinks
                :social-links="profile.social"
                size="sm"
              />
            </div>
          </section>

          <!-- =====================================================
               ACCOUNT
          ====================================================== -->

          <section class="profile-card">
            <div class="flex items-center gap-3">
              <div class="section-icon bg-violet-500/10">
                <ShieldCheck
                  :size="17"
                  class="text-violet-400"
                />
              </div>

              <div>
                <h2 class="section-title">
                  Account Information
                </h2>

                <p class="section-description">
                  Account details
                </p>
              </div>
            </div>

            <div class="mt-6 space-y-4">
              <!-- Member ID -->

              <div class="account-row">
                <span>
                  Member ID
                </span>

                <strong>
                  {{ profile.account.memberId }}
                </strong>
              </div>

              <!-- Role -->

              <div class="account-row">
                <span>
                  Role
                </span>

                <strong
                  class="rounded-full bg-blue-400/10 px-2.5 py-1 text-[9px] font-medium text-blue-400"
                >
                  {{ profile.account.role }}
                </strong>
              </div>

              <!-- Status -->

              <div class="account-row">
                <span>
                  Status
                </span>

                <strong
                  class="inline-flex items-center gap-1.5 text-emerald-400"
                >
                  <span
                    class="h-1.5 w-1.5 rounded-full bg-emerald-400"
                  />

                  {{ profile.account.status }}
                </strong>
              </div>

              <!-- Joined -->

              <div class="account-row">
                <span>
                  Joined
                </span>

                <strong>
                  {{ profile.account.registrationDate }}
                </strong>
              </div>

              <!-- Last Login -->

              <div class="account-row">
                <span>
                  Last Login
                </span>

                <strong>
                  {{ profile.account.lastLogin }}
                </strong>
              </div>
            </div>
          </section>
        </div>
      </section>

      <!-- =======================================================
           ABOUT ME
      ======================================================== -->

      <section
        class="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-blue-500/[0.045] to-cyan-400/[0.02] p-5 backdrop-blur-xl sm:p-6"
      >
        <div
          class="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-cyan-400/5 blur-3xl"
        />

        <div class="relative flex items-start gap-4">
          <div
            class="section-icon h-10 w-10 shrink-0 bg-pink-500/10"
          >
            <Heart
              :size="17"
              class="text-pink-400"
            />
          </div>

          <div>
            <h2 class="section-title">
              About Me
            </h2>

            <p class="section-description">
              A short introduction
            </p>

            <p
              class="mt-4 max-w-4xl text-sm leading-7 text-slate-400"
            >
              {{ profile.bio }}
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.profile-card {
  border-radius: 1rem;
  border: 1px solid rgb(255 255 255 / 0.1);
  background: rgb(255 255 255 / 0.025);
  padding: 1.25rem;
  backdrop-filter: blur(20px);
}

@media (min-width: 640px) {
  .profile-card {
    padding: 1.5rem;
  }
}

.profile-card {
  transition:
    border-color 300ms ease,
    background 300ms ease,
    box-shadow 300ms ease;
}

.profile-card:hover {
  border-color: rgb(255 255 255 / 0.12);
  background: rgb(255 255 255 / 0.03);
}

.section-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.section-icon {
  display: flex;
  height: 2.25rem;
  width: 2.25rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
}

.section-kicker {
  margin-bottom: 0.25rem;
  font-size: 9px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: rgb(34 211 238);
}

.section-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: rgb(255 255 255);
}

.section-description {
  margin-top: 0.25rem;
  font-size: 10px;
  color: rgb(71 85 105);
}

.detail-item {
  min-width: 0;
}

.detail-label {
  font-size: 9px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: rgb(71 85 105);
}

.detail-value {
  margin-top: 0.45rem;
  font-size: 0.75rem;
  line-height: 1.25rem;
  color: rgb(203 213 225);
}

.info-box {
  border-radius: 0.875rem;
  border: 1px solid rgb(255 255 255 / 0.05);
  background: rgb(255 255 255 / 0.015);
  padding: 1rem;
  transition: all 300ms ease;
}

.info-box:hover {
  border-color: rgb(34 211 238 / 0.1);
  background: rgb(34 211 238 / 0.025);
}

.contact-icon {
  display: flex;
  height: 2rem;
  width: 2rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 0.625rem;
  background: rgb(255 255 255 / 0.03);
  color: rgb(100 116 139);
}

.account-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid rgb(255 255 255 / 0.04);
  padding-bottom: 0.75rem;
}

.account-row:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.account-row > span {
  font-size: 9px;
  color: rgb(71 85 105);
}

.account-row > strong {
  max-width: 65%;
  text-align: right;
  font-size: 10px;
  font-weight: 500;
  color: rgb(148 163 184);
}
</style>