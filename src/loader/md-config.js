const markdonwIt = require('markdown-it')
const overWriteFenceRule = require('./over-write-fence-rule')
const addContainer = require('./add-container')


const md = markdonwIt()
overWriteFenceRule(md)
addContainer(md)

module.exports = md

