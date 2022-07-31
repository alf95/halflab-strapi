module.exports = {
    '*/1 * * * *': async () => {

        const sessions = await strapi.entityService.findMany('api::game-session.game-session', {
            filters: {
                closed: false,
            },
        });

        sessions.forEach(analyseSession);



    },
  };


  function analyseSession(session){
    const rounds = await strapi.entityService.findMany('api::game-round.game-round', {
        filters: {
            game_session: session.id,
            closed: false,
        },
        sort: { id: 'ASC' },
        limit: 1
    });

    const infoCurrentRound = rounds[0];

    const players = await strapi.entityService.findMany('api::player-round.player-round', {
        filters: {
            roundGame: infoCurrentRound.id
        },
    });
  }