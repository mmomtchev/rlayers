const fs = require('fs');
const path = require('path');

let links;

module.exports = function (link) {
    if (!links) {
        const els = fs
            .readFileSync(path.join(__dirname, 'olExternalLinks.txt'), 'utf8')
            .split('\n');
        links = {};
        for (const el of els) {
            const [file, member] = el.split('~');
            links[member] = `https://openlayers.org/en/latest/apidoc/${file
                .replace(/:/g, '-')
                .replace(/\//g, '_')}-${member}.html#~${member}`;
        }
    }

    if (links[link]) return links[link];

    return undefined;
};
