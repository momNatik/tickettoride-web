const gameApi = "http://127.0.0.1:3001"

async function queueCheckGameResourcesStatus(gameId) {
  const statuseCheckPeriod = 1000;
  await new Promise((_) => setTimeout(_, statuseCheckPeriod));
  await checkGameResourcesStatus(gameId);
}

async function checkGameResourcesStatus(gameId) {
  let response = await fetch(`${gameApi}/gamestatus/${gameId}`);

  if (response.status === 200) {
    const body = await response.json();
    const isReady = JSON.parse(body);

    if (isReady) {
      initGame(gameId);
      return;
    }

    await queueCheckGameResourcesStatus(gameId);
  }

  if (response.status === 502) {
    await checkGameResourcesStatus();
    return;
  }

  redirectToErrorPage();
}

function initGame(gameId) {
    const mapBackgroundImage = getElementById('mapBackgroundImage');
    mapBackgroundImage.src = `gameresources/${gameId}/mapbackgroundimage`;
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productName = urlParams.get('product');

checkGameResourcesStatus('abd');
