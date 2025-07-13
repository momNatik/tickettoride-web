import { createServer } from "node:http";

const hostname = "127.0.0.1";
const port = 3001;

const server = createServer(onRequest);
server.listen(port, hostname, onServerStart);

function onRequest(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Access-Control-Allow-Origin", "*");

  const isReady = Math.random() * 10 < 1;

  res.end(isReady.toString());
}

function onServerStart() {
  console.log(`Server running at http://${hostname}:${port}/`);
}
