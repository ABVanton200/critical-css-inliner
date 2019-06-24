/**
 * Copyright (c) 2019, Anton Babakhin
 * All rights reserved. (MIT Licensed)
 * 
 * critical-css-inliner
 */

const criticalCSSParser = require('critical-css-parser');
const inline = require('inline-critical');
const fs = require('fs');
const path = require('path');

const DEFAULTS = {
    base: 'dist/',
    src: 'index.html',
    target: 'index-critical.html',
    inlineGoogleFonts: true,
    minify: true,
    ignoreStylesheets: [/bootstrap/],
    whitelist: /#foo|\.bar/
};

/**
 * Inline critical CSS
 * @param  {object} options Options
 * @return {Promise<true>} Result success
 */
async function criticalCSSInliner(options) {

    const props = {...DEFAULTS, ...options};

    const css = await criticalCSSParser({
        type: 'localServer',
        entrypoint: props.base,
        filename: props.src,
        enableGoogleFonts: props.inlineGoogleFonts,
        minify: props.minify,
        whitelist: props.whitelist
    });

    const html = fs.readFileSync(path.resolve(props.base, props.src), 'utf8');

    const inlined = inline(html, css.critical, {
        extract: true,
        basePath: props.base,
        minify: props.minify,
        ignore: props.ignoreStylesheets
    });

    fs.writeFileSync(path.resolve(props.base, props.target), inlined, 'utf8');
    
    return true;
  	
}

module.exports = criticalCSSInliner;
