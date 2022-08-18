module.exports = {
    '*/1 * * * *': async ({ strapi }) => {

        const sessions = await strapi.entityService.findMany('api::game-session.game-session', {
            filters: {
                closed: false,
            },
            populate:'*',
        });

        sessions.forEach(analyseSession);



    },
  };


    async function analyseSession(session){
        console.log('Init analyse session method');
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
        populate: "player" + session.game.name,
    });

    const noPlayedPlayers = players.filter((player) => !player.closed);
    if(noPlayedPlayers.length){
        //some players have yet to play
    }else{
        calculateResults(players, session, infoCurrentRound)
    }
  }


    async function calculateResults(players, session, currentRound) {  
        const gameType = session.game.name;
        if(gameType === 'PGGStandard'){
            let totalContribution = 0;
            players.forEach((player) =>{
                totalContribution += player.playerPGGStandard.contribution;
            });

            const MPCR = session.detailsPGGStandard.mpcr; 
            players.forEach((player) =>{
                let playerPGGStandard = player.playerPGGStandard;
                playerPGGStandard.payoff = playerPGGStandard.endowment - playerPGGStandard.contribution + MPCR * totalContribution;
            });

            let knex = strapi.db.connection;
            try{
                await knex.transaction(async trx => {

                    for(let player of players){
                        const results = await trx('player_rounds_components').select('*').where({entity_id:player.id}); //component_id
                        console.log(results);
                        const component_id = results[0].component_id;
                        const resUpdate = await trx('components_pgg_player_pgg_standards').where({id:component_id}).update( player.playerPGGStandard);
                        console.log(resUpdate);
                        //trx('components_pgg_player_pgg_standards').where({id: player.id}).update(player);
                    }
                    //close current round
                    await trx('game_rounds').where({id:currentRound.id}).update({closed:true});
                    if(currentRound.n_round == session.n_rounds){
                        await trx('game_sessions').where({id:session.id}).update({closed:true});
                    }
                })
            }catch (error) {
                // If we get here, that means that neither the 'Old Books' catalogues insert,
                // nor any of the books inserts will have taken place.
                console.error(error);
              }


            
        }
    }