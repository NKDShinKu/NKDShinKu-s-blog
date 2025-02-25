<script setup>
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutNav from './components/LayoutNav.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutTitle from './components/LayoutTitle.vue'
// import LayoutDetail from './components/LayoutDetail.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route)
</script>
<template>
    <div id="building">
    </div>
    <LayoutHeader></LayoutHeader>
    <LayoutTitle></LayoutTitle>
    <div class="wave">
        <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
            <defs>
                <path id="gentle-wave"
                    d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g class="parallax">
                <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(250,250,250,0.7)" />
                <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(250,250,250,0.5)" />
                <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(250,250,250,0.3)" />
                <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
            </g>
        </svg>
    </div>
    <div class="main">
      <div class="layer">
        <div class="content">
          <router-view v-slot="{ Component }">
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
          </router-view>

        </div>
        <div v-if="route.name !== 'details'" class="nav" ref="myElement">
          <!-- :class="{fixed: navPosition.top < 60}" -->
          <LayoutNav></LayoutNav>
          <!-- <layout-detail></layout-detail> -->
        </div>
      </div>
    </div>
    <LayoutFooter></LayoutFooter>
</template>
<style scoped lang="scss">
#building{
  background:url("../../assets/images/home-background.png");
  filter: brightness(90%);
  width:100%;
  height:100%;
  position:fixed;
  background-size:cover;
  z-index: -10;
}
.wave {
  .waves {
      position: relative;
      width: 100%;
      height: 15vh;
      margin-bottom: -7px; /*Fix for safari gap*/
      min-height: 100px;
      max-height: 150px;
  }
  /* Animation */
  .parallax > use {
      animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
  }
  .parallax > use:nth-child(1) {
      animation-delay: -2s;
      animation-duration: 7s;
  }
  .parallax > use:nth-child(2) {
      animation-delay: -3s;
      animation-duration: 10s;
  }
  .parallax > use:nth-child(3) {
      animation-delay: -4s;
      animation-duration: 13s;
  }
  .parallax > use:nth-child(4) {
      animation-delay: -5s;
      animation-duration: 20s;
  }
  @keyframes move-forever {
    0% {
        transform: translate3d(-90px, 0, 0);
    }
    100% {
        transform: translate3d(85px, 0, 0);
    }
  }
  /*Shrinking for mobile*/
  // @media (max-width: 768px) {
  //   .waves {
  //       height: 40px;
  //       min-height: 40px;
  //   }
  //   .content {
  //       height: 30vh;
  //   }
  //   h1 {
  //       font-size: 24px;
  //   }
  // }
}

.main {
  // height: 100vh;
  width: 100%;
  background-color: var(--theme-background-color-main);
  .layer {
    width: 75%;
    // height: 1800px;
    margin: 0 auto;
    // background-color: var(--theme-background-color-layer);
    display: flex;
    justify-content: space-around;
    border-radius: 10px;
    .content {
      background-color: var(--theme-background-color-content);
      box-shadow: 0 0 10px var(--theme-box-shadow);
      min-width: 75%;
      max-width: 100%;
      border-radius: 15px;
      margin: 0 15px 20px 25px;
      // height: 1800px;
    }
    .nav {
      // background-color: rgb(255, 254, 240);
      width: 240px;
      border-radius: 15px;
      margin: 0 25px 20px 15px;
      // position: relative;
    }
  }
}
</style>
