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
})({"../node_modules/@ui5/webcomponents-base/src/util/whenDOMReady.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const whenDOMReady = () => {
  return new Promise(resolve => {
    if (document.body) {
      resolve();
    } else {
      document.addEventListener("DOMContentLoaded", () => {
        resolve();
      });
    }
  });
};

var _default = whenDOMReady;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/src/events/EventEnrichment.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const EventEnrichment = {};
let enriched = false;

EventEnrichment.run = function run() {
  if (enriched) {
    return;
  }

  const stopPropagationSet = new WeakSet();
  const stopImmediatePropagationSet = new WeakSet();
  const originalStopPropagation = Event.prototype.stopPropagation;
  const originalStopImmediatePropagation = Event.prototype.stopImmediatePropagation;

  Event.prototype.stopPropagation = function stopPropagation() {
    stopPropagationSet.add(this);
    return originalStopPropagation.apply(this, arguments); // eslint-disable-line
  };

  Event.prototype.isPropagationStopped = function isPropagationStopped() {
    return stopPropagationSet.has(this);
  };

  Event.prototype.stopImmediatePropagation = function stopImmediatePropagation() {
    stopImmediatePropagationSet.add(this);
    return originalStopImmediatePropagation.apply(this, arguments); // eslint-disable-line
  };

  Event.prototype.isImmediatePropagationStopped = function isImmediatePropagationStopped() {
    return stopImmediatePropagationSet.has(this);
  };

  enriched = true;
};

var _default = EventEnrichment;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/src/IconFonts.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setIconFontsLocations = exports.insertIconFontFace = void 0;

/**
 * CSS font family used for the icons provided by SAP.
 */
const SAP_ICON_FONT_FAMILY = "SAP-icons";
/* CDN Location */

let iconFontWoff = "https://ui5.sap.com/sdk/resources/sap/ui/core/themes/base/fonts/SAP-icons.woff?ui5-webcomponents";
let iconFontWoff2 = "https://ui5.sap.com/sdk/resources/sap/ui/core/themes/base/fonts/SAP-icons.woff2?ui5-webcomponents";

const setIconFontsLocations = ({
  woff = iconFontWoff,
  woff2 = iconFontWoff2
} = {}) => {
  iconFontWoff = woff;
  iconFontWoff2 = woff2;
};

exports.setIconFontsLocations = setIconFontsLocations;

const insertIconFontFace = (woff2Location = iconFontWoff2, woffLocation = iconFontWoff) => {
  const fontFace = SAP_ICON_FONT_FAMILY;
  /* eslint-disable */
  // load the font asynchronously via CSS

  const fontFaceCSS = "@font-face {" + "font-family: '" + fontFace + "';" + "src: url('" + woff2Location + "') format('woff2')," +
  /* Chrome 36+, Firefox 39+, Safari 10+, Edge 14+, Chrome 51+ for Android, PhantomJS 2.1.1+ */
  "url('" + woffLocation + "') format('woff')," +
  /* IE9+, Safari 5.1+, iOS 5.1+, Android Browser 4.4+, IE Mobile 11+ */
  "local('" + fontFace + "');" +
  /* fallback to local installed font in case it can't be loaded (e.g. font download is disabled due to browser security settings) */
  "font-weight: normal;" + "font-style: normal;" + "}";
  /* eslint-enable */

  const style = document.createElement("style");
  style.type = "text/css";
  style.textContent = fontFaceCSS;
  document.head.appendChild(style);
};

exports.insertIconFontFace = insertIconFontFace;
},{}],"../node_modules/@ui5/webcomponents-base/src/events/ManagedEvents.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const ManagedEvents = {};
ManagedEvents.events = ["click", "dblclick", "contextmenu", "keydown", "keypress", "keyup", "mousedown", "mouseout", "mouseover", "mouseup", "select", "selectstart", "dragstart", "dragenter", "dragover", "dragleave", "dragend", "drop", "paste", "cut", "input", "touchstart", "touchend", "touchmove", "touchcancel"];

ManagedEvents.bindAllEvents = callback => {
  if (callback) {
    ManagedEvents.events.forEach(event => {
      document.addEventListener(event, callback);
    });
  }
};

ManagedEvents.unbindAllEvents = callback => {
  if (callback) {
    ManagedEvents.events.forEach(event => {
      document.removeEventListener(event, callback);
    });
  }
};

var _default = ManagedEvents;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/src/events/getOriginalEventTarget.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const getOriginalEventTarget = function getOriginalEventTarget(event) {
  // Default - composedPath should be used (also covered by polyfill)
  if (typeof event.composedPath === "function") {
    const composedPath = event.composedPath();

    if (Array.isArray(composedPath) && composedPath.length) {
      return composedPath[0];
    }
  } // Fallback


  return event.target;
};

var _default = getOriginalEventTarget;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/src/DOMEventHandler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ManagedEvents = _interopRequireDefault(require("./events/ManagedEvents.js"));

var _getOriginalEventTarget = _interopRequireDefault(require("./events/getOriginalEventTarget.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const handleEvent = function handleEvent(event) {
  // Get the DOM node where the original event occurred
  let target = (0, _getOriginalEventTarget.default)(event);
  event.ui5target = target; // Traverse the DOM

  let shouldPropagate = true;

  while (shouldPropagate && target instanceof HTMLElement) {
    shouldPropagate = processDOMNode(target, event);

    if (shouldPropagate) {
      target = getParentDOMNode(target);
    }
  }
};

const processDOMNode = function processDOMNode(node, event) {
  if (node && node._isUI5Element) {
    return dispatchEvent(node, event);
  }

  return true;
};

const dispatchEvent = function dispatchEvent(element, event) {
  // Handle the original event (such as "keydown")
  element._handleEvent(event);

  if (event.isImmediatePropagationStopped()) {
    return false;
  }
  /* eslint-disable */


  if (event.isPropagationStopped()) {
    return false;
  }
  /* eslint-enable */


  return true;
};

const getParentDOMNode = function getParentDOMNode(node) {
  const parentNode = node.parentNode;

  if (parentNode && parentNode.host) {
    return parentNode.host;
  }

  return parentNode;
};

class DOMEventHandler {
  constructor() {
    throw new Error("Static class");
  }

  static start() {
    _ManagedEvents.default.bindAllEvents(handleEvent);
  }

  static stop() {
    _ManagedEvents.default.unbindAllEvents(handleEvent);
  }

}

var _default = DOMEventHandler;
exports.default = _default;
},{"./events/ManagedEvents.js":"../node_modules/@ui5/webcomponents-base/src/events/ManagedEvents.js","./events/getOriginalEventTarget.js":"../node_modules/@ui5/webcomponents-base/src/events/getOriginalEventTarget.js"}],"../node_modules/@ui5/webcomponents-core/dist/sap/ui/core/CalendarType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var CalendarType = {
  Gregorian: "Gregorian",
  Islamic: "Islamic",
  Japanese: "Japanese",
  Persian: "Persian",
  Buddhist: "Buddhist"
};
var _default = CalendarType;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/src/util/getDesigntimePropertyAsArray.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = value => {
  const m = /\$([-a-z0-9A-Z._]+)(?::([^$]*))?\$/.exec(value);
  return m && m[2] ? m[2].split(/,/) : null;
};

exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/src/Configuration.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOriginInfo = exports.getSupportedLanguages = exports._setWCNoConflict = exports._setTheme = exports.getLocale = exports.getCalendarType = exports.getWCNoConflict = exports.getCompactSize = exports.getLanguage = exports.getRTL = exports.getTheme = void 0;

var _CalendarType = _interopRequireDefault(require("@ui5/webcomponents-core/dist/sap/ui/core/CalendarType.js"));

var _getDesigntimePropertyAsArray = _interopRequireDefault(require("./util/getDesigntimePropertyAsArray.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let initialized = false;
const CONFIGURATION = {
  theme: "sap_fiori_3",
  rtl: null,
  language: null,
  compactSize: false,
  supportedLanguages: null,
  calendarType: null,
  derivedRTL: null,
  "xx-wc-no-conflict": false // no URL

};
/* General settings */

const getTheme = () => {
  initConfiguration();
  return CONFIGURATION.theme;
};

exports.getTheme = getTheme;

const getRTL = () => {
  initConfiguration();
  return CONFIGURATION.rtl;
};

exports.getRTL = getRTL;

const getLanguage = () => {
  initConfiguration();
  return CONFIGURATION.language;
};

exports.getLanguage = getLanguage;

const getCompactSize = () => {
  initConfiguration();
  return CONFIGURATION.compactSize;
};

exports.getCompactSize = getCompactSize;

const getSupportedLanguages = () => {
  return (0, _getDesigntimePropertyAsArray.default)("$core-i18n-locales:,ar,bg,ca,cs,da,de,el,en,es,et,fi,fr,hi,hr,hu,it,iw,ja,ko,lt,lv,nl,no,pl,pt,ro,ru,sh,sk,sl,sv,th,tr,uk,vi,zh_CN,zh_TW$");
};

exports.getSupportedLanguages = getSupportedLanguages;

const getWCNoConflict = () => {
  initConfiguration();
  return CONFIGURATION["xx-wc-no-conflict"];
};

exports.getWCNoConflict = getWCNoConflict;

const _setWCNoConflict = value => {
  CONFIGURATION["xx-wc-no-conflict"] = value;
};
/* Calendar stuff */


exports._setWCNoConflict = _setWCNoConflict;

const getCalendarType = () => {
  initConfiguration();

  if (CONFIGURATION.calendarType) {
    const type = Object.keys(_CalendarType.default).filter(calType => calType === CONFIGURATION.calendarType)[0];

    if (type) {
      return type;
    }
  }

  return _CalendarType.default.Gregorian;
};

exports.getCalendarType = getCalendarType;

const getOriginInfo = () => {};

exports.getOriginInfo = getOriginInfo;

const getLocale = () => {
  initConfiguration();
  return CONFIGURATION.language;
};

exports.getLocale = getLocale;

const _setTheme = themeName => {
  CONFIGURATION.theme = themeName;
};

exports._setTheme = _setTheme;
const booleanMapping = new Map();
booleanMapping.set("true", true);
booleanMapping.set("false", false);
let runtimeConfig = {};

const parseConfigurationScript = () => {
  const configScript = document.querySelector("[data-id='sap-ui-config']");
  let configJSON;

  if (configScript) {
    try {
      configJSON = JSON.parse(configScript.innerHTML);
    } catch (е) {
      console.warn("Incorrect data-sap-ui-config format. Please use JSON");
      /* eslint-disable-line */
    }

    if (configJSON) {
      runtimeConfig = Object.assign({}, configJSON);
    }
  }
};

const parseURLParameters = () => {
  const params = new URLSearchParams(window.location.search);
  params.forEach((value, key) => {
    if (!key.startsWith("sap-ui")) {
      return;
    }

    const lowerCaseValue = value.toLowerCase();
    const param = key.split("sap-ui-")[1];

    if (booleanMapping.has(value)) {
      value = booleanMapping.get(lowerCaseValue);
    }

    runtimeConfig[param] = value;
  });
};

const applyConfigurations = () => {
  Object.keys(runtimeConfig).forEach(key => {
    CONFIGURATION[key] = runtimeConfig[key];
  });
};

const initConfiguration = () => {
  if (initialized) {
    return;
  }

  parseConfigurationScript();
  parseURLParameters();
  applyConfigurations();
  initialized = true;
};
},{"@ui5/webcomponents-core/dist/sap/ui/core/CalendarType.js":"../node_modules/@ui5/webcomponents-core/dist/sap/ui/core/CalendarType.js","./util/getDesigntimePropertyAsArray.js":"../node_modules/@ui5/webcomponents-base/src/util/getDesigntimePropertyAsArray.js"}],"../node_modules/@ui5/webcomponents-base/src/theming/CustomStyle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCustomCSS = exports.addCustomCSS = void 0;
const customCSSFor = {};

const addCustomCSS = (tag, css, ...rest) => {
  // TODO remove deprecation error after 1 release
  if (rest.length) {
    throw new Error("addCustomCSS no longer accepts theme specific CSS. new signature is `addCustomCSS(tag, css)`");
  }

  if (!customCSSFor[tag]) {
    customCSSFor[tag] = [];
  }

  customCSSFor[tag].push(css);
};

exports.addCustomCSS = addCustomCSS;

const getCustomCSS = tag => {
  return customCSSFor[tag] ? customCSSFor[tag].join("") : "";
};

exports.getCustomCSS = getCustomCSS;
},{}],"../node_modules/@ui5/webcomponents-base/src/util/FetchHelper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchJsonOnce = exports.fetchTextOnce = void 0;
const fetchPromises = new Map();
const jsonPromises = new Map();
const textPromises = new Map();

const fetchTextOnce = async url => {
  if (!fetchPromises.get(url)) {
    fetchPromises.set(url, fetch(url));
  }

  const response = await fetchPromises.get(url);

  if (!textPromises.get(url)) {
    textPromises.set(url, response.text());
  }

  return textPromises.get(url);
};

exports.fetchTextOnce = fetchTextOnce;

const fetchJsonOnce = async url => {
  if (!fetchPromises.get(url)) {
    fetchPromises.set(url, fetch(url));
  }

  const response = await fetchPromises.get(url);

  if (!jsonPromises.get(url)) {
    jsonPromises.set(url, response.json());
  }

  return jsonPromises.get(url);
};

exports.fetchJsonOnce = fetchJsonOnce;
},{}],"../node_modules/@ui5/webcomponents-base/src/theming/ThemeProperties.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getThemeProperties = exports.registerThemeProperties = void 0;

var _FetchHelper = require("../util/FetchHelper.js");

const themeURLs = new Map();
const propertiesStyles = new Map();

const registerThemeProperties = (packageName, themeName, data) => {
  if (data.includes(":root")) {
    // inlined content
    propertiesStyles.set(`${packageName}_${themeName}`, data);
  } else {
    // url for fetching
    themeURLs.set(`${packageName}_${themeName}`, data);
  }
};

exports.registerThemeProperties = registerThemeProperties;

const getThemeProperties = async (packageName, themeName) => {
  const style = propertiesStyles.get(`${packageName}_${themeName}`);

  if (style) {
    return style;
  }

  const data = await fetchThemeProperties(packageName, themeName);
  propertiesStyles.set(`${packageName}_${themeName}`, data);
  return data;
};

exports.getThemeProperties = getThemeProperties;

const fetchThemeProperties = async (packageName, themeName) => {
  const url = themeURLs.get(`${packageName}_${themeName}`);

  if (!url) {
    throw new Error(`You have to import @ui5/webcomponents/dist/ThemePropertiesProvider module to use theme switching`);
  }

  return (0, _FetchHelper.fetchTextOnce)(url);
};
},{"../util/FetchHelper.js":"../node_modules/@ui5/webcomponents-base/src/util/FetchHelper.js"}],"../node_modules/@ui5/webcomponents-base/src/util/createStyleInHead.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Creates a <style> tag in the <head> tag
 * @param cssText - the CSS
 * @param attributes - optional attributes to add to the tag
 * @returns {HTMLElement}
 */
const createStyleInHead = (cssText, attributes = {}) => {
  const style = document.createElement("style");
  style.type = "text/css";
  Object.entries(attributes).forEach(pair => style.setAttribute(...pair));
  style.textContent = cssText;
  document.head.appendChild(style);
  return style;
};

var _default = createStyleInHead;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/src/theming/StyleInjection.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injectWebComponentStyle = exports.injectThemeProperties = void 0;

var _createStyleInHead = _interopRequireDefault(require("../util/createStyleInHead.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const injectedForTags = [];
let ponyfillTimer;

const ponyfillNeeded = () => !!window.CSSVarsPonyfill;

const runPonyfill = () => {
  ponyfillTimer = undefined;
  window.CSSVarsPonyfill.resetCssVars();
  window.CSSVarsPonyfill.cssVars({
    rootElement: document.head,
    include: "style[data-ui5-webcomponents-theme-properties],style[data-ui5-webcomponent-styles]",
    silent: true
  });
};

const schedulePonyfill = () => {
  if (!ponyfillTimer) {
    ponyfillTimer = window.setTimeout(runPonyfill, 0);
  }
};
/**
 * Creates/updates a style element holding all CSS Custom Properties
 * @param cssText
 */


const injectThemeProperties = cssText => {
  // Needed for all browsers
  const styleElement = document.head.querySelector(`style[data-ui5-webcomponents-theme-properties]`);

  if (styleElement) {
    styleElement.textContent = cssText || ""; // in case of undefined
  } else {
    (0, _createStyleInHead.default)(cssText, {
      "data-ui5-webcomponents-theme-properties": ""
    });
  } // When changing the theme, run the ponyfill immediately


  if (ponyfillNeeded()) {
    runPonyfill();
  }
};
/**
 * Creates a style element holding the CSS for a web component (and resolves CSS Custom Properties for IE)
 * @param tagName
 * @param cssText
 */


exports.injectThemeProperties = injectThemeProperties;

const injectWebComponentStyle = (tagName, cssText) => {
  // Edge and IE
  if (injectedForTags.indexOf(tagName) !== -1) {
    return;
  }

  (0, _createStyleInHead.default)(cssText, {
    "data-ui5-webcomponent-styles": tagName,
    "disabled": "disabled"
  });
  injectedForTags.push(tagName); // When injecting component styles, more might come in the same tick, so run the ponyfill async (to avoid double work)

  if (ponyfillNeeded()) {
    schedulePonyfill();
  }
};

exports.injectWebComponentStyle = injectWebComponentStyle;
},{"../util/createStyleInHead.js":"../node_modules/@ui5/webcomponents-base/src/util/createStyleInHead.js"}],"../node_modules/@ui5/webcomponents-base/src/Theming.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "addCustomCSS", {
  enumerable: true,
  get: function () {
    return _CustomStyle.addCustomCSS;
  }
});
exports.getEffectiveStyle = exports.setTheme = exports.applyTheme = exports.attachThemeChange = exports.getDefaultTheme = void 0;

var _Configuration = require("./Configuration.js");

var _CustomStyle = require("./theming/CustomStyle.js");

var _ThemeProperties = require("./theming/ThemeProperties.js");

var _StyleInjection = require("./theming/StyleInjection.js");

const themeChangeCallbacks = [];

const getDefaultTheme = () => {
  return "sap_fiori_3";
};

exports.getDefaultTheme = getDefaultTheme;

const attachThemeChange = function attachThemeChange(callback) {
  if (themeChangeCallbacks.indexOf(callback) === -1) {
    themeChangeCallbacks.push(callback);
  }
};

exports.attachThemeChange = attachThemeChange;

const applyTheme = async () => {
  let cssText = "";
  const theme = (0, _Configuration.getTheme)();
  const defaultTheme = getDefaultTheme();

  if (theme !== defaultTheme) {
    cssText = await (0, _ThemeProperties.getThemeProperties)("@ui5/webcomponents", theme);
  }

  (0, _StyleInjection.injectThemeProperties)(cssText);
};

exports.applyTheme = applyTheme;

const setTheme = async theme => {
  if (theme === (0, _Configuration.getTheme)()) {
    return;
  } // Update configuration


  (0, _Configuration._setTheme)(theme); // Update CSS Custom Properties

  await applyTheme();
  themeChangeCallbacks.forEach(callback => callback(theme));
};

exports.setTheme = setTheme;

const getEffectiveStyle = ElementClass => {
  const tag = ElementClass.getMetadata().getTag();
  const customStyle = (0, _CustomStyle.getCustomCSS)(tag) || "";
  let componentStyles = ElementClass.styles;

  if (Array.isArray(componentStyles)) {
    componentStyles = componentStyles.join(" ");
  }

  return `${componentStyles} ${customStyle}`;
};

exports.getEffectiveStyle = getEffectiveStyle;
},{"./Configuration.js":"../node_modules/@ui5/webcomponents-base/src/Configuration.js","./theming/CustomStyle.js":"../node_modules/@ui5/webcomponents-base/src/theming/CustomStyle.js","./theming/ThemeProperties.js":"../node_modules/@ui5/webcomponents-base/src/theming/ThemeProperties.js","./theming/StyleInjection.js":"../node_modules/@ui5/webcomponents-base/src/theming/StyleInjection.js"}],"../node_modules/@ui5/webcomponents-base/src/compatibility/whenPolyfillLoaded.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
let polyfillLoadedPromise;

const whenPolyfillLoaded = () => {
  if (polyfillLoadedPromise) {
    return polyfillLoadedPromise;
  }

  polyfillLoadedPromise = new Promise(resolve => {
    if (window.WebComponents && window.WebComponents.waitFor) {
      // the polyfill loader is present
      window.WebComponents.waitFor(() => {
        // the polyfills are loaded, safe to execute code depending on their APIs
        resolve();
      });
    } else {
      // polyfill loader missing, modern browsers only
      resolve();
    }
  });
  return polyfillLoadedPromise;
};

var _default = whenPolyfillLoaded;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/src/boot.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _whenDOMReady = _interopRequireDefault(require("./util/whenDOMReady.js"));

var _EventEnrichment = _interopRequireDefault(require("./events/EventEnrichment.js"));

var _IconFonts = require("./IconFonts.js");

var _DOMEventHandler = _interopRequireDefault(require("./DOMEventHandler.js"));

var _Theming = require("./Theming.js");

var _whenPolyfillLoaded = _interopRequireDefault(require("./compatibility/whenPolyfillLoaded.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_EventEnrichment.default.run();

let bootPromise;

const boot = () => {
  if (bootPromise) {
    return bootPromise;
  }

  bootPromise = new Promise(async resolve => {
    await (0, _whenDOMReady.default)();
    (0, _Theming.applyTheme)();
    (0, _IconFonts.insertIconFontFace)();

    _DOMEventHandler.default.start();

    await (0, _whenPolyfillLoaded.default)();
    resolve();
  });
  return bootPromise;
};

var _default = boot;
exports.default = _default;
},{"./util/whenDOMReady.js":"../node_modules/@ui5/webcomponents-base/src/util/whenDOMReady.js","./events/EventEnrichment.js":"../node_modules/@ui5/webcomponents-base/src/events/EventEnrichment.js","./IconFonts.js":"../node_modules/@ui5/webcomponents-base/src/IconFonts.js","./DOMEventHandler.js":"../node_modules/@ui5/webcomponents-base/src/DOMEventHandler.js","./Theming.js":"../node_modules/@ui5/webcomponents-base/src/Theming.js","./compatibility/whenPolyfillLoaded.js":"../node_modules/@ui5/webcomponents-base/src/compatibility/whenPolyfillLoaded.js"}],"../node_modules/@ui5/webcomponents-base/src/compatibility/DOMObserver.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// Shorthands
const w = window; // Map of observer objects per dom node

const observers = new WeakMap();
/**
 * Implements universal DOM node observation methods.
 */

class DOMObserver {
  constructor() {
    throw new Error("Static class");
  }
  /**
   * This function abstracts out mutation observer usage inside shadow DOM.
   * For native shadow DOM the native mutation observer is used.
   * When the polyfill is used, the observeChildren ShadyDOM method is used instead.
   *
   * @throws Exception
   * Note: does not allow several mutation observers per node. If there is a valid use-case, this behavior can be changed.
   *
   * @param node
   * @param callback
   * @param options - Only used for the native mutation observer
   */


  static observeDOMNode(node, callback, options) {
    let observerObject = observers.get(node);

    if (observerObject) {
      throw new Error("A mutation/ShadyDOM observer is already assigned to this node.");
    }

    if (w.ShadyDOM) {
      observerObject = w.ShadyDOM.observeChildren(node, callback);
    } else {
      observerObject = new MutationObserver(callback);
      observerObject.observe(node, options);
    }

    observers.set(node, observerObject);
  }
  /**
   * De-registers the mutation observer, depending on its type
   * @param node
   */


  static unobserveDOMNode(node) {
    const observerObject = observers.get(node);

    if (!observerObject) {
      return;
    }

    if (observerObject instanceof MutationObserver) {
      observerObject.disconnect();
    } else {
      w.ShadyDOM.unobserveChildren(observerObject);
    }

    observers.delete(node);
  }

}

var _default = DOMObserver;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/src/types/DataType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Base class for all data types.
 *
 * @class
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.base.types.DataType
 * @public
 */
class DataType {
  static isValid(value) {}

  static generataTypeAcessors(types) {
    Object.keys(types).forEach(type => {
      Object.defineProperty(this, type, {
        get() {
          return types[type];
        }

      });
    });
  }

}

var _default = DataType;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/src/util/isDescendantOf.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const isDescendantOf = (klass, baseKlass, inclusive = false) => {
  if (typeof klass !== "function" || typeof baseKlass !== "function") {
    return false;
  }

  if (inclusive && klass === baseKlass) {
    return true;
  }

  let parent = klass;

  do {
    parent = Object.getPrototypeOf(parent);
  } while (parent !== null && parent !== baseKlass);

  return parent === baseKlass;
};

var _default = isDescendantOf;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/src/UI5ElementMetadata.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DataType = _interopRequireDefault(require("./types/DataType.js"));

var _isDescendantOf = _interopRequireDefault(require("./util/isDescendantOf.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UI5ElementMetadata {
  constructor(metadata) {
    this.metadata = metadata;
  }

  getTag() {
    return this.metadata.tag;
  }

  getNoShadowDOM() {
    return this.metadata.noShadowDOM;
  }

  getDefaultSlot() {
    return this.metadata.defaultSlot || "content";
  }

  getPropsList() {
    return Object.keys(this.getProperties());
  }

  getPublicPropsList() {
    return this.getPropsList().filter(UI5ElementMetadata.isPublicProperty);
  }

  getSlots() {
    return this.metadata.slots || {};
  }

  hasSlots() {
    return !!Object.entries(this.getSlots()).length;
  }

  getProperties() {
    return this.metadata.properties || {};
  }

  getEvents() {
    return this.metadata.events || {};
  }

  static isPublicProperty(prop) {
    return prop.charAt(0) !== "_";
  }

  static validatePropertyValue(value, propData) {
    const isMultiple = propData.multiple;

    if (isMultiple) {
      return value.map(propValue => validateSingleProperty(propValue, propData));
    }

    return validateSingleProperty(value, propData);
  }

  static validateSlotValue(value, slotData) {
    return validateSingleSlot(value, slotData);
  }

}

const validateSingleProperty = (value, propData) => {
  const propertyType = propData.type; // Association handling

  if (propData.association) {
    return value;
  }

  if (propertyType === Boolean) {
    return typeof value === "boolean" ? value : false;
  }

  if (propertyType === String) {
    return typeof value === "string" || typeof value === "undefined" || value === null ? value : value.toString();
  }

  if (propertyType === Object) {
    return typeof value === "object" ? value : propData.defaultValue;
  }

  if ((0, _isDescendantOf.default)(propertyType, _DataType.default)) {
    return propertyType.isValid(value) ? value : propData.defaultValue;
  }
};

const validateSingleSlot = (value, slotData) => {
  if (value === null) {
    return value;
  }

  const getSlottedNodes = el => {
    const isTag = el instanceof HTMLElement;
    const isSlot = isTag && el.tagName.toUpperCase() === "SLOT";

    if (isSlot) {
      return el.assignedNodes({
        flatten: true
      }).filter(item => item instanceof HTMLElement);
    }

    return [el];
  };

  const propertyType = slotData.type;
  const slottedNodes = getSlottedNodes(value);
  slottedNodes.forEach(el => {
    if (!(el instanceof propertyType)) {
      const isHTMLElement = el instanceof HTMLElement;
      const tagName = isHTMLElement && el.tagName.toLowerCase();
      const isCustomElement = isHTMLElement && tagName.includes("-");

      if (isCustomElement) {
        window.customElements.whenDefined(tagName).then(() => {
          if (!(el instanceof propertyType)) {
            throw new Error(`${el} is not of type ${propertyType}`);
          }
        });
      }
    }
  });
  return value;
};

var _default = UI5ElementMetadata;
exports.default = _default;
},{"./types/DataType.js":"../node_modules/@ui5/webcomponents-base/src/types/DataType.js","./util/isDescendantOf.js":"../node_modules/@ui5/webcomponents-base/src/util/isDescendantOf.js"}],"../node_modules/@ui5/webcomponents-base/src/types/Integer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DataType = _interopRequireDefault(require("./DataType.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Integer extends _DataType.default {
  static isValid(value) {
    return Number.isInteger(value);
  }

}

var _default = Integer;
exports.default = _default;
},{"./DataType.js":"../node_modules/@ui5/webcomponents-base/src/types/DataType.js"}],"../node_modules/@ui5/webcomponents-base/src/RenderQueue.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class RenderQueue {
  constructor() {
    this.list = []; // Used to store the web components in order

    this.promises = new Map(); // Used to store promises for web component rendering
  }

  add(webComponent) {
    if (this.promises.has(webComponent)) {
      return this.promises.get(webComponent);
    }

    let deferredResolve;
    const promise = new Promise(resolve => {
      deferredResolve = resolve;
    });
    promise._deferredResolve = deferredResolve;
    this.list.push(webComponent);
    this.promises.set(webComponent, promise);
    return promise;
  }

  shift() {
    const webComponent = this.list.shift();

    if (webComponent) {
      const promise = this.promises.get(webComponent);
      this.promises.delete(webComponent);
      return {
        webComponent,
        promise
      };
    }
  }

  getList() {
    return this.list;
  }

  isAdded(webComponent) {
    return this.promises.has(webComponent);
  }

}

var _default = RenderQueue;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/src/RenderScheduler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _RenderQueue = _interopRequireDefault(require("./RenderQueue.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MAX_RERENDER_COUNT = 10; // Tells whether a render task is currently scheduled

let renderTaskId; // Queue for invalidated web components

const invalidatedWebComponents = new _RenderQueue.default();
let renderTaskPromise, renderTaskPromiseResolve, taskResult;
/**
 * Class that manages the rendering/re-rendering of web components
 * This is always asynchronous
 */

class RenderScheduler {
  constructor() {
    throw new Error("Static class");
  }
  /**
   * Queues a web component for re-rendering
   * @param webComponent
   */


  static renderDeferred(webComponent) {
    // Enqueue the web component
    const res = invalidatedWebComponents.add(webComponent); // Schedule a rendering task

    RenderScheduler.scheduleRenderTask();
    return res;
  }

  static renderImmediately(webComponent) {
    // Enqueue the web component
    const res = invalidatedWebComponents.add(webComponent); // Immediately start a render task

    RenderScheduler.runRenderTask();
    return res;
  }
  /**
   * Schedules a rendering task, if not scheduled already
   */


  static scheduleRenderTask() {
    if (!renderTaskId) {
      // renderTaskId = window.setTimeout(RenderScheduler.renderWebComponents, 3000); // Task
      // renderTaskId = Promise.resolve().then(RenderScheduler.renderWebComponents); // Micro task
      renderTaskId = window.requestAnimationFrame(RenderScheduler.renderWebComponents); // AF
    }
  }

  static runRenderTask() {
    if (!renderTaskId) {
      renderTaskId = 1; // prevent another rendering task from being scheduled, all web components should use this task

      RenderScheduler.renderWebComponents();
    }
  }

  static renderWebComponents() {
    // console.log("------------- NEW RENDER TASK ---------------");
    let webComponentInfo, webComponent, promise;
    const renderStats = new Map();

    while (webComponentInfo = invalidatedWebComponents.shift()) {
      // eslint-disable-line
      webComponent = webComponentInfo.webComponent;
      promise = webComponentInfo.promise;
      const timesRerendered = renderStats.get(webComponent) || 0;

      if (timesRerendered > MAX_RERENDER_COUNT) {
        // console.warn("WARNING RERENDER", webComponent);
        throw new Error(`Web component re-rendered too many times this task, max allowed is: ${MAX_RERENDER_COUNT}`);
      }

      webComponent._render();

      promise._deferredResolve();

      renderStats.set(webComponent, timesRerendered + 1);
    } // wait for Mutation observer just in case


    setTimeout(() => {
      if (invalidatedWebComponents.getList().length === 0) {
        RenderScheduler._resolveTaskPromise();
      }
    }, 200);
    renderTaskId = undefined;
  }
  /**
   * return a promise that will be resolved once all invalidated web components are rendered
   */


  static whenDOMUpdated() {
    if (renderTaskPromise) {
      return renderTaskPromise;
    }

    renderTaskPromise = new Promise(resolve => {
      renderTaskPromiseResolve = resolve;
      window.requestAnimationFrame(() => {
        if (invalidatedWebComponents.getList().length === 0) {
          renderTaskPromise = undefined;
          resolve();
        }
      });
    });
    return renderTaskPromise;
  }

  static getNotDefinedComponents() {
    return Array.from(document.querySelectorAll(":not(:defined)")).filter(el => el.localName.startsWith("ui5-"));
  }
  /**
   * return a promise that will be resolved once all ui5 webcomponents on the page have their shadow root ready
   */


  static async whenShadowDOMReady() {
    const undefinedElements = this.getNotDefinedComponents();
    const definedPromises = undefinedElements.map(el => customElements.whenDefined(el.localName));
    const timeoutPromise = new Promise(resolve => setTimeout(resolve, 5000));
    await Promise.race([Promise.all(definedPromises), timeoutPromise]);
    const stillUndefined = this.getNotDefinedComponents();

    if (stillUndefined.length) {
      // eslint-disable-next-line
      console.warn("undefined elements after 5 seconds: ", [...stillUndefined].map(el => el.localName));
    } // TODO: track promises internally, the dom traversal is a POC only


    const ui5Components = Array.from(document.querySelectorAll("*")).filter(_ => _._shadowRootReadyPromise);
    return Promise.all(ui5Components.map(comp => comp._whenShadowRootReady())).then(() => Promise.resolve()); // qunit has a boolean cheack for the promise value and the array from the Promise all is considered truthy
  }

  static async whenFinished() {
    await RenderScheduler.whenShadowDOMReady();
    await RenderScheduler.whenDOMUpdated();
  }

  static _resolveTaskPromise() {
    if (invalidatedWebComponents.getList().length > 0) {
      // More updates are pending. Resolve will be called again
      return;
    }

    if (renderTaskPromiseResolve) {
      renderTaskPromiseResolve.call(this, taskResult);
      renderTaskPromiseResolve = undefined;
      renderTaskPromise = undefined;
    }
  }

}

var _default = RenderScheduler;
exports.default = _default;
},{"./RenderQueue.js":"../node_modules/@ui5/webcomponents-base/src/RenderQueue.js"}],"../node_modules/@ui5/webcomponents-base/src/CSS.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getShadowRootStyle = exports.getConstructableStyle = exports.createHeadStyle = void 0;

var _Configuration = require("./Configuration.js");

var _Theming = require("./Theming.js");

var _StyleInjection = require("./theming/StyleInjection.js");

const styleMap = new Map();
/**
 * Creates the needed CSS for a web component class in the head tag
 * Note: IE11, Edge
 * @param ElementClass
 */

const createHeadStyle = ElementClass => {
  const tag = ElementClass.getMetadata().getTag();
  const cssContent = (0, _Theming.getEffectiveStyle)(ElementClass);
  (0, _StyleInjection.injectWebComponentStyle)(tag, cssContent);
};
/**
 * Returns (and caches) a constructable style sheet for a web component class
 * Note: Chrome
 * @param ElementClass
 * @returns {*}
 */


exports.createHeadStyle = createHeadStyle;

const getConstructableStyle = ElementClass => {
  const tagName = ElementClass.getMetadata().getTag();
  const styleContent = (0, _Theming.getEffectiveStyle)(ElementClass);
  const theme = (0, _Configuration.getTheme)();
  const key = theme + tagName;

  if (styleMap.has(key)) {
    return styleMap.get(key);
  }

  const style = new CSSStyleSheet();
  style.replaceSync(styleContent);
  styleMap.set(key, style);
  return style;
};
/**
 * Returns the CSS to be injected inside a web component shadow root, or undefined if not needed
 * Note: FF, Safari
 * @param ElementClass
 * @returns {string}
 */


exports.getConstructableStyle = getConstructableStyle;

const getShadowRootStyle = ElementClass => {
  if (document.adoptedStyleSheets || window.ShadyDOM) {
    return;
  }

  const styleContent = (0, _Theming.getEffectiveStyle)(ElementClass);
  return styleContent;
}; // eslint-disable-next-line


exports.getShadowRootStyle = getShadowRootStyle;
},{"./Configuration.js":"../node_modules/@ui5/webcomponents-base/src/Configuration.js","./Theming.js":"../node_modules/@ui5/webcomponents-base/src/Theming.js","./theming/StyleInjection.js":"../node_modules/@ui5/webcomponents-base/src/theming/StyleInjection.js"}],"../node_modules/@ui5/webcomponents-base/src/util/StringHelper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.camelToKebabCase = exports.kebabToCamelCase = void 0;

const kebabToCamelCase = string => toCamelCase(string.split("-"));

exports.kebabToCamelCase = kebabToCamelCase;

const camelToKebabCase = string => string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

exports.camelToKebabCase = camelToKebabCase;

const toCamelCase = parts => {
  return parts.map((string, index) => {
    return index === 0 ? string.toLowerCase() : string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }).join("");
};
},{}],"../node_modules/@ui5/webcomponents-base/src/util/isValidPropertyName.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Checks whether a property name is valid (does not collide with existing DOM API properties)
 * Note: disabled is present in IE so we explicitly allow it here.
 *
 * @param name
 * @returns {boolean}
 */
const isValidPropertyName = name => {
  if (name === "disabled") {
    return true;
  }

  const classes = [HTMLElement, Element, Node];
  return !classes.some(klass => klass.prototype.hasOwnProperty(name)); // eslint-disable-line
};

var _default = isValidPropertyName;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/src/UI5Element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _boot = _interopRequireDefault(require("./boot.js"));

var _Configuration = require("./Configuration.js");

var _DOMObserver = _interopRequireDefault(require("./compatibility/DOMObserver.js"));

var _UI5ElementMetadata = _interopRequireDefault(require("./UI5ElementMetadata.js"));

var _Integer = _interopRequireDefault(require("./types/Integer.js"));

var _RenderScheduler = _interopRequireDefault(require("./RenderScheduler.js"));

var _CSS = require("./CSS.js");

var _Theming = require("./Theming.js");

var _StringHelper = require("./util/StringHelper.js");

var _isValidPropertyName = _interopRequireDefault(require("./util/isValidPropertyName.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const metadata = {
  events: {
    _propertyChange: {}
  }
};
const DefinitionsSet = new Set();
const IDMap = new Map();

class UI5Element extends HTMLElement {
  constructor() {
    super();

    this._generateId();

    this._initializeState();

    this._upgradeAllProperties();

    this._shadowRootReadyPromise = this._initializeShadowRoot();
    (0, _Theming.attachThemeChange)(this.onThemeChanged.bind(this));
    let deferredResolve;
    this._domRefReadyPromise = new Promise(resolve => {
      deferredResolve = resolve;
    });
    this._domRefReadyPromise._deferredResolve = deferredResolve;
    this._monitoredChildProps = new Map();
  }

  _whenShadowRootReady() {
    return this._shadowRootReadyPromise;
  }

  onThemeChanged() {
    if (window.ShadyDOM || this.constructor.getMetadata().getNoShadowDOM()) {
      // polyfill theme handling is in head styles directly
      return;
    }

    const newStyle = (0, _CSS.getConstructableStyle)(this.constructor);

    if (document.adoptedStyleSheets) {
      this.shadowRoot.adoptedStyleSheets = [newStyle];
    } else {
      const oldStyle = this.shadowRoot.querySelector("style");
      oldStyle.textContent = newStyle.textContent;
    }
  }

  _generateId() {
    this._id = this.constructor._nextID();
  }

  async _initializeShadowRoot() {
    if (this.constructor.getMetadata().getNoShadowDOM()) {
      return Promise.resolve();
    }

    this.attachShadow({
      mode: "open"
    }); // IE11, Edge

    if (window.ShadyDOM) {
      (0, _CSS.createHeadStyle)(this.constructor);
    } // Chrome


    if (document.adoptedStyleSheets) {
      const style = (0, _CSS.getConstructableStyle)(this.constructor);
      this.shadowRoot.adoptedStyleSheets = [style];
    }
  }

  async connectedCallback() {
    const isCompact = (0, _Configuration.getCompactSize)();

    if (isCompact) {
      this.setAttribute("data-ui5-compact-size", "");
    }

    if (this.constructor.getMetadata().getNoShadowDOM()) {
      return;
    }

    await this._whenShadowRootReady();

    this._processChildren();

    await _RenderScheduler.default.renderImmediately(this);

    this._domRefReadyPromise._deferredResolve();

    this._startObservingDOMChildren();

    if (typeof this.onEnterDOM === "function") {
      this.onEnterDOM();
    }
  }

  disconnectedCallback() {
    if (this.constructor.getMetadata().getNoShadowDOM()) {
      return;
    }

    this._stopObservingDOMChildren();

    if (typeof this.onExitDOM === "function") {
      this.onExitDOM();
    }
  }

  _startObservingDOMChildren() {
    const shouldObserveChildren = this.constructor.getMetadata().hasSlots();

    if (!shouldObserveChildren) {
      return;
    }

    const mutationObserverOptions = {
      childList: true,
      subtree: true,
      characterData: true
    };

    _DOMObserver.default.observeDOMNode(this, this._processChildren.bind(this), mutationObserverOptions);
  }

  _stopObservingDOMChildren() {
    _DOMObserver.default.unobserveDOMNode(this);
  }

  onChildrenChanged(mutations) {}

  _processChildren(mutations) {
    const hasSlots = this.constructor.getMetadata().hasSlots();

    if (hasSlots) {
      this._updateSlots();
    }

    this.onChildrenChanged(mutations);
  }

  _updateSlots() {
    const slotsMap = this.constructor.getMetadata().getSlots();
    const defaultSlot = this.constructor.getMetadata().getDefaultSlot();
    const canSlotText = slotsMap[defaultSlot] !== undefined && slotsMap[defaultSlot].type === Node;
    let domChildren;

    if (canSlotText) {
      domChildren = Array.from(this.childNodes);
    } else {
      domChildren = Array.from(this.children);
    } // Init the _state object based on the supported slots


    for (const [slot, slotData] of Object.entries(slotsMap)) {
      // eslint-disable-line
      this._clearSlot(slot);
    }

    const autoIncrementMap = new Map();
    domChildren.forEach(child => {
      // Determine the type of the child (mainly by the slot attribute)
      const slotName = this.constructor._getSlotName(child); // Check if the slotName is supported


      if (slotsMap[slotName] === undefined) {
        const validValues = Object.keys(slotsMap).join(", ");
        console.warn(`Unknown slotName: ${slotName}, ignoring`, child, `Valid values are: ${validValues}`); // eslint-disable-line

        return;
      } // For children that need individual slots, calculate them


      if (slotsMap[slotName].individualSlots) {
        const nextId = (autoIncrementMap.get(slotName) || 0) + 1;
        autoIncrementMap.set(slotName, nextId);
        child._individualSlot = `${slotName}-${nextId}`;
      } // Distribute the child in the _state object


      child = this._prepareForSlot(slotName, child);

      if (slotsMap[slotName].multiple) {
        this._state[slotName].push(child);
      } else {
        this._state[slotName] = child;
      }
    });

    this._invalidate();
  } // Removes all children from the slot and detaches listeners, if any


  _clearSlot(slot) {
    const slotData = this.constructor.getMetadata().getSlots()[slot];
    let children = this._state[slot];

    if (!Array.isArray(children)) {
      children = [children];
    }

    children.forEach(child => {
      if (child && child._attachChildPropertyUpdated) {
        this._detachChildPropertyUpdated(child);
      }
    });

    if (slotData.multiple) {
      this._state[slot] = [];
    } else {
      this._state[slot] = null;
    }
  }

  _prepareForSlot(slot, child) {
    const slotData = this.constructor.getMetadata().getSlots()[slot];
    child = this.constructor.getMetadata().constructor.validateSlotValue(child, slotData);

    if (child._attachChildPropertyUpdated) {
      this._attachChildPropertyUpdated(child, slotData);
    }

    return child;
  }

  static get observedAttributes() {
    const observedProps = this.getMetadata().getPublicPropsList();
    return observedProps.map(_StringHelper.camelToKebabCase);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const properties = this.constructor.getMetadata().getProperties();
    const realName = name.replace(/^ui5-/, "");
    const nameInCamelCase = (0, _StringHelper.kebabToCamelCase)(realName);

    if (properties.hasOwnProperty(nameInCamelCase)) {
      // eslint-disable-line
      const propertyTypeClass = properties[nameInCamelCase].type;

      if (propertyTypeClass === Boolean) {
        newValue = newValue !== null;
      }

      if (propertyTypeClass === _Integer.default) {
        newValue = parseInt(newValue);
      }

      this[nameInCamelCase] = newValue;
    }
  }

  _updateAttribute(name, newValue) {
    if (!_UI5ElementMetadata.default.isPublicProperty(name)) {
      return;
    }

    if (typeof newValue === "object") {
      return;
    }

    const attrName = (0, _StringHelper.camelToKebabCase)(name);
    const attrValue = this.getAttribute(attrName);

    if (typeof newValue === "boolean") {
      if (newValue === true && attrValue === null) {
        this.setAttribute(attrName, "");
      } else if (newValue === false && attrValue !== null) {
        this.removeAttribute(attrName);
      }
    } else if (attrValue !== newValue) {
      this.setAttribute(attrName, newValue);
    }
  }

  _upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      // eslint-disable-line
      const value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  _upgradeAllProperties() {
    const allProps = this.constructor.getMetadata().getPropsList();
    allProps.forEach(this._upgradeProperty.bind(this));
  }

  static async define() {
    await (0, _boot.default)();
    const tag = this.getMetadata().getTag();
    const definedLocally = DefinitionsSet.has(tag);
    const definedGlobally = customElements.get(tag);

    if (definedGlobally && !definedLocally) {
      console.warn(`Skipping definition of tag ${tag}, because it was already defined by another instance of ui5-webcomponents.`); // eslint-disable-line
    } else if (!definedGlobally) {
      this.generateAccessors();
      DefinitionsSet.add(tag);
      window.customElements.define(tag, this);
    }

    return this;
  }

  static get metadata() {
    return metadata;
  }

  static get styles() {
    return "";
  }

  _initializeState() {
    const defaultState = this.constructor._getDefaultState();

    this._state = Object.assign({}, defaultState);
    this._delegates = [];
  }

  static getMetadata() {
    let klass = this; // eslint-disable-line

    if (klass.hasOwnProperty("_metadata")) {
      // eslint-disable-line
      return klass._metadata;
    }

    const metadatas = [Object.assign(klass.metadata, {})];

    while (klass !== UI5Element) {
      klass = Object.getPrototypeOf(klass);
      metadatas.push(klass.metadata);
    }

    const result = metadatas[0]; // merge properties

    result.properties = metadatas.reverse().reduce((result, current) => {
      // eslint-disable-line
      Object.assign(result, current.properties);
      return result;
    }, {}); // merge slots

    result.slots = metadatas.reverse().reduce((result, current) => {
      // eslint-disable-line
      Object.assign(result, current.slots);
      return result;
    }, {}); // merge events

    result.events = metadatas.reverse().reduce((result, current) => {
      // eslint-disable-line
      Object.assign(result, current.events);
      return result;
    }, {});
    this._metadata = new _UI5ElementMetadata.default(result);
    return this._metadata;
  }

  _attachChildPropertyUpdated(child, propData) {
    const listenFor = propData.listenFor,
          childMetadata = child.constructor.getMetadata(),
          slotName = this.constructor._getSlotName(child),
          // all slotted children have the same configuration
    childProperties = childMetadata.getProperties();

    let observedProps = [],
        notObservedProps = [];

    if (!listenFor) {
      return;
    }

    if (Array.isArray(listenFor)) {
      observedProps = listenFor;
    } else {
      observedProps = Array.isArray(listenFor.props) ? listenFor.props : Object.keys(childProperties);
      notObservedProps = Array.isArray(listenFor.exclude) ? listenFor.exclude : [];
    }

    if (!this._monitoredChildProps.has(slotName)) {
      this._monitoredChildProps.set(slotName, {
        observedProps,
        notObservedProps
      });
    }

    child.addEventListener("_propertyChange", this._invalidateParentOfPropertyUpdate);
  }

  _detachChildPropertyUpdated(child) {
    child.removeEventListener("_propertyChange", this._invalidateParentOfPropertyUpdate);
  }

  _invalidateParentOfPropertyUpdate(prop) {
    // The web component to be invalidated
    const parentNode = this.parentNode;

    if (!parentNode) {
      return;
    }

    const slotName = parentNode.constructor._getSlotName(this);

    const propsMetadata = parentNode._monitoredChildProps.get(slotName);

    if (!propsMetadata) {
      return;
    }

    const {
      observedProps,
      notObservedProps
    } = propsMetadata;

    if (observedProps.includes(prop.detail.name) && !notObservedProps.includes(prop.detail.name)) {
      parentNode._invalidate("_parent_", this);
    }
  }
  /**
   * Asynchronously re-renders an already rendered web component
   * @private
   */


  _invalidate() {
    if (this._invalidated) {
      return;
    }

    if (this.getDomRef() && !this._suppressInvalidation) {
      this._invalidated = true; // console.log("INVAL", this, ...arguments);

      _RenderScheduler.default.renderDeferred(this);
    }
  }

  _render() {
    // Call the onBeforeRendering hook
    if (typeof this.onBeforeRendering === "function") {
      this._suppressInvalidation = true;
      this.onBeforeRendering();
      delete this._suppressInvalidation;
    } // Update the shadow root with the render result
    // console.log(this.getDomRef() ? "RE-RENDER" : "FIRST RENDER", this);


    delete this._invalidated;

    this._updateShadowRoot(); // Safari requires that children get the slot attribute only after the slot tags have been rendered in the shadow DOM


    this._assignSlotsToChildren(); // Call the onAfterRendering hook


    if (typeof this.onAfterRendering === "function") {
      this.onAfterRendering();
    }
  }

  _updateShadowRoot() {
    const renderResult = this.constructor.template(this); // For browsers that do not support constructable style sheets (and not using the polyfill)

    const styleToPrepend = (0, _CSS.getShadowRootStyle)(this.constructor);
    this.constructor.render(renderResult, this.shadowRoot, styleToPrepend, {
      eventContext: this
    });
  }

  _assignSlotsToChildren() {
    const defaultSlot = this.constructor.getMetadata().getDefaultSlot();
    const domChildren = Array.from(this.children);
    domChildren.forEach(child => {
      const slotName = this.constructor._getSlotName(child);

      const slot = child.getAttribute("slot");
      const hasSlot = !!slot; // Assign individual slots, f.e. items => items-1

      if (child._individualSlot) {
        child.setAttribute("slot", child._individualSlot);
        return;
      } // If the user set a slot equal to the default slot, f.e. slot="content", remove it
      // Otherwise, stop here


      if (slotName === defaultSlot) {
        if (hasSlot) {
          child.removeAttribute("slot");
        }

        return;
      } // Compatibility - for the ones with "data-ui5-slot"
      // If they don't have a slot yet, and are not of the default child type, set slotName as slot


      if (!hasSlot) {
        child.setAttribute("slot", slotName);
      }
    }, this);
    domChildren.filter(child => child._compatibilitySlot).forEach(child => {
      const hasSlot = !!child.getAttribute("slot");
      const needsSlot = child._compatibilitySlot !== defaultSlot;

      if (!hasSlot && needsSlot) {
        child.setAttribute("slot", child._compatibilitySlot);
      }
    });
  }

  getDomRef() {
    if (!this.shadowRoot || this.shadowRoot.children.length === 0) {
      return;
    }

    return this.shadowRoot.children.length === 1 ? this.shadowRoot.children[0] : this.shadowRoot.children[1];
  }

  _waitForDomRef() {
    return this._domRefReadyPromise;
  }

  getFocusDomRef() {
    const domRef = this.getDomRef();

    if (domRef) {
      const focusRef = domRef.querySelector("[data-sap-focus-ref]");
      return focusRef || domRef;
    }
  }

  async focus() {
    await this._waitForDomRef();
    const focusDomRef = this.getFocusDomRef();

    if (focusDomRef) {
      focusDomRef.focus();
    }
  }
  /**
   * Calls the event handler on the web component for a native event
   *
   * @param event The event object
   * @private
   */


  _handleEvent(event) {
    const sHandlerName = `on${event.type}`;

    this._delegates.forEach(delegate => {
      if (delegate[sHandlerName]) {
        delegate[sHandlerName](event);
      }
    });

    if (this[sHandlerName]) {
      this[sHandlerName](event);
    }
  }

  _propertyChange(name, value) {
    this._updateAttribute(name, value);

    const customEvent = new CustomEvent("_propertyChange", {
      detail: {
        name,
        newValue: value
      },
      composed: false,
      bubbles: true
    });
    this.dispatchEvent(customEvent);
  }
  /**
   *
   * @param name - name of the event
   * @param data - additional data for the event
   * @param cancelable - true, if the user can call preventDefault on the event object
   * @returns {boolean} false, if the event was cancelled (preventDefault called), true otherwise
   */


  fireEvent(name, data, cancelable) {
    let compatEventResult = true; // Initialized to true, because if the event is not fired at all, it should be considered "not-prevented"

    const noConflict = (0, _Configuration.getWCNoConflict)();
    const noConflictEvent = new CustomEvent(`ui5-${name}`, {
      detail: data,
      composed: false,
      bubbles: true,
      cancelable
    }); // This will be false if the compat event is prevented

    compatEventResult = this.dispatchEvent(noConflictEvent);

    if (noConflict === true || noConflict.events && noConflict.events.includes && noConflict.events.includes(name)) {
      return compatEventResult;
    }

    const customEvent = new CustomEvent(name, {
      detail: data,
      composed: false,
      bubbles: true,
      cancelable
    }); // This will be false if the normal event is prevented

    const normalEventResult = this.dispatchEvent(customEvent); // Return false if any of the two events was prevented (its result was false).

    return normalEventResult && compatEventResult;
  }

  getSlottedNodes(slotName) {
    const reducer = (acc, curr) => {
      if (curr.tagName.toUpperCase() !== "SLOT") {
        return acc.concat([curr]);
      }

      return acc.concat(curr.assignedNodes({
        flatten: true
      }).filter(item => item instanceof HTMLElement));
    };

    return this[slotName].reduce(reducer, []);
  }
  /**
   * Used to duck-type UI5 elements without using instanceof
   * @returns {boolean}
   * @private
   */


  get _isUI5Element() {
    return true;
  }
  /**
   * Used to generate the next auto-increment id for the current class
   * @returns {string}
   * @private
   */


  static _nextID() {
    const className = "el";
    const lastNumber = IDMap.get(className);
    const nextNumber = lastNumber !== undefined ? lastNumber + 1 : 1;
    IDMap.set(className, nextNumber);
    return `__${className}${nextNumber}`;
  }

  static _getSlotName(child) {
    const defaultSlot = this.getMetadata().getDefaultSlot(); // Text nodes can only go to the default slot

    if (!(child instanceof HTMLElement)) {
      return defaultSlot;
    } // Check for explicitly given logical slot - for backward compatibility, should not be used


    const ui5Slot = child.getAttribute("data-ui5-slot");

    if (ui5Slot) {
      return ui5Slot;
    } // Discover the slot based on the real slot name (f.e. footer => footer, or content-32 => content)


    const slot = child.getAttribute("slot");

    if (slot) {
      const match = slot.match(/^(.+?)-\d+$/);
      return match ? match[1] : slot;
    } // Use default slot as a fallback


    return defaultSlot;
  }

  static _getDefaultState() {
    if (this._defaultState) {
      return this._defaultState;
    }

    const MetadataClass = this.getMetadata();
    const defaultState = {}; // Initialize properties

    const props = MetadataClass.getProperties();

    for (const propName in props) {
      // eslint-disable-line
      const propType = props[propName].type;
      const propDefaultValue = props[propName].defaultValue;

      if (propType === Boolean) {
        defaultState[propName] = false;

        if (propDefaultValue !== undefined) {
          console.warn("The 'defaultValue' metadata key is ignored for all booleans properties, they would be initialized with 'false' by default"); // eslint-disable-line
        }
      } else if (props[propName].multiple) {
        defaultState[propName] = [];
      } else if (propType === Object) {
        defaultState[propName] = "defaultValue" in props[propName] ? props[propName].defaultValue : {};
      } else if (propType === String) {
        defaultState[propName] = propDefaultValue || "";
      } else {
        defaultState[propName] = propDefaultValue;
      }
    } // Initialize slots


    const slots = MetadataClass.getSlots();

    for (const slotName in slots) {
      // eslint-disable-line
      if (slots[slotName].multiple) {
        defaultState[slotName] = [];
      } else {
        defaultState[slotName] = null;
      }
    }

    this._defaultState = defaultState;
    return defaultState;
  }

  static generateAccessors() {
    const proto = this.prototype; // Properties

    const properties = this.getMetadata().getProperties();

    for (const [prop, propData] of Object.entries(properties)) {
      // eslint-disable-line
      if (!(0, _isValidPropertyName.default)(prop)) {
        throw new Error(`"${prop}" is not a valid property name. Use a name that does not collide with DOM APIs`);
      }

      if (propData.type === "boolean" && propData.defaultValue) {
        throw new Error(`Cannot set a default value for property "${prop}". All booleans are false by default.`);
      }

      Object.defineProperty(proto, prop, {
        get() {
          if (this._state[prop] !== undefined) {
            return this._state[prop];
          }

          const propDefaultValue = propData.defaultValue;

          if (propData.type === Boolean) {
            return false;
          } else if (propData.type === String) {
            // eslint-disable-line
            return propDefaultValue || "";
          } else if (propData.multiple) {
            // eslint-disable-line
            return [];
          } else {
            return propDefaultValue;
          }
        },

        set(value) {
          let isDifferent = false;
          value = this.constructor.getMetadata().constructor.validatePropertyValue(value, propData);
          const oldState = this._state[prop];

          if (propData.deepEqual) {
            isDifferent = JSON.stringify(oldState) !== JSON.stringify(value);
          } else {
            isDifferent = oldState !== value;
          }

          if (isDifferent) {
            this._state[prop] = value;

            if (propData.nonVisual) {
              return;
            }

            this._invalidate(prop, value);

            this._propertyChange(prop, value);
          }
        }

      });
    } // Slots


    const slots = this.getMetadata().getSlots();

    for (const [slot, slotData] of Object.entries(slots)) {
      // eslint-disable-line
      if (!(0, _isValidPropertyName.default)(slot)) {
        throw new Error(`"${slot}" is not a valid property name. Use a name that does not collide with DOM APIs`);
      }

      Object.defineProperty(proto, slot, {
        get() {
          if (this._state[slot] !== undefined) {
            return this._state[slot];
          }

          if (slotData.multiple) {
            return [];
          }

          return null;
        },

        set() {
          throw new Error("Cannot set slots directly, use the DOM APIs");
        }

      });
    }
  }

}

var _default = UI5Element;
exports.default = _default;
},{"./boot.js":"../node_modules/@ui5/webcomponents-base/src/boot.js","./Configuration.js":"../node_modules/@ui5/webcomponents-base/src/Configuration.js","./compatibility/DOMObserver.js":"../node_modules/@ui5/webcomponents-base/src/compatibility/DOMObserver.js","./UI5ElementMetadata.js":"../node_modules/@ui5/webcomponents-base/src/UI5ElementMetadata.js","./types/Integer.js":"../node_modules/@ui5/webcomponents-base/src/types/Integer.js","./RenderScheduler.js":"../node_modules/@ui5/webcomponents-base/src/RenderScheduler.js","./CSS.js":"../node_modules/@ui5/webcomponents-base/src/CSS.js","./Theming.js":"../node_modules/@ui5/webcomponents-base/src/Theming.js","./util/StringHelper.js":"../node_modules/@ui5/webcomponents-base/src/util/StringHelper.js","./util/isValidPropertyName.js":"../node_modules/@ui5/webcomponents-base/src/util/isValidPropertyName.js"}],"../node_modules/lit-html/lib/directive.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDirective = exports.directive = void 0;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const directives = new WeakMap();
/**
 * Brands a function as a directive factory function so that lit-html will call
 * the function during template rendering, rather than passing as a value.
 *
 * A _directive_ is a function that takes a Part as an argument. It has the
 * signature: `(part: Part) => void`.
 *
 * A directive _factory_ is a function that takes arguments for data and
 * configuration and returns a directive. Users of directive usually refer to
 * the directive factory as the directive. For example, "The repeat directive".
 *
 * Usually a template author will invoke a directive factory in their template
 * with relevant arguments, which will then return a directive function.
 *
 * Here's an example of using the `repeat()` directive factory that takes an
 * array and a function to render an item:
 *
 * ```js
 * html`<ul><${repeat(items, (item) => html`<li>${item}</li>`)}</ul>`
 * ```
 *
 * When `repeat` is invoked, it returns a directive function that closes over
 * `items` and the template function. When the outer template is rendered, the
 * return directive function is called with the Part for the expression.
 * `repeat` then performs it's custom logic to render multiple items.
 *
 * @param f The directive factory function. Must be a function that returns a
 * function of the signature `(part: Part) => void`. The returned function will
 * be called with the part object.
 *
 * @example
 *
 * import {directive, html} from 'lit-html';
 *
 * const immutable = directive((v) => (part) => {
 *   if (part.value !== v) {
 *     part.setValue(v)
 *   }
 * });
 */

const directive = f => (...args) => {
  const d = f(...args);
  directives.set(d, true);
  return d;
};

exports.directive = directive;

const isDirective = o => {
  return typeof o === 'function' && directives.has(o);
};

exports.isDirective = isDirective;
},{}],"../node_modules/lit-html/lib/dom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeNodes = exports.reparentNodes = exports.isCEPolyfill = void 0;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * True if the custom elements polyfill is in use.
 */
const isCEPolyfill = window.customElements !== undefined && window.customElements.polyfillWrapFlushCallback !== undefined;
/**
 * Reparents nodes, starting from `start` (inclusive) to `end` (exclusive),
 * into another container (could be the same container), before `before`. If
 * `before` is null, it appends the nodes to the container.
 */

exports.isCEPolyfill = isCEPolyfill;

const reparentNodes = (container, start, end = null, before = null) => {
  while (start !== end) {
    const n = start.nextSibling;
    container.insertBefore(start, before);
    start = n;
  }
};
/**
 * Removes nodes, starting from `start` (inclusive) to `end` (exclusive), from
 * `container`.
 */


exports.reparentNodes = reparentNodes;

const removeNodes = (container, start, end = null) => {
  while (start !== end) {
    const n = start.nextSibling;
    container.removeChild(start);
    start = n;
  }
};

exports.removeNodes = removeNodes;
},{}],"../node_modules/lit-html/lib/part.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nothing = exports.noChange = void 0;

/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
const noChange = {};
/**
 * A sentinel value that signals a NodePart to fully clear its content.
 */

exports.noChange = noChange;
const nothing = {};
exports.nothing = nothing;
},{}],"../node_modules/lit-html/lib/template.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lastAttributeNameRegex = exports.createMarker = exports.isTemplatePartActive = exports.Template = exports.boundAttributeSuffix = exports.markerRegex = exports.nodeMarker = exports.marker = void 0;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * An expression marker with embedded unique key to avoid collision with
 * possible text in templates.
 */
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
/**
 * An expression marker used text-positions, multi-binding attributes, and
 * attributes with markup-like text values.
 */

exports.marker = marker;
const nodeMarker = `<!--${marker}-->`;
exports.nodeMarker = nodeMarker;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
/**
 * Suffix appended to all bound attribute names.
 */

exports.markerRegex = markerRegex;
const boundAttributeSuffix = '$lit$';
/**
 * An updateable Template that tracks the location of dynamic parts.
 */

exports.boundAttributeSuffix = boundAttributeSuffix;

class Template {
  constructor(result, element) {
    this.parts = [];
    this.element = element;
    const nodesToRemove = [];
    const stack = []; // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null

    const walker = document.createTreeWalker(element.content, 133
    /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
    , null, false); // Keeps track of the last index associated with a part. We try to delete
    // unnecessary nodes, but we never want to associate two different parts
    // to the same index. They must have a constant node between.

    let lastPartIndex = 0;
    let index = -1;
    let partIndex = 0;
    const {
      strings,
      values: {
        length
      }
    } = result;

    while (partIndex < length) {
      const node = walker.nextNode();

      if (node === null) {
        // We've exhausted the content inside a nested template element.
        // Because we still have parts (the outer for-loop), we know:
        // - There is a template in the stack
        // - The walker will find a nextNode outside the template
        walker.currentNode = stack.pop();
        continue;
      }

      index++;

      if (node.nodeType === 1
      /* Node.ELEMENT_NODE */
      ) {
          if (node.hasAttributes()) {
            const attributes = node.attributes;
            const {
              length
            } = attributes; // Per
            // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
            // attributes are not guaranteed to be returned in document order.
            // In particular, Edge/IE can return them out of order, so we cannot
            // assume a correspondence between part index and attribute index.

            let count = 0;

            for (let i = 0; i < length; i++) {
              if (endsWith(attributes[i].name, boundAttributeSuffix)) {
                count++;
              }
            }

            while (count-- > 0) {
              // Get the template literal section leading up to the first
              // expression in this attribute
              const stringForPart = strings[partIndex]; // Find the attribute name

              const name = lastAttributeNameRegex.exec(stringForPart)[2]; // Find the corresponding attribute
              // All bound attributes have had a suffix added in
              // TemplateResult#getHTML to opt out of special attribute
              // handling. To look up the attribute value we also need to add
              // the suffix.

              const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
              const attributeValue = node.getAttribute(attributeLookupName);
              node.removeAttribute(attributeLookupName);
              const statics = attributeValue.split(markerRegex);
              this.parts.push({
                type: 'attribute',
                index,
                name,
                strings: statics
              });
              partIndex += statics.length - 1;
            }
          }

          if (node.tagName === 'TEMPLATE') {
            stack.push(node);
            walker.currentNode = node.content;
          }
        } else if (node.nodeType === 3
      /* Node.TEXT_NODE */
      ) {
          const data = node.data;

          if (data.indexOf(marker) >= 0) {
            const parent = node.parentNode;
            const strings = data.split(markerRegex);
            const lastIndex = strings.length - 1; // Generate a new text node for each literal section
            // These nodes are also used as the markers for node parts

            for (let i = 0; i < lastIndex; i++) {
              let insert;
              let s = strings[i];

              if (s === '') {
                insert = createMarker();
              } else {
                const match = lastAttributeNameRegex.exec(s);

                if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                  s = s.slice(0, match.index) + match[1] + match[2].slice(0, -boundAttributeSuffix.length) + match[3];
                }

                insert = document.createTextNode(s);
              }

              parent.insertBefore(insert, node);
              this.parts.push({
                type: 'node',
                index: ++index
              });
            } // If there's no text, we must insert a comment to mark our place.
            // Else, we can trust it will stick around after cloning.


            if (strings[lastIndex] === '') {
              parent.insertBefore(createMarker(), node);
              nodesToRemove.push(node);
            } else {
              node.data = strings[lastIndex];
            } // We have a part for each match found


            partIndex += lastIndex;
          }
        } else if (node.nodeType === 8
      /* Node.COMMENT_NODE */
      ) {
          if (node.data === marker) {
            const parent = node.parentNode; // Add a new marker node to be the startNode of the Part if any of
            // the following are true:
            //  * We don't have a previousSibling
            //  * The previousSibling is already the start of a previous part

            if (node.previousSibling === null || index === lastPartIndex) {
              index++;
              parent.insertBefore(createMarker(), node);
            }

            lastPartIndex = index;
            this.parts.push({
              type: 'node',
              index
            }); // If we don't have a nextSibling, keep this node so we have an end.
            // Else, we can remove it to save future costs.

            if (node.nextSibling === null) {
              node.data = '';
            } else {
              nodesToRemove.push(node);
              index--;
            }

            partIndex++;
          } else {
            let i = -1;

            while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
              // Comment node has a binding marker inside, make an inactive part
              // The binding won't work, but subsequent bindings will
              // TODO (justinfagnani): consider whether it's even worth it to
              // make bindings in comments work
              this.parts.push({
                type: 'node',
                index: -1
              });
              partIndex++;
            }
          }
        }
    } // Remove text binding nodes after the walk to not disturb the TreeWalker


    for (const n of nodesToRemove) {
      n.parentNode.removeChild(n);
    }
  }

}

exports.Template = Template;

const endsWith = (str, suffix) => {
  const index = str.length - suffix.length;
  return index >= 0 && str.slice(index) === suffix;
};

const isTemplatePartActive = part => part.index !== -1; // Allows `document.createComment('')` to be renamed for a
// small manual size-savings.


exports.isTemplatePartActive = isTemplatePartActive;

const createMarker = () => document.createComment('');
/**
 * This regex extracts the attribute name preceding an attribute-position
 * expression. It does this by matching the syntax allowed for attributes
 * against the string literal directly preceding the expression, assuming that
 * the expression is in an attribute-value position.
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#elements-attributes
 *
 * " \x09\x0a\x0c\x0d" are HTML space characters:
 * https://www.w3.org/TR/html5/infrastructure.html#space-characters
 *
 * "\0-\x1F\x7F-\x9F" are Unicode control characters, which includes every
 * space character except " ".
 *
 * So an attribute is:
 *  * The name: any character except a control character, space character, ('),
 *    ("), ">", "=", or "/"
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */


exports.createMarker = createMarker;
const lastAttributeNameRegex = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
exports.lastAttributeNameRegex = lastAttributeNameRegex;
},{}],"../node_modules/lit-html/lib/template-instance.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemplateInstance = void 0;

var _dom = require("./dom.js");

var _template = require("./template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * @module lit-html
 */

/**
 * An instance of a `Template` that can be attached to the DOM and updated
 * with new values.
 */
class TemplateInstance {
  constructor(template, processor, options) {
    this.__parts = [];
    this.template = template;
    this.processor = processor;
    this.options = options;
  }

  update(values) {
    let i = 0;

    for (const part of this.__parts) {
      if (part !== undefined) {
        part.setValue(values[i]);
      }

      i++;
    }

    for (const part of this.__parts) {
      if (part !== undefined) {
        part.commit();
      }
    }
  }

  _clone() {
    // There are a number of steps in the lifecycle of a template instance's
    // DOM fragment:
    //  1. Clone - create the instance fragment
    //  2. Adopt - adopt into the main document
    //  3. Process - find part markers and create parts
    //  4. Upgrade - upgrade custom elements
    //  5. Update - set node, attribute, property, etc., values
    //  6. Connect - connect to the document. Optional and outside of this
    //     method.
    //
    // We have a few constraints on the ordering of these steps:
    //  * We need to upgrade before updating, so that property values will pass
    //    through any property setters.
    //  * We would like to process before upgrading so that we're sure that the
    //    cloned fragment is inert and not disturbed by self-modifying DOM.
    //  * We want custom elements to upgrade even in disconnected fragments.
    //
    // Given these constraints, with full custom elements support we would
    // prefer the order: Clone, Process, Adopt, Upgrade, Update, Connect
    //
    // But Safari dooes not implement CustomElementRegistry#upgrade, so we
    // can not implement that order and still have upgrade-before-update and
    // upgrade disconnected fragments. So we instead sacrifice the
    // process-before-upgrade constraint, since in Custom Elements v1 elements
    // must not modify their light DOM in the constructor. We still have issues
    // when co-existing with CEv0 elements like Polymer 1, and with polyfills
    // that don't strictly adhere to the no-modification rule because shadow
    // DOM, which may be created in the constructor, is emulated by being placed
    // in the light DOM.
    //
    // The resulting order is on native is: Clone, Adopt, Upgrade, Process,
    // Update, Connect. document.importNode() performs Clone, Adopt, and Upgrade
    // in one step.
    //
    // The Custom Elements v1 polyfill supports upgrade(), so the order when
    // polyfilled is the more ideal: Clone, Process, Adopt, Upgrade, Update,
    // Connect.
    const fragment = _dom.isCEPolyfill ? this.template.element.content.cloneNode(true) : document.importNode(this.template.element.content, true);
    const stack = [];
    const parts = this.template.parts; // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null

    const walker = document.createTreeWalker(fragment, 133
    /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
    , null, false);
    let partIndex = 0;
    let nodeIndex = 0;
    let part;
    let node = walker.nextNode(); // Loop through all the nodes and parts of a template

    while (partIndex < parts.length) {
      part = parts[partIndex];

      if (!(0, _template.isTemplatePartActive)(part)) {
        this.__parts.push(undefined);

        partIndex++;
        continue;
      } // Progress the tree walker until we find our next part's node.
      // Note that multiple parts may share the same node (attribute parts
      // on a single element), so this loop may not run at all.


      while (nodeIndex < part.index) {
        nodeIndex++;

        if (node.nodeName === 'TEMPLATE') {
          stack.push(node);
          walker.currentNode = node.content;
        }

        if ((node = walker.nextNode()) === null) {
          // We've exhausted the content inside a nested template element.
          // Because we still have parts (the outer for-loop), we know:
          // - There is a template in the stack
          // - The walker will find a nextNode outside the template
          walker.currentNode = stack.pop();
          node = walker.nextNode();
        }
      } // We've arrived at our part's node.


      if (part.type === 'node') {
        const part = this.processor.handleTextExpression(this.options);
        part.insertAfterNode(node.previousSibling);

        this.__parts.push(part);
      } else {
        this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
      }

      partIndex++;
    }

    if (_dom.isCEPolyfill) {
      document.adoptNode(fragment);
      customElements.upgrade(fragment);
    }

    return fragment;
  }

}

exports.TemplateInstance = TemplateInstance;
},{"./dom.js":"../node_modules/lit-html/lib/dom.js","./template.js":"../node_modules/lit-html/lib/template.js"}],"../node_modules/lit-html/lib/template-result.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SVGTemplateResult = exports.TemplateResult = void 0;

var _dom = require("./dom.js");

var _template = require("./template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * @module lit-html
 */

/**
 * The return type of `html`, which holds a Template and the values from
 * interpolated expressions.
 */
class TemplateResult {
  constructor(strings, values, type, processor) {
    this.strings = strings;
    this.values = values;
    this.type = type;
    this.processor = processor;
  }
  /**
   * Returns a string of HTML used to create a `<template>` element.
   */


  getHTML() {
    const l = this.strings.length - 1;
    let html = '';
    let isCommentBinding = false;

    for (let i = 0; i < l; i++) {
      const s = this.strings[i]; // For each binding we want to determine the kind of marker to insert
      // into the template source before it's parsed by the browser's HTML
      // parser. The marker type is based on whether the expression is in an
      // attribute, text, or comment poisition.
      //   * For node-position bindings we insert a comment with the marker
      //     sentinel as its text content, like <!--{{lit-guid}}-->.
      //   * For attribute bindings we insert just the marker sentinel for the
      //     first binding, so that we support unquoted attribute bindings.
      //     Subsequent bindings can use a comment marker because multi-binding
      //     attributes must be quoted.
      //   * For comment bindings we insert just the marker sentinel so we don't
      //     close the comment.
      //
      // The following code scans the template source, but is *not* an HTML
      // parser. We don't need to track the tree structure of the HTML, only
      // whether a binding is inside a comment, and if not, if it appears to be
      // the first binding in an attribute.

      const commentOpen = s.lastIndexOf('<!--'); // We're in comment position if we have a comment open with no following
      // comment close. Because <-- can appear in an attribute value there can
      // be false positives.

      isCommentBinding = (commentOpen > -1 || isCommentBinding) && s.indexOf('-->', commentOpen + 1) === -1; // Check to see if we have an attribute-like sequence preceeding the
      // expression. This can match "name=value" like structures in text,
      // comments, and attribute values, so there can be false-positives.

      const attributeMatch = _template.lastAttributeNameRegex.exec(s);

      if (attributeMatch === null) {
        // We're only in this branch if we don't have a attribute-like
        // preceeding sequence. For comments, this guards against unusual
        // attribute values like <div foo="<!--${'bar'}">. Cases like
        // <!-- foo=${'bar'}--> are handled correctly in the attribute branch
        // below.
        html += s + (isCommentBinding ? _template.marker : _template.nodeMarker);
      } else {
        // For attributes we use just a marker sentinel, and also append a
        // $lit$ suffix to the name to opt-out of attribute-specific parsing
        // that IE and Edge do for style and certain SVG attributes.
        html += s.substr(0, attributeMatch.index) + attributeMatch[1] + attributeMatch[2] + _template.boundAttributeSuffix + attributeMatch[3] + _template.marker;
      }
    }

    html += this.strings[l];
    return html;
  }

  getTemplateElement() {
    const template = document.createElement('template');
    template.innerHTML = this.getHTML();
    return template;
  }

}
/**
 * A TemplateResult for SVG fragments.
 *
 * This class wraps HTML in an `<svg>` tag in order to parse its contents in the
 * SVG namespace, then modifies the template to remove the `<svg>` tag so that
 * clones only container the original fragment.
 */


exports.TemplateResult = TemplateResult;

class SVGTemplateResult extends TemplateResult {
  getHTML() {
    return `<svg>${super.getHTML()}</svg>`;
  }

  getTemplateElement() {
    const template = super.getTemplateElement();
    const content = template.content;
    const svgElement = content.firstChild;
    content.removeChild(svgElement);
    (0, _dom.reparentNodes)(content, svgElement.firstChild);
    return template;
  }

}

exports.SVGTemplateResult = SVGTemplateResult;
},{"./dom.js":"../node_modules/lit-html/lib/dom.js","./template.js":"../node_modules/lit-html/lib/template.js"}],"../node_modules/lit-html/lib/parts.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventPart = exports.PropertyPart = exports.PropertyCommitter = exports.BooleanAttributePart = exports.NodePart = exports.AttributePart = exports.AttributeCommitter = exports.isIterable = exports.isPrimitive = void 0;

var _directive = require("./directive.js");

var _dom = require("./dom.js");

var _part = require("./part.js");

var _templateInstance = require("./template-instance.js");

var _templateResult = require("./template-result.js");

var _template = require("./template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * @module lit-html
 */
const isPrimitive = value => {
  return value === null || !(typeof value === 'object' || typeof value === 'function');
};

exports.isPrimitive = isPrimitive;

const isIterable = value => {
  return Array.isArray(value) || // tslint:disable-next-line:no-any
  !!(value && value[Symbol.iterator]);
};
/**
 * Writes attribute values to the DOM for a group of AttributeParts bound to a
 * single attibute. The value is only set once even if there are multiple parts
 * for an attribute.
 */


exports.isIterable = isIterable;

class AttributeCommitter {
  constructor(element, name, strings) {
    this.dirty = true;
    this.element = element;
    this.name = name;
    this.strings = strings;
    this.parts = [];

    for (let i = 0; i < strings.length - 1; i++) {
      this.parts[i] = this._createPart();
    }
  }
  /**
   * Creates a single part. Override this to create a differnt type of part.
   */


  _createPart() {
    return new AttributePart(this);
  }

  _getValue() {
    const strings = this.strings;
    const l = strings.length - 1;
    let text = '';

    for (let i = 0; i < l; i++) {
      text += strings[i];
      const part = this.parts[i];

      if (part !== undefined) {
        const v = part.value;

        if (isPrimitive(v) || !isIterable(v)) {
          text += typeof v === 'string' ? v : String(v);
        } else {
          for (const t of v) {
            text += typeof t === 'string' ? t : String(t);
          }
        }
      }
    }

    text += strings[l];
    return text;
  }

  commit() {
    if (this.dirty) {
      this.dirty = false;
      this.element.setAttribute(this.name, this._getValue());
    }
  }

}
/**
 * A Part that controls all or part of an attribute value.
 */


exports.AttributeCommitter = AttributeCommitter;

class AttributePart {
  constructor(committer) {
    this.value = undefined;
    this.committer = committer;
  }

  setValue(value) {
    if (value !== _part.noChange && (!isPrimitive(value) || value !== this.value)) {
      this.value = value; // If the value is a not a directive, dirty the committer so that it'll
      // call setAttribute. If the value is a directive, it'll dirty the
      // committer if it calls setValue().

      if (!(0, _directive.isDirective)(value)) {
        this.committer.dirty = true;
      }
    }
  }

  commit() {
    while ((0, _directive.isDirective)(this.value)) {
      const directive = this.value;
      this.value = _part.noChange;
      directive(this);
    }

    if (this.value === _part.noChange) {
      return;
    }

    this.committer.commit();
  }

}
/**
 * A Part that controls a location within a Node tree. Like a Range, NodePart
 * has start and end locations and can set and update the Nodes between those
 * locations.
 *
 * NodeParts support several value types: primitives, Nodes, TemplateResults,
 * as well as arrays and iterables of those types.
 */


exports.AttributePart = AttributePart;

class NodePart {
  constructor(options) {
    this.value = undefined;
    this.__pendingValue = undefined;
    this.options = options;
  }
  /**
   * Appends this part into a container.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  appendInto(container) {
    this.startNode = container.appendChild((0, _template.createMarker)());
    this.endNode = container.appendChild((0, _template.createMarker)());
  }
  /**
   * Inserts this part after the `ref` node (between `ref` and `ref`'s next
   * sibling). Both `ref` and its next sibling must be static, unchanging nodes
   * such as those that appear in a literal section of a template.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  insertAfterNode(ref) {
    this.startNode = ref;
    this.endNode = ref.nextSibling;
  }
  /**
   * Appends this part into a parent part.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  appendIntoPart(part) {
    part.__insert(this.startNode = (0, _template.createMarker)());

    part.__insert(this.endNode = (0, _template.createMarker)());
  }
  /**
   * Inserts this part after the `ref` part.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  insertAfterPart(ref) {
    ref.__insert(this.startNode = (0, _template.createMarker)());

    this.endNode = ref.endNode;
    ref.endNode = this.startNode;
  }

  setValue(value) {
    this.__pendingValue = value;
  }

  commit() {
    while ((0, _directive.isDirective)(this.__pendingValue)) {
      const directive = this.__pendingValue;
      this.__pendingValue = _part.noChange;
      directive(this);
    }

    const value = this.__pendingValue;

    if (value === _part.noChange) {
      return;
    }

    if (isPrimitive(value)) {
      if (value !== this.value) {
        this.__commitText(value);
      }
    } else if (value instanceof _templateResult.TemplateResult) {
      this.__commitTemplateResult(value);
    } else if (value instanceof Node) {
      this.__commitNode(value);
    } else if (isIterable(value)) {
      this.__commitIterable(value);
    } else if (value === _part.nothing) {
      this.value = _part.nothing;
      this.clear();
    } else {
      // Fallback, will render the string representation
      this.__commitText(value);
    }
  }

  __insert(node) {
    this.endNode.parentNode.insertBefore(node, this.endNode);
  }

  __commitNode(value) {
    if (this.value === value) {
      return;
    }

    this.clear();

    this.__insert(value);

    this.value = value;
  }

  __commitText(value) {
    const node = this.startNode.nextSibling;
    value = value == null ? '' : value;

    if (node === this.endNode.previousSibling && node.nodeType === 3
    /* Node.TEXT_NODE */
    ) {
        // If we only have a single text node between the markers, we can just
        // set its value, rather than replacing it.
        // TODO(justinfagnani): Can we just check if this.value is primitive?
        node.data = value;
      } else {
      this.__commitNode(document.createTextNode(typeof value === 'string' ? value : String(value)));
    }

    this.value = value;
  }

  __commitTemplateResult(value) {
    const template = this.options.templateFactory(value);

    if (this.value instanceof _templateInstance.TemplateInstance && this.value.template === template) {
      this.value.update(value.values);
    } else {
      // Make sure we propagate the template processor from the TemplateResult
      // so that we use its syntax extension, etc. The template factory comes
      // from the render function options so that it can control template
      // caching and preprocessing.
      const instance = new _templateInstance.TemplateInstance(template, value.processor, this.options);

      const fragment = instance._clone();

      instance.update(value.values);

      this.__commitNode(fragment);

      this.value = instance;
    }
  }

  __commitIterable(value) {
    // For an Iterable, we create a new InstancePart per item, then set its
    // value to the item. This is a little bit of overhead for every item in
    // an Iterable, but it lets us recurse easily and efficiently update Arrays
    // of TemplateResults that will be commonly returned from expressions like:
    // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
    // If _value is an array, then the previous render was of an
    // iterable and _value will contain the NodeParts from the previous
    // render. If _value is not an array, clear this part and make a new
    // array for NodeParts.
    if (!Array.isArray(this.value)) {
      this.value = [];
      this.clear();
    } // Lets us keep track of how many items we stamped so we can clear leftover
    // items from a previous render


    const itemParts = this.value;
    let partIndex = 0;
    let itemPart;

    for (const item of value) {
      // Try to reuse an existing part
      itemPart = itemParts[partIndex]; // If no existing part, create a new one

      if (itemPart === undefined) {
        itemPart = new NodePart(this.options);
        itemParts.push(itemPart);

        if (partIndex === 0) {
          itemPart.appendIntoPart(this);
        } else {
          itemPart.insertAfterPart(itemParts[partIndex - 1]);
        }
      }

      itemPart.setValue(item);
      itemPart.commit();
      partIndex++;
    }

    if (partIndex < itemParts.length) {
      // Truncate the parts array so _value reflects the current state
      itemParts.length = partIndex;
      this.clear(itemPart && itemPart.endNode);
    }
  }

  clear(startNode = this.startNode) {
    (0, _dom.removeNodes)(this.startNode.parentNode, startNode.nextSibling, this.endNode);
  }

}
/**
 * Implements a boolean attribute, roughly as defined in the HTML
 * specification.
 *
 * If the value is truthy, then the attribute is present with a value of
 * ''. If the value is falsey, the attribute is removed.
 */


exports.NodePart = NodePart;

class BooleanAttributePart {
  constructor(element, name, strings) {
    this.value = undefined;
    this.__pendingValue = undefined;

    if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
      throw new Error('Boolean attributes can only contain a single expression');
    }

    this.element = element;
    this.name = name;
    this.strings = strings;
  }

  setValue(value) {
    this.__pendingValue = value;
  }

  commit() {
    while ((0, _directive.isDirective)(this.__pendingValue)) {
      const directive = this.__pendingValue;
      this.__pendingValue = _part.noChange;
      directive(this);
    }

    if (this.__pendingValue === _part.noChange) {
      return;
    }

    const value = !!this.__pendingValue;

    if (this.value !== value) {
      if (value) {
        this.element.setAttribute(this.name, '');
      } else {
        this.element.removeAttribute(this.name);
      }

      this.value = value;
    }

    this.__pendingValue = _part.noChange;
  }

}
/**
 * Sets attribute values for PropertyParts, so that the value is only set once
 * even if there are multiple parts for a property.
 *
 * If an expression controls the whole property value, then the value is simply
 * assigned to the property under control. If there are string literals or
 * multiple expressions, then the strings are expressions are interpolated into
 * a string first.
 */


exports.BooleanAttributePart = BooleanAttributePart;

class PropertyCommitter extends AttributeCommitter {
  constructor(element, name, strings) {
    super(element, name, strings);
    this.single = strings.length === 2 && strings[0] === '' && strings[1] === '';
  }

  _createPart() {
    return new PropertyPart(this);
  }

  _getValue() {
    if (this.single) {
      return this.parts[0].value;
    }

    return super._getValue();
  }

  commit() {
    if (this.dirty) {
      this.dirty = false; // tslint:disable-next-line:no-any

      this.element[this.name] = this._getValue();
    }
  }

}

exports.PropertyCommitter = PropertyCommitter;

class PropertyPart extends AttributePart {} // Detect event listener options support. If the `capture` property is read
// from the options object, then options are supported. If not, then the thrid
// argument to add/removeEventListener is interpreted as the boolean capture
// value so we should only pass the `capture` property.


exports.PropertyPart = PropertyPart;
let eventOptionsSupported = false;

try {
  const options = {
    get capture() {
      eventOptionsSupported = true;
      return false;
    }

  }; // tslint:disable-next-line:no-any

  window.addEventListener('test', options, options); // tslint:disable-next-line:no-any

  window.removeEventListener('test', options, options);
} catch (_e) {}

class EventPart {
  constructor(element, eventName, eventContext) {
    this.value = undefined;
    this.__pendingValue = undefined;
    this.element = element;
    this.eventName = eventName;
    this.eventContext = eventContext;

    this.__boundHandleEvent = e => this.handleEvent(e);
  }

  setValue(value) {
    this.__pendingValue = value;
  }

  commit() {
    while ((0, _directive.isDirective)(this.__pendingValue)) {
      const directive = this.__pendingValue;
      this.__pendingValue = _part.noChange;
      directive(this);
    }

    if (this.__pendingValue === _part.noChange) {
      return;
    }

    const newListener = this.__pendingValue;
    const oldListener = this.value;
    const shouldRemoveListener = newListener == null || oldListener != null && (newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive);
    const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);

    if (shouldRemoveListener) {
      this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
    }

    if (shouldAddListener) {
      this.__options = getOptions(newListener);
      this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
    }

    this.value = newListener;
    this.__pendingValue = _part.noChange;
  }

  handleEvent(event) {
    if (typeof this.value === 'function') {
      this.value.call(this.eventContext || this.element, event);
    } else {
      this.value.handleEvent(event);
    }
  }

} // We copy options because of the inconsistent behavior of browsers when reading
// the third argument of add/removeEventListener. IE11 doesn't support options
// at all. Chrome 41 only reads `capture` if the argument is an object.


exports.EventPart = EventPart;

const getOptions = o => o && (eventOptionsSupported ? {
  capture: o.capture,
  passive: o.passive,
  once: o.once
} : o.capture);
},{"./directive.js":"../node_modules/lit-html/lib/directive.js","./dom.js":"../node_modules/lit-html/lib/dom.js","./part.js":"../node_modules/lit-html/lib/part.js","./template-instance.js":"../node_modules/lit-html/lib/template-instance.js","./template-result.js":"../node_modules/lit-html/lib/template-result.js","./template.js":"../node_modules/lit-html/lib/template.js"}],"../node_modules/lit-html/lib/default-template-processor.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTemplateProcessor = exports.DefaultTemplateProcessor = void 0;

var _parts = require("./parts.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * Creates Parts when a template is instantiated.
 */
class DefaultTemplateProcessor {
  /**
   * Create parts for an attribute-position binding, given the event, attribute
   * name, and string literals.
   *
   * @param element The element containing the binding
   * @param name  The attribute name
   * @param strings The string literals. There are always at least two strings,
   *   event for fully-controlled bindings with a single expression.
   */
  handleAttributeExpressions(element, name, strings, options) {
    const prefix = name[0];

    if (prefix === '.') {
      const committer = new _parts.PropertyCommitter(element, name.slice(1), strings);
      return committer.parts;
    }

    if (prefix === '@') {
      return [new _parts.EventPart(element, name.slice(1), options.eventContext)];
    }

    if (prefix === '?') {
      return [new _parts.BooleanAttributePart(element, name.slice(1), strings)];
    }

    const committer = new _parts.AttributeCommitter(element, name, strings);
    return committer.parts;
  }
  /**
   * Create parts for a text-position binding.
   * @param templateFactory
   */


  handleTextExpression(options) {
    return new _parts.NodePart(options);
  }

}

exports.DefaultTemplateProcessor = DefaultTemplateProcessor;
const defaultTemplateProcessor = new DefaultTemplateProcessor();
exports.defaultTemplateProcessor = defaultTemplateProcessor;
},{"./parts.js":"../node_modules/lit-html/lib/parts.js"}],"../node_modules/lit-html/lib/template-factory.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.templateFactory = templateFactory;
exports.templateCaches = void 0;

var _template = require("./template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * The default TemplateFactory which caches Templates keyed on
 * result.type and result.strings.
 */
function templateFactory(result) {
  let templateCache = templateCaches.get(result.type);

  if (templateCache === undefined) {
    templateCache = {
      stringsArray: new WeakMap(),
      keyString: new Map()
    };
    templateCaches.set(result.type, templateCache);
  }

  let template = templateCache.stringsArray.get(result.strings);

  if (template !== undefined) {
    return template;
  } // If the TemplateStringsArray is new, generate a key from the strings
  // This key is shared between all templates with identical content


  const key = result.strings.join(_template.marker); // Check if we already have a Template for this key

  template = templateCache.keyString.get(key);

  if (template === undefined) {
    // If we have not seen this key before, create a new Template
    template = new _template.Template(result, result.getTemplateElement()); // Cache the Template for this key

    templateCache.keyString.set(key, template);
  } // Cache all future queries for this TemplateStringsArray


  templateCache.stringsArray.set(result.strings, template);
  return template;
}

const templateCaches = new Map();
exports.templateCaches = templateCaches;
},{"./template.js":"../node_modules/lit-html/lib/template.js"}],"../node_modules/lit-html/lib/render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = exports.parts = void 0;

var _dom = require("./dom.js");

var _parts = require("./parts.js");

var _templateFactory = require("./template-factory.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * @module lit-html
 */
const parts = new WeakMap();
/**
 * Renders a template to a container.
 *
 * To update a container with new values, reevaluate the template literal and
 * call `render` with the new result.
 *
 * @param result a TemplateResult created by evaluating a template tag like
 *     `html` or `svg`.
 * @param container A DOM parent to render to. The entire contents are either
 *     replaced, or efficiently updated if the same result type was previous
 *     rendered there.
 * @param options RenderOptions for the entire render tree rendered to this
 *     container. Render options must *not* change between renders to the same
 *     container, as those changes will not effect previously rendered DOM.
 */

exports.parts = parts;

const render = (result, container, options) => {
  let part = parts.get(container);

  if (part === undefined) {
    (0, _dom.removeNodes)(container, container.firstChild);
    parts.set(container, part = new _parts.NodePart(Object.assign({
      templateFactory: _templateFactory.templateFactory
    }, options)));
    part.appendInto(container);
  }

  part.setValue(result);
  part.commit();
};

exports.render = render;
},{"./dom.js":"../node_modules/lit-html/lib/dom.js","./parts.js":"../node_modules/lit-html/lib/parts.js","./template-factory.js":"../node_modules/lit-html/lib/template-factory.js"}],"../node_modules/lit-html/lit-html.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DefaultTemplateProcessor", {
  enumerable: true,
  get: function () {
    return _defaultTemplateProcessor.DefaultTemplateProcessor;
  }
});
Object.defineProperty(exports, "defaultTemplateProcessor", {
  enumerable: true,
  get: function () {
    return _defaultTemplateProcessor.defaultTemplateProcessor;
  }
});
Object.defineProperty(exports, "SVGTemplateResult", {
  enumerable: true,
  get: function () {
    return _templateResult.SVGTemplateResult;
  }
});
Object.defineProperty(exports, "TemplateResult", {
  enumerable: true,
  get: function () {
    return _templateResult.TemplateResult;
  }
});
Object.defineProperty(exports, "directive", {
  enumerable: true,
  get: function () {
    return _directive.directive;
  }
});
Object.defineProperty(exports, "isDirective", {
  enumerable: true,
  get: function () {
    return _directive.isDirective;
  }
});
Object.defineProperty(exports, "removeNodes", {
  enumerable: true,
  get: function () {
    return _dom.removeNodes;
  }
});
Object.defineProperty(exports, "reparentNodes", {
  enumerable: true,
  get: function () {
    return _dom.reparentNodes;
  }
});
Object.defineProperty(exports, "noChange", {
  enumerable: true,
  get: function () {
    return _part.noChange;
  }
});
Object.defineProperty(exports, "nothing", {
  enumerable: true,
  get: function () {
    return _part.nothing;
  }
});
Object.defineProperty(exports, "AttributeCommitter", {
  enumerable: true,
  get: function () {
    return _parts.AttributeCommitter;
  }
});
Object.defineProperty(exports, "AttributePart", {
  enumerable: true,
  get: function () {
    return _parts.AttributePart;
  }
});
Object.defineProperty(exports, "BooleanAttributePart", {
  enumerable: true,
  get: function () {
    return _parts.BooleanAttributePart;
  }
});
Object.defineProperty(exports, "EventPart", {
  enumerable: true,
  get: function () {
    return _parts.EventPart;
  }
});
Object.defineProperty(exports, "isIterable", {
  enumerable: true,
  get: function () {
    return _parts.isIterable;
  }
});
Object.defineProperty(exports, "isPrimitive", {
  enumerable: true,
  get: function () {
    return _parts.isPrimitive;
  }
});
Object.defineProperty(exports, "NodePart", {
  enumerable: true,
  get: function () {
    return _parts.NodePart;
  }
});
Object.defineProperty(exports, "PropertyCommitter", {
  enumerable: true,
  get: function () {
    return _parts.PropertyCommitter;
  }
});
Object.defineProperty(exports, "PropertyPart", {
  enumerable: true,
  get: function () {
    return _parts.PropertyPart;
  }
});
Object.defineProperty(exports, "parts", {
  enumerable: true,
  get: function () {
    return _render.parts;
  }
});
Object.defineProperty(exports, "render", {
  enumerable: true,
  get: function () {
    return _render.render;
  }
});
Object.defineProperty(exports, "templateCaches", {
  enumerable: true,
  get: function () {
    return _templateFactory.templateCaches;
  }
});
Object.defineProperty(exports, "templateFactory", {
  enumerable: true,
  get: function () {
    return _templateFactory.templateFactory;
  }
});
Object.defineProperty(exports, "TemplateInstance", {
  enumerable: true,
  get: function () {
    return _templateInstance.TemplateInstance;
  }
});
Object.defineProperty(exports, "createMarker", {
  enumerable: true,
  get: function () {
    return _template.createMarker;
  }
});
Object.defineProperty(exports, "isTemplatePartActive", {
  enumerable: true,
  get: function () {
    return _template.isTemplatePartActive;
  }
});
Object.defineProperty(exports, "Template", {
  enumerable: true,
  get: function () {
    return _template.Template;
  }
});
exports.svg = exports.html = void 0;

var _defaultTemplateProcessor = require("./lib/default-template-processor.js");

var _templateResult = require("./lib/template-result.js");

var _directive = require("./lib/directive.js");

var _dom = require("./lib/dom.js");

var _part = require("./lib/part.js");

var _parts = require("./lib/parts.js");

var _render = require("./lib/render.js");

var _templateFactory = require("./lib/template-factory.js");

var _templateInstance = require("./lib/template-instance.js");

var _template = require("./lib/template.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 *
 * Main lit-html module.
 *
 * Main exports:
 *
 * -  [[html]]
 * -  [[svg]]
 * -  [[render]]
 *
 * @module lit-html
 * @preferred
 */

/**
 * Do not remove this comment; it keeps typedoc from misplacing the module
 * docs.
 */
// TODO(justinfagnani): remove line when we get NodePart moving methods
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for lit-html usage.
// TODO(justinfagnani): inject version number at build time
(window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.0.0');
/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */

const html = (strings, ...values) => new _templateResult.TemplateResult(strings, values, 'html', _defaultTemplateProcessor.defaultTemplateProcessor);
/**
 * Interprets a template literal as an SVG template that can efficiently
 * render to and update a container.
 */


exports.html = html;

const svg = (strings, ...values) => new _templateResult.SVGTemplateResult(strings, values, 'svg', _defaultTemplateProcessor.defaultTemplateProcessor);

exports.svg = svg;
},{"./lib/default-template-processor.js":"../node_modules/lit-html/lib/default-template-processor.js","./lib/template-result.js":"../node_modules/lit-html/lib/template-result.js","./lib/directive.js":"../node_modules/lit-html/lib/directive.js","./lib/dom.js":"../node_modules/lit-html/lib/dom.js","./lib/part.js":"../node_modules/lit-html/lib/part.js","./lib/parts.js":"../node_modules/lit-html/lib/parts.js","./lib/render.js":"../node_modules/lit-html/lib/render.js","./lib/template-factory.js":"../node_modules/lit-html/lib/template-factory.js","./lib/template-instance.js":"../node_modules/lit-html/lib/template-instance.js","./lib/template.js":"../node_modules/lit-html/lib/template.js"}],"../node_modules/lit-html/directives/repeat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.repeat = void 0;

var _litHtml = require("../lit-html.js");

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// Helper functions for manipulating parts
// TODO(kschaaf): Refactor into Part API?
const createAndInsertPart = (containerPart, beforePart) => {
  const container = containerPart.startNode.parentNode;
  const beforeNode = beforePart === undefined ? containerPart.endNode : beforePart.startNode;
  const startNode = container.insertBefore((0, _litHtml.createMarker)(), beforeNode);
  container.insertBefore((0, _litHtml.createMarker)(), beforeNode);
  const newPart = new _litHtml.NodePart(containerPart.options);
  newPart.insertAfterNode(startNode);
  return newPart;
};

const updatePart = (part, value) => {
  part.setValue(value);
  part.commit();
  return part;
};

const insertPartBefore = (containerPart, part, ref) => {
  const container = containerPart.startNode.parentNode;
  const beforeNode = ref ? ref.startNode : containerPart.endNode;
  const endNode = part.endNode.nextSibling;

  if (endNode !== beforeNode) {
    (0, _litHtml.reparentNodes)(container, part.startNode, endNode, beforeNode);
  }
};

const removePart = part => {
  (0, _litHtml.removeNodes)(part.startNode.parentNode, part.startNode, part.endNode.nextSibling);
}; // Helper for generating a map of array item to its index over a subset
// of an array (used to lazily generate `newKeyToIndexMap` and
// `oldKeyToIndexMap`)


const generateMap = (list, start, end) => {
  const map = new Map();

  for (let i = start; i <= end; i++) {
    map.set(list[i], i);
  }

  return map;
}; // Stores previous ordered list of parts and map of key to index


const partListCache = new WeakMap();
const keyListCache = new WeakMap();
/**
 * A directive that repeats a series of values (usually `TemplateResults`)
 * generated from an iterable, and updates those items efficiently when the
 * iterable changes based on user-provided `keys` associated with each item.
 *
 * Note that if a `keyFn` is provided, strict key-to-DOM mapping is maintained,
 * meaning previous DOM for a given key is moved into the new position if
 * needed, and DOM will never be reused with values for different keys (new DOM
 * will always be created for new keys). This is generally the most efficient
 * way to use `repeat` since it performs minimum unnecessary work for insertions
 * amd removals.
 *
 * IMPORTANT: If providing a `keyFn`, keys *must* be unique for all items in a
 * given call to `repeat`. The behavior when two or more items have the same key
 * is undefined.
 *
 * If no `keyFn` is provided, this directive will perform similar to mapping
 * items to values, and DOM will be reused against potentially different items.
 */

const repeat = (0, _litHtml.directive)((items, keyFnOrTemplate, template) => {
  let keyFn;

  if (template === undefined) {
    template = keyFnOrTemplate;
  } else if (keyFnOrTemplate !== undefined) {
    keyFn = keyFnOrTemplate;
  }

  return containerPart => {
    if (!(containerPart instanceof _litHtml.NodePart)) {
      throw new Error('repeat can only be used in text bindings');
    } // Old part & key lists are retrieved from the last update
    // (associated with the part for this instance of the directive)


    const oldParts = partListCache.get(containerPart) || [];
    const oldKeys = keyListCache.get(containerPart) || []; // New part list will be built up as we go (either reused from
    // old parts or created for new keys in this update). This is
    // saved in the above cache at the end of the update.

    const newParts = []; // New value list is eagerly generated from items along with a
    // parallel array indicating its key.

    const newValues = [];
    const newKeys = [];
    let index = 0;

    for (const item of items) {
      newKeys[index] = keyFn ? keyFn(item, index) : index;
      newValues[index] = template(item, index);
      index++;
    } // Maps from key to index for current and previous update; these
    // are generated lazily only when needed as a performance
    // optimization, since they are only required for multiple
    // non-contiguous changes in the list, which are less common.


    let newKeyToIndexMap;
    let oldKeyToIndexMap; // Head and tail pointers to old parts and new values

    let oldHead = 0;
    let oldTail = oldParts.length - 1;
    let newHead = 0;
    let newTail = newValues.length - 1; // Overview of O(n) reconciliation algorithm (general approach
    // based on ideas found in ivi, vue, snabbdom, etc.):
    //
    // * We start with the list of old parts and new values (and
    //   arrays of their respective keys), head/tail pointers into
    //   each, and we build up the new list of parts by updating
    //   (and when needed, moving) old parts or creating new ones.
    //   The initial scenario might look like this (for brevity of
    //   the diagrams, the numbers in the array reflect keys
    //   associated with the old parts or new values, although keys
    //   and parts/values are actually stored in parallel arrays
    //   indexed using the same head/tail pointers):
    //
    //      oldHead v                 v oldTail
    //   oldKeys:  [0, 1, 2, 3, 4, 5, 6]
    //   newParts: [ ,  ,  ,  ,  ,  ,  ]
    //   newKeys:  [0, 2, 1, 4, 3, 7, 6] <- reflects the user's new
    //                                      item order
    //      newHead ^                 ^ newTail
    //
    // * Iterate old & new lists from both sides, updating,
    //   swapping, or removing parts at the head/tail locations
    //   until neither head nor tail can move.
    //
    // * Example below: keys at head pointers match, so update old
    //   part 0 in-place (no need to move it) and record part 0 in
    //   the `newParts` list. The last thing we do is advance the
    //   `oldHead` and `newHead` pointers (will be reflected in the
    //   next diagram).
    //
    //      oldHead v                 v oldTail
    //   oldKeys:  [0, 1, 2, 3, 4, 5, 6]
    //   newParts: [0,  ,  ,  ,  ,  ,  ] <- heads matched: update 0
    //   newKeys:  [0, 2, 1, 4, 3, 7, 6]    and advance both oldHead
    //                                      & newHead
    //      newHead ^                 ^ newTail
    //
    // * Example below: head pointers don't match, but tail
    //   pointers do, so update part 6 in place (no need to move
    //   it), and record part 6 in the `newParts` list. Last,
    //   advance the `oldTail` and `oldHead` pointers.
    //
    //         oldHead v              v oldTail
    //   oldKeys:  [0, 1, 2, 3, 4, 5, 6]
    //   newParts: [0,  ,  ,  ,  ,  , 6] <- tails matched: update 6
    //   newKeys:  [0, 2, 1, 4, 3, 7, 6]    and advance both oldTail
    //                                      & newTail
    //         newHead ^              ^ newTail
    //
    // * If neither head nor tail match; next check if one of the
    //   old head/tail items was removed. We first need to generate
    //   the reverse map of new keys to index (`newKeyToIndexMap`),
    //   which is done once lazily as a performance optimization,
    //   since we only hit this case if multiple non-contiguous
    //   changes were made. Note that for contiguous removal
    //   anywhere in the list, the head and tails would advance
    //   from either end and pass each other before we get to this
    //   case and removals would be handled in the final while loop
    //   without needing to generate the map.
    //
    // * Example below: The key at `oldTail` was removed (no longer
    //   in the `newKeyToIndexMap`), so remove that part from the
    //   DOM and advance just the `oldTail` pointer.
    //
    //         oldHead v           v oldTail
    //   oldKeys:  [0, 1, 2, 3, 4, 5, 6]
    //   newParts: [0,  ,  ,  ,  ,  , 6] <- 5 not in new map: remove
    //   newKeys:  [0, 2, 1, 4, 3, 7, 6]    5 and advance oldTail
    //         newHead ^           ^ newTail
    //
    // * Once head and tail cannot move, any mismatches are due to
    //   either new or moved items; if a new key is in the previous
    //   "old key to old index" map, move the old part to the new
    //   location, otherwise create and insert a new part. Note
    //   that when moving an old part we null its position in the
    //   oldParts array if it lies between the head and tail so we
    //   know to skip it when the pointers get there.
    //
    // * Example below: neither head nor tail match, and neither
    //   were removed; so find the `newHead` key in the
    //   `oldKeyToIndexMap`, and move that old part's DOM into the
    //   next head position (before `oldParts[oldHead]`). Last,
    //   null the part in the `oldPart` array since it was
    //   somewhere in the remaining oldParts still to be scanned
    //   (between the head and tail pointers) so that we know to
    //   skip that old part on future iterations.
    //
    //         oldHead v        v oldTail
    //   oldKeys:  [0, 1, -, 3, 4, 5, 6]
    //   newParts: [0, 2,  ,  ,  ,  , 6] <- stuck: update & move 2
    //   newKeys:  [0, 2, 1, 4, 3, 7, 6]    into place and advance
    //                                      newHead
    //         newHead ^           ^ newTail
    //
    // * Note that for moves/insertions like the one above, a part
    //   inserted at the head pointer is inserted before the
    //   current `oldParts[oldHead]`, and a part inserted at the
    //   tail pointer is inserted before `newParts[newTail+1]`. The
    //   seeming asymmetry lies in the fact that new parts are
    //   moved into place outside in, so to the right of the head
    //   pointer are old parts, and to the right of the tail
    //   pointer are new parts.
    //
    // * We always restart back from the top of the algorithm,
    //   allowing matching and simple updates in place to
    //   continue...
    //
    // * Example below: the head pointers once again match, so
    //   simply update part 1 and record it in the `newParts`
    //   array.  Last, advance both head pointers.
    //
    //         oldHead v        v oldTail
    //   oldKeys:  [0, 1, -, 3, 4, 5, 6]
    //   newParts: [0, 2, 1,  ,  ,  , 6] <- heads matched: update 1
    //   newKeys:  [0, 2, 1, 4, 3, 7, 6]    and advance both oldHead
    //                                      & newHead
    //            newHead ^        ^ newTail
    //
    // * As mentioned above, items that were moved as a result of
    //   being stuck (the final else clause in the code below) are
    //   marked with null, so we always advance old pointers over
    //   these so we're comparing the next actual old value on
    //   either end.
    //
    // * Example below: `oldHead` is null (already placed in
    //   newParts), so advance `oldHead`.
    //
    //            oldHead v     v oldTail
    //   oldKeys:  [0, 1, -, 3, 4, 5, 6] <- old head already used:
    //   newParts: [0, 2, 1,  ,  ,  , 6]    advance oldHead
    //   newKeys:  [0, 2, 1, 4, 3, 7, 6]
    //               newHead ^     ^ newTail
    //
    // * Note it's not critical to mark old parts as null when they
    //   are moved from head to tail or tail to head, since they
    //   will be outside the pointer range and never visited again.
    //
    // * Example below: Here the old tail key matches the new head
    //   key, so the part at the `oldTail` position and move its
    //   DOM to the new head position (before `oldParts[oldHead]`).
    //   Last, advance `oldTail` and `newHead` pointers.
    //
    //               oldHead v  v oldTail
    //   oldKeys:  [0, 1, -, 3, 4, 5, 6]
    //   newParts: [0, 2, 1, 4,  ,  , 6] <- old tail matches new
    //   newKeys:  [0, 2, 1, 4, 3, 7, 6]   head: update & move 4,
    //                                     advance oldTail & newHead
    //               newHead ^     ^ newTail
    //
    // * Example below: Old and new head keys match, so update the
    //   old head part in place, and advance the `oldHead` and
    //   `newHead` pointers.
    //
    //               oldHead v oldTail
    //   oldKeys:  [0, 1, -, 3, 4, 5, 6]
    //   newParts: [0, 2, 1, 4, 3,   ,6] <- heads match: update 3
    //   newKeys:  [0, 2, 1, 4, 3, 7, 6]    and advance oldHead &
    //                                      newHead
    //                  newHead ^  ^ newTail
    //
    // * Once the new or old pointers move past each other then all
    //   we have left is additions (if old list exhausted) or
    //   removals (if new list exhausted). Those are handled in the
    //   final while loops at the end.
    //
    // * Example below: `oldHead` exceeded `oldTail`, so we're done
    //   with the main loop.  Create the remaining part and insert
    //   it at the new head position, and the update is complete.
    //
    //                   (oldHead > oldTail)
    //   oldKeys:  [0, 1, -, 3, 4, 5, 6]
    //   newParts: [0, 2, 1, 4, 3, 7 ,6] <- create and insert 7
    //   newKeys:  [0, 2, 1, 4, 3, 7, 6]
    //                     newHead ^ newTail
    //
    // * Note that the order of the if/else clauses is not
    //   important to the algorithm, as long as the null checks
    //   come first (to ensure we're always working on valid old
    //   parts) and that the final else clause comes last (since
    //   that's where the expensive moves occur). The order of
    //   remaining clauses is is just a simple guess at which cases
    //   will be most common.
    //
    // * TODO(kschaaf) Note, we could calculate the longest
    //   increasing subsequence (LIS) of old items in new position,
    //   and only move those not in the LIS set. However that costs
    //   O(nlogn) time and adds a bit more code, and only helps
    //   make rare types of mutations require fewer moves. The
    //   above handles removes, adds, reversal, swaps, and single
    //   moves of contiguous items in linear time, in the minimum
    //   number of moves. As the number of multiple moves where LIS
    //   might help approaches a random shuffle, the LIS
    //   optimization becomes less helpful, so it seems not worth
    //   the code at this point. Could reconsider if a compelling
    //   case arises.

    while (oldHead <= oldTail && newHead <= newTail) {
      if (oldParts[oldHead] === null) {
        // `null` means old part at head has already been used
        // below; skip
        oldHead++;
      } else if (oldParts[oldTail] === null) {
        // `null` means old part at tail has already been used
        // below; skip
        oldTail--;
      } else if (oldKeys[oldHead] === newKeys[newHead]) {
        // Old head matches new head; update in place
        newParts[newHead] = updatePart(oldParts[oldHead], newValues[newHead]);
        oldHead++;
        newHead++;
      } else if (oldKeys[oldTail] === newKeys[newTail]) {
        // Old tail matches new tail; update in place
        newParts[newTail] = updatePart(oldParts[oldTail], newValues[newTail]);
        oldTail--;
        newTail--;
      } else if (oldKeys[oldHead] === newKeys[newTail]) {
        // Old head matches new tail; update and move to new tail
        newParts[newTail] = updatePart(oldParts[oldHead], newValues[newTail]);
        insertPartBefore(containerPart, oldParts[oldHead], newParts[newTail + 1]);
        oldHead++;
        newTail--;
      } else if (oldKeys[oldTail] === newKeys[newHead]) {
        // Old tail matches new head; update and move to new head
        newParts[newHead] = updatePart(oldParts[oldTail], newValues[newHead]);
        insertPartBefore(containerPart, oldParts[oldTail], oldParts[oldHead]);
        oldTail--;
        newHead++;
      } else {
        if (newKeyToIndexMap === undefined) {
          // Lazily generate key-to-index maps, used for removals &
          // moves below
          newKeyToIndexMap = generateMap(newKeys, newHead, newTail);
          oldKeyToIndexMap = generateMap(oldKeys, oldHead, oldTail);
        }

        if (!newKeyToIndexMap.has(oldKeys[oldHead])) {
          // Old head is no longer in new list; remove
          removePart(oldParts[oldHead]);
          oldHead++;
        } else if (!newKeyToIndexMap.has(oldKeys[oldTail])) {
          // Old tail is no longer in new list; remove
          removePart(oldParts[oldTail]);
          oldTail--;
        } else {
          // Any mismatches at this point are due to additions or
          // moves; see if we have an old part we can reuse and move
          // into place
          const oldIndex = oldKeyToIndexMap.get(newKeys[newHead]);
          const oldPart = oldIndex !== undefined ? oldParts[oldIndex] : null;

          if (oldPart === null) {
            // No old part for this value; create a new one and
            // insert it
            const newPart = createAndInsertPart(containerPart, oldParts[oldHead]);
            updatePart(newPart, newValues[newHead]);
            newParts[newHead] = newPart;
          } else {
            // Reuse old part
            newParts[newHead] = updatePart(oldPart, newValues[newHead]);
            insertPartBefore(containerPart, oldPart, oldParts[oldHead]); // This marks the old part as having been used, so that
            // it will be skipped in the first two checks above

            oldParts[oldIndex] = null;
          }

          newHead++;
        }
      }
    } // Add parts for any remaining new values


    while (newHead <= newTail) {
      // For all remaining additions, we insert before last new
      // tail, since old pointers are no longer valid
      const newPart = createAndInsertPart(containerPart, newParts[newTail + 1]);
      updatePart(newPart, newValues[newHead]);
      newParts[newHead++] = newPart;
    } // Remove any remaining unused old parts


    while (oldHead <= oldTail) {
      const oldPart = oldParts[oldHead++];

      if (oldPart !== null) {
        removePart(oldPart);
      }
    } // Save order of new parts for next round


    partListCache.set(containerPart, newParts);
    keyListCache.set(containerPart, newKeys);
  };
});
exports.repeat = repeat;
},{"../lit-html.js":"../node_modules/lit-html/lit-html.js"}],"../node_modules/lit-html/directives/class-map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classMap = void 0;

var _litHtml = require("../lit-html.js");

/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * Stores the ClassInfo object applied to a given AttributePart.
 * Used to unset existing values when a new ClassInfo object is applied.
 */
const classMapCache = new WeakMap();
/**
 * A directive that applies CSS classes. This must be used in the `class`
 * attribute and must be the only part used in the attribute. It takes each
 * property in the `classInfo` argument and adds the property name to the
 * element's `classList` if the property value is truthy; if the property value
 * is falsey, the property name is removed from the element's `classList`. For
 * example
 * `{foo: bar}` applies the class `foo` if the value of `bar` is truthy.
 * @param classInfo {ClassInfo}
 */

const classMap = (0, _litHtml.directive)(classInfo => part => {
  if (!(part instanceof _litHtml.AttributePart) || part instanceof _litHtml.PropertyPart || part.committer.name !== 'class' || part.committer.parts.length > 1) {
    throw new Error('The `classMap` directive must be used in the `class` attribute ' + 'and must be the only part in the attribute.');
  }

  const {
    committer
  } = part;
  const {
    element
  } = committer; // handle static classes

  if (!classMapCache.has(part)) {
    element.className = committer.strings.join(' ');
  }

  const {
    classList
  } = element; // remove old classes that no longer apply

  const oldInfo = classMapCache.get(part);

  for (const name in oldInfo) {
    if (!(name in classInfo)) {
      classList.remove(name);
    }
  } // add new classes


  for (const name in classInfo) {
    const value = classInfo[name];

    if (!oldInfo || value !== oldInfo[name]) {
      // We explicitly want a loose truthy check here because
      // it seems more convenient that '' and 0 are skipped.
      const method = value ? 'add' : 'remove';
      classList[method](name);
    }
  }

  classMapCache.set(part, classInfo);
});
exports.classMap = classMap;
},{"../lit-html.js":"../node_modules/lit-html/lit-html.js"}],"../node_modules/lit-html/directives/style-map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styleMap = void 0;

var _litHtml = require("../lit-html.js");

/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * Stores the StyleInfo object applied to a given AttributePart.
 * Used to unset existing values when a new StyleInfo object is applied.
 */
const styleMapCache = new WeakMap();
/**
 * A directive that applies CSS properties to an element.
 *
 * `styleMap` can only be used in the `style` attribute and must be the only
 * expression in the attribute. It takes the property names in the `styleInfo`
 * object and adds the property values as CSS propertes. Property names with
 * dashes (`-`) are assumed to be valid CSS property names and set on the
 * element's style object using `setProperty()`. Names without dashes are
 * assumed to be camelCased JavaScript property names and set on the element's
 * style object using property assignment, allowing the style object to
 * translate JavaScript-style names to CSS property names.
 *
 * For example `styleMap({backgroundColor: 'red', 'border-top': '5px', '--size':
 * '0'})` sets the `background-color`, `border-top` and `--size` properties.
 *
 * @param styleInfo {StyleInfo}
 */

const styleMap = (0, _litHtml.directive)(styleInfo => part => {
  if (!(part instanceof _litHtml.AttributePart) || part instanceof _litHtml.PropertyPart || part.committer.name !== 'style' || part.committer.parts.length > 1) {
    throw new Error('The `styleMap` directive must be used in the style attribute ' + 'and must be the only part in the attribute.');
  }

  const {
    committer
  } = part;
  const {
    style
  } = committer.element; // Handle static styles the first time we see a Part

  if (!styleMapCache.has(part)) {
    style.cssText = committer.strings.join(' ');
  } // Remove old properties that no longer exist in styleInfo


  const oldInfo = styleMapCache.get(part);

  for (const name in oldInfo) {
    if (!(name in styleInfo)) {
      if (name.indexOf('-') === -1) {
        // tslint:disable-next-line:no-any
        style[name] = null;
      } else {
        style.removeProperty(name);
      }
    }
  } // Add or update properties


  for (const name in styleInfo) {
    if (name.indexOf('-') === -1) {
      // tslint:disable-next-line:no-any
      style[name] = styleInfo[name];
    } else {
      style.setProperty(name, styleInfo[name]);
    }
  }

  styleMapCache.set(part, styleInfo);
});
exports.styleMap = styleMap;
},{"../lit-html.js":"../node_modules/lit-html/lit-html.js"}],"../node_modules/@ui5/webcomponents-base/src/renderer/LitRenderer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "html", {
  enumerable: true,
  get: function () {
    return _litHtml.html;
  }
});
Object.defineProperty(exports, "svg", {
  enumerable: true,
  get: function () {
    return _litHtml.svg;
  }
});
Object.defineProperty(exports, "repeat", {
  enumerable: true,
  get: function () {
    return _repeat.repeat;
  }
});
Object.defineProperty(exports, "classMap", {
  enumerable: true,
  get: function () {
    return _classMap.classMap;
  }
});
Object.defineProperty(exports, "styleMap", {
  enumerable: true,
  get: function () {
    return _styleMap.styleMap;
  }
});
exports.default = void 0;

var _litHtml = require("lit-html");

var _repeat = require("lit-html/directives/repeat.js");

var _classMap = require("lit-html/directives/class-map.js");

var _styleMap = require("lit-html/directives/style-map.js");

const litRender = (templateResult, domNode, styles, {
  eventContext
} = {}) => {
  if (styles) {
    templateResult = _litHtml.html`<style>${styles}</style>${templateResult}`;
  }

  (0, _litHtml.render)(templateResult, domNode, {
    eventContext
  });
};

var _default = litRender;
exports.default = _default;
},{"lit-html":"../node_modules/lit-html/lit-html.js","lit-html/directives/repeat.js":"../node_modules/lit-html/directives/repeat.js","lit-html/directives/class-map.js":"../node_modules/lit-html/directives/class-map.js","lit-html/directives/style-map.js":"../node_modules/lit-html/directives/style-map.js"}],"../node_modules/@ui5/webcomponents-core/dist/sap/ui/events/KeyCodes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var mKeyCodes = {
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  SHIFT: 16,
  CONTROL: 17,
  ALT: 18,
  BREAK: 19,
  CAPS_LOCK: 20,
  ESCAPE: 27,
  SPACE: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40,
  PRINT: 44,
  INSERT: 45,
  DELETE: 46,
  DIGIT_0: 48,
  DIGIT_1: 49,
  DIGIT_2: 50,
  DIGIT_3: 51,
  DIGIT_4: 52,
  DIGIT_5: 53,
  DIGIT_6: 54,
  DIGIT_7: 55,
  DIGIT_8: 56,
  DIGIT_9: 57,
  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90,
  WINDOWS: 91,
  CONTEXT_MENU: 93,
  TURN_OFF: 94,
  SLEEP: 95,
  NUMPAD_0: 96,
  NUMPAD_1: 97,
  NUMPAD_2: 98,
  NUMPAD_3: 99,
  NUMPAD_4: 100,
  NUMPAD_5: 101,
  NUMPAD_6: 102,
  NUMPAD_7: 103,
  NUMPAD_8: 104,
  NUMPAD_9: 105,
  NUMPAD_ASTERISK: 106,
  NUMPAD_PLUS: 107,
  NUMPAD_MINUS: 109,
  NUMPAD_COMMA: 110,
  NUMPAD_SLASH: 111,
  F1: 112,
  F2: 113,
  F3: 114,
  F4: 115,
  F5: 116,
  F6: 117,
  F7: 118,
  F8: 119,
  F9: 120,
  F10: 121,
  F11: 122,
  F12: 123,
  NUM_LOCK: 144,
  SCROLL_LOCK: 145,
  OPEN_BRACKET: 186,
  PLUS: 187,
  COMMA: 188,
  SLASH: 189,
  DOT: 190,
  PIPE: 191,
  SEMICOLON: 192,
  MINUS: 219,
  GREAT_ACCENT: 220,
  EQUALS: 221,
  SINGLE_QUOTE: 222,
  BACKSLASH: 226
};
var _default = mKeyCodes;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/src/events/PseudoEvents.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isShow = exports.isDelete = exports.isBackSpace = exports.isTabPrevious = exports.isTabNext = exports.isEscape = exports.isEnd = exports.isHome = exports.isDown = exports.isUp = exports.isRight = exports.isLeft = exports.isSpace = exports.isEnter = void 0;

var _KeyCodes = _interopRequireDefault(require("@ui5/webcomponents-core/dist/sap/ui/events/KeyCodes.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isEnter = event => (event.key ? event.key === "Enter" : event.keyCode === _KeyCodes.default.ENTER) && !hasModifierKeys(event);

exports.isEnter = isEnter;

const isSpace = event => (event.key ? event.key === "Spacebar" || event.key === " " : event.keyCode === _KeyCodes.default.SPACE) && !hasModifierKeys(event);

exports.isSpace = isSpace;

const isLeft = event => (event.key ? event.key === "ArrowLeft" || event.key === "Left" : event.keyCode === _KeyCodes.default.ARROW_LEFT) && !hasModifierKeys(event);

exports.isLeft = isLeft;

const isRight = event => (event.key ? event.key === "ArrowRight" || event.key === "Right" : event.keyCode === _KeyCodes.default.ARROW_RIGHT) && !hasModifierKeys(event);

exports.isRight = isRight;

const isUp = event => (event.key ? event.key === "ArrowUp" || event.key === "Up" : event.keyCode === _KeyCodes.default.ARROW_UP) && !hasModifierKeys(event);

exports.isUp = isUp;

const isDown = event => (event.key ? event.key === "ArrowDown" || event.key === "Down" : event.keyCode === _KeyCodes.default.ARROW_DOWN) && !hasModifierKeys(event);

exports.isDown = isDown;

const isHome = event => (event.key ? event.key === "Home" : event.keyCode === _KeyCodes.default.HOME) && !hasModifierKeys(event);

exports.isHome = isHome;

const isEnd = event => (event.key ? event.key === "End" : event.keyCode === _KeyCodes.default.END) && !hasModifierKeys(event);

exports.isEnd = isEnd;

const isEscape = event => (event.key ? event.key === "Escape" || event.key === "Esc" : event.keyCode === _KeyCodes.default.ESCAPE) && !hasModifierKeys(event);

exports.isEscape = isEscape;

const isTabNext = event => (event.key ? event.key === "Tab" : event.keyCode === _KeyCodes.default.TAB) && !hasModifierKeys(event);

exports.isTabNext = isTabNext;

const isTabPrevious = event => (event.key ? event.key === "Tab" : event.keyCode === _KeyCodes.default.TAB) && checkModifierKeys(event,
/* Ctrl */
false,
/* Alt */
false,
/* Shift */
true);

exports.isTabPrevious = isTabPrevious;

const isBackSpace = event => (event.key ? event.key === "Backspace" || event.key === "Backspace" : event.keyCode === _KeyCodes.default.BACKSPACE) && !hasModifierKeys(event);

exports.isBackSpace = isBackSpace;

const isDelete = event => (event.key ? event.key === "Delete" || event.key === "Delete" : event.keyCode === _KeyCodes.default.DELETE) && !hasModifierKeys(event);

exports.isDelete = isDelete;

const isShow = event => {
  if (event.key) {
    return event.key === "F4" && !hasModifierKeys(event) || (event.key === "ArrowDown" || event.key === "Down" || event.key === "ArrowUp" || event.key === "Up") && checkModifierKeys(event,
    /* Ctrl */
    false,
    /* Alt */
    true,
    /* Shift */
    false);
  }

  return event.keyCode === _KeyCodes.default.F4 && !hasModifierKeys(event) || event.keyCode === _KeyCodes.default.ARROW_DOWN && checkModifierKeys(event,
  /* Ctrl */
  false,
  /* Alt */
  true,
  /* Shift */
  false);
};

exports.isShow = isShow;

const hasModifierKeys = event => event.shiftKey || event.altKey || getCtrlKey(event);

const getCtrlKey = event => !!(event.metaKey || event.ctrlKey); // double negation doesn't have effect on boolean but ensures null and undefined are equivalent to false.


const checkModifierKeys = (oEvent, bCtrlKey, bAltKey, bShiftKey) => oEvent.shiftKey === bShiftKey && oEvent.altKey === bAltKey && getCtrlKey(oEvent) === bCtrlKey;
},{"@ui5/webcomponents-core/dist/sap/ui/events/KeyCodes.js":"../node_modules/@ui5/webcomponents-core/dist/sap/ui/events/KeyCodes.js"}],"../node_modules/@ui5/webcomponents-base/src/util/detectNavigatorLanguage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = () => {
  const browserLanguages = navigator.languages;

  const navigatorLanguage = () => {
    return navigator.language;
  };

  const rawLocale = browserLanguages && browserLanguages[0] || navigatorLanguage() || navigator.userLanguage || navigator.browserLanguage;
  return rawLocale || "en";
};

exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/src/util/getEffectiveRTL.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Configuration = require("../Configuration.js");

var _getDesigntimePropertyAsArray = _interopRequireDefault(require("./getDesigntimePropertyAsArray.js"));

var _detectNavigatorLanguage = _interopRequireDefault(require("./detectNavigatorLanguage.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const M_ISO639_OLD_TO_NEW = {
  "iw": "he",
  "ji": "yi",
  "in": "id",
  "sh": "sr"
};
const A_RTL_LOCALES = (0, _getDesigntimePropertyAsArray.default)("$cldr-rtl-locales:ar,fa,he$") || [];

const impliesRTL = language => {
  language = language && M_ISO639_OLD_TO_NEW[language] || language;
  return A_RTL_LOCALES.indexOf(language) >= 0;
};

const getEffectiveRTL = () => {
  const configurationRTL = (0, _Configuration.getRTL)();

  if (configurationRTL !== null) {
    return !!configurationRTL;
  }

  return impliesRTL((0, _Configuration.getLanguage)() || (0, _detectNavigatorLanguage.default)());
};

var _default = getEffectiveRTL;
exports.default = _default;
},{"../Configuration.js":"../node_modules/@ui5/webcomponents-base/src/Configuration.js","./getDesigntimePropertyAsArray.js":"../node_modules/@ui5/webcomponents-base/src/util/getDesigntimePropertyAsArray.js","./detectNavigatorLanguage.js":"../node_modules/@ui5/webcomponents-base/src/util/detectNavigatorLanguage.js"}],"../node_modules/@ui5/webcomponents-base/src/FeaturesRegistry.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFeature = exports.registerFeature = void 0;
const features = new Map();

const registerFeature = (name, feature) => {
  features.set(name, feature);
};

exports.registerFeature = registerFeature;

const getFeature = name => {
  return features.get(name);
};

exports.getFeature = getFeature;
},{}],"../node_modules/@ui5/webcomponents/dist/types/ButtonDesign.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DataType = _interopRequireDefault(require("@ui5/webcomponents-base/src/types/DataType.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Different types of Button.
 */
const ButtonTypes = {
  /**
   * default type (no special styling)
   */
  Default: "Default",

  /**
   * accept type (green button)
   */
  Positive: "Positive",

  /**
   * reject style (red button)
   */
  Negative: "Negative",

  /**
   * transparent type
   */
  Transparent: "Transparent",

  /**
   * emphasized type
   */
  Emphasized: "Emphasized"
};

class ButtonDesign extends _DataType.default {
  static isValid(value) {
    return !!ButtonTypes[value];
  }

}

ButtonDesign.generataTypeAcessors(ButtonTypes);
var _default = ButtonDesign;
exports.default = _default;
},{"@ui5/webcomponents-base/src/types/DataType.js":"../node_modules/@ui5/webcomponents-base/src/types/DataType.js"}],"../node_modules/@ui5/webcomponents-base/src/renderer/ifDefined.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _litHtml = require("lit-html");

/*
	lit-html directive that removes and attribute if it is undefined
*/
var _default = (0, _litHtml.directive)(value => part => {
  if (value === undefined && part instanceof _litHtml.AttributePart) {
    if (value !== part.value) {
      const name = part.committer.name;
      part.committer.element.removeAttribute(name);
    }
  } else if (part.committer && part.committer.element && part.committer.element.getAttribute(part.committer.name) === value) {
    part.setValue(_litHtml.noChange);
  } else {
    part.setValue(value);
  }
});

exports.default = _default;
},{"lit-html":"../node_modules/lit-html/lit-html.js"}],"../node_modules/@ui5/webcomponents/dist/build/compiled/ButtonTemplate.lit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ifDefined = _interopRequireDefault(require("@ui5/webcomponents-base/src/renderer/ifDefined.js"));

var _LitRenderer = require("@ui5/webcomponents-base/src/renderer/LitRenderer.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-unused-vars: 0 */
const block0 = context => {
  return _LitRenderer.html`<button		type="button"		class="${(0, _ifDefined.default)((0, _LitRenderer.classMap)(context.classes.main))}"		?disabled="${(0, _ifDefined.default)(context.disabled)}"		data-sap-focus-ref				dir="${(0, _ifDefined.default)(context.rtl)}"		@focusout=${(0, _ifDefined.default)(context.onfocusout)}	>		${context.icon ? block1(context) : undefined}${context.textContent ? block2(context) : undefined}</button>`;
};

const block1 = context => {
  return _LitRenderer.html`<ui5-icon				class="${(0, _ifDefined.default)((0, _LitRenderer.classMap)(context.classes.icon))}"				src="${(0, _ifDefined.default)(context.icon)}"			></ui5-icon>		`;
};

const block2 = context => {
  return _LitRenderer.html`<span id="${(0, _ifDefined.default)(context._id)}-content" class="${(0, _ifDefined.default)((0, _LitRenderer.classMap)(context.classes.text))}"><bdi><slot></slot></bdi></span>		`;
};

var _default = block0;
exports.default = _default;
},{"@ui5/webcomponents-base/src/renderer/ifDefined.js":"../node_modules/@ui5/webcomponents-base/src/renderer/ifDefined.js","@ui5/webcomponents-base/src/renderer/LitRenderer.js":"../node_modules/@ui5/webcomponents-base/src/renderer/LitRenderer.js"}],"../node_modules/@ui5/webcomponents-core/dist/sap/ui/thirdparty/URI.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const URI = {
  parse: url => {
    const [protocol, hostname] = url.split("://");
    const parts = {
      protocol,
      hostname,
      path: "/"
    };
    return parts;
  },
  build: ({
    protocol,
    hostname
  }) => {
    return `${protocol}://${hostname}`;
  }
};
var _default = URI;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/src/IconPool.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isIconURI = exports.getIconInfo = exports.getIconURI = void 0;

var _URI = _interopRequireDefault(require("@ui5/webcomponents-core/dist/sap/ui/thirdparty/URI.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
const SAP_ICON_FONT_FAMILY = 'SAP-icons';
const iconMapping = {
  "accidental-leave": 0xe000,
  "account": 0xe001,
  "wrench": 0xe002,
  "windows-doors": 0xe003,
  "washing-machine": 0xe004,
  "visits": 0xe005,
  "video": 0xe006,
  "travel-expense": 0x1e007,
  "temperature": 0xe008,
  "task": 0x1e009,
  "synchronize": 0xe00a,
  "survey": 0x1e00b,
  "settings": 0xe00c,
  "search": 0x1e00d,
  "sales-document": 0x1e00e,
  "retail-store": 0xe00f,
  "refresh": 0xe010,
  "product": 0xe011,
  "present": 0xe012,
  "ppt-attachment": 0xe013,
  "pool": 0xe014,
  "pie-chart": 0xe015,
  "picture": 0xe016,
  "photo-voltaic": 0xe017,
  "phone": 0xe018,
  "pending": 0xe019,
  "pdf-attachment": 0xe01a,
  "past": 0x1e01b,
  "outgoing-call": 0xe01c,
  "opportunity": 0xe01d,
  "opportunities": 0x1e01e,
  "notes": 0xe01f,
  "money-bills": 0x1e020,
  "map": 0xe021,
  "log": 0xe022,
  "line-charts": 0xe023,
  "lightbulb": 0xe024,
  "leads": 0xe025,
  "lead": 0x1e026,
  "laptop": 0xe027,
  "kpi-managing-my-area": 0x1e028,
  "kpi-corporate-performance": 0x1e029,
  "incoming-call": 0xe02a,
  "inbox": 0xe02b,
  "horizontal-bar-chart": 0xe02c,
  "history": 0xe02d,
  "heating-cooling": 0xe02e,
  "gantt-bars": 0xe02f,
  "future": 0x1e030,
  "fridge": 0xe031,
  "fallback": 0xe032,
  "expense-report": 0x1e033,
  "excel-attachment": 0xe034,
  "energy-saving-lightbulb": 0xe035,
  "employee": 0xe036,
  "email": 0xe037,
  "edit": 0xe038,
  "duplicate": 0xe039,
  "download": 0xe03a,
  "doc-attachment": 0xe03b,
  "dishwasher": 0xe03c,
  "delete": 0xe03d,
  "decline": 0xe03e,
  "complete": 0x1e03f,
  "competitor": 0xe040,
  "collections-management": 0xe041,
  "chalkboard": 0x1e042,
  "cart": 0xe043,
  "card": 0xe044,
  "camera": 0xe045,
  "calendar": 0x1e046,
  "begin": 0xe047,
  "basket": 0xe048,
  "bar-chart": 0xe049,
  "attachment": 0xe04a,
  "arrow-top": 0xe04b,
  "arrow-right": 0xe04c,
  "arrow-left": 0xe04d,
  "arrow-bottom": 0xe04e,
  "approvals": 0x1e04f,
  "appointment": 0xe050,
  "alphabetical-order": 0x1e051,
  "along-stacked-chart": 0xe052,
  "alert": 0xe053,
  "addresses": 0xe054,
  "address-book": 0x1e055,
  "add-filter": 0xe056,
  "add-favorite": 0xe057,
  "add": 0xe058,
  "activities": 0x1e059,
  "action": 0xe05a,
  "accept": 0x1e05b,
  "hint": 0x1e05c,
  "group": 0xe05d,
  "check-availability": 0x1e05e,
  "weather-proofing": 0xe05f,
  "payment-approval": 0x1e060,
  "batch-payments": 0x1e061,
  "bed": 0xe062,
  "arobase": 0x1e063,
  "family-care": 0xe064,
  "favorite": 0xe065,
  "navigation-right-arrow": 0xe066,
  "navigation-left-arrow": 0xe067,
  "e-care": 0xe068,
  "less": 0xe069,
  "lateness": 0xe06a,
  "lab": 0xe06b,
  "internet-browser": 0xe06c,
  "instance": 0xe06d,
  "inspection": 0xe06e,
  "image-viewer": 0xe06f,
  "home": 0xe070,
  "grid": 0xe071,
  "goalseek": 0xe072,
  "general-leave-request": 0xe073,
  "create-leave-request": 0xe074,
  "flight": 0xe075,
  "filter": 0xe076,
  "favorite-list": 0xe077,
  "factory": 0xe078,
  "endoscopy": 0xe079,
  "employee-pane": 0xe07a,
  "employee-approvals": 0x1e07b,
  "email-read": 0xe07c,
  "electrocardiogram": 0xe07d,
  "documents": 0xe07e,
  "decision": 0xe07f,
  "database": 0xe080,
  "customer-history": 0xe081,
  "customer": 0xe082,
  "credit-card": 0xe083,
  "create-entry-time": 0xe084,
  "contacts": 0xe085,
  "compare": 0xe086,
  "clinical-order": 0xe087,
  "chain-link": 0xe088,
  "pull-down": 0xe089,
  "cargo-train": 0xe08a,
  "car-rental": 0xe08b,
  "business-card": 0xe08c,
  "bar-code": 0xe08d,
  "folder-blank": 0xe08e,
  "passenger-train": 0xe08f,
  "question-mark": 0x1e090,
  "world": 0xe091,
  "iphone": 0xe092,
  "ipad": 0xe093,
  "warning": 0xe094,
  "sort": 0xe095,
  "course-book": 0xe096,
  "course-program": 0xe097,
  "add-coursebook": 0xe098,
  "print": 0xe099,
  "save": 0xe09a,
  "play": 0x1e09b,
  "pause": 0xe09c,
  "record": 0xe09d,
  "response": 0xe09e,
  "pushpin-on": 0xe09f,
  "pushpin-off": 0xe0a0,
  "unfavorite": 0xe0a1,
  "learning-assistant": 0xe0a2,
  "timesheet": 0xe0a3,
  "time-entry-request": 0xe0a4,
  "list": 0xe0a5,
  "action-settings": 0xe0a6,
  "share": 0xe0a7,
  "feed": 0xe0a8,
  "role": 0xe0a9,
  "flag": 0x1e0aa,
  "post": 0xe0ab,
  "inspect": 0xe0ac,
  "inspect-down": 0xe0ad,
  "appointment-2": 0xe0ae,
  "target-group": 0xe0af,
  "marketing-campaign": 0xe0b0,
  "notification": 0xe0b1,
  "message-error": 0xe0b1,
  "comment": 0xe0b2,
  "shipping-status": 0xe0b3,
  "collaborate": 0xe0b4,
  "shortcut": 0xe0b5,
  "lead-outdated": 0x1e0b6,
  "tools-opportunity": 0xe0b7,
  "permission": 0xe0b8,
  "supplier": 0xe0b9,
  "table-view": 0xe0ba,
  "table-chart": 0xe0bb,
  "switch-views": 0xe0bc,
  "e-learning": 0xe0bd,
  "manager": 0xe0be,
  "switch-classes": 0xe0bf,
  "simple-payment": 0x1e0c0,
  "signature": 0xe0c1,
  "sales-order-item": 0x1e0c2,
  "sales-order": 0x1e0c3,
  "request": 0xe0c4,
  "receipt": 0xe0c5,
  "puzzle": 0xe0c6,
  "process": 0xe0c7,
  "private": 0xe0c8,
  "popup-window": 0xe0c9,
  "person-placeholder": 0xe0ca,
  "per-diem": 0x1e0cb,
  "paper-plane": 0xe0cc,
  "paid-leave": 0x1e0cd,
  "pdf-reader": 0x1e0ce,
  "overview-chart": 0xe0cf,
  "overlay": 0xe0d0,
  "org-chart": 0xe0d1,
  "number-sign": 0xe0d2,
  "notification-2": 0xe0d3,
  "my-sales-order": 0x1e0d4,
  "meal": 0xe0d5,
  "loan": 0x1e0d6,
  "order-status": 0x1e0d7,
  "customer-order-entry": 0x1e0d8,
  "performance": 0xe0d9,
  "menu": 0xe0da,
  "employee-lookup": 0xe0db,
  "education": 0xe0dc,
  "customer-briefing": 0xe0dd,
  "customer-and-contacts": 0xe0de,
  "my-view": 0xe0df,
  "accelerated": 0xe0e0,
  "to-be-reviewed": 0xe0e1,
  "warning2": 0xe0e2,
  "feeder-arrow": 0xe0e3,
  "quality-issue": 0xe0e4,
  "workflow-tasks": 0xe0e5,
  "create": 0xe0e6,
  "home-share": 0xe0e7,
  "globe": 0x1e0e8,
  "tags": 0xe0e9,
  "work-history": 0xe0ea,
  "x-ray": 0xe0eb,
  "wounds-doc": 0xe0ec,
  "web-cam": 0xe0ed,
  "waiver": 0x1e0ee,
  "vertical-bar-chart": 0xe0ef,
  "upstacked-chart": 0xe0f0,
  "trip-report": 0xe0f1,
  "microphone": 0xe0f2,
  "unpaid-leave": 0x1e0f3,
  "tree": 0xe0f4,
  "toaster-up": 0xe0f5,
  "toaster-top": 0xe0f6,
  "toaster-down": 0xe0f7,
  "time-account": 0xe0f8,
  "theater": 0xe0f9,
  "taxi": 0xe0fa,
  "subway-train": 0xe0fb,
  "study-leave": 0xe0fc,
  "stethoscope": 0xe0fd,
  "step": 0xe0fe,
  "sonography": 0xe0ff,
  "soccor": 0xe100,
  "physical-activity": 0xe101,
  "pharmacy": 0xe102,
  "official-service": 0xe103,
  "offsite-work": 0xe104,
  "nutrition-activity": 0xe105,
  "newspaper": 0xe106,
  "monitor-payments": 0x1e107,
  "map-2": 0xe108,
  "machine": 0xe109,
  "mri-scan": 0xe10a,
  "end-user-experience-monitoring": 0xe10b,
  "unwired": 0xe10c,
  "customer-financial-fact-sheet": 0x1e10d,
  "retail-store-manager": 0xe10e,
  "Netweaver-business-client": 0xe10f,
  "electronic-medical-record": 0xe110,
  "eam-work-order": 0x1e111,
  "customer-view": 0xe112,
  "crm-service-manager": 0xe113,
  "crm-sales": 0x1e114,
  "widgets": 0x1e115,
  "commission-check": 0x1e116,
  "collections-insight": 0x1e117,
  "clinical-tast-tracker": 0xe118,
  "citizen-connect": 0xe119,
  "cart-approval": 0x1e11a,
  "capital-projects": 0x1e11b,
  "bo-strategy-management": 0xe11c,
  "business-objects-mobile": 0xe11d,
  "business-objects-explorer": 0xe11e,
  "business-objects-experience": 0xe11f,
  "bbyd-dashboard": 0xe120,
  "bbyd-active-sales": 0x1e121,
  "business-by-design": 0x1e122,
  "business-one": 0x1e123,
  "sap-box": 0xe124,
  "manager-insight": 0xe125,
  "accounting-document-verification": 0x1e126,
  "hr-approval": 0x1e127,
  "idea-wall": 0xe128,
  "Chart-Tree-Map": 0xe129,
  "cart-5": 0xe12a,
  "cart-4": 0xe12b,
  "wallet": 0xe12c,
  "vehicle-repair": 0xe12d,
  "upload": 0xe12e,
  "unlocked": 0xe12f,
  "umbrella": 0xe130,
  "travel-request": 0x1e131,
  "travel-expense-report": 0x1e132,
  "travel-itinerary": 0xe133,
  "time-overtime": 0x1e134,
  "thing-type": 0xe135,
  "technical-object": 0xe136,
  "tag": 0xe137,
  "syringe": 0xe138,
  "syntax": 0xe139,
  "suitcase": 0xe13a,
  "simulate": 0xe13b,
  "shield": 0xe13c,
  "share-2": 0xe13d,
  "sales-quote": 0x1e13e,
  "repost": 0xe13f,
  "provision": 0xe140,
  "projector": 0xe141,
  "add-product": 0xe142,
  "pipeline-analysis": 0xe143,
  "add-photo": 0xe144,
  "palette": 0xe145,
  "nurse": 0xe146,
  "sales-notification": 0x1e147,
  "mileage": 0xe148,
  "meeting-room": 0xe149,
  "media-forward": 0x1e14a,
  "media-play": 0x1e14b,
  "media-pause": 0xe14c,
  "media-reverse": 0x1e14d,
  "media-rewind": 0x1e14e,
  "measurement-document": 0xe14f,
  "measuring-point": 0xe150,
  "measure": 0xe151,
  "map-3": 0xe152,
  "locked": 0xe153,
  "letter": 0xe154,
  "journey-arrive": 0xe155,
  "journey-change": 0xe156,
  "journey-depart": 0xe157,
  "it-system": 0xe158,
  "it-instance": 0xe159,
  "it-host": 0xe15a,
  "iphone-2": 0xe15b,
  "ipad-2": 0xe15c,
  "inventory": 0xe15d,
  "insurance-house": 0xe15e,
  "insurance-life": 0xe15f,
  "insurance-car": 0xe160,
  "initiative": 0xe161,
  "incident": 0x1e162,
  "group-2": 0xe163,
  "goal": 0xe164,
  "functional-location": 0xe165,
  "full-screen": 0xe166,
  "form": 0xe167,
  "fob-watch": 0xe168,
  "blank-tag": 0xe169,
  "family-protection": 0xe16a,
  "folder": 0xe16b,
  "fax-machine": 0xe16c,
  "example": 0xe16d,
  "eraser": 0xe16e,
  "employee-rejections": 0xe16f,
  "drop-down-list": 0xe170,
  "draw-rectangle": 0xe171,
  "document": 0xe172,
  "doctor": 0xe173,
  "discussion-2": 0xe174,
  "discussion": 0xe175,
  "dimension": 0xe176,
  "customer-and-supplier": 0xe177,
  "crop": 0xe178,
  "add-contact": 0xe179,
  "compare-2": 0xe17a,
  "color-fill": 0xe17b,
  "collision": 0xe17c,
  "curriculum": 0xe17d,
  "chart-axis": 0xe17e,
  "full-stacked-chart": 0xe17f,
  "full-stacked-column-chart": 0xe180,
  "vertical-bar-chart-2": 0xe181,
  "horizontal-bar-chart-2": 0xe182,
  "horizontal-stacked-chart": 0xe183,
  "vertical-stacked-chart": 0xe184,
  "choropleth-chart": 0x1e185,
  "geographic-bubble-chart": 0x1e186,
  "multiple-radar-chart": 0xe187,
  "radar-chart": 0xe188,
  "crossed-line-chart": 0xe189,
  "multiple-line-chart": 0xe18a,
  "multiple-bar-chart": 0xe18b,
  "line-chart": 0xe18c,
  "line-chart-dual-axis": 0xe18d,
  "bubble-chart": 0xe18e,
  "scatter-chart": 0xe18f,
  "multiple-pie-chart": 0xe190,
  "column-chart-dual-axis": 0xe191,
  "tag-cloud-chart": 0xe192,
  "area-chart": 0xe193,
  "cause": 0xe194,
  "cart-3": 0xe195,
  "cart-2": 0xe196,
  "bus-public-transport": 0xe197,
  "burglary": 0xe198,
  "building": 0xe199,
  "border": 0xe19a,
  "bookmark": 0xe19b,
  "badge": 0xe19c,
  "attachment-audio": 0xe19d,
  "attachment-video": 0xe19e,
  "attachment-html": 0xe19f,
  "attachment-photo": 0xe1a0,
  "attachment-e-pub": 0xe1a1,
  "attachment-zip-file": 0xe1a2,
  "attachment-text-file": 0xe1a3,
  "add-equipment": 0xe1a4,
  "add-activity": 0x1e1a5,
  "activity-individual": 0xe1a6,
  "activity-2": 0x1e1a7,
  "add-activity-2": 0x1e1a8,
  "activity-items": 0xe1a9,
  "activity-assigned-to-goal": 0xe1aa,
  "status-completed": 0xe1ab,
  "status-positive": 0xe1ab,
  "status-error": 0xe1ac,
  "status-negative": 0xe1ac,
  "status-inactive": 0xe1ad,
  "status-in-process": 0xe1ae,
  "status-critical": 0xe1ae,
  "blank-tag-2": 0xe1af,
  "cart-full": 0xe1b0,
  "locate-me": 0xe1b1,
  "paging": 0xe1b2,
  "company-view": 0xe1b3,
  "document-text": 0xe1b4,
  "explorer": 0xe1b5,
  "personnel-view": 0xe1b6,
  "sorting-ranking": 0xe1b7,
  "drill-down": 0xe1b8,
  "drill-up": 0xe1b9,
  "vds-file": 0xe1ba,
  "sap-logo-shape": 0x1e1bb,
  "folder-full": 0xe1bc,
  "system-exit": 0xe1bd,
  "system-exit-2": 0xe1be,
  "close-command-field": 0xe1bf,
  "open-command-field": 0xe1c0,
  "sys-enter-2": 0x1e1c1,
  "sys-enter": 0x1e1c2,
  "sys-help-2": 0x1e1c3,
  "sys-help": 0x1e1c4,
  "sys-back": 0xe1c5,
  "sys-back-2": 0xe1c6,
  "sys-cancel": 0xe1c7,
  "sys-cancel-2": 0xe1c8,
  "open-folder": 0xe1c9,
  "sys-find-next": 0xe1ca,
  "sys-find": 0xe1cb,
  "sys-monitor": 0xe1cc,
  "sys-prev-page": 0xe1cd,
  "sys-first-page": 0xe1ce,
  "sys-next-page": 0xe1cf,
  "sys-last-page": 0xe1d0,
  "generate-shortcut": 0xe1d1,
  "create-session": 0xe1d2,
  "display-more": 0xe1d3,
  "enter-more": 0xe1d4,
  "zoom-in": 0xe1d5,
  "zoom-out": 0xe1d6,
  "header": 0xe1d7,
  "detail-view": 0xe1d8,
  "show-edit": 0xe1d8,
  "collapse": 0xe1d9,
  "expand": 0xe1da,
  "positive": 0xe1db,
  "negative": 0xe1dc,
  "display": 0xe1dd,
  "menu2": 0xe1de,
  "redo": 0xe1df,
  "undo": 0xe1e0,
  "navigation-up-arrow": 0xe1e1,
  "navigation-down-arrow": 0xe1e2,
  "down": 0xe1e3,
  "up": 0xe1e4,
  "shelf": 0xe1e5,
  "background": 0xe1e6,
  "resize": 0xe1e7,
  "move": 0xe1e8,
  "show": 0xe1e9,
  "hide": 0xe1ea,
  "nav-back": 0xe1eb,
  "error": 0xe1ec,
  "slim-arrow-right": 0xe1ed,
  "slim-arrow-left": 0xe1ee,
  "slim-arrow-down": 0xe1ef,
  "slim-arrow-up": 0xe1f0,
  "forward": 0xe1f1,
  "overflow": 0xe1f2,
  "value-help": 0xe1f3,
  "multi-select": 0x1e1f4,
  "exit-full-screen": 0xe1f5,
  "sys-add": 0xe1f6,
  "sys-minus": 0xe1f7,
  "dropdown": 0xe1f8,
  "expand-group": 0xe1f9,
  "collapse-group": 0xe200,
  "vertical-grip": 0xe1fa,
  "horizontal-grip": 0xe1fb,
  "sort-descending": 0xe1fc,
  "sort-ascending": 0xe1fd,
  "arrow-down": 0xe1fe,
  "legend": 0xe1ff,
  "message-warning": 0xe201,
  "message-information": 0x1e202,
  "message-success": 0x1e203,
  "restart": 0xe204,
  "stop": 0xe205,
  "add-process": 0xe206,
  "cancel-maintenance": 0xe207,
  "activate": 0xe208,
  "resize-horizontal": 0xe209,
  "resize-vertical": 0xe20a,
  "connected": 0xe20b,
  "disconnected": 0xe20c,
  "edit-outside": 0xe20d,
  "key": 0xe20e,
  "minimize": 0xe20f,
  "back-to-top": 0xe210,
  "hello-world": 0xe211,
  "outbox": 0xe212,
  "donut-chart": 0xe213,
  "heatmap-chart": 0xe214,
  "horizontal-bullet-chart": 0xe215,
  "vertical-bullet-chart": 0xe216,
  "call": 0xe217,
  "download-from-cloud": 0xe218,
  "upload-to-cloud": 0xe219,
  "jam": 0xe21a,
  "sap-ui5": 0xe21b,
  "message-popup": 0xe21c,
  "cloud": 0xe21d,
  "horizontal-waterfall-chart": 0x1e21e,
  "vertical-waterfall-chart": 0x1e21f,
  "broken-link": 0xe220,
  "headset": 0xe221,
  "thumb-up": 0x1e222,
  "thumb-down": 0x1e223,
  "multiselect-all": 0x1e224,
  "multiselect-none": 0x1e225,
  "scissors": 0xe226,
  "sound": 0x1e227,
  "sound-loud": 0x1e228,
  "sound-off": 0x1e229,
  "date-time": 0x1e22a,
  "user-settings": 0xe22b,
  "key-user-settings": 0xe22c,
  "developer-settings": 0xe22d,
  "text-formatting": 0x1e22e,
  "bold-text": 0x1e22f,
  "italic-text": 0x1e230,
  "underline-text": 0x1e231,
  "text-align-justified": 0x1e232,
  "text-align-left": 0x1e233,
  "text-align-center": 0x1e234,
  "text-align-right": 0x1e235,
  "bullet-text": 0x1e236,
  "numbered-text": 0x1e237,
  "co": 0xe238,
  "ui-notifications": 0xe239,
  "bell": 0xe23a,
  "cancel-share": 0xe23b,
  "write-new-document": 0xe23c,
  "write-new": 0xe23d,
  "cancel": 0x1e23e,
  "screen-split-one": 0xe23f,
  "screen-split-two": 0xe240,
  "screen-split-three": 0xe241,
  "customize": 0xe242,
  "user-edit": 0xe243,
  "source-code": 0xe244,
  "copy": 0xe245,
  "paste": 0xe246,
  "line-chart-time-axis": 0x1e247,
  "clear-filter": 0xe248,
  "reset": 0xe249,
  "trend-up": 0xe24a,
  "trend-down": 0xe24b,
  "cursor-arrow": 0xe24c,
  "add-document": 0xe24d,
  "create-form": 0xe24e,
  "resize-corner": 0xe24f,
  "chevron-phase": 0xe250,
  "chevron-phase-2": 0xe251,
  "rhombus-milestone": 0xe252,
  "rhombus-milestone-2": 0xe253,
  "circle-task": 0xe254,
  "circle-task-2": 0xe255,
  "project-definition-triangle": 0xe256,
  "project-definition-triangle-2": 0xe257,
  "master-task-triangle": 0xe258,
  "master-task-triangle-2": 0xe259,
  "program-triangles": 0xe25a,
  "program-triangles-2": 0xe25b,
  "mirrored-task-circle": 0xe25c,
  "mirrored-task-circle-2": 0xe25d,
  "checklist-item": 0xe25e,
  "checklist-item-2": 0xe25f,
  "checklist": 0xe260,
  "checklist-2": 0xe261,
  "chart-table-view": 0xe262,
  "filter-analytics": 0xe263,
  "filter-facets": 0xe264,
  "filter-fields": 0xe265,
  "indent": 0xe266,
  "outdent": 0xe267,
  "heading1": 0x1e268,
  "heading2": 0x1e269,
  "heading3": 0x1e26a,
  "decrease-line-height": 0xe26b,
  "increase-line-height": 0xe26c,
  "fx": 0x1e26d,
  "add-folder": 0xe26e,
  "away": 0xe26f,
  "busy": 0xe270,
  "appear-offline": 0xe271,
  "blur": 0xe272,
  "pixelate": 0xe273,
  "horizontal-combination-chart": 0xe274,
  "add-employee": 0xe275,
  "text-color": 0x1e276,
  "browse-folder": 0xe277,
  "primary-key": 0xe278,
  "two-keys": 0xe279,
  "strikethrough": 0xe27a,
  "text": 0xe27b,
  "responsive": 0xe27c,
  "desktop-mobile": 0xe27d,
  "table-row": 0xe27e,
  "table-column": 0xe27f,
  "validate": 0x1e280,
  "keyboard-and-mouse": 0xe281,
  "touch": 0xe282,
  "expand-all": 0xe283,
  "collapse-all": 0xe284,
  "combine": 0xe285,
  "split": 0xe286
  /* eslint-enable */

};

const getIconURI = iconName => {
  return `sap-icon://${iconName}`;
};

exports.getIconURI = getIconURI;

const getIconInfo = iconURI => {
  if (!isIconURI(iconURI)) {
    console.warn(`Invalid icon URI ${iconURI}`);
    /* eslint-disable-line */

    return;
  }

  let iconName = _URI.default.parse(iconURI).hostname;
  /* when "sap-icon://" is skipped, but icon is valid */


  if (iconURI.indexOf("sap-icon://") === -1) {
    iconName = _URI.default.parse(iconURI).protocol;
  }

  return {
    fontFamily: SAP_ICON_FONT_FAMILY,
    uri: getIconURI(iconName),
    content: `${stringFromCharCode(iconMapping[iconName])}`
  };
};

exports.getIconInfo = getIconInfo;

const isIconURI = uri => {
  return /sap-icon:\/\//.test(uri) || iconMapping.hasOwnProperty(uri);
  /* eslint-disable-line */
};

exports.isIconURI = isIconURI;

const stringFromCharCode = code => {
  return String.fromCharCode(typeof code === "number" ? code : parseInt(code, 16));
};
},{"@ui5/webcomponents-core/dist/sap/ui/thirdparty/URI.js":"../node_modules/@ui5/webcomponents-core/dist/sap/ui/thirdparty/URI.js"}],"../node_modules/@ui5/webcomponents/dist/build/compiled/IconTemplate.lit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ifDefined = _interopRequireDefault(require("@ui5/webcomponents-base/src/renderer/ifDefined.js"));

var _LitRenderer = require("@ui5/webcomponents-base/src/renderer/LitRenderer.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-unused-vars: 0 */
const block0 = context => {
  return _LitRenderer.html`<span	class="${(0, _ifDefined.default)((0, _LitRenderer.classMap)(context.classes.main))}"	style="${(0, _ifDefined.default)(context.fontStyle)}"	tabindex="-1"	data-sap-ui-icon-content="${(0, _ifDefined.default)(context.iconContent)}"	dir="${(0, _ifDefined.default)(context.dir)}"></span>`;
};

var _default = block0;
exports.default = _default;
},{"@ui5/webcomponents-base/src/renderer/ifDefined.js":"../node_modules/@ui5/webcomponents-base/src/renderer/ifDefined.js","@ui5/webcomponents-base/src/renderer/LitRenderer.js":"../node_modules/@ui5/webcomponents-base/src/renderer/LitRenderer.js"}],"../node_modules/@ui5/webcomponents/dist/themes/Icon.css.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = ":host(ui5-icon:not([hidden])){display:inline-block;outline:none;color:var(--sapUiContentNonInteractiveIconColor,var(--sapContent_NonInteractiveIconColor,var(--sapPrimary7,#6a6d70)))}ui5-icon:not([hidden]){display:inline-block;outline:none;color:var(--sapUiContentNonInteractiveIconColor,var(--sapContent_NonInteractiveIconColor,var(--sapPrimary7,#6a6d70)))}.sapWCIcon{width:100%;height:100%;display:flex;justify-content:center;align-items:center;outline:none;border-style:none;pointer-events:none}.sapWCIcon:before{content:attr(data-sap-ui-icon-content);speak:none;font-weight:400;-webkit-font-smoothing:antialiased;display:flex;justify-content:center;align-items:center;width:100%;height:100%;pointer-events:none}[dir=rtl].sapWCIconMirrorInRTL:not(.sapWCIconSuppressMirrorInRTL):after,[dir=rtl].sapWCIconMirrorInRTL:not(.sapWCIconSuppressMirrorInRTL):before{transform:scaleX(-1)}";
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents/dist/Icon.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UI5Element = _interopRequireDefault(require("@ui5/webcomponents-base/src/UI5Element.js"));

var _LitRenderer = _interopRequireDefault(require("@ui5/webcomponents-base/src/renderer/LitRenderer.js"));

var _PseudoEvents = require("@ui5/webcomponents-base/src/events/PseudoEvents.js");

var _IconPool = require("@ui5/webcomponents-base/src/IconPool.js");

var _getEffectiveRTL = _interopRequireDefault(require("@ui5/webcomponents-base/src/util/getEffectiveRTL.js"));

var _IconTemplateLit = _interopRequireDefault(require("./build/compiled/IconTemplate.lit.js"));

var _IconCss = _interopRequireDefault(require("./themes/Icon.css.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Styles

/**
 * @public
 */
const metadata = {
  tag: "ui5-icon",
  properties:
  /** @lends sap.ui.webcomponents.main.Icon.prototype */
  {
    /**
     * Defines the source URI of the <code>ui5-icon</code>.
     * <br><br>
     * SAP-icons font provides numerous options. To find all the available icons, see the
     * <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
     * <br><br>
     * Example:
     * <br>
     * <code>src='sap-icons://add'</code>, <code>src='sap-icons://delete'</code>, <code>src='sap-icons://employee'</code>.
     *
     * @type {string}
     * @public
    */
    src: {
      type: String
    }
  },
  events: {
    press: {}
  }
};
/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-icon</code> component is a wrapper around the HTML tag to embed an icon from an icon font.
 * There are two main scenarios how the <code>ui5-icon</code> component is used:
 * as a purely decorative element; or as a visually appealing clickable area in the form of an icon button.
 * In the first case, images are not predefined as tab stops in accessibility mode.
 * <br><br>
 * The <code>ui5-icon</code> uses embedded font instead of pixel image.
 * Comparing to image, <code>ui5-icon</code> is easily scalable,
 * its color can be altered live, and various effects can be added using CSS.
 * <br><br>
 * A large set of built-in icons is available
 * and they can be used by setting the <code>src</code> property on the <code>ui5-icon</code>.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Icon";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Icon
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-icon
 * @public
 */

class Icon extends _UI5Element.default {
  static get metadata() {
    return metadata;
  }

  static get render() {
    return _LitRenderer.default;
  }

  static get template() {
    return _IconTemplateLit.default;
  }

  static get styles() {
    return _IconCss.default;
  }

  focus() {
    HTMLElement.prototype.focus.call(this);
  }

  onclick() {
    this.fireEvent("press");
  }

  onkeydown(event) {
    if ((0, _PseudoEvents.isSpace)(event)) {
      event.preventDefault();
      this.__spaceDown = true;
    } else if ((0, _PseudoEvents.isEnter)(event)) {
      this.onclick(event);
    }
  }

  onkeyup(event) {
    if ((0, _PseudoEvents.isSpace)(event) && this.__spaceDown) {
      this.fireEvent("press");
      this.__spaceDown = false;
    }
  }

  get classes() {
    const iconInfo = (0, _IconPool.getIconInfo)(this.src) || {};
    return {
      main: {
        sapWCIcon: true,
        sapWCIconMirrorInRTL: !iconInfo.suppressMirroring
      }
    };
  }

  get iconContent() {
    const iconInfo = (0, _IconPool.getIconInfo)(this.src) || {};
    return iconInfo.content;
  }

  get dir() {
    return (0, _getEffectiveRTL.default)() ? "rtl" : "ltr";
  }

  get fontStyle() {
    const iconInfo = (0, _IconPool.getIconInfo)(this.src) || {};
    return `font-family: '${iconInfo.fontFamily}'`;
  }

}

Icon.define();
var _default = Icon;
exports.default = _default;
},{"@ui5/webcomponents-base/src/UI5Element.js":"../node_modules/@ui5/webcomponents-base/src/UI5Element.js","@ui5/webcomponents-base/src/renderer/LitRenderer.js":"../node_modules/@ui5/webcomponents-base/src/renderer/LitRenderer.js","@ui5/webcomponents-base/src/events/PseudoEvents.js":"../node_modules/@ui5/webcomponents-base/src/events/PseudoEvents.js","@ui5/webcomponents-base/src/IconPool.js":"../node_modules/@ui5/webcomponents-base/src/IconPool.js","@ui5/webcomponents-base/src/util/getEffectiveRTL.js":"../node_modules/@ui5/webcomponents-base/src/util/getEffectiveRTL.js","./build/compiled/IconTemplate.lit.js":"../node_modules/@ui5/webcomponents/dist/build/compiled/IconTemplate.lit.js","./themes/Icon.css.js":"../node_modules/@ui5/webcomponents/dist/themes/Icon.css.js"}],"../node_modules/@ui5/webcomponents/dist/themes/Button.css.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = ":host(ui5-button:not([hidden])){display:inline-block}ui5-button:not([hidden]){display:inline-block}button[dir=rtl].sapMBtn.sapMBtnWithIcon .sapMBtnText{margin-right:var(--_ui5_button_base_icon_margin,.375rem);margin-left:0}button[dir=rtl].sapMBtn.sapMBtnIconEnd .sapWCIconInButton{margin-right:var(--_ui5_button_base_icon_margin,.375rem);margin-left:0}button.sapUiSizeCompact .sapWCIconInButton{font-size:1rem}button.sapUiSizeCompact.sapMBtn{padding:var(--_ui5_button_compact_padding,0 .4375rem);min-height:var(--_ui5_button_compact_height,1.625rem);min-width:var(--_ui5_button_base_min_compact_width,2rem)}ui5-button .sapMBtn:before{content:\"\";min-height:inherit;font-size:0}.sapMBtn{width:100%;height:100%;min-width:var(--_ui5_button_base_min_width,2.25rem);min-height:var(--_ui5_button_base_height,2.25rem);font-family:var(--sapUiFontFamily,var(--sapFontFamily,\"72\",\"72full\",Arial,Helvetica,sans-serif));font-size:var(--sapMFontMediumSize,.875rem);font-weight:400;box-sizing:border-box;padding:var(--_ui5_button_base_padding,0 .5625rem);border-radius:var(--_ui5_button_border_radius,.25rem);border-width:.0625rem;cursor:pointer;display:flex;justify-content:center;align-items:center;background-color:var(--sapUiButtonBackground,var(--sapButton_Background,var(--sapBaseColor,var(--sapPrimary3,#fff))));border:1px solid var(--sapUiButtonBorderColor,var(--sapButton_BorderColor,#0854a0));color:var(--sapUiButtonTextColor,var(--sapButton_TextColor,#0854a0));text-shadow:var(--sapUiShadowText,0 0 .125rem var(--sapUiContentContrastShadowColor,var(--sapContent_ContrastShadowColor,#fff)));outline:none;position:relative}.sapMBtn:not(.sapMBtnActive):hover{background:var(--sapUiButtonHoverBackground,var(--sapButton_Hover_Background,#ebf5fe))}.sapMBtn .sapWCIconInButton{font-size:var(--_ui5_button_base_icon_only_font_size,1rem);position:relative;color:inherit}.sapMBtn.sapMBtnIconEnd{flex-direction:row-reverse}.sapMBtn.sapMBtnIconEnd .sapWCIconInButton{margin-left:var(--_ui5_button_base_icon_margin,.375rem)}.sapMBtn.sapMBtnNoText{padding:var(--_ui5_button_base_icon_only_padding,0 .5625rem)}.sapMBtnText{outline:none;position:relative}.sapMBtn.sapMBtnWithIcon .sapMBtnText{margin-left:var(--_ui5_button_base_icon_margin,.375rem)}.sapMBtnDisabled{opacity:.5;pointer-events:none}.sapMBtn:focus:after{content:\"\";position:absolute;border:var(--_ui5_button_focus_after_border,1px dotted var(--sapUiContentFocusColor,var(--sapContent_FocusColor,#000)));top:var(--_ui5_button_focus_after_top,1px);bottom:var(--_ui5_button_focus_after_bottom,1px);left:var(--_ui5_button_focus_after_left,1px);right:var(--_ui5_button_focus_after_right,1px)}.sapMBtn::-moz-focus-inner{border:0}.sapMBtnActive{background-image:none;background-color:var(--sapUiButtonActiveBackground,var(--sapUiActive,var(--sapActiveColor,var(--sapHighlightColor,#0854a0))));border-color:var(--_ui5_button_active_border_color,var(--sapUiButtonActiveBorderColor,var(--sapUiButtonActiveBackground,var(--sapUiActive,var(--sapActiveColor,var(--sapHighlightColor,#0854a0))))));color:var(--sapUiButtonActiveTextColor,#fff);text-shadow:none}.sapMBtnActive:focus:after{border-color:var(--sapUiContentContrastFocusColor,var(--sapContent_ContrastFocusColor,#fff))}.sapMBtn.sapMBtnPositive{background-color:var(--sapUiButtonAcceptBackground,var(--sapButton_Accept_Background,var(--sapButton_Background,var(--sapBaseColor,var(--sapPrimary3,#fff)))));border-color:var(--_ui5_button_positive_border_color,var(--sapUiButtonAcceptBorderColor,var(--sapUiPositiveElement,var(--sapPositiveElementColor,var(--sapPositiveColor,#107e3e)))));color:var(--sapUiButtonAcceptTextColor,#107e3e);text-shadow:var(--sapUiShadowText,0 0 .125rem var(--sapUiContentContrastShadowColor,var(--sapContent_ContrastShadowColor,#fff)))}.sapMBtn.sapMBtnPositive:hover{background-color:var(--sapUiButtonAcceptHoverBackground,var(--sapUiSuccessBG,var(--sapSuccessBackground,#f1fdf6)));border-color:var(--_ui5_button_positive_border_hover_color,var(--sapUiButtonAcceptHoverBorderColor,var(--sapUiButtonAcceptBorderColor,var(--sapUiPositiveElement,var(--sapPositiveElementColor,var(--sapPositiveColor,#107e3e))))))}.sapMBtn.sapMBtnPositive.sapMBtnActive{background-color:var(--sapUiButtonAcceptActiveBackground,#0d6733);border-color:var(--_ui5_button_positive_border_active_color,var(--sapUiButtonAcceptActiveBorderColor,var(--sapUiButtonAcceptActiveBackground,#0d6733)));color:var(--sapUiButtonActiveTextColor,#fff);text-shadow:none}.sapMBtn.sapMBtnPositive:focus{border-color:var(--_ui5_button_positive_focus_border_color,var(--sapUiButtonAcceptBorderColor,var(--sapUiPositiveElement,var(--sapPositiveElementColor,var(--sapPositiveColor,#107e3e)))))}.sapMBtn.sapMBtnPositive.sapMBtnActive:focus:after{border-color:var(--sapUiContentContrastFocusColor,var(--sapContent_ContrastFocusColor,#fff))}.sapMBtn.sapMBtnPositive:focus:after{border-color:var(--_ui5_button_positive_border_focus_hover_color,var(--sapUiContentFocusColor,var(--sapContent_FocusColor,#000)))}.sapMBtn.sapMBtnNegative{background-color:var(--sapUiButtonRejectBackground,var(--sapButton_Reject_Background,var(--sapButton_Background,var(--sapBaseColor,var(--sapPrimary3,#fff)))));border-color:var(--sapUiButtonRejectBorderColor,var(--sapUiNegativeElement,var(--sapNegativeElementColor,var(--sapNegativeColor,#b00))));color:var(--sapUiButtonRejectTextColor,#b00);text-shadow:var(--sapUiShadowText,0 0 .125rem var(--sapUiContentContrastShadowColor,var(--sapContent_ContrastShadowColor,#fff)))}.sapMBtn.sapMBtnNegative:hover{background-color:var(--sapUiButtonRejectHoverBackground,var(--sapUiErrorBG,var(--sapErrorBackground,#ffebeb)));border-color:var(--sapUiButtonRejectHoverBorderColor,var(--sapUiButtonRejectBorderColor,var(--sapUiNegativeElement,var(--sapNegativeElementColor,var(--sapNegativeColor,#b00)))))}.sapMBtn.sapMBtnNegative:focus{border-color:var(--_ui5_button_negative_focus_border_color,var(--sapUiButtonRejectBorderColor,var(--sapUiNegativeElement,var(--sapNegativeElementColor,var(--sapNegativeColor,#b00)))))}.sapMBtn.sapMBtnNegative.sapMBtnActive{background-color:var(--sapUiButtonRejectActiveBackground,#a20000);border-color:var(--_ui5_button_negative_active_border_color,var(--sapUiButtonRejectActiveBorderColor,var(--sapUiButtonRejectActiveBackground,#a20000)));color:var(--sapUiButtonActiveTextColor,#fff);text-shadow:none}.sapMBtn.sapMBtnNegative.sapMBtnActive:focus:after{border-color:var(--sapUiContentContrastFocusColor,var(--sapContent_ContrastFocusColor,#fff))}.sapMBtn.sapMBtnNegative:focus:after{border-color:var(--_ui5_button_positive_border_focus_hover_color,var(--sapUiContentFocusColor,var(--sapContent_FocusColor,#000)))}.sapMBtn.sapMBtnEmphasized{background-color:var(--sapUiButtonEmphasizedBackground,var(--sapButton_Emphasized_Background,var(--sapBrandColor,var(--sapPrimary2,#0a6ed1))));border-color:var(--sapUiButtonEmphasizedBorderColor,var(--sapButton_Emphasized_BorderColor,var(--sapButton_Emphasized_Background,var(--sapBrandColor,var(--sapPrimary2,#0a6ed1)))));color:var(--sapUiButtonEmphasizedTextColor,var(--sapButton_Emphasized_TextColor,#fff));text-shadow:0 0 .125rem var(--sapUiButtonEmphasizedTextShadow,transparent);font-weight:var(--_ui5_button_emphasized_font_weight,bold)}.sapMBtn.sapMBtnEmphasized:hover{background-color:var(--sapUiButtonEmphasizedHoverBackground,#085caf);border-color:var(--sapUiButtonEmphasizedHoverBorderColor,var(--sapUiButtonEmphasizedHoverBackground,#085caf))}.sapMBtn.sapMBtnEmphasized.sapMBtnActive{background-color:var(--sapUiButtonEmphasizedActiveBackground,#0854a0);border-color:var(--sapUiButtonEmphasizedActiveBorderColor,var(--sapUiButtonEmphasizedActiveBackground,#0854a0));color:var(--sapUiButtonActiveTextColor,#fff);text-shadow:none}.sapMBtn.sapMBtnEmphasized.sapMBtnActive:focus:after,.sapMBtn.sapMBtnEmphasized:focus:after{border-color:var(--sapUiContentContrastFocusColor,var(--sapContent_ContrastFocusColor,#fff))}.sapMBtn.sapMBtnEmphasized:focus{border-color:var(--_ui5_button_emphasized_focused_border_color,var(--sapUiButtonEmphasizedBorderColor,var(--sapButton_Emphasized_BorderColor,var(--sapButton_Emphasized_Background,var(--sapBrandColor,var(--sapPrimary2,#0a6ed1))))))}.sapMBtn.sapMBtnTransparent{background-color:var(--sapUiButtonLiteBackground,transparent);border-color:var(--sapUiButtonLiteBorderColor,transparent);color:var(--sapUiButtonLiteTextColor,var(--sapUiButtonTextColor,var(--sapButton_TextColor,#0854a0)));text-shadow:var(--sapUiShadowText,0 0 .125rem var(--sapUiContentContrastShadowColor,var(--sapContent_ContrastShadowColor,#fff)));border-color:transparent}.sapMBtn.sapMBtnTransparent:hover{background-color:var(--sapUiButtonLiteHoverBackground,var(--sapUiButtonHoverBackground,var(--sapButton_Hover_Background,#ebf5fe)))}.sapMBtn.sapMBtnTransparent.sapMBtnActive{background-color:var(--sapUiButtonLiteActiveBackground,var(--sapUiButtonActiveBackground,var(--sapUiActive,var(--sapActiveColor,var(--sapHighlightColor,#0854a0)))));color:var(--sapUiButtonActiveTextColor,#fff);text-shadow:none}.sapMBtn.sapMBtnTransparent:hover:not(.sapMBtnActive){border-color:transparent}";
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents/dist/Button.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UI5Element = _interopRequireDefault(require("@ui5/webcomponents-base/src/UI5Element.js"));

var _LitRenderer = _interopRequireDefault(require("@ui5/webcomponents-base/src/renderer/LitRenderer.js"));

var _PseudoEvents = require("@ui5/webcomponents-base/src/events/PseudoEvents.js");

var _Configuration = require("@ui5/webcomponents-base/src/Configuration.js");

var _getEffectiveRTL = _interopRequireDefault(require("@ui5/webcomponents-base/src/util/getEffectiveRTL.js"));

var _FeaturesRegistry = require("@ui5/webcomponents-base/src/FeaturesRegistry.js");

var _ButtonDesign = _interopRequireDefault(require("./types/ButtonDesign.js"));

var _ButtonTemplateLit = _interopRequireDefault(require("./build/compiled/ButtonTemplate.lit.js"));

var _Icon = _interopRequireDefault(require("./Icon.js"));

var _ButtonCss = _interopRequireDefault(require("./themes/Button.css.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Styles

/**
 * @public
 */
const metadata = {
  tag: "ui5-button",
  properties:
  /** @lends sap.ui.webcomponents.main.Button.prototype */
  {
    /**
     * Defines the <code>ui5-button</code> design.
     * </br></br>
     * <b>Note:</b> Available options are "Default", "Emphasized", "Positive",
     * "Negative", and "Transparent".
     *
     * @type {ButtonDesign}
     * @defaultvalue "Default"
     * @public
     */
    design: {
      type: _ButtonDesign.default,
      defaultValue: _ButtonDesign.default.Default
    },

    /**
     * Defines whether the <code>ui5-button</code> is disabled
     * (default is set to <code>false</code>).
     * A disabled <code>ui5-button</code> can't be pressed or
     * focused, and it is not in the tab chain.
     *
     * @type {boolean}
     * @defaultvalue false
     * @public
     */
    disabled: {
      type: Boolean
    },

    /**
     * Defines the icon to be displayed as graphical element within the <code>ui5-button</code>.
     * The SAP-icons font provides numerous options.
     * <br><br>
     * Example:
     * <br>
     * <pre>ui5-button icon="sap-icon://palette"</pre>
     *
     * See all the available icons in the <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
     *
     * @type {string}
     * @defaultvalue ""
     * @public
     */
    icon: {
      type: String
    },

    /**
     * Defines whether the icon should be displayed after the <code>ui5-button</code> text.
     *
     * @type {boolean}
     * @defaultvalue false
     * @public
     */
    iconEnd: {
      type: Boolean
    },

    /**
     * When set to <code>true</code>, the <code>ui5-button</code> will
     * automatically submit the nearest form element upon <code>press</code>.
     *
     * <b>Important:</b> For the <code>submits</code> property to have effect, you must add the following import to your project:
     * <code>import "@ui5/webcomponents/dist/InputElementsFormSupport.js";</code>
     *
     * @type {boolean}
     * @defaultvalue false
     * @public
     */
    submits: {
      type: Boolean
    },

    /**
     * Used to switch the active state (pressed or not) of the <code>ui5-button</code>.
     */
    _active: {
      type: Boolean
    },
    _iconSettings: {
      type: Object
    }
  },
  slots:
  /** @lends sap.ui.webcomponents.main.Button.prototype */
  {
    /**
     * Defines the text of the <code>ui5-button</code>.
     * <br><b>Note:</b> Аlthough this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
     *
     * @type {Node[]}
     * @slot
     * @public
     */
    text: {
      type: Node,
      multiple: true
    }
  },
  defaultSlot: "text",
  events:
  /** @lends sap.ui.webcomponents.main.Button.prototype */
  {
    /**
     * Fired when the <code>ui5-button</code> is pressed either with a
     * click/tap or by using the Enter or Space key.
     * <br><br>
     * <b>Note:</b> The event will not be fired if the <code>disabled</code>
     * property is set to <code>true</code>.
     *
     * @event
     * @public
     */
    press: {}
  }
};
/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-button</code> component represents a simple push button.
 * It enables users to trigger actions by clicking or tapping the <code>ui5-button</code>, or by pressing
 * certain keyboard keys, such as Enter.
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-button</code> UI, you can define text, icon, or both. You can also specify
 * whether the text or the icon is displayed first.
 * <br><br>
 * You can choose from a set of predefined types that offer different
 * styling to correspond to the triggered action.
 * <br><br>
 * You can set the <code>ui5-button</code> as enabled or disabled. An enabled
 * <code>ui5-button</code> can be pressed by clicking or tapping it. The button changes
 * its style to provide visual feedback to the user that it is pressed or hovered over with
 * the mouse cursor. A disabled <code>ui5-button</code> appears inactive and cannot be pressed.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Button";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Button
 * @extends UI5Element
 * @tagname ui5-button
 * @public
 */

class Button extends _UI5Element.default {
  static get metadata() {
    return metadata;
  }

  static get styles() {
    return _ButtonCss.default;
  }

  static get render() {
    return _LitRenderer.default;
  }

  static get template() {
    return _ButtonTemplateLit.default;
  }

  constructor() {
    super();

    this._deactivate = () => {
      if (this._active) {
        this._active = false;
      }
    };
  }

  onBeforeRendering() {
    const FormSupport = (0, _FeaturesRegistry.getFeature)("FormSupport");

    if (this.submits && !FormSupport) {
      console.warn(`In order for the "submits" property to have effect, you should also: import "@ui5/webcomponents/dist/InputElementsFormSupport.js";`); // eslint-disable-line
    }
  }

  onEnterDOM() {
    document.addEventListener("mouseup", this._deactivate);
  }

  onExitDOM() {
    document.removeEventListener("mouseup", this._deactivate);
  }

  onclick(event) {
    event.isMarked = "button";

    if (!this.disabled) {
      this.fireEvent("press", {});
      const FormSupport = (0, _FeaturesRegistry.getFeature)("FormSupport");

      if (FormSupport) {
        FormSupport.triggerFormSubmit(this);
      }
    }
  }

  onmousedown(event) {
    event.isMarked = "button";

    if (!this.disabled) {
      this._active = true;
    }
  }

  onmouseup(event) {
    event.isMarked = "button";
  }

  onkeydown(event) {
    if ((0, _PseudoEvents.isSpace)(event) || (0, _PseudoEvents.isEnter)(event)) {
      this._active = true;
    }
  }

  onkeyup(event) {
    if ((0, _PseudoEvents.isSpace)(event) || (0, _PseudoEvents.isEnter)(event)) {
      this._active = false;
    }
  }

  onfocusout(_event) {
    this._active = false;
  }

  get classes() {
    return {
      main: {
        sapMBtn: true,
        sapMBtnActive: this._active,
        sapMBtnWithIcon: this.icon,
        sapMBtnNoText: !this.text.length,
        sapMBtnDisabled: this.disabled,
        sapMBtnIconEnd: this.iconEnd,
        [`sapMBtn${this.design}`]: true,
        sapUiSizeCompact: (0, _Configuration.getCompactSize)()
      },
      icon: {
        sapWCIconInButton: true
      },
      text: {
        sapMBtnText: true
      }
    };
  }

  get rtl() {
    return (0, _getEffectiveRTL.default)() ? "rtl" : undefined;
  }

  static async define(...params) {
    await _Icon.default.define();
    super.define(...params);
  }

}

Button.define();
var _default = Button;
exports.default = _default;
},{"@ui5/webcomponents-base/src/UI5Element.js":"../node_modules/@ui5/webcomponents-base/src/UI5Element.js","@ui5/webcomponents-base/src/renderer/LitRenderer.js":"../node_modules/@ui5/webcomponents-base/src/renderer/LitRenderer.js","@ui5/webcomponents-base/src/events/PseudoEvents.js":"../node_modules/@ui5/webcomponents-base/src/events/PseudoEvents.js","@ui5/webcomponents-base/src/Configuration.js":"../node_modules/@ui5/webcomponents-base/src/Configuration.js","@ui5/webcomponents-base/src/util/getEffectiveRTL.js":"../node_modules/@ui5/webcomponents-base/src/util/getEffectiveRTL.js","@ui5/webcomponents-base/src/FeaturesRegistry.js":"../node_modules/@ui5/webcomponents-base/src/FeaturesRegistry.js","./types/ButtonDesign.js":"../node_modules/@ui5/webcomponents/dist/types/ButtonDesign.js","./build/compiled/ButtonTemplate.lit.js":"../node_modules/@ui5/webcomponents/dist/build/compiled/ButtonTemplate.lit.js","./Icon.js":"../node_modules/@ui5/webcomponents/dist/Icon.js","./themes/Button.css.js":"../node_modules/@ui5/webcomponents/dist/themes/Button.css.js"}],"../node_modules/@ui5/webcomponents-core/dist/sap/ui/Device.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.supportTouch = exports.getBrowser = exports.getSystem = exports.getOS = exports.isAndroid = exports.isPhone = exports.isTablet = exports.isDesktop = exports.isMobile = exports.isSafari = exports.isFF = exports.isChrome = exports.isEdge = exports.isIE = void 0;
const Device = {};
const OS = {
  "WINDOWS": "win",
  "MACINTOSH": "mac",
  "IOS": "iOS",
  "ANDROID": "Android"
};

const _getMobileOS = () => {
  const userAgent = navigator.userAgent;
  let rPlatform, aMatches;
  rPlatform = /\(([a-zA-Z ]+);\s(?:[U]?[;]?)([\D]+)((?:[\d._]*))(?:.*[\)][^\d]*)([\d.]*)\s/;
  aMatches = userAgent.match(rPlatform);

  if (aMatches) {
    var rAppleDevices = /iPhone|iPad|iPod/;

    if (aMatches[0].match(rAppleDevices)) {
      aMatches[3] = aMatches[3].replace(/_/g, ".");
      return {
        "name": OS.IOS,
        "versionStr": aMatches[3]
      };
    }

    if (aMatches[2].match(/Android/)) {
      aMatches[2] = aMatches[2].replace(/\s/g, "");
      return {
        "name": OS.ANDROID,
        "versionStr": aMatches[3]
      };
    }
  }

  rPlatform = /\((Android)[\s]?([\d][.\d]*)?;.*Firefox\/[\d][.\d]*/;
  aMatches = userAgent.match(rPlatform);

  if (aMatches) {
    return {
      "name": OS.ANDROID,
      "versionStr": aMatches.length === 3 ? aMatches[2] : ""
    };
  }
};

const _getDesktopOS = () => {
  const sPlatform = navigator.platform;

  if (sPlatform.indexOf("Win") !== -1) {
    const rVersion = /Windows NT (\d+).(\d)/i;
    const uaResult = navigator.userAgent.match(rVersion);
    return {
      "name": OS.WINDOWS,
      "versionStr": uaResult[1]
    };
  }

  if (sPlatform.indexOf("Mac") !== -1) {
    return {
      "name": OS.MACINTOSH,
      "versionStr": ""
    };
  }

  return null;
};

const _getOS = () => {
  return _getMobileOS() || _getDesktopOS();
};

const _setOS = () => {
  if (Device.os) {
    return;
  }

  Device.os = _getOS() || {};
  Device.os.OS = OS;
  Device.os.version = Device.os.versionStr ? parseFloat(Device.os.versionStr) : -1;

  if (Device.os.name) {
    for (let name in OS) {
      if (OS[name] === Device.os.name) {
        Device.os[name.toLowerCase()] = true;
      }
    }
  }
};

const getOS = () => {
  if (!Device.os) {
    _setOS();
  }

  return Device.os;
};

exports.getOS = getOS;

const isAndroid = () => {
  if (!Device.os) {
    _setOS();
  }

  return !!Device.os.android;
};

exports.isAndroid = isAndroid;
const BROWSER = {
  "INTERNET_EXPLORER": "ie",
  "EDGE": "ed",
  "FIREFOX": "ff",
  "CHROME": "cr",
  "SAFARI": "sf",
  "ANDROID": "an"
};

const _calcBrowser = () => {
  const sUserAgent = navigator.userAgent.toLowerCase();
  const rwebkit = /(webkit)[ \/]([\w.]+)/;
  const rmsie = /(msie) ([\w.]+)/;
  const rmsie11 = /(trident)\/[\w.]+;.*rv:([\w.]+)/;
  const redge = /(edge)[ \/]([\w.]+)/;
  const rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/;
  const browserMatch = redge.exec(sUserAgent) || rmsie11.exec(sUserAgent) || rwebkit.exec(sUserAgent) || rmsie.exec(sUserAgent) || sUserAgent.indexOf("compatible") < 0 && rmozilla.exec(sUserAgent) || [];
  const oRes = {
    browser: browserMatch[1] || "",
    version: browserMatch[2] || "0"
  };
  oRes[oRes.browser] = true;
  return oRes;
};

const _getBrowser = () => {
  const oBrowser = _calcBrowser();

  const sUserAgent = navigator.userAgent;
  const oNavigator = window.navigator;
  let oExpMobile;
  let oResult;

  if (oBrowser.mozilla) {
    oExpMobile = /Mobile/;

    if (sUserAgent.match(/Firefox\/(\d+\.\d+)/)) {
      var fVersion = parseFloat(RegExp.$1);
      oResult = {
        name: BROWSER.FIREFOX,
        versionStr: "" + fVersion,
        version: fVersion,
        mozilla: true,
        mobile: oExpMobile.test(sUserAgent)
      };
    } else {
      oResult = {
        mobile: oExpMobile.test(sUserAgent),
        mozilla: true,
        version: -1
      };
    }
  } else if (oBrowser.webkit) {
    var regExpWebkitVersion = sUserAgent.toLowerCase().match(/webkit[\/]([\d.]+)/);
    var webkitVersion;

    if (regExpWebkitVersion) {
      webkitVersion = regExpWebkitVersion[1];
    }

    oExpMobile = /Mobile/;
    var aChromeMatch = sUserAgent.match(/(Chrome|CriOS)\/(\d+\.\d+).\d+/);
    var aFirefoxMatch = sUserAgent.match(/FxiOS\/(\d+\.\d+)/);
    var aAndroidMatch = sUserAgent.match(/Android .+ Version\/(\d+\.\d+)/);

    if (aChromeMatch || aFirefoxMatch || aAndroidMatch) {
      var sName, sVersion, bMobile;

      if (aChromeMatch) {
        sName = BROWSER.CHROME;
        bMobile = oExpMobile.test(sUserAgent);
        sVersion = parseFloat(aChromeMatch[2]);
      } else if (aFirefoxMatch) {
        sName = BROWSER.FIREFOX;
        bMobile = true;
        sVersion = parseFloat(aFirefoxMatch[1]);
      } else if (aAndroidMatch) {
        sName = BROWSER.ANDROID;
        bMobile = oExpMobile.test(sUserAgent);
        sVersion = parseFloat(aAndroidMatch[1]);
      }

      oResult = {
        name: sName,
        mobile: bMobile,
        versionStr: "" + sVersion,
        version: sVersion,
        webkit: true,
        webkitVersion: webkitVersion
      };
    } else {
      var oExp = /(Version|PhantomJS)\/(\d+\.\d+).*Safari/;
      var bStandalone = oNavigator.standalone;

      if (oExp.test(sUserAgent)) {
        var aParts = oExp.exec(sUserAgent);
        var fVersion = parseFloat(aParts[2]);
        oResult = {
          name: BROWSER.SAFARI,
          versionStr: "" + fVersion,
          fullscreen: false,
          webview: false,
          version: fVersion,
          mobile: oExpMobile.test(sUserAgent),
          webkit: true,
          webkitVersion: webkitVersion,
          phantomJS: aParts[1] === "PhantomJS"
        };
      } else if (/iPhone|iPad|iPod/.test(sUserAgent) && !/CriOS/.test(sUserAgent) && !/FxiOS/.test(sUserAgent) && (bStandalone === true || bStandalone === false)) {
        oResult = {
          name: BROWSER.SAFARI,
          version: -1,
          fullscreen: bStandalone,
          webview: !bStandalone,
          mobile: oExpMobile.test(sUserAgent),
          webkit: true,
          webkitVersion: webkitVersion
        };
      } else {
        oResult = {
          mobile: oExpMobile.test(sUserAgent),
          webkit: true,
          webkitVersion: webkitVersion,
          version: -1
        };
      }
    }
  } else if (oBrowser.msie || oBrowser.trident) {
    var fVersion = parseFloat(oBrowser.version);
    oResult = {
      name: BROWSER.INTERNET_EXPLORER,
      versionStr: "" + fVersion,
      version: fVersion,
      msie: true,
      mobile: false
    };
  } else if (oBrowser.edge) {
    var fVersion = fVersion = parseFloat(oBrowser.version);
    oResult = {
      name: BROWSER.EDGE,
      versionStr: "" + fVersion,
      version: fVersion,
      edge: true
    };
  } else {
    oResult = {
      name: "",
      versionStr: "",
      version: -1,
      mobile: false
    };
  }

  return oResult;
};

const _setBrowser = () => {
  Device.browser = _getBrowser();
  Device.browser.BROWSER = BROWSER;

  if (Device.browser.name) {
    for (var b in BROWSER) {
      if (BROWSER[b] === Device.browser.name) {
        Device.browser[b.toLowerCase()] = true;
      }
    }
  }
};

const getBrowser = () => {
  if (!Device.browser) {
    _setBrowser();
  }

  return Device.browser;
};

exports.getBrowser = getBrowser;

const isIE = () => {
  if (!Device.browser) {
    _setBrowser();
  }

  return !!Device.browser.msie;
};

exports.isIE = isIE;

const isEdge = () => {
  if (!Device.browser) {
    _setBrowser();
  }

  return !!Device.browser.edge;
};

exports.isEdge = isEdge;

const isChrome = () => {
  if (!Device.browser) {
    _setBrowser();
  }

  return !!Device.browser.chrome;
};

exports.isChrome = isChrome;

const isFF = () => {
  if (!Device.browser) {
    _setBrowser();
  }

  return !!Device.browser.firefox;
};

exports.isFF = isFF;

const isSafari = () => {
  if (!Device.browser) {
    _setBrowser();
  }

  return !!Device.browser.safari;
};

exports.isSafari = isSafari;

const _setSupport = () => {
  if (Device.support) {
    return;
  }

  if (!Device.browser) {
    _setBrowser();
  }

  Device.support = {};
  Device.support.touch = !!("ontouchstart" in window || navigator.maxTouchPoints > 0 || window.DocumentTouch && document instanceof window.DocumentTouch);
};

const supportTouch = () => {
  if (!Device.support) {
    _setSupport();
  }

  return !!Device.support.touch;
};

exports.supportTouch = supportTouch;
const SYSTEMTYPE = {
  "TABLET": "tablet",
  "PHONE": "phone",
  "DESKTOP": "desktop",
  "COMBI": "combi"
};

const _isTablet = () => {
  const sUserAgent = navigator.userAgent;

  if (Device.os.name === Device.os.OS.IOS) {
    return /ipad/i.test(sUserAgent);
  } else {
    if (supportTouch()) {
      if (Device.os.windows && Device.os.version >= 8) {
        return true;
      }

      if (Device.browser.chrome && Device.os.android && Device.os.version >= 4.4) {
        return !/Mobile Safari\/[.0-9]+/.test(sUserAgent);
      } else {
        let densityFactor = window.devicePixelRatio ? window.devicePixelRatio : 1;

        if (Device.os.android && Device.browser.webkit && parseFloat(Device.browser.webkitVersion) > 537.1) {
          densityFactor = 1;
        }

        const bTablet = Math.min(window.screen.width / densityFactor, window.screen.height / densityFactor) >= 600;
        return bTablet;
      }
    } else {
      const bAndroidPhone = /(?=android)(?=.*mobile)/i.test(sUserAgent);
      return Device.browser.msie && sUserAgent.indexOf("Touch") !== -1 || Device.os.android && !bAndroidPhone;
    }
  }
};

const _getSystem = () => {
  const bTabletDetected = _isTablet();

  const isWin8Upwards = Device.os.windows && Device.os.version >= 8;
  const oSystem = {};
  oSystem.tablet = !!((Device.support.touch || isWin8Upwards) && bTabletDetected);
  oSystem.phone = !!(Device.os.windows_phone || Device.support.touch && !bTabletDetected);
  oSystem.desktop = !!(!oSystem.tablet && !oSystem.phone || isWin8Upwards);
  oSystem.combi = oSystem.desktop && oSystem.tablet;
  oSystem.SYSTEMTYPE = SYSTEMTYPE;
  return oSystem;
};

const _setSystem = () => {
  _setSupport();

  _setOS();

  Device.system = {};
  Device.system = _getSystem();

  if (Device.system.tablet || Device.system.phone) {
    Device.browser.mobile = true;
  }
};

const getSystem = () => {
  if (!Device.system) {
    _setSystem();
  }

  return Device.system;
};

exports.getSystem = getSystem;

const isDesktop = () => {
  if (!Device.system) {
    _setSystem();
  }

  return Device.system.desktop;
};

exports.isDesktop = isDesktop;

const isTablet = () => {
  if (!Device.system) {
    _setSystem();
  }

  return Device.system.tablet;
};

exports.isTablet = isTablet;

const isPhone = () => {
  if (!Device.system) {
    _setSystem();
  }

  return Device.system.phone;
};

exports.isPhone = isPhone;

const isMobile = () => {
  if (!Device.system) {
    _setSystem();
  }

  return Device.browser.mobile;
};

exports.isMobile = isMobile;
},{}],"../node_modules/@ui5/webcomponents-base/src/types/ValueState.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DataType = _interopRequireDefault(require("./DataType.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Different states.
 */
const ValueStates = {
  None: "None",
  Success: "Success",
  Warning: "Warning",
  Error: "Error"
};

class ValueState extends _DataType.default {
  static isValid(value) {
    return !!ValueStates[value];
  }

}

ValueState.generataTypeAcessors(ValueStates);
var _default = ValueState;
exports.default = _default;
},{"./DataType.js":"../node_modules/@ui5/webcomponents-base/src/types/DataType.js"}],"../node_modules/@ui5/webcomponents/dist/types/InputType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DataType = _interopRequireDefault(require("@ui5/webcomponents-base/src/types/DataType.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const InputTypes = {
  Text: "Text",
  Email: "Email",
  Number: "Number",
  Password: "Password",
  Tel: "Tel",
  URL: "URL"
};

class InputType extends _DataType.default {
  static isValid(value) {
    return !!InputTypes[value];
  }

}

InputType.generataTypeAcessors(InputTypes);
var _default = InputType;
exports.default = _default;
},{"@ui5/webcomponents-base/src/types/DataType.js":"../node_modules/@ui5/webcomponents-base/src/types/DataType.js"}],"../node_modules/@ui5/webcomponents/dist/build/compiled/InputTemplate.lit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ifDefined = _interopRequireDefault(require("@ui5/webcomponents-base/src/renderer/ifDefined.js"));

var _LitRenderer = require("@ui5/webcomponents-base/src/renderer/LitRenderer.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-unused-vars: 0 */
const block0 = context => {
  return _LitRenderer.html`<div	class="${(0, _ifDefined.default)((0, _LitRenderer.classMap)(context.classes.main))}"	style="width: 100%;"	?aria-invalid="${(0, _ifDefined.default)(context.ariaInvalid)}"	@focusin="${(0, _ifDefined.default)(context.onfocusin)}"	@focusout="${(0, _ifDefined.default)(context.onfocusout)}"><div id="${(0, _ifDefined.default)(context._id)}-wrapper"	class="${(0, _ifDefined.default)((0, _LitRenderer.classMap)(context.classes.wrapper))}">	${context._beginContent ? block1(context) : undefined}<input id="${(0, _ifDefined.default)(context._id)}-inner"			class="sapWCInputBaseInner"			type="${(0, _ifDefined.default)(context.inputType)}"			?disabled="${(0, _ifDefined.default)(context.disabled)}"			?readonly="${(0, _ifDefined.default)(context._readonly)}"			.value="${(0, _ifDefined.default)(context.value)}"			placeholder="${(0, _ifDefined.default)(context.inputPlaceholder)}"			@input="${(0, _ifDefined.default)(context._handleInput)}"			@change="${(0, _ifDefined.default)(context._handleChange)}"			data-sap-no-tab-ref			data-sap-focus-ref	/>		${context.icon ? block2(context) : undefined}</div>	${context.showSuggestions ? block3(context) : undefined}<slot name="formSupport"></slot></div>`;
};

const block1 = context => {
  return _LitRenderer.html`<slot name="_beginContent"></slot>	`;
};

const block2 = context => {
  return _LitRenderer.html`<slot name="icon"></slot>		`;
};

const block3 = context => {
  return _LitRenderer.html`<ui5-popover				placement-type="Bottom"				no-header				no-arrow				horizontal-align="Stretch"				initial-focus="${(0, _ifDefined.default)(context._id)}-inner"><ui5-list separators="Inner"><slot></slot></ui5-list></ui5-popover>	`;
};

var _default = block0;
exports.default = _default;
},{"@ui5/webcomponents-base/src/renderer/ifDefined.js":"../node_modules/@ui5/webcomponents-base/src/renderer/ifDefined.js","@ui5/webcomponents-base/src/renderer/LitRenderer.js":"../node_modules/@ui5/webcomponents-base/src/renderer/LitRenderer.js"}],"../node_modules/@ui5/webcomponents/dist/themes/Input.css.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = ":host(ui5-input:not([hidden])){display:inline-block;width:100%}ui5-input:not([hidden]){display:inline-block;width:100%}.sapWCInputBase{height:var(--_ui5_input_height,2.25rem);background:transparent;position:relative;display:inline-block;vertical-align:top;outline:none;box-sizing:border-box;line-height:0}.sapWCInputBase.sapWCFocus .sapWCInputBaseContentWrapper:after{content:\"\";position:absolute;border:var(--_ui5_input_focus_border_width,1px) dotted var(--sapUiContentFocusColor,var(--sapContent_FocusColor,#000));pointer-events:none;top:1px;left:1px;right:1px;bottom:1px}.sapWCInputBase.sapWCInputBaseDisabled{opacity:var(--sap_wc_input_disabled_opacity,.4);cursor:default}.sapWCInputBaseInner{background:transparent;border:none;font-style:normal;-webkit-appearance:none;-moz-appearance:textfield;font-size:var(--sapMFontMediumSize,.875rem);font-family:var(--sapUiFontFamily,var(--sapFontFamily,\"72\",\"72full\",Arial,Helvetica,sans-serif));color:var(--sapUiFieldTextColor,var(--sapField_TextColor,var(--sapTextColor,var(--sapPrimary6,#32363a))));line-height:normal;padding:0 .75rem;box-sizing:border-box;min-width:3rem;text-overflow:ellipsis;flex:1;outline:none}.sapWCInputBaseInner::-webkit-input-placeholder{color:var(--sapUiFieldPlaceholderTextColor,#74777a)}.sapWCInputBaseInner::-moz-placeholder{color:var(--sapUiFieldPlaceholderTextColor,#74777a)}.sapWCInputBaseInner:-ms-input-placeholder{color:var(--sapUiFieldPlaceholderTextColor,#74777a)}.sapWCInputBaseInner:-moz-placeholder{color:var(--sapUiFieldPlaceholderTextColor,#74777a)}.sapWCInputBaseContentWrapper{height:100%;box-sizing:border-box;display:flex;flex-direction:row;justify-content:flex-end;position:relative;overflow:hidden;outline:none;background-color:var(--sapUiFieldBackground,var(--sapField_Background,var(--sapBaseColor,var(--sapPrimary3,#fff))));border:1px solid var(--sapUiFieldBorderColor,var(--sapField_BorderColor,var(--sapPrimary5,#89919a)));border-radius:var(--_ui5_input_wrapper_border_radius,.125rem)}.sapWCInputBaseContentWrapper.sapWCInputBaseDisabledWrapper{pointer-events:none}.sapWCInputBaseContentWrapper.sapWCInputBaseReadonlyWrapper{border-color:var(--sapUiFieldReadOnlyBorderColor,var(--sapField_ReadOnly_BorderColor,var(--sapField_BorderColor,var(--sapPrimary5,#89919a))));background:var(--sapUiFieldReadOnlyBackground,var(--sapField_ReadOnly_Background,hsla(0,0%,94.9%,.5)))}.sapWCInputBaseContentWrapper:hover:not(.sapWCInputBaseContentWrapperError):not(.sapWCInputBaseContentWrapperWarning):not(.sapWCInputBaseContentWrapperSuccess):not(.sapWCInputBaseDisabledWrapper):not(.sapWCInputBaseReadonlyWrapper){background-color:var(--sapUiFieldHoverBackground,var(--sapField_Hover_Background,var(--sapField_Background,var(--sapBaseColor,var(--sapPrimary3,#fff)))));border:1px solid var(--sapUiFieldHoverBorderColor,var(--sapField_Hover_BorderColor,var(--sapHighlightColor,#0854a0)))}.sapWCInputBaseDisabledWrapper{background:var(--sapUiFieldReadOnlyBackground,var(--sapField_ReadOnly_Background,hsla(0,0%,94.9%,.5)));border-color:var(--sapUiFieldReadOnlyBorderColor,var(--sapField_ReadOnly_BorderColor,var(--sapField_BorderColor,var(--sapPrimary5,#89919a))));-webkit-text-fill-color:var(--sapUiContentDisabledTextColor,var(--sapContent_DisabledTextColor,#32363a))}.sapWCInputBaseDisabledWrapper .sapWCInputBaseInner{color:var(--sapUiContentDisabledTextColor,var(--sapContent_DisabledTextColor,#32363a))}.sapWCInputBaseContentWrapperState{border-width:var(--_ui5_input_state_border_width,.125rem)}.sapWCInputBaseContentWrapperError .sapWCInputBaseInner,.sapWCInputBaseContentWrapperWarning .sapWCInputBaseInner{font-style:var(--_ui5_input_error_warning_font_style,normal)}.sapWCInputBaseContentWrapperError .sapWCInputBaseInner{font-weight:var(--_ui5_input_error_font_weight,normal)}.sapWCInputBaseContentWrapperError:not(.sapWCInputBaseReadonlyWrapper){background-color:var(--sapUiFieldInvalidBackground,var(--sapField_InvalidBackground,var(--sapField_Background,var(--sapBaseColor,var(--sapPrimary3,#fff)))));border-color:var(--sapUiFieldInvalidColor,var(--sapField_InvalidColor,var(--sapErrorBorderColor,var(--sapNegativeColor,#b00))))}.sapWCInputBaseContentWrapperError:not(.sapWCInputBaseReadonlyWrapper):not(.sapWCInputBaseDisabledWrapper),.sapWCInputBaseContentWrapperWarning:not(.sapWCInputBaseReadonlyWrapper):not(.sapWCInputBaseDisabledWrapper){border-style:var(--_ui5_input_error_warning_border_style,solid)}.sapWCInputBaseContentWrapperWarning:not(.sapWCInputBaseReadonlyWrapper){background-color:var(--sapUiFieldWarningBackground,var(--sapField_WarningBackground,var(--sapField_Background,var(--sapBaseColor,var(--sapPrimary3,#fff)))));border-color:var(--sapUiFieldWarningColor,var(--sapField_WarningColor,var(--sapWarningBorderColor,var(--sapCriticalColor,#e9730c))))}.sapWCInputBaseContentWrapperSuccess:not(.sapWCInputBaseReadonlyWrapper){background-color:var(--sapUiFieldSuccessBackground,var(--sapField_SuccessBackground,var(--sapField_Background,var(--sapBaseColor,var(--sapPrimary3,#fff)))));border-color:var(--sapUiFieldSuccessColor,var(--sapField_SuccessColor,var(--sapSuccessBorderColor,var(--sapPositiveColor,#107e3e))))}.sapWCInputBaseInner::-ms-clear{height:0;width:0}.sapUiSizeCompact.sapWCInputBase{height:var(--_ui5_input_compact_height,1.625rem)}.sapUiSizeCompact .sapWCInputBaseInner{padding:0 .5rem}:host(ui5-input) ::slotted(ui5-icon){min-width:var(--sap_wc_input_icon_min_width,2.375rem)}ui5-input ui5-icon{min-width:var(--sap_wc_input_icon_min_width,2.375rem)}:host(ui5-input[data-ui5-compact-size]) ::slotted(ui5-icon){min-width:var(--sap_wc_input_compact_min_width,2rem)}ui5-input[data-ui5-compact-size] ui5-icon{min-width:var(--sap_wc_input_compact_min_width,2rem)}";
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents/dist/themes/ShellBarInput.css.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = ":host(ui5-input[slot=searchField]) .sapWCInputBase .sapWCInputBaseContentWrapper{background-color:var(--sapUiShellColor,var(--sapShellColor,var(--sapPrimary1,#354a5f)));border:1px solid var(--sapUiShellBorderColorLighten30,#7996b4)}ui5-shellbar ui5-input[slot=searchField] .sapWCInputBase .sapWCInputBaseContentWrapper{background-color:var(--sapUiShellColor,var(--sapShellColor,var(--sapPrimary1,#354a5f)));border:1px solid var(--sapUiShellBorderColorLighten30,#7996b4)}:host(ui5-input[slot=searchField]) .sapWCInputBase .sapWCInputBaseContentWrapper:hover:not(.sapWCInputBaseContentWrapperError):not(.sapWCInputBaseContentWrapperWarning):not(.sapWCInputBaseContentWrapperSuccess):not(.sapWCInputBaseDisabledWrapper):not(.sapWCInputBaseReadonlyWrapper){background:var(--sapUiShellHoverBackground,#283848);border:1px solid var(--sapUiShellBorderColorLighten30,#7996b4)}ui5-shellbar ui5-input[slot=searchField] .sapWCInputBase .sapWCInputBaseContentWrapper:hover:not(.sapWCInputBaseContentWrapperError):not(.sapWCInputBaseContentWrapperWarning):not(.sapWCInputBaseContentWrapperSuccess):not(.sapWCInputBaseDisabledWrapper):not(.sapWCInputBaseReadonlyWrapper){background:var(--sapUiShellHoverBackground,#283848);border:1px solid var(--sapUiShellBorderColorLighten30,#7996b4)}:host(ui5-input[slot=searchField]) .sapWCInputBase .sapWCInputBaseInner{color:var(--sapUiShellTextColor,var(--sapShell_TextColor,#fff))}ui5-shellbar ui5-input[slot=searchField] .sapWCInputBase .sapWCInputBaseInner{color:var(--sapUiShellTextColor,var(--sapShell_TextColor,#fff))}:host(ui5-input[slot=searchField]) .sapWCInputBase.sapWCFocus .sapWCInputBaseContentWrapper:after{border:1px dotted var(--sapUiContentContrastFocusColor,var(--sapContent_ContrastFocusColor,#fff))}ui5-shellbar ui5-input[slot=searchField] .sapWCInputBase.sapWCFocus .sapWCInputBaseContentWrapper:after{border:1px dotted var(--sapUiContentContrastFocusColor,var(--sapContent_ContrastFocusColor,#fff))}:host(ui5-input[slot=searchField]) .sapUiSizeCompact.sapWCInput{height:2.25rem}ui5-shellbar ui5-input[slot=searchField] .sapUiSizeCompact.sapWCInput{height:2.25rem}";
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents/dist/Input.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UI5Element = _interopRequireDefault(require("@ui5/webcomponents-base/src/UI5Element.js"));

var _LitRenderer = _interopRequireDefault(require("@ui5/webcomponents-base/src/renderer/LitRenderer.js"));

var _Device = require("@ui5/webcomponents-core/dist/sap/ui/Device.js");

var _ValueState = _interopRequireDefault(require("@ui5/webcomponents-base/src/types/ValueState.js"));

var _Configuration = require("@ui5/webcomponents-base/src/Configuration.js");

var _FeaturesRegistry = require("@ui5/webcomponents-base/src/FeaturesRegistry.js");

var _PseudoEvents = require("@ui5/webcomponents-base/src/events/PseudoEvents.js");

var _Icon = _interopRequireDefault(require("./Icon.js"));

var _InputType = _interopRequireDefault(require("./types/InputType.js"));

var _InputTemplateLit = _interopRequireDefault(require("./build/compiled/InputTemplate.lit.js"));

var _InputCss = _interopRequireDefault(require("./themes/Input.css.js"));

var _ShellBarInputCss = _interopRequireDefault(require("./themes/ShellBarInput.css.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Template
// Styles

/**
 * @public
 */
const metadata = {
  tag: "ui5-input",
  defaultSlot: "suggestionItems",
  slots:
  /** @lends sap.ui.webcomponents.main.Input.prototype */
  {
    /**
     * Defines the icon to be displayed in the <code>ui5-input</code>.
     *
     * @type {Icon}
     * @slot
     * @public
     */
    icon: {
      type: _Icon.default
    },

    /**
     * Defines the <code>ui5-input</code> suggestion items.
     * </br></br>
     * Example: </br>
     * &lt;ui5-input show-suggestions></br>
     * &nbsp;&nbsp;&nbsp;&nbsp;&lt;ui5-li>Item #1&lt;/ui5-li></br>
     * &nbsp;&nbsp;&nbsp;&nbsp;&lt;ui5-li>Item #2&lt;/ui5-li></br>
     * &lt;/ui5-input>
     * <ui5-input show-suggestions><ui5-li>Item #1</ui5-li><ui5-li>Item #2</ui5-li></ui5-input>
     * </br></br>
     * <b>Note:</b> The suggestion would be displayed only if the <code>showSuggestions</code>
     * property is set to <code>true</code>.
     *
     * @type {HTMLElement[]}
     * @slot
     * @public
     */
    suggestionItems: {
      type: HTMLElement,
      multiple: true
    },
    _beginContent: {
      type: HTMLElement
    }
  },
  properties:
  /** @lends  sap.ui.webcomponents.main.Input.prototype */
  {
    /**
     * Defines whether <code>ui5-input</code> is in disabled state.
     * <br><br>
     * <b>Note:</b> A disabled <code>ui5-input</code> is completely uninteractive.
     *
     * @type {boolean}
     * @defaultvalue false
     * @public
     */
    disabled: {
      type: Boolean
    },

    /**
     * Defines a short hint intended to aid the user with data entry when the
     * <code>ui5-input</code> has no value.
     * <br><br>
     * <b>Note:</b> The placeholder is not supported in IE. If the placeholder is provided, it won`t be displayed in IE.
     * @type {string}
     * @defaultvalue ""
     * @public
     */
    placeholder: {
      type: String
    },

    /**
     * Defines whether the <code>ui5-input</code> is read-only.
     * <br><br>
     * <b>Note:</b> A read-only <code>ui5-input</code> is not editable,
     * but still provides visual feedback upon user interaction.
     *
     * @type {boolean}
     * @defaultvalue false
     * @public
     */
    readonly: {
      type: Boolean
    },

    /**
     * Defines the HTML type of the <code>ui5-input</code>.
     * Available options are: <code>Text</code>, <code>Email</code>,
     * <code>Number</code>, <code>Password</code>, <code>Tel</code>, and <code>URL</code>.
     * <br><br>
     * <b>Notes:</b>
     * <ul>
     * <li>The particular effect of this property differs depending on the browser
     * and the current language settings, especially for type <code>Number</code>.</li>
     * <li>The property is mostly intended to be used with touch devices
     * that use different soft keyboard layouts depending on the given input type.</li>
     * </ul>
     *
     * @type {string}
     * @defaultvalue "Text"
     * @public
     */
    type: {
      type: _InputType.default,
      defaultValue: _InputType.default.Text
    },

    /**
     * Defines the value of the <code>ui5-input</code>.
     * <br><br>
     * <b>Note:</b> The property is updated upon typing.
     *
     * @type {string}
     * @defaultvalue ""
     * @public
     */
    value: {
      type: String
    },

    /**
     * Defines the value state of the <code>ui5-input</code>.
     * Available options are: <code>None</code>, <code>Success</code>, <code>Warning</code>, and <code>Error</code>.
     *
     * @type {string}
     * @defaultvalue "None"
     * @public
     */
    valueState: {
      type: _ValueState.default,
      defaultValue: _ValueState.default.None
    },

    /**
     * Determines the name with which the <code>ui5-input</code> will be submitted in an HTML form.
     *
     * <b>Important:</b> For the <code>name</code> property to have effect, you must add the following import to your project:
     * <code>import "@ui5/webcomponents/dist/InputElementsFormSupport.js";</code>
     *
     * <b>Note:</b> When set, a native <code>input</code> HTML element
     * will be created inside the <code>ui5-input</code> so that it can be submitted as
     * part of an HTML form. Do not use this property unless you need to submit a form.
     *
     * @type {string}
     * @defaultvalue ""
     * @public
     */
    name: {
      type: String
    },

    /**
     * Defines whether the <code>ui5-input</code> should show suggestions, if such are present.
     *
     * @type {Boolean}
     * @defaultvalue false
     * @public
     */
    showSuggestions: {
      type: Boolean
    },
    _focused: {
      type: Boolean
    },
    _input: {
      type: Object
    },
    _popover: {
      type: Object
    }
  },
  events:
  /** @lends  sap.ui.webcomponents.main.Input.prototype */
  {
    /**
     * Fired when the input operation has finished by pressing Enter or on focusout.
     *
     * @event
     * @public
     */
    change: {},

    /**
     * Fired when the value of the <code>ui5-input</code> changes at each keystroke,
     * and when a suggestion item has been selected.
     *
     * @event
     * @public
     */
    input: {},

    /**
     * Fired when user presses Enter key on the <code>ui5-input</code>.
     * <br><br>
     * <b>Note:</b> The event is fired independent of whether there was a change before or not.
     * If change was performed, the event is fired after the change event.
     * The event is also fired when an item of the select list is selected by pressing Enter.
     *
     * @event
     * @public
     */
    submit: {},

    /**
     * Fired when a suggestion item, which displayed in the suggestion popup, is selected.
     *
     * @event
     * @param {HTMLElement} item The selected item
     * @public
     */
    suggestionItemSelect: {
      detail: {
        item: {
          type: HTMLElement
        }
      }
    }
  }
};
/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-input</code> component allows the user to enter and edit text or numeric values in one line.
 * <br>
 * Additionally, you can provide <code>suggestionItems</code>,
 * that are displayed in a popover right under the input.
 * <br><br>
 * The text field can be editable or read-only (<code>readonly</code> property),
 * and and it can be enabled or disabled (<code>enabled</code> property).
 * To visualize semantic states, such as "error" or "warning", the <code>valueState</code> property is provided.
 * When the user makes changes to the text, the change event is fired,
 * which enables you to react on any text change.
 * <br><br>
 * <b>Note:</b> If you are using the <code>ui5-input</code> as a single npm module,
 * don"t forget to import the <code>Suggestions</code> module from
 * "@ui5/webcomponents/dist/Suggestions"
 * to enable the suggestions functionality.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Input";</code>
 * <br>
 * <code>import "@ui5/webcomponents/dist/InputSuggestions";</code> (optional - for input suggestions support)
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Input
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-input
 * @public
 */

class Input extends _UI5Element.default {
  static get metadata() {
    return metadata;
  }

  static get render() {
    return _LitRenderer.default;
  }

  static get template() {
    return _InputTemplateLit.default;
  }

  static get styles() {
    return [_InputCss.default, _ShellBarInputCss.default];
  }

  constructor() {
    super(); // Indicates if there is selected suggestionItem.

    this.hasSuggestionItemSelected = false; // Represents the value before user moves selection between the suggestion items.
    // Used to register and fire "input" event upon [SPACE] or [ENTER].
    // Note: the property "value" is updated upon selection move and can`t be used.

    this.valueBeforeItemSelection = ""; // tracks the value between focus in and focus out to detect that change event should be fired.

    this.previousValue = undefined; // Indicates, if the component is rendering for first time.

    this.firstRendering = true; // all sementic events

    this.EVENT_SUBMIT = "submit";
    this.EVENT_CHANGE = "change";
    this.EVENT_INPUT = "input";
    this.EVENT_SUGGESTION_ITEM_SELECT = "suggestionItemSelect"; // all user interactions

    this.ACTION_ENTER = "enter";
    this.ACTION_USER_INPUT = "input";
  }

  onBeforeRendering() {
    if (this.showSuggestions) {
      this.enableSuggestions();
    }

    const FormSupport = (0, _FeaturesRegistry.getFeature)("FormSupport");

    if (FormSupport) {
      FormSupport.syncNativeHiddenInput(this);
    } else if (this.name) {
      console.warn(`In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/InputElementsFormSupport.js";`); // eslint-disable-line
    }
  }

  onAfterRendering() {
    if (!this.firstRendering && this.Suggestions) {
      this.Suggestions.toggle(this.shouldOpenSuggestions());
    }

    this.firstRendering = false;
  }

  onkeydown(event) {
    if ((0, _PseudoEvents.isUp)(event)) {
      return this._handleUp(event);
    }

    if ((0, _PseudoEvents.isDown)(event)) {
      return this._handleDown(event);
    }

    if ((0, _PseudoEvents.isSpace)(event)) {
      return this._handleSpace(event);
    }

    if ((0, _PseudoEvents.isEnter)(event)) {
      return this._handleEnter(event);
    }
  }
  /* Event handling */


  _handleUp(event) {
    if (this.Suggestions) {
      this.Suggestions.onUp(event);
    }
  }

  _handleDown(event) {
    if (this.Suggestions) {
      this.Suggestions.onDown(event);
    }
  }

  _handleSpace(event) {
    if (this.Suggestions) {
      this.Suggestions.onSpace(event);
    }
  }

  _handleEnter(event) {
    const itemPressed = !!(this.Suggestions && this.Suggestions.onEnter(event));

    if (!itemPressed) {
      this.fireEventByAction(this.ACTION_ENTER);
    }
  }

  onfocusin() {
    this._focused = true; // invalidating property

    this.previousValue = this.value;
  }

  onfocusout() {
    this._focused = false; // invalidating property

    this.previousValue = "";
  }

  _handleChange(event) {
    this.fireEvent(this.EVENT_CHANGE);
  }

  _handleInput(event) {
    if (event.target === this.getInputDOMRef()) {
      // stop the native event, as the semantic "input" would be fired.
      event.stopImmediatePropagation();
    }

    this.fireEventByAction(this.ACTION_USER_INPUT);
    this.hasSuggestionItemSelected = false;

    if (this.Suggestions) {
      this.Suggestions.updateSelectedItemPosition(null);
    }
  }

  enableSuggestions() {
    if (this.Suggestions) {
      return;
    }

    const Suggestions = (0, _FeaturesRegistry.getFeature)("InputSuggestions");

    if (Suggestions) {
      this.Suggestions = new Suggestions(this, "suggestionItems");
    } else {
      throw new Error(`You have to import "@ui5/webcomponents/dist/InputSuggestions.js" module to use ui5-input suggestions`);
    }
  }

  shouldOpenSuggestions() {
    return !!(this.suggestionItems.length && this.showSuggestions && this._focused && !this.hasSuggestionItemSelected);
  }

  selectSuggestion(item, keyboardUsed) {
    const itemText = item.textContent;
    const fireInput = keyboardUsed ? this.valueBeforeItemSelection !== itemText : this.value !== itemText;
    item.selected = false;
    this.hasSuggestionItemSelected = true;
    this.fireEvent(this.EVENT_SUGGESTION_ITEM_SELECT, {
      item
    });

    if (fireInput) {
      this.value = itemText;
      this.valueBeforeItemSelection = itemText;
      this.fireEvent(this.EVENT_INPUT);
      this.fireEvent(this.EVENT_CHANGE);
    }
  }

  previewSuggestion(item) {
    this.valueBeforeItemSelection = this.value;
    this.value = item.textContent;
  }

  fireEventByAction(action) {
    if (this.disabled || this.readonly) {
      return;
    }

    const inputValue = this.getInputValue();
    const isSubmit = action === this.ACTION_ENTER;
    const isUserInput = action === this.ACTION_USER_INPUT;
    this.value = inputValue;

    if (isUserInput) {
      // input
      this.fireEvent(this.EVENT_INPUT);
      return;
    }

    if (isSubmit) {
      // submit
      this.fireEvent(this.EVENT_SUBMIT);
    } // In IE, pressing the ENTER does not fire change


    const valueChanged = this.previousValue !== undefined && this.previousValue !== this.value;

    if ((0, _Device.isIE)() && isSubmit && valueChanged) {
      this.fireEvent(this.EVENT_CHANGE);
    }
  }

  getInputValue() {
    const inputDOM = this.getDomRef();

    if (inputDOM) {
      return this.getInputDOMRef().value;
    }

    return "";
  }

  getInputDOMRef() {
    return this.getDomRef().querySelector(`#${this.getInputId()}`);
  }

  getLabelableElementId() {
    return this.getInputId();
  }

  getInputId() {
    return `${this._id}-inner`;
  }
  /* Suggestions interface  */


  onItemFocused() {}

  onItemSelected(item, keyboardUsed) {
    this.selectSuggestion(item, keyboardUsed);
  }

  onItemPreviewed(item) {
    this.previewSuggestion(item);
  }

  onOpen() {}

  onClose() {}

  get classes() {
    const hasState = this.valueState !== "None";
    return {
      main: {
        sapWCInputBase: true,
        sapWCInputBaseWidthPadding: true,
        sapWCInputBaseDisabled: this.disabled,
        sapWCInputBaseReadonly: this.readonly,
        sapWCInput: true,
        sapWCInputFocused: this._focused,
        sapWCFocus: this._focused,
        sapUiSizeCompact: (0, _Configuration.getCompactSize)()
      },
      wrapper: {
        sapWCInputBaseContentWrapper: true,
        sapWCInputBaseDisabledWrapper: this.disabled,
        sapWCInputBaseReadonlyWrapper: this.readonly && !this.disabled,
        sapWCInputBaseContentWrapperState: hasState,
        [`sapWCInputBaseContentWrapper${this.valueState}`]: hasState
      }
    };
  }

  get inputPlaceholder() {
    // We don`t support placeholder for IE,
    // because IE fires input events, when placeholder exists, leading to functional degredations.
    return (0, _Device.isIE)() ? "" : this.placeholder;
  }

  get _readonly() {
    return this.readonly && !this.disabled;
  }

  get inputType() {
    return this.type.toLowerCase();
  }

  get ariaInvalid() {
    return this.valueState === "Error" ? "true" : undefined;
  }

}

Input.define();
var _default = Input;
exports.default = _default;
},{"@ui5/webcomponents-base/src/UI5Element.js":"../node_modules/@ui5/webcomponents-base/src/UI5Element.js","@ui5/webcomponents-base/src/renderer/LitRenderer.js":"../node_modules/@ui5/webcomponents-base/src/renderer/LitRenderer.js","@ui5/webcomponents-core/dist/sap/ui/Device.js":"../node_modules/@ui5/webcomponents-core/dist/sap/ui/Device.js","@ui5/webcomponents-base/src/types/ValueState.js":"../node_modules/@ui5/webcomponents-base/src/types/ValueState.js","@ui5/webcomponents-base/src/Configuration.js":"../node_modules/@ui5/webcomponents-base/src/Configuration.js","@ui5/webcomponents-base/src/FeaturesRegistry.js":"../node_modules/@ui5/webcomponents-base/src/FeaturesRegistry.js","@ui5/webcomponents-base/src/events/PseudoEvents.js":"../node_modules/@ui5/webcomponents-base/src/events/PseudoEvents.js","./Icon.js":"../node_modules/@ui5/webcomponents/dist/Icon.js","./types/InputType.js":"../node_modules/@ui5/webcomponents/dist/types/InputType.js","./build/compiled/InputTemplate.lit.js":"../node_modules/@ui5/webcomponents/dist/build/compiled/InputTemplate.lit.js","./themes/Input.css.js":"../node_modules/@ui5/webcomponents/dist/themes/Input.css.js","./themes/ShellBarInput.css.js":"../node_modules/@ui5/webcomponents/dist/themes/ShellBarInput.css.js"}],"../node_modules/@ui5/webcomponents-base/src/EventProvider.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class EventProvider {
  constructor() {
    this._eventRegistry = {};
  }

  attachEvent(eventName, fnFunction) {
    const eventRegistry = this._eventRegistry;
    let eventListeners = eventRegistry[eventName];

    if (!Array.isArray(eventListeners)) {
      eventRegistry[eventName] = [];
      eventListeners = eventRegistry[eventName];
    }

    eventListeners.push({
      "function": fnFunction
    });
  }

  detachEvent(eventName, fnFunction) {
    const eventRegistry = this._eventRegistry;
    const eventListeners = eventRegistry[eventName];

    if (!eventListeners) {
      return;
    }

    for (let i = 0; i < eventListeners.length; i++) {
      const event = eventListeners[i];

      if (event["function"] === fnFunction) {
        // eslint-disable-line
        eventListeners.splice(i, 1);
      }
    }

    if (eventListeners.length === 0) {
      delete eventRegistry[eventName];
    }
  }

  fireEvent(eventName, data) {
    const eventRegistry = this._eventRegistry;
    const eventListeners = eventRegistry[eventName];

    if (!eventListeners) {
      return;
    }

    eventListeners.forEach(event => {
      event["function"].call(this, data); // eslint-disable-line
    });
  }

  isHandlerAttached(eventName, fnFunction) {
    const eventRegistry = this._eventRegistry;
    const eventListeners = eventRegistry[eventName];

    if (!eventListeners) {
      return false;
    }

    for (let i = 0; i < eventListeners.length; i++) {
      const event = eventListeners[i];

      if (event["function"] === fnFunction) {
        // eslint-disable-line
        return true;
      }
    }

    return false;
  }

  hasListeners(eventName) {
    return !!this._eventRegistry[eventName];
  }

}

var _default = EventProvider;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents-base/src/delegate/ItemNavigation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _PseudoEvents = require("../events/PseudoEvents.js");

var _EventProvider = _interopRequireDefault(require("../EventProvider.js"));

var _UI5Element = _interopRequireDefault(require("../UI5Element.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// navigatable items must have id and tabindex
class ItemNavigation extends _EventProvider.default {
  constructor(rootWebComponent, options = {}) {
    super();
    this.currentIndex = options.currentIndex || 0;
    this.rowSize = options.rowSize || 1;
    this.cyclic = options.cyclic || false;
    this.rootWebComponent = rootWebComponent;
  }

  init() {
    this._getItems().forEach((item, idx) => {
      item._tabIndex = idx === this.currentIndex ? "0" : "-1";
    });
  }

  _onKeyPress(event) {
    const items = this._getItems();

    if (this.currentIndex >= items.length) {
      if (!this.cyclic) {
        this.fireEvent(ItemNavigation.BORDER_REACH, {
          start: false,
          end: true,
          offset: this.currentIndex
        });
      }

      this.currentIndex = this.currentIndex - items.length;
    } else if (this.currentIndex < 0) {
      if (!this.cyclic) {
        this.fireEvent(ItemNavigation.BORDER_REACH, {
          start: true,
          end: false,
          offset: this.currentIndex
        });
      }

      this.currentIndex = items.length + this.currentIndex;
    }

    this.update();
    this.focusCurrent(); // stops browser scrolling with up/down keys

    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();
  }

  onkeydown(event) {
    if ((0, _PseudoEvents.isUp)(event)) {
      return this._handleUp(event);
    }

    if ((0, _PseudoEvents.isDown)(event)) {
      return this._handleDown(event);
    }

    if ((0, _PseudoEvents.isLeft)(event)) {
      return this._handleLeft(event);
    }

    if ((0, _PseudoEvents.isRight)(event)) {
      return this._handleRight(event);
    }

    if ((0, _PseudoEvents.isHome)(event)) {
      return this._handleHome(event);
    }

    if ((0, _PseudoEvents.isEnd)(event)) {
      return this._handleEnd(event);
    }
  }

  _handleUp(event) {
    if (this._canNavigate()) {
      this.currentIndex -= this.rowSize;

      this._onKeyPress(event);
    }
  }

  _handleDown(event) {
    if (this._canNavigate()) {
      this.currentIndex += this.rowSize;

      this._onKeyPress(event);
    }
  }

  _handleLeft(event) {
    if (this._canNavigate()) {
      this.currentIndex -= 1;

      this._onKeyPress(event);
    }
  }

  _handleRight(event) {
    if (this._canNavigate()) {
      this.currentIndex += 1;

      this._onKeyPress(event);
    }
  }

  _handleHome(event) {
    if (this._canNavigate()) {
      const homeEndRange = this.rowSize > 1 ? this.rowSize : this._getItems().length;
      this.currentIndex -= this.currentIndex % homeEndRange;

      this._onKeyPress(event);
    }
  }

  _handleEnd(event) {
    if (this._canNavigate()) {
      const homeEndRange = this.rowSize > 1 ? this.rowSize : this._getItems().length;
      this.currentIndex += homeEndRange - 1 - this.currentIndex % homeEndRange; // eslint-disable-line

      this._onKeyPress(event);
    }
  }

  update(current) {
    const origItems = this._getItems();

    if (current) {
      this.currentIndex = this._getItems().indexOf(current);
    }

    if (!origItems[this.currentIndex] || origItems[this.currentIndex]._tabIndex && origItems[this.currentIndex]._tabIndex === "0") {
      return;
    }

    const items = origItems.slice(0);

    for (let i = 0; i < items.length; i++) {
      items[i]._tabIndex = i === this.currentIndex ? "0" : "-1";
    }

    if (this._setItems) {
      this._setItems(items);
    }
  }

  focusCurrent() {
    const currentItem = this._getCurrentItem();

    if (currentItem) {
      currentItem.focus();
    }
  }

  _canNavigate() {
    const currentItem = this._getCurrentItem();

    let activeElement = document.activeElement;

    while (activeElement.shadowRoot && activeElement.shadowRoot.activeElement) {
      activeElement = activeElement.shadowRoot.activeElement;
    }

    return currentItem && currentItem === activeElement;
  }

  _getCurrentItem() {
    const items = this._getItems();

    if (!items.length) {
      return null;
    } // normalize the index


    while (this.currentIndex >= items.length) {
      this.currentIndex -= this.rowSize;
    }

    if (this.currentIndex < 0) {
      this.currentIndex = 0;
    }

    const currentItem = items[this.currentIndex];

    if (currentItem instanceof _UI5Element.default) {
      return currentItem.getFocusDomRef();
    }

    if (!this.rootWebComponent.getDomRef()) {
      return;
    }

    return this.rootWebComponent.getDomRef().querySelector(`#${currentItem.id}`);
  }

  set setItemsCallback(fn) {
    this._setItems = fn;
  }

  set getItemsCallback(fn) {
    this._getItems = fn;
  }

  set current(val) {
    this.currentIndex = val;
  }

}

ItemNavigation.BORDER_REACH = "_borderReach";
var _default = ItemNavigation;
exports.default = _default;
},{"../events/PseudoEvents.js":"../node_modules/@ui5/webcomponents-base/src/events/PseudoEvents.js","../EventProvider.js":"../node_modules/@ui5/webcomponents-base/src/EventProvider.js","../UI5Element.js":"../node_modules/@ui5/webcomponents-base/src/UI5Element.js"}],"../node_modules/@ui5/webcomponents-base/src/FocusHelper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UI5Element = _interopRequireDefault(require("./UI5Element.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rFocusable = /^(?:input|select|textarea|button)$/i,
      rClickable = /^(?:a|area)$/i;

class FocusHelper {
  static hasTabIndex(domElement) {
    if (domElement.disabled) {
      return false;
    }

    const tabIndex = domElement.getAttribute("tabindex");

    if (tabIndex !== null && tabIndex !== undefined) {
      return parseInt(tabIndex) >= 0;
    }

    return rFocusable.test(domElement.nodeName) || rClickable.test(domElement.nodeName) && domElement.href;
  }

  static isHidden(domElement) {
    if (domElement.nodeName === "SLOT") {
      return false;
    }

    const rect = domElement.getBoundingClientRect();
    return domElement.offsetWidth <= 0 && domElement.offsetHeight <= 0 || domElement.style.visibility === "hidden" || rect.width === 0 && 0 && rect.height === 0;
  }

  static isVisible(domElement) {
    return !FocusHelper.isHidden(domElement);
  }

  static getCorrectElement(element) {
    if (element instanceof _UI5Element.default) {
      // Focus the CustomElement itself or provide getDomRef of each ?
      return element.getFocusDomRef();
    }

    return element;
  }

  static findFocusableElement(container, forward) {
    let child;

    if (container.assignedNodes && container.assignedNodes()) {
      const assignedElements = container.assignedNodes();
      child = forward ? assignedElements[0] : assignedElements[assignedElements.length - 1];
    } else {
      child = forward ? container.firstChild : container.lastChild;
    }

    let focusableDescendant;

    while (child) {
      const originalChild = child;
      child = FocusHelper.getCorrectElement(child);

      if (!child) {
        return null;
      }

      if (child.nodeType === 1 && !FocusHelper.isHidden(child)) {
        if (FocusHelper.hasTabIndex(child)) {
          return child;
        }

        focusableDescendant = FocusHelper.findFocusableElement(child, forward);

        if (focusableDescendant) {
          return focusableDescendant;
        }
      }

      child = forward ? originalChild.nextSibling : originalChild.previousSibling;
    }

    return null;
  }

  static findFirstFocusableElement(container) {
    if (!container || FocusHelper.isHidden(container)) {
      return null;
    }

    return FocusHelper.findFocusableElement(container, true);
  }

  static findLastFocusableElement(container) {
    if (!container || FocusHelper.isHidden(container)) {
      return null;
    }

    return FocusHelper.findFocusableElement(container, false);
  }

  static hasTabbableContent(node) {
    let hasTabableContent = false,
        content = node.children; // eslint-disable-line

    if (content) {
      hasTabableContent = FocusHelper._hasTabbableContent(content);
    } // If the node is inside Custom Element,
    // check the content in the 'light' DOM.


    if (!hasTabableContent && FocusHelper._isInsideShadowRoot(node)) {
      const customElement = FocusHelper._getCustomElement(node);

      const content = customElement.children; // eslint-disable-line

      if (content) {
        hasTabableContent = FocusHelper._hasTabbableContent(content);
      }
    }

    return hasTabableContent;
  }

  static getLastTabbableElement(node) {
    const tabbableContent = FocusHelper.getTabbableContent(node);
    return tabbableContent.length ? tabbableContent[tabbableContent.length - 1] : null;
  }

  static getTabbableContent(node) {
    let aTabbableContent = [],
        content = node.children; // eslint-disable-line

    if (content) {
      aTabbableContent = FocusHelper._getTabbableContent(content);
    }

    if (FocusHelper._isInsideShadowRoot(node)) {
      const customElement = FocusHelper._getCustomElement(node);

      const content = customElement.children; // eslint-disable-line

      if (content) {
        aTabbableContent = [...aTabbableContent, ...FocusHelper._getTabbableContent(content)];
      }
    }

    return aTabbableContent;
  }

  static _getTabbableContent(nodes) {
    const aTabbableContent = [];
    Array.from(nodes).forEach(node => {
      let currentNode = node;

      while (currentNode) {
        if (FocusHelper._hasShadowRoot(currentNode)) {
          // as the content is in the <span> template and it is always 2nd child
          const children = currentNode.shadowRoot.children;
          currentNode = children.length === 1 ? children[0] : children[1];
        }

        if (FocusHelper._isNodeTabbable(currentNode)) {
          aTabbableContent.push(currentNode);
        }

        currentNode = currentNode.children && currentNode.children.length && currentNode.children[0];
      }
    });
    return aTabbableContent.filter(FocusHelper.isVisible);
  }

  static _hasTabbableContent(nodes) {
    let hasTabableContent = false;
    Array.from(nodes).forEach(node => {
      let currentNode = node;

      while (currentNode && !hasTabableContent) {
        if (FocusHelper._hasShadowRoot(currentNode)) {
          // as the content is in the <span> template and it is always 2nd child
          const children = currentNode.shadowRoot.children;
          currentNode = children.length === 1 ? children[0] : children[1];
        }

        hasTabableContent = FocusHelper._isNodeTabbable(currentNode);
        currentNode = currentNode.children.length && currentNode.children[0];
      }
    });
    return hasTabableContent;
  }

  static _isNodeTabbable(node) {
    if (!node) {
      return false;
    }

    const nodeName = node.nodeName.toLowerCase();

    if (node.hasAttribute("data-sap-no-tab-ref")) {
      return false;
    } // special tags


    if (nodeName === "a") {
      return !!node.href;
    }

    if (/input|select|textarea|button|object/.test(nodeName)) {
      return !node.disabled;
    }

    return FocusHelper.hasTabIndex(node);
  }

  static _hasShadowRoot(node) {
    return !!(node && node.shadowRoot);
  }

  static _isInsideShadowRoot(node) {
    return !!(node && node.getRootNode() && node.getRootNode().host);
  }

  static _getCustomElement(node) {
    return node.getRootNode().host;
  }

}

var _default = FocusHelper;
exports.default = _default;
},{"./UI5Element.js":"../node_modules/@ui5/webcomponents-base/src/UI5Element.js"}],"../node_modules/@ui5/webcomponents/dist/themes/ListItemBase.css.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = ":host(ui5-li:not([hidden])){display:block}:host(ui5-li) .sap-phone.sapMLIB{outline:none}ui5-li:not([hidden]){display:block}ui5-li .sap-phone.sapMLIB{outline:none}.sapMLIB{position:relative;display:flex;height:3rem;width:100%;padding:0 1rem 0 1rem;background:var(--ui5-listitem-background-color,var(--sapUiListBackground,var(--sapList_Background,var(--sapBaseColor,var(--sapPrimary3,#fff)))));box-sizing:border-box}.sapMLIBHoverable:hover{background:var(--sapUiListHoverBackground,var(--sapList_Hover_Background,#fafafa))}.sapMLIB.sapMLIBSelected{background:var(--sapUiListSelectionBackgroundColor,var(--sapList_SelectionBackgroundColor,#e5f0fa))}.sapMLIB.sapMLIBActive{color:var(--sapUiListActiveTextColor,#fff);background:var(--sapUiListActiveBackground,var(--sapUiListHighlightColor,var(--sapList_HighlightColor,var(--sapHighlightColor,#0854a0))))}.sapMLIB.sapMLIBHoverable.sapMLIBSelected:hover{background:var(--sapUiListSelectionHoverBackground,#d8e9f8)}.sapMLIB.sapMLIBHoverable.sapMLIBSelected.sapMLIBActive:hover{background:var(--sapUiListActiveBackground,var(--sapUiListHighlightColor,var(--sapList_HighlightColor,var(--sapHighlightColor,#0854a0))))}.sapMLIB.sapMLIBFocusable:focus{outline:none}.sapMLIB.sapMLIBFocusable .sapMLIBContent:focus:after,.sapMLIB.sapMLIBFocusable:focus:after{content:\"\";border:var(--_ui5_listitembase_focus_width,1px) dotted var(--sapUiContentFocusColor,var(--sapContent_FocusColor,#000));position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none}.sapMLIB.sapMLIBActive.sapMLIBFocusable .sapMLIBContent:focus,.sapMLIB.sapMLIBActive.sapMLIBFocusable:focus{outline-color:var(--sapUiContentContrastFocusColor,var(--sapContent_ContrastFocusColor,#fff))}.sapMLIB.sapMLIBBorder{border-bottom:var(--ui5-listitem-border-bottom,1px solid var(--sapUiListBorderColor,var(--sapList_BorderColor,#ededed)))}.sapMLIB.sapMLIBActive .sapMLIBIcon{color:var(--sapUiListActiveTextColor,#fff)}.sapMLIBIcon{color:var(--sapUiContentNonInteractiveIconColor,var(--sapContent_NonInteractiveIconColor,var(--sapPrimary7,#6a6d70)));padding-right:1rem}.sapMLIBContent{max-width:100%;min-height:100%;font-family:var(--sapUiFontFamily,var(--sapFontFamily,\"72\",\"72full\",Arial,Helvetica,sans-serif))}.sapMLIBActionable,.sapMLIBActionable>.sapMLIBIcon{cursor:pointer}.sapMLIBFocusable.sapMLIBLegacyOutline:focus{outline:none}:host(ui5-li) [dir=rtl] .sapMLIBIcon{padding-left:1rem;padding-right:0}:host(ui5-li) [dir=rtl] .sapMSLIImg{margin:.5rem 0 .5rem .75rem}ui5-li [dir=rtl] .sapMLIBIcon{padding-left:1rem;padding-right:0}ui5-li [dir=rtl] .sapMSLIImg{margin:.5rem 0 .5rem .75rem}";
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents/dist/ListItemBase.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UI5Element = _interopRequireDefault(require("@ui5/webcomponents-base/src/UI5Element.js"));

var _FocusHelper = _interopRequireDefault(require("@ui5/webcomponents-base/src/FocusHelper.js"));

var _PseudoEvents = require("@ui5/webcomponents-base/src/events/PseudoEvents.js");

var _Device = require("@ui5/webcomponents-core/dist/sap/ui/Device.js");

var _Configuration = require("@ui5/webcomponents-base/src/Configuration.js");

var _getEffectiveRTL = _interopRequireDefault(require("@ui5/webcomponents-base/src/util/getEffectiveRTL.js"));

var _ListItemBaseCss = _interopRequireDefault(require("./themes/ListItemBase.css.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Styles

/**
 * @public
 */
const metadata = {
  "abstract": true,
  properties:
  /** @lends  sap.ui.webcomponents.main.ListItemBase.prototype */
  {
    _hideBorder: {
      type: Boolean
    },
    _tabIndex: {
      type: String,
      defaultValue: "-1"
    }
  },
  events: {
    _focused: {},
    _focusForward: {}
  }
};
/**
 * A class to serve as a foundation
 * for the <code>ListItem</code> and <code>GroupHeaderListItem</code> classes.
 *
 * @abstract
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.ListItemBase
 * @extends UI5Element
 * @public
 */

class ListItemBase extends _UI5Element.default {
  static get metadata() {
    return metadata;
  }

  static get styles() {
    return _ListItemBaseCss.default;
  }

  onfocusin(event) {
    this.fireEvent("_focused", event);
  }

  onkeydown(event) {
    if ((0, _PseudoEvents.isTabNext)(event)) {
      return this._handleTabNext(event);
    }

    if ((0, _PseudoEvents.isTabPrevious)(event)) {
      return this._handleTabPrevious(event);
    }
  }

  _handleTabNext(event) {
    const target = event.target.shadowRoot.activeElement;

    if (this.shouldForwardTabAfter(target)) {
      this.fireEvent("_forwardAfter", {
        item: target
      });
    }
  }

  _handleTabPrevious(event) {
    const target = event.target.shadowRoot.activeElement;

    if (this.shouldForwardTabBefore(target)) {
      const eventData = event;
      eventData.item = target;
      this.fireEvent("_forwardBefore", eventData);
    }
  }
  /*
  * Determines if th current list item either has no tabbable content or
  * [TAB] is performed onto the last tabbale content item.
  */


  shouldForwardTabAfter(target) {
    const aContent = _FocusHelper.default.getTabbableContent(this.getDomRef());

    if (target.getFocusDomRef) {
      target = target.getFocusDomRef();
    }

    return !aContent.length || aContent[aContent.length - 1] === target;
  }
  /*
  * Determines if the current list item is target of [SHIFT+TAB].
  */


  shouldForwardTabBefore(target) {
    return this.getDomRef() === target;
  }

  get classes() {
    return {
      main: {
        sapMLIBBorder: !this._hideBorder,
        sapMLIB: true,
        "sapMLIB-CTX": true,
        sapMLIBShowSeparator: true,
        sapMLIBFocusable: (0, _Device.isDesktop)(),
        "sap-phone": (0, _Device.isPhone)(),
        "sapUiSizeCompact": (0, _Configuration.getCompactSize)()
      },
      inner: {
        sapMLIBContent: true
      }
    };
  }

  get rtl() {
    return (0, _getEffectiveRTL.default)() ? "rtl" : undefined;
  }

}

var _default = ListItemBase;
exports.default = _default;
},{"@ui5/webcomponents-base/src/UI5Element.js":"../node_modules/@ui5/webcomponents-base/src/UI5Element.js","@ui5/webcomponents-base/src/FocusHelper.js":"../node_modules/@ui5/webcomponents-base/src/FocusHelper.js","@ui5/webcomponents-base/src/events/PseudoEvents.js":"../node_modules/@ui5/webcomponents-base/src/events/PseudoEvents.js","@ui5/webcomponents-core/dist/sap/ui/Device.js":"../node_modules/@ui5/webcomponents-core/dist/sap/ui/Device.js","@ui5/webcomponents-base/src/Configuration.js":"../node_modules/@ui5/webcomponents-base/src/Configuration.js","@ui5/webcomponents-base/src/util/getEffectiveRTL.js":"../node_modules/@ui5/webcomponents-base/src/util/getEffectiveRTL.js","./themes/ListItemBase.css.js":"../node_modules/@ui5/webcomponents/dist/themes/ListItemBase.css.js"}],"../node_modules/@ui5/webcomponents/dist/types/ListMode.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DataType = _interopRequireDefault(require("@ui5/webcomponents-base/src/types/DataType.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ListModes = {
  /**
   * Default mode (no selection).
   * @public
   */
  None: "None",

  /**
   * Right-positioned single selection mode (only one list item can be selected).
   * @public
   */
  SingleSelect: "SingleSelect",

  /**
   * Left-positioned single selection mode (only one list item can be selected).
   * @public
   */
  SingleSelectBegin: "SingleSelectBegin",

  /**
   * Selected item is highlighted but no selection element is visible
   * (only one list item can be selected).
   * @public
   */
  SingleSelectEnd: "SingleSelectEnd",

  /**
   * Multi selection mode (more than one list item can be selected).
   * @public
   */
  MultiSelect: "MultiSelect",

  /**
   * Delete mode (only one list item can be deleted via provided delete button)
   * @public
   */
  Delete: "Delete"
};

class ListMode extends _DataType.default {
  static isValid(value) {
    return !!ListModes[value];
  }

}

ListMode.generataTypeAcessors(ListModes);
var _default = ListMode;
exports.default = _default;
},{"@ui5/webcomponents-base/src/types/DataType.js":"../node_modules/@ui5/webcomponents-base/src/types/DataType.js"}],"../node_modules/@ui5/webcomponents/dist/types/ListSeparators.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DataType = _interopRequireDefault(require("@ui5/webcomponents-base/src/types/DataType.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ListSeparatorsTypes = {
  /**
   * Separators between the items including the last and the first one.
   * @public
   */
  All: "All",

  /**
   * Separators between the items.
   * <b>Note:</b> This enumeration depends on the theme.
   * @public
   */
  Inner: "Inner",

  /**
   * No item separators.
   * @public
   */
  None: "None"
};

class ListSeparators extends _DataType.default {
  static isValid(value) {
    return !!ListSeparatorsTypes[value];
  }

}

ListSeparators.generataTypeAcessors(ListSeparatorsTypes);
var _default = ListSeparators;
exports.default = _default;
},{"@ui5/webcomponents-base/src/types/DataType.js":"../node_modules/@ui5/webcomponents-base/src/types/DataType.js"}],"../node_modules/@ui5/webcomponents/dist/types/ListItemType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DataType = _interopRequireDefault(require("@ui5/webcomponents-base/src/types/DataType.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Different types of ListItem.
 */
const ListItemTypes = {
  /**
   * Indicates the list item does not have any active feedback when item is pressed.
   * @public
   */
  Inactive: "Inactive",

  /**
   * Indicates that the item is clickable via active feedback when item is pressed.
   * @public
   */
  Active: "Active"
};

class ListItemType extends _DataType.default {
  static isValid(value) {
    return !!ListItemTypes[value];
  }

}

ListItemType.generataTypeAcessors(ListItemTypes);
var _default = ListItemType;
exports.default = _default;
},{"@ui5/webcomponents-base/src/types/DataType.js":"../node_modules/@ui5/webcomponents-base/src/types/DataType.js"}],"../node_modules/@ui5/webcomponents/dist/build/compiled/ListTemplate.lit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ifDefined = _interopRequireDefault(require("@ui5/webcomponents-base/src/renderer/ifDefined.js"));

var _LitRenderer = require("@ui5/webcomponents-base/src/renderer/LitRenderer.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-unused-vars: 0 */
const block0 = context => {
  return _LitRenderer.html`<div	class="${(0, _ifDefined.default)((0, _LitRenderer.classMap)(context.classes.main))}"	@focusin="${(0, _ifDefined.default)(context.onfocusin)}"><!-- header -->	${context.header ? block1(context) : undefined}${context.shouldRenderH1 ? block2(context) : undefined}<div id="${(0, _ifDefined.default)(context._id)}-before" tabindex="0" class="sapMListDummyArea"></div><ul id="${(0, _ifDefined.default)(context._id)}-listUl" class="${(0, _ifDefined.default)((0, _LitRenderer.classMap)(context.classes.ul))}"><slot></slot>		${context.showNoDataText ? block3(context) : undefined}</ul>	${context.footerText ? block4(context) : undefined}<div id="${(0, _ifDefined.default)(context._id)}-after" tabindex="0" class="sapMListDummyArea"></div></div>`;
};

const block1 = context => {
  return _LitRenderer.html`<slot name="header" />	`;
};

const block2 = context => {
  return _LitRenderer.html`<header id="${(0, _ifDefined.default)(context._id)}-header" class="sapMListHdr sapMListHdrText">			${(0, _ifDefined.default)(context.headerText)}</header>	`;
};

const block3 = context => {
  return _LitRenderer.html`<li id="${(0, _ifDefined.default)(context._id)}-nodata" class="${(0, _ifDefined.default)((0, _LitRenderer.classMap)(context.classes.noData))}" tabindex="${(0, _ifDefined.default)(context.noDataTabIndex)}"><div id="${(0, _ifDefined.default)(context._id)}-nodata-text" class="sapMListNoDataText">					${(0, _ifDefined.default)(context.noDataText)}</div></li>		`;
};

const block4 = context => {
  return _LitRenderer.html`<footer id="${(0, _ifDefined.default)(context._id)}-footer" class="sapMListFtr">			${(0, _ifDefined.default)(context.footerText)}</footer>	`;
};

var _default = block0;
exports.default = _default;
},{"@ui5/webcomponents-base/src/renderer/ifDefined.js":"../node_modules/@ui5/webcomponents-base/src/renderer/ifDefined.js","@ui5/webcomponents-base/src/renderer/LitRenderer.js":"../node_modules/@ui5/webcomponents-base/src/renderer/LitRenderer.js"}],"../node_modules/@ui5/webcomponents/dist/themes/List.css.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = ":host(ui5-list:not([hidden])){display:block;max-width:100%}ui5-list:not([hidden]){display:block;max-width:100%}.sapMList{width:100%;height:100%;position:relative;box-sizing:border-box}.sapMList.sapMListInsetBG{padding:2rem}.sapMList .sapMListUl{list-style-type:none;padding:0;margin:0}.sapMList .sapMListUl:focus{outline:none}.sapMList .sapMListDummyArea{position:fixed}.sapMList .sapMListNoData{list-style-type:none;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;color:var(--sapUiListTextColor,var(--sapUiBaseText,var(--sapTextColor,var(--sapPrimary6,#32363a))));background-color:var(--sapUiListBackground,var(--sapList_Background,var(--sapBaseColor,var(--sapPrimary3,#fff))));border-bottom:1px solid var(--sapUiListBorderColor,var(--sapList_BorderColor,#ededed));padding:0 1rem!important;height:3rem}.sapMList .sapMListHdrText{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;box-sizing:border-box;font-size:var(--sapMFontHeader4Size,1.125rem);font-family:var(--sapUiFontHeaderFamily,var(--sapUiFontFamily,var(--sapFontFamily,\"72\",\"72full\",Arial,Helvetica,sans-serif)));color:var(--sapUiGroupTitleTextColor,var(--sapGroup_TitleTextColor,#32363a));height:3rem;line-height:3rem;padding:0 1rem;background-color:var(--sapUiGroupTitleBackground,var(--sapGroup_TitleBackground,transparent));border-bottom:1px solid var(--sapUiGroupTitleBorderColor,var(--sapGroup_TitleBorderColor,#d9d9d9))}.sapMList .sapMListFtr{height:2rem;box-sizing:border-box;-webkit-text-size-adjust:none;font-size:var(--sapMFontMediumSize,.875rem);font-family:var(--sapUiFontFamily,var(--sapFontFamily,\"72\",\"72full\",Arial,Helvetica,sans-serif));line-height:2rem;background-color:var(--sapUiListFooterBackground,#fafafa);color:var(--sapUiListFooterTextColor,var(--sapUiListTextColor,var(--sapUiBaseText,var(--sapTextColor,var(--sapPrimary6,#32363a)))));padding:0 1rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.sapMList .sapMListShowSeparatorsNone .sapMListNoData{border-bottom:0}.sapMList .sapMListNoDataText{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.sapUiSizeCompact.sapMList .sapMListNoData{height:2rem;font-size:var(--sapMFontMediumSize,.875rem)}";
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents/dist/List.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UI5Element = _interopRequireDefault(require("@ui5/webcomponents-base/src/UI5Element.js"));

var _LitRenderer = _interopRequireDefault(require("@ui5/webcomponents-base/src/renderer/LitRenderer.js"));

var _ItemNavigation = _interopRequireDefault(require("@ui5/webcomponents-base/src/delegate/ItemNavigation.js"));

var _FocusHelper = _interopRequireDefault(require("@ui5/webcomponents-base/src/FocusHelper.js"));

var _Device = require("@ui5/webcomponents-core/dist/sap/ui/Device.js");

var _PseudoEvents = require("@ui5/webcomponents-base/src/events/PseudoEvents.js");

var _Configuration = require("@ui5/webcomponents-base/src/Configuration.js");

var _ListItemBase = _interopRequireDefault(require("./ListItemBase.js"));

var _ListMode = _interopRequireDefault(require("./types/ListMode.js"));

var _ListSeparators = _interopRequireDefault(require("./types/ListSeparators.js"));

var _ListItemType = _interopRequireDefault(require("./types/ListItemType.js"));

var _ListTemplateLit = _interopRequireDefault(require("./build/compiled/ListTemplate.lit.js"));

var _ListCss = _interopRequireDefault(require("./themes/List.css.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Template
// Styles

/**
 * @public
 */
const metadata = {
  tag: "ui5-list",
  defaultSlot: "items",
  slots:
  /** @lends sap.ui.webcomponents.main.List.prototype */
  {
    /**
     * Defines the <code>ui5-li</code> header.
     * <b>Note:</b> When <code>header</code> is set, the
     * <code>headerText</code> property is ignored.
     *
     * @type {HTMLElement}
     * @slot
     * @public
     */
    header: {
      type: HTMLElement
    },

    /**
     * Defines the items of the <code>ui5-list</code>.
     * <br><b>Note:</b> Only <code>ui5-li</code>, <code>ui5-li-custom</code> and <code>ui5-li-groupheader</code> are allowed.
     *
     * @type {ListItemBase[]}
     * @slot
     * @public
     */
    items: {
      type: _ListItemBase.default,
      multiple: true
    }
  },
  properties:
  /** @lends  sap.ui.webcomponents.main.List.prototype */
  {
    /**
     * Defines the <code>ui5-list</code> header text.
     * <br><br>
     * <b>Note:</b> If <code>header</code> is set this property is ignored.
     *
     * @type {string}
     * @defaultvalue: ""
     * @public
     */
    headerText: {
      type: String
    },

    /**
     * Defines the footer text.
     *
     * @type {string}
     * @defaultvalue: ""
     * @public
     */
    footerText: {
      type: String
    },

    /**
     * Determines whether the list items are indented.
     *
     * @type {boolean}
     * @defaultvalue false
     * @public
     */
    inset: {
      type: Boolean
    },

    /**
     * Defines the mode of the <code>ui5-list</code>.
     * <br><br>
     * <b>Note:</b> Avalaible options are <code>None</code>, <code>SingleSelect</code>,
     * <code>MultiSelect</code>, and <code>Delete</code>.
     *
     * @type {string}
     * @defaultvalue "None"
     * @public
     */
    mode: {
      type: _ListMode.default,
      defaultValue: _ListMode.default.None
    },

    /**
     * Defines the text that is displayed when the <code>ui5-list</code> contains no items.
     *
     * @type {string}
     * @defaultvalue: ""
     * @public
     */
    noDataText: {
      type: String
    },

    /**
     * Defines the item separator style that is used.
     * <br><br>
     * <b>Notes:</b>
     * <ul>
     * <li>Avalaible options are <code>All</code>, <code>Inner</code>, and <code>None</code>.</li>
     * <li>When set to <code>None</code>, none of the items is separated by horizontal lines.</li>
     * <li>When set to <code>Inner</code>, the first item doesn't have a top separator and the last
     * item doesn't have a bottom separator.</li>
     * </ul>
     *
     * @type {string}
     * @defaultvalue "All"
     * @public
     */
    separators: {
      type: _ListSeparators.default,
      defaultValue: _ListSeparators.default.All
    }
  },
  events:
  /** @lends  sap.ui.webcomponents.main.List.prototype */
  {
    /**
     * Fired when an item is pressed, unless the item's <code>type</code> property
     * is set to <code>Inactive</code>.
     *
     * @event
     * @param {HTMLElement} item the pressed item.
     * @public
     */
    itemPress: {
      detail: {
        item: {
          type: HTMLElement
        }
      }
    },

    /**
     * Fired when the Delete button of any item is pressed.
     * <br><br>
     * <b>Note:</b> A Delete button is displayed on each item,
     * when the <code>ui5-list</code> <code>mode</code> property is set to <code>Delete</code>.
     * @event
     * @param {HTMLElement} item the deleted item.
     * @public
     */
    itemDelete: {
      detail: {
        item: {
          type: HTMLElement
        }
      }
    },

    /**
     * Fired when selection is changed by user interaction
     * in <code>SingleSelect</code> and <code>MultiSelect</code> modes.
     *
     * @event
     * @param {Array} selectedItems an array of the selected items.
     * @param {Array} previouslySelectedItems an array of the previously selected items.
     * @public
     */
    selectionChange: {
      detail: {
        selectedItems: {
          type: Array
        },
        previouslySelectedItems: {
          type: Array
        }
      }
    }
  }
};
/**
 * @class
 *
 * <h3 class="comment-api-title"> Overview </h3>
 *
 * The <code>ui5-list</code> component allows displaying a list of items, advanced keyboard
 * handling support for navigating between items, and predefined modes to improve the development efficiency.
 * <br><br>
 * The <code>ui5-list</code> is а container for the available list items:
 * <ul>
 * <li><code>ui5-li</code></li>
 * <li><code>ui5-li-custom</code></li>
 * <li><code>ui5-li-group-header</code></li>
 * </ul>
 * <br><br>
 * To benefit from the built-in selection mechanism, you can use the available
 * selection modes, such as
 * <code>SingleSelect</code>, <code>MultiSelect</code> and <code>Delete</code>.
 * <br><br>
 * Additionally, the <code>ui5-list</code> provides header, footer, and customization for the list item separators.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/List";</code>
 * <br>
 * <code>import "@ui5/webcomponents/dist/StandardListItem";</code> (for <code>ui5-li</code>)
 * <br>
 * <code>import "@ui5/webcomponents/dist/CustomListItem";</code> (for <code>ui5-li-custom</code>)
 * <br>
 * <code>import "@ui5/webcomponents/dist/GroupHeaderListItem";</code> (for <code>ui5-li-group-header</code>)
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.List
 * @extends UI5Element
 * @tagname ui5-list
 * @appenddocs StandardListItem CustomListItem GroupHeaderListItem
 * @public
 */

class List extends _UI5Element.default {
  static get metadata() {
    return metadata;
  }

  static get render() {
    return _LitRenderer.default;
  }

  static get template() {
    return _ListTemplateLit.default;
  }

  static get styles() {
    return _ListCss.default;
  }

  constructor() {
    super();
    this.initItemNavigation(); // Stores the last focused item within the internal ul element.

    this._previouslyFocusedItem = null; // Indicates that the List is forwarding the focus before or after the internal ul.

    this._forwardingFocus = false;
    this._previouslySelectedItem = null;
    this.addEventListener("ui5-_press", this.onItemPress.bind(this));
    this.addEventListener("ui5-_focused", this.onItemFocused.bind(this));
    this.addEventListener("ui5-_forwardAfter", this.onForwardAfter.bind(this));
    this.addEventListener("ui5-_forwardBefore", this.onForwardBefore.bind(this));
    this.addEventListener("ui5-_selectionRequested", this.onSelectionRequested.bind(this));
  }

  onBeforeRendering() {
    this.prepareListItems();

    this._itemNavigation.init();
  }

  initItemNavigation() {
    this._itemNavigation = new _ItemNavigation.default(this);

    this._itemNavigation.getItemsCallback = () => this.getSlottedNodes("items");

    this._delegates.push(this._itemNavigation);
  }

  prepareListItems() {
    const slottedItems = this.getSlottedNodes("items");
    slottedItems.forEach((item, key) => {
      const isLastChild = key === slottedItems.length - 1;
      const showBottomBorder = this.separators === _ListSeparators.default.All || this.separators === _ListSeparators.default.Inner && !isLastChild;
      item._mode = this.mode;
      item._hideBorder = !showBottomBorder;
    });
    this._previouslySelectedItem = null;
  }
  /*
  * ITEM SELECTION BASED ON THE CURRENT MODE
  */


  onSelectionRequested(event) {
    const previouslySelectedItems = this.getSelectedItems();
    let selectionChange = false;
    this._selectionRequested = true;

    if (this[`handle${this.mode}`]) {
      selectionChange = this[`handle${this.mode}`](event.detail.item, event.selected);
    }

    if (selectionChange) {
      this.fireEvent("selectionChange", {
        selectedItems: this.getSelectedItems(),
        previouslySelectedItems
      });
    }
  }

  handleSingleSelect(item) {
    if (item.selected) {
      return false;
    }

    this.deselectSelectedItems();
    item.selected = true;
    return true;
  }

  handleSingleSelectBegin(item) {
    return this.handleSingleSelect(item);
  }

  handleSingleSelectEnd(item) {
    return this.handleSingleSelect(item);
  }

  handleMultiSelect(item, selected) {
    item.selected = selected;
    return true;
  }

  handleDelete(item) {
    this.fireEvent("itemDelete", {
      item
    });
  }

  deselectSelectedItems() {
    this.getSelectedItems().forEach(item => {
      item.selected = false;
    });
  }

  getSelectedItems() {
    return this.getSlottedNodes("items").filter(item => item.selected);
  }

  getFirstSelectedItem() {
    const slottedItems = this.getSlottedNodes("items");
    let firstSelectedItem = null;

    for (let i = 0; i < slottedItems.length; i++) {
      if (slottedItems[i].selected) {
        firstSelectedItem = slottedItems[i];
        break;
      }
    }

    return firstSelectedItem;
  }

  onkeydown(event) {
    if ((0, _PseudoEvents.isTabNext)(event)) {
      this._handleTabNext(event);
    }
  }
  /*
  * KEYBOARD SUPPORT
  */


  _handleTabNext(event) {
    // If forward navigation is performed, we check if the List has headerToolbar.
    // If yes - we check if the target is at the last tabbable element of the headerToolbar
    // to forward correctly the focus to the selected, previously focused or to the first list item.
    let lastTabbableEl;
    const target = this.getNormalizedTarget(event.target);

    if (this.headerToolbar) {
      lastTabbableEl = this.getHeaderToolbarLastTabbableElement();
    }

    if (!lastTabbableEl) {
      return;
    }

    if (lastTabbableEl === target) {
      if (this.getFirstSelectedItem()) {
        this.focusFirstSelectedItem();
      } else if (this.getPreviouslyFocusedItem()) {
        this.focusPreviouslyFocusedItem();
      } else {
        this.focusFirstItem();
      }

      event.stopImmediatePropagation();
      event.preventDefault();
    }
  }

  onfocusin(event) {
    // If the focusin event does not origin from one of the 'triggers' - ignore it.
    if (!this.isForwardElement(this.getNormalizedTarget(event.target))) {
      event.stopImmediatePropagation();
      return;
    } // The focus arrives in the List for the first time.
    // If there is selected item - focus it or focus the first item.


    if (!this.getPreviouslyFocusedItem()) {
      if (this.getFirstSelectedItem()) {
        this.focusFirstSelectedItem();
      } else {
        this.focusFirstItem();
      }

      event.stopImmediatePropagation();
      return;
    } // The focus returns to the List,
    // focus the first selected item or the previously focused element.


    if (!this.getForwardingFocus()) {
      if (this.getFirstSelectedItem()) {
        this.focusFirstSelectedItem();
      } else {
        this.focusPreviouslyFocusedItem();
      }
    }

    this.setForwardingFocus(false);
  }

  isForwardElement(node) {
    const nodeId = node.id;

    if (this._id === nodeId || this.getBeforeElement().id === nodeId) {
      return true;
    }

    return this.getAfterElement().id === nodeId;
  }

  onItemFocused(event) {
    const target = event.target;

    this._itemNavigation.update(target);

    this.fireEvent("itemFocused", {
      item: target
    });
  }

  onItemPress(event) {
    const pressedItem = event.detail.item;

    if (pressedItem.type === _ListItemType.default.Active) {
      this.fireEvent("itemPress", {
        item: pressedItem
      });
    }

    if (!this._selectionRequested && this.mode !== _ListMode.default.Delete) {
      this._selectionRequested = true;
      this.onSelectionRequested({
        detail: {
          item: pressedItem
        },
        selected: !pressedItem.selected
      });
    }

    this._selectionRequested = false;
  }

  onForwardBefore(event) {
    this.setPreviouslyFocusedItem(event.target);
    this.focusBeforeElement();
  }

  onForwardAfter(event) {
    this.setPreviouslyFocusedItem(event.target);
    this.focusAfterElement();
  }

  focusBeforeElement() {
    this.setForwardingFocus(true);
    this.getBeforeElement().focus();
  }

  focusAfterElement() {
    this.setForwardingFocus(true);
    this.getAfterElement().focus();
  }

  focusFirstItem() {
    const firstItem = this.getFirstItem();

    if (firstItem) {
      firstItem.focus();
    }
  }

  focusPreviouslyFocusedItem() {
    const previouslyFocusedItem = this.getPreviouslyFocusedItem();

    if (previouslyFocusedItem) {
      previouslyFocusedItem.focus();
    }
  }

  focusFirstSelectedItem() {
    const firstSelectedItem = this.getFirstSelectedItem();

    if (firstSelectedItem) {
      firstSelectedItem.focus();
    }
  }

  setForwardingFocus(forwardingFocus) {
    this._forwardingFocus = forwardingFocus;
  }

  getForwardingFocus() {
    return this._forwardingFocus;
  }

  setPreviouslyFocusedItem(item) {
    this._previouslyFocusedItem = item;
  }

  getPreviouslyFocusedItem() {
    return this._previouslyFocusedItem;
  }

  getFirstItem() {
    const slottedItems = this.getSlottedNodes("items");
    return !!slottedItems.length && slottedItems[0];
  }

  getAfterElement() {
    if (!this._afterElement) {
      this._afterElement = this.shadowRoot.querySelector(`#${this._id}-after`);
    }

    return this._afterElement;
  }

  getBeforeElement() {
    if (!this._beforeElement) {
      this._beforeElement = this.shadowRoot.querySelector(`#${this._id}-before`);
    }

    return this._beforeElement;
  }

  getHeaderToolbarLastTabbableElement() {
    return this.getLastTabbableELement(this.headerToolbar.getDomRef()) || this.headerToolbar.getDomRef();
  }

  getLastTabbableELement(node) {
    return _FocusHelper.default.getLastTabbableElement(node);
  }

  getNormalizedTarget(target) {
    let focused = target;

    if (target.shadowRoot && target.shadowRoot.activeElement) {
      focused = target.shadowRoot.activeElement;
    }

    return focused;
  }

  get shouldRenderH1() {
    return !this.header && this.headerText;
  }

  get showNoDataText() {
    return this.items.length === 0 && this.noDataText;
  }

  get classes() {
    return {
      main: {
        sapMList: true,
        sapMListInsetBG: this.inset,
        sapUiSizeCompact: (0, _Configuration.getCompactSize)()
      },
      ul: {
        sapMListItems: true,
        sapMListUl: true,
        [`sapMListShowSeparators${this.separators}`]: true,
        [`sapMListMode${this.mode}`]: true,
        sapMListInset: this.inset
      },
      noData: {
        sapMLIB: true,
        sapMListNoData: true,
        sapMLIBTypeInactive: true,
        sapMLIBFocusable: (0, _Device.isDesktop)()
      }
    };
  }

}

List.define();
var _default = List;
exports.default = _default;
},{"@ui5/webcomponents-base/src/UI5Element.js":"../node_modules/@ui5/webcomponents-base/src/UI5Element.js","@ui5/webcomponents-base/src/renderer/LitRenderer.js":"../node_modules/@ui5/webcomponents-base/src/renderer/LitRenderer.js","@ui5/webcomponents-base/src/delegate/ItemNavigation.js":"../node_modules/@ui5/webcomponents-base/src/delegate/ItemNavigation.js","@ui5/webcomponents-base/src/FocusHelper.js":"../node_modules/@ui5/webcomponents-base/src/FocusHelper.js","@ui5/webcomponents-core/dist/sap/ui/Device.js":"../node_modules/@ui5/webcomponents-core/dist/sap/ui/Device.js","@ui5/webcomponents-base/src/events/PseudoEvents.js":"../node_modules/@ui5/webcomponents-base/src/events/PseudoEvents.js","@ui5/webcomponents-base/src/Configuration.js":"../node_modules/@ui5/webcomponents-base/src/Configuration.js","./ListItemBase.js":"../node_modules/@ui5/webcomponents/dist/ListItemBase.js","./types/ListMode.js":"../node_modules/@ui5/webcomponents/dist/types/ListMode.js","./types/ListSeparators.js":"../node_modules/@ui5/webcomponents/dist/types/ListSeparators.js","./types/ListItemType.js":"../node_modules/@ui5/webcomponents/dist/types/ListItemType.js","./build/compiled/ListTemplate.lit.js":"../node_modules/@ui5/webcomponents/dist/build/compiled/ListTemplate.lit.js","./themes/List.css.js":"../node_modules/@ui5/webcomponents/dist/themes/List.css.js"}],"../node_modules/@ui5/webcomponents/dist/types/PopoverPlacementType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DataType = _interopRequireDefault(require("@ui5/webcomponents-base/src/types/DataType.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PopoverPlacementTypes = {
  /**
   * Popover will be placed at the left side of the reference element.
   * @public
   */
  Left: "Left",

  /**
   * Popover will be placed at the right side of the reference element.
   * @public
   */
  Right: "Right",

  /**
   * Popover will be placed at the top of the reference element.
   * @public
   */
  Top: "Top",

  /**
   * Popover will be placed at the bottom of the reference element.
   * @public
   */
  Bottom: "Bottom"
};

class PopoverPlacementType extends _DataType.default {
  static isValid(value) {
    return !!PopoverPlacementTypes[value];
  }

}

PopoverPlacementType.generataTypeAcessors(PopoverPlacementTypes);
var _default = PopoverPlacementType;
exports.default = _default;
},{"@ui5/webcomponents-base/src/types/DataType.js":"../node_modules/@ui5/webcomponents-base/src/types/DataType.js"}],"../node_modules/@ui5/webcomponents/dist/types/PopoverVerticalAlign.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DataType = _interopRequireDefault(require("@ui5/webcomponents-base/src/types/DataType.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PopoverVerticalAligns = {
  Center: "Center",
  Top: "Top",
  Bottom: "Bottom",
  Stretch: "Stretch"
};

class PopoverVerticalAlign extends _DataType.default {
  static isValid(value) {
    return !!PopoverVerticalAligns[value];
  }

}

PopoverVerticalAlign.generataTypeAcessors(PopoverVerticalAligns);
var _default = PopoverVerticalAlign;
exports.default = _default;
},{"@ui5/webcomponents-base/src/types/DataType.js":"../node_modules/@ui5/webcomponents-base/src/types/DataType.js"}],"../node_modules/@ui5/webcomponents/dist/types/PopoverHorizontalAlign.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DataType = _interopRequireDefault(require("@ui5/webcomponents-base/src/types/DataType.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PopoverHorizontalAligns = {
  Center: "Center",
  Left: "Left",
  Right: "Right",
  Stretch: "Stretch"
};

class PopoverHorizontalAlign extends _DataType.default {
  static isValid(value) {
    return !!PopoverHorizontalAligns[value];
  }

}

PopoverHorizontalAlign.generataTypeAcessors(PopoverHorizontalAligns);
var _default = PopoverHorizontalAlign;
exports.default = _default;
},{"@ui5/webcomponents-base/src/types/DataType.js":"../node_modules/@ui5/webcomponents-base/src/types/DataType.js"}],"../node_modules/@ui5/webcomponents/dist/themes/Popup.css.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = ".sapMPopupFrame{width:0;height:0;display:none;visibility:visible}.sapMPopupFrameOpen{display:inline}.sapMPopup{min-width:6.25rem;box-sizing:border-box;outline:none;max-width:100%;max-height:100%;background:var(--sapUiGroupContentBackground,var(--sapGroup_ContentBackground,var(--sapBaseColor,var(--sapPrimary3,#fff))));border:none;box-shadow:var(--sapUiShadowLevel2,0 .625rem 1.875rem 0 rgba(0,0,0,.15),0 0 0 1px rgba(0,0,0,.15));border-radius:.25rem;min-height:2rem}.sapMPopup .sapMPopupHeader{margin:0;color:var(--sapUiPageHeaderTextColor,var(--sapPageHeader_TextColor,#32363a));font-size:1rem;font-weight:400;font-family:var(--sapUiFontFamily,var(--sapFontFamily,\"72\",\"72full\",Arial,Helvetica,sans-serif));border-bottom:1px solid var(--sapUiPageFooterBorderColor,#d9d9d9)}.sapMPopup .sapMPopupHeaderText{padding:0 .25rem;text-align:center;height:3rem;line-height:3rem}.sapMPopup .sapMPopupFooter{font-size:1rem;font-weight:400;font-family:var(--sapUiFontFamily,var(--sapFontFamily,\"72\",\"72full\",Arial,Helvetica,sans-serif));background:var(--sapUiPageFooterBackground,var(--sapPageFooter_Background,var(--sapBaseColor,var(--sapPrimary3,#fff))));border-top:1px solid var(--sapUiPageFooterBorderColor,#d9d9d9);color:var(--sapUiPageFooterTextColor,var(--sapPageFooter_TextColor,#32363a))}.sapMPopup .sapMPopupContent{overflow:auto;position:relative;box-sizing:border-box;background-color:var(--sapUiGroupContentBackground,var(--sapGroup_ContentBackground,var(--sapBaseColor,var(--sapPrimary3,#fff))));border-radius:.25rem}.sapMPopup .sapMPopupContent,.sapMPopup .sapMPopupFooter{border-bottom-left-radius:.25rem;border-bottom-right-radius:.25rem}.sapMPopup .sapMPopupScroll{vertical-align:middle;box-sizing:border-box;padding:var(--_ui5_popover_content_padding,.4375em)}.sapUiBLy{background-color:#000;opacity:.6;filter:alpha(opacity=60);top:0;left:0;right:0;bottom:0;position:fixed;outline:0 none}.sapMPopupBlockLayer{visibility:visible}.sapMPopupBlockLayerHidden{display:none}";
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents/dist/Popup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UI5Element = _interopRequireDefault(require("@ui5/webcomponents-base/src/UI5Element.js"));

var _FocusHelper = _interopRequireDefault(require("@ui5/webcomponents-base/src/FocusHelper.js"));

var _Integer = _interopRequireDefault(require("@ui5/webcomponents-base/src/types/Integer.js"));

var _PseudoEvents = require("@ui5/webcomponents-base/src/events/PseudoEvents.js");

var _PopupCss = _interopRequireDefault(require("./themes/Popup.css.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Styles

/**
 * @public
 */
const metadata = {
  "abstract": true,
  slots:
  /** @lends  sap.ui.webcomponents.main.Popup.prototype */
  {
    /**
     * Defines the content of the Web Component.
     * @type {HTMLElement[]}
     * @slot
     * @public
     */
    content: {
      type: HTMLElement,
      multiple: true
    },

    /**
     * Defines the header HTML Element.
     *
     * @type {HTMLElement}
     * @slot
     * @public
     */
    header: {
      type: HTMLElement
    },

    /**
     * Defines the footer HTML Element.
     *
     * @type {HTMLElement}
     * @slot
     * @public
     */
    footer: {
      type: HTMLElement
    }
  },
  properties:
  /** @lends  sap.ui.webcomponents.main.Popup.prototype */
  {
    /**
     * Defines the ID of the HTML Element, which will get the initial focus.
     *
     * @type {string}
     * @defaultvalue: ""
     * @public
     */
    initialFocus: {
      type: String,
      association: true
    },

    /**
     * Defines whether the header is hidden.
     *
     * @type {Boolean}
     * @defaultvalue false
     * @public
     */
    noHeader: {
      type: Boolean
    },

    /**
     * Defines the header text.
     *
     * @type {string}
     * @defaultvalue: ""
     * @public
     */
    headerText: {
      type: String
    },
    _isOpen: {
      type: Boolean
    },
    _zIndex: {
      type: _Integer.default
    },
    _hideBlockLayer: {
      type: Boolean
    }
  },
  events:
  /** @lends  sap.ui.webcomponents.main.Popup.prototype */
  {
    /**
     * Fired before the component is opened.
     *
     * @public
     * @event
     */
    beforeOpen: {},

    /**
     * Fired after the component is opened.
     *
     * @public
     * @event
     */
    afterOpen: {},

    /**
     * Fired before the component is closed.
     *
     * @public
     * @event
     * @param {Boolean} escPressed Indicates that <code>ESC</code> key has triggered the event.
     */
    beforeClose: {
      escPressed: {
        type: Boolean
      }
    },

    /**
     * Fired after the component is closed.
     *
     * @public
     * @event
     */
    afterClose: {}
  }
};
const openedPopups = [];
let currentZIndex = 100;
let isBodyScrollingDisabled = false;
let customBLyBackStyleInserted = false;

function getParentHost(node) {
  while (node && !node.host) {
    node = node.parentNode;
  }

  return node && node.host;
}

function createBLyBackStyle() {
  if (customBLyBackStyleInserted) {
    return;
  }

  customBLyBackStyleInserted = true;
  const stylesheet = document.styleSheets[0];
  stylesheet.insertRule(".sapUiBLyBack {overflow: hidden;position: fixed;width:100%;height: 100%;}", 0);
}

function updateBlockLayers() {
  let popup,
      i,
      hasModal = false;

  for (i = openedPopups.length - 1; i >= 0; i--) {
    popup = openedPopups[i];

    if (hasModal) {
      popup._hideBlockLayer = true;
    } else {
      if (popup.isModal()) {
        // eslint-disable-line
        popup._hideBlockLayer = false;
        hasModal = true;
      }
    }
  }

  updateBodyScrolling(hasModal);
}

function updateBodyScrolling(hasModal) {
  if (isBodyScrollingDisabled === hasModal) {
    return;
  }

  createBLyBackStyle();

  if (hasModal) {
    document.body.style.top = `-${window.pageYOffset}px`;
    document.body.classList.add("sapUiBLyBack");
  } else {
    document.body.classList.remove("sapUiBLyBack");
    window.scrollTo(0, -parseFloat(document.body.style.top));
    document.body.style.top = "";
  }

  isBodyScrollingDisabled = hasModal;
}
/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 * Represents a base class for all popup Web Components.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Popup
 * @extends sap.ui.webcomponents.base.UI5Element
 * @public
 */


class Popup extends _UI5Element.default {
  static get metadata() {
    return metadata;
  }

  static get styles() {
    return _PopupCss.default;
  }

  static getNextZIndex() {
    currentZIndex += 2;
    return currentZIndex;
  }

  static hitTest(popup, event) {
    const indexOf = openedPopups.indexOf(popup);
    let openedPopup;

    for (let i = indexOf; i < openedPopups.length; i++) {
      openedPopup = openedPopups[i];

      if (openedPopup.hitTest(event)) {
        return true;
      }
    }

    return false;
  }

  static hasModalPopup() {
    for (let i = 0; i < openedPopups.length; i++) {
      if (openedPopups[i].isModal()) {
        return true;
      }
    }

    return false;
  }

  constructor() {
    super();
    this._documentKeyDownHandler = this.documentKeyDown.bind(this);
  }

  isTopPopup() {
    return openedPopups.indexOf(this) === openedPopups.length - 1;
  }

  isModal() {
    return true;
  }

  documentKeyDown(event) {
    if ((0, _PseudoEvents.isEscape)(event) && this.isTopPopup()) {
      this.escPressed = true;
      this.close();
    }
  }

  getPopupDomRef() {
    const domRef = this.getDomRef();
    return domRef && domRef.querySelector(".sapMPopup");
  }

  hitTest(_event) {
    return true;
  }

  open() {
    this.fireEvent("beforeOpen", {});
    this._isFirstTimeRendered = false;
    this._zIndex = Popup.getNextZIndex();
    openedPopups.push(this);
    updateBlockLayers();
    document.addEventListener("keydown", this._documentKeyDownHandler, true);
  }

  close() {
    this.fireEvent("beforeClose", {
      escPressed: this.escPressed
    }, true);
    this.escPressed = false;
    document.removeEventListener("keydown", this._documentKeyDownHandler, true);
    const index = openedPopups.indexOf(this);
    openedPopups.splice(index, 1);
    updateBlockLayers();
  }

  initInitialFocus() {
    const initialFocus = this.initialFocus;
    let initialFocusDomRef = this.initialFocus;

    if (initialFocus && typeof initialFocus === "string") {
      initialFocusDomRef = document.getElementById(initialFocus);

      if (!initialFocusDomRef) {
        const parentHost = getParentHost(this);

        if (parentHost) {
          initialFocusDomRef = parentHost.shadowRoot.querySelector(`#${initialFocus}`);
        }
      }
    }

    this._initialFocusDomRef = initialFocusDomRef;
  }

  onFirstTimeAfterRendering() {
    if (this.isTopPopup()) {
      this.initInitialFocus();
      this.setInitialFocus(this.getPopupDomRef());
    }

    this.fireEvent("afterOpen", {});
  }

  onAfterRendering() {
    if (!this._isOpen) {
      return;
    }

    if (!this._isFirstTimeRendered) {
      this.onFirstTimeAfterRendering();
      this._isFirstTimeRendered = true;
    }
  }

  setInitialFocus(container) {
    if (this._initialFocusDomRef) {
      if (this._initialFocusDomRef !== document.activeElement) {
        this._initialFocusDomRef.focus();
      }

      return;
    }

    if (!container) {
      return;
    }

    const focusableElement = _FocusHelper.default.findFirstFocusableElement(container);

    if (focusableElement) {
      focusableElement.focus();
    } else {
      container.focus();
    }
  }

  onfocusin(event) {
    this.preserveFocus(event, this.getPopupDomRef());
  }

  preserveFocus(event, container) {
    if (!this.isTopPopup()) {
      return;
    }

    let target = event.target;

    while (target.shadowRoot && target.shadowRoot.activeElement) {
      target = target.shadowRoot.activeElement;
    }

    let focusableElement;
    let isSpecialCase = false;

    switch (target.id) {
      case `${this._id}-firstfe`:
        focusableElement = _FocusHelper.default.findLastFocusableElement(container);
        isSpecialCase = true;
        break;

      case `${this._id}-lastfe`:
        focusableElement = _FocusHelper.default.findFirstFocusableElement(container);
        isSpecialCase = true;
        break;

      case `${this._id}-blocklayer`:
        focusableElement = this._currentFocusedElement || _FocusHelper.default.findFirstFocusableElement(container);
        isSpecialCase = true;
        break;
    }

    if (focusableElement) {
      focusableElement.focus();
    } else if (isSpecialCase) {
      container.focus();
    }

    this._currentFocusedElement = focusableElement || document.activeElement;
  }

  storeCurrentFocus() {
    let element = document.activeElement;

    while (element.shadowRoot && element.shadowRoot.activeElement) {
      element = element.shadowRoot.activeElement;
    }

    this._lastFocusableElement = element;
  }

  resetFocus() {
    if (!this._lastFocusableElement) {
      return;
    }

    const lastFocusableElement = this._lastFocusableElement;

    if (lastFocusableElement) {
      lastFocusableElement.focus();
    }

    this._lastFocusableElement = null;
  }

}

var _default = Popup;
exports.default = _default;
},{"@ui5/webcomponents-base/src/UI5Element.js":"../node_modules/@ui5/webcomponents-base/src/UI5Element.js","@ui5/webcomponents-base/src/FocusHelper.js":"../node_modules/@ui5/webcomponents-base/src/FocusHelper.js","@ui5/webcomponents-base/src/types/Integer.js":"../node_modules/@ui5/webcomponents-base/src/types/Integer.js","@ui5/webcomponents-base/src/events/PseudoEvents.js":"../node_modules/@ui5/webcomponents-base/src/events/PseudoEvents.js","./themes/Popup.css.js":"../node_modules/@ui5/webcomponents/dist/themes/Popup.css.js"}],"../node_modules/@ui5/webcomponents/dist/build/compiled/PopoverTemplate.lit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ifDefined = _interopRequireDefault(require("@ui5/webcomponents-base/src/renderer/ifDefined.js"));

var _LitRenderer = require("@ui5/webcomponents-base/src/renderer/LitRenderer.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-unused-vars: 0 */
const block0 = context => {
  return _LitRenderer.html`<span class="${(0, _ifDefined.default)((0, _LitRenderer.classMap)(context.classes.frame))}" @focusin="${(0, _ifDefined.default)(context.onfocusin)}"><span id="${(0, _ifDefined.default)(context._id)}-firstfe" tabindex="0" @focusin=${(0, _ifDefined.default)(context.focusHelper.forwardToLast)}></span><div style="${(0, _ifDefined.default)((0, _LitRenderer.styleMap)(context.styles.main))}" role="dialog" aria-labelledby="${(0, _ifDefined.default)(context.headerId)}" tabindex="-1" class="${(0, _ifDefined.default)((0, _LitRenderer.classMap)(context.classes.main))}">			${!context.noHeader ? block1(context) : undefined}<div id="${(0, _ifDefined.default)(context._id)}-content" role="application" style="${(0, _ifDefined.default)((0, _LitRenderer.styleMap)(context.styles.content))}" class="sapMPopupContent"><div class="sapMPopupScroll"><slot></slot></div></div>			${context.footer ? block4(context) : undefined}<span id="${(0, _ifDefined.default)(context._id)}-arrow" style="${(0, _ifDefined.default)((0, _LitRenderer.styleMap)(context.styles.arrow))}" class="${(0, _ifDefined.default)((0, _LitRenderer.classMap)(context.classes.arrow))}"></span></div><span id="${(0, _ifDefined.default)(context._id)}-lastfe" tabindex="0" @focusin=${(0, _ifDefined.default)(context.focusHelper.forwardToFirst)}></span><div tabindex="0" id="${(0, _ifDefined.default)(context._id)}-blocklayer" style="${(0, _ifDefined.default)((0, _LitRenderer.styleMap)(context.styles.blockLayer))}" class="${(0, _ifDefined.default)((0, _LitRenderer.classMap)(context.classes.blockLayer))}"></div></span>`;
};

const block1 = context => {
  return _LitRenderer.html`<header>			${context.header ? block2(context) : block3(context)}</header>	`;
};

const block2 = context => {
  return _LitRenderer.html`<div role="toolbar" class="sapMPopupHeader"><slot name="header"></slot></div>			`;
};

const block3 = context => {
  return _LitRenderer.html`<h2 role="toolbar" class="sapMPopupHeader sapMPopupHeaderText">${(0, _ifDefined.default)(context.headerText)}</h2>			`;
};

const block4 = context => {
  return _LitRenderer.html`<footer><div class="sapMPopupFooter"><slot name="footer"></slot></div></footer>	`;
};

var _default = block0;
exports.default = _default;
},{"@ui5/webcomponents-base/src/renderer/ifDefined.js":"../node_modules/@ui5/webcomponents-base/src/renderer/ifDefined.js","@ui5/webcomponents-base/src/renderer/LitRenderer.js":"../node_modules/@ui5/webcomponents-base/src/renderer/LitRenderer.js"}],"../node_modules/@ui5/webcomponents/dist/themes/Popover.css.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = ".sapMPopover{position:fixed;z-index:10}.sapMPopoverArr{pointer-events:none;display:block;width:1rem;height:1rem;position:absolute;overflow:hidden}.sapMPopoverArr:after{content:\" \";display:block;width:.7rem;height:.7rem;background-color:var(--sapUiGroupContentBackground,var(--sapGroup_ContentBackground,var(--sapBaseColor,var(--sapPrimary3,#fff))));transform:rotate(-45deg)}.sapMPopoverArrUp{left:calc(50% - .5625rem);top:-.5rem;height:.5625rem}.sapMPopoverArrUp:after{margin:.1875rem 0 0 .1875rem;box-shadow:-.375rem .375rem .75rem 0 var(--_ui5_popover_arrow_shadow_color,rgba(0,0,0,.3)),0 0 .125rem 0 var(--_ui5_popover_arrow_shadow_color,rgba(0,0,0,.3))}.sapMPopoverArrRight{top:calc(50% - .5625rem);right:-.5625rem;width:.5625rem}.sapMPopoverArrRight:after{margin:.1875rem 0 0 -.375rem;box-shadow:-.375rem -.375rem .75rem 0 var(--_ui5_popover_arrow_shadow_color,rgba(0,0,0,.3)),0 0 .125rem 0 var(--_ui5_popover_arrow_shadow_color,rgba(0,0,0,.3))}.sapMPopoverArrDown{left:calc(50% - .5625rem);height:.5625rem}.sapMPopoverArrDown:after{margin:-.375rem 0 0 .125rem;box-shadow:.375rem -.375rem .75rem 0 var(--_ui5_popover_arrow_shadow_color,rgba(0,0,0,.3)),0 0 .125rem 0 var(--_ui5_popover_arrow_shadow_color,rgba(0,0,0,.3))}.sapMPopoverArrLeft{left:-.5625rem;top:calc(50% - .5625rem);width:.5625rem;height:1rem}.sapMPopoverArrLeft:after{margin:.125rem 0 0 .25rem;box-shadow:.375rem .375rem .75rem 0 var(--_ui5_popover_arrow_shadow_color,rgba(0,0,0,.3)),0 0 .125rem 0 var(--_ui5_popover_arrow_shadow_color,rgba(0,0,0,.3))}.sapMPopoverArr.sapMPopoverArrHidden{display:none}.sapMPopover{transform:translateZ(0)}";
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents/dist/Popover.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _LitRenderer = _interopRequireDefault(require("@ui5/webcomponents-base/src/renderer/LitRenderer.js"));

var _RenderScheduler = _interopRequireDefault(require("@ui5/webcomponents-base/src/RenderScheduler.js"));

var _Integer = _interopRequireDefault(require("@ui5/webcomponents-base/src/types/Integer.js"));

var _FocusHelper = _interopRequireDefault(require("@ui5/webcomponents-base/src/FocusHelper.js"));

var _PopoverPlacementType = _interopRequireDefault(require("./types/PopoverPlacementType.js"));

var _PopoverVerticalAlign = _interopRequireDefault(require("./types/PopoverVerticalAlign.js"));

var _PopoverHorizontalAlign = _interopRequireDefault(require("./types/PopoverHorizontalAlign.js"));

var _Popup = _interopRequireDefault(require("./Popup.js"));

var _PopoverTemplateLit = _interopRequireDefault(require("./build/compiled/PopoverTemplate.lit.js"));

var _PopoverCss = _interopRequireDefault(require("./themes/Popover.css.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Template
// Styles

/**
 * @public
 */
const metadata = {
  tag: "ui5-popover",
  properties:
  /** @lends sap.ui.webcomponents.main.Popover.prototype */
  {
    /**
     * Determines on which side the <code>ui5-popover</code> is placed at.
     *
     * @type {PopoverPlacementType}
     * @defaultvalue "Right"
     * @public
     */
    placementType: {
      type: _PopoverPlacementType.default,
      defaultValue: _PopoverPlacementType.default.Right
    },

    /**
     * Determines the horizontal alignment of the <code>ui5-popover</code>.
     *
     * @type {PopoverHorizontalAlign}
     * @defaultvalue "Center"
     * @public
     */
    horizontalAlign: {
      type: _PopoverHorizontalAlign.default,
      defaultValue: _PopoverHorizontalAlign.default.Center
    },

    /**
     * Determines the vertical alignment of the <code>ui5-popover</code>.
     *
     * @type {PopoverVerticalAlign}
     * @defaultvalue "Center"
     * @public
     */
    verticalAlign: {
      type: _PopoverVerticalAlign.default,
      defaultValue: _PopoverVerticalAlign.default.Center
    },

    /**
     * Defines whether the <code>ui5-popover</code> should close when
     * clicking/tapping outside of the popover.
     * If enabled, it blocks any interaction with the background.
     *
     * @type {boolean}
     * @defaultvalue false
     * @public
     */
    modal: {
      type: Boolean
    },

    /**
     * Determines whether the <code>ui5-popover</code> arrow is hidden.
     *
     * @type {boolean}
     * @defaultvalue false
     * @public
     */
    noArrow: {
      type: Boolean
    },

    /**
     * Determines whether the <code>ui5-popover</code> would close upon user scroll.
     *
     * @type {boolean}
     * @defaultvalue false
     * @public
     */
    stayOpenOnScroll: {
      type: Boolean
    },

    /**
     * Determines if there is no enough space, the <code>ui5-popover</code> can be placed
     * over the target.
     *
     * @type {boolean}
     * @defaultvalue false
     * @public
     */
    allowTargetOverlap: {
      type: Boolean
    },
    _left: {
      type: _Integer.default
    },
    _top: {
      type: _Integer.default
    },
    _width: {
      type: String
    },
    _height: {
      type: String
    },
    _maxContentHeight: {
      type: _Integer.default
    },
    _arrowTranslateX: {
      type: _Integer.default,
      defaultValue: 0
    },
    _arrowTranslateY: {
      type: _Integer.default,
      defaultValue: 0
    },
    _actualPlacementType: {
      type: _PopoverPlacementType.default,
      defaultValue: _PopoverPlacementType.default.Right
    },
    _focusElementsHandlers: {
      type: Object
    }
  }
};
const diffTolerance = 32;
const dockInterval = 200;
const arrowSize = 8;
/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-popover</code> component displays additional information for an object
 * in a compact way and without leaving the page.
 * The Popover can contain various UI elements, such as fields, tables, images, and charts.
 * It can also include actions in the footer.
 *
 * <h3>Structure</h3>
 *
 * The popover has three main areas:
 * <ul>
 * <li>Header (optional) - with a back button and a title</li>
 * <li>Content - holds all the Web Component</li>
 * <li>Footer (optional) - with additional action buttons</li>
 * </ul>
 *
 * <b>Note:</b> The <code>ui5-popover</code> is closed when the user clicks
 * or taps outside the popover
 * or selects an action within the popover. You can prevent this with the
 * <code>modal</code> property.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Popover";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Popover
 * @extends Popup
 * @tagname ui5-popover
 * @public
 */

class Popover extends _Popup.default {
  static get metadata() {
    return metadata;
  }

  static get render() {
    return _LitRenderer.default;
  }

  static get template() {
    return _PopoverTemplateLit.default;
  }

  static get styles() {
    return [_Popup.default.styles, _PopoverCss.default];
  }

  constructor() {
    super();
    this._documentMouseDownHandler = this.documentMouseDown.bind(this);
    const that = this;
    this._focusElementsHandlers = {
      forwardToFirst: event => {
        const firstFocusable = _FocusHelper.default.findFirstFocusableElement(that);

        if (firstFocusable) {
          firstFocusable.focus();
        }
      },
      forwardToLast: event => {
        const lastFocusable = _FocusHelper.default.findLastFocusableElement(that);

        if (lastFocusable) {
          lastFocusable.focus();
        }
      }
    };
  }

  isModal() {
    return this.modal;
  }

  static isInRect(x, y, rect) {
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  }

  static getClientRect(domRef) {
    const rect = domRef.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(domRef);
    const offsetLeft = parseFloat(computedStyle.paddingLeft);
    const offsetRight = parseFloat(computedStyle.paddingRight);
    const offsetTop = parseFloat(computedStyle.paddingTop);
    const offsetBottom = parseFloat(computedStyle.paddingBottom);
    return {
      left: rect.left + offsetLeft,
      right: rect.right - offsetRight,
      top: rect.top + offsetTop,
      bottom: rect.bottom - offsetBottom,
      width: rect.width - offsetLeft - offsetRight,
      height: rect.height - offsetTop - offsetBottom
    };
  }

  hitTest(event) {
    const domRef = this.getPopupDomRef();
    const rect = domRef.getBoundingClientRect();
    let x, y;

    if (event.touches) {
      const touch = event.touches[0];
      x = touch.clientX;
      y = touch.clientY;
    } else {
      x = event.clientX;
      y = event.clientY;
    } // don't close the popover if the "initial focus" is outside the popover
    // and the user click/touch on it


    if (this.initialFocus && this._initialFocusDomRef) {
      const initialFocusRect = this._initialFocusDomRef.getBoundingClientRect();

      if (Popover.isInRect(x, y, initialFocusRect)) {
        return true;
      }
    }

    if (this._targetElement) {
      const targetElementRect = this._targetElement.getBoundingClientRect();

      if (Popover.isInRect(x, y, targetElementRect)) {
        return true;
      }
    }

    return Popover.isInRect(x, y, rect);
  }

  documentMouseDown(event) {
    if (!this.modal && !_Popup.default.hitTest(this, event)) {
      this.close();
    }
  }

  checkDocking() {
    if (!this.stayOpenOnScroll && this.hasTargetElementMoved()) {
      this.close();
    }

    const popoverDomRef = this.getPopupDomRef();
    const popoverSize = {
      width: popoverDomRef.offsetWidth,
      height: popoverDomRef.offsetHeight
    };
    const targetRect = Popover.getClientRect(this._targetElement);
    this.setLocation(targetRect, popoverSize);
  }

  getVerticalLeft(targetRect, popoverSize) {
    let left;

    switch (this.horizontalAlign) {
      case _PopoverHorizontalAlign.default.Center:
      case _PopoverHorizontalAlign.default.Stretch:
        left = targetRect.left - (popoverSize.width - targetRect.width) / 2;
        break;

      case _PopoverHorizontalAlign.default.Left:
        left = targetRect.left;
        break;

      case _PopoverHorizontalAlign.default.Right:
        left = targetRect.right - popoverSize.width;
        break;
    }

    return left;
  }

  getHorizontalTop(targetRect, popoverSize) {
    let top;

    switch (this.verticalAlign) {
      case _PopoverVerticalAlign.default.Center:
      case _PopoverVerticalAlign.default.Stretch:
        top = targetRect.top - (popoverSize.height - targetRect.height) / 2;
        break;

      case _PopoverVerticalAlign.default.Top:
        top = targetRect.top;
        break;

      case _PopoverVerticalAlign.default.Bottom:
        top = targetRect.bottom - popoverSize.height;
        break;
    }

    return top;
  }

  getActualPlacementType(targetRect, popoverSize) {
    const placementType = this.placementType;
    let actualPlacementType = placementType;
    const clientWidth = document.documentElement.clientWidth;
    const clientHeight = document.documentElement.clientHeight;

    switch (placementType) {
      case _PopoverPlacementType.default.Top:
        if (targetRect.top < popoverSize.height && targetRect.top < clientHeight - targetRect.bottom) {
          actualPlacementType = _PopoverPlacementType.default.Bottom;
        }

        break;

      case _PopoverPlacementType.default.Bottom:
        if (clientHeight - targetRect.bottom < popoverSize.height && clientHeight - targetRect.bottom < targetRect.top) {
          actualPlacementType = _PopoverPlacementType.default.Top;
        }

        break;

      case _PopoverPlacementType.default.Left:
        if (targetRect.left < popoverSize.width && targetRect.left < clientWidth - targetRect.right) {
          actualPlacementType = _PopoverPlacementType.default.Right;
        }

        break;

      case _PopoverPlacementType.default.Right:
        if (clientWidth - targetRect.right < popoverSize.width && clientWidth - targetRect.right < targetRect.left) {
          actualPlacementType = _PopoverPlacementType.default.Left;
        }

        break;
    }

    this._actualPlacementType = actualPlacementType;
    return actualPlacementType;
  }

  setLocation(targetRect, popoverSize) {
    let left = 0;
    let top = 0;
    const allowTargetOverlap = this.allowTargetOverlap;
    const clientWidth = document.documentElement.clientWidth;
    const clientHeight = document.documentElement.clientHeight;
    let maxHeight = clientHeight;
    let width = "";
    let height = "";
    const placementType = this.getActualPlacementType(targetRect, popoverSize);
    const isVertical = placementType === _PopoverPlacementType.default.Top || placementType === _PopoverPlacementType.default.Bottom;

    if (this.horizontalAlign === _PopoverHorizontalAlign.default.Stretch && isVertical) {
      popoverSize.width = targetRect.width;
      width = `${targetRect.width}px`;
    } else if (this.verticalAlign === _PopoverVerticalAlign.default.Stretch && !isVertical) {
      popoverSize.height = targetRect.height;
      height = `${targetRect.height}px`;
    }

    this._width = width;
    this._height = height;
    const arrowOffset = this.noArrow ? 0 : arrowSize; // calc popover positions

    switch (placementType) {
      case _PopoverPlacementType.default.Top:
        left = this.getVerticalLeft(targetRect, popoverSize);
        top = Math.max(targetRect.top - popoverSize.height - arrowOffset, 0);

        if (!allowTargetOverlap) {
          maxHeight = targetRect.top - arrowOffset;
        }

        break;

      case _PopoverPlacementType.default.Bottom:
        left = this.getVerticalLeft(targetRect, popoverSize);

        if (allowTargetOverlap) {
          top = Math.max(Math.min(targetRect.bottom + arrowOffset, clientHeight - popoverSize.height), 0);
        } else {
          top = targetRect.bottom + arrowOffset;
          maxHeight = clientHeight - targetRect.bottom - arrowOffset;
        }

        break;

      case _PopoverPlacementType.default.Left:
        left = Math.max(targetRect.left - popoverSize.width - arrowOffset, 0);
        top = this.getHorizontalTop(targetRect, popoverSize);
        break;

      case _PopoverPlacementType.default.Right:
        if (allowTargetOverlap) {
          left = Math.max(Math.min(targetRect.left + targetRect.width + arrowOffset, clientWidth - popoverSize.width), 0);
        } else {
          left = targetRect.left + targetRect.width + arrowOffset;
        }

        top = this.getHorizontalTop(targetRect, popoverSize);
        break;
    } // correct popover positions


    if (isVertical) {
      if (popoverSize.width > clientWidth || left < 0) {
        left = 0;
      } else if (left + popoverSize.width > clientWidth) {
        left -= left + popoverSize.width - clientWidth;
      }
    } else {
      if (popoverSize.height > clientHeight || top < 0) {
        // eslint-disable-line
        top = 0;
      } else if (top + popoverSize.height > clientHeight) {
        top -= top + popoverSize.height - clientHeight;
      }
    }

    let maxContentHeight = Math.round(maxHeight);

    if (!this.noHeader) {
      const headerDomRef = this.getPopupDomRef().querySelector(".sapMPopupHeader");

      if (headerDomRef) {
        maxContentHeight = Math.round(maxHeight - headerDomRef.offsetHeight);
      }
    }

    this._maxContentHeight = maxContentHeight;
    const arrowTranslateX = isVertical ? targetRect.left + targetRect.width / 2 - left - popoverSize.width / 2 : 0;
    const arrowTranslateY = !isVertical ? targetRect.top + targetRect.height / 2 - top - popoverSize.height / 2 : 0;
    this._arrowTranslateX = Math.round(arrowTranslateX);
    this._arrowTranslateY = Math.round(arrowTranslateY);

    if (this._left === undefined || Math.abs(this._left - left) > 1.5) {
      this._left = Math.round(left);
    }

    if (this._top === undefined || Math.abs(this._top - top) > 1.5) {
      this._top = Math.round(top);
    }
  }
  /**
   * Opens the <code>Popover</code>.
   * @param {object} control This is the component to which the
   * <code>ui5-popover</code> will be placed.
   * The side of the placement depends on the <code>placementType</code> property
   * set in the <code>ui5-popover</code>.
   * @public
   */


  openBy(element) {
    if (this._isOpen) {
      return;
    }

    const cancelled = super.open();

    if (cancelled) {
      return true;
    }

    this.storeCurrentFocus();
    const targetDomRef = element;
    const popoverSize = this.getPopoverSize();
    const targetRect = Popover.getClientRect(targetDomRef);
    this._targetElement = targetDomRef;
    this._targetRect = targetRect;
    this.setLocation(targetRect, popoverSize);
    this._isOpen = true;
    setTimeout(_ => {
      if (this._isOpen) {
        this._dockInterval = setInterval(this.checkDocking.bind(this), dockInterval);
      }
    }, 0);
    setTimeout(_ => {
      if (this._isOpen) {
        document.addEventListener("mousedown", this._documentMouseDownHandler, true);
        document.addEventListener("touchstart", this._documentMouseDownHandler, true);
      }
    }, 0);
  }
  /**
   * Closes the <code>ui5-popover</code>.
   * @public
   */


  close() {
    if (!this._isOpen) {
      return;
    }

    const cancelled = super.close();

    if (cancelled) {
      return;
    }

    this._isOpen = false;
    clearInterval(this._dockInterval);
    document.removeEventListener("mousedown", this._documentMouseDownHandler, true);
    document.removeEventListener("touchstart", this._documentMouseDownHandler, true);
    this.resetFocus();

    _RenderScheduler.default.whenFinished().then(_ => {
      this.fireEvent("afterClose", {});
    });
  }

  getPopoverSize() {
    const popoverFrameDomRef = this.shadowRoot.querySelector(".sapMPopupFrame"); // this.getDomRef();

    const popoverDomRef = popoverFrameDomRef.querySelector(".sapMPopover");
    popoverFrameDomRef.style.visibility = "hidden";
    popoverFrameDomRef.style.display = "block";
    const width = popoverDomRef.offsetWidth;
    const height = popoverDomRef.offsetHeight;
    popoverFrameDomRef.style.display = "";
    popoverFrameDomRef.style.visibility = "visible";
    return {
      width,
      height
    };
  }

  hasTargetElementMoved() {
    const newRect = this._targetElement.getBoundingClientRect();

    const targetRect = this._targetRect;
    return Math.abs(newRect.left - targetRect.left) > diffTolerance || Math.abs(newRect.top - targetRect.top) > diffTolerance;
  }

  get classes() {
    const placementType = this._actualPlacementType;
    return {
      frame: {
        sapMPopupFrame: true,
        sapMPopupFrameOpen: this._isOpen
      },
      main: {
        sapMPopup: true,
        sapMPopover: true
      },
      blockLayer: {
        sapUiBLy: true,
        sapMPopupBlockLayer: true,
        sapMPopupBlockLayerHidden: !this.modal || this._hideBlockLayer
      },
      arrow: {
        sapMPopoverArr: true,
        sapMPopoverArrHidden: this.noArrow,
        sapMPopoverArrLeft: placementType === _PopoverPlacementType.default.Right,
        sapMPopoverArrRight: placementType === _PopoverPlacementType.default.Left,
        sapMPopoverArrUp: placementType === _PopoverPlacementType.default.Bottom,
        sapMPopoverArrDown: placementType === _PopoverPlacementType.default.Top
      }
    };
  }

  get styles() {
    return {
      main: {
        left: `${this._left}px`,
        top: `${this._top}px`,
        width: this._width,
        height: this._height,
        "z-index": this._zIndex + 1
      },
      content: {
        "max-height": `${this._maxContentHeight}px`
      },
      arrow: {
        transform: `translate(${this._arrowTranslateX}px, ${this._arrowTranslateY}px)`
      },
      blockLayer: {
        "z-index": this._zIndex
      }
    };
  }

  get headerId() {
    return this.noHeader ? undefined : `${this._id}-header`;
  }

  get focusHelper() {
    return {
      forwardToLast: this._focusElementsHandlers.forwardToLast,
      forwardToFirst: this._focusElementsHandlers.forwardToFirst
    };
  }

}

Popover.define();
var _default = Popover;
exports.default = _default;
},{"@ui5/webcomponents-base/src/renderer/LitRenderer.js":"../node_modules/@ui5/webcomponents-base/src/renderer/LitRenderer.js","@ui5/webcomponents-base/src/RenderScheduler.js":"../node_modules/@ui5/webcomponents-base/src/RenderScheduler.js","@ui5/webcomponents-base/src/types/Integer.js":"../node_modules/@ui5/webcomponents-base/src/types/Integer.js","@ui5/webcomponents-base/src/FocusHelper.js":"../node_modules/@ui5/webcomponents-base/src/FocusHelper.js","./types/PopoverPlacementType.js":"../node_modules/@ui5/webcomponents/dist/types/PopoverPlacementType.js","./types/PopoverVerticalAlign.js":"../node_modules/@ui5/webcomponents/dist/types/PopoverVerticalAlign.js","./types/PopoverHorizontalAlign.js":"../node_modules/@ui5/webcomponents/dist/types/PopoverHorizontalAlign.js","./Popup.js":"../node_modules/@ui5/webcomponents/dist/Popup.js","./build/compiled/PopoverTemplate.lit.js":"../node_modules/@ui5/webcomponents/dist/build/compiled/PopoverTemplate.lit.js","./themes/Popover.css.js":"../node_modules/@ui5/webcomponents/dist/themes/Popover.css.js"}],"../node_modules/@ui5/webcomponents/dist/RadioButtonGroup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class RadioButtonGroup {
  static hasGroup(groupName) {
    return this.groups.has(groupName);
  }

  static getGroup(groupName) {
    return this.groups.get(groupName);
  }

  static getSelectedRadioFromGroup(groupName) {
    return this.selectedRadios.get(groupName);
  }

  static removeGroup(groupName) {
    this.selectedRadios.delete(groupName);
    return this.groups.delete(groupName);
  }

  static addToGroup(radioBtn, groupName) {
    if (this.hasGroup(groupName)) {
      this.enforceSingleSelection(radioBtn, groupName);
      this.getGroup(groupName).push(radioBtn);
    } else {
      this.createGroup(radioBtn, groupName);
    }
  }

  static removeFromGroup(radioBtn, groupName) {
    if (!this.hasGroup(groupName)) {
      return;
    }

    const group = this.getGroup(groupName);
    const selectedRadio = this.getSelectedRadioFromGroup(groupName); // Remove the radio button from the given group

    group.forEach((_radioBtn, idx, arr) => {
      if (radioBtn._id === _radioBtn._id) {
        return arr.splice(idx, 1);
      }
    });

    if (selectedRadio === radioBtn) {
      this.selectedRadios.set(groupName, null);
    } // Remove the group if it is empty


    if (!group.length) {
      this.removeGroup(groupName);
    }
  }

  static createGroup(radioBtn, groupName) {
    if (radioBtn.selected) {
      this.selectedRadios.set(groupName, radioBtn);
    }

    this.groups.set(groupName, [radioBtn]);
  }

  static selectNextItem(item, groupName) {
    const group = this.getGroup(groupName),
          groupLength = group.length,
          currentItemPosition = group.indexOf(item);

    if (groupLength <= 1) {
      return;
    }

    const nextItemToSelect = this._nextSelectable(currentItemPosition, group);

    this.updateSelectionInGroup(nextItemToSelect, groupName);
  }

  static selectPreviousItem(item, groupName) {
    const group = this.getGroup(groupName),
          groupLength = group.length,
          currentItemPosition = group.indexOf(item);

    if (groupLength <= 1) {
      return;
    }

    const previousItemToSelect = this._previousSelectable(currentItemPosition, group);

    this.updateSelectionInGroup(previousItemToSelect, groupName);
  }

  static selectItem(item, groupName) {
    this.updateSelectionInGroup(item, groupName);
  }

  static updateSelectionInGroup(radioBtnToSelect, groupName) {
    const selectedRadio = this.getSelectedRadioFromGroup(groupName);

    this._deselectRadio(selectedRadio);

    this._selectRadio(radioBtnToSelect);

    this.selectedRadios.set(groupName, radioBtnToSelect);
  }

  static _deselectRadio(radioBtn) {
    if (radioBtn) {
      radioBtn.selected = false;
    }
  }

  static _selectRadio(radioBtn) {
    if (radioBtn) {
      radioBtn.focus();
      radioBtn.selected = true;
      radioBtn._selected = true;
      radioBtn.fireEvent("select");
    }
  }

  static _nextSelectable(pos, group) {
    const groupLength = group.length;
    let nextRadioToSelect = null;

    if (pos === groupLength - 1) {
      if (group[0].disabled || group[0].readonly) {
        return this._nextSelectable(1, group);
      }

      nextRadioToSelect = group[0];
    } else if (group[pos + 1].disabled || group[pos + 1].readonly) {
      return this._nextSelectable(pos + 1, group);
    } else {
      nextRadioToSelect = group[pos + 1];
    }

    return nextRadioToSelect;
  }

  static _previousSelectable(pos, group) {
    const groupLength = group.length;
    let previousRadioToSelect = null;

    if (pos === 0) {
      if (group[groupLength - 1].disabled || group[groupLength - 1].readonly) {
        return this._previousSelectable(groupLength - 1, group);
      }

      previousRadioToSelect = group[groupLength - 1];
    } else if (group[pos - 1].disabled || group[pos - 1].readonly) {
      return this._previousSelectable(pos - 1, group);
    } else {
      previousRadioToSelect = group[pos - 1];
    }

    return previousRadioToSelect;
  }

  static enforceSingleSelection(radioBtn, groupName) {
    const selectedRadio = this.getSelectedRadioFromGroup(groupName);

    if (radioBtn.selected) {
      if (!selectedRadio) {
        this.selectedRadios.set(groupName, radioBtn);
      } else if (radioBtn !== selectedRadio) {
        this._deselectRadio(selectedRadio);

        this.selectedRadios.set(groupName, radioBtn);
      }
    } else if (radioBtn === selectedRadio) {
      this.selectedRadios.set(groupName, null);
    }
  }

  static get groups() {
    if (!this._groups) {
      this._groups = new Map();
    }

    return this._groups;
  }

  static get selectedRadios() {
    if (!this._selectedRadios) {
      this._selectedRadios = new Map();
    }

    return this._selectedRadios;
  }

}

var _default = RadioButtonGroup;
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents/dist/build/compiled/RadioButtonTemplate.lit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ifDefined = _interopRequireDefault(require("@ui5/webcomponents-base/src/renderer/ifDefined.js"));

var _LitRenderer = require("@ui5/webcomponents-base/src/renderer/LitRenderer.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-unused-vars: 0 */
const block0 = context => {
  return _LitRenderer.html`<div class="${(0, _ifDefined.default)((0, _LitRenderer.classMap)(context.classes.main))}"	role="radio"	aria-checked="${(0, _ifDefined.default)(context.selected)}"	aria-readonly="${(0, _ifDefined.default)(context.ariaReadonly)}"	aria-disabled="${(0, _ifDefined.default)(context.ariaDisabled)}"	tabindex="${(0, _ifDefined.default)(context.tabIndex)}"	dir="${(0, _ifDefined.default)(context.rtl)}"><div class='${(0, _ifDefined.default)((0, _LitRenderer.classMap)(context.classes.inner))}'><svg class="sapMRbSvg" focusable="false"><circle class="sapMRbSvgOuter" cx="${(0, _ifDefined.default)(context.circle.x)}" cy="${(0, _ifDefined.default)(context.circle.y)}" r="${(0, _ifDefined.default)(context.circle.rOuter)}" stroke-width="${(0, _ifDefined.default)(context.strokeWidth)}" fill="none" /><circle class="sapMRbSvgInner" cx="${(0, _ifDefined.default)(context.circle.x)}" cy="${(0, _ifDefined.default)(context.circle.y)}" r="${(0, _ifDefined.default)(context.circle.rInner)}" stroke-width="10" /></svg><input type='radio' ?checked="${(0, _ifDefined.default)(context.selected)}" ?readonly="${(0, _ifDefined.default)(context.readonly)}" ?disabled="${(0, _ifDefined.default)(context.disabled)}" name="${(0, _ifDefined.default)(context.name)}" data-sap-no-tab-ref/></div>	${context._label.text ? block1(context) : undefined}</div>`;
};

const block1 = context => {
  return _LitRenderer.html`<ui5-label class="labelInRadioButton">${(0, _ifDefined.default)(context._label.text)}</ui5-label>	`;
};

var _default = block0;
exports.default = _default;
},{"@ui5/webcomponents-base/src/renderer/ifDefined.js":"../node_modules/@ui5/webcomponents-base/src/renderer/ifDefined.js","@ui5/webcomponents-base/src/renderer/LitRenderer.js":"../node_modules/@ui5/webcomponents-base/src/renderer/LitRenderer.js"}],"../node_modules/@ui5/webcomponents/dist/themes/RadioButton.css.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = ":host(ui5-radiobutton:not([hidden])){max-width:100%;text-overflow:ellipsis;overflow:hidden;display:inline-block}ui5-radiobutton:not([hidden]){max-width:100%;text-overflow:ellipsis;overflow:hidden;display:inline-block}.sapMRb{position:relative;display:flex;flex-wrap:nowrap;outline:none;max-width:100%}.sapMRb.sapMRbSel .sapMRbSvgInner{fill:var(--_ui5_radiobutton_selected_fill,var(--sapUiSelected,var(--sapSelectedColor,var(--sapHighlightColor,#0854a0))))}.sapMRb.sapMRbDis{opacity:var(--sapUiContentDisabledOpacity,var(--sapContent_DisabledOpacity,.4))}.sapMRb:not(.sapMRbDis):focus:before{content:\"\";display:block;position:absolute;top:.5rem;bottom:.5rem;left:.5rem;right:.5rem;pointer-events:none;border:var(--_ui5_radiobutton_border_width,1px) dotted var(--sapUiContentFocusColor,var(--sapContent_FocusColor,#000))}.sapMRb.sapMRbHasLabel:focus:before{right:0}.sapMRb.sapMRbRo.sapMRbSel .sapMRbSvgInner{fill:var(--sapUiContentNonInteractiveIconColor,var(--sapContent_NonInteractiveIconColor,var(--sapPrimary7,#6a6d70)))}.sapMRb.sapMRbRo .sapMRbSvgOuter{fill:var(--sapUiFieldReadOnlyBackground,var(--sapField_ReadOnly_Background,hsla(0,0%,94.9%,.5)));stroke:var(--sapUiFieldReadOnlyBorderColor,var(--sapField_ReadOnly_BorderColor,var(--sapField_BorderColor,var(--sapPrimary5,#89919a))))}.sapMRb.sapMRbErr.sapMRbSel .sapMRbSvgInner{fill:var(--_ui5_radiobutton_selected_error_fill,var(--sapUiFieldInvalidColor,var(--sapField_InvalidColor,var(--sapErrorBorderColor,var(--sapNegativeColor,#b00)))))}.sapMRb.sapMRbErr .sapMRbSvgOuter,.sapMRb.sapMRbErr:hover .sapMRbInner.sapMRbHoverable:hover .sapMRbSvgOuter{stroke:var(--sapUiFieldInvalidColor,var(--sapField_InvalidColor,var(--sapErrorBorderColor,var(--sapNegativeColor,#b00))));fill:var(--sapUiFieldInvalidBackground,var(--sapField_InvalidBackground,var(--sapField_Background,var(--sapBaseColor,var(--sapPrimary3,#fff)))))}.sapMRb.sapMRbWarn.sapMRbSel .sapMRbSvgInner{fill:var(--_ui5_radiobutton_selected_warning_fill,var(--sapUiFieldWarningColorDarken100,#000))}.sapMRb.sapMRbWarn .sapMRbSvgOuter,.sapMRb.sapMRbWarn:hover .sapMRbInner.sapMRbHoverable:hover .sapMRbSvgOuter{stroke:var(--sapUiFieldWarningColor,var(--sapField_WarningColor,var(--sapWarningBorderColor,var(--sapCriticalColor,#e9730c))));fill:var(--sapUiFieldWarningBackground,var(--sapField_WarningBackground,var(--sapField_Background,var(--sapBaseColor,var(--sapPrimary3,#fff)))))}.sapMRb.sapMRbErr,.sapMRb.sapMRbWarn{stroke-dasharray:var(--_ui5_radiobutton_warning_error_border_dash,0)}.sapMRb .sapMRbInner{width:2.75rem;height:2.75rem;font-size:1rem;pointer-events:none;vertical-align:top;display:inline-block}.sapMRb .sapMRbInner:focus{outline:none}.sapMRb:not(.sapMRbWarn):not(.sapMRbErr):hover .sapMRbHoverable .sapMRbSvgOuter{fill:var(--_ui5_radiobutton_hover_fill,var(--sapUiFieldHoverBackground,var(--sapField_Hover_Background,var(--sapField_Background,var(--sapBaseColor,var(--sapPrimary3,#fff))))));stroke:var(--sapUiFieldHoverBorderColor,var(--sapField_Hover_BorderColor,var(--sapHighlightColor,#0854a0)))}.sapMRb .sapMRbInner input{margin:0;visibility:hidden;width:0}.sapMRb ui5-label.labelInRadioButton{width:calc(100% - 2.75rem);padding-right:1px;vertical-align:top;height:2.75rem;line-height:2.75rem;cursor:default;max-width:100%;text-overflow:ellipsis;overflow:hidden;pointer-events:none}.sapMRbSvg{height:2.75rem;width:2.75rem;pointer-events:none}.sapMRbSvg .sapMRbSvgOuter{stroke:var(--sapUiFieldBorderColor,var(--sapField_BorderColor,var(--sapPrimary5,#89919a)))}.sapMRbSvg .sapMRbSvgInner{fill:none}.sapUiSizeCompact.sapMRb{height:2rem}.sapUiSizeCompact.sapMRb:focus:before{top:.375rem;bottom:.375rem;left:.375rem;right:.325rem}.sapUiSizeCompact.sapMRb.sapMRbHasLabel:focus:before{right:0}.sapUiSizeCompact.sapMRb .sapMRbInner{width:2rem;height:2rem;display:flex;align-items:center;justify-content:center}.sapUiSizeCompact.sapMRb .sapMRbInner .sapMRbSvg{height:2rem;width:2rem;line-height:2rem}.sapUiSizeCompact.sapMRb ui5-label.labelInRadioButton{line-height:2rem;height:2rem;width:calc(100% - 2rem + 1px)}[dir=rtl].sapMRb.sapMRbHasLabel:focus:before{left:0;right:.5rem}span[dir=rtl].sapUiSizeCompact.sapMRb.sapMRbHasLabel:focus:before{left:0;right:.375rem}:host(ui5-radiobutton.singleSelectionRadioButton) .sapMRb .sapMRbInner .sapMRbSvgOuter{fill:var(--sapUiListBackground,var(--sapList_Background,var(--sapBaseColor,var(--sapPrimary3,#fff))))}ui5-radiobutton.singleSelectionRadioButton .sapMRb .sapMRbInner .sapMRbSvgOuter{fill:var(--sapUiListBackground,var(--sapList_Background,var(--sapBaseColor,var(--sapPrimary3,#fff))))}";
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents/dist/RadioButton.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Device = require("@ui5/webcomponents-core/dist/sap/ui/Device.js");

var _Configuration = require("@ui5/webcomponents-base/src/Configuration.js");

var _getEffectiveRTL = _interopRequireDefault(require("@ui5/webcomponents-base/src/util/getEffectiveRTL.js"));

var _FeaturesRegistry = require("@ui5/webcomponents-base/src/FeaturesRegistry.js");

var _UI5Element = _interopRequireDefault(require("@ui5/webcomponents-base/src/UI5Element.js"));

var _LitRenderer = _interopRequireDefault(require("@ui5/webcomponents-base/src/renderer/LitRenderer.js"));

var _ValueState = _interopRequireDefault(require("@ui5/webcomponents-base/src/types/ValueState.js"));

var _PseudoEvents = require("@ui5/webcomponents-base/src/events/PseudoEvents.js");

var _RadioButtonGroup = _interopRequireDefault(require("./RadioButtonGroup.js"));

var _RadioButtonTemplateLit = _interopRequireDefault(require("./build/compiled/RadioButtonTemplate.lit.js"));

var _RadioButtonCss = _interopRequireDefault(require("./themes/RadioButton.css.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Template
// Styles

/**
 * @public
 */
const metadata = {
  tag: "ui5-radiobutton",
  properties:
  /** @lends sap.ui.webcomponents.main.RadioButton.prototype */
  {
    /**
     * Determines whether the <code>ui5-radiobutton</code> is disabled.
     * <br><br>
     * <b>Note:</b> A disabled <code>ui5-radiobutton</code> is completely uninteractive.
     *
     * @type {boolean}
     * @defaultvalue false
     * @public
     */
    disabled: {
      type: Boolean
    },

    /**
     * Determines whether the <code>ui5-radiobutton</code> is read-only.
     * <br><br>
     * <b>Note:</b> A read-only <code>ui5-radiobutton</code> is not editable,
     * but still provides visual feedback upon user interaction.
     *
     * @type {boolean}
     * @defaultvalue false
     * @public
     */
    readonly: {
      type: Boolean
    },

    /**
     * Determines whether the <code>ui5-radiobutton</code> is selected or not.
     * <br><br>
     * <b>Note:</b> The property value can be changed with user interaction,
     * either by cliking/tapping on the <code>ui5-radiobutton</code>,
     * or by using the Space or Enter key.
     *
     * @type {boolean}
     * @defaultvalue false
     * @public
     */
    selected: {
      type: Boolean
    },

    /**
     * Defines the text of the <code>ui5-radiobutton</code>.
     *
     * @type  {string}
     * @public
     */
    text: {
      type: String
    },

    /**
     * Defines the value state of the <code>ui5-radiobutton</code>.
     * Available options are <code>Warning</code>, <code>Error</code>, and
     * <code>None</code> (by default).
     * <br><br>
     * <b>Note:</b> Using the value states affects the visual appearance of
     * the <code>ui5-radiobutton</code>.
     *
     * @type {string}
     * @defaultvalue "None"
     * @public
     */
    valueState: {
      defaultValue: _ValueState.default.None,
      type: _ValueState.default
    },

    /**
     * Defines the name of the <code>ui5-radiobutton</code>.
     * Radio buttons with the same <code>name</code> will form a radio button group.
     * <br/><b>Note:</b>
     * The selection can be changed with <code>ARROW_UP/DOWN</code> and <code>ARROW_LEFT/RIGHT</code> keys between radios in same group.
     * <br/><b>Note:</b>
     * Only one radio button can be selected per group.
     * <br/>
     * <b>Important:</b> For the <code>name</code> property to have effect when submitting forms, you must add the following import to your project:
     * <code>import "@ui5/webcomponents/dist/InputElementsFormSupport.js";</code>
     *
     * <b>Note:</b> When set, a native <code>input</code> HTML element
     * will be created inside the <code>ui5-radiobutton</code> so that it can be submitted as
     * part of an HTML form.
     *
     * @type {string}
     * @defaultvalue: ""
     * @public
     */
    name: {
      type: String
    },

    /**
     * Defines the form value of the <code>ui5-radiobutton</code>.
     * When a form with a radio button group is submitted, the group's value
     * will be the value of the currently selected radio button.
     * <br/>
     * <b>Important:</b> For the <code>value</code> property to have effect, you must add the following import to your project:
     * <code>import "@ui5/webcomponents/dist/InputElementsFormSupport.js";</code>
     *
     * @type {string}
     * @defaultvalue: ""
     * @public
     */
    value: {
      type: String
    },
    _label: {
      type: Object
    }
  },
  events:
  /** @lends sap.ui.webcomponents.main.RadioButton.prototype */
  {
    /**
     * Fired when the <code>ui5-radiobutton</code> selected state changes.
     *
     * @event
     * @public
     */
    select: {}
  }
};
const SVGConfig = {
  "compact": {
    x: 16,
    y: 16,
    rInner: 3,
    rOuter: 8
  },
  "default": {
    x: 22,
    y: 22,
    rInner: 5,
    rOuter: 11
  }
};
/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-radibutton</code> component enables users to select a single option from a set of options.
 * When a <code>ui5-radiobutton</code> is selected by the user, the
 * <code>select</code> event is fired.
 * When a <code>ui5-radiobutton</code> that is within a group is selected, the one
 * that was previously selected gets automatically deselected. You can group radio buttons by using the <code>name</code> property.
 * <br/>
 * Note: if <code>ui5-radiobutton</code> is not part of a group, it can be selected once, but can not be deselected back.
 *
 * <h3>Keyboard Handling</h3>
 *
 * Once the <code>ui5-radiobutton</code> is on focus, it might be selected by pressing the Space and Enter keys.
 * <br/>
 * The Arrow Down/Arrow Up and Arrow Left/Arrow Right keys can be used to change selection between next/previous radio buttons in one group,
 * while TAB and SHIFT + TAB can be used to enter or leave the radio button group.
 * <br/>
 * Note: On entering radio button group, the focus goes to the currently selected radio button.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/RadioButton";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.RadioButton
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-radiobutton
 * @public
 */

class RadioButton extends _UI5Element.default {
  static get metadata() {
    return metadata;
  }

  static get render() {
    return _LitRenderer.default;
  }

  static get template() {
    return _RadioButtonTemplateLit.default;
  }

  static get styles() {
    return _RadioButtonCss.default;
  }

  constructor() {
    super();
    this._label = {};
  }

  onBeforeRendering() {
    this.syncLabel();
    this.syncGroup();

    this._enableFormSupport();
  }

  syncLabel() {
    this._label = Object.assign({}, this._label);
    this._label.text = this.text;
  }

  syncGroup() {
    const oldGroup = this._name;
    const currentGroup = this.name;

    if (currentGroup !== oldGroup) {
      if (oldGroup) {
        // remove the control from the previous group
        _RadioButtonGroup.default.removeFromGroup(this, oldGroup);
      }

      if (currentGroup) {
        // add the control to the existing group
        _RadioButtonGroup.default.addToGroup(this, currentGroup);
      }
    } else if (currentGroup) {
      _RadioButtonGroup.default.enforceSingleSelection(this, currentGroup);
    }

    this._name = this.name;
  }

  _enableFormSupport() {
    const FormSupport = (0, _FeaturesRegistry.getFeature)("FormSupport");

    if (FormSupport) {
      FormSupport.syncNativeHiddenInput(this, (element, nativeInput) => {
        nativeInput.disabled = element.disabled || !element.selected;
        nativeInput.value = element.selected ? element.value : "";
      });
    } else if (this.value) {
      console.warn(`In order for the "value" property to have effect, you should also: import "@ui5/webcomponents/dist/InputElementsFormSupport.js";`); // eslint-disable-line
    }
  }

  onclick() {
    return this.toggle();
  }

  _handleDown(event) {
    const currentGroup = this.name;

    if (!currentGroup) {
      return;
    }

    event.preventDefault();

    _RadioButtonGroup.default.selectNextItem(this, currentGroup);
  }

  _handleUp(event) {
    const currentGroup = this.name;

    if (!currentGroup) {
      return;
    }

    event.preventDefault();

    _RadioButtonGroup.default.selectPreviousItem(this, currentGroup);
  }

  onkeydown(event) {
    if ((0, _PseudoEvents.isSpace)(event)) {
      return event.preventDefault();
    }

    if ((0, _PseudoEvents.isEnter)(event)) {
      return this.toggle();
    }

    if ((0, _PseudoEvents.isDown)(event) || (0, _PseudoEvents.isRight)(event)) {
      this._handleDown(event);
    }

    if ((0, _PseudoEvents.isUp)(event) || (0, _PseudoEvents.isLeft)(event)) {
      this._handleUp(event);
    }
  }

  onkeyup(event) {
    if ((0, _PseudoEvents.isSpace)(event)) {
      this.toggle();
    }
  }

  toggle() {
    if (!this.canToggle()) {
      return this;
    }

    if (!this.name) {
      this.selected = !this.selected;
      this.fireEvent("select");
      return this;
    }

    _RadioButtonGroup.default.selectItem(this, this.name);

    return this;
  }

  canToggle() {
    return !(this.disabled || this.readonly || this.selected);
  }

  get classes() {
    return {
      main: {
        sapMRb: true,
        sapMRbHasLabel: this.text && this.text.length > 0,
        sapMRbSel: this.selected,
        sapMRbDis: this.disabled,
        sapMRbRo: this.readonly,
        sapMRbErr: this.valueState === "Error",
        sapMRbWarn: this.valueState === "Warning",
        sapUiSizeCompact: (0, _Configuration.getCompactSize)()
      },
      inner: {
        sapMRbInner: true,
        sapMRbHoverable: !this.disabled && !this.readonly && (0, _Device.isDesktop)()
      }
    };
  }

  get ariaReadonly() {
    return this.readonly ? "true" : undefined;
  }

  get ariaDisabled() {
    return this.disabled ? "true" : undefined;
  }

  get tabIndex() {
    return this.disabled || !this.selected && this.name ? "-1" : "0";
  }

  get strokeWidth() {
    return this.valueState === "None" ? "1" : "2";
  }

  get circle() {
    return (0, _Configuration.getCompactSize)() ? SVGConfig.compact : SVGConfig.default;
  }

  get rtl() {
    return (0, _getEffectiveRTL.default)() ? "rtl" : undefined;
  }

}

RadioButton.define();
var _default = RadioButton;
exports.default = _default;
},{"@ui5/webcomponents-core/dist/sap/ui/Device.js":"../node_modules/@ui5/webcomponents-core/dist/sap/ui/Device.js","@ui5/webcomponents-base/src/Configuration.js":"../node_modules/@ui5/webcomponents-base/src/Configuration.js","@ui5/webcomponents-base/src/util/getEffectiveRTL.js":"../node_modules/@ui5/webcomponents-base/src/util/getEffectiveRTL.js","@ui5/webcomponents-base/src/FeaturesRegistry.js":"../node_modules/@ui5/webcomponents-base/src/FeaturesRegistry.js","@ui5/webcomponents-base/src/UI5Element.js":"../node_modules/@ui5/webcomponents-base/src/UI5Element.js","@ui5/webcomponents-base/src/renderer/LitRenderer.js":"../node_modules/@ui5/webcomponents-base/src/renderer/LitRenderer.js","@ui5/webcomponents-base/src/types/ValueState.js":"../node_modules/@ui5/webcomponents-base/src/types/ValueState.js","@ui5/webcomponents-base/src/events/PseudoEvents.js":"../node_modules/@ui5/webcomponents-base/src/events/PseudoEvents.js","./RadioButtonGroup.js":"../node_modules/@ui5/webcomponents/dist/RadioButtonGroup.js","./build/compiled/RadioButtonTemplate.lit.js":"../node_modules/@ui5/webcomponents/dist/build/compiled/RadioButtonTemplate.lit.js","./themes/RadioButton.css.js":"../node_modules/@ui5/webcomponents/dist/themes/RadioButton.css.js"}],"../node_modules/@ui5/webcomponents/dist/build/compiled/CheckBoxTemplate.lit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ifDefined = _interopRequireDefault(require("@ui5/webcomponents-base/src/renderer/ifDefined.js"));

var _LitRenderer = require("@ui5/webcomponents-base/src/renderer/LitRenderer.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-unused-vars: 0 */
const block0 = context => {
  return _LitRenderer.html`<div	class="${(0, _ifDefined.default)((0, _LitRenderer.classMap)(context.classes.main))}"	role="checkbox"	aria-checked="${(0, _ifDefined.default)(context.checked)}"	aria-readonly="${(0, _ifDefined.default)(context.ariaReadonly)}"	aria-disabled="${(0, _ifDefined.default)(context.ariaDisabled)}"	tabindex="${(0, _ifDefined.default)(context.tabIndex)}"	dir="${(0, _ifDefined.default)(context.rtl)}"><div id="${(0, _ifDefined.default)(context._id)}-CbBg" class="${(0, _ifDefined.default)((0, _LitRenderer.classMap)(context.classes.inner))}"><input id="${(0, _ifDefined.default)(context._id)}-CB" type='checkbox' ?checked="${(0, _ifDefined.default)(context.checked)}" ?readonly="${(0, _ifDefined.default)(context.readonly)}" ?disabled="${(0, _ifDefined.default)(context.disabled)}" data-sap-no-tab-ref/></div>		${context._label.text ? block1(context) : undefined}<slot name="formSupport"></slot></div>`;
};

const block1 = context => {
  return _LitRenderer.html`<ui5-label class="ui5-checkbox-label" ?wrap="${(0, _ifDefined.default)(context._label.wrap)}">${(0, _ifDefined.default)(context._label.text)}</ui5-label>		`;
};

var _default = block0;
exports.default = _default;
},{"@ui5/webcomponents-base/src/renderer/ifDefined.js":"../node_modules/@ui5/webcomponents-base/src/renderer/ifDefined.js","@ui5/webcomponents-base/src/renderer/LitRenderer.js":"../node_modules/@ui5/webcomponents-base/src/renderer/LitRenderer.js"}],"../node_modules/@ui5/webcomponents/dist/build/compiled/LabelTemplate.lit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ifDefined = _interopRequireDefault(require("@ui5/webcomponents-base/src/renderer/ifDefined.js"));

var _LitRenderer = require("@ui5/webcomponents-base/src/renderer/LitRenderer.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-unused-vars: 0 */
const block0 = context => {
  return _LitRenderer.html`<label class="${(0, _ifDefined.default)((0, _LitRenderer.classMap)(context.classes.main))}" for="${(0, _ifDefined.default)(context.for)}"><bdi id="${(0, _ifDefined.default)(context._id)}-bdi"><slot></slot></bdi></label>`;
};

var _default = block0;
exports.default = _default;
},{"@ui5/webcomponents-base/src/renderer/ifDefined.js":"../node_modules/@ui5/webcomponents-base/src/renderer/ifDefined.js","@ui5/webcomponents-base/src/renderer/LitRenderer.js":"../node_modules/@ui5/webcomponents-base/src/renderer/LitRenderer.js"}],"../node_modules/@ui5/webcomponents/dist/themes/Label.css.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = ":host(ui5-label:not([hidden])){display:inline-flex;max-width:100%;color:var(--sapUiContentLabelColor,var(--sapContent_LabelColor,var(--sapPrimary7,#6a6d70)));font-family:var(--sapUiFontFamily,var(--sapFontFamily,\"72\",\"72full\",Arial,Helvetica,sans-serif));font-size:var(--sapMFontMediumSize,.875rem);font-weight:400;cursor:text}ui5-label:not([hidden]){display:inline-block;max-width:100%;overflow:hidden;color:var(--sapUiContentLabelColor,var(--sapContent_LabelColor,var(--sapPrimary7,#6a6d70)));font-family:var(--sapUiFontFamily,var(--sapFontFamily,\"72\",\"72full\",Arial,Helvetica,sans-serif));font-size:var(--sapMFontMediumSize,.875rem);font-weight:400;cursor:text}.sapMLabel{display:inline-block;width:100%;font-weight:inherit;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;cursor:inherit}.sapMLabel.sapMLabelWrapped{white-space:normal;line-height:1.4rem}.sapMLabel.sapMLabelRequired:before{position:relative;height:100%;display:inline-flex;align-items:flex-start;content:\"*\";color:var(--sapUiFieldRequiredColor,var(--sapField_RequiredColor,#a5175a));font-size:1.25rem;font-weight:700}";
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents/dist/Label.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UI5Element = _interopRequireDefault(require("@ui5/webcomponents-base/src/UI5Element.js"));

var _LitRenderer = _interopRequireDefault(require("@ui5/webcomponents-base/src/renderer/LitRenderer.js"));

var _LabelTemplateLit = _interopRequireDefault(require("./build/compiled/LabelTemplate.lit.js"));

var _LabelCss = _interopRequireDefault(require("./themes/Label.css.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Template
// Styles

/**
 * @public
 */
const metadata = {
  tag: "ui5-label",
  properties:
  /** @lends sap.ui.webcomponents.main.Label.prototype */
  {
    /**
     * Defines whether an asterisk character is added to the <code>ui5-label</code> text.
     * <br><br>
     * <b>Note:</b> Usually indicates that user input is required.
     *
     * @type {boolean}
     * @defaultvalue false
     * @public
     */
    required: {
      type: Boolean
    },

    /**
     * Determines whether the <code>ui5-label</code> should wrap, when there is not enough space.
     * <br><br>
     * <b>Note:</b> By default the text would truncate.
     *
     * @type {boolean}
     * @defaultvalue false
     * @public
     */
    wrap: {
      type: Boolean
    },

    /**
     * Defines the labeled input by providing its ID.
     * <br><br>
     * <b>Note:</b> Can be used with both <code>ui5-input</code> and native input.
     *
     * @type {string}
     * @defaultvalue ""
     * @public
     */
    "for": {
      type: String
    }
  },
  slots:
  /** @lends sap.ui.webcomponents.main.Label.prototype */
  {
    /**
     * Defines the text of the <code>ui5-label</code>.
     * <br><b>Note:</b> Аlthough this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
     *
     * @type {Node[]}
     * @slot
     * @public
     */
    text: {
      type: Node,
      multiple: true
    }
  },
  defaultSlot: "text"
};
/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-label</code> is a component used to represent a label,
 * providing valuable information to the user.
 * Usually it is placed next to a value holder, such as a text field.
 * It informs the user about what data is displayed or expected in the value holder.
 * The <code>ui5-label</code> is associated with its value holder by setting the
 * <code>labelFor</code> association.
 * <br><br>
 * The <code>ui5-label</code> appearance can be influenced by properties,
 * such as <code>required</code> and <code>wrap</code>.
 * The appearance of the Label can be configured in a limited way by using the design property.
 * For a broader choice of designs, you can use custom styles.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Label";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Label
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-label
 * @public
 */

class Label extends _UI5Element.default {
  static get metadata() {
    return metadata;
  }

  static get render() {
    return _LitRenderer.default;
  }

  static get template() {
    return _LabelTemplateLit.default;
  }

  static get styles() {
    return _LabelCss.default;
  }

  get classes() {
    return {
      main: {
        sapMLabel: true,
        sapMLabelNoText: !this.text.length,
        sapMLabelWrapped: this.wrap,
        sapMLabelRequired: this.required
      }
    };
  }

  onclick() {
    const elementToFocus = document.getElementById(this.for);

    if (elementToFocus) {
      elementToFocus.focus();
    }
  }

}

Label.define();
var _default = Label;
exports.default = _default;
},{"@ui5/webcomponents-base/src/UI5Element.js":"../node_modules/@ui5/webcomponents-base/src/UI5Element.js","@ui5/webcomponents-base/src/renderer/LitRenderer.js":"../node_modules/@ui5/webcomponents-base/src/renderer/LitRenderer.js","./build/compiled/LabelTemplate.lit.js":"../node_modules/@ui5/webcomponents/dist/build/compiled/LabelTemplate.lit.js","./themes/Label.css.js":"../node_modules/@ui5/webcomponents/dist/themes/Label.css.js"}],"../node_modules/@ui5/webcomponents/dist/themes/CheckBox.css.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = ":host(ui5-checkbox:not([hidden])){display:inline-block;overflow:hidden;max-width:100%}ui5-checkbox:not([hidden]){display:inline-block;overflow:hidden;max-width:100%}.ui5-checkbox-wrapper{position:relative;display:inline-flex;align-items:center;width:100%;min-height:var(--_ui5_checkbox_width_height,2.75rem);min-width:var(--_ui5_checkbox_width_height,2.75rem);padding:0 var(--_ui5_checkbox_wrapper_padding,.6875rem);box-sizing:border-box;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.ui5-checkbox-wrapper:not(.ui5-checkbox-with-label){justify-content:center}.ui5-checkbox-wrapper:after{content:\"\";min-height:inherit;font-size:0}.ui5-checkbox-wrapper.ui5-checkbox-with-label{padding-right:0}.ui5-checkbox-wrapper.ui5-checkbox-with-label:focus:before{right:0}.ui5-checkbox-wrapper.ui5-checkbox-with-label.ui5-checkbox--wrap{min-height:auto;padding-top:.6875rem;box-sizing:border-box;padding-bottom:.6875rem;align-items:flex-start}.ui5-checkbox-wrapper.ui5-checkbox-with-label.ui5-checkbox--wrap .ui5-checkbox-inner,.ui5-checkbox-wrapper.ui5-checkbox-with-label.ui5-checkbox--wrap .ui5-checkbox-label{margin-top:var(--_ui5_checkbox_wrapped_content_margin_top,0)}.ui5-checkbox--disabled{opacity:.5}.ui5-checkbox--error .ui5-checkbox-inner{background:var(--sapUiFieldInvalidBackground,var(--sapField_InvalidBackground,var(--sapField_Background,var(--sapBaseColor,var(--sapPrimary3,#fff)))));border:var(--_ui5_checkbox_inner_error_border,.125rem solid var(--sapUiFieldInvalidColor,var(--sapField_InvalidColor,var(--sapErrorBorderColor,var(--sapNegativeColor,#b00)))));color:var(--sapUiFieldInvalidColor,var(--sapField_InvalidColor,var(--sapErrorBorderColor,var(--sapNegativeColor,#b00))))}.ui5-checkbox--error.ui5-checkbox--hoverable:hover .ui5-checkbox-inner{background:var(--sapUiFieldInvalidBackground,var(--sapField_InvalidBackground,var(--sapField_Background,var(--sapBaseColor,var(--sapPrimary3,#fff)))));color:var(--sapUiFieldInvalidColor,var(--sapField_InvalidColor,var(--sapErrorBorderColor,var(--sapNegativeColor,#b00))));border-color:var(--sapUiFieldInvalidColor,var(--sapField_InvalidColor,var(--sapErrorBorderColor,var(--sapNegativeColor,#b00))))}.ui5-checkbox--error .ui5-checkbox-inner--checked:before{color:var(--sapUiFieldInvalidColor,var(--sapField_InvalidColor,var(--sapErrorBorderColor,var(--sapNegativeColor,#b00))))}.ui5-checkbox--warning .ui5-checkbox-inner{background:var(--sapUiFieldWarningBackground,var(--sapField_WarningBackground,var(--sapField_Background,var(--sapBaseColor,var(--sapPrimary3,#fff)))));border:var(--_ui5_checkbox_inner_warning_border,.125rem solid var(--sapUiFieldWarningColor,var(--sapField_WarningColor,var(--sapWarningBorderColor,var(--sapCriticalColor,#e9730c)))));color:var(--sapUiFieldWarningColor,var(--sapField_WarningColor,var(--sapWarningBorderColor,var(--sapCriticalColor,#e9730c))))}.ui5-checkbox--warning.ui5-checkbox--hoverable:hover .ui5-checkbox-inner{background:var(--sapUiFieldWarningBackground,var(--sapField_WarningBackground,var(--sapField_Background,var(--sapBaseColor,var(--sapPrimary3,#fff)))));color:var(--sapUiFieldWarningColor,var(--sapField_WarningColor,var(--sapWarningBorderColor,var(--sapCriticalColor,#e9730c))));border-color:var(--sapUiFieldWarningColor,var(--sapField_WarningColor,var(--sapWarningBorderColor,var(--sapCriticalColor,#e9730c))))}.ui5-checkbox--warning .ui5-checkbox-inner--checked:before{color:var(--_ui5_checkbox_checkmark_warning_color,var(--sapUiFieldWarningColorDarken100,#000))}.ui5-checkbox--hoverable:hover .ui5-checkbox-inner{background:var(--_ui5_checkbox_hover_background,var(--sapUiFieldHoverBackground,var(--sapField_Hover_Background,var(--sapField_Background,var(--sapBaseColor,var(--sapPrimary3,#fff))))));border-color:var(--sapUiFieldHoverBorderColor,var(--sapField_Hover_BorderColor,var(--sapHighlightColor,#0854a0)))}.ui5-checkbox--readonly:not(.ui5-checkbox--warning):not(.ui5-checkbox--error) .ui5-checkbox-inner{background:var(--sapUiFieldReadOnlyBackground,var(--sapField_ReadOnly_Background,hsla(0,0%,94.9%,.5)));border:var(--_ui5_checkbox_inner_readonly_border,1px solid var(--sapUiFieldReadOnlyBorderColor,var(--sapField_ReadOnly_BorderColor,var(--sapField_BorderColor,var(--sapPrimary5,#89919a)))));color:var(--sapUiContentNonInteractiveIconColor,var(--sapContent_NonInteractiveIconColor,var(--sapPrimary7,#6a6d70)))}.ui5-checkbox-wrapper:focus:before{content:\"\";position:absolute;top:var(--_ui5_checkbox_focus_position,.5625rem);left:var(--_ui5_checkbox_focus_position,.5625rem);right:var(--_ui5_checkbox_focus_position,.5625rem);bottom:var(--_ui5_checkbox_focus_position,.5625rem);border:var(--_ui5_checkbox_focus_outline,1px dotted var(--sapUiContentFocusColor,var(--sapContent_FocusColor,#000)))}.ui5-checkbox-wrapper.ui5-checkbox--wrap:focus:before{bottom:var(--_ui5_checkbox_wrapped_focus_left_top_bottom_position,.5625rem)}.ui5-checkbox-inner{display:flex;justify-content:center;align-items:center;min-width:var(--_ui5_checkbox_inner_width_height,1.375rem);max-width:var(--_ui5_checkbox_inner_width_height,1.375rem);height:var(--_ui5_checkbox_inner_width_height,1.375rem);max-height:var(--_ui5_checkbox_inner_width_height,1.375rem);border:var(--_ui5_checkbox_inner_border,.0625rem solid var(--sapUiFieldBorderColor,var(--sapField_BorderColor,var(--sapPrimary5,#89919a))));border-radius:var(--_ui5_checkbox_inner_border_radius,.125rem);background:var(--sapUiFieldBackground,var(--sapField_Background,var(--sapBaseColor,var(--sapPrimary3,#fff))));box-sizing:border-box;position:relative;cursor:default;pointer-events:none}.ui5-checkbox-inner--checked:before{content:\"\\e05b\";display:flex;position:absolute;justify-content:center;align-items:center;font-family:SAP-icons;color:var(--_ui5_checkbox_checkmark_color,var(--sapUiSelected,var(--sapSelectedColor,var(--sapHighlightColor,#0854a0))));width:100%;height:100%;left:0;top:0;user-select:none;-ms-user-select:none;-webkit-user-select:none;cursor:default}.ui5-checkbox-inner input{-webkit-appearance:none;visibility:hidden;width:0;left:0;position:absolute;font-size:inherit}.ui5-checkbox-wrapper .ui5-checkbox-label{margin-left:var(--_ui5_checkbox_wrapper_padding,.6875rem);cursor:default;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;pointer-events:none;user-select:none;-ms-user-select:none;-webkit-user-select:none}.sapUiSizeCompact.ui5-checkbox-wrapper{min-height:var(--_ui5_checkbox_compact_width_height,2rem);min-width:var(--_ui5_checkbox_compact_width_height,2rem);padding:0 var(--_ui5_checkbox_compact_wrapper_padding,.5rem)}.sapUiSizeCompact .ui5-checkbox-inner{max-height:var(--_ui5_checkbox_compact_inner_size,1rem);height:var(--_ui5_checkbox_compact_inner_size,1rem);max-width:var(--_ui5_checkbox_compact_inner_size,1rem);min-width:var(--_ui5_checkbox_compact_inner_size,1rem);font-size:.625rem}.sapUiSizeCompact.ui5-checkbox-wrapper:focus:before{top:var(--_ui5_checkbox_compact_focus_position,.375rem);left:var(--_ui5_checkbox_compact_focus_position,.375rem);right:var(--_ui5_checkbox_compact_focus_position,.375rem);bottom:var(--_ui5_checkbox_compact_focus_position,.375rem);border:var(--_ui5_checkbox_focus_outline,1px dotted var(--sapUiContentFocusColor,var(--sapContent_FocusColor,#000)))}.sapUiSizeCompact.ui5-checkbox-wrapper.ui5-checkbox-with-label.ui5-checkbox--wrap{min-height:auto;padding-top:var(--_ui5_checkbox_wrapped_focus_padding,.5rem);padding-bottom:var(--_ui5_checkbox_wrapped_focus_padding,.5rem)}.sapUiSizeCompact.ui5-checkbox-wrapper.ui5-checkbox-with-label.ui5-checkbox--wrap .ui5-checkbox-label{margin-top:var(--_ui5_checkbox_compact_wrapped_label_margin_top,-.125rem)}.sapUiSizeCompact.ui5-checkbox-wrapper.ui5-checkbox--wrap:focus:before{bottom:var(--_ui5_checkbox_compact_focus_position,.375rem)}.sapUiSizeCompact.ui5-checkbox-wrapper .ui5-checkbox-label{margin-left:var(--_ui5_checkbox_compact_wrapper_padding,.5rem);width:calc(100% - .8125rem - var(--_ui5_checkbox_compact_inner_size, 1rem))}[dir=rtl].ui5-checkbox-wrapper.ui5-checkbox-with-label{padding-left:0;padding-right:var(--_ui5_checkbox_wrapper_padding,.6875rem)}[dir=rtl].ui5-checkbox-wrapper.ui5-checkbox-with-label:focus:before{left:0;right:var(--_ui5_checkbox_focus_position,.5625rem)}[dir=rtl].ui5-checkbox-wrapper .ui5-checkbox-label{margin-left:0;margin-right:var(--_ui5_checkbox_compact_wrapper_padding,.5rem)}[dir=rtl].sapUiSizeCompact.ui5-checkbox-wrapper.ui5-checkbox-with-label{padding-right:var(--_ui5_checkbox_compact_wrapper_padding,.5rem)}[dir=rtl].sapUiSizeCompact.ui5-checkbox-wrapper.ui5-checkbox-with-label:focus:before{right:var(--_ui5_checkbox_compact_focus_position,.375rem)}";
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents/dist/CheckBox.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Device = require("@ui5/webcomponents-core/dist/sap/ui/Device.js");

var _UI5Element = _interopRequireDefault(require("@ui5/webcomponents-base/src/UI5Element.js"));

var _LitRenderer = _interopRequireDefault(require("@ui5/webcomponents-base/src/renderer/LitRenderer.js"));

var _ValueState = _interopRequireDefault(require("@ui5/webcomponents-base/src/types/ValueState.js"));

var _Configuration = require("@ui5/webcomponents-base/src/Configuration.js");

var _FeaturesRegistry = require("@ui5/webcomponents-base/src/FeaturesRegistry.js");

var _getEffectiveRTL = _interopRequireDefault(require("@ui5/webcomponents-base/src/util/getEffectiveRTL.js"));

var _PseudoEvents = require("@ui5/webcomponents-base/src/events/PseudoEvents.js");

var _CheckBoxTemplateLit = _interopRequireDefault(require("./build/compiled/CheckBoxTemplate.lit.js"));

var _Label = _interopRequireDefault(require("./Label.js"));

var _CheckBoxCss = _interopRequireDefault(require("./themes/CheckBox.css.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Styles

/**
 * @public
 */
const metadata = {
  tag: "ui5-checkbox",
  properties:
  /** @lends sap.ui.webcomponents.main.CheckBox.prototype */
  {
    /**
     * Defines whether the <code>ui5-checkbox</code> is disabled.
     * <br><br>
     * <b>Note:</b> A disabled <code>ui5-checkbox</code> is completely uninteractive.
     *
     * @type {boolean}
     * @defaultvalue false
     * @public
     */
    disabled: {
      type: Boolean
    },

    /**
     * Defines whether the <code>ui5-checkbox</code> is read-only.
     * <br><br>
     * <b>Note:</b> A red-only <code>ui5-checkbox</code> is not editable,
     * but still provides visual feedback upon user interaction.
     *
     * @type {boolean}
     * @defaultvalue false
     * @public
     */
    readonly: {
      type: Boolean
    },

    /**
     * Defines if the <code>ui5-checkbox</code> is checked.
     * <br><br>
     * <b>Note:</b> The property can be changed with user interaction,
     * either by cliking/tapping on the <code>ui5-checkbox</code>, or by
     * pressing the Enter or Space key.
     *
     * @type {boolean}
     * @defaultvalue false
     * @public
     */
    checked: {
      type: Boolean
    },

    /**
     * Defines the text of the <code>ui5-checkbox</code>.
     *
     * @type {string}
     * @defaultvalue ""
     * @public
     */
    text: {
      type: String
    },

    /**
     * Defines the value state of the <code>ui5-checkbox</code>.
     * <br><br>
     * <b>Note:</b> Available options are <code>Warning</code>, <code>Error</code>, and <code>None</code> (default).
     *
     * @type {string}
     * @defaultvalue "None"
     * @public
     */
    valueState: {
      type: _ValueState.default,
      defaultValue: _ValueState.default.None
    },

    /**
     * Defines whether the <code>ui5-checkbox</code> text wraps when there is not enough space.
     * <br><br>
     * <b>Note:</b> By default, the text truncates when there is not enough space.
     *
     * @type {boolean}
     * @defaultvalue false
     * @public
     */
    wrap: {
      type: Boolean
    },

    /**
     * Determines the name with which the <code>ui5-checkbox</code> will be submitted in an HTML form.
     *
     * <b>Important:</b> For the <code>name</code> property to have effect, you must add the following import to your project:
     * <code>import "@ui5/webcomponents/dist/InputElementsFormSupport.js";</code>
     *
     * <b>Note:</b> When set, a native <code>input</code> HTML element
     * will be created inside the <code>ui5-checkbox</code> so that it can be submitted as
     * part of an HTML form. Do not use this property unless you need to submit a form.
     *
     * @type {string}
     * @defaultvalue ""
     * @public
     */
    name: {
      type: String
    },
    _label: {
      type: Object
    }
  },
  events:
  /** @lends sap.ui.webcomponents.main.CheckBox.prototype */
  {
    /**
     * Fired when the <code>ui5-checkbox</code> checked state changes.
     *
     * @public
     * @event
     */
    change: {}
  }
};
/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * Allows the user to set a binary value, such as true/false or yes/no for an item.
 * <br/><br/>
 * The <code>ui5-checkbox</code> component consists of a box and a label that describes its purpose.
 * If it's checked, an indicator is displayed inside the box.
 * To check/uncheck the <code>ui5-checkbox</code>, the user has to click or tap the square
 * box or its label.
 * <br/><br/>
 * Clicking or tapping toggles the <code>ui5-checkbox</code> between checked and unchecked state.
 * The <code>ui5-checkbox</code> component only has 2 states - checked and unchecked.
 *
 * <h3>Usage</h3>
 *
 * You can manually set the width of the element containing the box and the label using the <code>width</code> property.
 * If the text exceeds the available width, it is truncated.
 * The touchable area for toggling the <code>ui5-checkbox</code> ends where the text ends.
 * <br><br>
 * You can disable the <code>ui5-checkbox</code> by setting the <code>disabled</code> property to
 * <code>true</code>,
 * or use the <code>ui5-checkbox</code> in read-only mode by setting the <code>readonly</code>
 * property to <code>true</code>.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/CheckBox";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.CheckBox
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-checkbox
 * @public
 */

class CheckBox extends _UI5Element.default {
  static get metadata() {
    return metadata;
  }

  static get render() {
    return _LitRenderer.default;
  }

  static get template() {
    return _CheckBoxTemplateLit.default;
  }

  static get styles() {
    return _CheckBoxCss.default;
  }

  constructor() {
    super();
    this._label = {};
  }

  onBeforeRendering() {
    this.syncLabel();

    this._enableFormSupport();
  }

  syncLabel() {
    this._label = Object.assign({}, this._label);
    this._label.text = this.text;
    this._label.wrap = this.wrap;
    this._label.textDirection = this.textDirection;
  }

  _enableFormSupport() {
    const FormSupport = (0, _FeaturesRegistry.getFeature)("FormSupport");

    if (FormSupport) {
      FormSupport.syncNativeHiddenInput(this, (element, nativeInput) => {
        nativeInput.disabled = element.disabled || !element.checked;
        nativeInput.value = element.checked ? "on" : "";
      });
    } else if (this.name) {
      console.warn(`In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/InputElementsFormSupport.js";`); // eslint-disable-line
    }
  }

  onclick() {
    this.toggle();
  }

  onkeydown(event) {
    if ((0, _PseudoEvents.isSpace)(event)) {
      event.preventDefault();
    }

    if ((0, _PseudoEvents.isEnter)(event)) {
      this.toggle();
    }
  }

  onkeyup(event) {
    if ((0, _PseudoEvents.isSpace)(event)) {
      this.toggle();
    }
  }

  toggle() {
    if (this.canToggle()) {
      this.checked = !this.checked;
      this.fireEvent("change");
    }

    return this;
  }

  canToggle() {
    return !(this.disabled || this.readonly);
  }

  get classes() {
    return {
      main: {
        "ui5-checkbox-wrapper": true,
        "ui5-checkbox-with-label": !!this.text,
        "ui5-checkbox--disabled": this.disabled,
        "ui5-checkbox--readonly": this.readonly,
        "ui5-checkbox--error": this.valueState === "Error",
        "ui5-checkbox--warning": this.valueState === "Warning",
        "ui5-checkbox--wrap": this.wrap,
        "ui5-checkbox--hoverable": !this.disabled && !this.readonly && (0, _Device.isDesktop)(),
        "sapUiSizeCompact": (0, _Configuration.getCompactSize)()
      },
      inner: {
        "ui5-checkbox-inner": true,
        "ui5-checkbox-inner-mark": true,
        "ui5-checkbox-inner--checked": !!this.checked
      }
    };
  }

  get ariaReadonly() {
    return this.readonly ? "true" : undefined;
  }

  get ariaDisabled() {
    return this.disabled ? "true" : undefined;
  }

  get tabIndex() {
    return this.disabled ? undefined : "0";
  }

  get rtl() {
    return (0, _getEffectiveRTL.default)() ? "rtl" : undefined;
  }

  static async define(...params) {
    await _Label.default.define();
    super.define(...params);
  }

}

CheckBox.define();
var _default = CheckBox;
exports.default = _default;
},{"@ui5/webcomponents-core/dist/sap/ui/Device.js":"../node_modules/@ui5/webcomponents-core/dist/sap/ui/Device.js","@ui5/webcomponents-base/src/UI5Element.js":"../node_modules/@ui5/webcomponents-base/src/UI5Element.js","@ui5/webcomponents-base/src/renderer/LitRenderer.js":"../node_modules/@ui5/webcomponents-base/src/renderer/LitRenderer.js","@ui5/webcomponents-base/src/types/ValueState.js":"../node_modules/@ui5/webcomponents-base/src/types/ValueState.js","@ui5/webcomponents-base/src/Configuration.js":"../node_modules/@ui5/webcomponents-base/src/Configuration.js","@ui5/webcomponents-base/src/FeaturesRegistry.js":"../node_modules/@ui5/webcomponents-base/src/FeaturesRegistry.js","@ui5/webcomponents-base/src/util/getEffectiveRTL.js":"../node_modules/@ui5/webcomponents-base/src/util/getEffectiveRTL.js","@ui5/webcomponents-base/src/events/PseudoEvents.js":"../node_modules/@ui5/webcomponents-base/src/events/PseudoEvents.js","./build/compiled/CheckBoxTemplate.lit.js":"../node_modules/@ui5/webcomponents/dist/build/compiled/CheckBoxTemplate.lit.js","./Label.js":"../node_modules/@ui5/webcomponents/dist/Label.js","./themes/CheckBox.css.js":"../node_modules/@ui5/webcomponents/dist/themes/CheckBox.css.js"}],"../node_modules/@ui5/webcomponents/dist/themes/ListItem.css.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = ".sapMSLI.sapMLIBActive .sapMSLI-info,.sapMSLI.sapMLIBActive .sapMSLIDescription,.sapMSLI.sapMLIBActive .sapMSLITitle{color:var(--sapUiListActiveTextColor,#fff)}.sapMSLI .sapMSLITextWrapper{display:flex;flex-direction:column;min-width:1px;line-height:normal;flex:auto}.sapMSLI .sapMSLITitle{font-size:var(--sapMFontLargeSize,1rem);color:var(--sapUiListTextColor,var(--sapUiBaseText,var(--sapTextColor,var(--sapPrimary6,#32363a))))}.sapMSLI .sapMSLIDescription,.sapMSLI .sapMSLITitle{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.sapMSLI .sapMSLIDescription{font-size:var(--sapMFontMediumSize,.875rem);color:var(--sapUiContentLabelColor,var(--sapContent_LabelColor,var(--sapPrimary7,#6a6d70)))}.sapMSLI-info{margin:0 .25rem;color:var(--sapUiNeutralText,var(--sapNeutralTextColor,var(--sapNeutralColor,#6a6d70)));font-size:.875rem;flex-shrink:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.sapMSLI-info--warning{color:var(--sapUiCriticalText,var(--sapCriticalTextColor,var(--sapCriticalColor,#e9730c)))}.sapMSLI-info--success{color:var(--sapUiPositiveText,var(--sapPositiveTextColor,var(--sapPositiveColor,#107e3e)))}.sapMSLI-info--error{color:var(--sapUiNegativeText,var(--sapNegativeTextColor,var(--sapNegativeColor,#b00)))}.sapMSLI .sapMSLIImg{margin:.5rem .75rem .5rem 0;height:2rem;width:2rem}.sapMSLI .sapMLIBContent{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;-webkit-box-flex:1;flex:auto;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}.sapMSLI .sapMDeleteListItemButton{display:flex;align-items:center}.sapMSLI.sapMSLIWithTitleAndDescription,.sapUiSizeCompact.sapMSLI.sapMSLIWithTitleAndDescription{height:5rem;padding:1rem}.sapMSLI.sapMSLIWithTitleAndDescription .sapMSLITitle,.sapUiSizeCompact.sapMSLI.sapMSLIWithTitleAndDescription .sapMSLITitle{padding-bottom:.375rem}.sapMSLI.sapMSLIWithTitleAndDescription .sapMSLI-info{align-self:flex-end}.sapUiSizeCompact.sapMSLI:not(.sapMSLIWithTitleAndDescription){height:2rem}.sapUiSizeCompact.sapMSLI:not(.sapMSLIWithTitleAndDescription) .sapMSLITitle{height:2rem;line-height:2rem;font-size:var(--sapMFontMediumSize,.875rem)}.sapUiSizeCompact.sapMSLI:not(.sapMSLIWithTitleAndDescription) .sapMSLIImg{margin-top:.55rem;height:1.75rem;width:1.75rem}.sapUiSizeCompact ui5-checkbox.multiSelectionCheckBox{margin-right:.5rem}";
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents/dist/ListItem.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _PseudoEvents = require("@ui5/webcomponents-base/src/events/PseudoEvents.js");

var _Device = require("@ui5/webcomponents-core/dist/sap/ui/Device.js");

var _ListItemType = _interopRequireDefault(require("./types/ListItemType.js"));

var _ListMode = _interopRequireDefault(require("./types/ListMode.js"));

var _ListItemBase = _interopRequireDefault(require("./ListItemBase.js"));

require("./RadioButton.js");

require("./CheckBox.js");

require("./Button.js");

var _ListItemCss = _interopRequireDefault(require("./themes/ListItem.css.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Styles

/**
 * @public
 */
const metadata = {
  "abstract": true,
  properties:
  /** @lends  sap.ui.webcomponents.main.ListItem.prototype */
  {
    /**
     * Defines the selected state of the <code>ListItem</code>.
     * @type {boolean}
     * @defaultvalue false
     * @public
     */
    selected: {
      type: Boolean
    },

    /**
     * Defines the visual indication and behavior of the list items.
     * Available options are <code>Active</code> (by default) and <code>Inactive</code>.
     * </br></br>
     * <b>Note:</b> When set to <code>Active</code>, the item will provide visual response upon press and hover,
     * while with type <code>Inactive</code> - will not.
     *
     * @type {string}
     * @defaultvalue "Active"
     * @public
    */
    type: {
      type: _ListItemType.default,
      defaultValue: _ListItemType.default.Active
    },
    _active: {
      type: Boolean
    },
    _mode: {
      type: _ListMode.default,
      defaultValue: _ListMode.default.None
    }
  },
  events: {
    _press: {},
    _detailPress: {},
    _focused: {},
    _focusForward: {}
  }
};
/**
 * @class
 * A class to serve as a base
 * for the <code>StandardListItem</code> and <code>CustomListItem</code> classes.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.ListItem
 * @extends ListItemBase
 * @public
 */

class ListItem extends _ListItemBase.default {
  static get metadata() {
    return metadata;
  }

  static get styles() {
    return [_ListItemCss.default, _ListItemBase.default.styles];
  }

  constructor(props) {
    super(props);

    this.deactivateByKey = event => {
      if ((0, _PseudoEvents.isEnter)(event)) {
        this.deactivate();
      }
    };

    this.deactivate = () => {
      if (this._active) {
        this._active = false;
      }
    };
  }

  onBeforeRendering() {}

  onEnterDOM() {
    document.addEventListener("mouseup", this.deactivate);
    document.addEventListener("keyup", this.deactivateByKey);
  }

  onExitDOM() {
    document.removeEventListener("mouseup", this.deactivate);
    document.removeEventListener("keyup", this.deactivateByKey);
  }

  onkeydown(event) {
    super.onkeydown(event);
    const itemActive = this.type === _ListItemType.default.Active;

    if ((0, _PseudoEvents.isSpace)(event)) {
      event.preventDefault();
    }

    if (((0, _PseudoEvents.isSpace)(event) || (0, _PseudoEvents.isEnter)(event)) && itemActive) {
      this.activate();
    }

    if ((0, _PseudoEvents.isEnter)(event)) {
      this.fireItemPress();
    }
  }

  onkeyup(event) {
    if ((0, _PseudoEvents.isSpace)(event) || (0, _PseudoEvents.isEnter)(event)) {
      this.deactivate();
    }

    if ((0, _PseudoEvents.isSpace)(event)) {
      this.fireItemPress();
    }
  }

  onmousedown(event) {
    if (event.isMarked === "button") {
      return;
    }

    this.activate();
  }

  onmouseup(event) {
    if (event.isMarked === "button") {
      return;
    }

    this.deactivate();
  }

  onfocusout(event) {
    this.deactivate();
  }

  onclick(event) {
    if (event.isMarked === "button") {
      return;
    }

    this.fireItemPress();
  }

  activate() {
    if (this.type === _ListItemType.default.Active) {
      this._active = true;
    }
  }

  _onDelete(event) {
    this.fireEvent("_selectionRequested", {
      item: this,
      selected: event.selected
    });
  }

  fireItemPress() {
    this.fireEvent("_press", {
      item: this,
      selected: this.selected
    });
  }

  get classes() {
    const result = super.classes;
    const desktop = (0, _Device.isDesktop)();
    const isActionable = this.type === _ListItemType.default.Active && this._mode !== _ListMode.default.Delete; // Modify main classes

    result.main[`sapMLIBType${this.type}`] = true;
    result.main.sapMSLI = true;
    result.main.sapMLIBActionable = desktop && isActionable;
    result.main.sapMLIBHoverable = desktop && isActionable;
    result.main.sapMLIBSelected = this.selected;
    result.main.sapMLIBActive = this._active;
    return result;
  }

  get placeSelectionElementBefore() {
    return this._mode === _ListMode.default.MultiSelect || this._mode === _ListMode.default.SingleSelectBegin;
  }

  get placeSelectionElementAfter() {
    return !this.placeSelectionElementBefore && (this._mode === _ListMode.default.SingleSelectEnd || this._mode === _ListMode.default.Delete);
  }

  get modeSingleSelect() {
    return [_ListMode.default.SingleSelectBegin, _ListMode.default.SingleSelectEnd, _ListMode.default.SingleSelect].includes(this._mode);
  }

  get modeMultiSelect() {
    return this._mode === _ListMode.default.MultiSelect;
  }

  get modeDelete() {
    return this._mode === _ListMode.default.Delete;
  }

}

var _default = ListItem;
exports.default = _default;
},{"@ui5/webcomponents-base/src/events/PseudoEvents.js":"../node_modules/@ui5/webcomponents-base/src/events/PseudoEvents.js","@ui5/webcomponents-core/dist/sap/ui/Device.js":"../node_modules/@ui5/webcomponents-core/dist/sap/ui/Device.js","./types/ListItemType.js":"../node_modules/@ui5/webcomponents/dist/types/ListItemType.js","./types/ListMode.js":"../node_modules/@ui5/webcomponents/dist/types/ListMode.js","./ListItemBase.js":"../node_modules/@ui5/webcomponents/dist/ListItemBase.js","./RadioButton.js":"../node_modules/@ui5/webcomponents/dist/RadioButton.js","./CheckBox.js":"../node_modules/@ui5/webcomponents/dist/CheckBox.js","./Button.js":"../node_modules/@ui5/webcomponents/dist/Button.js","./themes/ListItem.css.js":"../node_modules/@ui5/webcomponents/dist/themes/ListItem.css.js"}],"../node_modules/@ui5/webcomponents/dist/build/compiled/StandardListItemTemplate.lit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ifDefined = _interopRequireDefault(require("@ui5/webcomponents-base/src/renderer/ifDefined.js"));

var _LitRenderer = require("@ui5/webcomponents-base/src/renderer/LitRenderer.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-unused-vars: 0 */
const block0 = context => {
  return _LitRenderer.html`<li	tabindex="${(0, _ifDefined.default)(context._tabIndex)}"	class="${(0, _ifDefined.default)((0, _LitRenderer.classMap)(context.classes.main))}"	dir="${(0, _ifDefined.default)(context.rtl)}"	@focusin="${(0, _ifDefined.default)(context.onfocusin)}"	@focusout="${(0, _ifDefined.default)(context.onfocusout)}">		${context.placeSelectionElementBefore ? block1(context) : undefined}<div id="${(0, _ifDefined.default)(context._id)}-content" class="${(0, _ifDefined.default)((0, _LitRenderer.classMap)(context.classes.inner))}">			${context.displayImage ? block5(context) : undefined}${context.displayIconBegin ? block6(context) : undefined}<div class="sapMSLITextWrapper">		${context.text.length ? block7(context) : undefined}${context.description ? block8(context) : undefined}</div>	${context.info ? block9(context) : undefined}</div>		${context.displayIconEnd ? block10(context) : undefined}${context.placeSelectionElementAfter ? block11(context) : undefined}</li>`;
};

const block1 = context => {
  return _LitRenderer.html`${context.modeSingleSelect ? block2(context) : undefined}${context.modeMultiSelect ? block3(context) : undefined}${context.modeDelete ? block4(context) : undefined}`;
};

const block2 = context => {
  return _LitRenderer.html`<ui5-radiobutton				id="${(0, _ifDefined.default)(context._id)}-singleSelectionElement"				class="singleSelectionRadioButton"				?selected="${(0, _ifDefined.default)(context.selected)}"></ui5-radiobutton>	`;
};

const block3 = context => {
  return _LitRenderer.html`<ui5-checkbox				id="${(0, _ifDefined.default)(context._id)}-multiSelectionElement"				class="multiSelectionCheckBox"				?checked="${(0, _ifDefined.default)(context.selected)}"></ui5-checkbox>	`;
};

const block4 = context => {
  return _LitRenderer.html`<div class="sapMDeleteListItemButton"><ui5-button				id="${(0, _ifDefined.default)(context._id)}-deleteSelectionElement"				design="Transparent"				icon="sap-icon://decline"				@ui5-press="${(0, _ifDefined.default)(context._onDelete)}"			></ui5-button></div>	`;
};

const block5 = context => {
  return _LitRenderer.html`<img src="${(0, _ifDefined.default)(context.image)}" class="sapMSLIImg">	`;
};

const block6 = context => {
  return _LitRenderer.html`<ui5-icon src="${(0, _ifDefined.default)(context.icon)}" class="sapMLIBIcon"></ui5-icon>	`;
};

const block7 = context => {
  return _LitRenderer.html`<span class="sapMSLITitle"><slot></slot></span>		`;
};

const block8 = context => {
  return _LitRenderer.html`<span class="sapMSLIDescription">${(0, _ifDefined.default)(context.description)}</span>		`;
};

const block9 = context => {
  return _LitRenderer.html`<span class="${(0, _ifDefined.default)((0, _LitRenderer.classMap)(context.classes.info))}">${(0, _ifDefined.default)(context.info)}</span>	`;
};

const block10 = context => {
  return _LitRenderer.html`<ui5-icon src="${(0, _ifDefined.default)(context.icon)}" class="sapMLIBIcon"></ui5-icon>	`;
};

const block11 = context => {
  return _LitRenderer.html`${context.modeSingleSelect ? block12(context) : undefined}${context.modeMultiSelect ? block13(context) : undefined}${context.modeDelete ? block14(context) : undefined}`;
};

const block12 = context => {
  return _LitRenderer.html`<ui5-radiobutton				id="${(0, _ifDefined.default)(context._id)}-singleSelectionElement"				class="singleSelectionRadioButton"				?selected="${(0, _ifDefined.default)(context.selected)}"></ui5-radiobutton>	`;
};

const block13 = context => {
  return _LitRenderer.html`<ui5-checkbox				id="${(0, _ifDefined.default)(context._id)}-multiSelectionElement"				class="multiSelectionCheckBox"				?checked="${(0, _ifDefined.default)(context.selected)}"></ui5-checkbox>	`;
};

const block14 = context => {
  return _LitRenderer.html`<div class="sapMDeleteListItemButton"><ui5-button				id="${(0, _ifDefined.default)(context._id)}-deleteSelectionElement"				design="Transparent"				icon="sap-icon://decline"				@ui5-press="${(0, _ifDefined.default)(context._onDelete)}"			></ui5-button></div>	`;
};

var _default = block0;
exports.default = _default;
},{"@ui5/webcomponents-base/src/renderer/ifDefined.js":"../node_modules/@ui5/webcomponents-base/src/renderer/ifDefined.js","@ui5/webcomponents-base/src/renderer/LitRenderer.js":"../node_modules/@ui5/webcomponents-base/src/renderer/LitRenderer.js"}],"../node_modules/@ui5/webcomponents/dist/StandardListItem.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _LitRenderer = _interopRequireDefault(require("@ui5/webcomponents-base/src/renderer/LitRenderer.js"));

var _ValueState = _interopRequireDefault(require("@ui5/webcomponents-base/src/types/ValueState.js"));

var _ListItem = _interopRequireDefault(require("./ListItem.js"));

var _Icon = _interopRequireDefault(require("./Icon.js"));

var _StandardListItemTemplateLit = _interopRequireDefault(require("./build/compiled/StandardListItemTemplate.lit.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @public
 */
const metadata = {
  tag: "ui5-li",
  properties:
  /** @lends sap.ui.webcomponents.main.StandardListItem.prototype */
  {
    /**
     * Defines the description displayed right under the item text, if such is present.
     * @type {string}
     * @defaultvalue: ""
     * @public
     * @since 0.8.0
     */
    description: {
      type: String
    },

    /**
     * Defines the <code>icon</code> source URI.
     * </br></br>
     * <b>Note:</b>
     * SAP-icons font provides numerous buil-in icons. To find all the available icons, see the
     * <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
     *
     * @type {string}
     * @public
     */
    icon: {
      type: String
    },

    /**
     * Defines whether the <code>icon</code> should be displayed in the beginning of the list item or in the end.
     * </br></br>
     * <b>Note:</b> If <code>image</code> is set, the <code>icon</code> would be displayed after the <code>image</code>.
     *
     * @type {boolean}
     * @defaultvalue false
     * @public
     */
    iconEnd: {
      type: Boolean
    },

    /**
     * Defines the <code>image</code> source URI.
     * </br></br>
     * <b>Note:</b> The <code>image</code> would be displayed in the beginning of the list item.
     *
     * @type {string}
     * @public
     */
    image: {
      type: String
    },

    /**
     * Defines the <code>info</code>, displayed in the end of the list item.
     * @type {string}
     * @public
     * @since 0.13.0
     */
    info: {
      type: String
    },

    /**
     * Defines the state of the <code>info</code>.
     * <br>
     * Available options are: <code>"None"</code< (by default), <code>"Success"</code>, <code>"Warning"</code> and <code>"Erorr"</code>.
     * @type {string}
     * @public
     * @since 0.13.0
     */
    infoState: {
      type: _ValueState.default,
      defaultValue: _ValueState.default.None
    }
  },
  slots:
  /** @lends sap.ui.webcomponents.main.StandardListItem.prototype */
  {
    /**
     * Defines the text of the <code>ui5-li</code>.
     * <br><b>Note:</b> Аlthough this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
     *
     * @type {Node[]}
     * @slot
     * @public
     */
    text: {
      type: Node,
      multiple: true
    }
  },
  defaultSlot: "text"
};
/**
 * @class
 * The <code>ui5-li</code> represents the simplest type of item for a <code>ui5-list</code>.
 *
 * This is a list item,
 * providing the most common use cases such as <code>text</code>,
 * <code>image</code> and <code>icon</code>.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.StandardListItem
 * @extends ListItem
 * @tagname ui5-li
 * @public
 */

class StandardListItem extends _ListItem.default {
  static get render() {
    return _LitRenderer.default;
  }

  static get template() {
    return _StandardListItemTemplateLit.default;
  }

  static get styles() {
    return _ListItem.default.styles;
  }

  static get metadata() {
    return metadata;
  }

  get displayImage() {
    return !!this.image;
  }

  get displayIconBegin() {
    return this.icon && !this.iconEnd;
  }

  get displayIconEnd() {
    return this.icon && this.iconEnd;
  }

  get classes() {
    const result = super.classes;
    const hasDesc = this.description && !!this.description.length;
    const hasTitle = this.textContent;
    const infoState = this.infoState.toLowerCase(); // Modify main classes

    result.main.sapMSLIWithTitleAndDescription = hasDesc && hasTitle; // Add "info" classes

    result.info = {
      "sapMSLI-info": true,
      [`sapMSLI-info--${infoState}`]: true
    };
    return result;
  }

  static async define(...params) {
    await _Icon.default.define();
    super.define(...params);
  }

}

StandardListItem.define();
var _default = StandardListItem;
exports.default = _default;
},{"@ui5/webcomponents-base/src/renderer/LitRenderer.js":"../node_modules/@ui5/webcomponents-base/src/renderer/LitRenderer.js","@ui5/webcomponents-base/src/types/ValueState.js":"../node_modules/@ui5/webcomponents-base/src/types/ValueState.js","./ListItem.js":"../node_modules/@ui5/webcomponents/dist/ListItem.js","./Icon.js":"../node_modules/@ui5/webcomponents/dist/Icon.js","./build/compiled/StandardListItemTemplate.lit.js":"../node_modules/@ui5/webcomponents/dist/build/compiled/StandardListItemTemplate.lit.js"}],"../node_modules/@ui5/webcomponents/dist/build/compiled/CustomListItemTemplate.lit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ifDefined = _interopRequireDefault(require("@ui5/webcomponents-base/src/renderer/ifDefined.js"));

var _LitRenderer = require("@ui5/webcomponents-base/src/renderer/LitRenderer.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-unused-vars: 0 */
const block0 = context => {
  return _LitRenderer.html`<li	tabindex="${(0, _ifDefined.default)(context._tabIndex)}"	class="${(0, _ifDefined.default)((0, _LitRenderer.classMap)(context.classes.main))}"	dir="${(0, _ifDefined.default)(context.rtl)}"	@focusin="${(0, _ifDefined.default)(context.onfocusin)}"	@focusout="${(0, _ifDefined.default)(context.onfocusout)}">		${context.placeSelectionElementBefore ? block1(context) : undefined}<div id="${(0, _ifDefined.default)(context._id)}-content" class="${(0, _ifDefined.default)((0, _LitRenderer.classMap)(context.classes.inner))}">			<slot></slot></div>		${context.placeSelectionElementAfter ? block5(context) : undefined}</li>`;
};

const block1 = context => {
  return _LitRenderer.html`${context.modeSingleSelect ? block2(context) : undefined}${context.modeMultiSelect ? block3(context) : undefined}${context.modeDelete ? block4(context) : undefined}`;
};

const block2 = context => {
  return _LitRenderer.html`<ui5-radiobutton				id="${(0, _ifDefined.default)(context._id)}-singleSelectionElement"				class="singleSelectionRadioButton"				?selected="${(0, _ifDefined.default)(context.selected)}"></ui5-radiobutton>	`;
};

const block3 = context => {
  return _LitRenderer.html`<ui5-checkbox				id="${(0, _ifDefined.default)(context._id)}-multiSelectionElement"				class="multiSelectionCheckBox"				?checked="${(0, _ifDefined.default)(context.selected)}"></ui5-checkbox>	`;
};

const block4 = context => {
  return _LitRenderer.html`<div class="sapMDeleteListItemButton"><ui5-button				id="${(0, _ifDefined.default)(context._id)}-deleteSelectionElement"				design="Transparent"				icon="sap-icon://decline"				@ui5-press="${(0, _ifDefined.default)(context._onDelete)}"			></ui5-button></div>	`;
};

const block5 = context => {
  return _LitRenderer.html`${context.modeSingleSelect ? block6(context) : undefined}${context.modeMultiSelect ? block7(context) : undefined}${context.modeDelete ? block8(context) : undefined}`;
};

const block6 = context => {
  return _LitRenderer.html`<ui5-radiobutton				id="${(0, _ifDefined.default)(context._id)}-singleSelectionElement"				class="singleSelectionRadioButton"				?selected="${(0, _ifDefined.default)(context.selected)}"></ui5-radiobutton>	`;
};

const block7 = context => {
  return _LitRenderer.html`<ui5-checkbox				id="${(0, _ifDefined.default)(context._id)}-multiSelectionElement"				class="multiSelectionCheckBox"				?checked="${(0, _ifDefined.default)(context.selected)}"></ui5-checkbox>	`;
};

const block8 = context => {
  return _LitRenderer.html`<div class="sapMDeleteListItemButton"><ui5-button				id="${(0, _ifDefined.default)(context._id)}-deleteSelectionElement"				design="Transparent"				icon="sap-icon://decline"				@ui5-press="${(0, _ifDefined.default)(context._onDelete)}"			></ui5-button></div>	`;
};

var _default = block0;
exports.default = _default;
},{"@ui5/webcomponents-base/src/renderer/ifDefined.js":"../node_modules/@ui5/webcomponents-base/src/renderer/ifDefined.js","@ui5/webcomponents-base/src/renderer/LitRenderer.js":"../node_modules/@ui5/webcomponents-base/src/renderer/LitRenderer.js"}],"../node_modules/@ui5/webcomponents/dist/themes/CustomListItem.css.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = ":host(ui5-li-custom) .sap-phone.sapMLIB{outline:none}:host(ui5-li-custom:not([hidden])){display:block}ui5-li-custom:not([hidden]){display:block}ui5-li-custom .sap-phone.sapMLIB{outline:none}.sapMLIB.sapMCustomLI{height:100%;padding:0}ui5-checkbox.multiSelectionCheckBox,ui5-radiobutton.singleSelectionRadioButton{display:flex;align-items:center}.sapMLIB.sapMCustomLI,ui5-checkbox.multiSelectionCheckBox,ui5-radiobutton.singleSelectionRadioButton{min-width:3rem}.sapUiSizeCompact.sapMLIB.sapMCustomLI,.sapUiSizeCompact ui5-checkbox.multiSelectionCheckBox,.sapUiSizeCompact ui5-radiobutton.singleSelectionRadioButton{min-width:2rem}";
exports.default = _default;
},{}],"../node_modules/@ui5/webcomponents/dist/CustomListItem.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _LitRenderer = _interopRequireDefault(require("@ui5/webcomponents-base/src/renderer/LitRenderer.js"));

var _ListItem = _interopRequireDefault(require("./ListItem.js"));

var _CustomListItemTemplateLit = _interopRequireDefault(require("./build/compiled/CustomListItemTemplate.lit.js"));

var _CustomListItemCss = _interopRequireDefault(require("./themes/CustomListItem.css.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Styles

/**
 * @public
 */
const metadata = {
  tag: "ui5-li-custom",
  defaultSlot: "content",
  slots:
  /** @lends sap.ui.webcomponents.main.CustomListItem.prototype */
  {
    /**
     * Defines the content of the <code>ui5-li-custom</code>.
     * @type {HTMLElement[]}
     * @slot
     * @public
     */
    content: {
      type: HTMLElement,
      multiple: true
    }
  },
  properties:
  /** @lends sap.ui.webcomponents.main.CustomListItem.prototype */
  {}
};
/**
 * @class
 *
 * A component to be used as custom list item within the <code>ui5-list</code>
 * the same way as the standard <code>ui5-li</code>.
 *
 * The <code>ui5-li-custom</code> accepts arbitrary HTML content to allow full customization.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.CustomListItem
 * @extends ListItem
 * @tagname ui5-li-custom
 * @public
 */

class CustomListItem extends _ListItem.default {
  static get metadata() {
    return metadata;
  }

  static get render() {
    return _LitRenderer.default;
  }

  static get template() {
    return _CustomListItemTemplateLit.default;
  }

  static get styles() {
    return [_ListItem.default.styles, _CustomListItemCss.default];
  }

  get classes() {
    const result = super.classes; // Modify main classes

    result.main.sapMCustomLI = true;
    return result;
  }

}

CustomListItem.define();
var _default = CustomListItem;
exports.default = _default;
},{"@ui5/webcomponents-base/src/renderer/LitRenderer.js":"../node_modules/@ui5/webcomponents-base/src/renderer/LitRenderer.js","./ListItem.js":"../node_modules/@ui5/webcomponents/dist/ListItem.js","./build/compiled/CustomListItemTemplate.lit.js":"../node_modules/@ui5/webcomponents/dist/build/compiled/CustomListItemTemplate.lit.js","./themes/CustomListItem.css.js":"../node_modules/@ui5/webcomponents/dist/themes/CustomListItem.css.js"}],"../node_modules/@ui5/webcomponents/dist/Suggestions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _List = _interopRequireDefault(require("./List.js"));

var _Popover = _interopRequireDefault(require("./Popover.js"));

var _StandardListItem = _interopRequireDefault(require("./StandardListItem.js"));

var _CustomListItem = _interopRequireDefault(require("./CustomListItem.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ensure <ui5-li> is loaded
// ensure <ui5-li-custom> is loaded
(function noTreeShaked() {
  `${_StandardListItem.default}${_CustomListItem.default}`; //eslint-disable-line
})();
/**
 * A class to manage the <code>Input</code suggestion items.
 *
 * @class
 * @private
 * @author SAP SE
 */


class Suggestions {
  constructor(component, slotName, handleFocus) {
    // The component, that the suggestion would plug into.
    this.component = component; // Defines the items` slot name.

    this.slotName = slotName; // Defines, if the focus will be moved via the arrow keys.

    this.handleFocus = handleFocus; // Press and Focus handlers

    this.fnOnSuggestionItemPress = this.onItemPress.bind(this);
    this.fnOnSuggestionItemFocus = this.onItemFocused.bind(this); // An integer value to store the currently selected item position,
    // that changes due to user interaction.

    this.selectedItemIndex = null;
  }
  /* Public methods */


  onUp(event) {
    event.preventDefault();

    this._handleItemNavigation(false
    /* forward */
    );

    return true;
  }

  onDown(event) {
    event.preventDefault();

    this._handleItemNavigation(true
    /* forward */
    );

    return true;
  }

  onSpace(event) {
    if (this._isItemOnTarget()) {
      event.preventDefault();
      this.onItemSelected(null, true
      /* keyboardUsed */
      );
      return true;
    }

    return false;
  }

  onEnter(event) {
    if (this._isItemOnTarget()) {
      this.onItemSelected(null, true
      /* keyboardUsed */
      );
      return true;
    }

    return false;
  }

  toggle(bToggle) {
    const toggle = bToggle !== undefined ? bToggle : !this.isOpened();

    if (toggle) {
      this.open();
    } else {
      this.close();
    }
  }

  open() {
    this._beforeOpen();

    this._getPopover().openBy(this._getComponent());
  }

  close() {
    this._getPopover().close();
  }

  updateSelectedItemPosition(pos) {
    this.selectedItemIndex = pos;
  }
  /* Interface methods */


  onItemFocused() {
    this._getComponent().onItemFocused();
  }

  onItemSelected(selectedItem, keyboardUsed) {
    const item = selectedItem || this._getItems()[this.selectedItemIndex];

    this.selectedItemIndex = this._getItems().indexOf(item);

    this._getComponent().onItemSelected(item, keyboardUsed);

    this.close();
  }

  onItemPreviewed(item) {
    this._getComponent().onItemPreviewed(item);
  }
  /* Private methods */


  onItemPress(oEvent) {
    this.onItemSelected(oEvent.detail.item, false
    /* keyboardUsed */
    );
  }

  _beforeOpen() {
    this._attachItemsListeners();

    this._attachPopupListeners();
  }

  _attachItemsListeners() {
    const list = this._getList();

    list.removeEventListener("ui5-itemPress", this.fnOnSuggestionItemPress);
    list.addEventListener("ui5-itemPress", this.fnOnSuggestionItemPress);
    list.removeEventListener("ui5-itemFocused", this.fnOnSuggestionItemFocus);
    list.addEventListener("ui5-itemFocused", this.fnOnSuggestionItemFocus);
  }

  _attachPopupListeners() {
    if (!this.handleFocus) {
      return;
    }

    if (!this.attachedAfterOpened) {
      this._getPopover().addEventListener("ui5-afterOpen", this._onOpen.bind(this));

      this.attachedAfterOpened = true;
    }

    if (!this.attachedAfterClose) {
      this._getPopover().addEventListener("ui5-afterClose", this._onClose.bind(this));

      this.attachedAfterClose = true;
    }
  }

  _onOpen() {
    this._applyFocus();

    this._getComponent().onOpen();
  }

  _onClose() {
    this._getComponent().onClose();
  }

  _applyFocus() {
    if (this.selectedItemIndex) {
      this._getItems()[this.selectedItemIndex].focus();
    }
  }

  _isItemOnTarget() {
    return this.isOpened() && this.selectedItemIndex !== null;
  }

  isOpened() {
    const popover = this._getPopover();

    return !!(popover && popover._isOpen);
  }

  _handleItemNavigation(forward) {
    if (!this._getItems().length) {
      return;
    }

    if (forward) {
      this._selectNextItem();
    } else {
      this._selectPreviousItem();
    }
  }

  _selectNextItem() {
    const itemsCount = this._getItems().length;

    const previousSelectedIdx = this.selectedItemIndex;

    if (this.selectedItemIndex === null || ++this.selectedItemIndex > itemsCount - 1) {
      this.selectedItemIndex = 0;
    }

    this._moveItemSelection(previousSelectedIdx, this.selectedItemIndex);
  }

  _selectPreviousItem() {
    const itemsCount = this._getItems().length;

    const previousSelectedIdx = this.selectedItemIndex;

    if (this.selectedItemIndex === null || --this.selectedItemIndex < 0) {
      this.selectedItemIndex = itemsCount - 1;
    }

    this._moveItemSelection(previousSelectedIdx, this.selectedItemIndex);
  }

  _moveItemSelection(previousIdx, nextIdx) {
    const items = this._getItems();

    const currentItem = items[nextIdx];
    const previousItem = items[previousIdx];

    if (previousItem) {
      previousItem.selected = false;
    }

    if (currentItem) {
      currentItem.selected = true;

      if (this.handleFocus) {
        currentItem.focus();
      }
    }

    this.onItemPreviewed(currentItem);

    if (!this._isItemIntoView(currentItem)) {
      this._scrollItemIntoView(currentItem);
    }
  }

  _isItemIntoView(item) {
    const rectItem = item.getDomRef().getBoundingClientRect();

    const rectInput = this._getComponent().getDomRef().getBoundingClientRect();

    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return rectItem.top <= windowHeight && rectItem.top >= rectInput.top;
  }

  _scrollItemIntoView(item) {
    const pos = item.getDomRef().offsetTop - Suggestions.SCROLL_STEP;
    this._getScrollContainer().scrollTop = pos;
  }

  _getScrollContainer() {
    if (!this._scrollContainer) {
      const popover = this._getPopover();

      this._scrollContainer = popover.getDomRef().querySelector(".sapMPopupContent");
    }

    return this._scrollContainer;
  }

  _getItems() {
    return this._getComponent().getSlottedNodes(this.slotName);
  }

  _getComponent() {
    return this.component;
  }

  _getList() {
    return this._getComponent().shadowRoot.querySelector("ui5-list");
  }

  _getPopover() {
    return this._getComponent().shadowRoot.querySelector("ui5-popover");
  }

}

Suggestions.SCROLL_STEP = 48; // The List and Popover components would be rendered
// by the issuer component`s template.

_List.default.define();

_Popover.default.define();

var _default = Suggestions;
exports.default = _default;
},{"./List.js":"../node_modules/@ui5/webcomponents/dist/List.js","./Popover.js":"../node_modules/@ui5/webcomponents/dist/Popover.js","./StandardListItem.js":"../node_modules/@ui5/webcomponents/dist/StandardListItem.js","./CustomListItem.js":"../node_modules/@ui5/webcomponents/dist/CustomListItem.js"}],"../node_modules/@ui5/webcomponents/dist/InputSuggestions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FeaturesRegistry = require("@ui5/webcomponents-base/src/FeaturesRegistry.js");

var _Suggestions = _interopRequireDefault(require("./Suggestions.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Add suggestions support to the global features registry so that Input.js can use it
(0, _FeaturesRegistry.registerFeature)("InputSuggestions", _Suggestions.default);
var _default = _Suggestions.default;
exports.default = _default;
},{"@ui5/webcomponents-base/src/FeaturesRegistry.js":"../node_modules/@ui5/webcomponents-base/src/FeaturesRegistry.js","./Suggestions.js":"../node_modules/@ui5/webcomponents/dist/Suggestions.js"}],"../../../slides/plugin/highlight/highlight.js":[function(require,module,exports) {
var define;
/*! highlight.js v9.11.0 | BSD3 License | git.io/hljslicense */
!function (e) {
  var n = "object" == typeof window && window || "object" == typeof self && self;
  n && (n.hljs = e({}), "function" == typeof define && define.amd && define([], function () {
    return n.hljs;
  }));
}(function (e) {
  function n(e) {
    return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function t(e) {
    return e.nodeName.toLowerCase();
  }

  function r(e, n) {
    var t = e && e.exec(n);
    return t && 0 === t.index;
  }

  function a(e) {
    return k.test(e);
  }

  function i(e) {
    var n,
        t,
        r,
        i,
        o = e.className + " ";
    if (o += e.parentNode ? e.parentNode.className : "", t = B.exec(o)) return w(t[1]) ? t[1] : "no-highlight";

    for (o = o.split(/\s+/), n = 0, r = o.length; r > n; n++) if (i = o[n], a(i) || w(i)) return i;
  }

  function o(e) {
    var n,
        t = {},
        r = Array.prototype.slice.call(arguments, 1);

    for (n in e) t[n] = e[n];

    return r.forEach(function (e) {
      for (n in e) t[n] = e[n];
    }), t;
  }

  function u(e) {
    var n = [];
    return function r(e, a) {
      for (var i = e.firstChild; i; i = i.nextSibling) 3 === i.nodeType ? a += i.nodeValue.length : 1 === i.nodeType && (n.push({
        event: "start",
        offset: a,
        node: i
      }), a = r(i, a), t(i).match(/br|hr|img|input/) || n.push({
        event: "stop",
        offset: a,
        node: i
      }));

      return a;
    }(e, 0), n;
  }

  function c(e, r, a) {
    function i() {
      return e.length && r.length ? e[0].offset !== r[0].offset ? e[0].offset < r[0].offset ? e : r : "start" === r[0].event ? e : r : e.length ? e : r;
    }

    function o(e) {
      function r(e) {
        return " " + e.nodeName + '="' + n(e.value).replace('"', "&quot;") + '"';
      }

      s += "<" + t(e) + E.map.call(e.attributes, r).join("") + ">";
    }

    function u(e) {
      s += "</" + t(e) + ">";
    }

    function c(e) {
      ("start" === e.event ? o : u)(e.node);
    }

    for (var l = 0, s = "", f = []; e.length || r.length;) {
      var g = i();

      if (s += n(a.substring(l, g[0].offset)), l = g[0].offset, g === e) {
        f.reverse().forEach(u);

        do c(g.splice(0, 1)[0]), g = i(); while (g === e && g.length && g[0].offset === l);

        f.reverse().forEach(o);
      } else "start" === g[0].event ? f.push(g[0].node) : f.pop(), c(g.splice(0, 1)[0]);
    }

    return s + n(a.substr(l));
  }

  function l(e) {
    return e.v && !e.cached_variants && (e.cached_variants = e.v.map(function (n) {
      return o(e, {
        v: null
      }, n);
    })), e.cached_variants || e.eW && [o(e)] || [e];
  }

  function s(e) {
    function n(e) {
      return e && e.source || e;
    }

    function t(t, r) {
      return new RegExp(n(t), "m" + (e.cI ? "i" : "") + (r ? "g" : ""));
    }

    function r(a, i) {
      if (!a.compiled) {
        if (a.compiled = !0, a.k = a.k || a.bK, a.k) {
          var o = {},
              u = function (n, t) {
            e.cI && (t = t.toLowerCase()), t.split(" ").forEach(function (e) {
              var t = e.split("|");
              o[t[0]] = [n, t[1] ? Number(t[1]) : 1];
            });
          };

          "string" == typeof a.k ? u("keyword", a.k) : x(a.k).forEach(function (e) {
            u(e, a.k[e]);
          }), a.k = o;
        }

        a.lR = t(a.l || /\w+/, !0), i && (a.bK && (a.b = "\\b(" + a.bK.split(" ").join("|") + ")\\b"), a.b || (a.b = /\B|\b/), a.bR = t(a.b), a.e || a.eW || (a.e = /\B|\b/), a.e && (a.eR = t(a.e)), a.tE = n(a.e) || "", a.eW && i.tE && (a.tE += (a.e ? "|" : "") + i.tE)), a.i && (a.iR = t(a.i)), null == a.r && (a.r = 1), a.c || (a.c = []), a.c = Array.prototype.concat.apply([], a.c.map(function (e) {
          return l("self" === e ? a : e);
        })), a.c.forEach(function (e) {
          r(e, a);
        }), a.starts && r(a.starts, i);
        var c = a.c.map(function (e) {
          return e.bK ? "\\.?(" + e.b + ")\\.?" : e.b;
        }).concat([a.tE, a.i]).map(n).filter(Boolean);
        a.t = c.length ? t(c.join("|"), !0) : {
          exec: function () {
            return null;
          }
        };
      }
    }

    r(e);
  }

  function f(e, t, a, i) {
    function o(e, n) {
      var t, a;

      for (t = 0, a = n.c.length; a > t; t++) if (r(n.c[t].bR, e)) return n.c[t];
    }

    function u(e, n) {
      if (r(e.eR, n)) {
        for (; e.endsParent && e.parent;) e = e.parent;

        return e;
      }

      return e.eW ? u(e.parent, n) : void 0;
    }

    function c(e, n) {
      return !a && r(n.iR, e);
    }

    function l(e, n) {
      var t = N.cI ? n[0].toLowerCase() : n[0];
      return e.k.hasOwnProperty(t) && e.k[t];
    }

    function p(e, n, t, r) {
      var a = r ? "" : I.classPrefix,
          i = '<span class="' + a,
          o = t ? "" : C;
      return i += e + '">', i + n + o;
    }

    function h() {
      var e, t, r, a;
      if (!E.k) return n(k);

      for (a = "", t = 0, E.lR.lastIndex = 0, r = E.lR.exec(k); r;) a += n(k.substring(t, r.index)), e = l(E, r), e ? (B += e[1], a += p(e[0], n(r[0]))) : a += n(r[0]), t = E.lR.lastIndex, r = E.lR.exec(k);

      return a + n(k.substr(t));
    }

    function d() {
      var e = "string" == typeof E.sL;
      if (e && !y[E.sL]) return n(k);
      var t = e ? f(E.sL, k, !0, x[E.sL]) : g(k, E.sL.length ? E.sL : void 0);
      return E.r > 0 && (B += t.r), e && (x[E.sL] = t.top), p(t.language, t.value, !1, !0);
    }

    function b() {
      L += null != E.sL ? d() : h(), k = "";
    }

    function v(e) {
      L += e.cN ? p(e.cN, "", !0) : "", E = Object.create(e, {
        parent: {
          value: E
        }
      });
    }

    function m(e, n) {
      if (k += e, null == n) return b(), 0;
      var t = o(n, E);
      if (t) return t.skip ? k += n : (t.eB && (k += n), b(), t.rB || t.eB || (k = n)), v(t, n), t.rB ? 0 : n.length;
      var r = u(E, n);

      if (r) {
        var a = E;
        a.skip ? k += n : (a.rE || a.eE || (k += n), b(), a.eE && (k = n));

        do E.cN && (L += C), E.skip || (B += E.r), E = E.parent; while (E !== r.parent);

        return r.starts && v(r.starts, ""), a.rE ? 0 : n.length;
      }

      if (c(n, E)) throw new Error('Illegal lexeme "' + n + '" for mode "' + (E.cN || "<unnamed>") + '"');
      return k += n, n.length || 1;
    }

    var N = w(e);
    if (!N) throw new Error('Unknown language: "' + e + '"');
    s(N);
    var R,
        E = i || N,
        x = {},
        L = "";

    for (R = E; R !== N; R = R.parent) R.cN && (L = p(R.cN, "", !0) + L);

    var k = "",
        B = 0;

    try {
      for (var M, j, O = 0;;) {
        if (E.t.lastIndex = O, M = E.t.exec(t), !M) break;
        j = m(t.substring(O, M.index), M[0]), O = M.index + j;
      }

      for (m(t.substr(O)), R = E; R.parent; R = R.parent) R.cN && (L += C);

      return {
        r: B,
        value: L,
        language: e,
        top: E
      };
    } catch (T) {
      if (T.message && -1 !== T.message.indexOf("Illegal")) return {
        r: 0,
        value: n(t)
      };
      throw T;
    }
  }

  function g(e, t) {
    t = t || I.languages || x(y);
    var r = {
      r: 0,
      value: n(e)
    },
        a = r;
    return t.filter(w).forEach(function (n) {
      var t = f(n, e, !1);
      t.language = n, t.r > a.r && (a = t), t.r > r.r && (a = r, r = t);
    }), a.language && (r.second_best = a), r;
  }

  function p(e) {
    return I.tabReplace || I.useBR ? e.replace(M, function (e, n) {
      return I.useBR && "\n" === e ? "<br>" : I.tabReplace ? n.replace(/\t/g, I.tabReplace) : "";
    }) : e;
  }

  function h(e, n, t) {
    var r = n ? L[n] : t,
        a = [e.trim()];
    return e.match(/\bhljs\b/) || a.push("hljs"), -1 === e.indexOf(r) && a.push(r), a.join(" ").trim();
  }

  function d(e) {
    var n,
        t,
        r,
        o,
        l,
        s = i(e);
    a(s) || (I.useBR ? (n = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), n.innerHTML = e.innerHTML.replace(/\n/g, "").replace(/<br[ \/]*>/g, "\n")) : n = e, l = n.textContent, r = s ? f(s, l, !0) : g(l), t = u(n), t.length && (o = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), o.innerHTML = r.value, r.value = c(t, u(o), l)), r.value = p(r.value), e.innerHTML = r.value, e.className = h(e.className, s, r.language), e.result = {
      language: r.language,
      re: r.r
    }, r.second_best && (e.second_best = {
      language: r.second_best.language,
      re: r.second_best.r
    }));
  }

  function b(e) {
    I = o(I, e);
  }

  function v() {
    if (!v.called) {
      v.called = !0;
      var e = document.querySelectorAll("pre code");
      E.forEach.call(e, d);
    }
  }

  function m() {
    addEventListener("DOMContentLoaded", v, !1), addEventListener("load", v, !1);
  }

  function N(n, t) {
    var r = y[n] = t(e);
    r.aliases && r.aliases.forEach(function (e) {
      L[e] = n;
    });
  }

  function R() {
    return x(y);
  }

  function w(e) {
    return e = (e || "").toLowerCase(), y[e] || y[L[e]];
  }

  var E = [],
      x = Object.keys,
      y = {},
      L = {},
      k = /^(no-?highlight|plain|text)$/i,
      B = /\blang(?:uage)?-([\w-]+)\b/i,
      M = /((^(<[^>]+>|\t|)+|(?:\n)))/gm,
      C = "</span>",
      I = {
    classPrefix: "hljs-",
    tabReplace: null,
    useBR: !1,
    languages: void 0
  };
  return e.highlight = f, e.highlightAuto = g, e.fixMarkup = p, e.highlightBlock = d, e.configure = b, e.initHighlighting = v, e.initHighlightingOnLoad = m, e.registerLanguage = N, e.listLanguages = R, e.getLanguage = w, e.inherit = o, e.IR = "[a-zA-Z]\\w*", e.UIR = "[a-zA-Z_]\\w*", e.NR = "\\b\\d+(\\.\\d+)?", e.CNR = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", e.BNR = "\\b(0b[01]+)", e.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", e.BE = {
    b: "\\\\[\\s\\S]",
    r: 0
  }, e.ASM = {
    cN: "string",
    b: "'",
    e: "'",
    i: "\\n",
    c: [e.BE]
  }, e.QSM = {
    cN: "string",
    b: '"',
    e: '"',
    i: "\\n",
    c: [e.BE]
  }, e.PWM = {
    b: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
  }, e.C = function (n, t, r) {
    var a = e.inherit({
      cN: "comment",
      b: n,
      e: t,
      c: []
    }, r || {});
    return a.c.push(e.PWM), a.c.push({
      cN: "doctag",
      b: "(?:TODO|FIXME|NOTE|BUG|XXX):",
      r: 0
    }), a;
  }, e.CLCM = e.C("//", "$"), e.CBCM = e.C("/\\*", "\\*/"), e.HCM = e.C("#", "$"), e.NM = {
    cN: "number",
    b: e.NR,
    r: 0
  }, e.CNM = {
    cN: "number",
    b: e.CNR,
    r: 0
  }, e.BNM = {
    cN: "number",
    b: e.BNR,
    r: 0
  }, e.CSSNM = {
    cN: "number",
    b: e.NR + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
    r: 0
  }, e.RM = {
    cN: "regexp",
    b: /\//,
    e: /\/[gimuy]*/,
    i: /\n/,
    c: [e.BE, {
      b: /\[/,
      e: /\]/,
      r: 0,
      c: [e.BE]
    }]
  }, e.TM = {
    cN: "title",
    b: e.IR,
    r: 0
  }, e.UTM = {
    cN: "title",
    b: e.UIR,
    r: 0
  }, e.METHOD_GUARD = {
    b: "\\.\\s*" + e.UIR,
    r: 0
  }, e;
});
hljs.registerLanguage("diff", function (e) {
  return {
    aliases: ["patch"],
    c: [{
      cN: "meta",
      r: 10,
      v: [{
        b: /^@@ +\-\d+,\d+ +\+\d+,\d+ +@@$/
      }, {
        b: /^\*\*\* +\d+,\d+ +\*\*\*\*$/
      }, {
        b: /^\-\-\- +\d+,\d+ +\-\-\-\-$/
      }]
    }, {
      cN: "comment",
      v: [{
        b: /Index: /,
        e: /$/
      }, {
        b: /={3,}/,
        e: /$/
      }, {
        b: /^\-{3}/,
        e: /$/
      }, {
        b: /^\*{3} /,
        e: /$/
      }, {
        b: /^\+{3}/,
        e: /$/
      }, {
        b: /\*{5}/,
        e: /\*{5}$/
      }]
    }, {
      cN: "addition",
      b: "^\\+",
      e: "$"
    }, {
      cN: "deletion",
      b: "^\\-",
      e: "$"
    }, {
      cN: "addition",
      b: "^\\!",
      e: "$"
    }]
  };
});
hljs.registerLanguage("nimrod", function (t) {
  return {
    aliases: ["nim"],
    k: {
      keyword: "addr and as asm bind block break case cast const continue converter discard distinct div do elif else end enum except export finally for from generic if import in include interface is isnot iterator let macro method mixin mod nil not notin object of or out proc ptr raise ref return shl shr static template try tuple type using var when while with without xor yield",
      literal: "shared guarded stdin stdout stderr result true false",
      built_in: "int int8 int16 int32 int64 uint uint8 uint16 uint32 uint64 float float32 float64 bool char string cstring pointer expr stmt void auto any range array openarray varargs seq set clong culong cchar cschar cshort cint csize clonglong cfloat cdouble clongdouble cuchar cushort cuint culonglong cstringarray semistatic"
    },
    c: [{
      cN: "meta",
      b: /{\./,
      e: /\.}/,
      r: 10
    }, {
      cN: "string",
      b: /[a-zA-Z]\w*"/,
      e: /"/,
      c: [{
        b: /""/
      }]
    }, {
      cN: "string",
      b: /([a-zA-Z]\w*)?"""/,
      e: /"""/
    }, t.QSM, {
      cN: "type",
      b: /\b[A-Z]\w+\b/,
      r: 0
    }, {
      cN: "number",
      r: 0,
      v: [{
        b: /\b(0[xX][0-9a-fA-F][_0-9a-fA-F]*)('?[iIuU](8|16|32|64))?/
      }, {
        b: /\b(0o[0-7][_0-7]*)('?[iIuUfF](8|16|32|64))?/
      }, {
        b: /\b(0(b|B)[01][_01]*)('?[iIuUfF](8|16|32|64))?/
      }, {
        b: /\b(\d[_\d]*)('?[iIuUfF](8|16|32|64))?/
      }]
    }, t.HCM]
  };
});
hljs.registerLanguage("basic", function (E) {
  return {
    cI: !0,
    i: "^.",
    l: "[a-zA-Z][a-zA-Z0-9_$%!#]*",
    k: {
      keyword: "ABS ASC AND ATN AUTO|0 BEEP BLOAD|10 BSAVE|10 CALL CALLS CDBL CHAIN CHDIR CHR$|10 CINT CIRCLE CLEAR CLOSE CLS COLOR COM COMMON CONT COS CSNG CSRLIN CVD CVI CVS DATA DATE$ DEFDBL DEFINT DEFSNG DEFSTR DEF|0 SEG USR DELETE DIM DRAW EDIT END ENVIRON ENVIRON$ EOF EQV ERASE ERDEV ERDEV$ ERL ERR ERROR EXP FIELD FILES FIX FOR|0 FRE GET GOSUB|10 GOTO HEX$ IF|0 THEN ELSE|0 INKEY$ INP INPUT INPUT# INPUT$ INSTR IMP INT IOCTL IOCTL$ KEY ON OFF LIST KILL LEFT$ LEN LET LINE LLIST LOAD LOC LOCATE LOF LOG LPRINT USING LSET MERGE MID$ MKDIR MKD$ MKI$ MKS$ MOD NAME NEW NEXT NOISE NOT OCT$ ON OR PEN PLAY STRIG OPEN OPTION BASE OUT PAINT PALETTE PCOPY PEEK PMAP POINT POKE POS PRINT PRINT] PSET PRESET PUT RANDOMIZE READ REM RENUM RESET|0 RESTORE RESUME RETURN|0 RIGHT$ RMDIR RND RSET RUN SAVE SCREEN SGN SHELL SIN SOUND SPACE$ SPC SQR STEP STICK STOP STR$ STRING$ SWAP SYSTEM TAB TAN TIME$ TIMER TROFF TRON TO USR VAL VARPTR VARPTR$ VIEW WAIT WHILE WEND WIDTH WINDOW WRITE XOR"
    },
    c: [E.QSM, E.C("REM", "$", {
      r: 10
    }), E.C("'", "$", {
      r: 0
    }), {
      cN: "symbol",
      b: "^[0-9]+ ",
      r: 10
    }, {
      cN: "number",
      b: "\\b([0-9]+[0-9edED.]*[#!]?)",
      r: 0
    }, {
      cN: "number",
      b: "(&[hH][0-9a-fA-F]{1,4})"
    }, {
      cN: "number",
      b: "(&[oO][0-7]{1,6})"
    }]
  };
});
hljs.registerLanguage("ldif", function (e) {
  return {
    c: [{
      cN: "attribute",
      b: "^dn",
      e: ": ",
      eE: !0,
      starts: {
        e: "$",
        r: 0
      },
      r: 10
    }, {
      cN: "attribute",
      b: "^\\w",
      e: ": ",
      eE: !0,
      starts: {
        e: "$",
        r: 0
      }
    }, {
      cN: "literal",
      b: "^-",
      e: "$"
    }, e.HCM]
  };
});
hljs.registerLanguage("xl", function (e) {
  var t = "ObjectLoader Animate MovieCredits Slides Filters Shading Materials LensFlare Mapping VLCAudioVideo StereoDecoder PointCloud NetworkAccess RemoteControl RegExp ChromaKey Snowfall NodeJS Speech Charts",
      o = {
    keyword: "if then else do while until for loop import with is as where when by data constant integer real text name boolean symbol infix prefix postfix block tree",
    literal: "true false nil",
    built_in: "in mod rem and or xor not abs sign floor ceil sqrt sin cos tan asin acos atan exp expm1 log log2 log10 log1p pi at text_length text_range text_find text_replace contains page slide basic_slide title_slide title subtitle fade_in fade_out fade_at clear_color color line_color line_width texture_wrap texture_transform texture scale_?x scale_?y scale_?z? translate_?x translate_?y translate_?z? rotate_?x rotate_?y rotate_?z? rectangle circle ellipse sphere path line_to move_to quad_to curve_to theme background contents locally time mouse_?x mouse_?y mouse_buttons " + t
  },
      a = {
    cN: "string",
    b: '"',
    e: '"',
    i: "\\n"
  },
      r = {
    cN: "string",
    b: "'",
    e: "'",
    i: "\\n"
  },
      i = {
    cN: "string",
    b: "<<",
    e: ">>"
  },
      l = {
    cN: "number",
    b: "[0-9]+#[0-9A-Z_]+(\\.[0-9-A-Z_]+)?#?([Ee][+-]?[0-9]+)?"
  },
      n = {
    bK: "import",
    e: "$",
    k: o,
    c: [a]
  },
      s = {
    cN: "function",
    b: /[a-z][^\n]*->/,
    rB: !0,
    e: /->/,
    c: [e.inherit(e.TM, {
      starts: {
        eW: !0,
        k: o
      }
    })]
  };
  return {
    aliases: ["tao"],
    l: /[a-zA-Z][a-zA-Z0-9_?]*/,
    k: o,
    c: [e.CLCM, e.CBCM, a, r, i, s, n, l, e.NM]
  };
});
hljs.registerLanguage("ada", function (e) {
  var r = "\\d(_|\\d)*",
      t = "[eE][-+]?" + r,
      s = r + "(\\." + r + ")?(" + t + ")?",
      n = "\\w+",
      a = r + "#" + n + "(\\." + n + ")?#(" + t + ")?",
      i = "\\b(" + a + "|" + s + ")",
      c = "[A-Za-z](_?[A-Za-z0-9.])*",
      o = "[]{}%#'\"",
      b = e.C("--", "$"),
      d = {
    b: "\\s+:\\s+",
    e: "\\s*(:=|;|\\)|=>|$)",
    i: o,
    c: [{
      bK: "loop for declare others",
      endsParent: !0
    }, {
      cN: "keyword",
      bK: "not null constant access function procedure in out aliased exception"
    }, {
      cN: "type",
      b: c,
      endsParent: !0,
      r: 0
    }]
  };
  return {
    cI: !0,
    k: {
      keyword: "abort else new return abs elsif not reverse abstract end accept entry select access exception of separate aliased exit or some all others subtype and for out synchronized array function overriding at tagged generic package task begin goto pragma terminate body private then if procedure type case in protected constant interface is raise use declare range delay limited record when delta loop rem while digits renames with do mod requeue xor",
      literal: "True False"
    },
    c: [b, {
      cN: "string",
      b: /"/,
      e: /"/,
      c: [{
        b: /""/,
        r: 0
      }]
    }, {
      cN: "string",
      b: /'.'/
    }, {
      cN: "number",
      b: i,
      r: 0
    }, {
      cN: "symbol",
      b: "'" + c
    }, {
      cN: "title",
      b: "(\\bwith\\s+)?(\\bprivate\\s+)?\\bpackage\\s+(\\bbody\\s+)?",
      e: "(is|$)",
      k: "package body",
      eB: !0,
      eE: !0,
      i: o
    }, {
      b: "(\\b(with|overriding)\\s+)?\\b(function|procedure)\\s+",
      e: "(\\bis|\\bwith|\\brenames|\\)\\s*;)",
      k: "overriding function procedure with is renames return",
      rB: !0,
      c: [b, {
        cN: "title",
        b: "(\\bwith\\s+)?\\b(function|procedure)\\s+",
        e: "(\\(|\\s+|$)",
        eB: !0,
        eE: !0,
        i: o
      }, d, {
        cN: "type",
        b: "\\breturn\\s+",
        e: "(\\s+|;|$)",
        k: "return",
        eB: !0,
        eE: !0,
        endsParent: !0,
        i: o
      }]
    }, {
      cN: "type",
      b: "\\b(sub)?type\\s+",
      e: "\\s+",
      k: "type",
      eB: !0,
      i: o
    }, d]
  };
});
hljs.registerLanguage("ini", function (e) {
  var b = {
    cN: "string",
    c: [e.BE],
    v: [{
      b: "'''",
      e: "'''",
      r: 10
    }, {
      b: '"""',
      e: '"""',
      r: 10
    }, {
      b: '"',
      e: '"'
    }, {
      b: "'",
      e: "'"
    }]
  };
  return {
    aliases: ["toml"],
    cI: !0,
    i: /\S/,
    c: [e.C(";", "$"), e.HCM, {
      cN: "section",
      b: /^\s*\[+/,
      e: /\]+/
    }, {
      b: /^[a-z0-9\[\]_-]+\s*=\s*/,
      e: "$",
      rB: !0,
      c: [{
        cN: "attr",
        b: /[a-z0-9\[\]_-]+/
      }, {
        b: /=/,
        eW: !0,
        r: 0,
        c: [{
          cN: "literal",
          b: /\bon|off|true|false|yes|no\b/
        }, {
          cN: "variable",
          v: [{
            b: /\$[\w\d"][\w\d_]*/
          }, {
            b: /\$\{(.*?)}/
          }]
        }, b, {
          cN: "number",
          b: /([\+\-]+)?[\d]+_[\d_]+/
        }, e.NM]
      }]
    }]
  };
});
hljs.registerLanguage("taggerscript", function (e) {
  var c = {
    cN: "comment",
    b: /\$noop\(/,
    e: /\)/,
    c: [{
      b: /\(/,
      e: /\)/,
      c: ["self", {
        b: /\\./
      }]
    }],
    r: 10
  },
      r = {
    cN: "keyword",
    b: /\$(?!noop)[a-zA-Z][_a-zA-Z0-9]*/,
    e: /\(/,
    eE: !0
  },
      a = {
    cN: "variable",
    b: /%[_a-zA-Z0-9:]*/,
    e: "%"
  },
      b = {
    cN: "symbol",
    b: /\\./
  };
  return {
    c: [c, r, a, b]
  };
});
hljs.registerLanguage("prolog", function (c) {
  var b = {
    b: /[a-z][A-Za-z0-9_]*/,
    r: 0
  },
      r = {
    cN: "symbol",
    v: [{
      b: /[A-Z][a-zA-Z0-9_]*/
    }, {
      b: /_[A-Za-z0-9_]*/
    }],
    r: 0
  },
      e = {
    b: /\(/,
    e: /\)/,
    r: 0
  },
      n = {
    b: /\[/,
    e: /\]/
  },
      a = {
    cN: "comment",
    b: /%/,
    e: /$/,
    c: [c.PWM]
  },
      t = {
    cN: "string",
    b: /`/,
    e: /`/,
    c: [c.BE]
  },
      g = {
    cN: "string",
    b: /0\'(\\\'|.)/
  },
      s = {
    cN: "string",
    b: /0\'\\s/
  },
      o = {
    b: /:-/
  },
      N = [b, r, e, o, n, a, c.CBCM, c.QSM, c.ASM, t, g, s, c.CNM];
  return e.c = N, n.c = N, {
    c: N.concat([{
      b: /\.$/
    }])
  };
});
hljs.registerLanguage("javascript", function (e) {
  var r = "[A-Za-z$_][0-9A-Za-z$_]*",
      t = {
    keyword: "in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await static import from as",
    literal: "true false null undefined NaN Infinity",
    built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"
  },
      a = {
    cN: "number",
    v: [{
      b: "\\b(0[bB][01]+)"
    }, {
      b: "\\b(0[oO][0-7]+)"
    }, {
      b: e.CNR
    }],
    r: 0
  },
      n = {
    cN: "subst",
    b: "\\$\\{",
    e: "\\}",
    k: t,
    c: []
  },
      c = {
    cN: "string",
    b: "`",
    e: "`",
    c: [e.BE, n]
  };
  n.c = [e.ASM, e.QSM, c, a, e.RM];
  var s = n.c.concat([e.CBCM, e.CLCM]);
  return {
    aliases: ["js", "jsx"],
    k: t,
    c: [{
      cN: "meta",
      r: 10,
      b: /^\s*['"]use (strict|asm)['"]/
    }, {
      cN: "meta",
      b: /^#!/,
      e: /$/
    }, e.ASM, e.QSM, c, e.CLCM, e.CBCM, a, {
      b: /[{,]\s*/,
      r: 0,
      c: [{
        b: r + "\\s*:",
        rB: !0,
        r: 0,
        c: [{
          cN: "attr",
          b: r,
          r: 0
        }]
      }]
    }, {
      b: "(" + e.RSR + "|\\b(case|return|throw)\\b)\\s*",
      k: "return throw case",
      c: [e.CLCM, e.CBCM, e.RM, {
        cN: "function",
        b: "(\\(.*?\\)|" + r + ")\\s*=>",
        rB: !0,
        e: "\\s*=>",
        c: [{
          cN: "params",
          v: [{
            b: r
          }, {
            b: /\(\s*\)/
          }, {
            b: /\(/,
            e: /\)/,
            eB: !0,
            eE: !0,
            k: t,
            c: s
          }]
        }]
      }, {
        b: /</,
        e: /(\/\w+|\w+\/)>/,
        sL: "xml",
        c: [{
          b: /<\w+\s*\/>/,
          skip: !0
        }, {
          b: /<\w+/,
          e: /(\/\w+|\w+\/)>/,
          skip: !0,
          c: [{
            b: /<\w+\s*\/>/,
            skip: !0
          }, "self"]
        }]
      }],
      r: 0
    }, {
      cN: "function",
      bK: "function",
      e: /\{/,
      eE: !0,
      c: [e.inherit(e.TM, {
        b: r
      }), {
        cN: "params",
        b: /\(/,
        e: /\)/,
        eB: !0,
        eE: !0,
        c: s
      }],
      i: /\[|%/
    }, {
      b: /\$[(.]/
    }, e.METHOD_GUARD, {
      cN: "class",
      bK: "class",
      e: /[{;=]/,
      eE: !0,
      i: /[:"\[\]]/,
      c: [{
        bK: "extends"
      }, e.UTM]
    }, {
      bK: "constructor",
      e: /\{/,
      eE: !0
    }],
    i: /#(?!!)/
  };
});
hljs.registerLanguage("python", function (e) {
  var r = {
    keyword: "and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda async await nonlocal|10 None True False",
    built_in: "Ellipsis NotImplemented"
  },
      b = {
    cN: "meta",
    b: /^(>>>|\.\.\.) /
  },
      c = {
    cN: "subst",
    b: /\{/,
    e: /\}/,
    k: r,
    i: /#/
  },
      a = {
    cN: "string",
    c: [e.BE],
    v: [{
      b: /(u|b)?r?'''/,
      e: /'''/,
      c: [b],
      r: 10
    }, {
      b: /(u|b)?r?"""/,
      e: /"""/,
      c: [b],
      r: 10
    }, {
      b: /(fr|rf|f)'''/,
      e: /'''/,
      c: [b, c]
    }, {
      b: /(fr|rf|f)"""/,
      e: /"""/,
      c: [b, c]
    }, {
      b: /(u|r|ur)'/,
      e: /'/,
      r: 10
    }, {
      b: /(u|r|ur)"/,
      e: /"/,
      r: 10
    }, {
      b: /(b|br)'/,
      e: /'/
    }, {
      b: /(b|br)"/,
      e: /"/
    }, {
      b: /(fr|rf|f)'/,
      e: /'/,
      c: [c]
    }, {
      b: /(fr|rf|f)"/,
      e: /"/,
      c: [c]
    }, e.ASM, e.QSM]
  },
      s = {
    cN: "number",
    r: 0,
    v: [{
      b: e.BNR + "[lLjJ]?"
    }, {
      b: "\\b(0o[0-7]+)[lLjJ]?"
    }, {
      b: e.CNR + "[lLjJ]?"
    }]
  },
      i = {
    cN: "params",
    b: /\(/,
    e: /\)/,
    c: ["self", b, s, a]
  };
  return c.c = [a, s, b], {
    aliases: ["py", "gyp"],
    k: r,
    i: /(<\/|->|\?)|=>/,
    c: [b, s, a, e.HCM, {
      v: [{
        cN: "function",
        bK: "def"
      }, {
        cN: "class",
        bK: "class"
      }],
      e: /:/,
      i: /[${=;\n,]/,
      c: [e.UTM, i, {
        b: /->/,
        eW: !0,
        k: "None"
      }]
    }, {
      cN: "meta",
      b: /^[\t ]*@/,
      e: /$/
    }, {
      b: /\b(print|exec)\(/
    }]
  };
});
hljs.registerLanguage("applescript", function (e) {
  var t = e.inherit(e.QSM, {
    i: ""
  }),
      r = {
    cN: "params",
    b: "\\(",
    e: "\\)",
    c: ["self", e.CNM, t]
  },
      i = e.C("--", "$"),
      o = e.C("\\(\\*", "\\*\\)", {
    c: ["self", i]
  }),
      n = [i, o, e.HCM];
  return {
    aliases: ["osascript"],
    k: {
      keyword: "about above after against and around as at back before beginning behind below beneath beside between but by considering contain contains continue copy div does eighth else end equal equals error every exit fifth first for fourth from front get given global if ignoring in into is it its last local me middle mod my ninth not of on onto or over prop property put ref reference repeat returning script second set seventh since sixth some tell tenth that the|0 then third through thru timeout times to transaction try until where while whose with without",
      literal: "AppleScript false linefeed return pi quote result space tab true",
      built_in: "alias application boolean class constant date file integer list number real record string text activate beep count delay launch log offset read round run say summarize write character characters contents day frontmost id item length month name paragraph paragraphs rest reverse running time version weekday word words year"
    },
    c: [t, e.CNM, {
      cN: "built_in",
      b: "\\b(clipboard info|the clipboard|info for|list (disks|folder)|mount volume|path to|(close|open for) access|(get|set) eof|current date|do shell script|get volume settings|random number|set volume|system attribute|system info|time to GMT|(load|run|store) script|scripting components|ASCII (character|number)|localized string|choose (application|color|file|file name|folder|from list|remote application|URL)|display (alert|dialog))\\b|^\\s*return\\b"
    }, {
      cN: "literal",
      b: "\\b(text item delimiters|current application|missing value)\\b"
    }, {
      cN: "keyword",
      b: "\\b(apart from|aside from|instead of|out of|greater than|isn't|(doesn't|does not) (equal|come before|come after|contain)|(greater|less) than( or equal)?|(starts?|ends|begins?) with|contained by|comes (before|after)|a (ref|reference)|POSIX file|POSIX path|(date|time) string|quoted form)\\b"
    }, {
      bK: "on",
      i: "[${=;\\n]",
      c: [e.UTM, r]
    }].concat(n),
    i: "//|->|=>|\\[\\["
  };
});
hljs.registerLanguage("stylus", function (e) {
  var t = {
    cN: "variable",
    b: "\\$" + e.IR
  },
      o = {
    cN: "number",
    b: "#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})"
  },
      i = ["charset", "css", "debug", "extend", "font-face", "for", "import", "include", "media", "mixin", "page", "warn", "while"],
      r = ["after", "before", "first-letter", "first-line", "active", "first-child", "focus", "hover", "lang", "link", "visited"],
      n = ["a", "abbr", "address", "article", "aside", "audio", "b", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "dd", "del", "details", "dfn", "div", "dl", "dt", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "mark", "menu", "nav", "object", "ol", "p", "q", "quote", "samp", "section", "span", "strong", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "ul", "var", "video"],
      a = "[\\.\\s\\n\\[\\:,]",
      l = ["align-content", "align-items", "align-self", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "auto", "backface-visibility", "background", "background-attachment", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-repeat", "background-size", "border", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "clear", "clip", "clip-path", "color", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "content", "counter-increment", "counter-reset", "cursor", "direction", "display", "empty-cells", "filter", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "font", "font-family", "font-feature-settings", "font-kerning", "font-language-override", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-variant-ligatures", "font-weight", "height", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "ime-mode", "inherit", "initial", "justify-content", "left", "letter-spacing", "line-height", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-bottom", "margin-left", "margin-right", "margin-top", "marks", "mask", "max-height", "max-width", "min-height", "min-width", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "none", "normal", "object-fit", "object-position", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-wrap", "overflow-x", "overflow-y", "padding", "padding-bottom", "padding-left", "padding-right", "padding-top", "page-break-after", "page-break-before", "page-break-inside", "perspective", "perspective-origin", "pointer-events", "position", "quotes", "resize", "right", "tab-size", "table-layout", "text-align", "text-align-last", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-style", "text-indent", "text-overflow", "text-rendering", "text-shadow", "text-transform", "text-underline-position", "top", "transform", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "vertical-align", "visibility", "white-space", "widows", "width", "word-break", "word-spacing", "word-wrap", "z-index"],
      d = ["\\?", "(\\bReturn\\b)", "(\\bEnd\\b)", "(\\bend\\b)", "(\\bdef\\b)", ";", "#\\s", "\\*\\s", "===\\s", "\\|", "%"];
  return {
    aliases: ["styl"],
    cI: !1,
    k: "if else for in",
    i: "(" + d.join("|") + ")",
    c: [e.QSM, e.ASM, e.CLCM, e.CBCM, o, {
      b: "\\.[a-zA-Z][a-zA-Z0-9_-]*" + a,
      rB: !0,
      c: [{
        cN: "selector-class",
        b: "\\.[a-zA-Z][a-zA-Z0-9_-]*"
      }]
    }, {
      b: "\\#[a-zA-Z][a-zA-Z0-9_-]*" + a,
      rB: !0,
      c: [{
        cN: "selector-id",
        b: "\\#[a-zA-Z][a-zA-Z0-9_-]*"
      }]
    }, {
      b: "\\b(" + n.join("|") + ")" + a,
      rB: !0,
      c: [{
        cN: "selector-tag",
        b: "\\b[a-zA-Z][a-zA-Z0-9_-]*"
      }]
    }, {
      b: "&?:?:\\b(" + r.join("|") + ")" + a
    }, {
      b: "@(" + i.join("|") + ")\\b"
    }, t, e.CSSNM, e.NM, {
      cN: "function",
      b: "^[a-zA-Z][a-zA-Z0-9_-]*\\(.*\\)",
      i: "[\\n]",
      rB: !0,
      c: [{
        cN: "title",
        b: "\\b[a-zA-Z][a-zA-Z0-9_-]*"
      }, {
        cN: "params",
        b: /\(/,
        e: /\)/,
        c: [o, t, e.ASM, e.CSSNM, e.NM, e.QSM]
      }]
    }, {
      cN: "attribute",
      b: "\\b(" + l.reverse().join("|") + ")\\b",
      starts: {
        e: /;|$/,
        c: [o, t, e.ASM, e.QSM, e.CSSNM, e.NM, e.CBCM],
        i: /\./,
        r: 0
      }
    }]
  };
});
hljs.registerLanguage("tcl", function (e) {
  return {
    aliases: ["tk"],
    k: "after append apply array auto_execok auto_import auto_load auto_mkindex auto_mkindex_old auto_qualify auto_reset bgerror binary break catch cd chan clock close concat continue dde dict encoding eof error eval exec exit expr fblocked fconfigure fcopy file fileevent filename flush for foreach format gets glob global history http if incr info interp join lappend|10 lassign|10 lindex|10 linsert|10 list llength|10 load lrange|10 lrepeat|10 lreplace|10 lreverse|10 lsearch|10 lset|10 lsort|10 mathfunc mathop memory msgcat namespace open package parray pid pkg::create pkg_mkIndex platform platform::shell proc puts pwd read refchan regexp registry regsub|10 rename return safe scan seek set socket source split string subst switch tcl_endOfWord tcl_findLibrary tcl_startOfNextWord tcl_startOfPreviousWord tcl_wordBreakAfter tcl_wordBreakBefore tcltest tclvars tell time tm trace unknown unload unset update uplevel upvar variable vwait while",
    c: [e.C(";[ \\t]*#", "$"), e.C("^[ \\t]*#", "$"), {
      bK: "proc",
      e: "[\\{]",
      eE: !0,
      c: [{
        cN: "title",
        b: "[ \\t\\n\\r]+(::)?[a-zA-Z_]((::)?[a-zA-Z0-9_])*",
        e: "[ \\t\\n\\r]",
        eW: !0,
        eE: !0
      }]
    }, {
      eE: !0,
      v: [{
        b: "\\$(\\{)?(::)?[a-zA-Z_]((::)?[a-zA-Z0-9_])*\\(([a-zA-Z0-9_])*\\)",
        e: "[^a-zA-Z0-9_\\}\\$]"
      }, {
        b: "\\$(\\{)?(::)?[a-zA-Z_]((::)?[a-zA-Z0-9_])*",
        e: "(\\))?[^a-zA-Z0-9_\\}\\$]"
      }]
    }, {
      cN: "string",
      c: [e.BE],
      v: [e.inherit(e.ASM, {
        i: null
      }), e.inherit(e.QSM, {
        i: null
      })]
    }, {
      cN: "number",
      v: [e.BNM, e.CNM]
    }]
  };
});
hljs.registerLanguage("elm", function (e) {
  var i = {
    v: [e.C("--", "$"), e.C("{-", "-}", {
      c: ["self"]
    })]
  },
      t = {
    cN: "type",
    b: "\\b[A-Z][\\w']*",
    r: 0
  },
      c = {
    b: "\\(",
    e: "\\)",
    i: '"',
    c: [{
      cN: "type",
      b: "\\b[A-Z][\\w]*(\\((\\.\\.|,|\\w+)\\))?"
    }, i]
  },
      n = {
    b: "{",
    e: "}",
    c: c.c
  };
  return {
    k: "let in if then else case of where module import exposing type alias as infix infixl infixr port effect command subscription",
    c: [{
      bK: "port effect module",
      e: "exposing",
      k: "port effect module where command subscription exposing",
      c: [c, i],
      i: "\\W\\.|;"
    }, {
      b: "import",
      e: "$",
      k: "import as exposing",
      c: [c, i],
      i: "\\W\\.|;"
    }, {
      b: "type",
      e: "$",
      k: "type alias",
      c: [t, c, n, i]
    }, {
      bK: "infix infixl infixr",
      e: "$",
      c: [e.CNM, i]
    }, {
      b: "port",
      e: "$",
      k: "port",
      c: [i]
    }, e.QSM, e.CNM, t, e.inherit(e.TM, {
      b: "^[_a-z][\\w']*"
    }), i, {
      b: "->|<-"
    }],
    i: /;/
  };
});
hljs.registerLanguage("fortran", function (e) {
  var t = {
    cN: "params",
    b: "\\(",
    e: "\\)"
  },
      n = {
    literal: ".False. .True.",
    keyword: "kind do while private call intrinsic where elsewhere type endtype endmodule endselect endinterface end enddo endif if forall endforall only contains default return stop then public subroutine|10 function program .and. .or. .not. .le. .eq. .ge. .gt. .lt. goto save else use module select case access blank direct exist file fmt form formatted iostat name named nextrec number opened rec recl sequential status unformatted unit continue format pause cycle exit c_null_char c_alert c_backspace c_form_feed flush wait decimal round iomsg synchronous nopass non_overridable pass protected volatile abstract extends import non_intrinsic value deferred generic final enumerator class associate bind enum c_int c_short c_long c_long_long c_signed_char c_size_t c_int8_t c_int16_t c_int32_t c_int64_t c_int_least8_t c_int_least16_t c_int_least32_t c_int_least64_t c_int_fast8_t c_int_fast16_t c_int_fast32_t c_int_fast64_t c_intmax_t C_intptr_t c_float c_double c_long_double c_float_complex c_double_complex c_long_double_complex c_bool c_char c_null_ptr c_null_funptr c_new_line c_carriage_return c_horizontal_tab c_vertical_tab iso_c_binding c_loc c_funloc c_associated  c_f_pointer c_ptr c_funptr iso_fortran_env character_storage_size error_unit file_storage_size input_unit iostat_end iostat_eor numeric_storage_size output_unit c_f_procpointer ieee_arithmetic ieee_support_underflow_control ieee_get_underflow_mode ieee_set_underflow_mode newunit contiguous recursive pad position action delim readwrite eor advance nml interface procedure namelist include sequence elemental pure integer real character complex logical dimension allocatable|10 parameter external implicit|10 none double precision assign intent optional pointer target in out common equivalence data",
    built_in: "alog alog10 amax0 amax1 amin0 amin1 amod cabs ccos cexp clog csin csqrt dabs dacos dasin datan datan2 dcos dcosh ddim dexp dint dlog dlog10 dmax1 dmin1 dmod dnint dsign dsin dsinh dsqrt dtan dtanh float iabs idim idint idnint ifix isign max0 max1 min0 min1 sngl algama cdabs cdcos cdexp cdlog cdsin cdsqrt cqabs cqcos cqexp cqlog cqsin cqsqrt dcmplx dconjg derf derfc dfloat dgamma dimag dlgama iqint qabs qacos qasin qatan qatan2 qcmplx qconjg qcos qcosh qdim qerf qerfc qexp qgamma qimag qlgama qlog qlog10 qmax1 qmin1 qmod qnint qsign qsin qsinh qsqrt qtan qtanh abs acos aimag aint anint asin atan atan2 char cmplx conjg cos cosh exp ichar index int log log10 max min nint sign sin sinh sqrt tan tanh print write dim lge lgt lle llt mod nullify allocate deallocate adjustl adjustr all allocated any associated bit_size btest ceiling count cshift date_and_time digits dot_product eoshift epsilon exponent floor fraction huge iand ibclr ibits ibset ieor ior ishft ishftc lbound len_trim matmul maxexponent maxloc maxval merge minexponent minloc minval modulo mvbits nearest pack present product radix random_number random_seed range repeat reshape rrspacing scale scan selected_int_kind selected_real_kind set_exponent shape size spacing spread sum system_clock tiny transpose trim ubound unpack verify achar iachar transfer dble entry dprod cpu_time command_argument_count get_command get_command_argument get_environment_variable is_iostat_end ieee_arithmetic ieee_support_underflow_control ieee_get_underflow_mode ieee_set_underflow_mode is_iostat_eor move_alloc new_line selected_char_kind same_type_as extends_type_ofacosh asinh atanh bessel_j0 bessel_j1 bessel_jn bessel_y0 bessel_y1 bessel_yn erf erfc erfc_scaled gamma log_gamma hypot norm2 atomic_define atomic_ref execute_command_line leadz trailz storage_size merge_bits bge bgt ble blt dshiftl dshiftr findloc iall iany iparity image_index lcobound ucobound maskl maskr num_images parity popcnt poppar shifta shiftl shiftr this_image"
  };
  return {
    cI: !0,
    aliases: ["f90", "f95"],
    k: n,
    i: /\/\*/,
    c: [e.inherit(e.ASM, {
      cN: "string",
      r: 0
    }), e.inherit(e.QSM, {
      cN: "string",
      r: 0
    }), {
      cN: "function",
      bK: "subroutine function program",
      i: "[${=\\n]",
      c: [e.UTM, t]
    }, e.C("!", "$", {
      r: 0
    }), {
      cN: "number",
      b: "(?=\\b|\\+|\\-|\\.)(?=\\.\\d|\\d)(?:\\d+)?(?:\\.?\\d*)(?:[de][+-]?\\d+)?\\b\\.?",
      r: 0
    }]
  };
});
hljs.registerLanguage("livecodeserver", function (e) {
  var r = {
    b: "\\b[gtps][A-Z]+[A-Za-z0-9_\\-]*\\b|\\$_[A-Z]+",
    r: 0
  },
      t = [e.CBCM, e.HCM, e.C("--", "$"), e.C("[^:]//", "$")],
      a = e.inherit(e.TM, {
    v: [{
      b: "\\b_*rig[A-Z]+[A-Za-z0-9_\\-]*"
    }, {
      b: "\\b_[a-z0-9\\-]+"
    }]
  }),
      o = e.inherit(e.TM, {
    b: "\\b([A-Za-z0-9_\\-]+)\\b"
  });
  return {
    cI: !1,
    k: {
      keyword: "$_COOKIE $_FILES $_GET $_GET_BINARY $_GET_RAW $_POST $_POST_BINARY $_POST_RAW $_SESSION $_SERVER codepoint codepoints segment segments codeunit codeunits sentence sentences trueWord trueWords paragraph after byte bytes english the until http forever descending using line real8 with seventh for stdout finally element word words fourth before black ninth sixth characters chars stderr uInt1 uInt1s uInt2 uInt2s stdin string lines relative rel any fifth items from middle mid at else of catch then third it file milliseconds seconds second secs sec int1 int1s int4 int4s internet int2 int2s normal text item last long detailed effective uInt4 uInt4s repeat end repeat URL in try into switch to words https token binfile each tenth as ticks tick system real4 by dateItems without char character ascending eighth whole dateTime numeric short first ftp integer abbreviated abbr abbrev private case while if div mod wrap and or bitAnd bitNot bitOr bitXor among not in a an within contains ends with begins the keys of keys",
      literal: "SIX TEN FORMFEED NINE ZERO NONE SPACE FOUR FALSE COLON CRLF PI COMMA ENDOFFILE EOF EIGHT FIVE QUOTE EMPTY ONE TRUE RETURN CR LINEFEED RIGHT BACKSLASH NULL SEVEN TAB THREE TWO six ten formfeed nine zero none space four false colon crlf pi comma endoffile eof eight five quote empty one true return cr linefeed right backslash null seven tab three two RIVERSION RISTATE FILE_READ_MODE FILE_WRITE_MODE FILE_WRITE_MODE DIR_WRITE_MODE FILE_READ_UMASK FILE_WRITE_UMASK DIR_READ_UMASK DIR_WRITE_UMASK",
      built_in: "put abs acos aliasReference annuity arrayDecode arrayEncode asin atan atan2 average avg avgDev base64Decode base64Encode baseConvert binaryDecode binaryEncode byteOffset byteToNum cachedURL cachedURLs charToNum cipherNames codepointOffset codepointProperty codepointToNum codeunitOffset commandNames compound compress constantNames cos date dateFormat decompress directories diskSpace DNSServers exp exp1 exp2 exp10 extents files flushEvents folders format functionNames geometricMean global globals hasMemory harmonicMean hostAddress hostAddressToName hostName hostNameToAddress isNumber ISOToMac itemOffset keys len length libURLErrorData libUrlFormData libURLftpCommand libURLLastHTTPHeaders libURLLastRHHeaders libUrlMultipartFormAddPart libUrlMultipartFormData libURLVersion lineOffset ln ln1 localNames log log2 log10 longFilePath lower macToISO matchChunk matchText matrixMultiply max md5Digest median merge millisec millisecs millisecond milliseconds min monthNames nativeCharToNum normalizeText num number numToByte numToChar numToCodepoint numToNativeChar offset open openfiles openProcesses openProcessIDs openSockets paragraphOffset paramCount param params peerAddress pendingMessages platform popStdDev populationStandardDeviation populationVariance popVariance processID random randomBytes replaceText result revCreateXMLTree revCreateXMLTreeFromFile revCurrentRecord revCurrentRecordIsFirst revCurrentRecordIsLast revDatabaseColumnCount revDatabaseColumnIsNull revDatabaseColumnLengths revDatabaseColumnNames revDatabaseColumnNamed revDatabaseColumnNumbered revDatabaseColumnTypes revDatabaseConnectResult revDatabaseCursors revDatabaseID revDatabaseTableNames revDatabaseType revDataFromQuery revdb_closeCursor revdb_columnbynumber revdb_columncount revdb_columnisnull revdb_columnlengths revdb_columnnames revdb_columntypes revdb_commit revdb_connect revdb_connections revdb_connectionerr revdb_currentrecord revdb_cursorconnection revdb_cursorerr revdb_cursors revdb_dbtype revdb_disconnect revdb_execute revdb_iseof revdb_isbof revdb_movefirst revdb_movelast revdb_movenext revdb_moveprev revdb_query revdb_querylist revdb_recordcount revdb_rollback revdb_tablenames revGetDatabaseDriverPath revNumberOfRecords revOpenDatabase revOpenDatabases revQueryDatabase revQueryDatabaseBlob revQueryResult revQueryIsAtStart revQueryIsAtEnd revUnixFromMacPath revXMLAttribute revXMLAttributes revXMLAttributeValues revXMLChildContents revXMLChildNames revXMLCreateTreeFromFileWithNamespaces revXMLCreateTreeWithNamespaces revXMLDataFromXPathQuery revXMLEvaluateXPath revXMLFirstChild revXMLMatchingNode revXMLNextSibling revXMLNodeContents revXMLNumberOfChildren revXMLParent revXMLPreviousSibling revXMLRootNode revXMLRPC_CreateRequest revXMLRPC_Documents revXMLRPC_Error revXMLRPC_GetHost revXMLRPC_GetMethod revXMLRPC_GetParam revXMLText revXMLRPC_Execute revXMLRPC_GetParamCount revXMLRPC_GetParamNode revXMLRPC_GetParamType revXMLRPC_GetPath revXMLRPC_GetPort revXMLRPC_GetProtocol revXMLRPC_GetRequest revXMLRPC_GetResponse revXMLRPC_GetSocket revXMLTree revXMLTrees revXMLValidateDTD revZipDescribeItem revZipEnumerateItems revZipOpenArchives round sampVariance sec secs seconds sentenceOffset sha1Digest shell shortFilePath sin specialFolderPath sqrt standardDeviation statRound stdDev sum sysError systemVersion tan tempName textDecode textEncode tick ticks time to tokenOffset toLower toUpper transpose truewordOffset trunc uniDecode uniEncode upper URLDecode URLEncode URLStatus uuid value variableNames variance version waitDepth weekdayNames wordOffset xsltApplyStylesheet xsltApplyStylesheetFromFile xsltLoadStylesheet xsltLoadStylesheetFromFile add breakpoint cancel clear local variable file word line folder directory URL close socket process combine constant convert create new alias folder directory decrypt delete variable word line folder directory URL dispatch divide do encrypt filter get include intersect kill libURLDownloadToFile libURLFollowHttpRedirects libURLftpUpload libURLftpUploadFile libURLresetAll libUrlSetAuthCallback libURLSetCustomHTTPHeaders libUrlSetExpect100 libURLSetFTPListCommand libURLSetFTPMode libURLSetFTPStopTime libURLSetStatusCallback load multiply socket prepare process post seek rel relative read from process rename replace require resetAll resolve revAddXMLNode revAppendXML revCloseCursor revCloseDatabase revCommitDatabase revCopyFile revCopyFolder revCopyXMLNode revDeleteFolder revDeleteXMLNode revDeleteAllXMLTrees revDeleteXMLTree revExecuteSQL revGoURL revInsertXMLNode revMoveFolder revMoveToFirstRecord revMoveToLastRecord revMoveToNextRecord revMoveToPreviousRecord revMoveToRecord revMoveXMLNode revPutIntoXMLNode revRollBackDatabase revSetDatabaseDriverPath revSetXMLAttribute revXMLRPC_AddParam revXMLRPC_DeleteAllDocuments revXMLAddDTD revXMLRPC_Free revXMLRPC_FreeAll revXMLRPC_DeleteDocument revXMLRPC_DeleteParam revXMLRPC_SetHost revXMLRPC_SetMethod revXMLRPC_SetPort revXMLRPC_SetProtocol revXMLRPC_SetSocket revZipAddItemWithData revZipAddItemWithFile revZipAddUncompressedItemWithData revZipAddUncompressedItemWithFile revZipCancel revZipCloseArchive revZipDeleteItem revZipExtractItemToFile revZipExtractItemToVariable revZipSetProgressCallback revZipRenameItem revZipReplaceItemWithData revZipReplaceItemWithFile revZipOpenArchive send set sort split start stop subtract union unload wait write"
    },
    c: [r, {
      cN: "keyword",
      b: "\\bend\\sif\\b"
    }, {
      cN: "function",
      bK: "function",
      e: "$",
      c: [r, o, e.ASM, e.QSM, e.BNM, e.CNM, a]
    }, {
      cN: "function",
      b: "\\bend\\s+",
      e: "$",
      k: "end",
      c: [o, a],
      r: 0
    }, {
      bK: "command on",
      e: "$",
      c: [r, o, e.ASM, e.QSM, e.BNM, e.CNM, a]
    }, {
      cN: "meta",
      v: [{
        b: "<\\?(rev|lc|livecode)",
        r: 10
      }, {
        b: "<\\?"
      }, {
        b: "\\?>"
      }]
    }, e.ASM, e.QSM, e.BNM, e.CNM, a].concat(t),
    i: ";$|^\\[|^=|&|{"
  };
});
hljs.registerLanguage("nix", function (e) {
  var r = {
    keyword: "rec with let in inherit assert if else then",
    literal: "true false or and null",
    built_in: "import abort baseNameOf dirOf isNull builtins map removeAttrs throw toString derivation"
  },
      t = {
    cN: "subst",
    b: /\$\{/,
    e: /}/,
    k: r
  },
      i = {
    b: /[a-zA-Z0-9-_]+(\s*=)/,
    rB: !0,
    r: 0,
    c: [{
      cN: "attr",
      b: /\S+/
    }]
  },
      s = {
    cN: "string",
    c: [t],
    v: [{
      b: "''",
      e: "''"
    }, {
      b: '"',
      e: '"'
    }]
  },
      a = [e.NM, e.HCM, e.CBCM, s, i];
  return t.c = a, {
    aliases: ["nixos"],
    k: r,
    c: a
  };
});
hljs.registerLanguage("actionscript", function (e) {
  var a = "[a-zA-Z_$][a-zA-Z0-9_$]*",
      t = "([*]|[a-zA-Z_$][a-zA-Z0-9_$]*)",
      c = {
    cN: "rest_arg",
    b: "[.]{3}",
    e: a,
    r: 10
  };
  return {
    aliases: ["as"],
    k: {
      keyword: "as break case catch class const continue default delete do dynamic each else extends final finally for function get if implements import in include instanceof interface internal is namespace native new override package private protected public return set static super switch this throw try typeof use var void while with",
      literal: "true false null undefined"
    },
    c: [e.ASM, e.QSM, e.CLCM, e.CBCM, e.CNM, {
      cN: "class",
      bK: "package",
      e: "{",
      c: [e.TM]
    }, {
      cN: "class",
      bK: "class interface",
      e: "{",
      eE: !0,
      c: [{
        bK: "extends implements"
      }, e.TM]
    }, {
      cN: "meta",
      bK: "import include",
      e: ";",
      k: {
        "meta-keyword": "import include"
      }
    }, {
      cN: "function",
      bK: "function",
      e: "[{;]",
      eE: !0,
      i: "\\S",
      c: [e.TM, {
        cN: "params",
        b: "\\(",
        e: "\\)",
        c: [e.ASM, e.QSM, e.CLCM, e.CBCM, c]
      }, {
        b: ":\\s*" + t
      }]
    }, e.METHOD_GUARD],
    i: /#/
  };
});
hljs.registerLanguage("vhdl", function (e) {
  var r = "\\d(_|\\d)*",
      t = "[eE][-+]?" + r,
      n = r + "(\\." + r + ")?(" + t + ")?",
      o = "\\w+",
      i = r + "#" + o + "(\\." + o + ")?#(" + t + ")?",
      a = "\\b(" + i + "|" + n + ")";
  return {
    cI: !0,
    k: {
      keyword: "abs access after alias all and architecture array assert assume assume_guarantee attribute begin block body buffer bus case component configuration constant context cover disconnect downto default else elsif end entity exit fairness file for force function generate generic group guarded if impure in inertial inout is label library linkage literal loop map mod nand new next nor not null of on open or others out package port postponed procedure process property protected pure range record register reject release rem report restrict restrict_guarantee return rol ror select sequence severity shared signal sla sll sra srl strong subtype then to transport type unaffected units until use variable vmode vprop vunit wait when while with xnor xor",
      built_in: "boolean bit character integer time delay_length natural positive string bit_vector file_open_kind file_open_status std_logic std_logic_vector unsigned signed boolean_vector integer_vector std_ulogic std_ulogic_vector unresolved_unsigned u_unsigned unresolved_signed u_signedreal_vector time_vector",
      literal: "false true note warning error failure line text side width"
    },
    i: "{",
    c: [e.CBCM, e.C("--", "$"), e.QSM, {
      cN: "number",
      b: a,
      r: 0
    }, {
      cN: "string",
      b: "'(U|X|0|1|Z|W|L|H|-)'",
      c: [e.BE]
    }, {
      cN: "symbol",
      b: "'[A-Za-z](_?[A-Za-z0-9])*",
      c: [e.BE]
    }]
  };
});
hljs.registerLanguage("haxe", function (e) {
  var t = "Int Float String Bool Dynamic Void Array ";
  return {
    aliases: ["hx"],
    k: {
      keyword: "break case cast catch continue default do dynamic else enum extern for function here if import in inline never new override package private get set public return static super switch this throw trace try typedef untyped using var while " + t,
      built_in: "trace this",
      literal: "true false null _"
    },
    c: [{
      cN: "string",
      b: "'",
      e: "'",
      c: [e.BE, {
        cN: "subst",
        b: "\\$\\{",
        e: "\\}"
      }, {
        cN: "subst",
        b: "\\$",
        e: "\\W}"
      }]
    }, e.QSM, e.CLCM, e.CBCM, e.CNM, {
      cN: "meta",
      b: "@:",
      e: "$"
    }, {
      cN: "meta",
      b: "#",
      e: "$",
      k: {
        "meta-keyword": "if else elseif end error"
      }
    }, {
      cN: "type",
      b: ":[ 	]*",
      e: "[^A-Za-z0-9_ 	\\->]",
      eB: !0,
      eE: !0,
      r: 0
    }, {
      cN: "type",
      b: ":[ 	]*",
      e: "\\W",
      eB: !0,
      eE: !0
    }, {
      cN: "type",
      b: "new *",
      e: "\\W",
      eB: !0,
      eE: !0
    }, {
      cN: "class",
      bK: "enum",
      e: "\\{",
      c: [e.TM]
    }, {
      cN: "class",
      bK: "abstract",
      e: "[\\{$]",
      c: [{
        cN: "type",
        b: "\\(",
        e: "\\)",
        eB: !0,
        eE: !0
      }, {
        cN: "type",
        b: "from +",
        e: "\\W",
        eB: !0,
        eE: !0
      }, {
        cN: "type",
        b: "to +",
        e: "\\W",
        eB: !0,
        eE: !0
      }, e.TM],
      k: {
        keyword: "abstract from to"
      }
    }, {
      cN: "class",
      b: "\\b(class|interface) +",
      e: "[\\{$]",
      eE: !0,
      k: "class interface",
      c: [{
        cN: "keyword",
        b: "\\b(extends|implements) +",
        k: "extends implements",
        c: [{
          cN: "type",
          b: e.IR,
          r: 0
        }]
      }, e.TM]
    }, {
      cN: "function",
      bK: "function",
      e: "\\(",
      eE: !0,
      i: "\\S",
      c: [e.TM]
    }],
    i: /<\//
  };
});
hljs.registerLanguage("lasso", function (e) {
  var r = "[a-zA-Z_][\\w.]*",
      a = "<\\?(lasso(script)?|=)",
      t = "\\]|\\?>",
      n = {
    literal: "true false none minimal full all void and or not bw nbw ew new cn ncn lt lte gt gte eq neq rx nrx ft",
    built_in: "array date decimal duration integer map pair string tag xml null boolean bytes keyword list locale queue set stack staticarray local var variable global data self inherited currentcapture givenblock",
    keyword: "cache database_names database_schemanames database_tablenames define_tag define_type email_batch encode_set html_comment handle handle_error header if inline iterate ljax_target link link_currentaction link_currentgroup link_currentrecord link_detail link_firstgroup link_firstrecord link_lastgroup link_lastrecord link_nextgroup link_nextrecord link_prevgroup link_prevrecord log loop namespace_using output_none portal private protect records referer referrer repeating resultset rows search_args search_arguments select sort_args sort_arguments thread_atomic value_list while abort case else fail_if fail_ifnot fail if_empty if_false if_null if_true loop_abort loop_continue loop_count params params_up return return_value run_children soap_definetag soap_lastrequest soap_lastresponse tag_name ascending average by define descending do equals frozen group handle_failure import in into join let match max min on order parent protected provide public require returnhome skip split_thread sum take thread to trait type where with yield yieldhome"
  },
      i = e.C("<!--", "-->", {
    r: 0
  }),
      s = {
    cN: "meta",
    b: "\\[noprocess\\]",
    starts: {
      e: "\\[/noprocess\\]",
      rE: !0,
      c: [i]
    }
  },
      l = {
    cN: "meta",
    b: "\\[/noprocess|" + a
  },
      o = {
    cN: "symbol",
    b: "'" + r + "'"
  },
      c = [e.CLCM, e.CBCM, e.inherit(e.CNM, {
    b: e.CNR + "|(-?infinity|NaN)\\b"
  }), e.inherit(e.ASM, {
    i: null
  }), e.inherit(e.QSM, {
    i: null
  }), {
    cN: "string",
    b: "`",
    e: "`"
  }, {
    v: [{
      b: "[#$]" + r
    }, {
      b: "#",
      e: "\\d+",
      i: "\\W"
    }]
  }, {
    cN: "type",
    b: "::\\s*",
    e: r,
    i: "\\W"
  }, {
    cN: "params",
    v: [{
      b: "-(?!infinity)" + r,
      r: 0
    }, {
      b: "(\\.\\.\\.)"
    }]
  }, {
    b: /(->|\.)\s*/,
    r: 0,
    c: [o]
  }, {
    cN: "class",
    bK: "define",
    rE: !0,
    e: "\\(|=>",
    c: [e.inherit(e.TM, {
      b: r + "(=(?!>))?|[-+*/%](?!>)"
    })]
  }];
  return {
    aliases: ["ls", "lassoscript"],
    cI: !0,
    l: r + "|&[lg]t;",
    k: n,
    c: [{
      cN: "meta",
      b: t,
      r: 0,
      starts: {
        e: "\\[|" + a,
        rE: !0,
        r: 0,
        c: [i]
      }
    }, s, l, {
      cN: "meta",
      b: "\\[no_square_brackets",
      starts: {
        e: "\\[/no_square_brackets\\]",
        l: r + "|&[lg]t;",
        k: n,
        c: [{
          cN: "meta",
          b: t,
          r: 0,
          starts: {
            e: "\\[noprocess\\]|" + a,
            rE: !0,
            c: [i]
          }
        }, s, l].concat(c)
      }
    }, {
      cN: "meta",
      b: "\\[",
      r: 0
    }, {
      cN: "meta",
      b: "^#!",
      e: "lasso9$",
      r: 10
    }].concat(c)
  };
});
hljs.registerLanguage("go", function (e) {
  var t = {
    keyword: "break default func interface select case map struct chan else goto package switch const fallthrough if range type continue for import return var go defer bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 uint16 uint32 uint64 int uint uintptr rune",
    literal: "true false iota nil",
    built_in: "append cap close complex copy imag len make new panic print println real recover delete"
  };
  return {
    aliases: ["golang"],
    k: t,
    i: "</",
    c: [e.CLCM, e.CBCM, {
      cN: "string",
      v: [e.QSM, {
        b: "'",
        e: "[^\\\\]'"
      }, {
        b: "`",
        e: "`"
      }]
    }, {
      cN: "number",
      v: [{
        b: e.CNR + "[dflsi]",
        r: 1
      }, e.CNM]
    }, {
      b: /:=/
    }, {
      cN: "function",
      bK: "func",
      e: /\s*\{/,
      eE: !0,
      c: [e.TM, {
        cN: "params",
        b: /\(/,
        e: /\)/,
        k: t,
        i: /["']/
      }]
    }]
  };
});
hljs.registerLanguage("stata", function (e) {
  return {
    aliases: ["do", "ado"],
    cI: !0,
    k: "if else in foreach for forv forva forval forvalu forvalue forvalues by bys bysort xi quietly qui capture about ac ac_7 acprplot acprplot_7 adjust ado adopath adoupdate alpha ameans an ano anov anova anova_estat anova_terms anovadef aorder ap app appe appen append arch arch_dr arch_estat arch_p archlm areg areg_p args arima arima_dr arima_estat arima_p as asmprobit asmprobit_estat asmprobit_lf asmprobit_mfx__dlg asmprobit_p ass asse asser assert avplot avplot_7 avplots avplots_7 bcskew0 bgodfrey binreg bip0_lf biplot bipp_lf bipr_lf bipr_p biprobit bitest bitesti bitowt blogit bmemsize boot bootsamp bootstrap bootstrap_8 boxco_l boxco_p boxcox boxcox_6 boxcox_p bprobit br break brier bro brow brows browse brr brrstat bs bs_7 bsampl_w bsample bsample_7 bsqreg bstat bstat_7 bstat_8 bstrap bstrap_7 ca ca_estat ca_p cabiplot camat canon canon_8 canon_8_p canon_estat canon_p cap caprojection capt captu captur capture cat cc cchart cchart_7 cci cd censobs_table centile cf char chdir checkdlgfiles checkestimationsample checkhlpfiles checksum chelp ci cii cl class classutil clear cli clis clist clo clog clog_lf clog_p clogi clogi_sw clogit clogit_lf clogit_p clogitp clogl_sw cloglog clonevar clslistarray cluster cluster_measures cluster_stop cluster_tree cluster_tree_8 clustermat cmdlog cnr cnre cnreg cnreg_p cnreg_sw cnsreg codebook collaps4 collapse colormult_nb colormult_nw compare compress conf confi confir confirm conren cons const constr constra constrai constrain constraint continue contract copy copyright copysource cor corc corr corr2data corr_anti corr_kmo corr_smc corre correl correla correlat correlate corrgram cou coun count cox cox_p cox_sw coxbase coxhaz coxvar cprplot cprplot_7 crc cret cretu cretur creturn cross cs cscript cscript_log csi ct ct_is ctset ctst_5 ctst_st cttost cumsp cumsp_7 cumul cusum cusum_7 cutil d|0 datasig datasign datasigna datasignat datasignatu datasignatur datasignature datetof db dbeta de dec deco decod decode deff des desc descr descri describ describe destring dfbeta dfgls dfuller di di_g dir dirstats dis discard disp disp_res disp_s displ displa display distinct do doe doed doedi doedit dotplot dotplot_7 dprobit drawnorm drop ds ds_util dstdize duplicates durbina dwstat dydx e|0 ed edi edit egen eivreg emdef en enc enco encod encode eq erase ereg ereg_lf ereg_p ereg_sw ereghet ereghet_glf ereghet_glf_sh ereghet_gp ereghet_ilf ereghet_ilf_sh ereghet_ip eret eretu eretur ereturn err erro error est est_cfexist est_cfname est_clickable est_expand est_hold est_table est_unhold est_unholdok estat estat_default estat_summ estat_vce_only esti estimates etodow etof etomdy ex exi exit expand expandcl fac fact facto factor factor_estat factor_p factor_pca_rotated factor_rotate factormat fcast fcast_compute fcast_graph fdades fdadesc fdadescr fdadescri fdadescrib fdadescribe fdasav fdasave fdause fh_st file open file read file close file filefilter fillin find_hlp_file findfile findit findit_7 fit fl fli flis flist for5_0 form forma format fpredict frac_154 frac_adj frac_chk frac_cox frac_ddp frac_dis frac_dv frac_in frac_mun frac_pp frac_pq frac_pv frac_wgt frac_xo fracgen fracplot fracplot_7 fracpoly fracpred fron_ex fron_hn fron_p fron_tn fron_tn2 frontier ftodate ftoe ftomdy ftowdate g|0 gamhet_glf gamhet_gp gamhet_ilf gamhet_ip gamma gamma_d2 gamma_p gamma_sw gammahet gdi_hexagon gdi_spokes ge gen gene gener genera generat generate genrank genstd genvmean gettoken gl gladder gladder_7 glim_l01 glim_l02 glim_l03 glim_l04 glim_l05 glim_l06 glim_l07 glim_l08 glim_l09 glim_l10 glim_l11 glim_l12 glim_lf glim_mu glim_nw1 glim_nw2 glim_nw3 glim_p glim_v1 glim_v2 glim_v3 glim_v4 glim_v5 glim_v6 glim_v7 glm glm_6 glm_p glm_sw glmpred glo glob globa global glogit glogit_8 glogit_p gmeans gnbre_lf gnbreg gnbreg_5 gnbreg_p gomp_lf gompe_sw gomper_p gompertz gompertzhet gomphet_glf gomphet_glf_sh gomphet_gp gomphet_ilf gomphet_ilf_sh gomphet_ip gphdot gphpen gphprint gprefs gprobi_p gprobit gprobit_8 gr gr7 gr_copy gr_current gr_db gr_describe gr_dir gr_draw gr_draw_replay gr_drop gr_edit gr_editviewopts gr_example gr_example2 gr_export gr_print gr_qscheme gr_query gr_read gr_rename gr_replay gr_save gr_set gr_setscheme gr_table gr_undo gr_use graph graph7 grebar greigen greigen_7 greigen_8 grmeanby grmeanby_7 gs_fileinfo gs_filetype gs_graphinfo gs_stat gsort gwood h|0 hadimvo hareg hausman haver he heck_d2 heckma_p heckman heckp_lf heckpr_p heckprob hel help hereg hetpr_lf hetpr_p hetprob hettest hexdump hilite hist hist_7 histogram hlogit hlu hmeans hotel hotelling hprobit hreg hsearch icd9 icd9_ff icd9p iis impute imtest inbase include inf infi infil infile infix inp inpu input ins insheet insp inspe inspec inspect integ inten intreg intreg_7 intreg_p intrg2_ll intrg_ll intrg_ll2 ipolate iqreg ir irf irf_create irfm iri is_svy is_svysum isid istdize ivprob_1_lf ivprob_lf ivprobit ivprobit_p ivreg ivreg_footnote ivtob_1_lf ivtob_lf ivtobit ivtobit_p jackknife jacknife jknife jknife_6 jknife_8 jkstat joinby kalarma1 kap kap_3 kapmeier kappa kapwgt kdensity kdensity_7 keep ksm ksmirnov ktau kwallis l|0 la lab labe label labelbook ladder levels levelsof leverage lfit lfit_p li lincom line linktest lis list lloghet_glf lloghet_glf_sh lloghet_gp lloghet_ilf lloghet_ilf_sh lloghet_ip llogi_sw llogis_p llogist llogistic llogistichet lnorm_lf lnorm_sw lnorma_p lnormal lnormalhet lnormhet_glf lnormhet_glf_sh lnormhet_gp lnormhet_ilf lnormhet_ilf_sh lnormhet_ip lnskew0 loadingplot loc loca local log logi logis_lf logistic logistic_p logit logit_estat logit_p loglogs logrank loneway lookfor lookup lowess lowess_7 lpredict lrecomp lroc lroc_7 lrtest ls lsens lsens_7 lsens_x lstat ltable ltable_7 ltriang lv lvr2plot lvr2plot_7 m|0 ma mac macr macro makecns man manova manova_estat manova_p manovatest mantel mark markin markout marksample mat mat_capp mat_order mat_put_rr mat_rapp mata mata_clear mata_describe mata_drop mata_matdescribe mata_matsave mata_matuse mata_memory mata_mlib mata_mosave mata_rename mata_which matalabel matcproc matlist matname matr matri matrix matrix_input__dlg matstrik mcc mcci md0_ md1_ md1debug_ md2_ md2debug_ mds mds_estat mds_p mdsconfig mdslong mdsmat mdsshepard mdytoe mdytof me_derd mean means median memory memsize meqparse mer merg merge mfp mfx mhelp mhodds minbound mixed_ll mixed_ll_reparm mkassert mkdir mkmat mkspline ml ml_5 ml_adjs ml_bhhhs ml_c_d ml_check ml_clear ml_cnt ml_debug ml_defd ml_e0 ml_e0_bfgs ml_e0_cycle ml_e0_dfp ml_e0i ml_e1 ml_e1_bfgs ml_e1_bhhh ml_e1_cycle ml_e1_dfp ml_e2 ml_e2_cycle ml_ebfg0 ml_ebfr0 ml_ebfr1 ml_ebh0q ml_ebhh0 ml_ebhr0 ml_ebr0i ml_ecr0i ml_edfp0 ml_edfr0 ml_edfr1 ml_edr0i ml_eds ml_eer0i ml_egr0i ml_elf ml_elf_bfgs ml_elf_bhhh ml_elf_cycle ml_elf_dfp ml_elfi ml_elfs ml_enr0i ml_enrr0 ml_erdu0 ml_erdu0_bfgs ml_erdu0_bhhh ml_erdu0_bhhhq ml_erdu0_cycle ml_erdu0_dfp ml_erdu0_nrbfgs ml_exde ml_footnote ml_geqnr ml_grad0 ml_graph ml_hbhhh ml_hd0 ml_hold ml_init ml_inv ml_log ml_max ml_mlout ml_mlout_8 ml_model ml_nb0 ml_opt ml_p ml_plot ml_query ml_rdgrd ml_repor ml_s_e ml_score ml_searc ml_technique ml_unhold mleval mlf_ mlmatbysum mlmatsum mlog mlogi mlogit mlogit_footnote mlogit_p mlopts mlsum mlvecsum mnl0_ mor more mov move mprobit mprobit_lf mprobit_p mrdu0_ mrdu1_ mvdecode mvencode mvreg mvreg_estat n|0 nbreg nbreg_al nbreg_lf nbreg_p nbreg_sw nestreg net newey newey_7 newey_p news nl nl_7 nl_9 nl_9_p nl_p nl_p_7 nlcom nlcom_p nlexp2 nlexp2_7 nlexp2a nlexp2a_7 nlexp3 nlexp3_7 nlgom3 nlgom3_7 nlgom4 nlgom4_7 nlinit nllog3 nllog3_7 nllog4 nllog4_7 nlog_rd nlogit nlogit_p nlogitgen nlogittree nlpred no nobreak noi nois noisi noisil noisily note notes notes_dlg nptrend numlabel numlist odbc old_ver olo olog ologi ologi_sw ologit ologit_p ologitp on one onew onewa oneway op_colnm op_comp op_diff op_inv op_str opr opro oprob oprob_sw oprobi oprobi_p oprobit oprobitp opts_exclusive order orthog orthpoly ou out outf outfi outfil outfile outs outsh outshe outshee outsheet ovtest pac pac_7 palette parse parse_dissim pause pca pca_8 pca_display pca_estat pca_p pca_rotate pcamat pchart pchart_7 pchi pchi_7 pcorr pctile pentium pergram pergram_7 permute permute_8 personal peto_st pkcollapse pkcross pkequiv pkexamine pkexamine_7 pkshape pksumm pksumm_7 pl plo plot plugin pnorm pnorm_7 poisgof poiss_lf poiss_sw poisso_p poisson poisson_estat post postclose postfile postutil pperron pr prais prais_e prais_e2 prais_p predict predictnl preserve print pro prob probi probit probit_estat probit_p proc_time procoverlay procrustes procrustes_estat procrustes_p profiler prog progr progra program prop proportion prtest prtesti pwcorr pwd q\\s qby qbys qchi qchi_7 qladder qladder_7 qnorm qnorm_7 qqplot qqplot_7 qreg qreg_c qreg_p qreg_sw qu quadchk quantile quantile_7 que quer query range ranksum ratio rchart rchart_7 rcof recast reclink recode reg reg3 reg3_p regdw regr regre regre_p2 regres regres_p regress regress_estat regriv_p remap ren rena renam rename renpfix repeat replace report reshape restore ret retu retur return rm rmdir robvar roccomp roccomp_7 roccomp_8 rocf_lf rocfit rocfit_8 rocgold rocplot rocplot_7 roctab roctab_7 rolling rologit rologit_p rot rota rotat rotate rotatemat rreg rreg_p ru run runtest rvfplot rvfplot_7 rvpplot rvpplot_7 sa safesum sample sampsi sav save savedresults saveold sc sca scal scala scalar scatter scm_mine sco scob_lf scob_p scobi_sw scobit scor score scoreplot scoreplot_help scree screeplot screeplot_help sdtest sdtesti se search separate seperate serrbar serrbar_7 serset set set_defaults sfrancia sh she shel shell shewhart shewhart_7 signestimationsample signrank signtest simul simul_7 simulate simulate_8 sktest sleep slogit slogit_d2 slogit_p smooth snapspan so sor sort spearman spikeplot spikeplot_7 spikeplt spline_x split sqreg sqreg_p sret sretu sretur sreturn ssc st st_ct st_hc st_hcd st_hcd_sh st_is st_issys st_note st_promo st_set st_show st_smpl st_subid stack statsby statsby_8 stbase stci stci_7 stcox stcox_estat stcox_fr stcox_fr_ll stcox_p stcox_sw stcoxkm stcoxkm_7 stcstat stcurv stcurve stcurve_7 stdes stem stepwise stereg stfill stgen stir stjoin stmc stmh stphplot stphplot_7 stphtest stphtest_7 stptime strate strate_7 streg streg_sw streset sts sts_7 stset stsplit stsum sttocc sttoct stvary stweib su suest suest_8 sum summ summa summar summari summariz summarize sunflower sureg survcurv survsum svar svar_p svmat svy svy_disp svy_dreg svy_est svy_est_7 svy_estat svy_get svy_gnbreg_p svy_head svy_header svy_heckman_p svy_heckprob_p svy_intreg_p svy_ivreg_p svy_logistic_p svy_logit_p svy_mlogit_p svy_nbreg_p svy_ologit_p svy_oprobit_p svy_poisson_p svy_probit_p svy_regress_p svy_sub svy_sub_7 svy_x svy_x_7 svy_x_p svydes svydes_8 svygen svygnbreg svyheckman svyheckprob svyintreg svyintreg_7 svyintrg svyivreg svylc svylog_p svylogit svymarkout svymarkout_8 svymean svymlog svymlogit svynbreg svyolog svyologit svyoprob svyoprobit svyopts svypois svypois_7 svypoisson svyprobit svyprobt svyprop svyprop_7 svyratio svyreg svyreg_p svyregress svyset svyset_7 svyset_8 svytab svytab_7 svytest svytotal sw sw_8 swcnreg swcox swereg swilk swlogis swlogit swologit swoprbt swpois swprobit swqreg swtobit swweib symmetry symmi symplot symplot_7 syntax sysdescribe sysdir sysuse szroeter ta tab tab1 tab2 tab_or tabd tabdi tabdis tabdisp tabi table tabodds tabodds_7 tabstat tabu tabul tabula tabulat tabulate te tempfile tempname tempvar tes test testnl testparm teststd tetrachoric time_it timer tis tob tobi tobit tobit_p tobit_sw token tokeni tokeniz tokenize tostring total translate translator transmap treat_ll treatr_p treatreg trim trnb_cons trnb_mean trpoiss_d2 trunc_ll truncr_p truncreg tsappend tset tsfill tsline tsline_ex tsreport tsrevar tsrline tsset tssmooth tsunab ttest ttesti tut_chk tut_wait tutorial tw tware_st two twoway twoway__fpfit_serset twoway__function_gen twoway__histogram_gen twoway__ipoint_serset twoway__ipoints_serset twoway__kdensity_gen twoway__lfit_serset twoway__normgen_gen twoway__pci_serset twoway__qfit_serset twoway__scatteri_serset twoway__sunflower_gen twoway_ksm_serset ty typ type typeof u|0 unab unabbrev unabcmd update us use uselabel var var_mkcompanion var_p varbasic varfcast vargranger varirf varirf_add varirf_cgraph varirf_create varirf_ctable varirf_describe varirf_dir varirf_drop varirf_erase varirf_graph varirf_ograph varirf_rename varirf_set varirf_table varlist varlmar varnorm varsoc varstable varstable_w varstable_w2 varwle vce vec vec_fevd vec_mkphi vec_p vec_p_w vecirf_create veclmar veclmar_w vecnorm vecnorm_w vecrank vecstable verinst vers versi versio version view viewsource vif vwls wdatetof webdescribe webseek webuse weib1_lf weib2_lf weib_lf weib_lf0 weibhet_glf weibhet_glf_sh weibhet_glfa weibhet_glfa_sh weibhet_gp weibhet_ilf weibhet_ilf_sh weibhet_ilfa weibhet_ilfa_sh weibhet_ip weibu_sw weibul_p weibull weibull_c weibull_s weibullhet wh whelp whi which whil while wilc_st wilcoxon win wind windo window winexec wntestb wntestb_7 wntestq xchart xchart_7 xcorr xcorr_7 xi xi_6 xmlsav xmlsave xmluse xpose xsh xshe xshel xshell xt_iis xt_tis xtab_p xtabond xtbin_p xtclog xtcloglog xtcloglog_8 xtcloglog_d2 xtcloglog_pa_p xtcloglog_re_p xtcnt_p xtcorr xtdata xtdes xtfront_p xtfrontier xtgee xtgee_elink xtgee_estat xtgee_makeivar xtgee_p xtgee_plink xtgls xtgls_p xthaus xthausman xtht_p xthtaylor xtile xtint_p xtintreg xtintreg_8 xtintreg_d2 xtintreg_p xtivp_1 xtivp_2 xtivreg xtline xtline_ex xtlogit xtlogit_8 xtlogit_d2 xtlogit_fe_p xtlogit_pa_p xtlogit_re_p xtmixed xtmixed_estat xtmixed_p xtnb_fe xtnb_lf xtnbreg xtnbreg_pa_p xtnbreg_refe_p xtpcse xtpcse_p xtpois xtpoisson xtpoisson_d2 xtpoisson_pa_p xtpoisson_refe_p xtpred xtprobit xtprobit_8 xtprobit_d2 xtprobit_re_p xtps_fe xtps_lf xtps_ren xtps_ren_8 xtrar_p xtrc xtrc_p xtrchh xtrefe_p xtreg xtreg_be xtreg_fe xtreg_ml xtreg_pa_p xtreg_re xtregar xtrere_p xtset xtsf_ll xtsf_llti xtsum xttab xttest0 xttobit xttobit_8 xttobit_p xttrans yx yxview__barlike_draw yxview_area_draw yxview_bar_draw yxview_dot_draw yxview_dropline_draw yxview_function_draw yxview_iarrow_draw yxview_ilabels_draw yxview_normal_draw yxview_pcarrow_draw yxview_pcbarrow_draw yxview_pccapsym_draw yxview_pcscatter_draw yxview_pcspike_draw yxview_rarea_draw yxview_rbar_draw yxview_rbarm_draw yxview_rcap_draw yxview_rcapsym_draw yxview_rconnected_draw yxview_rline_draw yxview_rscatter_draw yxview_rspike_draw yxview_spike_draw yxview_sunflower_draw zap_s zinb zinb_llf zinb_plf zip zip_llf zip_p zip_plf zt_ct_5 zt_hc_5 zt_hcd_5 zt_is_5 zt_iss_5 zt_sho_5 zt_smp_5 ztbase_5 ztcox_5 ztdes_5 ztereg_5 ztfill_5 ztgen_5 ztir_5 ztjoin_5 ztnb ztnb_p ztp ztp_p zts_5 ztset_5 ztspli_5 ztsum_5 zttoct_5 ztvary_5 ztweib_5",
    c: [{
      cN: "symbol",
      b: /`[a-zA-Z0-9_]+'/
    }, {
      cN: "variable",
      b: /\$\{?[a-zA-Z0-9_]+\}?/
    }, {
      cN: "string",
      v: [{
        b: '`"[^\r\n]*?"\''
      }, {
        b: '"[^\r\n"]*"'
      }]
    }, {
      cN: "built_in",
      v: [{
        b: "\\b(abs|acos|asin|atan|atan2|atanh|ceil|cloglog|comb|cos|digamma|exp|floor|invcloglog|invlogit|ln|lnfact|lnfactorial|lngamma|log|log10|max|min|mod|reldif|round|sign|sin|sqrt|sum|tan|tanh|trigamma|trunc|betaden|Binomial|binorm|binormal|chi2|chi2tail|dgammapda|dgammapdada|dgammapdadx|dgammapdx|dgammapdxdx|F|Fden|Ftail|gammaden|gammap|ibeta|invbinomial|invchi2|invchi2tail|invF|invFtail|invgammap|invibeta|invnchi2|invnFtail|invnibeta|invnorm|invnormal|invttail|nbetaden|nchi2|nFden|nFtail|nibeta|norm|normal|normalden|normd|npnchi2|tden|ttail|uniform|abbrev|char|index|indexnot|length|lower|ltrim|match|plural|proper|real|regexm|regexr|regexs|reverse|rtrim|string|strlen|strlower|strltrim|strmatch|strofreal|strpos|strproper|strreverse|strrtrim|strtrim|strupper|subinstr|subinword|substr|trim|upper|word|wordcount|_caller|autocode|byteorder|chop|clip|cond|e|epsdouble|epsfloat|group|inlist|inrange|irecode|matrix|maxbyte|maxdouble|maxfloat|maxint|maxlong|mi|minbyte|mindouble|minfloat|minint|minlong|missing|r|recode|replay|return|s|scalar|d|date|day|dow|doy|halfyear|mdy|month|quarter|week|year|d|daily|dofd|dofh|dofm|dofq|dofw|dofy|h|halfyearly|hofd|m|mofd|monthly|q|qofd|quarterly|tin|twithin|w|weekly|wofd|y|yearly|yh|ym|yofd|yq|yw|cholesky|colnumb|colsof|corr|det|diag|diag0cnt|el|get|hadamard|I|inv|invsym|issym|issymmetric|J|matmissing|matuniform|mreldif|nullmat|rownumb|rowsof|sweep|syminv|trace|vec|vecdiag)(?=\\(|$)"
      }]
    }, e.C("^[ 	]*\\*.*$", !1), e.CLCM, e.CBCM]
  };
});
hljs.registerLanguage("tp", function (O) {
  var R = {
    cN: "number",
    b: "[1-9][0-9]*",
    r: 0
  },
      E = {
    cN: "symbol",
    b: ":[^\\]]+"
  },
      T = {
    cN: "built_in",
    b: "(AR|P|PAYLOAD|PR|R|SR|RSR|LBL|VR|UALM|MESSAGE|UTOOL|UFRAME|TIMER|    TIMER_OVERFLOW|JOINT_MAX_SPEED|RESUME_PROG|DIAG_REC)\\[",
    e: "\\]",
    c: ["self", R, E]
  },
      N = {
    cN: "built_in",
    b: "(AI|AO|DI|DO|F|RI|RO|UI|UO|GI|GO|SI|SO)\\[",
    e: "\\]",
    c: ["self", R, O.QSM, E]
  };
  return {
    k: {
      keyword: "ABORT ACC ADJUST AND AP_LD BREAK CALL CNT COL CONDITION CONFIG DA DB DIV DETECT ELSE END ENDFOR ERR_NUM ERROR_PROG FINE FOR GP GUARD INC IF JMP LINEAR_MAX_SPEED LOCK MOD MONITOR OFFSET Offset OR OVERRIDE PAUSE PREG PTH RT_LD RUN SELECT SKIP Skip TA TB TO TOOL_OFFSET Tool_Offset UF UT UFRAME_NUM UTOOL_NUM UNLOCK WAIT X Y Z W P R STRLEN SUBSTR FINDSTR VOFFSET PROG ATTR MN POS",
      literal: "ON OFF max_speed LPOS JPOS ENABLE DISABLE START STOP RESET"
    },
    c: [T, N, {
      cN: "keyword",
      b: "/(PROG|ATTR|MN|POS|END)\\b"
    }, {
      cN: "keyword",
      b: "(CALL|RUN|POINT_LOGIC|LBL)\\b"
    }, {
      cN: "keyword",
      b: "\\b(ACC|CNT|Skip|Offset|PSPD|RT_LD|AP_LD|Tool_Offset)"
    }, {
      cN: "number",
      b: "\\d+(sec|msec|mm/sec|cm/min|inch/min|deg/sec|mm|in|cm)?\\b",
      r: 0
    }, O.C("//", "[;$]"), O.C("!", "[;$]"), O.C("--eg:", "$"), O.QSM, {
      cN: "string",
      b: "'",
      e: "'"
    }, O.CNM, {
      cN: "variable",
      b: "\\$[A-Za-z0-9_]+"
    }]
  };
});
hljs.registerLanguage("less", function (e) {
  var r = "[\\w-]+",
      t = "(" + r + "|@{" + r + "})",
      a = [],
      c = [],
      s = function (e) {
    return {
      cN: "string",
      b: "~?" + e + ".*?" + e
    };
  },
      b = function (e, r, t) {
    return {
      cN: e,
      b: r,
      r: t
    };
  },
      n = {
    b: "\\(",
    e: "\\)",
    c: c,
    r: 0
  };

  c.push(e.CLCM, e.CBCM, s("'"), s('"'), e.CSSNM, {
    b: "(url|data-uri)\\(",
    starts: {
      cN: "string",
      e: "[\\)\\n]",
      eE: !0
    }
  }, b("number", "#[0-9A-Fa-f]+\\b"), n, b("variable", "@@?" + r, 10), b("variable", "@{" + r + "}"), b("built_in", "~?`[^`]*?`"), {
    cN: "attribute",
    b: r + "\\s*:",
    e: ":",
    rB: !0,
    eE: !0
  }, {
    cN: "meta",
    b: "!important"
  });
  var i = c.concat({
    b: "{",
    e: "}",
    c: a
  }),
      o = {
    bK: "when",
    eW: !0,
    c: [{
      bK: "and not"
    }].concat(c)
  },
      u = {
    b: t + "\\s*:",
    rB: !0,
    e: "[;}]",
    r: 0,
    c: [{
      cN: "attribute",
      b: t,
      e: ":",
      eE: !0,
      starts: {
        eW: !0,
        i: "[<=$]",
        r: 0,
        c: c
      }
    }]
  },
      l = {
    cN: "keyword",
    b: "@(import|media|charset|font-face|(-[a-z]+-)?keyframes|supports|document|namespace|page|viewport|host)\\b",
    starts: {
      e: "[;{}]",
      rE: !0,
      c: c,
      r: 0
    }
  },
      C = {
    cN: "variable",
    v: [{
      b: "@" + r + "\\s*:",
      r: 15
    }, {
      b: "@" + r
    }],
    starts: {
      e: "[;}]",
      rE: !0,
      c: i
    }
  },
      p = {
    v: [{
      b: "[\\.#:&\\[>]",
      e: "[;{}]"
    }, {
      b: t,
      e: "{"
    }],
    rB: !0,
    rE: !0,
    i: "[<='$\"]",
    r: 0,
    c: [e.CLCM, e.CBCM, o, b("keyword", "all\\b"), b("variable", "@{" + r + "}"), b("selector-tag", t + "%?", 0), b("selector-id", "#" + t), b("selector-class", "\\." + t, 0), b("selector-tag", "&", 0), {
      cN: "selector-attr",
      b: "\\[",
      e: "\\]"
    }, {
      cN: "selector-pseudo",
      b: /:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/
    }, {
      b: "\\(",
      e: "\\)",
      c: i
    }, {
      b: "!important"
    }]
  };
  return a.push(e.CLCM, e.CBCM, l, C, u, p), {
    cI: !0,
    i: "[=>'/<($\"]",
    c: a
  };
});
hljs.registerLanguage("monkey", function (e) {
  var n = {
    cN: "number",
    r: 0,
    v: [{
      b: "[$][a-fA-F0-9]+"
    }, e.NM]
  };
  return {
    cI: !0,
    k: {
      keyword: "public private property continue exit extern new try catch eachin not abstract final select case default const local global field end if then else elseif endif while wend repeat until forever for to step next return module inline throw import",
      built_in: "DebugLog DebugStop Error Print ACos ACosr ASin ASinr ATan ATan2 ATan2r ATanr Abs Abs Ceil Clamp Clamp Cos Cosr Exp Floor Log Max Max Min Min Pow Sgn Sgn Sin Sinr Sqrt Tan Tanr Seed PI HALFPI TWOPI",
      literal: "true false null and or shl shr mod"
    },
    i: /\/\*/,
    c: [e.C("#rem", "#end"), e.C("'", "$", {
      r: 0
    }), {
      cN: "function",
      bK: "function method",
      e: "[(=:]|$",
      i: /\n/,
      c: [e.UTM]
    }, {
      cN: "class",
      bK: "class interface",
      e: "$",
      c: [{
        bK: "extends implements"
      }, e.UTM]
    }, {
      cN: "built_in",
      b: "\\b(self|super)\\b"
    }, {
      cN: "meta",
      b: "\\s*#",
      e: "$",
      k: {
        "meta-keyword": "if else elseif endif end then"
      }
    }, {
      cN: "meta",
      b: "^\\s*strict\\b"
    }, {
      bK: "alias",
      e: "=",
      c: [e.UTM]
    }, e.QSM, n]
  };
});
hljs.registerLanguage("clojure", function (e) {
  var t = {
    "builtin-name": "def defonce cond apply if-not if-let if not not= = < > <= >= == + / * - rem quot neg? pos? delay? symbol? keyword? true? false? integer? empty? coll? list? set? ifn? fn? associative? sequential? sorted? counted? reversible? number? decimal? class? distinct? isa? float? rational? reduced? ratio? odd? even? char? seq? vector? string? map? nil? contains? zero? instance? not-every? not-any? libspec? -> ->> .. . inc compare do dotimes mapcat take remove take-while drop letfn drop-last take-last drop-while while intern condp case reduced cycle split-at split-with repeat replicate iterate range merge zipmap declare line-seq sort comparator sort-by dorun doall nthnext nthrest partition eval doseq await await-for let agent atom send send-off release-pending-sends add-watch mapv filterv remove-watch agent-error restart-agent set-error-handler error-handler set-error-mode! error-mode shutdown-agents quote var fn loop recur throw try monitor-enter monitor-exit defmacro defn defn- macroexpand macroexpand-1 for dosync and or when when-not when-let comp juxt partial sequence memoize constantly complement identity assert peek pop doto proxy defstruct first rest cons defprotocol cast coll deftype defrecord last butlast sigs reify second ffirst fnext nfirst nnext defmulti defmethod meta with-meta ns in-ns create-ns import refer keys select-keys vals key val rseq name namespace promise into transient persistent! conj! assoc! dissoc! pop! disj! use class type num float double short byte boolean bigint biginteger bigdec print-method print-dup throw-if printf format load compile get-in update-in pr pr-on newline flush read slurp read-line subvec with-open memfn time re-find re-groups rand-int rand mod locking assert-valid-fdecl alias resolve ref deref refset swap! reset! set-validator! compare-and-set! alter-meta! reset-meta! commute get-validator alter ref-set ref-history-count ref-min-history ref-max-history ensure sync io! new next conj set! to-array future future-call into-array aset gen-class reduce map filter find empty hash-map hash-set sorted-map sorted-map-by sorted-set sorted-set-by vec vector seq flatten reverse assoc dissoc list disj get union difference intersection extend extend-type extend-protocol int nth delay count concat chunk chunk-buffer chunk-append chunk-first chunk-rest max min dec unchecked-inc-int unchecked-inc unchecked-dec-inc unchecked-dec unchecked-negate unchecked-add-int unchecked-add unchecked-subtract-int unchecked-subtract chunk-next chunk-cons chunked-seq? prn vary-meta lazy-seq spread list* str find-keyword keyword symbol gensym force rationalize"
  },
      r = "a-zA-Z_\\-!.?+*=<>&#'",
      n = "[" + r + "][" + r + "0-9/;:]*",
      a = "[-+]?\\d+(\\.\\d+)?",
      o = {
    b: n,
    r: 0
  },
      s = {
    cN: "number",
    b: a,
    r: 0
  },
      i = e.inherit(e.QSM, {
    i: null
  }),
      c = e.C(";", "$", {
    r: 0
  }),
      d = {
    cN: "literal",
    b: /\b(true|false|nil)\b/
  },
      l = {
    b: "[\\[\\{]",
    e: "[\\]\\}]"
  },
      m = {
    cN: "comment",
    b: "\\^" + n
  },
      p = e.C("\\^\\{", "\\}"),
      u = {
    cN: "symbol",
    b: "[:]{1,2}" + n
  },
      f = {
    b: "\\(",
    e: "\\)"
  },
      h = {
    eW: !0,
    r: 0
  },
      y = {
    k: t,
    l: n,
    cN: "name",
    b: n,
    starts: h
  },
      b = [f, i, m, p, c, u, l, s, d, o];
  return f.c = [e.C("comment", ""), y, h], h.c = b, l.c = b, {
    aliases: ["clj"],
    i: /\S/,
    c: [f, i, m, p, c, u, l, s, d]
  };
});
hljs.registerLanguage("clean", function (e) {
  return {
    aliases: ["clean", "icl", "dcl"],
    k: {
      keyword: "if let in with where case of class instance otherwise implementation definition system module from import qualified as special code inline foreign export ccall stdcall generic derive infix infixl infixr",
      literal: "True False"
    },
    c: [e.CLCM, e.CBCM, e.ASM, e.QSM, e.CNM, {
      b: "->|<-[|:]?|::|#!?|>>=|\\{\\||\\|\\}|:==|=:|\\.\\.|<>|`"
    }]
  };
});
hljs.registerLanguage("golo", function (e) {
  return {
    k: {
      keyword: "println readln print import module function local return let var while for foreach times in case when match with break continue augment augmentation each find filter reduce if then else otherwise try catch finally raise throw orIfNull DynamicObject|10 DynamicVariable struct Observable map set vector list array",
      literal: "true false null"
    },
    c: [e.HCM, e.QSM, e.CNM, {
      cN: "meta",
      b: "@[A-Za-z]+"
    }]
  };
});
hljs.registerLanguage("livescript", function (e) {
  var t = {
    keyword: "in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger case default function var with then unless until loop of by when and or is isnt not it that otherwise from to til fallthrough super case default function var void const let enum export import native __hasProp __extends __slice __bind __indexOf",
    literal: "true false null undefined yes no on off it that void",
    built_in: "npm require console print module global window document"
  },
      s = "[A-Za-z$_](?:-[0-9A-Za-z$_]|[0-9A-Za-z$_])*",
      n = e.inherit(e.TM, {
    b: s
  }),
      i = {
    cN: "subst",
    b: /#\{/,
    e: /}/,
    k: t
  },
      r = {
    cN: "subst",
    b: /#[A-Za-z$_]/,
    e: /(?:\-[0-9A-Za-z$_]|[0-9A-Za-z$_])*/,
    k: t
  },
      c = [e.BNM, {
    cN: "number",
    b: "(\\b0[xX][a-fA-F0-9_]+)|(\\b\\d(\\d|_\\d)*(\\.(\\d(\\d|_\\d)*)?)?(_*[eE]([-+]\\d(_\\d|\\d)*)?)?[_a-z]*)",
    r: 0,
    starts: {
      e: "(\\s*/)?",
      r: 0
    }
  }, {
    cN: "string",
    v: [{
      b: /'''/,
      e: /'''/,
      c: [e.BE]
    }, {
      b: /'/,
      e: /'/,
      c: [e.BE]
    }, {
      b: /"""/,
      e: /"""/,
      c: [e.BE, i, r]
    }, {
      b: /"/,
      e: /"/,
      c: [e.BE, i, r]
    }, {
      b: /\\/,
      e: /(\s|$)/,
      eE: !0
    }]
  }, {
    cN: "regexp",
    v: [{
      b: "//",
      e: "//[gim]*",
      c: [i, e.HCM]
    }, {
      b: /\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/
    }]
  }, {
    b: "@" + s
  }, {
    b: "``",
    e: "``",
    eB: !0,
    eE: !0,
    sL: "javascript"
  }];
  i.c = c;
  var a = {
    cN: "params",
    b: "\\(",
    rB: !0,
    c: [{
      b: /\(/,
      e: /\)/,
      k: t,
      c: ["self"].concat(c)
    }]
  };
  return {
    aliases: ["ls"],
    k: t,
    i: /\/\*/,
    c: c.concat([e.C("\\/\\*", "\\*\\/"), e.HCM, {
      cN: "function",
      c: [n, a],
      rB: !0,
      v: [{
        b: "(" + s + "\\s*(?:=|:=)\\s*)?(\\(.*\\))?\\s*\\B\\->\\*?",
        e: "\\->\\*?"
      }, {
        b: "(" + s + "\\s*(?:=|:=)\\s*)?!?(\\(.*\\))?\\s*\\B[-~]{1,2}>\\*?",
        e: "[-~]{1,2}>\\*?"
      }, {
        b: "(" + s + "\\s*(?:=|:=)\\s*)?(\\(.*\\))?\\s*\\B!?[-~]{1,2}>\\*?",
        e: "!?[-~]{1,2}>\\*?"
      }]
    }, {
      cN: "class",
      bK: "class",
      e: "$",
      i: /[:="\[\]]/,
      c: [{
        bK: "extends",
        eW: !0,
        i: /[:="\[\]]/,
        c: [n]
      }, n]
    }, {
      b: s + ":",
      e: ":",
      rB: !0,
      rE: !0,
      r: 0
    }])
  };
});
hljs.registerLanguage("xml", function (s) {
  var e = "[A-Za-z0-9\\._:-]+",
      t = {
    eW: !0,
    i: /</,
    r: 0,
    c: [{
      cN: "attr",
      b: e,
      r: 0
    }, {
      b: /=\s*/,
      r: 0,
      c: [{
        cN: "string",
        endsParent: !0,
        v: [{
          b: /"/,
          e: /"/
        }, {
          b: /'/,
          e: /'/
        }, {
          b: /[^\s"'=<>`]+/
        }]
      }]
    }]
  };
  return {
    aliases: ["html", "xhtml", "rss", "atom", "xjb", "xsd", "xsl", "plist"],
    cI: !0,
    c: [{
      cN: "meta",
      b: "<!DOCTYPE",
      e: ">",
      r: 10,
      c: [{
        b: "\\[",
        e: "\\]"
      }]
    }, s.C("<!--", "-->", {
      r: 10
    }), {
      b: "<\\!\\[CDATA\\[",
      e: "\\]\\]>",
      r: 10
    }, {
      b: /<\?(php)?/,
      e: /\?>/,
      sL: "php",
      c: [{
        b: "/\\*",
        e: "\\*/",
        skip: !0
      }]
    }, {
      cN: "tag",
      b: "<style(?=\\s|>|$)",
      e: ">",
      k: {
        name: "style"
      },
      c: [t],
      starts: {
        e: "</style>",
        rE: !0,
        sL: ["css", "xml"]
      }
    }, {
      cN: "tag",
      b: "<script(?=\\s|>|$)",
      e: ">",
      k: {
        name: "script"
      },
      c: [t],
      starts: {
        e: "</script>",
        rE: !0,
        sL: ["actionscript", "javascript", "handlebars", "xml"]
      }
    }, {
      cN: "meta",
      v: [{
        b: /<\?xml/,
        e: /\?>/,
        r: 10
      }, {
        b: /<\?\w+/,
        e: /\?>/
      }]
    }, {
      cN: "tag",
      b: "</?",
      e: "/?>",
      c: [{
        cN: "name",
        b: /[^\/><\s]+/,
        r: 0
      }, t]
    }]
  };
});
hljs.registerLanguage("vbscript", function (e) {
  return {
    aliases: ["vbs"],
    cI: !0,
    k: {
      keyword: "call class const dim do loop erase execute executeglobal exit for each next function if then else on error option explicit new private property let get public randomize redim rem select case set stop sub while wend with end to elseif is or xor and not class_initialize class_terminate default preserve in me byval byref step resume goto",
      built_in: "lcase month vartype instrrev ubound setlocale getobject rgb getref string weekdayname rnd dateadd monthname now day minute isarray cbool round formatcurrency conversions csng timevalue second year space abs clng timeserial fixs len asc isempty maths dateserial atn timer isobject filter weekday datevalue ccur isdate instr datediff formatdatetime replace isnull right sgn array snumeric log cdbl hex chr lbound msgbox ucase getlocale cos cdate cbyte rtrim join hour oct typename trim strcomp int createobject loadpicture tan formatnumber mid scriptenginebuildversion scriptengine split scriptengineminorversion cint sin datepart ltrim sqr scriptenginemajorversion time derived eval date formatpercent exp inputbox left ascw chrw regexp server response request cstr err",
      literal: "true false null nothing empty"
    },
    i: "//",
    c: [e.inherit(e.QSM, {
      c: [{
        b: '""'
      }]
    }), e.C(/'/, /$/, {
      r: 0
    }), e.CNM]
  };
});
hljs.registerLanguage("vbscript-html", function (r) {
  return {
    sL: "xml",
    c: [{
      b: "<%",
      e: "%>",
      sL: "vbscript"
    }]
  };
});
hljs.registerLanguage("typescript", function (e) {
  var r = {
    keyword: "in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class public private protected get set super static implements enum export import declare type namespace abstract as from extends async await",
    literal: "true false null undefined NaN Infinity",
    built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document any number boolean string void Promise"
  };
  return {
    aliases: ["ts"],
    k: r,
    c: [{
      cN: "meta",
      b: /^\s*['"]use strict['"]/
    }, e.ASM, e.QSM, {
      cN: "string",
      b: "`",
      e: "`",
      c: [e.BE, {
        cN: "subst",
        b: "\\$\\{",
        e: "\\}"
      }]
    }, e.CLCM, e.CBCM, {
      cN: "number",
      v: [{
        b: "\\b(0[bB][01]+)"
      }, {
        b: "\\b(0[oO][0-7]+)"
      }, {
        b: e.CNR
      }],
      r: 0
    }, {
      b: "(" + e.RSR + "|\\b(case|return|throw)\\b)\\s*",
      k: "return throw case",
      c: [e.CLCM, e.CBCM, e.RM, {
        cN: "function",
        b: "(\\(.*?\\)|" + e.IR + ")\\s*=>",
        rB: !0,
        e: "\\s*=>",
        c: [{
          cN: "params",
          v: [{
            b: e.IR
          }, {
            b: /\(\s*\)/
          }, {
            b: /\(/,
            e: /\)/,
            eB: !0,
            eE: !0,
            k: r,
            c: ["self", e.CLCM, e.CBCM]
          }]
        }]
      }],
      r: 0
    }, {
      cN: "function",
      b: "function",
      e: /[\{;]/,
      eE: !0,
      k: r,
      c: ["self", e.inherit(e.TM, {
        b: /[A-Za-z$_][0-9A-Za-z$_]*/
      }), {
        cN: "params",
        b: /\(/,
        e: /\)/,
        eB: !0,
        eE: !0,
        k: r,
        c: [e.CLCM, e.CBCM],
        i: /["'\(]/
      }],
      i: /%/,
      r: 0
    }, {
      bK: "constructor",
      e: /\{/,
      eE: !0,
      c: ["self", {
        cN: "params",
        b: /\(/,
        e: /\)/,
        eB: !0,
        eE: !0,
        k: r,
        c: [e.CLCM, e.CBCM],
        i: /["'\(]/
      }]
    }, {
      b: /module\./,
      k: {
        built_in: "module"
      },
      r: 0
    }, {
      bK: "module",
      e: /\{/,
      eE: !0
    }, {
      bK: "interface",
      e: /\{/,
      eE: !0,
      k: "interface extends"
    }, {
      b: /\$[(.]/
    }, {
      b: "\\." + e.IR,
      r: 0
    }, {
      cN: "meta",
      b: "@[A-Za-z]+"
    }]
  };
});
hljs.registerLanguage("bnf", function (e) {
  return {
    c: [{
      cN: "attribute",
      b: /</,
      e: />/
    }, {
      b: /::=/,
      starts: {
        e: /$/,
        c: [{
          b: /</,
          e: />/
        }, e.CLCM, e.CBCM, e.ASM, e.QSM]
      }
    }]
  };
});
hljs.registerLanguage("moonscript", function (e) {
  var t = {
    keyword: "if then not for in while do return else elseif break continue switch and or unless when class extends super local import export from using",
    literal: "true false nil",
    built_in: "_G _VERSION assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall coroutine debug io math os package string table"
  },
      r = "[A-Za-z$_][0-9A-Za-z$_]*",
      s = {
    cN: "subst",
    b: /#\{/,
    e: /}/,
    k: t
  },
      a = [e.inherit(e.CNM, {
    starts: {
      e: "(\\s*/)?",
      r: 0
    }
  }), {
    cN: "string",
    v: [{
      b: /'/,
      e: /'/,
      c: [e.BE]
    }, {
      b: /"/,
      e: /"/,
      c: [e.BE, s]
    }]
  }, {
    cN: "built_in",
    b: "@__" + e.IR
  }, {
    b: "@" + e.IR
  }, {
    b: e.IR + "\\\\" + e.IR
  }];
  s.c = a;
  var c = e.inherit(e.TM, {
    b: r
  }),
      n = "(\\(.*\\))?\\s*\\B[-=]>",
      i = {
    cN: "params",
    b: "\\([^\\(]",
    rB: !0,
    c: [{
      b: /\(/,
      e: /\)/,
      k: t,
      c: ["self"].concat(a)
    }]
  };
  return {
    aliases: ["moon"],
    k: t,
    i: /\/\*/,
    c: a.concat([e.C("--", "$"), {
      cN: "function",
      b: "^\\s*" + r + "\\s*=\\s*" + n,
      e: "[-=]>",
      rB: !0,
      c: [c, i]
    }, {
      b: /[\(,:=]\s*/,
      r: 0,
      c: [{
        cN: "function",
        b: n,
        e: "[-=]>",
        rB: !0,
        c: [i]
      }]
    }, {
      cN: "class",
      bK: "class",
      e: "$",
      i: /[:="\[\]]/,
      c: [{
        bK: "extends",
        eW: !0,
        i: /[:="\[\]]/,
        c: [c]
      }, c]
    }, {
      cN: "name",
      b: r + ":",
      e: ":",
      rB: !0,
      rE: !0,
      r: 0
    }])
  };
});
hljs.registerLanguage("java", function (e) {
  var a = "[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*",
      t = a + "(<" + a + "(\\s*,\\s*" + a + ")*>)?",
      r = "false synchronized int abstract float private char boolean static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private module requires exports do",
      s = "\\b(0[bB]([01]+[01_]+[01]+|[01]+)|0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)|(([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?|\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))([eE][-+]?\\d+)?)[lLfF]?",
      c = {
    cN: "number",
    b: s,
    r: 0
  };
  return {
    aliases: ["jsp"],
    k: r,
    i: /<\/|#/,
    c: [e.C("/\\*\\*", "\\*/", {
      r: 0,
      c: [{
        b: /\w+@/,
        r: 0
      }, {
        cN: "doctag",
        b: "@[A-Za-z]+"
      }]
    }), e.CLCM, e.CBCM, e.ASM, e.QSM, {
      cN: "class",
      bK: "class interface",
      e: /[{;=]/,
      eE: !0,
      k: "class interface",
      i: /[:"\[\]]/,
      c: [{
        bK: "extends implements"
      }, e.UTM]
    }, {
      bK: "new throw return else",
      r: 0
    }, {
      cN: "function",
      b: "(" + t + "\\s+)+" + e.UIR + "\\s*\\(",
      rB: !0,
      e: /[{;=]/,
      eE: !0,
      k: r,
      c: [{
        b: e.UIR + "\\s*\\(",
        rB: !0,
        r: 0,
        c: [e.UTM]
      }, {
        cN: "params",
        b: /\(/,
        e: /\)/,
        k: r,
        r: 0,
        c: [e.ASM, e.QSM, e.CNM, e.CBCM]
      }, e.CLCM, e.CBCM]
    }, c, {
      cN: "meta",
      b: "@[A-Za-z]+"
    }]
  };
});
hljs.registerLanguage("fsharp", function (e) {
  var t = {
    b: "<",
    e: ">",
    c: [e.inherit(e.TM, {
      b: /'[a-zA-Z0-9_]+/
    })]
  };
  return {
    aliases: ["fs"],
    k: "abstract and as assert base begin class default delegate do done downcast downto elif else end exception extern false finally for fun function global if in inherit inline interface internal lazy let match member module mutable namespace new null of open or override private public rec return sig static struct then to true try type upcast use val void when while with yield",
    i: /\/\*/,
    c: [{
      cN: "keyword",
      b: /\b(yield|return|let|do)!/
    }, {
      cN: "string",
      b: '@"',
      e: '"',
      c: [{
        b: '""'
      }]
    }, {
      cN: "string",
      b: '"""',
      e: '"""'
    }, e.C("\\(\\*", "\\*\\)"), {
      cN: "class",
      bK: "type",
      e: "\\(|=|$",
      eE: !0,
      c: [e.UTM, t]
    }, {
      cN: "meta",
      b: "\\[<",
      e: ">\\]",
      r: 10
    }, {
      cN: "symbol",
      b: "\\B('[A-Za-z])\\b",
      c: [e.BE]
    }, e.CLCM, e.inherit(e.QSM, {
      i: null
    }), e.CNM]
  };
});
hljs.registerLanguage("cpp", function (t) {
  var e = {
    cN: "keyword",
    b: "\\b[a-z\\d_]*_t\\b"
  },
      r = {
    cN: "string",
    v: [{
      b: '(u8?|U)?L?"',
      e: '"',
      i: "\\n",
      c: [t.BE]
    }, {
      b: '(u8?|U)?R"',
      e: '"',
      c: [t.BE]
    }, {
      b: "'\\\\?.",
      e: "'",
      i: "."
    }]
  },
      s = {
    cN: "number",
    v: [{
      b: "\\b(0b[01']+)"
    }, {
      b: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"
    }, {
      b: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
    }],
    r: 0
  },
      i = {
    cN: "meta",
    b: /#\s*[a-z]+\b/,
    e: /$/,
    k: {
      "meta-keyword": "if else elif endif define undef warning error line pragma ifdef ifndef include"
    },
    c: [{
      b: /\\\n/,
      r: 0
    }, t.inherit(r, {
      cN: "meta-string"
    }), {
      cN: "meta-string",
      b: /<[^\n>]*>/,
      e: /$/,
      i: "\\n"
    }, t.CLCM, t.CBCM]
  },
      a = t.IR + "\\s*\\(",
      c = {
    keyword: "int float while private char catch import module export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignof constexpr decltype noexcept static_assert thread_local restrict _Bool complex _Complex _Imaginary atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong new throw return and or not",
    built_in: "std string cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr",
    literal: "true false nullptr NULL"
  },
      n = [e, t.CLCM, t.CBCM, s, r];
  return {
    aliases: ["c", "cc", "h", "c++", "h++", "hpp"],
    k: c,
    i: "</",
    c: n.concat([i, {
      b: "\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
      e: ">",
      k: c,
      c: ["self", e]
    }, {
      b: t.IR + "::",
      k: c
    }, {
      v: [{
        b: /=/,
        e: /;/
      }, {
        b: /\(/,
        e: /\)/
      }, {
        bK: "new throw return else",
        e: /;/
      }],
      k: c,
      c: n.concat([{
        b: /\(/,
        e: /\)/,
        k: c,
        c: n.concat(["self"]),
        r: 0
      }]),
      r: 0
    }, {
      cN: "function",
      b: "(" + t.IR + "[\\*&\\s]+)+" + a,
      rB: !0,
      e: /[{;=]/,
      eE: !0,
      k: c,
      i: /[^\w\s\*&]/,
      c: [{
        b: a,
        rB: !0,
        c: [t.TM],
        r: 0
      }, {
        cN: "params",
        b: /\(/,
        e: /\)/,
        k: c,
        r: 0,
        c: [t.CLCM, t.CBCM, r, s, e]
      }, t.CLCM, t.CBCM, i]
    }, {
      cN: "class",
      bK: "class struct",
      e: /[{;:]/,
      c: [{
        b: /</,
        e: />/,
        c: ["self"]
      }, t.TM]
    }]),
    exports: {
      preprocessor: i,
      strings: r,
      k: c
    }
  };
});
hljs.registerLanguage("lua", function (e) {
  var t = "\\[=*\\[",
      a = "\\]=*\\]",
      r = {
    b: t,
    e: a,
    c: ["self"]
  },
      n = [e.C("--(?!" + t + ")", "$"), e.C("--" + t, a, {
    c: [r],
    r: 10
  })];
  return {
    l: e.UIR,
    k: {
      literal: "true false nil",
      keyword: "and break do else elseif end for goto if in local not or repeat return then until while",
      built_in: "_G _ENV _VERSION __index __newindex __mode __call __metatable __tostring __len __gc __add __sub __mul __div __mod __pow __concat __unm __eq __lt __le assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstringmodule next pairs pcall print rawequal rawget rawset require select setfenvsetmetatable tonumber tostring type unpack xpcall arg selfcoroutine resume yield status wrap create running debug getupvalue debug sethook getmetatable gethook setmetatable setlocal traceback setfenv getinfo setupvalue getlocal getregistry getfenv io lines write close flush open output type read stderr stdin input stdout popen tmpfile math log max acos huge ldexp pi cos tanh pow deg tan cosh sinh random randomseed frexp ceil floor rad abs sqrt modf asin min mod fmod log10 atan2 exp sin atan os exit setlocale date getenv difftime remove time clock tmpname rename execute package preload loadlib loaded loaders cpath config path seeall string sub upper len gfind rep find match char dump gmatch reverse byte format gsub lower table setn insert getn foreachi maxn foreach concat sort remove"
    },
    c: n.concat([{
      cN: "function",
      bK: "function",
      e: "\\)",
      c: [e.inherit(e.TM, {
        b: "([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*"
      }), {
        cN: "params",
        b: "\\(",
        eW: !0,
        c: n
      }].concat(n)
    }, e.CNM, e.ASM, e.QSM, {
      cN: "string",
      b: t,
      e: a,
      c: [r],
      r: 5
    }])
  };
});
hljs.registerLanguage("erlang", function (e) {
  var r = "[a-z'][a-zA-Z0-9_']*",
      c = "(" + r + ":" + r + "|" + r + ")",
      b = {
    keyword: "after and andalso|10 band begin bnot bor bsl bzr bxor case catch cond div end fun if let not of orelse|10 query receive rem try when xor",
    literal: "false true"
  },
      i = e.C("%", "$"),
      n = {
    cN: "number",
    b: "\\b(\\d+#[a-fA-F0-9]+|\\d+(\\.\\d+)?([eE][-+]?\\d+)?)",
    r: 0
  },
      a = {
    b: "fun\\s+" + r + "/\\d+"
  },
      d = {
    b: c + "\\(",
    e: "\\)",
    rB: !0,
    r: 0,
    c: [{
      b: c,
      r: 0
    }, {
      b: "\\(",
      e: "\\)",
      eW: !0,
      rE: !0,
      r: 0
    }]
  },
      o = {
    b: "{",
    e: "}",
    r: 0
  },
      t = {
    b: "\\b_([A-Z][A-Za-z0-9_]*)?",
    r: 0
  },
      f = {
    b: "[A-Z][a-zA-Z0-9_]*",
    r: 0
  },
      l = {
    b: "#" + e.UIR,
    r: 0,
    rB: !0,
    c: [{
      b: "#" + e.UIR,
      r: 0
    }, {
      b: "{",
      e: "}",
      r: 0
    }]
  },
      s = {
    bK: "fun receive if try case",
    e: "end",
    k: b
  };
  s.c = [i, a, e.inherit(e.ASM, {
    cN: ""
  }), s, d, e.QSM, n, o, t, f, l];
  var u = [i, a, s, d, e.QSM, n, o, t, f, l];
  d.c[1].c = u, o.c = u, l.c[1].c = u;
  var h = {
    cN: "params",
    b: "\\(",
    e: "\\)",
    c: u
  };
  return {
    aliases: ["erl"],
    k: b,
    i: "(</|\\*=|\\+=|-=|/\\*|\\*/|\\(\\*|\\*\\))",
    c: [{
      cN: "function",
      b: "^" + r + "\\s*\\(",
      e: "->",
      rB: !0,
      i: "\\(|#|//|/\\*|\\\\|:|;",
      c: [h, e.inherit(e.TM, {
        b: r
      })],
      starts: {
        e: ";|\\.",
        k: b,
        c: u
      }
    }, i, {
      b: "^-",
      e: "\\.",
      r: 0,
      eE: !0,
      rB: !0,
      l: "-" + e.IR,
      k: "-module -record -undef -export -ifdef -ifndef -author -copyright -doc -vsn -import -include -include_lib -compile -define -else -endif -file -behaviour -behavior -spec",
      c: [h]
    }, n, e.QSM, l, t, f, o, {
      b: /\.$/
    }]
  };
});
hljs.registerLanguage("htmlbars", function (e) {
  var a = "action collection component concat debugger each each-in else get hash if input link-to loc log mut outlet partial query-params render textarea unbound unless with yield view",
      t = {
    i: /\}\}/,
    b: /[a-zA-Z0-9_]+=/,
    rB: !0,
    r: 0,
    c: [{
      cN: "attr",
      b: /[a-zA-Z0-9_]+/
    }]
  },
      i = ({
    i: /\}\}/,
    b: /\)/,
    e: /\)/,
    c: [{
      b: /[a-zA-Z\.\-]+/,
      k: {
        built_in: a
      },
      starts: {
        eW: !0,
        r: 0,
        c: [e.QSM]
      }
    }]
  }, {
    eW: !0,
    r: 0,
    k: {
      keyword: "as",
      built_in: a
    },
    c: [e.QSM, t, e.NM]
  });
  return {
    cI: !0,
    sL: "xml",
    c: [e.C("{{!(--)?", "(--)?}}"), {
      cN: "template-tag",
      b: /\{\{[#\/]/,
      e: /\}\}/,
      c: [{
        cN: "name",
        b: /[a-zA-Z\.\-]+/,
        k: {
          "builtin-name": a
        },
        starts: i
      }]
    }, {
      cN: "template-variable",
      b: /\{\{[a-zA-Z][a-zA-Z\-]+/,
      e: /\}\}/,
      k: {
        keyword: "as",
        built_in: a
      },
      c: [e.QSM]
    }]
  };
});
hljs.registerLanguage("ruby", function (e) {
  var b = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",
      r = {
    keyword: "and then defined module in return redo if BEGIN retry end for self when next until do begin unless END rescue else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",
    literal: "true false nil"
  },
      c = {
    cN: "doctag",
    b: "@[A-Za-z]+"
  },
      a = {
    b: "#<",
    e: ">"
  },
      s = [e.C("#", "$", {
    c: [c]
  }), e.C("^\\=begin", "^\\=end", {
    c: [c],
    r: 10
  }), e.C("^__END__", "\\n$")],
      n = {
    cN: "subst",
    b: "#\\{",
    e: "}",
    k: r
  },
      t = {
    cN: "string",
    c: [e.BE, n],
    v: [{
      b: /'/,
      e: /'/
    }, {
      b: /"/,
      e: /"/
    }, {
      b: /`/,
      e: /`/
    }, {
      b: "%[qQwWx]?\\(",
      e: "\\)"
    }, {
      b: "%[qQwWx]?\\[",
      e: "\\]"
    }, {
      b: "%[qQwWx]?{",
      e: "}"
    }, {
      b: "%[qQwWx]?<",
      e: ">"
    }, {
      b: "%[qQwWx]?/",
      e: "/"
    }, {
      b: "%[qQwWx]?%",
      e: "%"
    }, {
      b: "%[qQwWx]?-",
      e: "-"
    }, {
      b: "%[qQwWx]?\\|",
      e: "\\|"
    }, {
      b: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/
    }, {
      b: /<<(-?)\w+$/,
      e: /^\s*\w+$/
    }]
  },
      i = {
    cN: "params",
    b: "\\(",
    e: "\\)",
    endsParent: !0,
    k: r
  },
      d = [t, a, {
    cN: "class",
    bK: "class module",
    e: "$|;",
    i: /=/,
    c: [e.inherit(e.TM, {
      b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"
    }), {
      b: "<\\s*",
      c: [{
        b: "(" + e.IR + "::)?" + e.IR
      }]
    }].concat(s)
  }, {
    cN: "function",
    bK: "def",
    e: "$|;",
    c: [e.inherit(e.TM, {
      b: b
    }), i].concat(s)
  }, {
    b: e.IR + "::"
  }, {
    cN: "symbol",
    b: e.UIR + "(\\!|\\?)?:",
    r: 0
  }, {
    cN: "symbol",
    b: ":(?!\\s)",
    c: [t, {
      b: b
    }],
    r: 0
  }, {
    cN: "number",
    b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
    r: 0
  }, {
    b: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))"
  }, {
    cN: "params",
    b: /\|/,
    e: /\|/,
    k: r
  }, {
    b: "(" + e.RSR + "|unless)\\s*",
    k: "unless",
    c: [a, {
      cN: "regexp",
      c: [e.BE, n],
      i: /\n/,
      v: [{
        b: "/",
        e: "/[a-z]*"
      }, {
        b: "%r{",
        e: "}[a-z]*"
      }, {
        b: "%r\\(",
        e: "\\)[a-z]*"
      }, {
        b: "%r!",
        e: "![a-z]*"
      }, {
        b: "%r\\[",
        e: "\\][a-z]*"
      }]
    }].concat(s),
    r: 0
  }].concat(s);
  n.c = d, i.c = d;
  var l = "[>?]>",
      o = "[\\w#]+\\(\\w+\\):\\d+:\\d+>",
      u = "(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>",
      w = [{
    b: /^\s*=>/,
    starts: {
      e: "$",
      c: d
    }
  }, {
    cN: "meta",
    b: "^(" + l + "|" + o + "|" + u + ")",
    starts: {
      e: "$",
      c: d
    }
  }];
  return {
    aliases: ["rb", "gemspec", "podspec", "thor", "irb"],
    k: r,
    i: /\/\*/,
    c: s.concat(w).concat(d)
  };
});
hljs.registerLanguage("haml", function (s) {
  return {
    cI: !0,
    c: [{
      cN: "meta",
      b: "^!!!( (5|1\\.1|Strict|Frameset|Basic|Mobile|RDFa|XML\\b.*))?$",
      r: 10
    }, s.C("^\\s*(!=#|=#|-#|/).*$", !1, {
      r: 0
    }), {
      b: "^\\s*(-|=|!=)(?!#)",
      starts: {
        e: "\\n",
        sL: "ruby"
      }
    }, {
      cN: "tag",
      b: "^\\s*%",
      c: [{
        cN: "selector-tag",
        b: "\\w+"
      }, {
        cN: "selector-id",
        b: "#[\\w-]+"
      }, {
        cN: "selector-class",
        b: "\\.[\\w-]+"
      }, {
        b: "{\\s*",
        e: "\\s*}",
        c: [{
          b: ":\\w+\\s*=>",
          e: ",\\s+",
          rB: !0,
          eW: !0,
          c: [{
            cN: "attr",
            b: ":\\w+"
          }, s.ASM, s.QSM, {
            b: "\\w+",
            r: 0
          }]
        }]
      }, {
        b: "\\(\\s*",
        e: "\\s*\\)",
        eE: !0,
        c: [{
          b: "\\w+\\s*=",
          e: "\\s+",
          rB: !0,
          eW: !0,
          c: [{
            cN: "attr",
            b: "\\w+",
            r: 0
          }, s.ASM, s.QSM, {
            b: "\\w+",
            r: 0
          }]
        }]
      }]
    }, {
      b: "^\\s*[=~]\\s*"
    }, {
      b: "#{",
      starts: {
        e: "}",
        sL: "ruby"
      }
    }]
  };
});
hljs.registerLanguage("mizar", function (e) {
  return {
    k: "environ vocabularies notations constructors definitions registrations theorems schemes requirements begin end definition registration cluster existence pred func defpred deffunc theorem proof let take assume then thus hence ex for st holds consider reconsider such that and in provided of as from be being by means equals implies iff redefine define now not or attr is mode suppose per cases set thesis contradiction scheme reserve struct correctness compatibility coherence symmetry assymetry reflexivity irreflexivity connectedness uniqueness commutativity idempotence involutiveness projectivity",
    c: [e.C("::", "$")]
  };
});
hljs.registerLanguage("sql", function (e) {
  var t = e.C("--", "$");
  return {
    cI: !0,
    i: /[<>{}*#]/,
    c: [{
      bK: "begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup revoke comment",
      e: /;/,
      eW: !0,
      l: /[\w\.]+/,
      k: {
        keyword: "abort abs absolute acc acce accep accept access accessed accessible account acos action activate add addtime admin administer advanced advise aes_decrypt aes_encrypt after agent aggregate ali alia alias allocate allow alter always analyze ancillary and any anydata anydataset anyschema anytype apply archive archived archivelog are as asc ascii asin assembly assertion associate asynchronous at atan atn2 attr attri attrib attribu attribut attribute attributes audit authenticated authentication authid authors auto autoallocate autodblink autoextend automatic availability avg backup badfile basicfile before begin beginning benchmark between bfile bfile_base big bigfile bin binary_double binary_float binlog bit_and bit_count bit_length bit_or bit_xor bitmap blob_base block blocksize body both bound buffer_cache buffer_pool build bulk by byte byteordermark bytes cache caching call calling cancel capacity cascade cascaded case cast catalog category ceil ceiling chain change changed char_base char_length character_length characters characterset charindex charset charsetform charsetid check checksum checksum_agg child choose chr chunk class cleanup clear client clob clob_base clone close cluster_id cluster_probability cluster_set clustering coalesce coercibility col collate collation collect colu colum column column_value columns columns_updated comment commit compact compatibility compiled complete composite_limit compound compress compute concat concat_ws concurrent confirm conn connec connect connect_by_iscycle connect_by_isleaf connect_by_root connect_time connection consider consistent constant constraint constraints constructor container content contents context contributors controlfile conv convert convert_tz corr corr_k corr_s corresponding corruption cos cost count count_big counted covar_pop covar_samp cpu_per_call cpu_per_session crc32 create creation critical cross cube cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime customdatum cycle data database databases datafile datafiles datalength date_add date_cache date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts day day_to_second dayname dayofmonth dayofweek dayofyear days db_role_change dbtimezone ddl deallocate declare decode decompose decrement decrypt deduplicate def defa defau defaul default defaults deferred defi defin define degrees delayed delegate delete delete_all delimited demand dense_rank depth dequeue des_decrypt des_encrypt des_key_file desc descr descri describ describe descriptor deterministic diagnostics difference dimension direct_load directory disable disable_all disallow disassociate discardfile disconnect diskgroup distinct distinctrow distribute distributed div do document domain dotnet double downgrade drop dumpfile duplicate duration each edition editionable editions element ellipsis else elsif elt empty enable enable_all enclosed encode encoding encrypt end end-exec endian enforced engine engines enqueue enterprise entityescaping eomonth error errors escaped evalname evaluate event eventdata events except exception exceptions exchange exclude excluding execu execut execute exempt exists exit exp expire explain export export_set extended extent external external_1 external_2 externally extract failed failed_login_attempts failover failure far fast feature_set feature_value fetch field fields file file_name_convert filesystem_like_logging final finish first first_value fixed flash_cache flashback floor flush following follows for forall force form forma format found found_rows freelist freelists freepools fresh from from_base64 from_days ftp full function general generated get get_format get_lock getdate getutcdate global global_name globally go goto grant grants greatest group group_concat group_id grouping grouping_id groups gtid_subtract guarantee guard handler hash hashkeys having hea head headi headin heading heap help hex hierarchy high high_priority hosts hour http id ident_current ident_incr ident_seed identified identity idle_time if ifnull ignore iif ilike ilm immediate import in include including increment index indexes indexing indextype indicator indices inet6_aton inet6_ntoa inet_aton inet_ntoa infile initial initialized initially initrans inmemory inner innodb input insert install instance instantiable instr interface interleaved intersect into invalidate invisible is is_free_lock is_ipv4 is_ipv4_compat is_not is_not_null is_used_lock isdate isnull isolation iterate java join json json_exists keep keep_duplicates key keys kill language large last last_day last_insert_id last_value lax lcase lead leading least leaves left len lenght length less level levels library like like2 like4 likec limit lines link list listagg little ln load load_file lob lobs local localtime localtimestamp locate locator lock locked log log10 log2 logfile logfiles logging logical logical_reads_per_call logoff logon logs long loop low low_priority lower lpad lrtrim ltrim main make_set makedate maketime managed management manual map mapping mask master master_pos_wait match matched materialized max maxextents maximize maxinstances maxlen maxlogfiles maxloghistory maxlogmembers maxsize maxtrans md5 measures median medium member memcompress memory merge microsecond mid migration min minextents minimum mining minus minute minvalue missing mod mode model modification modify module monitoring month months mount move movement multiset mutex name name_const names nan national native natural nav nchar nclob nested never new newline next nextval no no_write_to_binlog noarchivelog noaudit nobadfile nocheck nocompress nocopy nocycle nodelay nodiscardfile noentityescaping noguarantee nokeep nologfile nomapping nomaxvalue nominimize nominvalue nomonitoring none noneditionable nonschema noorder nopr nopro noprom nopromp noprompt norely noresetlogs noreverse normal norowdependencies noschemacheck noswitch not nothing notice notrim novalidate now nowait nth_value nullif nulls num numb numbe nvarchar nvarchar2 object ocicoll ocidate ocidatetime ociduration ociinterval ociloblocator ocinumber ociref ocirefcursor ocirowid ocistring ocitype oct octet_length of off offline offset oid oidindex old on online only opaque open operations operator optimal optimize option optionally or oracle oracle_date oradata ord ordaudio orddicom orddoc order ordimage ordinality ordvideo organization orlany orlvary out outer outfile outline output over overflow overriding package pad parallel parallel_enable parameters parent parse partial partition partitions pascal passing password password_grace_time password_lock_time password_reuse_max password_reuse_time password_verify_function patch path patindex pctincrease pctthreshold pctused pctversion percent percent_rank percentile_cont percentile_disc performance period period_add period_diff permanent physical pi pipe pipelined pivot pluggable plugin policy position post_transaction pow power pragma prebuilt precedes preceding precision prediction prediction_cost prediction_details prediction_probability prediction_set prepare present preserve prior priority private private_sga privileges procedural procedure procedure_analyze processlist profiles project prompt protection public publishingservername purge quarter query quick quiesce quota quotename radians raise rand range rank raw read reads readsize rebuild record records recover recovery recursive recycle redo reduced ref reference referenced references referencing refresh regexp_like register regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy reject rekey relational relative relaylog release release_lock relies_on relocate rely rem remainder rename repair repeat replace replicate replication required reset resetlogs resize resource respect restore restricted result result_cache resumable resume retention return returning returns reuse reverse revoke right rlike role roles rollback rolling rollup round row row_count rowdependencies rowid rownum rows rtrim rules safe salt sample save savepoint sb1 sb2 sb4 scan schema schemacheck scn scope scroll sdo_georaster sdo_topo_geometry search sec_to_time second section securefile security seed segment select self sequence sequential serializable server servererror session session_user sessions_per_user set sets settings sha sha1 sha2 share shared shared_pool short show shrink shutdown si_averagecolor si_colorhistogram si_featurelist si_positionalcolor si_stillimage si_texture siblings sid sign sin size size_t sizes skip slave sleep smalldatetimefromparts smallfile snapshot some soname sort soundex source space sparse spfile split sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_small_result sql_variant_property sqlcode sqldata sqlerror sqlname sqlstate sqrt square standalone standby start starting startup statement static statistics stats_binomial_test stats_crosstab stats_ks_test stats_mode stats_mw_test stats_one_way_anova stats_t_test_ stats_t_test_indep stats_t_test_one stats_t_test_paired stats_wsr_test status std stddev stddev_pop stddev_samp stdev stop storage store stored str str_to_date straight_join strcmp strict string struct stuff style subdate subpartition subpartitions substitutable substr substring subtime subtring_index subtype success sum suspend switch switchoffset switchover sync synchronous synonym sys sys_xmlagg sysasm sysaux sysdate sysdatetimeoffset sysdba sysoper system system_user sysutcdatetime table tables tablespace tan tdo template temporary terminated tertiary_weights test than then thread through tier ties time time_format time_zone timediff timefromparts timeout timestamp timestampadd timestampdiff timezone_abbr timezone_minute timezone_region to to_base64 to_date to_days to_seconds todatetimeoffset trace tracking transaction transactional translate translation treat trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse type ub1 ub2 ub4 ucase unarchived unbounded uncompress under undo unhex unicode uniform uninstall union unique unix_timestamp unknown unlimited unlock unpivot unrecoverable unsafe unsigned until untrusted unusable unused update updated upgrade upped upper upsert url urowid usable usage use use_stored_outlines user user_data user_resources users using utc_date utc_timestamp uuid uuid_short validate validate_password_strength validation valist value values var var_samp varcharc vari varia variab variabl variable variables variance varp varraw varrawc varray verify version versions view virtual visible void wait wallet warning warnings week weekday weekofyear wellformed when whene whenev wheneve whenever where while whitespace with within without work wrapped xdb xml xmlagg xmlattributes xmlcast xmlcolattval xmlelement xmlexists xmlforest xmlindex xmlnamespaces xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltype xor year year_to_month years yearweek",
        literal: "true false null",
        built_in: "array bigint binary bit blob boolean char character date dec decimal float int int8 integer interval number numeric real record serial serial8 smallint text varchar varying void"
      },
      c: [{
        cN: "string",
        b: "'",
        e: "'",
        c: [e.BE, {
          b: "''"
        }]
      }, {
        cN: "string",
        b: '"',
        e: '"',
        c: [e.BE, {
          b: '""'
        }]
      }, {
        cN: "string",
        b: "`",
        e: "`",
        c: [e.BE]
      }, e.CNM, e.CBCM, t]
    }, e.CBCM, t]
  };
});
hljs.registerLanguage("django", function (e) {
  var t = {
    b: /\|[A-Za-z]+:?/,
    k: {
      name: "truncatewords removetags linebreaksbr yesno get_digit timesince random striptags filesizeformat escape linebreaks length_is ljust rjust cut urlize fix_ampersands title floatformat capfirst pprint divisibleby add make_list unordered_list urlencode timeuntil urlizetrunc wordcount stringformat linenumbers slice date dictsort dictsortreversed default_if_none pluralize lower join center default truncatewords_html upper length phone2numeric wordwrap time addslashes slugify first escapejs force_escape iriencode last safe safeseq truncatechars localize unlocalize localtime utc timezone"
    },
    c: [e.QSM, e.ASM]
  };
  return {
    aliases: ["jinja"],
    cI: !0,
    sL: "xml",
    c: [e.C(/\{%\s*comment\s*%}/, /\{%\s*endcomment\s*%}/), e.C(/\{#/, /#}/), {
      cN: "template-tag",
      b: /\{%/,
      e: /%}/,
      c: [{
        cN: "name",
        b: /\w+/,
        k: {
          name: "comment endcomment load templatetag ifchanged endifchanged if endif firstof for endfor ifnotequal endifnotequal widthratio extends include spaceless endspaceless regroup ifequal endifequal ssi now with cycle url filter endfilter debug block endblock else autoescape endautoescape csrf_token empty elif endwith static trans blocktrans endblocktrans get_static_prefix get_media_prefix plural get_current_language language get_available_languages get_current_language_bidi get_language_info get_language_info_list localize endlocalize localtime endlocaltime timezone endtimezone get_current_timezone verbatim"
        },
        starts: {
          eW: !0,
          k: "in by as",
          c: [t],
          r: 0
        }
      }]
    }, {
      cN: "template-variable",
      b: /\{\{/,
      e: /}}/,
      c: [t]
    }]
  };
});
hljs.registerLanguage("avrasm", function (r) {
  return {
    cI: !0,
    l: "\\.?" + r.IR,
    k: {
      keyword: "adc add adiw and andi asr bclr bld brbc brbs brcc brcs break breq brge brhc brhs brid brie brlo brlt brmi brne brpl brsh brtc brts brvc brvs bset bst call cbi cbr clc clh cli cln clr cls clt clv clz com cp cpc cpi cpse dec eicall eijmp elpm eor fmul fmuls fmulsu icall ijmp in inc jmp ld ldd ldi lds lpm lsl lsr mov movw mul muls mulsu neg nop or ori out pop push rcall ret reti rjmp rol ror sbc sbr sbrc sbrs sec seh sbi sbci sbic sbis sbiw sei sen ser ses set sev sez sleep spm st std sts sub subi swap tst wdr",
      built_in: "r0 r1 r2 r3 r4 r5 r6 r7 r8 r9 r10 r11 r12 r13 r14 r15 r16 r17 r18 r19 r20 r21 r22 r23 r24 r25 r26 r27 r28 r29 r30 r31 x|0 xh xl y|0 yh yl z|0 zh zl ucsr1c udr1 ucsr1a ucsr1b ubrr1l ubrr1h ucsr0c ubrr0h tccr3c tccr3a tccr3b tcnt3h tcnt3l ocr3ah ocr3al ocr3bh ocr3bl ocr3ch ocr3cl icr3h icr3l etimsk etifr tccr1c ocr1ch ocr1cl twcr twdr twar twsr twbr osccal xmcra xmcrb eicra spmcsr spmcr portg ddrg ping portf ddrf sreg sph spl xdiv rampz eicrb eimsk gimsk gicr eifr gifr timsk tifr mcucr mcucsr tccr0 tcnt0 ocr0 assr tccr1a tccr1b tcnt1h tcnt1l ocr1ah ocr1al ocr1bh ocr1bl icr1h icr1l tccr2 tcnt2 ocr2 ocdr wdtcr sfior eearh eearl eedr eecr porta ddra pina portb ddrb pinb portc ddrc pinc portd ddrd pind spdr spsr spcr udr0 ucsr0a ucsr0b ubrr0l acsr admux adcsr adch adcl porte ddre pine pinf",
      meta: ".byte .cseg .db .def .device .dseg .dw .endmacro .equ .eseg .exit .include .list .listmac .macro .nolist .org .set"
    },
    c: [r.CBCM, r.C(";", "$", {
      r: 0
    }), r.CNM, r.BNM, {
      cN: "number",
      b: "\\b(\\$[a-zA-Z0-9]+|0o[0-7]+)"
    }, r.QSM, {
      cN: "string",
      b: "'",
      e: "[^\\\\]'",
      i: "[^\\\\][^']"
    }, {
      cN: "symbol",
      b: "^[A-Za-z0-9_.$]+:"
    }, {
      cN: "meta",
      b: "#",
      e: "$"
    }, {
      cN: "subst",
      b: "@[0-9]+"
    }]
  };
});
hljs.registerLanguage("q", function (e) {
  var s = {
    keyword: "do while select delete by update from",
    literal: "0b 1b",
    built_in: "neg not null string reciprocal floor ceiling signum mod xbar xlog and or each scan over prior mmu lsq inv md5 ltime gtime count first var dev med cov cor all any rand sums prds mins maxs fills deltas ratios avgs differ prev next rank reverse iasc idesc asc desc msum mcount mavg mdev xrank mmin mmax xprev rotate distinct group where flip type key til get value attr cut set upsert raze union inter except cross sv vs sublist enlist read0 read1 hopen hclose hdel hsym hcount peach system ltrim rtrim trim lower upper ssr view tables views cols xcols keys xkey xcol xasc xdesc fkeys meta lj aj aj0 ij pj asof uj ww wj wj1 fby xgroup ungroup ej save load rsave rload show csv parse eval min max avg wavg wsum sin cos tan sum",
    type: "`float `double int `timestamp `timespan `datetime `time `boolean `symbol `char `byte `short `long `real `month `date `minute `second `guid"
  };
  return {
    aliases: ["k", "kdb"],
    k: s,
    l: /(`?)[A-Za-z0-9_]+\b/,
    c: [e.CLCM, e.QSM, e.CNM]
  };
});
hljs.registerLanguage("brainfuck", function (r) {
  var n = {
    cN: "literal",
    b: "[\\+\\-]",
    r: 0
  };
  return {
    aliases: ["bf"],
    c: [r.C("[^\\[\\]\\.,\\+\\-<> \r\n]", "[\\[\\]\\.,\\+\\-<> \r\n]", {
      rE: !0,
      r: 0
    }), {
      cN: "title",
      b: "[\\[\\]]",
      r: 0
    }, {
      cN: "string",
      b: "[\\.,]",
      r: 0
    }, {
      b: /\+\+|\-\-/,
      rB: !0,
      c: [n]
    }, n]
  };
});
hljs.registerLanguage("nginx", function (e) {
  var r = {
    cN: "variable",
    v: [{
      b: /\$\d+/
    }, {
      b: /\$\{/,
      e: /}/
    }, {
      b: "[\\$\\@]" + e.UIR
    }]
  },
      b = {
    eW: !0,
    l: "[a-z/_]+",
    k: {
      literal: "on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"
    },
    r: 0,
    i: "=>",
    c: [e.HCM, {
      cN: "string",
      c: [e.BE, r],
      v: [{
        b: /"/,
        e: /"/
      }, {
        b: /'/,
        e: /'/
      }]
    }, {
      b: "([a-z]+):/",
      e: "\\s",
      eW: !0,
      eE: !0,
      c: [r]
    }, {
      cN: "regexp",
      c: [e.BE, r],
      v: [{
        b: "\\s\\^",
        e: "\\s|{|;",
        rE: !0
      }, {
        b: "~\\*?\\s+",
        e: "\\s|{|;",
        rE: !0
      }, {
        b: "\\*(\\.[a-z\\-]+)+"
      }, {
        b: "([a-z\\-]+\\.)+\\*"
      }]
    }, {
      cN: "number",
      b: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"
    }, {
      cN: "number",
      b: "\\b\\d+[kKmMgGdshdwy]*\\b",
      r: 0
    }, r]
  };
  return {
    aliases: ["nginxconf"],
    c: [e.HCM, {
      b: e.UIR + "\\s+{",
      rB: !0,
      e: "{",
      c: [{
        cN: "section",
        b: e.UIR
      }],
      r: 0
    }, {
      b: e.UIR + "\\s",
      e: ";|{",
      rB: !0,
      c: [{
        cN: "attribute",
        b: e.UIR,
        starts: b
      }],
      r: 0
    }],
    i: "[^\\s\\}]"
  };
});
hljs.registerLanguage("excel", function (E) {
  return {
    aliases: ["xlsx", "xls"],
    cI: !0,
    l: /[a-zA-Z][\w\.]*/,
    k: {
      built_in: "ABS ACCRINT ACCRINTM ACOS ACOSH ACOT ACOTH AGGREGATE ADDRESS AMORDEGRC AMORLINC AND ARABIC AREAS ASC ASIN ASINH ATAN ATAN2 ATANH AVEDEV AVERAGE AVERAGEA AVERAGEIF AVERAGEIFS BAHTTEXT BASE BESSELI BESSELJ BESSELK BESSELY BETADIST BETA.DIST BETAINV BETA.INV BIN2DEC BIN2HEX BIN2OCT BINOMDIST BINOM.DIST BINOM.DIST.RANGE BINOM.INV BITAND BITLSHIFT BITOR BITRSHIFT BITXOR CALL CEILING CEILING.MATH CEILING.PRECISE CELL CHAR CHIDIST CHIINV CHITEST CHISQ.DIST CHISQ.DIST.RT CHISQ.INV CHISQ.INV.RT CHISQ.TEST CHOOSE CLEAN CODE COLUMN COLUMNS COMBIN COMBINA COMPLEX CONCAT CONCATENATE CONFIDENCE CONFIDENCE.NORM CONFIDENCE.T CONVERT CORREL COS COSH COT COTH COUNT COUNTA COUNTBLANK COUNTIF COUNTIFS COUPDAYBS COUPDAYS COUPDAYSNC COUPNCD COUPNUM COUPPCD COVAR COVARIANCE.P COVARIANCE.S CRITBINOM CSC CSCH CUBEKPIMEMBER CUBEMEMBER CUBEMEMBERPROPERTY CUBERANKEDMEMBER CUBESET CUBESETCOUNT CUBEVALUE CUMIPMT CUMPRINC DATE DATEDIF DATEVALUE DAVERAGE DAY DAYS DAYS360 DB DBCS DCOUNT DCOUNTA DDB DEC2BIN DEC2HEX DEC2OCT DECIMAL DEGREES DELTA DEVSQ DGET DISC DMAX DMIN DOLLAR DOLLARDE DOLLARFR DPRODUCT DSTDEV DSTDEVP DSUM DURATION DVAR DVARP EDATE EFFECT ENCODEURL EOMONTH ERF ERF.PRECISE ERFC ERFC.PRECISE ERROR.TYPE EUROCONVERT EVEN EXACT EXP EXPON.DIST EXPONDIST FACT FACTDOUBLE FALSE|0 F.DIST FDIST F.DIST.RT FILTERXML FIND FINDB F.INV F.INV.RT FINV FISHER FISHERINV FIXED FLOOR FLOOR.MATH FLOOR.PRECISE FORECAST FORECAST.ETS FORECAST.ETS.CONFINT FORECAST.ETS.SEASONALITY FORECAST.ETS.STAT FORECAST.LINEAR FORMULATEXT FREQUENCY F.TEST FTEST FV FVSCHEDULE GAMMA GAMMA.DIST GAMMADIST GAMMA.INV GAMMAINV GAMMALN GAMMALN.PRECISE GAUSS GCD GEOMEAN GESTEP GETPIVOTDATA GROWTH HARMEAN HEX2BIN HEX2DEC HEX2OCT HLOOKUP HOUR HYPERLINK HYPGEOM.DIST HYPGEOMDIST IF|0 IFERROR IFNA IFS IMABS IMAGINARY IMARGUMENT IMCONJUGATE IMCOS IMCOSH IMCOT IMCSC IMCSCH IMDIV IMEXP IMLN IMLOG10 IMLOG2 IMPOWER IMPRODUCT IMREAL IMSEC IMSECH IMSIN IMSINH IMSQRT IMSUB IMSUM IMTAN INDEX INDIRECT INFO INT INTERCEPT INTRATE IPMT IRR ISBLANK ISERR ISERROR ISEVEN ISFORMULA ISLOGICAL ISNA ISNONTEXT ISNUMBER ISODD ISREF ISTEXT ISO.CEILING ISOWEEKNUM ISPMT JIS KURT LARGE LCM LEFT LEFTB LEN LENB LINEST LN LOG LOG10 LOGEST LOGINV LOGNORM.DIST LOGNORMDIST LOGNORM.INV LOOKUP LOWER MATCH MAX MAXA MAXIFS MDETERM MDURATION MEDIAN MID MIDBs MIN MINIFS MINA MINUTE MINVERSE MIRR MMULT MOD MODE MODE.MULT MODE.SNGL MONTH MROUND MULTINOMIAL MUNIT N NA NEGBINOM.DIST NEGBINOMDIST NETWORKDAYS NETWORKDAYS.INTL NOMINAL NORM.DIST NORMDIST NORMINV NORM.INV NORM.S.DIST NORMSDIST NORM.S.INV NORMSINV NOT NOW NPER NPV NUMBERVALUE OCT2BIN OCT2DEC OCT2HEX ODD ODDFPRICE ODDFYIELD ODDLPRICE ODDLYIELD OFFSET OR PDURATION PEARSON PERCENTILE.EXC PERCENTILE.INC PERCENTILE PERCENTRANK.EXC PERCENTRANK.INC PERCENTRANK PERMUT PERMUTATIONA PHI PHONETIC PI PMT POISSON.DIST POISSON POWER PPMT PRICE PRICEDISC PRICEMAT PROB PRODUCT PROPER PV QUARTILE QUARTILE.EXC QUARTILE.INC QUOTIENT RADIANS RAND RANDBETWEEN RANK.AVG RANK.EQ RANK RATE RECEIVED REGISTER.ID REPLACE REPLACEB REPT RIGHT RIGHTB ROMAN ROUND ROUNDDOWN ROUNDUP ROW ROWS RRI RSQ RTD SEARCH SEARCHB SEC SECH SECOND SERIESSUM SHEET SHEETS SIGN SIN SINH SKEW SKEW.P SLN SLOPE SMALL SQL.REQUEST SQRT SQRTPI STANDARDIZE STDEV STDEV.P STDEV.S STDEVA STDEVP STDEVPA STEYX SUBSTITUTE SUBTOTAL SUM SUMIF SUMIFS SUMPRODUCT SUMSQ SUMX2MY2 SUMX2PY2 SUMXMY2 SWITCH SYD T TAN TANH TBILLEQ TBILLPRICE TBILLYIELD T.DIST T.DIST.2T T.DIST.RT TDIST TEXT TEXTJOIN TIME TIMEVALUE T.INV T.INV.2T TINV TODAY TRANSPOSE TREND TRIM TRIMMEAN TRUE|0 TRUNC T.TEST TTEST TYPE UNICHAR UNICODE UPPER VALUE VAR VAR.P VAR.S VARA VARP VARPA VDB VLOOKUP WEBSERVICE WEEKDAY WEEKNUM WEIBULL WEIBULL.DIST WORKDAY WORKDAY.INTL XIRR XNPV XOR YEAR YEARFRAC YIELD YIELDDISC YIELDMAT Z.TEST ZTEST"
    },
    c: [{
      b: /^=/,
      e: /[^=]/,
      rE: !0,
      i: /=/,
      r: 10
    }, {
      cN: "symbol",
      b: /\b[A-Z]{1,2}\d+\b/,
      e: /[^\d]/,
      eE: !0,
      r: 0
    }, {
      cN: "symbol",
      b: /[A-Z]{0,2}\d*:[A-Z]{0,2}\d*/,
      r: 0
    }, E.BE, E.QSM, {
      cN: "number",
      b: E.NR + "(%)?",
      r: 0
    }, E.C(/\bN\(/, /\)/, {
      eB: !0,
      eE: !0,
      i: /\n/
    })]
  };
});
hljs.registerLanguage("aspectj", function (e) {
  var t = "false synchronized int abstract float private char boolean static null if const for true while long throw strictfp finally protected import native final return void enum else extends implements break transient new catch instanceof byte super volatile case assert short package default double public try this switch continue throws privileged aspectOf adviceexecution proceed cflowbelow cflow initialization preinitialization staticinitialization withincode target within execution getWithinTypeName handler thisJoinPoint thisJoinPointStaticPart thisEnclosingJoinPointStaticPart declare parents warning error soft precedence thisAspectInstance",
      i = "get set args call";
  return {
    k: t,
    i: /<\/|#/,
    c: [e.C("/\\*\\*", "\\*/", {
      r: 0,
      c: [{
        b: /\w+@/,
        r: 0
      }, {
        cN: "doctag",
        b: "@[A-Za-z]+"
      }]
    }), e.CLCM, e.CBCM, e.ASM, e.QSM, {
      cN: "class",
      bK: "aspect",
      e: /[{;=]/,
      eE: !0,
      i: /[:;"\[\]]/,
      c: [{
        bK: "extends implements pertypewithin perthis pertarget percflowbelow percflow issingleton"
      }, e.UTM, {
        b: /\([^\)]*/,
        e: /[)]+/,
        k: t + " " + i,
        eE: !1
      }]
    }, {
      cN: "class",
      bK: "class interface",
      e: /[{;=]/,
      eE: !0,
      r: 0,
      k: "class interface",
      i: /[:"\[\]]/,
      c: [{
        bK: "extends implements"
      }, e.UTM]
    }, {
      bK: "pointcut after before around throwing returning",
      e: /[)]/,
      eE: !1,
      i: /["\[\]]/,
      c: [{
        b: e.UIR + "\\s*\\(",
        rB: !0,
        c: [e.UTM]
      }]
    }, {
      b: /[:]/,
      rB: !0,
      e: /[{;]/,
      r: 0,
      eE: !1,
      k: t,
      i: /["\[\]]/,
      c: [{
        b: e.UIR + "\\s*\\(",
        k: t + " " + i,
        r: 0
      }, e.QSM]
    }, {
      bK: "new throw",
      r: 0
    }, {
      cN: "function",
      b: /\w+ +\w+(\.)?\w+\s*\([^\)]*\)\s*((throws)[\w\s,]+)?[\{;]/,
      rB: !0,
      e: /[{;=]/,
      k: t,
      eE: !0,
      c: [{
        b: e.UIR + "\\s*\\(",
        rB: !0,
        r: 0,
        c: [e.UTM]
      }, {
        cN: "params",
        b: /\(/,
        e: /\)/,
        r: 0,
        k: t,
        c: [e.ASM, e.QSM, e.CNM, e.CBCM]
      }, e.CLCM, e.CBCM]
    }, e.CNM, {
      cN: "meta",
      b: "@[A-Za-z]+"
    }]
  };
});
hljs.registerLanguage("yaml", function (e) {
  var b = "true false yes no null",
      a = "^[ \\-]*",
      r = "[a-zA-Z_][\\w\\-]*",
      t = {
    cN: "attr",
    v: [{
      b: a + r + ":"
    }, {
      b: a + '"' + r + '":'
    }, {
      b: a + "'" + r + "':"
    }]
  },
      c = {
    cN: "template-variable",
    v: [{
      b: "{{",
      e: "}}"
    }, {
      b: "%{",
      e: "}"
    }]
  },
      l = {
    cN: "string",
    r: 0,
    v: [{
      b: /'/,
      e: /'/
    }, {
      b: /"/,
      e: /"/
    }, {
      b: /\S+/
    }],
    c: [e.BE, c]
  };
  return {
    cI: !0,
    aliases: ["yml", "YAML", "yaml"],
    c: [t, {
      cN: "meta",
      b: "^---s*$",
      r: 10
    }, {
      cN: "string",
      b: "[\\|>] *$",
      rE: !0,
      c: l.c,
      e: t.v[0].b
    }, {
      b: "<%[%=-]?",
      e: "[%-]?%>",
      sL: "ruby",
      eB: !0,
      eE: !0,
      r: 0
    }, {
      cN: "type",
      b: "!!" + e.UIR
    }, {
      cN: "meta",
      b: "&" + e.UIR + "$"
    }, {
      cN: "meta",
      b: "\\*" + e.UIR + "$"
    }, {
      cN: "bullet",
      b: "^ *-",
      r: 0
    }, e.HCM, {
      bK: b,
      k: {
        literal: b
      }
    }, e.CNM, l]
  };
});
hljs.registerLanguage("tap", function (b) {
  return {
    cI: !0,
    c: [b.HCM, {
      cN: "meta",
      v: [{
        b: "^TAP version (\\d+)$"
      }, {
        b: "^1\\.\\.(\\d+)$"
      }]
    }, {
      b: "(s+)?---$",
      e: "\\.\\.\\.$",
      sL: "yaml",
      r: 0
    }, {
      cN: "number",
      b: " (\\d+) "
    }, {
      cN: "symbol",
      v: [{
        b: "^ok"
      }, {
        b: "^not ok"
      }]
    }]
  };
});
hljs.registerLanguage("stan", function (e) {
  return {
    c: [e.HCM, e.CLCM, e.CBCM, {
      b: e.UIR,
      l: e.UIR,
      k: {
        name: "for in while repeat until if then else",
        symbol: "bernoulli bernoulli_logit binomial binomial_logit beta_binomial hypergeometric categorical categorical_logit ordered_logistic neg_binomial neg_binomial_2 neg_binomial_2_log poisson poisson_log multinomial normal exp_mod_normal skew_normal student_t cauchy double_exponential logistic gumbel lognormal chi_square inv_chi_square scaled_inv_chi_square exponential inv_gamma weibull frechet rayleigh wiener pareto pareto_type_2 von_mises uniform multi_normal multi_normal_prec multi_normal_cholesky multi_gp multi_gp_cholesky multi_student_t gaussian_dlm_obs dirichlet lkj_corr lkj_corr_cholesky wishart inv_wishart",
        "selector-tag": "int real vector simplex unit_vector ordered positive_ordered row_vector matrix cholesky_factor_corr cholesky_factor_cov corr_matrix cov_matrix",
        title: "functions model data parameters quantities transformed generated",
        literal: "true false"
      },
      r: 0
    }, {
      cN: "number",
      b: "0[xX][0-9a-fA-F]+[Li]?\\b",
      r: 0
    }, {
      cN: "number",
      b: "0[xX][0-9a-fA-F]+[Li]?\\b",
      r: 0
    }, {
      cN: "number",
      b: "\\d+(?:[eE][+\\-]?\\d*)?L\\b",
      r: 0
    }, {
      cN: "number",
      b: "\\d+\\.(?!\\d)(?:i\\b)?",
      r: 0
    }, {
      cN: "number",
      b: "\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d*)?i?\\b",
      r: 0
    }, {
      cN: "number",
      b: "\\.\\d+(?:[eE][+\\-]?\\d*)?i?\\b",
      r: 0
    }]
  };
});
hljs.registerLanguage("ebnf", function (a) {
  var e = a.C(/\(\*/, /\*\)/),
      t = {
    cN: "attribute",
    b: /^[ ]*[a-zA-Z][a-zA-Z-]*([\s-]+[a-zA-Z][a-zA-Z]*)*/
  },
      r = {
    cN: "meta",
    b: /\?.*\?/
  },
      b = {
    b: /=/,
    e: /;/,
    c: [e, r, a.ASM, a.QSM]
  };
  return {
    i: /\S/,
    c: [e, t, b]
  };
});
hljs.registerLanguage("scheme", function (e) {
  var t = "[^\\(\\)\\[\\]\\{\\}\",'`;#|\\\\\\s]+",
      r = "(\\-|\\+)?\\d+([./]\\d+)?",
      a = r + "[+\\-]" + r + "i",
      i = {
    "builtin-name": "case-lambda call/cc class define-class exit-handler field import inherit init-field interface let*-values let-values let/ec mixin opt-lambda override protect provide public rename require require-for-syntax syntax syntax-case syntax-error unit/sig unless when with-syntax and begin call-with-current-continuation call-with-input-file call-with-output-file case cond define define-syntax delay do dynamic-wind else for-each if lambda let let* let-syntax letrec letrec-syntax map or syntax-rules ' * + , ,@ - ... / ; < <= = => > >= ` abs acos angle append apply asin assoc assq assv atan boolean? caar cadr call-with-input-file call-with-output-file call-with-values car cdddar cddddr cdr ceiling char->integer char-alphabetic? char-ci<=? char-ci<? char-ci=? char-ci>=? char-ci>? char-downcase char-lower-case? char-numeric? char-ready? char-upcase char-upper-case? char-whitespace? char<=? char<? char=? char>=? char>? char? close-input-port close-output-port complex? cons cos current-input-port current-output-port denominator display eof-object? eq? equal? eqv? eval even? exact->inexact exact? exp expt floor force gcd imag-part inexact->exact inexact? input-port? integer->char integer? interaction-environment lcm length list list->string list->vector list-ref list-tail list? load log magnitude make-polar make-rectangular make-string make-vector max member memq memv min modulo negative? newline not null-environment null? number->string number? numerator odd? open-input-file open-output-file output-port? pair? peek-char port? positive? procedure? quasiquote quote quotient rational? rationalize read read-char real-part real? remainder reverse round scheme-report-environment set! set-car! set-cdr! sin sqrt string string->list string->number string->symbol string-append string-ci<=? string-ci<? string-ci=? string-ci>=? string-ci>? string-copy string-fill! string-length string-ref string-set! string<=? string<? string=? string>=? string>? string? substring symbol->string symbol? tan transcript-off transcript-on truncate values vector vector->list vector-fill! vector-length vector-ref vector-set! with-input-from-file with-output-to-file write write-char zero?"
  },
      n = {
    cN: "meta",
    b: "^#!",
    e: "$"
  },
      c = {
    cN: "literal",
    b: "(#t|#f|#\\\\" + t + "|#\\\\.)"
  },
      l = {
    cN: "number",
    v: [{
      b: r,
      r: 0
    }, {
      b: a,
      r: 0
    }, {
      b: "#b[0-1]+(/[0-1]+)?"
    }, {
      b: "#o[0-7]+(/[0-7]+)?"
    }, {
      b: "#x[0-9a-f]+(/[0-9a-f]+)?"
    }]
  },
      s = e.QSM,
      o = [e.C(";", "$", {
    r: 0
  }), e.C("#\\|", "\\|#")],
      u = {
    b: t,
    r: 0
  },
      p = {
    cN: "symbol",
    b: "'" + t
  },
      d = {
    eW: !0,
    r: 0
  },
      m = {
    v: [{
      b: /'/
    }, {
      b: "`"
    }],
    c: [{
      b: "\\(",
      e: "\\)",
      c: ["self", c, s, l, u, p]
    }]
  },
      g = {
    cN: "name",
    b: t,
    l: t,
    k: i
  },
      h = {
    b: /lambda/,
    eW: !0,
    rB: !0,
    c: [g, {
      b: /\(/,
      e: /\)/,
      endsParent: !0,
      c: [u]
    }]
  },
      b = {
    v: [{
      b: "\\(",
      e: "\\)"
    }, {
      b: "\\[",
      e: "\\]"
    }],
    c: [h, g, d]
  };
  return d.c = [c, l, s, u, p, m, b].concat(o), {
    i: /\S/,
    c: [n, l, s, p, m, b].concat(o)
  };
});
hljs.registerLanguage("mipsasm", function (s) {
  return {
    cI: !0,
    aliases: ["mips"],
    l: "\\.?" + s.IR,
    k: {
      meta: ".2byte .4byte .align .ascii .asciz .balign .byte .code .data .else .end .endif .endm .endr .equ .err .exitm .extern .global .hword .if .ifdef .ifndef .include .irp .long .macro .rept .req .section .set .skip .space .text .word .ltorg ",
      built_in: "$0 $1 $2 $3 $4 $5 $6 $7 $8 $9 $10 $11 $12 $13 $14 $15 $16 $17 $18 $19 $20 $21 $22 $23 $24 $25 $26 $27 $28 $29 $30 $31 zero at v0 v1 a0 a1 a2 a3 a4 a5 a6 a7 t0 t1 t2 t3 t4 t5 t6 t7 t8 t9 s0 s1 s2 s3 s4 s5 s6 s7 s8 k0 k1 gp sp fp ra $f0 $f1 $f2 $f2 $f4 $f5 $f6 $f7 $f8 $f9 $f10 $f11 $f12 $f13 $f14 $f15 $f16 $f17 $f18 $f19 $f20 $f21 $f22 $f23 $f24 $f25 $f26 $f27 $f28 $f29 $f30 $f31 Context Random EntryLo0 EntryLo1 Context PageMask Wired EntryHi HWREna BadVAddr Count Compare SR IntCtl SRSCtl SRSMap Cause EPC PRId EBase Config Config1 Config2 Config3 LLAddr Debug DEPC DESAVE CacheErr ECC ErrorEPC TagLo DataLo TagHi DataHi WatchLo WatchHi PerfCtl PerfCnt "
    },
    c: [{
      cN: "keyword",
      b: "\\b(addi?u?|andi?|b(al)?|beql?|bgez(al)?l?|bgtzl?|blezl?|bltz(al)?l?|bnel?|cl[oz]|divu?|ext|ins|j(al)?|jalr(.hb)?|jr(.hb)?|lbu?|lhu?|ll|lui|lw[lr]?|maddu?|mfhi|mflo|movn|movz|move|msubu?|mthi|mtlo|mul|multu?|nop|nor|ori?|rotrv?|sb|sc|se[bh]|sh|sllv?|slti?u?|srav?|srlv?|subu?|sw[lr]?|xori?|wsbh|abs.[sd]|add.[sd]|alnv.ps|bc1[ft]l?|c.(s?f|un|u?eq|[ou]lt|[ou]le|ngle?|seq|l[et]|ng[et]).[sd]|(ceil|floor|round|trunc).[lw].[sd]|cfc1|cvt.d.[lsw]|cvt.l.[dsw]|cvt.ps.s|cvt.s.[dlw]|cvt.s.p[lu]|cvt.w.[dls]|div.[ds]|ldx?c1|luxc1|lwx?c1|madd.[sd]|mfc1|mov[fntz]?.[ds]|msub.[sd]|mth?c1|mul.[ds]|neg.[ds]|nmadd.[ds]|nmsub.[ds]|p[lu][lu].ps|recip.fmt|r?sqrt.[ds]|sdx?c1|sub.[ds]|suxc1|swx?c1|break|cache|d?eret|[de]i|ehb|mfc0|mtc0|pause|prefx?|rdhwr|rdpgpr|sdbbp|ssnop|synci?|syscall|teqi?|tgei?u?|tlb(p|r|w[ir])|tlti?u?|tnei?|wait|wrpgpr)",
      e: "\\s"
    }, s.C("[;#]", "$"), s.CBCM, s.QSM, {
      cN: "string",
      b: "'",
      e: "[^\\\\]'",
      r: 0
    }, {
      cN: "title",
      b: "\\|",
      e: "\\|",
      i: "\\n",
      r: 0
    }, {
      cN: "number",
      v: [{
        b: "0x[0-9a-f]+"
      }, {
        b: "\\b-?\\d+"
      }],
      r: 0
    }, {
      cN: "symbol",
      v: [{
        b: "^\\s*[a-z_\\.\\$][a-z0-9_\\.\\$]+:"
      }, {
        b: "^\\s*[0-9]+:"
      }, {
        b: "[0-9]+[bf]"
      }],
      r: 0
    }],
    i: "/"
  };
});
hljs.registerLanguage("purebasic", function (e) {
  var r = {
    cN: "string",
    b: '(~)?"',
    e: '"',
    i: "\\n"
  },
      t = {
    cN: "symbol",
    b: "#[a-zA-Z_]\\w*\\$?"
  };
  return {
    aliases: ["pb", "pbi"],
    k: "And As Break CallDebugger Case CompilerCase CompilerDefault CompilerElse CompilerEndIf CompilerEndSelect CompilerError CompilerIf CompilerSelect Continue Data DataSection EndDataSection Debug DebugLevel Default Define Dim DisableASM DisableDebugger DisableExplicit Else ElseIf EnableASM EnableDebugger EnableExplicit End EndEnumeration EndIf EndImport EndInterface EndMacro EndProcedure EndSelect EndStructure EndStructureUnion EndWith Enumeration Extends FakeReturn For Next ForEach ForEver Global Gosub Goto If Import ImportC IncludeBinary IncludeFile IncludePath Interface Macro NewList Not Or ProcedureReturn Protected Prototype PrototypeC Read ReDim Repeat Until Restore Return Select Shared Static Step Structure StructureUnion Swap To Wend While With XIncludeFile XOr Procedure ProcedureC ProcedureCDLL ProcedureDLL Declare DeclareC DeclareCDLL DeclareDLL",
    c: [e.C(";", "$", {
      r: 0
    }), {
      cN: "function",
      b: "\\b(Procedure|Declare)(C|CDLL|DLL)?\\b",
      e: "\\(",
      eE: !0,
      rB: !0,
      c: [{
        cN: "keyword",
        b: "(Procedure|Declare)(C|CDLL|DLL)?",
        eE: !0
      }, {
        cN: "type",
        b: "\\.\\w*"
      }, e.UTM]
    }, r, t]
  };
});
hljs.registerLanguage("jboss-cli", function (e) {
  var a = {
    b: /[\w-]+ *=/,
    rB: !0,
    r: 0,
    c: [{
      cN: "attr",
      b: /[\w-]+/
    }]
  },
      r = {
    cN: "params",
    b: /\(/,
    e: /\)/,
    c: [a],
    r: 0
  },
      o = {
    cN: "function",
    b: /:[\w\-.]+/,
    r: 0
  },
      t = {
    cN: "string",
    b: /\B(([\/.])[\w\-.\/=]+)+/
  },
      c = {
    cN: "params",
    b: /--[\w\-=\/]+/
  };
  return {
    aliases: ["wildfly-cli"],
    l: "[a-z-]+",
    k: {
      keyword: "alias batch cd clear command connect connection-factory connection-info data-source deploy deployment-info deployment-overlay echo echo-dmr help history if jdbc-driver-info jms-queue|20 jms-topic|20 ls patch pwd quit read-attribute read-operation reload rollout-plan run-batch set shutdown try unalias undeploy unset version xa-data-source",
      literal: "true false"
    },
    c: [e.HCM, e.QSM, c, o, t, r]
  };
});
hljs.registerLanguage("php", function (e) {
  var c = {
    b: "\\$+[a-zA-Z_-ÿ][a-zA-Z0-9_-ÿ]*"
  },
      i = {
    cN: "meta",
    b: /<\?(php)?|\?>/
  },
      t = {
    cN: "string",
    c: [e.BE, i],
    v: [{
      b: 'b"',
      e: '"'
    }, {
      b: "b'",
      e: "'"
    }, e.inherit(e.ASM, {
      i: null
    }), e.inherit(e.QSM, {
      i: null
    })]
  },
      a = {
    v: [e.BNM, e.CNM]
  };
  return {
    aliases: ["php3", "php4", "php5", "php6"],
    cI: !0,
    k: "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",
    c: [e.HCM, e.C("//", "$", {
      c: [i]
    }), e.C("/\\*", "\\*/", {
      c: [{
        cN: "doctag",
        b: "@[A-Za-z]+"
      }]
    }), e.C("__halt_compiler.+?;", !1, {
      eW: !0,
      k: "__halt_compiler",
      l: e.UIR
    }), {
      cN: "string",
      b: /<<<['"]?\w+['"]?$/,
      e: /^\w+;?$/,
      c: [e.BE, {
        cN: "subst",
        v: [{
          b: /\$\w+/
        }, {
          b: /\{\$/,
          e: /\}/
        }]
      }]
    }, i, {
      cN: "keyword",
      b: /\$this\b/
    }, c, {
      b: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/
    }, {
      cN: "function",
      bK: "function",
      e: /[;{]/,
      eE: !0,
      i: "\\$|\\[|%",
      c: [e.UTM, {
        cN: "params",
        b: "\\(",
        e: "\\)",
        c: ["self", c, e.CBCM, t, a]
      }]
    }, {
      cN: "class",
      bK: "class interface",
      e: "{",
      eE: !0,
      i: /[:\(\$"]/,
      c: [{
        bK: "extends implements"
      }, e.UTM]
    }, {
      bK: "namespace",
      e: ";",
      i: /[\.']/,
      c: [e.UTM]
    }, {
      bK: "use",
      e: ";",
      c: [e.UTM]
    }, {
      b: "=>"
    }, t, a]
  };
});
hljs.registerLanguage("tex", function (c) {
  var e = {
    cN: "tag",
    b: /\\/,
    r: 0,
    c: [{
      cN: "name",
      v: [{
        b: /[a-zA-Zа-яА-я]+[*]?/
      }, {
        b: /[^a-zA-Zа-яА-я0-9]/
      }],
      starts: {
        eW: !0,
        r: 0,
        c: [{
          cN: "string",
          v: [{
            b: /\[/,
            e: /\]/
          }, {
            b: /\{/,
            e: /\}/
          }]
        }, {
          b: /\s*=\s*/,
          eW: !0,
          r: 0,
          c: [{
            cN: "number",
            b: /-?\d*\.?\d+(pt|pc|mm|cm|in|dd|cc|ex|em)?/
          }]
        }]
      }
    }]
  };
  return {
    c: [e, {
      cN: "formula",
      c: [e],
      r: 0,
      v: [{
        b: /\$\$/,
        e: /\$\$/
      }, {
        b: /\$/,
        e: /\$/
      }]
    }, c.C("%", "$", {
      r: 0
    })]
  };
});
hljs.registerLanguage("profile", function (e) {
  return {
    c: [e.CNM, {
      b: "[a-zA-Z_][\\da-zA-Z_]+\\.[\\da-zA-Z_]{1,3}",
      e: ":",
      eE: !0
    }, {
      b: "(ncalls|tottime|cumtime)",
      e: "$",
      k: "ncalls tottime|10 cumtime|10 filename",
      r: 10
    }, {
      b: "function calls",
      e: "$",
      c: [e.CNM],
      r: 10
    }, e.ASM, e.QSM, {
      cN: "string",
      b: "\\(",
      e: "\\)$",
      eB: !0,
      eE: !0,
      r: 0
    }]
  };
});
hljs.registerLanguage("gherkin", function (e) {
  return {
    aliases: ["feature"],
    k: "Feature Background Ability Business Need Scenario Scenarios Scenario Outline Scenario Template Examples Given And Then But When",
    c: [{
      cN: "symbol",
      b: "\\*",
      r: 0
    }, {
      cN: "meta",
      b: "@[^@\\s]+"
    }, {
      b: "\\|",
      e: "\\|\\w*$",
      c: [{
        cN: "string",
        b: "[^|]+"
      }]
    }, {
      cN: "variable",
      b: "<",
      e: ">"
    }, e.HCM, {
      cN: "string",
      b: '"""',
      e: '"""'
    }, e.QSM]
  };
});
hljs.registerLanguage("smalltalk", function (e) {
  var s = "[a-z][a-zA-Z0-9_]*",
      a = {
    cN: "string",
    b: "\\$.{1}"
  },
      r = {
    cN: "symbol",
    b: "#" + e.UIR
  };
  return {
    aliases: ["st"],
    k: "self super nil true false thisContext",
    c: [e.C('"', '"'), e.ASM, {
      cN: "type",
      b: "\\b[A-Z][A-Za-z0-9_]*",
      r: 0
    }, {
      b: s + ":",
      r: 0
    }, e.CNM, r, a, {
      b: "\\|[ ]*" + s + "([ ]+" + s + ")*[ ]*\\|",
      rB: !0,
      e: /\|/,
      i: /\S/,
      c: [{
        b: "(\\|[ ]*)?" + s
      }]
    }, {
      b: "\\#\\(",
      e: "\\)",
      c: [e.ASM, a, e.CNM, r]
    }]
  };
});
hljs.registerLanguage("arduino", function (e) {
  var t = e.getLanguage("cpp").exports;
  return {
    k: {
      keyword: "boolean byte word string String array " + t.k.keyword,
      built_in: "setup loop while catch for if do goto try switch case else default break continue return KeyboardController MouseController SoftwareSerial EthernetServer EthernetClient LiquidCrystal RobotControl GSMVoiceCall EthernetUDP EsploraTFT HttpClient RobotMotor WiFiClient GSMScanner FileSystem Scheduler GSMServer YunClient YunServer IPAddress GSMClient GSMModem Keyboard Ethernet Console GSMBand Esplora Stepper Process WiFiUDP GSM_SMS Mailbox USBHost Firmata PImage Client Server GSMPIN FileIO Bridge Serial EEPROM Stream Mouse Audio Servo File Task GPRS WiFi Wire TFT GSM SPI SD runShellCommandAsynchronously analogWriteResolution retrieveCallingNumber printFirmwareVersion analogReadResolution sendDigitalPortPair noListenOnLocalhost readJoystickButton setFirmwareVersion readJoystickSwitch scrollDisplayRight getVoiceCallStatus scrollDisplayLeft writeMicroseconds delayMicroseconds beginTransmission getSignalStrength runAsynchronously getAsynchronously listenOnLocalhost getCurrentCarrier readAccelerometer messageAvailable sendDigitalPorts lineFollowConfig countryNameWrite runShellCommand readStringUntil rewindDirectory readTemperature setClockDivider readLightSensor endTransmission analogReference detachInterrupt countryNameRead attachInterrupt encryptionType readBytesUntil robotNameWrite readMicrophone robotNameRead cityNameWrite userNameWrite readJoystickY readJoystickX mouseReleased openNextFile scanNetworks noInterrupts digitalWrite beginSpeaker mousePressed isActionDone mouseDragged displayLogos noAutoscroll addParameter remoteNumber getModifiers keyboardRead userNameRead waitContinue processInput parseCommand printVersion readNetworks writeMessage blinkVersion cityNameRead readMessage setDataMode parsePacket isListening setBitOrder beginPacket isDirectory motorsWrite drawCompass digitalRead clearScreen serialEvent rightToLeft setTextSize leftToRight requestFrom keyReleased compassRead analogWrite interrupts WiFiServer disconnect playMelody parseFloat autoscroll getPINUsed setPINUsed setTimeout sendAnalog readSlider analogRead beginWrite createChar motorsStop keyPressed tempoWrite readButton subnetMask debugPrint macAddress writeGreen randomSeed attachGPRS readString sendString remotePort releaseAll mouseMoved background getXChange getYChange answerCall getResult voiceCall endPacket constrain getSocket writeJSON getButton available connected findUntil readBytes exitValue readGreen writeBlue startLoop IPAddress isPressed sendSysex pauseMode gatewayIP setCursor getOemKey tuneWrite noDisplay loadImage switchPIN onRequest onReceive changePIN playFile noBuffer parseInt overflow checkPIN knobRead beginTFT bitClear updateIR bitWrite position writeRGB highByte writeRed setSpeed readBlue noStroke remoteIP transfer shutdown hangCall beginSMS endWrite attached maintain noCursor checkReg checkPUK shiftOut isValid shiftIn pulseIn connect println localIP pinMode getIMEI display noBlink process getBand running beginSD drawBMP lowByte setBand release bitRead prepare pointTo readRed setMode noFill remove listen stroke detach attach noTone exists buffer height bitSet circle config cursor random IRread setDNS endSMS getKey micros millis begin print write ready flush width isPIN blink clear press mkdir rmdir close point yield image BSSID click delay read text move peek beep rect line open seek fill size turn stop home find step tone sqrt RSSI SSID end bit tan cos sin pow map abs max min get run put",
      literal: "DIGITAL_MESSAGE FIRMATA_STRING ANALOG_MESSAGE REPORT_DIGITAL REPORT_ANALOG INPUT_PULLUP SET_PIN_MODE INTERNAL2V56 SYSTEM_RESET LED_BUILTIN INTERNAL1V1 SYSEX_START INTERNAL EXTERNAL DEFAULT OUTPUT INPUT HIGH LOW"
    },
    c: [t.preprocessor, e.CLCM, e.CBCM, e.ASM, e.QSM, e.CNM]
  };
});
hljs.registerLanguage("mathematica", function (e) {
  return {
    aliases: ["mma"],
    l: "(\\$|\\b)" + e.IR + "\\b",
    k: "AbelianGroup Abort AbortKernels AbortProtect Above Abs Absolute AbsoluteCorrelation AbsoluteCorrelationFunction AbsoluteCurrentValue AbsoluteDashing AbsoluteFileName AbsoluteOptions AbsolutePointSize AbsoluteThickness AbsoluteTime AbsoluteTiming AccountingForm Accumulate Accuracy AccuracyGoal ActionDelay ActionMenu ActionMenuBox ActionMenuBoxOptions Active ActiveItem ActiveStyle AcyclicGraphQ AddOnHelpPath AddTo AdjacencyGraph AdjacencyList AdjacencyMatrix AdjustmentBox AdjustmentBoxOptions AdjustTimeSeriesForecast AffineTransform After AiryAi AiryAiPrime AiryAiZero AiryBi AiryBiPrime AiryBiZero AlgebraicIntegerQ AlgebraicNumber AlgebraicNumberDenominator AlgebraicNumberNorm AlgebraicNumberPolynomial AlgebraicNumberTrace AlgebraicRules AlgebraicRulesData Algebraics AlgebraicUnitQ Alignment AlignmentMarker AlignmentPoint All AllowedDimensions AllowGroupClose AllowInlineCells AllowKernelInitialization AllowReverseGroupClose AllowScriptLevelChange AlphaChannel AlternatingGroup AlternativeHypothesis Alternatives AmbientLight Analytic AnchoredSearch And AndersonDarlingTest AngerJ AngleBracket AngularGauge Animate AnimationCycleOffset AnimationCycleRepetitions AnimationDirection AnimationDisplayTime AnimationRate AnimationRepetitions AnimationRunning Animator AnimatorBox AnimatorBoxOptions AnimatorElements Annotation Annuity AnnuityDue Antialiasing Antisymmetric Apart ApartSquareFree Appearance AppearanceElements AppellF1 Append AppendTo Apply ArcCos ArcCosh ArcCot ArcCoth ArcCsc ArcCsch ArcSec ArcSech ArcSin ArcSinDistribution ArcSinh ArcTan ArcTanh Arg ArgMax ArgMin ArgumentCountQ ARIMAProcess ArithmeticGeometricMean ARMAProcess ARProcess Array ArrayComponents ArrayDepth ArrayFlatten ArrayPad ArrayPlot ArrayQ ArrayReshape ArrayRules Arrays Arrow Arrow3DBox ArrowBox Arrowheads AspectRatio AspectRatioFixed Assert Assuming Assumptions AstronomicalData Asynchronous AsynchronousTaskObject AsynchronousTasks AtomQ Attributes AugmentedSymmetricPolynomial AutoAction AutoDelete AutoEvaluateEvents AutoGeneratedPackage AutoIndent AutoIndentSpacings AutoItalicWords AutoloadPath AutoMatch Automatic AutomaticImageSize AutoMultiplicationSymbol AutoNumberFormatting AutoOpenNotebooks AutoOpenPalettes AutorunSequencing AutoScaling AutoScroll AutoSpacing AutoStyleOptions AutoStyleWords Axes AxesEdge AxesLabel AxesOrigin AxesStyle Axis BabyMonsterGroupB Back Background BackgroundTasksSettings Backslash Backsubstitution Backward Band BandpassFilter BandstopFilter BarabasiAlbertGraphDistribution BarChart BarChart3D BarLegend BarlowProschanImportance BarnesG BarOrigin BarSpacing BartlettHannWindow BartlettWindow BaseForm Baseline BaselinePosition BaseStyle BatesDistribution BattleLemarieWavelet Because BeckmannDistribution Beep Before Begin BeginDialogPacket BeginFrontEndInteractionPacket BeginPackage BellB BellY Below BenfordDistribution BeniniDistribution BenktanderGibratDistribution BenktanderWeibullDistribution BernoulliB BernoulliDistribution BernoulliGraphDistribution BernoulliProcess BernsteinBasis BesselFilterModel BesselI BesselJ BesselJZero BesselK BesselY BesselYZero Beta BetaBinomialDistribution BetaDistribution BetaNegativeBinomialDistribution BetaPrimeDistribution BetaRegularized BetweennessCentrality BezierCurve BezierCurve3DBox BezierCurve3DBoxOptions BezierCurveBox BezierCurveBoxOptions BezierFunction BilateralFilter Binarize BinaryFormat BinaryImageQ BinaryRead BinaryReadList BinaryWrite BinCounts BinLists Binomial BinomialDistribution BinomialProcess BinormalDistribution BiorthogonalSplineWavelet BipartiteGraphQ BirnbaumImportance BirnbaumSaundersDistribution BitAnd BitClear BitGet BitLength BitNot BitOr BitSet BitShiftLeft BitShiftRight BitXor Black BlackmanHarrisWindow BlackmanNuttallWindow BlackmanWindow Blank BlankForm BlankNullSequence BlankSequence Blend Block BlockRandom BlomqvistBeta BlomqvistBetaTest Blue Blur BodePlot BohmanWindow Bold Bookmarks Boole BooleanConsecutiveFunction BooleanConvert BooleanCountingFunction BooleanFunction BooleanGraph BooleanMaxterms BooleanMinimize BooleanMinterms Booleans BooleanTable BooleanVariables BorderDimensions BorelTannerDistribution Bottom BottomHatTransform BoundaryStyle Bounds Box BoxBaselineShift BoxData BoxDimensions Boxed Boxes BoxForm BoxFormFormatTypes BoxFrame BoxID BoxMargins BoxMatrix BoxRatios BoxRotation BoxRotationPoint BoxStyle BoxWhiskerChart Bra BracketingBar BraKet BrayCurtisDistance BreadthFirstScan Break Brown BrownForsytheTest BrownianBridgeProcess BrowserCategory BSplineBasis BSplineCurve BSplineCurve3DBox BSplineCurveBox BSplineCurveBoxOptions BSplineFunction BSplineSurface BSplineSurface3DBox BubbleChart BubbleChart3D BubbleScale BubbleSizes BulletGauge BusinessDayQ ButterflyGraph ButterworthFilterModel Button ButtonBar ButtonBox ButtonBoxOptions ButtonCell ButtonContents ButtonData ButtonEvaluator ButtonExpandable ButtonFrame ButtonFunction ButtonMargins ButtonMinHeight ButtonNote ButtonNotebook ButtonSource ButtonStyle ButtonStyleMenuListing Byte ByteCount ByteOrdering C CachedValue CacheGraphics CalendarData CalendarType CallPacket CanberraDistance Cancel CancelButton CandlestickChart Cap CapForm CapitalDifferentialD CardinalBSplineBasis CarmichaelLambda Cases Cashflow Casoratian Catalan CatalanNumber Catch CauchyDistribution CauchyWindow CayleyGraph CDF CDFDeploy CDFInformation CDFWavelet Ceiling Cell CellAutoOverwrite CellBaseline CellBoundingBox CellBracketOptions CellChangeTimes CellContents CellContext CellDingbat CellDynamicExpression CellEditDuplicate CellElementsBoundingBox CellElementSpacings CellEpilog CellEvaluationDuplicate CellEvaluationFunction CellEventActions CellFrame CellFrameColor CellFrameLabelMargins CellFrameLabels CellFrameMargins CellGroup CellGroupData CellGrouping CellGroupingRules CellHorizontalScrolling CellID CellLabel CellLabelAutoDelete CellLabelMargins CellLabelPositioning CellMargins CellObject CellOpen CellPrint CellProlog Cells CellSize CellStyle CellTags CellularAutomaton CensoredDistribution Censoring Center CenterDot CentralMoment CentralMomentGeneratingFunction CForm ChampernowneNumber ChanVeseBinarize Character CharacterEncoding CharacterEncodingsPath CharacteristicFunction CharacteristicPolynomial CharacterRange Characters ChartBaseStyle ChartElementData ChartElementDataFunction ChartElementFunction ChartElements ChartLabels ChartLayout ChartLegends ChartStyle Chebyshev1FilterModel Chebyshev2FilterModel ChebyshevDistance ChebyshevT ChebyshevU Check CheckAbort CheckAll Checkbox CheckboxBar CheckboxBox CheckboxBoxOptions ChemicalData ChessboardDistance ChiDistribution ChineseRemainder ChiSquareDistribution ChoiceButtons ChoiceDialog CholeskyDecomposition Chop Circle CircleBox CircleDot CircleMinus CirclePlus CircleTimes CirculantGraph CityData Clear ClearAll ClearAttributes ClearSystemCache ClebschGordan ClickPane Clip ClipboardNotebook ClipFill ClippingStyle ClipPlanes ClipRange Clock ClockGauge ClockwiseContourIntegral Close Closed CloseKernels ClosenessCentrality Closing ClosingAutoSave ClosingEvent ClusteringComponents CMYKColor Coarse Coefficient CoefficientArrays CoefficientDomain CoefficientList CoefficientRules CoifletWavelet Collect Colon ColonForm ColorCombine ColorConvert ColorData ColorDataFunction ColorFunction ColorFunctionScaling Colorize ColorNegate ColorOutput ColorProfileData ColorQuantize ColorReplace ColorRules ColorSelectorSettings ColorSeparate ColorSetter ColorSetterBox ColorSetterBoxOptions ColorSlider ColorSpace Column ColumnAlignments ColumnBackgrounds ColumnForm ColumnLines ColumnsEqual ColumnSpacings ColumnWidths CommonDefaultFormatTypes Commonest CommonestFilter CommonUnits CommunityBoundaryStyle CommunityGraphPlot CommunityLabels CommunityRegionStyle CompatibleUnitQ CompilationOptions CompilationTarget Compile Compiled CompiledFunction Complement CompleteGraph CompleteGraphQ CompleteKaryTree CompletionsListPacket Complex Complexes ComplexExpand ComplexInfinity ComplexityFunction ComponentMeasurements ComponentwiseContextMenu Compose ComposeList ComposeSeries Composition CompoundExpression CompoundPoissonDistribution CompoundPoissonProcess CompoundRenewalProcess Compress CompressedData Condition ConditionalExpression Conditioned Cone ConeBox ConfidenceLevel ConfidenceRange ConfidenceTransform ConfigurationPath Congruent Conjugate ConjugateTranspose Conjunction Connect ConnectedComponents ConnectedGraphQ ConnesWindow ConoverTest ConsoleMessage ConsoleMessagePacket ConsolePrint Constant ConstantArray Constants ConstrainedMax ConstrainedMin ContentPadding ContentsBoundingBox ContentSelectable ContentSize Context ContextMenu Contexts ContextToFilename ContextToFileName Continuation Continue ContinuedFraction ContinuedFractionK ContinuousAction ContinuousMarkovProcess ContinuousTimeModelQ ContinuousWaveletData ContinuousWaveletTransform ContourDetect ContourGraphics ContourIntegral ContourLabels ContourLines ContourPlot ContourPlot3D Contours ContourShading ContourSmoothing ContourStyle ContraharmonicMean Control ControlActive ControlAlignment ControllabilityGramian ControllabilityMatrix ControllableDecomposition ControllableModelQ ControllerDuration ControllerInformation ControllerInformationData ControllerLinking ControllerManipulate ControllerMethod ControllerPath ControllerState ControlPlacement ControlsRendering ControlType Convergents ConversionOptions ConversionRules ConvertToBitmapPacket ConvertToPostScript ConvertToPostScriptPacket Convolve ConwayGroupCo1 ConwayGroupCo2 ConwayGroupCo3 CoordinateChartData CoordinatesToolOptions CoordinateTransform CoordinateTransformData CoprimeQ Coproduct CopulaDistribution Copyable CopyDirectory CopyFile CopyTag CopyToClipboard CornerFilter CornerNeighbors Correlation CorrelationDistance CorrelationFunction CorrelationTest Cos Cosh CoshIntegral CosineDistance CosineWindow CosIntegral Cot Coth Count CounterAssignments CounterBox CounterBoxOptions CounterClockwiseContourIntegral CounterEvaluator CounterFunction CounterIncrements CounterStyle CounterStyleMenuListing CountRoots CountryData Covariance CovarianceEstimatorFunction CovarianceFunction CoxianDistribution CoxIngersollRossProcess CoxModel CoxModelFit CramerVonMisesTest CreateArchive CreateDialog CreateDirectory CreateDocument CreateIntermediateDirectories CreatePalette CreatePalettePacket CreateScheduledTask CreateTemporary CreateWindow CriticalityFailureImportance CriticalitySuccessImportance CriticalSection Cross CrossingDetect CrossMatrix Csc Csch CubeRoot Cubics Cuboid CuboidBox Cumulant CumulantGeneratingFunction Cup CupCap Curl CurlyDoubleQuote CurlyQuote CurrentImage CurrentlySpeakingPacket CurrentValue CurvatureFlowFilter CurveClosed Cyan CycleGraph CycleIndexPolynomial Cycles CyclicGroup Cyclotomic Cylinder CylinderBox CylindricalDecomposition D DagumDistribution DamerauLevenshteinDistance DampingFactor Darker Dashed Dashing DataCompression DataDistribution DataRange DataReversed Date DateDelimiters DateDifference DateFunction DateList DateListLogPlot DateListPlot DatePattern DatePlus DateRange DateString DateTicksFormat DaubechiesWavelet DavisDistribution DawsonF DayCount DayCountConvention DayMatchQ DayName DayPlus DayRange DayRound DeBruijnGraph Debug DebugTag Decimal DeclareKnownSymbols DeclarePackage Decompose Decrement DedekindEta Default DefaultAxesStyle DefaultBaseStyle DefaultBoxStyle DefaultButton DefaultColor DefaultControlPlacement DefaultDuplicateCellStyle DefaultDuration DefaultElement DefaultFaceGridsStyle DefaultFieldHintStyle DefaultFont DefaultFontProperties DefaultFormatType DefaultFormatTypeForStyle DefaultFrameStyle DefaultFrameTicksStyle DefaultGridLinesStyle DefaultInlineFormatType DefaultInputFormatType DefaultLabelStyle DefaultMenuStyle DefaultNaturalLanguage DefaultNewCellStyle DefaultNewInlineCellStyle DefaultNotebook DefaultOptions DefaultOutputFormatType DefaultStyle DefaultStyleDefinitions DefaultTextFormatType DefaultTextInlineFormatType DefaultTicksStyle DefaultTooltipStyle DefaultValues Defer DefineExternal DefineInputStreamMethod DefineOutputStreamMethod Definition Degree DegreeCentrality DegreeGraphDistribution DegreeLexicographic DegreeReverseLexicographic Deinitialization Del Deletable Delete DeleteBorderComponents DeleteCases DeleteContents DeleteDirectory DeleteDuplicates DeleteFile DeleteSmallComponents DeleteWithContents DeletionWarning Delimiter DelimiterFlashTime DelimiterMatching Delimiters Denominator DensityGraphics DensityHistogram DensityPlot DependentVariables Deploy Deployed Depth DepthFirstScan Derivative DerivativeFilter DescriptorStateSpace DesignMatrix Det DGaussianWavelet DiacriticalPositioning Diagonal DiagonalMatrix Dialog DialogIndent DialogInput DialogLevel DialogNotebook DialogProlog DialogReturn DialogSymbols Diamond DiamondMatrix DiceDissimilarity DictionaryLookup DifferenceDelta DifferenceOrder DifferenceRoot DifferenceRootReduce Differences DifferentialD DifferentialRoot DifferentialRootReduce DifferentiatorFilter DigitBlock DigitBlockMinimum DigitCharacter DigitCount DigitQ DihedralGroup Dilation Dimensions DiracComb DiracDelta DirectedEdge DirectedEdges DirectedGraph DirectedGraphQ DirectedInfinity Direction Directive Directory DirectoryName DirectoryQ DirectoryStack DirichletCharacter DirichletConvolve DirichletDistribution DirichletL DirichletTransform DirichletWindow DisableConsolePrintPacket DiscreteChirpZTransform DiscreteConvolve DiscreteDelta DiscreteHadamardTransform DiscreteIndicator DiscreteLQEstimatorGains DiscreteLQRegulatorGains DiscreteLyapunovSolve DiscreteMarkovProcess DiscretePlot DiscretePlot3D DiscreteRatio DiscreteRiccatiSolve DiscreteShift DiscreteTimeModelQ DiscreteUniformDistribution DiscreteVariables DiscreteWaveletData DiscreteWaveletPacketTransform DiscreteWaveletTransform Discriminant Disjunction Disk DiskBox DiskMatrix Dispatch DispersionEstimatorFunction Display DisplayAllSteps DisplayEndPacket DisplayFlushImagePacket DisplayForm DisplayFunction DisplayPacket DisplayRules DisplaySetSizePacket DisplayString DisplayTemporary DisplayWith DisplayWithRef DisplayWithVariable DistanceFunction DistanceTransform Distribute Distributed DistributedContexts DistributeDefinitions DistributionChart DistributionDomain DistributionFitTest DistributionParameterAssumptions DistributionParameterQ Dithering Div Divergence Divide DivideBy Dividers Divisible Divisors DivisorSigma DivisorSum DMSList DMSString Do DockedCells DocumentNotebook DominantColors DOSTextFormat Dot DotDashed DotEqual Dotted DoubleBracketingBar DoubleContourIntegral DoubleDownArrow DoubleLeftArrow DoubleLeftRightArrow DoubleLeftTee DoubleLongLeftArrow DoubleLongLeftRightArrow DoubleLongRightArrow DoubleRightArrow DoubleRightTee DoubleUpArrow DoubleUpDownArrow DoubleVerticalBar DoublyInfinite Down DownArrow DownArrowBar DownArrowUpArrow DownLeftRightVector DownLeftTeeVector DownLeftVector DownLeftVectorBar DownRightTeeVector DownRightVector DownRightVectorBar Downsample DownTee DownTeeArrow DownValues DragAndDrop DrawEdges DrawFrontFaces DrawHighlighted Drop DSolve Dt DualLinearProgramming DualSystemsModel DumpGet DumpSave DuplicateFreeQ Dynamic DynamicBox DynamicBoxOptions DynamicEvaluationTimeout DynamicLocation DynamicModule DynamicModuleBox DynamicModuleBoxOptions DynamicModuleParent DynamicModuleValues DynamicName DynamicNamespace DynamicReference DynamicSetting DynamicUpdating DynamicWrapper DynamicWrapperBox DynamicWrapperBoxOptions E EccentricityCentrality EdgeAdd EdgeBetweennessCentrality EdgeCapacity EdgeCapForm EdgeColor EdgeConnectivity EdgeCost EdgeCount EdgeCoverQ EdgeDashing EdgeDelete EdgeDetect EdgeForm EdgeIndex EdgeJoinForm EdgeLabeling EdgeLabels EdgeLabelStyle EdgeList EdgeOpacity EdgeQ EdgeRenderingFunction EdgeRules EdgeShapeFunction EdgeStyle EdgeThickness EdgeWeight Editable EditButtonSettings EditCellTagsSettings EditDistance EffectiveInterest Eigensystem Eigenvalues EigenvectorCentrality Eigenvectors Element ElementData Eliminate EliminationOrder EllipticE EllipticExp EllipticExpPrime EllipticF EllipticFilterModel EllipticK EllipticLog EllipticNomeQ EllipticPi EllipticReducedHalfPeriods EllipticTheta EllipticThetaPrime EmitSound EmphasizeSyntaxErrors EmpiricalDistribution Empty EmptyGraphQ EnableConsolePrintPacket Enabled Encode End EndAdd EndDialogPacket EndFrontEndInteractionPacket EndOfFile EndOfLine EndOfString EndPackage EngineeringForm Enter EnterExpressionPacket EnterTextPacket Entropy EntropyFilter Environment Epilog Equal EqualColumns EqualRows EqualTilde EquatedTo Equilibrium EquirippleFilterKernel Equivalent Erf Erfc Erfi ErlangB ErlangC ErlangDistribution Erosion ErrorBox ErrorBoxOptions ErrorNorm ErrorPacket ErrorsDialogSettings EstimatedDistribution EstimatedProcess EstimatorGains EstimatorRegulator EuclideanDistance EulerE EulerGamma EulerianGraphQ EulerPhi Evaluatable Evaluate Evaluated EvaluatePacket EvaluationCell EvaluationCompletionAction EvaluationElements EvaluationMode EvaluationMonitor EvaluationNotebook EvaluationObject EvaluationOrder Evaluator EvaluatorNames EvenQ EventData EventEvaluator EventHandler EventHandlerTag EventLabels ExactBlackmanWindow ExactNumberQ ExactRootIsolation ExampleData Except ExcludedForms ExcludePods Exclusions ExclusionsStyle Exists Exit ExitDialog Exp Expand ExpandAll ExpandDenominator ExpandFileName ExpandNumerator Expectation ExpectationE ExpectedValue ExpGammaDistribution ExpIntegralE ExpIntegralEi Exponent ExponentFunction ExponentialDistribution ExponentialFamily ExponentialGeneratingFunction ExponentialMovingAverage ExponentialPowerDistribution ExponentPosition ExponentStep Export ExportAutoReplacements ExportPacket ExportString Expression ExpressionCell ExpressionPacket ExpToTrig ExtendedGCD Extension ExtentElementFunction ExtentMarkers ExtentSize ExternalCall ExternalDataCharacterEncoding Extract ExtractArchive ExtremeValueDistribution FaceForm FaceGrids FaceGridsStyle Factor FactorComplete Factorial Factorial2 FactorialMoment FactorialMomentGeneratingFunction FactorialPower FactorInteger FactorList FactorSquareFree FactorSquareFreeList FactorTerms FactorTermsList Fail FailureDistribution False FARIMAProcess FEDisableConsolePrintPacket FeedbackSector FeedbackSectorStyle FeedbackType FEEnableConsolePrintPacket Fibonacci FieldHint FieldHintStyle FieldMasked FieldSize File FileBaseName FileByteCount FileDate FileExistsQ FileExtension FileFormat FileHash FileInformation FileName FileNameDepth FileNameDialogSettings FileNameDrop FileNameJoin FileNames FileNameSetter FileNameSplit FileNameTake FilePrint FileType FilledCurve FilledCurveBox Filling FillingStyle FillingTransform FilterRules FinancialBond FinancialData FinancialDerivative FinancialIndicator Find FindArgMax FindArgMin FindClique FindClusters FindCurvePath FindDistributionParameters FindDivisions FindEdgeCover FindEdgeCut FindEulerianCycle FindFaces FindFile FindFit FindGeneratingFunction FindGeoLocation FindGeometricTransform FindGraphCommunities FindGraphIsomorphism FindGraphPartition FindHamiltonianCycle FindIndependentEdgeSet FindIndependentVertexSet FindInstance FindIntegerNullVector FindKClan FindKClique FindKClub FindKPlex FindLibrary FindLinearRecurrence FindList FindMaximum FindMaximumFlow FindMaxValue FindMinimum FindMinimumCostFlow FindMinimumCut FindMinValue FindPermutation FindPostmanTour FindProcessParameters FindRoot FindSequenceFunction FindSettings FindShortestPath FindShortestTour FindThreshold FindVertexCover FindVertexCut Fine FinishDynamic FiniteAbelianGroupCount FiniteGroupCount FiniteGroupData First FirstPassageTimeDistribution FischerGroupFi22 FischerGroupFi23 FischerGroupFi24Prime FisherHypergeometricDistribution FisherRatioTest FisherZDistribution Fit FitAll FittedModel FixedPoint FixedPointList FlashSelection Flat Flatten FlattenAt FlatTopWindow FlipView Floor FlushPrintOutputPacket Fold FoldList Font FontColor FontFamily FontForm FontName FontOpacity FontPostScriptName FontProperties FontReencoding FontSize FontSlant FontSubstitutions FontTracking FontVariations FontWeight For ForAll Format FormatRules FormatType FormatTypeAutoConvert FormatValues FormBox FormBoxOptions FortranForm Forward ForwardBackward Fourier FourierCoefficient FourierCosCoefficient FourierCosSeries FourierCosTransform FourierDCT FourierDCTFilter FourierDCTMatrix FourierDST FourierDSTMatrix FourierMatrix FourierParameters FourierSequenceTransform FourierSeries FourierSinCoefficient FourierSinSeries FourierSinTransform FourierTransform FourierTrigSeries FractionalBrownianMotionProcess FractionalPart FractionBox FractionBoxOptions FractionLine Frame FrameBox FrameBoxOptions Framed FrameInset FrameLabel Frameless FrameMargins FrameStyle FrameTicks FrameTicksStyle FRatioDistribution FrechetDistribution FreeQ FrequencySamplingFilterKernel FresnelC FresnelS Friday FrobeniusNumber FrobeniusSolve FromCharacterCode FromCoefficientRules FromContinuedFraction FromDate FromDigits FromDMS Front FrontEndDynamicExpression FrontEndEventActions FrontEndExecute FrontEndObject FrontEndResource FrontEndResourceString FrontEndStackSize FrontEndToken FrontEndTokenExecute FrontEndValueCache FrontEndVersion FrontFaceColor FrontFaceOpacity Full FullAxes FullDefinition FullForm FullGraphics FullOptions FullSimplify Function FunctionExpand FunctionInterpolation FunctionSpace FussellVeselyImportance GaborFilter GaborMatrix GaborWavelet GainMargins GainPhaseMargins Gamma GammaDistribution GammaRegularized GapPenalty Gather GatherBy GaugeFaceElementFunction GaugeFaceStyle GaugeFrameElementFunction GaugeFrameSize GaugeFrameStyle GaugeLabels GaugeMarkers GaugeStyle GaussianFilter GaussianIntegers GaussianMatrix GaussianWindow GCD GegenbauerC General GeneralizedLinearModelFit GenerateConditions GeneratedCell GeneratedParameters GeneratingFunction Generic GenericCylindricalDecomposition GenomeData GenomeLookup GeodesicClosing GeodesicDilation GeodesicErosion GeodesicOpening GeoDestination GeodesyData GeoDirection GeoDistance GeoGridPosition GeometricBrownianMotionProcess GeometricDistribution GeometricMean GeometricMeanFilter GeometricTransformation GeometricTransformation3DBox GeometricTransformation3DBoxOptions GeometricTransformationBox GeometricTransformationBoxOptions GeoPosition GeoPositionENU GeoPositionXYZ GeoProjectionData GestureHandler GestureHandlerTag Get GetBoundingBoxSizePacket GetContext GetEnvironment GetFileName GetFrontEndOptionsDataPacket GetLinebreakInformationPacket GetMenusPacket GetPageBreakInformationPacket Glaisher GlobalClusteringCoefficient GlobalPreferences GlobalSession Glow GoldenRatio GompertzMakehamDistribution GoodmanKruskalGamma GoodmanKruskalGammaTest Goto Grad Gradient GradientFilter GradientOrientationFilter Graph GraphAssortativity GraphCenter GraphComplement GraphData GraphDensity GraphDiameter GraphDifference GraphDisjointUnion GraphDistance GraphDistanceMatrix GraphElementData GraphEmbedding GraphHighlight GraphHighlightStyle GraphHub Graphics Graphics3D Graphics3DBox Graphics3DBoxOptions GraphicsArray GraphicsBaseline GraphicsBox GraphicsBoxOptions GraphicsColor GraphicsColumn GraphicsComplex GraphicsComplex3DBox GraphicsComplex3DBoxOptions GraphicsComplexBox GraphicsComplexBoxOptions GraphicsContents GraphicsData GraphicsGrid GraphicsGridBox GraphicsGroup GraphicsGroup3DBox GraphicsGroup3DBoxOptions GraphicsGroupBox GraphicsGroupBoxOptions GraphicsGrouping GraphicsHighlightColor GraphicsRow GraphicsSpacing GraphicsStyle GraphIntersection GraphLayout GraphLinkEfficiency GraphPeriphery GraphPlot GraphPlot3D GraphPower GraphPropertyDistribution GraphQ GraphRadius GraphReciprocity GraphRoot GraphStyle GraphUnion Gray GrayLevel GreatCircleDistance Greater GreaterEqual GreaterEqualLess GreaterFullEqual GreaterGreater GreaterLess GreaterSlantEqual GreaterTilde Green Grid GridBaseline GridBox GridBoxAlignment GridBoxBackground GridBoxDividers GridBoxFrame GridBoxItemSize GridBoxItemStyle GridBoxOptions GridBoxSpacings GridCreationSettings GridDefaultElement GridElementStyleOptions GridFrame GridFrameMargins GridGraph GridLines GridLinesStyle GroebnerBasis GroupActionBase GroupCentralizer GroupElementFromWord GroupElementPosition GroupElementQ GroupElements GroupElementToWord GroupGenerators GroupMultiplicationTable GroupOrbits GroupOrder GroupPageBreakWithin GroupSetwiseStabilizer GroupStabilizer GroupStabilizerChain Gudermannian GumbelDistribution HaarWavelet HadamardMatrix HalfNormalDistribution HamiltonianGraphQ HammingDistance HammingWindow HankelH1 HankelH2 HankelMatrix HannPoissonWindow HannWindow HaradaNortonGroupHN HararyGraph HarmonicMean HarmonicMeanFilter HarmonicNumber Hash HashTable Haversine HazardFunction Head HeadCompose Heads HeavisideLambda HeavisidePi HeavisideTheta HeldGroupHe HeldPart HelpBrowserLookup HelpBrowserNotebook HelpBrowserSettings HermiteDecomposition HermiteH HermitianMatrixQ HessenbergDecomposition Hessian HexadecimalCharacter Hexahedron HexahedronBox HexahedronBoxOptions HiddenSurface HighlightGraph HighlightImage HighpassFilter HigmanSimsGroupHS HilbertFilter HilbertMatrix Histogram Histogram3D HistogramDistribution HistogramList HistogramTransform HistogramTransformInterpolation HitMissTransform HITSCentrality HodgeDual HoeffdingD HoeffdingDTest Hold HoldAll HoldAllComplete HoldComplete HoldFirst HoldForm HoldPattern HoldRest HolidayCalendar HomeDirectory HomePage Horizontal HorizontalForm HorizontalGauge HorizontalScrollPosition HornerForm HotellingTSquareDistribution HoytDistribution HTMLSave Hue HumpDownHump HumpEqual HurwitzLerchPhi HurwitzZeta HyperbolicDistribution HypercubeGraph HyperexponentialDistribution Hyperfactorial Hypergeometric0F1 Hypergeometric0F1Regularized Hypergeometric1F1 Hypergeometric1F1Regularized Hypergeometric2F1 Hypergeometric2F1Regularized HypergeometricDistribution HypergeometricPFQ HypergeometricPFQRegularized HypergeometricU Hyperlink HyperlinkCreationSettings Hyphenation HyphenationOptions HypoexponentialDistribution HypothesisTestData I Identity IdentityMatrix If IgnoreCase Im Image Image3D Image3DSlices ImageAccumulate ImageAdd ImageAdjust ImageAlign ImageApply ImageAspectRatio ImageAssemble ImageCache ImageCacheValid ImageCapture ImageChannels ImageClip ImageColorSpace ImageCompose ImageConvolve ImageCooccurrence ImageCorners ImageCorrelate ImageCorrespondingPoints ImageCrop ImageData ImageDataPacket ImageDeconvolve ImageDemosaic ImageDifference ImageDimensions ImageDistance ImageEffect ImageFeatureTrack ImageFileApply ImageFileFilter ImageFileScan ImageFilter ImageForestingComponents ImageForwardTransformation ImageHistogram ImageKeypoints ImageLevels ImageLines ImageMargins ImageMarkers ImageMeasurements ImageMultiply ImageOffset ImagePad ImagePadding ImagePartition ImagePeriodogram ImagePerspectiveTransformation ImageQ ImageRangeCache ImageReflect ImageRegion ImageResize ImageResolution ImageRotate ImageRotated ImageScaled ImageScan ImageSize ImageSizeAction ImageSizeCache ImageSizeMultipliers ImageSizeRaw ImageSubtract ImageTake ImageTransformation ImageTrim ImageType ImageValue ImageValuePositions Implies Import ImportAutoReplacements ImportString ImprovementImportance In IncidenceGraph IncidenceList IncidenceMatrix IncludeConstantBasis IncludeFileExtension IncludePods IncludeSingularTerm Increment Indent IndentingNewlineSpacings IndentMaxFraction IndependenceTest IndependentEdgeSetQ IndependentUnit IndependentVertexSetQ Indeterminate IndexCreationOptions Indexed IndexGraph IndexTag Inequality InexactNumberQ InexactNumbers Infinity Infix Information Inherited InheritScope Initialization InitializationCell InitializationCellEvaluation InitializationCellWarning InlineCounterAssignments InlineCounterIncrements InlineRules Inner Inpaint Input InputAliases InputAssumptions InputAutoReplacements InputField InputFieldBox InputFieldBoxOptions InputForm InputGrouping InputNamePacket InputNotebook InputPacket InputSettings InputStream InputString InputStringPacket InputToBoxFormPacket Insert InsertionPointObject InsertResults Inset Inset3DBox Inset3DBoxOptions InsetBox InsetBoxOptions Install InstallService InString Integer IntegerDigits IntegerExponent IntegerLength IntegerPart IntegerPartitions IntegerQ Integers IntegerString Integral Integrate Interactive InteractiveTradingChart Interlaced Interleaving InternallyBalancedDecomposition InterpolatingFunction InterpolatingPolynomial Interpolation InterpolationOrder InterpolationPoints InterpolationPrecision Interpretation InterpretationBox InterpretationBoxOptions InterpretationFunction InterpretTemplate InterquartileRange Interrupt InterruptSettings Intersection Interval IntervalIntersection IntervalMemberQ IntervalUnion Inverse InverseBetaRegularized InverseCDF InverseChiSquareDistribution InverseContinuousWaveletTransform InverseDistanceTransform InverseEllipticNomeQ InverseErf InverseErfc InverseFourier InverseFourierCosTransform InverseFourierSequenceTransform InverseFourierSinTransform InverseFourierTransform InverseFunction InverseFunctions InverseGammaDistribution InverseGammaRegularized InverseGaussianDistribution InverseGudermannian InverseHaversine InverseJacobiCD InverseJacobiCN InverseJacobiCS InverseJacobiDC InverseJacobiDN InverseJacobiDS InverseJacobiNC InverseJacobiND InverseJacobiNS InverseJacobiSC InverseJacobiSD InverseJacobiSN InverseLaplaceTransform InversePermutation InverseRadon InverseSeries InverseSurvivalFunction InverseWaveletTransform InverseWeierstrassP InverseZTransform Invisible InvisibleApplication InvisibleTimes IrreduciblePolynomialQ IsolatingInterval IsomorphicGraphQ IsotopeData Italic Item ItemBox ItemBoxOptions ItemSize ItemStyle ItoProcess JaccardDissimilarity JacobiAmplitude Jacobian JacobiCD JacobiCN JacobiCS JacobiDC JacobiDN JacobiDS JacobiNC JacobiND JacobiNS JacobiP JacobiSC JacobiSD JacobiSN JacobiSymbol JacobiZeta JankoGroupJ1 JankoGroupJ2 JankoGroupJ3 JankoGroupJ4 JarqueBeraALMTest JohnsonDistribution Join Joined JoinedCurve JoinedCurveBox JoinForm JordanDecomposition JordanModelDecomposition K KagiChart KaiserBesselWindow KaiserWindow KalmanEstimator KalmanFilter KarhunenLoeveDecomposition KaryTree KatzCentrality KCoreComponents KDistribution KelvinBei KelvinBer KelvinKei KelvinKer KendallTau KendallTauTest KernelExecute KernelMixtureDistribution KernelObject Kernels Ket Khinchin KirchhoffGraph KirchhoffMatrix KleinInvariantJ KnightTourGraph KnotData KnownUnitQ KolmogorovSmirnovTest KroneckerDelta KroneckerModelDecomposition KroneckerProduct KroneckerSymbol KuiperTest KumaraswamyDistribution Kurtosis KuwaharaFilter Label Labeled LabeledSlider LabelingFunction LabelStyle LaguerreL LambdaComponents LambertW LanczosWindow LandauDistribution Language LanguageCategory LaplaceDistribution LaplaceTransform Laplacian LaplacianFilter LaplacianGaussianFilter Large Larger Last Latitude LatitudeLongitude LatticeData LatticeReduce Launch LaunchKernels LayeredGraphPlot LayerSizeFunction LayoutInformation LCM LeafCount LeapYearQ LeastSquares LeastSquaresFilterKernel Left LeftArrow LeftArrowBar LeftArrowRightArrow LeftDownTeeVector LeftDownVector LeftDownVectorBar LeftRightArrow LeftRightVector LeftTee LeftTeeArrow LeftTeeVector LeftTriangle LeftTriangleBar LeftTriangleEqual LeftUpDownVector LeftUpTeeVector LeftUpVector LeftUpVectorBar LeftVector LeftVectorBar LegendAppearance Legended LegendFunction LegendLabel LegendLayout LegendMargins LegendMarkers LegendMarkerSize LegendreP LegendreQ LegendreType Length LengthWhile LerchPhi Less LessEqual LessEqualGreater LessFullEqual LessGreater LessLess LessSlantEqual LessTilde LetterCharacter LetterQ Level LeveneTest LeviCivitaTensor LevyDistribution Lexicographic LibraryFunction LibraryFunctionError LibraryFunctionInformation LibraryFunctionLoad LibraryFunctionUnload LibraryLoad LibraryUnload LicenseID LiftingFilterData LiftingWaveletTransform LightBlue LightBrown LightCyan Lighter LightGray LightGreen Lighting LightingAngle LightMagenta LightOrange LightPink LightPurple LightRed LightSources LightYellow Likelihood Limit LimitsPositioning LimitsPositioningTokens LindleyDistribution Line Line3DBox LinearFilter LinearFractionalTransform LinearModelFit LinearOffsetFunction LinearProgramming LinearRecurrence LinearSolve LinearSolveFunction LineBox LineBreak LinebreakAdjustments LineBreakChart LineBreakWithin LineColor LineForm LineGraph LineIndent LineIndentMaxFraction LineIntegralConvolutionPlot LineIntegralConvolutionScale LineLegend LineOpacity LineSpacing LineWrapParts LinkActivate LinkClose LinkConnect LinkConnectedQ LinkCreate LinkError LinkFlush LinkFunction LinkHost LinkInterrupt LinkLaunch LinkMode LinkObject LinkOpen LinkOptions LinkPatterns LinkProtocol LinkRead LinkReadHeld LinkReadyQ Links LinkWrite LinkWriteHeld LiouvilleLambda List Listable ListAnimate ListContourPlot ListContourPlot3D ListConvolve ListCorrelate ListCurvePathPlot ListDeconvolve ListDensityPlot Listen ListFourierSequenceTransform ListInterpolation ListLineIntegralConvolutionPlot ListLinePlot ListLogLinearPlot ListLogLogPlot ListLogPlot ListPicker ListPickerBox ListPickerBoxBackground ListPickerBoxOptions ListPlay ListPlot ListPlot3D ListPointPlot3D ListPolarPlot ListQ ListStreamDensityPlot ListStreamPlot ListSurfacePlot3D ListVectorDensityPlot ListVectorPlot ListVectorPlot3D ListZTransform Literal LiteralSearch LocalClusteringCoefficient LocalizeVariables LocationEquivalenceTest LocationTest Locator LocatorAutoCreate LocatorBox LocatorBoxOptions LocatorCentering LocatorPane LocatorPaneBox LocatorPaneBoxOptions LocatorRegion Locked Log Log10 Log2 LogBarnesG LogGamma LogGammaDistribution LogicalExpand LogIntegral LogisticDistribution LogitModelFit LogLikelihood LogLinearPlot LogLogisticDistribution LogLogPlot LogMultinormalDistribution LogNormalDistribution LogPlot LogRankTest LogSeriesDistribution LongEqual Longest LongestAscendingSequence LongestCommonSequence LongestCommonSequencePositions LongestCommonSubsequence LongestCommonSubsequencePositions LongestMatch LongForm Longitude LongLeftArrow LongLeftRightArrow LongRightArrow Loopback LoopFreeGraphQ LowerCaseQ LowerLeftArrow LowerRightArrow LowerTriangularize LowpassFilter LQEstimatorGains LQGRegulator LQOutputRegulatorGains LQRegulatorGains LUBackSubstitution LucasL LuccioSamiComponents LUDecomposition LyapunovSolve LyonsGroupLy MachineID MachineName MachineNumberQ MachinePrecision MacintoshSystemPageSetup Magenta Magnification Magnify MainSolve MaintainDynamicCaches Majority MakeBoxes MakeExpression MakeRules MangoldtLambda ManhattanDistance Manipulate Manipulator MannWhitneyTest MantissaExponent Manual Map MapAll MapAt MapIndexed MAProcess MapThread MarcumQ MardiaCombinedTest MardiaKurtosisTest MardiaSkewnessTest MarginalDistribution MarkovProcessProperties Masking MatchingDissimilarity MatchLocalNameQ MatchLocalNames MatchQ Material MathematicaNotation MathieuC MathieuCharacteristicA MathieuCharacteristicB MathieuCharacteristicExponent MathieuCPrime MathieuGroupM11 MathieuGroupM12 MathieuGroupM22 MathieuGroupM23 MathieuGroupM24 MathieuS MathieuSPrime MathMLForm MathMLText Matrices MatrixExp MatrixForm MatrixFunction MatrixLog MatrixPlot MatrixPower MatrixQ MatrixRank Max MaxBend MaxDetect MaxExtraBandwidths MaxExtraConditions MaxFeatures MaxFilter Maximize MaxIterations MaxMemoryUsed MaxMixtureKernels MaxPlotPoints MaxPoints MaxRecursion MaxStableDistribution MaxStepFraction MaxSteps MaxStepSize MaxValue MaxwellDistribution McLaughlinGroupMcL Mean MeanClusteringCoefficient MeanDegreeConnectivity MeanDeviation MeanFilter MeanGraphDistance MeanNeighborDegree MeanShift MeanShiftFilter Median MedianDeviation MedianFilter Medium MeijerG MeixnerDistribution MemberQ MemoryConstrained MemoryInUse Menu MenuAppearance MenuCommandKey MenuEvaluator MenuItem MenuPacket MenuSortingValue MenuStyle MenuView MergeDifferences Mesh MeshFunctions MeshRange MeshShading MeshStyle Message MessageDialog MessageList MessageName MessageOptions MessagePacket Messages MessagesNotebook MetaCharacters MetaInformation Method MethodOptions MexicanHatWavelet MeyerWavelet Min MinDetect MinFilter MinimalPolynomial MinimalStateSpaceModel Minimize Minors MinRecursion MinSize MinStableDistribution Minus MinusPlus MinValue Missing MissingDataMethod MittagLefflerE MixedRadix MixedRadixQuantity MixtureDistribution Mod Modal Mode Modular ModularLambda Module Modulus MoebiusMu Moment Momentary MomentConvert MomentEvaluate MomentGeneratingFunction Monday Monitor MonomialList MonomialOrder MonsterGroupM MorletWavelet MorphologicalBinarize MorphologicalBranchPoints MorphologicalComponents MorphologicalEulerNumber MorphologicalGraph MorphologicalPerimeter MorphologicalTransform Most MouseAnnotation MouseAppearance MouseAppearanceTag MouseButtons Mouseover MousePointerNote MousePosition MovingAverage MovingMedian MoyalDistribution MultiedgeStyle MultilaunchWarning MultiLetterItalics MultiLetterStyle MultilineFunction Multinomial MultinomialDistribution MultinormalDistribution MultiplicativeOrder Multiplicity Multiselection MultivariateHypergeometricDistribution MultivariatePoissonDistribution MultivariateTDistribution N NakagamiDistribution NameQ Names NamespaceBox Nand NArgMax NArgMin NBernoulliB NCache NDSolve NDSolveValue Nearest NearestFunction NeedCurrentFrontEndPackagePacket NeedCurrentFrontEndSymbolsPacket NeedlemanWunschSimilarity Needs Negative NegativeBinomialDistribution NegativeMultinomialDistribution NeighborhoodGraph Nest NestedGreaterGreater NestedLessLess NestedScriptRules NestList NestWhile NestWhileList NevilleThetaC NevilleThetaD NevilleThetaN NevilleThetaS NewPrimitiveStyle NExpectation Next NextPrime NHoldAll NHoldFirst NHoldRest NicholsGridLines NicholsPlot NIntegrate NMaximize NMaxValue NMinimize NMinValue NominalVariables NonAssociative NoncentralBetaDistribution NoncentralChiSquareDistribution NoncentralFRatioDistribution NoncentralStudentTDistribution NonCommutativeMultiply NonConstants None NonlinearModelFit NonlocalMeansFilter NonNegative NonPositive Nor NorlundB Norm Normal NormalDistribution NormalGrouping Normalize NormalizedSquaredEuclideanDistance NormalsFunction NormFunction Not NotCongruent NotCupCap NotDoubleVerticalBar Notebook NotebookApply NotebookAutoSave NotebookClose NotebookConvertSettings NotebookCreate NotebookCreateReturnObject NotebookDefault NotebookDelete NotebookDirectory NotebookDynamicExpression NotebookEvaluate NotebookEventActions NotebookFileName NotebookFind NotebookFindReturnObject NotebookGet NotebookGetLayoutInformationPacket NotebookGetMisspellingsPacket NotebookInformation NotebookInterfaceObject NotebookLocate NotebookObject NotebookOpen NotebookOpenReturnObject NotebookPath NotebookPrint NotebookPut NotebookPutReturnObject NotebookRead NotebookResetGeneratedCells Notebooks NotebookSave NotebookSaveAs NotebookSelection NotebookSetupLayoutInformationPacket NotebooksMenu NotebookWrite NotElement NotEqualTilde NotExists NotGreater NotGreaterEqual NotGreaterFullEqual NotGreaterGreater NotGreaterLess NotGreaterSlantEqual NotGreaterTilde NotHumpDownHump NotHumpEqual NotLeftTriangle NotLeftTriangleBar NotLeftTriangleEqual NotLess NotLessEqual NotLessFullEqual NotLessGreater NotLessLess NotLessSlantEqual NotLessTilde NotNestedGreaterGreater NotNestedLessLess NotPrecedes NotPrecedesEqual NotPrecedesSlantEqual NotPrecedesTilde NotReverseElement NotRightTriangle NotRightTriangleBar NotRightTriangleEqual NotSquareSubset NotSquareSubsetEqual NotSquareSuperset NotSquareSupersetEqual NotSubset NotSubsetEqual NotSucceeds NotSucceedsEqual NotSucceedsSlantEqual NotSucceedsTilde NotSuperset NotSupersetEqual NotTilde NotTildeEqual NotTildeFullEqual NotTildeTilde NotVerticalBar NProbability NProduct NProductFactors NRoots NSolve NSum NSumTerms Null NullRecords NullSpace NullWords Number NumberFieldClassNumber NumberFieldDiscriminant NumberFieldFundamentalUnits NumberFieldIntegralBasis NumberFieldNormRepresentatives NumberFieldRegulator NumberFieldRootsOfUnity NumberFieldSignature NumberForm NumberFormat NumberMarks NumberMultiplier NumberPadding NumberPoint NumberQ NumberSeparator NumberSigns NumberString Numerator NumericFunction NumericQ NuttallWindow NValues NyquistGridLines NyquistPlot O ObservabilityGramian ObservabilityMatrix ObservableDecomposition ObservableModelQ OddQ Off Offset OLEData On ONanGroupON OneIdentity Opacity Open OpenAppend Opener OpenerBox OpenerBoxOptions OpenerView OpenFunctionInspectorPacket Opening OpenRead OpenSpecialOptions OpenTemporary OpenWrite Operate OperatingSystem OptimumFlowData Optional OptionInspectorSettings OptionQ Options OptionsPacket OptionsPattern OptionValue OptionValueBox OptionValueBoxOptions Or Orange Order OrderDistribution OrderedQ Ordering Orderless OrnsteinUhlenbeckProcess Orthogonalize Out Outer OutputAutoOverwrite OutputControllabilityMatrix OutputControllableModelQ OutputForm OutputFormData OutputGrouping OutputMathEditExpression OutputNamePacket OutputResponse OutputSizeLimit OutputStream Over OverBar OverDot Overflow OverHat Overlaps Overlay OverlayBox OverlayBoxOptions Overscript OverscriptBox OverscriptBoxOptions OverTilde OverVector OwenT OwnValues PackingMethod PaddedForm Padding PadeApproximant PadLeft PadRight PageBreakAbove PageBreakBelow PageBreakWithin PageFooterLines PageFooters PageHeaderLines PageHeaders PageHeight PageRankCentrality PageWidth PairedBarChart PairedHistogram PairedSmoothHistogram PairedTTest PairedZTest PaletteNotebook PalettePath Pane PaneBox PaneBoxOptions Panel PanelBox PanelBoxOptions Paneled PaneSelector PaneSelectorBox PaneSelectorBoxOptions PaperWidth ParabolicCylinderD ParagraphIndent ParagraphSpacing ParallelArray ParallelCombine ParallelDo ParallelEvaluate Parallelization Parallelize ParallelMap ParallelNeeds ParallelProduct ParallelSubmit ParallelSum ParallelTable ParallelTry Parameter ParameterEstimator ParameterMixtureDistribution ParameterVariables ParametricFunction ParametricNDSolve ParametricNDSolveValue ParametricPlot ParametricPlot3D ParentConnect ParentDirectory ParentForm Parenthesize ParentList ParetoDistribution Part PartialCorrelationFunction PartialD ParticleData Partition PartitionsP PartitionsQ ParzenWindow PascalDistribution PassEventsDown PassEventsUp Paste PasteBoxFormInlineCells PasteButton Path PathGraph PathGraphQ Pattern PatternSequence PatternTest PauliMatrix PaulWavelet Pause PausedTime PDF PearsonChiSquareTest PearsonCorrelationTest PearsonDistribution PerformanceGoal PeriodicInterpolation Periodogram PeriodogramArray PermutationCycles PermutationCyclesQ PermutationGroup PermutationLength PermutationList PermutationListQ PermutationMax PermutationMin PermutationOrder PermutationPower PermutationProduct PermutationReplace Permutations PermutationSupport Permute PeronaMalikFilter Perpendicular PERTDistribution PetersenGraph PhaseMargins Pi Pick PIDData PIDDerivativeFilter PIDFeedforward PIDTune Piecewise PiecewiseExpand PieChart PieChart3D PillaiTrace PillaiTraceTest Pink Pivoting PixelConstrained PixelValue PixelValuePositions Placed Placeholder PlaceholderReplace Plain PlanarGraphQ Play PlayRange Plot Plot3D Plot3Matrix PlotDivision PlotJoined PlotLabel PlotLayout PlotLegends PlotMarkers PlotPoints PlotRange PlotRangeClipping PlotRangePadding PlotRegion PlotStyle Plus PlusMinus Pochhammer PodStates PodWidth Point Point3DBox PointBox PointFigureChart PointForm PointLegend PointSize PoissonConsulDistribution PoissonDistribution PoissonProcess PoissonWindow PolarAxes PolarAxesOrigin PolarGridLines PolarPlot PolarTicks PoleZeroMarkers PolyaAeppliDistribution PolyGamma Polygon Polygon3DBox Polygon3DBoxOptions PolygonBox PolygonBoxOptions PolygonHoleScale PolygonIntersections PolygonScale PolyhedronData PolyLog PolynomialExtendedGCD PolynomialForm PolynomialGCD PolynomialLCM PolynomialMod PolynomialQ PolynomialQuotient PolynomialQuotientRemainder PolynomialReduce PolynomialRemainder Polynomials PopupMenu PopupMenuBox PopupMenuBoxOptions PopupView PopupWindow Position Positive PositiveDefiniteMatrixQ PossibleZeroQ Postfix PostScript Power PowerDistribution PowerExpand PowerMod PowerModList PowerSpectralDensity PowersRepresentations PowerSymmetricPolynomial Precedence PrecedenceForm Precedes PrecedesEqual PrecedesSlantEqual PrecedesTilde Precision PrecisionGoal PreDecrement PredictionRoot PreemptProtect PreferencesPath Prefix PreIncrement Prepend PrependTo PreserveImageOptions Previous PriceGraphDistribution PrimaryPlaceholder Prime PrimeNu PrimeOmega PrimePi PrimePowerQ PrimeQ Primes PrimeZetaP PrimitiveRoot PrincipalComponents PrincipalValue Print PrintAction PrintForm PrintingCopies PrintingOptions PrintingPageRange PrintingStartingPageNumber PrintingStyleEnvironment PrintPrecision PrintTemporary Prism PrismBox PrismBoxOptions PrivateCellOptions PrivateEvaluationOptions PrivateFontOptions PrivateFrontEndOptions PrivateNotebookOptions PrivatePaths Probability ProbabilityDistribution ProbabilityPlot ProbabilityPr ProbabilityScalePlot ProbitModelFit ProcessEstimator ProcessParameterAssumptions ProcessParameterQ ProcessStateDomain ProcessTimeDomain Product ProductDistribution ProductLog ProgressIndicator ProgressIndicatorBox ProgressIndicatorBoxOptions Projection Prolog PromptForm Properties Property PropertyList PropertyValue Proportion Proportional Protect Protected ProteinData Pruning PseudoInverse Purple Put PutAppend Pyramid PyramidBox PyramidBoxOptions QBinomial QFactorial QGamma QHypergeometricPFQ QPochhammer QPolyGamma QRDecomposition QuadraticIrrationalQ Quantile QuantilePlot Quantity QuantityForm QuantityMagnitude QuantityQ QuantityUnit Quartics QuartileDeviation Quartiles QuartileSkewness QueueingNetworkProcess QueueingProcess QueueProperties Quiet Quit Quotient QuotientRemainder RadialityCentrality RadicalBox RadicalBoxOptions RadioButton RadioButtonBar RadioButtonBox RadioButtonBoxOptions Radon RamanujanTau RamanujanTauL RamanujanTauTheta RamanujanTauZ Random RandomChoice RandomComplex RandomFunction RandomGraph RandomImage RandomInteger RandomPermutation RandomPrime RandomReal RandomSample RandomSeed RandomVariate RandomWalkProcess Range RangeFilter RangeSpecification RankedMax RankedMin Raster Raster3D Raster3DBox Raster3DBoxOptions RasterArray RasterBox RasterBoxOptions Rasterize RasterSize Rational RationalFunctions Rationalize Rationals Ratios Raw RawArray RawBoxes RawData RawMedium RayleighDistribution Re Read ReadList ReadProtected Real RealBlockDiagonalForm RealDigits RealExponent Reals Reap Record RecordLists RecordSeparators Rectangle RectangleBox RectangleBoxOptions RectangleChart RectangleChart3D RecurrenceFilter RecurrenceTable RecurringDigitsForm Red Reduce RefBox ReferenceLineStyle ReferenceMarkers ReferenceMarkerStyle Refine ReflectionMatrix ReflectionTransform Refresh RefreshRate RegionBinarize RegionFunction RegionPlot RegionPlot3D RegularExpression Regularization Reinstall Release ReleaseHold ReliabilityDistribution ReliefImage ReliefPlot Remove RemoveAlphaChannel RemoveAsynchronousTask Removed RemoveInputStreamMethod RemoveOutputStreamMethod RemoveProperty RemoveScheduledTask RenameDirectory RenameFile RenderAll RenderingOptions RenewalProcess RenkoChart Repeated RepeatedNull RepeatedString Replace ReplaceAll ReplaceHeldPart ReplaceImageValue ReplaceList ReplacePart ReplacePixelValue ReplaceRepeated Resampling Rescale RescalingTransform ResetDirectory ResetMenusPacket ResetScheduledTask Residue Resolve Rest Resultant ResumePacket Return ReturnExpressionPacket ReturnInputFormPacket ReturnPacket ReturnTextPacket Reverse ReverseBiorthogonalSplineWavelet ReverseElement ReverseEquilibrium ReverseGraph ReverseUpEquilibrium RevolutionAxis RevolutionPlot3D RGBColor RiccatiSolve RiceDistribution RidgeFilter RiemannR RiemannSiegelTheta RiemannSiegelZ Riffle Right RightArrow RightArrowBar RightArrowLeftArrow RightCosetRepresentative RightDownTeeVector RightDownVector RightDownVectorBar RightTee RightTeeArrow RightTeeVector RightTriangle RightTriangleBar RightTriangleEqual RightUpDownVector RightUpTeeVector RightUpVector RightUpVectorBar RightVector RightVectorBar RiskAchievementImportance RiskReductionImportance RogersTanimotoDissimilarity Root RootApproximant RootIntervals RootLocusPlot RootMeanSquare RootOfUnityQ RootReduce Roots RootSum Rotate RotateLabel RotateLeft RotateRight RotationAction RotationBox RotationBoxOptions RotationMatrix RotationTransform Round RoundImplies RoundingRadius Row RowAlignments RowBackgrounds RowBox RowHeights RowLines RowMinHeight RowReduce RowsEqual RowSpacings RSolve RudvalisGroupRu Rule RuleCondition RuleDelayed RuleForm RulerUnits Run RunScheduledTask RunThrough RuntimeAttributes RuntimeOptions RussellRaoDissimilarity SameQ SameTest SampleDepth SampledSoundFunction SampledSoundList SampleRate SamplingPeriod SARIMAProcess SARMAProcess SatisfiabilityCount SatisfiabilityInstances SatisfiableQ Saturday Save Saveable SaveAutoDelete SaveDefinitions SawtoothWave Scale Scaled ScaleDivisions ScaledMousePosition ScaleOrigin ScalePadding ScaleRanges ScaleRangeStyle ScalingFunctions ScalingMatrix ScalingTransform Scan ScheduledTaskActiveQ ScheduledTaskData ScheduledTaskObject ScheduledTasks SchurDecomposition ScientificForm ScreenRectangle ScreenStyleEnvironment ScriptBaselineShifts ScriptLevel ScriptMinSize ScriptRules ScriptSizeMultipliers Scrollbars ScrollingOptions ScrollPosition Sec Sech SechDistribution SectionGrouping SectorChart SectorChart3D SectorOrigin SectorSpacing SeedRandom Select Selectable SelectComponents SelectedCells SelectedNotebook Selection SelectionAnimate SelectionCell SelectionCellCreateCell SelectionCellDefaultStyle SelectionCellParentStyle SelectionCreateCell SelectionDebuggerTag SelectionDuplicateCell SelectionEvaluate SelectionEvaluateCreateCell SelectionMove SelectionPlaceholder SelectionSetStyle SelectWithContents SelfLoops SelfLoopStyle SemialgebraicComponentInstances SendMail Sequence SequenceAlignment SequenceForm SequenceHold SequenceLimit Series SeriesCoefficient SeriesData SessionTime Set SetAccuracy SetAlphaChannel SetAttributes Setbacks SetBoxFormNamesPacket SetDelayed SetDirectory SetEnvironment SetEvaluationNotebook SetFileDate SetFileLoadingContext SetNotebookStatusLine SetOptions SetOptionsPacket SetPrecision SetProperty SetSelectedNotebook SetSharedFunction SetSharedVariable SetSpeechParametersPacket SetStreamPosition SetSystemOptions Setter SetterBar SetterBox SetterBoxOptions Setting SetValue Shading Shallow ShannonWavelet ShapiroWilkTest Share Sharpen ShearingMatrix ShearingTransform ShenCastanMatrix Short ShortDownArrow Shortest ShortestMatch ShortestPathFunction ShortLeftArrow ShortRightArrow ShortUpArrow Show ShowAutoStyles ShowCellBracket ShowCellLabel ShowCellTags ShowClosedCellArea ShowContents ShowControls ShowCursorTracker ShowGroupOpenCloseIcon ShowGroupOpener ShowInvisibleCharacters ShowPageBreaks ShowPredictiveInterface ShowSelection ShowShortBoxForm ShowSpecialCharacters ShowStringCharacters ShowSyntaxStyles ShrinkingDelay ShrinkWrapBoundingBox SiegelTheta SiegelTukeyTest Sign Signature SignedRankTest SignificanceLevel SignPadding SignTest SimilarityRules SimpleGraph SimpleGraphQ Simplify Sin Sinc SinghMaddalaDistribution SingleEvaluation SingleLetterItalics SingleLetterStyle SingularValueDecomposition SingularValueList SingularValuePlot SingularValues Sinh SinhIntegral SinIntegral SixJSymbol Skeleton SkeletonTransform SkellamDistribution Skewness SkewNormalDistribution Skip SliceDistribution Slider Slider2D Slider2DBox Slider2DBoxOptions SliderBox SliderBoxOptions SlideView Slot SlotSequence Small SmallCircle Smaller SmithDelayCompensator SmithWatermanSimilarity SmoothDensityHistogram SmoothHistogram SmoothHistogram3D SmoothKernelDistribution SocialMediaData Socket SokalSneathDissimilarity Solve SolveAlways SolveDelayed Sort SortBy Sound SoundAndGraphics SoundNote SoundVolume Sow Space SpaceForm Spacer Spacings Span SpanAdjustments SpanCharacterRounding SpanFromAbove SpanFromBoth SpanFromLeft SpanLineThickness SpanMaxSize SpanMinSize SpanningCharacters SpanSymmetric SparseArray SpatialGraphDistribution Speak SpeakTextPacket SpearmanRankTest SpearmanRho Spectrogram SpectrogramArray Specularity SpellingCorrection SpellingDictionaries SpellingDictionariesPath SpellingOptions SpellingSuggestionsPacket Sphere SphereBox SphericalBesselJ SphericalBesselY SphericalHankelH1 SphericalHankelH2 SphericalHarmonicY SphericalPlot3D SphericalRegion SpheroidalEigenvalue SpheroidalJoiningFactor SpheroidalPS SpheroidalPSPrime SpheroidalQS SpheroidalQSPrime SpheroidalRadialFactor SpheroidalS1 SpheroidalS1Prime SpheroidalS2 SpheroidalS2Prime Splice SplicedDistribution SplineClosed SplineDegree SplineKnots SplineWeights Split SplitBy SpokenString Sqrt SqrtBox SqrtBoxOptions Square SquaredEuclideanDistance SquareFreeQ SquareIntersection SquaresR SquareSubset SquareSubsetEqual SquareSuperset SquareSupersetEqual SquareUnion SquareWave StabilityMargins StabilityMarginsStyle StableDistribution Stack StackBegin StackComplete StackInhibit StandardDeviation StandardDeviationFilter StandardForm Standardize StandbyDistribution Star StarGraph StartAsynchronousTask StartingStepSize StartOfLine StartOfString StartScheduledTask StartupSound StateDimensions StateFeedbackGains StateOutputEstimator StateResponse StateSpaceModel StateSpaceRealization StateSpaceTransform StationaryDistribution StationaryWaveletPacketTransform StationaryWaveletTransform StatusArea StatusCentrality StepMonitor StieltjesGamma StirlingS1 StirlingS2 StopAsynchronousTask StopScheduledTask StrataVariables StratonovichProcess StreamColorFunction StreamColorFunctionScaling StreamDensityPlot StreamPlot StreamPoints StreamPosition Streams StreamScale StreamStyle String StringBreak StringByteCount StringCases StringCount StringDrop StringExpression StringForm StringFormat StringFreeQ StringInsert StringJoin StringLength StringMatchQ StringPosition StringQ StringReplace StringReplaceList StringReplacePart StringReverse StringRotateLeft StringRotateRight StringSkeleton StringSplit StringTake StringToStream StringTrim StripBoxes StripOnInput StripWrapperBoxes StrokeForm StructuralImportance StructuredArray StructuredSelection StruveH StruveL Stub StudentTDistribution Style StyleBox StyleBoxAutoDelete StyleBoxOptions StyleData StyleDefinitions StyleForm StyleKeyMapping StyleMenuListing StyleNameDialogSettings StyleNames StylePrint StyleSheetPath Subfactorial Subgraph SubMinus SubPlus SubresultantPolynomialRemainders SubresultantPolynomials Subresultants Subscript SubscriptBox SubscriptBoxOptions Subscripted Subset SubsetEqual Subsets SubStar Subsuperscript SubsuperscriptBox SubsuperscriptBoxOptions Subtract SubtractFrom SubValues Succeeds SucceedsEqual SucceedsSlantEqual SucceedsTilde SuchThat Sum SumConvergence Sunday SuperDagger SuperMinus SuperPlus Superscript SuperscriptBox SuperscriptBoxOptions Superset SupersetEqual SuperStar Surd SurdForm SurfaceColor SurfaceGraphics SurvivalDistribution SurvivalFunction SurvivalModel SurvivalModelFit SuspendPacket SuzukiDistribution SuzukiGroupSuz SwatchLegend Switch Symbol SymbolName SymletWavelet Symmetric SymmetricGroup SymmetricMatrixQ SymmetricPolynomial SymmetricReduction Symmetrize SymmetrizedArray SymmetrizedArrayRules SymmetrizedDependentComponents SymmetrizedIndependentComponents SymmetrizedReplacePart SynchronousInitialization SynchronousUpdating Syntax SyntaxForm SyntaxInformation SyntaxLength SyntaxPacket SyntaxQ SystemDialogInput SystemException SystemHelpPath SystemInformation SystemInformationData SystemOpen SystemOptions SystemsModelDelay SystemsModelDelayApproximate SystemsModelDelete SystemsModelDimensions SystemsModelExtract SystemsModelFeedbackConnect SystemsModelLabels SystemsModelOrder SystemsModelParallelConnect SystemsModelSeriesConnect SystemsModelStateFeedbackConnect SystemStub Tab TabFilling Table TableAlignments TableDepth TableDirections TableForm TableHeadings TableSpacing TableView TableViewBox TabSpacings TabView TabViewBox TabViewBoxOptions TagBox TagBoxNote TagBoxOptions TaggingRules TagSet TagSetDelayed TagStyle TagUnset Take TakeWhile Tally Tan Tanh TargetFunctions TargetUnits TautologyQ TelegraphProcess TemplateBox TemplateBoxOptions TemplateSlotSequence TemporalData Temporary TemporaryVariable TensorContract TensorDimensions TensorExpand TensorProduct TensorQ TensorRank TensorReduce TensorSymmetry TensorTranspose TensorWedge Tetrahedron TetrahedronBox TetrahedronBoxOptions TeXForm TeXSave Text Text3DBox Text3DBoxOptions TextAlignment TextBand TextBoundingBox TextBox TextCell TextClipboardType TextData TextForm TextJustification TextLine TextPacket TextParagraph TextRecognize TextRendering TextStyle Texture TextureCoordinateFunction TextureCoordinateScaling Therefore ThermometerGauge Thick Thickness Thin Thinning ThisLink ThompsonGroupTh Thread ThreeJSymbol Threshold Through Throw Thumbnail Thursday Ticks TicksStyle Tilde TildeEqual TildeFullEqual TildeTilde TimeConstrained TimeConstraint Times TimesBy TimeSeriesForecast TimeSeriesInvertibility TimeUsed TimeValue TimeZone Timing Tiny TitleGrouping TitsGroupT ToBoxes ToCharacterCode ToColor ToContinuousTimeModel ToDate ToDiscreteTimeModel ToeplitzMatrix ToExpression ToFileName Together Toggle ToggleFalse Toggler TogglerBar TogglerBox TogglerBoxOptions ToHeldExpression ToInvertibleTimeSeries TokenWords Tolerance ToLowerCase ToNumberField TooBig Tooltip TooltipBox TooltipBoxOptions TooltipDelay TooltipStyle Top TopHatTransform TopologicalSort ToRadicals ToRules ToString Total TotalHeight TotalVariationFilter TotalWidth TouchscreenAutoZoom TouchscreenControlPlacement ToUpperCase Tr Trace TraceAbove TraceAction TraceBackward TraceDepth TraceDialog TraceForward TraceInternal TraceLevel TraceOff TraceOn TraceOriginal TracePrint TraceScan TrackedSymbols TradingChart TraditionalForm TraditionalFunctionNotation TraditionalNotation TraditionalOrder TransferFunctionCancel TransferFunctionExpand TransferFunctionFactor TransferFunctionModel TransferFunctionPoles TransferFunctionTransform TransferFunctionZeros TransformationFunction TransformationFunctions TransformationMatrix TransformedDistribution TransformedField Translate TranslationTransform TransparentColor Transpose TreeForm TreeGraph TreeGraphQ TreePlot TrendStyle TriangleWave TriangularDistribution Trig TrigExpand TrigFactor TrigFactorList Trigger TrigReduce TrigToExp TrimmedMean True TrueQ TruncatedDistribution TsallisQExponentialDistribution TsallisQGaussianDistribution TTest Tube TubeBezierCurveBox TubeBezierCurveBoxOptions TubeBox TubeBSplineCurveBox TubeBSplineCurveBoxOptions Tuesday TukeyLambdaDistribution TukeyWindow Tuples TuranGraph TuringMachine Transparent UnateQ Uncompress Undefined UnderBar Underflow Underlined Underoverscript UnderoverscriptBox UnderoverscriptBoxOptions Underscript UnderscriptBox UnderscriptBoxOptions UndirectedEdge UndirectedGraph UndirectedGraphQ UndocumentedTestFEParserPacket UndocumentedTestGetSelectionPacket Unequal Unevaluated UniformDistribution UniformGraphDistribution UniformSumDistribution Uninstall Union UnionPlus Unique UnitBox UnitConvert UnitDimensions Unitize UnitRootTest UnitSimplify UnitStep UnitTriangle UnitVector Unprotect UnsameQ UnsavedVariables Unset UnsetShared UntrackedVariables Up UpArrow UpArrowBar UpArrowDownArrow Update UpdateDynamicObjects UpdateDynamicObjectsSynchronous UpdateInterval UpDownArrow UpEquilibrium UpperCaseQ UpperLeftArrow UpperRightArrow UpperTriangularize Upsample UpSet UpSetDelayed UpTee UpTeeArrow UpValues URL URLFetch URLFetchAsynchronous URLSave URLSaveAsynchronous UseGraphicsRange Using UsingFrontEnd V2Get ValidationLength Value ValueBox ValueBoxOptions ValueForm ValueQ ValuesData Variables Variance VarianceEquivalenceTest VarianceEstimatorFunction VarianceGammaDistribution VarianceTest VectorAngle VectorColorFunction VectorColorFunctionScaling VectorDensityPlot VectorGlyphData VectorPlot VectorPlot3D VectorPoints VectorQ Vectors VectorScale VectorStyle Vee Verbatim Verbose VerboseConvertToPostScriptPacket VerifyConvergence VerifySolutions VerifyTestAssumptions Version VersionNumber VertexAdd VertexCapacity VertexColors VertexComponent VertexConnectivity VertexCoordinateRules VertexCoordinates VertexCorrelationSimilarity VertexCosineSimilarity VertexCount VertexCoverQ VertexDataCoordinates VertexDegree VertexDelete VertexDiceSimilarity VertexEccentricity VertexInComponent VertexInDegree VertexIndex VertexJaccardSimilarity VertexLabeling VertexLabels VertexLabelStyle VertexList VertexNormals VertexOutComponent VertexOutDegree VertexQ VertexRenderingFunction VertexReplace VertexShape VertexShapeFunction VertexSize VertexStyle VertexTextureCoordinates VertexWeight Vertical VerticalBar VerticalForm VerticalGauge VerticalSeparator VerticalSlider VerticalTilde ViewAngle ViewCenter ViewMatrix ViewPoint ViewPointSelectorSettings ViewPort ViewRange ViewVector ViewVertical VirtualGroupData Visible VisibleCell VoigtDistribution VonMisesDistribution WaitAll WaitAsynchronousTask WaitNext WaitUntil WakebyDistribution WalleniusHypergeometricDistribution WaringYuleDistribution WatershedComponents WatsonUSquareTest WattsStrogatzGraphDistribution WaveletBestBasis WaveletFilterCoefficients WaveletImagePlot WaveletListPlot WaveletMapIndexed WaveletMatrixPlot WaveletPhi WaveletPsi WaveletScale WaveletScalogram WaveletThreshold WeaklyConnectedComponents WeaklyConnectedGraphQ WeakStationarity WeatherData WeberE Wedge Wednesday WeibullDistribution WeierstrassHalfPeriods WeierstrassInvariants WeierstrassP WeierstrassPPrime WeierstrassSigma WeierstrassZeta WeightedAdjacencyGraph WeightedAdjacencyMatrix WeightedData WeightedGraphQ Weights WelchWindow WheelGraph WhenEvent Which While White Whitespace WhitespaceCharacter WhittakerM WhittakerW WienerFilter WienerProcess WignerD WignerSemicircleDistribution WilksW WilksWTest WindowClickSelect WindowElements WindowFloating WindowFrame WindowFrameElements WindowMargins WindowMovable WindowOpacity WindowSelected WindowSize WindowStatusArea WindowTitle WindowToolbars WindowWidth With WolframAlpha WolframAlphaDate WolframAlphaQuantity WolframAlphaResult Word WordBoundary WordCharacter WordData WordSearch WordSeparators WorkingPrecision Write WriteString Wronskian XMLElement XMLObject Xnor Xor Yellow YuleDissimilarity ZernikeR ZeroSymmetric ZeroTest ZeroWidthTimes Zeta ZetaZero ZipfDistribution ZTest ZTransform $Aborted $ActivationGroupID $ActivationKey $ActivationUserRegistered $AddOnsDirectory $AssertFunction $Assumptions $AsynchronousTask $BaseDirectory $BatchInput $BatchOutput $BoxForms $ByteOrdering $Canceled $CharacterEncoding $CharacterEncodings $CommandLine $CompilationTarget $ConditionHold $ConfiguredKernels $Context $ContextPath $ControlActiveSetting $CreationDate $CurrentLink $DateStringFormat $DefaultFont $DefaultFrontEnd $DefaultImagingDevice $DefaultPath $Display $DisplayFunction $DistributedContexts $DynamicEvaluation $Echo $Epilog $ExportFormats $Failed $FinancialDataSource $FormatType $FrontEnd $FrontEndSession $GeoLocation $HistoryLength $HomeDirectory $HTTPCookies $IgnoreEOF $ImagingDevices $ImportFormats $InitialDirectory $Input $InputFileName $InputStreamMethods $Inspector $InstallationDate $InstallationDirectory $InterfaceEnvironment $IterationLimit $KernelCount $KernelID $Language $LaunchDirectory $LibraryPath $LicenseExpirationDate $LicenseID $LicenseProcesses $LicenseServer $LicenseSubprocesses $LicenseType $Line $Linked $LinkSupported $LoadedFiles $MachineAddresses $MachineDomain $MachineDomains $MachineEpsilon $MachineID $MachineName $MachinePrecision $MachineType $MaxExtraPrecision $MaxLicenseProcesses $MaxLicenseSubprocesses $MaxMachineNumber $MaxNumber $MaxPiecewiseCases $MaxPrecision $MaxRootDegree $MessageGroups $MessageList $MessagePrePrint $Messages $MinMachineNumber $MinNumber $MinorReleaseNumber $MinPrecision $ModuleNumber $NetworkLicense $NewMessage $NewSymbol $Notebooks $NumberMarks $Off $OperatingSystem $Output $OutputForms $OutputSizeLimit $OutputStreamMethods $Packages $ParentLink $ParentProcessID $PasswordFile $PatchLevelID $Path $PathnameSeparator $PerformanceGoal $PipeSupported $Post $Pre $PreferencesDirectory $PrePrint $PreRead $PrintForms $PrintLiteral $ProcessID $ProcessorCount $ProcessorType $ProductInformation $ProgramName $RandomState $RecursionLimit $ReleaseNumber $RootDirectory $ScheduledTask $ScriptCommandLine $SessionID $SetParentLink $SharedFunctions $SharedVariables $SoundDisplay $SoundDisplayFunction $SuppressInputFormHeads $SynchronousEvaluation $SyntaxHandler $System $SystemCharacterEncoding $SystemID $SystemWordLength $TemporaryDirectory $TemporaryPrefix $TextStyle $TimedOut $TimeUnit $TimeZone $TopDirectory $TraceOff $TraceOn $TracePattern $TracePostAction $TracePreAction $Urgent $UserAddOnsDirectory $UserBaseDirectory $UserDocumentsDirectory $UserName $Version $VersionNumber",
    c: [{
      cN: "comment",
      b: /\(\*/,
      e: /\*\)/
    }, e.ASM, e.QSM, e.CNM, {
      b: /\{/,
      e: /\}/,
      i: /:/
    }]
  };
});
hljs.registerLanguage("roboconf", function (a) {
  var e = "[a-zA-Z-_][^\\n{]+\\{",
      n = {
    cN: "attribute",
    b: /[a-zA-Z-_]+/,
    e: /\s*:/,
    eE: !0,
    starts: {
      e: ";",
      r: 0,
      c: [{
        cN: "variable",
        b: /\.[a-zA-Z-_]+/
      }, {
        cN: "keyword",
        b: /\(optional\)/
      }]
    }
  };
  return {
    aliases: ["graph", "instances"],
    cI: !0,
    k: "import",
    c: [{
      b: "^facet " + e,
      e: "}",
      k: "facet",
      c: [n, a.HCM]
    }, {
      b: "^\\s*instance of " + e,
      e: "}",
      k: "name count channels instance-data instance-state instance of",
      i: /\S/,
      c: ["self", n, a.HCM]
    }, {
      b: "^" + e,
      e: "}",
      c: [n, a.HCM]
    }, a.HCM]
  };
});
hljs.registerLanguage("vim", function (e) {
  return {
    l: /[!#@\w]+/,
    k: {
      keyword: "N|0 P|0 X|0 a|0 ab abc abo al am an|0 ar arga argd arge argdo argg argl argu as au aug aun b|0 bN ba bad bd be bel bf bl bm bn bo bp br brea breaka breakd breakl bro bufdo buffers bun bw c|0 cN cNf ca cabc caddb cad caddf cal cat cb cc ccl cd ce cex cf cfir cgetb cgete cg changes chd che checkt cl cla clo cm cmapc cme cn cnew cnf cno cnorea cnoreme co col colo com comc comp con conf cope cp cpf cq cr cs cst cu cuna cunme cw delm deb debugg delc delf dif diffg diffo diffp diffpu diffs diffthis dig di dl dell dj dli do doautoa dp dr ds dsp e|0 ea ec echoe echoh echom echon el elsei em en endfo endf endt endw ene ex exe exi exu f|0 files filet fin fina fini fir fix fo foldc foldd folddoc foldo for fu go gr grepa gu gv ha helpf helpg helpt hi hid his ia iabc if ij il im imapc ime ino inorea inoreme int is isp iu iuna iunme j|0 ju k|0 keepa kee keepj lN lNf l|0 lad laddb laddf la lan lat lb lc lch lcl lcs le lefta let lex lf lfir lgetb lgete lg lgr lgrepa lh ll lla lli lmak lm lmapc lne lnew lnf ln loadk lo loc lockv lol lope lp lpf lr ls lt lu lua luad luaf lv lvimgrepa lw m|0 ma mak map mapc marks mat me menut mes mk mks mksp mkv mkvie mod mz mzf nbc nb nbs new nm nmapc nme nn nnoreme noa no noh norea noreme norm nu nun nunme ol o|0 om omapc ome on ono onoreme opt ou ounme ow p|0 profd prof pro promptr pc ped pe perld po popu pp pre prev ps pt ptN ptf ptj ptl ptn ptp ptr pts pu pw py3 python3 py3d py3f py pyd pyf quita qa rec red redi redr redraws reg res ret retu rew ri rightb rub rubyd rubyf rund ru rv sN san sa sal sav sb sbN sba sbf sbl sbm sbn sbp sbr scrip scripte scs se setf setg setl sf sfir sh sim sig sil sl sla sm smap smapc sme sn sni sno snor snoreme sor so spelld spe spelli spellr spellu spellw sp spr sre st sta startg startr star stopi stj sts sun sunm sunme sus sv sw sy synti sync tN tabN tabc tabdo tabe tabf tabfir tabl tabm tabnew tabn tabo tabp tabr tabs tab ta tags tc tcld tclf te tf th tj tl tm tn to tp tr try ts tu u|0 undoj undol una unh unl unlo unm unme uns up ve verb vert vim vimgrepa vi viu vie vm vmapc vme vne vn vnoreme vs vu vunme windo w|0 wN wa wh wi winc winp wn wp wq wqa ws wu wv x|0 xa xmapc xm xme xn xnoreme xu xunme y|0 z|0 ~ Next Print append abbreviate abclear aboveleft all amenu anoremenu args argadd argdelete argedit argglobal arglocal argument ascii autocmd augroup aunmenu buffer bNext ball badd bdelete behave belowright bfirst blast bmodified bnext botright bprevious brewind break breakadd breakdel breaklist browse bunload bwipeout change cNext cNfile cabbrev cabclear caddbuffer caddexpr caddfile call catch cbuffer cclose center cexpr cfile cfirst cgetbuffer cgetexpr cgetfile chdir checkpath checktime clist clast close cmap cmapclear cmenu cnext cnewer cnfile cnoremap cnoreabbrev cnoremenu copy colder colorscheme command comclear compiler continue confirm copen cprevious cpfile cquit crewind cscope cstag cunmap cunabbrev cunmenu cwindow delete delmarks debug debuggreedy delcommand delfunction diffupdate diffget diffoff diffpatch diffput diffsplit digraphs display deletel djump dlist doautocmd doautoall deletep drop dsearch dsplit edit earlier echo echoerr echohl echomsg else elseif emenu endif endfor endfunction endtry endwhile enew execute exit exusage file filetype find finally finish first fixdel fold foldclose folddoopen folddoclosed foldopen function global goto grep grepadd gui gvim hardcopy help helpfind helpgrep helptags highlight hide history insert iabbrev iabclear ijump ilist imap imapclear imenu inoremap inoreabbrev inoremenu intro isearch isplit iunmap iunabbrev iunmenu join jumps keepalt keepmarks keepjumps lNext lNfile list laddexpr laddbuffer laddfile last language later lbuffer lcd lchdir lclose lcscope left leftabove lexpr lfile lfirst lgetbuffer lgetexpr lgetfile lgrep lgrepadd lhelpgrep llast llist lmake lmap lmapclear lnext lnewer lnfile lnoremap loadkeymap loadview lockmarks lockvar lolder lopen lprevious lpfile lrewind ltag lunmap luado luafile lvimgrep lvimgrepadd lwindow move mark make mapclear match menu menutranslate messages mkexrc mksession mkspell mkvimrc mkview mode mzscheme mzfile nbclose nbkey nbsart next nmap nmapclear nmenu nnoremap nnoremenu noautocmd noremap nohlsearch noreabbrev noremenu normal number nunmap nunmenu oldfiles open omap omapclear omenu only onoremap onoremenu options ounmap ounmenu ownsyntax print profdel profile promptfind promptrepl pclose pedit perl perldo pop popup ppop preserve previous psearch ptag ptNext ptfirst ptjump ptlast ptnext ptprevious ptrewind ptselect put pwd py3do py3file python pydo pyfile quit quitall qall read recover redo redir redraw redrawstatus registers resize retab return rewind right rightbelow ruby rubydo rubyfile rundo runtime rviminfo substitute sNext sandbox sargument sall saveas sbuffer sbNext sball sbfirst sblast sbmodified sbnext sbprevious sbrewind scriptnames scriptencoding scscope set setfiletype setglobal setlocal sfind sfirst shell simalt sign silent sleep slast smagic smapclear smenu snext sniff snomagic snoremap snoremenu sort source spelldump spellgood spellinfo spellrepall spellundo spellwrong split sprevious srewind stop stag startgreplace startreplace startinsert stopinsert stjump stselect sunhide sunmap sunmenu suspend sview swapname syntax syntime syncbind tNext tabNext tabclose tabedit tabfind tabfirst tablast tabmove tabnext tabonly tabprevious tabrewind tag tcl tcldo tclfile tearoff tfirst throw tjump tlast tmenu tnext topleft tprevious trewind tselect tunmenu undo undojoin undolist unabbreviate unhide unlet unlockvar unmap unmenu unsilent update vglobal version verbose vertical vimgrep vimgrepadd visual viusage view vmap vmapclear vmenu vnew vnoremap vnoremenu vsplit vunmap vunmenu write wNext wall while winsize wincmd winpos wnext wprevious wqall wsverb wundo wviminfo xit xall xmapclear xmap xmenu xnoremap xnoremenu xunmap xunmenu yank",
      built_in: "synIDtrans atan2 range matcharg did_filetype asin feedkeys xor argv complete_check add getwinposx getqflist getwinposy screencol clearmatches empty extend getcmdpos mzeval garbagecollect setreg ceil sqrt diff_hlID inputsecret get getfperm getpid filewritable shiftwidth max sinh isdirectory synID system inputrestore winline atan visualmode inputlist tabpagewinnr round getregtype mapcheck hasmapto histdel argidx findfile sha256 exists toupper getcmdline taglist string getmatches bufnr strftime winwidth bufexists strtrans tabpagebuflist setcmdpos remote_read printf setloclist getpos getline bufwinnr float2nr len getcmdtype diff_filler luaeval resolve libcallnr foldclosedend reverse filter has_key bufname str2float strlen setline getcharmod setbufvar index searchpos shellescape undofile foldclosed setqflist buflisted strchars str2nr virtcol floor remove undotree remote_expr winheight gettabwinvar reltime cursor tabpagenr finddir localtime acos getloclist search tanh matchend rename gettabvar strdisplaywidth type abs py3eval setwinvar tolower wildmenumode log10 spellsuggest bufloaded synconcealed nextnonblank server2client complete settabwinvar executable input wincol setmatches getftype hlID inputsave searchpair or screenrow line settabvar histadd deepcopy strpart remote_peek and eval getftime submatch screenchar winsaveview matchadd mkdir screenattr getfontname libcall reltimestr getfsize winnr invert pow getbufline byte2line soundfold repeat fnameescape tagfiles sin strwidth spellbadword trunc maparg log lispindent hostname setpos globpath remote_foreground getchar synIDattr fnamemodify cscope_connection stridx winbufnr indent min complete_add nr2char searchpairpos inputdialog values matchlist items hlexists strridx browsedir expand fmod pathshorten line2byte argc count getwinvar glob foldtextresult getreg foreground cosh matchdelete has char2nr simplify histget searchdecl iconv winrestcmd pumvisible writefile foldlevel haslocaldir keys cos matchstr foldtext histnr tan tempname getcwd byteidx getbufvar islocked escape eventhandler remote_send serverlist winrestview synstack pyeval prevnonblank readfile cindent filereadable changenr exp"
    },
    i: /;/,
    c: [e.NM, e.ASM, {
      cN: "string",
      b: /"(\\"|\n\\|[^"\n])*"/
    }, e.C('"', "$"), {
      cN: "variable",
      b: /[bwtglsav]:[\w\d_]*/
    }, {
      cN: "function",
      bK: "function function!",
      e: "$",
      r: 0,
      c: [e.TM, {
        cN: "params",
        b: "\\(",
        e: "\\)"
      }]
    }, {
      cN: "symbol",
      b: /<[\w-]+>/
    }]
  };
});
hljs.registerLanguage("d", function (e) {
  var t = {
    keyword: "abstract alias align asm assert auto body break byte case cast catch class const continue debug default delete deprecated do else enum export extern final finally for foreach foreach_reverse|10 goto if immutable import in inout int interface invariant is lazy macro mixin module new nothrow out override package pragma private protected public pure ref return scope shared static struct super switch synchronized template this throw try typedef typeid typeof union unittest version void volatile while with __FILE__ __LINE__ __gshared|10 __thread __traits __DATE__ __EOF__ __TIME__ __TIMESTAMP__ __VENDOR__ __VERSION__",
    built_in: "bool cdouble cent cfloat char creal dchar delegate double dstring float function idouble ifloat ireal long real short string ubyte ucent uint ulong ushort wchar wstring",
    literal: "false null true"
  },
      r = "(0|[1-9][\\d_]*)",
      a = "(0|[1-9][\\d_]*|\\d[\\d_]*|[\\d_]+?\\d)",
      i = "0[bB][01_]+",
      n = "([\\da-fA-F][\\da-fA-F_]*|_[\\da-fA-F][\\da-fA-F_]*)",
      _ = "0[xX]" + n,
      c = "([eE][+-]?" + a + ")",
      d = "(" + a + "(\\.\\d*|" + c + ")|\\d+\\." + a + a + "|\\." + r + c + "?)",
      o = "(0[xX](" + n + "\\." + n + "|\\.?" + n + ")[pP][+-]?" + a + ")",
      s = "(" + r + "|" + i + "|" + _ + ")",
      l = "(" + o + "|" + d + ")",
      u = "\\\\(['\"\\?\\\\abfnrtv]|u[\\dA-Fa-f]{4}|[0-7]{1,3}|x[\\dA-Fa-f]{2}|U[\\dA-Fa-f]{8})|&[a-zA-Z\\d]{2,};",
      b = {
    cN: "number",
    b: "\\b" + s + "(L|u|U|Lu|LU|uL|UL)?",
    r: 0
  },
      f = {
    cN: "number",
    b: "\\b(" + l + "([fF]|L|i|[fF]i|Li)?|" + s + "(i|[fF]i|Li))",
    r: 0
  },
      g = {
    cN: "string",
    b: "'(" + u + "|.)",
    e: "'",
    i: "."
  },
      h = {
    b: u,
    r: 0
  },
      p = {
    cN: "string",
    b: '"',
    c: [h],
    e: '"[cwd]?'
  },
      m = {
    cN: "string",
    b: '[rq]"',
    e: '"[cwd]?',
    r: 5
  },
      w = {
    cN: "string",
    b: "`",
    e: "`[cwd]?"
  },
      N = {
    cN: "string",
    b: 'x"[\\da-fA-F\\s\\n\\r]*"[cwd]?',
    r: 10
  },
      A = {
    cN: "string",
    b: 'q"\\{',
    e: '\\}"'
  },
      F = {
    cN: "meta",
    b: "^#!",
    e: "$",
    r: 5
  },
      y = {
    cN: "meta",
    b: "#(line)",
    e: "$",
    r: 5
  },
      L = {
    cN: "keyword",
    b: "@[a-zA-Z_][a-zA-Z_\\d]*"
  },
      v = e.C("\\/\\+", "\\+\\/", {
    c: ["self"],
    r: 10
  });

  return {
    l: e.UIR,
    k: t,
    c: [e.CLCM, e.CBCM, v, N, p, m, w, A, f, b, g, F, y, L]
  };
});
hljs.registerLanguage("scilab", function (e) {
  var s = [e.CNM, {
    cN: "string",
    b: "'|\"",
    e: "'|\"",
    c: [e.BE, {
      b: "''"
    }]
  }];
  return {
    aliases: ["sci"],
    l: /%?\w+/,
    k: {
      keyword: "abort break case clear catch continue do elseif else endfunction end for function global if pause return resume select try then while",
      literal: "%f %F %t %T %pi %eps %inf %nan %e %i %z %s",
      built_in: "abs and acos asin atan ceil cd chdir clearglobal cosh cos cumprod deff disp error exec execstr exists exp eye gettext floor fprintf fread fsolve imag isdef isempty isinfisnan isvector lasterror length load linspace list listfiles log10 log2 log max min msprintf mclose mopen ones or pathconvert poly printf prod pwd rand real round sinh sin size gsort sprintf sqrt strcat strcmps tring sum system tanh tan type typename warning zeros matrix"
    },
    i: '("|#|/\\*|\\s+/\\w+)',
    c: [{
      cN: "function",
      bK: "function",
      e: "$",
      c: [e.UTM, {
        cN: "params",
        b: "\\(",
        e: "\\)"
      }]
    }, {
      b: "[a-zA-Z_][a-zA-Z_0-9]*('+[\\.']*|[\\.']+)",
      e: "",
      r: 0
    }, {
      b: "\\[",
      e: "\\]'*[\\.']*",
      r: 0,
      c: s
    }, e.C("//", "$")].concat(s)
  };
});
hljs.registerLanguage("lisp", function (b) {
  var e = "[a-zA-Z_\\-\\+\\*\\/\\<\\=\\>\\&\\#][a-zA-Z0-9_\\-\\+\\*\\/\\<\\=\\>\\&\\#!]*",
      c = "\\|[^]*?\\|",
      r = "(\\-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s|D|E|F|L|S)(\\+|\\-)?\\d+)?",
      a = {
    cN: "meta",
    b: "^#!",
    e: "$"
  },
      l = {
    cN: "literal",
    b: "\\b(t{1}|nil)\\b"
  },
      n = {
    cN: "number",
    v: [{
      b: r,
      r: 0
    }, {
      b: "#(b|B)[0-1]+(/[0-1]+)?"
    }, {
      b: "#(o|O)[0-7]+(/[0-7]+)?"
    }, {
      b: "#(x|X)[0-9a-fA-F]+(/[0-9a-fA-F]+)?"
    }, {
      b: "#(c|C)\\(" + r + " +" + r,
      e: "\\)"
    }]
  },
      i = b.inherit(b.QSM, {
    i: null
  }),
      t = b.C(";", "$", {
    r: 0
  }),
      s = {
    b: "\\*",
    e: "\\*"
  },
      u = {
    cN: "symbol",
    b: "[:&]" + e
  },
      d = {
    b: e,
    r: 0
  },
      f = {
    b: c
  },
      m = {
    b: "\\(",
    e: "\\)",
    c: ["self", l, i, n, d]
  },
      o = {
    c: [n, i, s, u, m, d],
    v: [{
      b: "['`]\\(",
      e: "\\)"
    }, {
      b: "\\(quote ",
      e: "\\)",
      k: {
        name: "quote"
      }
    }, {
      b: "'" + c
    }]
  },
      v = {
    v: [{
      b: "'" + e
    }, {
      b: "#'" + e + "(::" + e + ")*"
    }]
  },
      N = {
    b: "\\(\\s*",
    e: "\\)"
  },
      A = {
    eW: !0,
    r: 0
  };
  return N.c = [{
    cN: "name",
    v: [{
      b: e
    }, {
      b: c
    }]
  }, A], A.c = [o, v, N, l, n, i, t, s, u, f, d], {
    i: /\S/,
    c: [n, a, l, i, t, o, v, N, d]
  };
});
hljs.registerLanguage("xquery", function (e) {
  var t = "for let if while then else return where group by xquery encoding versionmodule namespace boundary-space preserve strip default collation base-uri orderingcopy-namespaces order declare import schema namespace function option in allowing emptyat tumbling window sliding window start when only end when previous next stable ascendingdescending empty greatest least some every satisfies switch case typeswitch try catch andor to union intersect instance of treat as castable cast map array delete insert intoreplace value rename copy modify update",
      a = "false true xs:string xs:integer element item xs:date xs:datetime xs:float xs:double xs:decimal QName xs:anyURI xs:long xs:int xs:short xs:byte attribute",
      s = {
    b: /\$[a-zA-Z0-9\-]+/
  },
      n = {
    cN: "number",
    b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
    r: 0
  },
      r = {
    cN: "string",
    v: [{
      b: /"/,
      e: /"/,
      c: [{
        b: /""/,
        r: 0
      }]
    }, {
      b: /'/,
      e: /'/,
      c: [{
        b: /''/,
        r: 0
      }]
    }]
  },
      i = {
    cN: "meta",
    b: "%\\w+"
  },
      c = {
    cN: "comment",
    b: "\\(:",
    e: ":\\)",
    r: 10,
    c: [{
      cN: "doctag",
      b: "@\\w+"
    }]
  },
      o = {
    b: "{",
    e: "}"
  },
      l = [s, r, n, c, i, o];
  return o.c = l, {
    aliases: ["xpath", "xq"],
    cI: !1,
    l: /[a-zA-Z\$][a-zA-Z0-9_:\-]*/,
    i: /(proc)|(abstract)|(extends)|(until)|(#)/,
    k: {
      keyword: t,
      literal: a
    },
    c: l
  };
});
hljs.registerLanguage("csp", function (r) {
  return {
    cI: !1,
    l: "[a-zA-Z][a-zA-Z0-9_-]*",
    k: {
      keyword: "base-uri child-src connect-src default-src font-src form-action frame-ancestors frame-src img-src media-src object-src plugin-types report-uri sandbox script-src style-src"
    },
    c: [{
      cN: "string",
      b: "'",
      e: "'"
    }, {
      cN: "attribute",
      b: "^Content",
      e: ":",
      eE: !0
    }]
  };
});
hljs.registerLanguage("twig", function (e) {
  var t = {
    cN: "params",
    b: "\\(",
    e: "\\)"
  },
      a = "attribute block constant cycle date dump include max min parent random range source template_from_string",
      r = {
    bK: a,
    k: {
      name: a
    },
    r: 0,
    c: [t]
  },
      c = {
    b: /\|[A-Za-z_]+:?/,
    k: "abs batch capitalize convert_encoding date date_modify default escape first format join json_encode keys last length lower merge nl2br number_format raw replace reverse round slice sort split striptags title trim upper url_encode",
    c: [r]
  },
      s = "autoescape block do embed extends filter flush for if import include macro sandbox set spaceless use verbatim";
  return s = s + " " + s.split(" ").map(function (e) {
    return "end" + e;
  }).join(" "), {
    aliases: ["craftcms"],
    cI: !0,
    sL: "xml",
    c: [e.C(/\{#/, /#}/), {
      cN: "template-tag",
      b: /\{%/,
      e: /%}/,
      c: [{
        cN: "name",
        b: /\w+/,
        k: s,
        starts: {
          eW: !0,
          c: [c, r],
          r: 0
        }
      }]
    }, {
      cN: "template-variable",
      b: /\{\{/,
      e: /}}/,
      c: ["self", c, r]
    }]
  };
});
hljs.registerLanguage("accesslog", function (T) {
  return {
    c: [{
      cN: "number",
      b: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"
    }, {
      cN: "number",
      b: "\\b\\d+\\b",
      r: 0
    }, {
      cN: "string",
      b: '"(GET|POST|HEAD|PUT|DELETE|CONNECT|OPTIONS|PATCH|TRACE)',
      e: '"',
      k: "GET POST HEAD PUT DELETE CONNECT OPTIONS PATCH TRACE",
      i: "\\n",
      r: 10
    }, {
      cN: "string",
      b: /\[/,
      e: /\]/,
      i: "\\n"
    }, {
      cN: "string",
      b: '"',
      e: '"',
      i: "\\n"
    }]
  };
});
hljs.registerLanguage("smali", function (t) {
  var s = ["add", "and", "cmp", "cmpg", "cmpl", "const", "div", "double", "float", "goto", "if", "int", "long", "move", "mul", "neg", "new", "nop", "not", "or", "rem", "return", "shl", "shr", "sput", "sub", "throw", "ushr", "xor"],
      e = ["aget", "aput", "array", "check", "execute", "fill", "filled", "goto/16", "goto/32", "iget", "instance", "invoke", "iput", "monitor", "packed", "sget", "sparse"],
      r = ["transient", "constructor", "abstract", "final", "synthetic", "public", "private", "protected", "static", "bridge", "system"];
  return {
    aliases: ["smali"],
    c: [{
      cN: "string",
      b: '"',
      e: '"',
      r: 0
    }, t.C("#", "$", {
      r: 0
    }), {
      cN: "keyword",
      v: [{
        b: "\\s*\\.end\\s[a-zA-Z0-9]*"
      }, {
        b: "^[ ]*\\.[a-zA-Z]*",
        r: 0
      }, {
        b: "\\s:[a-zA-Z_0-9]*",
        r: 0
      }, {
        b: "\\s(" + r.join("|") + ")"
      }]
    }, {
      cN: "built_in",
      v: [{
        b: "\\s(" + s.join("|") + ")\\s"
      }, {
        b: "\\s(" + s.join("|") + ")((\\-|/)[a-zA-Z0-9]+)+\\s",
        r: 10
      }, {
        b: "\\s(" + e.join("|") + ")((\\-|/)[a-zA-Z0-9]+)*\\s",
        r: 10
      }]
    }, {
      cN: "class",
      b: "L[^(;:\n]*;",
      r: 0
    }, {
      b: "[vp][0-9]+"
    }]
  };
});
hljs.registerLanguage("rsl", function (e) {
  return {
    k: {
      keyword: "float color point normal vector matrix while for if do return else break extern continue",
      built_in: "abs acos ambient area asin atan atmosphere attribute calculatenormal ceil cellnoise clamp comp concat cos degrees depth Deriv diffuse distance Du Dv environment exp faceforward filterstep floor format fresnel incident length lightsource log match max min mod noise normalize ntransform opposite option phong pnoise pow printf ptlined radians random reflect refract renderinfo round setcomp setxcomp setycomp setzcomp shadow sign sin smoothstep specular specularbrdf spline sqrt step tan texture textureinfo trace transform vtransform xcomp ycomp zcomp"
    },
    i: "</",
    c: [e.CLCM, e.CBCM, e.QSM, e.ASM, e.CNM, {
      cN: "meta",
      b: "#",
      e: "$"
    }, {
      cN: "class",
      bK: "surface displacement light volume imager",
      e: "\\("
    }, {
      bK: "illuminate illuminance gather",
      e: "\\("
    }]
  };
});
hljs.registerLanguage("abnf", function (e) {
  var r = {
    ruleDeclaration: "^[a-zA-Z][a-zA-Z0-9-]*",
    unexpectedChars: "[!@#$^&',?+~`|:]"
  },
      a = ["ALPHA", "BIT", "CHAR", "CR", "CRLF", "CTL", "DIGIT", "DQUOTE", "HEXDIG", "HTAB", "LF", "LWSP", "OCTET", "SP", "VCHAR", "WSP"],
      b = e.C(";", "$"),
      c = {
    cN: "symbol",
    b: /%b[0-1]+(-[0-1]+|(\.[0-1]+)+){0,1}/
  },
      l = {
    cN: "symbol",
    b: /%d[0-9]+(-[0-9]+|(\.[0-9]+)+){0,1}/
  },
      n = {
    cN: "symbol",
    b: /%x[0-9A-F]+(-[0-9A-F]+|(\.[0-9A-F]+)+){0,1}/
  },
      t = {
    cN: "symbol",
    b: /%[si]/
  },
      s = {
    b: r.ruleDeclaration + "\\s*=",
    rB: !0,
    e: /=/,
    r: 0,
    c: [{
      cN: "attribute",
      b: r.ruleDeclaration
    }]
  };
  return {
    i: r.unexpectedChars,
    k: a.join(" "),
    c: [s, b, c, l, n, t, e.QSM, e.NM]
  };
});
hljs.registerLanguage("awk", function (e) {
  var r = {
    cN: "variable",
    v: [{
      b: /\$[\w\d#@][\w\d_]*/
    }, {
      b: /\$\{(.*?)}/
    }]
  },
      b = "BEGIN END if else while do for in break continue delete next nextfile function func exit|10",
      n = {
    cN: "string",
    c: [e.BE],
    v: [{
      b: /(u|b)?r?'''/,
      e: /'''/,
      r: 10
    }, {
      b: /(u|b)?r?"""/,
      e: /"""/,
      r: 10
    }, {
      b: /(u|r|ur)'/,
      e: /'/,
      r: 10
    }, {
      b: /(u|r|ur)"/,
      e: /"/,
      r: 10
    }, {
      b: /(b|br)'/,
      e: /'/
    }, {
      b: /(b|br)"/,
      e: /"/
    }, e.ASM, e.QSM]
  };
  return {
    k: {
      keyword: b
    },
    c: [r, n, e.RM, e.HCM, e.NM]
  };
});
hljs.registerLanguage("mel", function (e) {
  return {
    k: "int float string vector matrix if else switch case default while do for in break continue global proc return about abs addAttr addAttributeEditorNodeHelp addDynamic addNewShelfTab addPP addPanelCategory addPrefixToName advanceToNextDrivenKey affectedNet affects aimConstraint air alias aliasAttr align alignCtx alignCurve alignSurface allViewFit ambientLight angle angleBetween animCone animCurveEditor animDisplay animView annotate appendStringArray applicationName applyAttrPreset applyTake arcLenDimContext arcLengthDimension arclen arrayMapper art3dPaintCtx artAttrCtx artAttrPaintVertexCtx artAttrSkinPaintCtx artAttrTool artBuildPaintMenu artFluidAttrCtx artPuttyCtx artSelectCtx artSetPaintCtx artUserPaintCtx assignCommand assignInputDevice assignViewportFactories attachCurve attachDeviceAttr attachSurface attrColorSliderGrp attrCompatibility attrControlGrp attrEnumOptionMenu attrEnumOptionMenuGrp attrFieldGrp attrFieldSliderGrp attrNavigationControlGrp attrPresetEditWin attributeExists attributeInfo attributeMenu attributeQuery autoKeyframe autoPlace bakeClip bakeFluidShading bakePartialHistory bakeResults bakeSimulation basename basenameEx batchRender bessel bevel bevelPlus binMembership bindSkin blend2 blendShape blendShapeEditor blendShapePanel blendTwoAttr blindDataType boneLattice boundary boxDollyCtx boxZoomCtx bufferCurve buildBookmarkMenu buildKeyframeMenu button buttonManip CBG cacheFile cacheFileCombine cacheFileMerge cacheFileTrack camera cameraView canCreateManip canvas capitalizeString catch catchQuiet ceil changeSubdivComponentDisplayLevel changeSubdivRegion channelBox character characterMap characterOutlineEditor characterize chdir checkBox checkBoxGrp checkDefaultRenderGlobals choice circle circularFillet clamp clear clearCache clip clipEditor clipEditorCurrentTimeCtx clipSchedule clipSchedulerOutliner clipTrimBefore closeCurve closeSurface cluster cmdFileOutput cmdScrollFieldExecuter cmdScrollFieldReporter cmdShell coarsenSubdivSelectionList collision color colorAtPoint colorEditor colorIndex colorIndexSliderGrp colorSliderButtonGrp colorSliderGrp columnLayout commandEcho commandLine commandPort compactHairSystem componentEditor compositingInterop computePolysetVolume condition cone confirmDialog connectAttr connectControl connectDynamic connectJoint connectionInfo constrain constrainValue constructionHistory container containsMultibyte contextInfo control convertFromOldLayers convertIffToPsd convertLightmap convertSolidTx convertTessellation convertUnit copyArray copyFlexor copyKey copySkinWeights cos cpButton cpCache cpClothSet cpCollision cpConstraint cpConvClothToMesh cpForces cpGetSolverAttr cpPanel cpProperty cpRigidCollisionFilter cpSeam cpSetEdit cpSetSolverAttr cpSolver cpSolverTypes cpTool cpUpdateClothUVs createDisplayLayer createDrawCtx createEditor createLayeredPsdFile createMotionField createNewShelf createNode createRenderLayer createSubdivRegion cross crossProduct ctxAbort ctxCompletion ctxEditMode ctxTraverse currentCtx currentTime currentTimeCtx currentUnit curve curveAddPtCtx curveCVCtx curveEPCtx curveEditorCtx curveIntersect curveMoveEPCtx curveOnSurface curveSketchCtx cutKey cycleCheck cylinder dagPose date defaultLightListCheckBox defaultNavigation defineDataServer defineVirtualDevice deformer deg_to_rad delete deleteAttr deleteShadingGroupsAndMaterials deleteShelfTab deleteUI deleteUnusedBrushes delrandstr detachCurve detachDeviceAttr detachSurface deviceEditor devicePanel dgInfo dgdirty dgeval dgtimer dimWhen directKeyCtx directionalLight dirmap dirname disable disconnectAttr disconnectJoint diskCache displacementToPoly displayAffected displayColor displayCull displayLevelOfDetail displayPref displayRGBColor displaySmoothness displayStats displayString displaySurface distanceDimContext distanceDimension doBlur dolly dollyCtx dopeSheetEditor dot dotProduct doubleProfileBirailSurface drag dragAttrContext draggerContext dropoffLocator duplicate duplicateCurve duplicateSurface dynCache dynControl dynExport dynExpression dynGlobals dynPaintEditor dynParticleCtx dynPref dynRelEdPanel dynRelEditor dynamicLoad editAttrLimits editDisplayLayerGlobals editDisplayLayerMembers editRenderLayerAdjustment editRenderLayerGlobals editRenderLayerMembers editor editorTemplate effector emit emitter enableDevice encodeString endString endsWith env equivalent equivalentTol erf error eval evalDeferred evalEcho event exactWorldBoundingBox exclusiveLightCheckBox exec executeForEachObject exists exp expression expressionEditorListen extendCurve extendSurface extrude fcheck fclose feof fflush fgetline fgetword file fileBrowserDialog fileDialog fileExtension fileInfo filetest filletCurve filter filterCurve filterExpand filterStudioImport findAllIntersections findAnimCurves findKeyframe findMenuItem findRelatedSkinCluster finder firstParentOf fitBspline flexor floatEq floatField floatFieldGrp floatScrollBar floatSlider floatSlider2 floatSliderButtonGrp floatSliderGrp floor flow fluidCacheInfo fluidEmitter fluidVoxelInfo flushUndo fmod fontDialog fopen formLayout format fprint frameLayout fread freeFormFillet frewind fromNativePath fwrite gamma gauss geometryConstraint getApplicationVersionAsFloat getAttr getClassification getDefaultBrush getFileList getFluidAttr getInputDeviceRange getMayaPanelTypes getModifiers getPanel getParticleAttr getPluginResource getenv getpid glRender glRenderEditor globalStitch gmatch goal gotoBindPose grabColor gradientControl gradientControlNoAttr graphDollyCtx graphSelectContext graphTrackCtx gravity grid gridLayout group groupObjectsByName HfAddAttractorToAS HfAssignAS HfBuildEqualMap HfBuildFurFiles HfBuildFurImages HfCancelAFR HfConnectASToHF HfCreateAttractor HfDeleteAS HfEditAS HfPerformCreateAS HfRemoveAttractorFromAS HfSelectAttached HfSelectAttractors HfUnAssignAS hardenPointCurve hardware hardwareRenderPanel headsUpDisplay headsUpMessage help helpLine hermite hide hilite hitTest hotBox hotkey hotkeyCheck hsv_to_rgb hudButton hudSlider hudSliderButton hwReflectionMap hwRender hwRenderLoad hyperGraph hyperPanel hyperShade hypot iconTextButton iconTextCheckBox iconTextRadioButton iconTextRadioCollection iconTextScrollList iconTextStaticLabel ikHandle ikHandleCtx ikHandleDisplayScale ikSolver ikSplineHandleCtx ikSystem ikSystemInfo ikfkDisplayMethod illustratorCurves image imfPlugins inheritTransform insertJoint insertJointCtx insertKeyCtx insertKnotCurve insertKnotSurface instance instanceable instancer intField intFieldGrp intScrollBar intSlider intSliderGrp interToUI internalVar intersect iprEngine isAnimCurve isConnected isDirty isParentOf isSameObject isTrue isValidObjectName isValidString isValidUiName isolateSelect itemFilter itemFilterAttr itemFilterRender itemFilterType joint jointCluster jointCtx jointDisplayScale jointLattice keyTangent keyframe keyframeOutliner keyframeRegionCurrentTimeCtx keyframeRegionDirectKeyCtx keyframeRegionDollyCtx keyframeRegionInsertKeyCtx keyframeRegionMoveKeyCtx keyframeRegionScaleKeyCtx keyframeRegionSelectKeyCtx keyframeRegionSetKeyCtx keyframeRegionTrackCtx keyframeStats lassoContext lattice latticeDeformKeyCtx launch launchImageEditor layerButton layeredShaderPort layeredTexturePort layout layoutDialog lightList lightListEditor lightListPanel lightlink lineIntersection linearPrecision linstep listAnimatable listAttr listCameras listConnections listDeviceAttachments listHistory listInputDeviceAxes listInputDeviceButtons listInputDevices listMenuAnnotation listNodeTypes listPanelCategories listRelatives listSets listTransforms listUnselected listerEditor loadFluid loadNewShelf loadPlugin loadPluginLanguageResources loadPrefObjects localizedPanelLabel lockNode loft log longNameOf lookThru ls lsThroughFilter lsType lsUI Mayatomr mag makeIdentity makeLive makePaintable makeRoll makeSingleSurface makeTubeOn makebot manipMoveContext manipMoveLimitsCtx manipOptions manipRotateContext manipRotateLimitsCtx manipScaleContext manipScaleLimitsCtx marker match max memory menu menuBarLayout menuEditor menuItem menuItemToShelf menuSet menuSetPref messageLine min minimizeApp mirrorJoint modelCurrentTimeCtx modelEditor modelPanel mouse movIn movOut move moveIKtoFK moveKeyCtx moveVertexAlongDirection multiProfileBirailSurface mute nParticle nameCommand nameField namespace namespaceInfo newPanelItems newton nodeCast nodeIconButton nodeOutliner nodePreset nodeType noise nonLinear normalConstraint normalize nurbsBoolean nurbsCopyUVSet nurbsCube nurbsEditUV nurbsPlane nurbsSelect nurbsSquare nurbsToPoly nurbsToPolygonsPref nurbsToSubdiv nurbsToSubdivPref nurbsUVSet nurbsViewDirectionVector objExists objectCenter objectLayer objectType objectTypeUI obsoleteProc oceanNurbsPreviewPlane offsetCurve offsetCurveOnSurface offsetSurface openGLExtension openMayaPref optionMenu optionMenuGrp optionVar orbit orbitCtx orientConstraint outlinerEditor outlinerPanel overrideModifier paintEffectsDisplay pairBlend palettePort paneLayout panel panelConfiguration panelHistory paramDimContext paramDimension paramLocator parent parentConstraint particle particleExists particleInstancer particleRenderInfo partition pasteKey pathAnimation pause pclose percent performanceOptions pfxstrokes pickWalk picture pixelMove planarSrf plane play playbackOptions playblast plugAttr plugNode pluginInfo pluginResourceUtil pointConstraint pointCurveConstraint pointLight pointMatrixMult pointOnCurve pointOnSurface pointPosition poleVectorConstraint polyAppend polyAppendFacetCtx polyAppendVertex polyAutoProjection polyAverageNormal polyAverageVertex polyBevel polyBlendColor polyBlindData polyBoolOp polyBridgeEdge polyCacheMonitor polyCheck polyChipOff polyClipboard polyCloseBorder polyCollapseEdge polyCollapseFacet polyColorBlindData polyColorDel polyColorPerVertex polyColorSet polyCompare polyCone polyCopyUV polyCrease polyCreaseCtx polyCreateFacet polyCreateFacetCtx polyCube polyCut polyCutCtx polyCylinder polyCylindricalProjection polyDelEdge polyDelFacet polyDelVertex polyDuplicateAndConnect polyDuplicateEdge polyEditUV polyEditUVShell polyEvaluate polyExtrudeEdge polyExtrudeFacet polyExtrudeVertex polyFlipEdge polyFlipUV polyForceUV polyGeoSampler polyHelix polyInfo polyInstallAction polyLayoutUV polyListComponentConversion polyMapCut polyMapDel polyMapSew polyMapSewMove polyMergeEdge polyMergeEdgeCtx polyMergeFacet polyMergeFacetCtx polyMergeUV polyMergeVertex polyMirrorFace polyMoveEdge polyMoveFacet polyMoveFacetUV polyMoveUV polyMoveVertex polyNormal polyNormalPerVertex polyNormalizeUV polyOptUvs polyOptions polyOutput polyPipe polyPlanarProjection polyPlane polyPlatonicSolid polyPoke polyPrimitive polyPrism polyProjection polyPyramid polyQuad polyQueryBlindData polyReduce polySelect polySelectConstraint polySelectConstraintMonitor polySelectCtx polySelectEditCtx polySeparate polySetToFaceNormal polySewEdge polyShortestPathCtx polySmooth polySoftEdge polySphere polySphericalProjection polySplit polySplitCtx polySplitEdge polySplitRing polySplitVertex polyStraightenUVBorder polySubdivideEdge polySubdivideFacet polyToSubdiv polyTorus polyTransfer polyTriangulate polyUVSet polyUnite polyWedgeFace popen popupMenu pose pow preloadRefEd print progressBar progressWindow projFileViewer projectCurve projectTangent projectionContext projectionManip promptDialog propModCtx propMove psdChannelOutliner psdEditTextureFile psdExport psdTextureFile putenv pwd python querySubdiv quit rad_to_deg radial radioButton radioButtonGrp radioCollection radioMenuItemCollection rampColorPort rand randomizeFollicles randstate rangeControl readTake rebuildCurve rebuildSurface recordAttr recordDevice redo reference referenceEdit referenceQuery refineSubdivSelectionList refresh refreshAE registerPluginResource rehash reloadImage removeJoint removeMultiInstance removePanelCategory rename renameAttr renameSelectionList renameUI render renderGlobalsNode renderInfo renderLayerButton renderLayerParent renderLayerPostProcess renderLayerUnparent renderManip renderPartition renderQualityNode renderSettings renderThumbnailUpdate renderWindowEditor renderWindowSelectContext renderer reorder reorderDeformers requires reroot resampleFluid resetAE resetPfxToPolyCamera resetTool resolutionNode retarget reverseCurve reverseSurface revolve rgb_to_hsv rigidBody rigidSolver roll rollCtx rootOf rot rotate rotationInterpolation roundConstantRadius rowColumnLayout rowLayout runTimeCommand runup sampleImage saveAllShelves saveAttrPreset saveFluid saveImage saveInitialState saveMenu savePrefObjects savePrefs saveShelf saveToolSettings scale scaleBrushBrightness scaleComponents scaleConstraint scaleKey scaleKeyCtx sceneEditor sceneUIReplacement scmh scriptCtx scriptEditorInfo scriptJob scriptNode scriptTable scriptToShelf scriptedPanel scriptedPanelType scrollField scrollLayout sculpt searchPathArray seed selLoadSettings select selectContext selectCurveCV selectKey selectKeyCtx selectKeyframeRegionCtx selectMode selectPref selectPriority selectType selectedNodes selectionConnection separator setAttr setAttrEnumResource setAttrMapping setAttrNiceNameResource setConstraintRestPosition setDefaultShadingGroup setDrivenKeyframe setDynamic setEditCtx setEditor setFluidAttr setFocus setInfinity setInputDeviceMapping setKeyCtx setKeyPath setKeyframe setKeyframeBlendshapeTargetWts setMenuMode setNodeNiceNameResource setNodeTypeFlag setParent setParticleAttr setPfxToPolyCamera setPluginResource setProject setStampDensity setStartupMessage setState setToolTo setUITemplate setXformManip sets shadingConnection shadingGeometryRelCtx shadingLightRelCtx shadingNetworkCompare shadingNode shapeCompare shelfButton shelfLayout shelfTabLayout shellField shortNameOf showHelp showHidden showManipCtx showSelectionInTitle showShadingGroupAttrEditor showWindow sign simplify sin singleProfileBirailSurface size sizeBytes skinCluster skinPercent smoothCurve smoothTangentSurface smoothstep snap2to2 snapKey snapMode snapTogetherCtx snapshot soft softMod softModCtx sort sound soundControl source spaceLocator sphere sphrand spotLight spotLightPreviewPort spreadSheetEditor spring sqrt squareSurface srtContext stackTrace startString startsWith stitchAndExplodeShell stitchSurface stitchSurfacePoints strcmp stringArrayCatenate stringArrayContains stringArrayCount stringArrayInsertAtIndex stringArrayIntersector stringArrayRemove stringArrayRemoveAtIndex stringArrayRemoveDuplicates stringArrayRemoveExact stringArrayToString stringToStringArray strip stripPrefixFromName stroke subdAutoProjection subdCleanTopology subdCollapse subdDuplicateAndConnect subdEditUV subdListComponentConversion subdMapCut subdMapSewMove subdMatchTopology subdMirror subdToBlind subdToPoly subdTransferUVsToCache subdiv subdivCrease subdivDisplaySmoothness substitute substituteAllString substituteGeometry substring surface surfaceSampler surfaceShaderList swatchDisplayPort switchTable symbolButton symbolCheckBox sysFile system tabLayout tan tangentConstraint texLatticeDeformContext texManipContext texMoveContext texMoveUVShellContext texRotateContext texScaleContext texSelectContext texSelectShortestPathCtx texSmudgeUVContext texWinToolCtx text textCurves textField textFieldButtonGrp textFieldGrp textManip textScrollList textToShelf textureDisplacePlane textureHairColor texturePlacementContext textureWindow threadCount threePointArcCtx timeControl timePort timerX toNativePath toggle toggleAxis toggleWindowVisibility tokenize tokenizeList tolerance tolower toolButton toolCollection toolDropped toolHasOptions toolPropertyWindow torus toupper trace track trackCtx transferAttributes transformCompare transformLimits translator trim trunc truncateFluidCache truncateHairCache tumble tumbleCtx turbulence twoPointArcCtx uiRes uiTemplate unassignInputDevice undo undoInfo ungroup uniform unit unloadPlugin untangleUV untitledFileName untrim upAxis updateAE userCtx uvLink uvSnapshot validateShelfName vectorize view2dToolCtx viewCamera viewClipPlane viewFit viewHeadOn viewLookAt viewManip viewPlace viewSet visor volumeAxis vortex waitCursor warning webBrowser webBrowserPrefs whatIs window windowPref wire wireContext workspace wrinkle wrinkleContext writeTake xbmLangPathList xform",
    i: "</",
    c: [e.CNM, e.ASM, e.QSM, {
      cN: "string",
      b: "`",
      e: "`",
      c: [e.BE]
    }, {
      b: "[\\$\\%\\@](\\^\\w\\b|#\\w+|[^\\s\\w{]|{\\w+}|\\w+)"
    }, e.CLCM, e.CBCM]
  };
});
hljs.registerLanguage("ruleslanguage", function (T) {
  return {
    k: {
      keyword: "BILL_PERIOD BILL_START BILL_STOP RS_EFFECTIVE_START RS_EFFECTIVE_STOP RS_JURIS_CODE RS_OPCO_CODE INTDADDATTRIBUTE|5 INTDADDVMSG|5 INTDBLOCKOP|5 INTDBLOCKOPNA|5 INTDCLOSE|5 INTDCOUNT|5 INTDCOUNTSTATUSCODE|5 INTDCREATEMASK|5 INTDCREATEDAYMASK|5 INTDCREATEFACTORMASK|5 INTDCREATEHANDLE|5 INTDCREATEOVERRIDEDAYMASK|5 INTDCREATEOVERRIDEMASK|5 INTDCREATESTATUSCODEMASK|5 INTDCREATETOUPERIOD|5 INTDDELETE|5 INTDDIPTEST|5 INTDEXPORT|5 INTDGETERRORCODE|5 INTDGETERRORMESSAGE|5 INTDISEQUAL|5 INTDJOIN|5 INTDLOAD|5 INTDLOADACTUALCUT|5 INTDLOADDATES|5 INTDLOADHIST|5 INTDLOADLIST|5 INTDLOADLISTDATES|5 INTDLOADLISTENERGY|5 INTDLOADLISTHIST|5 INTDLOADRELATEDCHANNEL|5 INTDLOADSP|5 INTDLOADSTAGING|5 INTDLOADUOM|5 INTDLOADUOMDATES|5 INTDLOADUOMHIST|5 INTDLOADVERSION|5 INTDOPEN|5 INTDREADFIRST|5 INTDREADNEXT|5 INTDRECCOUNT|5 INTDRELEASE|5 INTDREPLACE|5 INTDROLLAVG|5 INTDROLLPEAK|5 INTDSCALAROP|5 INTDSCALE|5 INTDSETATTRIBUTE|5 INTDSETDSTPARTICIPANT|5 INTDSETSTRING|5 INTDSETVALUE|5 INTDSETVALUESTATUS|5 INTDSHIFTSTARTTIME|5 INTDSMOOTH|5 INTDSORT|5 INTDSPIKETEST|5 INTDSUBSET|5 INTDTOU|5 INTDTOURELEASE|5 INTDTOUVALUE|5 INTDUPDATESTATS|5 INTDVALUE|5 STDEV INTDDELETEEX|5 INTDLOADEXACTUAL|5 INTDLOADEXCUT|5 INTDLOADEXDATES|5 INTDLOADEX|5 INTDLOADEXRELATEDCHANNEL|5 INTDSAVEEX|5 MVLOAD|5 MVLOADACCT|5 MVLOADACCTDATES|5 MVLOADACCTHIST|5 MVLOADDATES|5 MVLOADHIST|5 MVLOADLIST|5 MVLOADLISTDATES|5 MVLOADLISTHIST|5 IF FOR NEXT DONE SELECT END CALL ABORT CLEAR CHANNEL FACTOR LIST NUMBER OVERRIDE SET WEEK DISTRIBUTIONNODE ELSE WHEN THEN OTHERWISE IENUM CSV INCLUDE LEAVE RIDER SAVE DELETE NOVALUE SECTION WARN SAVE_UPDATE DETERMINANT LABEL REPORT REVENUE EACH IN FROM TOTAL CHARGE BLOCK AND OR CSV_FILE RATE_CODE AUXILIARY_DEMAND UIDACCOUNT RS BILL_PERIOD_SELECT HOURS_PER_MONTH INTD_ERROR_STOP SEASON_SCHEDULE_NAME ACCOUNTFACTOR ARRAYUPPERBOUND CALLSTOREDPROC GETADOCONNECTION GETCONNECT GETDATASOURCE GETQUALIFIER GETUSERID HASVALUE LISTCOUNT LISTOP LISTUPDATE LISTVALUE PRORATEFACTOR RSPRORATE SETBINPATH SETDBMONITOR WQ_OPEN BILLINGHOURS DATE DATEFROMFLOAT DATETIMEFROMSTRING DATETIMETOSTRING DATETOFLOAT DAY DAYDIFF DAYNAME DBDATETIME HOUR MINUTE MONTH MONTHDIFF MONTHHOURS MONTHNAME ROUNDDATE SAMEWEEKDAYLASTYEAR SECOND WEEKDAY WEEKDIFF YEAR YEARDAY YEARSTR COMPSUM HISTCOUNT HISTMAX HISTMIN HISTMINNZ HISTVALUE MAXNRANGE MAXRANGE MINRANGE COMPIKVA COMPKVA COMPKVARFROMKQKW COMPLF IDATTR FLAG LF2KW LF2KWH MAXKW POWERFACTOR READING2USAGE AVGSEASON MAXSEASON MONTHLYMERGE SEASONVALUE SUMSEASON ACCTREADDATES ACCTTABLELOAD CONFIGADD CONFIGGET CREATEOBJECT CREATEREPORT EMAILCLIENT EXPBLKMDMUSAGE EXPMDMUSAGE EXPORT_USAGE FACTORINEFFECT GETUSERSPECIFIEDSTOP INEFFECT ISHOLIDAY RUNRATE SAVE_PROFILE SETREPORTTITLE USEREXIT WATFORRUNRATE TO TABLE ACOS ASIN ATAN ATAN2 BITAND CEIL COS COSECANT COSH COTANGENT DIVQUOT DIVREM EXP FABS FLOOR FMOD FREPM FREXPN LOG LOG10 MAX MAXN MIN MINNZ MODF POW ROUND ROUND2VALUE ROUNDINT SECANT SIN SINH SQROOT TAN TANH FLOAT2STRING FLOAT2STRINGNC INSTR LEFT LEN LTRIM MID RIGHT RTRIM STRING STRINGNC TOLOWER TOUPPER TRIM NUMDAYS READ_DATE STAGING",
      built_in: "IDENTIFIER OPTIONS XML_ELEMENT XML_OP XML_ELEMENT_OF DOMDOCCREATE DOMDOCLOADFILE DOMDOCLOADXML DOMDOCSAVEFILE DOMDOCGETROOT DOMDOCADDPI DOMNODEGETNAME DOMNODEGETTYPE DOMNODEGETVALUE DOMNODEGETCHILDCT DOMNODEGETFIRSTCHILD DOMNODEGETSIBLING DOMNODECREATECHILDELEMENT DOMNODESETATTRIBUTE DOMNODEGETCHILDELEMENTCT DOMNODEGETFIRSTCHILDELEMENT DOMNODEGETSIBLINGELEMENT DOMNODEGETATTRIBUTECT DOMNODEGETATTRIBUTEI DOMNODEGETATTRIBUTEBYNAME DOMNODEGETBYNAME"
    },
    c: [T.CLCM, T.CBCM, T.ASM, T.QSM, T.CNM, {
      cN: "literal",
      v: [{
        b: "#\\s+[a-zA-Z\\ \\.]*",
        r: 0
      }, {
        b: "#[a-zA-Z\\ \\.]+"
      }]
    }]
  };
});
hljs.registerLanguage("parser3", function (r) {
  var e = r.C("{", "}", {
    c: ["self"]
  });
  return {
    sL: "xml",
    r: 0,
    c: [r.C("^#", "$"), r.C("\\^rem{", "}", {
      r: 10,
      c: [e]
    }), {
      cN: "meta",
      b: "^@(?:BASE|USE|CLASS|OPTIONS)$",
      r: 10
    }, {
      cN: "title",
      b: "@[\\w\\-]+\\[[\\w^;\\-]*\\](?:\\[[\\w^;\\-]*\\])?(?:.*)$"
    }, {
      cN: "variable",
      b: "\\$\\{?[\\w\\-\\.\\:]+\\}?"
    }, {
      cN: "keyword",
      b: "\\^[\\w\\-\\.\\:]+"
    }, {
      cN: "number",
      b: "\\^#[0-9a-fA-F]+"
    }, r.CNM]
  };
});
hljs.registerLanguage("llvm", function (e) {
  var n = "([-a-zA-Z$._][\\w\\-$.]*)";
  return {
    k: "begin end true false declare define global constant private linker_private internal available_externally linkonce linkonce_odr weak weak_odr appending dllimport dllexport common default hidden protected extern_weak external thread_local zeroinitializer undef null to tail target triple datalayout volatile nuw nsw nnan ninf nsz arcp fast exact inbounds align addrspace section alias module asm sideeffect gc dbg linker_private_weak attributes blockaddress initialexec localdynamic localexec prefix unnamed_addr ccc fastcc coldcc x86_stdcallcc x86_fastcallcc arm_apcscc arm_aapcscc arm_aapcs_vfpcc ptx_device ptx_kernel intel_ocl_bicc msp430_intrcc spir_func spir_kernel x86_64_sysvcc x86_64_win64cc x86_thiscallcc cc c signext zeroext inreg sret nounwind noreturn noalias nocapture byval nest readnone readonly inlinehint noinline alwaysinline optsize ssp sspreq noredzone noimplicitfloat naked builtin cold nobuiltin noduplicate nonlazybind optnone returns_twice sanitize_address sanitize_memory sanitize_thread sspstrong uwtable returned type opaque eq ne slt sgt sle sge ult ugt ule uge oeq one olt ogt ole oge ord uno ueq une x acq_rel acquire alignstack atomic catch cleanup filter inteldialect max min monotonic nand personality release seq_cst singlethread umax umin unordered xchg add fadd sub fsub mul fmul udiv sdiv fdiv urem srem frem shl lshr ashr and or xor icmp fcmp phi call trunc zext sext fptrunc fpext uitofp sitofp fptoui fptosi inttoptr ptrtoint bitcast addrspacecast select va_arg ret br switch invoke unwind unreachable indirectbr landingpad resume malloc alloca free load store getelementptr extractelement insertelement shufflevector getresult extractvalue insertvalue atomicrmw cmpxchg fence argmemonly double",
    c: [{
      cN: "keyword",
      b: "i\\d+"
    }, e.C(";", "\\n", {
      r: 0
    }), e.QSM, {
      cN: "string",
      v: [{
        b: '"',
        e: '[^\\\\]"'
      }],
      r: 0
    }, {
      cN: "title",
      v: [{
        b: "@" + n
      }, {
        b: "@\\d+"
      }, {
        b: "!" + n
      }, {
        b: "!\\d+" + n
      }]
    }, {
      cN: "symbol",
      v: [{
        b: "%" + n
      }, {
        b: "%\\d+"
      }, {
        b: "#\\d+"
      }]
    }, {
      cN: "number",
      v: [{
        b: "0[xX][a-fA-F0-9]+"
      }, {
        b: "-?\\d+(?:[.]\\d+)?(?:[eE][-+]?\\d+(?:[.]\\d+)?)?"
      }],
      r: 0
    }]
  };
});
hljs.registerLanguage("armasm", function (s) {
  return {
    cI: !0,
    aliases: ["arm"],
    l: "\\.?" + s.IR,
    k: {
      meta: ".2byte .4byte .align .ascii .asciz .balign .byte .code .data .else .end .endif .endm .endr .equ .err .exitm .extern .global .hword .if .ifdef .ifndef .include .irp .long .macro .rept .req .section .set .skip .space .text .word .arm .thumb .code16 .code32 .force_thumb .thumb_func .ltorg ALIAS ALIGN ARM AREA ASSERT ATTR CN CODE CODE16 CODE32 COMMON CP DATA DCB DCD DCDU DCDO DCFD DCFDU DCI DCQ DCQU DCW DCWU DN ELIF ELSE END ENDFUNC ENDIF ENDP ENTRY EQU EXPORT EXPORTAS EXTERN FIELD FILL FUNCTION GBLA GBLL GBLS GET GLOBAL IF IMPORT INCBIN INCLUDE INFO KEEP LCLA LCLL LCLS LTORG MACRO MAP MEND MEXIT NOFP OPT PRESERVE8 PROC QN READONLY RELOC REQUIRE REQUIRE8 RLIST FN ROUT SETA SETL SETS SN SPACE SUBT THUMB THUMBX TTL WHILE WEND ",
      built_in: "r0 r1 r2 r3 r4 r5 r6 r7 r8 r9 r10 r11 r12 r13 r14 r15 pc lr sp ip sl sb fp a1 a2 a3 a4 v1 v2 v3 v4 v5 v6 v7 v8 f0 f1 f2 f3 f4 f5 f6 f7 p0 p1 p2 p3 p4 p5 p6 p7 p8 p9 p10 p11 p12 p13 p14 p15 c0 c1 c2 c3 c4 c5 c6 c7 c8 c9 c10 c11 c12 c13 c14 c15 q0 q1 q2 q3 q4 q5 q6 q7 q8 q9 q10 q11 q12 q13 q14 q15 cpsr_c cpsr_x cpsr_s cpsr_f cpsr_cx cpsr_cxs cpsr_xs cpsr_xsf cpsr_sf cpsr_cxsf spsr_c spsr_x spsr_s spsr_f spsr_cx spsr_cxs spsr_xs spsr_xsf spsr_sf spsr_cxsf s0 s1 s2 s3 s4 s5 s6 s7 s8 s9 s10 s11 s12 s13 s14 s15 s16 s17 s18 s19 s20 s21 s22 s23 s24 s25 s26 s27 s28 s29 s30 s31 d0 d1 d2 d3 d4 d5 d6 d7 d8 d9 d10 d11 d12 d13 d14 d15 d16 d17 d18 d19 d20 d21 d22 d23 d24 d25 d26 d27 d28 d29 d30 d31 {PC} {VAR} {TRUE} {FALSE} {OPT} {CONFIG} {ENDIAN} {CODESIZE} {CPU} {FPU} {ARCHITECTURE} {PCSTOREOFFSET} {ARMASM_VERSION} {INTER} {ROPI} {RWPI} {SWST} {NOSWST} . @"
    },
    c: [{
      cN: "keyword",
      b: "\\b(adc|(qd?|sh?|u[qh]?)?add(8|16)?|usada?8|(q|sh?|u[qh]?)?(as|sa)x|and|adrl?|sbc|rs[bc]|asr|b[lx]?|blx|bxj|cbn?z|tb[bh]|bic|bfc|bfi|[su]bfx|bkpt|cdp2?|clz|clrex|cmp|cmn|cpsi[ed]|cps|setend|dbg|dmb|dsb|eor|isb|it[te]{0,3}|lsl|lsr|ror|rrx|ldm(([id][ab])|f[ds])?|ldr((s|ex)?[bhd])?|movt?|mvn|mra|mar|mul|[us]mull|smul[bwt][bt]|smu[as]d|smmul|smmla|mla|umlaal|smlal?([wbt][bt]|d)|mls|smlsl?[ds]|smc|svc|sev|mia([bt]{2}|ph)?|mrr?c2?|mcrr2?|mrs|msr|orr|orn|pkh(tb|bt)|rbit|rev(16|sh)?|sel|[su]sat(16)?|nop|pop|push|rfe([id][ab])?|stm([id][ab])?|str(ex)?[bhd]?|(qd?)?sub|(sh?|q|u[qh]?)?sub(8|16)|[su]xt(a?h|a?b(16)?)|srs([id][ab])?|swpb?|swi|smi|tst|teq|wfe|wfi|yield)(eq|ne|cs|cc|mi|pl|vs|vc|hi|ls|ge|lt|gt|le|al|hs|lo)?[sptrx]?",
      e: "\\s"
    }, s.C("[;@]", "$", {
      r: 0
    }), s.CBCM, s.QSM, {
      cN: "string",
      b: "'",
      e: "[^\\\\]'",
      r: 0
    }, {
      cN: "title",
      b: "\\|",
      e: "\\|",
      i: "\\n",
      r: 0
    }, {
      cN: "number",
      v: [{
        b: "[#$=]?0x[0-9a-f]+"
      }, {
        b: "[#$=]?0b[01]+"
      }, {
        b: "[#$=]\\d+"
      }, {
        b: "\\b\\d+"
      }],
      r: 0
    }, {
      cN: "symbol",
      v: [{
        b: "^[a-z_\\.\\$][a-z0-9_\\.\\$]+"
      }, {
        b: "^\\s*[a-z_\\.\\$][a-z0-9_\\.\\$]+:"
      }, {
        b: "[=#]\\w+"
      }],
      r: 0
    }]
  };
});
hljs.registerLanguage("n1ql", function (e) {
  return {
    cI: !0,
    c: [{
      bK: "build create index delete drop explain infer|10 insert merge prepare select update upsert|10",
      e: /;/,
      eW: !0,
      k: {
        keyword: "all alter analyze and any array as asc begin between binary boolean break bucket build by call case cast cluster collate collection commit connect continue correlate cover create database dataset datastore declare decrement delete derived desc describe distinct do drop each element else end every except exclude execute exists explain fetch first flatten for force from function grant group gsi having if ignore ilike in include increment index infer inline inner insert intersect into is join key keys keyspace known last left let letting like limit lsm map mapping matched materialized merge minus namespace nest not number object offset on option or order outer over parse partition password path pool prepare primary private privilege procedure public raw realm reduce rename return returning revoke right role rollback satisfies schema select self semi set show some start statistics string system then to transaction trigger truncate under union unique unknown unnest unset update upsert use user using validate value valued values via view when where while with within work xor",
        literal: "true false null missing|5",
        built_in: "array_agg array_append array_concat array_contains array_count array_distinct array_ifnull array_length array_max array_min array_position array_prepend array_put array_range array_remove array_repeat array_replace array_reverse array_sort array_sum avg count max min sum greatest least ifmissing ifmissingornull ifnull missingif nullif ifinf ifnan ifnanorinf naninf neginfif posinfif clock_millis clock_str date_add_millis date_add_str date_diff_millis date_diff_str date_part_millis date_part_str date_trunc_millis date_trunc_str duration_to_str millis str_to_millis millis_to_str millis_to_utc millis_to_zone_name now_millis now_str str_to_duration str_to_utc str_to_zone_name decode_json encode_json encoded_size poly_length base64 base64_encode base64_decode meta uuid abs acos asin atan atan2 ceil cos degrees e exp ln log floor pi power radians random round sign sin sqrt tan trunc object_length object_names object_pairs object_inner_pairs object_values object_inner_values object_add object_put object_remove object_unwrap regexp_contains regexp_like regexp_position regexp_replace contains initcap length lower ltrim position repeat replace rtrim split substr title trim upper isarray isatom isboolean isnumber isobject isstring type toarray toatom toboolean tonumber toobject tostring"
      },
      c: [{
        cN: "string",
        b: "'",
        e: "'",
        c: [e.BE],
        r: 0
      }, {
        cN: "string",
        b: '"',
        e: '"',
        c: [e.BE],
        r: 0
      }, {
        cN: "symbol",
        b: "`",
        e: "`",
        c: [e.BE],
        r: 2
      }, e.CNM, e.CBCM]
    }, e.CBCM]
  };
});
hljs.registerLanguage("gams", function (e) {
  var a = {
    keyword: "abort acronym acronyms alias all and assign binary card diag display else eq file files for free ge gt if integer le loop lt maximizing minimizing model models ne negative no not option options or ord positive prod put putpage puttl repeat sameas semicont semiint smax smin solve sos1 sos2 sum system table then until using while xor yes",
    literal: "eps inf na",
    "built-in": "abs arccos arcsin arctan arctan2 Beta betaReg binomial ceil centropy cos cosh cvPower div div0 eDist entropy errorf execSeed exp fact floor frac gamma gammaReg log logBeta logGamma log10 log2 mapVal max min mod ncpCM ncpF ncpVUpow ncpVUsin normal pi poly power randBinomial randLinear randTriangle round rPower sigmoid sign signPower sin sinh slexp sllog10 slrec sqexp sqlog10 sqr sqrec sqrt tan tanh trunc uniform uniformInt vcPower bool_and bool_eqv bool_imp bool_not bool_or bool_xor ifThen rel_eq rel_ge rel_gt rel_le rel_lt rel_ne gday gdow ghour gleap gmillisec gminute gmonth gsecond gyear jdate jnow jstart jtime errorLevel execError gamsRelease gamsVersion handleCollect handleDelete handleStatus handleSubmit heapFree heapLimit heapSize jobHandle jobKill jobStatus jobTerminate licenseLevel licenseStatus maxExecError sleep timeClose timeComp timeElapsed timeExec timeStart"
  },
      o = {
    cN: "params",
    b: /\(/,
    e: /\)/,
    eB: !0,
    eE: !0
  },
      r = {
    cN: "symbol",
    v: [{
      b: /\=[lgenxc]=/
    }, {
      b: /\$/
    }]
  },
      t = {
    cN: "comment",
    v: [{
      b: "'",
      e: "'"
    }, {
      b: '"',
      e: '"'
    }],
    i: "\\n",
    c: [e.BE]
  },
      i = {
    b: "/",
    e: "/",
    k: a,
    c: [t, e.CLCM, e.CBCM, e.QSM, e.ASM, e.CNM]
  },
      l = {
    b: /[a-z][a-z0-9_]*(\([a-z0-9_, ]*\))?[ \t]+/,
    eB: !0,
    e: "$",
    eW: !0,
    c: [t, i, {
      cN: "comment",
      b: /([ ]*[a-z0-9&#*=?@>\\<:\-,()$\[\]_.{}!+%^]+)+/,
      r: 0
    }]
  };
  return {
    aliases: ["gms"],
    cI: !0,
    k: a,
    c: [e.C(/^\$ontext/, /^\$offtext/), {
      cN: "meta",
      b: "^\\$[a-z0-9]+",
      e: "$",
      rB: !0,
      c: [{
        cN: "meta-keyword",
        b: "^\\$[a-z0-9]+"
      }]
    }, e.C("^\\*", "$"), e.CLCM, e.CBCM, e.QSM, e.ASM, {
      bK: "set sets parameter parameters variable variables scalar scalars equation equations",
      e: ";",
      c: [e.C("^\\*", "$"), e.CLCM, e.CBCM, e.QSM, e.ASM, i, l]
    }, {
      bK: "table",
      e: ";",
      rB: !0,
      c: [{
        bK: "table",
        e: "$",
        c: [l]
      }, e.C("^\\*", "$"), e.CLCM, e.CBCM, e.QSM, e.ASM, e.CNM]
    }, {
      cN: "function",
      b: /^[a-z][a-z0-9_,\-+' ()$]+\.{2}/,
      rB: !0,
      c: [{
        cN: "title",
        b: /^[a-z][a-z0-9_]+/
      }, o, r]
    }, e.CNM, r]
  };
});
hljs.registerLanguage("http", function (e) {
  var t = "HTTP/[0-9\\.]+";
  return {
    aliases: ["https"],
    i: "\\S",
    c: [{
      b: "^" + t,
      e: "$",
      c: [{
        cN: "number",
        b: "\\b\\d{3}\\b"
      }]
    }, {
      b: "^[A-Z]+ (.*?) " + t + "$",
      rB: !0,
      e: "$",
      c: [{
        cN: "string",
        b: " ",
        e: " ",
        eB: !0,
        eE: !0
      }, {
        b: t
      }, {
        cN: "keyword",
        b: "[A-Z]+"
      }]
    }, {
      cN: "attribute",
      b: "^\\w",
      e: ": ",
      eE: !0,
      i: "\\n|\\s|=",
      starts: {
        e: "$",
        r: 0
      }
    }, {
      b: "\\n\\n",
      starts: {
        sL: [],
        eW: !0
      }
    }]
  };
});
hljs.registerLanguage("thrift", function (e) {
  var t = "bool byte i16 i32 i64 double string binary";
  return {
    k: {
      keyword: "namespace const typedef struct enum service exception void oneway set list map required optional",
      built_in: t,
      literal: "true false"
    },
    c: [e.QSM, e.NM, e.CLCM, e.CBCM, {
      cN: "class",
      bK: "struct enum service exception",
      e: /\{/,
      i: /\n/,
      c: [e.inherit(e.TM, {
        starts: {
          eW: !0,
          eE: !0
        }
      })]
    }, {
      b: "\\b(set|list|map)\\s*<",
      e: ">",
      k: t,
      c: ["self"]
    }]
  };
});
hljs.registerLanguage("gradle", function (e) {
  return {
    cI: !0,
    k: {
      keyword: "task project allprojects subprojects artifacts buildscript configurations dependencies repositories sourceSets description delete from into include exclude source classpath destinationDir includes options sourceCompatibility targetCompatibility group flatDir doLast doFirst flatten todir fromdir ant def abstract break case catch continue default do else extends final finally for if implements instanceof native new private protected public return static switch synchronized throw throws transient try volatile while strictfp package import false null super this true antlrtask checkstyle codenarc copy boolean byte char class double float int interface long short void compile runTime file fileTree abs any append asList asWritable call collect compareTo count div dump each eachByte eachFile eachLine every find findAll flatten getAt getErr getIn getOut getText grep immutable inject inspect intersect invokeMethods isCase join leftShift minus multiply newInputStream newOutputStream newPrintWriter newReader newWriter next plus pop power previous print println push putAt read readBytes readLines reverse reverseEach round size sort splitEachLine step subMap times toInteger toList tokenize upto waitForOrKill withPrintWriter withReader withStream withWriter withWriterAppend write writeLine"
    },
    c: [e.CLCM, e.CBCM, e.ASM, e.QSM, e.NM, e.RM]
  };
});
hljs.registerLanguage("cmake", function (e) {
  return {
    aliases: ["cmake.in"],
    cI: !0,
    k: {
      keyword: "add_custom_command add_custom_target add_definitions add_dependencies add_executable add_library add_subdirectory add_test aux_source_directory break build_command cmake_minimum_required cmake_policy configure_file create_test_sourcelist define_property else elseif enable_language enable_testing endforeach endfunction endif endmacro endwhile execute_process export find_file find_library find_package find_path find_program fltk_wrap_ui foreach function get_cmake_property get_directory_property get_filename_component get_property get_source_file_property get_target_property get_test_property if include include_directories include_external_msproject include_regular_expression install link_directories load_cache load_command macro mark_as_advanced message option output_required_files project qt_wrap_cpp qt_wrap_ui remove_definitions return separate_arguments set set_directory_properties set_property set_source_files_properties set_target_properties set_tests_properties site_name source_group string target_link_libraries try_compile try_run unset variable_watch while build_name exec_program export_library_dependencies install_files install_programs install_targets link_libraries make_directory remove subdir_depends subdirs use_mangled_mesa utility_source variable_requires write_file qt5_use_modules qt5_use_package qt5_wrap_cpp on off true false and or equal less greater strless strgreater strequal matches"
    },
    c: [{
      cN: "variable",
      b: "\\${",
      e: "}"
    }, e.HCM, e.QSM, e.NM]
  };
});
hljs.registerLanguage("inform7", function (e) {
  var r = "\\[",
      o = "\\]";
  return {
    aliases: ["i7"],
    cI: !0,
    k: {
      keyword: "thing room person man woman animal container supporter backdrop door scenery open closed locked inside gender is are say understand kind of rule"
    },
    c: [{
      cN: "string",
      b: '"',
      e: '"',
      r: 0,
      c: [{
        cN: "subst",
        b: r,
        e: o
      }]
    }, {
      cN: "section",
      b: /^(Volume|Book|Part|Chapter|Section|Table)\b/,
      e: "$"
    }, {
      b: /^(Check|Carry out|Report|Instead of|To|Rule|When|Before|After)\b/,
      e: ":",
      c: [{
        b: "\\(This",
        e: "\\)"
      }]
    }, {
      cN: "comment",
      b: r,
      e: o,
      c: ["self"]
    }]
  };
});
hljs.registerLanguage("cs", function (e) {
  var i = {
    keyword: "abstract as base bool break byte case catch char checked const continue decimal default delegate do double else enum event explicit extern finally fixed float for foreach goto if implicit in int interface internal is lock long object operator out override params private protected public readonly ref sbyte sealed short sizeof stackalloc static string struct switch this try typeof uint ulong unchecked unsafe ushort using virtual void volatile while nameof add alias ascending async await by descending dynamic equals from get global group into join let on orderby partial remove select set value var where yield",
    literal: "null false true"
  },
      r = {
    cN: "string",
    b: '@"',
    e: '"',
    c: [{
      b: '""'
    }]
  },
      t = e.inherit(r, {
    i: /\n/
  }),
      a = {
    cN: "subst",
    b: "{",
    e: "}",
    k: i
  },
      n = e.inherit(a, {
    i: /\n/
  }),
      c = {
    cN: "string",
    b: /\$"/,
    e: '"',
    i: /\n/,
    c: [{
      b: "{{"
    }, {
      b: "}}"
    }, e.BE, n]
  },
      s = {
    cN: "string",
    b: /\$@"/,
    e: '"',
    c: [{
      b: "{{"
    }, {
      b: "}}"
    }, {
      b: '""'
    }, a]
  },
      o = e.inherit(s, {
    i: /\n/,
    c: [{
      b: "{{"
    }, {
      b: "}}"
    }, {
      b: '""'
    }, n]
  });
  a.c = [s, c, r, e.ASM, e.QSM, e.CNM, e.CBCM], n.c = [o, c, t, e.ASM, e.QSM, e.CNM, e.inherit(e.CBCM, {
    i: /\n/
  })];
  var l = {
    v: [s, c, r, e.ASM, e.QSM]
  },
      b = e.IR + "(<" + e.IR + "(\\s*,\\s*" + e.IR + ")*>)?(\\[\\])?";
  return {
    aliases: ["csharp"],
    k: i,
    i: /::/,
    c: [e.C("///", "$", {
      rB: !0,
      c: [{
        cN: "doctag",
        v: [{
          b: "///",
          r: 0
        }, {
          b: "<!--|-->"
        }, {
          b: "</?",
          e: ">"
        }]
      }]
    }), e.CLCM, e.CBCM, {
      cN: "meta",
      b: "#",
      e: "$",
      k: {
        "meta-keyword": "if else elif endif define undef warning error line region endregion pragma checksum"
      }
    }, l, e.CNM, {
      bK: "class interface",
      e: /[{;=]/,
      i: /[^\s:]/,
      c: [e.TM, e.CLCM, e.CBCM]
    }, {
      bK: "namespace",
      e: /[{;=]/,
      i: /[^\s:]/,
      c: [e.inherit(e.TM, {
        b: "[a-zA-Z](\\.?\\w)*"
      }), e.CLCM, e.CBCM]
    }, {
      bK: "new return throw await",
      r: 0
    }, {
      cN: "function",
      b: "(" + b + "\\s+)+" + e.IR + "\\s*\\(",
      rB: !0,
      e: /[{;=]/,
      eE: !0,
      k: i,
      c: [{
        b: e.IR + "\\s*\\(",
        rB: !0,
        c: [e.TM],
        r: 0
      }, {
        cN: "params",
        b: /\(/,
        e: /\)/,
        eB: !0,
        eE: !0,
        k: i,
        r: 0,
        c: [l, e.CNM, e.CBCM]
      }, e.CLCM, e.CBCM]
    }]
  };
});
hljs.registerLanguage("clojure-repl", function (e) {
  return {
    c: [{
      cN: "meta",
      b: /^([\w.-]+|\s*#_)=>/,
      starts: {
        e: /$/,
        sL: "clojure"
      }
    }]
  };
});
hljs.registerLanguage("zephir", function (e) {
  var i = {
    cN: "string",
    c: [e.BE],
    v: [{
      b: 'b"',
      e: '"'
    }, {
      b: "b'",
      e: "'"
    }, e.inherit(e.ASM, {
      i: null
    }), e.inherit(e.QSM, {
      i: null
    })]
  },
      n = {
    v: [e.BNM, e.CNM]
  };
  return {
    aliases: ["zep"],
    cI: !0,
    k: "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var let while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally int uint long ulong char uchar double float bool boolean stringlikely unlikely",
    c: [e.CLCM, e.HCM, e.C("/\\*", "\\*/", {
      c: [{
        cN: "doctag",
        b: "@[A-Za-z]+"
      }]
    }), e.C("__halt_compiler.+?;", !1, {
      eW: !0,
      k: "__halt_compiler",
      l: e.UIR
    }), {
      cN: "string",
      b: "<<<['\"]?\\w+['\"]?$",
      e: "^\\w+;",
      c: [e.BE]
    }, {
      b: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/
    }, {
      cN: "function",
      bK: "function",
      e: /[;{]/,
      eE: !0,
      i: "\\$|\\[|%",
      c: [e.UTM, {
        cN: "params",
        b: "\\(",
        e: "\\)",
        c: ["self", e.CBCM, i, n]
      }]
    }, {
      cN: "class",
      bK: "class interface",
      e: "{",
      eE: !0,
      i: /[:\(\$"]/,
      c: [{
        bK: "extends implements"
      }, e.UTM]
    }, {
      bK: "namespace",
      e: ";",
      i: /[\.']/,
      c: [e.UTM]
    }, {
      bK: "use",
      e: ";",
      c: [e.UTM]
    }, {
      b: "=>"
    }, i, n]
  };
});
hljs.registerLanguage("nsis", function (e) {
  var t = {
    cN: "variable",
    b: /\$(ADMINTOOLS|APPDATA|CDBURN_AREA|CMDLINE|COMMONFILES32|COMMONFILES64|COMMONFILES|COOKIES|DESKTOP|DOCUMENTS|EXEDIR|EXEFILE|EXEPATH|FAVORITES|FONTS|HISTORY|HWNDPARENT|INSTDIR|INTERNET_CACHE|LANGUAGE|LOCALAPPDATA|MUSIC|NETHOOD|OUTDIR|PICTURES|PLUGINSDIR|PRINTHOOD|PROFILE|PROGRAMFILES32|PROGRAMFILES64|PROGRAMFILES|QUICKLAUNCH|RECENT|RESOURCES_LOCALIZED|RESOURCES|SENDTO|SMPROGRAMS|SMSTARTUP|STARTMENU|SYSDIR|TEMP|TEMPLATES|VIDEOS|WINDIR)/
  },
      i = {
    cN: "variable",
    b: /\$+{[\w\.:-]+}/
  },
      n = {
    cN: "variable",
    b: /\$+\w+/,
    i: /\(\){}/
  },
      r = {
    cN: "variable",
    b: /\$+\([\w\^\.:-]+\)/
  },
      o = {
    cN: "params",
    b: "(ARCHIVE|FILE_ATTRIBUTE_ARCHIVE|FILE_ATTRIBUTE_NORMAL|FILE_ATTRIBUTE_OFFLINE|FILE_ATTRIBUTE_READONLY|FILE_ATTRIBUTE_SYSTEM|FILE_ATTRIBUTE_TEMPORARY|HKCR|HKCU|HKDD|HKEY_CLASSES_ROOT|HKEY_CURRENT_CONFIG|HKEY_CURRENT_USER|HKEY_DYN_DATA|HKEY_LOCAL_MACHINE|HKEY_PERFORMANCE_DATA|HKEY_USERS|HKLM|HKPD|HKU|IDABORT|IDCANCEL|IDIGNORE|IDNO|IDOK|IDRETRY|IDYES|MB_ABORTRETRYIGNORE|MB_DEFBUTTON1|MB_DEFBUTTON2|MB_DEFBUTTON3|MB_DEFBUTTON4|MB_ICONEXCLAMATION|MB_ICONINFORMATION|MB_ICONQUESTION|MB_ICONSTOP|MB_OK|MB_OKCANCEL|MB_RETRYCANCEL|MB_RIGHT|MB_RTLREADING|MB_SETFOREGROUND|MB_TOPMOST|MB_USERICON|MB_YESNO|NORMAL|OFFLINE|READONLY|SHCTX|SHELL_CONTEXT|SYSTEM|TEMPORARY)"
  },
      l = {
    cN: "keyword",
    b: /\!(addincludedir|addplugindir|appendfile|cd|define|delfile|echo|else|endif|error|execute|finalize|getdllversionsystem|ifdef|ifmacrodef|ifmacrondef|ifndef|if|include|insertmacro|macroend|macro|makensis|packhdr|searchparse|searchreplace|tempfile|undef|verbose|warning)/
  },
      s = {
    cN: "subst",
    b: /\$(\\[nrt]|\$)/
  },
      a = {
    cN: "class",
    b: /\w+\:\:\w+/
  },
      S = {
    cN: "string",
    v: [{
      b: '"',
      e: '"'
    }, {
      b: "'",
      e: "'"
    }, {
      b: "`",
      e: "`"
    }],
    i: /\n/,
    c: [s, t, i, n, r]
  };
  return {
    cI: !1,
    k: {
      keyword: "Abort AddBrandingImage AddSize AllowRootDirInstall AllowSkipFiles AutoCloseWindow BGFont BGGradient BrandingText BringToFront Call CallInstDLL Caption ChangeUI CheckBitmap ClearErrors CompletedText ComponentText CopyFiles CRCCheck CreateDirectory CreateFont CreateShortCut Delete DeleteINISec DeleteINIStr DeleteRegKey DeleteRegValue DetailPrint DetailsButtonText DirText DirVar DirVerify EnableWindow EnumRegKey EnumRegValue Exch Exec ExecShell ExecWait ExpandEnvStrings File FileBufSize FileClose FileErrorText FileOpen FileRead FileReadByte FileReadUTF16LE FileReadWord FileSeek FileWrite FileWriteByte FileWriteUTF16LE FileWriteWord FindClose FindFirst FindNext FindWindow FlushINI FunctionEnd GetCurInstType GetCurrentAddress GetDlgItem GetDLLVersion GetDLLVersionLocal GetErrorLevel GetFileTime GetFileTimeLocal GetFullPathName GetFunctionAddress GetInstDirError GetLabelAddress GetTempFileName Goto HideWindow Icon IfAbort IfErrors IfFileExists IfRebootFlag IfSilent InitPluginsDir InstallButtonText InstallColors InstallDir InstallDirRegKey InstProgressFlags InstType InstTypeGetText InstTypeSetText IntCmp IntCmpU IntFmt IntOp IsWindow LangString LicenseBkColor LicenseData LicenseForceSelection LicenseLangString LicenseText LoadLanguageFile LockWindow LogSet LogText ManifestDPIAware ManifestSupportedOS MessageBox MiscButtonText Name Nop OutFile Page PageCallbacks PageExEnd Pop Push Quit ReadEnvStr ReadINIStr ReadRegDWORD ReadRegStr Reboot RegDLL Rename RequestExecutionLevel ReserveFile Return RMDir SearchPath SectionEnd SectionGetFlags SectionGetInstTypes SectionGetSize SectionGetText SectionGroupEnd SectionIn SectionSetFlags SectionSetInstTypes SectionSetSize SectionSetText SendMessage SetAutoClose SetBrandingImage SetCompress SetCompressor SetCompressorDictSize SetCtlColors SetCurInstType SetDatablockOptimize SetDateSave SetDetailsPrint SetDetailsView SetErrorLevel SetErrors SetFileAttributes SetFont SetOutPath SetOverwrite SetRebootFlag SetRegView SetShellVarContext SetSilent ShowInstDetails ShowUninstDetails ShowWindow SilentInstall SilentUnInstall Sleep SpaceTexts StrCmp StrCmpS StrCpy StrLen SubCaption Unicode UninstallButtonText UninstallCaption UninstallIcon UninstallSubCaption UninstallText UninstPage UnRegDLL Var VIAddVersionKey VIFileVersion VIProductVersion WindowIcon WriteINIStr WriteRegBin WriteRegDWORD WriteRegExpandStr WriteRegStr WriteUninstaller XPStyle",
      literal: "admin all auto both bottom bzip2 colored components current custom directory false force hide highest ifdiff ifnewer instfiles lastused leave left license listonly lzma nevershow none normal notset off on open print right show silent silentlog smooth textonly top true try un.components un.custom un.directory un.instfiles un.license uninstConfirm user Win10 Win7 Win8 WinVista zlib"
    },
    c: [e.HCM, e.CBCM, e.C(";", "$", {
      r: 0
    }), {
      cN: "function",
      bK: "Function PageEx Section SectionGroup",
      e: "$"
    }, S, l, i, n, r, o, a, e.NM]
  };
});
hljs.registerLanguage("sqf", function (e) {
  var t = e.getLanguage("cpp").exports,
      a = {
    cN: "variable",
    b: /\b_+[a-zA-Z_]\w*/
  },
      o = {
    cN: "title",
    b: /[a-zA-Z][a-zA-Z0-9]+_fnc_\w*/
  },
      r = {
    cN: "string",
    v: [{
      b: '"',
      e: '"',
      c: [{
        b: '""',
        r: 0
      }]
    }, {
      b: "'",
      e: "'",
      c: [{
        b: "''",
        r: 0
      }]
    }]
  };
  return {
    aliases: ["sqf"],
    cI: !0,
    k: {
      keyword: "case catch default do else exit exitWith for forEach from if switch then throw to try waitUntil while with",
      built_in: "abs accTime acos action actionIDs actionKeys actionKeysImages actionKeysNames actionKeysNamesArray actionName actionParams activateAddons activatedAddons activateKey add3DENConnection add3DENEventHandler add3DENLayer addAction addBackpack addBackpackCargo addBackpackCargoGlobal addBackpackGlobal addCamShake addCuratorAddons addCuratorCameraArea addCuratorEditableObjects addCuratorEditingArea addCuratorPoints addEditorObject addEventHandler addGoggles addGroupIcon addHandgunItem addHeadgear addItem addItemCargo addItemCargoGlobal addItemPool addItemToBackpack addItemToUniform addItemToVest addLiveStats addMagazine addMagazineAmmoCargo addMagazineCargo addMagazineCargoGlobal addMagazineGlobal addMagazinePool addMagazines addMagazineTurret addMenu addMenuItem addMissionEventHandler addMPEventHandler addMusicEventHandler addOwnedMine addPlayerScores addPrimaryWeaponItem addPublicVariableEventHandler addRating addResources addScore addScoreSide addSecondaryWeaponItem addSwitchableUnit addTeamMember addToRemainsCollector addUniform addVehicle addVest addWaypoint addWeapon addWeaponCargo addWeaponCargoGlobal addWeaponGlobal addWeaponItem addWeaponPool addWeaponTurret agent agents AGLToASL aimedAtTarget aimPos airDensityRTD airportSide AISFinishHeal alive all3DENEntities allControls allCurators allCutLayers allDead allDeadMen allDisplays allGroups allMapMarkers allMines allMissionObjects allow3DMode allowCrewInImmobile allowCuratorLogicIgnoreAreas allowDamage allowDammage allowFileOperations allowFleeing allowGetIn allowSprint allPlayers allSites allTurrets allUnits allUnitsUAV allVariables ammo and animate animateDoor animateSource animationNames animationPhase animationSourcePhase animationState append apply armoryPoints arrayIntersect asin ASLToAGL ASLToATL assert assignAsCargo assignAsCargoIndex assignAsCommander assignAsDriver assignAsGunner assignAsTurret assignCurator assignedCargo assignedCommander assignedDriver assignedGunner assignedItems assignedTarget assignedTeam assignedVehicle assignedVehicleRole assignItem assignTeam assignToAirport atan atan2 atg ATLToASL attachedObject attachedObjects attachedTo attachObject attachTo attackEnabled backpack backpackCargo backpackContainer backpackItems backpackMagazines backpackSpaceFor behaviour benchmark binocular blufor boundingBox boundingBoxReal boundingCenter breakOut breakTo briefingName buildingExit buildingPos buttonAction buttonSetAction cadetMode call callExtension camCommand camCommit camCommitPrepared camCommitted camConstuctionSetParams camCreate camDestroy cameraEffect cameraEffectEnableHUD cameraInterest cameraOn cameraView campaignConfigFile camPreload camPreloaded camPrepareBank camPrepareDir camPrepareDive camPrepareFocus camPrepareFov camPrepareFovRange camPreparePos camPrepareRelPos camPrepareTarget camSetBank camSetDir camSetDive camSetFocus camSetFov camSetFovRange camSetPos camSetRelPos camSetTarget camTarget camUseNVG canAdd canAddItemToBackpack canAddItemToUniform canAddItemToVest cancelSimpleTaskDestination canFire canMove canSlingLoad canStand canSuspend canUnloadInCombat canVehicleCargo captive captiveNum cbChecked cbSetChecked ceil channelEnabled cheatsEnabled checkAIFeature checkVisibility civilian className clearAllItemsFromBackpack clearBackpackCargo clearBackpackCargoGlobal clearGroupIcons clearItemCargo clearItemCargoGlobal clearItemPool clearMagazineCargo clearMagazineCargoGlobal clearMagazinePool clearOverlay clearRadio clearWeaponCargo clearWeaponCargoGlobal clearWeaponPool clientOwner closeDialog closeDisplay closeOverlay collapseObjectTree collect3DENHistory combatMode commandArtilleryFire commandChat commander commandFire commandFollow commandFSM commandGetOut commandingMenu commandMove commandRadio commandStop commandSuppressiveFire commandTarget commandWatch comment commitOverlay compile compileFinal completedFSM composeText configClasses configFile configHierarchy configName configNull configProperties configSourceAddonList configSourceMod configSourceModList connectTerminalToUAV controlNull controlsGroupCtrl copyFromClipboard copyToClipboard copyWaypoints cos count countEnemy countFriendly countSide countType countUnknown create3DENComposition create3DENEntity createAgent createCenter createDialog createDiaryLink createDiaryRecord createDiarySubject createDisplay createGearDialog createGroup createGuardedPoint createLocation createMarker createMarkerLocal createMenu createMine createMissionDisplay createMPCampaignDisplay createSimpleObject createSimpleTask createSite createSoundSource createTask createTeam createTrigger createUnit createVehicle createVehicleCrew createVehicleLocal crew ctrlActivate ctrlAddEventHandler ctrlAngle ctrlAutoScrollDelay ctrlAutoScrollRewind ctrlAutoScrollSpeed ctrlChecked ctrlClassName ctrlCommit ctrlCommitted ctrlCreate ctrlDelete ctrlEnable ctrlEnabled ctrlFade ctrlHTMLLoaded ctrlIDC ctrlIDD ctrlMapAnimAdd ctrlMapAnimClear ctrlMapAnimCommit ctrlMapAnimDone ctrlMapCursor ctrlMapMouseOver ctrlMapScale ctrlMapScreenToWorld ctrlMapWorldToScreen ctrlModel ctrlModelDirAndUp ctrlModelScale ctrlParent ctrlParentControlsGroup ctrlPosition ctrlRemoveAllEventHandlers ctrlRemoveEventHandler ctrlScale ctrlSetActiveColor ctrlSetAngle ctrlSetAutoScrollDelay ctrlSetAutoScrollRewind ctrlSetAutoScrollSpeed ctrlSetBackgroundColor ctrlSetChecked ctrlSetEventHandler ctrlSetFade ctrlSetFocus ctrlSetFont ctrlSetFontH1 ctrlSetFontH1B ctrlSetFontH2 ctrlSetFontH2B ctrlSetFontH3 ctrlSetFontH3B ctrlSetFontH4 ctrlSetFontH4B ctrlSetFontH5 ctrlSetFontH5B ctrlSetFontH6 ctrlSetFontH6B ctrlSetFontHeight ctrlSetFontHeightH1 ctrlSetFontHeightH2 ctrlSetFontHeightH3 ctrlSetFontHeightH4 ctrlSetFontHeightH5 ctrlSetFontHeightH6 ctrlSetFontHeightSecondary ctrlSetFontP ctrlSetFontPB ctrlSetFontSecondary ctrlSetForegroundColor ctrlSetModel ctrlSetModelDirAndUp ctrlSetModelScale ctrlSetPosition ctrlSetScale ctrlSetStructuredText ctrlSetText ctrlSetTextColor ctrlSetTooltip ctrlSetTooltipColorBox ctrlSetTooltipColorShade ctrlSetTooltipColorText ctrlShow ctrlShown ctrlText ctrlTextHeight ctrlType ctrlVisible curatorAddons curatorCamera curatorCameraArea curatorCameraAreaCeiling curatorCoef curatorEditableObjects curatorEditingArea curatorEditingAreaType curatorMouseOver curatorPoints curatorRegisteredObjects curatorSelected curatorWaypointCost current3DENOperation currentChannel currentCommand currentMagazine currentMagazineDetail currentMagazineDetailTurret currentMagazineTurret currentMuzzle currentNamespace currentTask currentTasks currentThrowable currentVisionMode currentWaypoint currentWeapon currentWeaponMode currentWeaponTurret currentZeroing cursorObject cursorTarget customChat customRadio cutFadeOut cutObj cutRsc cutText damage date dateToNumber daytime deActivateKey debriefingText debugFSM debugLog deg delete3DENEntities deleteAt deleteCenter deleteCollection deleteEditorObject deleteGroup deleteIdentity deleteLocation deleteMarker deleteMarkerLocal deleteRange deleteResources deleteSite deleteStatus deleteTeam deleteVehicle deleteVehicleCrew deleteWaypoint detach detectedMines diag_activeMissionFSMs diag_activeScripts diag_activeSQFScripts diag_activeSQSScripts diag_captureFrame diag_captureSlowFrame diag_codePerformance diag_drawMode diag_enable diag_enabled diag_fps diag_fpsMin diag_frameNo diag_list diag_log diag_logSlowFrame diag_mergeConfigFile diag_recordTurretLimits diag_tickTime diag_toggle dialog diarySubjectExists didJIP didJIPOwner difficulty difficultyEnabled difficultyEnabledRTD difficultyOption direction directSay disableAI disableCollisionWith disableConversation disableDebriefingStats disableNVGEquipment disableRemoteSensors disableSerialization disableTIEquipment disableUAVConnectability disableUserInput displayAddEventHandler displayCtrl displayNull displayParent displayRemoveAllEventHandlers displayRemoveEventHandler displaySetEventHandler dissolveTeam distance distance2D distanceSqr distributionRegion do3DENAction doArtilleryFire doFire doFollow doFSM doGetOut doMove doorPhase doStop doSuppressiveFire doTarget doWatch drawArrow drawEllipse drawIcon drawIcon3D drawLine drawLine3D drawLink drawLocation drawPolygon drawRectangle driver drop east echo edit3DENMissionAttributes editObject editorSetEventHandler effectiveCommander emptyPositions enableAI enableAIFeature enableAimPrecision enableAttack enableAudioFeature enableCamShake enableCaustics enableChannel enableCollisionWith enableCopilot enableDebriefingStats enableDiagLegend enableEndDialog enableEngineArtillery enableEnvironment enableFatigue enableGunLights enableIRLasers enableMimics enablePersonTurret enableRadio enableReload enableRopeAttach enableSatNormalOnDetail enableSaving enableSentences enableSimulation enableSimulationGlobal enableStamina enableTeamSwitch enableUAVConnectability enableUAVWaypoints enableVehicleCargo endLoadingScreen endMission engineOn enginesIsOnRTD enginesRpmRTD enginesTorqueRTD entities estimatedEndServerTime estimatedTimeLeft evalObjectArgument everyBackpack everyContainer exec execEditorScript execFSM execVM exp expectedDestination exportJIPMessages eyeDirection eyePos face faction fadeMusic fadeRadio fadeSound fadeSpeech failMission fillWeaponsFromPool find findCover findDisplay findEditorObject findEmptyPosition findEmptyPositionReady findNearestEnemy finishMissionInit finite fire fireAtTarget firstBackpack flag flagOwner flagSide flagTexture fleeing floor flyInHeight flyInHeightASL fog fogForecast fogParams forceAddUniform forcedMap forceEnd forceMap forceRespawn forceSpeed forceWalk forceWeaponFire forceWeatherChange forEachMember forEachMemberAgent forEachMemberTeam format formation formationDirection formationLeader formationMembers formationPosition formationTask formatText formLeader freeLook fromEditor fuel fullCrew gearIDCAmmoCount gearSlotAmmoCount gearSlotData get3DENActionState get3DENAttribute get3DENCamera get3DENConnections get3DENEntity get3DENEntityID get3DENGrid get3DENIconsVisible get3DENLayerEntities get3DENLinesVisible get3DENMissionAttribute get3DENMouseOver get3DENSelected getAimingCoef getAllHitPointsDamage getAllOwnedMines getAmmoCargo getAnimAimPrecision getAnimSpeedCoef getArray getArtilleryAmmo getArtilleryComputerSettings getArtilleryETA getAssignedCuratorLogic getAssignedCuratorUnit getBackpackCargo getBleedingRemaining getBurningValue getCameraViewDirection getCargoIndex getCenterOfMass getClientState getClientStateNumber getConnectedUAV getCustomAimingCoef getDammage getDescription getDir getDirVisual getDLCs getEditorCamera getEditorMode getEditorObjectScope getElevationOffset getFatigue getFriend getFSMVariable getFuelCargo getGroupIcon getGroupIconParams getGroupIcons getHideFrom getHit getHitIndex getHitPointDamage getItemCargo getMagazineCargo getMarkerColor getMarkerPos getMarkerSize getMarkerType getMass getMissionConfig getMissionConfigValue getMissionDLCs getMissionLayerEntities getModelInfo getMousePosition getNumber getObjectArgument getObjectChildren getObjectDLC getObjectMaterials getObjectProxy getObjectTextures getObjectType getObjectViewDistance getOxygenRemaining getPersonUsedDLCs getPilotCameraDirection getPilotCameraPosition getPilotCameraRotation getPilotCameraTarget getPlayerChannel getPlayerScores getPlayerUID getPos getPosASL getPosASLVisual getPosASLW getPosATL getPosATLVisual getPosVisual getPosWorld getRelDir getRelPos getRemoteSensorsDisabled getRepairCargo getResolution getShadowDistance getShotParents getSlingLoad getSpeed getStamina getStatValue getSuppression getTerrainHeightASL getText getUnitLoadout getUnitTrait getVariable getVehicleCargo getWeaponCargo getWeaponSway getWPPos glanceAt globalChat globalRadio goggles goto group groupChat groupFromNetId groupIconSelectable groupIconsVisible groupId groupOwner groupRadio groupSelectedUnits groupSelectUnit grpNull gunner gusts halt handgunItems handgunMagazine handgunWeapon handsHit hasInterface hasPilotCamera hasWeapon hcAllGroups hcGroupParams hcLeader hcRemoveAllGroups hcRemoveGroup hcSelected hcSelectGroup hcSetGroup hcShowBar hcShownBar headgear hideBody hideObject hideObjectGlobal hideSelection hint hintC hintCadet hintSilent hmd hostMission htmlLoad HUDMovementLevels humidity image importAllGroups importance in inArea inAreaArray incapacitatedState independent inflame inflamed inGameUISetEventHandler inheritsFrom initAmbientLife inPolygon inputAction inRangeOfArtillery insertEditorObject intersect is3DEN is3DENMultiplayer isAbleToBreathe isAgent isArray isAutoHoverOn isAutonomous isAutotest isBleeding isBurning isClass isCollisionLightOn isCopilotEnabled isDedicated isDLCAvailable isEngineOn isEqualTo isEqualType isEqualTypeAll isEqualTypeAny isEqualTypeArray isEqualTypeParams isFilePatchingEnabled isFlashlightOn isFlatEmpty isForcedWalk isFormationLeader isHidden isInRemainsCollector isInstructorFigureEnabled isIRLaserOn isKeyActive isKindOf isLightOn isLocalized isManualFire isMarkedForCollection isMultiplayer isMultiplayerSolo isNil isNull isNumber isObjectHidden isObjectRTD isOnRoad isPipEnabled isPlayer isRealTime isRemoteExecuted isRemoteExecutedJIP isServer isShowing3DIcons isSprintAllowed isStaminaEnabled isSteamMission isStreamFriendlyUIEnabled isText isTouchingGround isTurnedOut isTutHintsEnabled isUAVConnectable isUAVConnected isUniformAllowed isVehicleCargo isWalking isWeaponDeployed isWeaponRested itemCargo items itemsWithMagazines join joinAs joinAsSilent joinSilent joinString kbAddDatabase kbAddDatabaseTargets kbAddTopic kbHasTopic kbReact kbRemoveTopic kbTell kbWasSaid keyImage keyName knowsAbout land landAt landResult language laserTarget lbAdd lbClear lbColor lbCurSel lbData lbDelete lbIsSelected lbPicture lbSelection lbSetColor lbSetCurSel lbSetData lbSetPicture lbSetPictureColor lbSetPictureColorDisabled lbSetPictureColorSelected lbSetSelectColor lbSetSelectColorRight lbSetSelected lbSetTooltip lbSetValue lbSize lbSort lbSortByValue lbText lbValue leader leaderboardDeInit leaderboardGetRows leaderboardInit leaveVehicle libraryCredits libraryDisclaimers lifeState lightAttachObject lightDetachObject lightIsOn lightnings limitSpeed linearConversion lineBreak lineIntersects lineIntersectsObjs lineIntersectsSurfaces lineIntersectsWith linkItem list listObjects ln lnbAddArray lnbAddColumn lnbAddRow lnbClear lnbColor lnbCurSelRow lnbData lnbDeleteColumn lnbDeleteRow lnbGetColumnsPosition lnbPicture lnbSetColor lnbSetColumnsPos lnbSetCurSelRow lnbSetData lnbSetPicture lnbSetText lnbSetValue lnbSize lnbText lnbValue load loadAbs loadBackpack loadFile loadGame loadIdentity loadMagazine loadOverlay loadStatus loadUniform loadVest local localize locationNull locationPosition lock lockCameraTo lockCargo lockDriver locked lockedCargo lockedDriver lockedTurret lockIdentity lockTurret lockWP log logEntities logNetwork logNetworkTerminate lookAt lookAtPos magazineCargo magazines magazinesAllTurrets magazinesAmmo magazinesAmmoCargo magazinesAmmoFull magazinesDetail magazinesDetailBackpack magazinesDetailUniform magazinesDetailVest magazinesTurret magazineTurretAmmo mapAnimAdd mapAnimClear mapAnimCommit mapAnimDone mapCenterOnCamera mapGridPosition markAsFinishedOnSteam markerAlpha markerBrush markerColor markerDir markerPos markerShape markerSize markerText markerType max members menuAction menuAdd menuChecked menuClear menuCollapse menuData menuDelete menuEnable menuEnabled menuExpand menuHover menuPicture menuSetAction menuSetCheck menuSetData menuSetPicture menuSetValue menuShortcut menuShortcutText menuSize menuSort menuText menuURL menuValue min mineActive mineDetectedBy missionConfigFile missionDifficulty missionName missionNamespace missionStart missionVersion mod modelToWorld modelToWorldVisual modParams moonIntensity moonPhase morale move move3DENCamera moveInAny moveInCargo moveInCommander moveInDriver moveInGunner moveInTurret moveObjectToEnd moveOut moveTime moveTo moveToCompleted moveToFailed musicVolume name nameSound nearEntities nearestBuilding nearestLocation nearestLocations nearestLocationWithDubbing nearestObject nearestObjects nearestTerrainObjects nearObjects nearObjectsReady nearRoads nearSupplies nearTargets needReload netId netObjNull newOverlay nextMenuItemIndex nextWeatherChange nMenuItems not numberToDate objectCurators objectFromNetId objectParent objNull objStatus onBriefingGroup onBriefingNotes onBriefingPlan onBriefingTeamSwitch onCommandModeChanged onDoubleClick onEachFrame onGroupIconClick onGroupIconOverEnter onGroupIconOverLeave onHCGroupSelectionChanged onMapSingleClick onPlayerConnected onPlayerDisconnected onPreloadFinished onPreloadStarted onShowNewObject onTeamSwitch openCuratorInterface openDLCPage openMap openYoutubeVideo opfor or orderGetIn overcast overcastForecast owner param params parseNumber parseText parsingNamespace particlesQuality pi pickWeaponPool pitch pixelGrid pixelGridBase pixelGridNoUIScale pixelH pixelW playableSlotsNumber playableUnits playAction playActionNow player playerRespawnTime playerSide playersNumber playGesture playMission playMove playMoveNow playMusic playScriptedMission playSound playSound3D position positionCameraToWorld posScreenToWorld posWorldToScreen ppEffectAdjust ppEffectCommit ppEffectCommitted ppEffectCreate ppEffectDestroy ppEffectEnable ppEffectEnabled ppEffectForceInNVG precision preloadCamera preloadObject preloadSound preloadTitleObj preloadTitleRsc preprocessFile preprocessFileLineNumbers primaryWeapon primaryWeaponItems primaryWeaponMagazine priority private processDiaryLink productVersion profileName profileNamespace profileNameSteam progressLoadingScreen progressPosition progressSetPosition publicVariable publicVariableClient publicVariableServer pushBack pushBackUnique putWeaponPool queryItemsPool queryMagazinePool queryWeaponPool rad radioChannelAdd radioChannelCreate radioChannelRemove radioChannelSetCallSign radioChannelSetLabel radioVolume rain rainbow random rank rankId rating rectangular registeredTasks registerTask reload reloadEnabled remoteControl remoteExec remoteExecCall remove3DENConnection remove3DENEventHandler remove3DENLayer removeAction removeAll3DENEventHandlers removeAllActions removeAllAssignedItems removeAllContainers removeAllCuratorAddons removeAllCuratorCameraAreas removeAllCuratorEditingAreas removeAllEventHandlers removeAllHandgunItems removeAllItems removeAllItemsWithMagazines removeAllMissionEventHandlers removeAllMPEventHandlers removeAllMusicEventHandlers removeAllOwnedMines removeAllPrimaryWeaponItems removeAllWeapons removeBackpack removeBackpackGlobal removeCuratorAddons removeCuratorCameraArea removeCuratorEditableObjects removeCuratorEditingArea removeDrawIcon removeDrawLinks removeEventHandler removeFromRemainsCollector removeGoggles removeGroupIcon removeHandgunItem removeHeadgear removeItem removeItemFromBackpack removeItemFromUniform removeItemFromVest removeItems removeMagazine removeMagazineGlobal removeMagazines removeMagazinesTurret removeMagazineTurret removeMenuItem removeMissionEventHandler removeMPEventHandler removeMusicEventHandler removeOwnedMine removePrimaryWeaponItem removeSecondaryWeaponItem removeSimpleTask removeSwitchableUnit removeTeamMember removeUniform removeVest removeWeapon removeWeaponGlobal removeWeaponTurret requiredVersion resetCamShake resetSubgroupDirection resistance resize resources respawnVehicle restartEditorCamera reveal revealMine reverse reversedMouseY roadAt roadsConnectedTo roleDescription ropeAttachedObjects ropeAttachedTo ropeAttachEnabled ropeAttachTo ropeCreate ropeCut ropeDestroy ropeDetach ropeEndPosition ropeLength ropes ropeUnwind ropeUnwound rotorsForcesRTD rotorsRpmRTD round runInitScript safeZoneH safeZoneW safeZoneWAbs safeZoneX safeZoneXAbs safeZoneY save3DENInventory saveGame saveIdentity saveJoysticks saveOverlay saveProfileNamespace saveStatus saveVar savingEnabled say say2D say3D scopeName score scoreSide screenshot screenToWorld scriptDone scriptName scriptNull scudState secondaryWeapon secondaryWeaponItems secondaryWeaponMagazine select selectBestPlaces selectDiarySubject selectedEditorObjects selectEditorObject selectionNames selectionPosition selectLeader selectMax selectMin selectNoPlayer selectPlayer selectRandom selectWeapon selectWeaponTurret sendAUMessage sendSimpleCommand sendTask sendTaskResult sendUDPMessage serverCommand serverCommandAvailable serverCommandExecutable serverName serverTime set set3DENAttribute set3DENAttributes set3DENGrid set3DENIconsVisible set3DENLayer set3DENLinesVisible set3DENMissionAttributes set3DENModelsVisible set3DENObjectType set3DENSelected setAccTime setAirportSide setAmmo setAmmoCargo setAnimSpeedCoef setAperture setApertureNew setArmoryPoints setAttributes setAutonomous setBehaviour setBleedingRemaining setCameraInterest setCamShakeDefParams setCamShakeParams setCamUseTi setCaptive setCenterOfMass setCollisionLight setCombatMode setCompassOscillation setCuratorCameraAreaCeiling setCuratorCoef setCuratorEditingAreaType setCuratorWaypointCost setCurrentChannel setCurrentTask setCurrentWaypoint setCustomAimCoef setDamage setDammage setDate setDebriefingText setDefaultCamera setDestination setDetailMapBlendPars setDir setDirection setDrawIcon setDropInterval setEditorMode setEditorObjectScope setEffectCondition setFace setFaceAnimation setFatigue setFlagOwner setFlagSide setFlagTexture setFog setFormation setFormationTask setFormDir setFriend setFromEditor setFSMVariable setFuel setFuelCargo setGroupIcon setGroupIconParams setGroupIconsSelectable setGroupIconsVisible setGroupId setGroupIdGlobal setGroupOwner setGusts setHideBehind setHit setHitIndex setHitPointDamage setHorizonParallaxCoef setHUDMovementLevels setIdentity setImportance setLeader setLightAmbient setLightAttenuation setLightBrightness setLightColor setLightDayLight setLightFlareMaxDistance setLightFlareSize setLightIntensity setLightnings setLightUseFlare setLocalWindParams setMagazineTurretAmmo setMarkerAlpha setMarkerAlphaLocal setMarkerBrush setMarkerBrushLocal setMarkerColor setMarkerColorLocal setMarkerDir setMarkerDirLocal setMarkerPos setMarkerPosLocal setMarkerShape setMarkerShapeLocal setMarkerSize setMarkerSizeLocal setMarkerText setMarkerTextLocal setMarkerType setMarkerTypeLocal setMass setMimic setMousePosition setMusicEffect setMusicEventHandler setName setNameSound setObjectArguments setObjectMaterial setObjectMaterialGlobal setObjectProxy setObjectTexture setObjectTextureGlobal setObjectViewDistance setOvercast setOwner setOxygenRemaining setParticleCircle setParticleClass setParticleFire setParticleParams setParticleRandom setPilotCameraDirection setPilotCameraRotation setPilotCameraTarget setPilotLight setPiPEffect setPitch setPlayable setPlayerRespawnTime setPos setPosASL setPosASL2 setPosASLW setPosATL setPosition setPosWorld setRadioMsg setRain setRainbow setRandomLip setRank setRectangular setRepairCargo setShadowDistance setShotParents setSide setSimpleTaskAlwaysVisible setSimpleTaskCustomData setSimpleTaskDescription setSimpleTaskDestination setSimpleTaskTarget setSimpleTaskType setSimulWeatherLayers setSize setSkill setSlingLoad setSoundEffect setSpeaker setSpeech setSpeedMode setStamina setStaminaScheme setStatValue setSuppression setSystemOfUnits setTargetAge setTaskResult setTaskState setTerrainGrid setText setTimeMultiplier setTitleEffect setTriggerActivation setTriggerArea setTriggerStatements setTriggerText setTriggerTimeout setTriggerType setType setUnconscious setUnitAbility setUnitLoadout setUnitPos setUnitPosWeak setUnitRank setUnitRecoilCoefficient setUnitTrait setUnloadInCombat setUserActionText setVariable setVectorDir setVectorDirAndUp setVectorUp setVehicleAmmo setVehicleAmmoDef setVehicleArmor setVehicleCargo setVehicleId setVehicleLock setVehiclePosition setVehicleTiPars setVehicleVarName setVelocity setVelocityTransformation setViewDistance setVisibleIfTreeCollapsed setWaves setWaypointBehaviour setWaypointCombatMode setWaypointCompletionRadius setWaypointDescription setWaypointForceBehaviour setWaypointFormation setWaypointHousePosition setWaypointLoiterRadius setWaypointLoiterType setWaypointName setWaypointPosition setWaypointScript setWaypointSpeed setWaypointStatements setWaypointTimeout setWaypointType setWaypointVisible setWeaponReloadingTime setWind setWindDir setWindForce setWindStr setWPPos show3DIcons showChat showCinemaBorder showCommandingMenu showCompass showCuratorCompass showGPS showHUD showLegend showMap shownArtilleryComputer shownChat shownCompass shownCuratorCompass showNewEditorObject shownGPS shownHUD shownMap shownPad shownRadio shownScoretable shownUAVFeed shownWarrant shownWatch showPad showRadio showScoretable showSubtitles showUAVFeed showWarrant showWatch showWaypoint showWaypoints side sideAmbientLife sideChat sideEmpty sideEnemy sideFriendly sideLogic sideRadio sideUnknown simpleTasks simulationEnabled simulCloudDensity simulCloudOcclusion simulInClouds simulWeatherSync sin size sizeOf skill skillFinal skipTime sleep sliderPosition sliderRange sliderSetPosition sliderSetRange sliderSetSpeed sliderSpeed slingLoadAssistantShown soldierMagazines someAmmo sort soundVolume spawn speaker speed speedMode splitString sqrt squadParams stance startLoadingScreen step stop stopEngineRTD stopped str sunOrMoon supportInfo suppressFor surfaceIsWater surfaceNormal surfaceType swimInDepth switchableUnits switchAction switchCamera switchGesture switchLight switchMove synchronizedObjects synchronizedTriggers synchronizedWaypoints synchronizeObjectsAdd synchronizeObjectsRemove synchronizeTrigger synchronizeWaypoint systemChat systemOfUnits tan targetKnowledge targetsAggregate targetsQuery taskAlwaysVisible taskChildren taskCompleted taskCustomData taskDescription taskDestination taskHint taskMarkerOffset taskNull taskParent taskResult taskState taskType teamMember teamMemberNull teamName teams teamSwitch teamSwitchEnabled teamType terminate terrainIntersect terrainIntersectASL text textLog textLogFormat tg time timeMultiplier titleCut titleFadeOut titleObj titleRsc titleText toArray toFixed toLower toString toUpper triggerActivated triggerActivation triggerArea triggerAttachedVehicle triggerAttachObject triggerAttachVehicle triggerStatements triggerText triggerTimeout triggerTimeoutCurrent triggerType turretLocal turretOwner turretUnit tvAdd tvClear tvCollapse tvCount tvCurSel tvData tvDelete tvExpand tvPicture tvSetCurSel tvSetData tvSetPicture tvSetPictureColor tvSetPictureColorDisabled tvSetPictureColorSelected tvSetPictureRight tvSetPictureRightColor tvSetPictureRightColorDisabled tvSetPictureRightColorSelected tvSetText tvSetTooltip tvSetValue tvSort tvSortByValue tvText tvTooltip tvValue type typeName typeOf UAVControl uiNamespace uiSleep unassignCurator unassignItem unassignTeam unassignVehicle underwater uniform uniformContainer uniformItems uniformMagazines unitAddons unitAimPosition unitAimPositionVisual unitBackpack unitIsUAV unitPos unitReady unitRecoilCoefficient units unitsBelowHeight unlinkItem unlockAchievement unregisterTask updateDrawIcon updateMenuItem updateObjectTree useAISteeringComponent useAudioTimeForMoves vectorAdd vectorCos vectorCrossProduct vectorDiff vectorDir vectorDirVisual vectorDistance vectorDistanceSqr vectorDotProduct vectorFromTo vectorMagnitude vectorMagnitudeSqr vectorMultiply vectorNormalized vectorUp vectorUpVisual vehicle vehicleCargoEnabled vehicleChat vehicleRadio vehicles vehicleVarName velocity velocityModelSpace verifySignature vest vestContainer vestItems vestMagazines viewDistance visibleCompass visibleGPS visibleMap visiblePosition visiblePositionASL visibleScoretable visibleWatch waves waypointAttachedObject waypointAttachedVehicle waypointAttachObject waypointAttachVehicle waypointBehaviour waypointCombatMode waypointCompletionRadius waypointDescription waypointForceBehaviour waypointFormation waypointHousePosition waypointLoiterRadius waypointLoiterType waypointName waypointPosition waypoints waypointScript waypointsEnabledUAV waypointShow waypointSpeed waypointStatements waypointTimeout waypointTimeoutCurrent waypointType waypointVisible weaponAccessories weaponAccessoriesCargo weaponCargo weaponDirection weaponInertia weaponLowered weapons weaponsItems weaponsItemsCargo weaponState weaponsTurret weightRTD west WFSideText wind",
      literal: "true false nil"
    },
    c: [e.CLCM, e.CBCM, e.NM, a, o, r, t.preprocessor],
    i: /#/
  };
});
hljs.registerLanguage("dsconfig", function (e) {
  var i = {
    cN: "string",
    b: /"/,
    e: /"/
  },
      r = {
    cN: "string",
    b: /'/,
    e: /'/
  },
      s = {
    cN: "string",
    b: "[\\w-?]+:\\w+",
    e: "\\W",
    r: 0
  },
      t = {
    cN: "string",
    b: "\\w+-?\\w+",
    e: "\\W",
    r: 0
  };
  return {
    k: "dsconfig",
    c: [{
      cN: "keyword",
      b: "^dsconfig",
      e: "\\s",
      eE: !0,
      r: 10
    }, {
      cN: "built_in",
      b: "(list|create|get|set|delete)-(\\w+)",
      e: "\\s",
      eE: !0,
      i: "!@#$%^&*()",
      r: 10
    }, {
      cN: "built_in",
      b: "--(\\w+)",
      e: "\\s",
      eE: !0
    }, i, r, s, t, e.HCM]
  };
});
hljs.registerLanguage("apache", function (e) {
  var r = {
    cN: "number",
    b: "[\\$%]\\d+"
  };
  return {
    aliases: ["apacheconf"],
    cI: !0,
    c: [e.HCM, {
      cN: "section",
      b: "</?",
      e: ">"
    }, {
      cN: "attribute",
      b: /\w+/,
      r: 0,
      k: {
        nomarkup: "order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"
      },
      starts: {
        e: /$/,
        r: 0,
        k: {
          literal: "on off all"
        },
        c: [{
          cN: "meta",
          b: "\\s\\[",
          e: "\\]$"
        }, {
          cN: "variable",
          b: "[\\$%]\\{",
          e: "\\}",
          c: ["self", r]
        }, r, e.QSM]
      }
    }],
    i: /\S/
  };
});
hljs.registerLanguage("erb", function (e) {
  return {
    sL: "xml",
    c: [e.C("<%#", "%>"), {
      b: "<%[%=-]?",
      e: "[%-]?%>",
      sL: "ruby",
      eB: !0,
      eE: !0
    }]
  };
});
hljs.registerLanguage("gauss", function (e) {
  var t = {
    keyword: "and bool break call callexe checkinterrupt clear clearg closeall cls comlog compile continue create debug declare delete disable dlibrary dllcall do dos ed edit else elseif enable end endfor endif endp endo errorlog errorlogat expr external fn for format goto gosub graph if keyword let lib library line load loadarray loadexe loadf loadk loadm loadp loads loadx local locate loopnextindex lprint lpwidth lshow matrix msym ndpclex new not open or output outwidth plot plotsym pop prcsn print printdos proc push retp return rndcon rndmod rndmult rndseed run save saveall screen scroll setarray show sparse stop string struct system trace trap threadfor threadendfor threadbegin threadjoin threadstat threadend until use while winprint",
    built_in: "abs acf aconcat aeye amax amean AmericanBinomCall AmericanBinomCall_Greeks AmericanBinomCall_ImpVol AmericanBinomPut AmericanBinomPut_Greeks AmericanBinomPut_ImpVol AmericanBSCall AmericanBSCall_Greeks AmericanBSCall_ImpVol AmericanBSPut AmericanBSPut_Greeks AmericanBSPut_ImpVol amin amult annotationGetDefaults annotationSetBkd annotationSetFont annotationSetLineColor annotationSetLineStyle annotationSetLineThickness annualTradingDays arccos arcsin areshape arrayalloc arrayindex arrayinit arraytomat asciiload asclabel astd astds asum atan atan2 atranspose axmargin balance band bandchol bandcholsol bandltsol bandrv bandsolpd bar base10 begwind besselj bessely beta box boxcox cdfBeta cdfBetaInv cdfBinomial cdfBinomialInv cdfBvn cdfBvn2 cdfBvn2e cdfCauchy cdfCauchyInv cdfChic cdfChii cdfChinc cdfChincInv cdfExp cdfExpInv cdfFc cdfFnc cdfFncInv cdfGam cdfGenPareto cdfHyperGeo cdfLaplace cdfLaplaceInv cdfLogistic cdfLogisticInv cdfmControlCreate cdfMvn cdfMvn2e cdfMvnce cdfMvne cdfMvt2e cdfMvtce cdfMvte cdfN cdfN2 cdfNc cdfNegBinomial cdfNegBinomialInv cdfNi cdfPoisson cdfPoissonInv cdfRayleigh cdfRayleighInv cdfTc cdfTci cdfTnc cdfTvn cdfWeibull cdfWeibullInv cdir ceil ChangeDir chdir chiBarSquare chol choldn cholsol cholup chrs close code cols colsf combinate combinated complex con cond conj cons ConScore contour conv convertsatostr convertstrtosa corrm corrms corrvc corrx corrxs cos cosh counts countwts crossprd crout croutp csrcol csrlin csvReadM csvReadSA cumprodc cumsumc curve cvtos datacreate datacreatecomplex datalist dataload dataloop dataopen datasave date datestr datestring datestrymd dayinyr dayofweek dbAddDatabase dbClose dbCommit dbCreateQuery dbExecQuery dbGetConnectOptions dbGetDatabaseName dbGetDriverName dbGetDrivers dbGetHostName dbGetLastErrorNum dbGetLastErrorText dbGetNumericalPrecPolicy dbGetPassword dbGetPort dbGetTableHeaders dbGetTables dbGetUserName dbHasFeature dbIsDriverAvailable dbIsOpen dbIsOpenError dbOpen dbQueryBindValue dbQueryClear dbQueryCols dbQueryExecPrepared dbQueryFetchAllM dbQueryFetchAllSA dbQueryFetchOneM dbQueryFetchOneSA dbQueryFinish dbQueryGetBoundValue dbQueryGetBoundValues dbQueryGetField dbQueryGetLastErrorNum dbQueryGetLastErrorText dbQueryGetLastInsertID dbQueryGetLastQuery dbQueryGetPosition dbQueryIsActive dbQueryIsForwardOnly dbQueryIsNull dbQueryIsSelect dbQueryIsValid dbQueryPrepare dbQueryRows dbQuerySeek dbQuerySeekFirst dbQuerySeekLast dbQuerySeekNext dbQuerySeekPrevious dbQuerySetForwardOnly dbRemoveDatabase dbRollback dbSetConnectOptions dbSetDatabaseName dbSetHostName dbSetNumericalPrecPolicy dbSetPort dbSetUserName dbTransaction DeleteFile delif delrows denseToSp denseToSpRE denToZero design det detl dfft dffti diag diagrv digamma doswin DOSWinCloseall DOSWinOpen dotfeq dotfeqmt dotfge dotfgemt dotfgt dotfgtmt dotfle dotflemt dotflt dotfltmt dotfne dotfnemt draw drop dsCreate dstat dstatmt dstatmtControlCreate dtdate dtday dttime dttodtv dttostr dttoutc dtvnormal dtvtodt dtvtoutc dummy dummybr dummydn eig eigh eighv eigv elapsedTradingDays endwind envget eof eqSolve eqSolvemt eqSolvemtControlCreate eqSolvemtOutCreate eqSolveset erf erfc erfccplx erfcplx error etdays ethsec etstr EuropeanBinomCall EuropeanBinomCall_Greeks EuropeanBinomCall_ImpVol EuropeanBinomPut EuropeanBinomPut_Greeks EuropeanBinomPut_ImpVol EuropeanBSCall EuropeanBSCall_Greeks EuropeanBSCall_ImpVol EuropeanBSPut EuropeanBSPut_Greeks EuropeanBSPut_ImpVol exctsmpl exec execbg exp extern eye fcheckerr fclearerr feq feqmt fflush fft ffti fftm fftmi fftn fge fgemt fgets fgetsa fgetsat fgetst fgt fgtmt fileinfo filesa fle flemt floor flt fltmt fmod fne fnemt fonts fopen formatcv formatnv fputs fputst fseek fstrerror ftell ftocv ftos ftostrC gamma gammacplx gammaii gausset gdaAppend gdaCreate gdaDStat gdaDStatMat gdaGetIndex gdaGetName gdaGetNames gdaGetOrders gdaGetType gdaGetTypes gdaGetVarInfo gdaIsCplx gdaLoad gdaPack gdaRead gdaReadByIndex gdaReadSome gdaReadSparse gdaReadStruct gdaReportVarInfo gdaSave gdaUpdate gdaUpdateAndPack gdaVars gdaWrite gdaWrite32 gdaWriteSome getarray getdims getf getGAUSShome getmatrix getmatrix4D getname getnamef getNextTradingDay getNextWeekDay getnr getorders getpath getPreviousTradingDay getPreviousWeekDay getRow getscalar3D getscalar4D getTrRow getwind glm gradcplx gradMT gradMTm gradMTT gradMTTm gradp graphprt graphset hasimag header headermt hess hessMT hessMTg hessMTgw hessMTm hessMTmw hessMTT hessMTTg hessMTTgw hessMTTm hessMTw hessp hist histf histp hsec imag indcv indexcat indices indices2 indicesf indicesfn indnv indsav integrate1d integrateControlCreate intgrat2 intgrat3 inthp1 inthp2 inthp3 inthp4 inthpControlCreate intquad1 intquad2 intquad3 intrleav intrleavsa intrsect intsimp inv invpd invswp iscplx iscplxf isden isinfnanmiss ismiss key keyav keyw lag lag1 lagn lapEighb lapEighi lapEighvb lapEighvi lapgEig lapgEigh lapgEighv lapgEigv lapgSchur lapgSvdcst lapgSvds lapgSvdst lapSvdcusv lapSvds lapSvdusv ldlp ldlsol linSolve listwise ln lncdfbvn lncdfbvn2 lncdfmvn lncdfn lncdfn2 lncdfnc lnfact lngammacplx lnpdfmvn lnpdfmvt lnpdfn lnpdft loadd loadstruct loadwind loess loessmt loessmtControlCreate log loglog logx logy lower lowmat lowmat1 ltrisol lu lusol machEpsilon make makevars makewind margin matalloc matinit mattoarray maxbytes maxc maxindc maxv maxvec mbesselei mbesselei0 mbesselei1 mbesseli mbesseli0 mbesseli1 meanc median mergeby mergevar minc minindc minv miss missex missrv moment momentd movingave movingaveExpwgt movingaveWgt nextindex nextn nextnevn nextwind ntos null null1 numCombinations ols olsmt olsmtControlCreate olsqr olsqr2 olsqrmt ones optn optnevn orth outtyp pacf packedToSp packr parse pause pdfCauchy pdfChi pdfExp pdfGenPareto pdfHyperGeo pdfLaplace pdfLogistic pdfn pdfPoisson pdfRayleigh pdfWeibull pi pinv pinvmt plotAddArrow plotAddBar plotAddBox plotAddHist plotAddHistF plotAddHistP plotAddPolar plotAddScatter plotAddShape plotAddTextbox plotAddTS plotAddXY plotArea plotBar plotBox plotClearLayout plotContour plotCustomLayout plotGetDefaults plotHist plotHistF plotHistP plotLayout plotLogLog plotLogX plotLogY plotOpenWindow plotPolar plotSave plotScatter plotSetAxesPen plotSetBar plotSetBarFill plotSetBarStacked plotSetBkdColor plotSetFill plotSetGrid plotSetLegend plotSetLineColor plotSetLineStyle plotSetLineSymbol plotSetLineThickness plotSetNewWindow plotSetTitle plotSetWhichYAxis plotSetXAxisShow plotSetXLabel plotSetXRange plotSetXTicInterval plotSetXTicLabel plotSetYAxisShow plotSetYLabel plotSetYRange plotSetZAxisShow plotSetZLabel plotSurface plotTS plotXY polar polychar polyeval polygamma polyint polymake polymat polymroot polymult polyroot pqgwin previousindex princomp printfm printfmt prodc psi putarray putf putvals pvCreate pvGetIndex pvGetParNames pvGetParVector pvLength pvList pvPack pvPacki pvPackm pvPackmi pvPacks pvPacksi pvPacksm pvPacksmi pvPutParVector pvTest pvUnpack QNewton QNewtonmt QNewtonmtControlCreate QNewtonmtOutCreate QNewtonSet QProg QProgmt QProgmtInCreate qqr qqre qqrep qr qre qrep qrsol qrtsol qtyr qtyre qtyrep quantile quantiled qyr qyre qyrep qz rank rankindx readr real reclassify reclassifyCuts recode recserar recsercp recserrc rerun rescale reshape rets rev rfft rffti rfftip rfftn rfftnp rfftp rndBernoulli rndBeta rndBinomial rndCauchy rndChiSquare rndCon rndCreateState rndExp rndGamma rndGeo rndGumbel rndHyperGeo rndi rndKMbeta rndKMgam rndKMi rndKMn rndKMnb rndKMp rndKMu rndKMvm rndLaplace rndLCbeta rndLCgam rndLCi rndLCn rndLCnb rndLCp rndLCu rndLCvm rndLogNorm rndMTu rndMVn rndMVt rndn rndnb rndNegBinomial rndp rndPoisson rndRayleigh rndStateSkip rndu rndvm rndWeibull rndWishart rotater round rows rowsf rref sampleData satostrC saved saveStruct savewind scale scale3d scalerr scalinfnanmiss scalmiss schtoc schur searchsourcepath seekr select selif seqa seqm setdif setdifsa setvars setvwrmode setwind shell shiftr sin singleindex sinh sleep solpd sortc sortcc sortd sorthc sorthcc sortind sortindc sortmc sortr sortrc spBiconjGradSol spChol spConjGradSol spCreate spDenseSubmat spDiagRvMat spEigv spEye spLDL spline spLU spNumNZE spOnes spreadSheetReadM spreadSheetReadSA spreadSheetWrite spScale spSubmat spToDense spTrTDense spTScalar spZeros sqpSolve sqpSolveMT sqpSolveMTControlCreate sqpSolveMTlagrangeCreate sqpSolveMToutCreate sqpSolveSet sqrt statements stdc stdsc stocv stof strcombine strindx strlen strput strrindx strsect strsplit strsplitPad strtodt strtof strtofcplx strtriml strtrimr strtrunc strtruncl strtruncpad strtruncr submat subscat substute subvec sumc sumr surface svd svd1 svd2 svdcusv svds svdusv sysstate tab tan tanh tempname threadBegin threadEnd threadEndFor threadFor threadJoin threadStat time timedt timestr timeutc title tkf2eps tkf2ps tocart todaydt toeplitz token topolar trapchk trigamma trimr trunc type typecv typef union unionsa uniqindx uniqindxsa unique uniquesa upmat upmat1 upper utctodt utctodtv utrisol vals varCovMS varCovXS varget vargetl varmall varmares varput varputl vartypef vcm vcms vcx vcxs vec vech vecr vector vget view viewxyz vlist vnamecv volume vput vread vtypecv wait waitc walkindex where window writer xlabel xlsGetSheetCount xlsGetSheetSize xlsGetSheetTypes xlsMakeRange xlsReadM xlsReadSA xlsWrite xlsWriteM xlsWriteSA xpnd xtics xy xyz ylabel ytics zeros zeta zlabel ztics cdfEmpirical dot h5create h5open h5read h5readAttribute h5write h5writeAttribute ldl plotAddErrorBar plotAddSurface plotCDFEmpirical plotSetColormap plotSetContourLabels plotSetLegendFont plotSetTextInterpreter plotSetXTicCount plotSetYTicCount plotSetZLevels powerm strjoin strtrim sylvester",
    literal: "DB_AFTER_LAST_ROW DB_ALL_TABLES DB_BATCH_OPERATIONS DB_BEFORE_FIRST_ROW DB_BLOB DB_EVENT_NOTIFICATIONS DB_FINISH_QUERY DB_HIGH_PRECISION DB_LAST_INSERT_ID DB_LOW_PRECISION_DOUBLE DB_LOW_PRECISION_INT32 DB_LOW_PRECISION_INT64 DB_LOW_PRECISION_NUMBERS DB_MULTIPLE_RESULT_SETS DB_NAMED_PLACEHOLDERS DB_POSITIONAL_PLACEHOLDERS DB_PREPARED_QUERIES DB_QUERY_SIZE DB_SIMPLE_LOCKING DB_SYSTEM_TABLES DB_TABLES DB_TRANSACTIONS DB_UNICODE DB_VIEWS"
  },
      a = {
    cN: "meta",
    b: "#",
    e: "$",
    k: {
      "meta-keyword": "define definecs|10 undef ifdef ifndef iflight ifdllcall ifmac ifos2win ifunix else endif lineson linesoff srcfile srcline"
    },
    c: [{
      b: /\\\n/,
      r: 0
    }, {
      bK: "include",
      e: "$",
      k: {
        "meta-keyword": "include"
      },
      c: [{
        cN: "meta-string",
        b: '"',
        e: '"',
        i: "\\n"
      }]
    }, e.CLCM, e.CBCM]
  },
      r = e.UIR + "\\s*\\(?",
      o = [{
    cN: "params",
    b: /\(/,
    e: /\)/,
    k: t,
    r: 0,
    c: [e.CNM, e.CLCM, e.CBCM]
  }];
  return {
    aliases: ["gss"],
    cI: !0,
    k: t,
    i: "(\\{[%#]|[%#]\\})",
    c: [e.CNM, e.CLCM, e.CBCM, e.C("@", "@"), a, {
      cN: "string",
      b: '"',
      e: '"',
      c: [e.BE]
    }, {
      cN: "function",
      bK: "proc keyword",
      e: ";",
      eE: !0,
      k: t,
      c: [{
        b: r,
        rB: !0,
        c: [e.UTM],
        r: 0
      }, e.CNM, e.CLCM, e.CBCM, a].concat(o)
    }, {
      cN: "function",
      bK: "fn",
      e: ";",
      eE: !0,
      k: t,
      c: [{
        b: r + e.IR + "\\)?\\s*\\=\\s*",
        rB: !0,
        c: [e.UTM],
        r: 0
      }, e.CNM, e.CLCM, e.CBCM].concat(o)
    }, {
      cN: "function",
      b: "\\bexternal (proc|keyword|fn)\\s+",
      e: ";",
      eE: !0,
      k: t,
      c: [{
        b: r,
        rB: !0,
        c: [e.UTM],
        r: 0
      }, e.CLCM, e.CBCM]
    }, {
      cN: "function",
      b: "\\bexternal (matrix|string|array|sparse matrix|struct " + e.IR + ")\\s+",
      e: ";",
      eE: !0,
      k: t,
      c: [e.CLCM, e.CBCM]
    }]
  };
});
hljs.registerLanguage("objectivec", function (e) {
  var t = {
    cN: "built_in",
    b: "\\b(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)\\w+"
  },
      _ = {
    keyword: "int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required @encode @package @import @defs @compatibility_alias __bridge __bridge_transfer __bridge_retained __bridge_retain __covariant __contravariant __kindof _Nonnull _Nullable _Null_unspecified __FUNCTION__ __PRETTY_FUNCTION__ __attribute__ getter setter retain unsafe_unretained nonnull nullable null_unspecified null_resettable class instancetype NS_DESIGNATED_INITIALIZER NS_UNAVAILABLE NS_REQUIRES_SUPER NS_RETURNS_INNER_POINTER NS_INLINE NS_AVAILABLE NS_DEPRECATED NS_ENUM NS_OPTIONS NS_SWIFT_UNAVAILABLE NS_ASSUME_NONNULL_BEGIN NS_ASSUME_NONNULL_END NS_REFINED_FOR_SWIFT NS_SWIFT_NAME NS_SWIFT_NOTHROW NS_DURING NS_HANDLER NS_ENDHANDLER NS_VALUERETURN NS_VOIDRETURN",
    literal: "false true FALSE TRUE nil YES NO NULL",
    built_in: "BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"
  },
      i = /[a-zA-Z@][a-zA-Z0-9_]*/,
      n = "@interface @class @protocol @implementation";
  return {
    aliases: ["mm", "objc", "obj-c"],
    k: _,
    l: i,
    i: "</",
    c: [t, e.CLCM, e.CBCM, e.CNM, e.QSM, {
      cN: "string",
      v: [{
        b: '@"',
        e: '"',
        i: "\\n",
        c: [e.BE]
      }, {
        b: "'",
        e: "[^\\\\]'",
        i: "[^\\\\][^']"
      }]
    }, {
      cN: "meta",
      b: "#",
      e: "$",
      c: [{
        cN: "meta-string",
        v: [{
          b: '"',
          e: '"'
        }, {
          b: "<",
          e: ">"
        }]
      }]
    }, {
      cN: "class",
      b: "(" + n.split(" ").join("|") + ")\\b",
      e: "({|$)",
      eE: !0,
      k: n,
      l: i,
      c: [e.UTM]
    }, {
      b: "\\." + e.UIR,
      r: 0
    }]
  };
});
hljs.registerLanguage("handlebars", function (e) {
  var a = {
    "builtin-name": "each in with if else unless bindattr action collection debugger log outlet template unbound view yield"
  };
  return {
    aliases: ["hbs", "html.hbs", "html.handlebars"],
    cI: !0,
    sL: "xml",
    c: [e.C("{{!(--)?", "(--)?}}"), {
      cN: "template-tag",
      b: /\{\{[#\/]/,
      e: /\}\}/,
      c: [{
        cN: "name",
        b: /[a-zA-Z\.-]+/,
        k: a,
        starts: {
          eW: !0,
          r: 0,
          c: [e.QSM]
        }
      }]
    }, {
      cN: "template-variable",
      b: /\{\{/,
      e: /\}\}/,
      k: a
    }]
  };
});
hljs.registerLanguage("mercury", function (e) {
  var i = {
    keyword: "module use_module import_module include_module end_module initialise mutable initialize finalize finalise interface implementation pred mode func type inst solver any_pred any_func is semidet det nondet multi erroneous failure cc_nondet cc_multi typeclass instance where pragma promise external trace atomic or_else require_complete_switch require_det require_semidet require_multi require_nondet require_cc_multi require_cc_nondet require_erroneous require_failure",
    meta: "inline no_inline type_spec source_file fact_table obsolete memo loop_check minimal_model terminates does_not_terminate check_termination promise_equivalent_clauses foreign_proc foreign_decl foreign_code foreign_type foreign_import_module foreign_export_enum foreign_export foreign_enum may_call_mercury will_not_call_mercury thread_safe not_thread_safe maybe_thread_safe promise_pure promise_semipure tabled_for_io local untrailed trailed attach_to_io_state can_pass_as_mercury_type stable will_not_throw_exception may_modify_trail will_not_modify_trail may_duplicate may_not_duplicate affects_liveness does_not_affect_liveness doesnt_affect_liveness no_sharing unknown_sharing sharing",
    built_in: "some all not if then else true fail false try catch catch_any semidet_true semidet_false semidet_fail impure_true impure semipure"
  },
      r = e.C("%", "$"),
      t = {
    cN: "number",
    b: "0'.\\|0[box][0-9a-fA-F]*"
  },
      _ = e.inherit(e.ASM, {
    r: 0
  }),
      n = e.inherit(e.QSM, {
    r: 0
  }),
      a = {
    cN: "subst",
    b: "\\\\[abfnrtv]\\|\\\\x[0-9a-fA-F]*\\\\\\|%[-+# *.0-9]*[dioxXucsfeEgGp]",
    r: 0
  };

  n.c.push(a);
  var o = {
    cN: "built_in",
    v: [{
      b: "<=>"
    }, {
      b: "<=",
      r: 0
    }, {
      b: "=>",
      r: 0
    }, {
      b: "/\\\\"
    }, {
      b: "\\\\/"
    }]
  },
      l = {
    cN: "built_in",
    v: [{
      b: ":-\\|-->"
    }, {
      b: "=",
      r: 0
    }]
  };
  return {
    aliases: ["m", "moo"],
    k: i,
    c: [o, l, r, e.CBCM, t, e.NM, _, n, {
      b: /:-/
    }]
  };
});
hljs.registerLanguage("dns", function (d) {
  return {
    aliases: ["bind", "zone"],
    k: {
      keyword: "IN A AAAA AFSDB APL CAA CDNSKEY CDS CERT CNAME DHCID DLV DNAME DNSKEY DS HIP IPSECKEY KEY KX LOC MX NAPTR NS NSEC NSEC3 NSEC3PARAM PTR RRSIG RP SIG SOA SRV SSHFP TA TKEY TLSA TSIG TXT"
    },
    c: [d.C(";", "$", {
      r: 0
    }), {
      cN: "meta",
      b: /^\$(TTL|GENERATE|INCLUDE|ORIGIN)\b/
    }, {
      cN: "number",
      b: "((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:)))\\b"
    }, {
      cN: "number",
      b: "((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\b"
    }, d.inherit(d.NM, {
      b: /\b\d+[dhwm]?/
    })]
  };
});
hljs.registerLanguage("pony", function (e) {
  var r = {
    keyword: "actor addressof and as be break class compile_error compile_intrinsicconsume continue delegate digestof do else elseif embed end errorfor fun if ifdef in interface is isnt lambda let match new not objector primitive recover repeat return struct then trait try type until use var where while with xor",
    meta: "iso val tag trn box ref",
    literal: "this false true"
  },
      t = {
    cN: "string",
    b: '"""',
    e: '"""',
    r: 10
  },
      c = {
    cN: "string",
    b: '"',
    e: '"',
    c: [e.BE]
  },
      i = {
    cN: "string",
    b: "'",
    e: "'",
    c: [e.BE],
    r: 0
  },
      n = {
    cN: "type",
    b: "\\b_?[A-Z][\\w]*",
    r: 0
  },
      s = {
    b: e.IR + "'",
    r: 0
  },
      a = {
    cN: "class",
    bK: "class actor",
    e: "$",
    c: [e.TM, e.CLCM]
  },
      o = {
    cN: "function",
    bK: "new fun",
    e: "=>",
    c: [e.TM, {
      b: /\(/,
      e: /\)/,
      c: [n, s, e.CNM, e.CBCM]
    }, {
      b: /:/,
      eW: !0,
      c: [n]
    }, e.CLCM]
  };
  return {
    k: r,
    c: [a, o, n, t, c, i, s, e.CNM, e.CLCM, e.CBCM]
  };
});
hljs.registerLanguage("leaf", function (e) {
  return {
    c: [{
      cN: "function",
      b: "#+[A-Za-z_0-9]*\\(",
      e: " {",
      rB: !0,
      eE: !0,
      c: [{
        cN: "keyword",
        b: "#+"
      }, {
        cN: "title",
        b: "[A-Za-z_][A-Za-z_0-9]*"
      }, {
        cN: "params",
        b: "\\(",
        e: "\\)",
        endsParent: !0,
        c: [{
          cN: "string",
          b: '"',
          e: '"'
        }, {
          cN: "variable",
          b: "[A-Za-z_][A-Za-z_0-9]*"
        }]
      }]
    }]
  };
});
hljs.registerLanguage("dust", function (e) {
  var t = "if eq ne lt lte gt gte select default math sep";
  return {
    aliases: ["dst"],
    cI: !0,
    sL: "xml",
    c: [{
      cN: "template-tag",
      b: /\{[#\/]/,
      e: /\}/,
      i: /;/,
      c: [{
        cN: "name",
        b: /[a-zA-Z\.-]+/,
        starts: {
          eW: !0,
          r: 0,
          c: [e.QSM]
        }
      }]
    }, {
      cN: "template-variable",
      b: /\{/,
      e: /\}/,
      i: /;/,
      k: t
    }]
  };
});
hljs.registerLanguage("erlang-repl", function (e) {
  return {
    k: {
      built_in: "spawn spawn_link self",
      keyword: "after and andalso|10 band begin bnot bor bsl bsr bxor case catch cond div end fun if let not of or orelse|10 query receive rem try when xor"
    },
    c: [{
      cN: "meta",
      b: "^[0-9]+> ",
      r: 10
    }, e.C("%", "$"), {
      cN: "number",
      b: "\\b(\\d+#[a-fA-F0-9]+|\\d+(\\.\\d+)?([eE][-+]?\\d+)?)",
      r: 0
    }, e.ASM, e.QSM, {
      b: "\\?(::)?([A-Z]\\w*(::)?)+"
    }, {
      b: "->"
    }, {
      b: "ok"
    }, {
      b: "!"
    }, {
      b: "(\\b[a-z'][a-zA-Z0-9_']*:[a-z'][a-zA-Z0-9_']*)|(\\b[a-z'][a-zA-Z0-9_']*)",
      r: 0
    }, {
      b: "[A-Z][a-zA-Z0-9_']*",
      r: 0
    }]
  };
});
hljs.registerLanguage("r", function (e) {
  var r = "([a-zA-Z]|\\.[a-zA-Z.])[a-zA-Z0-9._]*";
  return {
    c: [e.HCM, {
      b: r,
      l: r,
      k: {
        keyword: "function if in break next repeat else for return switch while try tryCatch stop warning require library attach detach source setMethod setGeneric setGroupGeneric setClass ...",
        literal: "NULL NA TRUE FALSE T F Inf NaN NA_integer_|10 NA_real_|10 NA_character_|10 NA_complex_|10"
      },
      r: 0
    }, {
      cN: "number",
      b: "0[xX][0-9a-fA-F]+[Li]?\\b",
      r: 0
    }, {
      cN: "number",
      b: "\\d+(?:[eE][+\\-]?\\d*)?L\\b",
      r: 0
    }, {
      cN: "number",
      b: "\\d+\\.(?!\\d)(?:i\\b)?",
      r: 0
    }, {
      cN: "number",
      b: "\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d*)?i?\\b",
      r: 0
    }, {
      cN: "number",
      b: "\\.\\d+(?:[eE][+\\-]?\\d*)?i?\\b",
      r: 0
    }, {
      b: "`",
      e: "`",
      r: 0
    }, {
      cN: "string",
      c: [e.BE],
      v: [{
        b: '"',
        e: '"'
      }, {
        b: "'",
        e: "'"
      }]
    }]
  };
});
hljs.registerLanguage("delphi", function (e) {
  var r = "exports register file shl array record property for mod while set ally label uses raise not stored class safecall var interface or private static exit index inherited to else stdcall override shr asm far resourcestring finalization packed virtual out and protected library do xorwrite goto near function end div overload object unit begin string on inline repeat until destructor write message program with read initialization except default nil if case cdecl in downto threadvar of try pascal const external constructor type public then implementation finally published procedure absolute reintroduce operator as is abstract alias assembler bitpacked break continue cppdecl cvar enumerator experimental platform deprecated unimplemented dynamic export far16 forward generic helper implements interrupt iochecks local name nodefault noreturn nostackframe oldfpccall otherwise saveregisters softfloat specialize strict unaligned varargs ",
      t = [e.CLCM, e.C(/\{/, /\}/, {
    r: 0
  }), e.C(/\(\*/, /\*\)/, {
    r: 10
  })],
      a = {
    cN: "meta",
    v: [{
      b: /\{\$/,
      e: /\}/
    }, {
      b: /\(\*\$/,
      e: /\*\)/
    }]
  },
      c = {
    cN: "string",
    b: /'/,
    e: /'/,
    c: [{
      b: /''/
    }]
  },
      i = {
    cN: "string",
    b: /(#\d+)+/
  },
      o = {
    b: e.IR + "\\s*=\\s*class\\s*\\(",
    rB: !0,
    c: [e.TM]
  },
      n = {
    cN: "function",
    bK: "function constructor destructor procedure",
    e: /[:;]/,
    k: "function constructor|10 destructor|10 procedure|10",
    c: [e.TM, {
      cN: "params",
      b: /\(/,
      e: /\)/,
      k: r,
      c: [c, i, a].concat(t)
    }, a].concat(t)
  };
  return {
    aliases: ["dpr", "dfm", "pas", "pascal", "freepascal", "lazarus", "lpr", "lfm"],
    cI: !0,
    k: r,
    i: /"|\$[G-Zg-z]|\/\*|<\/|\|/,
    c: [c, i, e.NM, o, n, a].concat(t)
  };
});
hljs.registerLanguage("markdown", function (e) {
  return {
    aliases: ["md", "mkdown", "mkd"],
    c: [{
      cN: "section",
      v: [{
        b: "^#{1,6}",
        e: "$"
      }, {
        b: "^.+?\\n[=-]{2,}$"
      }]
    }, {
      b: "<",
      e: ">",
      sL: "xml",
      r: 0
    }, {
      cN: "bullet",
      b: "^([*+-]|(\\d+\\.))\\s+"
    }, {
      cN: "strong",
      b: "[*_]{2}.+?[*_]{2}"
    }, {
      cN: "emphasis",
      v: [{
        b: "\\*.+?\\*"
      }, {
        b: "_.+?_",
        r: 0
      }]
    }, {
      cN: "quote",
      b: "^>\\s+",
      e: "$"
    }, {
      cN: "code",
      v: [{
        b: "^```w*s*$",
        e: "^```s*$"
      }, {
        b: "`.+?`"
      }, {
        b: "^( {4}|	)",
        e: "$",
        r: 0
      }]
    }, {
      b: "^[-\\*]{3,}",
      e: "$"
    }, {
      b: "\\[.+?\\][\\(\\[].*?[\\)\\]]",
      rB: !0,
      c: [{
        cN: "string",
        b: "\\[",
        e: "\\]",
        eB: !0,
        rE: !0,
        r: 0
      }, {
        cN: "link",
        b: "\\]\\(",
        e: "\\)",
        eB: !0,
        eE: !0
      }, {
        cN: "symbol",
        b: "\\]\\[",
        e: "\\]",
        eB: !0,
        eE: !0
      }],
      r: 10
    }, {
      b: /^\[[^\n]+\]:/,
      rB: !0,
      c: [{
        cN: "symbol",
        b: /\[/,
        e: /\]/,
        eB: !0,
        eE: !0
      }, {
        cN: "link",
        b: /:\s*/,
        e: /$/,
        eB: !0
      }]
    }]
  };
});
hljs.registerLanguage("dart", function (e) {
  var t = {
    cN: "subst",
    b: "\\$\\{",
    e: "}",
    k: "true false null this is new super"
  },
      r = {
    cN: "string",
    v: [{
      b: "r'''",
      e: "'''"
    }, {
      b: 'r"""',
      e: '"""'
    }, {
      b: "r'",
      e: "'",
      i: "\\n"
    }, {
      b: 'r"',
      e: '"',
      i: "\\n"
    }, {
      b: "'''",
      e: "'''",
      c: [e.BE, t]
    }, {
      b: '"""',
      e: '"""',
      c: [e.BE, t]
    }, {
      b: "'",
      e: "'",
      i: "\\n",
      c: [e.BE, t]
    }, {
      b: '"',
      e: '"',
      i: "\\n",
      c: [e.BE, t]
    }]
  };
  t.c = [e.CNM, r];
  var n = {
    keyword: "assert async await break case catch class const continue default do else enum extends false final finally for if in is new null rethrow return super switch sync this throw true try var void while with yield abstract as dynamic export external factory get implements import library operator part set static typedef",
    built_in: "print Comparable DateTime Duration Function Iterable Iterator List Map Match Null Object Pattern RegExp Set Stopwatch String StringBuffer StringSink Symbol Type Uri bool double int num document window querySelector querySelectorAll Element ElementList"
  };
  return {
    k: n,
    c: [r, e.C("/\\*\\*", "\\*/", {
      sL: "markdown"
    }), e.C("///", "$", {
      sL: "markdown"
    }), e.CLCM, e.CBCM, {
      cN: "class",
      bK: "class interface",
      e: "{",
      eE: !0,
      c: [{
        bK: "extends implements"
      }, e.UTM]
    }, e.CNM, {
      cN: "meta",
      b: "@[A-Za-z]+"
    }, {
      b: "=>"
    }]
  };
});
hljs.registerLanguage("step21", function (e) {
  var i = "[A-Z_][A-Z0-9_.]*",
      r = {
    keyword: "HEADER ENDSEC DATA"
  },
      t = {
    cN: "meta",
    b: "ISO-10303-21;",
    r: 10
  },
      n = {
    cN: "meta",
    b: "END-ISO-10303-21;",
    r: 10
  };
  return {
    aliases: ["p21", "step", "stp"],
    cI: !0,
    l: i,
    k: r,
    c: [t, n, e.CLCM, e.CBCM, e.C("/\\*\\*!", "\\*/"), e.CNM, e.inherit(e.ASM, {
      i: null
    }), e.inherit(e.QSM, {
      i: null
    }), {
      cN: "string",
      b: "'",
      e: "'"
    }, {
      cN: "symbol",
      v: [{
        b: "#",
        e: "\\d+",
        i: "\\W"
      }]
    }]
  };
});
hljs.registerLanguage("cos", function (e) {
  var t = {
    cN: "string",
    v: [{
      b: '"',
      e: '"',
      c: [{
        b: '""',
        r: 0
      }]
    }]
  },
      r = {
    cN: "number",
    b: "\\b(\\d+(\\.\\d*)?|\\.\\d+)",
    r: 0
  },
      s = "property parameter class classmethod clientmethod extends as break catch close continue do d|0 else elseif for goto halt hang h|0 if job j|0 kill k|0 lock l|0 merge new open quit q|0 read r|0 return set s|0 tcommit throw trollback try tstart use view while write w|0 xecute x|0 zkill znspace zn ztrap zwrite zw zzdump zzwrite print zbreak zinsert zload zprint zremove zsave zzprint mv mvcall mvcrt mvdim mvprint zquit zsync ascii";
  return {
    cI: !0,
    aliases: ["cos", "cls"],
    k: s,
    c: [r, t, e.CLCM, e.CBCM, {
      cN: "comment",
      b: /;/,
      e: "$",
      r: 0
    }, {
      cN: "built_in",
      b: /(?:\$\$?|\.\.)\^?[a-zA-Z]+/
    }, {
      cN: "built_in",
      b: /\$\$\$[a-zA-Z]+/
    }, {
      cN: "built_in",
      b: /%[a-z]+(?:\.[a-z]+)*/
    }, {
      cN: "symbol",
      b: /\^%?[a-zA-Z][\w]*/
    }, {
      cN: "keyword",
      b: /##class|##super|#define|#dim/
    }, {
      b: /&sql\(/,
      e: /\)/,
      eB: !0,
      eE: !0,
      sL: "sql"
    }, {
      b: /&(js|jscript|javascript)</,
      e: />/,
      eB: !0,
      eE: !0,
      sL: "javascript"
    }, {
      b: /&html<\s*</,
      e: />\s*>/,
      sL: "xml"
    }]
  };
});
hljs.registerLanguage("maxima", function (e) {
  var t = "if then else elseif for thru do while unless step in and or not",
      a = "true false unknown inf minf ind und %e %i %pi %phi %gamma",
      r = " abasep abs absint absolute_real_time acos acosh acot acoth acsc acsch activate addcol add_edge add_edges addmatrices addrow add_vertex add_vertices adjacency_matrix adjoin adjoint af agd airy airy_ai airy_bi airy_dai airy_dbi algsys alg_type alias allroots alphacharp alphanumericp amortization %and annuity_fv annuity_pv antid antidiff AntiDifference append appendfile apply apply1 apply2 applyb1 apropos args arit_amortization arithmetic arithsum array arrayapply arrayinfo arraymake arraysetapply ascii asec asech asin asinh askinteger asksign assoc assoc_legendre_p assoc_legendre_q assume assume_external_byte_order asympa at atan atan2 atanh atensimp atom atvalue augcoefmatrix augmented_lagrangian_method av average_degree backtrace bars barsplot barsplot_description base64 base64_decode bashindices batch batchload bc2 bdvac belln benefit_cost bern bernpoly bernstein_approx bernstein_expand bernstein_poly bessel bessel_i bessel_j bessel_k bessel_simplify bessel_y beta beta_incomplete beta_incomplete_generalized beta_incomplete_regularized bezout bfallroots bffac bf_find_root bf_fmin_cobyla bfhzeta bfloat bfloatp bfpsi bfpsi0 bfzeta biconnected_components bimetric binomial bipartition block blockmatrixp bode_gain bode_phase bothcoef box boxplot boxplot_description break bug_report build_info|10 buildq build_sample burn cabs canform canten cardinality carg cartan cartesian_product catch cauchy_matrix cbffac cdf_bernoulli cdf_beta cdf_binomial cdf_cauchy cdf_chi2 cdf_continuous_uniform cdf_discrete_uniform cdf_exp cdf_f cdf_gamma cdf_general_finite_discrete cdf_geometric cdf_gumbel cdf_hypergeometric cdf_laplace cdf_logistic cdf_lognormal cdf_negative_binomial cdf_noncentral_chi2 cdf_noncentral_student_t cdf_normal cdf_pareto cdf_poisson cdf_rank_sum cdf_rayleigh cdf_signed_rank cdf_student_t cdf_weibull cdisplay ceiling central_moment cequal cequalignore cf cfdisrep cfexpand cgeodesic cgreaterp cgreaterpignore changename changevar chaosgame charat charfun charfun2 charlist charp charpoly chdir chebyshev_t chebyshev_u checkdiv check_overlaps chinese cholesky christof chromatic_index chromatic_number cint circulant_graph clear_edge_weight clear_rules clear_vertex_label clebsch_gordan clebsch_graph clessp clesspignore close closefile cmetric coeff coefmatrix cograd col collapse collectterms columnop columnspace columnswap columnvector combination combine comp2pui compare compfile compile compile_file complement_graph complete_bipartite_graph complete_graph complex_number_p components compose_functions concan concat conjugate conmetderiv connected_components connect_vertices cons constant constantp constituent constvalue cont2part content continuous_freq contortion contour_plot contract contract_edge contragrad contrib_ode convert coord copy copy_file copy_graph copylist copymatrix cor cos cosh cot coth cov cov1 covdiff covect covers crc24sum create_graph create_list csc csch csetup cspline ctaylor ct_coordsys ctransform ctranspose cube_graph cuboctahedron_graph cunlisp cv cycle_digraph cycle_graph cylindrical days360 dblint deactivate declare declare_constvalue declare_dimensions declare_fundamental_dimensions declare_fundamental_units declare_qty declare_translated declare_unit_conversion declare_units declare_weights decsym defcon define define_alt_display define_variable defint defmatch defrule defstruct deftaylor degree_sequence del delete deleten delta demo demoivre denom depends derivdegree derivlist describe desolve determinant dfloat dgauss_a dgauss_b dgeev dgemm dgeqrf dgesv dgesvd diag diagmatrix diag_matrix diagmatrixp diameter diff digitcharp dimacs_export dimacs_import dimension dimensionless dimensions dimensions_as_list direct directory discrete_freq disjoin disjointp disolate disp dispcon dispform dispfun dispJordan display disprule dispterms distrib divide divisors divsum dkummer_m dkummer_u dlange dodecahedron_graph dotproduct dotsimp dpart draw draw2d draw3d drawdf draw_file draw_graph dscalar echelon edge_coloring edge_connectivity edges eigens_by_jacobi eigenvalues eigenvectors eighth einstein eivals eivects elapsed_real_time elapsed_run_time ele2comp ele2polynome ele2pui elem elementp elevation_grid elim elim_allbut eliminate eliminate_using ellipse elliptic_e elliptic_ec elliptic_eu elliptic_f elliptic_kc elliptic_pi ematrix empty_graph emptyp endcons entermatrix entertensor entier equal equalp equiv_classes erf erfc erf_generalized erfi errcatch error errormsg errors euler ev eval_string evenp every evolution evolution2d evundiff example exp expand expandwrt expandwrt_factored expint expintegral_chi expintegral_ci expintegral_e expintegral_e1 expintegral_ei expintegral_e_simplify expintegral_li expintegral_shi expintegral_si explicit explose exponentialize express expt exsec extdiff extract_linear_equations extremal_subset ezgcd %f f90 facsum factcomb factor factorfacsum factorial factorout factorsum facts fast_central_elements fast_linsolve fasttimes featurep fernfale fft fib fibtophi fifth filename_merge file_search file_type fillarray findde find_root find_root_abs find_root_error find_root_rel first fix flatten flength float floatnump floor flower_snark flush flush1deriv flushd flushnd flush_output fmin_cobyla forget fortran fourcos fourexpand fourier fourier_elim fourint fourintcos fourintsin foursimp foursin fourth fposition frame_bracket freeof freshline fresnel_c fresnel_s from_adjacency_matrix frucht_graph full_listify fullmap fullmapl fullratsimp fullratsubst fullsetify funcsolve fundamental_dimensions fundamental_units fundef funmake funp fv g0 g1 gamma gamma_greek gamma_incomplete gamma_incomplete_generalized gamma_incomplete_regularized gauss gauss_a gauss_b gaussprob gcd gcdex gcdivide gcfac gcfactor gd generalized_lambert_w genfact gen_laguerre genmatrix gensym geo_amortization geo_annuity_fv geo_annuity_pv geomap geometric geometric_mean geosum get getcurrentdirectory get_edge_weight getenv get_lu_factors get_output_stream_string get_pixel get_plot_option get_tex_environment get_tex_environment_default get_vertex_label gfactor gfactorsum ggf girth global_variances gn gnuplot_close gnuplot_replot gnuplot_reset gnuplot_restart gnuplot_start go Gosper GosperSum gr2d gr3d gradef gramschmidt graph6_decode graph6_encode graph6_export graph6_import graph_center graph_charpoly graph_eigenvalues graph_flow graph_order graph_periphery graph_product graph_size graph_union great_rhombicosidodecahedron_graph great_rhombicuboctahedron_graph grid_graph grind grobner_basis grotzch_graph hamilton_cycle hamilton_path hankel hankel_1 hankel_2 harmonic harmonic_mean hav heawood_graph hermite hessian hgfred hilbertmap hilbert_matrix hipow histogram histogram_description hodge horner hypergeometric i0 i1 %ibes ic1 ic2 ic_convert ichr1 ichr2 icosahedron_graph icosidodecahedron_graph icurvature ident identfor identity idiff idim idummy ieqn %if ifactors iframes ifs igcdex igeodesic_coords ilt image imagpart imetric implicit implicit_derivative implicit_plot indexed_tensor indices induced_subgraph inferencep inference_result infix info_display init_atensor init_ctensor in_neighbors innerproduct inpart inprod inrt integerp integer_partitions integrate intersect intersection intervalp intopois intosum invariant1 invariant2 inverse_fft inverse_jacobi_cd inverse_jacobi_cn inverse_jacobi_cs inverse_jacobi_dc inverse_jacobi_dn inverse_jacobi_ds inverse_jacobi_nc inverse_jacobi_nd inverse_jacobi_ns inverse_jacobi_sc inverse_jacobi_sd inverse_jacobi_sn invert invert_by_adjoint invert_by_lu inv_mod irr is is_biconnected is_bipartite is_connected is_digraph is_edge_in_graph is_graph is_graph_or_digraph ishow is_isomorphic isolate isomorphism is_planar isqrt isreal_p is_sconnected is_tree is_vertex_in_graph items_inference %j j0 j1 jacobi jacobian jacobi_cd jacobi_cn jacobi_cs jacobi_dc jacobi_dn jacobi_ds jacobi_nc jacobi_nd jacobi_ns jacobi_p jacobi_sc jacobi_sd jacobi_sn JF jn join jordan julia julia_set julia_sin %k kdels kdelta kill killcontext kostka kron_delta kronecker_product kummer_m kummer_u kurtosis kurtosis_bernoulli kurtosis_beta kurtosis_binomial kurtosis_chi2 kurtosis_continuous_uniform kurtosis_discrete_uniform kurtosis_exp kurtosis_f kurtosis_gamma kurtosis_general_finite_discrete kurtosis_geometric kurtosis_gumbel kurtosis_hypergeometric kurtosis_laplace kurtosis_logistic kurtosis_lognormal kurtosis_negative_binomial kurtosis_noncentral_chi2 kurtosis_noncentral_student_t kurtosis_normal kurtosis_pareto kurtosis_poisson kurtosis_rayleigh kurtosis_student_t kurtosis_weibull label labels lagrange laguerre lambda lambert_w laplace laplacian_matrix last lbfgs lc2kdt lcharp lc_l lcm lc_u ldefint ldisp ldisplay legendre_p legendre_q leinstein length let letrules letsimp levi_civita lfreeof lgtreillis lhs li liediff limit Lindstedt linear linearinterpol linear_program linear_regression line_graph linsolve listarray list_correlations listify list_matrix_entries list_nc_monomials listoftens listofvars listp lmax lmin load loadfile local locate_matrix_entry log logcontract log_gamma lopow lorentz_gauge lowercasep lpart lratsubst lreduce lriemann lsquares_estimates lsquares_estimates_approximate lsquares_estimates_exact lsquares_mse lsquares_residual_mse lsquares_residuals lsum ltreillis lu_backsub lucas lu_factor %m macroexpand macroexpand1 make_array makebox makefact makegamma make_graph make_level_picture makelist makeOrders make_poly_continent make_poly_country make_polygon make_random_state make_rgb_picture makeset make_string_input_stream make_string_output_stream make_transform mandelbrot mandelbrot_set map mapatom maplist matchdeclare matchfix mat_cond mat_fullunblocker mat_function mathml_display mat_norm matrix matrixmap matrixp matrix_size mattrace mat_trace mat_unblocker max max_clique max_degree max_flow maximize_lp max_independent_set max_matching maybe md5sum mean mean_bernoulli mean_beta mean_binomial mean_chi2 mean_continuous_uniform mean_deviation mean_discrete_uniform mean_exp mean_f mean_gamma mean_general_finite_discrete mean_geometric mean_gumbel mean_hypergeometric mean_laplace mean_logistic mean_lognormal mean_negative_binomial mean_noncentral_chi2 mean_noncentral_student_t mean_normal mean_pareto mean_poisson mean_rayleigh mean_student_t mean_weibull median median_deviation member mesh metricexpandall mgf1_sha1 min min_degree min_edge_cut minfactorial minimalPoly minimize_lp minimum_spanning_tree minor minpack_lsquares minpack_solve min_vertex_cover min_vertex_cut mkdir mnewton mod mode_declare mode_identity ModeMatrix moebius mon2schur mono monomial_dimensions multibernstein_poly multi_display_for_texinfo multi_elem multinomial multinomial_coeff multi_orbit multiplot_mode multi_pui multsym multthru mycielski_graph nary natural_unit nc_degree ncexpt ncharpoly negative_picture neighbors new newcontext newdet new_graph newline newton new_variable next_prime nicedummies niceindices ninth nofix nonarray noncentral_moment nonmetricity nonnegintegerp nonscalarp nonzeroandfreeof notequal nounify nptetrad npv nroots nterms ntermst nthroot nullity nullspace num numbered_boundaries numberp number_to_octets num_distinct_partitions numerval numfactor num_partitions nusum nzeta nzetai nzetar octets_to_number octets_to_oid odd_girth oddp ode2 ode_check odelin oid_to_octets op opena opena_binary openr openr_binary openw openw_binary operatorp opsubst optimize %or orbit orbits ordergreat ordergreatp orderless orderlessp orthogonal_complement orthopoly_recur orthopoly_weight outermap out_neighbors outofpois pade parabolic_cylinder_d parametric parametric_surface parg parGosper parse_string parse_timedate part part2cont partfrac partition partition_set partpol path_digraph path_graph pathname_directory pathname_name pathname_type pdf_bernoulli pdf_beta pdf_binomial pdf_cauchy pdf_chi2 pdf_continuous_uniform pdf_discrete_uniform pdf_exp pdf_f pdf_gamma pdf_general_finite_discrete pdf_geometric pdf_gumbel pdf_hypergeometric pdf_laplace pdf_logistic pdf_lognormal pdf_negative_binomial pdf_noncentral_chi2 pdf_noncentral_student_t pdf_normal pdf_pareto pdf_poisson pdf_rank_sum pdf_rayleigh pdf_signed_rank pdf_student_t pdf_weibull pearson_skewness permanent permut permutation permutations petersen_graph petrov pickapart picture_equalp picturep piechart piechart_description planar_embedding playback plog plot2d plot3d plotdf ploteq plsquares pochhammer points poisdiff poisexpt poisint poismap poisplus poissimp poissubst poistimes poistrim polar polarform polartorect polar_to_xy poly_add poly_buchberger poly_buchberger_criterion poly_colon_ideal poly_content polydecomp poly_depends_p poly_elimination_ideal poly_exact_divide poly_expand poly_expt poly_gcd polygon poly_grobner poly_grobner_equal poly_grobner_member poly_grobner_subsetp poly_ideal_intersection poly_ideal_polysaturation poly_ideal_polysaturation1 poly_ideal_saturation poly_ideal_saturation1 poly_lcm poly_minimization polymod poly_multiply polynome2ele polynomialp poly_normal_form poly_normalize poly_normalize_list poly_polysaturation_extension poly_primitive_part poly_pseudo_divide poly_reduced_grobner poly_reduction poly_saturation_extension poly_s_polynomial poly_subtract polytocompanion pop postfix potential power_mod powerseries powerset prefix prev_prime primep primes principal_components print printf printfile print_graph printpois printprops prodrac product properties propvars psi psubst ptriangularize pui pui2comp pui2ele pui2polynome pui_direct puireduc push put pv qput qrange qty quad_control quad_qag quad_qagi quad_qagp quad_qags quad_qawc quad_qawf quad_qawo quad_qaws quadrilateral quantile quantile_bernoulli quantile_beta quantile_binomial quantile_cauchy quantile_chi2 quantile_continuous_uniform quantile_discrete_uniform quantile_exp quantile_f quantile_gamma quantile_general_finite_discrete quantile_geometric quantile_gumbel quantile_hypergeometric quantile_laplace quantile_logistic quantile_lognormal quantile_negative_binomial quantile_noncentral_chi2 quantile_noncentral_student_t quantile_normal quantile_pareto quantile_poisson quantile_rayleigh quantile_student_t quantile_weibull quartile_skewness quit qunit quotient racah_v racah_w radcan radius random random_bernoulli random_beta random_binomial random_bipartite_graph random_cauchy random_chi2 random_continuous_uniform random_digraph random_discrete_uniform random_exp random_f random_gamma random_general_finite_discrete random_geometric random_graph random_graph1 random_gumbel random_hypergeometric random_laplace random_logistic random_lognormal random_negative_binomial random_network random_noncentral_chi2 random_noncentral_student_t random_normal random_pareto random_permutation random_poisson random_rayleigh random_regular_graph random_student_t random_tournament random_tree random_weibull range rank rat ratcoef ratdenom ratdiff ratdisrep ratexpand ratinterpol rational rationalize ratnumer ratnump ratp ratsimp ratsubst ratvars ratweight read read_array read_binary_array read_binary_list read_binary_matrix readbyte readchar read_hashed_array readline read_list read_matrix read_nested_list readonly read_xpm real_imagpart_to_conjugate realpart realroots rearray rectangle rectform rectform_log_if_constant recttopolar rediff reduce_consts reduce_order region region_boundaries region_boundaries_plus rem remainder remarray rembox remcomps remcon remcoord remfun remfunction remlet remove remove_constvalue remove_dimensions remove_edge remove_fundamental_dimensions remove_fundamental_units remove_plot_option remove_vertex rempart remrule remsym remvalue rename rename_file reset reset_displays residue resolvante resolvante_alternee1 resolvante_bipartite resolvante_diedrale resolvante_klein resolvante_klein3 resolvante_produit_sym resolvante_unitaire resolvante_vierer rest resultant return reveal reverse revert revert2 rgb2level rhs ricci riemann rinvariant risch rk rmdir rncombine romberg room rootscontract round row rowop rowswap rreduce run_testsuite %s save saving scalarp scaled_bessel_i scaled_bessel_i0 scaled_bessel_i1 scalefactors scanmap scatterplot scatterplot_description scene schur2comp sconcat scopy scsimp scurvature sdowncase sec sech second sequal sequalignore set_alt_display setdifference set_draw_defaults set_edge_weight setelmx setequalp setify setp set_partitions set_plot_option set_prompt set_random_state set_tex_environment set_tex_environment_default setunits setup_autoload set_up_dot_simplifications set_vertex_label seventh sexplode sf sha1sum sha256sum shortest_path shortest_weighted_path show showcomps showratvars sierpinskiale sierpinskimap sign signum similaritytransform simp_inequality simplify_sum simplode simpmetderiv simtran sin sinh sinsert sinvertcase sixth skewness skewness_bernoulli skewness_beta skewness_binomial skewness_chi2 skewness_continuous_uniform skewness_discrete_uniform skewness_exp skewness_f skewness_gamma skewness_general_finite_discrete skewness_geometric skewness_gumbel skewness_hypergeometric skewness_laplace skewness_logistic skewness_lognormal skewness_negative_binomial skewness_noncentral_chi2 skewness_noncentral_student_t skewness_normal skewness_pareto skewness_poisson skewness_rayleigh skewness_student_t skewness_weibull slength smake small_rhombicosidodecahedron_graph small_rhombicuboctahedron_graph smax smin smismatch snowmap snub_cube_graph snub_dodecahedron_graph solve solve_rec solve_rec_rat some somrac sort sparse6_decode sparse6_encode sparse6_export sparse6_import specint spherical spherical_bessel_j spherical_bessel_y spherical_hankel1 spherical_hankel2 spherical_harmonic spherical_to_xyz splice split sposition sprint sqfr sqrt sqrtdenest sremove sremovefirst sreverse ssearch ssort sstatus ssubst ssubstfirst staircase standardize standardize_inverse_trig starplot starplot_description status std std1 std_bernoulli std_beta std_binomial std_chi2 std_continuous_uniform std_discrete_uniform std_exp std_f std_gamma std_general_finite_discrete std_geometric std_gumbel std_hypergeometric std_laplace std_logistic std_lognormal std_negative_binomial std_noncentral_chi2 std_noncentral_student_t std_normal std_pareto std_poisson std_rayleigh std_student_t std_weibull stemplot stirling stirling1 stirling2 strim striml strimr string stringout stringp strong_components struve_h struve_l sublis sublist sublist_indices submatrix subsample subset subsetp subst substinpart subst_parallel substpart substring subvar subvarp sum sumcontract summand_to_rec supcase supcontext symbolp symmdifference symmetricp system take_channel take_inference tan tanh taylor taylorinfo taylorp taylor_simplifier taytorat tcl_output tcontract tellrat tellsimp tellsimpafter tentex tenth test_mean test_means_difference test_normality test_proportion test_proportions_difference test_rank_sum test_sign test_signed_rank test_variance test_variance_ratio tex tex1 tex_display texput %th third throw time timedate timer timer_info tldefint tlimit todd_coxeter toeplitz tokens to_lisp topological_sort to_poly to_poly_solve totaldisrep totalfourier totient tpartpol trace tracematrix trace_options transform_sample translate translate_file transpose treefale tree_reduce treillis treinat triangle triangularize trigexpand trigrat trigreduce trigsimp trunc truncate truncated_cube_graph truncated_dodecahedron_graph truncated_icosahedron_graph truncated_tetrahedron_graph tr_warnings_get tube tutte_graph ueivects uforget ultraspherical underlying_graph undiff union unique uniteigenvectors unitp units unit_step unitvector unorder unsum untellrat untimer untrace uppercasep uricci uriemann uvect vandermonde_matrix var var1 var_bernoulli var_beta var_binomial var_chi2 var_continuous_uniform var_discrete_uniform var_exp var_f var_gamma var_general_finite_discrete var_geometric var_gumbel var_hypergeometric var_laplace var_logistic var_lognormal var_negative_binomial var_noncentral_chi2 var_noncentral_student_t var_normal var_pareto var_poisson var_rayleigh var_student_t var_weibull vector vectorpotential vectorsimp verbify vers vertex_coloring vertex_connectivity vertex_degree vertex_distance vertex_eccentricity vertex_in_degree vertex_out_degree vertices vertices_to_cycle vertices_to_path %w weyl wheel_graph wiener_index wigner_3j wigner_6j wigner_9j with_stdout write_binary_data writebyte write_data writefile wronskian xreduce xthru %y Zeilberger zeroequiv zerofor zeromatrix zeromatrixp zeta zgeev zheev zlange zn_add_table zn_carmichael_lambda zn_characteristic_factors zn_determinant zn_factor_generators zn_invert_by_lu zn_log zn_mult_table absboxchar activecontexts adapt_depth additive adim aform algebraic algepsilon algexact aliases allbut all_dotsimp_denoms allocation allsym alphabetic animation antisymmetric arrays askexp assume_pos assume_pos_pred assumescalar asymbol atomgrad atrig1 axes axis_3d axis_bottom axis_left axis_right axis_top azimuth background background_color backsubst berlefact bernstein_explicit besselexpand beta_args_sum_to_integer beta_expand bftorat bftrunc bindtest border boundaries_array box boxchar breakup %c capping cauchysum cbrange cbtics center cflength cframe_flag cnonmet_flag color color_bar color_bar_tics colorbox columns commutative complex cone context contexts contour contour_levels cosnpiflag ctaypov ctaypt ctayswitch ctayvar ct_coords ctorsion_flag ctrgsimp cube current_let_rule_package cylinder data_file_name debugmode decreasing default_let_rule_package delay dependencies derivabbrev derivsubst detout diagmetric diff dim dimensions dispflag display2d|10 display_format_internal distribute_over doallmxops domain domxexpt domxmxops domxnctimes dontfactor doscmxops doscmxplus dot0nscsimp dot0simp dot1simp dotassoc dotconstrules dotdistrib dotexptsimp dotident dotscrules draw_graph_program draw_realpart edge_color edge_coloring edge_partition edge_type edge_width %edispflag elevation %emode endphi endtheta engineering_format_floats enhanced3d %enumer epsilon_lp erfflag erf_representation errormsg error_size error_syms error_type %e_to_numlog eval even evenfun evflag evfun ev_point expandwrt_denom expintexpand expintrep expon expop exptdispflag exptisolate exptsubst facexpand facsum_combine factlim factorflag factorial_expand factors_only fb feature features file_name file_output_append file_search_demo file_search_lisp file_search_maxima|10 file_search_tests file_search_usage file_type_lisp file_type_maxima|10 fill_color fill_density filled_func fixed_vertices flipflag float2bf font font_size fortindent fortspaces fpprec fpprintprec functions gamma_expand gammalim gdet genindex gensumnum GGFCFMAX GGFINFINITY globalsolve gnuplot_command gnuplot_curve_styles gnuplot_curve_titles gnuplot_default_term_command gnuplot_dumb_term_command gnuplot_file_args gnuplot_file_name gnuplot_out_file gnuplot_pdf_term_command gnuplot_pm3d gnuplot_png_term_command gnuplot_postamble gnuplot_preamble gnuplot_ps_term_command gnuplot_svg_term_command gnuplot_term gnuplot_view_args Gosper_in_Zeilberger gradefs grid grid2d grind halfangles head_angle head_both head_length head_type height hypergeometric_representation %iargs ibase icc1 icc2 icounter idummyx ieqnprint ifb ifc1 ifc2 ifg ifgi ifr iframe_bracket_form ifri igeowedge_flag ikt1 ikt2 imaginary inchar increasing infeval infinity inflag infolists inm inmc1 inmc2 intanalysis integer integervalued integrate_use_rootsof integration_constant integration_constant_counter interpolate_color intfaclim ip_grid ip_grid_in irrational isolate_wrt_times iterations itr julia_parameter %k1 %k2 keepfloat key key_pos kinvariant kt label label_alignment label_orientation labels lassociative lbfgs_ncorrections lbfgs_nfeval_max leftjust legend letrat let_rule_packages lfg lg lhospitallim limsubst linear linear_solver linechar linel|10 linenum line_type linewidth line_width linsolve_params linsolvewarn lispdisp listarith listconstvars listdummyvars lmxchar load_pathname loadprint logabs logarc logcb logconcoeffp logexpand lognegint logsimp logx logx_secondary logy logy_secondary logz lriem m1pbranch macroexpansion macros mainvar manual_demo maperror mapprint matrix_element_add matrix_element_mult matrix_element_transpose maxapplydepth maxapplyheight maxima_tempdir|10 maxima_userdir|10 maxnegex MAX_ORD maxposex maxpsifracdenom maxpsifracnum maxpsinegint maxpsiposint maxtayorder mesh_lines_color method mod_big_prime mode_check_errorp mode_checkp mode_check_warnp mod_test mod_threshold modular_linear_solver modulus multiplicative multiplicities myoptions nary negdistrib negsumdispflag newline newtonepsilon newtonmaxiter nextlayerfactor niceindicespref nm nmc noeval nolabels nonegative_lp noninteger nonscalar noun noundisp nouns np npi nticks ntrig numer numer_pbranch obase odd oddfun opacity opproperties opsubst optimprefix optionset orientation origin orthopoly_returns_intervals outative outchar packagefile palette partswitch pdf_file pfeformat phiresolution %piargs piece pivot_count_sx pivot_max_sx plot_format plot_options plot_realpart png_file pochhammer_max_index points pointsize point_size points_joined point_type poislim poisson poly_coefficient_ring poly_elimination_order polyfactor poly_grobner_algorithm poly_grobner_debug poly_monomial_order poly_primary_elimination_order poly_return_term_list poly_secondary_elimination_order poly_top_reduction_only posfun position powerdisp pred prederror primep_number_of_tests product_use_gamma program programmode promote_float_to_bigfloat prompt proportional_axes props psexpand ps_file radexpand radius radsubstflag rassociative ratalgdenom ratchristof ratdenomdivide rateinstein ratepsilon ratfac rational ratmx ratprint ratriemann ratsimpexpons ratvarswitch ratweights ratweyl ratwtlvl real realonly redraw refcheck resolution restart resultant ric riem rmxchar %rnum_list rombergabs rombergit rombergmin rombergtol rootsconmode rootsepsilon run_viewer same_xy same_xyz savedef savefactors scalar scalarmatrixp scale scale_lp setcheck setcheckbreak setval show_edge_color show_edges show_edge_type show_edge_width show_id show_label showtime show_vertex_color show_vertex_size show_vertex_type show_vertices show_weight simp simplified_output simplify_products simpproduct simpsum sinnpiflag solvedecomposes solveexplicit solvefactors solvenullwarn solveradcan solvetrigwarn space sparse sphere spring_embedding_depth sqrtdispflag stardisp startphi starttheta stats_numer stringdisp structures style sublis_apply_lambda subnumsimp sumexpand sumsplitfact surface surface_hide svg_file symmetric tab taylordepth taylor_logexpand taylor_order_coefficients taylor_truncate_polynomials tensorkill terminal testsuite_files thetaresolution timer_devalue title tlimswitch tr track transcompile transform transform_xy translate_fast_arrays transparent transrun tr_array_as_ref tr_bound_function_applyp tr_file_tty_messagesp tr_float_can_branch_complex tr_function_call_default trigexpandplus trigexpandtimes triginverses trigsign trivial_solutions tr_numer tr_optimize_max_loop tr_semicompile tr_state_vars tr_warn_bad_function_calls tr_warn_fexpr tr_warn_meval tr_warn_mode tr_warn_undeclared tr_warn_undefined_variable tstep ttyoff tube_extremes ufg ug %unitexpand unit_vectors uric uriem use_fast_arrays user_preamble usersetunits values vect_cross verbose vertex_color vertex_coloring vertex_partition vertex_size vertex_type view warnings weyl width windowname windowtitle wired_surface wireframe xaxis xaxis_color xaxis_secondary xaxis_type xaxis_width xlabel xlabel_secondary xlength xrange xrange_secondary xtics xtics_axis xtics_rotate xtics_rotate_secondary xtics_secondary xtics_secondary_axis xu_grid x_voxel xy_file xyplane xy_scale yaxis yaxis_color yaxis_secondary yaxis_type yaxis_width ylabel ylabel_secondary ylength yrange yrange_secondary ytics ytics_axis ytics_rotate ytics_rotate_secondary ytics_secondary ytics_secondary_axis yv_grid y_voxel yx_ratio zaxis zaxis_color zaxis_type zaxis_width zeroa zerob zerobern zeta%pi zlabel zlabel_rotate zlength zmin zn_primroot_limit zn_primroot_pretest",
      i = "_ __ %|0 %%|0";
  return {
    l: "[A-Za-z_%][0-9A-Za-z_%]*",
    k: {
      keyword: t,
      literal: a,
      built_in: r,
      symbol: i
    },
    c: [{
      cN: "comment",
      b: "/\\*",
      e: "\\*/",
      c: ["self"]
    }, e.QSM, {
      cN: "number",
      r: 0,
      v: [{
        b: "\\b(\\d+|\\d+\\.|\\.\\d+|\\d+\\.\\d+)[Ee][-+]?\\d+\\b"
      }, {
        b: "\\b(\\d+|\\d+\\.|\\.\\d+|\\d+\\.\\d+)[Bb][-+]?\\d+\\b",
        r: 10
      }, {
        b: "\\b(\\.\\d+|\\d+\\.\\d+)\\b"
      }, {
        b: "\\b(\\d+|0[0-9A-Za-z]+)\\.?\\b"
      }]
    }],
    i: /@/
  };
});
hljs.registerLanguage("crystal", function (e) {
  function r(e, r) {
    var b = [{
      b: e,
      e: r
    }];
    return b[0].c = b, b;
  }

  var b = "(_[uif](8|16|32|64))?",
      c = "[a-zA-Z_]\\w*[!?=]?",
      n = "!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",
      i = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\][=?]?",
      s = {
    keyword: "abstract alias as asm begin break case class def do else elsif end ensure enum extend for fun if ifdef include instance_sizeof is_a? lib macro module next of out pointerof private protected rescue responds_to? return require self sizeof struct super then type typeof union unless until when while with yield __DIR__ __FILE__ __LINE__",
    literal: "false nil true"
  },
      t = {
    cN: "subst",
    b: "#{",
    e: "}",
    k: s
  },
      a = {
    cN: "template-variable",
    v: [{
      b: "\\{\\{",
      e: "\\}\\}"
    }, {
      b: "\\{%",
      e: "%\\}"
    }],
    k: s
  },
      l = {
    cN: "string",
    c: [e.BE, t],
    v: [{
      b: /'/,
      e: /'/
    }, {
      b: /"/,
      e: /"/
    }, {
      b: /`/,
      e: /`/
    }, {
      b: "%w?\\(",
      e: "\\)",
      c: r("\\(", "\\)")
    }, {
      b: "%w?\\[",
      e: "\\]",
      c: r("\\[", "\\]")
    }, {
      b: "%w?{",
      e: "}",
      c: r("{", "}")
    }, {
      b: "%w?<",
      e: ">",
      c: r("<", ">")
    }, {
      b: "%w?/",
      e: "/"
    }, {
      b: "%w?%",
      e: "%"
    }, {
      b: "%w?-",
      e: "-"
    }, {
      b: "%w?\\|",
      e: "\\|"
    }],
    r: 0
  },
      u = {
    b: "(" + n + ")\\s*",
    c: [{
      cN: "regexp",
      c: [e.BE, t],
      v: [{
        b: "//[a-z]*",
        r: 0
      }, {
        b: "/",
        e: "/[a-z]*"
      }, {
        b: "%r\\(",
        e: "\\)",
        c: r("\\(", "\\)")
      }, {
        b: "%r\\[",
        e: "\\]",
        c: r("\\[", "\\]")
      }, {
        b: "%r{",
        e: "}",
        c: r("{", "}")
      }, {
        b: "%r<",
        e: ">",
        c: r("<", ">")
      }, {
        b: "%r/",
        e: "/"
      }, {
        b: "%r%",
        e: "%"
      }, {
        b: "%r-",
        e: "-"
      }, {
        b: "%r\\|",
        e: "\\|"
      }]
    }],
    r: 0
  },
      o = {
    cN: "regexp",
    c: [e.BE, t],
    v: [{
      b: "%r\\(",
      e: "\\)",
      c: r("\\(", "\\)")
    }, {
      b: "%r\\[",
      e: "\\]",
      c: r("\\[", "\\]")
    }, {
      b: "%r{",
      e: "}",
      c: r("{", "}")
    }, {
      b: "%r<",
      e: ">",
      c: r("<", ">")
    }, {
      b: "%r/",
      e: "/"
    }, {
      b: "%r%",
      e: "%"
    }, {
      b: "%r-",
      e: "-"
    }, {
      b: "%r\\|",
      e: "\\|"
    }],
    r: 0
  },
      _ = {
    cN: "meta",
    b: "@\\[",
    e: "\\]",
    c: [e.inherit(e.QSM, {
      cN: "meta-string"
    })]
  },
      f = [a, l, u, o, _, e.HCM, {
    cN: "class",
    bK: "class module struct",
    e: "$|;",
    i: /=/,
    c: [e.HCM, e.inherit(e.TM, {
      b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"
    }), {
      b: "<"
    }]
  }, {
    cN: "class",
    bK: "lib enum union",
    e: "$|;",
    i: /=/,
    c: [e.HCM, e.inherit(e.TM, {
      b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"
    })],
    r: 10
  }, {
    cN: "function",
    bK: "def",
    e: /\B\b/,
    c: [e.inherit(e.TM, {
      b: i,
      endsParent: !0
    })]
  }, {
    cN: "function",
    bK: "fun macro",
    e: /\B\b/,
    c: [e.inherit(e.TM, {
      b: i,
      endsParent: !0
    })],
    r: 5
  }, {
    cN: "symbol",
    b: e.UIR + "(\\!|\\?)?:",
    r: 0
  }, {
    cN: "symbol",
    b: ":",
    c: [l, {
      b: i
    }],
    r: 0
  }, {
    cN: "number",
    v: [{
      b: "\\b0b([01_]*[01])" + b
    }, {
      b: "\\b0o([0-7_]*[0-7])" + b
    }, {
      b: "\\b0x([A-Fa-f0-9_]*[A-Fa-f0-9])" + b
    }, {
      b: "\\b(([0-9][0-9_]*[0-9]|[0-9])(\\.[0-9_]*[0-9])?([eE][+-]?[0-9_]*[0-9])?)" + b
    }],
    r: 0
  }];
  return t.c = f, a.c = f.slice(1), {
    aliases: ["cr"],
    l: c,
    k: s,
    c: f
  };
});
hljs.registerLanguage("ocaml", function (e) {
  return {
    aliases: ["ml"],
    k: {
      keyword: "and as assert asr begin class constraint do done downto else end exception external for fun function functor if in include inherit! inherit initializer land lazy let lor lsl lsr lxor match method!|10 method mod module mutable new object of open! open or private rec sig struct then to try type val! val virtual when while with parser value",
      built_in: "array bool bytes char exn|5 float int int32 int64 list lazy_t|5 nativeint|5 string unit in_channel out_channel ref",
      literal: "true false"
    },
    i: /\/\/|>>/,
    l: "[a-z_]\\w*!?",
    c: [{
      cN: "literal",
      b: "\\[(\\|\\|)?\\]|\\(\\)",
      r: 0
    }, e.C("\\(\\*", "\\*\\)", {
      c: ["self"]
    }), {
      cN: "symbol",
      b: "'[A-Za-z_](?!')[\\w']*"
    }, {
      cN: "type",
      b: "`[A-Z][\\w']*"
    }, {
      cN: "type",
      b: "\\b[A-Z][\\w']*",
      r: 0
    }, {
      b: "[a-z_]\\w*'[\\w']*",
      r: 0
    }, e.inherit(e.ASM, {
      cN: "string",
      r: 0
    }), e.inherit(e.QSM, {
      i: null
    }), {
      cN: "number",
      b: "\\b(0[xX][a-fA-F0-9_]+[Lln]?|0[oO][0-7_]+[Lln]?|0[bB][01_]+[Lln]?|[0-9][0-9_]*([Lln]|(\\.[0-9_]*)?([eE][-+]?[0-9_]+)?)?)",
      r: 0
    }, {
      b: /[-=]>/
    }]
  };
});
hljs.registerLanguage("json", function (e) {
  var i = {
    literal: "true false null"
  },
      n = [e.QSM, e.CNM],
      r = {
    e: ",",
    eW: !0,
    eE: !0,
    c: n,
    k: i
  },
      t = {
    b: "{",
    e: "}",
    c: [{
      cN: "attr",
      b: /"/,
      e: /"/,
      c: [e.BE],
      i: "\\n"
    }, e.inherit(r, {
      b: /:/
    })],
    i: "\\S"
  },
      c = {
    b: "\\[",
    e: "\\]",
    c: [e.inherit(r)],
    i: "\\S"
  };
  return n.splice(n.length, 0, t, c), {
    c: n,
    k: i,
    i: "\\S"
  };
});
hljs.registerLanguage("processing", function (e) {
  return {
    k: {
      keyword: "BufferedReader PVector PFont PImage PGraphics HashMap boolean byte char color double float int long String Array FloatDict FloatList IntDict IntList JSONArray JSONObject Object StringDict StringList Table TableRow XML false synchronized int abstract float private char boolean static null if const for true while long throw strictfp finally protected import native final return void enum else break transient new catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private",
      literal: "P2D P3D HALF_PI PI QUARTER_PI TAU TWO_PI",
      title: "setup draw",
      built_in: "displayHeight displayWidth mouseY mouseX mousePressed pmouseX pmouseY key keyCode pixels focused frameCount frameRate height width size createGraphics beginDraw createShape loadShape PShape arc ellipse line point quad rect triangle bezier bezierDetail bezierPoint bezierTangent curve curveDetail curvePoint curveTangent curveTightness shape shapeMode beginContour beginShape bezierVertex curveVertex endContour endShape quadraticVertex vertex ellipseMode noSmooth rectMode smooth strokeCap strokeJoin strokeWeight mouseClicked mouseDragged mouseMoved mousePressed mouseReleased mouseWheel keyPressed keyPressedkeyReleased keyTyped print println save saveFrame day hour millis minute month second year background clear colorMode fill noFill noStroke stroke alpha blue brightness color green hue lerpColor red saturation modelX modelY modelZ screenX screenY screenZ ambient emissive shininess specular add createImage beginCamera camera endCamera frustum ortho perspective printCamera printProjection cursor frameRate noCursor exit loop noLoop popStyle pushStyle redraw binary boolean byte char float hex int str unbinary unhex join match matchAll nf nfc nfp nfs split splitTokens trim append arrayCopy concat expand reverse shorten sort splice subset box sphere sphereDetail createInput createReader loadBytes loadJSONArray loadJSONObject loadStrings loadTable loadXML open parseXML saveTable selectFolder selectInput beginRaw beginRecord createOutput createWriter endRaw endRecord PrintWritersaveBytes saveJSONArray saveJSONObject saveStream saveStrings saveXML selectOutput popMatrix printMatrix pushMatrix resetMatrix rotate rotateX rotateY rotateZ scale shearX shearY translate ambientLight directionalLight lightFalloff lights lightSpecular noLights normal pointLight spotLight image imageMode loadImage noTint requestImage tint texture textureMode textureWrap blend copy filter get loadPixels set updatePixels blendMode loadShader PShaderresetShader shader createFont loadFont text textFont textAlign textLeading textMode textSize textWidth textAscent textDescent abs ceil constrain dist exp floor lerp log mag map max min norm pow round sq sqrt acos asin atan atan2 cos degrees radians sin tan noise noiseDetail noiseSeed random randomGaussian randomSeed"
    },
    c: [e.CLCM, e.CBCM, e.ASM, e.QSM, e.CNM]
  };
});
hljs.registerLanguage("1c", function (c) {
  var e = "[a-zA-Zа-яА-Я][a-zA-Z0-9_а-яА-Я]*",
      n = "возврат дата для если и или иначе иначеесли исключение конецесли конецпопытки конецпроцедуры конецфункции конеццикла константа не перейти перем перечисление по пока попытка прервать продолжить процедура строка тогда фс функция цикл число экспорт",
      b = "ansitooem oemtoansi ввестивидсубконто ввестидату ввестизначение ввестиперечисление ввестипериод ввестиплансчетов ввестистроку ввестичисло вопрос восстановитьзначение врег выбранныйплансчетов вызватьисключение датагод датамесяц датачисло добавитьмесяц завершитьработусистемы заголовоксистемы записьжурналарегистрации запуститьприложение зафиксироватьтранзакцию значениевстроку значениевстрокувнутр значениевфайл значениеизстроки значениеизстрокивнутр значениеизфайла имякомпьютера имяпользователя каталогвременныхфайлов каталогиб каталогпользователя каталогпрограммы кодсимв командасистемы конгода конецпериодаби конецрассчитанногопериодаби конецстандартногоинтервала конквартала конмесяца коннедели лев лог лог10 макс максимальноеколичествосубконто мин монопольныйрежим названиеинтерфейса названиенабораправ назначитьвид назначитьсчет найти найтипомеченныенаудаление найтиссылки началопериодаби началостандартногоинтервала начатьтранзакцию начгода начквартала начмесяца начнедели номерднягода номерднянедели номернеделигода нрег обработкаожидания окр описаниеошибки основнойжурналрасчетов основнойплансчетов основнойязык открытьформу открытьформумодально отменитьтранзакцию очиститьокносообщений периодстр полноеимяпользователя получитьвремята получитьдатута получитьдокументта получитьзначенияотбора получитьпозициюта получитьпустоезначение получитьта прав праводоступа предупреждение префиксавтонумерации пустаястрока пустоезначение рабочаядаттьпустоезначение рабочаядата разделительстраниц разделительстрок разм разобратьпозициюдокумента рассчитатьрегистрына рассчитатьрегистрыпо сигнал симв символтабуляции создатьобъект сокрл сокрлп сокрп сообщить состояние сохранитьзначение сред статусвозврата стрдлина стрзаменить стрколичествострок стрполучитьстроку  стрчисловхождений сформироватьпозициюдокумента счетпокоду текущаядата текущеевремя типзначения типзначениястр удалитьобъекты установитьтана установитьтапо фиксшаблон формат цел шаблон",
      i = {
    b: '""'
  },
      r = {
    cN: "string",
    b: '"',
    e: '"|$',
    c: [i]
  },
      t = {
    cN: "string",
    b: "\\|",
    e: '"|$',
    c: [i]
  };
  return {
    cI: !0,
    l: e,
    k: {
      keyword: n,
      built_in: b
    },
    c: [c.CLCM, c.NM, r, t, {
      cN: "function",
      b: "(процедура|функция)",
      e: "$",
      l: e,
      k: "процедура функция",
      c: [{
        b: "экспорт",
        eW: !0,
        l: e,
        k: "экспорт",
        c: [c.CLCM]
      }, {
        cN: "params",
        b: "\\(",
        e: "\\)",
        l: e,
        k: "знач",
        c: [r, t]
      }, c.CLCM, c.inherit(c.TM, {
        b: e
      })]
    }, {
      cN: "meta",
      b: "#",
      e: "$"
    }, {
      cN: "number",
      b: "'\\d{2}\\.\\d{2}\\.(\\d{2}|\\d{4})'"
    }]
  };
});
hljs.registerLanguage("julia", function (e) {
  var r = {
    keyword: "in abstract baremodule begin bitstype break catch ccall const continue do else elseif end export finally for function global if immutable import importall let local macro module quote return try type typealias using while",
    literal: "true false ARGS CPU_CORES C_NULL DL_LOAD_PATH DevNull ENDIAN_BOM ENV I|0 Inf Inf16 Inf32 InsertionSort JULIA_HOME LOAD_PATH MS_ASYNC MS_INVALIDATE MS_SYNC MergeSort NaN NaN16 NaN32 OS_NAME QuickSort RTLD_DEEPBIND RTLD_FIRST RTLD_GLOBAL RTLD_LAZY RTLD_LOCAL RTLD_NODELETE RTLD_NOLOAD RTLD_NOW RoundDown RoundFromZero RoundNearest RoundToZero RoundUp STDERR STDIN STDOUT VERSION WORD_SIZE catalan cglobal e|0 eu|0 eulergamma golden im nothing pi γ π φ Inf64 NaN64 RoundNearestTiesAway RoundNearestTiesUp ",
    built_in: "ANY ASCIIString AbstractArray AbstractRNG AbstractSparseArray Any ArgumentError Array Associative Base64Pipe Bidiagonal BigFloat BigInt BitArray BitMatrix BitVector Bool BoundsError Box CFILE Cchar Cdouble Cfloat Char CharString Cint Clong Clonglong ClusterManager Cmd Coff_t Colon Complex Complex128 Complex32 Complex64 Condition Cptrdiff_t Cshort Csize_t Cssize_t Cuchar Cuint Culong Culonglong Cushort Cwchar_t DArray DataType DenseArray Diagonal Dict DimensionMismatch DirectIndexString Display DivideError DomainError EOFError EachLine Enumerate ErrorException Exception Expr Factorization FileMonitor FileOffset Filter Float16 Float32 Float64 FloatRange FloatingPoint Function GetfieldNode GotoNode Hermitian IO IOBuffer IOStream IPv4 IPv6 InexactError Int Int128 Int16 Int32 Int64 Int8 IntSet Integer InterruptException IntrinsicFunction KeyError LabelNode LambdaStaticData LineNumberNode LoadError LocalProcess MIME MathConst MemoryError MersenneTwister Method MethodError MethodTable Module NTuple NewvarNode Nothing Number ObjectIdDict OrdinalRange OverflowError ParseError PollingFileWatcher ProcessExitedException ProcessGroup Ptr QuoteNode Range Range1 Ranges Rational RawFD Real Regex RegexMatch RemoteRef RepString RevString RopeString RoundingMode Set SharedArray Signed SparseMatrixCSC StackOverflowError Stat StatStruct StepRange String SubArray SubString SymTridiagonal Symbol SymbolNode Symmetric SystemError Task TextDisplay Timer TmStruct TopNode Triangular Tridiagonal Type TypeConstructor TypeError TypeName TypeVar UTF16String UTF32String UTF8String UdpSocket Uint Uint128 Uint16 Uint32 Uint64 Uint8 UndefRefError UndefVarError UniformScaling UnionType UnitRange Unsigned Vararg VersionNumber WString WeakKeyDict WeakRef Woodbury Zip AbstractChannel AbstractFloat AbstractString AssertionError Base64DecodePipe Base64EncodePipe BufferStream CapturedException CartesianIndex CartesianRange Channel Cintmax_t CompositeException Cstring Cuintmax_t Cwstring Date DateTime Dims Enum GenSym GlobalRef HTML InitError InvalidStateException Irrational LinSpace LowerTriangular NullException Nullable OutOfMemoryError Pair PartialQuickSort Pipe RandomDevice ReadOnlyMemoryError ReentrantLock Ref RemoteException SegmentationFault SerializationState SimpleVector TCPSocket Text Tuple UDPSocket UInt UInt128 UInt16 UInt32 UInt64 UInt8 UnicodeError Union UpperTriangular Val Void WorkerConfig AbstractMatrix AbstractSparseMatrix AbstractSparseVector AbstractVecOrMat AbstractVector DenseMatrix DenseVecOrMat DenseVector Matrix SharedMatrix SharedVector StridedArray StridedMatrix StridedVecOrMat StridedVector VecOrMat Vector "
  },
      t = "[A-Za-z_\\u00A1-\\uFFFF][A-Za-z_0-9\\u00A1-\\uFFFF]*",
      a = {
    l: t,
    k: r,
    i: /<\//
  },
      n = {
    cN: "type",
    b: /::/
  },
      o = {
    cN: "type",
    b: /<:/
  },
      i = {
    cN: "number",
    b: /(\b0x[\d_]*(\.[\d_]*)?|0x\.\d[\d_]*)p[-+]?\d+|\b0[box][a-fA-F0-9][a-fA-F0-9_]*|(\b\d[\d_]*(\.[\d_]*)?|\.\d[\d_]*)([eEfF][-+]?\d+)?/,
    r: 0
  },
      l = {
    cN: "string",
    b: /'(.|\\[xXuU][a-zA-Z0-9]+)'/
  },
      c = {
    cN: "subst",
    b: /\$\(/,
    e: /\)/,
    k: r
  },
      s = {
    cN: "variable",
    b: "\\$" + t
  },
      d = {
    cN: "string",
    c: [e.BE, c, s],
    v: [{
      b: /\w*"""/,
      e: /"""\w*/,
      r: 10
    }, {
      b: /\w*"/,
      e: /"\w*/
    }]
  },
      S = {
    cN: "string",
    c: [e.BE, c, s],
    b: "`",
    e: "`"
  },
      u = {
    cN: "meta",
    b: "@" + t
  },
      g = {
    cN: "comment",
    v: [{
      b: "#=",
      e: "=#",
      r: 10
    }, {
      b: "#",
      e: "$"
    }]
  };
  return a.c = [i, l, n, o, d, S, u, g, e.HCM], c.c = a.c, a;
});
hljs.registerLanguage("scss", function (e) {
  var t = "[a-zA-Z-][a-zA-Z0-9_-]*",
      i = {
    cN: "variable",
    b: "(\\$" + t + ")\\b"
  },
      r = {
    cN: "number",
    b: "#[0-9A-Fa-f]+"
  };
  ({
    cN: "attribute",
    b: "[A-Z\\_\\.\\-]+",
    e: ":",
    eE: !0,
    i: "[^\\s]",
    starts: {
      eW: !0,
      eE: !0,
      c: [r, e.CSSNM, e.QSM, e.ASM, e.CBCM, {
        cN: "meta",
        b: "!important"
      }]
    }
  });
  return {
    cI: !0,
    i: "[=/|']",
    c: [e.CLCM, e.CBCM, {
      cN: "selector-id",
      b: "\\#[A-Za-z0-9_-]+",
      r: 0
    }, {
      cN: "selector-class",
      b: "\\.[A-Za-z0-9_-]+",
      r: 0
    }, {
      cN: "selector-attr",
      b: "\\[",
      e: "\\]",
      i: "$"
    }, {
      cN: "selector-tag",
      b: "\\b(a|abbr|acronym|address|area|article|aside|audio|b|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|frame|frameset|(h[1-6])|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video)\\b",
      r: 0
    }, {
      b: ":(visited|valid|root|right|required|read-write|read-only|out-range|optional|only-of-type|only-child|nth-of-type|nth-last-of-type|nth-last-child|nth-child|not|link|left|last-of-type|last-child|lang|invalid|indeterminate|in-range|hover|focus|first-of-type|first-line|first-letter|first-child|first|enabled|empty|disabled|default|checked|before|after|active)"
    }, {
      b: "::(after|before|choices|first-letter|first-line|repeat-index|repeat-item|selection|value)"
    }, i, {
      cN: "attribute",
      b: "\\b(z-index|word-wrap|word-spacing|word-break|width|widows|white-space|visibility|vertical-align|unicode-bidi|transition-timing-function|transition-property|transition-duration|transition-delay|transition|transform-style|transform-origin|transform|top|text-underline-position|text-transform|text-shadow|text-rendering|text-overflow|text-indent|text-decoration-style|text-decoration-line|text-decoration-color|text-decoration|text-align-last|text-align|tab-size|table-layout|right|resize|quotes|position|pointer-events|perspective-origin|perspective|page-break-inside|page-break-before|page-break-after|padding-top|padding-right|padding-left|padding-bottom|padding|overflow-y|overflow-x|overflow-wrap|overflow|outline-width|outline-style|outline-offset|outline-color|outline|orphans|order|opacity|object-position|object-fit|normal|none|nav-up|nav-right|nav-left|nav-index|nav-down|min-width|min-height|max-width|max-height|mask|marks|margin-top|margin-right|margin-left|margin-bottom|margin|list-style-type|list-style-position|list-style-image|list-style|line-height|letter-spacing|left|justify-content|initial|inherit|ime-mode|image-orientation|image-resolution|image-rendering|icon|hyphens|height|font-weight|font-variant-ligatures|font-variant|font-style|font-stretch|font-size-adjust|font-size|font-language-override|font-kerning|font-feature-settings|font-family|font|float|flex-wrap|flex-shrink|flex-grow|flex-flow|flex-direction|flex-basis|flex|filter|empty-cells|display|direction|cursor|counter-reset|counter-increment|content|column-width|column-span|column-rule-width|column-rule-style|column-rule-color|column-rule|column-gap|column-fill|column-count|columns|color|clip-path|clip|clear|caption-side|break-inside|break-before|break-after|box-sizing|box-shadow|box-decoration-break|bottom|border-width|border-top-width|border-top-style|border-top-right-radius|border-top-left-radius|border-top-color|border-top|border-style|border-spacing|border-right-width|border-right-style|border-right-color|border-right|border-radius|border-left-width|border-left-style|border-left-color|border-left|border-image-width|border-image-source|border-image-slice|border-image-repeat|border-image-outset|border-image|border-color|border-collapse|border-bottom-width|border-bottom-style|border-bottom-right-radius|border-bottom-left-radius|border-bottom-color|border-bottom|border|background-size|background-repeat|background-position|background-origin|background-image|background-color|background-clip|background-attachment|background-blend-mode|background|backface-visibility|auto|animation-timing-function|animation-play-state|animation-name|animation-iteration-count|animation-fill-mode|animation-duration|animation-direction|animation-delay|animation|align-self|align-items|align-content)\\b",
      i: "[^\\s]"
    }, {
      b: "\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b"
    }, {
      b: ":",
      e: ";",
      c: [i, r, e.CSSNM, e.QSM, e.ASM, {
        cN: "meta",
        b: "!important"
      }]
    }, {
      b: "@",
      e: "[{;]",
      k: "mixin include extend for if else each while charset import debug media page content font-face namespace warn",
      c: [i, e.QSM, e.ASM, r, e.CSSNM, {
        b: "\\s[A-Za-z0-9_.-]+",
        r: 0
      }]
    }]
  };
});
hljs.registerLanguage("perl", function (e) {
  var t = "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when",
      r = {
    cN: "subst",
    b: "[$@]\\{",
    e: "\\}",
    k: t
  },
      s = {
    b: "->{",
    e: "}"
  },
      n = {
    v: [{
      b: /\$\d/
    }, {
      b: /[\$%@](\^\w\b|#\w+(::\w+)*|{\w+}|\w+(::\w*)*)/
    }, {
      b: /[\$%@][^\s\w{]/,
      r: 0
    }]
  },
      i = [e.BE, r, n],
      o = [n, e.HCM, e.C("^\\=\\w", "\\=cut", {
    eW: !0
  }), s, {
    cN: "string",
    c: i,
    v: [{
      b: "q[qwxr]?\\s*\\(",
      e: "\\)",
      r: 5
    }, {
      b: "q[qwxr]?\\s*\\[",
      e: "\\]",
      r: 5
    }, {
      b: "q[qwxr]?\\s*\\{",
      e: "\\}",
      r: 5
    }, {
      b: "q[qwxr]?\\s*\\|",
      e: "\\|",
      r: 5
    }, {
      b: "q[qwxr]?\\s*\\<",
      e: "\\>",
      r: 5
    }, {
      b: "qw\\s+q",
      e: "q",
      r: 5
    }, {
      b: "'",
      e: "'",
      c: [e.BE]
    }, {
      b: '"',
      e: '"'
    }, {
      b: "`",
      e: "`",
      c: [e.BE]
    }, {
      b: "{\\w+}",
      c: [],
      r: 0
    }, {
      b: "-?\\w+\\s*\\=\\>",
      c: [],
      r: 0
    }]
  }, {
    cN: "number",
    b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
    r: 0
  }, {
    b: "(\\/\\/|" + e.RSR + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
    k: "split return print reverse grep",
    r: 0,
    c: [e.HCM, {
      cN: "regexp",
      b: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",
      r: 10
    }, {
      cN: "regexp",
      b: "(m|qr)?/",
      e: "/[a-z]*",
      c: [e.BE],
      r: 0
    }]
  }, {
    cN: "function",
    bK: "sub",
    e: "(\\s*\\(.*?\\))?[;{]",
    eE: !0,
    r: 5,
    c: [e.TM]
  }, {
    b: "-\\w\\b",
    r: 0
  }, {
    b: "^__DATA__$",
    e: "^__END__$",
    sL: "mojolicious",
    c: [{
      b: "^@@.*",
      e: "$",
      cN: "comment"
    }]
  }];
  return r.c = o, s.c = o, {
    aliases: ["pl", "pm"],
    l: /[\w\.]+/,
    k: t,
    c: o
  };
});
hljs.registerLanguage("mojolicious", function (e) {
  return {
    sL: "xml",
    c: [{
      cN: "meta",
      b: "^__(END|DATA)__$"
    }, {
      b: "^\\s*%{1,2}={0,2}",
      e: "$",
      sL: "perl"
    }, {
      b: "<%{1,2}={0,2}",
      e: "={0,1}%>",
      sL: "perl",
      eB: !0,
      eE: !0
    }]
  };
});
hljs.registerLanguage("lsl", function (E) {
  var T = {
    cN: "subst",
    b: /\\[tn"\\]/
  },
      e = {
    cN: "string",
    b: '"',
    e: '"',
    c: [T]
  },
      A = {
    cN: "number",
    b: E.CNR
  },
      R = {
    cN: "literal",
    v: [{
      b: "\\b(?:PI|TWO_PI|PI_BY_TWO|DEG_TO_RAD|RAD_TO_DEG|SQRT2)\\b"
    }, {
      b: "\\b(?:XP_ERROR_(?:EXPERIENCES_DISABLED|EXPERIENCE_(?:DISABLED|SUSPENDED)|INVALID_(?:EXPERIENCE|PARAMETERS)|KEY_NOT_FOUND|MATURITY_EXCEEDED|NONE|NOT_(?:FOUND|PERMITTED(?:_LAND)?)|NO_EXPERIENCE|QUOTA_EXCEEDED|RETRY_UPDATE|STORAGE_EXCEPTION|STORE_DISABLED|THROTTLED|UNKNOWN_ERROR)|JSON_APPEND|STATUS_(?:PHYSICS|ROTATE_[XYZ]|PHANTOM|SANDBOX|BLOCK_GRAB(?:_OBJECT)?|(?:DIE|RETURN)_AT_EDGE|CAST_SHADOWS|OK|MALFORMED_PARAMS|TYPE_MISMATCH|BOUNDS_ERROR|NOT_(?:FOUND|SUPPORTED)|INTERNAL_ERROR|WHITELIST_FAILED)|AGENT(?:_(?:BY_(?:LEGACY_|USER)NAME|FLYING|ATTACHMENTS|SCRIPTED|MOUSELOOK|SITTING|ON_OBJECT|AWAY|WALKING|IN_AIR|TYPING|CROUCHING|BUSY|ALWAYS_RUN|AUTOPILOT|LIST_(?:PARCEL(?:_OWNER)?|REGION)))?|CAMERA_(?:PITCH|DISTANCE|BEHINDNESS_(?:ANGLE|LAG)|(?:FOCUS|POSITION)(?:_(?:THRESHOLD|LOCKED|LAG))?|FOCUS_OFFSET|ACTIVE)|ANIM_ON|LOOP|REVERSE|PING_PONG|SMOOTH|ROTATE|SCALE|ALL_SIDES|LINK_(?:ROOT|SET|ALL_(?:OTHERS|CHILDREN)|THIS)|ACTIVE|PASS(?:IVE|_(?:ALWAYS|IF_NOT_HANDLED|NEVER))|SCRIPTED|CONTROL_(?:FWD|BACK|(?:ROT_)?(?:LEFT|RIGHT)|UP|DOWN|(?:ML_)?LBUTTON)|PERMISSION_(?:RETURN_OBJECTS|DEBIT|OVERRIDE_ANIMATIONS|SILENT_ESTATE_MANAGEMENT|TAKE_CONTROLS|TRIGGER_ANIMATION|ATTACH|CHANGE_LINKS|(?:CONTROL|TRACK)_CAMERA|TELEPORT)|INVENTORY_(?:TEXTURE|SOUND|OBJECT|SCRIPT|LANDMARK|CLOTHING|NOTECARD|BODYPART|ANIMATION|GESTURE|ALL|NONE)|CHANGED_(?:INVENTORY|COLOR|SHAPE|SCALE|TEXTURE|LINK|ALLOWED_DROP|OWNER|REGION(?:_START)?|TELEPORT|MEDIA)|OBJECT_(?:CLICK_ACTION|HOVER_HEIGHT|LAST_OWNER_ID|(?:PHYSICS|SERVER|STREAMING)_COST|UNKNOWN_DETAIL|CHARACTER_TIME|PHANTOM|PHYSICS|TEMP_ON_REZ|NAME|DESC|POS|PRIM_(?:COUNT|EQUIVALENCE)|RETURN_(?:PARCEL(?:_OWNER)?|REGION)|REZZER_KEY|ROO?T|VELOCITY|OMEGA|OWNER|GROUP|CREATOR|ATTACHED_POINT|RENDER_WEIGHT|(?:BODY_SHAPE|PATHFINDING)_TYPE|(?:RUNNING|TOTAL)_SCRIPT_COUNT|TOTAL_INVENTORY_COUNT|SCRIPT_(?:MEMORY|TIME))|TYPE_(?:INTEGER|FLOAT|STRING|KEY|VECTOR|ROTATION|INVALID)|(?:DEBUG|PUBLIC)_CHANNEL|ATTACH_(?:AVATAR_CENTER|CHEST|HEAD|BACK|PELVIS|MOUTH|CHIN|NECK|NOSE|BELLY|[LR](?:SHOULDER|HAND|FOOT|EAR|EYE|[UL](?:ARM|LEG)|HIP)|(?:LEFT|RIGHT)_PEC|HUD_(?:CENTER_[12]|TOP_(?:RIGHT|CENTER|LEFT)|BOTTOM(?:_(?:RIGHT|LEFT))?)|[LR]HAND_RING1|TAIL_(?:BASE|TIP)|[LR]WING|FACE_(?:JAW|[LR]EAR|[LR]EYE|TOUNGE)|GROIN|HIND_[LR]FOOT)|LAND_(?:LEVEL|RAISE|LOWER|SMOOTH|NOISE|REVERT)|DATA_(?:ONLINE|NAME|BORN|SIM_(?:POS|STATUS|RATING)|PAYINFO)|PAYMENT_INFO_(?:ON_FILE|USED)|REMOTE_DATA_(?:CHANNEL|REQUEST|REPLY)|PSYS_(?:PART_(?:BF_(?:ZERO|ONE(?:_MINUS_(?:DEST_COLOR|SOURCE_(ALPHA|COLOR)))?|DEST_COLOR|SOURCE_(ALPHA|COLOR))|BLEND_FUNC_(DEST|SOURCE)|FLAGS|(?:START|END)_(?:COLOR|ALPHA|SCALE|GLOW)|MAX_AGE|(?:RIBBON|WIND|INTERP_(?:COLOR|SCALE)|BOUNCE|FOLLOW_(?:SRC|VELOCITY)|TARGET_(?:POS|LINEAR)|EMISSIVE)_MASK)|SRC_(?:MAX_AGE|PATTERN|ANGLE_(?:BEGIN|END)|BURST_(?:RATE|PART_COUNT|RADIUS|SPEED_(?:MIN|MAX))|ACCEL|TEXTURE|TARGET_KEY|OMEGA|PATTERN_(?:DROP|EXPLODE|ANGLE(?:_CONE(?:_EMPTY)?)?)))|VEHICLE_(?:REFERENCE_FRAME|TYPE_(?:NONE|SLED|CAR|BOAT|AIRPLANE|BALLOON)|(?:LINEAR|ANGULAR)_(?:FRICTION_TIMESCALE|MOTOR_DIRECTION)|LINEAR_MOTOR_OFFSET|HOVER_(?:HEIGHT|EFFICIENCY|TIMESCALE)|BUOYANCY|(?:LINEAR|ANGULAR)_(?:DEFLECTION_(?:EFFICIENCY|TIMESCALE)|MOTOR_(?:DECAY_)?TIMESCALE)|VERTICAL_ATTRACTION_(?:EFFICIENCY|TIMESCALE)|BANKING_(?:EFFICIENCY|MIX|TIMESCALE)|FLAG_(?:NO_DEFLECTION_UP|LIMIT_(?:ROLL_ONLY|MOTOR_UP)|HOVER_(?:(?:WATER|TERRAIN|UP)_ONLY|GLOBAL_HEIGHT)|MOUSELOOK_(?:STEER|BANK)|CAMERA_DECOUPLED))|PRIM_(?:ALPHA_MODE(?:_(?:BLEND|EMISSIVE|MASK|NONE))?|NORMAL|SPECULAR|TYPE(?:_(?:BOX|CYLINDER|PRISM|SPHERE|TORUS|TUBE|RING|SCULPT))?|HOLE_(?:DEFAULT|CIRCLE|SQUARE|TRIANGLE)|MATERIAL(?:_(?:STONE|METAL|GLASS|WOOD|FLESH|PLASTIC|RUBBER))?|SHINY_(?:NONE|LOW|MEDIUM|HIGH)|BUMP_(?:NONE|BRIGHT|DARK|WOOD|BARK|BRICKS|CHECKER|CONCRETE|TILE|STONE|DISKS|GRAVEL|BLOBS|SIDING|LARGETILE|STUCCO|SUCTION|WEAVE)|TEXGEN_(?:DEFAULT|PLANAR)|SCULPT_(?:TYPE_(?:SPHERE|TORUS|PLANE|CYLINDER|MASK)|FLAG_(?:MIRROR|INVERT))|PHYSICS(?:_(?:SHAPE_(?:CONVEX|NONE|PRIM|TYPE)))?|(?:POS|ROT)_LOCAL|SLICE|TEXT|FLEXIBLE|POINT_LIGHT|TEMP_ON_REZ|PHANTOM|POSITION|SIZE|ROTATION|TEXTURE|NAME|OMEGA|DESC|LINK_TARGET|COLOR|BUMP_SHINY|FULLBRIGHT|TEXGEN|GLOW|MEDIA_(?:ALT_IMAGE_ENABLE|CONTROLS|(?:CURRENT|HOME)_URL|AUTO_(?:LOOP|PLAY|SCALE|ZOOM)|FIRST_CLICK_INTERACT|(?:WIDTH|HEIGHT)_PIXELS|WHITELIST(?:_ENABLE)?|PERMS_(?:INTERACT|CONTROL)|PARAM_MAX|CONTROLS_(?:STANDARD|MINI)|PERM_(?:NONE|OWNER|GROUP|ANYONE)|MAX_(?:URL_LENGTH|WHITELIST_(?:SIZE|COUNT)|(?:WIDTH|HEIGHT)_PIXELS)))|MASK_(?:BASE|OWNER|GROUP|EVERYONE|NEXT)|PERM_(?:TRANSFER|MODIFY|COPY|MOVE|ALL)|PARCEL_(?:MEDIA_COMMAND_(?:STOP|PAUSE|PLAY|LOOP|TEXTURE|URL|TIME|AGENT|UNLOAD|AUTO_ALIGN|TYPE|SIZE|DESC|LOOP_SET)|FLAG_(?:ALLOW_(?:FLY|(?:GROUP_)?SCRIPTS|LANDMARK|TERRAFORM|DAMAGE|CREATE_(?:GROUP_)?OBJECTS)|USE_(?:ACCESS_(?:GROUP|LIST)|BAN_LIST|LAND_PASS_LIST)|LOCAL_SOUND_ONLY|RESTRICT_PUSHOBJECT|ALLOW_(?:GROUP|ALL)_OBJECT_ENTRY)|COUNT_(?:TOTAL|OWNER|GROUP|OTHER|SELECTED|TEMP)|DETAILS_(?:NAME|DESC|OWNER|GROUP|AREA|ID|SEE_AVATARS))|LIST_STAT_(?:MAX|MIN|MEAN|MEDIAN|STD_DEV|SUM(?:_SQUARES)?|NUM_COUNT|GEOMETRIC_MEAN|RANGE)|PAY_(?:HIDE|DEFAULT)|REGION_FLAG_(?:ALLOW_DAMAGE|FIXED_SUN|BLOCK_TERRAFORM|SANDBOX|DISABLE_(?:COLLISIONS|PHYSICS)|BLOCK_FLY|ALLOW_DIRECT_TELEPORT|RESTRICT_PUSHOBJECT)|HTTP_(?:METHOD|MIMETYPE|BODY_(?:MAXLENGTH|TRUNCATED)|CUSTOM_HEADER|PRAGMA_NO_CACHE|VERBOSE_THROTTLE|VERIFY_CERT)|STRING_(?:TRIM(?:_(?:HEAD|TAIL))?)|CLICK_ACTION_(?:NONE|TOUCH|SIT|BUY|PAY|OPEN(?:_MEDIA)?|PLAY|ZOOM)|TOUCH_INVALID_FACE|PROFILE_(?:NONE|SCRIPT_MEMORY)|RC_(?:DATA_FLAGS|DETECT_PHANTOM|GET_(?:LINK_NUM|NORMAL|ROOT_KEY)|MAX_HITS|REJECT_(?:TYPES|AGENTS|(?:NON)?PHYSICAL|LAND))|RCERR_(?:CAST_TIME_EXCEEDED|SIM_PERF_LOW|UNKNOWN)|ESTATE_ACCESS_(?:ALLOWED_(?:AGENT|GROUP)_(?:ADD|REMOVE)|BANNED_AGENT_(?:ADD|REMOVE))|DENSITY|FRICTION|RESTITUTION|GRAVITY_MULTIPLIER|KFM_(?:COMMAND|CMD_(?:PLAY|STOP|PAUSE)|MODE|FORWARD|LOOP|PING_PONG|REVERSE|DATA|ROTATION|TRANSLATION)|ERR_(?:GENERIC|PARCEL_PERMISSIONS|MALFORMED_PARAMS|RUNTIME_PERMISSIONS|THROTTLED)|CHARACTER_(?:CMD_(?:(?:SMOOTH_)?STOP|JUMP)|DESIRED_(?:TURN_)?SPEED|RADIUS|STAY_WITHIN_PARCEL|LENGTH|ORIENTATION|ACCOUNT_FOR_SKIPPED_FRAMES|AVOIDANCE_MODE|TYPE(?:_(?:[ABCD]|NONE))?|MAX_(?:DECEL|TURN_RADIUS|(?:ACCEL|SPEED)))|PURSUIT_(?:OFFSET|FUZZ_FACTOR|GOAL_TOLERANCE|INTERCEPT)|REQUIRE_LINE_OF_SIGHT|FORCE_DIRECT_PATH|VERTICAL|HORIZONTAL|AVOID_(?:CHARACTERS|DYNAMIC_OBSTACLES|NONE)|PU_(?:EVADE_(?:HIDDEN|SPOTTED)|FAILURE_(?:DYNAMIC_PATHFINDING_DISABLED|INVALID_(?:GOAL|START)|NO_(?:NAVMESH|VALID_DESTINATION)|OTHER|TARGET_GONE|(?:PARCEL_)?UNREACHABLE)|(?:GOAL|SLOWDOWN_DISTANCE)_REACHED)|TRAVERSAL_TYPE(?:_(?:FAST|NONE|SLOW))?|CONTENT_TYPE_(?:ATOM|FORM|HTML|JSON|LLSD|RSS|TEXT|XHTML|XML)|GCNP_(?:RADIUS|STATIC)|(?:PATROL|WANDER)_PAUSE_AT_WAYPOINTS|OPT_(?:AVATAR|CHARACTER|EXCLUSION_VOLUME|LEGACY_LINKSET|MATERIAL_VOLUME|OTHER|STATIC_OBSTACLE|WALKABLE)|SIM_STAT_PCT_CHARS_STEPPED)\\b"
    }, {
      b: "\\b(?:FALSE|TRUE)\\b"
    }, {
      b: "\\b(?:ZERO_ROTATION)\\b"
    }, {
      b: "\\b(?:EOF|JSON_(?:ARRAY|DELETE|FALSE|INVALID|NULL|NUMBER|OBJECT|STRING|TRUE)|NULL_KEY|TEXTURE_(?:BLANK|DEFAULT|MEDIA|PLYWOOD|TRANSPARENT)|URL_REQUEST_(?:GRANTED|DENIED))\\b"
    }, {
      b: "\\b(?:ZERO_VECTOR|TOUCH_INVALID_(?:TEXCOORD|VECTOR))\\b"
    }]
  },
      O = {
    cN: "built_in",
    b: "\\b(?:ll(?:AgentInExperience|(?:Create|DataSize|Delete|KeyCount|Keys|Read|Update)KeyValue|GetExperience(?:Details|ErrorMessage)|ReturnObjectsBy(?:ID|Owner)|Json(?:2List|[GS]etValue|ValueType)|Sin|Cos|Tan|Atan2|Sqrt|Pow|Abs|Fabs|Frand|Floor|Ceil|Round|Vec(?:Mag|Norm|Dist)|Rot(?:Between|2(?:Euler|Fwd|Left|Up))|(?:Euler|Axes)2Rot|Whisper|(?:Region|Owner)?Say|Shout|Listen(?:Control|Remove)?|Sensor(?:Repeat|Remove)?|Detected(?:Name|Key|Owner|Type|Pos|Vel|Grab|Rot|Group|LinkNumber)|Die|Ground|Wind|(?:[GS]et)(?:AnimationOverride|MemoryLimit|PrimMediaParams|ParcelMusicURL|Object(?:Desc|Name)|PhysicsMaterial|Status|Scale|Color|Alpha|Texture|Pos|Rot|Force|Torque)|ResetAnimationOverride|(?:Scale|Offset|Rotate)Texture|(?:Rot)?Target(?:Remove)?|(?:Stop)?MoveToTarget|Apply(?:Rotational)?Impulse|Set(?:KeyframedMotion|ContentType|RegionPos|(?:Angular)?Velocity|Buoyancy|HoverHeight|ForceAndTorque|TimerEvent|ScriptState|Damage|TextureAnim|Sound(?:Queueing|Radius)|Vehicle(?:Type|(?:Float|Vector|Rotation)Param)|(?:Touch|Sit)?Text|Camera(?:Eye|At)Offset|PrimitiveParams|ClickAction|Link(?:Alpha|Color|PrimitiveParams(?:Fast)?|Texture(?:Anim)?|Camera|Media)|RemoteScriptAccessPin|PayPrice|LocalRot)|ScaleByFactor|Get(?:(?:Max|Min)ScaleFactor|ClosestNavPoint|StaticPath|SimStats|Env|PrimitiveParams|Link(?:PrimitiveParams|Number(?:OfSides)?|Key|Name|Media)|HTTPHeader|FreeURLs|Object(?:Details|PermMask|PrimCount)|Parcel(?:MaxPrims|Details|Prim(?:Count|Owners))|Attached(?:List)?|(?:SPMax|Free|Used)Memory|Region(?:Name|TimeDilation|FPS|Corner|AgentCount)|Root(?:Position|Rotation)|UnixTime|(?:Parcel|Region)Flags|(?:Wall|GMT)clock|SimulatorHostname|BoundingBox|GeometricCenter|Creator|NumberOf(?:Prims|NotecardLines|Sides)|Animation(?:List)?|(?:Camera|Local)(?:Pos|Rot)|Vel|Accel|Omega|Time(?:stamp|OfDay)|(?:Object|CenterOf)?Mass|MassMKS|Energy|Owner|(?:Owner)?Key|SunDirection|Texture(?:Offset|Scale|Rot)|Inventory(?:Number|Name|Key|Type|Creator|PermMask)|Permissions(?:Key)?|StartParameter|List(?:Length|EntryType)|Date|Agent(?:Size|Info|Language|List)|LandOwnerAt|NotecardLine|Script(?:Name|State))|(?:Get|Reset|GetAndReset)Time|PlaySound(?:Slave)?|LoopSound(?:Master|Slave)?|(?:Trigger|Stop|Preload)Sound|(?:(?:Get|Delete)Sub|Insert)String|To(?:Upper|Lower)|Give(?:InventoryList|Money)|RezObject|(?:Stop)?LookAt|Sleep|CollisionFilter|(?:Take|Release)Controls|DetachFromAvatar|AttachToAvatar(?:Temp)?|InstantMessage|(?:GetNext)?Email|StopHover|MinEventDelay|RotLookAt|String(?:Length|Trim)|(?:Start|Stop)Animation|TargetOmega|Request(?:Experience)?Permissions|(?:Create|Break)Link|BreakAllLinks|(?:Give|Remove)Inventory|Water|PassTouches|Request(?:Agent|Inventory)Data|TeleportAgent(?:Home|GlobalCoords)?|ModifyLand|CollisionSound|ResetScript|MessageLinked|PushObject|PassCollisions|AxisAngle2Rot|Rot2(?:Axis|Angle)|A(?:cos|sin)|AngleBetween|AllowInventoryDrop|SubStringIndex|List2(?:CSV|Integer|Json|Float|String|Key|Vector|Rot|List(?:Strided)?)|DeleteSubList|List(?:Statistics|Sort|Randomize|(?:Insert|Find|Replace)List)|EdgeOfWorld|AdjustSoundVolume|Key2Name|TriggerSoundLimited|EjectFromLand|(?:CSV|ParseString)2List|OverMyLand|SameGroup|UnSit|Ground(?:Slope|Normal|Contour)|GroundRepel|(?:Set|Remove)VehicleFlags|(?:AvatarOn)?(?:Link)?SitTarget|Script(?:Danger|Profiler)|Dialog|VolumeDetect|ResetOtherScript|RemoteLoadScriptPin|(?:Open|Close)RemoteDataChannel|SendRemoteData|RemoteDataReply|(?:Integer|String)ToBase64|XorBase64|Log(?:10)?|Base64To(?:String|Integer)|ParseStringKeepNulls|RezAtRoot|RequestSimulatorData|ForceMouselook|(?:Load|Release|(?:E|Une)scape)URL|ParcelMedia(?:CommandList|Query)|ModPow|MapDestination|(?:RemoveFrom|AddTo|Reset)Land(?:Pass|Ban)List|(?:Set|Clear)CameraParams|HTTP(?:Request|Response)|TextBox|DetectedTouch(?:UV|Face|Pos|(?:N|Bin)ormal|ST)|(?:MD5|SHA1|DumpList2)String|Request(?:Secure)?URL|Clear(?:Prim|Link)Media|(?:Link)?ParticleSystem|(?:Get|Request)(?:Username|DisplayName)|RegionSayTo|CastRay|GenerateKey|TransferLindenDollars|ManageEstateAccess|(?:Create|Delete)Character|ExecCharacterCmd|Evade|FleeFrom|NavigateTo|PatrolPoints|Pursue|UpdateCharacter|WanderWithin))\\b"
  };
  return {
    i: ":",
    c: [e, {
      cN: "comment",
      v: [E.C("//", "$"), E.C("/\\*", "\\*/")]
    }, A, {
      cN: "section",
      v: [{
        b: "\\b(?:state|default)\\b"
      }, {
        b: "\\b(?:state_(?:entry|exit)|touch(?:_(?:start|end))?|(?:land_)?collision(?:_(?:start|end))?|timer|listen|(?:no_)?sensor|control|(?:not_)?at_(?:rot_)?target|money|email|experience_permissions(?:_denied)?|run_time_permissions|changed|attach|dataserver|moving_(?:start|end)|link_message|(?:on|object)_rez|remote_data|http_re(?:sponse|quest)|path_update|transaction_result)\\b"
      }]
    }, O, R, {
      cN: "type",
      b: "\\b(?:integer|float|string|key|vector|quaternion|rotation|list)\\b"
    }]
  };
});
hljs.registerLanguage("dos", function (e) {
  var r = e.C(/^\s*@?rem\b/, /$/, {
    r: 10
  }),
      t = {
    cN: "symbol",
    b: "^\\s*[A-Za-z._?][A-Za-z0-9_$#@~.?]*(:|\\s+label)",
    r: 0
  };
  return {
    aliases: ["bat", "cmd"],
    cI: !0,
    i: /\/\*/,
    k: {
      keyword: "if else goto for in do call exit not exist errorlevel defined equ neq lss leq gtr geq",
      built_in: "prn nul lpt3 lpt2 lpt1 con com4 com3 com2 com1 aux shift cd dir echo setlocal endlocal set pause copy append assoc at attrib break cacls cd chcp chdir chkdsk chkntfs cls cmd color comp compact convert date dir diskcomp diskcopy doskey erase fs find findstr format ftype graftabl help keyb label md mkdir mode more move path pause print popd pushd promt rd recover rem rename replace restore rmdir shiftsort start subst time title tree type ver verify vol ping net ipconfig taskkill xcopy ren del"
    },
    c: [{
      cN: "variable",
      b: /%%[^ ]|%[^ ]+?%|![^ ]+?!/
    }, {
      cN: "function",
      b: t.b,
      e: "goto:eof",
      c: [e.inherit(e.TM, {
        b: "([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*"
      }), r]
    }, {
      cN: "number",
      b: "\\b\\d+",
      r: 0
    }, r]
  };
});
hljs.registerLanguage("puppet", function (e) {
  var s = {
    keyword: "and case default else elsif false if in import enherits node or true undef unless main settings $string ",
    literal: "alias audit before loglevel noop require subscribe tag owner ensure group mode name|0 changes context force incl lens load_path onlyif provider returns root show_diff type_check en_address ip_address realname command environment hour monute month monthday special target weekday creates cwd ogoutput refresh refreshonly tries try_sleep umask backup checksum content ctime force ignore links mtime purge recurse recurselimit replace selinux_ignore_defaults selrange selrole seltype seluser source souirce_permissions sourceselect validate_cmd validate_replacement allowdupe attribute_membership auth_membership forcelocal gid ia_load_module members system host_aliases ip allowed_trunk_vlans description device_url duplex encapsulation etherchannel native_vlan speed principals allow_root auth_class auth_type authenticate_user k_of_n mechanisms rule session_owner shared options device fstype enable hasrestart directory present absent link atboot blockdevice device dump pass remounts poller_tag use message withpath adminfile allow_virtual allowcdrom category configfiles flavor install_options instance package_settings platform responsefile status uninstall_options vendor unless_system_user unless_uid binary control flags hasstatus manifest pattern restart running start stop allowdupe auths expiry gid groups home iterations key_membership keys managehome membership password password_max_age password_min_age profile_membership profiles project purge_ssh_keys role_membership roles salt shell uid baseurl cost descr enabled enablegroups exclude failovermethod gpgcheck gpgkey http_caching include includepkgs keepalive metadata_expire metalink mirrorlist priority protect proxy proxy_password proxy_username repo_gpgcheck s3_enabled skip_if_unavailable sslcacert sslclientcert sslclientkey sslverify mounted",
    built_in: "architecture augeasversion blockdevices boardmanufacturer boardproductname boardserialnumber cfkey dhcp_servers domain ec2_ ec2_userdata facterversion filesystems ldom fqdn gid hardwareisa hardwaremodel hostname id|0 interfaces ipaddress ipaddress_ ipaddress6 ipaddress6_ iphostnumber is_virtual kernel kernelmajversion kernelrelease kernelversion kernelrelease kernelversion lsbdistcodename lsbdistdescription lsbdistid lsbdistrelease lsbmajdistrelease lsbminordistrelease lsbrelease macaddress macaddress_ macosx_buildversion macosx_productname macosx_productversion macosx_productverson_major macosx_productversion_minor manufacturer memoryfree memorysize netmask metmask_ network_ operatingsystem operatingsystemmajrelease operatingsystemrelease osfamily partitions path physicalprocessorcount processor processorcount productname ps puppetversion rubysitedir rubyversion selinux selinux_config_mode selinux_config_policy selinux_current_mode selinux_current_mode selinux_enforced selinux_policyversion serialnumber sp_ sshdsakey sshecdsakey sshrsakey swapencrypted swapfree swapsize timezone type uniqueid uptime uptime_days uptime_hours uptime_seconds uuid virtual vlans xendomains zfs_version zonenae zones zpool_version"
  },
      r = e.C("#", "$"),
      a = "([A-Za-z_]|::)(\\w|::)*",
      i = e.inherit(e.TM, {
    b: a
  }),
      o = {
    cN: "variable",
    b: "\\$" + a
  },
      t = {
    cN: "string",
    c: [e.BE, o],
    v: [{
      b: /'/,
      e: /'/
    }, {
      b: /"/,
      e: /"/
    }]
  };
  return {
    aliases: ["pp"],
    c: [r, o, t, {
      bK: "class",
      e: "\\{|;",
      i: /=/,
      c: [i, r]
    }, {
      bK: "define",
      e: /\{/,
      c: [{
        cN: "section",
        b: e.IR,
        endsParent: !0
      }]
    }, {
      b: e.IR + "\\s+\\{",
      rB: !0,
      e: /\S/,
      c: [{
        cN: "keyword",
        b: e.IR
      }, {
        b: /\{/,
        e: /\}/,
        k: s,
        r: 0,
        c: [t, r, {
          b: "[a-zA-Z_]+\\s*=>",
          rB: !0,
          e: "=>",
          c: [{
            cN: "attr",
            b: e.IR
          }]
        }, {
          cN: "number",
          b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
          r: 0
        }, o]
      }],
      r: 0
    }]
  };
});
hljs.registerLanguage("swift", function (e) {
  var t = {
    keyword: "__COLUMN__ __FILE__ __FUNCTION__ __LINE__ as as! as? associativity break case catch class continue convenience default defer deinit didSet do dynamic dynamicType else enum extension fallthrough false final for func get guard if import in indirect infix init inout internal is lazy left let mutating nil none nonmutating operator optional override postfix precedence prefix private protocol Protocol public repeat required rethrows return right self Self set static struct subscript super switch throw throws true try try! try? Type typealias unowned var weak where while willSet",
    literal: "true false nil",
    built_in: "abs advance alignof alignofValue anyGenerator assert assertionFailure bridgeFromObjectiveC bridgeFromObjectiveCUnconditional bridgeToObjectiveC bridgeToObjectiveCUnconditional c contains count countElements countLeadingZeros debugPrint debugPrintln distance dropFirst dropLast dump encodeBitsAsWords enumerate equal fatalError filter find getBridgedObjectiveCType getVaList indices insertionSort isBridgedToObjectiveC isBridgedVerbatimToObjectiveC isUniquelyReferenced isUniquelyReferencedNonObjC join lazy lexicographicalCompare map max maxElement min minElement numericCast overlaps partition posix precondition preconditionFailure print println quickSort readLine reduce reflect reinterpretCast reverse roundUpToAlignment sizeof sizeofValue sort split startsWith stride strideof strideofValue swap toString transcode underestimateCount unsafeAddressOf unsafeBitCast unsafeDowncast unsafeUnwrap unsafeReflect withExtendedLifetime withObjectAtPlusZero withUnsafePointer withUnsafePointerToObject withUnsafeMutablePointer withUnsafeMutablePointers withUnsafePointer withUnsafePointers withVaList zip"
  },
      i = {
    cN: "type",
    b: "\\b[A-Z][\\wÀ-ʸ']*",
    r: 0
  },
      n = e.C("/\\*", "\\*/", {
    c: ["self"]
  }),
      r = {
    cN: "subst",
    b: /\\\(/,
    e: "\\)",
    k: t,
    c: []
  },
      a = {
    cN: "number",
    b: "\\b([\\d_]+(\\.[\\deE_]+)?|0x[a-fA-F0-9_]+(\\.[a-fA-F0-9p_]+)?|0b[01_]+|0o[0-7_]+)\\b",
    r: 0
  },
      o = e.inherit(e.QSM, {
    c: [r, e.BE]
  });
  return r.c = [a], {
    k: t,
    c: [o, e.CLCM, n, i, a, {
      cN: "function",
      bK: "func",
      e: "{",
      eE: !0,
      c: [e.inherit(e.TM, {
        b: /[A-Za-z$_][0-9A-Za-z$_]*/
      }), {
        b: /</,
        e: />/
      }, {
        cN: "params",
        b: /\(/,
        e: /\)/,
        endsParent: !0,
        k: t,
        c: ["self", a, o, e.CBCM, {
          b: ":"
        }],
        i: /["']/
      }],
      i: /\[|%/
    }, {
      cN: "class",
      bK: "struct protocol class extension enum",
      k: t,
      e: "\\{",
      eE: !0,
      c: [e.inherit(e.TM, {
        b: /[A-Za-z$_][\u00C0-\u02B80-9A-Za-z$_]*/
      })]
    }, {
      cN: "meta",
      b: "(@warn_unused_result|@exported|@lazy|@noescape|@NSCopying|@NSManaged|@objc|@convention|@required|@noreturn|@IBAction|@IBDesignable|@IBInspectable|@IBOutlet|@infix|@prefix|@postfix|@autoclosure|@testable|@available|@nonobjc|@NSApplicationMain|@UIApplicationMain)"
    }, {
      bK: "import",
      e: /$/,
      c: [e.CLCM, n]
    }]
  };
});
hljs.registerLanguage("gcode", function (N) {
  var e = "[A-Z_][A-Z0-9_.]*",
      c = "\\%",
      E = "IF DO WHILE ENDWHILE CALL ENDIF SUB ENDSUB GOTO REPEAT ENDREPEAT EQ LT GT NE GE LE OR XOR",
      i = {
    cN: "meta",
    b: "([O])([0-9]+)"
  },
      n = [N.CLCM, N.CBCM, N.C(/\(/, /\)/), N.inherit(N.CNM, {
    b: "([-+]?([0-9]*\\.?[0-9]+\\.?))|" + N.CNR
  }), N.inherit(N.ASM, {
    i: null
  }), N.inherit(N.QSM, {
    i: null
  }), {
    cN: "name",
    b: "([G])([0-9]+\\.?[0-9]?)"
  }, {
    cN: "name",
    b: "([M])([0-9]+\\.?[0-9]?)"
  }, {
    cN: "attr",
    b: "(VC|VS|#)",
    e: "(\\d+)"
  }, {
    cN: "attr",
    b: "(VZOFX|VZOFY|VZOFZ)"
  }, {
    cN: "built_in",
    b: "(ATAN|ABS|ACOS|ASIN|SIN|COS|EXP|FIX|FUP|ROUND|LN|TAN)(\\[)",
    e: "([-+]?([0-9]*\\.?[0-9]+\\.?))(\\])"
  }, {
    cN: "symbol",
    v: [{
      b: "N",
      e: "\\d+",
      i: "\\W"
    }]
  }];
  return {
    aliases: ["nc"],
    cI: !0,
    l: e,
    k: E,
    c: [{
      cN: "meta",
      b: c
    }, i].concat(n)
  };
});
hljs.registerLanguage("ceylon", function (e) {
  var a = "assembly module package import alias class interface object given value assign void function new of extends satisfies abstracts in out return break continue throw assert dynamic if else switch case for while try catch finally then let this outer super is exists nonempty",
      t = "shared abstract formal default actual variable late native deprecatedfinal sealed annotation suppressWarnings small",
      s = "doc by license see throws tagged",
      n = {
    cN: "subst",
    eB: !0,
    eE: !0,
    b: /``/,
    e: /``/,
    k: a,
    r: 10
  },
      r = [{
    cN: "string",
    b: '"""',
    e: '"""',
    r: 10
  }, {
    cN: "string",
    b: '"',
    e: '"',
    c: [n]
  }, {
    cN: "string",
    b: "'",
    e: "'"
  }, {
    cN: "number",
    b: "#[0-9a-fA-F_]+|\\$[01_]+|[0-9_]+(?:\\.[0-9_](?:[eE][+-]?\\d+)?)?[kMGTPmunpf]?",
    r: 0
  }];
  return n.c = r, {
    k: {
      keyword: a + " " + t,
      meta: s
    },
    i: "\\$[^01]|#[^0-9a-fA-F]",
    c: [e.CLCM, e.C("/\\*", "\\*/", {
      c: ["self"]
    }), {
      cN: "meta",
      b: '@[a-z]\\w*(?:\\:"[^"]*")?'
    }].concat(r)
  };
});
hljs.registerLanguage("bash", function (e) {
  var t = {
    cN: "variable",
    v: [{
      b: /\$[\w\d#@][\w\d_]*/
    }, {
      b: /\$\{(.*?)}/
    }]
  },
      s = {
    cN: "string",
    b: /"/,
    e: /"/,
    c: [e.BE, t, {
      cN: "variable",
      b: /\$\(/,
      e: /\)/,
      c: [e.BE]
    }]
  },
      a = {
    cN: "string",
    b: /'/,
    e: /'/
  };
  return {
    aliases: ["sh", "zsh"],
    l: /-?[a-z\._]+/,
    k: {
      keyword: "if then else elif fi for while in do done case esac function",
      literal: "true false",
      built_in: "break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp",
      _: "-ne -eq -lt -gt -f -d -e -s -l -a"
    },
    c: [{
      cN: "meta",
      b: /^#![^\n]+sh\s*$/,
      r: 10
    }, {
      cN: "function",
      b: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
      rB: !0,
      c: [e.inherit(e.TM, {
        b: /\w[\w\d_]*/
      })],
      r: 0
    }, e.HCM, s, a, t]
  };
});
hljs.registerLanguage("dockerfile", function (e) {
  return {
    aliases: ["docker"],
    cI: !0,
    k: "from maintainer expose env arg user onbuild stopsignal",
    c: [e.HCM, e.ASM, e.QSM, e.NM, {
      bK: "run cmd entrypoint volume add copy workdir label healthcheck shell",
      starts: {
        e: /[^\\]\n/,
        sL: "bash"
      }
    }],
    i: "</"
  };
});
hljs.registerLanguage("autohotkey", function (e) {
  var r = {
    b: /`[\s\S]/
  };
  return {
    cI: !0,
    k: {
      keyword: "Break Continue Else Gosub If Loop Return While",
      literal: "A|0 true false NOT AND OR",
      built_in: "ComSpec Clipboard ClipboardAll ErrorLevel"
    },
    c: [{
      cN: "built_in",
      b: "A_[a-zA-Z0-9]+"
    }, r, e.inherit(e.QSM, {
      c: [r]
    }), e.C(";", "$", {
      r: 0
    }), {
      cN: "number",
      b: e.NR,
      r: 0
    }, {
      cN: "variable",
      b: "%",
      e: "%",
      i: "\\n",
      c: [r]
    }, {
      cN: "symbol",
      c: [r],
      v: [{
        b: '^[^\\n";]+::(?!=)'
      }, {
        b: '^[^\\n";]+:(?!=)',
        r: 0
      }]
    }, {
      b: ",\\s*,"
    }]
  };
});
hljs.registerLanguage("coffeescript", function (e) {
  var c = {
    keyword: "in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super yield import export from as default await then unless until loop of by when and or is isnt not",
    literal: "true false null undefined yes no on off",
    built_in: "npm require console print module global window document"
  },
      n = "[A-Za-z$_][0-9A-Za-z$_]*",
      r = {
    cN: "subst",
    b: /#\{/,
    e: /}/,
    k: c
  },
      i = [e.BNM, e.inherit(e.CNM, {
    starts: {
      e: "(\\s*/)?",
      r: 0
    }
  }), {
    cN: "string",
    v: [{
      b: /'''/,
      e: /'''/,
      c: [e.BE]
    }, {
      b: /'/,
      e: /'/,
      c: [e.BE]
    }, {
      b: /"""/,
      e: /"""/,
      c: [e.BE, r]
    }, {
      b: /"/,
      e: /"/,
      c: [e.BE, r]
    }]
  }, {
    cN: "regexp",
    v: [{
      b: "///",
      e: "///",
      c: [r, e.HCM]
    }, {
      b: "//[gim]*",
      r: 0
    }, {
      b: /\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/
    }]
  }, {
    b: "@" + n
  }, {
    sL: "javascript",
    eB: !0,
    eE: !0,
    v: [{
      b: "```",
      e: "```"
    }, {
      b: "`",
      e: "`"
    }]
  }];
  r.c = i;
  var s = e.inherit(e.TM, {
    b: n
  }),
      t = "(\\(.*\\))?\\s*\\B[-=]>",
      o = {
    cN: "params",
    b: "\\([^\\(]",
    rB: !0,
    c: [{
      b: /\(/,
      e: /\)/,
      k: c,
      c: ["self"].concat(i)
    }]
  };
  return {
    aliases: ["coffee", "cson", "iced"],
    k: c,
    i: /\/\*/,
    c: i.concat([e.C("###", "###"), e.HCM, {
      cN: "function",
      b: "^\\s*" + n + "\\s*=\\s*" + t,
      e: "[-=]>",
      rB: !0,
      c: [s, o]
    }, {
      b: /[:\(,=]\s*/,
      r: 0,
      c: [{
        cN: "function",
        b: t,
        e: "[-=]>",
        rB: !0,
        c: [o]
      }]
    }, {
      cN: "class",
      bK: "class",
      e: "$",
      i: /[:="\[\]]/,
      c: [{
        bK: "extends",
        eW: !0,
        i: /[:="\[\]]/,
        c: [s]
      }, s]
    }, {
      b: n + ":",
      e: ":",
      rB: !0,
      rE: !0,
      r: 0
    }])
  };
});
hljs.registerLanguage("protobuf", function (e) {
  return {
    k: {
      keyword: "package import option optional required repeated group",
      built_in: "double float int32 int64 uint32 uint64 sint32 sint64 fixed32 fixed64 sfixed32 sfixed64 bool string bytes",
      literal: "true false"
    },
    c: [e.QSM, e.NM, e.CLCM, {
      cN: "class",
      bK: "message enum service",
      e: /\{/,
      i: /\n/,
      c: [e.inherit(e.TM, {
        starts: {
          eW: !0,
          eE: !0
        }
      })]
    }, {
      cN: "function",
      bK: "rpc",
      e: /;/,
      eE: !0,
      k: "rpc returns"
    }, {
      b: /^\s*[A-Z_]+/,
      e: /\s*=/,
      eE: !0
    }]
  };
});
hljs.registerLanguage("matlab", function (e) {
  var a = [e.CNM, {
    cN: "string",
    b: "'",
    e: "'",
    c: [e.BE, {
      b: "''"
    }]
  }],
      s = {
    r: 0,
    c: [{
      b: /'['\.]*/
    }]
  };
  return {
    k: {
      keyword: "break case catch classdef continue else elseif end enumerated events for function global if methods otherwise parfor persistent properties return spmd switch try while",
      built_in: "sin sind sinh asin asind asinh cos cosd cosh acos acosd acosh tan tand tanh atan atand atan2 atanh sec secd sech asec asecd asech csc cscd csch acsc acscd acsch cot cotd coth acot acotd acoth hypot exp expm1 log log1p log10 log2 pow2 realpow reallog realsqrt sqrt nthroot nextpow2 abs angle complex conj imag real unwrap isreal cplxpair fix floor ceil round mod rem sign airy besselj bessely besselh besseli besselk beta betainc betaln ellipj ellipke erf erfc erfcx erfinv expint gamma gammainc gammaln psi legendre cross dot factor isprime primes gcd lcm rat rats perms nchoosek factorial cart2sph cart2pol pol2cart sph2cart hsv2rgb rgb2hsv zeros ones eye repmat rand randn linspace logspace freqspace meshgrid accumarray size length ndims numel disp isempty isequal isequalwithequalnans cat reshape diag blkdiag tril triu fliplr flipud flipdim rot90 find sub2ind ind2sub bsxfun ndgrid permute ipermute shiftdim circshift squeeze isscalar isvector ans eps realmax realmin pi i inf nan isnan isinf isfinite j why compan gallery hadamard hankel hilb invhilb magic pascal rosser toeplitz vander wilkinson"
    },
    i: '(//|"|#|/\\*|\\s+/\\w+)',
    c: [{
      cN: "function",
      bK: "function",
      e: "$",
      c: [e.UTM, {
        cN: "params",
        v: [{
          b: "\\(",
          e: "\\)"
        }, {
          b: "\\[",
          e: "\\]"
        }]
      }]
    }, {
      b: /[a-zA-Z_][a-zA-Z_0-9]*'['\.]*/,
      rB: !0,
      r: 0,
      c: [{
        b: /[a-zA-Z_][a-zA-Z_0-9]*/,
        r: 0
      }, s.c[0]]
    }, {
      b: "\\[",
      e: "\\]",
      c: a,
      r: 0,
      starts: s
    }, {
      b: "\\{",
      e: /}/,
      c: a,
      r: 0,
      starts: s
    }, {
      b: /\)/,
      r: 0,
      starts: s
    }, e.C("^\\s*\\%\\{\\s*$", "^\\s*\\%\\}\\s*$"), e.C("\\%", "$")].concat(a)
  };
});
hljs.registerLanguage("irpf90", function (e) {
  var t = {
    cN: "params",
    b: "\\(",
    e: "\\)"
  },
      n = {
    literal: ".False. .True.",
    keyword: "kind do while private call intrinsic where elsewhere type endtype endmodule endselect endinterface end enddo endif if forall endforall only contains default return stop then public subroutine|10 function program .and. .or. .not. .le. .eq. .ge. .gt. .lt. goto save else use module select case access blank direct exist file fmt form formatted iostat name named nextrec number opened rec recl sequential status unformatted unit continue format pause cycle exit c_null_char c_alert c_backspace c_form_feed flush wait decimal round iomsg synchronous nopass non_overridable pass protected volatile abstract extends import non_intrinsic value deferred generic final enumerator class associate bind enum c_int c_short c_long c_long_long c_signed_char c_size_t c_int8_t c_int16_t c_int32_t c_int64_t c_int_least8_t c_int_least16_t c_int_least32_t c_int_least64_t c_int_fast8_t c_int_fast16_t c_int_fast32_t c_int_fast64_t c_intmax_t C_intptr_t c_float c_double c_long_double c_float_complex c_double_complex c_long_double_complex c_bool c_char c_null_ptr c_null_funptr c_new_line c_carriage_return c_horizontal_tab c_vertical_tab iso_c_binding c_loc c_funloc c_associated  c_f_pointer c_ptr c_funptr iso_fortran_env character_storage_size error_unit file_storage_size input_unit iostat_end iostat_eor numeric_storage_size output_unit c_f_procpointer ieee_arithmetic ieee_support_underflow_control ieee_get_underflow_mode ieee_set_underflow_mode newunit contiguous recursive pad position action delim readwrite eor advance nml interface procedure namelist include sequence elemental pure integer real character complex logical dimension allocatable|10 parameter external implicit|10 none double precision assign intent optional pointer target in out common equivalence data begin_provider &begin_provider end_provider begin_shell end_shell begin_template end_template subst assert touch soft_touch provide no_dep free irp_if irp_else irp_endif irp_write irp_read",
    built_in: "alog alog10 amax0 amax1 amin0 amin1 amod cabs ccos cexp clog csin csqrt dabs dacos dasin datan datan2 dcos dcosh ddim dexp dint dlog dlog10 dmax1 dmin1 dmod dnint dsign dsin dsinh dsqrt dtan dtanh float iabs idim idint idnint ifix isign max0 max1 min0 min1 sngl algama cdabs cdcos cdexp cdlog cdsin cdsqrt cqabs cqcos cqexp cqlog cqsin cqsqrt dcmplx dconjg derf derfc dfloat dgamma dimag dlgama iqint qabs qacos qasin qatan qatan2 qcmplx qconjg qcos qcosh qdim qerf qerfc qexp qgamma qimag qlgama qlog qlog10 qmax1 qmin1 qmod qnint qsign qsin qsinh qsqrt qtan qtanh abs acos aimag aint anint asin atan atan2 char cmplx conjg cos cosh exp ichar index int log log10 max min nint sign sin sinh sqrt tan tanh print write dim lge lgt lle llt mod nullify allocate deallocate adjustl adjustr all allocated any associated bit_size btest ceiling count cshift date_and_time digits dot_product eoshift epsilon exponent floor fraction huge iand ibclr ibits ibset ieor ior ishft ishftc lbound len_trim matmul maxexponent maxloc maxval merge minexponent minloc minval modulo mvbits nearest pack present product radix random_number random_seed range repeat reshape rrspacing scale scan selected_int_kind selected_real_kind set_exponent shape size spacing spread sum system_clock tiny transpose trim ubound unpack verify achar iachar transfer dble entry dprod cpu_time command_argument_count get_command get_command_argument get_environment_variable is_iostat_end ieee_arithmetic ieee_support_underflow_control ieee_get_underflow_mode ieee_set_underflow_mode is_iostat_eor move_alloc new_line selected_char_kind same_type_as extends_type_ofacosh asinh atanh bessel_j0 bessel_j1 bessel_jn bessel_y0 bessel_y1 bessel_yn erf erfc erfc_scaled gamma log_gamma hypot norm2 atomic_define atomic_ref execute_command_line leadz trailz storage_size merge_bits bge bgt ble blt dshiftl dshiftr findloc iall iany iparity image_index lcobound ucobound maskl maskr num_images parity popcnt poppar shifta shiftl shiftr this_image IRP_ALIGN irp_here"
  };
  return {
    cI: !0,
    k: n,
    i: /\/\*/,
    c: [e.inherit(e.ASM, {
      cN: "string",
      r: 0
    }), e.inherit(e.QSM, {
      cN: "string",
      r: 0
    }), {
      cN: "function",
      bK: "subroutine function program",
      i: "[${=\\n]",
      c: [e.UTM, t]
    }, e.C("!", "$", {
      r: 0
    }), e.C("begin_doc", "end_doc", {
      r: 10
    }), {
      cN: "number",
      b: "(?=\\b|\\+|\\-|\\.)(?=\\.\\d|\\d)(?:\\d+)?(?:\\.?\\d*)(?:[de][+-]?\\d+)?\\b\\.?",
      r: 0
    }]
  };
});
hljs.registerLanguage("kotlin", function (e) {
  var t = {
    keyword: "abstract as val var vararg get set class object open private protected public noinline crossinline dynamic final enum if else do while for when throw try catch finally import package is in fun override companion reified inline lateinit initinterface annotation data sealed internal infix operator out by constructor super trait volatile transient native default",
    built_in: "Byte Short Char Int Long Boolean Float Double Void Unit Nothing",
    literal: "true false null"
  },
      r = {
    cN: "keyword",
    b: /\b(break|continue|return|this)\b/,
    starts: {
      c: [{
        cN: "symbol",
        b: /@\w+/
      }]
    }
  },
      i = {
    cN: "symbol",
    b: e.UIR + "@"
  },
      n = {
    cN: "subst",
    v: [{
      b: "\\$" + e.UIR
    }, {
      b: "\\${",
      e: "}",
      c: [e.ASM, e.CNM]
    }]
  },
      a = {
    cN: "string",
    v: [{
      b: '"""',
      e: '"""',
      c: [n]
    }, {
      b: "'",
      e: "'",
      i: /\n/,
      c: [e.BE]
    }, {
      b: '"',
      e: '"',
      i: /\n/,
      c: [e.BE, n]
    }]
  },
      c = {
    cN: "meta",
    b: "@(?:file|property|field|get|set|receiver|param|setparam|delegate)\\s*:(?:\\s*" + e.UIR + ")?"
  },
      s = {
    cN: "meta",
    b: "@" + e.UIR,
    c: [{
      b: /\(/,
      e: /\)/,
      c: [e.inherit(a, {
        cN: "meta-string"
      })]
    }]
  };
  return {
    k: t,
    c: [e.C("/\\*\\*", "\\*/", {
      r: 0,
      c: [{
        cN: "doctag",
        b: "@[A-Za-z]+"
      }]
    }), e.CLCM, e.CBCM, r, i, c, s, {
      cN: "function",
      bK: "fun",
      e: "[(]|$",
      rB: !0,
      eE: !0,
      k: t,
      i: /fun\s+(<.*>)?[^\s\(]+(\s+[^\s\(]+)\s*=/,
      r: 5,
      c: [{
        b: e.UIR + "\\s*\\(",
        rB: !0,
        r: 0,
        c: [e.UTM]
      }, {
        cN: "type",
        b: /</,
        e: />/,
        k: "reified",
        r: 0
      }, {
        cN: "params",
        b: /\(/,
        e: /\)/,
        endsParent: !0,
        k: t,
        r: 0,
        c: [{
          b: /:/,
          e: /[=,\/]/,
          eW: !0,
          c: [{
            cN: "type",
            b: e.UIR
          }, e.CLCM, e.CBCM],
          r: 0
        }, e.CLCM, e.CBCM, c, s, a, e.CNM]
      }, e.CBCM]
    }, {
      cN: "class",
      bK: "class interface trait",
      e: /[:\{(]|$/,
      eE: !0,
      i: "extends implements",
      c: [{
        bK: "public protected internal private constructor"
      }, e.UTM, {
        cN: "type",
        b: /</,
        e: />/,
        eB: !0,
        eE: !0,
        r: 0
      }, {
        cN: "type",
        b: /[,:]\s*/,
        e: /[<\(,]|$/,
        eB: !0,
        rE: !0
      }, c, s]
    }, a, {
      cN: "meta",
      b: "^#!/usr/bin/env",
      e: "$",
      i: "\n"
    }, e.CNM]
  };
});
hljs.registerLanguage("crmsh", function (t) {
  var e = "primitive rsc_template",
      r = "group clone ms master location colocation order fencing_topology rsc_ticket acl_target acl_group user role tag xml",
      s = "property rsc_defaults op_defaults",
      a = "params meta operations op rule attributes utilization",
      i = "read write deny defined not_defined in_range date spec in ref reference attribute type xpath version and or lt gt tag lte gte eq ne \\",
      o = "number string",
      n = "Master Started Slave Stopped start promote demote stop monitor true false";
  return {
    aliases: ["crm", "pcmk"],
    cI: !0,
    k: {
      keyword: a + " " + i + " " + o,
      literal: n
    },
    c: [t.HCM, {
      bK: "node",
      starts: {
        e: "\\s*([\\w_-]+:)?",
        starts: {
          cN: "title",
          e: "\\s*[\\$\\w_][\\w_-]*"
        }
      }
    }, {
      bK: e,
      starts: {
        cN: "title",
        e: "\\s*[\\$\\w_][\\w_-]*",
        starts: {
          e: "\\s*@?[\\w_][\\w_\\.:-]*"
        }
      }
    }, {
      b: "\\b(" + r.split(" ").join("|") + ")\\s+",
      k: r,
      starts: {
        cN: "title",
        e: "[\\$\\w_][\\w_-]*"
      }
    }, {
      bK: s,
      starts: {
        cN: "title",
        e: "\\s*([\\w_-]+:)?"
      }
    }, t.QSM, {
      cN: "meta",
      b: "(ocf|systemd|service|lsb):[\\w_:-]+",
      r: 0
    }, {
      cN: "number",
      b: "\\b\\d+(\\.\\d+)?(ms|s|h|m)?",
      r: 0
    }, {
      cN: "literal",
      b: "[-]?(infinity|inf)",
      r: 0
    }, {
      cN: "attr",
      b: /([A-Za-z\$_\#][\w_-]+)=/,
      r: 0
    }, {
      cN: "tag",
      b: "</?",
      e: "/?>",
      r: 0
    }]
  };
});
hljs.registerLanguage("haskell", function (e) {
  var i = {
    v: [e.C("--", "$"), e.C("{-", "-}", {
      c: ["self"]
    })]
  },
      a = {
    cN: "meta",
    b: "{-#",
    e: "#-}"
  },
      l = {
    cN: "meta",
    b: "^#",
    e: "$"
  },
      c = {
    cN: "type",
    b: "\\b[A-Z][\\w']*",
    r: 0
  },
      n = {
    b: "\\(",
    e: "\\)",
    i: '"',
    c: [a, l, {
      cN: "type",
      b: "\\b[A-Z][\\w]*(\\((\\.\\.|,|\\w+)\\))?"
    }, e.inherit(e.TM, {
      b: "[_a-z][\\w']*"
    }), i]
  },
      s = {
    b: "{",
    e: "}",
    c: n.c
  };
  return {
    aliases: ["hs"],
    k: "let in if then else case of where do module import hiding qualified type data newtype deriving class instance as default infix infixl infixr foreign export ccall stdcall cplusplus jvm dotnet safe unsafe family forall mdo proc rec",
    c: [{
      bK: "module",
      e: "where",
      k: "module where",
      c: [n, i],
      i: "\\W\\.|;"
    }, {
      b: "\\bimport\\b",
      e: "$",
      k: "import qualified as hiding",
      c: [n, i],
      i: "\\W\\.|;"
    }, {
      cN: "class",
      b: "^(\\s*)?(class|instance)\\b",
      e: "where",
      k: "class family instance where",
      c: [c, n, i]
    }, {
      cN: "class",
      b: "\\b(data|(new)?type)\\b",
      e: "$",
      k: "data family type newtype deriving",
      c: [a, c, n, s, i]
    }, {
      bK: "default",
      e: "$",
      c: [c, n, i]
    }, {
      bK: "infix infixl infixr",
      e: "$",
      c: [e.CNM, i]
    }, {
      b: "\\bforeign\\b",
      e: "$",
      k: "foreign import export ccall stdcall cplusplus jvm dotnet safe unsafe",
      c: [c, e.QSM, i]
    }, {
      cN: "meta",
      b: "#!\\/usr\\/bin\\/env runhaskell",
      e: "$"
    }, a, l, e.QSM, e.CNM, c, e.inherit(e.TM, {
      b: "^[_a-z][\\w']*"
    }), i, {
      b: "->|<-"
    }]
  };
});
hljs.registerLanguage("flix", function (e) {
  var t = {
    cN: "string",
    b: /'(.|\\[xXuU][a-zA-Z0-9]+)'/
  },
      i = {
    cN: "string",
    v: [{
      b: '"',
      e: '"'
    }]
  },
      n = {
    cN: "title",
    b: /[^0-9\n\t "'(),.`{}\[\]:;][^\n\t "'(),.`{}\[\]:;]+|[^0-9\n\t "'(),.`{}\[\]:;=]/
  },
      c = {
    cN: "function",
    bK: "def",
    e: /[:={\[(\n;]/,
    eE: !0,
    c: [n]
  };
  return {
    k: {
      literal: "true false",
      keyword: "case class def else enum if impl import in lat rel index let match namespace switch type yield with"
    },
    c: [e.CLCM, e.CBCM, t, i, c, e.CNM]
  };
});
hljs.registerLanguage("scala", function (e) {
  var t = {
    cN: "meta",
    b: "@[A-Za-z]+"
  },
      a = {
    cN: "subst",
    v: [{
      b: "\\$[A-Za-z0-9_]+"
    }, {
      b: "\\${",
      e: "}"
    }]
  },
      r = {
    cN: "string",
    v: [{
      b: '"',
      e: '"',
      i: "\\n",
      c: [e.BE]
    }, {
      b: '"""',
      e: '"""',
      r: 10
    }, {
      b: '[a-z]+"',
      e: '"',
      i: "\\n",
      c: [e.BE, a]
    }, {
      cN: "string",
      b: '[a-z]+"""',
      e: '"""',
      c: [a],
      r: 10
    }]
  },
      c = {
    cN: "symbol",
    b: "'\\w[\\w\\d_]*(?!')"
  },
      i = {
    cN: "type",
    b: "\\b[A-Z][A-Za-z0-9_]*",
    r: 0
  },
      s = {
    cN: "title",
    b: /[^0-9\n\t "'(),.`{}\[\]:;][^\n\t "'(),.`{}\[\]:;]+|[^0-9\n\t "'(),.`{}\[\]:;=]/,
    r: 0
  },
      n = {
    cN: "class",
    bK: "class object trait type",
    e: /[:={\[\n;]/,
    eE: !0,
    c: [{
      bK: "extends with",
      r: 10
    }, {
      b: /\[/,
      e: /\]/,
      eB: !0,
      eE: !0,
      r: 0,
      c: [i]
    }, {
      cN: "params",
      b: /\(/,
      e: /\)/,
      eB: !0,
      eE: !0,
      r: 0,
      c: [i]
    }, s]
  },
      l = {
    cN: "function",
    bK: "def",
    e: /[:={\[(\n;]/,
    eE: !0,
    c: [s]
  };
  return {
    k: {
      literal: "true false null",
      keyword: "type yield lazy override def with val var sealed abstract private trait object if forSome for while throw finally protected extends import final return else break new catch super class case package default try this match continue throws implicit"
    },
    c: [e.CLCM, e.CBCM, r, c, i, l, n, e.CNM, t]
  };
});
hljs.registerLanguage("powershell", function (e) {
  var t = {
    b: "`[\\s\\S]",
    r: 0
  },
      o = {
    cN: "variable",
    v: [{
      b: /\$[\w\d][\w\d_:]*/
    }]
  },
      r = {
    cN: "literal",
    b: /\$(null|true|false)\b/
  },
      n = {
    cN: "string",
    v: [{
      b: /"/,
      e: /"/
    }, {
      b: /@"/,
      e: /^"@/
    }],
    c: [t, o, {
      cN: "variable",
      b: /\$[A-z]/,
      e: /[^A-z]/
    }]
  },
      a = {
    cN: "string",
    v: [{
      b: /'/,
      e: /'/
    }, {
      b: /@'/,
      e: /^'@/
    }]
  },
      i = {
    cN: "doctag",
    v: [{
      b: /\.(synopsis|description|example|inputs|outputs|notes|link|component|role|functionality)/
    }, {
      b: /\.(parameter|forwardhelptargetname|forwardhelpcategory|remotehelprunspace|externalhelp)\s+\S+/
    }]
  },
      s = e.inherit(e.C(null, null), {
    v: [{
      b: /#/,
      e: /$/
    }, {
      b: /<#/,
      e: /#>/
    }],
    c: [i]
  });
  return {
    aliases: ["ps"],
    l: /-?[A-z\.\-]+/,
    cI: !0,
    k: {
      keyword: "if else foreach return function do while until elseif begin for trap data dynamicparam end break throw param continue finally in switch exit filter try process catch",
      built_in: "Add-Computer Add-Content Add-History Add-JobTrigger Add-Member Add-PSSnapin Add-Type Checkpoint-Computer Clear-Content Clear-EventLog Clear-History Clear-Host Clear-Item Clear-ItemProperty Clear-Variable Compare-Object Complete-Transaction Connect-PSSession Connect-WSMan Convert-Path ConvertFrom-Csv ConvertFrom-Json ConvertFrom-SecureString ConvertFrom-StringData ConvertTo-Csv ConvertTo-Html ConvertTo-Json ConvertTo-SecureString ConvertTo-Xml Copy-Item Copy-ItemProperty Debug-Process Disable-ComputerRestore Disable-JobTrigger Disable-PSBreakpoint Disable-PSRemoting Disable-PSSessionConfiguration Disable-WSManCredSSP Disconnect-PSSession Disconnect-WSMan Disable-ScheduledJob Enable-ComputerRestore Enable-JobTrigger Enable-PSBreakpoint Enable-PSRemoting Enable-PSSessionConfiguration Enable-ScheduledJob Enable-WSManCredSSP Enter-PSSession Exit-PSSession Export-Alias Export-Clixml Export-Console Export-Counter Export-Csv Export-FormatData Export-ModuleMember Export-PSSession ForEach-Object Format-Custom Format-List Format-Table Format-Wide Get-Acl Get-Alias Get-AuthenticodeSignature Get-ChildItem Get-Command Get-ComputerRestorePoint Get-Content Get-ControlPanelItem Get-Counter Get-Credential Get-Culture Get-Date Get-Event Get-EventLog Get-EventSubscriber Get-ExecutionPolicy Get-FormatData Get-Host Get-HotFix Get-Help Get-History Get-IseSnippet Get-Item Get-ItemProperty Get-Job Get-JobTrigger Get-Location Get-Member Get-Module Get-PfxCertificate Get-Process Get-PSBreakpoint Get-PSCallStack Get-PSDrive Get-PSProvider Get-PSSession Get-PSSessionConfiguration Get-PSSnapin Get-Random Get-ScheduledJob Get-ScheduledJobOption Get-Service Get-TraceSource Get-Transaction Get-TypeData Get-UICulture Get-Unique Get-Variable Get-Verb Get-WinEvent Get-WmiObject Get-WSManCredSSP Get-WSManInstance Group-Object Import-Alias Import-Clixml Import-Counter Import-Csv Import-IseSnippet Import-LocalizedData Import-PSSession Import-Module Invoke-AsWorkflow Invoke-Command Invoke-Expression Invoke-History Invoke-Item Invoke-RestMethod Invoke-WebRequest Invoke-WmiMethod Invoke-WSManAction Join-Path Limit-EventLog Measure-Command Measure-Object Move-Item Move-ItemProperty New-Alias New-Event New-EventLog New-IseSnippet New-Item New-ItemProperty New-JobTrigger New-Object New-Module New-ModuleManifest New-PSDrive New-PSSession New-PSSessionConfigurationFile New-PSSessionOption New-PSTransportOption New-PSWorkflowExecutionOption New-PSWorkflowSession New-ScheduledJobOption New-Service New-TimeSpan New-Variable New-WebServiceProxy New-WinEvent New-WSManInstance New-WSManSessionOption Out-Default Out-File Out-GridView Out-Host Out-Null Out-Printer Out-String Pop-Location Push-Location Read-Host Receive-Job Register-EngineEvent Register-ObjectEvent Register-PSSessionConfiguration Register-ScheduledJob Register-WmiEvent Remove-Computer Remove-Event Remove-EventLog Remove-Item Remove-ItemProperty Remove-Job Remove-JobTrigger Remove-Module Remove-PSBreakpoint Remove-PSDrive Remove-PSSession Remove-PSSnapin Remove-TypeData Remove-Variable Remove-WmiObject Remove-WSManInstance Rename-Computer Rename-Item Rename-ItemProperty Reset-ComputerMachinePassword Resolve-Path Restart-Computer Restart-Service Restore-Computer Resume-Job Resume-Service Save-Help Select-Object Select-String Select-Xml Send-MailMessage Set-Acl Set-Alias Set-AuthenticodeSignature Set-Content Set-Date Set-ExecutionPolicy Set-Item Set-ItemProperty Set-JobTrigger Set-Location Set-PSBreakpoint Set-PSDebug Set-PSSessionConfiguration Set-ScheduledJob Set-ScheduledJobOption Set-Service Set-StrictMode Set-TraceSource Set-Variable Set-WmiInstance Set-WSManInstance Set-WSManQuickConfig Show-Command Show-ControlPanelItem Show-EventLog Sort-Object Split-Path Start-Job Start-Process Start-Service Start-Sleep Start-Transaction Start-Transcript Stop-Computer Stop-Job Stop-Process Stop-Service Stop-Transcript Suspend-Job Suspend-Service Tee-Object Test-ComputerSecureChannel Test-Connection Test-ModuleManifest Test-Path Test-PSSessionConfigurationFile Trace-Command Unblock-File Undo-Transaction Unregister-Event Unregister-PSSessionConfiguration Unregister-ScheduledJob Update-FormatData Update-Help Update-List Update-TypeData Use-Transaction Wait-Event Wait-Job Wait-Process Where-Object Write-Debug Write-Error Write-EventLog Write-Host Write-Output Write-Progress Write-Verbose Write-Warning Add-MDTPersistentDrive Disable-MDTMonitorService Enable-MDTMonitorService Get-MDTDeploymentShareStatistics Get-MDTMonitorData Get-MDTOperatingSystemCatalog Get-MDTPersistentDrive Import-MDTApplication Import-MDTDriver Import-MDTOperatingSystem Import-MDTPackage Import-MDTTaskSequence New-MDTDatabase Remove-MDTMonitorData Remove-MDTPersistentDrive Restore-MDTPersistentDrive Set-MDTMonitorData Test-MDTDeploymentShare Test-MDTMonitorData Update-MDTDatabaseSchema Update-MDTDeploymentShare Update-MDTLinkedDS Update-MDTMedia Update-MDTMedia Add-VamtProductKey Export-VamtData Find-VamtManagedMachine Get-VamtConfirmationId Get-VamtProduct Get-VamtProductKey Import-VamtData Initialize-VamtData Install-VamtConfirmationId Install-VamtProductActivation Install-VamtProductKey Update-VamtProduct",
      nomarkup: "-ne -eq -lt -gt -ge -le -not -like -notlike -match -notmatch -contains -notcontains -in -notin -replace"
    },
    c: [t, e.NM, n, a, r, o, s]
  };
});
hljs.registerLanguage("cal", function (e) {
  var r = "div mod in and or not xor asserterror begin case do downto else end exit for if of repeat then to until while with var",
      t = "false true",
      c = [e.CLCM, e.C(/\{/, /\}/, {
    r: 0
  }), e.C(/\(\*/, /\*\)/, {
    r: 10
  })],
      n = {
    cN: "string",
    b: /'/,
    e: /'/,
    c: [{
      b: /''/
    }]
  },
      o = {
    cN: "string",
    b: /(#\d+)+/
  },
      a = {
    cN: "number",
    b: "\\b\\d+(\\.\\d+)?(DT|D|T)",
    r: 0
  },
      i = {
    cN: "string",
    b: '"',
    e: '"'
  },
      d = {
    cN: "function",
    bK: "procedure",
    e: /[:;]/,
    k: "procedure|10",
    c: [e.TM, {
      cN: "params",
      b: /\(/,
      e: /\)/,
      k: r,
      c: [n, o]
    }].concat(c)
  },
      s = {
    cN: "class",
    b: "OBJECT (Table|Form|Report|Dataport|Codeunit|XMLport|MenuSuite|Page|Query) (\\d+) ([^\\r\\n]+)",
    rB: !0,
    c: [e.TM, d]
  };
  return {
    cI: !0,
    k: {
      keyword: r,
      literal: t
    },
    i: /\/\*/,
    c: [n, o, a, i, e.NM, s, d]
  };
});
hljs.registerLanguage("openscad", function (e) {
  var r = {
    cN: "keyword",
    b: "\\$(f[asn]|t|vp[rtd]|children)"
  },
      n = {
    cN: "literal",
    b: "false|true|PI|undef"
  },
      o = {
    cN: "number",
    b: "\\b\\d+(\\.\\d+)?(e-?\\d+)?",
    r: 0
  },
      i = e.inherit(e.QSM, {
    i: null
  }),
      t = {
    cN: "meta",
    k: {
      "meta-keyword": "include use"
    },
    b: "include|use <",
    e: ">"
  },
      s = {
    cN: "params",
    b: "\\(",
    e: "\\)",
    c: ["self", o, i, r, n]
  },
      c = {
    b: "[*!#%]",
    r: 0
  },
      a = {
    cN: "function",
    bK: "module function",
    e: "\\=|\\{",
    c: [s, e.UTM]
  };
  return {
    aliases: ["scad"],
    k: {
      keyword: "function module include use for intersection_for if else \\%",
      literal: "false true PI undef",
      built_in: "circle square polygon text sphere cube cylinder polyhedron translate rotate scale resize mirror multmatrix color offset hull minkowski union difference intersection abs sign sin cos tan acos asin atan atan2 floor round ceil ln log pow sqrt exp rands min max concat lookup str chr search version version_num norm cross parent_module echo import import_dxf dxf_linear_extrude linear_extrude rotate_extrude surface projection render children dxf_cross dxf_dim let assign"
    },
    c: [e.CLCM, e.CBCM, o, t, i, r, c, a]
  };
});
hljs.registerLanguage("dts", function (e) {
  var a = {
    cN: "string",
    v: [e.inherit(e.QSM, {
      b: '((u8?|U)|L)?"'
    }), {
      b: '(u8?|U)?R"',
      e: '"',
      c: [e.BE]
    }, {
      b: "'\\\\?.",
      e: "'",
      i: "."
    }]
  },
      c = {
    cN: "number",
    v: [{
      b: "\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)"
    }, {
      b: e.CNR
    }],
    r: 0
  },
      b = {
    cN: "meta",
    b: "#",
    e: "$",
    k: {
      "meta-keyword": "if else elif endif define undef ifdef ifndef"
    },
    c: [{
      b: /\\\n/,
      r: 0
    }, {
      bK: "include",
      e: "$",
      k: {
        "meta-keyword": "include"
      },
      c: [e.inherit(a, {
        cN: "meta-string"
      }), {
        cN: "meta-string",
        b: "<",
        e: ">",
        i: "\\n"
      }]
    }, a, e.CLCM, e.CBCM]
  },
      i = {
    cN: "variable",
    b: "\\&[a-z\\d_]*\\b"
  },
      r = {
    cN: "meta-keyword",
    b: "/[a-z][a-z\\d-]*/"
  },
      d = {
    cN: "symbol",
    b: "^\\s*[a-zA-Z_][a-zA-Z\\d_]*:"
  },
      n = {
    cN: "params",
    b: "<",
    e: ">",
    c: [c, i]
  },
      s = {
    cN: "class",
    b: /[a-zA-Z_][a-zA-Z\d_@]*\s{/,
    e: /[{;=]/,
    rB: !0,
    eE: !0
  },
      t = {
    cN: "class",
    b: "/\\s*{",
    e: "};",
    r: 10,
    c: [i, r, d, s, n, e.CLCM, e.CBCM, c, a]
  };
  return {
    k: "",
    c: [t, i, r, d, s, n, e.CLCM, e.CBCM, c, a, b, {
      b: e.IR + "::",
      k: ""
    }]
  };
});
hljs.registerLanguage("sml", function (e) {
  return {
    aliases: ["ml"],
    k: {
      keyword: "abstype and andalso as case datatype do else end eqtype exception fn fun functor handle if in include infix infixr let local nonfix of op open orelse raise rec sharing sig signature struct structure then type val with withtype where while",
      built_in: "array bool char exn int list option order real ref string substring vector unit word",
      literal: "true false NONE SOME LESS EQUAL GREATER nil"
    },
    i: /\/\/|>>/,
    l: "[a-z_]\\w*!?",
    c: [{
      cN: "literal",
      b: /\[(\|\|)?\]|\(\)/,
      r: 0
    }, e.C("\\(\\*", "\\*\\)", {
      c: ["self"]
    }), {
      cN: "symbol",
      b: "'[A-Za-z_](?!')[\\w']*"
    }, {
      cN: "type",
      b: "`[A-Z][\\w']*"
    }, {
      cN: "type",
      b: "\\b[A-Z][\\w']*",
      r: 0
    }, {
      b: "[a-z_]\\w*'[\\w']*"
    }, e.inherit(e.ASM, {
      cN: "string",
      r: 0
    }), e.inherit(e.QSM, {
      i: null
    }), {
      cN: "number",
      b: "\\b(0[xX][a-fA-F0-9_]+[Lln]?|0[oO][0-7_]+[Lln]?|0[bB][01_]+[Lln]?|[0-9][0-9_]*([Lln]|(\\.[0-9_]*)?([eE][-+]?[0-9_]+)?)?)",
      r: 0
    }, {
      b: /[-=]>/
    }]
  };
});
hljs.registerLanguage("verilog", function (e) {
  var n = {
    keyword: "accept_on alias always always_comb always_ff always_latch and assert assign assume automatic before begin bind bins binsof bit break buf|0 bufif0 bufif1 byte case casex casez cell chandle checker class clocking cmos config const constraint context continue cover covergroup coverpoint cross deassign default defparam design disable dist do edge else end endcase endchecker endclass endclocking endconfig endfunction endgenerate endgroup endinterface endmodule endpackage endprimitive endprogram endproperty endspecify endsequence endtable endtask enum event eventually expect export extends extern final first_match for force foreach forever fork forkjoin function generate|5 genvar global highz0 highz1 if iff ifnone ignore_bins illegal_bins implements implies import incdir include initial inout input inside instance int integer interconnect interface intersect join join_any join_none large let liblist library local localparam logic longint macromodule matches medium modport module nand negedge nettype new nexttime nmos nor noshowcancelled not notif0 notif1 or output package packed parameter pmos posedge primitive priority program property protected pull0 pull1 pulldown pullup pulsestyle_ondetect pulsestyle_onevent pure rand randc randcase randsequence rcmos real realtime ref reg reject_on release repeat restrict return rnmos rpmos rtran rtranif0 rtranif1 s_always s_eventually s_nexttime s_until s_until_with scalared sequence shortint shortreal showcancelled signed small soft solve specify specparam static string strong strong0 strong1 struct super supply0 supply1 sync_accept_on sync_reject_on table tagged task this throughout time timeprecision timeunit tran tranif0 tranif1 tri tri0 tri1 triand trior trireg type typedef union unique unique0 unsigned until until_with untyped use uwire var vectored virtual void wait wait_order wand weak weak0 weak1 while wildcard wire with within wor xnor xor",
    literal: "null",
    built_in: "$finish $stop $exit $fatal $error $warning $info $realtime $time $printtimescale $bitstoreal $bitstoshortreal $itor $signed $cast $bits $stime $timeformat $realtobits $shortrealtobits $rtoi $unsigned $asserton $assertkill $assertpasson $assertfailon $assertnonvacuouson $assertoff $assertcontrol $assertpassoff $assertfailoff $assertvacuousoff $isunbounded $sampled $fell $changed $past_gclk $fell_gclk $changed_gclk $rising_gclk $steady_gclk $coverage_control $coverage_get $coverage_save $set_coverage_db_name $rose $stable $past $rose_gclk $stable_gclk $future_gclk $falling_gclk $changing_gclk $display $coverage_get_max $coverage_merge $get_coverage $load_coverage_db $typename $unpacked_dimensions $left $low $increment $clog2 $ln $log10 $exp $sqrt $pow $floor $ceil $sin $cos $tan $countbits $onehot $isunknown $fatal $warning $dimensions $right $high $size $asin $acos $atan $atan2 $hypot $sinh $cosh $tanh $asinh $acosh $atanh $countones $onehot0 $error $info $random $dist_chi_square $dist_erlang $dist_exponential $dist_normal $dist_poisson $dist_t $dist_uniform $q_initialize $q_remove $q_exam $async$and$array $async$nand$array $async$or$array $async$nor$array $sync$and$array $sync$nand$array $sync$or$array $sync$nor$array $q_add $q_full $psprintf $async$and$plane $async$nand$plane $async$or$plane $async$nor$plane $sync$and$plane $sync$nand$plane $sync$or$plane $sync$nor$plane $system $display $displayb $displayh $displayo $strobe $strobeb $strobeh $strobeo $write $readmemb $readmemh $writememh $value$plusargs $dumpvars $dumpon $dumplimit $dumpports $dumpportson $dumpportslimit $writeb $writeh $writeo $monitor $monitorb $monitorh $monitoro $writememb $dumpfile $dumpoff $dumpall $dumpflush $dumpportsoff $dumpportsall $dumpportsflush $fclose $fdisplay $fdisplayb $fdisplayh $fdisplayo $fstrobe $fstrobeb $fstrobeh $fstrobeo $swrite $swriteb $swriteh $swriteo $fscanf $fread $fseek $fflush $feof $fopen $fwrite $fwriteb $fwriteh $fwriteo $fmonitor $fmonitorb $fmonitorh $fmonitoro $sformat $sformatf $fgetc $ungetc $fgets $sscanf $rewind $ftell $ferror"
  };
  return {
    aliases: ["v", "sv", "svh"],
    cI: !1,
    k: n,
    l: /[\w\$]+/,
    c: [e.CBCM, e.CLCM, e.QSM, {
      cN: "number",
      c: [e.BE],
      v: [{
        b: "\\b((\\d+'(b|h|o|d|B|H|O|D))[0-9xzXZa-fA-F_]+)"
      }, {
        b: "\\B(('(b|h|o|d|B|H|O|D))[0-9xzXZa-fA-F_]+)"
      }, {
        b: "\\b([0-9_])+",
        r: 0
      }]
    }, {
      cN: "variable",
      v: [{
        b: "#\\((?!parameter).+\\)"
      }, {
        b: "\\.\\w+",
        r: 0
      }]
    }, {
      cN: "meta",
      b: "`",
      e: "$",
      k: {
        "meta-keyword": "define __FILE__ __LINE__ begin_keywords celldefine default_nettype define else elsif end_keywords endcelldefine endif ifdef ifndef include line nounconnected_drive pragma resetall timescale unconnected_drive undef undefineall"
      },
      r: 0
    }]
  };
});
hljs.registerLanguage("hsp", function (e) {
  return {
    cI: !0,
    l: /[\w\._]+/,
    k: "goto gosub return break repeat loop continue wait await dim sdim foreach dimtype dup dupptr end stop newmod delmod mref run exgoto on mcall assert logmes newlab resume yield onexit onerror onkey onclick oncmd exist delete mkdir chdir dirlist bload bsave bcopy memfile if else poke wpoke lpoke getstr chdpm memexpand memcpy memset notesel noteadd notedel noteload notesave randomize noteunsel noteget split strrep setease button chgdisp exec dialog mmload mmplay mmstop mci pset pget syscolor mes print title pos circle cls font sysfont objsize picload color palcolor palette redraw width gsel gcopy gzoom gmode bmpsave hsvcolor getkey listbox chkbox combox input mesbox buffer screen bgscr mouse objsel groll line clrobj boxf objprm objmode stick grect grotate gsquare gradf objimage objskip objenable celload celdiv celput newcom querycom delcom cnvstow comres axobj winobj sendmsg comevent comevarg sarrayconv callfunc cnvwtos comevdisp libptr system hspstat hspver stat cnt err strsize looplev sublev iparam wparam lparam refstr refdval int rnd strlen length length2 length3 length4 vartype gettime peek wpeek lpeek varptr varuse noteinfo instr abs limit getease str strmid strf getpath strtrim sin cos tan atan sqrt double absf expf logf limitf powf geteasef mousex mousey mousew hwnd hinstance hdc ginfo objinfo dirinfo sysinfo thismod __hspver__ __hsp30__ __date__ __time__ __line__ __file__ _debug __hspdef__ and or xor not screen_normal screen_palette screen_hide screen_fixedsize screen_tool screen_frame gmode_gdi gmode_mem gmode_rgb0 gmode_alpha gmode_rgb0alpha gmode_add gmode_sub gmode_pixela ginfo_mx ginfo_my ginfo_act ginfo_sel ginfo_wx1 ginfo_wy1 ginfo_wx2 ginfo_wy2 ginfo_vx ginfo_vy ginfo_sizex ginfo_sizey ginfo_winx ginfo_winy ginfo_mesx ginfo_mesy ginfo_r ginfo_g ginfo_b ginfo_paluse ginfo_dispx ginfo_dispy ginfo_cx ginfo_cy ginfo_intid ginfo_newid ginfo_sx ginfo_sy objinfo_mode objinfo_bmscr objinfo_hwnd notemax notesize dir_cur dir_exe dir_win dir_sys dir_cmdline dir_desktop dir_mydoc dir_tv font_normal font_bold font_italic font_underline font_strikeout font_antialias objmode_normal objmode_guifont objmode_usefont gsquare_grad msgothic msmincho do until while wend for next _break _continue switch case default swbreak swend ddim ldim alloc m_pi rad2deg deg2rad ease_linear ease_quad_in ease_quad_out ease_quad_inout ease_cubic_in ease_cubic_out ease_cubic_inout ease_quartic_in ease_quartic_out ease_quartic_inout ease_bounce_in ease_bounce_out ease_bounce_inout ease_shake_in ease_shake_out ease_shake_inout ease_loop",
    c: [e.CLCM, e.CBCM, e.QSM, e.ASM, {
      cN: "string",
      b: '{"',
      e: '"}',
      c: [e.BE]
    }, e.C(";", "$", {
      r: 0
    }), {
      cN: "meta",
      b: "#",
      e: "$",
      k: {
        "meta-keyword": "addion cfunc cmd cmpopt comfunc const defcfunc deffunc define else endif enum epack func global if ifdef ifndef include modcfunc modfunc modinit modterm module pack packopt regcmd runtime undef usecom uselib"
      },
      c: [e.inherit(e.QSM, {
        cN: "meta-string"
      }), e.NM, e.CNM, e.CLCM, e.CBCM]
    }, {
      cN: "symbol",
      b: "^\\*(\\w+|@)"
    }, e.NM, e.CNM]
  };
});
hljs.registerLanguage("rib", function (e) {
  return {
    k: "ArchiveRecord AreaLightSource Atmosphere Attribute AttributeBegin AttributeEnd Basis Begin Blobby Bound Clipping ClippingPlane Color ColorSamples ConcatTransform Cone CoordinateSystem CoordSysTransform CropWindow Curves Cylinder DepthOfField Detail DetailRange Disk Displacement Display End ErrorHandler Exposure Exterior Format FrameAspectRatio FrameBegin FrameEnd GeneralPolygon GeometricApproximation Geometry Hider Hyperboloid Identity Illuminate Imager Interior LightSource MakeCubeFaceEnvironment MakeLatLongEnvironment MakeShadow MakeTexture Matte MotionBegin MotionEnd NuPatch ObjectBegin ObjectEnd ObjectInstance Opacity Option Orientation Paraboloid Patch PatchMesh Perspective PixelFilter PixelSamples PixelVariance Points PointsGeneralPolygons PointsPolygons Polygon Procedural Projection Quantize ReadArchive RelativeDetail ReverseOrientation Rotate Scale ScreenWindow ShadingInterpolation ShadingRate Shutter Sides Skew SolidBegin SolidEnd Sphere SubdivisionMesh Surface TextureCoordinates Torus Transform TransformBegin TransformEnd TransformPoints Translate TrimCurve WorldBegin WorldEnd",
    i: "</",
    c: [e.HCM, e.CNM, e.ASM, e.QSM]
  };
});
hljs.registerLanguage("fix", function (u) {
  return {
    c: [{
      b: /[^\u2401\u0001]+/,
      e: /[\u2401\u0001]/,
      eE: !0,
      rB: !0,
      rE: !1,
      c: [{
        b: /([^\u2401\u0001=]+)/,
        e: /=([^\u2401\u0001=]+)/,
        rE: !0,
        rB: !1,
        cN: "attr"
      }, {
        b: /=/,
        e: /([\u2401\u0001])/,
        eE: !0,
        eB: !0,
        cN: "string"
      }]
    }],
    cI: !0
  };
});
hljs.registerLanguage("groovy", function (e) {
  return {
    k: {
      literal: "true false null",
      keyword: "byte short char int long boolean float double void def as in assert trait super this abstract static volatile transient public private protected synchronized final class interface enum if else for while switch case break default continue throw throws try catch finally implements extends new import package return instanceof"
    },
    c: [e.C("/\\*\\*", "\\*/", {
      r: 0,
      c: [{
        b: /\w+@/,
        r: 0
      }, {
        cN: "doctag",
        b: "@[A-Za-z]+"
      }]
    }), e.CLCM, e.CBCM, {
      cN: "string",
      b: '"""',
      e: '"""'
    }, {
      cN: "string",
      b: "'''",
      e: "'''"
    }, {
      cN: "string",
      b: "\\$/",
      e: "/\\$",
      r: 10
    }, e.ASM, {
      cN: "regexp",
      b: /~?\/[^\/\n]+\//,
      c: [e.BE]
    }, e.QSM, {
      cN: "meta",
      b: "^#!/usr/bin/env",
      e: "$",
      i: "\n"
    }, e.BNM, {
      cN: "class",
      bK: "class interface trait enum",
      e: "{",
      i: ":",
      c: [{
        bK: "extends implements"
      }, e.UTM]
    }, e.CNM, {
      cN: "meta",
      b: "@[A-Za-z]+"
    }, {
      cN: "string",
      b: /[^\?]{0}[A-Za-z0-9_$]+ *:/
    }, {
      b: /\?/,
      e: /\:/
    }, {
      cN: "symbol",
      b: "^\\s*[A-Za-z0-9_$]+:",
      r: 0
    }],
    i: /#|<\//
  };
});
hljs.registerLanguage("rust", function (e) {
  var t = "([ui](8|16|32|64|128|size)|f(32|64))?",
      r = "alignof as be box break const continue crate do else enum extern false fn for if impl in let loop match mod mut offsetof once priv proc pub pure ref return self Self sizeof static struct super trait true type typeof unsafe unsized use virtual while where yield move default",
      n = "drop i8 i16 i32 i64 i128 isize u8 u16 u32 u64 u128 usize f32 f64 str char bool Box Option Result String Vec Copy Send Sized Sync Drop Fn FnMut FnOnce ToOwned Clone Debug PartialEq PartialOrd Eq Ord AsRef AsMut Into From Default Iterator Extend IntoIterator DoubleEndedIterator ExactSizeIterator SliceConcatExt ToString assert! assert_eq! bitflags! bytes! cfg! col! concat! concat_idents! debug_assert! debug_assert_eq! env! panic! file! format! format_args! include_bin! include_str! line! local_data_key! module_path! option_env! print! println! select! stringify! try! unimplemented! unreachable! vec! write! writeln! macro_rules! assert_ne! debug_assert_ne!";
  return {
    aliases: ["rs"],
    k: {
      keyword: r,
      literal: "true false Some None Ok Err",
      built_in: n
    },
    l: e.IR + "!?",
    i: "</",
    c: [e.CLCM, e.C("/\\*", "\\*/", {
      c: ["self"]
    }), e.inherit(e.QSM, {
      b: /b?"/,
      i: null
    }), {
      cN: "string",
      v: [{
        b: /r(#*)".*?"\1(?!#)/
      }, {
        b: /b?'\\?(x\w{2}|u\w{4}|U\w{8}|.)'/
      }]
    }, {
      cN: "symbol",
      b: /'[a-zA-Z_][a-zA-Z0-9_]*/
    }, {
      cN: "number",
      v: [{
        b: "\\b0b([01_]+)" + t
      }, {
        b: "\\b0o([0-7_]+)" + t
      }, {
        b: "\\b0x([A-Fa-f0-9_]+)" + t
      }, {
        b: "\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)" + t
      }],
      r: 0
    }, {
      cN: "function",
      bK: "fn",
      e: "(\\(|<)",
      eE: !0,
      c: [e.UTM]
    }, {
      cN: "meta",
      b: "#\\!?\\[",
      e: "\\]",
      c: [{
        cN: "meta-string",
        b: /"/,
        e: /"/
      }]
    }, {
      cN: "class",
      bK: "type",
      e: ";",
      c: [e.inherit(e.UTM, {
        endsParent: !0
      })],
      i: "\\S"
    }, {
      cN: "class",
      bK: "trait enum struct union",
      e: "{",
      c: [e.inherit(e.UTM, {
        endsParent: !0
      })],
      i: "[\\w\\d]"
    }, {
      b: e.IR + "::",
      k: {
        built_in: n
      }
    }, {
      b: "->"
    }]
  };
});
hljs.registerLanguage("elixir", function (e) {
  var r = "[a-zA-Z_][a-zA-Z0-9_]*(\\!|\\?)?",
      n = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",
      b = "and false then defined module in return redo retry end for true self when next until do begin unless nil break not case cond alias while ensure or include use alias fn quote",
      c = {
    cN: "subst",
    b: "#\\{",
    e: "}",
    l: r,
    k: b
  },
      a = {
    cN: "string",
    c: [e.BE, c],
    v: [{
      b: /'/,
      e: /'/
    }, {
      b: /"/,
      e: /"/
    }]
  },
      i = {
    cN: "function",
    bK: "def defp defmacro",
    e: /\B\b/,
    c: [e.inherit(e.TM, {
      b: r,
      endsParent: !0
    })]
  },
      l = e.inherit(i, {
    cN: "class",
    bK: "defimpl defmodule defprotocol defrecord",
    e: /\bdo\b|$|;/
  }),
      s = [a, e.HCM, l, i, {
    cN: "symbol",
    b: ":(?!\\s)",
    c: [a, {
      b: n
    }],
    r: 0
  }, {
    cN: "symbol",
    b: r + ":",
    r: 0
  }, {
    cN: "number",
    b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
    r: 0
  }, {
    cN: "variable",
    b: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))"
  }, {
    b: "->"
  }, {
    b: "(" + e.RSR + ")\\s*",
    c: [e.HCM, {
      cN: "regexp",
      i: "\\n",
      c: [e.BE, c],
      v: [{
        b: "/",
        e: "/[a-z]*"
      }, {
        b: "%r\\[",
        e: "\\][a-z]*"
      }]
    }],
    r: 0
  }];
  return c.c = s, {
    l: r,
    k: b,
    c: s
  };
});
hljs.registerLanguage("asciidoc", function (e) {
  return {
    aliases: ["adoc"],
    c: [e.C("^/{4,}\\n", "\\n/{4,}$", {
      r: 10
    }), e.C("^//", "$", {
      r: 0
    }), {
      cN: "title",
      b: "^\\.\\w.*$"
    }, {
      b: "^[=\\*]{4,}\\n",
      e: "\\n^[=\\*]{4,}$",
      r: 10
    }, {
      cN: "section",
      r: 10,
      v: [{
        b: "^(={1,5}) .+?( \\1)?$"
      }, {
        b: "^[^\\[\\]\\n]+?\\n[=\\-~\\^\\+]{2,}$"
      }]
    }, {
      cN: "meta",
      b: "^:.+?:",
      e: "\\s",
      eE: !0,
      r: 10
    }, {
      cN: "meta",
      b: "^\\[.+?\\]$",
      r: 0
    }, {
      cN: "quote",
      b: "^_{4,}\\n",
      e: "\\n_{4,}$",
      r: 10
    }, {
      cN: "code",
      b: "^[\\-\\.]{4,}\\n",
      e: "\\n[\\-\\.]{4,}$",
      r: 10
    }, {
      b: "^\\+{4,}\\n",
      e: "\\n\\+{4,}$",
      c: [{
        b: "<",
        e: ">",
        sL: "xml",
        r: 0
      }],
      r: 10
    }, {
      cN: "bullet",
      b: "^(\\*+|\\-+|\\.+|[^\\n]+?::)\\s+"
    }, {
      cN: "symbol",
      b: "^(NOTE|TIP|IMPORTANT|WARNING|CAUTION):\\s+",
      r: 10
    }, {
      cN: "strong",
      b: "\\B\\*(?![\\*\\s])",
      e: "(\\n{2}|\\*)",
      c: [{
        b: "\\\\*\\w",
        r: 0
      }]
    }, {
      cN: "emphasis",
      b: "\\B'(?!['\\s])",
      e: "(\\n{2}|')",
      c: [{
        b: "\\\\'\\w",
        r: 0
      }],
      r: 0
    }, {
      cN: "emphasis",
      b: "_(?![_\\s])",
      e: "(\\n{2}|_)",
      r: 0
    }, {
      cN: "string",
      v: [{
        b: "``.+?''"
      }, {
        b: "`.+?'"
      }]
    }, {
      cN: "code",
      b: "(`.+?`|\\+.+?\\+)",
      r: 0
    }, {
      cN: "code",
      b: "^[ \\t]",
      e: "$",
      r: 0
    }, {
      b: "^'{3,}[ \\t]*$",
      r: 10
    }, {
      b: "(link:)?(http|https|ftp|file|irc|image:?):\\S+\\[.*?\\]",
      rB: !0,
      c: [{
        b: "(link|image:?):",
        r: 0
      }, {
        cN: "link",
        b: "\\w",
        e: "[^\\[]+",
        r: 0
      }, {
        cN: "string",
        b: "\\[",
        e: "\\]",
        eB: !0,
        eE: !0,
        r: 0
      }],
      r: 10
    }]
  };
});
hljs.registerLanguage("capnproto", function (t) {
  return {
    aliases: ["capnp"],
    k: {
      keyword: "struct enum interface union group import using const annotation extends in of on as with from fixed",
      built_in: "Void Bool Int8 Int16 Int32 Int64 UInt8 UInt16 UInt32 UInt64 Float32 Float64 Text Data AnyPointer AnyStruct Capability List",
      literal: "true false"
    },
    c: [t.QSM, t.NM, t.HCM, {
      cN: "meta",
      b: /@0x[\w\d]{16};/,
      i: /\n/
    }, {
      cN: "symbol",
      b: /@\d+\b/
    }, {
      cN: "class",
      bK: "struct enum",
      e: /\{/,
      i: /\n/,
      c: [t.inherit(t.TM, {
        starts: {
          eW: !0,
          eE: !0
        }
      })]
    }, {
      cN: "class",
      bK: "interface",
      e: /\{/,
      i: /\n/,
      c: [t.inherit(t.TM, {
        starts: {
          eW: !0,
          eE: !0
        }
      })]
    }]
  };
});
hljs.registerLanguage("makefile", function (e) {
  var i = {
    cN: "variable",
    v: [{
      b: "\\$\\(" + e.UIR + "\\)",
      c: [e.BE]
    }, {
      b: /\$[@%<?\^\+\*]/
    }]
  },
      r = {
    cN: "string",
    b: /"/,
    e: /"/,
    c: [e.BE, i]
  },
      a = {
    cN: "variable",
    b: /\$\([\w-]+\s/,
    e: /\)/,
    k: {
      built_in: "subst patsubst strip findstring filter filter-out sort word wordlist firstword lastword dir notdir suffix basename addsuffix addprefix join wildcard realpath abspath error warning shell origin flavor foreach if or and call eval file value"
    },
    c: [i]
  },
      n = {
    b: "^" + e.UIR + "\\s*[:+?]?=",
    i: "\\n",
    rB: !0,
    c: [{
      b: "^" + e.UIR,
      e: "[:+?]?=",
      eE: !0
    }]
  },
      t = {
    cN: "meta",
    b: /^\.PHONY:/,
    e: /$/,
    k: {
      "meta-keyword": ".PHONY"
    },
    l: /[\.\w]+/
  },
      l = {
    cN: "section",
    b: /^[^\s]+:/,
    e: /$/,
    c: [i]
  };
  return {
    aliases: ["mk", "mak"],
    k: "define endef undefine ifdef ifndef ifeq ifneq else endif include -include sinclude override export unexport private vpath",
    l: /[\w-]+/,
    c: [e.HCM, i, r, a, n, t, l]
  };
});
hljs.registerLanguage("css", function (e) {
  var c = "[a-zA-Z-][a-zA-Z0-9_-]*",
      t = {
    b: /[A-Z\_\.\-]+\s*:/,
    rB: !0,
    e: ";",
    eW: !0,
    c: [{
      cN: "attribute",
      b: /\S/,
      e: ":",
      eE: !0,
      starts: {
        eW: !0,
        eE: !0,
        c: [{
          b: /[\w-]+\(/,
          rB: !0,
          c: [{
            cN: "built_in",
            b: /[\w-]+/
          }, {
            b: /\(/,
            e: /\)/,
            c: [e.ASM, e.QSM]
          }]
        }, e.CSSNM, e.QSM, e.ASM, e.CBCM, {
          cN: "number",
          b: "#[0-9A-Fa-f]+"
        }, {
          cN: "meta",
          b: "!important"
        }]
      }
    }]
  };
  return {
    cI: !0,
    i: /[=\/|'\$]/,
    c: [e.CBCM, {
      cN: "selector-id",
      b: /#[A-Za-z0-9_-]+/
    }, {
      cN: "selector-class",
      b: /\.[A-Za-z0-9_-]+/
    }, {
      cN: "selector-attr",
      b: /\[/,
      e: /\]/,
      i: "$"
    }, {
      cN: "selector-pseudo",
      b: /:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/
    }, {
      b: "@(font-face|page)",
      l: "[a-z-]+",
      k: "font-face page"
    }, {
      b: "@",
      e: "[{;]",
      i: /:/,
      c: [{
        cN: "keyword",
        b: /\w+/
      }, {
        b: /\s/,
        eW: !0,
        eE: !0,
        r: 0,
        c: [e.ASM, e.QSM, e.CSSNM]
      }]
    }, {
      cN: "selector-tag",
      b: c,
      r: 0
    }, {
      b: "{",
      e: "}",
      i: /\S/,
      c: [e.CBCM, t]
    }]
  };
});
hljs.registerLanguage("x86asm", function (s) {
  return {
    cI: !0,
    l: "[.%]?" + s.IR,
    k: {
      keyword: "lock rep repe repz repne repnz xaquire xrelease bnd nobnd aaa aad aam aas adc add and arpl bb0_reset bb1_reset bound bsf bsr bswap bt btc btr bts call cbw cdq cdqe clc cld cli clts cmc cmp cmpsb cmpsd cmpsq cmpsw cmpxchg cmpxchg486 cmpxchg8b cmpxchg16b cpuid cpu_read cpu_write cqo cwd cwde daa das dec div dmint emms enter equ f2xm1 fabs fadd faddp fbld fbstp fchs fclex fcmovb fcmovbe fcmove fcmovnb fcmovnbe fcmovne fcmovnu fcmovu fcom fcomi fcomip fcomp fcompp fcos fdecstp fdisi fdiv fdivp fdivr fdivrp femms feni ffree ffreep fiadd ficom ficomp fidiv fidivr fild fimul fincstp finit fist fistp fisttp fisub fisubr fld fld1 fldcw fldenv fldl2e fldl2t fldlg2 fldln2 fldpi fldz fmul fmulp fnclex fndisi fneni fninit fnop fnsave fnstcw fnstenv fnstsw fpatan fprem fprem1 fptan frndint frstor fsave fscale fsetpm fsin fsincos fsqrt fst fstcw fstenv fstp fstsw fsub fsubp fsubr fsubrp ftst fucom fucomi fucomip fucomp fucompp fxam fxch fxtract fyl2x fyl2xp1 hlt ibts icebp idiv imul in inc incbin insb insd insw int int01 int1 int03 int3 into invd invpcid invlpg invlpga iret iretd iretq iretw jcxz jecxz jrcxz jmp jmpe lahf lar lds lea leave les lfence lfs lgdt lgs lidt lldt lmsw loadall loadall286 lodsb lodsd lodsq lodsw loop loope loopne loopnz loopz lsl lss ltr mfence monitor mov movd movq movsb movsd movsq movsw movsx movsxd movzx mul mwait neg nop not or out outsb outsd outsw packssdw packsswb packuswb paddb paddd paddsb paddsiw paddsw paddusb paddusw paddw pand pandn pause paveb pavgusb pcmpeqb pcmpeqd pcmpeqw pcmpgtb pcmpgtd pcmpgtw pdistib pf2id pfacc pfadd pfcmpeq pfcmpge pfcmpgt pfmax pfmin pfmul pfrcp pfrcpit1 pfrcpit2 pfrsqit1 pfrsqrt pfsub pfsubr pi2fd pmachriw pmaddwd pmagw pmulhriw pmulhrwa pmulhrwc pmulhw pmullw pmvgezb pmvlzb pmvnzb pmvzb pop popa popad popaw popf popfd popfq popfw por prefetch prefetchw pslld psllq psllw psrad psraw psrld psrlq psrlw psubb psubd psubsb psubsiw psubsw psubusb psubusw psubw punpckhbw punpckhdq punpckhwd punpcklbw punpckldq punpcklwd push pusha pushad pushaw pushf pushfd pushfq pushfw pxor rcl rcr rdshr rdmsr rdpmc rdtsc rdtscp ret retf retn rol ror rdm rsdc rsldt rsm rsts sahf sal salc sar sbb scasb scasd scasq scasw sfence sgdt shl shld shr shrd sidt sldt skinit smi smint smintold smsw stc std sti stosb stosd stosq stosw str sub svdc svldt svts swapgs syscall sysenter sysexit sysret test ud0 ud1 ud2b ud2 ud2a umov verr verw fwait wbinvd wrshr wrmsr xadd xbts xchg xlatb xlat xor cmove cmovz cmovne cmovnz cmova cmovnbe cmovae cmovnb cmovb cmovnae cmovbe cmovna cmovg cmovnle cmovge cmovnl cmovl cmovnge cmovle cmovng cmovc cmovnc cmovo cmovno cmovs cmovns cmovp cmovpe cmovnp cmovpo je jz jne jnz ja jnbe jae jnb jb jnae jbe jna jg jnle jge jnl jl jnge jle jng jc jnc jo jno js jns jpo jnp jpe jp sete setz setne setnz seta setnbe setae setnb setnc setb setnae setcset setbe setna setg setnle setge setnl setl setnge setle setng sets setns seto setno setpe setp setpo setnp addps addss andnps andps cmpeqps cmpeqss cmpleps cmpless cmpltps cmpltss cmpneqps cmpneqss cmpnleps cmpnless cmpnltps cmpnltss cmpordps cmpordss cmpunordps cmpunordss cmpps cmpss comiss cvtpi2ps cvtps2pi cvtsi2ss cvtss2si cvttps2pi cvttss2si divps divss ldmxcsr maxps maxss minps minss movaps movhps movlhps movlps movhlps movmskps movntps movss movups mulps mulss orps rcpps rcpss rsqrtps rsqrtss shufps sqrtps sqrtss stmxcsr subps subss ucomiss unpckhps unpcklps xorps fxrstor fxrstor64 fxsave fxsave64 xgetbv xsetbv xsave xsave64 xsaveopt xsaveopt64 xrstor xrstor64 prefetchnta prefetcht0 prefetcht1 prefetcht2 maskmovq movntq pavgb pavgw pextrw pinsrw pmaxsw pmaxub pminsw pminub pmovmskb pmulhuw psadbw pshufw pf2iw pfnacc pfpnacc pi2fw pswapd maskmovdqu clflush movntdq movnti movntpd movdqa movdqu movdq2q movq2dq paddq pmuludq pshufd pshufhw pshuflw pslldq psrldq psubq punpckhqdq punpcklqdq addpd addsd andnpd andpd cmpeqpd cmpeqsd cmplepd cmplesd cmpltpd cmpltsd cmpneqpd cmpneqsd cmpnlepd cmpnlesd cmpnltpd cmpnltsd cmpordpd cmpordsd cmpunordpd cmpunordsd cmppd comisd cvtdq2pd cvtdq2ps cvtpd2dq cvtpd2pi cvtpd2ps cvtpi2pd cvtps2dq cvtps2pd cvtsd2si cvtsd2ss cvtsi2sd cvtss2sd cvttpd2pi cvttpd2dq cvttps2dq cvttsd2si divpd divsd maxpd maxsd minpd minsd movapd movhpd movlpd movmskpd movupd mulpd mulsd orpd shufpd sqrtpd sqrtsd subpd subsd ucomisd unpckhpd unpcklpd xorpd addsubpd addsubps haddpd haddps hsubpd hsubps lddqu movddup movshdup movsldup clgi stgi vmcall vmclear vmfunc vmlaunch vmload vmmcall vmptrld vmptrst vmread vmresume vmrun vmsave vmwrite vmxoff vmxon invept invvpid pabsb pabsw pabsd palignr phaddw phaddd phaddsw phsubw phsubd phsubsw pmaddubsw pmulhrsw pshufb psignb psignw psignd extrq insertq movntsd movntss lzcnt blendpd blendps blendvpd blendvps dppd dpps extractps insertps movntdqa mpsadbw packusdw pblendvb pblendw pcmpeqq pextrb pextrd pextrq phminposuw pinsrb pinsrd pinsrq pmaxsb pmaxsd pmaxud pmaxuw pminsb pminsd pminud pminuw pmovsxbw pmovsxbd pmovsxbq pmovsxwd pmovsxwq pmovsxdq pmovzxbw pmovzxbd pmovzxbq pmovzxwd pmovzxwq pmovzxdq pmuldq pmulld ptest roundpd roundps roundsd roundss crc32 pcmpestri pcmpestrm pcmpistri pcmpistrm pcmpgtq popcnt getsec pfrcpv pfrsqrtv movbe aesenc aesenclast aesdec aesdeclast aesimc aeskeygenassist vaesenc vaesenclast vaesdec vaesdeclast vaesimc vaeskeygenassist vaddpd vaddps vaddsd vaddss vaddsubpd vaddsubps vandpd vandps vandnpd vandnps vblendpd vblendps vblendvpd vblendvps vbroadcastss vbroadcastsd vbroadcastf128 vcmpeq_ospd vcmpeqpd vcmplt_ospd vcmpltpd vcmple_ospd vcmplepd vcmpunord_qpd vcmpunordpd vcmpneq_uqpd vcmpneqpd vcmpnlt_uspd vcmpnltpd vcmpnle_uspd vcmpnlepd vcmpord_qpd vcmpordpd vcmpeq_uqpd vcmpnge_uspd vcmpngepd vcmpngt_uspd vcmpngtpd vcmpfalse_oqpd vcmpfalsepd vcmpneq_oqpd vcmpge_ospd vcmpgepd vcmpgt_ospd vcmpgtpd vcmptrue_uqpd vcmptruepd vcmplt_oqpd vcmple_oqpd vcmpunord_spd vcmpneq_uspd vcmpnlt_uqpd vcmpnle_uqpd vcmpord_spd vcmpeq_uspd vcmpnge_uqpd vcmpngt_uqpd vcmpfalse_ospd vcmpneq_ospd vcmpge_oqpd vcmpgt_oqpd vcmptrue_uspd vcmppd vcmpeq_osps vcmpeqps vcmplt_osps vcmpltps vcmple_osps vcmpleps vcmpunord_qps vcmpunordps vcmpneq_uqps vcmpneqps vcmpnlt_usps vcmpnltps vcmpnle_usps vcmpnleps vcmpord_qps vcmpordps vcmpeq_uqps vcmpnge_usps vcmpngeps vcmpngt_usps vcmpngtps vcmpfalse_oqps vcmpfalseps vcmpneq_oqps vcmpge_osps vcmpgeps vcmpgt_osps vcmpgtps vcmptrue_uqps vcmptrueps vcmplt_oqps vcmple_oqps vcmpunord_sps vcmpneq_usps vcmpnlt_uqps vcmpnle_uqps vcmpord_sps vcmpeq_usps vcmpnge_uqps vcmpngt_uqps vcmpfalse_osps vcmpneq_osps vcmpge_oqps vcmpgt_oqps vcmptrue_usps vcmpps vcmpeq_ossd vcmpeqsd vcmplt_ossd vcmpltsd vcmple_ossd vcmplesd vcmpunord_qsd vcmpunordsd vcmpneq_uqsd vcmpneqsd vcmpnlt_ussd vcmpnltsd vcmpnle_ussd vcmpnlesd vcmpord_qsd vcmpordsd vcmpeq_uqsd vcmpnge_ussd vcmpngesd vcmpngt_ussd vcmpngtsd vcmpfalse_oqsd vcmpfalsesd vcmpneq_oqsd vcmpge_ossd vcmpgesd vcmpgt_ossd vcmpgtsd vcmptrue_uqsd vcmptruesd vcmplt_oqsd vcmple_oqsd vcmpunord_ssd vcmpneq_ussd vcmpnlt_uqsd vcmpnle_uqsd vcmpord_ssd vcmpeq_ussd vcmpnge_uqsd vcmpngt_uqsd vcmpfalse_ossd vcmpneq_ossd vcmpge_oqsd vcmpgt_oqsd vcmptrue_ussd vcmpsd vcmpeq_osss vcmpeqss vcmplt_osss vcmpltss vcmple_osss vcmpless vcmpunord_qss vcmpunordss vcmpneq_uqss vcmpneqss vcmpnlt_usss vcmpnltss vcmpnle_usss vcmpnless vcmpord_qss vcmpordss vcmpeq_uqss vcmpnge_usss vcmpngess vcmpngt_usss vcmpngtss vcmpfalse_oqss vcmpfalsess vcmpneq_oqss vcmpge_osss vcmpgess vcmpgt_osss vcmpgtss vcmptrue_uqss vcmptruess vcmplt_oqss vcmple_oqss vcmpunord_sss vcmpneq_usss vcmpnlt_uqss vcmpnle_uqss vcmpord_sss vcmpeq_usss vcmpnge_uqss vcmpngt_uqss vcmpfalse_osss vcmpneq_osss vcmpge_oqss vcmpgt_oqss vcmptrue_usss vcmpss vcomisd vcomiss vcvtdq2pd vcvtdq2ps vcvtpd2dq vcvtpd2ps vcvtps2dq vcvtps2pd vcvtsd2si vcvtsd2ss vcvtsi2sd vcvtsi2ss vcvtss2sd vcvtss2si vcvttpd2dq vcvttps2dq vcvttsd2si vcvttss2si vdivpd vdivps vdivsd vdivss vdppd vdpps vextractf128 vextractps vhaddpd vhaddps vhsubpd vhsubps vinsertf128 vinsertps vlddqu vldqqu vldmxcsr vmaskmovdqu vmaskmovps vmaskmovpd vmaxpd vmaxps vmaxsd vmaxss vminpd vminps vminsd vminss vmovapd vmovaps vmovd vmovq vmovddup vmovdqa vmovqqa vmovdqu vmovqqu vmovhlps vmovhpd vmovhps vmovlhps vmovlpd vmovlps vmovmskpd vmovmskps vmovntdq vmovntqq vmovntdqa vmovntpd vmovntps vmovsd vmovshdup vmovsldup vmovss vmovupd vmovups vmpsadbw vmulpd vmulps vmulsd vmulss vorpd vorps vpabsb vpabsw vpabsd vpacksswb vpackssdw vpackuswb vpackusdw vpaddb vpaddw vpaddd vpaddq vpaddsb vpaddsw vpaddusb vpaddusw vpalignr vpand vpandn vpavgb vpavgw vpblendvb vpblendw vpcmpestri vpcmpestrm vpcmpistri vpcmpistrm vpcmpeqb vpcmpeqw vpcmpeqd vpcmpeqq vpcmpgtb vpcmpgtw vpcmpgtd vpcmpgtq vpermilpd vpermilps vperm2f128 vpextrb vpextrw vpextrd vpextrq vphaddw vphaddd vphaddsw vphminposuw vphsubw vphsubd vphsubsw vpinsrb vpinsrw vpinsrd vpinsrq vpmaddwd vpmaddubsw vpmaxsb vpmaxsw vpmaxsd vpmaxub vpmaxuw vpmaxud vpminsb vpminsw vpminsd vpminub vpminuw vpminud vpmovmskb vpmovsxbw vpmovsxbd vpmovsxbq vpmovsxwd vpmovsxwq vpmovsxdq vpmovzxbw vpmovzxbd vpmovzxbq vpmovzxwd vpmovzxwq vpmovzxdq vpmulhuw vpmulhrsw vpmulhw vpmullw vpmulld vpmuludq vpmuldq vpor vpsadbw vpshufb vpshufd vpshufhw vpshuflw vpsignb vpsignw vpsignd vpslldq vpsrldq vpsllw vpslld vpsllq vpsraw vpsrad vpsrlw vpsrld vpsrlq vptest vpsubb vpsubw vpsubd vpsubq vpsubsb vpsubsw vpsubusb vpsubusw vpunpckhbw vpunpckhwd vpunpckhdq vpunpckhqdq vpunpcklbw vpunpcklwd vpunpckldq vpunpcklqdq vpxor vrcpps vrcpss vrsqrtps vrsqrtss vroundpd vroundps vroundsd vroundss vshufpd vshufps vsqrtpd vsqrtps vsqrtsd vsqrtss vstmxcsr vsubpd vsubps vsubsd vsubss vtestps vtestpd vucomisd vucomiss vunpckhpd vunpckhps vunpcklpd vunpcklps vxorpd vxorps vzeroall vzeroupper pclmullqlqdq pclmulhqlqdq pclmullqhqdq pclmulhqhqdq pclmulqdq vpclmullqlqdq vpclmulhqlqdq vpclmullqhqdq vpclmulhqhqdq vpclmulqdq vfmadd132ps vfmadd132pd vfmadd312ps vfmadd312pd vfmadd213ps vfmadd213pd vfmadd123ps vfmadd123pd vfmadd231ps vfmadd231pd vfmadd321ps vfmadd321pd vfmaddsub132ps vfmaddsub132pd vfmaddsub312ps vfmaddsub312pd vfmaddsub213ps vfmaddsub213pd vfmaddsub123ps vfmaddsub123pd vfmaddsub231ps vfmaddsub231pd vfmaddsub321ps vfmaddsub321pd vfmsub132ps vfmsub132pd vfmsub312ps vfmsub312pd vfmsub213ps vfmsub213pd vfmsub123ps vfmsub123pd vfmsub231ps vfmsub231pd vfmsub321ps vfmsub321pd vfmsubadd132ps vfmsubadd132pd vfmsubadd312ps vfmsubadd312pd vfmsubadd213ps vfmsubadd213pd vfmsubadd123ps vfmsubadd123pd vfmsubadd231ps vfmsubadd231pd vfmsubadd321ps vfmsubadd321pd vfnmadd132ps vfnmadd132pd vfnmadd312ps vfnmadd312pd vfnmadd213ps vfnmadd213pd vfnmadd123ps vfnmadd123pd vfnmadd231ps vfnmadd231pd vfnmadd321ps vfnmadd321pd vfnmsub132ps vfnmsub132pd vfnmsub312ps vfnmsub312pd vfnmsub213ps vfnmsub213pd vfnmsub123ps vfnmsub123pd vfnmsub231ps vfnmsub231pd vfnmsub321ps vfnmsub321pd vfmadd132ss vfmadd132sd vfmadd312ss vfmadd312sd vfmadd213ss vfmadd213sd vfmadd123ss vfmadd123sd vfmadd231ss vfmadd231sd vfmadd321ss vfmadd321sd vfmsub132ss vfmsub132sd vfmsub312ss vfmsub312sd vfmsub213ss vfmsub213sd vfmsub123ss vfmsub123sd vfmsub231ss vfmsub231sd vfmsub321ss vfmsub321sd vfnmadd132ss vfnmadd132sd vfnmadd312ss vfnmadd312sd vfnmadd213ss vfnmadd213sd vfnmadd123ss vfnmadd123sd vfnmadd231ss vfnmadd231sd vfnmadd321ss vfnmadd321sd vfnmsub132ss vfnmsub132sd vfnmsub312ss vfnmsub312sd vfnmsub213ss vfnmsub213sd vfnmsub123ss vfnmsub123sd vfnmsub231ss vfnmsub231sd vfnmsub321ss vfnmsub321sd rdfsbase rdgsbase rdrand wrfsbase wrgsbase vcvtph2ps vcvtps2ph adcx adox rdseed clac stac xstore xcryptecb xcryptcbc xcryptctr xcryptcfb xcryptofb montmul xsha1 xsha256 llwpcb slwpcb lwpval lwpins vfmaddpd vfmaddps vfmaddsd vfmaddss vfmaddsubpd vfmaddsubps vfmsubaddpd vfmsubaddps vfmsubpd vfmsubps vfmsubsd vfmsubss vfnmaddpd vfnmaddps vfnmaddsd vfnmaddss vfnmsubpd vfnmsubps vfnmsubsd vfnmsubss vfrczpd vfrczps vfrczsd vfrczss vpcmov vpcomb vpcomd vpcomq vpcomub vpcomud vpcomuq vpcomuw vpcomw vphaddbd vphaddbq vphaddbw vphadddq vphaddubd vphaddubq vphaddubw vphaddudq vphadduwd vphadduwq vphaddwd vphaddwq vphsubbw vphsubdq vphsubwd vpmacsdd vpmacsdqh vpmacsdql vpmacssdd vpmacssdqh vpmacssdql vpmacsswd vpmacssww vpmacswd vpmacsww vpmadcsswd vpmadcswd vpperm vprotb vprotd vprotq vprotw vpshab vpshad vpshaq vpshaw vpshlb vpshld vpshlq vpshlw vbroadcasti128 vpblendd vpbroadcastb vpbroadcastw vpbroadcastd vpbroadcastq vpermd vpermpd vpermps vpermq vperm2i128 vextracti128 vinserti128 vpmaskmovd vpmaskmovq vpsllvd vpsllvq vpsravd vpsrlvd vpsrlvq vgatherdpd vgatherqpd vgatherdps vgatherqps vpgatherdd vpgatherqd vpgatherdq vpgatherqq xabort xbegin xend xtest andn bextr blci blcic blsi blsic blcfill blsfill blcmsk blsmsk blsr blcs bzhi mulx pdep pext rorx sarx shlx shrx tzcnt tzmsk t1mskc valignd valignq vblendmpd vblendmps vbroadcastf32x4 vbroadcastf64x4 vbroadcasti32x4 vbroadcasti64x4 vcompresspd vcompressps vcvtpd2udq vcvtps2udq vcvtsd2usi vcvtss2usi vcvttpd2udq vcvttps2udq vcvttsd2usi vcvttss2usi vcvtudq2pd vcvtudq2ps vcvtusi2sd vcvtusi2ss vexpandpd vexpandps vextractf32x4 vextractf64x4 vextracti32x4 vextracti64x4 vfixupimmpd vfixupimmps vfixupimmsd vfixupimmss vgetexppd vgetexpps vgetexpsd vgetexpss vgetmantpd vgetmantps vgetmantsd vgetmantss vinsertf32x4 vinsertf64x4 vinserti32x4 vinserti64x4 vmovdqa32 vmovdqa64 vmovdqu32 vmovdqu64 vpabsq vpandd vpandnd vpandnq vpandq vpblendmd vpblendmq vpcmpltd vpcmpled vpcmpneqd vpcmpnltd vpcmpnled vpcmpd vpcmpltq vpcmpleq vpcmpneqq vpcmpnltq vpcmpnleq vpcmpq vpcmpequd vpcmpltud vpcmpleud vpcmpnequd vpcmpnltud vpcmpnleud vpcmpud vpcmpequq vpcmpltuq vpcmpleuq vpcmpnequq vpcmpnltuq vpcmpnleuq vpcmpuq vpcompressd vpcompressq vpermi2d vpermi2pd vpermi2ps vpermi2q vpermt2d vpermt2pd vpermt2ps vpermt2q vpexpandd vpexpandq vpmaxsq vpmaxuq vpminsq vpminuq vpmovdb vpmovdw vpmovqb vpmovqd vpmovqw vpmovsdb vpmovsdw vpmovsqb vpmovsqd vpmovsqw vpmovusdb vpmovusdw vpmovusqb vpmovusqd vpmovusqw vpord vporq vprold vprolq vprolvd vprolvq vprord vprorq vprorvd vprorvq vpscatterdd vpscatterdq vpscatterqd vpscatterqq vpsraq vpsravq vpternlogd vpternlogq vptestmd vptestmq vptestnmd vptestnmq vpxord vpxorq vrcp14pd vrcp14ps vrcp14sd vrcp14ss vrndscalepd vrndscaleps vrndscalesd vrndscaless vrsqrt14pd vrsqrt14ps vrsqrt14sd vrsqrt14ss vscalefpd vscalefps vscalefsd vscalefss vscatterdpd vscatterdps vscatterqpd vscatterqps vshuff32x4 vshuff64x2 vshufi32x4 vshufi64x2 kandnw kandw kmovw knotw kortestw korw kshiftlw kshiftrw kunpckbw kxnorw kxorw vpbroadcastmb2q vpbroadcastmw2d vpconflictd vpconflictq vplzcntd vplzcntq vexp2pd vexp2ps vrcp28pd vrcp28ps vrcp28sd vrcp28ss vrsqrt28pd vrsqrt28ps vrsqrt28sd vrsqrt28ss vgatherpf0dpd vgatherpf0dps vgatherpf0qpd vgatherpf0qps vgatherpf1dpd vgatherpf1dps vgatherpf1qpd vgatherpf1qps vscatterpf0dpd vscatterpf0dps vscatterpf0qpd vscatterpf0qps vscatterpf1dpd vscatterpf1dps vscatterpf1qpd vscatterpf1qps prefetchwt1 bndmk bndcl bndcu bndcn bndmov bndldx bndstx sha1rnds4 sha1nexte sha1msg1 sha1msg2 sha256rnds2 sha256msg1 sha256msg2 hint_nop0 hint_nop1 hint_nop2 hint_nop3 hint_nop4 hint_nop5 hint_nop6 hint_nop7 hint_nop8 hint_nop9 hint_nop10 hint_nop11 hint_nop12 hint_nop13 hint_nop14 hint_nop15 hint_nop16 hint_nop17 hint_nop18 hint_nop19 hint_nop20 hint_nop21 hint_nop22 hint_nop23 hint_nop24 hint_nop25 hint_nop26 hint_nop27 hint_nop28 hint_nop29 hint_nop30 hint_nop31 hint_nop32 hint_nop33 hint_nop34 hint_nop35 hint_nop36 hint_nop37 hint_nop38 hint_nop39 hint_nop40 hint_nop41 hint_nop42 hint_nop43 hint_nop44 hint_nop45 hint_nop46 hint_nop47 hint_nop48 hint_nop49 hint_nop50 hint_nop51 hint_nop52 hint_nop53 hint_nop54 hint_nop55 hint_nop56 hint_nop57 hint_nop58 hint_nop59 hint_nop60 hint_nop61 hint_nop62 hint_nop63",
      built_in: "ip eip rip al ah bl bh cl ch dl dh sil dil bpl spl r8b r9b r10b r11b r12b r13b r14b r15b ax bx cx dx si di bp sp r8w r9w r10w r11w r12w r13w r14w r15w eax ebx ecx edx esi edi ebp esp eip r8d r9d r10d r11d r12d r13d r14d r15d rax rbx rcx rdx rsi rdi rbp rsp r8 r9 r10 r11 r12 r13 r14 r15 cs ds es fs gs ss st st0 st1 st2 st3 st4 st5 st6 st7 mm0 mm1 mm2 mm3 mm4 mm5 mm6 mm7 xmm0  xmm1  xmm2  xmm3  xmm4  xmm5  xmm6  xmm7  xmm8  xmm9 xmm10  xmm11 xmm12 xmm13 xmm14 xmm15 xmm16 xmm17 xmm18 xmm19 xmm20 xmm21 xmm22 xmm23 xmm24 xmm25 xmm26 xmm27 xmm28 xmm29 xmm30 xmm31 ymm0  ymm1  ymm2  ymm3  ymm4  ymm5  ymm6  ymm7  ymm8  ymm9 ymm10  ymm11 ymm12 ymm13 ymm14 ymm15 ymm16 ymm17 ymm18 ymm19 ymm20 ymm21 ymm22 ymm23 ymm24 ymm25 ymm26 ymm27 ymm28 ymm29 ymm30 ymm31 zmm0  zmm1  zmm2  zmm3  zmm4  zmm5  zmm6  zmm7  zmm8  zmm9 zmm10  zmm11 zmm12 zmm13 zmm14 zmm15 zmm16 zmm17 zmm18 zmm19 zmm20 zmm21 zmm22 zmm23 zmm24 zmm25 zmm26 zmm27 zmm28 zmm29 zmm30 zmm31 k0 k1 k2 k3 k4 k5 k6 k7 bnd0 bnd1 bnd2 bnd3 cr0 cr1 cr2 cr3 cr4 cr8 dr0 dr1 dr2 dr3 dr8 tr3 tr4 tr5 tr6 tr7 r0 r1 r2 r3 r4 r5 r6 r7 r0b r1b r2b r3b r4b r5b r6b r7b r0w r1w r2w r3w r4w r5w r6w r7w r0d r1d r2d r3d r4d r5d r6d r7d r0h r1h r2h r3h r0l r1l r2l r3l r4l r5l r6l r7l r8l r9l r10l r11l r12l r13l r14l r15l db dw dd dq dt ddq do dy dz resb resw resd resq rest resdq reso resy resz incbin equ times byte word dword qword nosplit rel abs seg wrt strict near far a32 ptr",
      meta: "%define %xdefine %+ %undef %defstr %deftok %assign %strcat %strlen %substr %rotate %elif %else %endif %if %ifmacro %ifctx %ifidn %ifidni %ifid %ifnum %ifstr %iftoken %ifempty %ifenv %error %warning %fatal %rep %endrep %include %push %pop %repl %pathsearch %depend %use %arg %stacksize %local %line %comment %endcomment .nolist __FILE__ __LINE__ __SECT__  __BITS__ __OUTPUT_FORMAT__ __DATE__ __TIME__ __DATE_NUM__ __TIME_NUM__ __UTC_DATE__ __UTC_TIME__ __UTC_DATE_NUM__ __UTC_TIME_NUM__  __PASS__ struc endstruc istruc at iend align alignb sectalign daz nodaz up down zero default option assume public bits use16 use32 use64 default section segment absolute extern global common cpu float __utf16__ __utf16le__ __utf16be__ __utf32__ __utf32le__ __utf32be__ __float8__ __float16__ __float32__ __float64__ __float80m__ __float80e__ __float128l__ __float128h__ __Infinity__ __QNaN__ __SNaN__ Inf NaN QNaN SNaN float8 float16 float32 float64 float80m float80e float128l float128h __FLOAT_DAZ__ __FLOAT_ROUND__ __FLOAT__"
    },
    c: [s.C(";", "$", {
      r: 0
    }), {
      cN: "number",
      v: [{
        b: "\\b(?:([0-9][0-9_]*)?\\.[0-9_]*(?:[eE][+-]?[0-9_]+)?|(0[Xx])?[0-9][0-9_]*\\.?[0-9_]*(?:[pP](?:[+-]?[0-9_]+)?)?)\\b",
        r: 0
      }, {
        b: "\\$[0-9][0-9A-Fa-f]*",
        r: 0
      }, {
        b: "\\b(?:[0-9A-Fa-f][0-9A-Fa-f_]*[Hh]|[0-9][0-9_]*[DdTt]?|[0-7][0-7_]*[QqOo]|[0-1][0-1_]*[BbYy])\\b"
      }, {
        b: "\\b(?:0[Xx][0-9A-Fa-f_]+|0[DdTt][0-9_]+|0[QqOo][0-7_]+|0[BbYy][0-1_]+)\\b"
      }]
    }, s.QSM, {
      cN: "string",
      v: [{
        b: "'",
        e: "[^\\\\]'"
      }, {
        b: "`",
        e: "[^\\\\]`"
      }],
      r: 0
    }, {
      cN: "symbol",
      v: [{
        b: "^\\s*[A-Za-z._?][A-Za-z0-9_$#@~.?]*(:|\\s+label)"
      }, {
        b: "^\\s*%%[A-Za-z0-9_$#@~.?]*:"
      }],
      r: 0
    }, {
      cN: "subst",
      b: "%[0-9]+",
      r: 0
    }, {
      cN: "subst",
      b: "%!S+",
      r: 0
    }, {
      cN: "meta",
      b: /^\s*\.[\w_-]+/
    }]
  };
});
hljs.registerLanguage("shell", function (s) {
  return {
    aliases: ["console"],
    c: [{
      cN: "meta",
      b: "^\\s{0,3}[\\w\\d\\[\\]()@-]*[>%$#]",
      starts: {
        e: "$",
        sL: "bash"
      }
    }]
  };
});
hljs.registerLanguage("oxygene", function (e) {
  var r = "abstract add and array as asc aspect assembly async begin break block by case class concat const copy constructor continue create default delegate desc distinct div do downto dynamic each else empty end ensure enum equals event except exit extension external false final finalize finalizer finally flags for forward from function future global group has if implementation implements implies in index inherited inline interface into invariants is iterator join locked locking loop matching method mod module namespace nested new nil not notify nullable of old on operator or order out override parallel params partial pinned private procedure property protected public queryable raise read readonly record reintroduce remove repeat require result reverse sealed select self sequence set shl shr skip static step soft take then to true try tuple type union unit unsafe until uses using var virtual raises volatile where while with write xor yield await mapped deprecated stdcall cdecl pascal register safecall overload library platform reference packed strict published autoreleasepool selector strong weak unretained",
      t = e.C("{", "}", {
    r: 0
  }),
      a = e.C("\\(\\*", "\\*\\)", {
    r: 10
  }),
      n = {
    cN: "string",
    b: "'",
    e: "'",
    c: [{
      b: "''"
    }]
  },
      o = {
    cN: "string",
    b: "(#\\d+)+"
  },
      i = {
    cN: "function",
    bK: "function constructor destructor procedure method",
    e: "[:;]",
    k: "function constructor|10 destructor|10 procedure|10 method|10",
    c: [e.TM, {
      cN: "params",
      b: "\\(",
      e: "\\)",
      k: r,
      c: [n, o]
    }, t, a]
  };
  return {
    cI: !0,
    l: /\.?\w+/,
    k: r,
    i: '("|\\$[G-Zg-z]|\\/\\*|</|=>|->)',
    c: [t, a, e.CLCM, n, o, e.NM, i, {
      cN: "class",
      b: "=\\bclass\\b",
      e: "end;",
      k: r,
      c: [n, o, t, a, e.CLCM, i]
    }]
  };
});
hljs.registerLanguage("autoit", function (e) {
  var t = "ByRef Case Const ContinueCase ContinueLoop Default Dim Do Else ElseIf EndFunc EndIf EndSelect EndSwitch EndWith Enum Exit ExitLoop For Func Global If In Local Next ReDim Return Select Static Step Switch Then To Until Volatile WEnd While With",
      r = "True False And Null Not Or",
      i = "Abs ACos AdlibRegister AdlibUnRegister Asc AscW ASin Assign ATan AutoItSetOption AutoItWinGetTitle AutoItWinSetTitle Beep Binary BinaryLen BinaryMid BinaryToString BitAND BitNOT BitOR BitRotate BitShift BitXOR BlockInput Break Call CDTray Ceiling Chr ChrW ClipGet ClipPut ConsoleRead ConsoleWrite ConsoleWriteError ControlClick ControlCommand ControlDisable ControlEnable ControlFocus ControlGetFocus ControlGetHandle ControlGetPos ControlGetText ControlHide ControlListView ControlMove ControlSend ControlSetText ControlShow ControlTreeView Cos Dec DirCopy DirCreate DirGetSize DirMove DirRemove DllCall DllCallAddress DllCallbackFree DllCallbackGetPtr DllCallbackRegister DllClose DllOpen DllStructCreate DllStructGetData DllStructGetPtr DllStructGetSize DllStructSetData DriveGetDrive DriveGetFileSystem DriveGetLabel DriveGetSerial DriveGetType DriveMapAdd DriveMapDel DriveMapGet DriveSetLabel DriveSpaceFree DriveSpaceTotal DriveStatus EnvGet EnvSet EnvUpdate Eval Execute Exp FileChangeDir FileClose FileCopy FileCreateNTFSLink FileCreateShortcut FileDelete FileExists FileFindFirstFile FileFindNextFile FileFlush FileGetAttrib FileGetEncoding FileGetLongName FileGetPos FileGetShortcut FileGetShortName FileGetSize FileGetTime FileGetVersion FileInstall FileMove FileOpen FileOpenDialog FileRead FileReadLine FileReadToArray FileRecycle FileRecycleEmpty FileSaveDialog FileSelectFolder FileSetAttrib FileSetEnd FileSetPos FileSetTime FileWrite FileWriteLine Floor FtpSetProxy FuncName GUICreate GUICtrlCreateAvi GUICtrlCreateButton GUICtrlCreateCheckbox GUICtrlCreateCombo GUICtrlCreateContextMenu GUICtrlCreateDate GUICtrlCreateDummy GUICtrlCreateEdit GUICtrlCreateGraphic GUICtrlCreateGroup GUICtrlCreateIcon GUICtrlCreateInput GUICtrlCreateLabel GUICtrlCreateList GUICtrlCreateListView GUICtrlCreateListViewItem GUICtrlCreateMenu GUICtrlCreateMenuItem GUICtrlCreateMonthCal GUICtrlCreateObj GUICtrlCreatePic GUICtrlCreateProgress GUICtrlCreateRadio GUICtrlCreateSlider GUICtrlCreateTab GUICtrlCreateTabItem GUICtrlCreateTreeView GUICtrlCreateTreeViewItem GUICtrlCreateUpdown GUICtrlDelete GUICtrlGetHandle GUICtrlGetState GUICtrlRead GUICtrlRecvMsg GUICtrlRegisterListViewSort GUICtrlSendMsg GUICtrlSendToDummy GUICtrlSetBkColor GUICtrlSetColor GUICtrlSetCursor GUICtrlSetData GUICtrlSetDefBkColor GUICtrlSetDefColor GUICtrlSetFont GUICtrlSetGraphic GUICtrlSetImage GUICtrlSetLimit GUICtrlSetOnEvent GUICtrlSetPos GUICtrlSetResizing GUICtrlSetState GUICtrlSetStyle GUICtrlSetTip GUIDelete GUIGetCursorInfo GUIGetMsg GUIGetStyle GUIRegisterMsg GUISetAccelerators GUISetBkColor GUISetCoord GUISetCursor GUISetFont GUISetHelp GUISetIcon GUISetOnEvent GUISetState GUISetStyle GUIStartGroup GUISwitch Hex HotKeySet HttpSetProxy HttpSetUserAgent HWnd InetClose InetGet InetGetInfo InetGetSize InetRead IniDelete IniRead IniReadSection IniReadSectionNames IniRenameSection IniWrite IniWriteSection InputBox Int IsAdmin IsArray IsBinary IsBool IsDeclared IsDllStruct IsFloat IsFunc IsHWnd IsInt IsKeyword IsNumber IsObj IsPtr IsString Log MemGetStats Mod MouseClick MouseClickDrag MouseDown MouseGetCursor MouseGetPos MouseMove MouseUp MouseWheel MsgBox Number ObjCreate ObjCreateInterface ObjEvent ObjGet ObjName OnAutoItExitRegister OnAutoItExitUnRegister Ping PixelChecksum PixelGetColor PixelSearch ProcessClose ProcessExists ProcessGetStats ProcessList ProcessSetPriority ProcessWait ProcessWaitClose ProgressOff ProgressOn ProgressSet Ptr Random RegDelete RegEnumKey RegEnumVal RegRead RegWrite Round Run RunAs RunAsWait RunWait Send SendKeepActive SetError SetExtended ShellExecute ShellExecuteWait Shutdown Sin Sleep SoundPlay SoundSetWaveVolume SplashImageOn SplashOff SplashTextOn Sqrt SRandom StatusbarGetText StderrRead StdinWrite StdioClose StdoutRead String StringAddCR StringCompare StringFormat StringFromASCIIArray StringInStr StringIsAlNum StringIsAlpha StringIsASCII StringIsDigit StringIsFloat StringIsInt StringIsLower StringIsSpace StringIsUpper StringIsXDigit StringLeft StringLen StringLower StringMid StringRegExp StringRegExpReplace StringReplace StringReverse StringRight StringSplit StringStripCR StringStripWS StringToASCIIArray StringToBinary StringTrimLeft StringTrimRight StringUpper Tan TCPAccept TCPCloseSocket TCPConnect TCPListen TCPNameToIP TCPRecv TCPSend TCPShutdown, UDPShutdown TCPStartup, UDPStartup TimerDiff TimerInit ToolTip TrayCreateItem TrayCreateMenu TrayGetMsg TrayItemDelete TrayItemGetHandle TrayItemGetState TrayItemGetText TrayItemSetOnEvent TrayItemSetState TrayItemSetText TraySetClick TraySetIcon TraySetOnEvent TraySetPauseIcon TraySetState TraySetToolTip TrayTip UBound UDPBind UDPCloseSocket UDPOpen UDPRecv UDPSend VarGetType WinActivate WinActive WinClose WinExists WinFlash WinGetCaretPos WinGetClassList WinGetClientSize WinGetHandle WinGetPos WinGetProcess WinGetState WinGetText WinGetTitle WinKill WinList WinMenuSelectItem WinMinimizeAll WinMinimizeAllUndo WinMove WinSetOnTop WinSetState WinSetTitle WinSetTrans WinWait",
      l = {
    v: [e.C(";", "$", {
      r: 0
    }), e.C("#cs", "#ce"), e.C("#comments-start", "#comments-end")]
  },
      n = {
    b: "\\$[A-z0-9_]+"
  },
      o = {
    cN: "string",
    v: [{
      b: /"/,
      e: /"/,
      c: [{
        b: /""/,
        r: 0
      }]
    }, {
      b: /'/,
      e: /'/,
      c: [{
        b: /''/,
        r: 0
      }]
    }]
  },
      a = {
    v: [e.BNM, e.CNM]
  },
      S = {
    cN: "meta",
    b: "#",
    e: "$",
    k: {
      "meta-keyword": "comments include include-once NoTrayIcon OnAutoItStartRegister pragma compile RequireAdmin"
    },
    c: [{
      b: /\\\n/,
      r: 0
    }, {
      bK: "include",
      k: {
        "meta-keyword": "include"
      },
      e: "$",
      c: [o, {
        cN: "meta-string",
        v: [{
          b: "<",
          e: ">"
        }, {
          b: /"/,
          e: /"/,
          c: [{
            b: /""/,
            r: 0
          }]
        }, {
          b: /'/,
          e: /'/,
          c: [{
            b: /''/,
            r: 0
          }]
        }]
      }]
    }, o, l]
  },
      C = {
    cN: "symbol",
    b: "@[A-z0-9_]+"
  },
      s = {
    cN: "function",
    bK: "Func",
    e: "$",
    i: "\\$|\\[|%",
    c: [e.UTM, {
      cN: "params",
      b: "\\(",
      e: "\\)",
      c: [n, o, a]
    }]
  };
  return {
    cI: !0,
    i: /\/\*/,
    k: {
      keyword: t,
      built_in: i,
      literal: r
    },
    c: [l, n, o, a, S, C, s]
  };
});
hljs.registerLanguage("axapta", function (e) {
  return {
    k: "false int abstract private char boolean static null if for true while long throw finally protected final return void enum else break new catch byte super case short default double public try this switch continue reverse firstfast firstonly forupdate nofetch sum avg minof maxof count order group by asc desc index hint like dispaly edit client server ttsbegin ttscommit str real date container anytype common div mod",
    c: [e.CLCM, e.CBCM, e.ASM, e.QSM, e.CNM, {
      cN: "meta",
      b: "#",
      e: "$"
    }, {
      cN: "class",
      bK: "class interface",
      e: "{",
      eE: !0,
      i: ":",
      c: [{
        bK: "extends implements"
      }, e.UTM]
    }]
  };
});
hljs.registerLanguage("qml", function (r) {
  var e = {
    keyword: "in of on if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await import",
    literal: "true false null undefined NaN Infinity",
    built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Behavior bool color coordinate date double enumeration font geocircle georectangle geoshape int list matrix4x4 parent point quaternion real rect size string url var variant vector2d vector3d vector4dPromise"
  },
      t = "[a-zA-Z_][a-zA-Z0-9\\._]*",
      a = {
    cN: "keyword",
    b: "\\bproperty\\b",
    starts: {
      cN: "string",
      e: "(:|=|;|,|//|/\\*|$)",
      rE: !0
    }
  },
      n = {
    cN: "keyword",
    b: "\\bsignal\\b",
    starts: {
      cN: "string",
      e: "(\\(|:|=|;|,|//|/\\*|$)",
      rE: !0
    }
  },
      o = {
    cN: "attribute",
    b: "\\bid\\s*:",
    starts: {
      cN: "string",
      e: t,
      rE: !1
    }
  },
      i = {
    b: t + "\\s*:",
    rB: !0,
    c: [{
      cN: "attribute",
      b: t,
      e: "\\s*:",
      eE: !0,
      r: 0
    }],
    r: 0
  },
      c = {
    b: t + "\\s*{",
    e: "{",
    rB: !0,
    r: 0,
    c: [r.inherit(r.TM, {
      b: t
    })]
  };
  return {
    aliases: ["qt"],
    cI: !1,
    k: e,
    c: [{
      cN: "meta",
      b: /^\s*['"]use (strict|asm)['"]/
    }, r.ASM, r.QSM, {
      cN: "string",
      b: "`",
      e: "`",
      c: [r.BE, {
        cN: "subst",
        b: "\\$\\{",
        e: "\\}"
      }]
    }, r.CLCM, r.CBCM, {
      cN: "number",
      v: [{
        b: "\\b(0[bB][01]+)"
      }, {
        b: "\\b(0[oO][0-7]+)"
      }, {
        b: r.CNR
      }],
      r: 0
    }, {
      b: "(" + r.RSR + "|\\b(case|return|throw)\\b)\\s*",
      k: "return throw case",
      c: [r.CLCM, r.CBCM, r.RM, {
        b: /</,
        e: />\s*[);\]]/,
        r: 0,
        sL: "xml"
      }],
      r: 0
    }, n, a, {
      cN: "function",
      bK: "function",
      e: /\{/,
      eE: !0,
      c: [r.inherit(r.TM, {
        b: /[A-Za-z$_][0-9A-Za-z$_]*/
      }), {
        cN: "params",
        b: /\(/,
        e: /\)/,
        eB: !0,
        eE: !0,
        c: [r.CLCM, r.CBCM]
      }],
      i: /\[|%/
    }, {
      b: "\\." + r.IR,
      r: 0
    }, o, i, c],
    i: /#/
  };
});
hljs.registerLanguage("subunit", function (s) {
  var r = {
    cN: "string",
    b: "\\[\n(multipart)?",
    e: "\\]\n"
  },
      t = {
    cN: "string",
    b: "\\d{4}-\\d{2}-\\d{2}(\\s+)\\d{2}:\\d{2}:\\d{2}.\\d+Z"
  },
      e = {
    cN: "string",
    b: "(\\+|-)\\d+"
  },
      c = {
    cN: "keyword",
    r: 10,
    v: [{
      b: "^(test|testing|success|successful|failure|error|skip|xfail|uxsuccess)(:?)\\s+(test)?"
    }, {
      b: "^progress(:?)(\\s+)?(pop|push)?"
    }, {
      b: "^tags:"
    }, {
      b: "^time:"
    }]
  };
  return {
    cI: !0,
    c: [r, t, e, c]
  };
});
hljs.registerLanguage("vala", function (t) {
  return {
    k: {
      keyword: "char uchar unichar int uint long ulong short ushort int8 int16 int32 int64 uint8 uint16 uint32 uint64 float double bool struct enum string void weak unowned owned async signal static abstract interface override virtual delegate if while do for foreach else switch case break default return try catch public private protected internal using new this get set const stdout stdin stderr var",
      built_in: "DBus GLib CCode Gee Object Gtk Posix",
      literal: "false true null"
    },
    c: [{
      cN: "class",
      bK: "class interface namespace",
      e: "{",
      eE: !0,
      i: "[^,:\\n\\s\\.]",
      c: [t.UTM]
    }, t.CLCM, t.CBCM, {
      cN: "string",
      b: '"""',
      e: '"""',
      r: 5
    }, t.ASM, t.QSM, t.CNM, {
      cN: "meta",
      b: "^#",
      e: "$",
      r: 2
    }]
  };
});
hljs.registerLanguage("hy", function (e) {
  var t = {
    "builtin-name": "!= % %= & &= * ** **= *= *map + += , --build-class-- --import-- -= . / // //= /= < << <<= <= = > >= >> >>= @ @= ^ ^= abs accumulate all and any ap-compose ap-dotimes ap-each ap-each-while ap-filter ap-first ap-if ap-last ap-map ap-map-when ap-pipe ap-reduce ap-reject apply as-> ascii assert assoc bin break butlast callable calling-module-name car case cdr chain chr coll? combinations compile compress cond cons cons? continue count curry cut cycle dec def default-method defclass defmacro defmacro-alias defmacro/g! defmain defmethod defmulti defn defn-alias defnc defnr defreader defseq del delattr delete-route dict-comp dir disassemble dispatch-reader-macro distinct divmod do doto drop drop-last drop-while empty? end-sequence eval eval-and-compile eval-when-compile even? every? except exec filter first flatten float? fn fnc fnr for for* format fraction genexpr gensym get getattr global globals group-by hasattr hash hex id identity if if* if-not if-python2 import in inc input instance? integer integer-char? integer? interleave interpose is is-coll is-cons is-empty is-even is-every is-float is-instance is-integer is-integer-char is-iterable is-iterator is-keyword is-neg is-none is-not is-numeric is-odd is-pos is-string is-symbol is-zero isinstance islice issubclass iter iterable? iterate iterator? keyword keyword? lambda last len let lif lif-not list* list-comp locals loop macro-error macroexpand macroexpand-1 macroexpand-all map max merge-with method-decorator min multi-decorator multicombinations name neg? next none? nonlocal not not-in not? nth numeric? oct odd? open or ord partition permutations pos? post-route postwalk pow prewalk print product profile/calls profile/cpu put-route quasiquote quote raise range read read-str recursive-replace reduce remove repeat repeatedly repr require rest round route route-with-methods rwm second seq set-comp setattr setv some sorted string string? sum switch symbol? take take-nth take-while tee try unless unquote unquote-splicing vars walk when while with with* with-decorator with-gensyms xi xor yield yield-from zero? zip zip-longest | |= ~"
  },
      i = "a-zA-Z_\\-!.?+*=<>&#'",
      a = "[" + i + "][" + i + "0-9/;:]*",
      r = "[-+]?\\d+(\\.\\d+)?",
      o = {
    cN: "meta",
    b: "^#!",
    e: "$"
  },
      s = {
    b: a,
    r: 0
  },
      n = {
    cN: "number",
    b: r,
    r: 0
  },
      l = e.inherit(e.QSM, {
    i: null
  }),
      c = e.C(";", "$", {
    r: 0
  }),
      d = {
    cN: "literal",
    b: /\b([Tt]rue|[Ff]alse|nil|None)\b/
  },
      p = {
    b: "[\\[\\{]",
    e: "[\\]\\}]"
  },
      m = {
    cN: "comment",
    b: "\\^" + a
  },
      u = e.C("\\^\\{", "\\}"),
      f = {
    cN: "symbol",
    b: "[:]{1,2}" + a
  },
      h = {
    b: "\\(",
    e: "\\)"
  },
      b = {
    eW: !0,
    r: 0
  },
      g = {
    k: t,
    l: a,
    cN: "name",
    b: a,
    starts: b
  },
      y = [h, l, m, u, c, f, p, n, d, s];
  return h.c = [e.C("comment", ""), g, b], b.c = y, p.c = y, {
    aliases: ["hylang"],
    i: /\S/,
    c: [o, h, l, m, u, c, f, p, n, d]
  };
});
hljs.registerLanguage("glsl", function (e) {
  return {
    k: {
      keyword: "break continue discard do else for if return while switch case default attribute binding buffer ccw centroid centroid varying coherent column_major const cw depth_any depth_greater depth_less depth_unchanged early_fragment_tests equal_spacing flat fractional_even_spacing fractional_odd_spacing highp in index inout invariant invocations isolines layout line_strip lines lines_adjacency local_size_x local_size_y local_size_z location lowp max_vertices mediump noperspective offset origin_upper_left out packed patch pixel_center_integer point_mode points precise precision quads r11f_g11f_b10f r16 r16_snorm r16f r16i r16ui r32f r32i r32ui r8 r8_snorm r8i r8ui readonly restrict rg16 rg16_snorm rg16f rg16i rg16ui rg32f rg32i rg32ui rg8 rg8_snorm rg8i rg8ui rgb10_a2 rgb10_a2ui rgba16 rgba16_snorm rgba16f rgba16i rgba16ui rgba32f rgba32i rgba32ui rgba8 rgba8_snorm rgba8i rgba8ui row_major sample shared smooth std140 std430 stream triangle_strip triangles triangles_adjacency uniform varying vertices volatile writeonly",
      type: "atomic_uint bool bvec2 bvec3 bvec4 dmat2 dmat2x2 dmat2x3 dmat2x4 dmat3 dmat3x2 dmat3x3 dmat3x4 dmat4 dmat4x2 dmat4x3 dmat4x4 double dvec2 dvec3 dvec4 float iimage1D iimage1DArray iimage2D iimage2DArray iimage2DMS iimage2DMSArray iimage2DRect iimage3D iimageBufferiimageCube iimageCubeArray image1D image1DArray image2D image2DArray image2DMS image2DMSArray image2DRect image3D imageBuffer imageCube imageCubeArray int isampler1D isampler1DArray isampler2D isampler2DArray isampler2DMS isampler2DMSArray isampler2DRect isampler3D isamplerBuffer isamplerCube isamplerCubeArray ivec2 ivec3 ivec4 mat2 mat2x2 mat2x3 mat2x4 mat3 mat3x2 mat3x3 mat3x4 mat4 mat4x2 mat4x3 mat4x4 sampler1D sampler1DArray sampler1DArrayShadow sampler1DShadow sampler2D sampler2DArray sampler2DArrayShadow sampler2DMS sampler2DMSArray sampler2DRect sampler2DRectShadow sampler2DShadow sampler3D samplerBuffer samplerCube samplerCubeArray samplerCubeArrayShadow samplerCubeShadow image1D uimage1DArray uimage2D uimage2DArray uimage2DMS uimage2DMSArray uimage2DRect uimage3D uimageBuffer uimageCube uimageCubeArray uint usampler1D usampler1DArray usampler2D usampler2DArray usampler2DMS usampler2DMSArray usampler2DRect usampler3D samplerBuffer usamplerCube usamplerCubeArray uvec2 uvec3 uvec4 vec2 vec3 vec4 void",
      built_in: "gl_MaxAtomicCounterBindings gl_MaxAtomicCounterBufferSize gl_MaxClipDistances gl_MaxClipPlanes gl_MaxCombinedAtomicCounterBuffers gl_MaxCombinedAtomicCounters gl_MaxCombinedImageUniforms gl_MaxCombinedImageUnitsAndFragmentOutputs gl_MaxCombinedTextureImageUnits gl_MaxComputeAtomicCounterBuffers gl_MaxComputeAtomicCounters gl_MaxComputeImageUniforms gl_MaxComputeTextureImageUnits gl_MaxComputeUniformComponents gl_MaxComputeWorkGroupCount gl_MaxComputeWorkGroupSize gl_MaxDrawBuffers gl_MaxFragmentAtomicCounterBuffers gl_MaxFragmentAtomicCounters gl_MaxFragmentImageUniforms gl_MaxFragmentInputComponents gl_MaxFragmentInputVectors gl_MaxFragmentUniformComponents gl_MaxFragmentUniformVectors gl_MaxGeometryAtomicCounterBuffers gl_MaxGeometryAtomicCounters gl_MaxGeometryImageUniforms gl_MaxGeometryInputComponents gl_MaxGeometryOutputComponents gl_MaxGeometryOutputVertices gl_MaxGeometryTextureImageUnits gl_MaxGeometryTotalOutputComponents gl_MaxGeometryUniformComponents gl_MaxGeometryVaryingComponents gl_MaxImageSamples gl_MaxImageUnits gl_MaxLights gl_MaxPatchVertices gl_MaxProgramTexelOffset gl_MaxTessControlAtomicCounterBuffers gl_MaxTessControlAtomicCounters gl_MaxTessControlImageUniforms gl_MaxTessControlInputComponents gl_MaxTessControlOutputComponents gl_MaxTessControlTextureImageUnits gl_MaxTessControlTotalOutputComponents gl_MaxTessControlUniformComponents gl_MaxTessEvaluationAtomicCounterBuffers gl_MaxTessEvaluationAtomicCounters gl_MaxTessEvaluationImageUniforms gl_MaxTessEvaluationInputComponents gl_MaxTessEvaluationOutputComponents gl_MaxTessEvaluationTextureImageUnits gl_MaxTessEvaluationUniformComponents gl_MaxTessGenLevel gl_MaxTessPatchComponents gl_MaxTextureCoords gl_MaxTextureImageUnits gl_MaxTextureUnits gl_MaxVaryingComponents gl_MaxVaryingFloats gl_MaxVaryingVectors gl_MaxVertexAtomicCounterBuffers gl_MaxVertexAtomicCounters gl_MaxVertexAttribs gl_MaxVertexImageUniforms gl_MaxVertexOutputComponents gl_MaxVertexOutputVectors gl_MaxVertexTextureImageUnits gl_MaxVertexUniformComponents gl_MaxVertexUniformVectors gl_MaxViewports gl_MinProgramTexelOffset gl_BackColor gl_BackLightModelProduct gl_BackLightProduct gl_BackMaterial gl_BackSecondaryColor gl_ClipDistance gl_ClipPlane gl_ClipVertex gl_Color gl_DepthRange gl_EyePlaneQ gl_EyePlaneR gl_EyePlaneS gl_EyePlaneT gl_Fog gl_FogCoord gl_FogFragCoord gl_FragColor gl_FragCoord gl_FragData gl_FragDepth gl_FrontColor gl_FrontFacing gl_FrontLightModelProduct gl_FrontLightProduct gl_FrontMaterial gl_FrontSecondaryColor gl_GlobalInvocationID gl_InstanceID gl_InvocationID gl_Layer gl_LightModel gl_LightSource gl_LocalInvocationID gl_LocalInvocationIndex gl_ModelViewMatrix gl_ModelViewMatrixInverse gl_ModelViewMatrixInverseTranspose gl_ModelViewMatrixTranspose gl_ModelViewProjectionMatrix gl_ModelViewProjectionMatrixInverse gl_ModelViewProjectionMatrixInverseTranspose gl_ModelViewProjectionMatrixTranspose gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 gl_MultiTexCoord3 gl_MultiTexCoord4 gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 gl_Normal gl_NormalMatrix gl_NormalScale gl_NumSamples gl_NumWorkGroups gl_ObjectPlaneQ gl_ObjectPlaneR gl_ObjectPlaneS gl_ObjectPlaneT gl_PatchVerticesIn gl_Point gl_PointCoord gl_PointSize gl_Position gl_PrimitiveID gl_PrimitiveIDIn gl_ProjectionMatrix gl_ProjectionMatrixInverse gl_ProjectionMatrixInverseTranspose gl_ProjectionMatrixTranspose gl_SampleID gl_SampleMask gl_SampleMaskIn gl_SamplePosition gl_SecondaryColor gl_TessCoord gl_TessLevelInner gl_TessLevelOuter gl_TexCoord gl_TextureEnvColor gl_TextureMatrix gl_TextureMatrixInverse gl_TextureMatrixInverseTranspose gl_TextureMatrixTranspose gl_Vertex gl_VertexID gl_ViewportIndex gl_WorkGroupID gl_WorkGroupSize gl_in gl_out EmitStreamVertex EmitVertex EndPrimitive EndStreamPrimitive abs acos acosh all any asin asinh atan atanh atomicAdd atomicAnd atomicCompSwap atomicCounter atomicCounterDecrement atomicCounterIncrement atomicExchange atomicMax atomicMin atomicOr atomicXor barrier bitCount bitfieldExtract bitfieldInsert bitfieldReverse ceil clamp cos cosh cross dFdx dFdy degrees determinant distance dot equal exp exp2 faceforward findLSB findMSB floatBitsToInt floatBitsToUint floor fma fract frexp ftransform fwidth greaterThan greaterThanEqual groupMemoryBarrier imageAtomicAdd imageAtomicAnd imageAtomicCompSwap imageAtomicExchange imageAtomicMax imageAtomicMin imageAtomicOr imageAtomicXor imageLoad imageSize imageStore imulExtended intBitsToFloat interpolateAtCentroid interpolateAtOffset interpolateAtSample inverse inversesqrt isinf isnan ldexp length lessThan lessThanEqual log log2 matrixCompMult max memoryBarrier memoryBarrierAtomicCounter memoryBarrierBuffer memoryBarrierImage memoryBarrierShared min mix mod modf noise1 noise2 noise3 noise4 normalize not notEqual outerProduct packDouble2x32 packHalf2x16 packSnorm2x16 packSnorm4x8 packUnorm2x16 packUnorm4x8 pow radians reflect refract round roundEven shadow1D shadow1DLod shadow1DProj shadow1DProjLod shadow2D shadow2DLod shadow2DProj shadow2DProjLod sign sin sinh smoothstep sqrt step tan tanh texelFetch texelFetchOffset texture texture1D texture1DLod texture1DProj texture1DProjLod texture2D texture2DLod texture2DProj texture2DProjLod texture3D texture3DLod texture3DProj texture3DProjLod textureCube textureCubeLod textureGather textureGatherOffset textureGatherOffsets textureGrad textureGradOffset textureLod textureLodOffset textureOffset textureProj textureProjGrad textureProjGradOffset textureProjLod textureProjLodOffset textureProjOffset textureQueryLevels textureQueryLod textureSize transpose trunc uaddCarry uintBitsToFloat umulExtended unpackDouble2x32 unpackHalf2x16 unpackSnorm2x16 unpackSnorm4x8 unpackUnorm2x16 unpackUnorm4x8 usubBorrow",
      literal: "true false"
    },
    i: '"',
    c: [e.CLCM, e.CBCM, e.CNM, {
      cN: "meta",
      b: "#",
      e: "$"
    }]
  };
});
hljs.registerLanguage("pf", function (t) {
  var o = {
    cN: "variable",
    b: /\$[\w\d#@][\w\d_]*/
  },
      e = {
    cN: "variable",
    b: /<(?!\/)/,
    e: />/
  };
  return {
    aliases: ["pf.conf"],
    l: /[a-z0-9_<>-]+/,
    k: {
      built_in: "block match pass load anchor|5 antispoof|10 set table",
      keyword: "in out log quick on rdomain inet inet6 proto from port os to routeallow-opts divert-packet divert-reply divert-to flags group icmp-typeicmp6-type label once probability recieved-on rtable prio queuetos tag tagged user keep fragment for os dropaf-to|10 binat-to|10 nat-to|10 rdr-to|10 bitmask least-stats random round-robinsource-hash static-portdup-to reply-to route-toparent bandwidth default min max qlimitblock-policy debug fingerprints hostid limit loginterface optimizationreassemble ruleset-optimization basic none profile skip state-defaultsstate-policy timeoutconst counters persistno modulate synproxy state|5 floating if-bound no-sync pflow|10 sloppysource-track global rule max-src-nodes max-src-states max-src-connmax-src-conn-rate overload flushscrub|5 max-mss min-ttl no-df|10 random-id",
      literal: "all any no-route self urpf-failed egress|5 unknown"
    },
    c: [t.HCM, t.NM, t.QSM, o, e]
  };
});
hljs.registerLanguage("vbnet", function (e) {
  return {
    aliases: ["vb"],
    cI: !0,
    k: {
      keyword: "addhandler addressof alias and andalso aggregate ansi as assembly auto binary by byref byval call case catch class compare const continue custom declare default delegate dim distinct do each equals else elseif end enum erase error event exit explicit finally for friend from function get global goto group handles if implements imports in inherits interface into is isfalse isnot istrue join key let lib like loop me mid mod module mustinherit mustoverride mybase myclass namespace narrowing new next not notinheritable notoverridable of off on operator option optional or order orelse overloads overridable overrides paramarray partial preserve private property protected public raiseevent readonly redim rem removehandler resume return select set shadows shared skip static step stop structure strict sub synclock take text then throw to try unicode until using when where while widening with withevents writeonly xor",
      built_in: "boolean byte cbool cbyte cchar cdate cdec cdbl char cint clng cobj csbyte cshort csng cstr ctype date decimal directcast double gettype getxmlnamespace iif integer long object sbyte short single string trycast typeof uinteger ulong ushort",
      literal: "true false nothing"
    },
    i: "//|{|}|endif|gosub|variant|wend",
    c: [e.inherit(e.QSM, {
      c: [{
        b: '""'
      }]
    }), e.C("'", "$", {
      rB: !0,
      c: [{
        cN: "doctag",
        b: "'''|<!--|-->",
        c: [e.PWM]
      }, {
        cN: "doctag",
        b: "</?",
        e: ">",
        c: [e.PWM]
      }]
    }), e.CNM, {
      cN: "meta",
      b: "#",
      e: "$",
      k: {
        "meta-keyword": "if else elseif end region externalsource"
      }
    }]
  };
});
hljs.registerLanguage("coq", function (e) {
  return {
    k: {
      keyword: "_ as at cofix else end exists exists2 fix for forall fun if IF in let match mod Prop return Set then Type using where with Abort About Add Admit Admitted All Arguments Assumptions Axiom Back BackTo Backtrack Bind Blacklist Canonical Cd Check Class Classes Close Coercion Coercions CoFixpoint CoInductive Collection Combined Compute Conjecture Conjectures Constant constr Constraint Constructors Context Corollary CreateHintDb Cut Declare Defined Definition Delimit Dependencies DependentDerive Drop eauto End Equality Eval Example Existential Existentials Existing Export exporting Extern Extract Extraction Fact Field Fields File Fixpoint Focus for From Function Functional Generalizable Global Goal Grab Grammar Graph Guarded Heap Hint HintDb Hints Hypotheses Hypothesis ident Identity If Immediate Implicit Import Include Inductive Infix Info Initial Inline Inspect Instance Instances Intro Intros Inversion Inversion_clear Language Left Lemma Let Libraries Library Load LoadPath Local Locate Ltac ML Mode Module Modules Monomorphic Morphism Next NoInline Notation Obligation Obligations Opaque Open Optimize Options Parameter Parameters Parametric Path Paths pattern Polymorphic Preterm Print Printing Program Projections Proof Proposition Pwd Qed Quit Rec Record Recursive Redirect Relation Remark Remove Require Reserved Reset Resolve Restart Rewrite Right Ring Rings Save Scheme Scope Scopes Script Search SearchAbout SearchHead SearchPattern SearchRewrite Section Separate Set Setoid Show Solve Sorted Step Strategies Strategy Structure SubClass Table Tables Tactic Term Test Theorem Time Timeout Transparent Type Typeclasses Types Undelimit Undo Unfocus Unfocused Unfold Universe Universes Unset Unshelve using Variable Variables Variant Verbose Visibility where with",
      built_in: "abstract absurd admit after apply as assert assumption at auto autorewrite autounfold before bottom btauto by case case_eq cbn cbv change classical_left classical_right clear clearbody cofix compare compute congruence constr_eq constructor contradict contradiction cut cutrewrite cycle decide decompose dependent destruct destruction dintuition discriminate discrR do double dtauto eapply eassumption eauto ecase econstructor edestruct ediscriminate eelim eexact eexists einduction einjection eleft elim elimtype enough equality erewrite eright esimplify_eq esplit evar exact exactly_once exfalso exists f_equal fail field field_simplify field_simplify_eq first firstorder fix fold fourier functional generalize generalizing gfail give_up has_evar hnf idtac in induction injection instantiate intro intro_pattern intros intuition inversion inversion_clear is_evar is_var lapply lazy left lia lra move native_compute nia nsatz omega once pattern pose progress proof psatz quote record red refine reflexivity remember rename repeat replace revert revgoals rewrite rewrite_strat right ring ring_simplify rtauto set setoid_reflexivity setoid_replace setoid_rewrite setoid_symmetry setoid_transitivity shelve shelve_unifiable simpl simple simplify_eq solve specialize split split_Rabs split_Rmult stepl stepr subst sum swap symmetry tactic tauto time timeout top transitivity trivial try tryif unfold unify until using vm_compute with"
    },
    c: [e.QSM, e.C("\\(\\*", "\\*\\)"), e.CNM, {
      cN: "type",
      eB: !0,
      b: "\\|\\s*",
      e: "\\w+"
    }, {
      b: /[-=]>/
    }]
  };
});
/* highlightjs-line-numbers.js 2.6.0 | (C) 2018 Yauheni Pakala | MIT License | github.com/wcoder/highlightjs-line-numbers.js */

!function (n, e) {
  "use strict";

  function t() {
    var n = e.createElement("style");
    n.type = "text/css", n.innerHTML = g(".{0}{border-collapse:collapse}.{0} td{padding:0}.{1}:before{content:attr({2})}", [v, L, b]), e.getElementsByTagName("head")[0].appendChild(n);
  }

  function r(t) {
    "interactive" === e.readyState || "complete" === e.readyState ? i(t) : n.addEventListener("DOMContentLoaded", function () {
      i(t);
    });
  }

  function i(t) {
    try {
      var r = e.querySelectorAll("code.hljs,code.nohighlight");

      for (var i in r) r.hasOwnProperty(i) && l(r[i], t);
    } catch (o) {
      n.console.error("LineNumbers error: ", o);
    }
  }

  function l(n, e) {
    "object" == typeof n && f(function () {
      n.innerHTML = s(n, e);
    });
  }

  function o(n, e) {
    if ("string" == typeof n) {
      var t = document.createElement("code");
      return t.innerHTML = n, s(t, e);
    }
  }

  function s(n, e) {
    e = e || {
      singleLine: !1
    };
    var t = e.singleLine ? 0 : 1;
    return c(n), a(n.innerHTML, t);
  }

  function a(n, e) {
    var t = u(n);

    if ("" === t[t.length - 1].trim() && t.pop(), t.length > e) {
      for (var r = "", i = 0, l = t.length; i < l; i++) r += g('<tr><td class="{0}"><div class="{1} {2}" {3}="{5}"></div></td><td class="{4}"><div class="{1}">{6}</div></td></tr>', [j, m, L, b, p, i + 1, t[i].length > 0 ? t[i] : " "]);

      return g('<table class="{0}">{1}</table>', [v, r]);
    }

    return n;
  }

  function c(n) {
    var e = n.childNodes;

    for (var t in e) if (e.hasOwnProperty(t)) {
      var r = e[t];
      h(r.textContent) > 0 && (r.childNodes.length > 0 ? c(r) : d(r.parentNode));
    }
  }

  function d(n) {
    var e = n.className;

    if (/hljs-/.test(e)) {
      for (var t = u(n.innerHTML), r = 0, i = ""; r < t.length; r++) {
        var l = t[r].length > 0 ? t[r] : " ";
        i += g('<span class="{0}">{1}</span>\n', [e, l]);
      }

      n.innerHTML = i.trim();
    }
  }

  function u(n) {
    return 0 === n.length ? [] : n.split(y);
  }

  function h(n) {
    return (n.trim().match(y) || []).length;
  }

  function f(e) {
    n.setTimeout(e, 0);
  }

  function g(n, e) {
    return n.replace(/\{(\d+)\}/g, function (n, t) {
      return e[t] ? e[t] : n;
    });
  }

  var v = "hljs-ln",
      m = "hljs-ln-line",
      p = "hljs-ln-code",
      j = "hljs-ln-numbers",
      L = "hljs-ln-n",
      b = "data-line-number",
      y = /\r\n|\r|\n/g;
  n.hljs ? (n.hljs.initLineNumbersOnLoad = r, n.hljs.lineNumbersBlock = l, n.hljs.lineNumbersValue = o, t()) : n.console.error("highlight.js not detected!");
}(window, document);
/**
 * This reveal.js plugin is wrapper around the highlight.js
 * syntax highlighting library.
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    root.RevealHighlight = factory();
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.RevealHighlight = factory();
  }
})(this, function () {
  // Function to perform a better "data-trim" on code snippets
  // Will slice an indentation amount on each line of the snippet (amount based on the line having the lowest indentation length)
  function betterTrim(snippetEl) {
    // Helper functions
    function trimLeft(val) {
      // Adapted from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim#Polyfill
      return val.replace(/^[\s\uFEFF\xA0]+/g, '');
    }

    function trimLineBreaks(input) {
      var lines = input.split('\n'); // Trim line-breaks from the beginning

      for (var i = 0; i < lines.length; i++) {
        if (lines[i].trim() === '') {
          lines.splice(i--, 1);
        } else break;
      } // Trim line-breaks from the end


      for (var i = lines.length - 1; i >= 0; i--) {
        if (lines[i].trim() === '') {
          lines.splice(i, 1);
        } else break;
      }

      return lines.join('\n');
    } // Main function for betterTrim()


    return function (snippetEl) {
      var content = trimLineBreaks(snippetEl.innerHTML);
      var lines = content.split('\n'); // Calculate the minimum amount to remove on each line start of the snippet (can be 0)

      var pad = lines.reduce(function (acc, line) {
        if (line.length > 0 && trimLeft(line).length > 0 && acc > line.length - trimLeft(line).length) {
          return line.length - trimLeft(line).length;
        }

        return acc;
      }, Number.POSITIVE_INFINITY); // Slice each line with this amount

      return lines.map(function (line, index) {
        return line.slice(pad);
      }).join('\n');
    }(snippetEl);
  }

  var RevealHighlight = {
    init: function () {
      // Read the plugin config options and provide fallbacks
      var config = Reveal.getConfig().highlight || {};
      config.highlightOnLoad = typeof config.highlightOnLoad === 'boolean' ? config.highlightOnLoad : true;
      config.escapeHTML = typeof config.escapeHTML === 'boolean' ? config.escapeHTML : true;
      [].slice.call(document.querySelectorAll('.reveal pre code')).forEach(function (block) {
        // Trim whitespace if the "data-trim" attribute is present
        if (block.hasAttribute('data-trim') && typeof block.innerHTML.trim === 'function') {
          block.innerHTML = betterTrim(block);
        } // Escape HTML tags unless the "data-noescape" attrbute is present


        if (config.escapeHTML && !block.hasAttribute('data-noescape')) {
          block.innerHTML = block.innerHTML.replace(/</g, "&lt;").replace(/>/g, '&gt;');
        } // Re-highlight when focus is lost (for contenteditable code)


        block.addEventListener('focusout', function (event) {
          hljs.highlightBlock(event.currentTarget);
        }, false);

        if (config.highlightOnLoad) {
          RevealHighlight.highlightBlock(block);
        }
      });
    },

    /**
     * Highlights a code block. If the <code> node has the
     * 'data-line-numbers' attribute we also generate slide
     * numbers.
     */
    highlightBlock: function (block) {
      hljs.highlightBlock(block);

      if (block.hasAttribute('data-line-numbers')) {
        hljs.lineNumbersBlock(block, {
          singleLine: true
        }); // hljs.lineNumbersBlock runs async code on the next cycle,
        // so we need to do the same to execute after it's done

        setTimeout(RevealHighlight.highlightLines.bind(this, block), 0);
      }
    },

    /**
     * Visually emphasize specific lines within a code block.
     * This only works on blocks with line numbering turned on.
     *
     * @param {HTMLElement} block a <code> block
     * @param {String} [linesToHighlight] The lines that should be
     * highlighted in this format:
     * "1" 		= highlights line 1
     * "2,5"	= highlights lines 2 & 5
     * "2,5-7"	= highlights lines 2, 5, 6 & 7
     */
    highlightLines: function (block, linesToHighlight) {
      linesToHighlight = linesToHighlight || block.getAttribute('data-line-numbers');

      if (typeof linesToHighlight === 'string' && linesToHighlight !== '') {
        linesToHighlight.split(',').forEach(function (lineNumbers) {
          // Avoid failures becase of whitespace
          lineNumbers = lineNumbers.replace(/\s/g, ''); // Ensure that we looking at a valid slide number (1 or 1-2)

          if (/^[\d-]+$/.test(lineNumbers)) {
            lineNumbers = lineNumbers.split('-');
            var lineStart = lineNumbers[0];
            var lineEnd = lineNumbers[1] || lineStart;
            [].slice.call(block.querySelectorAll('table tr:nth-child(n+' + lineStart + '):nth-child(-n+' + lineEnd + ')')).forEach(function (lineElement) {
              lineElement.classList.add('highlight-line');
            });
          }
        });
      }
    }
  };
  typeof Reveal !== "undefined" && Reveal.registerPlugin('highlight', RevealHighlight);
  return RevealHighlight;
});
},{}],"utils/operators.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.map = map;
exports.filter = filter;
exports.flatMap = flatMap;
exports.last = last;
exports.flatMapLatest = flatMapLatest;
exports.combine = combine;
exports.merge = merge;
exports.logValues = logValues;
exports.delay = delay;
exports.once = once;
exports.fromEvent = fromEvent;
exports.toCallback = toCallback;

async function* identity(iterable) {
  for await (const value of iterable) yield value;
}

async function* map(iterable, fn) {
  for await (const value of iterable) yield fn(value);
}

async function* filter(iterable, fn) {
  for await (const value of iterable) if (fn(value)) yield value;
}

;

async function* flatMap(iterable, fn) {
  for await (const value of iterable) {
    for await (const inner of value) {
      yield await fn(inner);
    }
  }
}

;
Symbol.ignored = Symbol(); // easier with promise cancellation

function last(fn) {
  let lastSeen = Symbol.ignored;
  return function (...args) {
    const current = lastSeen = fn.call(this, ...args);
    return current.then(value => current !== lastSeen ? Symbol.ignored : value);
  };
}

async function* flatMapLatest(iterable, fn) {
  for await (const value of map(iterable, last(fn))) {
    if (value !== Symbol.ignored) yield value;
  }
}

;

async function* combine(iterable1, iterable2) {
  yield* iterable1;
  yield* iterable2;
}
/*https://stackoverflow.com/questions/50585456/how-can-i-interleave-merge-async-iterables*/


async function* merge(iterable) {
  function scheduleNextValue(asyncIterator, iteratorIndex) {
    return asyncIterator.next().then(result => ({
      iteratorIndex,
      result
    }));
  }

  const never = new Promise(() => {});
  const asyncIterators = Array.from(iterable, asyncIterable => identity(asyncIterable));
  let count = asyncIterators.length;
  const nextValuePromises = asyncIterators.map(scheduleNextValue);

  while (count) {
    const {
      iteratorIndex,
      result
    } = await Promise.race(nextValuePromises);

    if (result.done) {
      nextValuePromises[iteratorIndex] = never;
      count--;
    } else {
      nextValuePromises[iteratorIndex] = scheduleNextValue(asyncIterators[iteratorIndex], iteratorIndex);
      yield result.value;
    }
  }
}

async function logValues(iterable) {
  for await (const value of iterable) {
    console.log(value);
  }
}

async function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
} // Promisified sleep function


const sleep = ms => new Promise((resolve, reject) => {
  setTimeout(() => resolve(ms), ms);
}); // const a = async function * () {
//     yield 'a';
//     await sleep(1000);
//     yield 'b';
//     await sleep(2000);
//     yield 'c';
// };
// const b = async function * () {
//     await sleep(600);
//     yield 'i';
//     yield 'j';
//     await sleep(2000);
//     yield 'k';
// };
// function b1(){
//     return b();
// }


const c = async function* () {
  yield 'x';
  await sleep(2000);
  yield 'y';
  await sleep(8000);
  yield 'z';
  await sleep(10000);
  throw new Error('You have gone too far! ');
}; // logValues(combine([1,2], [1,2]));
// const timer = () => setInterval(()=>console.log('tick'), 1000)
// // timer();
// logValues(merge([a(), b()]));


function once(el, event) {
  return new Promise((resolve, reject) => {
    const handler = function (e) {
      resolve(e);
      el.removeEventListener(event, handler);
    };

    el.addEventListener(event, handler);
  });
}

async function* fromEvent(element, eventName) {
  while (true) yield await once(element, eventName);
}

async function toCallback(eventIterator, fn) {
  for await (const value of eventIterator) {
    fn(value);
  }
}
},{}],"flow-drawing.js":[function(require,module,exports) {
"use strict";

require("@ui5/webcomponents/dist/Button");

require("@ui5/webcomponents/dist/Input");

require("@ui5/webcomponents/dist/InputSuggestions");

require("../../../slides/plugin/highlight/highlight.js");

var _operators = require("./utils/operators.js");

//included to allow merging with autocomplete sample
hljs.initHighlightingOnLoad();

function scale($Pre, sTranslateXY) {
  if ($Pre.style.transform == "") {
    $Pre.style.transform = "translate(" + sTranslateXY + ") scale(1.5)";
  } else {
    $Pre.style.transform = "";
  }
}

function scaleLiveSearch(oClickEvent) {
  if (oClickEvent.target.id !== "suggestions-input") {
    var $Pre = document.getElementById("liveSearchCode");
    scale($Pre, "-100px, 50px");
  }
}

function scaleFlow(oClickEvent) {
  if (oClickEvent.target.id !== "decrement" || oClickEvent.target.id === "increment") {
    //don't do it on UI5 controls
    var $Pre = document.getElementById("flowCode");
    scale($Pre, "200px, -230px");
  }
}

document.getElementById("asyncFlow").addEventListener("click", scaleFlow);
document.getElementById("liveSearch").addEventListener("click", scaleLiveSearch);

function drawing($minus, $plus) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      // drawing code
      var w = window,
          d = document,
          e = d.documentElement,
          g = d.getElementById('asyncFlow'),
          x = g.clientWidth,
          y = w.innerHeight || e.clientHeight || g.clientHeight;

      if (y < 700) {
        y = 700;
      } // Creates canvas 320 × 200 at 10, 50


      var paper = Raphael(0, 0, x, y);

      function moveEvent(conn, labelText, value, bottomText) {
        var n = conn.line.getTotalLength();
        var pos = conn.line.getPointAtLength(0);
        var radius = typeof labelText === 'string' ? 20 : 20;
        var circle = paper.circle(pos.x, pos.y, radius);
        circle.attr({
          cx: pos.x,
          cy: pos.y,
          fill: '#fff',
          stroke: '#000'
        });
        var label = paper.text();
        label.attr({
          text: labelText,
          'font-size': '12px'
        });
        var bottomLabel;

        if (bottomText) {
          bottomLabel = paper.text();
          bottomLabel.attr({
            text: bottomText,
            'font-size': '12px',
            'font-family': 'monospace',
            'white-space': 'pre',
            'text-anchor': 'end'
          });
        }

        var counter = 0;
        return new Promise(function (resolve) {
          var interval;

          function animate() {
            if (n < counter) {
              clearInterval(interval);
              circle.remove();
              label.remove();

              if (bottomLabel) {
                bottomLabel.remove();
              }

              resolve(value);
              return;
            }

            var pos = conn.line.getPointAtLength(counter);
            circle.attr({
              cx: pos.x,
              cy: pos.y
            });
            label.attr({
              x: pos.x,
              y: pos.y
            });

            if (bottomLabel) {
              bottomLabel.attr({
                x: pos.x - 50,
                y: pos.y + 60
              });
            }

            counter += 1;
          }

          interval = setInterval(animate, 10);
        });
      }

      window.drawing = {};
      drawing.moveEvent = moveEvent;
      var decClicks = paper.rect(300, 150, 100, 50);
      decClicks.attr('fill', '#ffe');
      decClicks.attr('stroke', '#f00');
      var decClicksText = paper.text(350, 175);
      decClicksText.attr({
        text: 'eventToValue\nev => -1',
        'font-size': '14px'
      });
      var decrementsText = paper.text(450, 160);
      decrementsText.attr({
        text: 'decrement iterator',
        'font-size': '12px'
      });
      var incClicks = paper.rect(300, 250, 100, 50);
      incClicks.attr('fill', '#ffe');
      incClicks.attr('stroke', '#f00');
      var incClicksText = paper.text(350, 275);
      incClicksText.attr({
        text: 'eventToValue\nev => +1',
        'font-size': '14px'
      });
      var incrementsText = paper.text(450, 285);
      incrementsText.attr({
        text: 'increment iterator',
        'font-size': '12px'
      });
      var actions = paper.rect(500, 200, 100, 50);
      actions.attr('fill', '#ffe');
      actions.attr('stroke', '#f00');
      var actionsText = paper.text(550, 225);
      actionsText.attr({
        text: 'merge',
        'font-size': '15px'
      });
      var actions$Text = paper.text(590, 260);
      actions$Text.attr({
        text: 'action iterator',
        'font-size': '13px'
      }); // paper.connection(circle, circle2, '#00f')
      // animating movement along path is based on
      // http://jsfiddle.net/gyeSf/17/

      drawing.c1 = paper.connection($minus, decClicks, '#333');
      drawing.c2 = paper.connection($plus.getDomRef(), incClicks, '#333');
      drawing.c3 = paper.connection(decClicks, actions, '#333');
      drawing.c4 = paper.connection(incClicks, actions, '#333'); // model

      var scan = paper.rect(450, 360, 100, 80);
      scan.attr('fill', '#ffe');
      scan.attr('stroke', '#0f0');
      var scanText = paper.text(500, 395);
      scanText.attr({
        text: 'count\n += \naction',
        'font-size': '15px'
      });
      var valueText = paper.text(580, 400);
      valueText.attr({
        text: 'value\n0',
        'font-size': '15px'
      });

      drawing.setValue = function (value) {
        valueText.attr('text', 'value\n' + value);
      };

      var count$Text = paper.text(430, 455);
      count$Text.attr({
        text: 'count iterator',
        'font-size': '15px'
      });
      drawing.c5 = paper.connection(actions, scan, '#333'); // view

      var vtree = paper.rect(150, 490, 340, 80);
      vtree.attr('fill', '#ffe');
      vtree.attr('stroke', '#00f');
      var vtreeText = paper.text(200, 530);
      vtreeText.attr({
        text: 'for await (const count of model){\n' + '    $input.setAttribute("value", i);\n' + '}',
        'font-size': '15px',
        'font-family': 'monospace',
        'white-space': 'pre',
        'text-anchor': 'start'
      }); // var vtree$Text = paper.text(320, 635)
      // vtree$Text.attr({ text: 'databinding', 'font-size': '15px' })

      drawing.c6 = paper.connection(scan, vtree, '#333');
      drawing.c7 = paper.connection(vtree, document.querySelector('#app'), '#333'); // Intent / Model / View blocks

      var intentBlock = paper.rect(280, 120, 350, 200);
      intentBlock.attr({
        stroke: '#f00'
      });
      var intentText = paper.text(600, 130);
      intentText.attr({
        text: 'Intent',
        'font-size': '15px',
        fill: '#f00',
        stroke: 'none'
      });
      var modelBlock = paper.rect(280, 330, 350, 150);
      modelBlock.attr({
        stroke: '#0f0'
      });
      var modelText = paper.text(600, 340);
      modelText.attr({
        text: 'Model',
        'font-size': '15px',
        fill: '#0f0',
        stroke: 'none'
      });
      var viewText = paper.text(480, 500);
      viewText.attr({
        text: '',
        'font-size': '15px',
        fill: '#00f',
        stroke: 'none'
      });
      resolve();
    }, 1000);
  });
}

async function* moveEvent(eventIterator, c, text) {
  for await (const value of eventIterator) {
    //yielding the value will wait drawing promise until it takes the next value of event iterator
    yield drawing.moveEvent(drawing[c], text || value, value);
  }
}

async function* eventToValue(eventIterator, value) {
  for await (const event of eventIterator) {
    yield value;
  }
}

async function* model(incrementIterator, decrementIterator, startValue) {
  var count = startValue;

  for await (const action of (0, _operators.merge)([incrementIterator, decrementIterator])) {
    await drawing.moveEvent(drawing.c5, action);
    count += action;
    await drawing.setValue(count);
    await drawing.moveEvent(drawing.c6, count);
    yield count;
  }
}

async function main() {
  var $plus = document.getElementById("increment");
  var $minus = document.getElementById("decrement");
  var $label = document.getElementById("value");
  await drawing($minus, $plus);

  for await (const count of model(moveEvent(eventToValue(moveEvent((0, _operators.fromEvent)($minus, "click"), "c1", "event"), -1), "c3"), moveEvent(eventToValue(moveEvent((0, _operators.fromEvent)($plus, "click"), "c2", "event"), 1), "c4"), 0)) {
    console.log(count);
    await drawing.moveEvent(drawing.c7, "setValue", count, 'input.setAttribute\n("value", ' + count + '")');
    $label.setAttribute("value", "Count: " + count);
  }
}

main();
},{"@ui5/webcomponents/dist/Button":"../node_modules/@ui5/webcomponents/dist/Button.js","@ui5/webcomponents/dist/Input":"../node_modules/@ui5/webcomponents/dist/Input.js","@ui5/webcomponents/dist/InputSuggestions":"../node_modules/@ui5/webcomponents/dist/InputSuggestions.js","../../../slides/plugin/highlight/highlight.js":"../../../slides/plugin/highlight/highlight.js","./utils/operators.js":"utils/operators.js"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49358" + '/');

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
      } else {
        window.location.reload();
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
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","flow-drawing.js"], null)
//# sourceMappingURL=/flow-drawing.77b08ca7.js.map