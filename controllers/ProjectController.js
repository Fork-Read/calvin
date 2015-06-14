var async = require('async'),
    changeCase = require('change-case'),
    ProjectModel = require('../models/ProjectModel'),
    UserModel = require('../models/UserModel'),
    UserProjectModel = require('../models/UserProjectMappingModel'),
    ApiCategoryModel = require('../models/ApiCategoryModel');

var ProjectController = {
    saveUserProject: function (user_id, projectDetails, callback) {

        var newProject = new ProjectModel({
            'name': changeCase.titleCase(projectDetails.name),
            'description': projectDetails.description,
            'github_url': projectDetails.github_url,
            'website': projectDetails.website,
            'setup_instructions': ''
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
    getProjectCategories: function (user, project, callback) {

        UserProjectModel.findOne({
            'user_id': user,
            'project_id': project
        }, function (err, projectMapping) {
            if (err) return console.error(err);
            if (projectMapping) {
                ApiCategoryModel.find({
                    'project_id': project
                }, function (err, categoryList) {
                    if (err) return console.error(err);
                    callback(categoryList);
                });
            } else {
                callback([]);
            }
        });
    },
    getCategory: function (user, projectId, categoryName, callback) {
        ApiCategoryModel.findOne({
            'project_id': projectId,
            'name': categoryName
        }, function (err, category) {
            if (err) return console.error(err);
            callback(category);
        });
    },
    addCategory: function (user, category, callback) {

        category.name = changeCase.pascalCase(category.name);

        ApiCategoryModel.findOne({
            'project_id': category.projectId,
            'name': category.name
        }, function (err, categoryItem) {
            if (err) return console.error(err);

            if (!categoryItem) {
                var newCategory = new ApiCategoryModel({
                    'project_id': category.projectId,
                    'name': category.name,
                    'base_url': category.baseUrl,
                    'description': category.description
                });

                newCategory.save(function (err, savedCategory) {
                    if (err) return console.error(err);
                    callback(savedCategory);
                });
            } else {
                callback(null);
            }
        });
    }
}

module.exports = ProjectController;