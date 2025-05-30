<template>
  <div class="blog-page">
    <!-- Hero Section cho Trang Blog -->
    <section class="blog-hero text-center">
      <div class="container">
        <h1 class="page-title">Our Latest News & Articles</h1>
        <p class="lead text-muted page-subtitle">
          Stay updated with the latest happenings, tips, and stories from our team.
        </p>
      </div>
    </section>

    <!-- Nội dung chính của trang Blog -->
    <section class="blog-content-section">
      <div class="container">
        <div class="row">
          <!-- Cột chính cho các bài viết -->
          <div class="col-lg-8">
            <div v-if="posts.length === 0" class="text-center py-5">
              <p class="h5">No blog posts available at the moment. Please check back later!</p>
            </div>
            <article v-for="post in posts" :key="post.id" class="blog-post-item mb-5">
              <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <div class="row g-0">
                  <div class="col-md-5">
                    <img :src="post.imageUrl" :alt="post.title" class="blog-post-image img-fluid" />
                  </div>
                  <div class="col-md-7 d-flex flex-column">
                    <div class="card-body-content flex-grow-1">
                      <div class="post-meta mb-2">
                        <span v-if="post.category" class="post-category-tag me-3">
                          {{ post.category }}
                        </span>
                        <span class="post-date">{{ post.date }}</span>
                      </div>
                      <h3 class="post-title h4">
                        <a href="#" @click.prevent="viewPost(post.slug)" class="text-decoration-none stretched-link blog-title-link">{{ post.title }}</a>
                      </h3>
                      <p class="post-excerpt">
                        {{ post.excerpt }}
                      </p>
                    </div>
                    <div class="card-footer-action bg-transparent">
                       <a href="#" @click.prevent="viewPost(post.slug)" class="btn btn-sm btn-brand-primary read-more-btn">Read More <i class="fas fa-arrow-right ms-1"></i></a>
                    </div>
                  </div>
                </div>
              </el-card>
            </article>
          </div>

          <!-- Sidebar -->
          <aside class="col-lg-4">
            <div class="sidebar-widget">
              <h4 class="widget-title h5">Search</h4>
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Search articles..." v-model="searchTerm" @keyup.enter="performSearch">
                <button class="btn btn-brand-primary" type="button" @click="performSearch"><i class="fas fa-search"></i></button>
              </div>
            </div>

            <div class="sidebar-widget">
              <h4 class="widget-title h5">Categories</h4>
              <ul class="list-unstyled widget-list">
                <li v-for="category in categories" :key="category.slug">
                  <a href="#" @click.prevent="filterByCategory(category.slug)" class="text-decoration-none category-link">
                    {{ category.name }} <span class="badge count-badge float-end">{{ category.count }}</span>
                  </a>
                </li>
              </ul>
            </div>

            <div class="sidebar-widget">
              <h4 class="widget-title h5">Recent Posts</h4>
              <ul class="list-unstyled widget-list">
                <li v-for="recentPost in recentPosts" :key="recentPost.id">
                  <a href="#" @click.prevent="viewPost(recentPost.slug)" class="text-decoration-none recent-post-link">{{ recentPost.title }}</a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Dữ liệu blog mẫu
const allPosts = ref([
  {
    id: 1, slug: 'exploring-modern-architecture', title: 'Exploring the Wonders of Modern Architecture in City X',
    imageUrl: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=874&q=80',
    date: 'October 26, 2023', category: 'Architecture',
    excerpt: 'Discover the breathtaking modern architectural marvels that City X has to offer. A journey through design and innovation...'
  },
  {
    id: 2, slug: 'gourmet-dining-experience', title: 'A Culinary Journey: The Best Gourmet Dining Spots',
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    date: 'October 22, 2023', category: 'Food & Dining',
    excerpt: 'Embark on a delightful culinary adventure as we explore the finest gourmet restaurants renowned for their exquisite dishes and ambiance.'
  },
  {
    id: 3, slug: 'wellness-retreats-for-relaxation', title: 'Top Wellness Retreats for Ultimate Relaxation',
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    date: 'October 18, 2023', category: 'Wellness',
    excerpt: 'Unwind and recharge at these top-rated wellness retreats, offering a perfect escape for peace of mind, body, and soul.'
  },
  {
    id: 4, slug: 'local-culture-and-festivals', title: 'Immersing in Local Culture: A Guide to Festivals',
    imageUrl: 'https://i.pinimg.com/736x/38/88/b4/3888b4278a0c94d56e88e6326dcb779e.jpg',
    date: 'October 15, 2023', category: 'Culture',
    excerpt: 'Experience the heart and soul of different cultures by participating in their most colorful and vibrant local festivals and traditions.'
  }
]);

const posts = ref([...allPosts.value]);
const searchTerm = ref('');

const categories = computed(() => {
  const cats = {};
  allPosts.value.forEach(post => {
    if (post.category) {
      if (cats[post.category]) {
        cats[post.category].count++;
      } else {
        cats[post.category] = { name: post.category, slug: post.category.toLowerCase().replace(/\s+/g, '-'), count: 1 };
      }
    }
  });
  return Object.values(cats);
});

const recentPosts = computed(() => {
  return [...allPosts.value].sort((a,b) => b.id - a.id).slice(0, 4);
});

const viewPost = (slug) => {
  alert(`Navigate to: /blog/${slug}. Please implement this route.`);
  // router.push(`/blog/${slug}`);
};

const performSearch = () => {
  if (!searchTerm.value.trim()) {
    posts.value = [...allPosts.value]; return;
  }
  const lowerSearchTerm = searchTerm.value.toLowerCase();
  posts.value = allPosts.value.filter(post =>
    post.title.toLowerCase().includes(lowerSearchTerm) ||
    post.excerpt.toLowerCase().includes(lowerSearchTerm)
  );
};

const filterByCategory = (categorySlug) => {
  posts.value = allPosts.value.filter(post => post.category && post.category.toLowerCase().replace(/\s+/g, '-') === categorySlug);
  searchTerm.value = '';
  const contentSection = document.querySelector('.blog-content-section');
  if (contentSection) {
    window.scrollTo({ top: contentSection.offsetTop - (document.querySelector('.header')?.offsetHeight || 80), behavior: 'smooth' });
  }
};

onMounted(() => { window.scrollTo(0, 0); });
</script>

<style scoped>
/* --- BIẾN MÀU VÀ FONT --- */
:root {
  --brand-primary-color: #E53935;  
  --brand-primary-hover-color: #D32F2F; 
  --brand-heading-color: #2c3e50;   
  --brand-text-color: #495057;        
  --brand-text-muted-color: #6c757d;  
  --brand-light-bg: #f8f9fa;          
  --brand-white-bg: #ffffff;        
  --brand-border-color: #e9ecef;     

  --font-family-heading: 'Georgia', serif; 
  --font-family-body: 'Open Sans', sans-serif; 
}

/* --- STYLE CHUNG CHO TRANG --- */
.blog-page {
  background-color: var(--brand-light-bg);
  font-family: var(--font-family-body);
  color: var(--brand-text-color);
}

/* --- HERO SECTION --- */
.blog-hero {
  background-color: var(--brand-white-bg);
  padding-top: 4rem;
  padding-bottom: 4rem;
  border-bottom: 1px solid var(--brand-border-color);
}
.page-title {
  font-family: var(--font-family-heading);
  font-size: 2.8rem;
  font-weight: 700;
  color: var(--brand-heading-color);
  margin-bottom: 0.75rem;
}
.page-subtitle {
  color: var(--brand-text-muted-color);
  font-size: 1.1rem;
  max-width: 650px;
  margin-left: auto;
  margin-right: auto;
}

/* --- CONTENT SECTION --- */
.blog-content-section {
  padding-top: 3.5rem;
  padding-bottom: 3.5rem;
}

/* --- CARD BÀI VIẾT --- */
.blog-post-item .el-card {
  border-radius: 8px;
  border: 1px solid var(--brand-border-color);
  background-color: var(--brand-white-bg);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}
.blog-post-item .el-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(44, 62, 80, 0.1) !important;
}

.blog-post-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 280px;
}
@media (max-width: 767.98px) {
  .blog-post-image {
    height: 230px;
    border-top-left-radius: calc(8px - 1px); 
    border-top-right-radius: calc(8px - 1px);
  }
}
@media (min-width: 768px) {
  .blog-post-image {
    border-top-left-radius: calc(8px - 1px);
    border-bottom-left-radius: calc(8px - 1px);
  }
}

.card-body-content {
  padding: 1.75rem;
  position: relative; 
}

.post-meta {
  margin-bottom: 0.6rem !important;
}
.post-category-tag { 
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--brand-primary-color);
  letter-spacing: 0.8px;
}
.post-date {
  font-size: 0.8rem;
  color: var(--brand-text-muted-color);
  text-transform: uppercase;
}

.post-title.h4 {
  font-family: var(--font-family-heading);
  font-size: 1.65rem;
  font-weight: 600;
  color: var(--brand-heading-color);
  margin-bottom: 0.75rem !important;
  line-height: 1.3;
}
.post-title a.blog-title-link:hover {
  color: var(--brand-primary-color);
}

.post-excerpt {
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--brand-text-color);
  margin-bottom: 1.5rem;
}

.card-footer-action {
  padding: 0 1.75rem 1.75rem 1.75rem !important;
}
.btn-brand-primary { /* Nút chung, giống "VIEW DETAIL" */
  background-color: var(--brand-primary-color) !important;
  border-color: var(--brand-primary-color) !important;
  color: #fff !important;
  font-family: var(--font-family-body);
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
  padding: 0.6rem 1.2rem;
  border-radius: 5px;
  letter-spacing: 0.5px;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}
.btn-brand-primary:hover {
  background-color: var(--brand-primary-hover-color) !important;
  border-color: var(--brand-primary-hover-color) !important;
}
.read-more-btn i {
  transition: transform 0.2s ease-in-out;
  font-size: 0.7rem;
}
.read-more-btn:hover i {
  transform: translateX(4px);
}

/* --- SIDEBAR --- */
.sidebar-widget {
  background-color: var(--brand-white-bg);
  padding: 1.75rem !important;
  border-radius: 8px;
  border: 1px solid var(--brand-border-color);
  margin-bottom: 2rem !important;
}
.widget-title.h5 {
  font-family: var(--font-family-heading);
  color: var(--brand-heading-color);
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem !important;
  padding-bottom: 0.75rem;
  position: relative;
  border-bottom: 1px solid var(--brand-border-color);
}
.widget-title.h5::after { 
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 50px;
  height: 2px;
  background-color: var(--brand-primary-color);
}

.sidebar-widget .form-control {
  font-family: var(--font-family-body);
  border-right: none;
  font-size: 0.9rem;
}
.sidebar-widget .form-control:focus {
  border-color: var(--brand-primary-color);
  box-shadow: 0 0 0 0.2rem rgba(229, 57, 53, 0.25); 
}
.sidebar-widget .input-group .btn-brand-primary {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.sidebar-widget .input-group .btn-brand-primary i {
    font-size: 0.9rem;
}

.widget-list {
  padding-left: 0;
}
.widget-list li {
  margin-bottom: 0.6rem !important;
}
.widget-list li a.category-link,
.widget-list li a.recent-post-link {
  color: var(--brand-text-color);
  transition: color 0.2s ease;
  display: block;
  padding: 0.2rem 0;
  font-size: 0.95rem;
}
.widget-list li a.category-link:hover,
.widget-list li a.recent-post-link:hover,
.widget-list li a.active {
  color: var(--brand-primary-color);
}
.count-badge.badge {
  font-size: 0.75rem;
  background-color: var(--brand-light-bg) !important;
  color: var(--brand-text-muted-color) !important;
  padding: 0.3em 0.6em;
  font-weight: 500;
  border-radius: 4px;
}
</style>