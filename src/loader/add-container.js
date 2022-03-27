
const markdownItContainer = require('markdown-it-container')
module.exports = (md) => {
    // 参考: https://www.npmjs.com/package/markdown-it-container
    md.use(markdownItContainer, 'demo-block', {
        validate: function(params) {
            return params.trim().match(/^demo-block\s+(.*)$/);
        },
        render: function (tokens, idx) {
            const m = tokens[idx].info.trim().match(/^demo-block\s*(.*)$/);
        
            if (tokens[idx].nesting === 1) {
                const description = m && m.length > 1 ? m[1] : '';
                const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : '';
                // opening tag
                return `<vue-markdown-doc>
                ${description ? `<template v-slot:description><div>${description}</div></template>` : ''}
                `
        
            } else {
                // closing tag
                return '</vue-markdown-doc>\n';
            }
        }
    })

}