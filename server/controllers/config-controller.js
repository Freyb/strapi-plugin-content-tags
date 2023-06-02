'use strict';
const pluginId = require('../../admin/src/pluginId');

module.exports = ({ strapi }) => {
  const configService = strapi.plugin(pluginId).service('configService');

  const getConfig = async (ctx) => {
    ctx.body = await configService.getConfig();
  };

  return {
    getConfig,
  };
};
