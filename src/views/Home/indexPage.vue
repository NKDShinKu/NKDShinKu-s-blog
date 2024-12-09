<script setup>
import BannerPage from './components/BannerPage.vue'
import CardPage from './components/CardPage.vue'


</script>
<template>
  <BannerPage></BannerPage>
  <div class="text">
    <div class="title">文章列表</div>
    <CardPage class="content" v-for="i in 10" :key="i"></CardPage>
  </div>
</template>
<style scoped>
.text {
  width: 85%;
  margin: 25px auto 0;
  .title {
    margin-bottom: 10px;
    font-size: 20px;
    text-align: center;
  }
  .content {
    margin-bottom: 20px;
  }
}
</style>
