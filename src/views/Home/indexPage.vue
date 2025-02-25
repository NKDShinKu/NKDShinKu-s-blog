<script setup>
import BannerPage from './components/BannerPage.vue'
import CardPage from './components/CardPage.vue'

// 一组模拟数据
const data = [
  {
    title: '什么是vue?',
    desc: 'Vue 是一个框架，也是一个生态。其功能覆盖了大部分前端开发常见的需求。但 Web 世界是十分多样化的，不同的开发者在 Web 上构建的东西可能在形式和规模上会有很大的不同。考虑到这一点，Vue 的设计非常注重灵活性和“可以被逐步集成”这个特点。根据你的需求场景，你可以用不同的方式使用 Vue：',
    img: '/src/assets/images/card.jpg',
    time: '2024-01-01',
    words: '7211'
  },
  {
    title: 'JavaScript 深入理解',
    desc: 'JavaScript 是 Web 开发中的核心语言。理解它的内核、原理和最佳实践对开发者非常重要。本文将从闭包、原型链、事件循环等核心概念开始，逐步揭示 JavaScript 的工作机制。',
    img: '/src/assets/images/card.jpg',
    time: '2024-02-15',
    words: '8450'
  },
  {
    title: 'React 与 Vue 的对比',
    desc: 'React 和 Vue 都是前端开发中常见的框架，但它们的设计理念和使用方法有所不同。本文将深入探讨这两者的异同，帮助你在项目中做出正确的选择。',
    img: '/src/assets/images/card.jpg',
    time: '2024-03-01',
    words: '5120'
  },
  {
    title: '如何提升前端性能?',
    desc: '前端性能对用户体验至关重要。通过合理的资源优化、代码分割和懒加载等技术，前端性能可以得到显著提升。本文将介绍一些常见的性能优化方法。',
    img: '/src/assets/images/card.jpg',
    time: '2024-03-20',
    words: '3145'
  },
  {
    title: 'Web 安全：XSS 攻击与防护',
    desc: 'XSS（跨站脚本）攻击是 Web 开发中最常见的安全问题之一。本文将介绍 XSS 攻击的原理及防护措施，帮助开发者理解如何防止恶意代码注入。',
    img: '/src/assets/images/card.jpg',
    time: '2024-04-05',
    words: '2990'
  },
  {
    title: '前端工程化：从零开始',
    desc: '前端工程化是现代前端开发的重要组成部分。包括模块化、自动化构建工具、版本控制等多个方面。本文将为你介绍如何从零开始搭建前端工程化体系。',
    img: '/src/assets/images/card.jpg',
    time: '2024-04-25',
    words: '4185'
  },
  {
    title: 'Vue 3.x 的 Composition API',
    desc: 'Vue 3.x 引入了 Composition API，这是 Vue 框架的一次重大变革。本文将详细介绍 Composition API 的使用方法和优势，帮助你更好地理解 Vue 3.x 的新特性。',
    img: '/src/assets/images/card.jpg',
    time: '2024-05-10',
    words: '5312'
  },
  {
    title: '深入浅出 TypeScript',
    desc: 'TypeScript 是 JavaScript 的一个超集，提供了静态类型检查和丰富的开发体验。本文将通过简单的实例，帮助你快速掌握 TypeScript，并应用到日常开发中。',
    img: '/src/assets/images/card.jpg',
    time: '2024-06-01',
    words: '6125'
  },
  {
    title: '了解 WebAssembly (Wasm)',
    desc: 'WebAssembly 是一种新的 Web 技术，它允许我们在浏览器中运行接近原生速度的代码。本文将带你了解 WebAssembly 的基本概念、应用场景以及如何将其与 JavaScript 集成。',
    img: '/src/assets/images/card.jpg',
    time: '2024-06-15',
    words: '4723'
  },
  {
    title: 'Vuex 状态管理模式深入解析',
    desc: 'Vuex 是 Vue.js 官方的状态管理库。本文将深入分析 Vuex 的核心概念，如状态、getter、mutations、actions 等，并帮助你理解如何在 Vue 应用中有效使用 Vuex。',
    img: '/src/assets/images/card.jpg',
    time: '2024-07-01',
    words: '6840'
  }
];


</script>
<template>
  <BannerPage></BannerPage>
  <div class="text">
    <div class="title">文章列表</div>
    <CardPage class="content" v-for="i in data" :key="i.title" :data="i"></CardPage>
  </div>
</template>
<style scoped lang="scss">
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
