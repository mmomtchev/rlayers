import React from 'react';
import {fromLonLat, toLonLat} from 'ol/proj';
import {DragBoxEvent} from 'ol/interaction/DragBox';
import {Coordinate} from 'ol/coordinate';
import {shiftKeyOnly} from 'ol/events/condition';
import {RMap, ROSM, RInteraction} from 'react-layers';

export default function DragBox(): JSX.Element {
    const [startDragBox, setStartDragBox] = React.useState(null as Coordinate);
    const [endDragBox, setEndDragBox] = React.useState(null as Coordinate);
    return (
        <React.Fragment>
            <RMap className='example-map' center={fromLonLat([2.364, 48.82])} zoom={11}>
                <ROSM />
                <RInteraction.RDragBox
                    condition={shiftKeyOnly}
                    onBoxStart={React.useCallback((e: DragBoxEvent) => {
                        setStartDragBox(toLonLat(e.coordinate));
                        setEndDragBox(null);
                    }, [])}
                    onBoxEnd={React.useCallback((e: DragBoxEvent) => {
                        setEndDragBox(toLonLat(e.coordinate));
                    }, [])}
                />
            </RMap>
            <div className='mx-0 mt-0 mb-3 p-1 w-100 jumbotron shadow shadow'>
                {endDragBox !== null ? (
                    <p>
                        Dragbox is{' '}
                        <strong>
                            ({`${startDragBox[1].toFixed(3)} : ${startDragBox[0].toFixed(3)}`}) (
                            {`${endDragBox[1].toFixed(3)} : ${endDragBox[0].toFixed(3)}`})
                        </strong>
                    </p>
                ) : (
                    <p>Hold shift to select an area</p>
                )}
            </div>
        </React.Fragment>
    );
}
