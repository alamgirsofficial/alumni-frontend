<template>
  <section class="relative min-h-screen w-full bg-gradient-linear text-white flex items-center overflow-hidden">
    <!-- floating shapes layer (background animation) -->
    <div class="floating-shapes absolute inset-0 w-full h-full pointer-events-none">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>

    <div class="absolute -top-40 -left-40 w-125 h-125 rounded-full bg-blue-600/20 blur-[140px]"></div>

<div class="absolute bottom-0 right-0 w-110 h-100 rounded-full bg-cyan-500/10 blur-[150px]"></div>

    <!-- main container -->
    <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-6 py-8 w-full">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- LEFT SIDE: content -->
        <div data-aos="fade-right" data-aos-duration="800" data-aos-easing="ease-out">
          <!-- Alumni Community Highlight (badge) -->
          <div class="inline-flex items-center gap-2 bg-slate-800/40  backdrop-blur-xl border border-white/10 rounded-full px-4 py-1.5 mb-6 text-sm font-medium tracking-wide shadow-sm">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span>Alumni community · 6k+ members</span>
          </div>

          <!-- Title -->
          <h1 class="text-xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight">
            আমাদের গল্প এখনও চলছে...
            <span class="text-transparent bg-clip-text bg-linear-to-r from-sky-400 via-cyan-300 to-indigo-400">
              আপনার অপেক্ষায়</span>
          </h1>

          <!-- Subtitle -->
          <p class="mt-5 text-lg md:text-xl text-gray-300/90 max-w-lg leading-relaxed">
            প্রাক্তন শিক্ষার্থীদের সাথে সংযুক্ত থাকুন, অ্যালামনাই বা প্রাক্তন শিক্ষার্থীদের বিভিন্ন আয়োজনে অংশ নিন, সুযোগ-সুবিধা শেয়ার করুন এবং আজীবন সম্পর্ক সুদৃঢ় করুন।
          </p>

          <!-- CTA Buttons -->
          <div class="mt-8 flex flex-wrap items-center gap-4">
            <a href="#" class="group inline-flex items-center gap-2 bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400  text-gray-900 font-semibold px-7 py-3.5 rounded-full shadow-blue-500/30 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-out hover:bg-gray-100">
              <span> আমাদের সাথে যুক্ত হোন</span>
              <Users class="w-5 h-5 group-hover:rotate-6 transition-transform" />
            </a>
            <a href="#" class="group inline-flex items-center gap-2 bg-slate-800/30 border-blue-400/20 hover:bg-slate-700/40 backdrop-blur-sm border text-white font-medium px-7 py-3.5 rounded-full  transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <span>ইভেন্ট দেখুন</span>
              <Calendar class="w-5 h-5 group-hover:rotate-6 transition-transform" />
            </a>
          </div>

          <!-- small community stat (extra highlight) -->
          <div class="mt-8 flex items-center gap-6 text-sm text-gray-3 00/70">
            <div class="flex items-center gap-2">
              <GraduationCap class="w-4 h-4 text-blue-300" />
              <span>প্রতিবছর ৬ টিরও বেশি ইভেন্ট </span>
            </div>
            <div class="flex items-center gap-2">
              <Trophy  class="w-4 h-4 text-cyan-300" />
              <span>সফলতার ১২ বছরে</span>
            </div>
          </div>
        </div>

        <!-- RIGHT SIDE: Illustration + floating icons -->
        <div data-aos="fade-left" data-aos-duration="800" data-aos-delay="150" data-aos-easing="ease-out" class="relative flex justify-center lg:justify-end">
          <div class="illustration-wrapper relative w-full max-w-md lg:max-w-lg">


            <!-- main illustration (custom graphic) -->
            <svg viewBox="0 0 400 340" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
              <circle cx="200" cy="170" r="130" fill="url(#grad1)" opacity="0.15" />
              <circle cx="200" cy="170" r="100" fill="url(#grad2)" opacity="0.2" />
              <circle cx="200" cy="170" r="70" fill="url(#grad3)" opacity="0.3" />
              <g opacity="0.9">
                <!-- abstract people / community nodes -->
                <circle cx="200" cy="160" r="18" fill="#8b9dff" filter="url(#glow)" />
                <circle cx="150" cy="120" r="14" fill="#7aa5ff" />
                <circle cx="250" cy="120" r="14" fill="#a78bfa" />
                <circle cx="120" cy="180" r="12" fill="#6ee7b7" />
                <circle cx="280" cy="180" r="12" fill="#fcd34d" />
                <circle cx="170" cy="220" r="10" fill="#f472b6" />
                <circle cx="230" cy="220" r="10" fill="#60a5fa" />
                <!-- connection lines -->
                <line x1="200" y1="160" x2="150" y2="120" stroke="rgba(255,255,255,0.2)" stroke-width="2" stroke-dasharray="4 4" />
                <line x1="200" y1="160" x2="250" y2="120" stroke="rgba(255,255,255,0.2)" stroke-width="2" stroke-dasharray="4 4" />
                <line x1="200" y1="160" x2="120" y2="180" stroke="rgba(255,255,255,0.2)" stroke-width="2" stroke-dasharray="4 4" />
                <line x1="200" y1="160" x2="280" y2="180" stroke="rgba(255,255,255,0.2)" stroke-width="2" stroke-dasharray="4 4" />
                <line x1="200" y1="160" x2="170" y2="220" stroke="rgba(255,255,255,0.2)" stroke-width="2" stroke-dasharray="4 4" />
                <line x1="200" y1="160" x2="230" y2="220" stroke="rgba(255,255,255,0.2)" stroke-width="2" stroke-dasharray="4 4" />
              </g>




<!-- 🔥 Most beautiful - logo with gradient ring -->
<g transform="translate(200, 170)">
  <!-- outer gradient glow -->
  <circle cx="0" cy="0" r="70" fill="url(#grad3)" opacity="0.1" filter="url(#glow)" />
  
  <!-- gradient ring (border) -->
  <circle cx="0" cy="0" r="70" fill="none" stroke="url(#grad3)" stroke-width="3" opacity="0.6" />
  
  <!-- inner background -->
  <circle cx="0" cy="0" r="52" fill="rgba(255,255,255,0.05)" />
  <circle cx="0" cy="0" r="52" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
  
  <!-- logo -->
  <image 
    :href="logo" 
    x="-30" 
    y="-30" 
    width="60" 
    height="60" 
    preserveAspectRatio="xMidYMid meet"
  />
</g>









              <!-- small icon badges floating around (using vue components) -->
              <g transform="translate(60, 50)">
                <rect x="0" y="0" width="32" height="32" rx="10" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.1)" />
                <Users class="text-white w-5 h-5" style="transform: translate(6px, 6px);" />
              </g>
              <g transform="translate(300, 40)">
                <rect x="0" y="0" width="32" height="32" rx="10" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.1)" />
                <BookOpenText  class="text-white w-5 h-5" style="transform: translate(6px, 6px);" />
                
              </g>
              <g transform="translate(320, 230)">
                <rect x="0" y="0" width="32" height="32" rx="10" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.1)" />
                <GraduationCap class="text-white w-5 h-5" style="transform: translate(6px, 6px);" />
              </g>
              <g transform="translate(50, 250)">
                <rect x="0" y="0" width="32" height="32" rx="10" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.1)" />
                <Trophy class="text-white w-5 h-5" style="transform: translate(6px, 6px);" />             
              </g>

              
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#818cf8" />
                  <stop offset="100%" stop-color="#a78bfa" />
                </linearGradient>
                <linearGradient id="grad2" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#38bdf8" />
                  <stop offset="100%" stop-color="#818cf8" />
                </linearGradient>
                <linearGradient id="grad3" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#a78bfa" />
                  <stop offset="100%" stop-color="#f472b6" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
            </svg>

            <!-- extra floating "lucid" icons (decorative) -->
            <div class="absolute -top-4 -right-6 bg-white/5 backdrop-blur-sm rounded-full p-3 border border-white/10 shadow-lg hidden sm:block animate-pulse">
              <Network class="w-7 h-7 text-blue-200/70" />
            </div>
            <div class="absolute -bottom-2 -left-6 bg-white/5 backdrop-blur-sm rounded-full p-2.5 border border-white/10 shadow-lg hidden sm:block animate-pulse" style="animation-delay: 1.5s;">
              <Sparkle class="w-6 h-6 text-cyan-200/70" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- bottom subtle gradient overlay (depth) -->
    <!-- <div class="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-[#7689b9] to-transparent pointer-events-none"></div> -->
  </section>
</template>

<script setup>
import {
  Users,
  Calendar,
  GraduationCap,
  Trophy,
  MessageCircle,
  Network,
  Sparkle,
  BookOpenText 
} from '@lucide/vue';

import logo from '../../assets/icon/logo.png';




</script>

<style scoped>

 .bg-gradient-linear {
  background: linear-gradient(
    -45deg,
    #020617,
    #0f172a,
    #1e3a8a,
    #0f172a,
    #020617
  );

  background-size: 350% 350%;
  animation: gradientMove 20s ease infinite;
}
@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.floating-shapes span {
  position: absolute;
  display: block;
  border-radius: 50%;
  background: rgba(59,130,246,.06);
  backdrop-filter: blur(2px);
  border:1px solid rgba(96,165,250,.08);
  animation: floatShape 20s infinite alternate ease-in-out;
  pointer-events: none;
}
.floating-shapes span:nth-child(1) {
  width: 180px; height: 180px;
  top: 8%; left: 5%;
  animation-duration: 22s;
  background: radial-gradient(circle at 30% 30%, rgba(99, 179, 237, 0.08), transparent 70%);
}
.floating-shapes span:nth-child(2) {
  width: 260px; height: 260px;
  bottom: 5%; right: 2%;
  animation-duration: 26s;
  background: radial-gradient(circle at 70% 70%, rgba(168, 139, 255, 0.08), transparent 70%);
}
.floating-shapes span:nth-child(3) {
  width: 140px; height: 140px;
  top: 60%; left: 70%;
  animation-duration: 18s;
  background: radial-gradient(circle at 50% 50%, rgba(255, 215, 100, 0.06), transparent 70%);
}
.floating-shapes span:nth-child(4) {
  width: 100px; height: 100px;
  top: 20%; left: 80%;
  animation-duration: 24s;
  background: radial-gradient(circle at 20% 20%, rgba(255, 130, 130, 0.06), transparent 70%);
}
.floating-shapes span:nth-child(5) {
  width: 200px; height: 200px;
  bottom: 20%; left: 20%;
  animation-duration: 28s;
  background: radial-gradient(circle at 60% 40%, rgba(130, 255, 200, 0.05), transparent 70%);
}
@keyframes floatShape {
  0% { transform: translate(0, 0) scale(1) rotate(0deg); }
  30% { transform: translate(30px, -40px) scale(1.05) rotate(5deg); }
  60% { transform: translate(-20px, 30px) scale(0.95) rotate(-3deg); }
  100% { transform: translate(15px, -20px) scale(1.02) rotate(4deg); }
}
</style>