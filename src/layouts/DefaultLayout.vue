<template>
  <div class="default-layout">
    <Header />
    <Banner />
    <main class="main-content">
    <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Banner from '../components/Banner.vue'
</script>
