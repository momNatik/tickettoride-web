import express from "express";
import path from "path";
import { handlePostPlay } from "./js/play.mjs";

const __dirname = import.meta.dirname;

const app = express();
const port = process.env.PORT;
const __wwwroot = path.join(__dirname, "wwwroot");


const urlencodedParser = express.urlencoded({extended: false});

app.use(express.static(__wwwroot));

app.post("/play.html", urlencodedParser, handlePostPlay);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


console.log("dirname == " + __dirname);
console.log(`port = ${port}`);