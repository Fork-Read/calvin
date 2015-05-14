define([
    'underscore', 'backbone', 'text!templates/home.tmpl'
], function (_, Backbone, homeTemplate) {
    var HomeView = Backbone.View.extend({
        initialize: function () {
            console.log('initialize TestView');
        },
        render: function () {
            var _self = this;
            console.log('render called');
            _self.$el.html(_.template(homeTemplate, null));

            return this;
        }
    });
    return HomeView;
});