module.exports = {
  afterCreate(event: Event) {
    console.log("aftercreate game-session")
    const { result, params } = event;
    console.log(result)
    // do something to the result;
  },
};
