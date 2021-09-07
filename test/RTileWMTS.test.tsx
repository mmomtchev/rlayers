window.URL.createObjectURL = jest.fn();
import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import Projection from 'ol/proj/Projection';
import {createXYZ} from 'ol/tilegrid';

import {RMap, RLayerTile, RLayerWMTS} from 'rlayers';
import * as common from './common';

describe('<RLayerTile>', () => {
    it('should display a tiled XYZ layer', async () => {
        const {container} = render(
            <RMap {...common.mapProps}>
                <RLayerTile
                    properties={{label: 'OpenTopo'}}
                    url='https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
                    attributions='Kartendaten: © OpenStreetMap-Mitwirkende, SRTM | Kartendarstellung: © OpenTopoMap (CC-BY-SA)'
                />
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
    });
    it('should update the url', async () => {
        const ref = React.createRef() as React.RefObject<RLayerTile>;
        const comp = (url) => (
            <RMap {...common.mapProps}>
                <RLayerTile ref={ref} url={url} />
            </RMap>
        );
        const {rerender, container, unmount} = render(comp('http://url1'));
        expect(container.innerHTML).toMatchSnapshot();
        expect(ref.current.source.getUrls()[0]).toEqual('http://url1');
        rerender(comp('http://url2'));
        expect(container.innerHTML).toMatchSnapshot();
        expect(ref.current.source.getUrls()[0]).toEqual('http://url2');
        unmount();
    });

    it('should support custom projection and TileGrid', async () => {
        const layer = React.createRef() as React.RefObject<RLayerTile>;
        render(
            <RMap {...common.mapProps}>
                <RLayerTile
                    ref={layer}
                    projection={'EPSG:4326'}
                    tileGrid={createXYZ({
                        maxResolution: 111,
                        maxZoom: 20,
                        tileSize: [512, 512]
                    })}
                    url='https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
                />
            </RMap>
        );
        expect(layer.current.source.getTileGrid().getMaxZoom()).toBe(20);
        expect(layer.current.source.getProjection().getCode()).toBe('EPSG:4326');
    });

    it('should relay tile events', async () => {
        const map = React.createRef() as React.RefObject<RMap>;
        const layer = React.createRef() as React.RefObject<RLayerTile>;
        const handler = jest.fn();
        const events = ['TileEnd', 'TileStart', 'TileError'];
        const handlers = events.reduce((props, ev) => ({...props, ['on' + ev]: handler}), {});
        render(
            <RMap ref={map} {...common.mapProps}>
                <RLayerTile
                    ref={layer}
                    {...handlers}
                    url='https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
                />
            </RMap>
        );
        for (const ev of events)
            layer.current.source.dispatchEvent(common.createEvent(ev, map.current.ol));
        expect(handler).toHaveBeenCalledTimes(events.length);
    });
});

const WMTSCaps =
    '<Capabilities xmlns="http://www.opengis.net/wmts/1.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:gml="http://www.opengis.net/gml" xsi:schemaLocation="http://www.opengis.net/wmts/1.0 http://schemas.opengis.net/wmts/1.0/wmtsGetCapabilities_response.xsd" version="1.0.0"><!-- Service Identification --> <ows:ServiceIdentification><ows:Title>OS_Open_Raster</ows:Title><ows:ServiceType>OGC WMTS</ows:ServiceType><ows:ServiceTypeVersion>1.0.0</ows:ServiceTypeVersion></ows:ServiceIdentification><!-- Operations Metadata --><ows:OperationsMetadata><ows:Operation name="GetCapabilities"><ows:DCP><ows:HTTP><ows:Get xlink:href="https://tiles.arcgis.com/tiles/qHLhLQrcvEnxjtPr/arcgis/rest/services/OS_Open_Raster/MapServer/WMTS/1.0.0/WMTSCapabilities.xml"><ows:Constraint name="GetEncoding"><ows:AllowedValues> <ows:Value>RESTful</ows:Value></ows:AllowedValues></ows:Constraint> </ows:Get><ows:Get xlink:href="https://tiles.arcgis.com/tiles/qHLhLQrcvEnxjtPr/arcgis/rest/services/OS_Open_Raster/MapServer/WMTS?"> <ows:Constraint name="GetEncoding"><ows:AllowedValues><ows:Value>KVP</ows:Value></ows:AllowedValues></ows:Constraint></ows:Get></ows:HTTP></ows:DCP></ows:Operation><ows:Operation name="GetTile"><ows:DCP><ows:HTTP><ows:Get xlink:href="https://tiles.arcgis.com/tiles/qHLhLQrcvEnxjtPr/arcgis/rest/services/OS_Open_Raster/MapServer/WMTS/tile/1.0.0/"><ows:Constraint name="GetEncoding"><ows:AllowedValues><ows:Value>RESTful</ows:Value></ows:AllowedValues></ows:Constraint></ows:Get><ows:Get xlink:href="https://tiles.arcgis.com/tiles/qHLhLQrcvEnxjtPr/arcgis/rest/services/OS_Open_Raster/MapServer/WMTS?"><ows:Constraint name="GetEncoding"><ows:AllowedValues><ows:Value>KVP</ows:Value></ows:AllowedValues></ows:Constraint></ows:Get></ows:HTTP></ows:DCP></ows:Operation></ows:OperationsMetadata><Contents><Layer><ows:Title>OS_Open_Raster</ows:Title><ows:Identifier>OS_Open_Raster</ows:Identifier><ows:BoundingBox crs="urn:ogc:def:crs:EPSG::4326"><ows:LowerCorner>-649749.9999999999 -150250.0</ows:LowerCorner><ows:UpperCorner>1350250.0 1449750.0000000005</ows:UpperCorner></ows:BoundingBox><ows:WGS84BoundingBox crs="urn:ogc:def:crs:OGC:2:84"><ows:LowerCorner>-21.923323343134943 47.68616024993168</ows:LowerCorner><ows:UpperCorner>16.15094760591336 62.92599741313832</ows:UpperCorner></ows:WGS84BoundingBox><Style isDefault="true"><ows:Title>Default Style</ows:Title><ows:Identifier>default</ows:Identifier></Style><Format>image/png</Format><TileMatrixSetLink><TileMatrixSet>default028mm</TileMatrixSet></TileMatrixSetLink><ResourceURL format="image/png" resourceType="tile" template="https://tiles.arcgis.com/tiles/qHLhLQrcvEnxjtPr/arcgis/rest/services/OS_Open_Raster/MapServer/WMTS/tile/1.0.0/OS_Open_Raster/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png"/></Layer><!-- Tile Matrix Set --><TileMatrixSet><ows:Title>TileMatrix using 0.28mm</ows:Title><ows:Abstract>The tile matrix set that has scale values calculated based on the dpi defined by OGC specification (dpi assumes 0.28mm as the physical distance of a pixel).</ows:Abstract><ows:Identifier>default028mm</ows:Identifier><ows:SupportedCRS>urn:ogc:def:crs:EPSG::4326</ows:SupportedCRS><TileMatrix><ows:Identifier>0</ows:Identifier><ScaleDenominator>4.724711829631994E8</ScaleDenominator><TopLeftCorner>-5781523.99792 4883853.592505</TopLeftCorner><TileWidth>256</TileWidth> <TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>1</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>1</ows:Identifier><ScaleDenominator>2.362355914815997E8</ScaleDenominator><TopLeftCorner>-5781523.99792 4883853.592505</TopLeftCorner><TileWidth>256</TileWidth> <TileHeight>256</TileHeight><MatrixWidth>1</MatrixWidth><MatrixHeight>1</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>2</ows:Identifier><ScaleDenominator>9.449423659263986E7</ScaleDenominator><TopLeftCorner>-5781523.99792 4883853.592505</TopLeftCorner><TileWidth>256</TileWidth> <TileHeight>256</TileHeight><MatrixWidth>2</MatrixWidth><MatrixHeight>1</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>3</ows:Identifier><ScaleDenominator>7.08706774444799E7</ScaleDenominator><TopLeftCorner>-5781523.99792 4883853.592505</TopLeftCorner><TileWidth>256</TileWidth> <TileHeight>256</TileHeight><MatrixWidth>2</MatrixWidth><MatrixHeight>1</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>4</ows:Identifier><ScaleDenominator>4.724711829631993E7</ScaleDenominator><TopLeftCorner>-5781523.99792 4883853.592505</TopLeftCorner><TileWidth>256</TileWidth> <TileHeight>256</TileHeight><MatrixWidth>3</MatrixWidth><MatrixHeight>2</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>5</ows:Identifier><ScaleDenominator>2.3623559148159966E7</ScaleDenominator><TopLeftCorner>-5781523.99792 4883853.592505</TopLeftCorner><TileWidth>256</TileWidth> <TileHeight>256</TileHeight><MatrixWidth>5</MatrixWidth><MatrixHeight>3</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>6</ows:Identifier><ScaleDenominator>9449423.659263987</ScaleDenominator><TopLeftCorner>-5781523.99792 4883853.592505</TopLeftCorner><TileWidth>256</TileWidth> <TileHeight>256</TileHeight><MatrixWidth>11</MatrixWidth><MatrixHeight>8</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>7</ows:Identifier><ScaleDenominator>4724711.829631994</ScaleDenominator><TopLeftCorner>-5781523.99792 4883853.592505</TopLeftCorner><TileWidth>256</TileWidth> <TileHeight>256</TileHeight><MatrixWidth>22</MatrixWidth><MatrixHeight>15</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>8</ows:Identifier><ScaleDenominator>2362355.914815997</ScaleDenominator><TopLeftCorner>-5781523.99792 4883853.592505</TopLeftCorner><TileWidth>256</TileWidth> <TileHeight>256</TileHeight><MatrixWidth>43</MatrixWidth><MatrixHeight>30</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>9</ows:Identifier><ScaleDenominator>944942.3659263987</ScaleDenominator><TopLeftCorner>-5781523.99792 4883853.592505</TopLeftCorner><TileWidth>256</TileWidth> <TileHeight>256</TileHeight><MatrixWidth>106</MatrixWidth><MatrixHeight>75</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>10</ows:Identifier><ScaleDenominator>472471.18296319933</ScaleDenominator><TopLeftCorner>-5781523.99792 4883853.592505</TopLeftCorner><TileWidth>256</TileWidth> <TileHeight>256</TileHeight><MatrixWidth>211</MatrixWidth><MatrixHeight>149</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>11</ows:Identifier><ScaleDenominator>236235.59148159967</ScaleDenominator><TopLeftCorner>-5781523.99792 4883853.592505</TopLeftCorner><TileWidth>256</TileWidth> <TileHeight>256</TileHeight><MatrixWidth>422</MatrixWidth><MatrixHeight>298</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>12</ows:Identifier><ScaleDenominator>94494.23659263986</ScaleDenominator><TopLeftCorner>-5781523.99792 4883853.592505</TopLeftCorner><TileWidth>256</TileWidth> <TileHeight>256</TileHeight><MatrixWidth>1053</MatrixWidth><MatrixHeight>744</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>13</ows:Identifier><ScaleDenominator>70870.6774444799</ScaleDenominator><TopLeftCorner>-5781523.99792 4883853.592505</TopLeftCorner><TileWidth>256</TileWidth> <TileHeight>256</TileHeight><MatrixWidth>1404</MatrixWidth><MatrixHeight>991</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>14</ows:Identifier><ScaleDenominator>47247.11829631993</ScaleDenominator><TopLeftCorner>-5781523.99792 4883853.592505</TopLeftCorner><TileWidth>256</TileWidth> <TileHeight>256</TileHeight><MatrixWidth>2106</MatrixWidth><MatrixHeight>1487</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>15</ows:Identifier><ScaleDenominator>23623.559148159966</ScaleDenominator><TopLeftCorner>-5781523.99792 4883853.592505</TopLeftCorner><TileWidth>256</TileWidth> <TileHeight>256</TileHeight><MatrixWidth>4212</MatrixWidth><MatrixHeight>2973</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>16</ows:Identifier><ScaleDenominator>9449.423659263986</ScaleDenominator><TopLeftCorner>-5781523.99792 4883853.592505</TopLeftCorner><TileWidth>256</TileWidth> <TileHeight>256</TileHeight><MatrixWidth>10530</MatrixWidth><MatrixHeight>7433</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>17</ows:Identifier><ScaleDenominator>4724.711829631993</ScaleDenominator><TopLeftCorner>-5781523.99792 4883853.592505</TopLeftCorner><TileWidth>256</TileWidth> <TileHeight>256</TileHeight><MatrixWidth>21059</MatrixWidth><MatrixHeight>14865</MatrixHeight></TileMatrix><TileMatrix><ows:Identifier>18</ows:Identifier><ScaleDenominator>2362.3559148159966</ScaleDenominator><TopLeftCorner>-5781523.99792 4883853.592505</TopLeftCorner><TileWidth>256</TileWidth> <TileHeight>256</TileHeight><MatrixWidth>42117</MatrixWidth><MatrixHeight>29729</MatrixHeight></TileMatrix></TileMatrixSet></Contents><ServiceMetadataURL xlink:href="https://tiles.arcgis.com/tiles/qHLhLQrcvEnxjtPr/arcgis/rest/services/OS_Open_Raster/MapServer/WMTS/1.0.0/WMTSCapabilities.xml"/></Capabilities>';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
window.fetch = jest.fn(() => Promise.resolve({text: () => WMTSCaps})) as any;

describe('<RLayerWTMS>', () => {
    it('should display a tiled WMTS layer', async () => {
        const layer = React.createRef() as React.RefObject<RLayerWMTS>;
        const ready = jest.fn();
        await new Promise((res, rej) => {
            const {container} = render(
                <RMap {...common.mapProps}>
                    <RLayerWMTS
                        zIndex={5}
                        ref={layer}
                        onSourceReady={(opt) => {
                            expect((opt.projection as Projection).getCode()).toBe('EPSG:4326');
                            res(undefined);
                        }}
                        attributions='Contains OS data © Crown Copyright and database right'
                        url='https://tiles.arcgis.com/tiles/qHLhLQrcvEnxjtPr/arcgis/rest/services/OS_Open_Raster/MapServer/WMTS'
                        layer='OS_Open_Raster'
                    />
                </RMap>
            );
            expect(container.innerHTML).toMatchSnapshot();
        });
        expect(layer.current.source.getUrls()[0]).toBe(
            'https://tiles.arcgis.com/tiles/qHLhLQrcvEnxjtPr/arcgis/rest/services/OS_Open_Raster/MapServer/WMTS/tile/1.0.0/OS_Open_Raster/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png'
        );
    });
});
