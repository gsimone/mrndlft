// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/effect-shell.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var THREE = window.THREE;

var EffectShell = /*#__PURE__*/function () {
  function EffectShell() {
    var _this = this;

    var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;
    var itemsWrapper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, EffectShell);

    this.container = container;
    this.itemsWrapper = itemsWrapper;
    if (!this.container || !this.itemsWrapper) return;
    this.setup();
    this.initEffectShell().then(function () {
      _this.isLoaded = true;
      if (_this.isMouseOver) _this.onMouseOver(_this.tempItemIndex);
      _this.tempItemIndex = null;
      if (_this.start) _this.start();
    });
    this.createEventsListeners();
  }

  _createClass(EffectShell, [{
    key: "setup",
    value: function setup() {
      window.addEventListener("resize", this.onWindowResize.bind(this), false); // renderer

      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      });
      this.renderer.setSize(this.viewport.width, this.viewport.height);
      this.renderer.setPixelRatio = window.devicePixelRatio;
      this.container.appendChild(this.renderer.domElement); // scene

      this.scene = new THREE.Scene(); // camera

      this.camera = new THREE.PerspectiveCamera(40, this.viewport.aspectRatio, 0.1, 100);
      this.camera.position.set(0, 0, 3); //mouse

      this.mouse = new THREE.Vector2(); // time

      this.timeSpeed = 2;
      this.time = 0;
      this.clock = new THREE.Clock(); // animation loop

      this.renderer.setAnimationLoop(this.render.bind(this));
    }
  }, {
    key: "render",
    value: function render() {
      // called every frame
      this.time += this.clock.getDelta() * this.timeSpeed;
      this.renderer.render(this.scene, this.camera);
    }
  }, {
    key: "initEffectShell",
    value: function initEffectShell() {
      var _this2 = this;

      var promises = [];
      this.items = this.itemsElements;
      var THREEtextureLoader = new THREE.TextureLoader();
      this.items.forEach(function (item, index) {
        // create textures
        promises.push(_this2.loadTexture(THREEtextureLoader, item.img ? item.img.src : null, index));
      });
      return new Promise(function (resolve, reject) {
        // resolve textures promises
        Promise.all(promises).then(function (promises) {
          // all textures are loaded
          promises.forEach(function (promise, index) {
            // assign texture to item
            _this2.items[index].texture = promise.texture;
          });
          resolve();
        });
      });
    }
  }, {
    key: "createEventsListeners",
    value: function createEventsListeners() {
      var _this3 = this;

      this.items.forEach(function (item, index) {
        item.element.addEventListener("mouseover", _this3._onMouseOver.bind(_this3, index), false);
      });
      this.container.addEventListener("mousemove", this._onMouseMove.bind(this), false);
      this.container.addEventListener("touchstart", this._onTouchStart.bind(this));
      this.container.addEventListener("touchmove", this._onTouchMove.bind(this));
      this.itemsWrapper.addEventListener("mouseleave", this._onMouseLeave.bind(this), false);
    }
  }, {
    key: "_onTouchStart",
    value: function _onTouchStart(event) {
      this.isMouseOver = true;
    }
  }, {
    key: "_onMouseLeave",
    value: function _onMouseLeave(event) {
      this.isMouseOver = false;
      this.onMouseLeave(event);
    }
  }, {
    key: "_onTouchMove",
    value: function _onTouchMove(event) {
      // get normalized mouse position on viewport
      this.mouse.x = event.changedTouches[0].clientX / this.viewport.width * 2 - 1;
      this.mouse.y = -(event.changedTouches[0].clientY / this.viewport.height) * 2 + 1;
      var containerBox = this.itemsWrapper.getBoundingClientRect();
      var relY = event.touches[0].clientY - containerBox.y;
      var percentY = relY / containerBox.height;
      var activeY = Math.floor(this.items.length * percentY);
      this.onTargetChange(activeY);
    }
  }, {
    key: "_onMouseMove",
    value: function _onMouseMove(event) {
      // get normalized mouse position on viewport
      this.mouse.x = event.clientX / this.viewport.width * 2 - 1;
      this.mouse.y = -(event.clientY / this.viewport.height) * 2 + 1;
      this.onMouseMove(event);
    }
  }, {
    key: "_onMouseOver",
    value: function _onMouseOver(index, event) {
      this.tempItemIndex = index;
      this.onMouseOver(index, event);
    }
  }, {
    key: "onWindowResize",
    value: function onWindowResize() {
      this.camera.aspect = this.viewport.aspectRatio;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.viewport.width, this.viewport.height);
    }
  }, {
    key: "onUpdate",
    value: function onUpdate() {}
  }, {
    key: "onMouseEnter",
    value: function onMouseEnter(event) {}
  }, {
    key: "onMouseLeave",
    value: function onMouseLeave(event) {}
  }, {
    key: "onMouseMove",
    value: function onMouseMove(event) {}
  }, {
    key: "onMouseOver",
    value: function onMouseOver(index, event) {}
  }, {
    key: "loadTexture",
    value: function loadTexture(loader, url, index) {
      // https://threejs.org/docs/#api/en/loaders/TextureLoader
      return new Promise(function (resolve, reject) {
        if (!url) {
          resolve({
            texture: null,
            index: index
          });
          return;
        } // load a resource


        loader.load( // resource URL
        url, // onLoad callback
        function (texture) {
          resolve({
            texture: texture,
            index: index
          });
        }, // onProgress callback currently not supported
        undefined, // onError callback
        function (error) {
          console.error("An error happened.", error);
          reject(error);
        });
      });
    }
  }, {
    key: "viewport",
    get: function get() {
      var width = this.container.clientWidth;
      var height = this.container.clientHeight;
      var aspectRatio = width / height;
      return {
        width: width,
        height: height,
        aspectRatio: aspectRatio
      };
    }
  }, {
    key: "viewSize",
    get: function get() {
      // fit plane to screen
      // https://gist.github.com/ayamflow/96a1f554c3f88eef2f9d0024fc42940f
      var distance = this.camera.position.z;
      var vFov = this.camera.fov * Math.PI / 180;
      var height = 2 * Math.tan(vFov / 2) * distance;
      var width = height * this.viewport.aspectRatio;
      return {
        width: width,
        height: height,
        vFov: vFov
      };
    }
  }, {
    key: "itemsElements",
    get: function get() {
      // convert NodeList to Array
      var items = _toConsumableArray(this.itemsWrapper.querySelectorAll(".link")); //create Array of items including element, image and index


      return items.map(function (item, index) {
        return {
          element: item,
          img: item.querySelector("img") || null,
          index: index
        };
      });
    }
  }]);

  return EffectShell;
}();

var _default = EffectShell;
exports.default = _default;
},{}],"src/stretch-effect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _effectShell = _interopRequireDefault(require("./effect-shell"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var StretchEffect = /*#__PURE__*/function (_EffectShell) {
  _inherits(StretchEffect, _EffectShell);

  var _super = _createSuper(StretchEffect);

  function StretchEffect() {
    var _this;

    var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;
    var itemsWrapper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, StretchEffect);

    _this = _super.call(this, container, itemsWrapper);
    if (!_this.container || !_this.itemsWrapper) return _possibleConstructorReturn(_this);
    options.strength = options.strength || 0.25;
    _this.options = options;
    _this.tempItemIndex = 0;

    _this.init();

    return _this;
  }

  _createClass(StretchEffect, [{
    key: "init",
    value: function init() {
      this.position = new THREE.Vector3(0, 0, 0);
      this.scale = new THREE.Vector3(1, 1, 1);
      this.geometry = new THREE.PlaneBufferGeometry(1, 1, 32, 32);
      this.uniforms = {
        uTexture: {
          value: null
        },
        uOffset: {
          value: new THREE.Vector2(0.0, 0.0)
        },
        uAlpha: {
          value: 0
        }
      };
      this.material = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: "\n  uniform vec2 uOffset;\n\n  varying vec2 vUv;\n\n  vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {\n    float M_PI = 3.1415926535897932384626433832795;\n    position.x = position.x + (sin(uv.y * M_PI) * offset.x);\n    position.y = position.y + (sin(uv.x * M_PI) * offset.y);\n    return position;\n  }\n\n  void main() {\n    vUv =  uv + (uOffset * 2.);\n    vec3 newPosition = position;\n    newPosition = deformationCurve(position,uv,uOffset);\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );\n  }\n",
        fragmentShader: "\n  uniform sampler2D uTexture;\n  uniform float uAlpha;\n\n  varying vec2 vUv;\n\n  vec2 scaleUV(vec2 uv,float scale) {\n    float center = 0.5;\n    return ((uv - center) * scale) + center;\n  }\n\n  void main() {\n    vec3 color = texture2D(uTexture,scaleUV(vUv,0.8)).rgb;\n    gl_FragColor = vec4(color,uAlpha);\n  }\n",
        transparent: true
      });
      this.plane = new THREE.Mesh(this.geometry, this.material);
      this.scene.add(this.plane);
      this.isMobile = true;
      this.reset();
    }
  }, {
    key: "start",
    value: function start() {
      this.onTargetChange(0);
      TweenLite.to(this.uniforms.uAlpha, 1, {
        value: 1,
        ease: Power4.easeOut
      });
    }
  }, {
    key: "onMouseEnter",
    value: function onMouseEnter() {
      if (!this.currentItem || !this.isMouseOver) {
        this.isMouseOver = true; // show plane

        TweenLite.to(this.uniforms.uAlpha, 0.5, {
          value: 1,
          ease: Power4.easeOut
        });
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      var resetTo = this.items[this.tempItemIndex] || this.items[0];

      var _resetTo$element$getB = resetTo.element.getBoundingClientRect(),
          x = _resetTo$element$getB.x,
          width = _resetTo$element$getB.width,
          y = _resetTo$element$getB.y,
          height = _resetTo$element$getB.height;

      var center = {
        x: (x + width) / 2,
        y: (y + height) / 2
      };
      this.position = new THREE.Vector3(0, 0, 0);
      TweenLite.to(this.plane.position, 1, {
        x: 0,
        y: 0,
        ease: Power4.easeOut,
        onUpdate: this.onPositionUpdate.bind(this)
      }); // reset back to first picture

      this.uniforms.uTexture.value = resetTo.texture;
    }
  }, {
    key: "onMouseLeave",
    value: function onMouseLeave(event) {
      // reset position
      this.reset();
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove(event) {
      if (this.isMouseOver) {
        if (this.isMobile) {
          return;
        } // project mouse position to world coodinates


        var x = this.mouse.x.map(-1, 1, -this.viewSize.width / 2, this.viewSize.width / 2);
        var y = this.mouse.y.map(-1, 1, -this.viewSize.height / 2, this.viewSize.height / 2);
        var OFFSET = 0.75; // update position

        this.position = new THREE.Vector3(x, y + OFFSET, 0);
        TweenLite.to(this.plane.position, 1, {
          x: x,
          y: y + OFFSET,
          ease: Power4.easeOut,
          onUpdate: this.onPositionUpdate.bind(this)
        });
      }
    }
  }, {
    key: "onPositionUpdate",
    value: function onPositionUpdate() {
      // compute offset
      var offset = this.plane.position.clone().sub(this.position).multiplyScalar(-this.options.strength);
      this.uniforms.uOffset.value = offset;
    }
  }, {
    key: "onMouseOver",
    value: function onMouseOver(index, e) {
      if (!this.isLoaded) return;
      this.onMouseEnter();
      if (this.currentItem && this.currentItem.index === index) return;
      this.onTargetChange(index);
    }
  }, {
    key: "onTargetChange",
    value: function onTargetChange(index) {
      // item target changed
      this.currentItem = this.items[index];
      if (!this.currentItem.texture) return; // compute image ratio

      var imageRatio = this.currentItem.img.naturalWidth / this.currentItem.img.naturalHeight;
      this.scale = new THREE.Vector3(imageRatio, 1, 1);
      this.uniforms.uTexture.value = this.currentItem.texture;
      this.plane.scale.copy(this.scale);
    }
  }]);

  return StretchEffect;
}(_effectShell.default);

var _default = StretchEffect;
exports.default = _default;
},{"./effect-shell":"src/effect-shell.js"}],"src/netflix-slider.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function clamp(n, min, max) {
  return Math.min(Math.max(n, min), max);
}

var NetflixSlider = /*#__PURE__*/function () {
  function NetflixSlider(container) {
    _classCallCheck(this, NetflixSlider);

    this.container = container;
    this.activeX = 0;
    this.childrenArr = Array.from(this.container.children);
    this.handleResize();
  }

  _createClass(NetflixSlider, [{
    key: "handleResize",
    value: function handleResize() {
      this.isMobile = window.innerWidth < 800;
      this.update();
    }
  }, {
    key: "bindEvent",
    value: function bindEvent(name, handler) {
      this.container.addEventListener(name, handler);
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      this.bindEvent("mousemove", this.handleMouseMove.bind(this));
      this.bindEvent("touchmove", this.handleTouchMove.bind(this));
      window.addEventListener("resize", this.handleResize.bind(this));
    } // touchmove adapter

  }, {
    key: "handleTouchMove",
    value: function handleTouchMove(e) {
      this.handleMouseMove(e.touches[0]);
    }
  }, {
    key: "handleMouseMove",
    value: function handleMouseMove(e) {
      var containerBox = this.container.getBoundingClientRect();
      var relX = e.clientX - containerBox.x;
      var relY = e.clientY - containerBox.y;
      var percentX = relX / containerBox.width;
      var percentY = relY / containerBox.height;
      var activeX = Math.floor(this.container.children.length * percentX);
      var activeY = Math.floor(this.container.children.length * percentY);

      if (activeX !== this.activeX && !this.isMobile) {
        this.activeX = clamp(activeX, 0, this.childrenArr.length - 1);
        this.update();
      }

      if (activeY !== this.activeY && this.isMobile) {
        this.activeY = clamp(activeY, 0, this.childrenArr.length - 1);
        this.update();
      }
    }
  }, {
    key: "update",
    value: function update() {
      var _this = this;

      requestAnimationFrame(function () {
        var activeIndex = _this.isMobile ? _this.activeY : _this.activeX;

        _this.childrenArr.forEach(function (child, i) {
          child.classList.toggle("before", i < activeIndex);
          child.classList.toggle("active", i === activeIndex);
          child.classList.toggle("after", i > activeIndex);
        });

        _this.onChange(_this.isMobile ? _this.activeY : _this.activeX);
      });
    }
  }, {
    key: "onChange",
    value: function onChange() {}
  }, {
    key: "init",
    value: function init() {
      this.bindEvents();
    }
  }]);

  return NetflixSlider;
}();

var _default = NetflixSlider;
exports.default = _default;
},{}],"src/index.js":[function(require,module,exports) {
"use strict";

var _stretchEffect = _interopRequireDefault(require("./stretch-effect"));

var _netflixSlider = _interopRequireDefault(require("./netflix-slider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import "./styles.css";
var container = document.body;
var itemsWrapper = document.querySelector(".grid");

var preloadImages = function preloadImages() {
  return new Promise(function (resolve, reject) {
    imagesLoaded(document.querySelectorAll("img"), resolve);
  });
};

preloadImages().then(function () {
  document.body.classList.remove("loading");
  var effect = new _stretchEffect.default(container, itemsWrapper);
  var slider = new _netflixSlider.default(document.querySelector(".grid"));
  slider.init();
  var titles = Array.from(document.querySelectorAll('.title-w .w-dyn-item'));

  slider.onChange = function (activeIndex) {
    titles.forEach(function (title, i) {
      title.classList.toggle("active", activeIndex === i);
    });
  };
});
},{"./stretch-effect":"src/stretch-effect.js","./netflix-slider":"src/netflix-slider.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49665" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map