import path from "path";

const __dirname = path.join(import.meta.dirname, "../");

export const MapBackgroundImageResourceId = "mapbackgroundimage";
export const FileStorePath = path.join(__dirname, "file_store");

export function getGameResourcesLocalPath(gameId) {
  return path.join(FileStorePath, `${gameId}`);
}

export function getGameResourceLocalPath(gameId, resourceId) {
  const gameResourcesLocalPath = getGameResourcesLocalPath(gameId);
  const resourceFileName = mapResourceIdToFileName(resourceId);
  return path.join(gameResourcesLocalPath, `${resourceFileName}`);
}

function mapResourceIdToFileName(resourceId) {
  const resourceIdLowerCase = resourceId.toLowerCase();

  switch (resourceIdLowerCase) {
    case MapBackgroundImageResourceId:
      return "map_background_image.png";
    default:
      throw `Can't map to local file name. Unknown Game Resource Id '${resourceId}'`;
  }
}
