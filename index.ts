import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/short", (req, res) => {
  res.send("short url");
});

app.listen(3000, () => {
  console.log("Server started!");
});
