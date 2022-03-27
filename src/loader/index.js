const md = require('./md-config')
const { genInlineComponentText } = require('./utils');



module.exports = function (source) {
    this.cacheable && this.cacheable(false)
    const content = md.render(source)

    const startTag = '<!--vue-demo-content:'
    const startTagLen = startTag.length;
    const endTag = ':vue-demo-content-->'
    const endTagLen = endTag.length;

    let start = 0
    let commentStart = content.indexOf(startTag)
    let commentEnd = content.indexOf(endTag)

    const output = []
    let componenetsString = ''
    let id = 0
    while(commentStart !== -1 && commentEnd !== -1) {
        output.push(content.slice(start, commentStart))
        const commentContent = content.slice(commentStart + startTagLen, commentEnd);

        let demoComponentContent = genInlineComponentText(commentContent);

        const demoComponentName = `demo${id}`;
        output.push(`<template v-slot:source><${demoComponentName} /></template>`);
        componenetsString += `${JSON.stringify(demoComponentName)}: ${demoComponentContent},`;
    
        // 重新计算下一次的位置
        id++;
        start = commentEnd + endTagLen;
        commentStart = content.indexOf(startTag, start);
        commentEnd = content.indexOf(endTag, commentStart + startTagLen);
    }
    output.push(content.slice(start));

    // 拼接最后的接果
    const newResource = `
        <template>
            <section class="content me-doc">
                ${output.join('')}
            </section>
        </template>
        <script>
            export default {
                name: "markdown-doc",
                components: {
                    ${componenetsString}
                },
                data() {
                    return {

                    }
                }
            }
        </script>
        `
    return newResource
}