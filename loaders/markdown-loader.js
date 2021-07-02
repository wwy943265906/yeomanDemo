const marked = require('marked');

module.exports = (source) => {
    // console.log(source);
    const result =  marked(source);
    const str = `console.log(${JSON.stringify(result)})`
    return str;
} 