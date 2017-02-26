var options = require('./core/options')(),
    dom = require('./core/dom');

console.log(options);

dom('<h1>Hello</h1>', function () {
    console.log(window.$('h1').text());
});