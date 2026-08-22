// src/constants/dashboardData.js

import { computed, markRaw } from "vue";

import {
  Users,
  CalendarDays,
  UserCheck,
  Clock3,
  UserPlus,
  FileText,
  Image,
} from "@lucide/vue";


import { users } from "@/constants/users";
import { events } from "@/constants/events";
 import { blogs } from "@/constants/blogData";

/*
|--------------------------------------------------------------------------
| Dashboard Statistics
|--------------------------------------------------------------------------
*/

export const statistics =computed(() =>  [
  {
    id: 1,
    title: "Total Members",
    value: users.length,    //dynamic data insert from localStorage
    change: "12.5%",
    description: "vs last month",
    icon: markRaw(Users),
    iconClass: "text-blue-400",
    glowClass: "bg-blue-500/20",
  },

  {
    id: 2,
    title: "Total Events",
    value: events.length,     //dynamic data insert from localStorage
    change: "8.2%",
    description: "vs last month",
    icon: markRaw(CalendarDays),
    iconClass: "text-cyan-400",
    glowClass: "bg-cyan-500/20",
  },

 {
        id: 3,
        title: "Blog Posts",
        value: blogs.value.length, //dynamic Data inser from localStorage
        change: "15.8%",
        description: "published posts",
        icon: markRaw(FileText),
        iconClass: "text-sky-400",
        glowClass: "bg-sky-500/20",
    },

  {
    id: 4,
    title: "Pending Requests",
    value: "18",
    change: "4.3%",
    description: "needs attention",
    icon: markRaw(Clock3),
    iconClass: "text-amber-400",
    glowClass: "bg-amber-500/20",
  },
]);

/*
|--------------------------------------------------------------------------
| Member Growth
|--------------------------------------------------------------------------
*/

export const memberGrowth = [
  { month: "Jan", value: 720 },
  { month: "Feb", value: 780 },
  { month: "Mar", value: 825 },
  { month: "Apr", value: 890 },
  { month: "May", value: 965 },
  { month: "Jun", value: 1040 },
  { month: "Jul", value: 1140 },
  { month: "Aug", value: 1250 },
];

/*
|--------------------------------------------------------------------------
| Upcoming Events
|--------------------------------------------------------------------------
*/

export const upcomingEvents = [
  {
    id: 1,
    day: "28",
    month: "AUG",
    title: "Annual Alumni Reunion 2026",
    time: "10:00 AM",
    location: "Dhaka, Bangladesh",
    registrations: 245,
    capacity: 500,
  },

  {
    id: 2,
    day: "05",
    month: "SEP",
    title: "Alumni Career Meetup",
    time: "03:00 PM",
    location: "Dhaka, Bangladesh",
    registrations: 128,
    capacity: 250,
  },

  {
    id: 3,
    day: "18",
    month: "SEP",
    title: "Batch 2010 Reunion",
    time: "11:00 AM",
    location: "Chittagong, Bangladesh",
    registrations: 86,
    capacity: 150,
  },
];

/*
|--------------------------------------------------------------------------
| Recent Registrations
|--------------------------------------------------------------------------
*/

export const recentRegistrations = [
  {
    id: 1,
    name: "Md. Rahim Uddin",
    batch: "2015",
    event: "Annual Alumni Reunion 2026",
    date: "16 Aug",
    status: "Confirmed",
    initials: "RU",
  },

  {
    id: 2,
    name: "Nusrat Jahan",
    batch: "2018",
    event: "Annual Alumni Reunion 2026",
    date: "16 Aug",
    status: "Pending",
    initials: "NJ",
  },

  {
    id: 3,
    name: "Sabbir Ahmed",
    batch: "2012",
    event: "Alumni Career Meetup",
    date: "15 Aug",
    status: "Confirmed",
    initials: "SA",
  },

  {
    id: 4,
    name: "Tasnim Akter",
    batch: "2020",
    event: "Annual Alumni Reunion 2026",
    date: "15 Aug",
    status: "Confirmed",
    initials: "TA",
  },
];

/*
|--------------------------------------------------------------------------
| Recent Activities
|--------------------------------------------------------------------------
*/

export const recentActivities = [
  {
    id: 1,
    title: "New member registered",
    description: "Md. Rahim Uddin joined the alumni community.",
    time: "10 min ago",
    icon: markRaw(UserPlus),
    type: "member",
  },

  {
    id: 2,
    title: "New event created",
    description: "Annual Alumni Reunion 2026 was published.",
    time: "35 min ago",
    icon: markRaw(CalendarDays),
    type: "event",
  },

  {
    id: 3,
    title: "New blog published",
    description: "Alumni Success Stories was published.",
    time: "2 hrs ago",
    icon: markRaw(FileText),
    type: "blog",
  },

  {
    id: 4,
    title: "New photos uploaded",
    description: "24 photos were added to Reunion 2025.",
    time: "4 hrs ago",
    icon: markRaw(Image),
    type: "gallery",
  },
];