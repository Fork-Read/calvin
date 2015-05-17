define([
    'backbone'
], function (Backbone) {
    var ProjectModel = Backbone.Model.extend({
        'idAttribute': '_id',
        'url': '/api/project',
        initialize: function () {}
    });
    return ProjectModel;
});