<template>
  <div class="rooms-page">
    <!-- Optional: Hero Section for Rooms Page -->
    <section class="rooms-hero py-5 text-center bg-light">
      <div class="container">
        <h1 class="page-title">Our Exquisite Rooms & Suites</h1>
        <p class="lead text-muted">
          Discover comfort and luxury in every corner. Find the perfect room for your stay.
        </p>
      </div>
    </section>

    <section class="rooms-list-section py-5">
      <div class="container">
       

        <div class="row">
          <div
            v-for="room in displayedRooms"
            :key="room.id"
            class="col-lg-4 col-md-6 mb-4 d-flex align-items-stretch"
          >
            <!-- Phần Card phòng giống hệt RoomsSection.vue -->
            <el-card :body-style="{ padding: '0px' }" shadow="hover" class="room-card w-100">
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
                    {{ room.description }}
                  </p>
                  <div class="d-flex justify-content-between">
                    <el-button type="danger" plain class="details-button" @click="viewRoomDetails(room.id)">DETAILS</el-button>
                    <el-button type="primary" class="book-now-button" @click="bookRoom(room.id)">BOOK NOW</el-button>
                  </div>
                </div>
              </div>
            </el-card>
            <!-- Hết Phần Card phòng -->
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const rateColors = ['#FFC107', '#FFC107', '#FFC107'];

// Danh sách đầy đủ các phòng
const allRooms = ref([
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=870&auto=format&fit=crop',
    price: '$120.00',
    name: 'Luxury Suite Room',
    rating: 5,
    description: 'Spacious suite with a king-size bed, separate living area, and panoramic city views. Includes premium amenities.',
    type: 'suite',
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=774&auto=format&fit=crop',
    price: '$150.00',
    name: 'Deluxe King Room',
    rating: 4,
    description: 'Comfortable deluxe room with a plush king-size bed, modern decor, and a work desk. Ideal for business or leisure.',
    type: 'deluxe',
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=870&auto=format&fit=crop',
    price: '$99.00',
    name: 'Standard Double Room',
    rating: 5,
    description: 'A cozy room featuring two comfortable double beds, perfect for families or friends travelling together.',
    type: 'standard',
  },
  {
    id: 4,
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=870&auto=format&fit=crop',
    price: '$180.00',
    name: 'Ocean View Suite',
    rating: 5,
    description: 'Breathtaking ocean views from your private balcony. This suite offers unparalleled luxury and relaxation.',
    type: 'suite',
  },
  {
    id: 5,
    imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=870&auto=format&fit=crop',
    price: '$110.00',
    name: 'Cozy Single Room',
    rating: 4,
    description: 'Perfect for solo travelers, this room offers a comfortable single bed and all essential amenities.',
    type: 'standard',
  },
  {
    id: 6,
    imageUrl: 'https://hibtel.webhotel.vn/assets/image/rooms-1.jpg',
    price: '$220.00',
    name: 'Presidential Suite',
    rating: 5,
    description: 'The pinnacle of luxury, featuring multiple rooms, a dining area, and personalized butler service.',
    type: 'suite',
  },
  {
    id: 7,
    imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=870&auto=format&fit=crop',
    price: '$130.00',
    name: 'Family Room',
    rating: 4,
    description: 'Spacious room with connecting doors, ideal for families with children. Includes fun amenities for kids.',
    type: 'family',
  },
  {
    id: 8,
    imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=870&auto=format&fit=crop',
    price: '$165.00',
    name: 'Executive Deluxe Room',
    rating: 5,
    description: 'Enhanced deluxe room with access to the executive lounge and upgraded amenities for a productive stay.',
    type: 'deluxe',
  }
  // Thêm nhiều phòng nữa ở đây
]);

// Logic cho Filters (Tùy chọn)
const filterType = ref('all'); 
const sortBy = ref('price_asc'); 

// Logic cho Pagination (Tùy chọn)
const currentPage = ref(1);
const roomsPerPage = ref(6); 

// Computed property để hiển thị phòng dựa trên filter, sort, và pagination
const displayedRooms = computed(() => {
  let roomsToDisplay = [...allRooms.value];

  // Áp dụng Filter
  if (filterType.value !== 'all') {
    roomsToDisplay = roomsToDisplay.filter(room => room.type === filterType.value);
  }

  // Áp dụng Sort
  if (sortBy.value === 'price_asc') {
    roomsToDisplay.sort((a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1)));
  } else if (sortBy.value === 'price_desc') {
    roomsToDisplay.sort((a, b) => parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1)));
  }



  return roomsToDisplay; 
});

const viewRoomDetails = (roomId) => {
  router.push(`/rooms/${roomId}`); 
};

const bookRoom = (roomId) => {
  router.push(`/booking/${roomId}`); 
};

onMounted(() => {
 
  window.scrollTo(0, 0); 
});

</script>

<style scoped>

.rooms-page {
  background-color: #fdfdfd; 
}

.rooms-hero {
  background-color: #e9ecef; 
  border-bottom: 1px solid #dee2e6;
}

.page-title {
  font-family: 'Georgia', serif;
  font-size: 2.8rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.rooms-list-section {
  background-color: #f8f9fa;
}

.room-card {
  border-radius: 15px !important;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  background-color: #fff;
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

.el-select {
  width: 100%;
}

.el-pagination {
  justify-content: center; 
}
</style>