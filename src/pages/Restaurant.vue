<template>
  <div class="restaurant-page-v2">
    <!-- Hero Section -->
    <section class="hero-section-v2 text-white text-center d-flex flex-column align-items-center justify-content-center">
      <div class="overlay-v2"></div>
      <div class="container position-relative">
        <h1 class="display-3 fw-bold mb-3 animated-text">Taste the Tradition, Feel the Passion</h1>
        <p class="lead mb-4">Discover a culinary journey where every dish tells a story.</p>
        <el-button type="warning" size="large" @click="scrollToMenu">View Our Menu</el-button>
      </div>
    </section>

    <!-- Our Philosophy Section -->
    <section class="philosophy-section py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-5 mb-4 mb-lg-0">
            <el-image
              src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1920&auto=format&fit=crop"
              alt="Fresh Ingredients"
              fit="cover"
              class="img-fluid rounded shadow-lg philosophy-image"
              lazy
            />
          </div>
          <div class="col-lg-7 ps-lg-5">
            <h2 class="section-title-v2 mb-3">Our Culinary Philosophy</h2>
            <p class="text-secondary">
              At "The Gourmet Nook" (replace with your restaurant name), we believe in the art of fine dining, where exceptional food meets heartfelt hospitality. Our commitment is to source the freshest, seasonal ingredients, transforming them into delightful dishes that honor both classic traditions and innovative culinary explorations.
            </p>
            <p class="text-secondary">
              We aim to create an inviting atmosphere where every guest feels cherished, and every meal is an occasion to remember. Join us for an experience that tantalizes your taste buds and warms your soul.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Menu Highlights Section -->
    <section id="menu-highlights" class="menu-highlights-section py-5 bg-light-v2">
      <div class="container">
        <h2 class="section-title-v2 text-center mb-5">Menu Highlights</h2>
        <el-tabs v-model="activeMenuTab" type="border-card" class="menu-tabs">
          <el-tab-pane
            v-for="category in menuCategories"
            :key="category.name"
            :label="category.label"
            :name="category.name"
          >
            <div v-if="category.items.length" class="row mt-3">
              <div
                v-for="item in category.items"
                :key="item.id"
                class="col-lg-4 col-md-6 mb-4"
              >
                <el-card shadow="hover" class="menu-item-card h-100">
                  <el-image :src="item.image" :alt="item.name" fit="cover" class="menu-item-image" lazy />
                  <div class="p-3">
                    <h5 class="menu-item-name">{{ item.name }}</h5>
                    <p class="menu-item-description text-secondary small">{{ item.description }}</p>
                    <p class="menu-item-price fw-semibold">{{ item.price }}</p>
                  </div>
                </el-card>
              </div>
            </div>
            <div v-else class="text-center py-4">
              <p>Delicious {{ category.label.toLowerCase() }} coming soon!</p>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </section>

    <!-- Ambiance Section -->
    <section class="ambiance-section py-5">
        <div class="container">
            <h2 class="section-title-v2 text-center mb-5">Our Ambiance</h2>
            <div class="row g-3">
                <div class="col-md-4">
                    <el-image src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1920&auto=format&fit=crop" alt="Restaurant Ambiance 1" class="img-fluid rounded ambiance-img" fit="cover" lazy/>
                </div>
                <div class="col-md-4">
                    <el-image src="https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=1920&auto=format&fit=crop" alt="Restaurant Ambiance 2" class="img-fluid rounded ambiance-img" fit="cover" lazy/>
                </div>
                <div class="col-md-4">
                    <el-image src="https://images.unsplash.com/photo-1592861956120-e524fc739696?q=80&w=1920&auto=format&fit=crop" alt="Restaurant Ambiance 3" class="img-fluid rounded ambiance-img" fit="cover" lazy/>
                </div>
            </div>
            <div class="text-center mt-4">
                <p class="text-secondary">Experience a warm and inviting atmosphere perfect for any occasion.</p>
                <el-button type="info" plain @click="navigateToGallery">View Full Gallery</el-button>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section py-5 bg-light-v2">
      <div class="container">
        <h2 class="section-title-v2 text-center mb-5">What Our Guests Say</h2>
        <el-carousel :interval="5000" arrow="always" height="250px" class="testimonial-carousel">
          <el-carousel-item v-for="testimonial in testimonials" :key="testimonial.id">
            <div class="testimonial-content d-flex flex-column align-items-center justify-content-center h-100 text-center p-4">
              <p class="fst-italic fs-5">"{{ testimonial.quote }}"</p>
              <h6 class="mt-3">- {{ testimonial.author }}</h6>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </section>

    <!-- Reservation & Visit Us Section -->
    <section class="reservation-visit-section py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 text-center text-lg-start mb-4 mb-lg-0">
            <h2 class="section-title-v2 mb-3">Dine With Us</h2>
            <p class="text-secondary">
              We invite you to experience the unique flavors and warm hospitality of our restaurant.
              Book your table today for an unforgettable culinary adventure.
            </p>
            <el-button type="success" size="large" @click="handleBooking" class="mt-3" icon="el-icon-tableware">
              Book Your Table
            </el-button>
          </div>
          <div class="col-lg-5 offset-lg-1">
            <h4 class="mb-3">Contact & Hours</h4>
            <p class="text-secondary mb-1">
              <i class="el-icon-location-outline me-2"></i>123 Gourmet Street, Flavor Town, FT 98765
            </p>
            <p class="text-secondary mb-1">
              <i class="el-icon-phone-outline me-2"></i>(555) 123-4567
            </p>
            <p class="text-secondary mb-3">
              <i class="el-icon-message me-2"></i>reservations@gourmetnook.com
            </p>
            <h5 class="mt-3">Opening Hours:</h5>
            <ul class="list-unstyled text-secondary">
              <li>Mon - Fri: 12:00 PM - 10:00 PM</li>
              <li>Sat - Sun: 11:00 AM - 11:00 PM</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter();

const activeMenuTab = ref('appetizers');

const menuCategories = ref([
  {
    label: 'Appetizers',
    name: 'appetizers',
    items: [
      { id: 'a1', name: 'Bruschetta Classica', description: 'Grilled bread rubbed with garlic and topped with fresh tomatoes, basil, and olive oil.', price: '$12', image: 'https://i.pinimg.com/736x/07/10/55/071055249e27852a2e9341ed25fe239d.jpg' },
      { id: 'a2', name: 'Crispy Calamari', description: 'Lightly battered and fried calamari served with a tangy marinara sauce.', price: '$15', image: 'https://i.pinimg.com/736x/d5/8c/96/d58c96a6d68d9a6b36e3f628905f8a82.jpg' },
    ],
  },
  {
    label: 'Main Courses',
    name: 'maincourses',
    items: [
      { id: 'm1', name: 'Filet Mignon', description: '8oz center-cut filet, cooked to perfection, served with potato gratin and seasonal vegetables.', price: '$38', image: 'https://i.pinimg.com/736x/ce/c9/7a/cec97a19548107bf75fc46c0713e2f95.jpg' },
      { id: 'm2', name: 'Seafood Risotto', description: 'Creamy Arborio rice with a medley of fresh seafood, white wine, and Parmesan.', price: '$28', image: 'https://i.pinimg.com/736x/e5/09/10/e5091042ec2f99e253f25858f6dad426.jpg' },
      { id: 'm3', name: 'Vegan Lentil Shepherd\'s Pie', description: 'Hearty lentils and vegetables topped with a creamy sweet potato mash.', price: '$22', image: 'https://i.pinimg.com/736x/54/a9/c5/54a9c52afb130fd0d06df53dd20539e0.jpg' },
    ],
  },
  {
    label: 'Desserts',
    name: 'desserts',
    items: [
      { id: 'd1', name: 'Tiramisu', description: 'Classic Italian dessert with ladyfingers, espresso, mascarpone cream, and cocoa.', price: '$10', image: 'https://i.pinimg.com/736x/cd/96/85/cd9685de7adb0a8a5b518c26c796a13d.jpg' },
      { id: 'd2', name: 'New York Cheesecake', description: 'Rich and creamy cheesecake with a graham cracker crust, served with berry compote.', price: '$11', image: 'https://i.pinimg.com/736x/14/82/cf/1482cf13ba8f55eb67ef73f973c3d089.jpg' },
    ],
  },
]);

const testimonials = ref([
  { id: 1, quote: 'Absolutely fantastic food and impeccable service. A truly memorable evening!', author: 'Sarah L.' },
  { id: 2, quote: 'The ambiance is perfect for a romantic dinner. We loved every dish we tried.', author: 'John & Emily B.' },
  { id: 3, quote: 'Best [Your Specialty Dish] in town! I keep coming back for more.', author: 'Michael P.' },
]);

const scrollToMenu = () => {
  const menuSection = document.getElementById('menu-highlights');
  if (menuSection) {
    menuSection.scrollIntoView({ behavior: 'smooth' });
  }
};

const navigateToGallery = () => {
  router.push('/gallery'); 
};

const handleBooking = () => {
  ElMessage.success('Thank you! Your booking request has been sent. We will contact you shortly.');
 
};

</script>

<style scoped>
.restaurant-page-v2 {
  font-family: 'Georgia', serif; /* A more classic font for a restaurant */
  color: #4A4A4A; /* Dark gray for base text */
}

/* Hero Section */
.hero-section-v2 {
  min-height: 70vh;
  background-image: url('https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1920&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  position: relative;
}

.overlay-v2 {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.55);
}

.hero-section-v2 h1 {
  font-size: calc(2.5rem + 1.5vw);
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.6);
}
.hero-section-v2 .lead {
  font-size: calc(1rem + 0.3vw);
  font-weight: 300;
}

.animated-text {
  animation: fadeInDown 1s ease-out;
}
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.el-button--warning {
  background-color: #e67e22;
  border-color: #e67e22;
  color: white;
}
.el-button--warning:hover {
  background-color: #d35400;
  border-color: #d35400;
}


/* Common Section Title */
.section-title-v2 {
  font-family: 'Playfair Display', serif; /* Elegant serif for titles */
  font-weight: 600;
  color: #2c3e50; /* Dark blue/gray */
  font-size: 2.5rem;
}

/* Philosophy Section */
.philosophy-section .philosophy-image {
  border: 5px solid #fff;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

/* Menu Highlights */
.bg-light-v2 {
  background-color: #f9f9f9;
}
.menu-tabs {
  border-radius: 8px;
}
:deep(.el-tabs__item.is-active) {
  color: #e67e22;
}
:deep(.el-tabs__item:hover) {
  color: #d35400;
}
:deep(.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active) {
  border-bottom-color: #e67e22;
}

.menu-item-card {
  border: none;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.menu-item-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 28px rgba(0,0,0,0.12);
}
.menu-item-image {
  width: 100%;
  height: 220px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.menu-item-name {
  font-family: 'Playfair Display', serif;
  color: #333;
  font-size: 1.3rem;
}
.menu-item-description {
  font-size: 0.85rem;
  min-height: 50px; /* For consistent card height */
}
.menu-item-price {
  color: #e67e22;
  font-size: 1.1rem;
}

/* Ambiance Section */
.ambiance-img {
    height: 300px; /* Fixed height for uniform images */
    width: 100%;
    object-fit: cover;
    transition: transform 0.3s ease, filter 0.3s ease;
}
.ambiance-img:hover {
    transform: scale(1.05);
    filter: brightness(1.1);
}


/* Testimonials Section */
.testimonial-carousel {
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
}
.testimonial-content {
  color: #555;
}
.testimonial-content p {
  max-width: 80%;
}
:deep(.el-carousel__arrow) {
  background-color: rgba(0,0,0,0.4);
  color: white;
}
:deep(.el-carousel__arrow:hover) {
  background-color: rgba(0,0,0,0.6);
}

/* Reservation & Visit Us Section */
.reservation-visit-section {
  background: linear-gradient(to right, #fafafa, #f0f0f0);
}
.reservation-visit-section .el-button--success {
  background-color: #27ae60;
  border-color: #27ae60;
}
.reservation-visit-section .el-button--success:hover {
  background-color: #229954;
  border-color: #229954;
}
.reservation-visit-section .list-unstyled i {
  color: #e67e22; /* Icon color */
}


@media (max-width: 991px) {
  .section-title-v2 {
    font-size: 2rem;
    text-align: center;
  }
  .philosophy-section .col-lg-7,
  .reservation-visit-section .col-lg-5 {
    text-align: center;
  }
}
@media (max-width: 768px) {
  .hero-section-v2 {
    min-height: 50vh;
  }
   .menu-item-image {
    height: 180px;
  }
  .ambiance-img {
    height: 200px;
    margin-bottom: 1rem; 
  }
  :deep(.el-tabs__nav) {
    float: none;
    text-align: center;
  }
  :deep(.el-tabs__item) {
    padding: 0 10px; 
  }
}
</style>