define([
    'backbone'
], function (Backbone) {
    var ProjectModel = Backbone.Model.extend({
        'idAttribute': '_id',
        'urlRoot': '/api/project',
        initialize: function () {}
    });
    return ProjectModel;
});