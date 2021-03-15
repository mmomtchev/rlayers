import React from 'react';
import 'prism-themes/themes/prism-darcula.css';

// This is expensive to render
const CodeBlock = React.memo(function _CodeBlock(props: {code: Promise<string>}) {
    const [code, setCode] = React.useState('loading()');
    props.code.then((r) => setCode(r));
    return (
        <pre
            style={{backgroundColor: 'rgb(83, 83, 83)'}}
            dangerouslySetInnerHTML={{__html: code}}
        />
    );
});

export default CodeBlock;
