"use strict";(self.webpackChunkrlayers=self.webpackChunkrlayers||[]).push([[805],{805:(n,s,a)=>{a.r(s),a.d(s,{default:()=>t});const t='<span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token constant">JSX</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> fromLonLat <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"ol/proj"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> FeatureLike <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"ol/Feature"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> Style <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"ol/style"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token string">"ol/ol.css"</span><span class="token punctuation">;</span>\n\n<span class="token keyword">import</span> <span class="token punctuation">{</span> RMap <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"rlayers"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> RLayerVectorMBTiles <span class="token keyword">from</span> <span class="token string">"rlayers/layer/RLayerVectorMBTiles"</span><span class="token punctuation">;</span>\n\n<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> style <span class="token keyword">from</span> <span class="token string">"./style"</span><span class="token punctuation">;</span>\n\n<span class="token comment">// This is an example for rendering directly from a remote MBTiles source over HTTP</span>\n<span class="token comment">// It uses the `ol-mbtiles` plugin which you must install separately:</span>\n<span class="token comment">//</span>\n<span class="token comment">// npm install ol-mbtiles</span>\n<span class="token comment">//</span>\n<span class="token comment">// Be sure to check its documentation for more information:</span>\n<span class="token comment">// https://github.com/mmomtchev/ol-mbtiles</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">MBTiles</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">JSX</span><span class="token punctuation">.</span>Element <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">(</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RMap</span></span>\n        <span class="token attr-name">width</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token string">"100%"</span><span class="token punctuation">}</span></span>\n        <span class="token attr-name">height</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token string">"60vh"</span><span class="token punctuation">}</span></span>\n        <span class="token attr-name">initial</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> center<span class="token operator">:</span> <span class="token function">fromLonLat</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">2.364</span><span class="token punctuation">,</span> <span class="token number">48.82</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span> zoom<span class="token operator">:</span> <span class="token number">9</span> <span class="token punctuation">}</span><span class="token punctuation">}</span></span>\n      <span class="token punctuation">></span></span><span class="token plain-text">\n        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">RLayerVectorMBTiles</span></span>\n          <span class="token attr-name">url</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>\n            <span class="token string">"https://velivole.b-cdn.net/maptiler-osm-2017-07-03-v3.6.1-europe.mbtiles"</span>\n          <span class="token punctuation">}</span></span>\n          <span class="token attr-name">layers</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">[</span>\n            <span class="token string">"transportation"</span><span class="token punctuation">,</span>\n            <span class="token string">"water"</span><span class="token punctuation">,</span>\n            <span class="token string">"waterway"</span><span class="token punctuation">,</span>\n            <span class="token string">"landuse"</span><span class="token punctuation">,</span>\n            <span class="token string">"place"</span><span class="token punctuation">,</span>\n            <span class="token string">"boundary"</span><span class="token punctuation">,</span>\n          <span class="token punctuation">]</span><span class="token punctuation">}</span></span>\n          <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">function</span> <span class="token punctuation">(</span>feature<span class="token operator">:</span> FeatureLike<span class="token punctuation">)</span><span class="token operator">:</span> Style <span class="token punctuation">{</span>\n            <span class="token keyword">switch</span> <span class="token punctuation">(</span>feature<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"layer"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n              <span class="token keyword">case</span> <span class="token string">"water"</span><span class="token operator">:</span>\n              <span class="token keyword">case</span> <span class="token string">"waterway"</span><span class="token operator">:</span>\n                <span class="token keyword">return</span> style<span class="token punctuation">.</span>waterStyle<span class="token punctuation">;</span>\n              <span class="token keyword">case</span> <span class="token string">"transportation"</span><span class="token operator">:</span>\n                <span class="token keyword">return</span> style<span class="token punctuation">.</span><span class="token function">roadStyle</span><span class="token punctuation">(</span>feature<span class="token punctuation">)</span><span class="token punctuation">;</span>\n              <span class="token keyword">case</span> <span class="token string">"landuse"</span><span class="token operator">:</span>\n                <span class="token keyword">return</span> style<span class="token punctuation">.</span>buildingStyle<span class="token punctuation">;</span>\n              <span class="token keyword">case</span> <span class="token string">"boundary"</span><span class="token operator">:</span>\n                <span class="token keyword">return</span> style<span class="token punctuation">.</span>boundaryStyle<span class="token punctuation">;</span>\n              <span class="token keyword">case</span> <span class="token string">"place"</span><span class="token operator">:</span>\n                <span class="token keyword">return</span> style<span class="token punctuation">.</span><span class="token function">placeStyle</span><span class="token punctuation">(</span>feature<span class="token punctuation">)</span><span class="token punctuation">;</span>\n              <span class="token keyword">default</span><span class="token operator">:</span>\n                <span class="token keyword">return</span> <span class="token keyword">null</span> <span class="token keyword">as</span> <span class="token builtin">unknown</span> <span class="token keyword">as</span> Style<span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n          <span class="token punctuation">}</span><span class="token punctuation">}</span></span>\n        <span class="token punctuation">/></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">RMap</span></span><span class="token punctuation">></span></span><span class="token plain-text">\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token plain-text">\n        The data comes from a huge 30GB </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">></span></span><span class="token plain-text">.mbtiles</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">></span></span><span class="token plain-text"> file and initial\n        loading times may be slow due to the CDN provider not keeping it in its\n        cache\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span><span class="token plain-text">\n    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n'}}]);