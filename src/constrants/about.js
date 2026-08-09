
        import { 
            ArrowRightIcon,
            MessageSquare ,
            Box,
            CodeXml,
            PaintbrushVertical ,
            ServerIcon, 
            GraduationCap,
            Users,
            HeartHandshake,
            Trophy
            } from '@lucide/vue';


      export  const aboutWorks =[
            {
                 id:1,
                icon:CodeXml ,
                iconColor:"text-blue-400",
                title:"যোগাযোগ ও সহযোগিতা",
                desc:"প্রাক্তন শিক্ষার্থীদের মধ্যে একটি নেটওয়ার্ক তৈরি করে..."
            },
            {
                id:2,
                icon:ServerIcon,
                iconColor:"text-cyan-400",
                title:" শিক্ষা প্রতিষ্ঠানের উন্নয়ন",
                desc:"প্রাক্তন শিক্ষার্থীরা শিক্ষা প্রতিষ্ঠানের উন্নয়নে সহায়তা করে..."
            },
            {
                id:3,
                icon:PaintbrushVertical , 
                iconColor:"text-blue-400",
                title:" অনুষ্ঠান আয়োজন:",
                desc:"প্রাক্তন শিক্ষার্থীদের মিলনমেলা, পুনর্মিলনী বা অন্যান্য অনুষ্ঠানের আয়োজন করে।"
            },
            {
                id:4,
                icon:Box,
                iconColor:"text-cyan-400",
                title:"বৃত্তি ও আর্থিক সহায়তা:",
                desc:"মেধাবী ও দরিদ্র শিক্ষার্থীদের বৃত্তি বা আর্থিক সহায়তা প্রদান করে।"
            },
             {
                id:4,
                icon:Box,
                iconColor:"text-cyan-400",
                title:"পরামর্শ ও সহযোগিতা:",
                desc:"প্রাক্তন শিক্ষার্থীরা বর্তমান শিক্ষার্থীদের কর্মজীবন ও শিক্ষা সংক্রান্ত বিষয়ে পরামর্শ ও সহযোগিতা দিয়ে থাকে"
            },
        ]
        
 export const ctaButtons =[
        {
            id:1,
            text:"View Portfolio",
            icon:ArrowRightIcon,
            iconClass:`ml-2 group-hover:translate-x-1 transition-transform`,
            classes:`bg-linear-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-500 hover:to-cyan-500`
        },
        {
            id:2,
            text:"Contact Me",
            icon:MessageSquare ,
            iconClass:`ml-2 group-hover:translate-x-1 transition-transform`,
            classes:`bg-linear-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-500 hover:to-cyan-500`
        }
    ]


export const timeline = [
    {
        id: 1,
        year: '2013',
        title: 'প্রথম উদ্যোগ',
        description:
            'প্রাক্তন শিক্ষার্থীদের একত্রিত করার মাধ্যমে আমাদের অ্যালামনাই যাত্রার সূচনা।',
        icon: Users,
        iconColor: 'text-blue-400'
    },
    {
        id: 2,
        year: '2015',
        title: 'আহবায়ক কমিটি গঠন',
        description:
            'প্রাক্তন শিক্ষার্থীদের একত্রিত করার মাধ্যমে আমাদের অ্যালামনাই যাত্রার সূচনা।',
        icon: Users,
        iconColor: 'text-blue-400'
    },

    {
        id: 3,
        year: '2015',
        title: 'প্রথম সংবর্ধনা',
        description:
            'দেশ ও বিদেশে থাকা প্রাক্তন শিক্ষার্থীদের নিয়ে একটি শক্তিশালী কমিউনিটি তৈরি হয়।',
        icon: HeartHandshake,
        iconColor: 'text-cyan-400'
    },
     {
        id: 4,
        year: '2016',
        title: 'দ্বিতীয় সংবর্ধনা',
        description:
            'প্রাক্তন শিক্ষার্থীদের একত্রিত করার মাধ্যমে আমাদের অ্যালামনাই যাত্রার সূচনা।',
        icon: Users,
        iconColor: 'text-blue-400'
    },

    {
        id: 5,
        year: '2018',
        title: 'কার্যকরী কমিটি গঠন',
        description:
            'দেশ ও বিদেশে থাকা প্রাক্তন শিক্ষার্থীদের নিয়ে একটি শক্তিশালী কমিউনিটি তৈরি হয়।',
        icon: HeartHandshake,
        iconColor: 'text-cyan-400'
    },

    {
        id: 6,
        year: '2020',
        title: 'বিভিন্ন উদ্যোগ',
        description:
            'শিক্ষা সহায়তা, সামাজিক কার্যক্রম এবং বিভিন্ন ইভেন্টের মাধ্যমে কার্যক্রম সম্প্রসারণ।',
        icon: GraduationCap,
        iconColor: 'text-purple-400'
    },

    {
        id: 7,
        year: '2022',
        title: 'সামাজিক কার্যক্রম',
        description:
            'ডিজিটাল প্ল্যাটফর্মের মাধ্যমে আরও বেশি প্রাক্তন শিক্ষার্থীকে একত্রিত করার লক্ষ্য।',
        icon: Trophy,
        iconColor: 'text-yellow-400'
    },
    {
        id: 8,
        year: '2024',
        title: 'নতুন সম্ভাবনা',
        description:
            'ডিজিটাল প্ল্যাটফর্মের মাধ্যমে আরও বেশি প্রাক্তন শিক্ষার্থীকে একত্রিত করার লক্ষ্য।',
        icon: Trophy,
        iconColor: 'text-yellow-400'
    }
]


export const stats = [
    {
        id: 1,
        value: '500+',
        label: 'Alumni Members'
    },

    {
        id: 2,
        value: '20+',
        label: 'Events'
    },

    {
        id: 3,
        value: '50+',
        label: 'Successful Initiatives'
    },

    {
        id: 4,
        value: '10+',
        label: 'Years of Connection'
    }
]