var ProjectModel = require('../models/ProjectModel'),
    UserModel = require('../models/UserModel');

var ProjectController = {
    saveUserProject: function (user_id, projectDetails, callback) {

        var newProject = new ProjectModel({
            'name': projectDetails.name,
            'description': projectDetails.description,
            'github_url': projectDetails.github_url,
            'website': projectDetails.website
        });

        newProject.save(function (err, project) {
            if (err) return console.error(err);

            UserModel.findById(user_id, function (err, user) {
                if (err) return console.error(err);

                user.projects.push({
                    'id': project._id,
                    'isOwner': true
                });

                user.update({
                    'projects': user.projects
                }, function (err, user) {
                    if (err) return console.error(err);
                    callback(project);
                });
            });
        });
    }
}

module.exports = ProjectController;