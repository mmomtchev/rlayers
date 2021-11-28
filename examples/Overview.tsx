import React, {useCallback} from 'react';
import {fromLonLat} from 'ol/proj';
import {Button} from 'react-bootstrap';
import 'ol/ol.css';

import {RMap, ROSM, RControl} from 'rlayers';

const origin = [2.364, 48.82];

// Most of the customization is in the example-overview CSS class
// Include the OpenLayers built-in .ol-overviewmap to avoid recreating everything from scratch

export default function Overview(): JSX.Element {
    const [collapsed, setCollapsed] = React.useState(false);
    return (
        <React.Fragment>
            <RMap className='example-map' initial={{center: fromLonLat(origin), zoom: 11}}>
                <ROSM />
                <RControl.ROverviewMap
                    className='ol-overviewmap example-overview'
                    collapsed={collapsed}
                >
                    <ROSM />
                </RControl.ROverviewMap>
            </RMap>
            <Button onClick={useCallback(() => setCollapsed(!collapsed), [collapsed])}>
                Optional external toggle
            </Button>
        </React.Fragment>
    );
}
