# critical-css-inliner

| **Critical-css-inliner** allows you to extract and inline critical (**above-the-fold**) CSS in HTML page.
| It might be helpful to speed up **[First Contentful Paint](https://web.dev/first-contentful-paint/)**.

## How it works

1. Critical-css-inliner **finds** all external stylesheets (`<link rel="stylesheet" href="...">`).
2. It **extracts** critical CSS (above-the-fold).
3. It **inlines** critical CSS in HTML page.
4. It **removes** critical CSS from external stylesheets.

---

**Critical-css-inliner** uses [Critical-css-parser](https://github.com/ABVanton200/critical-css-parser/) under the hood, so IT ALSO SUPPORTS **ADAPTIVE DESIGN** (BOTH DESKTOP AND MOBILE VERSIONS)!

## Installation

```sh
npm install --save-dev critical-css-inliner

// or

yarn add --dev critical-css-inliner
```
## Docs

```js
const criticalCSSInliner = require('critical-css-inliner');

await criticalCSSInliner({
  // Your entrypoint
  base: 'dist/',

  // HTML source file
  src: 'index.html',

  // HTML target file
  target: 'index-critical.html',

  // Add Google Fonts to critical CSS
  inlineGoogleFonts: true,

  // Minify all styles
  minify: true,

  // ignore styles from the following stylesheets
  ignoreStylesheets: [/bootstrap/],

  // inline styles with the following CSS rules
  whitelist: /#foo|\.bar/
  
});
```

## Example

```js
const criticalCSSInliner = require('critical-css-inliner');

(async () => {

  await criticalCSSInliner({
    base: 'dist/',
    src: 'index.html',
    target: 'index-critical.html',
    inlineGoogleFonts: true,
    minify: true,
    ignoreStylesheets: [/bootstrap/],
    whitelist: /#foo|\.bar/
  });

})();
```

---

## Usage

### criticalCSSInliner

Pass options to `criticalCSSInliner({ ... })`.

### criticalCSSInliner({...}) returns:

```<Promise<true>>```

---

## License

MIT license