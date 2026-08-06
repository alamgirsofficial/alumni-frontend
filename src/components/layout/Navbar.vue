<template>

   <header class="flex justify-between items-center px-4 py-2 sm:px-6 lg:px-8 bg-opacity-50 relative z-20">
      <!-- Navbar logo view  -->
      <div class=" flex items-center shrink-0 ">
         <RouterLink to="/"
          class="flex items-center gap-3" >
            <img :src="iconImage" alt="Icon Image logo"
         class="h-10 w-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain transition-transform duration-300 hover:scale-105 "
         >
         <div class="hidden sm:block">
            <h1 class="text-3xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
               প্রাক্তন <span class="font-black"> ছাত্র পরিষদ </span> 
            </h1>
         </div>
      </RouterLink>
      </div>

      <div class="md:hidden z-30">
         <button type="button" class="block focus:outline-none p-2 rounded-lg bg-blue-800/50 hover:bg-blue-700/50 transition-all duration-300" 
         @click="isMenuOpen = !isMenuOpen">
         <div class="relative w-6 h-6">
            <span :class="['absolute left-0 w-6 h-0.5 bg-blue-200 transition-all duration-300',
               isMenuOpen ? 'rotate-45 top-3': 'top-1']">
            </span>
            <span :class="['absolute left-0 w-6 h-0.5 bg-blue-200 transition-all duration-300',
               isMenuOpen ? 'opacity-0': 'top-3 opacity-100']">
            </span>
            <span :class="['absolute left-0 w-6 h-0.5 bg-blue-200 transition-all duration-300',
               isMenuOpen ? '-rotate-45 top-3': 'top-5']">
            </span>
         </div>
         </button>
      </div>
      <nav :class="[
         'fixed inset-0 z-20 flex flex-col items-center justify-center bg-[#111827] md:static md:flex-row md:bg-transparent',
         isMenuOpen ? 'flex' : 'hidden md:flex'
      ]">
      <ul class="flex flex-col items-center  space-y-5 md:flex-row md:space-x-5 md:space-y-0">
         <li v-for="item in Menu" :key="item.name" class="group relative" > 
            <RouterLink :to="item.to" 
            @click="isMenuOpen = false" class="relative block text-blue-100 hover:text-blue-400 transition-all duration-300 text-xl md:text-base font-medium group"> 
               {{item.name}}
               <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full">

               </span>
            </RouterLink>
         </li>
      </ul>
      <RouterLink to="#"
      class="mt-8 md:mt-0 md:ml-6 px-6 py-2 bg-linear-to-r from-blue-500 to-cyan-500 text-white rounded-full hover:shadow-lg 
      hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
         লগ ইন
      </RouterLink>
      <!-- <button class="mt-8 md:mt-0 md:ml-6 px-6 py-2 bg-linear-to-r from-blue-500 to-cyan-500 text-white rounded-full hover:shadow-lg 
      hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
         লগ ইন

      </button> -->

      </nav>


   </header>
   

</template>
<script setup>
import { ref } from 'vue';
import iconImage from '../../assets/icon/logo.png'


const Menu  = ref([
   {name: 'হোম', to: '/'},
   {name: 'আমাদের সম্পর্কে', to: '/about'},
   {name: 'ইভেন্টস', to: '/events'},
   {name: 'ব্লগ', to: '/blogs'},
   {name: 'যোগাযোগ', to: '/contact'},
   {name: 'গ্যালারি', to: '/gallery'},
])

const isMenuOpen = ref(false); 
const scrollToSection = (href)=>{ isMenuOpen.value = false; 
   const section = document.querySelector(href);
    if(section){ section.scrollIntoView({behavior: 'smooth'}) } }

</script>

<style scoped>

</style>
