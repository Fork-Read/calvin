define([
    'backbone'
], function (Backbone) {
    var ProjectApiModel = Backbone.Model.extend({
        'idAttribute': '_id',
        'urlRoot': '/api/routes',
        initialize: function () {}
    });
    return ProjectApiModel;
});