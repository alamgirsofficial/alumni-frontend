<template>
    <section
        id="about"
        class="relative  py-24 overflow-hidden"
    >
        <!-- Background Glow -->
        <div
            class="absolute -top-40 -left-40 w-96 h-96
            bg-blue-500/20 rounded-full blur-3xl"
        ></div>

        <div
            class="absolute -bottom-40 -right-40 w-96 h-96
            bg-cyan-500/20 rounded-full blur-3xl"
        ></div>

        <div
            class="absolute top-1/2 left-1/2
            -translate-x-1/2 -translate-y-1/2
            w-96 h-96 bg-purple-500/10
            rounded-full blur-3xl"
        ></div>


        <div
            class="relative z-10 max-w-7xl
            mx-auto px-5 sm:px-8 lg:px-10"
        >

            <!-- ========================= -->
            <!-- HEADER -->
            <!-- ========================= -->

            <div
                class="max-w-3xl mx-auto
                text-center mb-8"
                data-aos="fade-up"
            >

                <span
                    class="inline-flex items-center gap-2
                    px-4 py-2 rounded-full
                    bg-blue-500/10
                    border border-blue-400/20
                    text-blue-300 text-sm font-semibold"
                >
                    <span
                        class="w-2 h-2 rounded-full
                        bg-cyan-400 animate-pulse"
                    ></span>

                    আমাদের পথচলা
                </span>


                <h2
                    class="mt-2 text-2xl md:text-3xl
                    lg:text-4xl font-black
                    text-white leading-tight"
                >
                    একটি দীর্ঘ
                    <span
                        class="text-transparent
                        bg-clip-text
                        bg-linear-to-r
                        from-blue-400
                        via-cyan-400
                        to-blue-500"
                    >
                        পথচলা
                    </span>
                </h2>


                <p
                    class="mt-5 text-blue-100/70
                    text-base md:text-lg
                    leading-relaxed"
                >
                    আমাদের অ্যালামনাই পরিবারের
                    যাত্রার গুরুত্বপূর্ণ মুহূর্তগুলো
                    এক নজরে দেখুন।
                </p>

            </div>


            <!-- ========================= -->
            <!-- IMAGE + INTRO -->
            <!-- ========================= -->

            <div
                class="grid lg:grid-cols-12
    gap-10 xl:gap-14
    items-center"
            >

                <!-- Images -->
<!-- Image Showcase -->

<div
    class="lg:col-span-5 relative"
    data-aos="fade-right"
>

    <div
        class="relative
        min-h-120
        rounded-4xl
        bg-white/5
        backdrop-blur-xl
        border border-white/10
        shadow-2xl
        p-5"
    >

        <!-- Main Image -->

        <div
            class="absolute
            top-5 left-5 right-12
            h-82.5
            overflow-hidden
            rounded-3xl
            border border-white/10
            shadow-2xl
            group"
            data-aos="zoom-in"
        >

            <img
                :src="aboutImage[0].src"
                :alt="aboutImage[0].alt"
                class="w-full h-full
                object-cover
                transition-transform
                duration-700
                group-hover:scale-105"
            />

            <div
                class="absolute inset-0
                bg-linear-to-t
                from-black/60
                via-transparent
                to-transparent"
            ></div>


            <span
                class="absolute
                bottom-5 left-5
                px-4 py-1.5
                rounded-full
                text-xs font-bold
                text-white"
                :class="aboutImage[0].badgeColor"
            >
                {{ aboutImage[0].badge }}
            </span>

        </div>


        <!-- Second Image -->

        <div
            class="absolute
            bottom-10 right-5
            w-[65%] h-57.5
            overflow-hidden
            rounded-3xl
            border-4
            border-gray-950
            shadow-2xl
            group"
            data-aos="fade-up"
            data-aos-delay="250"
        >

            <img
                :src="aboutImage[1].src"
                :alt="aboutImage[1].alt"
                class="w-full h-full
                object-cover
                transition-transform
                duration-700
                group-hover:scale-110"
            />

            <div
                class="absolute inset-0
                bg-linear-to-t
                from-black/60
                via-transparent
                to-transparent"
            ></div>


            <span
                class="absolute
                bottom-4 left-4
                px-3 py-1
                rounded-full
                text-xs font-bold
                text-white"
                :class="aboutImage[1].badgeColor"
            >
                {{ aboutImage[1].badge }}
            </span>

        </div>


        <!-- Experience Badge -->


<div
    class="absolute
    bottom-2 left-4
    sm:bottom-5 sm:left-5
    px-4 py-3
    rounded-2xl
    bg-gray-950/95
    backdrop-blur-xl
    border border-cyan-400/20
    shadow-2xl
    z-20"
    data-aos="fade-right"
    data-aos-delay="400"
>

    <div class="flex items-center gap-3">

        <div
            class="w-10 h-10
            flex items-center
            justify-center
            rounded-xl
            bg-linear-to-br
            from-blue-500/20
            to-cyan-500/10
            border border-cyan-400/20"
        >
            <GraduationCap
                class="w-5 h-5
                text-cyan-400"
            />
        </div>

        <div>

            <p
                class="text-base
                sm:text-lg
                font-black
                text-white"
            >
                ১৩ বছরের পথচলা
            </p>

            <p
                class="text-[11px]
                text-blue-200/70"
            >
                Growing Together
            </p>

        </div>

    </div>

</div>





    </div>
    

</div>

                <!-- Intro Content -->
                <div
                    class="lg:col-span-7"
                    data-aos="fade-left"
                >

                    <div
                        class="flex items-center
                        gap-3 mb-5"
                    >
                        <span
                            class="w-10 h-px
                            bg-cyan-400"
                        ></span>

                        <span
                            class="text-xs
                            uppercase
                            tracking-[0.25em]
                            font-bold
                            text-cyan-400"
                        >
                            আমাদের ইতিহাস
                        </span>
                    </div>
                    <h3
                        class="text-2xl md:text-3xl
                        lg:text-2xl
                        font-black text-white
                        leading-tight"
                    >
                        স্মৃতি থেকে                       
                        <span
                            class="text-transparent
                            bg-clip-text
                            bg-linear-to-r
                            from-blue-400
                            to-cyan-400"
                        >
                            ভবিষ্যতের পথে
                        </span>
                    </h3>


                    <p class="mt-6 text-gray-300/80
                        text-base md:text-lg
                        leading-8 max-w-2xl mb-4"
                    >
                        আমাদের অ্যালামনাই প্ল্যাটফর্ম  প্রাক্তন শিক্ষার্থীদের মধ্যে যোগাযোগ, বন্ধুত্ব এবং সহযোগিতার
                        একটি শক্তিশালী সেতুবন্ধন তৈরি করছে।  অতীতের স্মৃতিকে সঙ্গে নিয়ে  আমরা ভবিষ্যতের জন্য কাজ করে যাচ্ছি।
                    </p>

                    <!-- Mini Features -->
                     <h2 class="text-xl font-black text-white leading-tight mt-2"> প্রাক্তন শিক্ষার্থী পরিষদ যেসব কাজগুলো করে থাকে</h2>

                    <div
                        class="grid sm:grid-cols-2
                        gap-4 mt-8"
                    >

                        <div
                            v-for="(about, index) in aboutWorks"
                            :key="about.id"
                            class="group p-4
                            rounded-2xl
                            bg-white/5
                            border border-white/10
                            hover:border-cyan-400/30
                            hover:bg-white/10
                            transition-all duration-300"
                           data-aos="fade-up"
                           :data-aos-delay="index * 100"
                            
                        >

                            <div
                                class="flex items-center
                                gap-3"
                            >
                                <div
                                    class="w-10 h-10
                                    flex items-center
                                    justify-center
                                    rounded-full
                                    bg-blue-500/10
                                    border
                                    border-blue-400/20
                                    group-hover:scale-110
                                    transition"
                                >

                                    <component
                                        :is="about.icon"
                                        class="w-5 h-5"
                                        :class="about.iconColor"
                                    />

                                </div>

                                <div>

                                    <h4
                                        class="font-bold
                                        text-white"
                                    >
                                        {{ about.title }}
                                    </h4>

                                    <p
                                        class="text-xs
                                        text-gray-400
                                        mt-1"
                                    >
                                        {{ about.desc }}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                

            </div>
            
<!-- ========================= -->
<!-- PREMIUM STATS -->
<!-- ========================= -->

<div
    class="relative mt-16
    rounded-3xl
    bg-white/3
    backdrop-blur-xl
    border border-white/10
    overflow-hidden"
    data-aos="fade-up"
>

    <!-- Background Glow -->

    <div
        class="absolute
        -top-24 left-1/2
        -translate-x-1/2
        w-96 h-48
        bg-cyan-500/10
        blur-3xl
        pointer-events-none"
    ></div>


    <div
        class="relative grid
        grid-cols-2
        lg:grid-cols-4"
    >

        <div
            v-for="(stat, index) in stats"
            :key="stat.id"
            class="group relative
            px-5 py-7
            md:px-8 md:py-9
            text-center
            hover:bg-white/4
            transition-all duration-300"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
        >

            <!-- Divider -->

            <div
                v-if="index !== 0"
                class="hidden lg:block
                absolute left-0 top-1/2
                -translate-y-1/2
                w-px h-16
                bg-linear-to-b
                from-transparent
                via-white/10
                to-transparent"
            ></div>


            <!-- Value -->

            <div
                class="text-3xl md:text-4xl
                lg:text-5xl
                font-black
                text-white
                tracking-tight
                group-hover:text-cyan-300
                transition-colors duration-300"
            >
                {{ stat.value }}
            </div>


            <!-- Label -->

            <p
                class="mt-2
                text-xs md:text-sm
                text-blue-200/70
                font-medium"
            >
                {{ stat.label }}
            </p>


            <!-- Bottom Accent -->

            <div
                class="mx-auto mt-4
                w-8 h-0.5
                rounded-full
                bg-linear-to-r
                from-blue-500
                to-cyan-400
                opacity-40
                group-hover:w-14
                group-hover:opacity-100
                transition-all duration-300"
            ></div>

        </div>

    </div>

</div>

            <!-- ================================================= -->
            <!-- HORIZONTAL TIMELINE -->
            <!-- ================================================= -->

            <div
                class="relative"
                data-aos="fade-up"
            >

                <!-- Timeline Heading -->

                <div
                    class="text-center mb-14"
                >

                    <span
                        class="text-cyan-400
                        text-sm font-bold
                        uppercase
                        tracking-[0.25em]"
                    >
                        আমাদের যাত্রা
                    </span>

                    <h3
                        class="mt-2 text-2xl
                        md:text-4xl
                        font-black text-white"
                    >
                        গুরুত্বপূর্ণ
                        <span
                            class="text-transparent
                            bg-clip-text
                            bg-linear-to-r
                            from-blue-400
                            to-cyan-400"
                        >
                            মাইলফলক
                        </span>
                    </h3>

                </div>


                <!-- ========================= -->
                <!-- DESKTOP TIMELINE -->
                <!-- ========================= -->

<div
    class="hidden md:block overflow-x-auto
    pb-8 scrollbar-thin scrollbar-thumb-cyan-500/40
    scrollbar-track-transparent"
>

    <div
        class="relative min-w-375"
    >

        <!-- Timeline Line -->
        <div
            class="absolute
            top-11
            left-10 right-10
            h-0.5
            bg-linear-to-r
            from-blue-500/20
            via-cyan-400
            to-blue-500/20"
        ></div>


        <!-- Timeline Items -->

        <div
            class="relative flex
            justify-between gap-6 px-4"
        >

            <div
                v-for="(item, index) in timeline"
                :key="item.id"
                class="relative w-42.5
                shrink-0"
                data-aos="fade-up"
                :data-aos-delay="index * 100"
            >

                <!-- YEAR CIRCLE -->

                <div
                    class="relative z-10
                    flex justify-center"
                >

                    <div
                        class="w-22 h-22
                        rounded-full
                        flex items-center
                        justify-center
                        bg-gray-950
                        border-2
                        border-cyan-400
                        shadow-[0_0_30px_rgba(34,211,238,0.25)]
                        hover:scale-110
                        hover:shadow-[0_0_40px_rgba(34,211,238,0.45)]
                        transition-all duration-300"
                    >

                        <span
                            class="text-lg
                            font-black
                            text-white"
                        >
                            {{ item.year }}
                        </span>

                    </div>

                </div>


                <!-- CARD -->

                <div
                    class="mt-8 p-5
                    min-h-57.5
                    rounded-2xl
                    bg-white/5
                    backdrop-blur-xl
                    border border-white/10
                    hover:border-cyan-400/40
                    hover:bg-white/10
                    hover:-translate-y-2
                    transition-all duration-300
                    group"
                >

                    <!-- Icon -->

                    <div
                        class="w-11 h-11
                        flex items-center
                        justify-center
                        rounded-xl
                        bg-blue-500/10
                        border border-blue-400/20
                        mb-4
                        group-hover:scale-110
                        transition"
                    >

                        <component
                            :is="item.icon"
                            class="w-5 h-5"
                            :class="item.iconColor"
                        />

                    </div>


                    <!-- Title -->

                    <h4
                        class="text-base
                        font-bold
                        text-white"
                    >
                        {{ item.title }}
                    </h4>


                    <!-- Description -->

                    <p
                        class="mt-3 text-sm
                        text-gray-400
                        leading-6"
                    >
                        {{ item.description }}
                    </p>

                </div>

            </div>

        </div>

    </div>

</div>


                <!-- ========================= -->
                <!-- MOBILE TIMELINE -->
                <!-- ========================= -->

                <div
                    class="md:hidden relative
                    pl-8"
                >

                    <!-- Vertical Line -->

                    <div
                        class="absolute
                        left-2.25
                        top-0 bottom-0
                        w-0.5
                        bg-linear-to-b
                        from-blue-500
                        via-cyan-400
                        to-blue-500/20"
                    ></div>


                    <div
                        v-for="(item, index) in timeline"
                        :key="item.id"
                        class="relative mb-10 last:mb-0"
                        data-aos="fade-left"
                        :data-aos-delay="index * 100"
                    >

                        <!-- Dot -->

                        <div
                            class="absolute
                            -left-7.75
                            top-1
                            w-5 h-5
                            rounded-full
                            bg-gray-900
                            border-2
                            border-cyan-400
                            shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                        ></div>


                        <!-- Card -->

                        <div
                            class="p-5 rounded-2xl
                            bg-white/5
                            backdrop-blur-xl
                            border border-white/10"
                        >

                            <div
                                class="flex items-center
                                gap-3 mb-4"
                            >

                                <span
                                    class="text-cyan-400
                                    font-black text-lg"
                                >
                                    {{ item.year }}
                                </span>

                                <div
                                    class="h-px flex-1
                                    bg-white/10"
                                ></div>

                            </div>


                            <div
                                class="flex gap-4"
                            >

                                <div
                                    class="shrink-0
                                    w-10 h-10
                                    rounded-xl
                                    flex items-center
                                    justify-center
                                    bg-blue-500/10
                                    border
                                    border-blue-400/20"
                                >

                                    <component
                                        :is="item.icon"
                                        class="w-5 h-5"
                                        :class="item.iconColor"
                                    />

                                </div>


                                <div>

                                    <h4
                                        class="font-bold
                                        text-white"
                                    >
                                        {{ item.title }}
                                    </h4>

                                    <p
                                        class="mt-2
                                        text-sm
                                        text-gray-400
                                        leading-6"
                                    >
                                        {{ item.description }}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


        </div>

    </section>
</template>


<script setup>

import {
    GraduationCap
} from '@lucide/vue'

        import about from '@/assets/images/about/about.jpg'
        import about2 from '@/assets/images/about/about2.jpg'
        import about3 from '@/assets/images/about/about3.jpg'
        import about4 from '@/assets/images/about/about4.jpg'

    import { 
            aboutWorks, 
            timeline, 
            stats 
        } from '@/constrants/about.js'


            
     const aboutImage = [

    {
        id: 1,
        src: about,
        alt: "Alumni Community",
        badge: "Community",
        badgeColor: "bg-blue-500",
        animation: "fade-right",
        delay: "200"
    },

    {
        id: 2,
        src: about2,
        alt: "Alumni Event",
        badge: "Event",
        badgeColor: "bg-cyan-500",
        animation: "fade-right",
        delay: "300"
    },

    {
        id: 3,
        src: about3,
        alt: "Alumni Members",
        badge: "Members",
        badgeColor: "bg-blue-500",
        animation: "fade-right",
        delay: "400"
    },

    {
        id: 4,
        src: about4,
        alt: "Alumni Activity",
        badge: "Activity",
        badgeColor: "bg-cyan-500",
        animation: "fade-right",
        delay: "500"
    }

]


</script>