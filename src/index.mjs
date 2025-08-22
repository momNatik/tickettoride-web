import express from "express";
import path from "path";
import { handlePostPlay } from "./js/play.mjs";
import LOGGING from "../tickettoride-backend-common/src/logging/log.mjs";

LOGGING.ShowStartInfo("WEB_NAME");

const __dirname = import.meta.dirname;
const __wwwroot = path.join(__dirname, "wwwroot");

const port = process.env.WEB_PORT;
const apiUrl = process.env.API_URL;
const gameApiUrl = process.env.GAME_API_URL;

const app = express();

const urlencodedParser = express.urlencoded({ extended: false });

app.set("view engine", "ejs");
app.set("views", "./wwwroot");

app.use(express.static(__wwwroot));

app.post("/play.html", urlencodedParser, handlePostPlay);
app.get("/game/:id", async (req, res) => {
  const gameId = req.params.id;

  console.log(`Call init game '${gameId}'`);
  await fetch(`${gameApiUrl}/${gameId}/init`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(`Init game requested.`);

  res.render("game.ejs", { gameId });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

console.log("dirname: " + __dirname);
console.log(`WEB_PORT: ${port}`);
console.log(`API_URL: ${apiUrl}`);
