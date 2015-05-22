define([
    'jquery', 'underscore', 'backbone', 'views/BaseView', 'views/ProjectView', 'models/ProjectModel'
], function ($, _, Backbone, BaseView, ProjectView, ProjectModel) {
    var ProjectContainerView = BaseView.extend({
        'className': 'project-container',
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
                    _self.setHeader();
                    _self.projectView = new ProjectView({
                        model: _self.projectModel
                    });
                    _self.$el.append(_self.projectView.render().el);
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