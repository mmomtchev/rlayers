import * as path from 'path';
import Piscina from 'piscina';

import {RSSRProps} from 'rlayers';

let piscina;

export default function RSSRender(comp: JSX.Element): Promise<RSSRProps> {
    if (!piscina)
        piscina = new Piscina({
            filename: require.resolve('rlayers-ssr/RSSRWorker.js')
        });
    return piscina.runTask(comp);
}
