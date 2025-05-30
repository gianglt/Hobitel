<template>
  <el-carousel indicator-position="outside" class="carousel-banner">
    <el-carousel-item v-for="(image, index) in images" :key="index">
      <img :src="image" class="carousel-image" />
    </el-carousel-item>

  </el-carousel>
  
</template>
<script setup>
     const images = [
    'https://hibtel.webhotel.vn/assets/image/banner-1.jpg',
    'https://hibtel.webhotel.vn/assets/image/banner-2.jpg',
    'https://hibtel.webhotel.vn/assets/image/banner-3.jpg',
  
];
</script>
<style scoped>
.el-carousel {
  width: 100%;
  height: 100%;
  overflow: hidden;


}


.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* hoặc thử object-fit: contain nếu muốn thấy toàn bộ ảnh */
  display: block;
}
</style>