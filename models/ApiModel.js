var mongoose = require('mongoose');

var apiSchema = mongoose.Schema({
    category_id: String,
    url: String,
    type: String,
    sentData: String,
    responseData: String,
    description: String,
});

module.exports = mongoose.model('Api', apiSchema);