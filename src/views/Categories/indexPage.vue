<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import CategoryCard from "./components/CategoryCard.vue";

const data = [
  { subName: 'JavaScript', subDesc: 'JavaScript 是一种编程语言，它被广泛应用于各种应用程序中，如Web浏览器、移动应用程序、服务器端应用程序等。' },
  { subName: 'Java', subDesc: 'Java 是一种面向对象的编程语言，它被广泛应用于各种应用程序中，如Web应用程序、移动应用程序、服务器端应用程序等。' },
  { subName: 'Python', subDesc: 'Python 是一种解释型、动态类型的编程语言，它被广泛应用于各种应用程序中，如Web应用程序、移动应用程序、服务器端应用程序等。' },
  { subName: 'C++', subDesc: 'C++ 是一种低级编程语言，它被广泛应用于各种应用程序中，如游戏开发、 simulations、embedded systems等。' },
  { subName: 'C#', subDesc: 'C# 是一种面向对象的编程语言，它被广泛应用于各种应用程序中，如Web应用程序、移动应用程序、服务器端应用程序等。' },
  { subName: 'Ruby', subDesc: 'Ruby 是一种动态类型的编程语言，它被广泛应用于各种应用程序中，如Web应用程序、移动应用程序、服务器端应用程序等。' },
  { subName: 'Go', subDesc: 'Go 是一种静态类型的编程语言，它被广泛应用于各种应用程序中，如Web应用程序、移动应用程序、服务器端应用程序等。' },
  { subName: 'Swift', subDesc: 'Swift 是一种静态类型的编程语言，它被广泛应用于各种应用程序中，如Web应用程序、移动应用程序、服务器端应用程序等。' },
  { subName: 'PHP', subDesc: 'PHP 是一种动态类型的编程语言，它被广泛应用于各种应用程序中，如Web应用程序、移动应用程序、服务器端应用程序等。' },
  { subName: 'Rust', subDesc: 'Rust 是一种静态类型的编程语言，它被广泛应用于各种应用程序中，如Web应用程序、移动应用程序、服务器端应用程序等。' },
]

onMounted(() => {
  // 获取所有的 CategoryCard 元素
  // const cards = document.querySelectorAll('.category-card');

  // 设置初始位置和动画
  gsap.from('.category-card', {
    y: -90,
    scale: 0.5,
    opacity: 0,
    ease: "back.in",
    stagger: 0.2
  });
});
</script>

<template>
  <main class="category-container">
    <CategoryCard v-for="i in data" :key="i.subName" :data="i" class="category-card"></CategoryCard>
    <i></i><i></i><i></i><i></i>
  </main>
</template>

<style scoped lang="scss">
.category-container {
  margin: 25px 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  i {
    width: 200px;
    margin: 10px 5px;
  }
}
</style>
