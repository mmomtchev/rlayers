/* eslint-disable @typescript-eslint/ban-ts-comment */
import 'bootstrap/dist/css/bootstrap.min.css';
import './example.css';
import './ghp.css';
import React from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import prettier from 'prettier/standalone';
import parserTypescript from 'prettier/parser-typescript';
import SyntaxHighlighter from 'react-syntax-highlighter';
import ReactMarkdown from 'react-markdown';
import {agate as styleHighlighter} from 'react-syntax-highlighter/dist/esm/styles/hljs';
// @ts-ignore
import README from '!!raw-loader!../README.md';

import Simple from './Simple';
// @ts-ignore
import SimpleJSX from '!!raw-loader!./Simple.tsx';
import Layers from './Layers';
// @ts-ignore
import LayersJSX from '!!raw-loader!./Layers.tsx';
import Controls from './Controls';
// @ts-ignore
import ControlsJSX from '!!raw-loader!./Controls.tsx';
import Overlays from './Overlays';
// @ts-ignore
import OverlaysJSX from '!!raw-loader!./Overlays.tsx';
import Popups from './Popups';
// @ts-ignore
import PopupsJSX from '!!raw-loader!./Popups.tsx';
import Features from './Features';
// @ts-ignore
import FeaturesJSX from '!!raw-loader!./Features.tsx';
import PinDrop from './PinDrop';
// @ts-ignore
import PinDropJSX from '!!raw-loader!./PinDrop.tsx';
import Reprojection from './Reprojection';
// @ts-ignore
import ReprojectionJSX from '!!raw-loader!./Reprojection.tsx';
import IGC from './IGC';
// @ts-ignore
import IGCJSX from '!!raw-loader!./IGC.tsx';
import Heatmap from './Heatmap';
// @ts-ignore
import HeatmapJSX from '!!raw-loader!./Heatmap.tsx';
import Cluster from './Cluster';
// @ts-ignore
import ClusterJSX from '!!raw-loader!./Cluster.tsx';
import Overview from './Overview';
// @ts-ignore
import OverviewJSX from '!!raw-loader!./Overview.tsx';
import VectorTiles from './VectorTiles';
// @ts-ignore
import VectorTilesJSX from '!!raw-loader!./VectorTiles.tsx';
import DragBox from './DragBox';
// @ts-ignore
import DragBoxJSX from '!!raw-loader!./DragBox.tsx';
import Spinner from './Spinner';
// @ts-ignore
import SpinnerJSX from '!!raw-loader!./Spinner.tsx';

const LeftMenuItem = (props): JSX.Element => (
    <Link to={props.id}>
        <Button block={true} variant='light'>
            {props.title}
        </Button>
    </Link>
);

const examples = {
    simple: {title: 'Simple map', comp: Simple, code: SimpleJSX},
    controls: {title: 'Custom controls', comp: Controls, code: ControlsJSX},
    overlays: {title: 'Simple overlay', comp: Overlays, code: OverlaysJSX},
    overview: {title: 'Overview', comp: Overview, code: OverviewJSX},
    popups: {title: 'Popups', comp: Popups, code: PopupsJSX},
    cluster: {title: 'Clustering', comp: Cluster, code: ClusterJSX},
    heatmap: {title: 'Heatmap', comp: Heatmap, code: HeatmapJSX},
    features: {title: 'Load GeoJSON', comp: Features, code: FeaturesJSX},
    layers: {title: 'Multiple layers', comp: Layers, code: LayersJSX},
    pindrop: {title: 'Drop a pin', comp: PinDrop, code: PinDropJSX},
    spinner: {title: 'Spinner', comp: Spinner, code: SpinnerJSX},
    dragbox: {title: 'Dragbox', comp: DragBox, code: DragBoxJSX},
    vectortiles: {title: 'Vector tiles', comp: VectorTiles, code: VectorTilesJSX},
    reproj: {title: 'Reprojection', comp: Reprojection, code: ReprojectionJSX},
    igc: {title: 'Performance', comp: IGC, code: IGCJSX}
};

// This is expensive to render
const CodeDisplay = React.memo(function _CodeDisplay(props: {code: string}) {
    return (
        <SyntaxHighlighter language='typescript' style={styleHighlighter}>
            {prettier.format(props.code, {
                parser: 'typescript',
                plugins: [parserTypescript]
            })}{' '}
        </SyntaxHighlighter>
    );
});

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
                                <ReactMarkdown>{README}</ReactMarkdown>
                            </div>
                        </Route>
                        {Object.keys(examples).map((e) => (
                            <Route key={e} path={`/${e}`}>
                                <div className='row'>
                                    <div className='col-12 col-xl-5'>{examples[e].comp()}</div>
                                    <div className='col-12 col-xl-7'>
                                        <CodeDisplay code={examples[e].code} />
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
