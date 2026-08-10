import {
    ArrowRightIcon,
    MessageSquare,
    Box,
    CodeXml,
    PaintbrushVertical,
    ServerIcon,
    GraduationCap,
    Users,
    HeartHandshake,
    Trophy
} from '@lucide/vue';


export const aboutWorks = [
    {
        id: 1,
        icon: CodeXml,
        iconColor: "text-blue-400",
        title: "যোগাযোগ ও সহযোগিতা",
        desc: "প্রাক্তন শিক্ষার্থীদের মধ্যে একটি শক্তিশালী নেটওয়ার্ক তৈরি করে যোগাযোগ ও পারস্পরিক সহযোগিতা বৃদ্ধি করা।"
    },

    {
        id: 2,
        icon: ServerIcon,
        iconColor: "text-cyan-400",
        title: "শিক্ষা প্রতিষ্ঠানের উন্নয়ন",
        desc: "প্রাক্তন শিক্ষার্থীদের সহযোগিতায় শিক্ষা প্রতিষ্ঠানের উন্নয়নমূলক কার্যক্রমে অংশগ্রহণ করা।"
    },

    {
        id: 3,
        icon: PaintbrushVertical,
        iconColor: "text-blue-400",
        title: "অনুষ্ঠান আয়োজন",
        desc: "প্রাক্তন শিক্ষার্থীদের মিলনমেলা, পুনর্মিলনী ও অন্যান্য সামাজিক অনুষ্ঠানের আয়োজন করা।"
    },

    {
        id: 4,
        icon: Box,
        iconColor: "text-cyan-400",
        title: "বৃত্তি ও আর্থিক সহায়তা",
        desc: "মেধাবী ও অসচ্ছল শিক্ষার্থীদের বৃত্তি এবং প্রয়োজনীয় আর্থিক সহায়তা প্রদান করা।"
    },

    {
        id: 5,
        icon: GraduationCap,
        iconColor: "text-blue-400",
        title: "পরামর্শ ও সহযোগিতা",
        desc: "বর্তমান শিক্ষার্থীদের শিক্ষা, ক্যারিয়ার ও কর্মজীবন সংক্রান্ত বিষয়ে পরামর্শ ও সহযোগিতা প্রদান করা।"
    }
];


// ========================================
// ALUMNI TIMELINE
// ========================================

export const timeline = [
    {
        id: 1,
        year: "2013",
        title: "প্রথম উদ্যোগ",
        description:
            "প্রাক্তন শিক্ষার্থীদের একত্রিত করার মাধ্যমে আমাদের অ্যালামনাই যাত্রার সূচনা।",
        icon: Users,
        iconColor: "text-blue-400"
    },

    {
        id: 2,
        year: "2015",
        title: "আহবায়ক কমিটি গঠন",
        description:
            "অ্যালামনাই কার্যক্রমকে আরও সুসংগঠিত করার লক্ষ্যে আহবায়ক কমিটি গঠন করা হয়।",
        icon: Users,
        iconColor: "text-blue-400"
    },

    {
        id: 3,
        year: "2015",
        title: "প্রথম সংবর্ধনা",
        description:
            "প্রাক্তন শিক্ষার্থীদের নিয়ে প্রথম সংবর্ধনা অনুষ্ঠানের আয়োজন করা হয়।",
        icon: HeartHandshake,
        iconColor: "text-cyan-400"
    },

    {
        id: 4,
        year: "2016",
        title: "দ্বিতীয় সংবর্ধনা",
        description:
            "প্রাক্তন শিক্ষার্থীদের অংশগ্রহণে দ্বিতীয় সংবর্ধনা অনুষ্ঠানের আয়োজন করা হয়।",
        icon: Users,
        iconColor: "text-blue-400"
    },

    {
        id: 5,
        year: "2018",
        title: "কার্যকরী কমিটি গঠন",
        description:
            "অ্যালামনাই কার্যক্রমকে ধারাবাহিকভাবে পরিচালনার জন্য কার্যকরী কমিটি গঠন করা হয়।",
        icon: HeartHandshake,
        iconColor: "text-cyan-400"
    },

    {
        id: 6,
        year: "2020",
        title: "বিভিন্ন উদ্যোগ",
        description:
            "শিক্ষা সহায়তা, সামাজিক কার্যক্রম এবং বিভিন্ন ইভেন্টের মাধ্যমে কার্যক্রম সম্প্রসারণ করা হয়।",
        icon: GraduationCap,
        iconColor: "text-purple-400"
    },

    {
        id: 7,
        year: "2022",
        title: "সামাজিক কার্যক্রম",
        description:
            "শিক্ষার্থী ও সমাজের কল্যাণে বিভিন্ন সামাজিক ও মানবিক কার্যক্রম পরিচালনা করা হয়।",
        icon: Trophy,
        iconColor: "text-yellow-400"
    },

    {
        id: 8,
        year: "2024",
        title: "নতুন সম্ভাবনা",
        description:
            "ডিজিটাল প্ল্যাটফর্মের মাধ্যমে আরও বেশি প্রাক্তন শিক্ষার্থীকে একত্রিত করার নতুন উদ্যোগ নেওয়া হয়।",
        icon: Trophy,
        iconColor: "text-yellow-400"
    }
];


// ========================================
// STATISTICS
// ========================================

export const stats = [
    {
        id: 1,
        value: "৬০০০+",
        label: "প্রাক্তন সদস্য"
    },

    {
        id: 2,
        value: "২০+",
        label: "ইভেন্টস"
    },

    {
        id: 3,
        value: "৫০+",
        label: "সফল উদ্যোগ"
    },

    {
        id: 4,
        value: "১২+",
        label: "বছরের পথচলা"
    }
];