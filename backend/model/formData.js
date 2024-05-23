const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({}, { strict: false });

const FormDataModel = mongoose.model('FormData', formDataSchema);

exports.FormDataModel = FormDataModel;