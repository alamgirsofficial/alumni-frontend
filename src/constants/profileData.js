
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

  presentAddress: "Bahaddarhat,Chattogram, Bangladesh",

  bio: "Passionate software engineer and proud member of the alumni community. I enjoy building meaningful products, mentoring young developers and staying connected with fellow alumni.",

  // ===================== Profile Status
  profileCompletion: 92,
  emailVerified: true,
  phoneVerified: true,
  accountStatus: "Active",

  // ================= Personal Information
  personal: {
    fullName: "Kabir Mahmud",
    father_name: "Mahmud Kabir",
    mother_name: "Misses kabir",
    dateOfBirth: "15 March 1994",
    nid: "1234567890",
    religion: "Islam",
    gender: "Male",
    bloodGroup: "O+ (Positive)",
    maritalStatus: "Single",
    nationality: "Bangladeshi by Birth",
    permanentAddress: "Anowara, Chattogram, Bangladesh",
  },

  // ==================== Educational Information
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
     {
      id: 3,
      degree: " Secondary School Certificate",
      institution: "Dhaka College",
      field: "Science",
      startYear: "2008",
      endYear: "2010",
      result: "GPA 5.00",
    },
  ],

  // Professional Information
  experiences: [
  {
    id: 1,
    position: "Senior Software Engineer",
    company: "Tech Solutions Ltd.",
    industry: "Software & Technology",
    location: "Dhaka, Bangladesh",
    employmentType: "Full Time",
    startDate: "January 2022",
    endDate: null,
    isCurrent: true,
    description:
      "Leading software development teams and building scalable web applications.",
  },

  {
    id: 2,
    position: "Software Engineer",
    company: "ABC Technologies",
    industry: "Software & Technology",
    location: "Dhaka, Bangladesh",
    employmentType: "Full Time",
    startDate: "July 2018",
    endDate: "December 2021",
    isCurrent: false,
    description:
      "Developed and maintained Laravel and Vue.js based web applications.",
  },

  {
    id: 3,
    position: "Junior Software Developer",
    company: "XYZ Solutions",
    industry: "Software & Technology",
    location: "Chattogram, Bangladesh",
    employmentType: "Full Time",
    startDate: "January 2017",
    endDate: "June 2018",
    isCurrent: false,
    description:
      "Worked on backend APIs and database-driven applications.",
  },
],

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

