define([
    'jquery', 'underscore', 'backbone', 'events', 'views/BaseView', 'text!templates/apiview.tmpl'
], function ($, _, Backbone, Events, BaseView, viewTemplate) {
    var ApiView = BaseView.extend({
        'className': 'container',
        onInitialize: function (options) {
            var thisView = this;
            thisView.id = options.id;
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