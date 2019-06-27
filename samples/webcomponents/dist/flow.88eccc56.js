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
},{"@ui5/webcomponents-base/src/UI5Element.js":"../node_modules/@ui5/webcomponents-base/src/UI5Element.js","@ui5/webcomponents-base/src/renderer/LitRenderer.js":"../node_modules/@ui5/webcomponents-base/src/renderer/LitRenderer.js","@ui5/webcomponents-core/dist/sap/ui/Device.js":"../node_modules/@ui5/webcomponents-core/dist/sap/ui/Device.js","@ui5/webcomponents-base/src/types/ValueState.js":"../node_modules/@ui5/webcomponents-base/src/types/ValueState.js","@ui5/webcomponents-base/src/Configuration.js":"../node_modules/@ui5/webcomponents-base/src/Configuration.js","@ui5/webcomponents-base/src/FeaturesRegistry.js":"../node_modules/@ui5/webcomponents-base/src/FeaturesRegistry.js","@ui5/webcomponents-base/src/events/PseudoEvents.js":"../node_modules/@ui5/webcomponents-base/src/events/PseudoEvents.js","./Icon.js":"../node_modules/@ui5/webcomponents/dist/Icon.js","./types/InputType.js":"../node_modules/@ui5/webcomponents/dist/types/InputType.js","./build/compiled/InputTemplate.lit.js":"../node_modules/@ui5/webcomponents/dist/build/compiled/InputTemplate.lit.js","./themes/Input.css.js":"../node_modules/@ui5/webcomponents/dist/themes/Input.css.js","./themes/ShellBarInput.css.js":"../node_modules/@ui5/webcomponents/dist/themes/ShellBarInput.css.js"}],"utils/operators.js":[function(require,module,exports) {
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
},{}],"flow.js":[function(require,module,exports) {
"use strict";

require("@ui5/webcomponents/dist/Button");

require("@ui5/webcomponents/dist/Input");

var _operators = require("./utils/operators.js");

async function* increments(eventIterator) {
  for await (const event of eventIterator) {
    yield +1;
  }
}

async function* decrements(eventIterator) {
  for await (const event of eventIterator) {
    yield -1;
  }
}

async function* data(incrementIterator, decrementIterator, startValue) {
  var currentValue = startValue;

  for await (const action of (0, _operators.merge)([incrementIterator, decrementIterator])) {
    currentValue += action;
    yield currentValue;
  }
}

async function main() {
  var $plus = document.getElementById("increment");
  var $minus = document.getElementById("decrement");
  var $label = document.getElementById("value");

  for await (const currentValue of data(increments((0, _operators.fromEvent)($plus, "click")), decrements((0, _operators.fromEvent)($minus, "click")), 0)) {
    console.log(currentValue);
    $label.setAttribute("value", "Count: " + currentValue);
  }
}

main();
},{"@ui5/webcomponents/dist/Button":"../node_modules/@ui5/webcomponents/dist/Button.js","@ui5/webcomponents/dist/Input":"../node_modules/@ui5/webcomponents/dist/Input.js","./utils/operators.js":"utils/operators.js"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","flow.js"], null)
//# sourceMappingURL=/flow.88eccc56.js.map