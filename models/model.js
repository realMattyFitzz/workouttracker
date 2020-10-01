const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now,
    },
    exercises: [
      {
        type: {
          type: String,
          trim: true,
          required: true,
        },
        name: {
          type: String,
          trim: true,
          required: true,
        },
        duration: {
          type: Number,
          default: 0,
        },
        weight: {
          type: Number,
          default: 0,
        },
        reps: {
          type: Number,
          default: 0,
        },
        sets: {
          type: Number,
          default: 0,
        },
        distance: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  { toJSON: { virtuals: true } }
);

// adds a dynamically-created property to schema
WorkoutSchema.virtual("totalDuration").get(function () {
  // "reduce" array of exercises down to just the sum of their durations
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;