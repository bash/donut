# donut 🍩

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

frontend boilerplate featuring preact, es6, less and some postcss magic ✨

## Building
```bash
npm run build
```

## Building for production
Setting the environment variable NODE_ENV to production will disable sourcmaps and cause the javascript to be minified.
It's generally a good idea to run `make clean` before building for production.

```bash
NODE_ENV=production npm run build
```

## Cleanup built files
```bash
npm run clean
```
