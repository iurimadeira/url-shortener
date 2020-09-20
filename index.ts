import express from "express";
import mongoose from "mongoose";
const app = express();
import { IShortURL, ShortURL } from "./models/short_url";

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const shortUrls = await ShortURL.find();
  res.render("index", { shortUrls: shortUrls });
});

app.post("/short", async (req, res) => {
  const full: string = req.body.full;
  const shortUrl = new ShortURL({
    full: full,
  });

  console.log("URL requested: ", full);

  await shortUrl.save((err, shortened) => {
    if (err) return console.log(err);
    console.log("ShortURL save to urls collection!");
  });

  res.redirect("/");
});

app.get("/:shortid", async (req, res) => {
  const shortId = req.params.shortid;
  console.log(`Requesting redirect for ${shortId}...`);
  const shortUrl = await ShortURL.findOne({ short: shortId });

  if (!shortUrl) return res.sendStatus(404);

  shortUrl.clicks += 1;
  shortUrl.save();

  res.redirect(301, shortUrl.full);
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
