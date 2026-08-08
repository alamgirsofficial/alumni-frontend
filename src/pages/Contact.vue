<template>
    <section class="relative py-20 overflow-hidden" id="contact">
        <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16"
            data-aos="fade-up">
            <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
                আমাদের সাথে <span class="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
                যোগাযোগ করুন</span>
            </h2>
            <p class="text-blue-200 text-lg">
                যেকোন সাহায্যের জন্য আমাদের সাথে যোগাযোগ করুন।
            </p>
            </div>
            <div class="grid lg:grid-cols-2 gap-12">
                <!-- Conatct info  -->
                 <div data-aos="fade-right">
                    <h3 class="text-2xl font-bold text-white mb-6">
                        আমাদের ঠিকানা
                    </h3>  
                <div class="space-y-6">
                    <div class="flex items-center gap-4">
                        <MapPin class="w-6 h-6 text-cyan-400 hover:scale-110"/>
                    <div>
                        <p class="text-white font-semibold"> প্রাক্তন ছাত্র পরিষদ-</p>                     
                        <p class="text-blue-200">উপকূলীয় আদর্শ উচ্চ বিদ্যালয় </p>                        
                        <p class="text-blue-200"> গহিরা, দোভাষীর হাট, আনোয়ারা, চট্টগ্রাম।</p>                        
                    </div>                    
                    </div>
                   
                    <div class="flex items-center gap-4">
                        <Phone class="w-6 h-6 text-cyan-400 hover:scale-105"/>
                    <div>
                        <p class="text-white font-semibold"> মোবাইল নম্বর </p>
                        <p class="text-blue-200">  +৮৮০ ২-১২৩৪৫৬৭৮ </p>                        
                    </div>                    
                    </div>
                     <div class="flex items-center gap-4">
                        <Mail class="w-6 h-6 text-cyan-400 hover:scale-105"/>
                    <div>
                        <p class="text-white font-semibold"> ই-মেইল </p>
                        <p class="text-blue-200"> exstudentforum2013@gmail.com </p>                        
                    </div>                    
                    </div>
                    

                </div>
                <!-- Social Links  -->
                 <div class="mt-8">
                    <h4 class="text-lg font-bold text-white mb-4"> 
                        আমাদের খুঁজে পেতে
                    </h4>

                    <div class="flex gap-4">
                        <a v-for="link in socialLinks"
                        :key="link.label"
                        :href="link.href"
                        :class="[
                            'p-3 rounded-xl transition-all duration-300 hover:scale-110',
                            link.bg,
                            link.text
                        ]">
                        <component :is="link.icon" class="size-5"/>
                        </a>                       
                        </div>
                 </div>


                 </div>
                 
                 <!-- Conatct Form -->
                 <div data-aos="fade-left" class="relative bg-linear-to-br from-gray-800/60 to-blue-900/40 rounded-3xl
                        backdrop-blur-sm border border-blue-500/30 shadow-2xl p-6">
                     <form class="space-y-6">
                        <div class="grid sm:grid-cols-1 gap-2">

                            <div>
                                <label class="text-white text-sm font-extrabold mb-2 block">
                                    আপনার নামঃ
                                </label>
                                <input type="text" class="w-full bg-gray-800/50 border
                                border-blue-500/30 rounded-xl px-4 py-3 focus:border-blue-400
                                focus:outline-none transition-all placeholder:text-blue-400 "
                                placeholder=" Name Here" required>
                            </div>
                            <div>
                                <label class="text-white text-sm font-medium mb-2 block">
                                    ইমেইল/মোবাইলঃ
                                </label>
                                <input type="email" class="w-full bg-gray-800/50 border
                                border-blue-500/30 rounded-xl px-4 py-3 focus:border-nblue-400
                                focus:outline-none transition-all placeholder:text-blue-400 "
                                placeholder=" Email Here" required>
                            </div>
                            <div>
                                <label class="text-white text-sm font-medium mb-2 block">
                                    বিষয়ঃ
                                </label>
                                <input type="text" class="w-full bg-gray-800/50 border
                                border-blue-500/30 rounded-xl px-4 py-3 focus:border-blue-400
                                focus:outline-none transition-all placeholder:text-blue-400 " 
                                placeholder=" Subject Here" required>
                            </div>
                            <div>
                                <label class="text-white text-sm font-medium mb-2 block">
                                    আপনার বার্তাঃ
                                </label>
                                <textarea rows="6" class="w-full bg-gray-800/50 border
                                border-blue-500/30 rounded-xl px-4 py-3 focus:border-blue-400
                                focus:outline-none transition-all placeholder:text-blue-400 "
                                placeholder=" Write Message" required></textarea>
                            </div>

                        </div>
                        <div>
                            <button type="submit" class="w-full bg-linear-to-r from-blue-500 to-cyan-500
                            text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/25
                             transition-all duration-300">
                             বার্তা পাঠান
                            </button>
                            
                        </div>
                        </form>

                 </div>

            </div>

        </div>

    </section>
</template>
<script setup>

import { 
    Mail,
    Phone,
    MapPin ,
    MessagesSquare,
    Users,
    Share2 ,
       } from '@lucide/vue';

const socialLinks =[
    {
        icon:Share2,
        href: "#",
        label: "Share",
        bg:"bg-pink-500/20",
        text:"text-pink-400",
    },
    {
        icon:Users,
        href: "#",
        label: "Followers",
        bg:"bg-cyan-500/20",
        text:"text-cyan-400",
    },
    {
        icon:MessagesSquare,
        href: "#",
        label: "Message",
        bg:"bg-blue-500/20",
        text:"text-blue-400",
    },
    {
        icon:Phone,
        href: "#",
        label: "Call",
        bg:"bg-green-500/20",
        text:"text-green-400",
    },

]
</script>