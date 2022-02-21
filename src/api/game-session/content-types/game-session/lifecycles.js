module.exports = {
  async afterCreate(event) {
    console.log("aftercreate game-session")
    const { result, params } = event;
    console.log(result);

    let dataReq = params.data;
    let users = dataReq.users;
    let detailsGameSessionKeyName = Object.keys(dataReq).filter(k => k.includes('details') && dataReq[k])[0];
    //let detailsGameSession = dataReq[detailsGameSessionKeyName];
    //let roundsDataArr = [];
    //const sessionCreated = result;
    const sessionCreated = await strapi.entityService.findOne('api::game-session.game-session', result.id, {
      populate: '*'
    });
    const detailsGame = sessionCreated[detailsGameSessionKeyName];

    let created = [];
    for (let n_round = 1; n_round <= sessionCreated.n_rounds; ++n_round) {
      let currRound = await strapi.service('api::game-round.game-round').create({
        data: {
          game_session: sessionCreated.id,
          n_round: n_round,
          closed: false
        }
      });

      createPlayersByGame(users, detailsGameSessionKeyName, detailsGame, currRound, n_round);
      created.push(currRound);
    }
    console.log(created);
    // do something to the result;
  },
};



function createPlayersByGame(users, detailsGameSessionKeyName, detailsGame, currRound, n_round) {
  users.forEach(async (userId) => {
    if (detailsGameSessionKeyName.includes("PGGStandard")) {
      let endowment = detailsGame.endowment;
      let data = {
        roundGame: currRound.id,
        n_round: n_round,
        user: userId,
        closed: false
      };
      data[detailsGameSessionKeyName.replace("details", 'player')] = {
        endowment: endowment,
        contribution: 0,
        payoff: 0
      }

      let playerRoundCreated = await strapi.service('api::player-round.player-round').create({ data: data });
      console.log(playerRoundCreated);
    }

  });
}