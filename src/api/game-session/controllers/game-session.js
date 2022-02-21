'use strict';
//import { Context } from 'koa';

/**
 *  game-session controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::game-session.game-session', ({ strapi }) => ({
  /*async create(ctx){
     //await strapi.db.connection.transaction(async (transacting) => {
      const {data, meta} = await super.create(ctx);
      //data_meta = await super.create(ctx);
      const sessionCreated = data.attributes;
      let created = [];
      for(let n_round = 1; n_round <= sessionCreated.n_rounds; ++n_round){
        
        let entity = await strapi.service('api::game-round.game-round').create({data:{
          game_session:data.id,
          n_round:n_round,
          closed:false}
        });
        created.push(entity);
      }
      console.log(data);
      console.log(created);

      


    
    return {data, meta};
  }*/
}));
