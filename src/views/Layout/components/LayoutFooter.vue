<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const currentTime = ref(''); // 用来存储当前时间

// 获取当前时间并格式化
function formatTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份是从0开始的，所以加1
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 更新当前时间
const updateTime = () => {
  currentTime.value = formatTime();
};

// 页面加载时开始更新时间
onMounted(() => {
  updateTime(); // 初始更新时间
  setInterval(updateTime, 1000); // 每秒更新时间
});

// 页面卸载时清除定时器
onBeforeUnmount(() => {
  clearInterval(updateTime); // 清除定时器
});
</script>
<template>
  <div class="footer">
    <div class="content">
      <p class="time">当前时间 {{ currentTime }}</p>
      <p class="word">0721字</p>
    </div>
  </div>
</template>
<style scoped lang="scss">
.footer {
  color: rgb(153, 153, 153);
  height: 150px;
  width: 100%;
  background-color: rgba(250, 250, 250, 0.8);
  padding: 20px 0 0;
  border-radius: 10px;
  .content {
    width: 75%;
    height: 100%;
    margin: 0 auto;
    padding: 20px 0;
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
