<template>
  <el-header :class="['header', { 'scrolled': isScrolled }]">
    <div class="container-fluid d-flex align-items-center justify-content-between h-100">
      <!-- Logo -->
      <img
        src="https://images.unsplash.com/photo-1588532242026-01df5951f6f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Logo"
        class="logo img-fluid"
        @click="() => router.push('/home')"
      />

      <!-- Desktop Menu -->
      <el-menu
        :default-active="activeIndex"
        class="transparent-menu d-none d-lg-flex"
        mode="horizontal"
        @select="handleSelect"
       
      >
        <el-menu-item index="1">HOME</el-menu-item>
        <el-menu-item index="2">ROOMS</el-menu-item>
        <el-menu-item index="3">ABOUT</el-menu-item>
        <el-sub-menu index="4" :popper-class="submenuPopperClass">
          <template #title>PAGES</template>
          <el-menu-item index="4-1">Services</el-menu-item>
          <el-menu-item index="4-2">Gallery</el-menu-item>
          <el-menu-item index="4-3">Restaurant</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="5">BLOG</el-menu-item>
        <el-menu-item index="6">CONTACT</el-menu-item>
      </el-menu>

      <!-- Mobile Menu Toggler -->
      <button
        class="navbar-toggler d-lg-none"
        type="button"
        @click="toggleMobileMenu"
        aria-controls="mobileMenu"
        :aria-expanded="isMobileMenuOpen.toString()"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>

    <!-- Mobile Menu (Collapsible) -->
    <div
      class="mobile-menu-container"
      :class="{ open: isMobileMenuOpen }"
      id="mobileMenu"
    >
      <el-menu
        class="mobile-menu"
        mode="vertical"
        @select="handleSelect"
        background-color="#2c3e50"
        text-color="#fff"
        active-text-color="#fff"
      >
        <el-menu-item index="1">HOME</el-menu-item>
        <el-menu-item index="2">ROOMS</el-menu-item>
        <el-menu-item index="3">ABOUT</el-menu-item>
        <el-sub-menu index="4" :popper-class="submenuPopperClass">

          <template #title>PAGES</template>
          <el-menu-item index="4-1">Services</el-menu-item>
          <el-menu-item index="4-2">Gallery</el-menu-item>
          <el-menu-item index="4-3">Restaurant</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="5">BLOG</el-menu-item>
        <el-menu-item index="6">CONTACT</el-menu-item>
      </el-menu>
    </div>
  </el-header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const activeIndex = ref('1')
const isMobileMenuOpen = ref(false)
const router = useRouter()
const isScrolled = ref(false)

// Computed property for popper class
const submenuPopperClass = computed(() => {
  // If NOT scrolled, add class for light background, otherwise no extra class (uses default dark popper style)
  return !isScrolled.value ? 'submenu-popper-not-scrolled' : '';
});

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handleSelect = (key) => {
  if (key.startsWith('4-')) {
    activeIndex.value = '4' // Set parent 'PAGES' as active
  } else {
    activeIndex.value = key
  }

  const routes = {
    '1': '/home',
    '2': '/rooms',
    '3': '/about',
    '4-1': '/services',
    '4-2': '/gallery',
    '4-3': '/restaurant',
    '5': '/blog',
    '6': '/contact',
  }

  if (routes[key]) {
    router.push(routes[key])
    if (isMobileMenuOpen.value) { // Close mobile menu only if it's open
        isMobileMenuOpen.value = false
    }
  }
}

const handleScroll = () => {
  if (window.scrollY > 10) {
    isScrolled.value = true
  } else {
    isScrolled.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // Set activeIndex based on current route
  const currentPath = router.currentRoute.value.path;
  const routesMap = {
    '/home': '1', '/rooms': '2', '/about': '3',
    '/services': '4-1', '/gallery': '4-2', '/restaurant': '4-3',
    '/blog': '5', '/contact': '6',
  };
  for (const [path, index] of Object.entries(routesMap)) {
    if (currentPath === path) {
      if (index.startsWith('4-')) {
        activeIndex.value = '4'; // Highlight 'PAGES' if a sub-page is active
      } else {
        activeIndex.value = index;
      }
      break;
    }
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.header {
  height: 80px;
  position: absolute; 
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.3); 
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.header.scrolled {
  position: fixed; 
  background-color: #222; 
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
}

.logo {
  height: 60px;
  object-fit: contain;
  cursor: pointer;
  margin-right: 1rem; /* Bootstrap spacing */
}

/* Desktop Menu */
.transparent-menu {
  display: flex;
  align-items: center;
  justify-content: flex-end; 
  flex-grow: 1;
  height: 100%; 
  border-bottom: none !important; 
  box-shadow: none !important; 
}

.header:not(.scrolled) .transparent-menu {
  background-color: transparent !important; 
}
.header.scrolled .transparent-menu {
  background-color: #222 !important; 
}

/* Desktop menu items and submenu titles */
.transparent-menu .el-menu-item,
:deep(.transparent-menu .el-sub-menu > .el-sub-menu__title) {
  background-color: transparent !important;
  color: #fff !important;
  font-size: 18px;
  padding: 0 15px; 
  line-height: 80px; 
  border-bottom: none !important; 
  transition: color 0.3s ease; 
}

:deep(.transparent-menu .el-sub-menu > .el-sub-menu__title:hover),
.transparent-menu .el-menu-item:hover {
  color: #6F98E3 !important; 
  background-color: transparent !important;
}

/* Active state for desktop menu items and submenu titles */
.transparent-menu .el-menu-item.is-active,
:deep(.transparent-menu .el-sub-menu.is-active > .el-sub-menu__title) {
  color: #fff !important; 

}

/* --- Submenu popper styling --- */

/* DEFAULT popper style (for SCROLLED state or when 'submenu-popper-not-scrolled' class is absent) - DARK THEME */
:deep(body .el-popper.is-pure.el-menu--popup:not(.submenu-popper-not-scrolled)) {
  background-color: #333 !important;
  border: 1px solid #444 !important;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1) !important;
}

:deep(body .el-popper.is-pure.el-menu--popup:not(.submenu-popper-not-scrolled) .el-menu.el-menu--popup .el-menu-item) {
  color: #fff !important; 
  background-color: #333 !important; 
}
:deep(body .el-popper.is-pure.el-menu--popup:not(.submenu-popper-not-scrolled) .el-menu.el-menu--popup .el-menu-item:hover) {
  background-color: #555 !important; 
  color: #fff !important; 
}
:deep(body .el-popper.is-pure.el-menu--popup:not(.submenu-popper-not-scrolled) .el-menu.el-menu--popup .el-menu-item.is-active) {
  color: #fff !important; 
  background-color: #444 !important; 
}

/* Popper style when HEADER IS NOT SCROLLED - LIGHT THEME */
:deep(body .el-popper.is-pure.el-menu--popup.submenu-popper-not-scrolled) {
  background-color: #f8f9fa !important; 
  border: 1px solid #dee2e6 !important;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1) !important;
}
:deep(body .el-popper.is-pure.el-menu--popup.submenu-popper-not-scrolled .el-menu.el-menu--popup .el-menu-item) {
  color: #212529 !important; 
  background-color: #f8f9fa !important; 
}
:deep(body .el-popper.is-pure.el-menu--popup.submenu-popper-not-scrolled .el-menu.el-menu--popup .el-menu-item:hover) {
  background-color: #e9ecef !important; 
  color: #007bff !important;
}
:deep(body .el-popper.is-pure.el-menu--popup.submenu-popper-not-scrolled .el-menu.el-menu--popup .el-menu-item.is-active) {
  color: #0056b3 !important;
  background-color: #dde6ed !important;
}

/* Mobile Menu Toggler */
.navbar-toggler {
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 0.25rem 0.75rem;
  color: white; 
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
  width: 1.5em;
  height: 1.5em;
  display: inline-block;
  vertical-align: middle;
}

/* Mobile Menu Container */
.mobile-menu-container {
  position: absolute; 
  top: 80px; 
  left: 0;
  right: 0;
  background-color: #2c3e50; /* Mobile menu background */
  z-index: 999; 
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-height 0.4s ease-in-out, opacity 0.3s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.header.scrolled .mobile-menu-container {
  position: fixed;
}

.mobile-menu-container.open {
  max-height: calc(100vh - 80px); 
  overflow-y: auto; 
  opacity: 1;
}

.mobile-menu {
  width: 100%;
  border-bottom: none !important; 
}

/* Mobile menu items and submenu titles */
.mobile-menu .el-menu-item,
:deep(.mobile-menu .el-sub-menu > .el-sub-menu__title) {
  font-size: 16px !important;
  color: #fff !important;
  padding-left: 20px !important; /* Indentation */
}
/* Mobile submenu items (nested) */
:deep(.mobile-menu .el-sub-menu .el-menu-item) {
  padding-left: 40px !important; 
  background-color: #34495e !important; 
  color: #fff !important;
}

/* Hover states for mobile menu */
.mobile-menu .el-menu-item:hover,
:deep(.mobile-menu .el-sub-menu > .el-sub-menu__title:hover) {
  color: #6F98E3 !important;
  background-color: #3f5a75 !important; 
}
:deep(.mobile-menu .el-sub-menu .el-menu-item:hover) {
  color: #6F98E3 !important; 
  background-color: #4a6b8c !important;
}

/* Active states for mobile menu */
.mobile-menu .el-menu-item.is-active,
:deep(.mobile-menu .el-sub-menu.is-active > .el-sub-menu__title) {
  color: #fff !important; 
  background-color: #2c3e50 !important; 

}
:deep(.mobile-menu .el-sub-menu .el-menu-item.is-active) {
  color: #fff !important;
  background-color: #34495e !important; 
}

/* General Element Plus overrides if needed elsewhere */
.mobile-menu.el-menu {
  border-right: none; 
}

:deep(.el-menu--horizontal > .el-menu-item.is-active) {
  border-bottom: none !important; 
}
:deep(.el-menu--horizontal > .el-sub-menu.is-active > .el-sub-menu__title) {
  border-bottom: none !important; 
}
</style>