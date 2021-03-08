/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import ReactMarkdown from 'react-markdown';
// @ts-ignore
import READMEmd from '!!raw-loader!../README.md';

// This is expensive to render
const README = React.memo(function _README() {
    return <ReactMarkdown>{READMEmd}</ReactMarkdown>;
});

export default README;
