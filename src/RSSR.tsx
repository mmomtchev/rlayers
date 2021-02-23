import React from 'react';
import ReactDOM from 'react-dom';

import RMap from './RMap';
import {RContext, RContextType} from './context';
import RenderEvent from 'ol/render/Event';

export interface RSSRProps {
    placeholderImage: string;
}

export default function RSSRender(comp: JSX.Element): Promise<RSSRProps> {
    const target = document.createElement('div');
    return new Promise((resolve, reject) => {
        let image: string;
        const context: RContextType = {
            ssr: {
                mapRenderComplete: () => {
                    console.log('MapRenderComplete');
                    if (!image) reject('Server-side rendering failed');
                    if (context.ssr.maps.length > 1) reject('Multiple maps not supported yet');
                    resolve(image);
                },
                layerPostRender: (e: RenderEvent) => {
                    console.log('Received PostRender image');
                    image = e.context.canvas.toDataURL();
                },
                layers: [],
                maps: []
            }
        };
        ReactDOM.render(<RContext.Provider value={context}>{comp}</RContext.Provider>, target);
    }).then((image: string) => ({placeholderImage: image} as RSSRProps));
}
