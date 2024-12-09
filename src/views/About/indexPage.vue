<script setup>
</script>
<template>
  <div class="about">
    <h2 class="title">这里是 NKDShinKu </h2>
    <div class="content">
      <p>* 本人，计算机专业的本科生，喜欢折腾新东西和感兴趣的东西，不限于计算机</p>
      <p>* 博客基于vue3，用了点GSAP写动画（折腾</p>
      <p>* 刚开始写博客很迷茫，因此借鉴了大佬<a href="https://www.kaitaku.xyz/"> ShokaX </a>的主题</p>
    </div>
    <h2 class="title">为什么做个人博客？</h2>
    <div class="content">
      <p>* 主要是为了学习，为了遇到更多问题，自己去解决</p>
      <p>* 为了记录个人的学习历程</p>
      <p>* 为了分享一些个人对技术的理解</p>
      <p>* 想要展示或一些个人爱好</p>
      <p>* 以热爱为动力</p>
    </div>
    <h2 class="title">联系我</h2>
    <div class="content">
      <p>* QQ：2010182879</p>
      <p>* 邮箱：<a href="mailto:2010182879@qq.com">2010182879@qq.com</a></p>
    </div>
  </div>
</template>
<style scoped>
.about{
  /* background-color: aqua; */
  width: 90%;
  margin: 20px auto;
  .title {
    border-bottom: 2px dashed;
    padding: 5px 0;
    color: var(--theme-color);
  }
  .content {
    font-size: 16px;
    margin-top: 20px;
    color: var(--theme-color);
    p {
      margin-bottom: 10px;
      a {
        color: var(--theme-color-mine);
      }
    }
  }
}
</style>
