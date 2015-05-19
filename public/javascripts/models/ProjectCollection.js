define([
    'backbone', 'models/ProjectModel'
], function (Backbone, ProjectModel) {
    var ProjectCollection = Backbone.Collection.extend({
        'url': '/api/project/all',
        'model': ProjectModel
    });
    return ProjectCollection;
});