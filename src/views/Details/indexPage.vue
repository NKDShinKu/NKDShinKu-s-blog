<template>
  <div class="markdown-container">
    <!-- Markdown 内容 -->
    <div class="markdown-content" v-html="html" v-highlight></div>
    <!-- 目录 -->
    <div class="toc">
      <h2>目录</h2>
      <ul>
        <li
          v-for="item in toc"
          :key="item.anchor"
          :class="['toc-item', { active: activeAnchor === item.anchor }]"
          :style="{ marginLeft: `${(item.level - 1) * 16}px` }"
        >
          <a :href="`#${item.anchor}`" @click.prevent="scrollToAnchor(item.anchor)">
            {{ item.title }}
          </a>
        </li>
      </ul>
    </div>


  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import MarkdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'

// 初始化 MarkdownIt
const md = new MarkdownIt().use(markdownItAnchor, {
  level: [1, 2, 3], // 只处理 h1, h2, h3
  slugify: (s) => String(s).trim().toLowerCase().replace(/\s+/g, '-'), // 生成锚点ID
  permalink: true, // 生成锚点链接
  permalinkClass: 'header-anchor', // 锚点链接的class
  permalinkSymbol: '#' // 锚点链接的符号
})

// 数据
const html = ref('') // 解析后的 HTML
const toc = ref([]) // 目录
const activeAnchor = ref('') // 当前高亮的锚点

// 加载 Markdown 文件
const loadMarkdown = async () => {
  const response = await fetch('/md/test.md') // 加载 Markdown 文件
  const content = await response.text()
  const { html: parsedHtml, toc: parsedToc } = parseMarkdown(content)
  html.value = parsedHtml
  toc.value = parsedToc
}

// 解析 Markdown 并生成目录
const parseMarkdown = (content) => {
  const tokens = md.parse(content, {})
  const toc = []

  // 提取标题生成目录
  tokens.forEach((token) => {
    if (token.type === 'heading_open') {
      const level = parseInt(token.tag.slice(1), 10) // 获取标题级别（h1, h2, h3）
      const title = tokens[tokens.indexOf(token) + 1].content // 获取标题内容
      const anchor = token.attrs?.find((attr) => attr[0] === 'id')?.[1] // 获取锚点ID
      if (anchor) {
        toc.push({ level, title, anchor })
      }
    }
  })

  // 解析 Markdown 为 HTML
  const html = md.render(content)

  return { html, toc }
}

// 跳转到锚点
const scrollToAnchor = (anchor) => {
  const target = document.getElementById(anchor)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}

// 监听滚动事件，更新高亮锚点
const handleScroll = () => {
  const headings = toc.value.map((item) => document.getElementById(item.anchor))
  const scrollTop = window.scrollY || document.documentElement.scrollTop

  for (let i = headings.length - 1; i >= 0; i--) {
    if (headings[i].offsetTop <= scrollTop + 100) {
      activeAnchor.value = headings[i].id
      break
    }
  }
}

// 生命周期钩子
onMounted(() => {
  loadMarkdown()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped lang="scss">
.markdown-container {
  display: flex;
  .markdown-content {
    min-height: 2000px;
    padding: 30px;
    :deep(*)  {
      margin-bottom: 10px;
    }
    :deep(li) {
      list-style: disc;
      margin-left: 2em;
    }
    :deep(h1),:deep(h2),:deep(h3),:deep(h4),:deep(h5) {
      margin: 20px 0 15px 0;
    }
    :deep(p) {
      font-size: 16px;
    }
  }
}

.toc {
  width: 240px;
  margin-right: 20px;
  position: sticky;
  top: 20px;
  align-self: flex-start;
  margin-top: 30px;
  font-size: 16px;
}

.toc ul {
  list-style: none;
  padding: 0;
}

.toc-item {
  margin: 8px 0;
}

.toc-item a {
  text-decoration: none;
  color: inherit;
}

.toc-item a:hover {
  color: var(--theme-bkcolor-mine);
}

.toc-item.active a {
  color: var(--theme-color-mine);
  font-weight: bold;
}

.markdown-content {
  flex: 1;
}
</style>

