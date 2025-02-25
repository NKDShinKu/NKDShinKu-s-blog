<script setup>

// 模拟数据：包括标题、描述
defineProps({
  data: {
    type: Object,
    default: () => {
    }
  }
})

</script>

<template>
<div class="category-card">
  <RouterLink :to="`/categories/${data.subName}`">
    <img src="@/assets/images/card.jpg" alt="">
    <h2 class="card-title">{{ data.subName }}</h2>
    <div class="card-desc">{{ data.subDesc }}</div>
  </RouterLink>
</div>

</template>
<style scoped lang="scss">
.category-card {
  height: 250px;
  width: 200px;
  margin: 10px 5px;
  background-color: var(--theme-box-bkcolor);
  backdrop-filter: blur(12px);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 5px var(--theme-box-shadow);

  transition: box-shadow 0.3s ease;

  a {
    width: 100%;
    height: 100%;
    display: block;
    img {
      width: 100%;
      height: 50%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    .card-title {
      font-size: 16px;
      color: var(--theme-color);
      text-align: center;
      padding: 2px 5px;
    }
    .card-desc {
      font-size: 14px;
      color: var(--theme-color-2);
      padding: 2px 12px;
      max-height: 90px;
      margin-bottom: 10px;
      overflow: hidden;
    }
  }
}
.category-card:hover {
  transform: translateY(-5px) translateZ(3px);
  box-shadow: 0 0 15px var(--theme-box-shadow);
  img{
    transform: scale(1.05);
  }
}
</style>
