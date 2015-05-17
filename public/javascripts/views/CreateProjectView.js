define([
    'underscore', 'backbone', 'views/BaseView', 'models/ProjectModel', 'text!templates/createproject.tmpl'
], function (_, Backbone, BaseView, ProjectModel, viewTemplate) {
    var CreateProjectView = BaseView.extend({
        initialize: function () {
            this.projectModel = new ProjectModel();
        },
        events: {
            'click .create-project-submit': 'saveProject'
        },
        render: function () {
            this.$el.html(_.template(viewTemplate, null));
            return this;
        },
        saveProject: function () {
            var data = this.serializeFormData();
            this.projectModel.set(data);
            console.log(this.projectModel.toJSON());
            this.projectModel.save();
        },
        serializeFormData: function () {
            var formData = this.$el.find('.create-project-form').serializeArray(),
                returnObj = {};
            _.each(formData, function (item) {
                returnObj[item.name] = item.value;
            });
            return returnObj;
        }
    });
    return CreateProjectView;
});