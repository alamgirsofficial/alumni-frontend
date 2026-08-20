# Vue 3 + Vite




📌 Project Overview
📂 Folder Structure
🚀 Development Flow
✅ Task Checklist
🐞 Bugs
💡 Ideas
📅 Version History


# Alumni Management System

## 📌 Project Information

**Frontend: use TechStack** 
 1. Vue 3 
 2. Vite
 3. Tailwind CSS
 4. Animation-AOS
 5. Icon-lucide/vue [x]
 6. Install @iconify/vue for brand icon and Social
 7. lightweight custom Vue + Tailwind slider for testimonial section

 

**Backend:** Laravel API

---

# 📂 Project Structure

```
[[[[[[[[  Main Structure  ]]]]]]]]
src/
│
├── assets/
│
├── components/
│   │
│   ├── blog/
│   ├── common/
│   ├── event/
│   ├── footer/
│   ├── gallery/
│   ├── home/
│   ├── layout/
│   ├── members/
│   │
│   └── admin/                  ← NEW
│       ├── AdminSidebar.vue
│       ├── AdminNavbar.vue
│       ├── AdminBreadcrumb.vue
│       └── AdminUserMenu.vue
│
├── constrants/
│
├── layouts/
│   ├── AuthLayout.vue
│   ├── MainLayout.vue
│   └── AdminLayout.vue         ← NEW
│
├── pages/
│   │
│   ├── auth/
│   │
│   ├── admin/                  ← NEW
│   │   ├── Dashboard.vue
│   │   │
│   │   ├── members/
│   │   │   ├── Members.vue
│   │   │   ├── MemberCreate.vue
│   │   │   └── MemberDetails.vue
│   │   │
│   │   ├── events/
│   │   │   ├── Events.vue
│   │   │   ├── EventCreate.vue
│   │   │   ├── EventEdit.vue
│   │   │   ├── EventDetails.vue
│   │   │   └── EventRegistrations.vue
│   │   │
│   │   ├── blogs/
│   │   │   ├── Blogs.vue
│   │   │   ├── BlogCreate.vue
│   │   │   └── BlogEdit.vue
│   │   │
│   │   ├── gallery/
│   │   │   └── Gallery.vue
│   │   │
│   │   ├── committee/
│   │   │   └── Committee.vue
│   │   │
│   │   ├── messages/
│   │   │   └── Messages.vue
│   │   │
│   │   ├── reports/
│   │   │   └── Reports.vue
│   │   │
│   │   └── settings/
│   │       ├── Settings.vue
│   │       └── Profile.vue
│   │
│   ├── About.vue
│   ├── BlogDetails.vue
│   ├── Blogs.vue
│   ├── Contact.vue
│   ├── EventDetails.vue
│   ├── Events.vue
│   ├── ExecutiveCommittee.vue
│   ├── Gallery.vue
│   ├── Home.vue
│   └── Members.vue
│
├── router/
│
└── App.vue

[[[[[ Page Structure ]]]]]

pages/
│
├── Home.vue
├── About.vue
├── Events.vue
├── Blogs.vue
├── Gallery.vue
├── Contact.vue
└── Login.vue

[[[[[Home Page Section]]]]]

components/
│
├── home/
│   ├── HeroSection.vue
│   ├── WelcomeSection.vue
│   ├── FeatureSection.vue
│   ├── StatisticsSection.vue
│   ├── EventSection.vue
│   ├── BlogSection.vue
│   ├── AlumniSection.vue
│   ├── TestimonialSection.vue
│   ├── GallerySection.vue
│   ├── CTASection.vue
│   └── FooterSection.vue

//====================== Common Components
components/common/
├── LoadingSpinner.vue
├── Pagination.vue
├── BaseModal.vue
├── ConfirmDialog.vue
├── EmptyState.vue
├── SearchInput.vue
├── BaseButton.vue
└── ...

//========================== Constants

constrants/
├── about.js
    ├── blogData.js
    ├── committeeData.js
    ├── events.js
    ├── executiveMembers.js
    ├── footer.js
    ├── gallery.js
    ├── members.js
    ├── socialPlatforms.js
    ├── statistics.js
    └── testimonial.js
    │
    └── admin/
        ├── dashboardData.js
        ├── memberData.js
        ├── eventData.js
        └── registrationData.js



// ==================== Gallery 

└── gallery/
│       ├── GalleryHero.vue
│       ├── GalleryFilter.vue
│       ├── FeaturedGallery.vue
│       ├── GalleryGrid.vue
│       ├── GalleryCard.vue
│       └── GalleryLightbox.vue
```

//======================= User Profile View
User Profile
│
├── Profile
│   ├── name
│   ├── avatar
│   ├── batch
│   ├── designation
│   └── bio
│
├── Personal Information
│
├── Educations[]
│
├── Professional Information
│
├── Skills[]
│
├── Social Links
│
└── Account
    ├── member_id
    ├── role
    ├── status
    ├── email_verified
    └── phone_verified

components/
└── profile/
    └── edit/
        ├── ProfileEditHeader.vue
        ├── ProfilePhotoEditor.vue
        ├── PersonalInfoForm.vue
        ├── ContactInfoForm.vue
        ├── ProfessionalInfoForm.vue
        ├── EducationForm.vue
        ├── ExperienceForm.vue
        ├── SkillsForm.vue
        ├── SocialLinksForm.vue
        └── ProfileEditSidebar.vue



---

# 🚀 Development Flow

## ✅ Day 01

- [x] Vue Project Create
- [x] Tailwind CSS Install
- [x] AOS Install
- [x] AOS Configure
- [x] Lucid Icon install
- [x] Folder Structure Ready
- [x] Navbar Design
- [x] Header Design
- [x] install vue-toastification


---

## ✅ Day 02

- [x] Home Page
- [ ] About Page
- [ ] Contact Page
- [ ] Footer

---

## 📝 Next Task

- [ ] Vue Router Setup
- [ ] Login Page
- [ ] Dashboard Layout

---

# 📖 Notes

### Navbar

- Responsive
- Glassmorphism
- Mobile Menu
- Sticky

### Home

- Hero Section
- Feature Section
- Alumni Counter
- CTA

---

# 🐞 Bugs

- Mobile Menu Animation Fix
- Dark Mode Issue

---

# 💡 Ideas

- Add Theme Switcher
- Add Animation
- Add Dashboard


==========================================
# Roadmap

## Phase 1

- [x] Project Setup
- [x] Tailwind
- [x] Navbar
- [x] Hero Section

## Phase 2

- [ ] Authentication
- [ ] Login
- [ ] Register
- [ ] Forgot Password

## Phase 3

- [ ] Dashboard
- [ ] Alumni List
- [ ] Student List
- [ ] Event Module

## Phase 4

- [ ] Backend API
- [ ] CRUD
- [ ] Search
- [ ] Pagination





<!-- Fo Clean LocalStorage data  -->
localStorage.removeItem("alumni_profile");
localStorage.getItem("alumni_profile");