define([
    'jquery', 'underscore', 'backbone', 'views/BaseView', 'models/ProjectApiCollection'
], function ($, _, Backbone, BaseView, ProjectApiCollection) {
    var ProjectCategoryContainerView = BaseView.extend({
        'className': 'project-category-container',
        onInitialize: function (options) {
            var _self = this;
            this.options = options;
        },
        render: function () {
            var _self = this;

            return this;
        }
    });
    return ProjectCategoryContainerView;
});