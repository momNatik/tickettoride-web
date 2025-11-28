export function handlePostPlay(req, res) {
  const params = req.body;
  const gameId = initGame(params);
  req.session.gameParams = params;

  res.redirect(`game/${gameId}`);
}

function initGame(params) {
  console.log(`Players count: ${params["number-of-players"]}`);

  const gameId = generateGameId(4);

  startCreateGameResource(gameId);

  return gameId;
}

function generateGameId(digitsCount) {
  const gameIdDigits =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const idChars = [...generateRandomDigits(gameIdDigits, digitsCount)];
  const checkSum = calcCheckSum(gameIdDigits, idChars);
  const id = idChars.join('');

  const id0 = id.slice(0, 1);
  const id1 = id.slice(1, 3);
  const id2 = id.slice(3);

  const checkSum0 = checkSum.slice(0, 1);
  const checkSum1 = checkSum.slice(1);

  const gameId = `${id0}${checkSum0}${id1}${checkSum1}${id2}`;

  return gameId;
}

function* generateRandomDigits(digits, digitsCount) {
  for (let i = 0; i < digitsCount; i++) {
    const digitIndex = Math.trunc(Math.random() * digits.length);
    const digit = digits.charAt(digitIndex);

    yield digit;
  }
}

function calcCheckSum(digits, number) {
  const sum = number.reduce((acc, item) => acc + digits.indexOf(item), 0);

  console.log(`CheckSum=${sum}`);

  const result = convertIntToNumberOfBase(digits, sum);

  return result;
}

function convertIntToNumberOfBase(digits, value) {
  const base = digits.length;

  let reminder = value;
  let result = "";

  while (reminder > 0) {
    const fraction = reminder % base;
    const digit = digits.charAt(fraction);

    result = digit + result;

    reminder = (reminder - fraction) / base;
  }

  return result;
}

function startCreateGameResource(gameId) {
  console.log(`Creating game resources for game ${gameId}`);
}
