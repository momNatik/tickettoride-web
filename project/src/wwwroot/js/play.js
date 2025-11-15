const MapBackgroundImageResourceId = 'background';
const MapTopologyResourceId = 'topology';

async function queueCheckGameResourcesStatus(gameId) {
  const statuseCheckPeriod = 1000;
  await new Promise((_) => setTimeout(_, statuseCheckPeriod));
  await checkGameResourcesStatus(gameId);
}

async function checkGameResourcesStatus(gameId) {
  let response = await fetch(`${__gameApiUrl}/games/${gameId}/status`);

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
    setSrcToMapResourceId('mapBackgroundImage', gameId, MapBackgroundImageResourceId);
    setSrcToMapResourceId('mapTopology', gameId, MapTopologyResourceId);
}

function setSrcToMapResourceId(elementId, gameId, mapResourceId) {
    const element = document.getElementById(elementId);
    element.src = `${__gameApiUrl}/games/${gameId}/maps/${mapResourceId}`;
}

checkGameResourcesStatus(__gameId);
