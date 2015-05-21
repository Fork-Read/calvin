define([
    'jquery', 'underscore', 'backbone', 'views/BaseView', 'models/ProjectModel', 'text!templates/projectcontainer.tmpl'
], function ($, _, Backbone, BaseView, ProjectModel, viewTemplate) {
    var ProjectContainerView = BaseView.extend({
        initialize: function (options) {
            var _self = this;
            this.projectModel = new ProjectModel({
                _id: options.projectId
            });
        },
        render: function () {
            var _self = this;
            this.projectModel.fetch({
                'reset': true,
                success: function () {
                    var temp = _.template(viewTemplate);
                    _self.$el.html(temp({
                        project: _self.projectModel.toJSON()
                    }));
                    _self.setHeader();
                }
            });
            return this;
        },
        setHeader: function () {
            $('.active-project').html(this.projectModel.get('name'));
        }
    });
    return ProjectContainerView;
});