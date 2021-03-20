const Contact = require('../models/contactModel');
const factoryHandler = require('../utils/factoryHandler');

exports.postMessage = factoryHandler.createOne(Contact);
exports.getAllMessages = factoryHandler.getAll(Contact);
