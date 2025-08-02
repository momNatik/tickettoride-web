import express from "express";
import path from "path";
import { handlePostPlay } from "./js/play.mjs";

const __dirname = import.meta.dirname;
const __wwwroot = path.join(__dirname, "wwwroot");

const port = process.env.PORT;
const apiUrl = process.env.GAME_API_URL;

const app = express();

const urlencodedParser = express.urlencoded({ extended: false });

app.set("view engine", "ejs");
app.set("views", "./wwwroot");

app.use(express.static(__wwwroot));

app.post("/play.html", urlencodedParser, handlePostPlay);
app.get("/game/:id", (req, res) => {
  res.render('game.ejs', {
    gameId: req.params.id
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

console.log("dirname: " + __dirname);
console.log(`PORT: ${port}`);
console.log(`GAME_API_URL: ${apiUrl}`);
