import express from "express";
import cors from "cors";

const hostname = "127.0.0.1";
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
  const isReady = Math.random() * 10 < 1;
  res.end(isReady.toString());
});

app.listen(port, () => console.log("Game API waiting for connections..."));
