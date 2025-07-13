import express from "express";
import path from "path";
const __dirname = import.meta.dirname;
console.log("dirname == " + __dirname);

const app = express();
const port = 3000;


app.use(express.static(path.join(__dirname, "wwwroot")));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
