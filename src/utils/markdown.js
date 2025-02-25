// src/utils/markdown.js
import MarkdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItTableOfContents from 'markdown-it-table-of-contents';

// 配置 MarkdownIt
const md = new MarkdownIt()
  .use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.ariaHidden({ placement: 'before' }),
  })
  .use(markdownItTableOfContents, {
    includeLevel: [2, 3], // 你可以调整目录显示的标题层级
    containerClass: 'table-of-contents',
  });

export default md;
