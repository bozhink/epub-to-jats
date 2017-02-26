var options = require('./core/options')(),
    dom = require('./core/dom'),
    unzip = require('./core/unzip'),
    processor = require('./core/epub-processor'),
    writer = require('./core/xml-writer');

console.log(options);

unzip(options['input'], options['output'], function (path) {
    processor.iterateFiles(path, function (fullName, html) {
        dom(html, function (window) {
            const $ = window.$;
            console.log($('h1').text());

            processor.processHTML(window, function () {
                writer.write(fullName, window.document.innerHTML, function (name) {
                    console.log(`File ${name} is written.`);
                })
            });
        });
    });
});