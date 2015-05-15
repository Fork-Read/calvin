define([
    'underscore', 'backbone', 'views/BaseView', 'text!templates/home.tmpl'
], function (_, Backbone, BaseView, homeTemplate) {
    var HomeView = BaseView.extend({
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