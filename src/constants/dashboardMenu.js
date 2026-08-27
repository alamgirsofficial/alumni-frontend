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
  ClipboardList  ,
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
        title: "Event List",
        route: "/dashboard/events",
        icon: List,
      },
        {
        title: "Create Event",
        route: "/dashboard/events/create",
        icon: PlusCircle,
      },
      {
        title: "Event Registrations",
        route: "/dashboard/events/registrations",
        icon: ClipboardList  ,
      },
    ],
  },

  {
    title: "Blogs",
    icon: FileText,
    children: [
      {
        title: "Blog List",
        route: "/dashboard/blogs",
        icon: List,
      },
      {
        title: "Create Blog",
        route: "/dashboard/blogs/create",
        icon: PlusCircle,
      },
      
    ],
  },

  {
    title: "Gallery",
    icon: Images,
    children: [
      {
        title: "Gallery List",
        route: "/dashboard/gallery",
        icon: List,
      },
      {
        title: "Create Gallery",
        route: "/dashboard/gallery/create",
        icon: PlusCircle,
      },
    ],
  },

  {
    title: "Committee",
    icon: UserRoundCog,
    children: [
      {
        title: "Committee List",
        route: "/dashboard/committee",
        icon: List,
      },
      // {
      //   title: "committee Members",
      //   route: "/dashboard/committee/members",
      //   icon: List,

      // },
      {
        title: "Create Member",
        route: "/dashboard/committee/create",
        icon: PlusCircle,
      },
    ],
  },

  {
    title: "Messages",
    icon: Mail,
    children: [ 
      {
        title: "Message List",
        route: "/dashboard/messages",
        icon: List,
      },
      {
        title: "Message Details",
        route: "/dashboard/messages/:messageId/details",
        icon: PlusCircle,
      },
    ],
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