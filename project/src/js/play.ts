const GAME_ID_CHARS_COUNT = 4;

export function handlePostPlay(req, res) {
  const params = req.body;
  const gameId = initGame(params);
  req.session.gameParams = params;

  res.redirect(`game/${gameId}`);
}

function initGame(params) {
  console.log(`Players count: ${params["number-of-players"]}`);

  const gameId = generateGameId(GAME_ID_CHARS_COUNT);

  startCreateGameResourceAsync(gameId, params);

  return gameId;
}

function generateGameId(charsCount) {
  // TODO: check id not exist 
  const gameIdChars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const idChars = [...generateRandomChars(gameIdChars, charsCount)];
  const checkSum = calcCheckSum(gameIdChars, idChars);
  const id = idChars.join('');

  const id0 = id.slice(0, 1);
  const id1 = id.slice(1, 3);
  const id2 = id.slice(3);

  const checkSum0 = checkSum.slice(0, 1);
  const checkSum1 = checkSum.slice(1);

  const gameId = `${id0}${checkSum0}${id1}${checkSum1}${id2}`;

  return gameId;
}

function* generateRandomChars(chars, charsCount) {
  for (let i = 0; i < charsCount; i++) {
    const charIndex = Math.trunc(Math.random() * chars.length);
    const char = chars.charAt(charIndex);

    yield char;
  }
}

function calcCheckSum(chars, number) {
  const sum = number.reduce((acc, item) => acc + chars.indexOf(item), 0);

  console.log(`CheckSum=${sum}`);

  const result = convertIntToNumberOfBase(chars, sum);

  return result;
}

function convertIntToNumberOfBase(chars, value) {
  const base = chars.length;

  let reminder = value;
  let result = "";

  while (reminder > 0) {
    const fraction = reminder % base;
    const char = chars.charAt(fraction);

    result = char + result;

    reminder = (reminder - fraction) / base;
  }

  return result;
}

async function startCreateGameResourceAsync(gameId, params) {
  console.log(`Creating game resources for game ${gameId}`);

  const gameApiUrl = process.env.GAME_API_URL;

  await fetch(`${gameApiUrl}/${gameId}/init`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params)
  });
  console.log(`Init game requested.`);
}
