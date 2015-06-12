define([
    'backbone'
], function (Backbone) {
    var ProjectCategoryModel = Backbone.Model.extend({
        'idAttribute': '_id',
        'urlRoot': '/api/project/category',
        initialize: function () {}
    });
    return ProjectCategoryModel;
});