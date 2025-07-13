// import { createServer } from "node:http";
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

// const server = createServer(onRequest);
// server.listen(port, hostname, onServerStart);

// function onRequest(req, res) {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.setHeader("Access-Control-Allow-Origin", "*");

//   const gameId = crypto.randomUUID();

//   // res.end(isReady.toString());
//   res.end(gameId);
// }

// function onServerStart() {
//   console.log(`Server running at http://${hostname}:${port}/`);
// }
