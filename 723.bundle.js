"use strict";(self.webpackChunkrlayers=self.webpackChunkrlayers||[]).push([[723],{723:(n,s,a)=>{a.r(s),a.d(s,{default:()=>t});const t='<span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token constant">JSX</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> fromLonLat<span class="token punctuation">,</span> toLonLat <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"ol/proj"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> boundingExtent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"ol/extent"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> DragBoxEvent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"ol/interaction/DragBox"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> Point <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"ol/geom"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> Feature <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"ol"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> Coordinate <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"ol/coordinate"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> shiftKeyOnly <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"ol/events/condition"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token string">"ol/ol.css"</span><span class="token punctuation">;</span>\n\n<span class="token keyword">import</span> monument <span class="token keyword">from</span> <span class="token string">"./svg/monument.svg"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span>\n  RMap<span class="token punctuation">,</span>\n  <span class="token constant">ROSM</span><span class="token punctuation">,</span>\n  RInteraction<span class="token punctuation">,</span>\n  RLayerVector<span class="token punctuation">,</span>\n  RStyle<span class="token punctuation">,</span>\n  RFeature<span class="token punctuation">,</span>\n<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"rlayers"</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">const</span> coords<span class="token operator">:</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> Coordinate<span class="token operator">></span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token string-property property">"Arc de Triomphe"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2.295</span><span class="token punctuation">,</span> <span class="token number">48.8737</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token string-property property">"Place d\'Italie"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2.355</span><span class="token punctuation">,</span> <span class="token number">48.831</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n  Bastille<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2.369</span><span class="token punctuation">,</span> <span class="token number">48.853</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token string-property property">"Tour Eiffel"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2.294</span><span class="token punctuation">,</span> <span class="token number">48.858</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n  Montmartre<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2.342</span><span class="token punctuation">,</span> <span class="token number">48.887</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> <span class="token function-variable function">coordsToString</span> <span class="token operator">=</span> <span class="token punctuation">(</span>coords<span class="token punctuation">)</span> <span class="token operator">=></span>\n  <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>coords<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">toFixed</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>coords<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">toFixed</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">Interactions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">JSX</span><span class="token punctuation">.</span>Element <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> <span class="token punctuation">[</span>startDragBox<span class="token punctuation">,</span> setStartDragBox<span class="token punctuation">]</span> <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">useState</span><span class="token punctuation">(</span>\n    <span class="token keyword">undefined</span> <span class="token keyword">as</span> Coordinate <span class="token operator">|</span> <span class="token keyword">undefined</span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">const</span> <span class="token punctuation">[</span>endDragBox<span class="token punctuation">,</span> setEndDragBox<span class="token punctuation">]</span> <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">useState</span><span class="token punctuation">(</span>\n    <span class="token keyword">undefined</span> <span class="token keyword">as</span> Coordinate <span class="token operator">|</span> <span class="token keyword">undefined</span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">const</span> <span class="token punctuation">[</span>msg<span class="token punctuation">,</span> setMsg<span class="token punctuation">]</span> <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">useState</span><span class="token punctuation">(</span>\n    <span class="token string">"&lt;p>Hold shift to select an area or drag and drop the monuments&lt;/p>"</span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token comment">// The features must be part of the state as they will be modified</span>\n  <span class="token keyword">const</span> <span class="token punctuation">[</span>features<span class="token punctuation">]</span> <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">useState</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>\n    Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>coords<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>\n      <span class="token punctuation">(</span>f<span class="token punctuation">)</span> <span class="token operator">=></span>\n        <span class="token keyword">new</span> <span class="token class-name">Feature</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n          geometry<span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Point</span><span class="token punctuation">(</span><span class="token function">fromLonLat</span><span class="token punctuation">(</span>coords<span class="token punctuation">[</span>f<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n          name<span class="token operator">:</span> f<span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">)</span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">const</span> vectorRef <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">useRef</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">as</span> React<span class="token punctuation">.</span>RefObject<span class="token operator">&lt;</span>RLayerVector<span class="token operator">></span><span class="token punctuation">;</span>\n  <span class="token keyword">return</span> <span class="token punctuation">(</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">React.Fragment</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RMap</span></span>\n        <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>example-map<span class="token punctuation">"</span></span>\n        <span class="token attr-name">initial</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> center<span class="token operator">:</span> <span class="token function">fromLonLat</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">2.364</span><span class="token punctuation">,</span> <span class="token number">48.82</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span> zoom<span class="token operator">:</span> <span class="token number">11</span> <span class="token punctuation">}</span><span class="token punctuation">}</span></span>\n      <span class="token punctuation">></span></span><span class="token plain-text">\n        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">ROSM</span></span> <span class="token punctuation">/></span></span><span class="token plain-text">\n\n        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RLayerVector</span></span> <span class="token attr-name">ref</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>vectorRef<span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n          </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RStyle.RStyle</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RStyle.RIcon</span></span> <span class="token attr-name">src</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>monument<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span><span class="token plain-text">\n          </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">RStyle.RStyle</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n          </span><span class="token punctuation">{</span>features<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span>f<span class="token punctuation">,</span> i<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RFeature</span></span> <span class="token attr-name">key</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>i<span class="token punctuation">}</span></span> <span class="token attr-name">feature</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>f<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n          <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token plain-text">\n        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">RLayerVector</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n\n        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RInteraction.RDragBox</span></span>\n          <span class="token attr-name">condition</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>shiftKeyOnly<span class="token punctuation">}</span></span>\n          <span class="token attr-name">onBoxStart</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>React<span class="token punctuation">.</span><span class="token function">useCallback</span><span class="token punctuation">(</span><span class="token punctuation">(</span>e<span class="token operator">:</span> DragBoxEvent<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n            <span class="token function">setStartDragBox</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>coordinate<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token function">setEndDragBox</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n          <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span>\n          <span class="token attr-name">onBoxEnd</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>React<span class="token punctuation">.</span><span class="token function">useCallback</span><span class="token punctuation">(</span>\n            <span class="token punctuation">(</span>e<span class="token operator">:</span> DragBoxEvent<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n              <span class="token function">setEndDragBox</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>coordinate<span class="token punctuation">)</span><span class="token punctuation">;</span>\n              <span class="token keyword">const</span> selected <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n              <span class="token keyword">if</span> <span class="token punctuation">(</span>vectorRef<span class="token punctuation">.</span>current <span class="token operator">&amp;&amp;</span> startDragBox<span class="token punctuation">)</span>\n                vectorRef<span class="token punctuation">.</span>current<span class="token punctuation">.</span>source<span class="token punctuation">.</span><span class="token function">forEachFeatureInExtent</span><span class="token punctuation">(</span>\n                  <span class="token function">boundingExtent</span><span class="token punctuation">(</span><span class="token punctuation">[</span>startDragBox<span class="token punctuation">,</span> e<span class="token punctuation">.</span>coordinate<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n                  <span class="token punctuation">(</span>f<span class="token punctuation">)</span> <span class="token operator">=></span> selected<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>f<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token boolean">false</span>\n                <span class="token punctuation">)</span><span class="token punctuation">;</span>\n              <span class="token function">setMsg</span><span class="token punctuation">(</span>\n                <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">You selected &lt;strong></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>\n                  selected<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">", "</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token string">"no monuments"</span>\n                <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/strong></span><span class="token template-punctuation string">`</span></span>\n              <span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span><span class="token punctuation">,</span>\n            <span class="token punctuation">[</span>startDragBox<span class="token punctuation">,</span> vectorRef<span class="token punctuation">]</span>\n          <span class="token punctuation">)</span><span class="token punctuation">}</span></span>\n        <span class="token punctuation">/></span></span><span class="token plain-text">\n\n        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RInteraction.RTranslate</span></span>\n          <span class="token attr-name">onTranslateEnd</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>React<span class="token punctuation">.</span><span class="token function">useCallback</span><span class="token punctuation">(</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n            <span class="token keyword">const</span> f <span class="token operator">=</span> e<span class="token punctuation">.</span>features<span class="token punctuation">.</span><span class="token function">item</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token keyword">const</span> coords <span class="token operator">=</span> <span class="token function">toLonLat</span><span class="token punctuation">(</span>\n              <span class="token punctuation">(</span>f<span class="token punctuation">.</span><span class="token function">getGeometry</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> Point<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getFirstCoordinate</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n            <span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token function">setMsg</span><span class="token punctuation">(</span>\n              <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">You placed &lt;strong></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>f<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/strong> at </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token function">coordsToString</span><span class="token punctuation">(</span>\n                coords\n              <span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>\n            <span class="token punctuation">)</span><span class="token punctuation">;</span>\n          <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span>\n        <span class="token punctuation">/></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">RMap</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>\n        <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>mx-0 mt-0 mb-3 p-1 w-100 jumbotron shadow shadow<span class="token punctuation">"</span></span>\n        <span class="token attr-name">dangerouslySetInnerHTML</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> __html<span class="token operator">:</span> msg <span class="token punctuation">}</span><span class="token punctuation">}</span></span>\n      <span class="token punctuation">/></span></span><span class="token plain-text">\n    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">React.Fragment</span></span><span class="token punctuation">></span></span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n'}}]);