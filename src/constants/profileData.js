
import { computed, ref } from "vue";


/*
|--------------------------------------------------------------------------
| Profile Data
|--------------------------------------------------------------------------
| Static for now.
|
| Later Laravel API response can replace this object without changing
| the UI structure.
|--------------------------------------------------------------------------
*/

export const profile = ref({
  id: 1,

  // Basic Profile
  name: "Md. Alamgir Hossain",
  username: "alamgir.hossain",
  email: "alamgir@example.com",
  phone: "+880 1712-345678",

  avatar: null,

  batch: "2015",
  designation: "Senior Software Engineer",
  company: "Tech Solutions Ltd.",

  location: "Dhaka, Bangladesh",

  bio: "Passionate software engineer and proud member of the alumni community. I enjoy building meaningful products, mentoring young developers and staying connected with fellow alumni.",

  // Profile Status
  profileCompletion: 92,
  emailVerified: true,
  phoneVerified: true,
  accountStatus: "Active",

  // Personal Information
  personal: {
    fullName: "Md. Alamgir Hossain",
    dateOfBirth: "15 March 1994",
    gender: "Male",
    bloodGroup: "O+",
    nationality: "Bangladeshi",
    address: "Mirpur, Dhaka, Bangladesh",
  },

  // Education
  education: [
    {
      id: 1,
      degree: "Bachelor of Science in Computer Science",
      institution: "Dhaka University",
      field: "Computer Science & Engineering",
      startYear: "2012",
      endYear: "2016",
      result: "CGPA 3.65 / 4.00",
    },
    {
      id: 2,
      degree: "Higher Secondary Certificate",
      institution: "Dhaka College",
      field: "Science",
      startYear: "2010",
      endYear: "2012",
      result: "GPA 5.00",
    },
  ],

  // Professional Information
  professional: {
    currentPosition: "Senior Software Engineer",
    company: "Tech Solutions Ltd.",
    industry: "Software & Technology",
    experience: "8 Years",
    workLocation: "Dhaka, Bangladesh",
    employmentType: "Full Time",
  },

  // Skills
  skills: [
    "Laravel",
    "PHP",
    "Vue.js",
    "JavaScript",
    "MySQL",
    "REST API",
    "Git",
    "Tailwind CSS",
  ],

  // Social & Contact
//   social: {
//     website: "https://example.com",
//     linkedin: "https://linkedin.com",
//     facebook: "https://facebook.com",
//     github: "https://github.com",
//     instagram: "https://instagram.com",
//   },

  // Account Information
  account: {
    memberId: "ALM-2015-0001",
    registrationDate: "12 January 2024",
    lastLogin: "16 August 2026, 03:42 PM",
    role: "Alumni Member",
    status: "Active",
  },
});

/*
|--------------------------------------------------------------------------
| Computed
|--------------------------------------------------------------------------
*/

export const initials = computed(() => {
  return profile.value.name
    .split(" ")
    .map((word) => word.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();
});

export const completionColor = computed(() => {
  if (profile.value.profileCompletion >= 90) {
    return "text-emerald-400";
  }

  if (profile.value.profileCompletion >= 70) {
    return "text-cyan-400";
  }

  return "text-amber-400";
});

/*
|--------------------------------------------------------------------------
| Actions
|--------------------------------------------------------------------------
| Static placeholders for now.
| Later these can call router / API / modal.
|--------------------------------------------------------------------------
*/

export const editProfile = () => {
  console.log("Edit profile");
};

export const changePassword = () => {
  console.log("Change password");
};

