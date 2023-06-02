'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('strapi-plugin-content-tags')
      .service('myService')
      .getWelcomeMessage();
  },
});
