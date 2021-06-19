const DefaultConfigurationOptions = {
  formatOptions: {
    fields: { arrayFormat: 'comma', forceFormat: 'array' },
    include: { arrayFormat: 'comma', forceFormat: 'array' },
    sort: { arrayFormat: 'comma', forceFormat: 'array' },
  }
};

let configuration = {
  ...DefaultConfigurationOptions
};

/**
 * @typedef FormatOptions extends ParseOptions
 * @property {'array'|'object'|undefined} forceFormat The name of the format to force value to, if it's not
 *           already in that format.
 */

/**
 * @typedef GlobalConfigurationOptions
 * @property {FormatOptions} formatOptions Global configuration options for how to format query params
 *
 */

/**
 * Updates or sets the global configuration options
 * @param {GlobalConfigurationOptions} customConfiguration Configuration options to merge with the default
 *        configuration values
 * @returns {void}
 */
export function configure(customConfiguration) {
  const { formatOptions = {}, ...configToShallowMerge } = customConfiguration;

  configuration = {
    ...configuration,
    formatOptions: {
      ...DefaultConfigurationOptions.formatOptions,
      ...formatOptions
    },
    ...configToShallowMerge,
  };
}

/**
 * Returns the current global configuration options
 * @returns {GlobalConfigurationOptions} The current global configuration options
 */
export function getConfiguration() {
  return configuration;
}
