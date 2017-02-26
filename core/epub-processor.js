var fs = require('fs'),
    assert = require('assert');

module.exports = {
    iterateFiles: function (path, done) {
        assert.ok(path, `Path '${path}' should be valid.`);
        assert.ok(fs.existsSync(path), `Path '${path}' should exist.`);

        var fullPath = path + '/OEBPS/';

        fs.readdir(fullPath, function (error, files) {
            assert.equal(error, null);

            if (files.length < 1) {
                return;
            }

            files.forEach((file) => {
                var html = '',
                    fullName;
                if (file.indexOf('.xhtml') > 0) {
                    fullName = fullPath + file;
                    html = fs.readFileSync(fullName, 'utf-8');

                    if (typeof done === 'function') {
                        done(fullName, html);
                    }
                }
            });
        });
    },

    processHTML: function (window, done) {
        var $ = window.$;

        // ==================================================================

        removeEmptyElements('p');
        removeEmptyElements('span');

        replaceElement('.ZAG-1, .zag-1, .backZAG1', 'h2');
        replaceElement('.ZAG1-Ref', 'h2', {
            class: 'ref'
        });
        replaceElement('.ZAG1-ack', 'h2', {
            class: 'ack'
        });
        replaceElement('.ZAG-2', 'h3');
        replaceElement('.References', 'ref');

        removeClass('p.NORMAL', 'NORMAL');
        removeClass('p.normal-0', 'normal-0');

        processByStyle('font-style', 'italic', 'i');
        processByStyle('font-weight', 'bold', 'b');
        processByStyle('text-decoration', 'underline', 'underline');
        processByStyle('text-decoration', 'overline', 'overline');
        processByStyle('text-decoration', 'line-through', 'strike');
        processByStyle('font-family', 'monospace', 'monospace');

        createSectionStructure();

        setFormattingToInlineStyles('p');

        replaceElement('span', '');

        if (typeof done === 'function') {
            done();
        }

        // ==================================================================

        function removeEmptyElements(selector) {
            $(selector).filter(function () {
                return $(this).html() == ''
            }).remove();
        }

        function processByStyle(cssPropertyName, cssPropertyValue, tagName) {
            var $elements = $('span').filter(function () {
                return $(this).css(cssPropertyName) == cssPropertyValue
            });

            $elements.each(function (i, value) {
                if (value.innerHTML) {
                    value.innerHTML = `<${tagName}>${value.innerHTML}</${tagName}>`;
                }
            })
        }

        function replaceElement(selector, tagName, attributes) {
            tagName = tagName || '';

            $(selector).replaceWith(function () {
                var content, key;

                if (tagName === '') {
                    return $(this).html();
                } else {
                    content = '<' + tagName;
                    if (attributes) {
                        for (key in attributes) {
                            content += ` ${key}="${attributes[key]}"`;
                        }
                    }

                    content += '>' + $(this).html() + `</${tagName}>`;

                    return content;
                }
            });
        }

        function removeClass(selector, className) {
            $(selector).removeClass(className);
        }

        function setFormattingToInlineStyles(selector) {
            $(selector).each(function () {
                var $this = $(this);
                // $this.css({
                //     'margin-left': $this.css('margin-left'),
                //     'margin-right': $this.css('margin-right'),
                //     'padding-left': $this.css('padding-left'),
                //     'padding-right': $this.css('padding-right'),
                //     'text-indent': $this.css('text-indent'),
                //     'border': $this.css('border'),
                // });

                $this.removeClass();
            });
        }

        function createSectionStructure() {

            var $textFrames = $('.Basic-Text-Frame');

            $textFrames.each(function () {
                var frame = this,
                    innerHTML = frame.innerHTML;

                if (!innerHTML) {
                    return;
                }

                innerHTML = innerHTML.replace(/(<h3\b[^>]*>[\s\S]*?)(?=<h[23]\b)/g, '<section>$1</section>')
                    .replace(/(<\/section>)\s*(<h3\b[^>]*>[\s\S]*)/, '$1<section>$2</section>')
                    .replace(/(<h2\b[^>]*>[\s\S]*?)(?=<h2\b)/g, '<section>$1</section>')
                    .replace(/(<\/section>)\s*(<h2\b[^>]*>[\s\S]*)/, '$1<section>$2</section>');

                frame.innerHTML = innerHTML;
            });
        }
    }
};