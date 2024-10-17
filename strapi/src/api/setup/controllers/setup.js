'use strict';

module.exports = {
  retrieveSetup: async ctx => {
    try {
      ctx.body = ctx.state.flix;
    } catch (err) {
      ctx.body = err;
    }
  }
};
