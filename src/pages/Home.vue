<template>
  <div class="home">
    <div class="container py-4">
      <!-- Thêm class mb-5 (margin-bottom) của Bootstrap để tạo khoảng cách với section tiếp theo -->
      <el-card class="card-check mb-5" shadow="always">
        <el-form :model="formInline" @submit.prevent="onSubmit">
          <div class="row g-3 align-items-end">
            <div class="col-12 col-md-6 col-lg">
              <el-form-item label="Check in" class="w-100 mb-0">
                <el-date-picker
                  v-model="formInline.datein"
                  type="date"
                  placeholder="check in..."
                  clearable
                  style="width: 100%;"
                />
              </el-form-item>
            </div>

            <div class="col-12 col-md-6 col-lg">
              <el-form-item label="Check out" class="w-100 mb-0">
                <el-date-picker
                  v-model="formInline.dateout"
                  type="date"
                  placeholder="check out..."
                  clearable
                  style="width: 100%;"
                />
              </el-form-item>
            </div>

            <div class="col-12 col-sm-6 col-md-4 col-lg">
              <el-form-item label="Adults" class="w-100 mb-0">
                <el-select
                  v-model="formInline.adults"
                  placeholder="Adults"
                  clearable
                  style="width: 100%;"
                >
                  <el-option label="1" value="1" />
                  <el-option label="2" value="2" />
                  <el-option label="3" value="3" />
                  <el-option label="4" value="4" />
                  <el-option label="5" value="5" />
                  <el-option label="6" value="6" />
                </el-select>
              </el-form-item>
            </div>

            <div class="col-12 col-sm-6 col-md-4 col-lg">
              <el-form-item label="Child" class="w-100 mb-0">
                <el-select
                  v-model="formInline.child"
                  placeholder="Child"
                  clearable
                  style="width: 100%;"
                >
                  <el-option label="1" value="1" />
                  <el-option label="2" value="2" />
                  <el-option label="3" value="3" />
                  <el-option label="4" value="4" />
                  <el-option label="5" value="5" />
                </el-select>
              </el-form-item>
            </div>

            <div class="col-12 col-md-4 col-lg-auto">
              <el-form-item class="w-100 mb-0">
                <el-button @click="onSubmit" class="w-100 custom-button">
                  CHECK AVAILABILITY
                </el-button>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </el-card>

      <!-- Section cho About -->
      <section class="about-section mb-5">
        <AboutSection />
      </section>

      <!-- Section cho Rooms -->
      <section class="rooms-section mb-5">
        <RoomsSection />
      </section>
      <section class="contact-section mb-5">
        <Contact />
      </section>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import AboutSection from "../components/AboutSection.vue"; 
import RoomsSection from "../components/RoomsSection.vue";  
import Contact from './Contact.vue';

const formInline = reactive({
  datein: '',
  dateout: '',
  adults: '',
  child: '',
})

const onSubmit = () => {
  console.log('submit!', formInline)
  // Logic xử lý submit form
}
</script>

<style scoped>
.custom-button {
  background-color: #2c3e50;
  color: white;
  border-color: #2c3e50; 
 
}

.custom-button:hover,
.custom-button:focus {
  background-color: #d9534f;
  border-color: #d9534f; 
  color: white;
}


</style>