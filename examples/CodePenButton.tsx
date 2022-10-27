import React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import exampleCss from '!!raw-loader!./example.css';

import packageLock from '../package-lock.json';
const versionReact = packageLock.dependencies['react'].version;
const versionOL = packageLock.dependencies['ol'].version;
const versionBootstrap = packageLock.dependencies['bootstrap'].version;
const versionProj4 = packageLock.dependencies['proj4'].version;

const alias = (t: string): string =>
    t
        .replace(/\//g, '.')
        .replace(/rlayers\.style/g, 'rlayers.RStyle')
        .replace(/rlayers\.control/g, 'rlayers.RControl')
        .replace(/rlayers\.interaction/g, 'rlayers.RInteraction')
        .replace(/react/g, 'React');

const CodePenButton = React.memo(function _CodePenButton(props: {
    text: Promise<string>;
    title: string;
}) {
    const [text, setText] = React.useState('loading()');
    React.useEffect(() => {
        props.text.then((r) => {
            let m;
            const renames = [];
            let regex = /import .*\{([A-Za-z,\s\n]+)\}.* from '(.*)'/g;
            while ((m = regex.exec(r)) !== null) {
                const imports = m[1].replace(/\s/g, '').replace(/\n/g, '').split(',');
                const path = alias(m[2]);
                for (const i of imports) renames.push({from: i, to: `${path}.${i}`});
            }
            regex = /import ([A-Za-z]+) from '(ol.*)'/g;
            while ((m = regex.exec(r)) !== null) {
                const path = alias(m[2]);
                renames.push({from: m[1], to: path});
            }
            regex = /import ([A-Za-z]+) from '(.*\.svg)'/g;
            while ((m = regex.exec(r)) !== null) {
                const path = `'https://cdn.jsdelivr.net/npm/rlayers/examples/${m[2]}'`;
                renames.push({from: m[1], to: path});
            }
            r = r.replace(/import [^;]+;\n/g, '');
            r = r.replace(/^\n+/, '');
            r = r.replace(/export default function (.*)/, 'function Comp() {');
            r += "\nReactDOM.createRoot(document.getElementById('root')).render(<Comp />);\n";
            if (renames.length > 0) r = '\n' + r;
            for (const m of renames.reverse()) r = `const ${m.from} = ${m.to};\n` + r;
            setText(r);
        });
    }, [props.text]);

    const ref = React.useRef<HTMLFormElement>();

    if (text && text.match(/in CodePen/)) return null;
    return (
        <form
            className='position-absolute my-2 mx-4'
            style={{top: '0px', right: '0px'}}
            ref={ref}
            action='https://codepen.io/pen/define'
            method='POST'
            target='_blank'
        >
            <input
                type='hidden'
                name='data'
                value={JSON.stringify({
                    title: 'rlayers ' + props.title,
                    description:
                        'This is an editable example from rlayers - https://mmomtchev.githb.io/rlayers',
                    tags: ['openlayers', 'react', 'maps', 'rlayers'],
                    html: '<div id="fullscreen" class="fullscreen">\n  <div id="root" style="margin: 4px;">\n  </div>\n</div>',
                    js: text,
                    js_pre_processor: 'typescript',
                    css: exampleCss,
                    js_external:
                        `https://cdn.jsdelivr.net/npm/bootstrap@${versionBootstrap}/dist/js/bootstrap.min.js;` +
                        `https://cdnjs.cloudflare.com/ajax/libs/react/${versionReact}/umd/react.development.min.js;` +
                        `https://cdnjs.cloudflare.com/ajax/libs/react-dom/${versionReact}/umd/react-dom.development.min.js;` +
                        `https://cdnjs.cloudflare.com/ajax/libs/proj4js/${versionProj4}/proj4.js;` +
                        `https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v${versionOL}/build/ol.js;` +
                        `https://cdn.jsdelivr.net/npm/rlayers@${VERSION}`,
                    css_external:
                        `https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v${versionOL}/css/ol.css;` +
                        `https://cdn.jsdelivr.net/npm/bootstrap@${versionBootstrap}/dist/css/bootstrap.min.css`
                })}
            />
            <button
                className='btn border mb-2 bg-light'
                onClick={() => {
                    ref.current.submit();
                }}
            >
                <span className='me-2 align-middle'>Edit on</span>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 138 26'
                    height='24px'
                    fill='none'
                    stroke='#000'
                    strokeWidth='2.3'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                >
                    <path d='M80 6h-9v14h9 M114 6h-9 v14h9 M111 13h-6 M77 13h-6 M122 20V6l11 14V6 M22 16.7L33 24l11-7.3V9.3L33 2L22 9.3V16.7z M44 16.7L33 9.3l-11 7.4 M22 9.3l11 7.3 l11-7.3 M33 2v7.3 M33 16.7V24 M88 14h6c2.2 0 4-1.8 4-4s-1.8-4-4-4h-6v14 M15 8c-1.3-1.3-3-2-5-2c-4 0-7 3-7 7s3 7 7 7 c2 0 3.7-0.8 5-2 M64 13c0 4-3 7-7 7h-5V6h5C61 6 64 9 64 13z' />
                </svg>
            </button>
        </form>
    );
});

export default CodePenButton;
