import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import moviesRouter from "./routes//movies.router.js";

const app = express();
var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors(corsOptions));

const CONNECTION_URL = "mongodb://localhost:27017/MovieStore";
const PORT = process.env.PORT || 5000;

// mongoose
//   .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
//   .catch((error) => console.log(`${error} did not connect`));

// mongoose.set("useFindAndModify", false);

app.use("/movies", moviesRouter);

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

app.listen(PORT, (error) => {
  if (!error) console.log(`Server Running on Port: http://localhost:${PORT}`);
  else console.log(`${error} did not connect`);
});
