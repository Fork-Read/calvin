define([
    'underscore', 'backbone', 'events', 'views/BaseView', 'models/ProjectModel', 'text!templates/createproject.tmpl'
], function (_, Backbone, Events, BaseView, ProjectModel, viewTemplate) {
    var CreateProjectView = BaseView.extend({
        onInitialize: function () {
            this.projectModel = new ProjectModel();
        },
        events: {
            'click .create-project-submit': 'saveProject'
        },
        render: function () {
            this.$el.html(_.template(viewTemplate));
            return this;
        },
        saveProject: function () {
            var data = this.serializeFormData();
            this.projectModel.set(data);
            this.projectModel.save({}, {
                success: function (model, response) {
                    Events.trigger('router:navigate', '');
                }
            });
        },
        serializeFormData: function () {
            var formData = this.$el.find('.create-project-form').serializeArray(),
                returnObj = {};
            _.each(formData, function (item) {
                returnObj[item.name] = item.value;
            });
            return returnObj;
        },
        onClose: function () {
            this.unbind();
        }
    });
    return CreateProjectView;
});