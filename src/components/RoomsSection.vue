<template>
  <section class="rooms-section py-5">
    <div class="container">
      <h2 class="section-title text-center mb-5">Best Hotel Rooms & Suites</h2>
      <div class="row">
        <div
          v-for="room in rooms"
          :key="room.id"
          class="col-lg-4 col-md-6 mb-4 d-flex align-items-stretch"
        >
          <el-card :body-style="{ padding: '0px' }" shadow="hover" class="room-card w-100">
            <!-- Nội dung card mặc định -->
            <div class="room-content-default">
              <div class="room-image-container">
                <img :src="room.imageUrl" :alt="room.name" class="room-image" />
              </div>
              <div class="room-info-block">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <span class="price-text">PRICE {{ room.price }} NIGHT</span>
                  <el-rate
                    v-model="room.rating"
                    disabled
                    size="small"
                    :colors="rateColors"
                    disabled-void-color="#E0E0E0"
                    class="room-rating"
                  />
                </div>
                <h5 class="room-name mb-0">{{ room.name }}</h5>
              </div>
            </div>

            <!-- Overlay hiển thị khi hover -->
            <div class="room-hover-overlay">
              <div class="overlay-content p-4">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <span class="price-text-overlay">PRICE {{ room.price }} NIGHT</span>
                  <el-rate
                    v-model="room.rating"
                    disabled
                    size="small"
                    :colors="rateColors"
                    disabled-void-color="#E0E0E0"
                    class="room-rating-overlay"
                  />
                </div>
                <h4 class="room-name-overlay mb-3">{{ room.name }}</h4>
                <p class="room-description-overlay text-muted mb-4">
                  {{ room.description || 'Elegant room with modern amenities and a stunning view, perfect for a relaxing stay.' }}
                </p>
                <div class="d-flex justify-content-between">
                  <el-button type="danger" plain class="details-button" @click="viewRoomDetails(room.id)">DETAILS</el-button>
                  <el-button type="primary" class="book-now-button" @click="bookRoom(room.id)">BOOK NOW</el-button>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </div>

      <!-- Nút VIEW ALL ROOMS -->
      <div class="text-center mt-5 view-all-rooms-container">
        <a href="#" @click.prevent="goToRoomsPage" class="view-all-rooms-link">
          VIEW ALL ROOMS
        </a>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // 1. Import useRouter

const rooms = ref([
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: '$120.00',
    name: 'Luxury Suite Room',
    rating: 5,
    description: 'Spacious suite with a king-size bed, separate living area, and panoramic city views. Includes premium amenities.',
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: '$150.00',
    name: 'Deluxe King Room',
    rating: 4,
    description: 'Comfortable deluxe room with a plush king-size bed, modern decor, and a work desk. Ideal for business or leisure.',
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: '$99.00',
    name: 'Standard Double Room',
    rating: 5,
    description: 'A cozy room featuring two comfortable double beds, perfect for families or friends travelling together.',
  },
]);

const rateColors = ['#FFC107', '#FFC107', '#FFC107'];

const router = useRouter(); 

const goToRoomsPage = () => {
  router.push('/rooms'); 
};

const viewRoomDetails = (roomId) => {
 
  router.push(`/rooms/${roomId}`);
  console.log('View details for room:', roomId);
};

const bookRoom = (roomId) => {
 
  router.push(`/booking/${roomId}`);
  console.log('Book room:', roomId);
};

rooms.value.forEach(room => {
  if (!room.description) {
    room.description = 'Elegant room with modern amenities and a stunning view, perfect for a relaxing stay.';
  }
});
</script>

<style scoped>


.section-title {
  font-family: 'Georgia', serif; 
  font-size: 2.2rem; 
  color: #333;
  text-transform: capitalize; 
}

.rooms-section {
  background-color: #f8f9fa; 
}

.room-card {
  border-radius: 15px !important;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative; 
}

.room-image-container {
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background-color: #e0e0e0; 
}

.room-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.room-card:hover .room-image {
  transform: scale(1.05);
}

.room-info-block {
  background-color: #ffffff;
  padding: 20px;
  margin: 0 20px 20px 20px; 
  border-radius: 10px; 
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  position: relative;
  transform: translateY(-50px); 
  z-index: 1;
  transition: opacity 0.3s ease, transform 0.3s ease-out;
}

.room-card:hover .room-info-block {
  opacity: 0;
  transform: translateY(-30px) scale(0.95); 
}

.price-text {
  font-size: 0.7rem;
  color: #777;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.room-name {
  font-family: 'Georgia', serif;
  font-size: 1.3rem;
  color: #333;
  font-weight: bold;
}
.room-rating :deep(.el-rate__icon) {
  font-size: 16px; 
}


/* --- Overlay Styles --- */
.room-hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.98);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s ease, visibility 0s linear 0.4s;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 15px; 
  padding: 25px; 
}

.room-card:hover .room-hover-overlay {
  opacity: 1;
  visibility: visible;
  transition-delay: 0.05s; 
}

.overlay-content {
  width: 100%;
  text-align: left;
}

.price-text-overlay {
  font-size: 0.75rem;
  color: #6c757d;
  font-weight: 600;
  text-transform: uppercase;
}

.room-name-overlay {
  font-family: 'Georgia', serif;
  font-size: 1.6rem; 
  font-weight: 700;
  color: #1A253C;
  margin-top: 5px; 
}

.room-description-overlay {
  font-size: 0.88rem; 
  line-height: 1.65;
  color: #555; 
  min-height: 70px; 
  margin-bottom: 25px !important; 
}

.details-button,
.book-now-button {
  padding: 12px 22px !important; 
  font-weight: bold !important;
  border-radius: 6px !important;
  text-transform: uppercase;
  font-size: 0.75rem !important; 
  letter-spacing: 0.5px;
}

.book-now-button {
  background-color: #C09153 !important; 
  border-color: #C09153 !important;
  color: #fff !important;
}

.book-now-button:hover {
  background-color: #b38246 !important;
  border-color: #b38246 !important;
}

.details-button.el-button--danger.is-plain {
    color: #C09153 !important; 
    background: transparent !important;
    border-color: #C09153 !important;
}

.details-button.el-button--danger.is-plain:hover {
    background: #C09153 !important;
    border-color: #C09153 !important;
    color: #fff !important;
}

.room-rating-overlay :deep(.el-rate__icon) {
  margin-right: 2px;
  font-size: 18px; 
}


/* --- VIEW ALL ROOMS Link --- */

.view-all-rooms-link {
  display: inline-block;
  padding: 8px 0; 
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; 
  font-size: 0.9rem;
  font-weight: 500; 
  color: #D32F2F; 
  text-decoration: none;
  letter-spacing: 1px; 
  border-bottom: 2px solid transparent; 
  transition: color 0.3s ease, border-color 0.3s ease, transform 0.2s ease;
}

.view-all-rooms-link:hover,
.view-all-rooms-link:focus {
  color: #B71C1C; 
  border-bottom-color: #B71C1C; 
  transform: translateY(-2px); 
  outline: none; 
}



</style>