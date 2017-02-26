var commandLineArgs = require('command-line-args'),
    getUsage = require('command-line-usage'),
    usageSections = [{
            header: 'EPUB to JATS',
            content: [
                'Generates [italic]{JATS}-styled XML file from an [italic]{EPUB} input file.',
                'See https://jats.nlm.nih.gov/ for more information.'
            ]
        },
        {
            header: 'Options',
            optionList: [{
                    name: 'input',
                    alias: 'i',
                    typeLabel: '[underline]{file}',
                    description: 'The input EPUB file to process.'
                },
                {
                    name: 'output',
                    alias: 'o',
                    typeLabel: '[underline]{directory}',
                    description: 'The output directory. [italic]{Optional}'
                },
                {
                    name: 'help',
                    alias: 'h',
                    description: 'Print this usage guide.'
                }
            ]
        }
    ],
    usage = getUsage(usageSections),
    optionDefinitions = [{
            name: 'input',
            alias: 'i',
            type: String
        },
        {
            name: 'output',
            alias: 'o',
            type: String
        }, {
            name: 'help',
            alias: 'h',
            type: null
        }
    ];

module.exports = function commandLineOptions() {
    var options = commandLineArgs(optionDefinitions);
    if (('help' in options) || !('input' in options)) {
        console.log(usage);
        process.exit(1);
    }

    return options;
}