import express from "express";
// import crypto from "crypto";
import cors from "cors";

const hostname = "127.0.0.1";
const port = 3001;
// const corsOptions = {
//   origin: ["http://localhost:5500"],
// };

const app = express();

app.use(cors());
app.use(express.json());

app.get("/gamestatus/:id", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "text/plain");
  const id = req.params.id;
  const isReady = Math.random() * 10 < 1;
  res.end(isReady.toString());
});

app.listen(port, () => console.log("Сервер ожидает подключения..."));

//   const gameId = crypto.randomUUID();
//   res.end(gameId);