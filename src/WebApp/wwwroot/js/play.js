const MapBackgroundImageResourceId = 'mapBackgroundImage';

async function queueCheckGameResourcesStatus(gameId) {
  const statuseCheckPeriod = 1000;
  await new Promise((_) => setTimeout(_, statuseCheckPeriod));
  await checkGameResourcesStatus(gameId);
}

async function checkGameResourcesStatus(gameId) {
  let response = await fetch(`${__gameApiUrl}/gamestatus/${gameId}`);

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
    const mapBackgroundImage = document.getElementById('mapBackgroundImage');
    mapBackgroundImage.src = `${__gameApiUrl}/games/${gameId}/resources/${MapBackgroundImageResourceId}`;
}

checkGameResourcesStatus(__gameId);
