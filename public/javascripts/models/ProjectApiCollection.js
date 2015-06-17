define([
    'backbone', 'models/ProjectApiModel'
], function (Backbone, ProjectApiModel) {
    var ProjectApiCollection = Backbone.Collection.extend({
        'url': '/api/routes/project/category',
        'model': ProjectApiModel
    });
    return ProjectApiCollection;
});