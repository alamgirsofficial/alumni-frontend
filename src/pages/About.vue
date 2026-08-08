<template>

    <section class="relative py-20 overflow-hidden min-h-screen flex items-center" >
        <div class="w-full px-5 sm:px-8 md:px-12 lg:px-8 max-w-5xl lg:max-w-7xl mx-auto relative z-10">
           
            <div class="grid lg:grid-cols-2 gap-10 xl:gap-14 items-center">

                <!-- Left side -->
                <div class=" lg:h-full flex justify-center lg:justify-start order-2 lg:order-1">
                    <div class="relative w-full max-w-md">
                        <div class="relative bg-linear-to-br from-gray-800/60 to-blue-900/40 rounded-3xl
                        backdrop-blur-sm border border-blue-500/30 shadow-2xl p-6"
                        data-aos="zoom-in" >

                            <div class="grid grid-cols-2 gap-4">

                                <div v-for="image in aboutImage" :key="image.id"
                                class="relative group" :data-aos="image.animation" 
                                :data-aos-delay="image.delay">

                                <div class="rounded-2xl p-2 border shadow-lg" 
                                :class="image.gradient">

                                <img :src="image.src" :alt="image.alt"
                                class="w-full h-48 object-cover rounded-xl group-hover:scale-105
                                transition-transform duration-300">
                                </div>
                                <div class="absolute -top-2 right-2 text-white text-xs px-2 py-1 rounded-full font-semibold"
                                :class="image.badgeColor">
                                {{ image.badge }}
                                </div>
                                </div>
                            </div>
                            <div class="absolute -bottom-4 left-1/2 transform -translate-x-1/2
                            z-20 bg-linear-to-r from-blue-500 to-cyan-500 rounded-2xl px-6 py-3 border border-blue-400/40 shadow"
                            data-aos="fade-up" data-aos-delay="600">
                            <div class="text-center text-white text-xl font-bold">
                                3+ Years Experience
                            </div>
                            </div>
                        </div>
                    </div>
                </div>


                <!-- Right side -->
                <div class="flex flex-col justify-center order-1 lg:order-2">
                        <div class="text-center lg:text-left" 
                            data-aos="fade-left">
                            <h2 class="text-white font-bold text-4xl md:text-5xl lg:text-6xl leading-tight">
                                আমাদের  <span class="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
                                সম্পর্কে 
                                </span>                                
                            </h2>
                            <p class="text-blue-200 font-medium text-lg md:text-xl mt-4"
                            data-aos="fade-left" data-aos-delay="100">
                            প্রাক্তন শিক্ষার্থীদের এই প্ল্যাটফর্মটি সম্পর্কে জানুন
                            </p>
                            </div>
                          
                            <p class="text-gray-300 pt-6 text-center lg:text-left text-2xl font-bold leading-relaxed"
                            data-aos="fade-left" data-aos-delay="200">
                            আমাদের ইতিহাস
                            </p>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8"
                            data-aos="fade-up" data-aos-delay="300">
                            <div v-for="skill in skills" :key="skill.id"
                            class="flex flex-col">
                            <div class="flex items-center gap-3 mb-3">
                                <component :is="skill.icon" class="w-6 h-6"
                                :class="skill.iconColor"></component>
                                <h3 class="text-lg font-bold text-white">
                                    {{ skill.title }}                                     
                                </h3>
                            </div>
                            <p class="text-blue-100 text-sm">
                                {{ skill.desc }}
                            </p>
                            </div>
                        </div>
                        <div class="flex gap-4 pt-8 flex-col sm:flex-row"
                         data-aos="fade-up" data-aos-delay="400">
                         <button v-for="button in ctaButtons" :key="button.id"
                                 class=" group px-8 py-3 gap-2 rounded-xl font-semibold transition-all
                         duration-300 flex items-center justify-center"
                         :class="button.classes">
                         <component :is="button.icon" class="w-4 h-4"
                         :class="button.iconClass" />
                         {{ button.text }}                      
                         </button>
                        </div>





                 </div>
                </div>
            </div>   
    </section>
</template>


<script setup> 

        import { 
            ArrowRightIcon,
            MessageSquare , 
            CodeXml,
            Box, 
            PaintbrushVertical ,
            ServerIcon 
            } from '@lucide/vue';
            
        import about from '../assets/images/about/about.jpg'
        import about2 from '../assets/images/about/about2.jpg'
        import about3 from '../assets/images/about/about3.jpg'
        import about4 from '../assets/images/about/about4.jpg'

        const aboutImage =[
            {
                id:1,
                src:about,
                alt: "Alamgir Professional Photo",
                gradient:`bg-linear-to-r from-blue-600 to-cyan-600 border-blue-400/40`,
                badge:"professional",
                badgeColor:`bg-blue-500`,
                animation:"fade-right",
                delay: "200"
            },
            {
                id:2,
                src:about2,
                alt: "Alamgir Professional Photo",
                gradient:`bg-linear-to-r from-cyan-600 to-blue-600 border-blue-400/40`,
                badge:"Creative",
                badgeColor:`bg-blue-500`,
                animation:"fade-right",
                delay: "200"
            },
            {
                id:3,
                src:about3,
                alt: "Alamgir Professional Photo",
                gradient:`bg-linear-to-r from-blue-600 to-cyan-600 border-blue-400/40`,
                badge:"Developer",
                badgeColor:`bg-blue-500`,
                animation:"fade-right",
                delay: "200"
            },
            
            {
                id:4,
                src:about4,
                alt: "Alamgir Professional Photo",
                gradient:`bg-linear-to-r from-cyan-600 to-blue-600 border-blue-400/40`,
                badge:"Designer",
                badgeColor:`bg-blue-500`,
                animation:"fade-right",
                delay: "200"
            },
            
            
        ]

        const skills =[
            {
                id:1,
                icon:CodeXml ,
                iconColor:"text-blue-400",
                title:"Frontend",
                desc:"Vue JS, React JS, Javascrit, TypeScript, Tailwind CSS, Git, Docker, VSCode"
            },
            {
                id:2,
                icon:ServerIcon,
                iconColor:"text-cyan-400",
                title:"Development",
                desc:"Javascrit, TypeScript, Tailwind CSS, Git, Docker, VSCode"
            },
            {
                id:3,
                icon:PaintbrushVertical ,
                iconColor:"text-blue-400",
                title:"Design",
                desc:"Vue JS, Javascrit, TypeScript, Tailwind CSS, Git, Docker, VSCode"
            },
            {
                id:4,
                icon:Box,
                iconColor:"text-cyan-400",
                title:"UI/UX",
                desc:"Vue JS, React JS, Javascrit, TypeScript, Tailwind CSS, Git, Docker, VSCode"
            },
        ]
        
    const ctaButtons =[
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
</script>
