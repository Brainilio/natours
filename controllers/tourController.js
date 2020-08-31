const Tour = require("../models/tourModel")

// ----------- Middleware METHODS -------------- //
// Write any middleware functions in here

exports.aliasTopTours = (req, res, next) => {
	req.query.limit = "5"
	req.query.fields = "name,price,ratingsAverage,summary,difficulty"
	console.log(req.query)
	next()
}
// ------------ HTTP METHODS --------------- //

exports.getAllTours = async (req, res) => {
	try {
		// BUILD QUERY
		// 1A) Filtering
		// eslint-disable-next-line node/no-unsupported-features/es-syntax
		const queryObj = { ...req.query }
		const excludedFields = ["page", "sort", "limit", "fields"]
		excludedFields.forEach((el) => delete queryObj[el])

		// 1B) Advanced filtering - change gte to $gte
		let queryStr = JSON.stringify(queryObj)
		queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (word) => `$${word}`)

		let query = Tour.find(JSON.parse(queryStr))

		// 2) Sorting TODO: FIX THIS

		if (req.query.sort) {
			const sortBy = req.query.sort.split(",").join(" ")
			query = query.sort({ [sortBy]: 1 })
		} else {
			query = query.sort("-createdAt")
		}

		// 3) field limiting
		if (req.query.fields) {
			const fields = req.query.fields.split(",").join(" ")
			query = query.select(fields)
		} else {
			query = query.select("-__v")
		}

		// 4) Pagination
		const page = +req.query.page || 1
		const limit = +req.query.limit || 100
		const skip = (page - 1) * limit
		query = query.skip(skip).limit(limit)

		if (req.query.page) {
			const numTours = await Tour.countDocuments()
			if (skip >= numTours) throw new Error("This page does not exist")
		}

		// EXEC QUERY
		const tours = await query

		// SEND RESP
		res.status(200).json({
			status: "success",
			data: {
				tours,
			},
		})
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: err,
		})
	}
}

exports.getTour = async (req, res) => {
	try {
		const tour = await Tour.findById(req.params.id)
		res.status(200).json({
			status: "success",
			data: tour,
		})
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: err,
		})
	}
}

exports.updateTour = async (req, res) => {
	try {
		const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		})

		res.status(200).json({
			status: "success",
			data: {
				tour,
			},
		})
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: err,
		})
	}
}

exports.createTour = async (req, res) => {
	try {
		const newTour = await Tour.create(req.body)
		res.status(201).json({
			status: "success",
			data: {
				tour: newTour,
			},
		})
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message: err,
		})
	}
}

exports.deleteTour = async (req, res) => {
	try {
		await Tour.findByIdAndDelete(req.params.id)

		res.status(204).json({
			status: "success",
			data: null,
		})
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message: err,
		})
	}
}

// ----------- AGGREGATION PIPELINE METHODS ------------ //

exports.getTourStats = async (req, res) => {
	try {
		const stats = await Tour.aggregate([
			{
				$match: { ratingsAverage: { $gte: 4.5 } },
			},
			{
				$group: {
					_id: { $toUpper: "$difficulty" },
					numTours: { $sum: 1 },
					numRatings: { $sum: "$ratingsQuantity" },
					avgRating: { $avg: "$ratingsAverage" },
					avgPrice: { $avg: "$price" },
					minPrice: { $min: "$price" },
					maxPrice: { $max: "$price" },
				},
			},
			{
				$sort: {
					avgPrice: 1,
				},
			},
		])

		res.status(200).json({
			status: "success",
			data: stats,
		})
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message: err,
		})
	}
}

exports.getMonthlyPlan = async (req, res) => {
	try {
		const year = +req.params.year // 2021
		const plan = await Tour.aggregate([
			{
				$unwind: "$startDates",
			},
			{
				$match: {
					startDates: {
						$gte: new Date(`${year}-01-01`),
						$lte: new Date(`${year}-12-31`),
					},
				},
			},
			{
				$group: {
					_id: { $month: "$startDates" },
					numTourStarts: { $sum: 1 },
					tours: { $push: "$name" },
				},
			},
			{
				$addFields: { month: "$_id" },
			},
			{
				$project: {
					_id: 0,
				},
			},
			{
				$sort: { numTourStarts: -1 },
			},
			{
				$limit: 5,
			},
		])

		res.status(200).json({
			message: "success",
			data: plan,
		})
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message: err,
		})
	}
}
