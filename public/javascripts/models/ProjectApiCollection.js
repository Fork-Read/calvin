define([
    'backbone', 'models/ProjectApiModel'
], function (Backbone, ProjectApiModel) {
    var ProjectApiCollection = Backbone.Model.extend({
        'url': '/api/routes/project/category',
        'model': ProjectApiModel
    });
    return ProjectApiCollection;
});