/* This is an optional handler to add your http controller methods in if there's
a lot of repetition */

const AppError = require('./appError');

// for deleting
exports.deleteOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    return next(new AppError(err, 400));
  }
};
