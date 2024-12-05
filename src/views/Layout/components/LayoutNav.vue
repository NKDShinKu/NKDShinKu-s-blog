<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from 'vue';

// 引入图片
import githubIcon from '../../../assets/icons/github.png';
import githubActiveIcon from '../../../assets/icons/github-active.png';
import cloudMusicIcon from '../../../assets/icons/cloud-music.png';
import cloudMusicActiveIcon from '../../../assets/icons/cloud-music-active.png';
import aboutIcon from '../../../assets/icons/about.svg'
import categoriesIcon from '../../../assets/icons/categories.svg'
import timelineIcon from '../../../assets/icons/timeline.svg'

// 定义状态来跟踪鼠标是否悬停在图标上
const isHoveredGithub = ref(false);
const isHoveredMusic = ref(false);

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


// 当前时间
const currentTime = ref(new Date());
// 关键时间点
const keyTimes = [
  { label: "起床", time: "07:30:00" },
  { label: "午饭", time: "12:00:00" },
  { label: "晚饭", time: "18:00:00" },
  { label: "睡觉", time: "24:00:00" },
];
// 获取下一个关键时间点和其对应的标签
const nextKeyTime = computed(() => {
  const now = currentTime.value;
  for (const key of keyTimes) {
    const [hours, minutes, seconds] = key.time.split(':').map(Number);
    const targetTime = new Date(now);
    targetTime.setHours(hours, minutes, seconds, 0);

    // 如果当前时间小于目标时间，就返回这个目标时间
    if (now < targetTime) {
      return { label: key.label, time: targetTime };
    }
  }

  // 如果所有关键时间都已经过去，返回第一个目标时间（第二天）
  const [hours, minutes, seconds] = keyTimes[0].time.split(':').map(Number);
  const targetTime = new Date(now);
  targetTime.setDate(now.getDate() + 1); // 第二天
  targetTime.setHours(hours, minutes, seconds, 0);
  return { label: keyTimes[0].label, time: targetTime };
});

// 获取倒计时的剩余时间
const countdown = computed(() => {
  const nextTime = nextKeyTime.value.time;
  const remainingTime = nextTime - currentTime.value;

  const hoursLeft = Math.floor(remainingTime / (1000 * 60 * 60));
  const minutesLeft = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const secondsLeft = Math.floor((remainingTime % (1000 * 60)) / 1000);

  return `${hoursLeft.toString().padStart(2, '0')}:${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;
});

// 获取下一个关键点的标签
const nextKeyLabel = computed(() => nextKeyTime.value.label);

// 每秒更新当前时间
const updateTime = () => {
  currentTime.value = new Date();
};

onMounted(() => {
  const interval = setInterval(updateTime, 1000);
  onBeforeUnmount(() => clearInterval(interval)); // 清理定时器
});
</script>

<template>
  <div class="userBox">
    <!-- 用户信息部分 -->
    <div class="author">
      <img src="../../../assets/images/avatar.jpg" alt="avatar">
      <h3>NKDShinKu</h3>
      <p>祈祷明天代码又是没有bug的一天</p>
    </div>

    <!-- 导航部分 -->
    <div class="state">
      <RouterLink to="/" class="item text">
        <!-- <span class="layer">7</span> -->
        <img :src="timelineIcon" alt="">
        <span class="name">文章</span>
      </RouterLink>
      <RouterLink to="/" class="item categories">
        <!-- <span class="layer">2</span> -->
        <img :src="categoriesIcon" alt="">
        <span class="name">分类</span>
      </RouterLink>
      <RouterLink to="/" class="item about">
        <!-- <span class="layer">→</span> -->
        <img :src="aboutIcon" alt="">
        <span class="name">关于</span>
      </RouterLink>
    </div>

    <!-- 社交链接部分 -->
    <div class="social">
      <a href="https://github.com/NKDShinKu" target="_blank" class="item github-icon" @mouseover="isHoveredGithub = true" @mouseleave="isHoveredGithub = false">
        <img :src="isHoveredGithub ? githubActiveIcon : githubIcon" alt="GitHub" />
      </a>
      <a href="https://music.163.com/#/user/home?id=4997682617" target="_blank" class="item cloudmusic-icon" @mouseover="isHoveredMusic = true" @mouseleave="isHoveredMusic = false">
        <img :src="isHoveredMusic ? cloudMusicActiveIcon : cloudMusicIcon" alt="Cloud Music" />
      </a>
    </div>

    <!-- 标签云部分 -->
    <div class="tag-cloud">
      <RouterLink to="/" class="title">标签云</RouterLink>
      <div class="content">
        <a v-for="tag in tags" target="_blank" :key="tag.text" :href="tag.href" class="tag" :style="{ backgroundColor: tag.color }">
          {{ tag.text }}
        </a>
      </div>
    </div>

    <!-- 倒计时部分 -->
     <div class="countdown">
      <p class="name">距离{{ nextKeyLabel }}倒计时</p>
      <p class="time">{{ countdown }}</p>
     </div>
  </div>
</template>

<style scoped lang="scss">
.userBox {
  border-radius: 10px;
  // height: 90vh;
  position: sticky;
  top: 50px;
  // background-color: rgb(255, 254, 240);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 20px;
}

.author {
  width: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  img {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    margin-bottom: 15px;
    transition: transform 0.5s ease;
  }
  img:hover {
    transform: rotate(1turn);
  }
  h3 {
    color: rgb(119, 119, 119);
    font-size: 21px;
    margin-bottom: 12px;
  }
  p {
    text-align: center;
    font-size: 13px;
    color: rgb(102, 102, 102);
  }
}

.state {
  display: flex;
  width: 160px;
  justify-content: space-around;
  margin-top: 20px;
  .item {
    color: rgb(119, 119, 119);
    font-size: 13px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.3s ease, width 0.3s ease, height 0.3s ease;
    img {
      height: 21px;
      width: 21px;
      transition: transform 0.3s ease, width 0.3s ease, height 0.3s ease;
      filter: drop-shadow(blue);
    }
  }
  .categories {
    height: 100%;
    border-right: 2px solid #cccccc;
  }
  .text {
    height: 100%;
    border-right: 2px solid #cccccc;
  }

  img:hover {
    transform: rotate(1turn);
  }

}

.social {
  display: flex;
  margin-top: 20px;
  .item {
    margin: 0 10px;
    display: inline-block;
    img {
      width: 20px;
      height: 20px;
      border-radius: 20%;
      transition: transform 0.3s ease, width 0.3s ease, height 0.3s ease;
    }

    &:hover img {
      transform: scale(1.3); /* 放大效果 */
    }
  }
}

/* 标签云样式 */
.tag-cloud {
  margin-top: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    font-size: 20px;
    color: rgba(119, 119, 119);
    margin-bottom: 10px;
  }
  .title:hover {
    color: rgb(198, 198, 198);
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .tag {
      margin: 5px 3px;
      padding: 5px 8px;
      font-size: 12px;
      border-radius: 20px;
      transition: transform 0.3s ease;
      // text-decoration: none; /* 去掉默认的链接下划线 */
      color: rgba(119, 119, 119); /* 文字颜色 */
    }
    .tag:hover {
      transform: scale(1.2);
      cursor: pointer;
    }
  }
}

.countdown {
  color: rgba(119, 119, 119);
  text-align: center;
  margin-top: 20px;
  .name {
    font-size: 16px;
  }
  .time {
    font-size: 28px;
  }
}
</style>
