import React from 'react';
import 'prism-themes/themes/prism-vsc-dark-plus.css';

// This is expensive to render
const CodeBlock = React.memo(function _CodeBlock(props: {code: Promise<string>}) {
    const [code, setCode] = React.useState('loading()');
    props.code.then((r) => setCode(r));
    return (
        <pre className='p-2' style={{backgroundColor: 'rgb(43, 43, 43)', fontSize: '16px'}}>
            <code className='language-tsx' dangerouslySetInnerHTML={{__html: code}} />
        </pre>
    );
});

export default CodeBlock;
