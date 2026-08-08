<template>
    <section class="relative py-20 overflow-hidden">
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header  -->
             <div class="text-center mb-16 "
             data-aos="fade-up">
             <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
                অ্যালামনাই  <span class="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400"> 
                    ফোরাম ব্লগ</span>
             </h2>
             <p class="text-blue-200 text-lg max-w-2xl mx-auto">
                 প্রাক্তন শিক্ষার্থীদের সাফল্য, অভিজ্ঞতা এবং স্কুলের স্মৃতিচারণমূলক লেখা পড়ুন এবং আপনার অভিজ্ঞতা শেয়ার করুন
             </p>
             </div>
             <!-- Section Header End  -->
              <!-- Project Grid  -->
               <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                <div v-for="(blog,index) in blogs" :key="blog.id"
                    class="group relative bg-linear-to-br from-gray-800/50 to-blue-900/30
                    rounded-3xl overflow-hidden border backdrop-blur-sm border-blue-400/40 
                    transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-cyan-500/20 hover:border-cyan-400/50 hover:shadow-2xl"
                    :class="blog.borderColor"
                    data-aos="fade-up"
                    :data-aos-delay="(index+1)*100">
                    <div class="relative overflow-hidden">
                        <img :src="blog.image" :alt="blog.title"
                        class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500">

                        <div class="absolute top-4 left-4 flex flex-wrap gap-2">
                            <span v-for="category in blog.categories"
                            :key="category.name"
                            class=" bg-cyan-500/90 backdrop-blur text-white text-xs px-3 py-1 rounded-full">
                                {{ category.name }}
                            </span>
                        </div>
                           
                    </div>
                    <!-- blog content  -->
                    <div class="p-6">
                        <!-- Date and Comments  -->
                         <div class="flex items-center text-sm text-gray-300 mb-4"> 
                            <div class="flex items-center gap-2">
                                <Calendar class="w-4 h-4 text-cyan-400" />
                                <span>{{ blog.publish_date }}</span>
                         </div>
                         
                         </div>
                        

                        <h3 class="text-lg font-bold text-white mb-2 group-hover:text-blue-400
                        transition-colors duration-300">
                            {{ blog.title }}
                        </h3>
                        <p class="text-gray-300 leading-7 line-clamp-3 tracking-wide mb-6">
                            {{ blog.desc }}
                        </p>
                        <!-- Footer  -->
                         <div class="flex items-center justify-between border-t border-white/10 pt-4">
                            <div class="flex items-center gap-3">
                                <p class="text-sm font-bold text-gray-300">  লেখকঃ  </p>
                                    <p class="text-sm font-medium text-white">
                                        {{ blog.author }}
                                    </p>        
                                </div>
                            
                    <RouterLink :to="`/blog/${blog.id}`"
                    class="flex items-center gap-2 text-cyan-400 hover:text-white font-medium transition hover:scale-105">
                        বিস্তারিত
                    <ArrowRight class="w-4 h-4" />
                    </RouterLink>
                    
                                                  
                    </div>                    
                </div>
                </div>
                

        </div>
        </div>
    </section>
</template>
<script setup>
import { blogs } from "../constrants/blogData.js";
</script>