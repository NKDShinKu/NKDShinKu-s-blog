<script setup>
import gsap from 'gsap'
import { onMounted } from 'vue'
import ciallo from '@/assets/audio/ciallo.aac'

onMounted(() => {
  const texts = document.querySelectorAll('.text')

  texts.forEach(text => {
    // 随机生成每个文本的动画延迟，使其无序
    const randomDelay = Math.random() * 5
    const randomColor = `hsl(${Math.random() * 60}, 100%, 80%)`;
    const randomFontSize = `${Math.random() * 10 + 20}px`;

    // 使用 timeline 来连接每个动画
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });
    tl.fromTo(text,
      {
        x: '100%',
        color: randomColor, // 随机颜色
        fontSize: randomFontSize // 随机字体大小
      },
      {
        x: '-20%',
        duration: 5,   // 动画持续时间
        delay: randomDelay,  // 使用随机的延迟时间
        ease: "linear",
        color: randomColor, // 动画过程中改变颜色
        fontSize: randomFontSize // 动画过程中改变字体大小
      }
    );
  })

  // 点击生成 "click" 文本并逐渐消失
  const content = document.querySelector('.content');

  content.addEventListener('click', (event) => {
    const contentRect = content.getBoundingClientRect(); // 获取 .content 的位置和尺寸
    const clickText = document.createElement('p');
    clickText.textContent = "Ciallo～(∠・ω< )⌒☆";
    // Ciallo～(∠・ω< )⌒☆
    clickText.style.position = 'absolute';

    // 计算点击位置相对于 .content 的坐标
    const xPos = event.clientX - contentRect.left;
    const yPos = event.clientY - contentRect.top;

    clickText.style.left = `${xPos}px`;
    clickText.style.top = `${yPos}px`;
    clickText.style.color = 'white';
    clickText.style.fontSize = '20px';
    clickText.style.pointerEvents = 'none'; // 防止点击影响动画

    content.appendChild(clickText);

    // 使用 gsap 动画让 "click" 在 0.5秒内消失
    gsap.to(clickText, {
      opacity: 0,
      duration: 0.5,
      y: -20,
      onComplete: () => {
        clickText.remove(); // 动画完成后移除元素
      }
    });

    // 每次点击都播放一个新的音效实例
    const audio = new Audio(ciallo); // 替换为你指定的音频文件路径
    audio.play();
  });
})
</script>

<template>
  <div class="box">
    <h1>内容丢失了哦！！！！！！！！！！！！！！！</h1>
    <div class="content">
      <p class="text" v-for="i in 20" :key="i">Ciallo～(∠・ω< )⌒☆</p>
      <!-- Ciallo～(∠・ω&lt; )⌒☆ -->
    </div>
  </div>
</template>

<style scoped>
.box {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.content {
  width: 60%;
  height: 80%;
  background-color: rgb(72, 70, 70);
  border-radius: 30px;
  overflow: hidden;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  position: relative; /* 为了让生成的文字可以定位 */
}

.text {
  transform: translateX(100%); /* 让文字一开始在右侧看不见 */
  white-space: nowrap;
  cursor: default
}
</style>
