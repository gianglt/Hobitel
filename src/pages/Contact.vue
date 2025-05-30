<template>
  <section class="contact-info-section py-5">
    <div class="container">
      <!-- Section Title -->
      <div class="row justify-content-center mb-5">
        <div class="col-md-8 text-center">
          <h2 class="section-title fw-bold mb-3">Contact Info</h2>
          <div class="title-underline-container">
            <div class="title-underline">
              <span class="title-underline-segment red"></span>
              <span class="title-underline-segment gray"></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Items -->
      <div class="row text-center">
        <div
          v-for="item in contactItems"
          :key="item.id"
          class="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0"
        >
          <div class="contact-item">
            <div class="contact-icon-wrapper mb-3">
              <el-icon :size="28" color="white">
                <component :is="item.iconComponent" />
              </el-icon>
            </div>
            <h5 class="contact-item-title fw-semibold mb-2">{{ item.title }}</h5>
            <p class="contact-item-detail text-muted">{{ item.detail }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { Location, Phone, Message } from '@element-plus/icons-vue'; // Import icons

const contactItems = ref([
  {
    id: 1,
    iconComponent: Location,
    title: 'Hotel Address',
    detail: '123, Đường Biển, TP. Đà Nẵng',
  },
  {
    id: 2,
    iconComponent: Phone,
    title: 'Call Us Support 24/7',
    detail: '0123 456 789',
  },
  {
    id: 3,
    iconComponent: Message,
    title: 'Our Email Hotel',
    detail: 'contact@hobitel.vn',
  },
]);
</script>

<style scoped>
.contact-info-section {
  background-color: #ffffff; 
}

.section-title {
  color: #1A3760; 
  font-family: 'Georgia', 'Times New Roman', Times, serif; 
  font-size: 2.25rem; 
}

.title-underline-container {
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
}

.title-underline {
  display: flex;
  height: 3px; 
  width: 120px;
}

.title-underline-segment {
  height: 100%;
}

.title-underline-segment.red {
  background-color: #d8463e; 
  width: 30%;
}

.title-underline-segment.gray {
  background-color: #e0e0e0; 
  width: 70%; 
}

.contact-item {
  padding: 1.5rem;
}

.contact-icon-wrapper {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 60px;  
  height: 60px;
  background-color: #d8463e; 
  border-radius: 50%; 
  color: white;
  box-shadow: 0 4px 12px rgba(216, 70, 62, 0.3); 
}

.contact-item-title {
  color: #343a40; 
  font-size: 1.1rem;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; 
}

.contact-item-detail {
  color: #6c757d; 
  font-size: 0.95rem;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; 
}

/* Responsive adjustments */
@media (max-width: 767.98px) { 
  .section-title {
    font-size: 1.8rem;
  }
  .contact-item {
    padding: 1rem;
  }
}
</style>