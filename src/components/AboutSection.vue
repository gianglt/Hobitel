<template>
 <div class="about-section container my-5">
    <div class="row align-items-center">
      <!-- Cột trái: Hình ảnh -->
      <div class="col-lg-6 mb-4 mb-lg-0">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Hotel View"
          class="img-fluid rounded-3 shadow-sm"
        />
      </div>

      <!-- Cột phải: Nội dung Text -->
      <div class="col-lg-6 ps-lg-5">
        <!-- ps-lg-5: padding-start (bên trái) cho cột này trên màn hình lớn (lg) -->
        <p class="text-uppercase fw-bold about-us-label">ABOUT US</p>
        <h2 class="display-5 fw-semibold mb-3 main-heading">
          Hibtel is The Best Hotels to Celebrate Life
        </h2>
        <p class="text-muted mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint tempore
          autem, ex nulla atque laudantium magnam? Dicta ut, autem consectetur
          fuga itaque dolorum unde maiores aut illo voluptates ipsum omnis.
        </p>

        <!-- Khối "Best Rate Guarantee" -->
        <div class="row mb-4">
          <div class="col-md-6 mb-3 mb-md-0">
            <div class="d-flex align-items-start feature-item p-3 bg-light rounded-3">
              <!-- Thay thế bằng el-icon hoặc SVG icon của bạn -->
              <div class="feature-icon me-3">
                <el-icon :size="40" color="#D9534F"><Money /></el-icon>
              </div>
              <div>
                <h5 class="mb-1">Best Rate Guarantee</h5>
                <p class="small text-muted mb-0">
                  Dynamically facilitate best of breed benefits without.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="d-flex align-items-start feature-item p-3 bg-light rounded-3">
              <!-- Thay thế bằng el-icon hoặc SVG icon của bạn -->
              <div class="feature-icon me-3">
                 <el-icon :size="40" color="#D9534F"><PriceTag /></el-icon>
              </div>
              <div>
                <h5 class="mb-1">Best Rate Guarantee</h5>
                <p class="small text-muted mb-0">
                  Dynamically facilitate best of breed benefits without.
                </p>
              </div>
            </div>
          </div>
        </div>

        <el-button index="3" type="danger" size="large" round  @click="$router.push('/about')">ABOUT MORE</el-button>
        <!-- round: làm nút bo tròn hơn -->
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.about-us-label {
  color: #d9534f; /* Màu đỏ giống trong ảnh */
  font-size: 0.8rem;
  letter-spacing: 1px;
  margin-bottom: 0.5rem !important;
}

.main-heading {
  font-family: 'Georgia', serif; /* Font serif giống trong ảnh */
  color: #2c3e50; /* Màu đậm cho tiêu đề */
}

</style>