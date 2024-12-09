<script setup>
import { onMounted, ref } from 'vue'

// 标签数据
const tags = ref([
  { text: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { text: "CSS", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { text: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { text: "Vue", href: "https://vuejs.org/" },
  { text: "React", href: "https://reactjs.org/" },
  { text: "Node.js", href: "https://nodejs.org/" },
  { text: "Python", href: "https://www.python.org/" },
  { text: "PHP", href: "https://www.php.net/" },
  { text: "Java", href: "https://www.java.com/" },
  { text: "Ruby", href: "https://www.ruby-lang.org/" },
  { text: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { text: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { text: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { text: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { text: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { text: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { text: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { text: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { text: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { text: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { text: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { text: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { text: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { text: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { text: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { text: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { text: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { text: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { text: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { text: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { text: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { text: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { text: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { text: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { text: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { text: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { text: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { text: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { text: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { text: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
]);
// 随机颜色生成函数，保持浅色
function getRandomColor() {
  const r = Math.floor(Math.random() * 256) + 150;
  const g = Math.floor(Math.random() * 256) + 150;
  const b = Math.floor(Math.random() * 256) + 150;
  return `rgb(${r}, ${g}, ${b})`;
}
// 标签云初始化
onMounted(() => {
  tags.value.forEach(tag => {
    tag.color = getRandomColor();
  });
});
</script>
<template>
  <div class="tagBox">
    <h2 class="title">一共{{ tags.length }}个标签</h2>
    <div class="content">
      <a v-for="tag in tags" target="_blank" :key="tag.text" :href="tag.href" class="tag" :style="{ backgroundColor: tag.color }">
        {{ tag.text }}
      </a>
    </div>
  </div>
</template>
<style scoped>
/* 标签云样式 */
.tagBox {
  width: 80%;
  margin: 30px auto ;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    font-size: 20px;
    color: rgba(119, 119, 119);
    margin-bottom: 30px;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .tag {
      margin: 8px 5px;
      padding: 5px 8px;
      font-size: 12px;
      border-radius: 20px;
      transition: transform 0.3s ease;
      /* // text-decoration: none; 去掉默认的链接下划线 */
      color: rgba(119, 119, 119); /* 文字颜色 */
    }
    .tag:hover {
      transform: scale(1.2);
      cursor: pointer;
    }
  }
}
</style>
