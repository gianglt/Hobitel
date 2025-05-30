<template>
  <el-footer class="bg-dark text-white" style="padding: 40px 0; height: 100%;">
    <div class="container">
      <el-row :gutter="20">
        
        <!-- Cột 1: Logo và mô tả -->
        <el-col :xs="24" :md="8">
          <h5 class="d-flex align-items-center">
            <img
              src="https://images.unsplash.com/photo-1588532242026-01df5951f6f5"
              alt="Logo Hobitel"
              width="30"
              height="30"
              class="me-2"
            />
            Hobitel
          </h5>
          <p>
            Chào mừng bạn đến với Hobitel – nơi mang đến kỳ nghỉ hoàn hảo với dịch vụ đẳng cấp và không gian sang trọng.
          </p>
        </el-col>

        <!-- Cột 2: Liên kết -->
        <el-col :xs="24" :md="8">
          <h5 class="mb-3">Links</h5>
          <ul class="list-unstyled">
            <p><a href="#" class="text-white text-decoration-none">Home</a></p>
            <p><a href="#" class="text-white text-decoration-none">About</a></p>
            <p><a href="#" class="text-white text-decoration-none">Rooms</a></p>
          </ul>
        </el-col>

        <!-- Cột 3: Liên hệ -->
        <el-col :xs="24" :md="8">
          <h5 class="mb-3">Contact</h5>
          <p><i class="bi bi-geo-alt-fill"></i> 123 Đường Biển, TP. Đà Nẵng</p>
          <p><i class="bi bi-telephone-fill"></i> 0123 456 789</p>
          <p><i class="bi bi-envelope-fill"></i> contact@hobitel.vn</p>
        </el-col>

      </el-row>
    </div>
  </el-footer>
</template>

<script setup>
// Không cần gì nếu bạn đã cài Element Plus
</script>

<style scoped>
.bg-dark {
  background-color: #212529;
}
.text-white {
  color: white;
}
.text-decoration-none {
  text-decoration: none;
}
.me-2 {
  margin-right: 0.5rem;
}
</style>
