var mongoose = require('mongoose'),
    findOneOrCreate = require('mongoose-find-one-or-create');

var userSchema = mongoose.Schema({
    name: String,
    email: String,
    contactNo: String,
    pictureUrl: String,
    isOrganisation: Boolean,
    projects: Array,
    providerId: String
});

userSchema.plugin(findOneOrCreate);

module.exports = mongoose.model('User', userSchema);