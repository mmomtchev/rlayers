(self.webpackChunkrlayers=self.webpackChunkrlayers||[]).push([[8580],{8580:(n,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>t});const t='<span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> useCallback <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> fromLonLat<span class="token punctuation">,</span> toLonLat <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"ol/proj"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> Coordinate <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"ol/coordinate"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> Point <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"ol/geom"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token string">"ol/ol.css"</span><span class="token punctuation">;</span>\n\n<span class="token keyword">import</span> <span class="token punctuation">{</span> RMap<span class="token punctuation">,</span> <span class="token constant">ROSM</span><span class="token punctuation">,</span> RLayerVector<span class="token punctuation">,</span> RFeature<span class="token punctuation">,</span> ROverlay<span class="token punctuation">,</span> RStyle <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"rlayers"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> locationIcon <span class="token keyword">from</span> <span class="token string">"./svg/location.svg"</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> coords<span class="token operator">:</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> Coordinate<span class="token operator">></span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n  origin<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2.364</span><span class="token punctuation">,</span> <span class="token number">48.82</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n  Montmartre<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2.342</span><span class="token punctuation">,</span> <span class="token number">48.887</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token comment">// This example is meant to illustrate the use of the various RFeature callbacks</span>\n<span class="token comment">// If you simply want to implement a translation interaction, the Interactions</span>\n<span class="token comment">// example has a method which handles the pointer movements internally</span>\n<span class="token comment">// with a much better performance</span>\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">PinDrop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">JSX</span><span class="token punctuation">.</span>Element <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> <span class="token punctuation">[</span>loc<span class="token punctuation">,</span> setLoc<span class="token punctuation">]</span> <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">useState</span><span class="token punctuation">(</span>coords<span class="token punctuation">.</span>Montmartre<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">return</span> <span class="token punctuation">(</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">React.Fragment</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RMap</span></span>\n        <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>example-map<span class="token punctuation">"</span></span>\n        <span class="token attr-name">center</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token function">fromLonLat</span><span class="token punctuation">(</span>coords<span class="token punctuation">.</span>origin<span class="token punctuation">)</span><span class="token punctuation">}</span></span>\n        <span class="token attr-name">zoom</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token number">11</span><span class="token punctuation">}</span></span>\n      <span class="token punctuation">></span></span><span class="token plain-text">\n        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">ROSM</span></span> <span class="token punctuation">/></span></span><span class="token plain-text">\n        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RLayerVector</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n          &lt;RFeature\n            geometry=</span><span class="token punctuation">{</span><span class="token keyword">new</span> <span class="token class-name">Point</span><span class="token punctuation">(</span><span class="token function">fromLonLat</span><span class="token punctuation">(</span>loc<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token plain-text">\n            // useCallback is here for performance reasons\n            // without it RFeature will have its props updated at every call\n            onPointerDrag=</span><span class="token punctuation">{</span><span class="token function">useCallback</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n              <span class="token keyword">const</span> coords <span class="token operator">=</span> e<span class="token punctuation">.</span>map<span class="token punctuation">.</span><span class="token function">getCoordinateFromPixel</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>pixel<span class="token punctuation">)</span><span class="token punctuation">;</span>\n              e<span class="token punctuation">.</span>target<span class="token punctuation">.</span><span class="token function">setGeometry</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Point</span><span class="token punctuation">(</span>coords<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n              <span class="token comment">// this stops OpenLayers from interpreting the event to pan the map</span>\n              e<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token plain-text">\n            onPointerDragEnd=</span><span class="token punctuation">{</span><span class="token function">useCallback</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n              <span class="token keyword">const</span> coords <span class="token operator">=</span> e<span class="token punctuation">.</span>map<span class="token punctuation">.</span><span class="token function">getCoordinateFromPixel</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>pixel<span class="token punctuation">)</span><span class="token punctuation">;</span>\n              <span class="token function">setLoc</span><span class="token punctuation">(</span><span class="token function">toLonLat</span><span class="token punctuation">(</span>coords<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token plain-text">\n            onPointerEnter=</span><span class="token punctuation">{</span><span class="token function">useCallback</span><span class="token punctuation">(</span>\n              <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=></span>\n                <span class="token punctuation">(</span>e<span class="token punctuation">.</span>map<span class="token punctuation">.</span><span class="token function">getTargetElement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>cursor <span class="token operator">=</span> <span class="token string">"move"</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span>\n              <span class="token punctuation">[</span><span class="token punctuation">]</span>\n            <span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token plain-text">\n            onPointerLeave=</span><span class="token punctuation">{</span><span class="token function">useCallback</span><span class="token punctuation">(</span>\n              <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=></span>\n                <span class="token punctuation">(</span>e<span class="token punctuation">.</span>map<span class="token punctuation">.</span><span class="token function">getTargetElement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>cursor <span class="token operator">=</span> <span class="token string">"initial"</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>\n                <span class="token keyword">undefined</span><span class="token punctuation">,</span>\n              <span class="token punctuation">[</span><span class="token punctuation">]</span>\n            <span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token plain-text">\n          >\n            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RStyle.RStyle</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n              </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RStyle.RIcon</span></span> <span class="token attr-name">src</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>locationIcon<span class="token punctuation">}</span></span> <span class="token attr-name">anchor</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">[</span><span class="token number">0.5</span><span class="token punctuation">,</span> <span class="token number">0.8</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span><span class="token plain-text">\n            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">RStyle.RStyle</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">ROverlay</span></span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>example-overlay<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token plain-text">Move me</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">ROverlay</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n          </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">RFeature</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">RLayerVector</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">RMap</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>mx-0 mt-0 mb-3 p-1 w-100 jumbotron shadow shadow<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token plain-text">\n          Pin location is</span><span class="token punctuation">{</span><span class="token string">" "</span><span class="token punctuation">}</span><span class="token plain-text">\n          </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>strong</span><span class="token punctuation">></span></span><span class="token punctuation">{</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>loc<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">toFixed</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> : </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>loc<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">toFixed</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>strong</span><span class="token punctuation">></span></span><span class="token plain-text">\n        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">\n    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">React.Fragment</span></span><span class="token punctuation">></span></span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n'}}]);