<template>
    <section
        id="about"
        class="relative min-h-screen py-24 overflow-hidden"
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
                gap-10 items-center mb-24"
            >

                <!-- Images -->
                <div
                    class="lg:col-span-5 relative"
                    data-aos="fade-right"
                >

                    <div
                        class="relative p-5
                        rounded-4xl
                        bg-white/5
                        backdrop-blur-xl
                        border border-white/10
                        shadow-2xl"
                    >

                        <div
                            class="grid grid-cols-2 gap-4"
                        >

                            <div
                                v-for="image in aboutImage"
                                :key="image.id"
                                class="relative group"
                                :data-aos="image.animation"
                                :data-aos-delay="image.delay"
                            >

                                <div
                                    class="overflow-hidden
                                    rounded-2xl
                                    border border-white/10
                                    shadow-xl"
                                >

                                    <img
                                        :src="image.src"
                                        :alt="image.alt"
                                        class="w-full h-44
                                        sm:h-52
                                        object-cover
                                        transition duration-500
                                        group-hover:scale-110"
                                    />

                                    <div
                                        class="absolute inset-0
                                        rounded-2xl
                                        bg-linear-to-t
                                        from-black/60
                                        via-transparent
                                        to-transparent"
                                    ></div>

                                </div>

                                <span
                                    class="absolute
                                    bottom-3 left-3
                                    px-3 py-1
                                    rounded-full
                                    text-xs font-bold
                                    text-white"
                                    :class="image.badgeColor"
                                >
                                    {{ image.badge }}
                                </span>

                            </div>

                        </div>


                        <!-- Experience -->
                        <div
                            class="absolute
                            -bottom-6 left-1/2
                            -translate-x-1/2
                            px-6 py-4
                            rounded-2xl
                            bg-gray-900/95
                            backdrop-blur-xl
                            border border-cyan-400/20
                            shadow-2xl
                            whitespace-nowrap"
                        >

                            <div
                                class="flex items-center gap-3"
                            >

                                <div
                                    class="w-11 h-11
                                    flex items-center
                                    justify-center
                                    rounded-xl
                                    bg-blue-500/10
                                    border
                                    border-blue-400/20"
                                >
                                    🎓
                                </div>

                                <div>
                                    <p
                                        class="text-xl
                                        font-black
                                        text-white"
                                    >
                                        3+ Years
                                    </p>

                                    <p
                                        class="text-xs
                                        text-blue-200"
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
                        class="text-3xl md:text-4xl
                        lg:text-5xl
                        font-black text-white
                        leading-tight"
                    >
                        স্মৃতি থেকে
                        <br>

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


                    <p
                        class="mt-6 text-gray-300/80
                        text-base md:text-lg
                        leading-8 max-w-2xl"
                    >
                        আমাদের অ্যালামনাই প্ল্যাটফর্ম
                        প্রাক্তন শিক্ষার্থীদের মধ্যে
                        যোগাযোগ, বন্ধুত্ব এবং সহযোগিতার
                        একটি শক্তিশালী সেতুবন্ধন তৈরি করছে।
                        অতীতের স্মৃতিকে সঙ্গে নিয়ে
                        আমরা ভবিষ্যতের জন্য কাজ করে যাচ্ছি।
                    </p>


                    <!-- Mini Features -->

                    <div
                        class="grid sm:grid-cols-2
                        gap-4 mt-8"
                    >

                        <div
                            v-for="about in aboutWorks"
                            :key="about.id"
                            class="group p-4
                            rounded-2xl
                            bg-white/5
                            border border-white/10
                            hover:border-cyan-400/30
                            hover:bg-white/10
                            transition-all duration-300"
                        >

                            <div
                                class="flex items-center
                                gap-3"
                            >

                                <div
                                    class="w-10 h-10
                                    flex items-center
                                    justify-center
                                    rounded-xl
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
                        class="mt-3 text-3xl
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
                    class="hidden md:block
                    relative"
                >

                    <!-- Main Line -->

                    <div
                        class="absolute
                        top-[44px]
                        left-0 right-0
                        h-[2px]
                        bg-linear-to-r
                        from-blue-500/20
                        via-cyan-400
                        to-blue-500/20"
                    ></div>


                    <!-- Timeline Items -->

                    <div
                        class="grid
                        grid-cols-4
                        gap-6"
                    >

                        <div
                            v-for="(item, index) in timeline"
                            :key="item.id"
                            class="relative"
                            data-aos="fade-up"
                            :data-aos-delay="index * 150"
                        >

                            <!-- Year -->

                            <div
                                class="relative z-10
                                flex justify-center"
                            >

                                <div
                                    class="w-[88px] h-[88px]
                                    rounded-full
                                    flex items-center
                                    justify-center
                                    bg-gray-900
                                    border-2
                                    border-cyan-400
                                    shadow-[0_0_30px_rgba(34,211,238,0.25)]
                                    hover:scale-110
                                    transition duration-300"
                                >

                                    <span
                                        class="text-xl
                                        font-black
                                        text-white"
                                    >
                                        {{ item.year }}
                                    </span>

                                </div>

                            </div>


                            <!-- Card -->

                            <div
                                class="mt-8 p-6
                                min-h-[210px]
                                rounded-2xl
                                bg-white/5
                                backdrop-blur-xl
                                border border-white/10
                                hover:border-cyan-400/30
                                hover:bg-white/10
                                hover:-translate-y-2
                                transition-all duration-300"
                            >

                                <!-- Icon -->

                                <div
                                    class="w-11 h-11
                                    flex items-center
                                    justify-center
                                    rounded-xl
                                    bg-blue-500/10
                                    border
                                    border-blue-400/20
                                    mb-4"
                                >
                                    <component
                                        :is="item.icon"
                                        class="w-5 h-5"
                                        :class="item.iconColor"
                                    />
                                </div>


                                <h4
                                    class="text-lg
                                    font-bold
                                    text-white"
                                >
                                    {{ item.title }}
                                </h4>


                                <p
                                    class="mt-3
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
                        left-[9px]
                        top-0 bottom-0
                        w-[2px]
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
                            -left-[31px]
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


            <!-- ========================= -->
            <!-- STATS -->
            <!-- ========================= -->

            <div
                class="grid grid-cols-2
                md:grid-cols-4
                gap-4 mt-20"
                data-aos="fade-up"
            >

                <div
                    v-for="stat in stats"
                    :key="stat.id"
                    class="group p-6
                    text-center rounded-2xl
                    bg-white/5
                    border border-white/10
                    hover:border-cyan-400/30
                    hover:-translate-y-1
                    transition-all duration-300"
                >

                    <div
                        class="text-3xl md:text-4xl
                        font-black text-white"
                    >
                        {{ stat.value }}
                    </div>

                    <p
                        class="mt-2 text-sm
                        text-blue-200"
                    >
                        {{ stat.label }}
                    </p>

                </div>

            </div>

        </div>

    </section>
</template>


<script setup>
        import about from '@/assets/images/about/about.jpg'
        import about2 from '@/assets/images/about/about2.jpg'
        import about3 from '@/assets/images/about/about3.jpg'
        import about4 from '@/assets/images/about/about4.jpg'

    import { aboutWorks, timeline, stats } from '@/constrants/about.js'

            
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


</script>