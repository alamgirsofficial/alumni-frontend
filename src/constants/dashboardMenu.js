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
  PlusCircle,
  List,
  Pencil,
} from "@lucide/vue";

export const dashboardMenu = [
  {
    title: "Dashboard",
    route: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Alumni",
    icon: Users,
    children: [
      {
        title: "Create Alumni",
        route: "/dashboard/alumni/create",
        icon: PlusCircle,
      },
      {
        title: "Alumni List",
        route: "/dashboard/alumni",
        icon: List,
      },
    ],
  },

  {
    title: "Events",
    icon: CalendarDays,
    children: [
      {
        title: "Create Event",
        route: "/dashboard/events/create",
        icon: PlusCircle,
      },
      {
        title: "Event List",
        route: "/dashboard/events",
        icon: List,
      },
    ],
  },

  {
    title: "Blogs",
    icon: FileText,
    children: [
      {
        title: "Create Blog",
        route: "/dashboard/blogs/create",
        icon: PlusCircle,
      },
      {
        title: "Blog List",
        route: "/dashboard/blogs",
        icon: List,
      },
    ],
  },

  {
    title: "Gallery",
    route: "/dashboard/gallery",
    icon: Images,
  },

  {
    title: "Committee",
    route: "/dashboard/committee",
    icon: UserRoundCog,
  },

  {
    title: "Messages",
    route: "/dashboard/messages",
    icon: Mail,
  },

  {
    title: "Reports",
    route: "/dashboard/reports",
    icon: BarChart3,
  },

  {
    title: "Settings",
    route: "/dashboard/settings",
    icon: Settings,
  },

  {
    title: "Profile",
    route: "/profile",
    icon: UserCircle,
  },
];