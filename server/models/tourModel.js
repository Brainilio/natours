const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

//schema to enforce rules for model
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'A city must have a name'],
      unique: true,
      maxlength: [40, 'City must have less or equal then 40 characters'],
      minlength: [5, 'City must have more than 10 characters'],
      // FIXME: THIS VALIDATOR DOESNT WORK WITH SPACES ETC
      // validate: [validator.isAlpha, "City name must contain characters only!"],
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
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium or difficult',
      },
    },
    startLocation: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    ratingsAverage: {
      type: Number,
      default: 2.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price.'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // This only points to current doc on new document creation.
          return val < this.price; //100 < 200; price discount should be lower
        },
        message: 'Discount price ({VALUE}) should be below regular price!',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
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
    //child referencing in mongoose
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// create new index with price in ascending order and ratingsaverage in descending order
tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ startLocation: '2dsphere' });

// ---------- VIRTUAL METHODS --------- //
// upon retrieving you'll add this to your json object, you can't touch/manipulate it tho
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

//virtual method to reference child instead of doing it in the model
tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id',
});

// -------- DOC MIDDLEWARE: RUNS BEFORE .SAVE() AND .CREATE() //

//before creating a new tour, add a slug to it
// FIXME: Doesn't work for updating models only creating
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// populate the guides with the guides you find
tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt -role',
  });
  next();
});

// ------- QUERY MIDDLEWARE: RUNS BEFORE QUERY CALLS -- //
// as soon as you hit this route, you can chain a method in between it
// you can add some methods before finding
tourSchema.pre('find', function (next) {
  next();
});

// ------ AGGREGATION MIDDLEWARE -- //
//none

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
