const assert = require('assert').strict;
const criticalCSSInliner = require('../dist/index');
const fs = require('fs');
const path = require('path');

const css1 = `.ass{color:red;padding:5px;margin-top:100px}p{font-family:Roboto}`;
const css2 = `@font-face{font-family:Roboto;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxP.ttf) format('truetype')}`;
const css3 = `.cookie{background-color:red}`;

describe('Extract and inline', function() {
  it('minifyed with google font', async function() {

    await criticalCSSInliner({
      base: 'test/demo/',
      src: 'index.html',
      target: 'index-critical.html',
      inlineGoogleFonts: true,
      minify: true,
      ignoreStylesheets: [/bootstrap/],
      whitelist: /#foo|\.bar/
    });

    const html = fs.readFileSync(path.resolve('test/demo/', 'index-critical.html'), 'utf8');

    fs.unlinkSync(path.resolve('test/demo/', 'index-critical.html'));

    const css = html.indexOf(css1);
    const googleFont = html.indexOf(css2);

    assert.notStrictEqual(googleFont, -1);
    assert.notStrictEqual(css, -1);
  });

  it('minifyed without google font', async function() {

    await criticalCSSInliner({
      base: 'test/demo/',
      src: 'index.html',
      target: 'index-critical2.html',
      inlineGoogleFonts: false,
      minify: true,
      ignoreStylesheets: [/bootstrap/],
      whitelist: /#foo|\.bar/
    });

    const html = fs.readFileSync(path.resolve('test/demo/', 'index-critical2.html'), 'utf8');

    fs.unlinkSync(path.resolve('test/demo/', 'index-critical2.html'));

    const css = html.indexOf(css1);
    const googleFont = html.indexOf(css2);

    assert.strictEqual(googleFont, -1);
    assert.notStrictEqual(css, -1);
  });

  it('test whitelist', async function() {

    await criticalCSSInliner({
      base: 'test/demo/',
      src: 'index.html',
      target: 'index-critical3.html',
      inlineGoogleFonts: false,
      minify: true,
      ignoreStylesheets: [/bootstrap/],
      whitelist: /#foo|\.cookie/
    });

    const html = fs.readFileSync(path.resolve('test/demo/', 'index-critical3.html'), 'utf8');

    fs.unlinkSync(path.resolve('test/demo/', 'index-critical3.html'));

    const css = html.indexOf(css1);
    const googleFont = html.indexOf(css2);
    const cookie = html.indexOf(css3);

    assert.strictEqual(googleFont, -1);
    assert.strictEqual(css, -1);
    assert.notStrictEqual(cookie, -1);
  });
});
