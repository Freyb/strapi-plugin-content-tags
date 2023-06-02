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
      None: { color: 'neutral' },
      Done: { color: 'success' },
      'In progress': { color: 'primary' },
      Error: { color: 'danger' },
    },
    defaultTag: 'None',
  },
  validator(config) {
    // tags
    if (!config.tags || !config.defaultTag) {
      throw new ValidationError(
        'You must define tags and defaultTag properties',
      );
    }
    Object.entries(config.tags).forEach(([tagKey, tagProperties]) => {
      if (!Object.prototype.hasOwnProperty.call(tagProperties, 'color')) {
        throw new ValidationError(
          `Missing properties on tags.${tagKey}: Define color`,
        );
      }
    });
    if (!Object.keys(config.tags).includes(config.defaultTag)) {
      throw new ValidationError('defaultTag is not defined in tags');
    }
  },
};
