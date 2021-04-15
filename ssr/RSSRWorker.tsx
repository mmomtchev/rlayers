import React from 'react';
import ReactDOM from 'react-dom';

import RenderEvent from 'ol/render/Event';
import {RSSRProps, RContext, RContextType} from 'rlayers';
import {window, document} from 'ol-ssr/dom';

function RSSRender(comp: JSX.Element): Promise<RSSRProps> {
    /*if (global['rlayers_window'] === undefined) {
        const _window = import('ol-ssr/dom').catch((e) => {
            console.error(e);
            throw new Error('ol-ssr package missing, install ol-ssr for server-side rendering');
        });
        Object.defineProperty(global, 'rlayers_window', {value: _window});
        _window.then((dom) => {
            Object.defineProperty(global, 'window', {value: dom.window});
        });
    }*/

    return new Promise((resolve, reject) => {
        const _window = global['rlayers_window'];
        const target = document.createElement('div');
        let image: string;
        const context: RContextType = {
            ssr: {
                mapRenderComplete: () => {
                    if (!image) reject('Server-side rendering failed');
                    if (context.ssr.maps.length > 1) reject('Multiple maps not supported yet');
                    resolve(image);
                },
                layerPostRender: (e: RenderEvent) => {
                    image = e.context.canvas.toDataURL();
                },
                layers: [],
                maps: []
            }
        };
        ReactDOM.render(<RContext.Provider value={context}>{comp}</RContext.Provider>, target);
    }).then((image: string) => ({placeholderImage: image} as RSSRProps));
}

export default RSSRender;
