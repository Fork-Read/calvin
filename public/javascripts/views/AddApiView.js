define([
    'jquery', 'underscore', 'backbone', 'events', 'views/BaseView', 'text!templates/addapi.tmpl'
], function ($, _, Backbone, Events, BaseView, viewTemplate) {
    var AddApiView = BaseView.extend({
        'className': 'container',
        onInitialize: function (options) {
            var _self = this;
            _self.options = options;
        },
        render: function () {
            var _self = this;

            var template = _.template(viewTemplate);

            _self.$el.html(template());

            return this;
        }
    });
    return AddApiView;
});