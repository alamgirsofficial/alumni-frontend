import { computed, ref } from "vue";

const summary = ref({
  totalMembers: 1248,
  totalEvents: 36,
  totalRegistrations: 842,
  totalRevenue: 245000,
});

const monthlyData = ref([
  {
    month: "Jan",
    members: 62,
    registrations: 82,
    events: 4,
  },
  {
    month: "Feb",
    members: 78,
    registrations: 115,
    events: 6,
  },
  {
    month: "Mar",
    members: 54,
    registrations: 67,
    events: 3,
  },
  {
    month: "Apr",
    members: 91,
    registrations: 132,
    events: 5,
  },
  {
    month: "May",
    members: 86,
    registrations: 124,
    events: 4,
  },
  {
    month: "Jun",
    members: 108,
    registrations: 156,
    events: 6,
  },
  {
    month: "Jul",
    members: 95,
    registrations: 141,
    events: 5,
  },
  {
    month: "Aug",
    members: 116,
    registrations: 168,
    events: 7,
  },
]);

const reports = ref([
  {
    id: 1,
    name: "Member Growth Report",
    category: "Members",
    type: "members",
    period: "August 2026",
    status: "Ready",
    generatedAt: "28 Aug 2026",
  },
  {
    id: 2,
    name: "Event Performance Report",
    category: "Events",
    type: "events",
    period: "August 2026",
    status: "Ready",
    generatedAt: "28 Aug 2026",
  },
  {
    id: 3,
    name: "Event Registration Report",
    category: "Registration",
    type: "registrations",
    period: "August 2026",
    status: "Ready",
    generatedAt: "27 Aug 2026",
  },
  {
    id: 4,
    name: "Payment Summary Report",
    category: "Finance",
    type: "payments",
    period: "August 2026",
    status: "Ready",
    generatedAt: "27 Aug 2026",
  },
  {
    id: 5,
    name: "Committee Report",
    category: "Committee",
    type: "committees",
    period: "2026",
    status: "Ready",
    generatedAt: "26 Aug 2026",
  },
  {
    id: 6,
    name: "Gallery Media Report",
    category: "Gallery",
    type: "gallery",
    period: "August 2026",
    status: "Ready",
    generatedAt: "25 Aug 2026",
  },
]);

const eventStatistics = ref({
  total: 36,
  completed: 22,
  upcoming: 10,
  cancelled: 4,
});

const totalRevenueFormatted = computed(() => {
  return `৳${summary.value.totalRevenue.toLocaleString("en-BD")}`;
});

export function useReports() {
  return {
    summary,
    monthlyData,
    reports,
    eventStatistics,
    totalRevenueFormatted,
  };
}