// This is a primitive pbf-tiles server extracted from the meteo.guru/velivole.fr project
// © 2019, Momtchil Momtchev
// It is re-published here under an ISC licence

// The data has been extracted from OpenStreetMap
// © 2019, OpenStreetMap contributors
// It is re-published here under the Open Database License: https://www.openstreetmap.org/copyright

// This dataset requires about 2.5GB of heap RAM for Node.js

'use strict';
import * as fs from 'fs';
import * as path from 'path';
import express from 'express';
import geojsonvt from 'geojson-vt';
import vtpbf from 'vt-pbf';
import toBuffer from 'typedarray-to-buffer';

const config = {
    base_dir: '.',
    data_dir: '../data',
    geodata_admin: 'admin.min.geojson',
    geodata_places: 'places.min.geojson',
    geodata_port: 8040,
    pidfile: null,
    maxZoom: 16
};

function geoTile(tiles, params) {
    try {
        const coords = {x: parseInt(params.x), y: parseInt(params.y), z: parseInt(params.z)};
        var tile = tiles.getTile(coords.z, coords.x, coords.y);
        let tileFiltered;
        if (tile) {
            if (params.p !== undefined) {
                const p = parseInt(params.p);
                tileFiltered = {
                    features: tile.features.filter((f) => f.tags !== undefined && f.tags.p === p)
                };
            } else tileFiltered = {features: tile.features};
        } else tileFiltered = {features: []};

        const pbf = toBuffer(vtpbf.fromGeojsonVt({geojsonLayer: tileFiltered}));
        return pbf;
    } catch (e) {
        console.error(e);
        return '';
    }
}

const app = express();

console.log('Loading static data');
const geoAdminData = geojsonvt(
    JSON.parse(
        fs.readFileSync(path.resolve(config.base_dir, config.data_dir, config.geodata_admin))
    ),
    {extent: 4096, buffer: 8, maxZoom: config.maxZoom}
);
const geoPlacesData = geojsonvt(
    JSON.parse(
        fs.readFileSync(path.resolve(config.base_dir, config.data_dir, config.geodata_places))
    ),
    {
        extent: 4096,
        buffer: 256,
        maxZoom: config.maxZoom,
        generateId: true
    }
);
console.log('Static data loaded');

config.pidfile && fs.writeFileSync(config.pidfile, process.pid.toString());
process.on('SIGINT', () => {
    config.pidfile && fs.unlinkSync(config.pidfile);
    console.log('Exiting on SIGINT');
    process.exit(0);
});
process.on('SIGTERM', () => {
    config.pidfile && fs.unlinkSync(config.pidfile);
    console.log('Exiting on SIGTERM');
    process.exit(0);
});
process.title = 'velivole geodata for reactlayers';

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/tiles/admin/:z/:x/:y', (req, res) => {
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(geoTile(geoAdminData, req.params));
});
app.get('/tiles/place/:p/:z/:x/:y', (req, res) => {
    //console.debug('/places %j', req.params);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(geoTile(geoPlacesData, req.params));
});

app.listen(config.geodata_port, () => console.log(`Ready localhost:${config.geodata_port}`));
