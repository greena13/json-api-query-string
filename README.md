# json-api-query-string

## Feature overview

* Parse JSON API query strings to objects
* Stringify JSON API objects to query strings
* Minimal code, with permissive `query-string` peer dependency for maximum code re-use
* Encodes the specified parts of the JSON API specification (i.e. `sort`, `include` and `fields`) and provides a declarative syntax for customising the parts of the specification that are only reserved to contain implementation-specific details (i.e. `page` and `filter`)
* Can be used in the browser or Node.js 6 or later
* Includes a TypeScript `index.d.ts` file
* Reasonable exhaustive test suite

## Basic usage

```javascript
import { configure, stringify, parse } from 'json-api-query-string';

/**
 * Optional global configuration (typically where you'll define how page, filter and other custom parameters
 * are treated.
 */
configure({
  formatOptions: { filter: { arrayFormat: 'comma' }}
});

const queryObject = parse('sort=foo,bar')

queryObject // { sort: ['foo', 'bar'] }

stringify({ sort: [ ...queryObject.sort, 'baz'] }); // 'sort=foo,bar,baz'
```

## Install & Setup

`json-api-query-string` can be installed as a CommonJS module:

```
npm install json-api-query-string --save
# OR
yarn add json-api-query-string
```

Because `query-string` is often already used in many code bases, it's only a peer dependency of `json-api-query-string`, so if it's not already installed, you'll to add it:

```
npm install query-string --save
# OR
yarn add query-string
```
                                
## sort, include and fields

These values are full specified by the JSON API specification, so `json-api-query-string` comes configured for the correct behaviour:

```javascript
parse('sort=')                                   // { sort: [] } 
parse('sort=foo')                                // { sort: ['foo'] }
parse('sort=foo,bar')                            // { sort: ['foo', 'bar'] }
parse('sort=foo,-bar')                           // { sort: ['foo', '-bar'] }

parse('include=')                                // { include: [] }
parse('include=foo')                             // { include: ['foo'] }
parse('include=foo,baz')                         // { include: ['foo', 'baz'] }
parse('include=foo.bar')                         // { include: ['foo.bar'] }
parse('include=foo.bar,baz')                     // { include: ['foo.bar', 'baz'] }  
parse('include=foo,bar.baz')                     // { include: ['foo', 'bar.baz'] }  

parse('fields[foo]=')                            // { fields: { foo: [] } }
parse('fields[foo]=bar')                         // { fields: { foo: ['bar'] } }
parse('fields[foo]=bar&fields[baz]=barp')        // { fields: { foo: ['bar'], baz: ['barp'] } }
parse('fields[foo]=bar,zoop&fields[baz]=barp')   // { fields: { foo: ['bar', 'zoop'], baz: ['barp'] } }

// stringify will perform the reverse transformation
```

## filter, page and other custom fields

These parameters are reserved rather than being specified, so will vary depending on the particulars of your implementation.

You can configure `json-api-query-string` to correctly handle the schema globally by passing the `formatOpitons` option to the `configure` function:

```javascript
import { configure } from 'json-api-query-string';

configure({
  formatOptions: { filter: { arrayFormat: 'comma' }}
});
```

The keys of this hash must match your parameter name (with any square brackets removed), and the values are option passed to [query-string](https://github.com/sindresorhus/query-string)'s `parse` function. 

You can also perform "one-off" configuration by passing format options as a second argument to `parse` or `stringify`:

```javascript
parse('filter[foo]=bar,baz')                                         // { filter: { foo: 'bar,baz' } }
parse('filter[foo]=bar,baz', { filter: { arrayFormat: 'comma' } })   // { filter: { foo: ['bar', 'baz'] } }
```

## Similar packages

Thank you to [query-to-json-api](https://github.com/saibotsivad/query-to-json-api) for the original inspiration and starting point for this package. 
