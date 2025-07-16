import fs from "node:fs";
import path from "path";

import {
  getGameResourcesLocalPath,
  getGameResourceLocalPath,
  MapBackgroundImageResourceId,
  FileStorePath
} from "./common.mjs";

export function initGame(id) {
  createGameResourcesFolder(id);
  createGameResources(id);
}

function createGameResourcesFolder(gameId) {
  const gameResourcesLocalPath = getGameResourcesLocalPath(gameId);

  try {
    if (!fs.existsSync(gameResourcesLocalPath)) {
      fs.mkdirSync(gameResourcesLocalPath);
    }
  } catch (err) {
    console.error(err);
  }
}

function createGameResources(gameId) {
  const imageFileName = "map_background_image.png";
  const sourceImagePath = path.join(FileStorePath, imageFileName);
    
  const destinationImagePath = getGameResourceLocalPath(
    gameId,
    MapBackgroundImageResourceId
  );

  fs.copyFile(sourceImagePath, destinationImagePath, (err) => {
    if (err) throw err;
    console.log(`'${sourceImagePath}' was copied to '${destinationImagePath}'`);
  });
}
