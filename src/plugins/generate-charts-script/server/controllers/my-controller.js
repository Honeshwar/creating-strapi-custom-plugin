'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('generate-charts-script')
      .service('myService')
      .getWelcomeMessage();
  },
});
