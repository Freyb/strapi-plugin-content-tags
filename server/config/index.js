'use strict';

const { ValidationError } = require('@strapi/utils').errors;

module.exports = {
  default: {
    colors: {
      'dark-blue': '#0000FF',
      'dark-green': '#00FF00',
      'dark-red': '#FF0000',
      black: '#000000',
    },
    tags: {
      done: { label: 'Done', color: 'dark-green' },
      inProgress: { label: 'In progress', color: 'dark-blue' },
      error: { label: 'Error', color: 'dark-red' },
    },
  },
  validator(config) {
    // colors
    if (!config.colors) {
      throw new ValidationError('You must define colors prop');
    }
    // tags
    if (!config.tags) {
      throw new ValidationError('You must define tags prop');
    }
    Object.entries(config.tags).forEach(([tagKey, tagProperties]) => {
      if (
        !tagProperties.hasOwnProperty('label') ||
        !tagProperties.hasOwnProperty('color')
      ) {
        throw new ValidationError(
          `Missing properties on tags.${tagKey}: Define label and color`,
        );
      }
      if (!Object.keys(config.colors).includes(tagProperties.color)) {
        throw new ValidationError(
          `Undefined color key at tags.${tagKey}.color`,
        );
      }
    });
  },
};
