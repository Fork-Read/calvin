define([
    'underscore', 'backbone', 'views/BaseView', 'text!templates/createproject.tmpl'
], function (_, Backbone, BaseView, viewTemplate) {
    var CreateProjectView = BaseView.extend({
        initialize: function () {

        },
        render: function () {
            this.$el.html(_.template(viewTemplate, null));
            return this;
        }
    });
    return CreateProjectView;
});