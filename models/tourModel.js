const mongoose = require('mongoose');
const slugify = require('slugify');

//schema to enforce rules for model
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'A tour must have a name'],
      unique: true,
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration!'],
    },
    groupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
    },
    ratingsAverage: {
      type: Number,
      default: 2.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price.'],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'Add at least one picture!'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date],
    slug: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ---------- VIRTUAL METHODS --------- //
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// -------- DOC MIDDLEWARE: RUNS BEFORE .SAVE() AND .CREATE() //
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// ------- QUERY MIDDLEWARE: RUNS BEFORE QUERY CALLS -- //
// as soon as you hit this route, you can chain a method in between it
tourSchema.pre('find', function (next) {
  next();
});

// ------ AGGREGATION MIDDLEWARE -- //

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
