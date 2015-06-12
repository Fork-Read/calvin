define([
    'backbone', 'models/ProjectCategoryModel'
], function (Backbone, ProjectCategoryModel) {
    var ProjectCategoryCollection = Backbone.Collection.extend({
        'url': '/api/project/category/all',
        'model': ProjectCategoryModel
    });
    return ProjectCategoryCollection;
});