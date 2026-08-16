import { ref} from 'vue';


import {
    Mail,
    Phone,
    MapPin,
} from "@lucide/vue";




export const footerInfo = {
    school: "উপকূলীয় আদর্শ উচ্চ বিদ্যালয়",
    title: "প্রাক্তন ছাত্র পরিষদ",
    description:
        "আমাদের স্কুলের প্রাক্তন শিক্ষার্থীদের জন্য একটি প্ল্যাটফর্ম। সংযোগ রাখুন, স্মৃতি রোমন্থন করুন এবং বর্তমান শিক্ষার্থীদের সহায়তা করুন।",
};

// for social links 
export const footerSocials = [
    {
        id: 1,
        name: 'Facebook',
        icon: 'mdi:facebook',
        color: '#1877F2',
        url: 'https://facebook.com/your-page',
    },
    {
        id: 2,
        name: 'LinkedIn',
        icon: 'mdi:linkedin',
        color: '#0A66C2',
        url: 'https://linkedin.com/company/your-page',
    },
    {
        id: 3,
        name: 'YouTube',
        icon: 'mdi:youtube',
        color: '#FF0000',
        url: 'https://youtube.com/@your-channel',
    },
    {
        id: 4,
        name: 'WhatsApp',
        icon: 'mdi:whatsapp',
        color: '#128C7E',
        url: 'https://wa.me/8801XXXXXXXXX',
    },
]


export const quickLinks =[
    {
        name: "আমাদের সম্পর্কে",
        to: "/about",
    },
    {
        name: "ইভেন্টস",
        to: "/events",
    },
    {
        name: "ব্লগ",
        to: "/blogs",
    },
    {
        name: "গ্যালারি",
        to: "/gallery",
    },
    {
        name: "যোগাযোগ",
        to: "/contact",
    },
];








export const supportLinks = [
    {
        name: "Career Development",
        to: "/",
    },
    {
        name: "Technical Skills",
        to: "/",
    },
    {
        name: "Scholarship",
        to: "/",
    },
    {
        name: "Training",
        to: "/",
    },
    {
        name: "Consultation",
        to: "/",
    },
]




