(()=>{"use strict";var e,t,r={7985:(e,t,r)=>{var n=r(9523);const o={};var s=r(9663),i=r(8595);const a={};n.Yz.threads("SQLite worker started"),globalThis.onmessage=({data:e})=>{n.Yz.threads("SQLite received green light",e);const t=e;r.e(4025).then(r.bind(r,4025)).then((e=>e.default())).then((e=>{n.Yz.threads("SQLite init"),e.initWorker1API(),"object"==typeof t.httpChannel?function(e,t,r){if("undefined"==typeof SharedArrayBuffer)throw new Error('SharedArrayBuffer is not available. If your browser supports it, the webserver must send "Cross-Origin-Opener-Policy: same-origin "and "Cross-Origin-Embedder-Policy: require-corp" headers.');if(!(t&&t.port instanceof MessagePort&&t.shm instanceof SharedArrayBuffer))throw new Error("No backend message channel in options");const s=new Int32Array(t.shm,t.shm.byteLength-Int32Array.BYTES_PER_ELEMENT),i=new Uint8Array(t.shm,0,t.shm.byteLength-Int32Array.BYTES_PER_ELEMENT),a=e.capi,c=e.wasm,u=a.sqlite3_vfs,l=a.sqlite3_file,f=a.sqlite3_io_methods,p=new u,d=new f;p.$iVersion=1,p.$szOsFile=a.sqlite3_file.structInfo.sizeof,p.$mxPathname=1024,p.$zName=c.allocCString("http"),p.$xDlOpen=p.$xDlError=p.$xDlSym=p.$xDlClose=null;const h=e=>{var o;let i,a;Atomics.store(s,0,n.a9.WORKMSG),t.port.postMessage(e);do{i=Atomics.wait(s,0,n.a9.WORKMSG,null!==(o=null==r?void 0:r.timeout)&&void 0!==o?o:n.KQ.timeout),a=Atomics.load(s,0)}while("ok"===i&&a===n.a9.WORKMSG);return"timed-out"===i?(console.error("Backend timeout",i,s,e),-1):a},v={xCheckReservedLock:function(e,t){return n.Yz.vfs("xCheckReservedLock",e,t),c.poke(t,0,"i32"),0},xClose:function(e){return n.Yz.vfs("xClose",e),o[e]?(delete o[e],0):a.SQLITE_NOTFOUND},xDeviceCharacteristics:function(e){return n.Yz.vfs("xDeviceCharacteristics",e),a.SQLITE_IOCAP_IMMUTABLE},xFileControl:function(e,t,r){return n.Yz.vfs("xFileControl",e,t,r),t===a.SQLITE_FCNTL_SYNC?a.SQLITE_OK:a.SQLITE_NOTFOUND},xFileSize:function(e,r){if(n.Yz.vfs("xFileSize",e,r),!o[e])return a.SQLITE_NOTFOUND;if(0!==h({msg:"xFilesize",url:o[e].url}))return a.SQLITE_IOERR;const s=new BigUint64Array(t.shm,0,1)[0];return n.Yz.vfs("file size is ",s),c.poke(r,s,"i64"),0},xLock:function(e,t){return n.Yz.vfs("xLock",e,t),0},xRead:function(e,t,r,s){if(n.Yz.vfs("xRead",e,t,r,s),Number(s)>Number.MAX_SAFE_INTEGER)return a.SQLITE_TOOBIG;if(!o[e])return a.SQLITE_NOTFOUND;const u=h({msg:"xRead",url:o[e].url,n:r,offset:s});return 0!==u?(console.error("xRead",u),a.SQLITE_IOERR):(c.heap8u().set(i.subarray(0,r),t),a.SQLITE_OK)},xSync:function(e,t){return n.Yz.vfs("xSync",e,t),0},xTruncate:function(e,t){return n.Yz.vfs("xTruncate",e,t),0},xUnlock:function(e,t){return n.Yz.vfs("xUnlock",e,t),0},xWrite:function(e,t,r,o){return n.Yz.vfs("xWrite",e,t,r,o),a.SQLITE_READONLY}},E={xAccess:function(e,r,o,s){if(n.Yz.vfs("xAccess",e,r,o,s),!(o&a.SQLITE_OPEN_READONLY))return c.poke(s,0,"i32"),a.SQLITE_OK;const i=c.cstrToJs(r),u=h({msg:"xAccess",url:i});if(0!==u)return console.error("xAccess",u),a.SQLITE_IOERR;const l=new Uint32Array(t.shm,0,1)[0];return c.poke(s,l,"i32"),a.SQLITE_OK},xCurrentTime:function(e,t){return n.Yz.vfs("xCurrentTime",e,t),c.poke(t,2440587.5+(new Date).getTime()/864e5,"double"),0},xCurrentTimeInt64:function(e,t){return n.Yz.vfs("xCurrentTimeInt64",e,t),c.poke(t,BigInt(2440587.5)*BigInt(864e5)+BigInt((new Date).getTime()),"i64"),0},xDelete:function(e,t,r){return n.Yz.vfs("xDelete",e,t,r),a.SQLITE_READONLY},xFullPathname:function(e,t,r,o){return n.Yz.vfs("xFullPathname",e,t,r,o),c.cstrncpy(o,t,r)<r?0:a.SQLITE_CANTOPEN},xGetLastError:function(e,t,r){return n.Yz.vfs("xGetLastError",e,t,r),0},xOpen:function(e,t,r,s,i){if(n.Yz.vfs("xOpen",e,t,r,s,i),0===t)return console.error("HTTP VFS does not support anonymous files"),a.SQLITE_CANTOPEN;if("number"!=typeof t)return a.SQLITE_ERROR;c.poke(i,a.SQLITE_OPEN_READONLY,"i32");const u=c.cstrToJs(t),f=Object.create(null);f.fid=r,f.url=u,f.sq3File=new l(r),f.sq3File.$pMethods=d.pointer,o[r]=f;const p=h({msg:"xOpen",url:u});return p<0?(console.error("xOpen",p),a.SQLITE_IOERR):0!==p?(n.Yz.vfs("xOpen",p),a.SQLITE_CANTOPEN):a.SQLITE_OK}};e.vfs.installVfs({io:{struct:d,methods:v},vfs:{struct:p,methods:E}}),e.oo1.DB.dbCtorHelper.setVfsPostOpenSql(p.pointer,(function(e,t){var o;t.capi.sqlite3_busy_timeout(e,null!==(o=null==r?void 0:r.timeout)&&void 0!==o?o:n.KQ.timeout),t.capi.sqlite3_exec(e,["PRAGMA journal_mode=DELETE;","PRAGMA cache_size=0;"],0,0,0)}))}(e,t.httpChannel,t.httpOptions):!0===t.httpChannel&&(void 0===globalThis.XMLHttpRequest&&(globalThis.XMLHttpRequest=class extends(null){get response(){return Uint8Array.from(this.responseText.split("").map((e=>e.charCodeAt(0)))).buffer}}),function(e,t){const r=e.capi,o=e.wasm,c=r.sqlite3_vfs,u=r.sqlite3_file,l=r.sqlite3_io_methods,f=new c,p=new l;f.$iVersion=1,f.$szOsFile=r.sqlite3_file.structInfo.sizeof,f.$mxPathname=1024,f.$zName=o.allocCString("http"),f.$xDlOpen=f.$xDlError=f.$xDlSym=f.$xDlClose=null;const d={xCheckReservedLock:function(e,t){return n.Yz.vfs("xCheckReservedLock",e,t),o.poke(t,0,"i32"),0},xClose:function(e){return n.Yz.vfs("xClose",e),a[e]?(delete a[e],0):r.SQLITE_NOTFOUND},xDeviceCharacteristics:function(e){return n.Yz.vfs("xDeviceCharacteristics",e),r.SQLITE_IOCAP_IMMUTABLE},xFileControl:function(e,t,o){return n.Yz.vfs("xFileControl",e,t,o),t===r.SQLITE_FCNTL_SYNC?r.SQLITE_OK:r.SQLITE_NOTFOUND},xFileSize:function(e,t){return n.Yz.vfs("xFileSize",e,t),a[e]?(n.Yz.vfs("file size is ",a[e].size),o.poke(t,a[e].size,"i64"),0):r.SQLITE_NOTFOUND},xLock:function(e,t){return n.Yz.vfs("xLock",e,t),0},xRead:function(e,s,c,u){var l,f,p,h;if(n.Yz.vfs("xRead (sync)",e,s,c,u),Number(u)>Number.MAX_SAFE_INTEGER)return r.SQLITE_TOOBIG;if(!a[e])return r.SQLITE_NOTFOUND;const v=a[e];if(!v.pageSize){v.pageSize=1024;const o=new Uint8Array(2),s=d.xRead(e,o,2,BigInt(16)),a=new Uint16Array(o.buffer);if(0!==s)return r.SQLITE_IOERR;if((0,i.l)(a),v.pageSize=a[0],n.Yz.vfs(`page size is ${v.pageSize}`),1024!=v.pageSize&&(console.warn(`Page size for ${v.url} is ${v.pageSize}, recommended size is 1024`),v.pageCache.delete(0)),v.pageSize>(null!==(l=null==t?void 0:t.maxPageSize)&&void 0!==l?l:n.KQ.maxPageSize))throw new Error(`${v.pageSize} is over the maximum configured ${null!==(f=null==t?void 0:t.maxPageSize)&&void 0!==f?f:n.KQ.maxPageSize}`)}try{const e=BigInt(v.pageSize),i=BigInt(c),a=u/e;a*e!==u&&n.Yz.vfs(`Read chunk ${u} is not page-aligned`);let l=a*e;if(l+e<u+i)throw new Error(`Read chunk ${u}:${c} spans across a page-boundary`);let f=v.pageCache.get(Number(a));if("number"==typeof f){n.Yz.cache(`[sync] cache hit (multi-page segment) for ${v.url}:${a}`);const t=BigInt(f)*e;f=v.pageCache.get(f),f instanceof Uint8Array?l=t:f=void 0}if(void 0===f){n.Yz.cache(`[sync] cache miss for ${v.url}:${a}`);let e=v.pageSize,o=a>0&&v.pageCache.get(Number(a)-1);o&&("number"==typeof o&&(o=v.pageCache.get(o)),o instanceof Uint8Array&&(e=2*o.byteLength,n.Yz.cache(`[sync] downloading super page of size ${e}`)));const s=e/v.pageSize;n.Yz.http(`downloading page ${a} of size ${e} starting at ${l}`);const i=new XMLHttpRequest;i.open("GET",v.url,!1);for(const e of Object.keys(null!==(p=null==t?void 0:t.headers)&&void 0!==p?p:n.KQ.headers))i.setRequestHeader(e,(null!==(h=null==t?void 0:t.headers)&&void 0!==h?h:n.KQ.headers)[e]);if(i.setRequestHeader("Range",`bytes=${l}-${l+BigInt(e-1)}`),i.responseType="arraybuffer",i.onload=()=>{i.response instanceof ArrayBuffer&&(f=new Uint8Array(i.response))},i.send(),!f)return r.SQLITE_IOERR;if(!(f instanceof Uint8Array)||0===f.length)throw new Error(`Invalid HTTP response received: ${JSON.stringify(i.response)}`);v.pageCache.set(Number(a),f);for(let e=Number(a)+1;e<Number(a)+s;e++)v.pageCache.set(e,Number(a))}else n.Yz.cache(`[sync] cache hit for ${v.url}:${a}`);const d=Number(u-l);return s instanceof Uint8Array?s.set(f.subarray(d,d+c)):o.heap8u().set(f.subarray(d,d+c),s),r.SQLITE_OK}catch(e){return console.error(e),r.SQLITE_ERROR}},xSync:function(e,t){return n.Yz.vfs("xSync",e,t),0},xTruncate:function(e,t){return n.Yz.vfs("xTruncate",e,t),0},xUnlock:function(e,t){return n.Yz.vfs("xUnlock",e,t),0},xWrite:function(e,t,o,s){return n.Yz.vfs("xWrite",e,t,o,s),r.SQLITE_READONLY}},h={xAccess:function(e,t,s,i){if(n.Yz.vfs("xAccess",e,t,s,i),!(s&r.SQLITE_OPEN_READONLY))return o.poke(i,0,"i32"),r.SQLITE_OK;const a=Symbol();return h.xOpen(e,t,a,s,i)===r.SQLITE_OK?(d.xClose(a),o.poke(i,1,"i32")):o.poke(i,0,"i32"),r.SQLITE_OK},xCurrentTime:function(e,t){return n.Yz.vfs("xCurrentTime",e,t),o.poke(t,2440587.5+(new Date).getTime()/864e5,"double"),0},xCurrentTimeInt64:function(e,t){return n.Yz.vfs("xCurrentTimeInt64",e,t),o.poke(t,BigInt(2440587.5)*BigInt(864e5)+BigInt((new Date).getTime()),"i64"),0},xDelete:function(e,t,o){return n.Yz.vfs("xDelete",e,t,o),r.SQLITE_READONLY},xFullPathname:function(e,t,s,i){return n.Yz.vfs("xFullPathname",e,t,s,i),o.cstrncpy(i,t,s)<s?0:r.SQLITE_CANTOPEN},xGetLastError:function(e,t,r){return n.Yz.vfs("xGetLastError",e,t,r),0},xOpen:function(e,i,c,l,f){var d,h;if(n.Yz.vfs("xOpen (sync)",e,i,c,l,f),0===i)return console.error("HTTP VFS does not support anonymous files"),r.SQLITE_CANTOPEN;if("number"!=typeof i)return r.SQLITE_ERROR;const v=o.cstrToJs(i);let E=!1;try{const e=new XMLHttpRequest;e.open("HEAD",v,!1);for(const r of Object.keys(null!==(d=null==t?void 0:t.headers)&&void 0!==d?d:n.KQ.headers))e.setRequestHeader(r,(null!==(h=null==t?void 0:t.headers)&&void 0!==h?h:n.KQ.headers)[r]);e.onload=()=>{var r,o;const i=Object.create(null);i.fid=c,i.url=v,i.sq3File=new u(c),i.sq3File.$pMethods=p.pointer,i.size=BigInt(null!==(r=e.getResponseHeader("Content-Length"))&&void 0!==r?r:0),i.pageCache=new s.A({maxSize:1024*(null!==(o=null==t?void 0:t.cacheSize)&&void 0!==o?o:n.KQ.cacheSize),sizeCalculation:e=>{var t;return null!==(t=e.byteLength)&&void 0!==t?t:4}}),"bytes"!==e.getResponseHeader("Accept-Ranges")&&console.warn(`Server for ${v} does not advertise 'Accept-Ranges'. If the server supports it, in order to remove this message, add "Accept-Ranges: bytes". Additionally, if using CORS, add "Access-Control-Expose-Headers: *".`),a[c]=i,E=!0},e.send()}catch(e){console.error("xOpen",e)}return E?(o.poke(f,r.SQLITE_OPEN_READONLY,"i32"),r.SQLITE_OK):(console.error("xOpen"),r.SQLITE_CANTOPEN)}};e.vfs.installVfs({io:{struct:p,methods:d},vfs:{struct:f,methods:h}}),e.oo1.DB.dbCtorHelper.setVfsPostOpenSql(f.pointer,(function(e,r){var o;r.capi.sqlite3_busy_timeout(e,null!==(o=null==t?void 0:t.timeout)&&void 0!==o?o:n.KQ.timeout),r.capi.sqlite3_exec(e,["PRAGMA journal_mode=DELETE;","PRAGMA cache_size=0;"],0,0,0)}))}(e,t.httpOptions))}))}}},n={};function o(e){var t=n[e];if(void 0!==t)return t.exports;var s=n[e]={exports:{}};return r[e](s,s.exports,o),s.exports}o.m=r,o.x=()=>{var e=o.O(void 0,[1917],(()=>o(7985)));return o.O(e)},e=[],o.O=(t,r,n,s)=>{if(!r){var i=1/0;for(l=0;l<e.length;l++){for(var[r,n,s]=e[l],a=!0,c=0;c<r.length;c++)(!1&s||i>=s)&&Object.keys(o.O).every((e=>o.O[e](r[c])))?r.splice(c--,1):(a=!1,s<i&&(i=s));if(a){e.splice(l--,1);var u=n();void 0!==u&&(t=u)}}return t}s=s||0;for(var l=e.length;l>0&&e[l-1][2]>s;l--)e[l]=e[l-1];e[l]=[r,n,s]},o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.f={},o.e=e=>Promise.all(Object.keys(o.f).reduce(((t,r)=>(o.f[r](e,t),t)),[])),o.u=e=>e+".bundle.js",o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;o.g.importScripts&&(e=o.g.location+"");var t=o.g.document;if(!e&&t&&(t.currentScript&&"SCRIPT"===t.currentScript.tagName.toUpperCase()&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");if(r.length)for(var n=r.length-1;n>-1&&(!e||!/^http(s?):/.test(e));)e=r[n--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),o.p=e})(),(()=>{o.b=self.location+"";var e={7985:1};o.f.i=(t,r)=>{e[t]||importScripts(o.p+o.u(t))};var t=self.webpackChunkrlayers=self.webpackChunkrlayers||[],r=t.push.bind(t);t.push=t=>{var[n,s,i]=t;for(var a in s)o.o(s,a)&&(o.m[a]=s[a]);for(i&&i(o);n.length;)e[n.pop()]=1;r(t)}})(),t=o.x,o.x=()=>o.e(1917).then(t),o.x()})();