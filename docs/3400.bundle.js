(self.webpackChunkrlayers=self.webpackChunkrlayers||[]).push([[3400],{3400:(n,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>t});const t='<span class="token comment">/* eslint-disable @typescript-eslint/ban-ts-comment */</span>\n<span class="token keyword">import</span> <span class="token string">"bootstrap/dist/css/bootstrap.min.css"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token string">"./example.css"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token string">"./ghp.css"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> HashRouter <span class="token keyword">as</span> Router<span class="token punctuation">,</span> Route<span class="token punctuation">,</span> Link <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"react-router-dom"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> Button <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"react-bootstrap"</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> examples <span class="token operator">=</span> <span class="token punctuation">{</span>\n  simple<span class="token operator">:</span> <span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token string">"Simple map"</span><span class="token punctuation">,</span> file<span class="token operator">:</span> <span class="token string">"Simple"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  controls<span class="token operator">:</span> <span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token string">"Custom controls"</span><span class="token punctuation">,</span> file<span class="token operator">:</span> <span class="token string">"Controls"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  overlays<span class="token operator">:</span> <span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token string">"Simple overlay"</span><span class="token punctuation">,</span> file<span class="token operator">:</span> <span class="token string">"Overlays"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  extent<span class="token operator">:</span> <span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token string">"Constrained view"</span><span class="token punctuation">,</span> file<span class="token operator">:</span> <span class="token string">"Extent"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  animation<span class="token operator">:</span> <span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token string">"Animated icon"</span><span class="token punctuation">,</span> file<span class="token operator">:</span> <span class="token string">"AnimatedOverlay"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  overview<span class="token operator">:</span> <span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token string">"Overview"</span><span class="token punctuation">,</span> file<span class="token operator">:</span> <span class="token string">"Overview"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  popups<span class="token operator">:</span> <span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token string">"Popups"</span><span class="token punctuation">,</span> file<span class="token operator">:</span> <span class="token string">"Popups"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  features<span class="token operator">:</span> <span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token string">"GeoJSON"</span><span class="token punctuation">,</span> file<span class="token operator">:</span> <span class="token string">"Features"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  cluster<span class="token operator">:</span> <span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token string">"Clustering"</span><span class="token punctuation">,</span> file<span class="token operator">:</span> <span class="token string">"Cluster"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  heatmap<span class="token operator">:</span> <span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token string">"Heatmap"</span><span class="token punctuation">,</span> file<span class="token operator">:</span> <span class="token string">"Heatmap"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  layers<span class="token operator">:</span> <span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token string">"Multiple layers"</span><span class="token punctuation">,</span> file<span class="token operator">:</span> <span class="token string">"Layers"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  pindrop<span class="token operator">:</span> <span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token string">"Drop a pin"</span><span class="token punctuation">,</span> file<span class="token operator">:</span> <span class="token string">"PinDrop"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  spinner<span class="token operator">:</span> <span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token string">"Spinner"</span><span class="token punctuation">,</span> file<span class="token operator">:</span> <span class="token string">"Spinner"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  geodata<span class="token operator">:</span> <span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token string">"Infographics"</span><span class="token punctuation">,</span> file<span class="token operator">:</span> <span class="token string">"GeoData"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  interactions<span class="token operator">:</span> <span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token string">"Move &amp; Select"</span><span class="token punctuation">,</span> file<span class="token operator">:</span> <span class="token string">"Interactions"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  draw<span class="token operator">:</span> <span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token string">"Draw &amp; Modify"</span><span class="token punctuation">,</span> file<span class="token operator">:</span> <span class="token string">"Draw"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  geolocation<span class="token operator">:</span> <span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token string">"Geolocation"</span><span class="token punctuation">,</span> file<span class="token operator">:</span> <span class="token string">"Geolocation"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  vectortiles<span class="token operator">:</span> <span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token string">"Vector tiles"</span><span class="token punctuation">,</span> file<span class="token operator">:</span> <span class="token string">"VectorTiles"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  reproj<span class="token operator">:</span> <span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token string">"Reprojection"</span><span class="token punctuation">,</span> file<span class="token operator">:</span> <span class="token string">"Reprojection"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  igc<span class="token operator">:</span> <span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token string">"Performance"</span><span class="token punctuation">,</span> file<span class="token operator">:</span> <span class="token string">"IGC"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token comment">// These two bring in huge bundles and are lazy-loaded</span>\n<span class="token keyword">const</span> ReadmeBlock <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">lazy</span><span class="token punctuation">(</span>\n  <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token comment">/* webpackPrefetch: true */</span> <span class="token string">"./ReadmeBlock"</span><span class="token punctuation">)</span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> CodeBlock <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">lazy</span><span class="token punctuation">(</span>\n  <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token comment">/* webpackPrefetch: true */</span> <span class="token string">"./CodeBlock"</span><span class="token punctuation">)</span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> ex <span class="token keyword">of</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>examples<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  examples<span class="token punctuation">[</span>ex<span class="token punctuation">]</span><span class="token punctuation">.</span>comp <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">lazy</span><span class="token punctuation">(</span>\n    <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token comment">/* webpackPrefetch: true */</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">./</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>examples<span class="token punctuation">[</span>ex<span class="token punctuation">]</span><span class="token punctuation">.</span>file<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.tsx</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n  examples<span class="token punctuation">[</span>ex<span class="token punctuation">]</span><span class="token punctuation">.</span>code <span class="token operator">=</span> <span class="token keyword">import</span><span class="token punctuation">(</span>\n    <span class="token comment">/* webpackPrefetch: true */</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">!!html-loader?{"minimize":false}!./jsx-loader.ts!./</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>examples<span class="token punctuation">[</span>ex<span class="token punctuation">]</span><span class="token punctuation">.</span>file<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.tsx</span><span class="token template-punctuation string">`</span></span>\n  <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">code</span><span class="token punctuation">)</span> <span class="token operator">=></span> code<span class="token punctuation">.</span><span class="token keyword">default</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">const</span> LeftMenuItem <span class="token operator">=</span> <span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">JSX</span><span class="token punctuation">.</span><span class="token parameter">Element</span> <span class="token operator">=></span> <span class="token punctuation">(</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Link</span></span> <span class="token attr-name">to</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>props<span class="token punctuation">.</span>id<span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Button</span></span> <span class="token attr-name">block</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token boolean">true</span><span class="token punctuation">}</span></span> <span class="token attr-name">variant</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>light<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n      </span><span class="token punctuation">{</span>props<span class="token punctuation">.</span>title<span class="token punctuation">}</span><span class="token plain-text">\n    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Button</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Link</span></span><span class="token punctuation">></span></span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> App <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">JSX</span><span class="token punctuation">.</span><span class="token parameter">Element</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">(</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Router</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>m-2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>strong</span><span class="token punctuation">></span></span><span class="token plain-text">rlayers Examples</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>strong</span><span class="token punctuation">></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>d-flex flex-row p-3<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>d-flex flex-column left-menu mr-1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n          </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">LeftMenuItem</span></span> <span class="token attr-name">id</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token string">""</span><span class="token punctuation">}</span></span> <span class="token attr-name">title</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token string">"Home"</span><span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span><span class="token plain-text">\n          </span><span class="token punctuation">{</span>Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>examples<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">LeftMenuItem</span></span> <span class="token attr-name">key</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>e<span class="token punctuation">}</span></span> <span class="token attr-name">id</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>e<span class="token punctuation">}</span></span> <span class="token attr-name">title</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>examples<span class="token punctuation">[</span>e<span class="token punctuation">]</span><span class="token punctuation">.</span>title<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n          <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token plain-text">\n        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">\n        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>d-flex flex-column w-100 overflow-hidden<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n          </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>fluid-container<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Route</span></span> <span class="token attr-name">exact</span> <span class="token attr-name">path</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n              </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ml-2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n                </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">React.Suspense</span></span> <span class="token attr-name">fallback</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">Loading...</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n                  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">ReadmeBlock</span></span> <span class="token punctuation">/></span></span><span class="token plain-text">\n                </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">React.Suspense</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n              </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">\n            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Route</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n            </span><span class="token punctuation">{</span>Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>examples<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>\n              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Route</span></span> <span class="token attr-name">key</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>e<span class="token punctuation">}</span></span> <span class="token attr-name">path</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>e<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n                </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>row<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n                  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>col-12 col-xl-5 mb-1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n                    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">React.Suspense</span></span> <span class="token attr-name">fallback</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">Loading component...</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n                      </span><span class="token punctuation">{</span>React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>examples<span class="token punctuation">[</span>e<span class="token punctuation">]</span><span class="token punctuation">.</span>comp<span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token plain-text">\n                    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">React.Suspense</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n                  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">\n                  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>col-12 col-xl-7 codeblock<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n                    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">React.Suspense</span></span> <span class="token attr-name">fallback</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">Parsing code...</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n                      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">CodeBlock</span></span> <span class="token attr-name">code</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>examples<span class="token punctuation">[</span>e<span class="token punctuation">]</span><span class="token punctuation">.</span>code<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span><span class="token plain-text">\n                    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">React.Suspense</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n                  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">\n                </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">\n              </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Route</span></span><span class="token punctuation">></span></span>\n            <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token plain-text">\n          </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">\n        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">\n    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Router</span></span><span class="token punctuation">></span></span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> App<span class="token punctuation">;</span>\n'}}]);