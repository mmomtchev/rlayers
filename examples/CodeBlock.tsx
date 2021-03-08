import React from 'react';
import prettier from 'prettier/standalone';
import parserTypescript from 'prettier/parser-typescript';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {darcula as styleHighlighter} from 'react-syntax-highlighter/dist/esm/styles/prism';

// This is expensive to render
const CodeBlock = React.memo(function _CodeBlock(props: {code: string}) {
    return (
        <SyntaxHighlighter language='tsx' style={styleHighlighter}>
            {prettier.format(props.code, {
                parser: 'typescript',
                plugins: [parserTypescript]
            })}
        </SyntaxHighlighter>
    );
});

export default CodeBlock;
