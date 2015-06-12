var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
    project_id: String,
    name: String,
    base_url: String,
    description: String
});

module.exports = mongoose.model('ApiCategory', categorySchema);