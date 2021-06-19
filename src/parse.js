import queryString from 'query-string';
import { getConfiguration } from './configure';
import arrayFrom from './utils/arrayFrom';
import isEmptyString from './utils/isEmptyString';

const SQUARE_BRACES_FORMAT = /^(\w+)\[(.+)\]$/;

function parse(search, options = {}) {
  const _options = {
    ...getConfiguration().formatOptions,
    ...options
  };

  return toJsonApi(queryString.parse(search), _options);
}

/**
 * Ensures (possibly empty value) is of a certain data type, for ease of interacting with a consistent
 * interface
 * @param {any} value Value to convert to specified data type, if it is not already.
 * @param {'array'|'object'|undefined} forceFormat The name of the format to force value to
 * @returns {any} Value wrapped in the desired data type
 */
function applyFormat(value, forceFormat) {
  if (!forceFormat) {
    return value;
  } else if (forceFormat === 'array') {
    return isEmptyString(value) ? [] : arrayFrom(value);
  } else if (forceFormat === 'object') {
    return isEmptyString(value) ? {} : value || {};
  } else {
    throw Error.new(`Invalid forceFormat value '${forceFormat}. Must be 'array', 'object' (or unset).`);
  }
}

function toJsonApi(queryObject, options) {
  return Object.keys(queryObject).
    reduce((memo, originalName) => {
      // eslint-disable-next-line id-length,no-unused-vars
      const [_, parameterName, parameterMapKey] = SQUARE_BRACES_FORMAT.exec(originalName) || [];
      const effectiveName = parameterName || originalName;

      const originalValue = queryObject[originalName];

      const { forceFormat, ...paramFormatOptions } = options[effectiveName] || { };

      const parsedEnvelope = queryString.parse(`${originalName}=${originalValue}`, paramFormatOptions);
      const parsedValue = applyFormat(parsedEnvelope[originalName], forceFormat);

      if (parameterMapKey) {
        memo[effectiveName] = memo[effectiveName] || {};
        memo[effectiveName][parameterMapKey] = parsedValue;
      } else {
        memo[effectiveName] = parsedValue;
      }

      return memo;
    }, {});
}

export default parse;
