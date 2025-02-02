(self.webpackChunkrlayers=self.webpackChunkrlayers||[]).push([[4012],{4096:(n,o,e)=>{"use strict";e.d(o,{A:()=>i});var l=e(1601),t=e.n(l),r=e(6314),a=e.n(r)()(t());a.push([n.id,':root,\n:host {\n  --ol-background-color: white;\n  --ol-accent-background-color: #F5F5F5;\n  --ol-subtle-background-color: rgba(128, 128, 128, 0.25);\n  --ol-partial-background-color: rgba(255, 255, 255, 0.75);\n  --ol-foreground-color: #333333;\n  --ol-subtle-foreground-color: #666666;\n  --ol-brand-color: #00AAFF;\n}\n\n.ol-box {\n  box-sizing: border-box;\n  border-radius: 2px;\n  border: 1.5px solid var(--ol-background-color);\n  background-color: var(--ol-partial-background-color);\n}\n\n.ol-mouse-position {\n  top: 8px;\n  right: 8px;\n  position: absolute;\n}\n\n.ol-scale-line {\n  background: var(--ol-partial-background-color);\n  border-radius: 4px;\n  bottom: 8px;\n  left: 8px;\n  padding: 2px;\n  position: absolute;\n}\n\n.ol-scale-line-inner {\n  border: 1px solid var(--ol-subtle-foreground-color);\n  border-top: none;\n  color: var(--ol-foreground-color);\n  font-size: 10px;\n  text-align: center;\n  margin: 1px;\n  will-change: contents, width;\n  transition: all 0.25s;\n}\n\n.ol-scale-bar {\n  position: absolute;\n  bottom: 8px;\n  left: 8px;\n}\n\n.ol-scale-bar-inner {\n  display: flex;\n}\n\n.ol-scale-step-marker {\n  width: 1px;\n  height: 15px;\n  background-color: var(--ol-foreground-color);\n  float: right;\n  z-index: 10;\n}\n\n.ol-scale-step-text {\n  position: absolute;\n  bottom: -5px;\n  font-size: 10px;\n  z-index: 11;\n  color: var(--ol-foreground-color);\n  text-shadow: -1.5px 0 var(--ol-partial-background-color), 0 1.5px var(--ol-partial-background-color), 1.5px 0 var(--ol-partial-background-color), 0 -1.5px var(--ol-partial-background-color);\n}\n\n.ol-scale-text {\n  position: absolute;\n  font-size: 12px;\n  text-align: center;\n  bottom: 25px;\n  color: var(--ol-foreground-color);\n  text-shadow: -1.5px 0 var(--ol-partial-background-color), 0 1.5px var(--ol-partial-background-color), 1.5px 0 var(--ol-partial-background-color), 0 -1.5px var(--ol-partial-background-color);\n}\n\n.ol-scale-singlebar {\n  position: relative;\n  height: 10px;\n  z-index: 9;\n  box-sizing: border-box;\n  border: 1px solid var(--ol-foreground-color);\n}\n\n.ol-scale-singlebar-even {\n  background-color: var(--ol-subtle-foreground-color);\n}\n\n.ol-scale-singlebar-odd {\n  background-color: var(--ol-background-color);\n}\n\n.ol-unsupported {\n  display: none;\n}\n\n.ol-viewport,\n.ol-unselectable {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n}\n\n.ol-viewport canvas {\n  all: unset;\n  overflow: hidden;\n}\n\n.ol-viewport {\n  touch-action: pan-x pan-y;\n}\n\n.ol-selectable {\n  -webkit-touch-callout: default;\n  -webkit-user-select: text;\n  -moz-user-select: text;\n  user-select: text;\n}\n\n.ol-grabbing {\n  cursor: -webkit-grabbing;\n  cursor: -moz-grabbing;\n  cursor: grabbing;\n}\n\n.ol-grab {\n  cursor: move;\n  cursor: -webkit-grab;\n  cursor: -moz-grab;\n  cursor: grab;\n}\n\n.ol-control {\n  position: absolute;\n  background-color: var(--ol-subtle-background-color);\n  border-radius: 4px;\n}\n\n.ol-zoom {\n  top: .5em;\n  left: .5em;\n}\n\n.ol-rotate {\n  top: .5em;\n  right: .5em;\n  transition: opacity .25s linear, visibility 0s linear;\n}\n\n.ol-rotate.ol-hidden {\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity .25s linear, visibility 0s linear .25s;\n}\n\n.ol-zoom-extent {\n  top: 4.643em;\n  left: .5em;\n}\n\n.ol-full-screen {\n  right: .5em;\n  top: .5em;\n}\n\n.ol-control button {\n  display: block;\n  margin: 1px;\n  padding: 0;\n  color: var(--ol-subtle-foreground-color);\n  font-weight: bold;\n  text-decoration: none;\n  font-size: inherit;\n  text-align: center;\n  height: 1.375em;\n  width: 1.375em;\n  line-height: .4em;\n  background-color: var(--ol-background-color);\n  border: none;\n  border-radius: 2px;\n}\n\n.ol-control button::-moz-focus-inner {\n  border: none;\n  padding: 0;\n}\n\n.ol-zoom-extent button {\n  line-height: 1.4em;\n}\n\n.ol-compass {\n  display: block;\n  font-weight: normal;\n  will-change: transform;\n}\n\n.ol-touch .ol-control button {\n  font-size: 1.5em;\n}\n\n.ol-touch .ol-zoom-extent {\n  top: 5.5em;\n}\n\n.ol-control button:hover,\n.ol-control button:focus {\n  text-decoration: none;\n  outline: 1px solid var(--ol-subtle-foreground-color);\n  color: var(--ol-foreground-color);\n}\n\n.ol-zoom .ol-zoom-in {\n  border-radius: 2px 2px 0 0;\n}\n\n.ol-zoom .ol-zoom-out {\n  border-radius: 0 0 2px 2px;\n}\n\n.ol-attribution {\n  text-align: right;\n  bottom: .5em;\n  right: .5em;\n  max-width: calc(100% - 1.3em);\n  display: flex;\n  flex-flow: row-reverse;\n  align-items: center;\n}\n\n.ol-attribution a {\n  color: var(--ol-subtle-foreground-color);\n  text-decoration: none;\n}\n\n.ol-attribution ul {\n  margin: 0;\n  padding: 1px .5em;\n  color: var(--ol-foreground-color);\n  text-shadow: 0 0 2px var(--ol-background-color);\n  font-size: 12px;\n}\n\n.ol-attribution li {\n  display: inline;\n  list-style: none;\n}\n\n.ol-attribution li:not(:last-child):after {\n  content: " ";\n}\n\n.ol-attribution img {\n  max-height: 2em;\n  max-width: inherit;\n  vertical-align: middle;\n}\n\n.ol-attribution button {\n  flex-shrink: 0;\n}\n\n.ol-attribution.ol-collapsed ul {\n  display: none;\n}\n\n.ol-attribution:not(.ol-collapsed) {\n  background: var(--ol-partial-background-color);\n}\n\n.ol-attribution.ol-uncollapsible {\n  bottom: 0;\n  right: 0;\n  border-radius: 4px 0 0;\n}\n\n.ol-attribution.ol-uncollapsible img {\n  margin-top: -.2em;\n  max-height: 1.6em;\n}\n\n.ol-attribution.ol-uncollapsible button {\n  display: none;\n}\n\n.ol-zoomslider {\n  top: 4.5em;\n  left: .5em;\n  height: 200px;\n}\n\n.ol-zoomslider button {\n  position: relative;\n  height: 10px;\n}\n\n.ol-touch .ol-zoomslider {\n  top: 5.5em;\n}\n\n.ol-overviewmap {\n  left: 0.5em;\n  bottom: 0.5em;\n}\n\n.ol-overviewmap.ol-uncollapsible {\n  bottom: 0;\n  left: 0;\n  border-radius: 0 4px 0 0;\n}\n\n.ol-overviewmap .ol-overviewmap-map,\n.ol-overviewmap button {\n  display: block;\n}\n\n.ol-overviewmap .ol-overviewmap-map {\n  border: 1px solid var(--ol-subtle-foreground-color);\n  height: 150px;\n  width: 150px;\n}\n\n.ol-overviewmap:not(.ol-collapsed) button {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n}\n\n.ol-overviewmap.ol-collapsed .ol-overviewmap-map,\n.ol-overviewmap.ol-uncollapsible button {\n  display: none;\n}\n\n.ol-overviewmap:not(.ol-collapsed) {\n  background: var(--ol-subtle-background-color);\n}\n\n.ol-overviewmap-box {\n  border: 1.5px dotted var(--ol-subtle-foreground-color);\n}\n\n.ol-overviewmap .ol-overviewmap-box:hover {\n  cursor: move;\n}\n\n.ol-overviewmap .ol-viewport:hover {\n  cursor: pointer;\n}\n',""]);const i=a},5045:(n,o,e)=>{"use strict";var l=e(5072),t=e.n(l),r=e(7825),a=e.n(r),i=e(7659),c=e.n(i),s=e(5056),u=e.n(s),p=e(540),d=e.n(p),b=e(1113),m=e.n(b),g=e(4096),x={};x.styleTagTransform=m(),x.setAttributes=u(),x.insert=c().bind(null,"head"),x.domAPI=a(),x.insertStyleElement=d(),t()(g.A,x),g.A&&g.A.locals&&g.A.locals},4337:n=>{n.exports="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='32' height='32' version='1.1' x='0px' y='0px' viewBox='0 0 100 125' style='enable-background:new 0 0 100 100;' xml:space='preserve'%3e %3cg%3e %3crect x='41.1' y='36.5' width='3.8' height='16.7'/%3e %3cpolygon points='48.1,53.2 50,53.2 51.9,53.2 51.9,36.5 48.1,36.5 '/%3e %3cpolygon points='50.1,22.9 37.7,33.2 62.5,33.2 '/%3e %3crect x='55.2' y='36.5' width='3.8' height='16.7'/%3e %3cpath d='M50,5.2c-21.2,0-38.3,17.2-38.3,38.3c0,16.9,10.9,31.2,26.1,36.3l12.2,15l12.2-14.9c15.2-5.1,26.1-19.4,26.1-36.3 C88.3,22.4,71.2,5.2,50,5.2z M61.9,62.8H38.4c-0.9,0-1.7-0.7-1.7-1.7s0.7-1.7,1.7-1.7h23.5c0.9,0,1.7,0.7,1.7,1.7 S62.8,62.8,61.9,62.8z M71.5,62.6c-0.3,0.2-0.6,0.2-0.8,0.2c-0.6,0-1.1-0.3-1.4-0.8L66,56.6H50H34L30.8,62 c-0.3,0.5-0.9,0.8-1.4,0.8c-0.3,0-0.6-0.1-0.8-0.2c-0.8-0.5-1-1.5-0.6-2.3l3.7-6.3c0.3-0.5,0.8-0.8,1.4-0.8h4.7V36.5h-4.7 c-0.7,0-1.3-0.4-1.6-1.1c-0.2-0.7,0-1.4,0.5-1.8l16.9-14c0.4-0.3,0.8-0.4,1.2-0.4c0.4,0,0.7,0.1,1,0.4l16.9,14c0,0,0,0,0.1,0.1 c0,0,0.1,0.1,0.1,0.1c0,0,0.1,0.1,0.1,0.1c0,0,0.1,0.1,0.1,0.1c0,0,0.1,0.1,0.1,0.1c0,0,0,0.1,0.1,0.1c0,0.1,0,0.1,0.1,0.2 c0,0,0,0.1,0,0.1c0,0.1,0,0.1,0,0.2c0,0,0,0,0,0.1c0,0,0,0,0,0.1c0,0.1,0,0.1,0,0.2c0,0,0,0.1,0,0.1c0,0.1,0,0.1-0.1,0.2 c0,0,0,0.1-0.1,0.1c0,0,0,0.1-0.1,0.1c0,0-0.1,0.1-0.1,0.1c0,0,0,0,0,0.1c0,0,0,0,0,0c0,0.1-0.1,0.1-0.2,0.1c0,0-0.1,0.1-0.1,0.1 c-0.1,0-0.1,0.1-0.2,0.1c0,0-0.1,0-0.1,0.1c-0.1,0-0.1,0.1-0.2,0.1c0,0-0.1,0-0.1,0c-0.1,0-0.2,0-0.3,0c0,0,0,0-0.1,0c0,0,0,0,0,0 h-4.8v16.7h4.7c0.6,0,1.1,0.3,1.4,0.8l3.7,6.3C72.5,61.1,72.3,62.1,71.5,62.6z'/%3e %3c/g%3e %3c!-- Created by Anton Gajdosik from the Noun Project --%3e %3c/svg%3e"},4012:(n,o,e)=>{"use strict";e.r(o),e.d(o,{coords:()=>u,default:()=>d});var l=e(6540),t=e(6391),r=e(4294),a=e(6717),i=(e(5045),e(4337)),c=e.n(i),s=e(7240);const u={"Arc de Triomphe":[2.295,48.8737],"Place d'Italie":[2.355,48.831],Bastille:[2.369,48.853],"Tour Eiffel":[2.294,48.858],Montmartre:[2.342,48.887]};let p=0;function d(){const[n,o]=l.useState((()=>Object.keys(u).map((n=>new a.A({geometry:new r.A((0,t.Rb)(u[n])),name:n,uid:p++}))))),e=l.useRef(null);return l.createElement(l.Fragment,null,l.createElement(s.f9,{className:"example-map",initial:{center:(0,t.Rb)([2.364,48.82]),zoom:11},onClick:e=>{const l=e.map.getCoordinateFromPixel(e.pixel);n.push(new a.A({geometry:new r.A(l),uid:p++})),o([...n])}},l.createElement(s.ej,null),l.createElement(s.j9,{ref:e},l.createElement(s.cq.RStyle,null,l.createElement(s.cq.RIcon,{src:c()})),n.map((e=>l.createElement(s.Dp,{key:e.get("uid"),feature:e,onClick:e=>{const l=n.findIndex((n=>n.get("uid")===e.target.get("uid")));if(l>=0)return n.splice(l,1),o([...n]),!1}},l.createElement(s.Rv,null,l.createElement("div",{className:"user-select-none"},e.get("uid")))))))),l.createElement("div",{className:"mx-0 mt-0 mb-3 p-1 w-100 jumbotron shadow shadow"},l.createElement("p",null,"Click an empty space to add a monument or click a monument to delete it.")))}}}]);