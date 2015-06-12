define([
    'backbone'
], function (Backbone) {
    var ProjectApiModel = Backbone.Model.extend({
        'idAttribute': '_id',
        'urlRoot': '/api/project',
        initialize: function () {}
    });
    return ProjectApiModel;
});