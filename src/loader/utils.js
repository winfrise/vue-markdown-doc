module.exports.genInlineComponentText = (componentContent) => {

    let template = ''
    ;(() => {
        const startTag = '<template>'
        const endTag = '</template>'
        const startTagLen = startTag.length
        const endTagLen = endTag.length
        const start = componentContent.indexOf(startTag)
        const end = componentContent.indexOf(endTag)
        if (start>=0 && end>=0) {
            template = componentContent.slice(start + startTagLen, end)
        } 
    })()

    let script = ''

    ;(() => {
        let startTag = '<script>'
        let endTag = '</script>'
        let startTagLen = startTag.length
        const start = componentContent.indexOf(startTag)
        const end = componentContent.indexOf(endTag)
        if (start > -1 && end > -1) {
            script = componentContent.slice(start + startTagLen, end) 
        } 
    })()

    // TODO: 这里采用了硬编码有待改进
    script = script.trim();
    if (script) {
        script = script.replace(/export\s+default/, 'const democomponentExport =');
    } else {
        script = 'const democomponentExport = {}';
    }
    const demoComponentContent = `(function() {
        ${script}
        return {
            template: ${JSON.stringify(template)},
        ...democomponentExport
        }
    })()`;
    return demoComponentContent;
}