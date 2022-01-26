'use strict';
import { Context } from 'koa';
/**
 *  game-session controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::game-session.game-session', ({ strapi }) => ({
  async create(ctx: Context){
    const {data, meta} = await super.create(ctx);
    console.log(data);
  }
}));
