// 覆盖默认的 fence 渲染策略
// 参考文档: https://markdown-it.docschina.org/architecture.html#渲染器-renderer
module.exports = md => {
    const defaultRender = md.renderer.rules.fence;
    md.renderer.rules.fence = (tokens, idx, options, env, self) => {
      const token = tokens[idx];
      // 判断该 fence 是否在 :::block-demo 内
      const prevToken = tokens[idx - 1];
      const isInDemoContainer = prevToken && prevToken.nesting === 1 && prevToken.info.trim().match(/^demo-block\s*(.*)$/);
      if (token.info === 'html' && isInDemoContainer) {
        return `<template v-slot:highlight><pre v-pre><code class="html">${md.utils.escapeHtml(token.content)}</code></pre></template><!--vue-demo-content: ${token.content}:vue-demo-content-->`;
      } else if (token.info === 'demo') {
        return `<vue-markdown-doc>
          <template v-slot:highlight>
            <pre v-pre>
              <code class="html">${md.utils.escapeHtml(token.content)}</code>
            </pre>
          </template>
          <!--vue-demo-content: ${token.content}:vue-demo-content-->
        </vue-markdown-doc>`;
      }
      return defaultRender(tokens, idx, options, env, self);
    };
  };