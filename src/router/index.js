// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Rooms from '../pages/Rooms.vue'
import Services from '../pages/Services.vue'
import Gallery from '../pages/Gallery.vue'
import Restaurant from '../pages/Restaurant.vue'
import Blog from '../pages/Blog.vue'
import Contact from '../pages/Contact.vue'



const routes = [
   { path: '/', name: 'Home', component: Home },
   { path: '/home', redirect: '/'  }, // bất kỳ ai vào /home sẽ tự động chuyển về /
   { path: '/:pathMatch(.*)*', redirect: '/' },// hoặc '/home' tùy bạn chọn là path chính

  { path: '/about', name: 'About', component: About },
  { path: '/rooms', name: 'Rooms', component: Rooms },
  { path: '/services', name: 'Services', component: Services },
  { path: '/gallery', name: 'Gallery', component: Gallery },
  { path: '/restaurant', name: 'Restaurant', component: Restaurant },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/blog', name: 'Blog', component: Blog },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }  // <-- cuộn lên đầu trang mỗi khi chuyển route
  }
})
let firstLoad = true
router.beforeEach((to, from, next) => {
  if (firstLoad && to.path !== '/') {
    firstLoad = false
    next('/') // hoặc '/home' tùy bạn
  } else {
    firstLoad = false
    next()
  }
})
export default router
