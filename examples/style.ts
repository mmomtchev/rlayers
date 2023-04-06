import {FeatureLike} from 'ol/Feature';
import {Style, Text, Fill, Stroke, Circle} from 'ol/style';

export function styleTown(size: number, feature: FeatureLike): Style {
    let width: number;
    let font: string;
    switch (size) {
        case 0:
            width = 6;
            font = '2em';
            break;
        case 1:
            width = 5;
            font = '1.2em';
            break;
        case 2:
            width = 3;
            font = '0.8em';
            break;
        default:
            width = 1;
            font = '0.5em';
            break;
    }
    font += ' helvetica, sans-serif';
    const color1 = '#00007f';
    const color2 = '#ffffff';

    const style = new Style({
        image: new Circle({
            fill: new Fill({
                color: color1
            }),
            radius: width,
            stroke: new Stroke({
                color: color1,
                width: width
            })
        }),
        text: new Text({
            font: font,
            text: feature.get('n'),
            fill: new Fill({
                color: color2
            }),
            stroke: new Stroke({
                color: color1,
                width: 2
            })
        })
    });
    return style;
}

export const styleBorder = new Style({
    stroke: new Stroke({
        color: 'blue',
        width: 2
    })
});

// Styles inspired from https://openlayers.org/en/latest/examples/osm-vector-tiles.html
const roadStyleCache: Record<string, Style> = {};
const roadColor: Record<string, string> = {
    motorway: '#776',
    trunk: '#ccb',
    highway: '#f39'
};
export const buildingStyle = new Style({
    fill: new Fill({
        color: '#666'
    }),
    stroke: new Stroke({
        color: '#444',
        width: 1
    })
});
export const waterStyle = new Style({
    fill: new Fill({
        color: '#9db9e8'
    })
});
export const boundaryStyle = new Style({
    stroke: new Stroke({
        color: '#8B008B',
        width: 2
    })
});
export const roadStyle = function (feature: FeatureLike) {
    const kind = feature.get('class');
    const railway = feature.get('railway');
    const sort_key = feature.get('sort_key');
    const styleKey = kind + '/' + railway + '/' + sort_key;
    let style = roadStyleCache[styleKey];
    if (!style) {
        let color, width;
        if (railway) {
            color = '#7de';
            width = 1;
        } else {
            color = roadColor[kind];
            width = kind == 'highway' ? 1.5 : 1;
        }
        style = new Style({
            stroke: new Stroke({
                color: color,
                width: width
            }),
            zIndex: sort_key
        });
        roadStyleCache[styleKey] = style;
    }
    return style;
};
const placeBase = new Style({
    image: new Circle({
        radius: 5,
        fill: new Fill({
            color: '#000080'
        })
    })
});
const textStroke = new Stroke({
    color: 'white',
    width: 2
});
export const placeStyle = function (feature: FeatureLike): Style {
    if (feature.get('class') == 'country') return null as unknown as Style;
    if (feature.get('name')) {
        const style = placeBase.clone();
        style.setText(
            new Text({
                text: feature.get('name'),
                offsetY: -5,
                font: 'bold 16px sans-serif',
                stroke: textStroke
            })
        );
        return style;
    }
    return null as unknown as Style;
};
