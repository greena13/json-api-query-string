'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/json-api-query-string.production.min.js');
} else {
  module.exports = require('./cjs/index.js');
}
