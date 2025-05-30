<template>
  <div class="gallery-page">
    <div class="container py-5">
      <h1 class="gallery-title text-center mb-5">Our Gallery</h1>

      <div v-if="galleryImages.length" class="row">
        <div
          v-for="(image, index) in galleryImages"
          :key="image.id || index"
          class="col-lg-4 col-md-6 col-sm-12 mb-4"
        >
          <el-card shadow="hover" :body-style="{ padding: '0px' }" class="gallery-item-card">
            <el-image
              :src="image.src"
              :alt="image.alt"
              fit="cover"
              class="gallery-image"
              :preview-src-list="[image.src]"
              :initial-index="0"
              lazy
              hide-on-click-modal
            >
              <template #placeholder>
                <div class="image-slot">
                  Loading<span class="dot">...</span>
                </div>
              </template>
              <template #error>
                <div class="image-slot">
                  <i class="el-icon-picture-outline"></i> Error
                </div>
              </template>
            </el-image>
            <div v-if="image.caption" style="padding: 14px;">
              <span>{{ image.caption }}</span>
            </div>
          </el-card>
        </div>
      </div>
      <div v-else class="text-center">
        <p>No images to display at the moment. Please check back later!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const galleryImages = ref([
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1505826759037-406b40feb4cd?q=80&w=1920&auto=format&fit=crop',
    alt: 'Luxury hotel poolside view',
    caption: 'Poolside Serenity',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1920&auto=format&fit=crop',
    alt: 'Modern hotel lobby',
    caption: 'Elegant Lobby',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1920&auto=format&fit=crop',
    alt: 'Breakfast by the pool',
    caption: 'Morning Bliss',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1920&auto=format&fit=crop',
    alt: 'Comfortable hotel room bed',
    caption: 'Comfortable Stay',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?q=80&w=1920&auto=format&fit=crop',
    alt: 'Hotel exterior with palm trees',
    caption: 'Tropical Paradise',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?q=80&w=1920&auto=format&fit=crop',
    alt: 'Hotel restaurant dining area',
    caption: 'Fine Dining',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1920&auto=format&fit=crop',
    alt: 'Resort view with multiple pools',
    caption: 'Resort Getaway',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1920&auto=format&fit=crop',
    alt: 'Spacious hotel suite',
    caption: 'Luxury Suite',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1920&auto=format&fit=crop',
    alt: 'Hotel spa and wellness area',
    caption: 'Relax and Rejuvenate',
  }
]);

</script>

<style scoped>
.gallery-page {
  background-color: #f8f9fa; 
  min-height: 100vh; 
}

.gallery-title {
  font-weight: 300;
  color: #333;
}

.gallery-item-card {
  border-radius: 8px;
  overflow: hidden; 
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.gallery-item-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15) !important;
}

.gallery-image {
  width: 100%;
  height: 250px; 
  display: block; 
  cursor: pointer;
}

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #e9ecef;
  color: #909399;
  font-size: 14px;
}

.image-slot .el-icon-picture-outline {
  font-size: 30px;
}

.dot {
  animation: dot 1.4s infinite ease-in-out both;
  display: inline-block;
}
.dot:nth-child(1) { animation-delay: -0.32s; }
.dot:nth-child(2) { animation-delay: -0.16s; }

@keyframes dot {
  0%, 80%, 100% { opacity: 0; }
  40% { opacity: 1; }
}


</style>