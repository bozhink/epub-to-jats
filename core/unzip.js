var fs = require('fs'),
    os = require('os'),
    path = require('path'),
    assert = require('assert'),
    unzip = require('unzip');

module.exports = function (inputFile, outputDirectory, done) {
    var parsedInput, stream, outputPath;

    assert.ok(inputFile, 'Input file name should be valid.');
    assert.ok(fs.existsSync(inputFile), 'Input file name should exist.');

    parsedInput = path.parse(inputFile);
    parsedInput.name = parsedInput.name || 'export';

    outputPath = (fs.existsSync(outputDirectory) ? outputDirectory : os.tmpdir()) + '/' + parsedInput.name;

    console.log('Output directory: ' + outputPath);

    stream = fs.createReadStream(inputFile);

    stream.pipe(unzip.Extract({
        path: outputPath
    }));

    stream.on('error', (error) => {
        console.error(error);
    });

    stream.on('end', () => {
        if (typeof done === 'function') {
            done(outputPath);
        }
    });
};