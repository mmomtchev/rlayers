import {default as Snap} from 'ol/interaction/Snap';
import {default as RBaseInteraction} from './RBaseInteraction';

/**
 * @propsfor RSnap
 */
export interface RSnapProps {
     /** Snap tolerance in pixels
     * @default 10 */
     pixelTolerance?: number;
}

/** Snap */
export default class RSnap extends RBaseInteraction<RSnapProps> {
    protected static classProps = ['pixelToleranc'];
    ol: Snap;

    createOL(props: RSnapProps): Snap {
        this.classProps = RSnap.classProps;
        return new Snap(
            Object.keys(props)
                .filter((p) => this.classProps.includes(p))
                .reduce((ac, p) => ({...ac, [p]: props[p]}), {})
        );
    }
}