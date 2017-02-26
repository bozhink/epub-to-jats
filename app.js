var options = require('./core/options')(),
    dom = require('./core/dom'),
    unzip = require('./core/unzip');

console.log(options);

unzip(options['input'], options['output']);

dom('<h1>Hello</h1>', function (window) {
    const $ = window.$;
    console.log($('h1').text());
});