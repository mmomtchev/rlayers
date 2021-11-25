import React from 'react';
import {fromLonLat} from 'ol/proj';
import {
    altShiftKeysOnly,
    platformModifierKeyOnly,
    shiftKeyOnly,
    altKeyOnly,
    never,
    doubleClick
} from 'ol/events/condition';
import {Geometry, Point} from 'ol/geom';
import 'ol/ol.css';

import monument from './svg/eiffel.svg';
import {RMap, ROSM, RInteraction, RLayerVector, RStyle, RFeature} from 'rlayers';
import VectorSource from 'ol/source/Vector';

const TourEiffel = fromLonLat([2.294, 48.858]);
const TourEiffelPoint = new Point(TourEiffel);

export default function Interactions(): JSX.Element {
    const [selected, setSelected] = React.useState(false);
    return (
        <React.Fragment>
            <RMap className='example-map' initial={{center: fromLonLat([2.364, 48.82]), zoom: 11}}>
                <ROSM />

                <RLayerVector>
                    <RStyle.RStyle>
                        <RStyle.RIcon src={monument} />
                    </RStyle.RStyle>
                    <RFeature geometry={TourEiffelPoint} />
                </RLayerVector>

                <RLayerVector
                    onChange={React.useCallback((e) => {
                        // On every change, check if there is a feature covering the Eiffel Tower
                        const source = e.target as VectorSource<Geometry>;
                        if (source?.forEachFeatureAtCoordinateDirect)
                            setSelected(
                                source.forEachFeatureAtCoordinateDirect(TourEiffel, () => true)
                            );
                    }, [])}
                >
                    {/* This is the style used for the drawn polygons */}
                    <RStyle.RStyle>
                        <RStyle.RStroke color='#0000ff' width={3} />
                        <RStyle.RFill color='rgba(0, 0, 0, 0.75)' />
                    </RStyle.RStyle>

                    <RInteraction.RDraw
                        type={'Polygon'}
                        condition={shiftKeyOnly}
                        freehandCondition={altShiftKeysOnly}
                    />

                    <RInteraction.RDraw
                        type={'Circle'}
                        condition={altKeyOnly}
                        freehandCondition={never}
                    />

                    <RInteraction.RModify
                        condition={platformModifierKeyOnly}
                        deleteCondition={React.useCallback(
                            (e) => platformModifierKeyOnly(e) && doubleClick(e),
                            []
                        )}
                    />
                </RLayerVector>
            </RMap>
            <div>
                <p className='p-0 m-0'>
                    Hold <em>Shift</em> and click without dragging for a regular polygon
                </p>
                <p className='p-0 m-0'>
                    Hold <em>Shift</em> and <em>Alt</em> and drag for a freehand polygon
                </p>
                <p className='p-0 m-0'>
                    Hold <em>Alt</em> and click without dragging for a circle
                </p>
                <p className='p-0 m-0'>
                    Hold <em>Ctrl / &#x2318;</em> and drag to move/add a vertex
                </p>
                <p className='p-0 m-0'>
                    Hold <em>Ctrl / &#x2318;</em> and double click to remove a vertex
                </p>
            </div>
            <div className='mx-0 mt-1 mb-3 p-1 w-100 jumbotron shadow shadow'>
                <p>Currently the Eiffel Tower is{selected ? '' : ' not'} covered</p>
            </div>
        </React.Fragment>
    );
}
