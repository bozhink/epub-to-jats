var fs = require('fs'),
    path = require('path'),
    assert = require('assert');

module.exports = {
    write: function (fileName, content, done) {
        assert.ok(fs.existsSync(fileName), `File ${fileName} should exist.`);

        var parsedFileName = path.parse(fileName),
            outputFileName = path.join(parsedFileName.dir, parsedFileName.name + '.xml');

        fs.writeFile(outputFileName, content, {
            encoding: 'utf-8'
        }, function (error) {
            assert.equal(error, null);

            if (typeof done === 'function') {
                done(outputFileName);
            }
        });
    }
};