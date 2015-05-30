var async = require('async'),
    changeCase = require('change-case'),
    ProjectModel = require('../models/ProjectModel'),
    UserModel = require('../models/UserModel');

var ProjectController = {
    saveUserProject: function (user_id, projectDetails, callback) {
        var newProject = new ProjectModel({
            'name': changeCase.titleCase(projectDetails.name),
            'description': projectDetails.description,
            'github_url': projectDetails.github_url,
            'website': projectDetails.website,
            'setup_instructions': '',
            'api_categories': []
        });

        newProject.save(function (err, project) {
            if (err) return console.error(err);

            UserModel.findById(user_id, function (err, user) {
                if (err) return console.error(err);

                user.projects.push({
                    'id': project._id,
                    'isOwner': true,
                    'canEdit': true
                });

                user.update({
                    'projects': user.projects
                }, function (err, user) {
                    if (err) return console.error(err);
                    callback(project);
                });
            });
        });
    },
    getAllProjects: function (user, callback) {
        var projectArray = [];
        UserModel.findById(user, function (err, user) {
            if (err) return console.error(err);
            async.each(user.projects,
                // 2nd param is the function that each item is passed to
                function (project, next) {
                    ProjectModel.findById(project.id, function (err, projectDetails) {
                        if (err) return console.error(err);
                        projectArray.push(projectDetails);
                        next();
                    });
                },
                function (err) {
                    callback(projectArray);
                }
            );
        });
    },
    getProject: function (user, projectId, callback) {
        ProjectModel.findById(projectId, function (err, project) {
            if (err) return console.error(err);
            callback(project);
        });
    },
    updateProject: function (user, projectId, projectData, callback) {
        ProjectModel.findById(projectId, function (err, project) {
            if (err) return console.error(err);
            project.name = changeCase.titleCase(projectData.name);
            project.description = projectData.description;
            project.github_url = projectData.github_url;
            project.website = projectData.website;
            project.setup_instructions = projectData.setup_instructions;
            project.api_categories = projectData.api_categories;
            ProjectModel.findOneAndUpdate({
                '_id': projectId
            }, project, function (err, project) {
                if (err) return console.error(err);
                callback(project);
            });
        });
    },
    addCategory: function (user, categoryData, callback) {
        categoryData.category = changeCase.titleCase(categoryData.category);

        ProjectModel.findById(categoryData.projectId, function (err, project) {
            if (err) return console.error(err);

            if (project.api_categories.indexOf(categoryData.category) === -1) {
                project.api_categories.push(categoryData.category);

                ProjectModel.update({
                    '_id': categoryData.projectId
                }, {
                    'api_categories': project.api_categories
                }, function (err, numAffected) {
                    if (err) return console.error(err);
                    console.log(project);
                    callback(project);
                });

            } else {
                callback(project);
            }
        });
    }
}

module.exports = ProjectController;