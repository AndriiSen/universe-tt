import express, { Request, Response } from "express";
const app = express();
const generatePlayer = require("./services/PlayersService");

const port = 8000;

app.get("/", (req: Request, res: Response) => {
  console.log("client connected");
  res.setHeader("Content-type", "text/event-stream");
  res.setHeader("Access-Control-Allow-Origin", "*");

  const intervalId = setInterval(() => {
    const player = generatePlayer();
    res.write(`data: ${JSON.stringify(player)}\n\n`);
  }, 3000);

  res.on("close", () => {
    console.log("Client closed connection");
    clearInterval(intervalId);
    res.end();
  });
});

app.listen(port, () => {
  console.log(`Server runing on port ${port}`);
});
