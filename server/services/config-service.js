'use strict';

const pluginId = require('../../admin/src/pluginId');

const defaultConfig = require('../config').default;

module.exports = ({ strapi }) => {
  const getConfig = async () => {
    const config = strapi.config.get(`plugin.${pluginId}`, defaultConfig);
    return config;
  };

  return {
    getConfig,
  };
};
