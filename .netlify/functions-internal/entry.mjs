import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { h, Component } from 'preact';
import render from 'preact-render-to-string';
import { escape } from 'html-escaper';
import etag from 'etag';
import { lookup } from 'mrmime';
import sharp$1 from 'sharp';
import fs from 'node:fs/promises';
import * as prismic from '@prismicio/client';
/* empty css                           */import { dim, bold, red, yellow, cyan, green, bgGreen, black } from 'kleur/colors';
import path, { extname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import fs$1 from 'node:fs';
import glob from 'tiny-glob';
import slash from 'slash';
import sizeOf from 'image-size';
import * as $$module1$4 from '@prismicio/helpers';
/* empty css                                        *//* empty css                             *//* empty css                          */import 'mime';
import 'string-width';
import 'path-browserify';
import { compile } from 'path-to-regexp';

/**
 * Astro passes `children` as a string of HTML, so we need
 * a wrapper `div` to render that content as VNodes.
 *
 * As a bonus, we can signal to Preact that this subtree is
 * entirely static and will never change via `shouldComponentUpdate`.
 */
const StaticHtml = ({ value, name }) => {
	if (!value) return null;
	return h('astro-slot', { name, dangerouslySetInnerHTML: { __html: value } });
};

/**
 * This tells Preact to opt-out of re-rendering this subtree,
 * In addition to being a performance optimization,
 * this also allows other frameworks to attach to `children`.
 *
 * See https://preactjs.com/guide/v8/external-dom-mutations
 */
StaticHtml.shouldComponentUpdate = () => false;

const slotName$1 = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());

let originalConsoleError$1;
let consoleFilterRefs$1 = 0;

function check$1(Component$1, props, children) {
	if (typeof Component$1 !== 'function') return false;

	if (Component$1.prototype != null && typeof Component$1.prototype.render === 'function') {
		return Component.isPrototypeOf(Component$1);
	}

	useConsoleFilter$1();

	try {
		try {
			const { html } = renderToStaticMarkup$1(Component$1, props, children);
			if (typeof html !== 'string') {
				return false;
			}

			// There are edge cases (SolidJS) where Preact *might* render a string,
			// but components would be <undefined></undefined>

			return !/\<undefined\>/.test(html);
		} catch (err) {
			return false;
		}
	} finally {
		finishUsingConsoleFilter$1();
	}
}

function renderToStaticMarkup$1(Component, props, { default: children, ...slotted }) {
	const slots = {};
	for (const [key, value] of Object.entries(slotted)) {
		const name = slotName$1(key);
		slots[name] = h(StaticHtml, { value, name });
	}
	// Note: create newProps to avoid mutating `props` before they are serialized
	const newProps = { ...props, ...slots };
	const html = render(
		h(Component, newProps, children != null ? h(StaticHtml, { value: children }) : children)
	);
	return { html };
}

/**
 * Reduces console noise by filtering known non-problematic errors.
 *
 * Performs reference counting to allow parallel usage from async code.
 *
 * To stop filtering, please ensure that there always is a matching call
 * to `finishUsingConsoleFilter` afterwards.
 */
function useConsoleFilter$1() {
	consoleFilterRefs$1++;

	if (!originalConsoleError$1) {
		// eslint-disable-next-line no-console
		originalConsoleError$1 = console.error;

		try {
			// eslint-disable-next-line no-console
			console.error = filteredConsoleError$1;
		} catch (error) {
			// If we're unable to hook `console.error`, just accept it
		}
	}
}

/**
 * Indicates that the filter installed by `useConsoleFilter`
 * is no longer needed by the calling code.
 */
function finishUsingConsoleFilter$1() {
	consoleFilterRefs$1--;

	// Note: Instead of reverting `console.error` back to the original
	// when the reference counter reaches 0, we leave our hook installed
	// to prevent potential race conditions once `check` is made async
}

/**
 * Hook/wrapper function for the global `console.error` function.
 *
 * Ignores known non-problematic errors while any code is using the console filter.
 * Otherwise, simply forwards all arguments to the original function.
 */
function filteredConsoleError$1(msg, ...rest) {
	if (consoleFilterRefs$1 > 0 && typeof msg === 'string') {
		// In `check`, we attempt to render JSX components through Preact.
		// When attempting this on a React component, React may output
		// the following error, which we can safely filter out:
		const isKnownReactHookError =
			msg.includes('Warning: Invalid hook call.') &&
			msg.includes('https://reactjs.org/link/invalid-hook-call');
		if (isKnownReactHookError) return;
	}
	originalConsoleError$1(msg, ...rest);
}

const _renderer1 = {
	check: check$1,
	renderToStaticMarkup: renderToStaticMarkup$1,
};

const ASTRO_VERSION = "1.0.7";
function createDeprecatedFetchContentFn() {
  return () => {
    throw new Error("Deprecated: Astro.fetchContent() has been replaced with Astro.glob().");
  };
}
function createAstroGlobFn() {
  const globHandler = (importMetaGlobResult, globValue) => {
    let allEntries = [...Object.values(importMetaGlobResult)];
    if (allEntries.length === 0) {
      throw new Error(`Astro.glob(${JSON.stringify(globValue())}) - no matches found.`);
    }
    return Promise.all(allEntries.map((fn) => fn()));
  };
  return globHandler;
}
function createAstro(filePathname, _site, projectRootStr) {
  const site = _site ? new URL(_site) : void 0;
  const referenceURL = new URL(filePathname, `http://localhost`);
  const projectRoot = new URL(projectRootStr);
  return {
    site,
    generator: `Astro v${ASTRO_VERSION}`,
    fetchContent: createDeprecatedFetchContentFn(),
    glob: createAstroGlobFn(),
    resolve(...segments) {
      let resolved = segments.reduce((u, segment) => new URL(segment, u), referenceURL).pathname;
      if (resolved.startsWith(projectRoot.pathname)) {
        resolved = "/" + resolved.slice(projectRoot.pathname.length);
      }
      return resolved;
    }
  };
}

const escapeHTML = escape;
class HTMLString extends String {
}
const markHTMLString = (value) => {
  if (value instanceof HTMLString) {
    return value;
  }
  if (typeof value === "string") {
    return new HTMLString(value);
  }
  return value;
};

class Metadata {
  constructor(filePathname, opts) {
    this.modules = opts.modules;
    this.hoisted = opts.hoisted;
    this.hydratedComponents = opts.hydratedComponents;
    this.clientOnlyComponents = opts.clientOnlyComponents;
    this.hydrationDirectives = opts.hydrationDirectives;
    this.mockURL = new URL(filePathname, "http://example.com");
    this.metadataCache = /* @__PURE__ */ new Map();
  }
  resolvePath(specifier) {
    if (specifier.startsWith(".")) {
      const resolved = new URL(specifier, this.mockURL).pathname;
      if (resolved.startsWith("/@fs") && resolved.endsWith(".jsx")) {
        return resolved.slice(0, resolved.length - 4);
      }
      return resolved;
    }
    return specifier;
  }
  getPath(Component) {
    const metadata = this.getComponentMetadata(Component);
    return (metadata == null ? void 0 : metadata.componentUrl) || null;
  }
  getExport(Component) {
    const metadata = this.getComponentMetadata(Component);
    return (metadata == null ? void 0 : metadata.componentExport) || null;
  }
  getComponentMetadata(Component) {
    if (this.metadataCache.has(Component)) {
      return this.metadataCache.get(Component);
    }
    const metadata = this.findComponentMetadata(Component);
    this.metadataCache.set(Component, metadata);
    return metadata;
  }
  findComponentMetadata(Component) {
    const isCustomElement = typeof Component === "string";
    for (const { module, specifier } of this.modules) {
      const id = this.resolvePath(specifier);
      for (const [key, value] of Object.entries(module)) {
        if (isCustomElement) {
          if (key === "tagName" && Component === value) {
            return {
              componentExport: key,
              componentUrl: id
            };
          }
        } else if (Component === value) {
          return {
            componentExport: key,
            componentUrl: id
          };
        }
      }
    }
    return null;
  }
}
function createMetadata(filePathname, options) {
  return new Metadata(filePathname, options);
}

const PROP_TYPE = {
  Value: 0,
  JSON: 1,
  RegExp: 2,
  Date: 3,
  Map: 4,
  Set: 5,
  BigInt: 6,
  URL: 7
};
function serializeArray(value) {
  return value.map((v) => convertToSerializedForm(v));
}
function serializeObject(value) {
  return Object.fromEntries(
    Object.entries(value).map(([k, v]) => {
      return [k, convertToSerializedForm(v)];
    })
  );
}
function convertToSerializedForm(value) {
  const tag = Object.prototype.toString.call(value);
  switch (tag) {
    case "[object Date]": {
      return [PROP_TYPE.Date, value.toISOString()];
    }
    case "[object RegExp]": {
      return [PROP_TYPE.RegExp, value.source];
    }
    case "[object Map]": {
      return [PROP_TYPE.Map, JSON.stringify(serializeArray(Array.from(value)))];
    }
    case "[object Set]": {
      return [PROP_TYPE.Set, JSON.stringify(serializeArray(Array.from(value)))];
    }
    case "[object BigInt]": {
      return [PROP_TYPE.BigInt, value.toString()];
    }
    case "[object URL]": {
      return [PROP_TYPE.URL, value.toString()];
    }
    case "[object Array]": {
      return [PROP_TYPE.JSON, JSON.stringify(serializeArray(value))];
    }
    default: {
      if (value !== null && typeof value === "object") {
        return [PROP_TYPE.Value, serializeObject(value)];
      } else {
        return [PROP_TYPE.Value, value];
      }
    }
  }
}
function serializeProps(props) {
  return JSON.stringify(serializeObject(props));
}

function serializeListValue(value) {
  const hash = {};
  push(value);
  return Object.keys(hash).join(" ");
  function push(item) {
    if (item && typeof item.forEach === "function")
      item.forEach(push);
    else if (item === Object(item))
      Object.keys(item).forEach((name) => {
        if (item[name])
          push(name);
      });
    else {
      item = item === false || item == null ? "" : String(item).trim();
      if (item) {
        item.split(/\s+/).forEach((name) => {
          hash[name] = true;
        });
      }
    }
  }
}

const HydrationDirectivesRaw = ["load", "idle", "media", "visible", "only"];
const HydrationDirectives = new Set(HydrationDirectivesRaw);
const HydrationDirectiveProps = new Set(HydrationDirectivesRaw.map((n) => `client:${n}`));
function extractDirectives(inputProps) {
  let extracted = {
    isPage: false,
    hydration: null,
    props: {}
  };
  for (const [key, value] of Object.entries(inputProps)) {
    if (key.startsWith("server:")) {
      if (key === "server:root") {
        extracted.isPage = true;
      }
    }
    if (key.startsWith("client:")) {
      if (!extracted.hydration) {
        extracted.hydration = {
          directive: "",
          value: "",
          componentUrl: "",
          componentExport: { value: "" }
        };
      }
      switch (key) {
        case "client:component-path": {
          extracted.hydration.componentUrl = value;
          break;
        }
        case "client:component-export": {
          extracted.hydration.componentExport.value = value;
          break;
        }
        case "client:component-hydration": {
          break;
        }
        case "client:display-name": {
          break;
        }
        default: {
          extracted.hydration.directive = key.split(":")[1];
          extracted.hydration.value = value;
          if (!HydrationDirectives.has(extracted.hydration.directive)) {
            throw new Error(
              `Error: invalid hydration directive "${key}". Supported hydration methods: ${Array.from(
                HydrationDirectiveProps
              ).join(", ")}`
            );
          }
          if (extracted.hydration.directive === "media" && typeof extracted.hydration.value !== "string") {
            throw new Error(
              'Error: Media query must be provided for "client:media", similar to client:media="(max-width: 600px)"'
            );
          }
          break;
        }
      }
    } else if (key === "class:list") {
      extracted.props[key.slice(0, -5)] = serializeListValue(value);
    } else {
      extracted.props[key] = value;
    }
  }
  return extracted;
}
async function generateHydrateScript(scriptOptions, metadata) {
  const { renderer, result, astroId, props, attrs } = scriptOptions;
  const { hydrate, componentUrl, componentExport } = metadata;
  if (!componentExport.value) {
    throw new Error(
      `Unable to resolve a valid export for "${metadata.displayName}"! Please open an issue at https://astro.build/issues!`
    );
  }
  const island = {
    children: "",
    props: {
      uid: astroId
    }
  };
  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      island.props[key] = value;
    }
  }
  island.props["component-url"] = await result.resolve(componentUrl);
  if (renderer.clientEntrypoint) {
    island.props["component-export"] = componentExport.value;
    island.props["renderer-url"] = await result.resolve(renderer.clientEntrypoint);
    island.props["props"] = escapeHTML(serializeProps(props));
  }
  island.props["ssr"] = "";
  island.props["client"] = hydrate;
  island.props["before-hydration-url"] = await result.resolve("astro:scripts/before-hydration.js");
  island.props["opts"] = escapeHTML(
    JSON.stringify({
      name: metadata.displayName,
      value: metadata.hydrateArgs || ""
    })
  );
  return island;
}

var idle_prebuilt_default = `(self.Astro=self.Astro||{}).idle=t=>{const e=async()=>{await(await t())()};"requestIdleCallback"in window?window.requestIdleCallback(e):setTimeout(e,200)},window.dispatchEvent(new Event("astro:idle"));`;

var load_prebuilt_default = `(self.Astro=self.Astro||{}).load=a=>{(async()=>await(await a())())()},window.dispatchEvent(new Event("astro:load"));`;

var media_prebuilt_default = `(self.Astro=self.Astro||{}).media=(s,a)=>{const t=async()=>{await(await s())()};if(a.value){const e=matchMedia(a.value);e.matches?t():e.addEventListener("change",t,{once:!0})}},window.dispatchEvent(new Event("astro:media"));`;

var only_prebuilt_default = `(self.Astro=self.Astro||{}).only=t=>{(async()=>await(await t())())()},window.dispatchEvent(new Event("astro:only"));`;

var visible_prebuilt_default = `(self.Astro=self.Astro||{}).visible=(s,c,n)=>{const r=async()=>{await(await s())()};let i=new IntersectionObserver(e=>{for(const t of e)if(!!t.isIntersecting){i.disconnect(),r();break}});for(let e=0;e<n.children.length;e++){const t=n.children[e];i.observe(t)}},window.dispatchEvent(new Event("astro:visible"));`;

var astro_island_prebuilt_default = `var d;{const l={0:t=>t,1:t=>JSON.parse(t,n),2:t=>new RegExp(t),3:t=>new Date(t),4:t=>new Map(JSON.parse(t,n)),5:t=>new Set(JSON.parse(t,n)),6:t=>BigInt(t),7:t=>new URL(t)},n=(t,r)=>{if(t===""||!Array.isArray(r))return r;const[e,i]=r;return e in l?l[e](i):void 0};customElements.get("astro-island")||customElements.define("astro-island",(d=class extends HTMLElement{constructor(){super(...arguments);this.hydrate=()=>{if(!this.hydrator||this.parentElement?.closest("astro-island[ssr]"))return;const r=this.querySelectorAll("astro-slot"),e={},i=this.querySelectorAll("template[data-astro-template]");for(const s of i)!s.closest(this.tagName)?.isSameNode(this)||(e[s.getAttribute("data-astro-template")||"default"]=s.innerHTML,s.remove());for(const s of r)!s.closest(this.tagName)?.isSameNode(this)||(e[s.getAttribute("name")||"default"]=s.innerHTML);const o=this.hasAttribute("props")?JSON.parse(this.getAttribute("props"),n):{};this.hydrator(this)(this.Component,o,e,{client:this.getAttribute("client")}),this.removeAttribute("ssr"),window.removeEventListener("astro:hydrate",this.hydrate),window.dispatchEvent(new CustomEvent("astro:hydrate"))}}connectedCallback(){!this.hasAttribute("await-children")||this.firstChild?this.childrenConnectedCallback():new MutationObserver((r,e)=>{e.disconnect(),this.childrenConnectedCallback()}).observe(this,{childList:!0})}async childrenConnectedCallback(){window.addEventListener("astro:hydrate",this.hydrate),await import(this.getAttribute("before-hydration-url")),this.start()}start(){const r=JSON.parse(this.getAttribute("opts")),e=this.getAttribute("client");if(Astro[e]===void 0){window.addEventListener(\`astro:\${e}\`,()=>this.start(),{once:!0});return}Astro[e](async()=>{const i=this.getAttribute("renderer-url"),[o,{default:s}]=await Promise.all([import(this.getAttribute("component-url")),i?import(i):()=>()=>{}]),a=this.getAttribute("component-export")||"default";if(!a.includes("."))this.Component=o[a];else{this.Component=o;for(const c of a.split("."))this.Component=this.Component[c]}return this.hydrator=s,this.hydrate},r,this)}attributeChangedCallback(){this.hydrator&&this.hydrate()}},d.observedAttributes=["props"],d))}`;

function determineIfNeedsHydrationScript(result) {
  if (result._metadata.hasHydrationScript) {
    return false;
  }
  return result._metadata.hasHydrationScript = true;
}
const hydrationScripts = {
  idle: idle_prebuilt_default,
  load: load_prebuilt_default,
  only: only_prebuilt_default,
  media: media_prebuilt_default,
  visible: visible_prebuilt_default
};
function determinesIfNeedsDirectiveScript(result, directive) {
  if (result._metadata.hasDirectives.has(directive)) {
    return false;
  }
  result._metadata.hasDirectives.add(directive);
  return true;
}
function getDirectiveScriptText(directive) {
  if (!(directive in hydrationScripts)) {
    throw new Error(`Unknown directive: ${directive}`);
  }
  const directiveScriptText = hydrationScripts[directive];
  return directiveScriptText;
}
function getPrescripts(type, directive) {
  switch (type) {
    case "both":
      return `<style>astro-island,astro-slot{display:contents}</style><script>${getDirectiveScriptText(directive) + astro_island_prebuilt_default}<\/script>`;
    case "directive":
      return `<script>${getDirectiveScriptText(directive)}<\/script>`;
  }
  return "";
}

const Fragment = Symbol.for("astro:fragment");
const Renderer = Symbol.for("astro:renderer");
function stringifyChunk(result, chunk) {
  switch (chunk.type) {
    case "directive": {
      const { hydration } = chunk;
      let needsHydrationScript = hydration && determineIfNeedsHydrationScript(result);
      let needsDirectiveScript = hydration && determinesIfNeedsDirectiveScript(result, hydration.directive);
      let prescriptType = needsHydrationScript ? "both" : needsDirectiveScript ? "directive" : null;
      if (prescriptType) {
        let prescripts = getPrescripts(prescriptType, hydration.directive);
        return markHTMLString(prescripts);
      } else {
        return "";
      }
    }
    default: {
      return chunk.toString();
    }
  }
}

function validateComponentProps(props, displayName) {
  var _a;
  if (((_a = {"BASE_URL":"/","MODE":"production","DEV":false,"PROD":true}) == null ? void 0 : _a.DEV) && props != null) {
    for (const prop of Object.keys(props)) {
      if (HydrationDirectiveProps.has(prop)) {
        console.warn(
          `You are attempting to render <${displayName} ${prop} />, but ${displayName} is an Astro component. Astro components do not render in the client and should not have a hydration directive. Please use a framework component for client rendering.`
        );
      }
    }
  }
}
class AstroComponent {
  constructor(htmlParts, expressions) {
    this.htmlParts = htmlParts;
    this.expressions = expressions;
  }
  get [Symbol.toStringTag]() {
    return "AstroComponent";
  }
  async *[Symbol.asyncIterator]() {
    const { htmlParts, expressions } = this;
    for (let i = 0; i < htmlParts.length; i++) {
      const html = htmlParts[i];
      const expression = expressions[i];
      yield markHTMLString(html);
      yield* renderChild(expression);
    }
  }
}
function isAstroComponent(obj) {
  return typeof obj === "object" && Object.prototype.toString.call(obj) === "[object AstroComponent]";
}
function isAstroComponentFactory(obj) {
  return obj == null ? false : !!obj.isAstroComponentFactory;
}
async function* renderAstroComponent(component) {
  for await (const value of component) {
    if (value || value === 0) {
      for await (const chunk of renderChild(value)) {
        switch (chunk.type) {
          case "directive": {
            yield chunk;
            break;
          }
          default: {
            yield markHTMLString(chunk);
            break;
          }
        }
      }
    }
  }
}
async function renderToString(result, componentFactory, props, children) {
  const Component = await componentFactory(result, props, children);
  if (!isAstroComponent(Component)) {
    const response = Component;
    throw response;
  }
  let html = "";
  for await (const chunk of renderAstroComponent(Component)) {
    html += stringifyChunk(result, chunk);
  }
  return html;
}
async function renderToIterable(result, componentFactory, displayName, props, children) {
  validateComponentProps(props, displayName);
  const Component = await componentFactory(result, props, children);
  if (!isAstroComponent(Component)) {
    console.warn(
      `Returning a Response is only supported inside of page components. Consider refactoring this logic into something like a function that can be used in the page.`
    );
    const response = Component;
    throw response;
  }
  return renderAstroComponent(Component);
}
async function renderTemplate(htmlParts, ...expressions) {
  return new AstroComponent(htmlParts, expressions);
}

async function* renderChild(child) {
  child = await child;
  if (child instanceof HTMLString) {
    yield child;
  } else if (Array.isArray(child)) {
    for (const value of child) {
      yield markHTMLString(await renderChild(value));
    }
  } else if (typeof child === "function") {
    yield* renderChild(child());
  } else if (typeof child === "string") {
    yield markHTMLString(escapeHTML(child));
  } else if (!child && child !== 0) ; else if (child instanceof AstroComponent || Object.prototype.toString.call(child) === "[object AstroComponent]") {
    yield* renderAstroComponent(child);
  } else if (typeof child === "object" && Symbol.asyncIterator in child) {
    yield* child;
  } else {
    yield child;
  }
}
async function renderSlot(result, slotted, fallback) {
  if (slotted) {
    let iterator = renderChild(slotted);
    let content = "";
    for await (const chunk of iterator) {
      if (chunk.type === "directive") {
        content += stringifyChunk(result, chunk);
      } else {
        content += chunk;
      }
    }
    return markHTMLString(content);
  }
  return fallback;
}

/**
 * shortdash - https://github.com/bibig/node-shorthash
 *
 * @license
 *
 * (The MIT License)
 *
 * Copyright (c) 2013 Bibig <bibig@me.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
const dictionary$1 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY";
const binary$1 = dictionary$1.length;
function bitwise$1(str) {
  let hash = 0;
  if (str.length === 0)
    return hash;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    hash = (hash << 5) - hash + ch;
    hash = hash & hash;
  }
  return hash;
}
function shorthash$1(text) {
  let num;
  let result = "";
  let integer = bitwise$1(text);
  const sign = integer < 0 ? "Z" : "";
  integer = Math.abs(integer);
  while (integer >= binary$1) {
    num = integer % binary$1;
    integer = Math.floor(integer / binary$1);
    result = dictionary$1[num] + result;
  }
  if (integer > 0) {
    result = dictionary$1[integer] + result;
  }
  return sign + result;
}

const voidElementNames = /^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i;
const htmlBooleanAttributes = /^(allowfullscreen|async|autofocus|autoplay|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|hidden|loop|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|itemscope)$/i;
const htmlEnumAttributes = /^(contenteditable|draggable|spellcheck|value)$/i;
const svgEnumAttributes = /^(autoReverse|externalResourcesRequired|focusable|preserveAlpha)$/i;
const STATIC_DIRECTIVES = /* @__PURE__ */ new Set(["set:html", "set:text"]);
const toIdent = (k) => k.trim().replace(/(?:(?<!^)\b\w|\s+|[^\w]+)/g, (match, index) => {
  if (/[^\w]|\s/.test(match))
    return "";
  return index === 0 ? match : match.toUpperCase();
});
const toAttributeString = (value, shouldEscape = true) => shouldEscape ? String(value).replace(/&/g, "&#38;").replace(/"/g, "&#34;") : value;
const kebab = (k) => k.toLowerCase() === k ? k : k.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
const toStyleString = (obj) => Object.entries(obj).map(([k, v]) => `${kebab(k)}:${v}`).join(";");
function defineScriptVars(vars) {
  let output = "";
  for (const [key, value] of Object.entries(vars)) {
    output += `let ${toIdent(key)} = ${JSON.stringify(value)};
`;
  }
  return markHTMLString(output);
}
function formatList(values) {
  if (values.length === 1) {
    return values[0];
  }
  return `${values.slice(0, -1).join(", ")} or ${values[values.length - 1]}`;
}
function addAttribute(value, key, shouldEscape = true) {
  if (value == null) {
    return "";
  }
  if (value === false) {
    if (htmlEnumAttributes.test(key) || svgEnumAttributes.test(key)) {
      return markHTMLString(` ${key}="false"`);
    }
    return "";
  }
  if (STATIC_DIRECTIVES.has(key)) {
    console.warn(`[astro] The "${key}" directive cannot be applied dynamically at runtime. It will not be rendered as an attribute.

Make sure to use the static attribute syntax (\`${key}={value}\`) instead of the dynamic spread syntax (\`{...{ "${key}": value }}\`).`);
    return "";
  }
  if (key === "class:list") {
    const listValue = toAttributeString(serializeListValue(value));
    if (listValue === "") {
      return "";
    }
    return markHTMLString(` ${key.slice(0, -5)}="${listValue}"`);
  }
  if (key === "style" && !(value instanceof HTMLString) && typeof value === "object") {
    return markHTMLString(` ${key}="${toStyleString(value)}"`);
  }
  if (key === "className") {
    return markHTMLString(` class="${toAttributeString(value, shouldEscape)}"`);
  }
  if (value === true && (key.startsWith("data-") || htmlBooleanAttributes.test(key))) {
    return markHTMLString(` ${key}`);
  } else {
    return markHTMLString(` ${key}="${toAttributeString(value, shouldEscape)}"`);
  }
}
function internalSpreadAttributes(values, shouldEscape = true) {
  let output = "";
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, shouldEscape);
  }
  return markHTMLString(output);
}
function renderElement$1(name, { props: _props, children = "" }, shouldEscape = true) {
  const { lang: _, "data-astro-id": astroId, "define:vars": defineVars, ...props } = _props;
  if (defineVars) {
    if (name === "style") {
      delete props["is:global"];
      delete props["is:scoped"];
    }
    if (name === "script") {
      delete props.hoist;
      children = defineScriptVars(defineVars) + "\n" + children;
    }
  }
  if ((children == null || children == "") && voidElementNames.test(name)) {
    return `<${name}${internalSpreadAttributes(props, shouldEscape)} />`;
  }
  return `<${name}${internalSpreadAttributes(props, shouldEscape)}>${children}</${name}>`;
}

function componentIsHTMLElement(Component) {
  return typeof HTMLElement !== "undefined" && HTMLElement.isPrototypeOf(Component);
}
async function renderHTMLElement(result, constructor, props, slots) {
  const name = getHTMLElementName(constructor);
  let attrHTML = "";
  for (const attr in props) {
    attrHTML += ` ${attr}="${toAttributeString(await props[attr])}"`;
  }
  return markHTMLString(
    `<${name}${attrHTML}>${await renderSlot(result, slots == null ? void 0 : slots.default)}</${name}>`
  );
}
function getHTMLElementName(constructor) {
  const definedName = customElements.getName(constructor);
  if (definedName)
    return definedName;
  const assignedName = constructor.name.replace(/^HTML|Element$/g, "").replace(/[A-Z]/g, "-$&").toLowerCase().replace(/^-/, "html-");
  return assignedName;
}

const rendererAliases = /* @__PURE__ */ new Map([["solid", "solid-js"]]);
function guessRenderers(componentUrl) {
  const extname = componentUrl == null ? void 0 : componentUrl.split(".").pop();
  switch (extname) {
    case "svelte":
      return ["@astrojs/svelte"];
    case "vue":
      return ["@astrojs/vue"];
    case "jsx":
    case "tsx":
      return ["@astrojs/react", "@astrojs/preact"];
    default:
      return ["@astrojs/react", "@astrojs/preact", "@astrojs/vue", "@astrojs/svelte"];
  }
}
function getComponentType(Component) {
  if (Component === Fragment) {
    return "fragment";
  }
  if (Component && typeof Component === "object" && Component["astro:html"]) {
    return "html";
  }
  if (isAstroComponentFactory(Component)) {
    return "astro-factory";
  }
  return "unknown";
}
async function renderComponent(result, displayName, Component, _props, slots = {}) {
  var _a;
  Component = await Component;
  switch (getComponentType(Component)) {
    case "fragment": {
      const children2 = await renderSlot(result, slots == null ? void 0 : slots.default);
      if (children2 == null) {
        return children2;
      }
      return markHTMLString(children2);
    }
    case "html": {
      const children2 = {};
      if (slots) {
        await Promise.all(
          Object.entries(slots).map(
            ([key, value]) => renderSlot(result, value).then((output) => {
              children2[key] = output;
            })
          )
        );
      }
      const html2 = Component.render({ slots: children2 });
      return markHTMLString(html2);
    }
    case "astro-factory": {
      async function* renderAstroComponentInline() {
        let iterable = await renderToIterable(result, Component, displayName, _props, slots);
        yield* iterable;
      }
      return renderAstroComponentInline();
    }
  }
  if (!Component && !_props["client:only"]) {
    throw new Error(
      `Unable to render ${displayName} because it is ${Component}!
Did you forget to import the component or is it possible there is a typo?`
    );
  }
  const { renderers } = result._metadata;
  const metadata = { displayName };
  const { hydration, isPage, props } = extractDirectives(_props);
  let html = "";
  let attrs = void 0;
  if (hydration) {
    metadata.hydrate = hydration.directive;
    metadata.hydrateArgs = hydration.value;
    metadata.componentExport = hydration.componentExport;
    metadata.componentUrl = hydration.componentUrl;
  }
  const probableRendererNames = guessRenderers(metadata.componentUrl);
  if (Array.isArray(renderers) && renderers.length === 0 && typeof Component !== "string" && !componentIsHTMLElement(Component)) {
    const message = `Unable to render ${metadata.displayName}!

There are no \`integrations\` set in your \`astro.config.mjs\` file.
Did you mean to add ${formatList(probableRendererNames.map((r) => "`" + r + "`"))}?`;
    throw new Error(message);
  }
  const children = {};
  if (slots) {
    await Promise.all(
      Object.entries(slots).map(
        ([key, value]) => renderSlot(result, value).then((output) => {
          children[key] = output;
        })
      )
    );
  }
  let renderer;
  if (metadata.hydrate !== "only") {
    if (Component && Component[Renderer]) {
      const rendererName = Component[Renderer];
      renderer = renderers.find(({ name }) => name === rendererName);
    }
    if (!renderer) {
      let error;
      for (const r of renderers) {
        try {
          if (await r.ssr.check.call({ result }, Component, props, children)) {
            renderer = r;
            break;
          }
        } catch (e) {
          error ?? (error = e);
        }
      }
      if (!renderer && error) {
        throw error;
      }
    }
    if (!renderer && typeof HTMLElement === "function" && componentIsHTMLElement(Component)) {
      const output = renderHTMLElement(result, Component, _props, slots);
      return output;
    }
  } else {
    if (metadata.hydrateArgs) {
      const passedName = metadata.hydrateArgs;
      const rendererName = rendererAliases.has(passedName) ? rendererAliases.get(passedName) : passedName;
      renderer = renderers.find(
        ({ name }) => name === `@astrojs/${rendererName}` || name === rendererName
      );
    }
    if (!renderer && renderers.length === 1) {
      renderer = renderers[0];
    }
    if (!renderer) {
      const extname = (_a = metadata.componentUrl) == null ? void 0 : _a.split(".").pop();
      renderer = renderers.filter(
        ({ name }) => name === `@astrojs/${extname}` || name === extname
      )[0];
    }
  }
  if (!renderer) {
    if (metadata.hydrate === "only") {
      throw new Error(`Unable to render ${metadata.displayName}!

Using the \`client:only\` hydration strategy, Astro needs a hint to use the correct renderer.
Did you mean to pass <${metadata.displayName} client:only="${probableRendererNames.map((r) => r.replace("@astrojs/", "")).join("|")}" />
`);
    } else if (typeof Component !== "string") {
      const matchingRenderers = renderers.filter((r) => probableRendererNames.includes(r.name));
      const plural = renderers.length > 1;
      if (matchingRenderers.length === 0) {
        throw new Error(`Unable to render ${metadata.displayName}!

There ${plural ? "are" : "is"} ${renderers.length} renderer${plural ? "s" : ""} configured in your \`astro.config.mjs\` file,
but ${plural ? "none were" : "it was not"} able to server-side render ${metadata.displayName}.

Did you mean to enable ${formatList(probableRendererNames.map((r) => "`" + r + "`"))}?`);
      } else if (matchingRenderers.length === 1) {
        renderer = matchingRenderers[0];
        ({ html, attrs } = await renderer.ssr.renderToStaticMarkup.call(
          { result },
          Component,
          props,
          children,
          metadata
        ));
      } else {
        throw new Error(`Unable to render ${metadata.displayName}!

This component likely uses ${formatList(probableRendererNames)},
but Astro encountered an error during server-side rendering.

Please ensure that ${metadata.displayName}:
1. Does not unconditionally access browser-specific globals like \`window\` or \`document\`.
   If this is unavoidable, use the \`client:only\` hydration directive.
2. Does not conditionally return \`null\` or \`undefined\` when rendered on the server.

If you're still stuck, please open an issue on GitHub or join us at https://astro.build/chat.`);
      }
    }
  } else {
    if (metadata.hydrate === "only") {
      html = await renderSlot(result, slots == null ? void 0 : slots.fallback);
    } else {
      ({ html, attrs } = await renderer.ssr.renderToStaticMarkup.call(
        { result },
        Component,
        props,
        children,
        metadata
      ));
    }
  }
  if (renderer && !renderer.clientEntrypoint && renderer.name !== "@astrojs/lit" && metadata.hydrate) {
    throw new Error(
      `${metadata.displayName} component has a \`client:${metadata.hydrate}\` directive, but no client entrypoint was provided by ${renderer.name}!`
    );
  }
  if (!html && typeof Component === "string") {
    const childSlots = Object.values(children).join("");
    const iterable = renderAstroComponent(
      await renderTemplate`<${Component}${internalSpreadAttributes(props)}${markHTMLString(
        childSlots === "" && voidElementNames.test(Component) ? `/>` : `>${childSlots}</${Component}>`
      )}`
    );
    html = "";
    for await (const chunk of iterable) {
      html += chunk;
    }
  }
  if (!hydration) {
    if (isPage || (renderer == null ? void 0 : renderer.name) === "astro:jsx") {
      return html;
    }
    return markHTMLString(html.replace(/\<\/?astro-slot\>/g, ""));
  }
  const astroId = shorthash$1(
    `<!--${metadata.componentExport.value}:${metadata.componentUrl}-->
${html}
${serializeProps(
      props
    )}`
  );
  const island = await generateHydrateScript(
    { renderer, result, astroId, props, attrs },
    metadata
  );
  let unrenderedSlots = [];
  if (html) {
    if (Object.keys(children).length > 0) {
      for (const key of Object.keys(children)) {
        if (!html.includes(key === "default" ? `<astro-slot>` : `<astro-slot name="${key}">`)) {
          unrenderedSlots.push(key);
        }
      }
    }
  } else {
    unrenderedSlots = Object.keys(children);
  }
  const template = unrenderedSlots.length > 0 ? unrenderedSlots.map(
    (key) => `<template data-astro-template${key !== "default" ? `="${key}"` : ""}>${children[key]}</template>`
  ).join("") : "";
  island.children = `${html ?? ""}${template}`;
  if (island.children) {
    island.props["await-children"] = "";
  }
  async function* renderAll() {
    yield { type: "directive", hydration, result };
    yield markHTMLString(renderElement$1("astro-island", island, false));
  }
  return renderAll();
}

const uniqueElements = (item, index, all) => {
  const props = JSON.stringify(item.props);
  const children = item.children;
  return index === all.findIndex((i) => JSON.stringify(i.props) === props && i.children == children);
};
const alreadyHeadRenderedResults = /* @__PURE__ */ new WeakSet();
function renderHead(result) {
  alreadyHeadRenderedResults.add(result);
  const styles = Array.from(result.styles).filter(uniqueElements).map((style) => renderElement$1("style", style));
  result.styles.clear();
  const scripts = Array.from(result.scripts).filter(uniqueElements).map((script, i) => {
    return renderElement$1("script", script, false);
  });
  const links = Array.from(result.links).filter(uniqueElements).map((link) => renderElement$1("link", link, false));
  return markHTMLString(links.join("\n") + styles.join("\n") + scripts.join("\n"));
}
async function* maybeRenderHead(result) {
  if (alreadyHeadRenderedResults.has(result)) {
    return;
  }
  yield renderHead(result);
}

typeof process === "object" && Object.prototype.toString.call(process) === "[object process]";

new TextEncoder();

function createComponent(cb) {
  cb.isAstroComponentFactory = true;
  return cb;
}
function spreadAttributes(values, _name, { class: scopedClassName } = {}) {
  let output = "";
  if (scopedClassName) {
    if (typeof values.class !== "undefined") {
      values.class += ` ${scopedClassName}`;
    } else if (typeof values["class:list"] !== "undefined") {
      values["class:list"] = [values["class:list"], scopedClassName];
    } else {
      values.class = scopedClassName;
    }
  }
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, true);
  }
  return markHTMLString(output);
}

const AstroJSX = "astro:jsx";
const Empty = Symbol("empty");
const toSlotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
function isVNode(vnode) {
  return vnode && typeof vnode === "object" && vnode[AstroJSX];
}
function transformSlots(vnode) {
  if (typeof vnode.type === "string")
    return vnode;
  const slots = {};
  if (isVNode(vnode.props.children)) {
    const child = vnode.props.children;
    if (!isVNode(child))
      return;
    if (!("slot" in child.props))
      return;
    const name = toSlotName(child.props.slot);
    slots[name] = [child];
    slots[name]["$$slot"] = true;
    delete child.props.slot;
    delete vnode.props.children;
  }
  if (Array.isArray(vnode.props.children)) {
    vnode.props.children = vnode.props.children.map((child) => {
      if (!isVNode(child))
        return child;
      if (!("slot" in child.props))
        return child;
      const name = toSlotName(child.props.slot);
      if (Array.isArray(slots[name])) {
        slots[name].push(child);
      } else {
        slots[name] = [child];
        slots[name]["$$slot"] = true;
      }
      delete child.props.slot;
      return Empty;
    }).filter((v) => v !== Empty);
  }
  Object.assign(vnode.props, slots);
}
function markRawChildren(child) {
  if (typeof child === "string")
    return markHTMLString(child);
  if (Array.isArray(child))
    return child.map((c) => markRawChildren(c));
  return child;
}
function transformSetDirectives(vnode) {
  if (!("set:html" in vnode.props || "set:text" in vnode.props))
    return;
  if ("set:html" in vnode.props) {
    const children = markRawChildren(vnode.props["set:html"]);
    delete vnode.props["set:html"];
    Object.assign(vnode.props, { children });
    return;
  }
  if ("set:text" in vnode.props) {
    const children = vnode.props["set:text"];
    delete vnode.props["set:text"];
    Object.assign(vnode.props, { children });
    return;
  }
}
function createVNode(type, props) {
  const vnode = {
    [AstroJSX]: true,
    type,
    props: props ?? {}
  };
  transformSetDirectives(vnode);
  transformSlots(vnode);
  return vnode;
}

const ClientOnlyPlaceholder = "astro-client-only";
const skipAstroJSXCheck = /* @__PURE__ */ new WeakSet();
let originalConsoleError;
let consoleFilterRefs = 0;
async function renderJSX(result, vnode) {
  switch (true) {
    case vnode instanceof HTMLString:
      if (vnode.toString().trim() === "") {
        return "";
      }
      return vnode;
    case typeof vnode === "string":
      return markHTMLString(escapeHTML(vnode));
    case (!vnode && vnode !== 0):
      return "";
    case Array.isArray(vnode):
      return markHTMLString(
        (await Promise.all(vnode.map((v) => renderJSX(result, v)))).join("")
      );
  }
  if (isVNode(vnode)) {
    switch (true) {
      case vnode.type === Symbol.for("astro:fragment"):
        return renderJSX(result, vnode.props.children);
      case vnode.type.isAstroComponentFactory: {
        let props = {};
        let slots = {};
        for (const [key, value] of Object.entries(vnode.props ?? {})) {
          if (key === "children" || value && typeof value === "object" && value["$$slot"]) {
            slots[key === "children" ? "default" : key] = () => renderJSX(result, value);
          } else {
            props[key] = value;
          }
        }
        return markHTMLString(await renderToString(result, vnode.type, props, slots));
      }
      case (!vnode.type && vnode.type !== 0):
        return "";
      case (typeof vnode.type === "string" && vnode.type !== ClientOnlyPlaceholder):
        return markHTMLString(await renderElement(result, vnode.type, vnode.props ?? {}));
    }
    if (vnode.type) {
      let extractSlots2 = function(child) {
        if (Array.isArray(child)) {
          return child.map((c) => extractSlots2(c));
        }
        if (!isVNode(child)) {
          _slots.default.push(child);
          return;
        }
        if ("slot" in child.props) {
          _slots[child.props.slot] = [..._slots[child.props.slot] ?? [], child];
          delete child.props.slot;
          return;
        }
        _slots.default.push(child);
      };
      if (typeof vnode.type === "function" && vnode.type["astro:renderer"]) {
        skipAstroJSXCheck.add(vnode.type);
      }
      if (typeof vnode.type === "function" && vnode.props["server:root"]) {
        const output2 = await vnode.type(vnode.props ?? {});
        return await renderJSX(result, output2);
      }
      if (typeof vnode.type === "function" && !skipAstroJSXCheck.has(vnode.type)) {
        useConsoleFilter();
        try {
          const output2 = await vnode.type(vnode.props ?? {});
          if (output2 && output2[AstroJSX]) {
            return await renderJSX(result, output2);
          } else if (!output2) {
            return await renderJSX(result, output2);
          }
        } catch (e) {
          skipAstroJSXCheck.add(vnode.type);
        } finally {
          finishUsingConsoleFilter();
        }
      }
      const { children = null, ...props } = vnode.props ?? {};
      const _slots = {
        default: []
      };
      extractSlots2(children);
      for (const [key, value] of Object.entries(props)) {
        if (value["$$slot"]) {
          _slots[key] = value;
          delete props[key];
        }
      }
      const slotPromises = [];
      const slots = {};
      for (const [key, value] of Object.entries(_slots)) {
        slotPromises.push(
          renderJSX(result, value).then((output2) => {
            if (output2.toString().trim().length === 0)
              return;
            slots[key] = () => output2;
          })
        );
      }
      await Promise.all(slotPromises);
      let output;
      if (vnode.type === ClientOnlyPlaceholder && vnode.props["client:only"]) {
        output = await renderComponent(
          result,
          vnode.props["client:display-name"] ?? "",
          null,
          props,
          slots
        );
      } else {
        output = await renderComponent(
          result,
          typeof vnode.type === "function" ? vnode.type.name : vnode.type,
          vnode.type,
          props,
          slots
        );
      }
      if (typeof output !== "string" && Symbol.asyncIterator in output) {
        let body = "";
        for await (const chunk of output) {
          let html = stringifyChunk(result, chunk);
          body += html;
        }
        return markHTMLString(body);
      } else {
        return markHTMLString(output);
      }
    }
  }
  return markHTMLString(`${vnode}`);
}
async function renderElement(result, tag, { children, ...props }) {
  return markHTMLString(
    `<${tag}${spreadAttributes(props)}${markHTMLString(
      (children == null || children == "") && voidElementNames.test(tag) ? `/>` : `>${children == null ? "" : await renderJSX(result, children)}</${tag}>`
    )}`
  );
}
function useConsoleFilter() {
  consoleFilterRefs++;
  if (!originalConsoleError) {
    originalConsoleError = console.error;
    try {
      console.error = filteredConsoleError;
    } catch (error) {
    }
  }
}
function finishUsingConsoleFilter() {
  consoleFilterRefs--;
}
function filteredConsoleError(msg, ...rest) {
  if (consoleFilterRefs > 0 && typeof msg === "string") {
    const isKnownReactHookError = msg.includes("Warning: Invalid hook call.") && msg.includes("https://reactjs.org/link/invalid-hook-call");
    if (isKnownReactHookError)
      return;
  }
}

const slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
async function check(Component, props, { default: children = null, ...slotted } = {}) {
  if (typeof Component !== "function")
    return false;
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  try {
    const result = await Component({ ...props, ...slots, children });
    return result[AstroJSX];
  } catch (e) {
  }
  return false;
}
async function renderToStaticMarkup(Component, props = {}, { default: children = null, ...slotted } = {}) {
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  const { result } = this;
  const html = await renderJSX(result, createVNode(Component, { ...props, ...slots, children }));
  return { html };
}
var server_default = {
  check,
  renderToStaticMarkup
};

function isOutputFormat(value) {
  return ["avif", "jpeg", "png", "webp"].includes(value);
}
function isAspectRatioString(value) {
  return /^\d*:\d*$/.test(value);
}
function isRemoteImage(src) {
  return /^http(s?):\/\//.test(src);
}
async function loadLocalImage(src) {
  try {
    return await fs.readFile(src);
  } catch {
    return void 0;
  }
}
async function loadRemoteImage(src) {
  try {
    const res = await fetch(src);
    if (!res.ok) {
      return void 0;
    }
    return Buffer.from(await res.arrayBuffer());
  } catch {
    return void 0;
  }
}
function parseAspectRatio(aspectRatio) {
  if (!aspectRatio) {
    return void 0;
  }
  if (typeof aspectRatio === "number") {
    return aspectRatio;
  } else {
    const [width, height] = aspectRatio.split(":");
    return parseInt(width) / parseInt(height);
  }
}

class SharpService {
  async getImageAttributes(transform) {
    const { width, height, src, format, quality, aspectRatio, ...rest } = transform;
    return {
      ...rest,
      width,
      height
    };
  }
  serializeTransform(transform) {
    const searchParams = new URLSearchParams();
    if (transform.quality) {
      searchParams.append("q", transform.quality.toString());
    }
    if (transform.format) {
      searchParams.append("f", transform.format);
    }
    if (transform.width) {
      searchParams.append("w", transform.width.toString());
    }
    if (transform.height) {
      searchParams.append("h", transform.height.toString());
    }
    if (transform.aspectRatio) {
      searchParams.append("ar", transform.aspectRatio.toString());
    }
    searchParams.append("href", transform.src);
    return { searchParams };
  }
  parseTransform(searchParams) {
    if (!searchParams.has("href")) {
      return void 0;
    }
    let transform = { src: searchParams.get("href") };
    if (searchParams.has("q")) {
      transform.quality = parseInt(searchParams.get("q"));
    }
    if (searchParams.has("f")) {
      const format = searchParams.get("f");
      if (isOutputFormat(format)) {
        transform.format = format;
      }
    }
    if (searchParams.has("w")) {
      transform.width = parseInt(searchParams.get("w"));
    }
    if (searchParams.has("h")) {
      transform.height = parseInt(searchParams.get("h"));
    }
    if (searchParams.has("ar")) {
      const ratio = searchParams.get("ar");
      if (isAspectRatioString(ratio)) {
        transform.aspectRatio = ratio;
      } else {
        transform.aspectRatio = parseFloat(ratio);
      }
    }
    return transform;
  }
  async transform(inputBuffer, transform) {
    const sharpImage = sharp$1(inputBuffer, { failOnError: false, pages: -1 });
    sharpImage.rotate();
    if (transform.width || transform.height) {
      const width = transform.width && Math.round(transform.width);
      const height = transform.height && Math.round(transform.height);
      sharpImage.resize(width, height);
    }
    if (transform.format) {
      sharpImage.toFormat(transform.format, { quality: transform.quality });
    }
    const { data, info } = await sharpImage.toBuffer({ resolveWithObject: true });
    return {
      data,
      format: info.format
    };
  }
}
const service = new SharpService();
var sharp_default = service;

const sharp = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: sharp_default
}, Symbol.toStringTag, { value: 'Module' }));

const get = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const transform = sharp_default.parseTransform(url.searchParams);
    if (!transform) {
      return new Response("Bad Request", { status: 400 });
    }
    let inputBuffer = void 0;
    if (isRemoteImage(transform.src)) {
      inputBuffer = await loadRemoteImage(transform.src);
    } else {
      const clientRoot = new URL("../client/", import.meta.url);
      const localPath = new URL("." + transform.src, clientRoot);
      inputBuffer = await loadLocalImage(localPath);
    }
    if (!inputBuffer) {
      return new Response(`"${transform.src} not found`, { status: 404 });
    }
    const { data, format } = await sharp_default.transform(inputBuffer, transform);
    return new Response(data, {
      status: 200,
      headers: {
        "Content-Type": lookup(format) || "",
        "Cache-Control": "public, max-age=31536000",
        ETag: etag(inputBuffer),
        Date: new Date().toUTCString()
      }
    });
  } catch (err) {
    return new Response(`Server Error: ${err}`, { status: 500 });
  }
};

const _page0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	get
}, Symbol.toStringTag, { value: 'Module' }));

const repoName = "danielle-m-dev";
const accessToken = "MC5Zd3o1RkJJQUFGejR6bXlF.77-977-977-9du-_vQQD77-977-9MUrvv71q77-9S--_ve-_ve-_vThX77-977-977-9He-_ve-_vT5zRSQTcg";
const apiEndpoint = prismic.getEndpoint(repoName);
const client = prismic.createClient(apiEndpoint, { accessToken: accessToken});


function getHome(){
    return client.getByType('home');
}

function getAbout(){
    return client.getByType('about');
}

function getUses(){
    return client.getByType('uses');
}

function getExperiencePage(){
    return client.getByType('experience_page')
}

function getAllProjects(){
    let params = { orderings: {field: 'my.project.project_start_date', direction: 'desc'}, pageSize: 100};
    return client.getByType('project', params)
}

function getProjectByUid(uid){
    return client.getByUID('project', uid)
}

function getCurrentProjects(){
    let params = { 
        predicates: [prismic.predicate.at("my.project.is_current", true)],
        orderings: { field: 'my.project.project_start_date', direction: 'desc'}, 
        pageSize: 12
    };
    return client.getByType('project', params)
}

function getWorkExperience(){
    let params = {
        orderings: { field: 'my.experience.started_using', direction: 'asc'}, 
        pageSize: 50
    };
    return client.getByType('experience', params)
}

const $$module1$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	getHome,
	getAbout,
	getUses,
	getExperiencePage,
	getAllProjects,
	getProjectByUid,
	getCurrentProjects,
	getWorkExperience
}, Symbol.toStringTag, { value: 'Module' }));

const PKG_NAME = "@astrojs/image";
const ROUTE_PATTERN = "/_image";
const OUTPUT_DIR = "/_image";

const PREFIX = "@astrojs/image";
const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function getPrefix(level, timestamp) {
  let prefix = "";
  if (timestamp) {
    prefix += dim(dateTimeFormat.format(new Date()) + " ");
  }
  switch (level) {
    case "debug":
      prefix += bold(green(`[${PREFIX}] `));
      break;
    case "info":
      prefix += bold(cyan(`[${PREFIX}] `));
      break;
    case "warn":
      prefix += bold(yellow(`[${PREFIX}] `));
      break;
    case "error":
      prefix += bold(red(`[${PREFIX}] `));
      break;
  }
  return prefix;
}
const log = (_level, dest) => ({ message, level, prefix = true, timestamp = true }) => {
  if (levels[_level] >= levels[level]) {
    dest(`${prefix ? getPrefix(level, timestamp) : ""}${message}`);
  }
};
const info = log("info", console.info);
const debug = log("debug", console.debug);
const warn = log("warn", console.warn);

/**
 * shortdash - https://github.com/bibig/node-shorthash
 *
 * @license
 *
 * (The MIT License)
 *
 * Copyright (c) 2013 Bibig <bibig@me.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
const dictionary = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY";
const binary = dictionary.length;
function bitwise(str) {
  let hash = 0;
  if (str.length === 0)
    return hash;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    hash = (hash << 5) - hash + ch;
    hash = hash & hash;
  }
  return hash;
}
function shorthash(text) {
  let num;
  let result = "";
  let integer = bitwise(text);
  const sign = integer < 0 ? "Z" : "";
  integer = Math.abs(integer);
  while (integer >= binary) {
    num = integer % binary;
    integer = Math.floor(integer / binary);
    result = dictionary[num] + result;
  }
  if (integer > 0) {
    result = dictionary[integer] + result;
  }
  return sign + result;
}

function removeQueryString(src) {
  const index = src.lastIndexOf("?");
  return index > 0 ? src.substring(0, index) : src;
}
function removeExtname(src) {
  const ext = path.extname(src);
  if (!ext) {
    return src;
  }
  const index = src.lastIndexOf(ext);
  return src.substring(0, index);
}
function ensureDir(dir) {
  fs$1.mkdirSync(dir, { recursive: true });
}
function propsToFilename({ src, width, height, format }) {
  let filename = removeQueryString(src);
  const ext = path.extname(filename);
  filename = removeExtname(filename);
  if (isRemoteImage(src)) {
    filename += `-${shorthash(src)}`;
  }
  if (width && height) {
    return `${filename}_${width}x${height}.${format}`;
  } else if (width) {
    return `${filename}_${width}w.${format}`;
  } else if (height) {
    return `${filename}_${height}h.${format}`;
  }
  return format ? src.replace(ext, format) : src;
}
function filenameFormat(transform) {
  return isRemoteImage(transform.src) ? path.join(OUTPUT_DIR, path.basename(propsToFilename(transform))) : path.join(OUTPUT_DIR, path.dirname(transform.src), path.basename(propsToFilename(transform)));
}

function getTimeStat(timeStart, timeEnd) {
  const buildTime = timeEnd - timeStart;
  return buildTime < 750 ? `${Math.round(buildTime)}ms` : `${(buildTime / 1e3).toFixed(2)}s`;
}
async function ssgBuild({ loader, staticImages, srcDir, outDir, logLevel }) {
  const timer = performance.now();
  info({
    level: logLevel,
    prefix: false,
    message: `${bgGreen(
      black(` optimizing ${staticImages.size} image${staticImages.size > 1 ? "s" : ""} `)
    )}`
  });
  const inputFiles = /* @__PURE__ */ new Set();
  for (const [src, transformsMap] of staticImages) {
    let inputFile = void 0;
    let inputBuffer = void 0;
    if (isRemoteImage(src)) {
      inputBuffer = await loadRemoteImage(src);
    } else {
      const inputFileURL = new URL(`.${src}`, srcDir);
      inputFile = fileURLToPath(inputFileURL);
      inputBuffer = await loadLocalImage(inputFile);
      inputFiles.add(inputFile);
    }
    if (!inputBuffer) {
      warn({ level: logLevel, message: `"${src}" image could not be fetched` });
      continue;
    }
    const transforms = Array.from(transformsMap.entries());
    debug({ level: logLevel, prefix: false, message: `${green("\u25B6")} ${src}` });
    let timeStart = performance.now();
    if (inputFile) {
      const to = inputFile.replace(fileURLToPath(srcDir), fileURLToPath(outDir));
      await ensureDir(path.dirname(to));
      await fs.copyFile(inputFile, to);
      const timeEnd = performance.now();
      const timeChange = getTimeStat(timeStart, timeEnd);
      const timeIncrease = `(+${timeChange})`;
      const pathRelative = inputFile.replace(fileURLToPath(srcDir), "");
      debug({
        level: logLevel,
        prefix: false,
        message: `  ${cyan("\u2514\u2500")} ${dim(`(original) ${pathRelative}`)} ${dim(timeIncrease)}`
      });
    }
    for (const [filename, transform] of transforms) {
      timeStart = performance.now();
      let outputFile;
      if (isRemoteImage(src)) {
        const outputFileURL = new URL(path.join("./", OUTPUT_DIR, path.basename(filename)), outDir);
        outputFile = fileURLToPath(outputFileURL);
      } else {
        const outputFileURL = new URL(path.join("./", OUTPUT_DIR, filename), outDir);
        outputFile = fileURLToPath(outputFileURL);
      }
      const { data } = await loader.transform(inputBuffer, transform);
      ensureDir(path.dirname(outputFile));
      await fs.writeFile(outputFile, data);
      const timeEnd = performance.now();
      const timeChange = getTimeStat(timeStart, timeEnd);
      const timeIncrease = `(+${timeChange})`;
      const pathRelative = outputFile.replace(fileURLToPath(outDir), "");
      debug({
        level: logLevel,
        prefix: false,
        message: `  ${cyan("\u2514\u2500")} ${dim(pathRelative)} ${dim(timeIncrease)}`
      });
    }
  }
  info({
    level: logLevel,
    prefix: false,
    message: dim(`Completed in ${getTimeStat(timer, performance.now())}.
`)
  });
}

async function globImages(dir) {
  fileURLToPath(dir);
  return await glob("./**/*.{heic,heif,avif,jpeg,jpg,png,tiff,webp,gif}", {
    cwd: fileURLToPath(dir)
  });
}
async function ssrBuild({ srcDir, outDir }) {
  const images = await globImages(srcDir);
  for (const image of images) {
    const from = path.join(fileURLToPath(srcDir), image);
    const to = path.join(fileURLToPath(outDir), image);
    await ensureDir(path.dirname(to));
    await fs.copyFile(from, to);
  }
}

async function metadata(src) {
  const file = await fs.readFile(src);
  const { width, height, type, orientation } = await sizeOf(file);
  const isPortrait = (orientation || 0) >= 5;
  if (!width || !height || !type) {
    return void 0;
  }
  return {
    src,
    width: isPortrait ? height : width,
    height: isPortrait ? width : height,
    format: type
  };
}

function createPlugin(config, options) {
  const filter = (id) => /^(?!\/_image?).*.(heic|heif|avif|jpeg|jpg|png|tiff|webp|gif)$/.test(id);
  const virtualModuleId = "virtual:image-loader";
  let resolvedConfig;
  let loaderModuleId;
  async function resolveLoader(context) {
    if (!loaderModuleId) {
      const module = await context.resolve(options.serviceEntryPoint);
      if (!module) {
        throw new Error(`"${options.serviceEntryPoint}" could not be found`);
      }
      loaderModuleId = module.id;
    }
    return loaderModuleId;
  }
  return {
    name: "@astrojs/image",
    enforce: "pre",
    configResolved(viteConfig) {
      resolvedConfig = viteConfig;
    },
    async resolveId(id) {
      if (id === virtualModuleId) {
        return await resolveLoader(this);
      }
    },
    async load(id) {
      if (!filter(id)) {
        return null;
      }
      const meta = await metadata(id);
      const fileUrl = pathToFileURL(id);
      const src = resolvedConfig.isProduction ? fileUrl.pathname.replace(config.srcDir.pathname, "/") : id;
      const output = {
        ...meta,
        src: slash(src)
      };
      return `export default ${JSON.stringify(output)}`;
    }
  };
}

function isHostedService(service) {
  return "getImageSrc" in service;
}
function isSSRService(service) {
  return "transform" in service;
}

function resolveSize(transform) {
  if (transform.width && transform.height) {
    return transform;
  }
  if (!transform.width && !transform.height) {
    throw new Error(`"width" and "height" cannot both be undefined`);
  }
  if (!transform.aspectRatio) {
    throw new Error(
      `"aspectRatio" must be included if only "${transform.width ? "width" : "height"}" is provided`
    );
  }
  let aspectRatio;
  if (typeof transform.aspectRatio === "number") {
    aspectRatio = transform.aspectRatio;
  } else {
    const [width, height] = transform.aspectRatio.split(":");
    aspectRatio = Number.parseInt(width) / Number.parseInt(height);
  }
  if (transform.width) {
    return {
      ...transform,
      width: transform.width,
      height: Math.round(transform.width / aspectRatio)
    };
  } else if (transform.height) {
    return {
      ...transform,
      width: Math.round(transform.height * aspectRatio),
      height: transform.height
    };
  }
  return transform;
}
async function resolveTransform(input) {
  if (typeof input.src === "string") {
    return resolveSize(input);
  }
  const metadata = "then" in input.src ? (await input.src).default : input.src;
  let { width, height, aspectRatio, format = metadata.format, ...rest } = input;
  if (!width && !height) {
    width = metadata.width;
    height = metadata.height;
  } else if (width) {
    let ratio = parseAspectRatio(aspectRatio) || metadata.width / metadata.height;
    height = height || Math.round(width / ratio);
  } else if (height) {
    let ratio = parseAspectRatio(aspectRatio) || metadata.width / metadata.height;
    width = width || Math.round(height * ratio);
  }
  return {
    ...rest,
    src: metadata.src,
    width,
    height,
    aspectRatio,
    format
  };
}
async function getImage(transform) {
  var _a, _b, _c, _d;
  if (!transform.src) {
    throw new Error("[@astrojs/image] `src` is required");
  }
  let loader = (_a = globalThis.astroImage) == null ? void 0 : _a.loader;
  if (!loader) {
    const { default: mod } = await Promise.resolve().then(() => sharp).catch(() => {
      throw new Error(
        "[@astrojs/image] Builtin image loader not found. (Did you remember to add the integration to your Astro config?)"
      );
    });
    loader = mod;
    globalThis.astroImage = globalThis.astroImage || {};
    globalThis.astroImage.loader = loader;
  }
  const resolved = await resolveTransform(transform);
  const attributes = await loader.getImageAttributes(resolved);
  const isDev = (_b = (Object.assign({"BASE_URL":"/","MODE":"production","DEV":false,"PROD":true},{SSR:true,}))) == null ? void 0 : _b.DEV;
  const isLocalImage = !isRemoteImage(resolved.src);
  const _loader = isDev && isLocalImage ? sharp_default : loader;
  if (!_loader) {
    throw new Error("@astrojs/image: loader not found!");
  }
  if (isSSRService(_loader)) {
    const { searchParams } = _loader.serializeTransform(resolved);
    if ((_c = globalThis.astroImage) == null ? void 0 : _c.addStaticImage) {
      globalThis.astroImage.addStaticImage(resolved);
    }
    const src = ((_d = globalThis.astroImage) == null ? void 0 : _d.filenameFormat) ? globalThis.astroImage.filenameFormat(resolved, searchParams) : `${ROUTE_PATTERN}?${searchParams.toString()}`;
    return {
      ...attributes,
      src: slash(src)
    };
  }
  return attributes;
}

async function resolveAspectRatio({ src, aspectRatio }) {
  if (typeof src === "string") {
    return parseAspectRatio(aspectRatio);
  } else {
    const metadata = "then" in src ? (await src).default : src;
    return parseAspectRatio(aspectRatio) || metadata.width / metadata.height;
  }
}
async function resolveFormats({ src, formats }) {
  const unique = new Set(formats);
  if (typeof src === "string") {
    unique.add(extname(src).replace(".", ""));
  } else {
    const metadata = "then" in src ? (await src).default : src;
    unique.add(extname(metadata.src).replace(".", ""));
  }
  return [...unique];
}
async function getPicture(params) {
  const { src, widths } = params;
  if (!src) {
    throw new Error("[@astrojs/image] `src` is required");
  }
  if (!widths || !Array.isArray(widths)) {
    throw new Error("[@astrojs/image] at least one `width` is required");
  }
  const aspectRatio = await resolveAspectRatio(params);
  if (!aspectRatio) {
    throw new Error("`aspectRatio` must be provided for remote images");
  }
  async function getSource(format) {
    const imgs = await Promise.all(
      widths.map(async (width) => {
        const img = await getImage({
          src,
          format,
          width,
          height: Math.round(width / aspectRatio)
        });
        return `${img.src} ${width}w`;
      })
    );
    return {
      type: lookup(format) || format,
      srcset: imgs.join(",")
    };
  }
  const allFormats = await resolveFormats(params);
  const image = await getImage({
    src,
    width: Math.max(...widths),
    aspectRatio,
    format: allFormats[allFormats.length - 1]
  });
  const sources = await Promise.all(allFormats.map((format) => getSource(format)));
  return {
    sources,
    image
  };
}

function integration(options = {}) {
  const resolvedOptions = {
    serviceEntryPoint: "@astrojs/image/sharp",
    logLevel: "info",
    ...options
  };
  const staticImages = /* @__PURE__ */ new Map();
  let _config;
  let output;
  function getViteConfiguration() {
    return {
      plugins: [createPlugin(_config, resolvedOptions)],
      optimizeDeps: {
        include: ["image-size", "sharp"]
      },
      ssr: {
        noExternal: ["@astrojs/image", resolvedOptions.serviceEntryPoint]
      }
    };
  }
  return {
    name: PKG_NAME,
    hooks: {
      "astro:config:setup": ({ command, config, injectRoute, updateConfig }) => {
        _config = config;
        output = command === "dev" ? "server" : config.output;
        updateConfig({ vite: getViteConfiguration() });
        if (output === "server") {
          injectRoute({
            pattern: ROUTE_PATTERN,
            entryPoint: command === "dev" ? "@astrojs/image/endpoints/dev" : "@astrojs/image/endpoints/prod"
          });
        }
      },
      "astro:server:setup": async ({ server }) => {
        globalThis.astroImage = {};
      },
      "astro:build:setup": () => {
        function addStaticImage(transform) {
          const srcTranforms = staticImages.has(transform.src) ? staticImages.get(transform.src) : /* @__PURE__ */ new Map();
          srcTranforms.set(propsToFilename(transform), transform);
          staticImages.set(transform.src, srcTranforms);
        }
        globalThis.astroImage = output === "static" ? {
          addStaticImage,
          filenameFormat
        } : {};
      },
      "astro:build:done": async ({ dir }) => {
        var _a;
        if (output === "server") {
          await ssrBuild({ srcDir: _config.srcDir, outDir: dir });
        } else {
          const loader = (_a = globalThis == null ? void 0 : globalThis.astroImage) == null ? void 0 : _a.loader;
          if (loader && "transform" in loader && staticImages.size > 0) {
            await ssgBuild({
              loader,
              staticImages,
              srcDir: _config.srcDir,
              outDir: dir,
              logLevel: resolvedOptions.logLevel
            });
          }
        }
      }
    }
  };
}

const $$module1$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: integration,
	getImage,
	getPicture,
	isHostedService,
	isSSRService
}, Symbol.toStringTag, { value: 'Module' }));

createMetadata("/@fs/D:/Git/danielle-dev/node_modules/@astrojs/image/components/Image.astro", { modules: [{ module: $$module1$2, specifier: "../dist/index.js", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$i = createAstro("/@fs/D:/Git/danielle-dev/node_modules/@astrojs/image/components/Image.astro", "https://danielle-m.dev/", "file:///D:/Git/danielle-dev/");
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$i, $$props, $$slots);
  Astro2.self = $$Image;
  const { loading = "lazy", decoding = "async", ...props } = Astro2.props;
  const attrs = await getImage(props);
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return renderTemplate`${maybeRenderHead($$result)}<img${spreadAttributes(attrs, "attrs", { "class": "astro-C563XDD6" })}${addAttribute(loading, "loading")}${addAttribute(decoding, "decoding")}>

`;
});

createMetadata("/@fs/D:/Git/danielle-dev/node_modules/@astrojs/image/components/Picture.astro", { modules: [{ module: $$module1$2, specifier: "../dist/index.js", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$h = createAstro("/@fs/D:/Git/danielle-dev/node_modules/@astrojs/image/components/Picture.astro", "https://danielle-m.dev/", "file:///D:/Git/danielle-dev/");
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$Picture;
  const {
    src,
    alt,
    sizes,
    widths,
    aspectRatio,
    formats = ["avif", "webp"],
    loading = "lazy",
    decoding = "async",
    ...attrs
  } = Astro2.props;
  const { image, sources } = await getPicture({ src, widths, formats, aspectRatio });
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return renderTemplate`${maybeRenderHead($$result)}<picture${spreadAttributes(attrs, "attrs", { "class": "astro-L4E2UYFH" })}>
	${sources.map((attrs2) => renderTemplate`<source${spreadAttributes(attrs2, "attrs", { "class": "astro-L4E2UYFH" })}${addAttribute(sizes, "sizes")}>`)}
	<img${spreadAttributes(image, "image", { "class": "astro-L4E2UYFH" })}${addAttribute(loading, "loading")}${addAttribute(decoding, "decoding")}${addAttribute(alt, "alt")}>
</picture>

`;
});

const $$module2$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Image: $$Image,
	Picture: $$Picture
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$g = createMetadata("/@fs/D:/Git/danielle-dev/src/components/Header.astro", { modules: [{ module: $$module2$2, specifier: "@astrojs/image/components", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$g = createAstro("/@fs/D:/Git/danielle-dev/src/components/Header.astro", "https://danielle-m.dev/", "file:///D:/Git/danielle-dev/");
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$Header;
  return renderTemplate`${maybeRenderHead($$result)}<header>
    <nav>
      <a href="#main-content" class="skip">
        Skip to main
      </a>
      <div>
        <div class="nav-photo">
          ${renderComponent($$result, "Image", $$Image, { "src": import('./chunks/profile-photo.f3d2e2cc.mjs'), "class": "nav-photo", "width": 60, "height": 60, "alt": "headshot of danielle", "style": "display:inherit;" })}
        </div>
        
      </div>
      <div class="site-name">
        <a href="/">Danielle Mayabb</a>
      </div>
      <div class="site-name-short">
        <a href="/">DM</a>
      </div>
      <div class="site-links">
        <a href="/Work">Work</a>
        <a href="/Experience">Experience</a>
        <a href="/About">About</a>
        <span>
          
        </span>
      </div>
    </nav>
  </header>`;
});

const $$file$g = "D:/Git/danielle-dev/src/components/Header.astro";
const $$url$g = undefined;

const $$module1$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$g,
	default: $$Header,
	file: $$file$g,
	url: $$url$g
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$f = createMetadata("/@fs/D:/Git/danielle-dev/src/components/SocialIcons.astro", { modules: [], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$f = createAstro("/@fs/D:/Git/danielle-dev/src/components/SocialIcons.astro", "https://danielle-m.dev/", "file:///D:/Git/danielle-dev/");
const $$SocialIcons = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$SocialIcons;
  return renderTemplate`${maybeRenderHead($$result)}<ul class="social">
      <li>
        <a href="https://github.com/dmtrek14">
         <i class="fab fa-github"></i>
          <span class="sr-only">Github profile</span>
        </a>
      </li>
      <li>
        <a href="https://www.linkedin.com/in/danielle-mayabb-4066a4105/">
          <i class="fab fa-linkedin"></i>
          <span class="sr-only">LinkedIn profile</span>
        </a>
      </li>
      <li>
        <a href="https://dev.to/thescifibrarian">
          <i class="fab fa-dev"></i>
          <span class="sr-only">Dev profile</span>
        </a>
      </li> 
      <li>
        <a href="/Contact">
          <i class="fas fa-envelope"></i>
          <span class="sr-only">Email contact form</span>
        </a>
      </li>
    </ul>`;
});

const $$file$f = "D:/Git/danielle-dev/src/components/SocialIcons.astro";
const $$url$f = undefined;

const $$module3$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$f,
	default: $$SocialIcons,
	file: $$file$f,
	url: $$url$f
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$e = createMetadata("/@fs/D:/Git/danielle-dev/src/components/Footer.astro", { modules: [{ module: $$module3$2, specifier: "@components/SocialIcons.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$e = createAstro("/@fs/D:/Git/danielle-dev/src/components/Footer.astro", "https://danielle-m.dev/", "file:///D:/Git/danielle-dev/");
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$Footer;
  const copywriteYear = new Date().getFullYear();
  return renderTemplate`${maybeRenderHead($$result)}<footer>
    <div>
      ${renderComponent($$result, "SocialIcons", $$SocialIcons, {})}
    </div>
    <div class="mt-2">
      Built with &nbsp;
      <a href="/Uses">
        <i class="fas fa-code"></i>
        <span class="sr-only">code</span> +
        <i class="fas fa-coffee"></i>
        <span class="sr-only">coffee</span> +
        <i class="fas fa-heart"></i>
        <span class="sr-only">love</span>
      </a>
      &nbsp; in Reno, NV
    </div>
    <div class="mt-2">© ${copywriteYear} Danielle Mayabb</div>
  </footer>`;
});

const $$file$e = "D:/Git/danielle-dev/src/components/Footer.astro";
const $$url$e = undefined;

const $$module2$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$e,
	default: $$Footer,
	file: $$file$e,
	url: $$url$e
}, Symbol.toStringTag, { value: 'Module' }));

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$metadata$d = createMetadata("/@fs/D:/Git/danielle-dev/src/layouts/BaseLayout.astro", { modules: [{ module: $$module1$1, specifier: "@components/Header.astro", assert: {} }, { module: $$module2$1, specifier: "@components/Footer.astro", assert: {} }, { module: $$module3$2, specifier: "@components/SocialIcons.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$d = createAstro("/@fs/D:/Git/danielle-dev/src/layouts/BaseLayout.astro", "https://danielle-m.dev/", "file:///D:/Git/danielle-dev/");
const $$BaseLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title, description, permalink } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="en">\n  <head>  \n    <meta name="title"', '>\n    <meta name="description"', '>\n    <meta charset="utf-8">\n    <title>', '</title>\n    <meta name="viewport" content="width=device-width">\n    <meta name="theme-color" content="#353430">\n    <meta property="og:type" content="website">\n    <meta property="og:url"', '>\n    <meta property="og:title"', '>\n    <meta property="og:description"', '>\n    <link rel="icon" type="image/x-icon" href="/favicon.ico">\n    <link rel="preconnect" href="https://fonts.googleapis.com">\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n    <link href="https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300;700&family=Open+Sans:wght@400;700&display=swap" rel="stylesheet">\n    <link rel="stylesheet" href="/style/styles.css">\n    <script src="https://kit.fontawesome.com/d174097705.js" crossorigin="anonymous"><\/script>\n  ', "</head>\n  <body>\n    ", '\n    <div class="container">\n        ', '\n        <main id="main-content" tabindex="-1">\n          <!-- slot: your page content will be injected here. -->\n          ', "\n        </main>  \n    </div>\n    ", "\n  </body></html>"])), addAttribute(title, "content"), addAttribute(description, "content"), title, addAttribute(permalink, "content"), addAttribute(title, "content"), addAttribute(description, "content"), renderHead($$result), renderComponent($$result, "Header", $$Header, {}), title === "Home" && renderTemplate`<aside class="home-icons">
            ${renderComponent($$result, "SocialIcons", $$SocialIcons, {})}
        </aside>`, renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}));
});

const $$file$d = "D:/Git/danielle-dev/src/layouts/BaseLayout.astro";
const $$url$d = undefined;

const $$module2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$d,
	default: $$BaseLayout,
	file: $$file$d,
	url: $$url$d
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$c = createMetadata("/@fs/D:/Git/danielle-dev/src/components/RichText.astro", { modules: [{ module: $$module1$4, specifier: "@prismicio/helpers", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$c = createAstro("/@fs/D:/Git/danielle-dev/src/components/RichText.astro", "https://danielle-m.dev/", "file:///D:/Git/danielle-dev/");
const $$RichText = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$RichText;
  const content = Astro2.props.content;
  const html = $$module1$4.asHTML(content);
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => renderTemplate`${markHTMLString(html)}` })}

`;
});

const $$file$c = "D:/Git/danielle-dev/src/components/RichText.astro";
const $$url$c = undefined;

const $$module3$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$c,
	default: $$RichText,
	file: $$file$c,
	url: $$url$c
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$b = createMetadata("/@fs/D:/Git/danielle-dev/src/components/ProjectCard.astro", { modules: [{ module: $$module3$1, specifier: "@components/RichText.astro", assert: {} }, { module: $$module2$2, specifier: "@astrojs/image/components", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$b = createAstro("/@fs/D:/Git/danielle-dev/src/components/ProjectCard.astro", "https://danielle-m.dev/", "file:///D:/Git/danielle-dev/");
const $$ProjectCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$ProjectCard;
  const { project } = Astro2.props;
  const { featured_image, project_name, summary_text, github_link } = project.data;
  return renderTemplate`${maybeRenderHead($$result)}<div class="card">
    <div class="card-img-top">
        <div>
            ${featured_image && renderTemplate`${renderComponent($$result, "Picture", $$Picture, { "src": featured_image.url, "alt": featured_image.alt, "aspectRatio": "8:3", "widths": [340, 463], "sizes": "(min-width: 768px) 463px, ((min-width: 464px) and (max-width: 767px))  340px", "formats": ["avif", "jpeg", "png", "webp"] })}`}
        </div>
    </div>
    <div class="card-body">
        <h3>${project_name}</h3>
        ${renderComponent($$result, "RichText", $$RichText, { "content": summary_text })}
        <div class="card-footer">
            <div>
                <a${addAttribute("/Work/projects/" + project.uid + "/", "href")}>More info <span class="sr-only"> about my work on ${project_name}</span></a>
            </div>
            <div>
                ${github_link && github_link.linkType !== "Any" && renderTemplate`<a${addAttribute(github_link, "href")}>
                        <i class="fab fa-github"></i> View code &nbsp; <span class="sr-only"> for ${project_name}</span>
                        <i class="fas fa-long-arrow-alt-right"></i>
                    </a>`}
            </div>
        </div>
    </div>
</div>`;
});

const $$file$b = "D:/Git/danielle-dev/src/components/ProjectCard.astro";
const $$url$b = undefined;

const $$module3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$b,
	default: $$ProjectCard,
	file: $$file$b,
	url: $$url$b
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$a = createMetadata("/@fs/D:/Git/danielle-dev/src/pages/index.astro", { modules: [{ module: $$module1$3, specifier: "../prismic.js", assert: {} }, { module: $$module2, specifier: "@layouts/BaseLayout.astro", assert: {} }, { module: $$module3$1, specifier: "@components/RichText.astro", assert: {} }, { module: $$module3, specifier: "@components/ProjectCard.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$a = createAstro("/@fs/D:/Git/danielle-dev/src/pages/index.astro", "https://danielle-m.dev/", "file:///D:/Git/danielle-dev/");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Index;
  const { results } = await getHome();
  const projects = await getCurrentProjects();
  const { page_title, page_subheader, intro_text } = results[0].data;
  const projectList = projects.results;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Home", "description": "Landing page for my dev website.", "permalink": new URL(Astro2.site).toString() }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<div>
        ${renderComponent($$result, "RichText", $$RichText, { "content": page_title })}
        ${renderComponent($$result, "RichText", $$RichText, { "content": page_subheader })}
        ${renderComponent($$result, "RichText", $$RichText, { "content": intro_text })}
        <hr>
        <h2>what I'm working on</h2>
        <div id="project-list" class="two-col-grid">
        ${projectList && projectList.map((project) => renderTemplate`${renderComponent($$result, "ProjectCard", $$ProjectCard, { "project": project })}`)}
        </div>
    </div>` })}`;
});

const $$file$a = "D:/Git/danielle-dev/src/pages/index.astro";
const $$url$a = "";

const _page1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$a,
	default: $$Index,
	file: $$file$a,
	url: $$url$a
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$9 = createMetadata("/@fs/D:/Git/danielle-dev/src/components/Subsections.astro", { modules: [{ module: $$module3$1, specifier: "@components/RichText.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$9 = createAstro("/@fs/D:/Git/danielle-dev/src/components/Subsections.astro", "https://danielle-m.dev/", "file:///D:/Git/danielle-dev/");
const $$Subsections = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Subsections;
  const { items } = Astro2.props;
  return renderTemplate`${items && items.map((item) => renderTemplate`${renderComponent($$result, "RichText", $$RichText, { "content": item.subsection_title })}${renderComponent($$result, "RichText", $$RichText, { "content": item.subsection_text })}`)}`;
});

const $$file$9 = "D:/Git/danielle-dev/src/components/Subsections.astro";
const $$url$9 = undefined;

const $$module4$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$9,
	default: $$Subsections,
	file: $$file$9,
	url: $$url$9
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$8 = createMetadata("/@fs/D:/Git/danielle-dev/src/pages/Experience/languages-and-libraries/[uid].astro", { modules: [{ module: $$module1$3, specifier: "../../../prismic.js", assert: {} }, { module: $$module2, specifier: "@layouts/BaseLayout.astro", assert: {} }, { module: $$module3$1, specifier: "@components/RichText.astro", assert: {} }, { module: $$module4$1, specifier: "@components/Subsections.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$8 = createAstro("/@fs/D:/Git/danielle-dev/src/pages/Experience/languages-and-libraries/[uid].astro", "https://danielle-m.dev/", "file:///D:/Git/danielle-dev/");
async function getStaticPaths$1() {
  let { results } = await getWorkExperience();
  return results.map((item) => {
    return { params: { uid: item.uid }, props: { item } };
  });
}
const $$uid$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$uid$1;
  const { title, usage_frequency, skills_narrative, body } = Astro2.props.item.data;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "description": "", "permalink": new URL(Astro2.site).toString() }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<h1>${title}</h1><h2>How often I use</h2>${renderComponent($$result, "RichText", $$RichText, { "content": usage_frequency })}<h2>My skills with ${title}</h2>${renderComponent($$result, "RichText", $$RichText, { "content": skills_narrative })}${body && body.map((slice) => renderTemplate`${renderComponent($$result, "RichText", $$RichText, { "content": slice.primary.section_title })}${renderComponent($$result, "RichText", $$RichText, { "content": slice.primary.general_summary })}${renderComponent($$result, "Subsections", $$Subsections, { "items": slice.items })}`)}` })}`;
});

const $$file$8 = "D:/Git/danielle-dev/src/pages/Experience/languages-and-libraries/[uid].astro";
const $$url$8 = "/Experience/languages-and-libraries/[uid]";

const _page2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$8,
	getStaticPaths: getStaticPaths$1,
	default: $$uid$1,
	file: $$file$8,
	url: $$url$8
}, Symbol.toStringTag, { value: 'Module' }));

function getYearsBetweenDates(startDate, endDate) {
  let timeBetweenDates;
  let start = new Date(startDate);
  let end = new Date(endDate);
  let now = new Date(Date.now());
  if (endDate == null) {
    timeBetweenDates = getYearDiffDecimal(start, now);
  } else {
    timeBetweenDates = getYearDiffDecimal(start, end);
  }
  return timeBetweenDates;
}
function getYearDiffDecimal(startDate, endDate) {
  const msInYear = 365 * 24 * 60 * 60 * 1e3;
  return Math.round((Number(endDate) - Number(startDate)) / msInYear).toString();
}

const $$module1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	getYearsBetweenDates
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$7 = createMetadata("/@fs/D:/Git/danielle-dev/src/components/JobSummary.astro", { modules: [{ module: $$module3$1, specifier: "@components/RichText.astro", assert: {} }, { module: $$module1, specifier: "@utils/DateCalculator", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$7 = createAstro("/@fs/D:/Git/danielle-dev/src/components/JobSummary.astro", "https://danielle-m.dev/", "file:///D:/Git/danielle-dev/");
const $$JobSummary = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$JobSummary;
  const { job_title, about_job, start_date, end_date } = Astro2.props.job;
  return renderTemplate`${maybeRenderHead($$result)}<h3>${job_title}: ${getYearsBetweenDates(start_date, end_date)} year(s)</h3>
${renderComponent($$result, "RichText", $$RichText, { "content": about_job })}`;
});

const $$file$7 = "D:/Git/danielle-dev/src/components/JobSummary.astro";
const $$url$7 = undefined;

const $$module4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$7,
	default: $$JobSummary,
	file: $$file$7,
	url: $$url$7
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$6 = createMetadata("/@fs/D:/Git/danielle-dev/src/components/ExperienceCard.astro", { modules: [{ module: $$module1, specifier: "@utils/DateCalculator", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$6 = createAstro("/@fs/D:/Git/danielle-dev/src/components/ExperienceCard.astro", "https://danielle-m.dev/", "file:///D:/Git/danielle-dev/");
const $$ExperienceCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$ExperienceCard;
  const { exp } = Astro2.props;
  const { title, started_using } = exp.data;
  return renderTemplate`${maybeRenderHead($$result)}<div class="card experience-card">
    <div class="card-body">
        <h3>${title}</h3>
        <p>${getYearsBetweenDates(started_using, null)} years experience</p>
        <a${addAttribute("/Experience/languages-and-libraries/" + exp.uid + "/", "href")}>More info <span class="sr-only">about my experiences with </span></a>
    </div>
</div>`;
});

const $$file$6 = "D:/Git/danielle-dev/src/components/ExperienceCard.astro";
const $$url$6 = undefined;

const $$module5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$6,
	default: $$ExperienceCard,
	file: $$file$6,
	url: $$url$6
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$5 = createMetadata("/@fs/D:/Git/danielle-dev/src/pages/Experience.astro", { modules: [{ module: $$module1$3, specifier: "../prismic.js", assert: {} }, { module: $$module2, specifier: "@layouts/BaseLayout.astro", assert: {} }, { module: $$module3$1, specifier: "@components/RichText.astro", assert: {} }, { module: $$module4, specifier: "@components/JobSummary.astro", assert: {} }, { module: $$module5, specifier: "@components/ExperienceCard.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$5 = createAstro("/@fs/D:/Git/danielle-dev/src/pages/Experience.astro", "https://danielle-m.dev/", "file:///D:/Git/danielle-dev/");
const $$Experience = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Experience;
  const { results } = await getExperiencePage();
  const { page_title, page_summary, job_summaries } = results[0].data;
  const experiences = await getWorkExperience();
  const expList = experiences.results;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Experience", "description": "A little more about me", "permalink": new URL("/Experience", Astro2.site).toString() }, { "default": () => renderTemplate`${renderComponent($$result, "RichText", $$RichText, { "content": page_title })}${renderComponent($$result, "RichText", $$RichText, { "content": page_summary })}${maybeRenderHead($$result)}<hr><h2>Summary</h2>${job_summaries && job_summaries.map((job) => renderTemplate`${renderComponent($$result, "JobSummary", $$JobSummary, { "job": job })}`)}<hr><h2>Languages, libraries, etc. I've worked with</h2><div id="experience-list" class="three-col-grid">
        ${expList && expList.map((exp) => renderTemplate`${renderComponent($$result, "ExperienceCard", $$ExperienceCard, { "exp": exp })}`)}
        </div>` })}`;
});

const $$file$5 = "D:/Git/danielle-dev/src/pages/Experience.astro";
const $$url$5 = "/Experience";

const _page3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$5,
	default: $$Experience,
	file: $$file$5,
	url: $$url$5
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$4 = createMetadata("/@fs/D:/Git/danielle-dev/src/pages/Contact.astro", { modules: [{ module: $$module2, specifier: "@layouts/BaseLayout.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$4 = createAstro("/@fs/D:/Git/danielle-dev/src/pages/Contact.astro", "https://danielle-m.dev/", "file:///D:/Git/danielle-dev/");
const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Contact;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Contact", "description": "Get in touch", "permalink": new URL("/Contact", Astro2.site).toString() }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<h1>Contact</h1><p>Use the form below to get in touch.</p><hr><form name="contact" method="post" data-netlify="true" data-netlify-honeypot="bot-field">
            <input type="hidden" name="form-name" value="contact">
            <span hidden><input name="bot-field" aria-hidden="true" aria-label="field to screen bots, do not fill in"></span>     
            <label for="name">Your name</label>
            <input id="name" type="text" name="name">
            <label for="email">Your email</label>
            <input id="email" type="email" name="email">
            <label for="email-body">What would you like to talk to me about?</label>
            <textarea id="email-body" rows="10"></textarea>
            <button type="submit">Submit</button>
          </form>` })}`;
});

const $$file$4 = "D:/Git/danielle-dev/src/pages/Contact.astro";
const $$url$4 = "/Contact";

const _page4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$4,
	default: $$Contact,
	file: $$file$4,
	url: $$url$4
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$3 = createMetadata("/@fs/D:/Git/danielle-dev/src/pages/About.astro", { modules: [{ module: $$module1$3, specifier: "../prismic.js", assert: {} }, { module: $$module2, specifier: "../layouts/BaseLayout.astro", assert: {} }, { module: $$module3$1, specifier: "../components/RichText.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$3 = createAstro("/@fs/D:/Git/danielle-dev/src/pages/About.astro", "https://danielle-m.dev/", "file:///D:/Git/danielle-dev/");
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$About;
  const { results } = await getAbout();
  const pageData = results[0].data;
  const title = pageData.page_title[0].text;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "description": "A little more about me", "permalink": new URL("/About", Astro2.site).toString() }, { "default": () => renderTemplate`${renderComponent($$result, "RichText", $$RichText, { "content": pageData.page_title })}${renderComponent($$result, "RichText", $$RichText, { "content": pageData.page_content })}` })}`;
});

const $$file$3 = "D:/Git/danielle-dev/src/pages/About.astro";
const $$url$3 = "/About";

const _page5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$3,
	default: $$About,
	file: $$file$3,
	url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$2 = createMetadata("/@fs/D:/Git/danielle-dev/src/pages/Uses.astro", { modules: [{ module: $$module1$3, specifier: "../prismic.js", assert: {} }, { module: $$module2, specifier: "../layouts/BaseLayout.astro", assert: {} }, { module: $$module3$1, specifier: "../components/RichText.astro", assert: {} }, { module: $$module4$1, specifier: "@components/Subsections.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$2 = createAstro("/@fs/D:/Git/danielle-dev/src/pages/Uses.astro", "https://danielle-m.dev/", "file:///D:/Git/danielle-dev/");
const $$Uses = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Uses;
  const { results } = await getUses();
  const { page_title, page_summary, body } = results[0].data;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": page_title.text, "description": page_summary.text, "permalink": new URL("/Uses", Astro2.site).toString() }, { "default": () => renderTemplate`${renderComponent($$result, "RichText", $$RichText, { "content": page_title })}${renderComponent($$result, "RichText", $$RichText, { "content": page_summary })}${body && body.map((slice) => renderTemplate`${renderComponent($$result, "RichText", $$RichText, { "content": slice.primary.section_title })}${renderComponent($$result, "RichText", $$RichText, { "content": slice.primary.section_text })}${renderComponent($$result, "Subsections", $$Subsections, { "items": slice.items })}`)}` })}`;
});

const $$file$2 = "D:/Git/danielle-dev/src/pages/Uses.astro";
const $$url$2 = "/Uses";

const _page6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$2,
	default: $$Uses,
	file: $$file$2,
	url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$1 = createMetadata("/@fs/D:/Git/danielle-dev/src/pages/Work/projects/[uid].astro", { modules: [{ module: $$module1$3, specifier: "../../../prismic.js", assert: {} }, { module: $$module2, specifier: "@layouts/BaseLayout.astro", assert: {} }, { module: $$module3$1, specifier: "@components/RichText.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$1 = createAstro("/@fs/D:/Git/danielle-dev/src/pages/Work/projects/[uid].astro", "https://danielle-m.dev/", "file:///D:/Git/danielle-dev/");
async function getStaticPaths() {
  let { results } = await getAllProjects();
  return results.map((item) => {
    return { params: { uid: item.uid }, props: { item } };
  });
}
const $$uid = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$uid;
  const { project_name, summary_text, tech_used, github_link, about_project, production_link } = Astro2.props.item.data;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": project_name, "description": summary_text.text, "permalink": new URL(Astro2.site).toString() }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<h1>${project_name}</h1><h2>Primary technologies, frameworks, and patterns used</h2>${renderComponent($$result, "RichText", $$RichText, { "content": tech_used })}<div>
        ${github_link && renderTemplate`<a${addAttribute(github_link.url, "href")}><i class="fab fa-github"></i> View project code</a>`} 
    </div><div class="mt-2">
        ${production_link && renderTemplate`<a${addAttribute(production_link.url, "href")}><i class="fas fa-laptop-code"></i> View deployed code</a>`}
    </div><h2>About the Project</h2>${renderComponent($$result, "RichText", $$RichText, { "content": about_project })}` })}`;
});

const $$file$1 = "D:/Git/danielle-dev/src/pages/Work/projects/[uid].astro";
const $$url$1 = "/Work/projects/[uid]";

const _page7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata: $$metadata$1,
	getStaticPaths,
	default: $$uid,
	file: $$file$1,
	url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata = createMetadata("/@fs/D:/Git/danielle-dev/src/pages/Work.astro", { modules: [{ module: $$module1$3, specifier: "../prismic.js", assert: {} }, { module: $$module2, specifier: "../layouts/BaseLayout.astro", assert: {} }, { module: $$module3, specifier: "@components/ProjectCard.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro = createAstro("/@fs/D:/Git/danielle-dev/src/pages/Work.astro", "https://danielle-m.dev/", "file:///D:/Git/danielle-dev/");
const $$Work = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Work;
  const projects = await getAllProjects();
  const projectList = projects.results;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Work", "description": "A little more about me", "permalink": new URL("/Work", Astro2.site).toString() }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<h1>Work</h1><p>
        I've worked on several projects on which I'm the sole developer, but
        I've also contributed to many team projects. I've listed here a
        combination of hobby projects and those I've done in the course of my
        work. Much of the work I've done for my employer is proprietary, but
        I've tried to provide code snippets, screenshots, and summaries where
        appropriate in the detail view for each project.
      </p><hr><h2>Selected projects and code</h2><div id="project-list" class="two-col-grid">
        ${projectList && projectList.map((project) => renderTemplate`${renderComponent($$result, "ProjectCard", $$ProjectCard, { "project": project })}`)}
        </div>` })}`;
});

const $$file = "D:/Git/danielle-dev/src/pages/Work.astro";
const $$url = "/Work";

const _page8 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	$$metadata,
	default: $$Work,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const pageMap = new Map([['node_modules/@astrojs/image/dist/endpoints/prod.js', _page0],['src/pages/index.astro', _page1],['src/pages/Experience/languages-and-libraries/[uid].astro', _page2],['src/pages/Experience.astro', _page3],['src/pages/Contact.astro', _page4],['src/pages/About.astro', _page5],['src/pages/Uses.astro', _page6],['src/pages/Work/projects/[uid].astro', _page7],['src/pages/Work.astro', _page8],]);
const renderers = [Object.assign({"name":"astro:jsx","serverEntrypoint":"astro/jsx/server.js","jsxImportSource":"astro"}, { ssr: server_default }),Object.assign({"name":"@astrojs/preact","clientEntrypoint":"@astrojs/preact/client.js","serverEntrypoint":"@astrojs/preact/server.js","jsxImportSource":"preact"}, { ssr: _renderer1 }),];

if (typeof process !== "undefined") {
  if (process.argv.includes("--verbose")) ; else if (process.argv.includes("--silent")) ; else ;
}

const SCRIPT_EXTENSIONS = /* @__PURE__ */ new Set([".js", ".ts"]);
new RegExp(
  `\\.(${Array.from(SCRIPT_EXTENSIONS).map((s) => s.slice(1)).join("|")})($|\\?)`
);

const STYLE_EXTENSIONS = /* @__PURE__ */ new Set([
  ".css",
  ".pcss",
  ".postcss",
  ".scss",
  ".sass",
  ".styl",
  ".stylus",
  ".less"
]);
new RegExp(
  `\\.(${Array.from(STYLE_EXTENSIONS).map((s) => s.slice(1)).join("|")})($|\\?)`
);

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return segment[0].spread ? `/:${segment[0].content.slice(3)}(.*)?` : "/" + segment.map((part) => {
      if (part)
        return part.dynamic ? `:${part.content}` : part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  return {
    ...serializedManifest,
    assets,
    routes
  };
}

const _manifest = Object.assign(deserializeManifest({"adapterName":"@astrojs/netlify/functions","routes":[{"file":"","links":[],"scripts":[],"routeData":{"type":"endpoint","route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/@astrojs/image/dist/endpoints/prod.js","pathname":"/_image","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/Experience-Work-index.335fbc66.css","assets/772aecef.694c8c0d.css"],"scripts":[],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/772aecef.694c8c0d.css"],"scripts":[],"routeData":{"route":"/experience/languages-and-libraries/[uid]","type":"page","pattern":"^\\/Experience\\/languages-and-libraries\\/([^/]+?)\\/?$","segments":[[{"content":"Experience","dynamic":false,"spread":false}],[{"content":"languages-and-libraries","dynamic":false,"spread":false}],[{"content":"uid","dynamic":true,"spread":false}]],"params":["uid"],"component":"src/pages/Experience/languages-and-libraries/[uid].astro","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/Experience-Work-index.335fbc66.css","assets/Experience.6c9cdee1.css","assets/772aecef.694c8c0d.css"],"scripts":[],"routeData":{"route":"/experience","type":"page","pattern":"^\\/Experience\\/?$","segments":[[{"content":"Experience","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Experience.astro","pathname":"/Experience","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/Contact.8d864dd4.css","assets/772aecef.694c8c0d.css"],"scripts":[],"routeData":{"route":"/contact","type":"page","pattern":"^\\/Contact\\/?$","segments":[[{"content":"Contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Contact.astro","pathname":"/Contact","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/772aecef.694c8c0d.css"],"scripts":[],"routeData":{"route":"/about","type":"page","pattern":"^\\/About\\/?$","segments":[[{"content":"About","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/About.astro","pathname":"/About","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/772aecef.694c8c0d.css"],"scripts":[],"routeData":{"route":"/uses","type":"page","pattern":"^\\/Uses\\/?$","segments":[[{"content":"Uses","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Uses.astro","pathname":"/Uses","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/772aecef.694c8c0d.css"],"scripts":[],"routeData":{"route":"/work/projects/[uid]","type":"page","pattern":"^\\/Work\\/projects\\/([^/]+?)\\/?$","segments":[[{"content":"Work","dynamic":false,"spread":false}],[{"content":"projects","dynamic":false,"spread":false}],[{"content":"uid","dynamic":true,"spread":false}]],"params":["uid"],"component":"src/pages/Work/projects/[uid].astro","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/Experience-Work-index.335fbc66.css","assets/772aecef.694c8c0d.css"],"scripts":[],"routeData":{"route":"/work","type":"page","pattern":"^\\/Work\\/?$","segments":[[{"content":"Work","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Work.astro","pathname":"/Work","_meta":{"trailingSlash":"ignore"}}}],"site":"https://danielle-m.dev/","base":"/","markdown":{"drafts":false,"syntaxHighlight":"shiki","shikiConfig":{"langs":[],"theme":"github-dark","wrap":false},"remarkPlugins":[],"rehypePlugins":[],"isAstroFlavoredMd":false},"pageMap":null,"renderers":[],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","D:/Git/danielle-dev/public/assets/profile-photo.jpg":"chunks/profile-photo.f3d2e2cc.mjs","@astrojs/preact/client.js":"client.0cca1885.js","astro:scripts/before-hydration.js":"data:text/javascript;charset=utf-8,//[no before-hydration script]"},"assets":["/assets/772aecef.694c8c0d.css","/assets/Contact.8d864dd4.css","/assets/Experience.6c9cdee1.css","/assets/Experience-Work-index.335fbc66.css","/client.0cca1885.js","/favicon.ico","/robots.txt","/assets/icon.png","/assets/logo.svg","/assets/profile-photo.jpg","/style/styles.css"]}), {
	pageMap: pageMap,
	renderers: renderers
});
const _args = {};

const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler };
