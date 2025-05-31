<template>
  <div class="container py-5">
    <!-- Service Items -->
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
          <div class="d-flex">
            <el-button type="danger" size="large" @click="viewDetails(service)">
              VIEW DETAIL
            </el-button>
            <el-button type="success" size="large" @click="addServiceToCart(service)" class="ms-2">
              USE SERVICE
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- Selected Services Summary -->
    <div v-if="selectedServices.length > 0" class="mt-5 p-4 bg-white shadow-sm rounded selected-services-summary">
      <h3 class="mb-4 text-center service-title">Your Selected Services</h3>
      <el-table :data="selectedServices" style="width: 100%" class="mb-3">
        <el-table-column prop="title" label="Service" min-width="180" />
        <el-table-column label="Price" width="120">
          <template #default="scope">
            ${{ scope.row.price.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column label="Quantity" width="150">
          <template #default="scope">
            <el-input-number
              v-model="scope.row.quantity"
              :min="1"
              size="small"
              @change="(currentValue) => handleQuantityChange(scope.row.id, currentValue)"
              controls-position="right"
              style="width: 100px;"
            />
          </template>
        </el-table-column>
        <el-table-column label="Subtotal" width="120">
          <template #default="scope">
            ${{ (scope.row.price * scope.row.quantity).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column label="Actions" width="100" align="center">
          <template #default="scope">
            <el-button type="danger" size="small" @click="removeItemFromCart(scope.row.id)" plain circle>
              <el-icon><icon-delete /></el-icon>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="text-end mt-4">
        <h4 class="fw-bold">Total Cost: <span class="text-danger">${{ totalCost.toFixed(2) }}</span></h4>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus'; // For notifications
import { Delete as IconDelete, Picture as IconPicture } from '@element-plus/icons-vue'; // Import necessary icons

const services = ref([
  {
    id: 1,
    imageSrc: 'https://hibtel.webhotel.vn/assets/image/facilities-1.jpg', // Thay bằng URL hình ảnh thực tế
    title: 'Exquisite Dining Experience',
    description: 'Enthusiastically productize intuitive convergence after resource sucking e-business. Interactively recaptiualize leading. Efficiently scale granular sources for mission-critical platforms. Enthusiastically productize intuitive convergence after resource sucking e-business.',
    price: 75.00,
  },
  {
    id: 2,
    imageSrc: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3BhJTIwdHJlYXRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60', // Thay bằng URL hình ảnh thực tế
    title: 'Relaxing Spa Treatments',
    description: 'Business interactively recaptiualize leading. Efficiently scale granular sources for mission-critical platforms. Enthusiastically productize intuitive convergence after resource sucking e-business. Interactively recaptiualize leading.',
    price: 120.00,
  },
  {
    id: 3,
    imageSrc: 'https://i.pinimg.com/736x/57/32/1b/57321b3fca7242ba52da622d3b079b35.jpg',
    title: 'Modern Conference Facilities',
    description: 'Scale granular sources for mission-critical platforms. Enthusiastically productize intuitive convergence after resource sucking e-business. Interactively recaptiualize leading. Efficiently scale granular sources for mission-critical platforms.',
    price: 200.00,
  }
]);

const selectedServices = ref([]); // Stores { id, title, price, quantity }

const viewDetails = (service) => {
  console.log('View details for:', service.title);
  // Placeholder for navigation or modal display
  ElMessage.info(`Viewing details for ${service.title}`);
};

const addServiceToCart = (service) => {
  const existingItem = selectedServices.value.find(item => item.id === service.id);
  if (existingItem) {
    existingItem.quantity++;
    ElMessage.success(`${service.title} quantity updated.`);
  } else {
    selectedServices.value.push({
      id: service.id,
      title: service.title,
      price: service.price,
      quantity: 1
    });
    ElMessage.success(`${service.title} added to your services.`);
  }
};

const handleQuantityChange = (itemId, newQuantity) => {
  const item = selectedServices.value.find(item => item.id === itemId);
  if (item) {
    // el-input-number ensures quantity is >= min (e.g., 1)
    item.quantity = newQuantity;
  }
};

const removeItemFromCart = (itemId) => {
  const itemIndex = selectedServices.value.findIndex(item => item.id === itemId);
  if (itemIndex !== -1) {
    const itemTitle = selectedServices.value[itemIndex].title;
    selectedServices.value.splice(itemIndex, 1);
    ElMessage.warning(`${itemTitle} removed from your services.`);
  }
};

const totalCost = computed(() => {
  return selectedServices.value.reduce((acc, item) => acc + (item.price * item.quantity), 0);
});

</script>

<style scoped>
.container {
  max-width: 1140px; 
}

.service-item:last-child {
  margin-bottom: 0 !important; /* Remove margin from the last service item before summary */
}

.service-image {
  border-radius: 0.5rem; /* Consistent rounding */
  object-fit: cover;
  min-height: 300px; 
}

.service-category {
  color: #dc3545; 
  font-size: 0.85rem;
  letter-spacing: 0.05em;
}

.service-title {
  font-family: 'Georgia', serif; /* Optional: if you want a more classic title font */
  color: #333;
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

.selected-services-summary {
  border: 1px solid #eee;
}

.selected-services-summary .el-table th {
  background-color: #f8f9fa !important; /* Light grey for table header */
  color: #333;
  font-weight: 600;
}

.selected-services-summary .el-button--danger.is-plain {
    color: #dc3545;
    border-color: #dc3545;
}
.selected-services-summary .el-button--danger.is-plain:hover,
.selected-services-summary .el-button--danger.is-plain:focus {
    background-color: #dc3545;
    color: white;
}
</style>