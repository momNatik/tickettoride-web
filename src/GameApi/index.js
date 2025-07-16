import express from "express";
import cors from "cors";
import { initGame } from "./js/game.mjs";
import path from "path";
import fs from "node:fs/promises";
import { getGameResourceLocalPath } from "./js/common.mjs";

const port = process.env.PORT;

const corsOptions = {
  origin: ["http://localhost:3000"],
};


const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.get("/gamestatus/:id", async (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  const id = req.params.id;
  const isReady = Math.random() * 8 < 1;

  if (isReady) {
    initGame(id);
  }

  res.end(isReady.toString());
});

app.get("/games/:gameId/resources/mapbackgroundimage", async (req, res) => {
  res.setHeader("Content-Type", "image/png");

  const gameId = req.params.gameId;
  const imageLocalPath = getGameResourceLocalPath(gameId, 'mapbackgroundimage');
  const image = await fs.readFile(imageLocalPath);

  res.end(image);
});

app.listen(port, () => console.log("Game API waiting for connections..."));
