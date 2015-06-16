var mongoose = require('mongoose');

var apiSchema = mongoose.Schema({
    category_id: String,
    url: String,
    type: String,
    queryParams: Array, // String Array
    postData: String, // JSON String
    response: String, // JSON String
    description: String,
});

module.exports = mongoose.model('Api', apiSchema);