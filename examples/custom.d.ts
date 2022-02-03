// These come from webpack

declare module '*.svg' {
    const content: string;
    export default content;
}

declare module '*.igc' {
    const content: string;
    export default content;
}

declare module '*.geojson' {
    const content: string;
    export default content;
}

declare const VERSION: string;
declare const MAPBOX_TOKEN: string;
