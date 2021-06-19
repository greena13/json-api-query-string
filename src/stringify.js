import queryString from 'query-string';
import { getConfiguration } from './configure';
import isObject from './utils/isObject';

function stringify(queryObject, options = {}) {
  const _options = {
    ...getConfiguration().formatOptions,
    ...options
  };

  return toQueryString(queryObject, _options);
}

function toQueryString(queryObject, options) {
  return Object.keys(queryObject).
    reduce((memo, paramName) => {
      const paramValue = queryObject[paramName];

      // eslint-disable-next-line no-unused-vars
      const { forceFormat, ...paramFormatOptions } = options[paramName] || { };

      if (isObject(paramValue)) {
        Object.keys(paramValue).forEach((paramKey) => {
          const fullPath = `${paramName}[${paramKey}]`;

          memo.push(`${fullPath}=${paramValue[paramKey]}`);
        });
      } else {
        memo.push(queryString.stringify({ [paramName]: paramValue }, paramFormatOptions));
      }

      return memo;
    }, []).
join('&');
}

export default stringify;
