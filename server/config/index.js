'use strict';

const { ValidationError } = require('@strapi/utils').errors;

module.exports = {
  default: {
    // TODO add custom colors
    // colors: {
    //   'dark-blue': '#0000FF',
    //   'dark-green': '#00FF00',
    //   'dark-red': '#FF0000',
    //   black: '#000000',
    // },

    // "alternative","danger","neutral","primary","secondary","success","warning"]
    tags: {
      done: { label: 'Done', color: 'success' },
      inProgress: { label: 'In progress', color: 'primary' },
      error: { label: 'Error', color: 'danger' },
    },
  },
  validator(config) {
    // colors
    // TODO
    // if (!config.colors) {
    //   throw new ValidationError('You must define colors prop');
    // }

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
    });
  },
};
