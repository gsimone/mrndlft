parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"fuCl":[function(require,module,exports) {
"use strict";function e(e){return o(e)||n(e)||i(e)||t()}function t(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function i(e,t){if(e){if("string"==typeof e)return r(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?r(e,t):void 0}}function n(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function o(e){if(Array.isArray(e))return r(e)}function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function h(e,t,i){return t&&a(e.prototype,t),i&&a(e,i),e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var u=window.THREE,c=function(){function t(){var e=this,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document.body,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;s(this,t),this.container=i,this.itemsWrapper=n,this.container&&this.itemsWrapper&&(this.setup(),this.initEffectShell().then(function(){e.isLoaded=!0,e.isMouseOver&&e.onMouseOver(e.tempItemIndex),e.tempItemIndex=null,e.start&&e.start()}),this.createEventsListeners())}return h(t,[{key:"setup",value:function(){window.addEventListener("resize",this.onWindowResize.bind(this),!1),this.renderer=new u.WebGLRenderer({antialias:!0,alpha:!0}),this.renderer.setSize(this.viewport.width,this.viewport.height),this.renderer.setPixelRatio=window.devicePixelRatio,this.container.appendChild(this.renderer.domElement),this.scene=new u.Scene,this.camera=new u.PerspectiveCamera(40,this.viewport.aspectRatio,.1,100),this.camera.position.set(0,0,3),this.mouse=new u.Vector2,this.timeSpeed=2,this.time=0,this.clock=new u.Clock,this.renderer.setAnimationLoop(this.render.bind(this))}},{key:"render",value:function(){this.time+=this.clock.getDelta()*this.timeSpeed,this.renderer.render(this.scene,this.camera)}},{key:"initEffectShell",value:function(){var e=this,t=[];this.items=this.itemsElements;var i=new u.TextureLoader;return this.items.forEach(function(n,o){t.push(e.loadTexture(i,n.img?n.img.src:null,o))}),new Promise(function(i,n){Promise.all(t).then(function(t){t.forEach(function(t,i){e.items[i].texture=t.texture}),i()})})}},{key:"createEventsListeners",value:function(){var e=this;this.items.forEach(function(t,i){t.element.addEventListener("mouseover",e._onMouseOver.bind(e,i),!1)}),this.container.addEventListener("mousemove",this._onMouseMove.bind(this),!1),this.container.addEventListener("touchstart",this._onTouchStart.bind(this)),this.container.addEventListener("touchmove",this._onTouchMove.bind(this)),this.itemsWrapper.addEventListener("mouseleave",this._onMouseLeave.bind(this),!1)}},{key:"_onTouchStart",value:function(e){this.isMouseOver=!0}},{key:"_onMouseLeave",value:function(e){this.isMouseOver=!1,this.onMouseLeave(e)}},{key:"_onTouchMove",value:function(e){this.mouse.x=e.changedTouches[0].clientX/this.viewport.width*2-1,this.mouse.y=-e.changedTouches[0].clientY/this.viewport.height*2+1;var t=this.itemsWrapper.getBoundingClientRect(),i=(e.touches[0].clientY-t.y)/t.height,n=Math.floor(this.items.length*i);this.onTargetChange(n)}},{key:"_onMouseMove",value:function(e){this.mouse.x=e.clientX/this.viewport.width*2-1,this.mouse.y=-e.clientY/this.viewport.height*2+1,this.onMouseMove(e)}},{key:"_onMouseOver",value:function(e,t){this.tempItemIndex=e,this.onMouseOver(e,t)}},{key:"onWindowResize",value:function(){this.camera.aspect=this.viewport.aspectRatio,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.viewport.width,this.viewport.height)}},{key:"onUpdate",value:function(){}},{key:"onMouseEnter",value:function(e){}},{key:"onMouseLeave",value:function(e){}},{key:"onMouseMove",value:function(e){}},{key:"onMouseOver",value:function(e,t){}},{key:"loadTexture",value:function(e,t,i){return new Promise(function(n,o){t?e.load(t,function(e){n({texture:e,index:i})},void 0,function(e){console.error("An error happened.",e),o(e)}):n({texture:null,index:i})})}},{key:"viewport",get:function(){var e=this.container.clientWidth,t=this.container.clientHeight;return{width:e,height:t,aspectRatio:e/t}}},{key:"viewSize",get:function(){var e=this.camera.position.z,t=this.camera.fov*Math.PI/180,i=2*Math.tan(t/2)*e;return{width:i*this.viewport.aspectRatio,height:i,vFov:t}}},{key:"itemsElements",get:function(){return e(this.itemsWrapper.querySelectorAll(".link")).map(function(e,t){return{element:e,img:e.querySelector("img")||null,index:t}})}}]),t}(),l=c;exports.default=l;
},{}],"NtkK":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=t(require("./effect-shell"));function t(e){return e&&e.__esModule?e:{default:e}}function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function r(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&u(e,t)}function u(e,t){return(u=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function a(e){var t=l();return function(){var n,i=h(e);if(t){var o=h(this).constructor;n=Reflect.construct(i,arguments,o)}else n=i.apply(this,arguments);return c(this,n)}}function c(e,t){return!t||"object"!==n(t)&&"function"!=typeof t?f(e):t}function f(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function l(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}function h(e){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var v=function(t){s(o,e.default);var n=a(o);function o(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document.body,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return i(this,o),(e=n.call(this,t,r)).container&&e.itemsWrapper?(s.strength=s.strength||.25,e.options=s,e.tempItemIndex=0,e.init(),e):c(e)}return r(o,[{key:"init",value:function(){this.position=new THREE.Vector3(0,0,0),this.scale=new THREE.Vector3(1,1,1),this.geometry=new THREE.PlaneBufferGeometry(1,1,32,32),this.uniforms={uTexture:{value:null},uOffset:{value:new THREE.Vector2(0,0)},uAlpha:{value:0}},this.material=new THREE.ShaderMaterial({uniforms:this.uniforms,vertexShader:"\n  uniform vec2 uOffset;\n\n  varying vec2 vUv;\n\n  vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {\n    float M_PI = 3.1415926535897932384626433832795;\n    position.x = position.x + (sin(uv.y * M_PI) * offset.x);\n    position.y = position.y + (sin(uv.x * M_PI) * offset.y);\n    return position;\n  }\n\n  void main() {\n    vUv =  uv + (uOffset * 2.);\n    vec3 newPosition = position;\n    newPosition = deformationCurve(position,uv,uOffset);\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );\n  }\n",fragmentShader:"\n  uniform sampler2D uTexture;\n  uniform float uAlpha;\n\n  varying vec2 vUv;\n\n  vec2 scaleUV(vec2 uv,float scale) {\n    float center = 0.5;\n    return ((uv - center) * scale) + center;\n  }\n\n  void main() {\n    vec3 color = texture2D(uTexture,scaleUV(vUv,0.8)).rgb;\n    gl_FragColor = vec4(color,uAlpha);\n  }\n",transparent:!0}),this.plane=new THREE.Mesh(this.geometry,this.material),this.scene.add(this.plane),this.reset()}},{key:"start",value:function(){this.onTargetChange(0),TweenLite.to(this.uniforms.uAlpha,1,{value:1,ease:Power4.easeOut})}},{key:"onMouseEnter",value:function(){this.currentItem&&this.isMouseOver||(this.isMouseOver=!0,TweenLite.to(this.uniforms.uAlpha,.5,{value:1,ease:Power4.easeOut}))}},{key:"reset",value:function(){var e=this.items[this.tempItemIndex]||this.items[0],t=e.element.getBoundingClientRect();t.x,t.width,t.y,t.height;this.position=new THREE.Vector3(0,0,0),TweenLite.to(this.plane.position,1,{x:0,y:0,ease:Power4.easeOut,onUpdate:this.onPositionUpdate.bind(this)}),this.uniforms.uTexture.value=e.texture}},{key:"onMouseLeave",value:function(e){this.reset()}},{key:"onMouseMove",value:function(e){if(this.isMouseOver){if(this.isMobile)return;var t=this.mouse.x.map(-1,1,-this.viewSize.width/2,this.viewSize.width/2),n=this.mouse.y.map(-1,1,-this.viewSize.height/2,this.viewSize.height/2);this.position=new THREE.Vector3(t,n+.75,0),TweenLite.to(this.plane.position,1,{x:t,y:n+.75,ease:Power4.easeOut,onUpdate:this.onPositionUpdate.bind(this)})}}},{key:"onPositionUpdate",value:function(){var e=this.plane.position.clone().sub(this.position).multiplyScalar(-this.options.strength);this.uniforms.uOffset.value=e}},{key:"onMouseOver",value:function(e,t){this.isLoaded&&(this.onMouseEnter(),this.currentItem&&this.currentItem.index===e||this.onTargetChange(e))}},{key:"onTargetChange",value:function(e){if(this.currentItem=this.items[e],this.currentItem.texture){var t=this.currentItem.img.naturalWidth/this.currentItem.img.naturalHeight;this.scale=new THREE.Vector3(t,1,1),this.uniforms.uTexture.value=this.currentItem.texture,this.plane.scale.copy(this.scale)}}}]),o}(),p=v;exports.default=p;
},{"./effect-shell":"fuCl"}],"FLde":[function(require,module,exports) {
"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function i(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}function n(e,t,i){return Math.min(Math.max(e,t),i)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var a=function(){function t(i){e(this,t),this.container=i,this.activeX=0,this.childrenArr=Array.from(this.container.children),this.handleResize()}return i(t,[{key:"handleResize",value:function(){this.isMobile=window.innerWidth<800,this.update()}},{key:"bindEvent",value:function(e,t){this.container.addEventListener(e,t)}},{key:"bindEvents",value:function(){this.bindEvent("mousemove",this.handleMouseMove.bind(this)),this.bindEvent("touchmove",this.handleTouchMove.bind(this)),window.addEventListener("resize",this.handleResize.bind(this))}},{key:"handleTouchMove",value:function(e){this.handleMouseMove(e.touches[0])}},{key:"handleMouseMove",value:function(e){var t=this.container.getBoundingClientRect(),i=e.clientX-t.x,a=e.clientY-t.y,o=i/t.width,s=a/t.height,h=Math.floor(this.container.children.length*o),r=Math.floor(this.container.children.length*s);h===this.activeX||this.isMobile||(this.activeX=n(h,0,this.childrenArr.length-1),this.update()),r!==this.activeY&&this.isMobile&&(this.activeY=n(r,0,this.childrenArr.length-1),this.update())}},{key:"update",value:function(){var e=this;requestAnimationFrame(function(){var t=e.isMobile?e.activeY:e.activeX;e.childrenArr.forEach(function(e,i){e.classList.toggle("before",i<t),e.classList.toggle("active",i===t),e.classList.toggle("after",i>t)}),e.onChange(e.isMobile?e.activeY:e.activeX)})}},{key:"onChange",value:function(){}},{key:"init",value:function(){this.bindEvents()}}]),t}(),o=a;exports.default=o;
},{}],"H99C":[function(require,module,exports) {
"use strict";var e=t(require("./stretch-effect")),n=t(require("./netflix-slider"));function t(e){return e&&e.__esModule?e:{default:e}}var i=document.body,o=document.querySelector(".grid"),r=function(){return new Promise(function(e,n){imagesLoaded(document.querySelectorAll("img"),e)})};r().then(function(){document.body.classList.remove("loading");var t=new e.default(i,o),r=new n.default(document.querySelector(".grid"));r.init();var d=Array.from(document.querySelectorAll(".title-w .w-dyn-item"));t.isMobile=window.innerWidth<800,window.addEventListener("resize",function(){t.isMobile=window.innerWidth<800,console.log(t)}),r.onChange=function(e){d.forEach(function(n,t){n.classList.toggle("active",e===t)})}});
},{"./stretch-effect":"NtkK","./netflix-slider":"FLde"}]},{},["H99C"], null)
//# sourceMappingURL=/src.818f83a9.js.map