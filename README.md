# critical-css-inliner

> **Critical-css-inliner** allows you to extract and inline critical (**above-the-fold**) CSS in HTML page.
> It might be helpful to speed up **[First Contentful Paint](https://web.dev/first-contentful-paint/)**.

## How it works

1. Critical-css-inliner **finds** all external stylesheets (`<link rel="stylesheet" href="...">`).
2. It **extracts** critical CSS (above-the-fold).
3. It **inlines** critical CSS in HTML page.
4. It **removes** critical CSS from external stylesheets.
5. It **makes** external stylesheets asynchronous (using [loadCSS](https://github.com/filamentgroup/loadCSS))

**Critical-css-inliner** uses [Critical-css-parser](https://github.com/ABVanton200/critical-css-parser/) under the hood, so IT ALSO SUPPORTS **ADAPTIVE DESIGN** (BOTH DESKTOP AND MOBILE VERSIONS)!

## Comparison with other popular libraries

Critical-css-inliner                                     | [Critical](https://github.com/addyosmani/critical)
---------------------------------------------------------|-------------------------------------------------------
execution time: **7.4 s**                                | execution time: **4.7 s**
result: **correct**                                      | result: **wrong**
<img src="https://i.ibb.co/j5gHrVW/res.png" width="300"> | <img src="https://i.ibb.co/sqnzGXH/Result.png" width="300"> 
inlined: **15.8 KB (less is better)**                    | inlined: **16.4 KB (less is better)**
auto extracting: **true**                                | auto extracting: **true** 

[Critters](https://github.com/GoogleChromeLabs/critters) | [Penthouse](https://github.com/pocketjoso/penthouse)
---------------------------------------------------------|-------------------------------------------------------
execution time: **3.5 s**                                | execution time: **3.5 s**
result: **correct**                                      | result: **wrong**
<img src="https://i.ibb.co/j5gHrVW/res.png" width="300"> | <img src="https://i.ibb.co/2nhH1RP/res.png" width="300"> 
inlined: **15.2 KB (less is better)**                    | inlined: **4.7 KB (less is better)**
auto extracting: **false**                               | auto extracting: **false** 

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