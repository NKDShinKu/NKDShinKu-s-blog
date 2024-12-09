<script setup>
</script>
<template>
  <div class="textBox">
    <h3 class="title">文章目录</h3>
    <p class="t1">标题1</p>
    <p class="t2">标题2</p>
    <p class="t2">标题2</p>
    <p class="t2">标题2</p>
    <p class="t1">标题1</p>
    <p class="t1">标题1</p>
    <p class="t1">标题1</p>
    <p class="t1">标题1</p>
    <p class="t1">标题1</p>
  </div>
</template>
<style scoped>
.textBox{
  min-height: 90vh;
  /* background-color: aqua; */
  border-radius: 10px;
  position: sticky;
  top: 50px;
  padding: 20px;
}
.title {
  background-color: var(--theme-bkcolor-mine);
  margin-bottom: 10px;
  font-size: 18px;
  text-align: center;
}
p {
  margin-bottom: 5px;
}
.t1 {
  font-size: 16px;
}
.t2 {
  text-indent: 12px;
  font-size: 16px;
}
</style>
