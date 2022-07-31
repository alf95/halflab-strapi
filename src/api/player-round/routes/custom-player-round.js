module.exports = {
    routes: [
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/player-round/getCurrRound/:gameSessionId',
        handler: 'player-round.getCurrRoundUser',
        config: {
          policies: [],
          description: "Get current round by session id",
          tag:{
            name: "Player-round",
            
          }
        }
      }
    ]
}