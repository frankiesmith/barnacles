/*
 * gulp-sass v5+ no longer bundles a compiler, so pair it with Dart Sass
 * (the `sass` package). Replaces the old node-sass, which no longer
 * installs on current Node versions.
 */
const gulpSass = require('gulp-sass')(require('sass'));

module.exports = (options = {}) =>
  gulpSass({ outputStyle: 'expanded', ...options }).on('error', gulpSass.logError);
