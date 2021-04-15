import Piscina from 'piscina';

import {RSSRProps} from 'rlayers';

let piscina;

export default function RSSRender(comp: JSX.Element): Promise<RSSRProps> {
    if (!piscina)
        piscina = new Piscina({
            filename: new URL('./RSSRWorker.js', import.meta.url).href
        });
    return piscina.runTask(comp);
}
