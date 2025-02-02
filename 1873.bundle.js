"use strict";(self.webpackChunkrlayers=self.webpackChunkrlayers||[]).push([[1873],{1873:(n,s,a)=>{a.r(s),a.d(s,{default:()=>t});const t='<span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token constant">JSX</span><span class="token punctuation">,</span> useCallback <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> Feature <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"ol"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> fromLonLat <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"ol/proj"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> GeoJSON <span class="token keyword">from</span> <span class="token string">"ol/format/GeoJSON"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> Point <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"ol/geom"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token string">"ol/ol.css"</span><span class="token punctuation">;</span>\n\n<span class="token keyword">import</span> <span class="token punctuation">{</span> RMap<span class="token punctuation">,</span> <span class="token constant">ROSM</span><span class="token punctuation">,</span> RLayerVector<span class="token punctuation">,</span> RStyle <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"rlayers"</span><span class="token punctuation">;</span>\n\n<span class="token comment">/**\n * Including data from a static file included at bundling time\n * webpack will do everything necessary\n * (this won\'t work in CodePen)\n */</span>\n<span class="token keyword">import</span> geojsonFeatures <span class="token keyword">from</span> <span class="token string">"./data/geo.json"</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">Features</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">JSX</span><span class="token punctuation">.</span>Element <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> <span class="token punctuation">[</span>flow<span class="token punctuation">,</span> setFlow<span class="token punctuation">]</span> <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">useState</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">return</span> <span class="token punctuation">(</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>d-flex flex-row<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RMap</span></span>\n        <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>example-map<span class="token punctuation">"</span></span>\n        <span class="token attr-name">initial</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> center<span class="token operator">:</span> <span class="token function">fromLonLat</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">2.364</span><span class="token punctuation">,</span> <span class="token number">48.82</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span> zoom<span class="token operator">:</span> <span class="token number">11</span> <span class="token punctuation">}</span><span class="token punctuation">}</span></span>\n      <span class="token punctuation">></span></span><span class="token plain-text">\n        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">ROSM</span></span> <span class="token punctuation">/></span></span><span class="token plain-text">\n        </span><span class="token punctuation">{</span><span class="token comment">/* When using TypeScript you can (optionally) specify the type of the features */</span><span class="token punctuation">}</span><span class="token plain-text">\n        &lt;RLayerVector&lt;Feature&lt;Point>>\n          zIndex=</span><span class="token punctuation">{</span><span class="token number">10</span><span class="token punctuation">}</span><span class="token plain-text">\n          /* Input data will have to be typed too */\n          features=</span><span class="token punctuation">{</span>\n            <span class="token keyword">new</span> <span class="token class-name">GeoJSON</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n              featureProjection<span class="token operator">:</span> <span class="token string">"EPSG:3857"</span><span class="token punctuation">,</span>\n              featureClass<span class="token operator">:</span> Feature<span class="token punctuation">,</span>\n            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">readFeatures</span><span class="token punctuation">(</span>geojsonFeatures<span class="token punctuation">)</span> <span class="token keyword">as</span> Feature<span class="token operator">&lt;</span>Point<span class="token operator">></span><span class="token punctuation">[</span><span class="token punctuation">]</span>\n          <span class="token punctuation">}</span><span class="token plain-text">\n          /* The type will be propagated to all callbacks */\n          onClick=</span><span class="token punctuation">{</span><span class="token function">useCallback</span><span class="token punctuation">(</span>\n            <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n              <span class="token function">setFlow</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token operator">...</span>flow<span class="token punctuation">,</span> e<span class="token punctuation">.</span>target<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"en"</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span><span class="token punctuation">,</span>\n            <span class="token punctuation">[</span>flow<span class="token punctuation">]</span>\n          <span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token plain-text">\n        >\n          </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RStyle.RStyle</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RStyle.RCircle</span></span> <span class="token attr-name">radius</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token number">5</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n              </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RStyle.RFill</span></span> <span class="token attr-name">color</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>blue<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span><span class="token plain-text">\n            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">RStyle.RCircle</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n          </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">RStyle.RStyle</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">RLayerVector</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n        </span><span class="token punctuation">{</span><span class="token comment">/* Without any type, the features will be assumed to be a of a generic Geometry type */</span><span class="token punctuation">}</span><span class="token plain-text">\n        &lt;RLayerVector\n          zIndex=</span><span class="token punctuation">{</span><span class="token number">5</span><span class="token punctuation">}</span><span class="token plain-text">\n          /**\n           * This layer will be getting its data from an URL, do not forget that in\n           * OpenLayers 9.2 the format parsers now return RenderFeature by default unless\n           * featureClass is explicitly specified\n           */\n          format=</span><span class="token punctuation">{</span>\n            <span class="token keyword">new</span> <span class="token class-name">GeoJSON</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n              featureProjection<span class="token operator">:</span> <span class="token string">"EPSG:3857"</span><span class="token punctuation">,</span>\n              featureClass<span class="token operator">:</span> Feature<span class="token punctuation">,</span>\n            <span class="token punctuation">}</span><span class="token punctuation">)</span>\n          <span class="token punctuation">}</span><span class="token plain-text">\n          url="https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements.geojson"\n          onPointerEnter=</span><span class="token punctuation">{</span><span class="token function">useCallback</span><span class="token punctuation">(</span>\n            <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n              <span class="token function">setFlow</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token operator">...</span>flow<span class="token punctuation">,</span> <span class="token string">"Entering "</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>target<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"nom"</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span><span class="token punctuation">,</span>\n            <span class="token punctuation">[</span>flow<span class="token punctuation">]</span>\n          <span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token plain-text">\n        >\n          </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RStyle.RStyle</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RStyle.RStroke</span></span> <span class="token attr-name">color</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#007bff<span class="token punctuation">"</span></span> <span class="token attr-name">width</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span><span class="token plain-text">\n            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RStyle.RFill</span></span> <span class="token attr-name">color</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>transparent<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span><span class="token plain-text">\n          </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">RStyle.RStyle</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">RLayerVector</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">RMap</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>mx-0 mt-0 mb-3 p-1 w-100 jumbotron shadow example-list<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token plain-text">Your actions</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span><span class="token plain-text">\n        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span>\n          <span class="token attr-name">dangerouslySetInnerHTML</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span>\n            __html<span class="token operator">:</span> flow<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;li className="m-0"></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>p<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/li></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n          <span class="token punctuation">}</span><span class="token punctuation">}</span></span>\n        <span class="token punctuation">/></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">\n    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n'}}]);