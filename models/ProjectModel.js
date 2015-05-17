var mongoose = require('mongoose');

var projectSchema = mongoose.Schema({
    name: String,
    description: String,
    github_url: String,
    website: String
});

module.exports = mongoose.model('Project', projectSchema);