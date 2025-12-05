import express from "express";
import session from 'express-session';
import path from "path";
import { handlePostPlay } from "./js/play.js";
import LOGGING from "@common/logging/log.js";

LOGGING.ShowStartInfo("WEB_NAME");

const __dirname = import.meta.dirname;
const __wwwroot = path.join(__dirname, "wwwroot");
const __views = path.join(__dirname, "views");

const port = process.env.WEB_PORT;
const apiUrl = process.env.API_URL;

const app = express();

const urlencodedParser = express.urlencoded({ extended: false });
app.use(express.json());

app.use(session({
  secret: 'my-super-secret-key-123',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.set("view engine", "ejs");
app.set("views", __views);

app.use(express.static(__wwwroot));


app.post("/play.html", urlencodedParser, handlePostPlay);
app.get("/game/:id", async (req, res) => {
  const gameId = req.params.id;
  const params = req.session.gameParams;

  console.log(`Call init game '${gameId}'`);

  res.render("game", { gameId, ...params });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

console.log("dirname: " + __dirname);
console.log(`WEB_PORT: ${port}`);
console.log(`API_URL: ${apiUrl}`);
