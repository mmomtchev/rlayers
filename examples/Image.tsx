import React from 'react';
import {get} from 'ol/proj';
import {getCenter} from 'ol/extent';
import 'ol/ol.css';

import {RMap, RLayerImage} from 'rlayers';

export default function Simple(): JSX.Element {
    const proj = get('EPSG:4326');
    const extent = proj.getWorldExtent();
    const center = getCenter(extent);
    return (
        <RMap
            width={'100%'}
            height={'60vh'}
            initial={{center: center, zoom: 1}}
            projection={proj}
            extent={extent}
        >
            <RLayerImage
                url={
                    'https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular_projection_SW.jpg'
                }
                extent={extent}
            />
        </RMap>
    );
}
