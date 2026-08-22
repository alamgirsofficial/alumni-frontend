import {
  LayoutDashboard,
  Users,
  CalendarDays,
  FileText,
  Images,
  UserRoundCog,
  Mail,
  BarChart3,
  Settings,
  UserCircle,
} from "@lucide/vue";

export const adminMenuItems = [
  {
    title: "Dashboard",
    route: "/admin/dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Members",
    route: "/admin/members",
    icon: Users,
  },

  {
    title: "Events",
    route: "/admin/events",
    icon: CalendarDays,
  },

  {
    title: "Blogs",
    route: "/admin/blogs",
    icon: FileText,
  },

  {
    title: "Gallery",
    route: "/admin/gallery",
    icon: Images,
  },

  {
    title: "Committee",
    route: "/admin/committee",
    icon: UserRoundCog,
  },

  {
    title: "Messages",
    route: "/admin/messages",
    icon: Mail,
  },

  {
    title: "Reports",
    route: "/admin/reports",
    icon: BarChart3,
  },

  {
    title: "Settings",
    route: "/admin/settings",
    icon: Settings,
  },

  {
    title: "Profile",
    route: "/profile",
    icon: UserCircle,
  },
];