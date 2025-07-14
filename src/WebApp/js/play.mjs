export function handlePostPlay(req, res) {
  const params = req.body;
  const gameId = initGame(params);

  res.redirect(`game/${gameId}`);
}

function initGame(params) {
  console.log(`Players count: ${params["number-of-players"]}`);

  const gameId = generateGameId();

  startCreateGameResource(gameId);

  return gameId;
}

function generateGameId() {
    return "12345467890abc";
}

function startCreateGameResource(gameId) {
    console.log(`Creating game resources for game ${gameId}`);
}
