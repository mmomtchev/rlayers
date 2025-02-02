"use strict";(self.webpackChunkrlayers=self.webpackChunkrlayers||[]).push([[2042],{2042:(n,a,s)=>{s.r(a),s.d(a,{default:()=>t});const t='<span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token constant">JSX</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> fromLonLat <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"ol/proj"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> GeoJSON <span class="token keyword">from</span> <span class="token string">"ol/format/GeoJSON"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span>\n  RMap<span class="token punctuation">,</span>\n  <span class="token constant">ROSM</span><span class="token punctuation">,</span>\n  RLayerTile<span class="token punctuation">,</span>\n  RLayerVector<span class="token punctuation">,</span>\n  RControl<span class="token punctuation">,</span>\n  RStyle<span class="token punctuation">,</span>\n  RLayerTileJSON<span class="token punctuation">,</span>\n  RLayerWMS<span class="token punctuation">,</span>\n  RLayerTileWMS<span class="token punctuation">,</span>\n<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"rlayers"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> RLayerStadia <span class="token keyword">from</span> <span class="token string">"rlayers/layer/RLayerStadia"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token string">"ol/ol.css"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token string">"rlayers/control/layers.css"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> Feature <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"ol"</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> layersButton <span class="token operator">=</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">></span></span><span class="token plain-text">&amp;#9776;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">Layers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">JSX</span><span class="token punctuation">.</span>Element <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">(</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token plain-text">\n        Use the layers controls in the upper right corner to switch the active\n        layer\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RMap</span></span>\n        <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>example-map<span class="token punctuation">"</span></span>\n        <span class="token attr-name">initial</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> center<span class="token operator">:</span> <span class="token function">fromLonLat</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">2.364</span><span class="token punctuation">,</span> <span class="token number">48.82</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span> zoom<span class="token operator">:</span> <span class="token number">7</span> <span class="token punctuation">}</span><span class="token punctuation">}</span></span>\n      <span class="token punctuation">></span></span><span class="token plain-text">\n        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RControl.RLayers</span></span> <span class="token attr-name">element</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>layersButton<span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n          </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">ROSM</span></span> <span class="token attr-name">properties</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> label<span class="token operator">:</span> <span class="token string">"OpenStreetMap"</span> <span class="token punctuation">}</span><span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span><span class="token plain-text">\n          </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RLayerTile</span></span>\n            <span class="token attr-name">properties</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> label<span class="token operator">:</span> <span class="token string">"OpenTopo"</span> <span class="token punctuation">}</span><span class="token punctuation">}</span></span>\n            <span class="token attr-name">url</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png<span class="token punctuation">"</span></span>\n            <span class="token attr-name">attributions</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Kartendaten: © OpenStreetMap-Mitwirkende, SRTM | Kartendarstellung: © OpenTopoMap (CC-BY-SA)<span class="token punctuation">"</span></span>\n          <span class="token punctuation">/></span></span><span class="token plain-text">\n          </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RLayerTile</span></span>\n            <span class="token attr-name">properties</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> label<span class="token operator">:</span> <span class="token string">"Transport"</span> <span class="token punctuation">}</span><span class="token punctuation">}</span></span>\n            <span class="token attr-name">url</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://tile.thunderforest.com/transport/{z}/{x}/{y}.png<span class="token punctuation">"</span></span>\n          <span class="token punctuation">/></span></span><span class="token plain-text">\n          </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RLayerStadia</span></span>\n            <span class="token attr-name">properties</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> label<span class="token operator">:</span> <span class="token string">"Stadia Terrain Background"</span> <span class="token punctuation">}</span><span class="token punctuation">}</span></span>\n            <span class="token attr-name">layer</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stamen_terrain_background<span class="token punctuation">"</span></span>\n          <span class="token punctuation">/></span></span><span class="token plain-text">\n          </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RLayerTileJSON</span></span>\n            <span class="token attr-name">properties</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> label<span class="token operator">:</span> <span class="token string">"Mapbox TileJSON"</span> <span class="token punctuation">}</span><span class="token punctuation">}</span></span>\n            <span class="token attr-name">url</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://a.tiles.mapbox.com/v3/aj.1x1-degrees.json?secure=1<span class="token punctuation">"</span></span>\n          <span class="token punctuation">/></span></span><span class="token plain-text">\n          </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RLayerWMS</span></span>\n            <span class="token attr-name">properties</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> label<span class="token operator">:</span> <span class="token string">"Magellium OSM France Schools WMS"</span> <span class="token punctuation">}</span><span class="token punctuation">}</span></span>\n            <span class="token attr-name">url</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://magosm.magellium.com/geoserver/ows<span class="token punctuation">"</span></span>\n            <span class="token attr-name">params</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span>\n              <span class="token constant">LAYERS</span><span class="token operator">:</span> <span class="token string">"magosm:france_schools_point"</span><span class="token punctuation">,</span>\n              <span class="token constant">FORMAT</span><span class="token operator">:</span> <span class="token string">"image/jpeg"</span><span class="token punctuation">,</span>\n            <span class="token punctuation">}</span><span class="token punctuation">}</span></span>\n          <span class="token punctuation">/></span></span><span class="token plain-text">\n          </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RLayerTileWMS</span></span>\n            <span class="token attr-name">properties</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> label<span class="token operator">:</span> <span class="token string">"Switzerland ArcGIS TileWMS"</span> <span class="token punctuation">}</span><span class="token punctuation">}</span></span>\n            <span class="token attr-name">url</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://wms.geo.admin.ch/<span class="token punctuation">"</span></span>\n            <span class="token attr-name">params</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span>\n              <span class="token constant">LAYERS</span><span class="token operator">:</span> <span class="token string">"ch.swisstopo.pixelkarte-farbe-pk1000.noscale"</span><span class="token punctuation">,</span>\n              <span class="token constant">FORMAT</span><span class="token operator">:</span> <span class="token string">"image/jpeg"</span><span class="token punctuation">,</span>\n              serverType<span class="token operator">:</span> <span class="token string">"mapserver"</span><span class="token punctuation">,</span>\n            <span class="token punctuation">}</span><span class="token punctuation">}</span></span>\n          <span class="token punctuation">/></span></span><span class="token plain-text">\n        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">RControl.RLayers</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n        </span><span class="token punctuation">{</span><span class="token comment">/* This one is always visible */</span><span class="token punctuation">}</span><span class="token plain-text">\n        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RLayerVector</span></span>\n          <span class="token attr-name">zIndex</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token number">5</span><span class="token punctuation">}</span></span>\n          <span class="token attr-name">format</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>\n            <span class="token keyword">new</span> <span class="token class-name">GeoJSON</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n              featureProjection<span class="token operator">:</span> <span class="token string">"EPSG:3857"</span><span class="token punctuation">,</span>\n              featureClass<span class="token operator">:</span> Feature<span class="token punctuation">,</span>\n            <span class="token punctuation">}</span><span class="token punctuation">)</span>\n          <span class="token punctuation">}</span></span>\n          <span class="token attr-name">url</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements.geojson<span class="token punctuation">"</span></span>\n        <span class="token punctuation">></span></span><span class="token plain-text">\n          </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RStyle.RStyle</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RStyle.RStroke</span></span> <span class="token attr-name">color</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#007bff<span class="token punctuation">"</span></span> <span class="token attr-name">width</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span><span class="token plain-text">\n            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RStyle.RFill</span></span> <span class="token attr-name">color</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>transparent<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span><span class="token plain-text">\n          </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">RStyle.RStyle</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">RLayerVector</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">RMap</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n'}}]);