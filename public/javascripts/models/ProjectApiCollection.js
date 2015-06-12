define([
    'backbone', 'models/ProjectApiModel'
], function (Backbone, ProjectApiModel) {
    var ProjectApiCollection = Backbone.Model.extend({
        'url': '/api/project/category/api',
        'model': ProjectApiModel
    });
    return ProjectApiCollection;
});