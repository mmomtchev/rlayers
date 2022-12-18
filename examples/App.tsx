/* eslint-disable @typescript-eslint/ban-ts-comment */
import 'bootstrap/dist/css/bootstrap.min.css';
import './example.css';
import './ghp.css';
import React from 'react';
import {HashRouter as Router, Routes, Route, Link} from 'react-router-dom';

const examples = {
    simple: {title: 'Simple map', file: 'Simple'},
    controls: {title: 'Custom controls', file: 'Controls'},
    overlays: {title: 'Simple overlay', file: 'Overlays'},
    extent: {title: 'Constrained view', file: 'Extent'},
    image: {title: 'Static image', file: 'Image'},
    state: {title: 'External state', file: 'ExternalState'},
    animation: {title: 'Animated icon', file: 'AnimatedOverlay'},
    webgl: {title: 'WebGL layers', file: 'WebGL'},
    overview: {title: 'Overview', file: 'Overview'},
    popups: {title: 'Popups', file: 'Popups'},
    features: {title: 'GeoJSON', file: 'Features'},
    cluster: {title: 'Clustering', file: 'Cluster'},
    heatmap: {title: 'Heatmap', file: 'Heatmap'},
    layers: {title: 'Multiple layers', file: 'Layers'},
    pindrop: {title: 'Drop a pin', file: 'PinDrop'},
    spinner: {title: 'Spinner', file: 'Spinner'},
    geodata: {title: 'Infographics', file: 'GeoData'},
    interactions: {title: 'Move & Select', file: 'Interactions'},
    add_delete: {title: 'Add & Delete', file: 'Add-Delete'},
    draw: {title: 'Draw & Modify', file: 'Draw'},
    geolocation: {title: 'Geolocation', file: 'Geolocation'},
    vectortiles: {title: 'Vector tiles', file: 'VectorTiles'},
    reproj: {title: 'Reprojection', file: 'Reprojection'},
    routing: {title: 'Navigation', file: 'Routing'},
    igc: {title: 'Performance', file: 'IGC'},
    addon: {title: 'Extending rlayers', file: 'Addon'}
};

// The examples use a code-loading technique that I have described in
// https://mmomtchev.medium.com/making-examples-displaying-code-along-its-output-with-webpack-a28dcf5439c6

const ReadmeBlock = React.lazy(() => import(/* webpackPrefetch: true */ './ReadmeBlock'));
const CodeBlock = React.lazy(() => import(/* webpackPrefetch: true */ './CodeBlock'));

for (const ex of Object.keys(examples)) {
    examples[ex].comp = React.lazy(
        () => import(/* webpackPrefetch: true */ `./${examples[ex].file}.tsx`)
    );
    examples[ex].code = import(
        /* webpackPrefetch: true */ `!!html-loader?{"minimize":false}!./jsx-loader.ts!./${examples[ex].file}.tsx`
    ).then((code) => code.default);

    examples[ex].text = import(
        /* webpackPrefetch: true */ `!!raw-loader!./${examples[ex].file}.tsx`
    ).then((text) => text.default);
}

const LeftMenuItem = (props): JSX.Element => (
    <Link to={props.id}>
        <button className='w-100 btn btn-light'>{props.title}</button>
    </Link>
);

const App = (): JSX.Element => {
    return (
        <Router>
            <h1 className='m-2'>
                <strong>rlayers {VERSION} Examples</strong>
            </h1>
            <div className='d-flex flex-row p-3'>
                <div className='d-flex flex-column left-menu me-2'>
                    <LeftMenuItem id={''} title={'Home'} />
                    {Object.keys(examples).map((e) => (
                        <LeftMenuItem key={e} id={e} title={examples[e].title} />
                    ))}
                </div>
                <div className='d-flex flex-column w-100 overflow-hidden'>
                    <div className='fluid-container'>
                        <Routes>
                            <Route
                                path='/'
                                element={
                                    <div className='ml-2'>
                                        <React.Suspense fallback={<div>Loading...</div>}>
                                            <ReadmeBlock />
                                        </React.Suspense>
                                    </div>
                                }
                            />
                            {Object.keys(examples).map((e) => (
                                <Route
                                    key={e}
                                    path={`/${e}`}
                                    element={
                                        <div className='row'>
                                            <div className='col-12 col-xl-5 mb-1'>
                                                <React.Suspense
                                                    fallback={<div>Loading component...</div>}
                                                >
                                                    {React.createElement(examples[e].comp)}
                                                </React.Suspense>
                                            </div>
                                            <div className='col-12 col-xl-7 codeblock'>
                                                <React.Suspense
                                                    fallback={<div>Parsing code...</div>}
                                                >
                                                    <CodeBlock
                                                        title={examples[e].title}
                                                        code={examples[e].code}
                                                        text={examples[e].text}
                                                    />
                                                </React.Suspense>
                                            </div>
                                        </div>
                                    }
                                />
                            ))}
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default App;
