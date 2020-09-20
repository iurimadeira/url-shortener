import express from "express";
import mongoose from "mongoose";
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { name: "Iuri" });
});

app.get("/short", (req, res) => {
  const db = mongoose.connection.db;
  db.collection("test")
    .insertOne({ fooBarTest: "completed" })
    .then(
      () => {
        console.log("Created test document!");
      },
      (err) => {
        console.log(err);
      }
    );

  res.send({ ok: 1 });
});

mongoose
  .connect("mongodb://localhost", {
    user: process.env.MONGODB_USER,
    pass: process.env.MONGODB_PASS,
    dbName: "url-shortener",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    (success) => {
      console.log(`Connected to MongoDB (${success.connections[0].name})`);
    },
    (err) => {
      console.log(err);
    }
  );

mongoose.connection.on("open", async () => {
  app.listen(process.env.PUBLIC_PORT, () => {
    console.log("Server started!");
  });
});
