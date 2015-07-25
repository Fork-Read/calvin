define([
    'jquery', 'underscore', 'backbone', 'events', 'views/BaseView', 'models/ProjectApiModel', 'text!templates/apiview.tmpl'
], function ($, _, Backbone, Events, BaseView, ProjectApiModel, viewTemplate) {
    var ApiView = BaseView.extend({
        'className': 'container',
        onInitialize: function (options) {
            var thisView = this;
            thisView.id = options.id;
            thisView.apiModel = new ProjectApiModel({
                _id: options.id
            });

            thisView.apiModel.fetch();
        },
        render: function () {
            var thisView = this;

            var template = _.template(viewTemplate);

            thisView.$el.html(template({}));

            return this;
        }
    });
    return ApiView;
});