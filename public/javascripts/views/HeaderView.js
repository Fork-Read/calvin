define([
    'underscore', 'backbone', 'events', 'views/BaseView', 'text!templates/header.tmpl'
], function (_, Backbone, Events, BaseView, viewTemplate) {
    var HeaderView = BaseView.extend({
        initialize: function () {

        },
        events: {
            'click .create-project-button': 'showCreateProject'
        },
        render: function () {
            var _self = this;

            _self.$el.html(_.template(viewTemplate, null));
            return this;
        },
        showCreateProject: function (e) {
            e.preventDefault();
            Events.trigger('router:navigate', 'createProject');
        }
    });
    return HeaderView;
});