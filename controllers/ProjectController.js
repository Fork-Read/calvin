var async = require('async'),
    changeCase = require('change-case'),
    ProjectModel = require('../models/ProjectModel'),
    UserModel = require('../models/UserModel'),
    UserProjectModel = require('../models/UserProjectMappingModel');

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

            var newMapping = new UserProjectModel({
                'user_id': user_id,
                'project_id': project._id,
                'isOwner': true,
                'canEdit': true
            });

            newMapping.save(function (err, mapping) {
                if (err) return console.error(err);
                callback(project);
            });
        });
    },
    getAllProjects: function (user, callback) {
        var projectArray = [];
        UserProjectModel.find({
            'user_id': user
        }, function (err, projectmappings) {
            if (err) return console.error(err);
            async.each(projectmappings,
                // 2nd param is the function that each item is passed to
                function (mapping, next) {
                    ProjectModel.findById(mapping.project_id, function (err, projectDetails) {
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
                    callback({
                        'newCategory': categoryData.category
                    });
                });

            } else {
                callback(project);
            }
        });
    }
}

module.exports = ProjectController;