var mongoose = require('mongoose');

var mappingSchema = mongoose.Schema({
    user_id: String,
    project_id: String,
    isOwner: Boolean,
    canEdit: Boolean
});

module.exports = mongoose.model('User_Project_Mapping', mappingSchema);