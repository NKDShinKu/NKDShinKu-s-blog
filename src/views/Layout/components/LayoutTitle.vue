<script setup>
import { ref, onMounted, nextTick } from 'vue';

// 打字机需要的状态和数据
const words = ["千恋万花启动！", "Ciallo～(∠・ω< )⌒☆"]; // "原神启动！", "星穹铁道启动！", "绝区零启动！", "千恋万花启动！", "Ciallo～(∠・ω< )⌒☆"
const currentText = ref(""); // 当前显示的文本
const currentWordIndex = ref(0); // 当前单词的索引
const typingInterval = ref(300); // 打字和删除的速度

// 负责处理打字和删除的逻辑
const typeWord = () => {
  let word = words[currentWordIndex.value].split(""); // 获取当前单词的字符数组
  const typing = () => {
    if (word.length > 0) {
      currentText.value += word.shift(); // 逐个字符显示
      nextTick(() => {
        setTimeout(typing, typingInterval.value); // 继续打字
      });
    } else {
      setTimeout(deleteWord, 500); // 打字完成后等待500毫秒开始删除
    }
  };
  typing(); // 启动打字
};

const deleteWord = () => {
  let word = words[currentWordIndex.value].split(""); // 获取当前单词的字符数组
  const deleting = () => {
    if (word.length > 0) {
      word.pop(); // 删除最后一个字符
      currentText.value = word.join(""); // 更新文本显示
      nextTick(() => {
        setTimeout(deleting, typingInterval.value); // 继续删除
      });
    } else {
      // 如果当前单词删除完毕，准备显示下一个单词
      currentWordIndex.value = (currentWordIndex.value + 1) % words.length; // 循环显示单词
      setTimeout(typeWord, 500); // 等待500毫秒后开始打字下一个单词
    }
  };
  deleting(); // 启动删除
};

// 组件挂载时开始打字
onMounted(() => {
  typeWord();
});
</script>

<template>
  <div class="title">
    <h1>NKDShinKu</h1>
    <div class="textBox">
      <h3 class="text">{{ currentText }}</h3> <!-- 显示逐字打出的文本 -->
      <h3 class="caret">|</h3> <!-- 光标 -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.title {
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgb(252, 252, 252);
}

.textBox {
  display: flex;
}

.text {
  font-family: "Courier Monospace";
  font-size: 2em;
  color: rgba(252, 252, 252);
  margin-right: 5px;
}

.caret {
  font-family: "Courier Monospace";
  font-size: 2em;
  color: rgba(252, 252, 252);
  animation: blink 0.5s step-end infinite; /* 光标闪烁 */
}

/* 光标闪烁的动画 */
@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
