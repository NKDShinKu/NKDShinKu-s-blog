<script setup>
import bannerImg from '@/assets/images/banner1.jpg'

</script>
<template>
  <div class="banner">
    <div class="title">随机文章</div>
    <el-carousel indicator-position="none" height="auto">
      <el-carousel-item v-for="item in 4" :key="item">
        <RouterLink to="/"><img :src="bannerImg" alt=""></RouterLink>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<style scoped lang="scss">
.banner {
  width: 85%;
  margin: 0 auto;
  border-radius: 8px;
  margin-top: 20px;
  .title {
    text-align: center;
    font-size: 20px;
    margin-bottom: 10px;
  }
  .el-carousel {
    width: 100%;
    border-radius: 10px;
    .el-carousel__item {
      height: 400px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}

</style>
