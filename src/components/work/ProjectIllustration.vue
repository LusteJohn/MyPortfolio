<script setup>
defineProps({
  id: { type: String, required: true }
})
</script>

<template>
  <!-- AgriLearnApp: phone with a leaf on screen -->
  <svg v-if="id === 'agrilearn-app'" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="25" r="14" fill="#FBE6D4"/>
    <path d="M23 25 q7 -8 14 0" stroke="#171B24" stroke-width="2" fill="none"/>
    <line x1="20" y1="18" x2="40" y2="32" stroke="#171B24" stroke-width="2"/>
    <rect x="60" y="10" width="40" height="80" rx="8" fill="#FFFDF8" stroke="#E7E0CE" stroke-width="2"/>
    <rect x="66" y="20" width="28" height="50" rx="4" fill="#F6F2E8"/>
    <path d="M80 30 q14 6 6 20 q-8 -2 -10 -12 q-1 6 3 12 q-10 -2 -10 -14 q0 -8 11 -6z" fill="#EE7B33"/>
  </svg>

  <!-- FluentFlow: phone + speech bubble + weekly bar chart -->
  <svg v-else-if="id === 'fluentflow'" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="10" width="34" height="80" rx="7" fill="#FFFDF8" stroke="#E7E0CE" stroke-width="2"/>
    <rect x="20" y="18" width="24" height="48" rx="3" fill="#F6F2E8"/>
    <rect x="70" y="18" width="70" height="34" rx="10" fill="#FBE6D4"/>
    <polygon points="85,52 95,52 85,62" fill="#FBE6D4"/>
    <rect x="80" y="28" width="30" height="5" rx="2" fill="#EE7B33"/>
    <rect x="80" y="38" width="45" height="5" rx="2" fill="#171B24"/>
    <rect x="70" y="70" width="10" height="18" fill="#E7E0CE"/>
    <rect x="85" y="60" width="10" height="28" fill="#EE7B33"/>
    <rect x="100" y="66" width="10" height="22" fill="#171B24"/>
    <rect x="115" y="72" width="10" height="16" fill="#E7E0CE"/>
  </svg>

  <!-- OJT Attendance: clipboard with checks + calendar -->
  <svg v-else-if="id === 'ojt-attendance'" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="45" y="10" width="60" height="80" rx="6" fill="#FFFDF8" stroke="#E7E0CE" stroke-width="2"/>
    <rect x="60" y="6" width="30" height="10" rx="3" fill="#E7E0CE"/>
    <rect x="55" y="26" width="10" height="10" rx="2" fill="#EE7B33"/>
    <path d="M56 31 l2 3 5 -6" stroke="#FFFDF8" stroke-width="1.6" fill="none"/>
    <rect x="70" y="28" width="26" height="5" rx="2" fill="#E7E0CE"/>
    <rect x="55" y="46" width="10" height="10" rx="2" fill="#EE7B33"/>
    <path d="M56 51 l2 3 5 -6" stroke="#FFFDF8" stroke-width="1.6" fill="none"/>
    <rect x="70" y="48" width="26" height="5" rx="2" fill="#E7E0CE"/>
    <rect x="55" y="66" width="10" height="10" rx="2" fill="#171B24"/>
    <rect x="70" y="68" width="18" height="5" rx="2" fill="#E7E0CE"/>
    <circle cx="122" cy="65" r="18" fill="#FBE6D4"/>
    <rect x="114" y="57" width="16" height="14" rx="2" fill="#171B24"/>
    <rect x="117" y="54" width="2" height="6" fill="#171B24"/>
    <rect x="125" y="54" width="2" height="6" fill="#171B24"/>
  </svg>

  <!-- DNS Server Configuration App: server rack + folder + link -->
  <svg v-else-if="id === 'dns-config-app'" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="20" width="45" height="60" rx="4" fill="#171B24"/>
    <rect x="22" y="28" width="31" height="6" rx="2" fill="#FBE6D4"/>
    <rect x="22" y="40" width="31" height="6" rx="2" fill="#EE7B33"/>
    <rect x="22" y="52" width="31" height="6" rx="2" fill="#FBE6D4"/>
    <rect x="22" y="64" width="31" height="6" rx="2" fill="#E7E0CE"/>
    <line x1="60" y1="50" x2="80" y2="50" stroke="#EE7B33" stroke-width="2" stroke-dasharray="3 3"/>
    <path d="M78 44 l8 6 -8 6" fill="none" stroke="#EE7B33" stroke-width="2"/>
    <rect x="98" y="45" width="34" height="26" rx="4" fill="#FFFDF8" stroke="#E7E0CE" stroke-width="2"/>
    <polygon points="98,45 110,45 116,52 98,52" fill="#E7E0CE"/>
    <circle cx="122" cy="20" r="12" fill="#FBE6D4"/>
    <line x1="110" y1="20" x2="134" y2="20" stroke="#171B24" stroke-width="1.4"/>
    <ellipse cx="122" cy="20" rx="6" ry="12" fill="none" stroke="#171B24" stroke-width="1.4"/>
  </svg>

  <!-- Green Nest: plant + leaf + pot -->
   <svg v-else-if="id === 'green-nest'" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="65" cy="50" r="34" fill="#FBE6D4"/>
    <path d="M65 25 q26 8 14 40 q-16 -2 -20 -22 q-2 12 6 22 q-22 -4 -22 -28 q0 -16 22 -12z" fill="#EE7B33"/>
    <circle cx="112" cy="68" r="15" fill="none" stroke="#171B24" stroke-width="4"/>
    <line x1="122" y1="78" x2="136" y2="92" stroke="#171B24" stroke-width="5" stroke-linecap="round"/>
    <circle cx="38" cy="18" r="3" fill="#171B24"/>
    <circle cx="50" cy="12" r="3" fill="#171B24"/>
    <line x1="38" y1="18" x2="50" y2="12" stroke="#171B24" stroke-width="1.5"/>
  </svg>

  <!-- Barangay Explore: map + pin + info -->
  <svg v-else-if="id === 'barangay-explore'" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="30" y="25" width="60" height="55" rx="4" fill="#FFFDF8" stroke="#E7E0CE" stroke-width="2"/>
    <rect x="40" y="35" width="40" height="5" rx="2" fill="#EE7B33"/>
    <rect x="40" y="46" width="40" height="5" rx="2" fill="#E7E0CE"/>
    <rect x="40" y="57" width="28" height="5" rx="2" fill="#E7E0CE"/>
    <circle cx="118" cy="55" r="20" fill="#FBE6D4"/>
    <circle cx="118" cy="55" r="9" fill="none" stroke="#171B24" stroke-width="4"/>
    <g stroke="#171B24" stroke-width="4">
      <line x1="118" y1="38" x2="118" y2="44"/>
      <line x1="118" y1="66" x2="118" y2="72"/>
      <line x1="101" y1="55" x2="107" y2="55"/>
      <line x1="129" y1="55" x2="135" y2="55"/>
    </g>
  </svg>

  <!-- EggPlantLeafCare AI: leaf + magnifying glass + node dots -->
  <svg v-else-if="id === 'eggplant-leaf-care-ai'" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="65" cy="50" r="34" fill="#FBE6D4"/>
    <path d="M65 25 q26 8 14 40 q-16 -2 -20 -22 q-2 12 6 22 q-22 -4 -22 -28 q0 -16 22 -12z" fill="#EE7B33"/>
    <circle cx="112" cy="68" r="15" fill="none" stroke="#171B24" stroke-width="4"/>
    <line x1="122" y1="78" x2="136" y2="92" stroke="#171B24" stroke-width="5" stroke-linecap="round"/>
    <circle cx="38" cy="18" r="3" fill="#171B24"/>
    <circle cx="50" cy="12" r="3" fill="#171B24"/>
    <line x1="38" y1="18" x2="50" y2="12" stroke="#171B24" stroke-width="1.5"/>
  </svg>

  <!-- MyEduTour: map with route + pin + grad cap -->
  <svg v-else-if="id === 'myedutour'" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="20" width="120" height="60" rx="6" fill="#F6F2E8" stroke="#E7E0CE" stroke-width="2"/>
    <path d="M30 65 q20 -30 40 -10 q20 20 40 -5 q15 -18 25 5" fill="none" stroke="#E7E0CE" stroke-width="3" stroke-dasharray="5 4"/>
    <path d="M85 30 c0 14 -14 18 -14 30 c0 -12 -14 -16 -14 -30 a14 14 0 0 1 28 0z" fill="#EE7B33"/>
    <circle cx="71" cy="30" r="5" fill="#FFFDF8"/>
    <polygon points="110,45 124,52 110,59 96,52" fill="#171B24"/>
    <line x1="124" y1="52" x2="124" y2="60" stroke="#171B24" stroke-width="2"/>
  </svg>

  <!-- Disaster Relief Distribution Tracking: truck + route pin -->
  <svg v-else-if="id === 'disaster-relief-tracking'" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="45" width="50" height="30" rx="3" fill="#171B24"/>
    <rect x="30" y="52" width="14" height="14" fill="#FBE6D4"/>
    <path d="M70 55 h20 l12 12 v8 h-32z" fill="#EE7B33"/>
    <circle cx="38" cy="80" r="8" fill="#FFFDF8" stroke="#171B24" stroke-width="3"/>
    <circle cx="90" cy="80" r="8" fill="#FFFDF8" stroke="#171B24" stroke-width="3"/>
    <path d="M100 20 q20 30 0 45" fill="none" stroke="#E7E0CE" stroke-width="3" stroke-dasharray="4 4"/>
    <polygon points="115,10 129,17 115,24 101,17" fill="#EE7B33"/>
    <line x1="115" y1="24" x2="115" y2="32" stroke="#EE7B33" stroke-width="2"/>
  </svg>

  <!-- Sari-Sari Store: storefront + shelf boxes -->
  <svg v-else-if="id === 'sari-sari-store'" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
    <polygon points="20,35 140,35 130,15 30,15" fill="#EE7B33"/>
    <rect x="25" y="35" width="110" height="45" rx="4" fill="#FFFDF8" stroke="#E7E0CE" stroke-width="2"/>
    <rect x="60" y="50" width="40" height="30" fill="#F6F2E8"/>
    <rect x="35" y="45" width="16" height="14" rx="2" fill="#FBE6D4"/>
    <rect x="109" y="45" width="16" height="14" rx="2" fill="#FBE6D4"/>
    <rect x="35" y="63" width="16" height="14" rx="2" fill="#171B24"/>
    <rect x="109" y="63" width="16" height="14" rx="2" fill="#171B24"/>
  </svg>

  <!-- AgriLearnSchool (Web): browser + leaf + notes -->
  <svg v-else-if="id === 'agrilearn-school-web'" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="15" width="120" height="70" rx="6" fill="#FFFDF8" stroke="#E7E0CE" stroke-width="2"/>
    <rect x="20" y="15" width="120" height="14" rx="6" fill="#F6F2E8"/>
    <circle cx="30" cy="22" r="2.5" fill="#E7E0CE"/>
    <circle cx="38" cy="22" r="2.5" fill="#E7E0CE"/>
    <circle cx="46" cy="22" r="2.5" fill="#E7E0CE"/>
    <path d="M75 45 q18 6 8 26 q-10 -2 -13 -15 q-1 8 4 15 q-14 -3 -14 -18 q0 -10 15 -8z" fill="#EE7B33"/>
    <rect x="40" y="55" width="20" height="5" rx="2" fill="#E7E0CE"/>
    <rect x="40" y="65" width="15" height="5" rx="2" fill="#E7E0CE"/>
  </svg>

  <!-- SVPMFS: document + gear -->
  <svg v-else-if="id === 'svpmfs'" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="30" y="25" width="60" height="55" rx="4" fill="#FFFDF8" stroke="#E7E0CE" stroke-width="2"/>
    <rect x="40" y="35" width="40" height="5" rx="2" fill="#EE7B33"/>
    <rect x="40" y="46" width="40" height="5" rx="2" fill="#E7E0CE"/>
    <rect x="40" y="57" width="28" height="5" rx="2" fill="#E7E0CE"/>
    <circle cx="118" cy="55" r="20" fill="#FBE6D4"/>
    <circle cx="118" cy="55" r="9" fill="none" stroke="#171B24" stroke-width="4"/>
    <g stroke="#171B24" stroke-width="4">
      <line x1="118" y1="38" x2="118" y2="44"/>
      <line x1="118" y1="66" x2="118" y2="72"/>
      <line x1="101" y1="55" x2="107" y2="55"/>
      <line x1="129" y1="55" x2="135" y2="55"/>
    </g>
  </svg>

  <!-- School Portal: browser + grad cap + bell -->
  <svg v-else-if="id === 'school-portal'" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="15" width="120" height="70" rx="6" fill="#FFFDF8" stroke="#E7E0CE" stroke-width="2"/>
    <rect x="20" y="15" width="120" height="14" rx="6" fill="#F6F2E8"/>
    <polygon points="55,50 78,42 101,50 78,58" fill="#171B24"/>
    <line x1="101" y1="50" x2="101" y2="60" stroke="#171B24" stroke-width="2"/>
    <path d="M122 60 a10 10 0 0 0 -20 0 v6 l-4 5 h28 l-4 -5z" fill="#EE7B33"/>
    <circle cx="122" cy="73" r="3" fill="#EE7B33"/>
  </svg>

  <!-- Simple Blog: browser + pencil + lock -->
  <svg v-else-if="id === 'simple-blog'" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="15" width="120" height="70" rx="6" fill="#FFFDF8" stroke="#E7E0CE" stroke-width="2"/>
    <rect x="20" y="15" width="120" height="14" rx="6" fill="#F6F2E8"/>
    <rect x="35" y="42" width="60" height="5" rx="2" fill="#E7E0CE"/>
    <rect x="35" y="52" width="45" height="5" rx="2" fill="#E7E0CE"/>
    <rect x="35" y="62" width="55" height="5" rx="2" fill="#E7E0CE"/>
    <path d="M108 38 l14 14 -18 6 4 -18z" fill="#EE7B33"/>
    <rect x="113" y="60" width="18" height="14" rx="2" fill="#171B24"/>
    <path d="M116 60 v-5 a6 6 0 0 1 12 0 v5" fill="none" stroke="#171B24" stroke-width="3"/>
  </svg>
</template>