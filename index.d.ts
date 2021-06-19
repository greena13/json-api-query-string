import { ParseOptions } from 'query-string';

/**
 * Options to customise how query strings are parsed and query objects are stringified
 */
export interface FormatOptions extends ParseOptions {
  /**
   * The name of the format to force value to, if it's not already in that format.
   */
  forceFormat: 'array' | 'object' | undefined;
}

export interface StandardJsonApiQueryObject {
  /**
   * The list of fields to sort by, with no prefix for ascending and a - prefix for descending.
   * The order of this list is significant (sorting occurs on the first field, and then the second, etc)
   * @see https://jsonapi.org/format/#fetching-sorting
   */
  sort?: Array<string>,

  /**
   * A list of paths of associations to include.
   * @see https://jsonapi.org/format/#fetching-includes
   */
  include?: Array<string>,

  /**
   * A whitelist of associations and their fields to include
   * @see https://jsonapi.org/format/#fetching-sparse-fieldsets
   */
  fields?: { [associationName: string]: Array<string> },

  /**
   * Value used for filtering
   * @see https://jsonapi.org/format/#fetching-filtering
   */
  filter?: never,

  /**
   * Value used for pagination
   * @see https://jsonapi.org/format/#fetching-pagination
   */
  page?: never
}

/**
 * An object containing a fully deserialized representation of the JSON API query parameters.
 */
export interface JsonApiQueryObject extends StandardJsonApiQueryObject{
  [extraValues: string]: any
}

/**
 * Parses a query string into a JSON API query object
 * @param searchString The search or query string to parse
 * @param options Options to customise how the string is parsed. Largely options passed directly to query-string
 * @returns An object containing the JSON API query values
 */
export function parse(searchString: string, options?: FormatOptions): JsonApiQueryObject;

/**
 * Stringifies a JSON API query object to a search of query string
 * @param queryObject The query object to stringify
 * @param options Options to customise how the query object is converted to a query string
 */
export function stringify(queryObject: JsonApiQueryObject, options?: FormatOptions): string;

export interface GlobalConfigurationOptions {
  formatOptions?: FormatOptions
}

/**
 * Updates or sets the global configuration options
 */
export function configure(config: GlobalConfigurationOptions): void;
