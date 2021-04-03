/* eslint-disable @typescript-eslint/ban-ts-comment */
import 'bootstrap/dist/css/bootstrap.min.css';
import './example.css';
import './ghp.css';
import React from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';

const examples = {
    simple: {title: 'Simple map', file: 'Simple'},
    controls: {title: 'Custom controls', file: 'Controls'},
    overlays: {title: 'Simple overlay', file: 'Overlays'},
    extent: {title: 'Constrained view', file: 'Extent'},
    state: {title: 'External state', file: 'ExternalState'},
    animation: {title: 'Animated icon', file: 'AnimatedOverlay'},
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
    draw: {title: 'Draw & Modify', file: 'Draw'},
    geolocation: {title: 'Geolocation', file: 'Geolocation'},
    vectortiles: {title: 'Vector tiles', file: 'VectorTiles'},
    reproj: {title: 'Reprojection', file: 'Reprojection'},
    igc: {title: 'Performance', file: 'IGC'}
};

const ReadmeBlock = React.lazy(() => import(/* webpackPrefetch: true */ './ReadmeBlock'));
const CodeBlock = React.lazy(() => import(/* webpackPrefetch: true */ './CodeBlock'));

for (const ex of Object.keys(examples)) {
    examples[ex].comp = React.lazy(
        () => import(/* webpackPrefetch: true */ `./${examples[ex].file}.tsx`)
    );
    examples[ex].code = import(
        /* webpackPrefetch: true */ `!!html-loader?{"minimize":false}!./jsx-loader.ts!./${examples[ex].file}.tsx`
    ).then((code) => code.default);
}

const LeftMenuItem = (props): JSX.Element => (
    <Link to={props.id}>
        <Button block={true} variant='light'>
            {props.title}
        </Button>
    </Link>
);

const App = (): JSX.Element => {
    return (
        <Router>
            <h1 className='m-2'>
                <strong>rlayers Examples</strong>
            </h1>
            <div className='d-flex flex-row p-3'>
                <div className='d-flex flex-column left-menu mr-1'>
                    <LeftMenuItem id={''} title={'Home'} />
                    {Object.keys(examples).map((e) => (
                        <LeftMenuItem key={e} id={e} title={examples[e].title} />
                    ))}
                </div>
                <div className='d-flex flex-column w-100 overflow-hidden'>
                    <div className='fluid-container'>
                        <Route exact path='/'>
                            <div className='ml-2'>
                                <React.Suspense fallback={<div>Loading...</div>}>
                                    <ReadmeBlock />
                                </React.Suspense>
                            </div>
                        </Route>
                        {Object.keys(examples).map((e) => (
                            <Route key={e} path={`/${e}`}>
                                <div className='row'>
                                    <div className='col-12 col-xl-5 mb-1'>
                                        <React.Suspense fallback={<div>Loading component...</div>}>
                                            {React.createElement(examples[e].comp)}
                                        </React.Suspense>
                                    </div>
                                    <div className='col-12 col-xl-7 codeblock'>
                                        <React.Suspense fallback={<div>Parsing code...</div>}>
                                            <CodeBlock code={examples[e].code} />
                                        </React.Suspense>
                                    </div>
                                </div>
                            </Route>
                        ))}
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default App;
