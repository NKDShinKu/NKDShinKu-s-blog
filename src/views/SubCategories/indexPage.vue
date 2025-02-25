<script setup>
import CardPage from '../Home/components/CardPage.vue'
</script>
<template>
  <div class="index-page">
    <CardPage class="content" v-for="i in 10" :key="i"></CardPage>
  </div>

</template>
<style scoped lang="scss">
.index-page{
  width: 85%;
  margin: 25px auto 0;
  .content {
    margin-bottom: 20px;
  }
}
</style>
