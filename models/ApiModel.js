var mongoose = require('mongoose');

var apiSchema = mongoose.Schema({
    name: String,
    description: String,
    github_url: String,
    website: String,
    setup_instructions: String,
    api_categories: Array
});

module.exports = mongoose.model('Api', apiSchema);