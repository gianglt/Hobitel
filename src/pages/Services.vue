<template>
  <div class="container py-5">
    <div
      v-for="(service, index) in services"
      :key="service.id"
      class="row align-items-center mb-5 service-item"
    >
      <!-- Image Column -->
      <div
        :class="[
          'col-12 col-md-6',
          index % 2 !== 0 ? 'order-md-2' : 'order-md-1' 
        ]"
        class="mb-4 mb-md-0"
      >
        <el-image
          :src="service.imageSrc"
          :alt="service.title"
          fit="cover"
          class="img-fluid rounded shadow-sm w-100 service-image"
          lazy
        >
          <template #placeholder>
            <div class="image-slot">Loading<span class="dot">...</span></div>
          </template>
          <template #error>
            <div class="image-slot">
              <el-icon><icon-picture /></el-icon>
            </div>
          </template>
        </el-image>
      </div>

      <!-- Text Content Column -->
      <div
        :class="[
          'col-12 col-md-6',
          index % 2 !== 0 ? 'order-md-1' : 'order-md-2' 
        ]"
      >
        <div class="p-4 p-lg-5 bg-light rounded service-content">
          <span class="text-uppercase fw-bold service-category">Services</span>
          <h2 class="display-6 fw-bold mt-1 mb-3 service-title">{{ service.title }}</h2>
          <p class="text-muted mb-4 service-description">{{ service.description }}</p>
          <el-button type="danger" size="large" @click="viewDetails(service)">
            VIEW DETAIL
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const services = ref([
  {
    id: 1,
    imageSrc: 'https://hibtel.webhotel.vn/assets/image/facilities-1.jpg', // Thay bằng URL hình ảnh thực tế
    title: 'Exquisite Dining Experience',
    description: 'Enthusiastically productize intuitive convergence after resource sucking e-business. Interactively recaptiualize leading. Efficiently scale granular sources for mission-critical platforms. Enthusiastically productize intuitive convergence after resource sucking e-business.',
  },
  {
    id: 2,
    imageSrc: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3BhJTIwdHJlYXRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60', // Thay bằng URL hình ảnh thực tế
    title: 'Relaxing Spa Treatments',
    description: 'Business interactively recaptiualize leading. Efficiently scale granular sources for mission-critical platforms. Enthusiastically productize intuitive convergence after resource sucking e-business. Interactively recaptiualize leading.',
  },
  {
    id: 3,
    imageSrc: 'https://i.pinimg.com/736x/57/32/1b/57321b3fca7242ba52da622d3b079b35.jpg',
    title: 'Modern Conference Facilities',
    description: 'Scale granular sources for mission-critical platforms. Enthusiastically productize intuitive convergence after resource sucking e-business. Interactively recaptiualize leading. Efficiently scale granular sources for mission-critical platforms.',
  }
]);

const viewDetails = (service) => {
  console.log('View details for:', service.title);
}
</script>

<style scoped>
.container {
  max-width: 1140px; 
}



.service-image {

  min-height: 300px; 
}

.service-category {
  color: #dc3545; 
  font-size: 0.85rem;
  letter-spacing: 0.05em;
}



.service-description {
  line-height: 1.6;
}

/* Placeholder và error styles cho el-image */
.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 300px; 
  background: #f5f7fa;
  color: var(--el-text-color-secondary);
  font-size: 14px;
}
.image-slot .el-icon {
  font-size: 30px;
}
.dot {
  animation: dot 1.4s infinite ease-in-out both;
  animation-delay: -0.32s;
}
.dot:nth-child(2) {
  animation-delay: -0.16s;
}
.dot:nth-child(3) {
  animation-delay: 0s;
}
@keyframes dot {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1.0);
  }
}

/* Responsive adjustments */
@media (max-width: 767.98px) { 
  .service-title {
    font-size: 1.75rem; 
  }
  .service-content {
    padding: 1.5rem !important; 
  }
  .el-button--large {
    padding: 10px 18px;
    font-size: 0.9rem;
  }
}
</style>