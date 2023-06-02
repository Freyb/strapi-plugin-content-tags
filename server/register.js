'use strict';

const pluginId = require('../admin/src/pluginId');

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: 'content-tags',
    plugin: pluginId,
    type: 'text',
  });
};
