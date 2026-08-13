import { socialPlatforms } from './socialPlatforms'



// view import method 
// <SocialLinks :social-links="president.social" />
//<SocialLinks :social-links="secretary.social" />
//<SocialLinks :social-links="member.social" />

// export const executiveMembers = [
//     {
//         id: 1,
//         name: 'Mr. Abdul Jabbar',
//         designation: 'সভাপতি',
//         image: '/images/members/president.jpg',

//         social: [
//             {
//                 id: 1,
//                 ...socialPlatforms.facebook,
//                 url: 'https://facebook.com/abduljabbar',
//             },

//             {
//                 id: 2,
//                 ...socialPlatforms.linkedin,
//                 url: 'https://linkedin.com/in/abduljabbar',
//             },

//             {
//                 id: 3,
//                 ...socialPlatforms.whatsapp,
//                 url: 'https://wa.me/8801XXXXXXXXX',
//             },
//         ],
//     },

//     {
//         id: 2,
//         name: 'Mr. XYZ',
//         designation: 'সাধারণ সম্পাদক',
//         image: '/images/members/secretary.jpg',

//         social: [
//             {
//                 id: 1,
//                 ...socialPlatforms.facebook,
//                 url: 'https://facebook.com/xyz',
//             },

//             {
//                 id: 2,
//                 ...socialPlatforms.youtube,
//                 url: 'https://youtube.com/@xyz',
//             },
//         ],
//     },
// ]


import presidentImage from '@/assets/icon/logo.png'
import secretaryImage from '@/assets/icon/logo.png'

export const executiveMembers = [
    {
        id: 1,
        name: 'আবদুল জব্বার',
        designation: 'সভাপতি',
        phone: '01212345678',
        image: presidentImage,

        social: [
            {
                id: 1,
                name: 'Facebook',
                icon: 'mdi:facebook',
                color: '#1877F2',
                url: 'https://facebook.com/',
            },
            {
                id: 2,
                name: 'LinkedIn',
                icon: 'mdi:linkedin',
                color: '#0A66C2',
                url: 'https://linkedin.com/',
            },
            {
                id: 3,
                name: 'YouTube',
                icon: 'mdi:youtube',
                color: '#FF0000',
                url: 'https://youtube.com/',
            },
            {
                id: 4,
                name: 'WhatsApp',
                icon: 'mdi:whatsapp',
                color: '#128C7E',
                url: 'https://wa.me/8801XXXXXXXXX',
            },
        ],
    },

    {
        id: 2,
        name: 'বজলুল হক',
        designation: 'সাধারণ সম্পাদক',
        phone: '01212345678',
        image: secretaryImage,

        social: [
            {
                id: 1,
                name: 'Facebook',
                icon: 'mdi:facebook',
                color: '#1877F2',
                url: 'https://facebook.com/',
            },
            {
                id: 2,
                name: 'LinkedIn',
                icon: 'mdi:linkedin',
                color: '#0A66C2',
                url: 'https://linkedin.com/',
            },
            {
                id: 3,
                name: 'YouTube',
                icon: 'mdi:youtube',
                color: '#FF0000',
                url: 'https://youtube.com/',
            },
            {
                id: 4,
                name: 'WhatsApp',
                icon: 'mdi:whatsapp',
                color: '#128C7E',
                url: 'https://wa.me/8801XXXXXXXXX',
            },
        ],
    },
]