'use strict';

/**
 *  player-round controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::player-round.player-round', ({ strapi }) => ({
    async getCurrRoundUser(ctx) {
        // some logic here
        const { id, role } = ctx.state.user;
        const gameSessionId = ctx.params.gameSessionId;

        const rounds = await strapi.entityService.findMany('api::game-round.game-round', {
            filters: {
                game_session: gameSessionId,
                closed: false,
            },
            sort: { n_round: 'ASC' },
            limit: 1
        });
        //const isAdmin = role.type === 'admin';

        const currRound = rounds[0];
        ctx.query = {
            ...ctx.query, filters: {
                user: id,
                roundGame: currRound.id
            }
        }
        const { data, meta } = await super.find(ctx);
        // some more logic

        return { data, meta };
    }
}));
