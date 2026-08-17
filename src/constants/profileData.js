
import { computed, ref } from "vue";

import profileImage from "@/assets/icon/logo.png"


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
  name: "Kabir Mahmud",
  username: "kabir.mahmud",
  email: "alamgir@example.com",
  phone: "+880 1712-345678",

  avatar: profileImage,

  batch: "2009",
  designation: "Full Stack Web Developer",
  company: "Tech Solutions Ltd.",

  location: "Chattogram, Bangladesh",

  bio: "Passionate software engineer and proud member of the alumni community. I enjoy building meaningful products, mentoring young developers and staying connected with fellow alumni.",

  // Profile Status
  profileCompletion: 92,
  emailVerified: true,
  phoneVerified: true,
  accountStatus: "Active",

  // Personal Information
  personal: {
    fullName: "Kabir Mahmud",
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

 // Social Links
  social: [
    {
      id: 1,
      name: "Website",
      icon: "lucide:globe",
      url: "https://example.com",
      color: "#0ea5e9",
    },

    {
      id: 2,
      name: "LinkedIn",
      icon: "mdi:linkedin",
      url: "https://linkedin.com",
      color: "#0a66c2",
    },

    {
      id: 3,
      name: "Facebook",
      icon: "mdi:facebook",
      url: "https://facebook.com",
      color: "#1877f2",
    },

    {
      id: 4,
      name: "GitHub",
      icon: "mdi:github",
      url: "https://github.com",
      color: "#18181b",
    },

    {
      id: 5,
      name: "Instagram",
      icon: "mdi:instagram",
      url: "https://instagram.com",
      color: "#e1306c",
    },
  ],

  // Account Information
  account: {
    memberId: "ALU-2009-0001",
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

