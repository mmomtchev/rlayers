import React from 'react';
import prettier from 'prettier/standalone';
import parserTypescript from 'prettier/parser-typescript';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {darcula as styleHighlighter} from 'react-syntax-highlighter/dist/esm/styles/prism';

// This is expensive to render
const CodeBlock = React.memo(function _CodeBlock(props: {code: Promise<string>}) {
    const [code, setCode] = React.useState('loading()');
    props.code.then((r) => setCode(r));
    return (
        <SyntaxHighlighter language='tsx' style={styleHighlighter}>
            {prettier.format(code, {
                parser: 'typescript',
                plugins: [parserTypescript]
            })}
        </SyntaxHighlighter>
    );
});

export default CodeBlock;
