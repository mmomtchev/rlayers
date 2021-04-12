import prettier from 'prettier/standalone';
import parserTypescript from 'prettier/parser-typescript';
import Prism from 'prismjs';

import loadLanguages from 'prismjs/components/';
loadLanguages(['tsx', 'jsx', 'typescript']);

export default function tsx_loader(content: string, map: unknown, meta: unknown): void {
    const formatted = prettier.format(content, {
        parser: 'typescript',
        plugins: [parserTypescript]
    });
    const html = Prism.highlight(formatted, Prism.languages.tsx, 'tsx');
    this.callback(null, html, map, meta);
    return;
}
