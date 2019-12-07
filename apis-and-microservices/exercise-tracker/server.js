const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var dotenv = require('dotenv');

dotenv.config();

mongoose.connect(
  process.env.MONGOLAB_URI || "mongodb://localhost/exercise-track",
  err => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Database connection successful!");
    }
  }
);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    exercises: [{ type: Schema.Types.ObjectId, ref: "Exercise" }]
  }
);

const exerciseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date }
});

const User = mongoose.model("User", userSchema);
const Exercise = mongoose.model("Exercise", exerciseSchema);

// POST /api/exercise/new-user
app.post("/api/exercise/new-user/", (req, res) => {
  const { username } = req.body;
  User.findOne({ username }, (err, data) => {
    if (err) console.log(err);

    if (data) {
      res.send("username taken!");
    } else {
      console.log({ username });
      const newUser = new User({ username });
      newUser.save(err => {
        if (err) console.log(err);
      });
      res.json(newUser);
    }
  });
});

// POST /api/exercise/add
app.post("/api/exercise/add", (req, res) => {
  const { userId, description, duration, date } = req.body;

  const newExercise = new Exercise({
    user: userId,
    description,
    duration,
    date
  });

  newExercise.save(err => {
    if (err) console.log(err);
  });
  res.json({ exercise: newExercise.populate("user") });
});

// GET /api/exercise/log?{userId}[&from][&to][&limit]
app.get("/api/exercise/log", (req, res) => {
  const { userId, from, to, limit } = req.query;
  User.findOne({ _id: userId }, (err, userDoc) => {
    if (err) res.send(err.message);
    const { username } = userDoc;
    Exercise.find({ user: userDoc._id }, (err, exercisesDoc) => {
      if (err) res.send(err.message);
      const log = exercisesDoc.map(ex => {
        const { description, duration, date } = ex;
        return {
          description,
          duration,
          date
        };
      });
      res.json({
        _id: userId,
        username: username,
        count: exercisesDoc.length,
        log
      });
    });
  });
});

// Not found middleware
app.use((req, res, next) => {
  return next({ status: 404, message: "not found" });
});

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage;

  if (err.errors) {
    // mongoose validation error
    errCode = 400; // bad request
    const keys = Object.keys(err.errors);
    // report the first validation error
    errMessage = err.errors[keys[0]].message;
  } else {
    // generic or custom error
    errCode = err.status || 500;
    errMessage = err.message || "Internal Server Error";
  }
  res
    .status(errCode)
    .type("txt")
    .send(errMessage);
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
