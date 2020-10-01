const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const db = require("./models/model");
const path = require("path");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// -------- html routes --------
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "stats.html"));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "exercise.html"));
});

// -------- api routes --------

// sorts docs by day then finds only the first one (i.e. gets the most recent entry)
app.get("/api/workouts", (req, res) => {
  db.Workout.find({}).sort({ day: -1 }).limit(1)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// gets last 7 workouts (assumed 1-week range based on buildout of charts)
app.get("/api/workouts/range", (req,res) => {
  db.Workout.find({}).sort({ day: -1 }).limit(7)
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });
});

// updates the most recent workout by adding a new exercise
app.put("/api/workouts/:id", (req,res) => {
  db.Workout.updateOne( {_id: req.params.id }, {$push: {exercises: [
    {
      type: req.body.type,
      name: req.body.name,
      weight: req.body.weight,
      sets: req.body.sets,
      reps: req.body.reps,
      duration: req.body.duration,
      distance: req.body.distance
    }
  ]}
}).then(dbWorkout => {
  console.log(dbWorkout)
  res.json(dbWorkout);
})
.catch(err => {
  res.json(err)
});
});

// creates a new workout
app.post("/api/workouts", (req,res) => {
  db.Workout.create(req.body).then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err)
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});