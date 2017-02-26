var jsdom = require('jsdom'),
    fs = require('fs'),
    jquery = fs.readFileSync("node_modules/jquery/dist/jquery.js", "utf-8"),
    assert = require('assert');

module.exports = function (html, done) {
    jsdom.env({
        html: html,
        src: [jquery],
        done: function (error, window) {
            assert.equal(error, null);

            global.window = window;
            global.document = window.document;
            global.jQuery = jquery;
            global.$ = jquery;

            Object.keys(window)
                .filter((prop) => prop.toLowerCase().indexOf('html') >= 0)
                .forEach((prop) => global[prop] = window[prop]);

            done();
        }
    });
};