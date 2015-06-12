define([
    'jquery', 'underscore', 'backbone', 'views/BaseView'
], function ($, _, Backbone, BaseView) {
    var ProjectApiListView = BaseView.extend({
        'className': 'project-api-list',
        onInitialize: function (options) {
            var _self = this;
            this.options = options;
        },
        render: function () {
            var _self = this;

            return this;
        }
    });
    return ProjectApiListView;
});