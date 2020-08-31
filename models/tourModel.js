const mongoose = require("mongoose")
const slugify = require("slugify")
const validator = require("validator")

//schema to enforce rules for model
const tourSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			require: [true, "A city must have a name"],
			unique: true,
			maxlength: [40, "City must have less or equal then 40 characters"],
			minlength: [5, "City must have more than 10 characters"],
			validate: [validator.isAlpha, "City name must contain characters only!"],
		},
		duration: {
			type: Number,
			required: [true, "A tour must have a duration!"],
		},
		groupSize: {
			type: Number,
			required: [true, "A tour must have a group size"],
		},
		difficulty: {
			type: String,
			required: [true, "A tour must have a difficulty"],
			enum: {
				values: ["easy", "medium", "difficult"],
				message: "Difficulty is either: easy, medium or difficult",
			},
		},
		ratingsAverage: {
			type: Number,
			default: 2.5,
			min: [1, "Rating must be above 1.0"],
			max: [5, "Rating must be below 5.0"],
		},
		ratingsQuantity: {
			type: Number,
			default: 0,
		},
		price: {
			type: Number,
			required: [true, "A tour must have a price."],
		},
		priceDiscount: {
			type: Number,
			validate: {
				validator: function (val) {
					// This only points to current doc on new document creation.
					return val < this.price //100 < 200; price discount should be lower
				},
				message: "Discount price ({VALUE}) should be below regular price!",
			},
		},
		summary: {
			type: String,
			trim: true,
			required: [true, "A tour must have a description"],
		},
		description: {
			type: String,
			trim: true,
		},
		imageCover: {
			type: String,
			required: [true, "Add at least one picture!"],
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
)

// ---------- VIRTUAL METHODS --------- //
tourSchema.virtual("durationWeeks").get(function () {
	return this.duration / 7
})

// -------- DOC MIDDLEWARE: RUNS BEFORE .SAVE() AND .CREATE() //
tourSchema.pre("save", function (next) {
	this.slug = slugify(this.name, { lower: true })
	next()
})

// ------- QUERY MIDDLEWARE: RUNS BEFORE QUERY CALLS -- //
// as soon as you hit this route, you can chain a method in between it
tourSchema.pre("find", function (next) {
	next()
})

// ------ AGGREGATION MIDDLEWARE -- //
//none

const Tour = mongoose.model("Tour", tourSchema)

module.exports = Tour
