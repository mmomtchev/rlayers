"use strict";(self.webpackChunkrlayers=self.webpackChunkrlayers||[]).push([[290],{4096:(t,e,n)=>{n.d(e,{A:()=>a});var o=n(1601),r=n.n(o),i=n(6314),s=n.n(i)()(r());s.push([t.id,':root,\n:host {\n  --ol-background-color: white;\n  --ol-accent-background-color: #F5F5F5;\n  --ol-subtle-background-color: rgba(128, 128, 128, 0.25);\n  --ol-partial-background-color: rgba(255, 255, 255, 0.75);\n  --ol-foreground-color: #333333;\n  --ol-subtle-foreground-color: #666666;\n  --ol-brand-color: #00AAFF;\n}\n\n.ol-box {\n  box-sizing: border-box;\n  border-radius: 2px;\n  border: 1.5px solid var(--ol-background-color);\n  background-color: var(--ol-partial-background-color);\n}\n\n.ol-mouse-position {\n  top: 8px;\n  right: 8px;\n  position: absolute;\n}\n\n.ol-scale-line {\n  background: var(--ol-partial-background-color);\n  border-radius: 4px;\n  bottom: 8px;\n  left: 8px;\n  padding: 2px;\n  position: absolute;\n}\n\n.ol-scale-line-inner {\n  border: 1px solid var(--ol-subtle-foreground-color);\n  border-top: none;\n  color: var(--ol-foreground-color);\n  font-size: 10px;\n  text-align: center;\n  margin: 1px;\n  will-change: contents, width;\n  transition: all 0.25s;\n}\n\n.ol-scale-bar {\n  position: absolute;\n  bottom: 8px;\n  left: 8px;\n}\n\n.ol-scale-bar-inner {\n  display: flex;\n}\n\n.ol-scale-step-marker {\n  width: 1px;\n  height: 15px;\n  background-color: var(--ol-foreground-color);\n  float: right;\n  z-index: 10;\n}\n\n.ol-scale-step-text {\n  position: absolute;\n  bottom: -5px;\n  font-size: 10px;\n  z-index: 11;\n  color: var(--ol-foreground-color);\n  text-shadow: -1.5px 0 var(--ol-partial-background-color), 0 1.5px var(--ol-partial-background-color), 1.5px 0 var(--ol-partial-background-color), 0 -1.5px var(--ol-partial-background-color);\n}\n\n.ol-scale-text {\n  position: absolute;\n  font-size: 12px;\n  text-align: center;\n  bottom: 25px;\n  color: var(--ol-foreground-color);\n  text-shadow: -1.5px 0 var(--ol-partial-background-color), 0 1.5px var(--ol-partial-background-color), 1.5px 0 var(--ol-partial-background-color), 0 -1.5px var(--ol-partial-background-color);\n}\n\n.ol-scale-singlebar {\n  position: relative;\n  height: 10px;\n  z-index: 9;\n  box-sizing: border-box;\n  border: 1px solid var(--ol-foreground-color);\n}\n\n.ol-scale-singlebar-even {\n  background-color: var(--ol-subtle-foreground-color);\n}\n\n.ol-scale-singlebar-odd {\n  background-color: var(--ol-background-color);\n}\n\n.ol-unsupported {\n  display: none;\n}\n\n.ol-viewport,\n.ol-unselectable {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n}\n\n.ol-viewport canvas {\n  all: unset;\n  overflow: hidden;\n}\n\n.ol-viewport {\n  touch-action: pan-x pan-y;\n}\n\n.ol-selectable {\n  -webkit-touch-callout: default;\n  -webkit-user-select: text;\n  -moz-user-select: text;\n  user-select: text;\n}\n\n.ol-grabbing {\n  cursor: -webkit-grabbing;\n  cursor: -moz-grabbing;\n  cursor: grabbing;\n}\n\n.ol-grab {\n  cursor: move;\n  cursor: -webkit-grab;\n  cursor: -moz-grab;\n  cursor: grab;\n}\n\n.ol-control {\n  position: absolute;\n  background-color: var(--ol-subtle-background-color);\n  border-radius: 4px;\n}\n\n.ol-zoom {\n  top: .5em;\n  left: .5em;\n}\n\n.ol-rotate {\n  top: .5em;\n  right: .5em;\n  transition: opacity .25s linear, visibility 0s linear;\n}\n\n.ol-rotate.ol-hidden {\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity .25s linear, visibility 0s linear .25s;\n}\n\n.ol-zoom-extent {\n  top: 4.643em;\n  left: .5em;\n}\n\n.ol-full-screen {\n  right: .5em;\n  top: .5em;\n}\n\n.ol-control button {\n  display: block;\n  margin: 1px;\n  padding: 0;\n  color: var(--ol-subtle-foreground-color);\n  font-weight: bold;\n  text-decoration: none;\n  font-size: inherit;\n  text-align: center;\n  height: 1.375em;\n  width: 1.375em;\n  line-height: .4em;\n  background-color: var(--ol-background-color);\n  border: none;\n  border-radius: 2px;\n}\n\n.ol-control button::-moz-focus-inner {\n  border: none;\n  padding: 0;\n}\n\n.ol-zoom-extent button {\n  line-height: 1.4em;\n}\n\n.ol-compass {\n  display: block;\n  font-weight: normal;\n  will-change: transform;\n}\n\n.ol-touch .ol-control button {\n  font-size: 1.5em;\n}\n\n.ol-touch .ol-zoom-extent {\n  top: 5.5em;\n}\n\n.ol-control button:hover,\n.ol-control button:focus {\n  text-decoration: none;\n  outline: 1px solid var(--ol-subtle-foreground-color);\n  color: var(--ol-foreground-color);\n}\n\n.ol-zoom .ol-zoom-in {\n  border-radius: 2px 2px 0 0;\n}\n\n.ol-zoom .ol-zoom-out {\n  border-radius: 0 0 2px 2px;\n}\n\n.ol-attribution {\n  text-align: right;\n  bottom: .5em;\n  right: .5em;\n  max-width: calc(100% - 1.3em);\n  display: flex;\n  flex-flow: row-reverse;\n  align-items: center;\n}\n\n.ol-attribution a {\n  color: var(--ol-subtle-foreground-color);\n  text-decoration: none;\n}\n\n.ol-attribution ul {\n  margin: 0;\n  padding: 1px .5em;\n  color: var(--ol-foreground-color);\n  text-shadow: 0 0 2px var(--ol-background-color);\n  font-size: 12px;\n}\n\n.ol-attribution li {\n  display: inline;\n  list-style: none;\n}\n\n.ol-attribution li:not(:last-child):after {\n  content: " ";\n}\n\n.ol-attribution img {\n  max-height: 2em;\n  max-width: inherit;\n  vertical-align: middle;\n}\n\n.ol-attribution button {\n  flex-shrink: 0;\n}\n\n.ol-attribution.ol-collapsed ul {\n  display: none;\n}\n\n.ol-attribution:not(.ol-collapsed) {\n  background: var(--ol-partial-background-color);\n}\n\n.ol-attribution.ol-uncollapsible {\n  bottom: 0;\n  right: 0;\n  border-radius: 4px 0 0;\n}\n\n.ol-attribution.ol-uncollapsible img {\n  margin-top: -.2em;\n  max-height: 1.6em;\n}\n\n.ol-attribution.ol-uncollapsible button {\n  display: none;\n}\n\n.ol-zoomslider {\n  top: 4.5em;\n  left: .5em;\n  height: 200px;\n}\n\n.ol-zoomslider button {\n  position: relative;\n  height: 10px;\n}\n\n.ol-touch .ol-zoomslider {\n  top: 5.5em;\n}\n\n.ol-overviewmap {\n  left: 0.5em;\n  bottom: 0.5em;\n}\n\n.ol-overviewmap.ol-uncollapsible {\n  bottom: 0;\n  left: 0;\n  border-radius: 0 4px 0 0;\n}\n\n.ol-overviewmap .ol-overviewmap-map,\n.ol-overviewmap button {\n  display: block;\n}\n\n.ol-overviewmap .ol-overviewmap-map {\n  border: 1px solid var(--ol-subtle-foreground-color);\n  height: 150px;\n  width: 150px;\n}\n\n.ol-overviewmap:not(.ol-collapsed) button {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n}\n\n.ol-overviewmap.ol-collapsed .ol-overviewmap-map,\n.ol-overviewmap.ol-uncollapsible button {\n  display: none;\n}\n\n.ol-overviewmap:not(.ol-collapsed) {\n  background: var(--ol-subtle-background-color);\n}\n\n.ol-overviewmap-box {\n  border: 1.5px dotted var(--ol-subtle-foreground-color);\n}\n\n.ol-overviewmap .ol-overviewmap-box:hover {\n  cursor: move;\n}\n\n.ol-overviewmap .ol-viewport:hover {\n  cursor: pointer;\n}\n',""]);const a=s},5045:(t,e,n)=>{var o=n(5072),r=n.n(o),i=n(7825),s=n.n(i),a=n(7659),l=n.n(a),d=n(5056),h=n.n(d),u=n(540),c=n.n(u),p=n(1113),g=n.n(p),f=n(4096),b={};b.styleTagTransform=g(),b.setAttributes=h(),b.insert=l().bind(null,"head"),b.domAPI=s(),b.insertStyleElement=c(),r()(f.A,b),f.A&&f.A.locals&&f.A.locals},8217:(t,e,n)=>{n.d(e,{Ay:()=>f,Bs:()=>w,hX:()=>b,te:()=>x});var o=n(6717),r=n(4778),i=n(4294),s=n(1217),a=n(1064),l=n(503),d=n(6702),h=n(2871),u=n(4338),c=n(4087),p=n(3407),g=n(3402);const f=class{constructor(){this.dataProjection=void 0,this.defaultFeatureProjection=void 0,this.featureClass=o.A,this.supportedMediaTypes=null}getReadOptions(t,e){if(e){let n=e.dataProjection?(0,p.Jt)(e.dataProjection):this.readProjection(t);e.extent&&n&&"tile-pixels"===n.getUnits()&&(n=(0,p.Jt)(n),n.setWorldExtent(e.extent)),e={dataProjection:n,featureProjection:e.featureProjection}}return this.adaptOptions(e)}adaptOptions(t){return Object.assign({dataProjection:this.dataProjection,featureProjection:this.defaultFeatureProjection,featureClass:this.featureClass},t)}getType(){return(0,c.b0)()}readFeature(t,e){return(0,c.b0)()}readFeatures(t,e){return(0,c.b0)()}readGeometry(t,e){return(0,c.b0)()}readProjection(t){return(0,c.b0)()}writeFeature(t,e){return(0,c.b0)()}writeFeatures(t,e){return(0,c.b0)()}writeGeometry(t,e){return(0,c.b0)()}};function b(t,e,n){const o=n?(0,p.Jt)(n.featureProjection):null,r=n?(0,p.Jt)(n.dataProjection):null;let i=t;if(o&&r&&!(0,p.tI)(o,r)){e&&(i=t.clone());const n=e?o:r,s=e?r:o;"tile-pixels"===n.getUnits()?i.transform(n,s):i.applyTransform((0,p.RG)(n,s))}if(e&&n&&void 0!==n.decimals){const e=Math.pow(10,n.decimals),o=function(t){for(let n=0,o=t.length;n<o;++n)t[n]=Math.round(t[n]*e)/e;return t};i===t&&(i=t.clone()),i.applyTransform(o)}return i}const m={Point:i.A,LineString:s.A,Polygon:a.Ay,MultiPoint:l.A,MultiLineString:d.A,MultiPolygon:h.A};function w(t,e){const n=t.geometry;if(!n)return[];if(Array.isArray(n))return n.map((e=>w({...t,geometry:e}))).flat();const o="MultiPolygon"===n.type?"Polygon":n.type;if("GeometryCollection"===o||"Circle"===o)throw new Error("Unsupported geometry type: "+o);const i=n.layout.length;return b(new r.Ay(o,"Polygon"===o?function(t,e,n){return Array.isArray(e[0])?((0,g.mb)(t,0,e,n)||(t=t.slice(),(0,g.NK)(t,0,e,n)),t):((0,g.PA)(t,0,e,n)||(t=t.slice(),(0,g.ug)(t,0,e,n)),t)}(n.flatCoordinates,n.ends,i):n.flatCoordinates,n.ends?.flat(),i,t.properties||{},t.id).enableSimplifyTransformed(),!1,e)}function x(t,e){if(!t)return null;if(Array.isArray(t)){const n=t.map((t=>x(t,e)));return new u.A(n)}return b(new(0,m[t.type])(t.flatCoordinates,t.layout,t.ends),!1,e)}},4525:(t,e,n)=>{n.d(e,{A:()=>C});var o=n(8217),r=n(1217),i=n(6702),s=n(503),a=n(2871);const l=4294967296,d=1/l,h="undefined"==typeof TextDecoder?null:new TextDecoder("utf-8");class u{constructor(t=new Uint8Array(16)){this.buf=ArrayBuffer.isView(t)?t:new Uint8Array(t),this.dataView=new DataView(this.buf.buffer),this.pos=0,this.type=0,this.length=this.buf.length}readFields(t,e,n=this.length){for(;this.pos<n;){const n=this.readVarint(),o=n>>3,r=this.pos;this.type=7&n,t(o,e,this),this.pos===r&&this.skip(n)}return e}readMessage(t,e){return this.readFields(t,e,this.readVarint()+this.pos)}readFixed32(){const t=this.dataView.getUint32(this.pos,!0);return this.pos+=4,t}readSFixed32(){const t=this.dataView.getInt32(this.pos,!0);return this.pos+=4,t}readFixed64(){const t=this.dataView.getUint32(this.pos,!0)+this.dataView.getUint32(this.pos+4,!0)*l;return this.pos+=8,t}readSFixed64(){const t=this.dataView.getUint32(this.pos,!0)+this.dataView.getInt32(this.pos+4,!0)*l;return this.pos+=8,t}readFloat(){const t=this.dataView.getFloat32(this.pos,!0);return this.pos+=4,t}readDouble(){const t=this.dataView.getFloat64(this.pos,!0);return this.pos+=8,t}readVarint(t){const e=this.buf;let n,o;return o=e[this.pos++],n=127&o,o<128?n:(o=e[this.pos++],n|=(127&o)<<7,o<128?n:(o=e[this.pos++],n|=(127&o)<<14,o<128?n:(o=e[this.pos++],n|=(127&o)<<21,o<128?n:(o=e[this.pos],n|=(15&o)<<28,function(t,e,n){const o=n.buf;let r,i;if(i=o[n.pos++],r=(112&i)>>4,i<128)return c(t,r,e);if(i=o[n.pos++],r|=(127&i)<<3,i<128)return c(t,r,e);if(i=o[n.pos++],r|=(127&i)<<10,i<128)return c(t,r,e);if(i=o[n.pos++],r|=(127&i)<<17,i<128)return c(t,r,e);if(i=o[n.pos++],r|=(127&i)<<24,i<128)return c(t,r,e);if(i=o[n.pos++],r|=(1&i)<<31,i<128)return c(t,r,e);throw new Error("Expected varint not more than 10 bytes")}(n,t,this)))))}readVarint64(){return this.readVarint(!0)}readSVarint(){const t=this.readVarint();return t%2==1?(t+1)/-2:t/2}readBoolean(){return Boolean(this.readVarint())}readString(){const t=this.readVarint()+this.pos,e=this.pos;return this.pos=t,t-e>=12&&h?h.decode(this.buf.subarray(e,t)):function(t,e,n){let o="",r=e;for(;r<n;){const e=t[r];let i,s,a,l=null,d=e>239?4:e>223?3:e>191?2:1;if(r+d>n)break;1===d?e<128&&(l=e):2===d?(i=t[r+1],128==(192&i)&&(l=(31&e)<<6|63&i,l<=127&&(l=null))):3===d?(i=t[r+1],s=t[r+2],128==(192&i)&&128==(192&s)&&(l=(15&e)<<12|(63&i)<<6|63&s,(l<=2047||l>=55296&&l<=57343)&&(l=null))):4===d&&(i=t[r+1],s=t[r+2],a=t[r+3],128==(192&i)&&128==(192&s)&&128==(192&a)&&(l=(15&e)<<18|(63&i)<<12|(63&s)<<6|63&a,(l<=65535||l>=1114112)&&(l=null))),null===l?(l=65533,d=1):l>65535&&(l-=65536,o+=String.fromCharCode(l>>>10&1023|55296),l=56320|1023&l),o+=String.fromCharCode(l),r+=d}return o}(this.buf,e,t)}readBytes(){const t=this.readVarint()+this.pos,e=this.buf.subarray(this.pos,t);return this.pos=t,e}readPackedVarint(t=[],e){const n=this.readPackedEnd();for(;this.pos<n;)t.push(this.readVarint(e));return t}readPackedSVarint(t=[]){const e=this.readPackedEnd();for(;this.pos<e;)t.push(this.readSVarint());return t}readPackedBoolean(t=[]){const e=this.readPackedEnd();for(;this.pos<e;)t.push(this.readBoolean());return t}readPackedFloat(t=[]){const e=this.readPackedEnd();for(;this.pos<e;)t.push(this.readFloat());return t}readPackedDouble(t=[]){const e=this.readPackedEnd();for(;this.pos<e;)t.push(this.readDouble());return t}readPackedFixed32(t=[]){const e=this.readPackedEnd();for(;this.pos<e;)t.push(this.readFixed32());return t}readPackedSFixed32(t=[]){const e=this.readPackedEnd();for(;this.pos<e;)t.push(this.readSFixed32());return t}readPackedFixed64(t=[]){const e=this.readPackedEnd();for(;this.pos<e;)t.push(this.readFixed64());return t}readPackedSFixed64(t=[]){const e=this.readPackedEnd();for(;this.pos<e;)t.push(this.readSFixed64());return t}readPackedEnd(){return 2===this.type?this.readVarint()+this.pos:this.pos+1}skip(t){const e=7&t;if(0===e)for(;this.buf[this.pos++]>127;);else if(2===e)this.pos=this.readVarint()+this.pos;else if(5===e)this.pos+=4;else{if(1!==e)throw new Error(`Unimplemented type: ${e}`);this.pos+=8}}writeTag(t,e){this.writeVarint(t<<3|e)}realloc(t){let e=this.length||16;for(;e<this.pos+t;)e*=2;if(e!==this.length){const t=new Uint8Array(e);t.set(this.buf),this.buf=t,this.dataView=new DataView(t.buffer),this.length=e}}finish(){return this.length=this.pos,this.pos=0,this.buf.subarray(0,this.length)}writeFixed32(t){this.realloc(4),this.dataView.setInt32(this.pos,t,!0),this.pos+=4}writeSFixed32(t){this.realloc(4),this.dataView.setInt32(this.pos,t,!0),this.pos+=4}writeFixed64(t){this.realloc(8),this.dataView.setInt32(this.pos,-1&t,!0),this.dataView.setInt32(this.pos+4,Math.floor(t*d),!0),this.pos+=8}writeSFixed64(t){this.realloc(8),this.dataView.setInt32(this.pos,-1&t,!0),this.dataView.setInt32(this.pos+4,Math.floor(t*d),!0),this.pos+=8}writeVarint(t){(t=+t||0)>268435455||t<0?function(t,e){let n,o;if(t>=0?(n=t%4294967296|0,o=t/4294967296|0):(n=~(-t%4294967296),o=~(-t/4294967296),4294967295^n?n=n+1|0:(n=0,o=o+1|0)),t>=0x10000000000000000||t<-0x10000000000000000)throw new Error("Given varint doesn't fit into 10 bytes");e.realloc(10),function(t,e,n){n.buf[n.pos++]=127&t|128,t>>>=7,n.buf[n.pos++]=127&t|128,t>>>=7,n.buf[n.pos++]=127&t|128,t>>>=7,n.buf[n.pos++]=127&t|128,t>>>=7,n.buf[n.pos]=127&t}(n,0,e),function(t,e){const n=(7&t)<<4;e.buf[e.pos++]|=n|((t>>>=3)?128:0),t&&(e.buf[e.pos++]=127&t|((t>>>=7)?128:0),t&&(e.buf[e.pos++]=127&t|((t>>>=7)?128:0),t&&(e.buf[e.pos++]=127&t|((t>>>=7)?128:0),t&&(e.buf[e.pos++]=127&t|((t>>>=7)?128:0),t&&(e.buf[e.pos++]=127&t)))))}(o,e)}(t,this):(this.realloc(4),this.buf[this.pos++]=127&t|(t>127?128:0),t<=127||(this.buf[this.pos++]=127&(t>>>=7)|(t>127?128:0),t<=127||(this.buf[this.pos++]=127&(t>>>=7)|(t>127?128:0),t<=127||(this.buf[this.pos++]=t>>>7&127))))}writeSVarint(t){this.writeVarint(t<0?2*-t-1:2*t)}writeBoolean(t){this.writeVarint(+t)}writeString(t){t=String(t),this.realloc(4*t.length),this.pos++;const e=this.pos;this.pos=function(t,e,n){for(let o,r,i=0;i<e.length;i++){if(o=e.charCodeAt(i),o>55295&&o<57344){if(!r){o>56319||i+1===e.length?(t[n++]=239,t[n++]=191,t[n++]=189):r=o;continue}if(o<56320){t[n++]=239,t[n++]=191,t[n++]=189,r=o;continue}o=r-55296<<10|o-56320|65536,r=null}else r&&(t[n++]=239,t[n++]=191,t[n++]=189,r=null);o<128?t[n++]=o:(o<2048?t[n++]=o>>6|192:(o<65536?t[n++]=o>>12|224:(t[n++]=o>>18|240,t[n++]=o>>12&63|128),t[n++]=o>>6&63|128),t[n++]=63&o|128)}return n}(this.buf,t,this.pos);const n=this.pos-e;n>=128&&p(e,n,this),this.pos=e-1,this.writeVarint(n),this.pos+=n}writeFloat(t){this.realloc(4),this.dataView.setFloat32(this.pos,t,!0),this.pos+=4}writeDouble(t){this.realloc(8),this.dataView.setFloat64(this.pos,t,!0),this.pos+=8}writeBytes(t){const e=t.length;this.writeVarint(e),this.realloc(e);for(let n=0;n<e;n++)this.buf[this.pos++]=t[n]}writeRawMessage(t,e){this.pos++;const n=this.pos;t(e,this);const o=this.pos-n;o>=128&&p(n,o,this),this.pos=n-1,this.writeVarint(o),this.pos+=o}writeMessage(t,e,n){this.writeTag(t,2),this.writeRawMessage(e,n)}writePackedVarint(t,e){e.length&&this.writeMessage(t,g,e)}writePackedSVarint(t,e){e.length&&this.writeMessage(t,f,e)}writePackedBoolean(t,e){e.length&&this.writeMessage(t,w,e)}writePackedFloat(t,e){e.length&&this.writeMessage(t,b,e)}writePackedDouble(t,e){e.length&&this.writeMessage(t,m,e)}writePackedFixed32(t,e){e.length&&this.writeMessage(t,x,e)}writePackedSFixed32(t,e){e.length&&this.writeMessage(t,y,e)}writePackedFixed64(t,e){e.length&&this.writeMessage(t,v,e)}writePackedSFixed64(t,e){e.length&&this.writeMessage(t,k,e)}writeBytesField(t,e){this.writeTag(t,2),this.writeBytes(e)}writeFixed32Field(t,e){this.writeTag(t,5),this.writeFixed32(e)}writeSFixed32Field(t,e){this.writeTag(t,5),this.writeSFixed32(e)}writeFixed64Field(t,e){this.writeTag(t,1),this.writeFixed64(e)}writeSFixed64Field(t,e){this.writeTag(t,1),this.writeSFixed64(e)}writeVarintField(t,e){this.writeTag(t,0),this.writeVarint(e)}writeSVarintField(t,e){this.writeTag(t,0),this.writeSVarint(e)}writeStringField(t,e){this.writeTag(t,2),this.writeString(e)}writeFloatField(t,e){this.writeTag(t,5),this.writeFloat(e)}writeDoubleField(t,e){this.writeTag(t,1),this.writeDouble(e)}writeBooleanField(t,e){this.writeVarintField(t,+e)}}function c(t,e,n){return n?4294967296*e+(t>>>0):4294967296*(e>>>0)+(t>>>0)}function p(t,e,n){const o=e<=16383?1:e<=2097151?2:e<=268435455?3:Math.floor(Math.log(e)/(7*Math.LN2));n.realloc(o);for(let e=n.pos-1;e>=t;e--)n.buf[e+o]=n.buf[e]}function g(t,e){for(let n=0;n<t.length;n++)e.writeVarint(t[n])}function f(t,e){for(let n=0;n<t.length;n++)e.writeSVarint(t[n])}function b(t,e){for(let n=0;n<t.length;n++)e.writeFloat(t[n])}function m(t,e){for(let n=0;n<t.length;n++)e.writeDouble(t[n])}function w(t,e){for(let n=0;n<t.length;n++)e.writeBoolean(t[n])}function x(t,e){for(let n=0;n<t.length;n++)e.writeFixed32(t[n])}function y(t,e){for(let n=0;n<t.length;n++)e.writeSFixed32(t[n])}function v(t,e){for(let n=0;n<t.length;n++)e.writeFixed64(t[n])}function k(t,e){for(let n=0;n<t.length;n++)e.writeSFixed64(t[n])}var F=n(4294),P=n(1064),V=n(5286),S=n(4778),_=n(3407),A=n(3402);class z extends o.Ay{constructor(t){super(),t=t||{},this.dataProjection=new V.A({code:"",units:"tile-pixels"}),this.featureClass=t.featureClass?t.featureClass:S.Ay,this.geometryName_=t.geometryName,this.layerName_=t.layerName?t.layerName:"layer",this.layers_=t.layers?t.layers:null,this.idProperty_=t.idProperty,this.supportedMediaTypes=["application/vnd.mapbox-vector-tile","application/x-protobuf"]}readRawGeometry_(t,e,n,o){t.pos=e.geometry;const r=t.readVarint()+t.pos;let i=1,s=0,a=0,l=0,d=0,h=0;for(;t.pos<r;){if(!s){const e=t.readVarint();i=7&e,s=e>>3}if(s--,1===i||2===i)a+=t.readSVarint(),l+=t.readSVarint(),1===i&&d>h&&(o.push(d),h=d),n.push(a,l),d+=2;else{if(7!==i)throw new Error("Invalid command found in the PBF");d>h&&(n.push(n[h],n[h+1]),d+=2)}}d>h&&(o.push(d),h=d)}createFeature_(t,e,n){const l=e.type;if(0===l)return null;let d;const h=e.properties;let u;this.idProperty_?(u=h[this.idProperty_],delete h[this.idProperty_]):u=e.id,h[this.layerName_]=e.layer.name;const c=[],p=[];this.readRawGeometry_(t,e,c,p);const g=function(t,e){let n;return 1===t?n=1===e?"Point":"MultiPoint":2===t?n=1===e?"LineString":"MultiLineString":3===t&&(n="Polygon"),n}(l,p.length);if(this.featureClass===S.Ay)d=new this.featureClass(g,c,p,2,h,u),d.transform(n.dataProjection);else{let t;if("Polygon"==g){const e=(0,A.yJ)(c,p);t=e.length>1?new a.A(c,"XY",e):new P.Ay(c,"XY",p)}else t="Point"===g?new F.A(c,"XY"):"LineString"===g?new r.A(c,"XY"):"MultiPoint"===g?new s.A(c,"XY"):"MultiLineString"===g?new i.A(c,"XY",p):null;d=new(0,this.featureClass),this.geometryName_&&d.setGeometryName(this.geometryName_);const e=(0,o.hX)(t,!1,n);d.setGeometry(e),void 0!==u&&d.setId(u),d.setProperties(h,!0)}return d}getType(){return"arraybuffer"}readFeatures(t,e){const n=this.layers_;e=this.adaptOptions(e);const o=(0,_.Jt)(e.dataProjection);o.setWorldExtent(e.extent),e.dataProjection=o;const r=new u(t),i=r.readFields(M,{}),s=[];for(const t in i){if(n&&!n.includes(t))continue;const a=i[t],l=a?[0,0,a.extent,a.extent]:null;o.setExtent(l);for(let t=0,n=a.length;t<n;++t){const n=E(r,a,t),o=this.createFeature_(r,n,e);null!==o&&s.push(o)}}return s}readProjection(t){return this.dataProjection}setLayers(t){this.layers_=t}}function M(t,e,n){if(3===t){const t={keys:[],values:[],features:[]},o=n.readVarint()+n.pos;n.readFields(T,t,o),t.length=t.features.length,t.length&&(e[t.name]=t)}}function T(t,e,n){if(15===t)e.version=n.readVarint();else if(1===t)e.name=n.readString();else if(5===t)e.extent=n.readVarint();else if(2===t)e.features.push(n.pos);else if(3===t)e.keys.push(n.readString());else if(4===t){let o=null;const r=n.readVarint()+n.pos;for(;n.pos<r;)o=1==(t=n.readVarint()>>3)?n.readString():2===t?n.readFloat():3===t?n.readDouble():4===t?n.readVarint64():5===t?n.readVarint():6===t?n.readSVarint():7===t?n.readBoolean():null;e.values.push(o)}}function j(t,e,n){if(1==t)e.id=n.readVarint();else if(2==t){const t=n.readVarint()+n.pos;for(;n.pos<t;){const t=e.layer.keys[n.readVarint()],o=e.layer.values[n.readVarint()];e.properties[t]=o}}else 3==t?e.type=n.readVarint():4==t&&(e.geometry=n.pos)}function E(t,e,n){t.pos=e.features[n];const o=t.readVarint()+t.pos,r={layer:e,type:0,properties:{}};return t.readFields(j,r,o),r}const C=z},5042:(t,e,n)=>{n.d(e,{A:()=>l});var o=n(702),r=n(7896);const i={stamen_terrain:{extension:"png"},stamen_terrain_background:{extension:"png"},stamen_terrain_labels:{extension:"png"},stamen_terrain_lines:{extension:"png"},stamen_toner_background:{extension:"png"},stamen_toner:{extension:"png"},stamen_toner_labels:{extension:"png"},stamen_toner_lines:{extension:"png"},stamen_toner_lite:{extension:"png"},stamen_watercolor:{extension:"jpg"},alidade_smooth:{extension:"png"},alidade_smooth_dark:{extension:"png"},alidade_satellite:{extension:"png"},outdoors:{extension:"png"},osm_bright:{extension:"png"}},s={stamen_terrain:{minZoom:0,maxZoom:18,retina:!0},stamen_toner:{minZoom:0,maxZoom:20,retina:!0},stamen_watercolor:{minZoom:1,maxZoom:18,retina:!1}};class a extends o.A{constructor(t){const e=t.layer.indexOf("-"),n=-1==e?t.layer:t.layer.slice(0,e),o=s[n]||{minZoom:0,maxZoom:20,retina:!0},a=i[t.layer],l=t.apiKey?"?api_key="+t.apiKey:"",d=o.retina&&t.retina?"@2x":"",h=void 0!==t.url?t.url:"https://tiles.stadiamaps.com/tiles/"+t.layer+"/{z}/{x}/{y}"+d+"."+a.extension+l,u=['&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a>','&copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a>',r.o];t.layer.startsWith("stamen_")&&u.splice(1,0,'&copy; <a href="https://stamen.com/" target="_blank">Stamen Design</a>'),super({attributions:u,cacheSize:t.cacheSize,crossOrigin:"anonymous",interpolate:t.interpolate,maxZoom:void 0!==t.maxZoom?t.maxZoom:o.maxZoom,minZoom:void 0!==t.minZoom?t.minZoom:o.minZoom,reprojectionErrorThreshold:t.reprojectionErrorThreshold,tileLoadFunction:t.tileLoadFunction,transition:t.transition,url:h,tilePixelRatio:d?2:1,wrapX:t.wrapX,zDirection:t.zDirection})}}const l=a}}]);